import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { apiRouter } from './server/apiRouter';
import { initDatabase, migrateAndSyncDatabase } from './server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Ensure SQLite database is fully initialized and migrated
  try {
    await initDatabase();
    migrateAndSyncDatabase();
    console.log('[DevOps Portal] SQLite database initialized and synchronized successfully');
  } catch (dbErr) {
    console.error('[DevOps Portal] Error initializing database:', dbErr);
  }

  const app = express();
  
  // Resolve port: CLI --port (for dev runner e.g. --port 3000), then process.env.PORT, defaulting to 3000
  const resolvePort = (): number => {
    const portArgIdx = process.argv.indexOf('--port');
    if (portArgIdx !== -1 && process.argv[portArgIdx + 1]) {
      const p = parseInt(process.argv[portArgIdx + 1], 10);
      if (!isNaN(p)) return p;
    }
    if (process.env.PORT) {
      const p = parseInt(process.env.PORT, 10);
      if (!isNaN(p)) return p;
    }
    return 3000;
  };
  const PORT = resolvePort();

  // Middlewares
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (_req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads directory serving
  const uploadsDir = path.resolve(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));
  app.use('/ai/api/uploads', express.static(uploadsDir));
  app.use('/admin/api/uploads', express.static(uploadsDir));
  app.use('/api/uploads', express.static(uploadsDir));

  // API Routes - mount on /ai/api, /admin/api, and /api for full compatibility
  app.use('/ai/api', apiRouter);
  app.use('/admin/api', apiRouter);
  app.use('/api', apiRouter);

  // Health check endpoints
  const healthHandler = (_req: express.Request, res: express.Response) => {
    res.json({
      status: 'healthy',
      service: 'DevOps Academy Portal',
      database: 'SQLite ACID WAL',
      port: PORT,
      apiBasePath: '/ai/api',
      timestamp: new Date().toISOString()
    });
  };
  app.get('/health', healthHandler);
  app.get('/ai/api/health', healthHandler);
  app.get('/admin/api/health', healthHandler);
  app.get('/api/health', healthHandler);

  const isProduction = process.env.NODE_ENV === 'production';
  const distExists = fs.existsSync(path.resolve(__dirname, 'dist', 'index.html'));

  if (!isProduction && !process.env.SERVE_DIST) {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Intercept and serve patched /@vite/client to disable HMR WebSocket in proxy/iframe environment
    app.use(async (req, res, next) => {
      if (req.path === '/@vite/client' || req.url.startsWith('/@vite/client')) {
        try {
          const result = await vite.transformRequest('/@vite/client');
          if (result && typeof result.code === 'string') {
            let code = result.code;
            code = code.replace('console.debug("[vite] connecting...");', '/* [vite] HMR connection disabled */');
            code = code.replace(
              'await wsTransport.connect(handlers);',
              'return; /* [vite] HMR connection disabled in sandbox */'
            );
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            return res.status(200).send(code);
          }
        } catch (_e) {
          // fallback to vite middlewares
        }
      }
      next();
    });
    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      if (req.method !== 'GET') return next();
      // Skip API and static asset requests
      if (req.path.startsWith('/api') || req.path.startsWith('/admin') || req.path.startsWith('/ai') || req.path.includes('.')) {
        return next();
      }
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
    console.log('[DevOps Portal] Mounted Vite development middlewares with SPA handler');
  } else {
    // Production mode: serve built assets from dist/
    const distPath = path.resolve(__dirname, 'dist');
    if (distExists) {
      app.use(express.static(distPath));
      // Catch-all SPA fallback compatible with Express 4 and Express 5 (avoids path-to-regexp '*' error)
      app.use((_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
      console.log(`[DevOps Portal] Serving production static bundle from ${distPath}`);
    } else {
      console.warn('[DevOps Portal] Warning: dist folder not found. Run "npm run build" first.');
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DevOps Portal] Server active on http://0.0.0.0:${PORT} (PID: ${process.pid})`);
  });
}

startServer().catch((err) => {
  console.error('[DevOps Portal Startup Error]', err);
  process.exit(1);
});
