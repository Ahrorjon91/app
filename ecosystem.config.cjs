/**
 * PM2 Ecosystem Configuration for DEVOPS Academy Student Portal
 * 
 * Configured for VPS deployment on Port 3002 with independent SQLite database,
 * preventing conflicts with other services running on Port 3000 and 3001 (e.g. pm2).
 * API endpoints route via /ai/api/...
 * 
 * Usage on VPS:
 *   1. Install dependencies:  npm install
 *   2. Build frontend:        npm run build
 *   3. Start with PM2:        pm2 start ecosystem.config.cjs
 *   4. Save PM2 list:         pm2 save
 *   5. Check status:          pm2 status
 *   6. View logs:             pm2 logs devops-portal-3002
 */

module.exports = {
  apps: [
    {
      name: "devops-portal-3002",
      script: "server.ts",
      interpreter: "node",
      node_args: "--import tsx",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        SQLITE_DB_PATH: "./data/academy.sqlite",
        VITE_API_BASE_PATH: "/ai/api",
      },
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      time: true,
    },
  ],
};
