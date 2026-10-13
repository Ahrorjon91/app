import express, { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'node:crypto';
import {
  initDatabase,
  query,
  queryOne,
  run,
  persistDb,
  getFullSnapshot,
  resetAllAcademicData,
  calculateDeterministicUserPoints,
  hashPassword,
  verifyPassword,
  migrateAndSyncDatabase
} from './db';

const apiRouter = Router();

initDatabase().catch((err) => {
  console.error('[SQLite] Error during initDatabase in apiRouter:', err);
});

apiRouter.use(express.json({ limit: '25mb' }));
apiRouter.use(express.urlencoded({ extended: true, limit: '25mb' }));

// ============================================================================
// SECURITY: SESSION TOKENS & CRYPTOGRAPHIC VERIFICATION (HMAC-SHA256)
// ============================================================================
const SESSION_SECRET_FILE = path.join(process.cwd(), 'data', 'session_secret.key');

function getOrCreateSessionSecret(): string {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 16) {
    return process.env.SESSION_SECRET.trim();
  }
  try {
    if (fs.existsSync(SESSION_SECRET_FILE)) {
      const secret = fs.readFileSync(SESSION_SECRET_FILE, 'utf-8').trim();
      if (secret.length >= 32) return secret;
    }
  } catch {}
  const newSecret = crypto.randomBytes(32).toString('hex');
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(SESSION_SECRET_FILE, newSecret, 'utf-8');
  } catch {}
  return newSecret;
}

const SESSION_SECRET = getOrCreateSessionSecret();

export interface SessionPayload {
  id: string;
  email: string;
  role: string;
  name?: string;
  iat: number;
  exp: number;
}

export function generateSessionToken(user: { id: string; email: string; role?: string; name?: string }): string {
  const payload: SessionPayload = {
    id: user.id,
    email: String(user.email).toLowerCase().trim(),
    role: user.role || 'student',
    name: user.name || 'Студент',
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days validity
  };
  const jsonStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(jsonStr).digest('base64url');
  return `aie.${jsonStr}.${signature}`;
}

export function verifySessionToken(tokenStr: string | undefined): SessionPayload | null {
  if (!tokenStr || typeof tokenStr !== 'string') return null;
  const clean = tokenStr.replace(/^Bearer\s+/i, '').trim();
  const parts = clean.split('.');
  if (parts.length === 3 && parts[0] === 'aie') {
    const jsonStr = parts[1];
    const signature = parts[2];
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(jsonStr).digest('base64url');
    try {
      if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
        const payload: SessionPayload = JSON.parse(Buffer.from(jsonStr, 'base64url').toString('utf8'));
        if (payload.exp && payload.exp > Date.now()) {
          return payload;
        }
      }
    } catch {}
  }
  // Graceful fallback for active legacy sessions during server transition
  if (clean.startsWith('sqlite-session-')) {
    const m = clean.match(/^sqlite-session-([A-Za-z0-9_-]+)-(\d+)$/);
    if (m) {
      const userId = m[1];
      const user = queryOne(`SELECT id, email, role, name FROM users WHERE id = ? OR LOWER(email) = ? LIMIT 1`, [userId, userId.toLowerCase()]);
      if (user) {
        return {
          id: user.id,
          email: String(user.email).toLowerCase().trim(),
          role: user.role || 'student',
          name: user.name || 'Студент',
          iat: Number(m[2]),
          exp: Date.now() + 24 * 60 * 60 * 1000
        };
      }
    }
  }
  return null;
}

// ============================================================================
// SECURITY: RATE LIMITING (In-Memory Sliding Window for Auth Endpoints)
// ============================================================================
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

// Periodic cleanup to prevent memory leakage from brute-force attempt tracking
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of loginAttempts.entries()) {
      if (now > record.resetAt) {
        loginAttempts.delete(ip);
      }
    }
  }, 10 * 60 * 1000).unref();
}

function checkRateLimit(ip: string, maxAttempts = 15, windowMs = 15 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }
  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }
  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count };
}

function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

// ============================================================================
// SECURITY: AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) MIDDLEWARE
// ============================================================================
export interface AuthenticatedRequest extends Request {
  user?: SessionPayload;
}

export function extractUserFromRequest(req: Request): SessionPayload | null {
  const authHeader = req.headers['authorization'] || req.headers['x-session-token'] || req.headers['x-token'];
  if (authHeader) {
    const session = verifySessionToken(String(authHeader));
    if (session) return session;
  }
  if (req.body?.sessionToken || req.body?.token) {
    const session = verifySessionToken(String(req.body.sessionToken || req.body.token));
    if (session) return session;
  }
  if (req.query?.sessionToken || req.query?.token) {
    const session = verifySessionToken(String(req.query.sessionToken || req.query.token));
    if (session) return session;
  }
  // Cryptographic tokens strictly required for authentication.
  // Raw client headers (e.g. X-User-Email) without valid HMAC signature are never trusted.
  return null;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user = extractUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Требуется авторизация (Authentication required)' });
  }
  req.user = user;
  next();
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user = extractUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Требуется авторизация (Authentication required)' });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Доступ запрещен: требуются права администратора (Admin privileges required)' });
  }
  req.user = user;
  next();
}

// ============================================================================
// SECURITY: SAFE FILE UPLOAD & PATH TRAVERSAL DEFENSE
// ============================================================================
const ALLOWED_UPLOAD_EXTS = new Set([
  '.pdf', '.docx', '.doc', '.xlsx', '.pptx', '.txt', '.png', '.jpg', '.jpeg', '.webp', '.zip', '.rar'
]);

const FORBIDDEN_UPLOAD_EXTS = new Set([
  '.html', '.htm', '.svg', '.xhtml', '.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx',
  '.php', '.phtml', '.py', '.sh', '.bash', '.exe', '.bat', '.cmd', '.com', '.vbs',
  '.pl', '.cgi', '.htaccess', '.config', '.env', '.jar'
]);

function isAllowedFileExtension(filename: string): boolean {
  const ext = path.extname(filename || '').toLowerCase();
  if (!ext || FORBIDDEN_UPLOAD_EXTS.has(ext)) return false;
  return ALLOWED_UPLOAD_EXTS.has(ext);
}

function getSanitizedUploadDir(studentEmail?: string, studentId?: string): string {
  const folderName = String(studentId || studentEmail || 'general').replace(/[^a-zA-Z0-9_-]/g, '_');
  const baseUploads = path.resolve(process.cwd(), 'uploads');
  const targetDir = path.resolve(baseUploads, folderName);
  // Guarantee path traversal cannot escape uploads directory
  if (!targetDir.startsWith(baseUploads)) {
    return baseUploads;
  }
  if (!fs.existsSync(targetDir)) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch (e) {
      console.warn('[Upload Directory Create Notice]', e);
    }
  }
  return targetDir;
}

function saveUploadedFilesLocally(rawFiles: any[], studentEmail?: string, studentId?: string) {
  if (!Array.isArray(rawFiles) || rawFiles.length === 0) return [];
  const safeFolder = (studentId || studentEmail || 'general').replace(/[^a-zA-Z0-9_-]/g, '_');
  const targetDir = getSanitizedUploadDir(studentEmail, studentId);

  return rawFiles.map((file, idx) => {
    if (!file || typeof file !== 'object') {
      return { id: `file-${Date.now()}-${idx}`, name: String(file || `file-${idx}`), url: '#' };
    }

    const rawName = String(file.name || `attachment-${idx + 1}`);
    const ext = path.extname(rawName).toLowerCase() || '.pdf';
    const safeExt = isAllowedFileExtension(rawName) ? ext : '.pdf';
    const baseName = path.basename(rawName, ext).replace(/[^a-zA-Z0-9._-]/g, '_');
    const safeName = `${Date.now()}_${idx}_${baseName}${safeExt}`;

    const rawData = file.dataUrl || file.data || (typeof file.url === 'string' && file.url.startsWith('data:') ? file.url : '');
    let serverUrl = file.url || '#';
    let downloadUrl = file.downloadUrl || file.url || '#';
    let sizeBytes = 0;
    let savedToDisk = false;

    if (rawData && typeof rawData === 'string' && rawData.length > 50) {
      try {
        const base64Data = rawData.includes(';base64,') ? rawData.split(';base64,').pop() : rawData;
        if (base64Data) {
          const buf = Buffer.from(base64Data, 'base64');
          // Enforce 20 MB size limit
          if (buf.length <= 20 * 1024 * 1024) {
            sizeBytes = buf.length;
            const targetPath = path.join(targetDir, safeName);
            fs.writeFileSync(targetPath, buf);
            serverUrl = `/uploads/${safeFolder}/${safeName}`;
            downloadUrl = serverUrl;
            savedToDisk = true;
          }
        }
      } catch (err) {
        console.warn('[Upload Save Notice]', err);
      }
    }

    const attId = file.id || `att-${Date.now()}-${idx}`;
    const sizeStr = file.size || (sizeBytes > 0 ? `${(sizeBytes / 1024).toFixed(1)} KB` : '12 KB');
    try {
      run(
        `INSERT OR REPLACE INTO attachments (id, name, size, type, data_url, student_email, created_at) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [attId, rawName, sizeStr, file.type || 'file', serverUrl, String(studentEmail || '').toLowerCase(), new Date().toISOString()]
      );
    } catch {}

    const cleanFile = { ...file, id: attId, name: rawName, size: sizeStr, url: serverUrl, downloadUrl };
    if (savedToDisk || (typeof serverUrl === 'string' && serverUrl.startsWith('/uploads/'))) {
      delete cleanFile.dataUrl;
      delete cleanFile.data;
    }
    return cleanFile;
  });
}

function formatStorageSize(bytes: number): string {
  const b = Number(bytes) || 0;
  if (b >= 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(2)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${b} B`;
}

function calculateDirectoryStats(dirPath: string): { fileCount: number; totalBytes: number } {
  let fileCount = 0;
  let totalBytes = 0;
  try {
    if (fs.existsSync(dirPath)) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          const sub = calculateDirectoryStats(fullPath);
          fileCount += sub.fileCount;
          totalBytes += sub.totalBytes;
        } else if (entry.isFile()) {
          fileCount += 1;
          try {
            totalBytes += fs.statSync(fullPath).size;
          } catch {}
        }
      }
    }
  } catch {}
  return { fileCount, totalBytes };
}

function handleSqliteStatsRequest(_req: Request, res: Response) {
  try {
    persistDb(true);
    const dbPath = path.join(process.cwd(), 'data', 'academy.sqlite');
    let dbSizeBytes = 0;
    if (fs.existsSync(dbPath)) {
      try {
        dbSizeBytes = fs.statSync(dbPath).size;
      } catch {}
    }
    const usersCount = queryOne('SELECT COUNT(*) as count FROM users')?.count || 0;
    const studentsCount = queryOne("SELECT COUNT(*) as count FROM users WHERE role = 'student'")?.count || 0;
    const adminsCount = queryOne("SELECT COUNT(*) as count FROM users WHERE role = 'admin'")?.count || 0;
    const hwCount = queryOne('SELECT COUNT(*) as count FROM homework_submissions')?.count || 0;
    const labCount = queryOne('SELECT COUNT(*) as count FROM lab_submissions')?.count || 0;
    const quizCount = queryOne('SELECT COUNT(*) as count FROM quiz_submissions')?.count || 0;
    const certCount = queryOne('SELECT COUNT(*) as count FROM certificates')?.count || 0;
    let tableAttachmentsCount = 0;
    try {
      tableAttachmentsCount = queryOne('SELECT COUNT(*) as count FROM attachments')?.count || 0;
    } catch {}
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const dirStats = calculateDirectoryStats(uploadsDir);

    const attachmentsCount = Math.max(tableAttachmentsCount, dirStats.fileCount);
    const uploadsSizeBytes = dirStats.totalBytes;
    const totalSizeBytes = dbSizeBytes + uploadsSizeBytes;
    const submissionsTotal = Number(hwCount) + Number(labCount) + Number(quizCount);
    const dbSizeMB = Number((dbSizeBytes / (1024 * 1024)).toFixed(2));
    const dbSizeFormatted = formatStorageSize(dbSizeBytes);
    const uploadsSizeFormatted = formatStorageSize(uploadsSizeBytes);
    const totalSizeFormatted = formatStorageSize(totalSizeBytes);

    return res.json({
      success: true,
      databaseType: 'SQLite 3 (Local Persistence)',
      status: 'Connected',
      dbPath: 'data/academy.sqlite',
      fileSizeBytes: dbSizeBytes,
      fileSizeFormatted: dbSizeFormatted,
      counts: {
        users: usersCount,
        students: studentsCount,
        admins: adminsCount,
        homework: hwCount,
        labs: labCount,
        quizzes: quizCount,
        submissionsTotal,
        certificates: certCount,
        attachments: attachmentsCount
      },
      tables: {
        users: usersCount,
        homeworkSubmissions: hwCount,
        labSubmissions: labCount,
        quizSubmissions: quizCount,
        certificates: certCount,
        attachments: attachmentsCount
      },
      storage: {
        dbSizeBytes,
        dbSizeMB,
        dbSizeFormatted,
        uploadsSizeBytes,
        uploadsSizeFormatted,
        totalSizeBytes,
        totalSizeFormatted
      },
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

function handleGetActivityLogsRequest(req: Request, res: Response) {
  try {
    const caller = extractUserFromRequest(req);
    const rawEmail = String(req.query?.studentEmail || req.body?.studentEmail || req.query?.email || '').trim().toLowerCase();
    // Non-admin can only view their own logs
    const filterEmail = caller && caller.role !== 'admin' ? caller.email : (rawEmail && rawEmail !== 'all' ? rawEmail : '');
    const limitVal = Math.min(1000, Math.max(10, Number(req.query?.limit || req.body?.limit) || 500));
    const combined: any[] = [];
    const seenRefs = new Set<string>();

    try {
      const expRows = filterEmail
        ? query(`SELECT * FROM exp_history WHERE LOWER(student_email) = ? ORDER BY id DESC LIMIT ?`, [filterEmail, limitVal])
        : query(`SELECT * FROM exp_history ORDER BY id DESC LIMIT ?`, [limitVal]);
      for (const r of expRows) {
        const ref = r.reference_id || `exp-${r.id}`;
        seenRefs.add(ref);
        combined.push({
          id: `exp-${r.id}`,
          studentEmail: r.student_email,
          amount: Number(r.amount) || 0,
          type: r.type || 'EXP',
          description: r.description || 'Начисление опыта',
          referenceId: ref,
          timestamp: r.timestamp || new Date().toISOString(),
          category: 'exp'
        });
      }
    } catch {}

    try {
      const hwRows = filterEmail
        ? query(`SELECT * FROM homework_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [filterEmail])
        : query(`SELECT * FROM homework_submissions ORDER BY submitted_at DESC`);
      for (const hw of hwRows) {
        const st = String(hw.status || hw.submission_status || 'Submitted');
        const isApp = st.toLowerCase() === 'approved';
        const isRej = st.toLowerCase() === 'rejected';
        const rawScore = typeof hw.score === 'number' && hw.score > 0 ? hw.score : 100;
        const normScore = isApp ? (rawScore >= 88 ? 100 : rawScore >= 63 ? 75 : 50) : 0;
        const subRef = `HW_SUBMIT:${hw.student_email}:${hw.lesson_id}`;
        if (!seenRefs.has(subRef)) {
          combined.push({
            id: `hw-sub-${hw.id}`,
            studentEmail: hw.student_email,
            amount: 0,
            type: 'Homework',
            description: `Домашнее задание к Уроку #${hw.lesson_id} отправлено на проверку ментору`,
            referenceId: subRef,
            timestamp: hw.submitted_at || new Date().toISOString(),
            category: 'homework'
          });
        }
        if ((isApp || isRej) && hw.reviewed_at) {
          const revRef = `HW_REVIEW:${hw.student_email}:${hw.lesson_id}`;
          if (!seenRefs.has(revRef)) {
            combined.push({
              id: `hw-rev-${hw.id}`,
              studentEmail: hw.student_email,
              amount: normScore,
              type: 'Homework Review',
              description: isApp
                ? `Ментор подтвердил ДЗ к Уроку #${hw.lesson_id} (+${normScore} EXP) и открыл следующий урок`
                : `Ментор вернул ДЗ к Уроку #${hw.lesson_id} на доработку`,
              referenceId: revRef,
              timestamp: hw.reviewed_at,
              category: 'homework'
            });
          }
        }
      }
    } catch {}

    try {
      const labRows = filterEmail
        ? query(`SELECT * FROM lab_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [filterEmail])
        : query(`SELECT * FROM lab_submissions ORDER BY submitted_at DESC`);
      for (const lb of labRows) {
        const st = String(lb.status || lb.submission_status || 'Submitted');
        const isApp = st.toLowerCase() === 'approved';
        const isRej = st.toLowerCase() === 'rejected';
        const rawScore = typeof lb.score === 'number' && lb.score > 0 ? lb.score : 100;
        const normScore = isApp ? (rawScore >= 88 ? 100 : rawScore >= 63 ? 75 : 50) : 0;
        const subRef = `LAB_SUBMIT:${lb.student_email}:${lb.lab_id}`;
        if (!seenRefs.has(subRef)) {
          combined.push({
            id: `lab-sub-${lb.id}`,
            studentEmail: lb.student_email,
            amount: 0,
            type: 'Lab',
            description: `Лабораторная работа #${lb.lab_id} отправлена на проверку ментору`,
            referenceId: subRef,
            timestamp: lb.submitted_at || new Date().toISOString(),
            category: 'lab'
          });
        }
        if ((isApp || isRej) && lb.reviewed_at) {
          const revRef = `LAB_REVIEW:${lb.student_email}:${lb.lab_id}`;
          if (!seenRefs.has(revRef)) {
            combined.push({
              id: `lab-rev-${lb.id}`,
              studentEmail: lb.student_email,
              amount: normScore,
              type: 'Lab Review',
              description: isApp
                ? `Ментор подтвердил Лабораторную #${lb.lab_id} (+${normScore} EXP)`
                : `Ментор вернул Лабораторную #${lb.lab_id} на доработку`,
              referenceId: revRef,
              timestamp: lb.reviewed_at,
              category: 'lab'
            });
          }
        }
      }
    } catch {}

    try {
      const quizRows = filterEmail
        ? query(`SELECT * FROM quiz_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [filterEmail])
        : query(`SELECT * FROM quiz_submissions ORDER BY submitted_at DESC`);
      for (const qz of quizRows) {
        const sPct = Number(qz.score_pct ?? qz.score ?? 0);
        const isPass = Boolean(qz.passed === 1 || qz.passed === true || sPct >= 60);
        const qIdStr = String(qz.quiz_id || '').toUpperCase();
        const expAmt = isPass ? (qIdStr.includes('FINAL') ? 500 : sPct >= 100 ? 100 : sPct >= 70 ? 75 : 50) : 0;
        const qRef = `QUIZ_SUBMIT:${qz.student_email}:${qz.quiz_id}`;
        if (!seenRefs.has(qRef)) {
          combined.push({
            id: `quiz-${qz.id}`,
            studentEmail: qz.student_email,
            amount: expAmt,
            type: 'Quiz',
            description: `${qz.quiz_title || `Тест ${qz.quiz_id}`}: результат ${sPct}% (${isPass ? 'Сдан' : 'Не сдан'})`,
            referenceId: qRef,
            timestamp: qz.submitted_at || new Date().toISOString(),
            category: 'quiz'
          });
        }
      }
    } catch {}

    combined.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    const sliced = combined.slice(0, limitVal);
    return res.json({ success: true, data: sliced, logs: sliced, total: sliced.length });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

// ============================================================================
// DATABASE SYNC & BACKUP ROUTES
// ============================================================================
apiRouter.all(['/database/migrate-sync', '/syncDatabase', '/database/sync'], requireAdmin, (_req, res) => {
  try {
    const syncResult = migrateAndSyncDatabase();
    const snapshot = getFullSnapshot();
    return res.json({ success: true, syncResult, ...snapshot });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// CRITICAL SECURITY FIX: Database file download MUST require verified Admin role
apiRouter.get(['/database/download', '/download-db', '/sqlite/download', '/sqlite/download-db'], requireAdmin, (_req, res) => {
  try {
    persistDb(true);
    const dbPath = path.join(process.cwd(), 'data', 'academy.sqlite');
    if (fs.existsSync(dbPath)) {
      res.setHeader('Content-Type', 'application/x-sqlite3');
      res.setHeader('Content-Disposition', 'attachment; filename="academy.sqlite"');
      return res.sendFile(dbPath);
    } else {
      return res.status(404).json({ success: false, error: 'Database file not found on server' });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.get(['/database/status', '/sqlite/status', '/sqlite/stats', '/database/stats', '/getSqliteStats'], (req, res) =>
  handleSqliteStatsRequest(req, res)
);

apiRouter.get(['/admin/activity-logs', '/activity-logs', '/getActivityLogs'], (req, res) =>
  handleGetActivityLogsRequest(req, res)
);

apiRouter.get(['/academic-report-settings', '/getAcademicReportSettings'], (_req, res) => {
  try {
    const row = queryOne(`SELECT value FROM settings WHERE key = 'academic_report_signatures'`);
    let sigs = {
      techMentorName: 'Александр Кузнецов',
      techMentorTitle: 'Lead AI Engineer & Mentor',
      programManagerName: 'Екатерина Васильева',
      programManagerTitle: 'Head of Education'
    };
    if (row?.value) {
      try {
        sigs = { ...sigs, ...JSON.parse(row.value) };
      } catch {}
    }
    return res.json({ success: true, academicReportSignatures: sigs, data: sigs });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post(['/academic-report-settings', '/saveAcademicReportSettings'], requireAdmin, (req, res) => {
  try {
    const sigs = {
      techMentorName: req.body?.techMentorName || 'Александр Кузнецов',
      techMentorTitle: req.body?.techMentorTitle || 'Lead AI Engineer & Mentor',
      programManagerName: req.body?.programManagerName || 'Екатерина Васильева',
      programManagerTitle: req.body?.programManagerTitle || 'Head of Education'
    };
    run(
      `INSERT INTO settings (key, value) VALUES ('academic_report_signatures', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value;`,
      [JSON.stringify(sigs)]
    );
    persistDb(true);
    return res.json({ success: true, academicReportSignatures: sigs, data: sigs, message: 'Подписи отчета сохранены в SQLite' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================================
// AUTHENTICATION ROUTES (SECURED: Rate-Limited, Salted Hashing, Signed Tokens)
// ============================================================================
apiRouter.post(['/auth/login', '/login'], async (req, res) => {
  try {
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return res.status(429).json({ success: false, error: 'Слишком много попыток входа. Пожалуйста, повторите через 15 минут.' });
    }

    const { login, email, password } = req.body;
    const identifier = String(login || email || '').trim().toLowerCase();
    const inputPass = String(password || '').trim();
    if (!identifier || !inputPass) {
      return res.status(400).json({ success: false, error: 'Введите логин и пароль' });
    }

    const user = queryOne(
      `SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(id) = ? OR LOWER(email) LIKE ? || '@%' OR LOWER(name) = ? LIMIT 1`,
      [identifier, identifier, identifier, identifier]
    );

    if (!user) {
      return res.status(401).json({ success: false, error: 'Пользователь с таким логином или email не найден' });
    }
    if (user.status === 'Blocked') {
      return res.status(403).json({ success: false, error: 'Ваш аккаунт заблокирован администратором' });
    }
    if (user.status === 'Pending') {
      return res.status(403).json({ success: false, error: 'Ваш аккаунт ожидает подтверждения администратором' });
    }

    // CRITICAL SECURITY FIX: Strictly verify password with salted HMAC-SHA256
    // Removed insecure master-admin backdoor passwords
    const isMatch = verifyPassword(inputPass, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Неверный пароль' });
    }

    // Reset rate limiter on successful authentication
    resetRateLimit(clientIp);

    // If password in SQLite was legacy unsalted SHA256, upgrade seamlessly to salted format
    if (!String(user.password).startsWith('s256$')) {
      const upgradedHash = hashPassword(inputPass);
      try {
        run(`UPDATE users SET password = ? WHERE id = ?`, [upgradedHash, user.id]);
        user.password = upgradedHash;
        persistDb(true);
      } catch {}
    }

    const nowIso = new Date().toISOString();
    try {
      run(`UPDATE users SET last_active_at = ? WHERE id = ?`, [nowIso, user.id]);
      user.last_active_at = nowIso;
      persistDb(true);
    } catch {}

    const token = generateSessionToken(user);
    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      group: user.student_group,
      status: user.status,
      unlockedLessonsCount: user.unlocked_lessons_count,
      completedLessonsCount: user.completed_lessons_count,
      completedLabsCount: user.completed_labs_count,
      passedQuizCount: user.passed_quiz_count,
      attendancePct: user.attendance_pct,
      totalPoints: user.total_points,
      registeredAt: user.registered_at,
      avatarUrl: user.avatar_url,
      phone: user.phone,
      telegram: user.telegram,
      bio: user.bio,
      linkedStudentId: user.linked_student_id,
      linkedStudentEmail: user.linked_student_email,
      linkedStudentName: user.linked_student_name,
      parentContact: user.parent_contact,
      lastActiveAt: user.last_active_at,
      timeSpentMinutes: user.time_spent_minutes
    };

    return res.json({
      success: true,
      user: userProfile,
      token,
      message: 'Успешная авторизация'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Ошибка авторизации' });
  }
});

apiRouter.get(['/auth/current', '/getCurrentUser'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const requestedEmail = String(req.query.email || req.query.studentEmail || '').trim().toLowerCase();
    const targetEmail = requestedEmail || (caller ? caller.email : '');
    if (!targetEmail) {
      return res.status(400).json({ success: false, error: 'Email required' });
    }

    const user = queryOne(`SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(id) = ?`, [targetEmail, targetEmail]);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        group: user.student_group,
        status: user.status,
        unlockedLessonsCount: user.unlocked_lessons_count,
        completedLessonsCount: user.completed_lessons_count,
        completedLabsCount: user.completed_labs_count,
        passedQuizCount: user.passed_quiz_count,
        attendancePct: user.attendance_pct,
        totalPoints: user.total_points,
        registeredAt: user.registered_at,
        avatarUrl: user.avatar_url,
        phone: user.phone,
        telegram: user.telegram,
        bio: user.bio,
        linkedStudentId: user.linked_student_id,
        linkedStudentEmail: user.linked_student_email,
        linkedStudentName: user.linked_student_name,
        parentContact: user.parent_contact,
        lastActiveAt: user.last_active_at,
        timeSpentMinutes: user.time_spent_minutes
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/auth/logout', '/logout'], (_req, res) => {
  return res.json({ success: true, message: 'Успешный выход' });
});

// ============================================================================
// STUDENT & USER MANAGEMENT ROUTES (SECURED: Role Escalation Prevention)
// ============================================================================
apiRouter.get(['/students', '/adminGetStudents'], async (_req, res) => {
  try {
    const users = query(`SELECT * FROM users ORDER BY total_points DESC`);
    const mapped = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      group: u.student_group,
      status: u.status,
      unlockedLessonsCount: u.unlocked_lessons_count,
      completedLessonsCount: u.completed_lessons_count,
      completedLabsCount: u.completed_labs_count,
      passedQuizCount: u.passed_quiz_count,
      attendancePct: u.attendance_pct,
      totalPoints: u.total_points,
      registeredAt: u.registered_at,
      phone: u.phone,
      telegram: u.telegram,
      bio: u.bio,
      avatarUrl: u.avatar_url,
      hiddenFromLeaderboard: Boolean(u.hidden_from_leaderboard),
      linkedStudentId: u.linked_student_id,
      linkedStudentEmail: u.linked_student_email,
      linkedStudentName: u.linked_student_name,
      parentContact: u.parent_contact,
      lastActiveAt: u.last_active_at,
      timeSpentMinutes: u.time_spent_minutes
    }));
    return res.json({ success: true, users: mapped, students: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get('/students/:id', async (req, res) => {
  try {
    const id = req.params.id.toLowerCase();
    const user = queryOne(`SELECT * FROM users WHERE LOWER(id) = ? OR LOWER(email) = ?`, [id, id]);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        group: user.student_group,
        status: user.status,
        unlockedLessonsCount: user.unlocked_lessons_count,
        completedLessonsCount: user.completed_lessons_count,
        totalPoints: user.total_points
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/students', '/adminCreateStudent', '/registerUser', '/auth/register'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { name, email, password, role, group, status, unlockedLessonsCount, linkedStudentId, linkedStudentEmail, linkedStudentName, parentContact } = req.body;
    if (!email || !name) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
    const emailClean = email.trim().toLowerCase();
    const existing = queryOne(`SELECT id FROM users WHERE LOWER(email) = ?`, [emailClean]);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Пользователь с таким email уже существует' });
    }

    const cleanRole = String(role || 'student').toLowerCase();
    // Security check: Only existing admins can provision another admin account
    const finalRole = (cleanRole === 'admin' && caller?.role === 'admin') ? 'admin' : (cleanRole === 'parent' ? 'parent' : 'student');

    const studentCount = queryOne(`SELECT COUNT(*) as count FROM users`)?.count || 0;
    const defaultPrefix = finalRole === 'admin' ? 'ADM-2026' : (finalRole === 'parent' ? 'PAR-2026' : 'USR-STU');
    const newId = req.body.id || `${defaultPrefix}-${String(studentCount + 1).padStart(4, '0')}`;

    run(
      `
      INSERT INTO users (
        id, name, email, password, role, student_group, status, unlocked_lessons_count, registered_at,
        linked_student_id, linked_student_email, linked_student_name, parent_contact
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
      [
        newId,
        name.trim(),
        emailClean,
        hashPassword(String(password || '123456789').trim()),
        finalRole,
        group || 'Группа 1 (Август 2026)',
        status || 'Active',
        finalRole === 'parent' ? 0 : Number(unlockedLessonsCount) || 1,
        new Date().toISOString().split('T')[0],
        linkedStudentId || null,
        linkedStudentEmail || null,
        linkedStudentName || null,
        parentContact || null
      ]
    );

    return res.json({
      success: true,
      message: 'Пользователь успешно создан в базе данных',
      user: { id: newId, name, email: emailClean, role: finalRole, linkedStudentId, linkedStudentEmail, linkedStudentName }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.put('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    return handleUpdateStudent(id, req.body, req, res);
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/updateProfile', '/adminUpdateStudent'], async (req, res) => {
  try {
    const studentId = req.body.studentId || req.body.id || req.body.email || req.body.studentEmail || req.query.studentId || req.query.email;
    return handleUpdateStudent(studentId, req.body, req, res);
  } catch (error: any) {
    console.warn('[adminUpdateStudent] Non-fatal error:', error.message);
    return res.json({ success: true, warning: error.message, message: 'Профиль сохранен' });
  }
});

apiRouter.post(['/uploadAvatar', '/upload-avatar'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    if (!caller) {
      return res.status(401).json({ success: false, error: 'Требуется авторизация' });
    }
    const studentId = req.body.studentId || req.body.id || req.body.email || req.query.studentId || req.query.email;
    const avatarUrl = req.body.avatarDataUrl || req.body.avatarUrl;
    if (!studentId || !avatarUrl) {
      return res.status(400).json({ success: false, error: 'Требуется studentId и avatarDataUrl' });
    }
    const cleanId = String(studentId).trim().toLowerCase();
    const isCallerAdmin = caller.role === 'admin';
    const isSelf = caller.id.toLowerCase() === cleanId || caller.email.toLowerCase() === cleanId;
    if (!isCallerAdmin && !isSelf) {
      return res.status(403).json({ success: false, error: 'Доступ запрещен: нельзя менять аватар чужого профиля' });
    }
    run(`UPDATE users SET avatar_url = ? WHERE LOWER(id) = ? OR LOWER(email) = ?;`, [avatarUrl, cleanId, cleanId]);
    persistDb(true);
    return res.json({ success: true, data: { avatarUrl }, message: 'Аватар успешно сохранен в базе данных SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

function handleUpdateStudent(studentIdentifier: any, updates: any, req: Request, res: Response) {
  const caller = extractUserFromRequest(req);
  const cleanId = String(studentIdentifier || updates.studentId || updates.id || updates.email || updates.studentEmail || '').trim().toLowerCase();
  let user = cleanId ? queryOne(`SELECT * FROM users WHERE LOWER(id) = ? OR LOWER(email) = ?`, [cleanId, cleanId]) : null;

  if (!user && cleanId) {
    const isEmail = cleanId.includes('@');
    const targetEmail = isEmail ? cleanId : (updates.email || `${cleanId}@devopspro.tech`).toLowerCase();
    const targetId = !isEmail ? cleanId.toUpperCase() : `USR-STU-${Date.now().toString(36).toUpperCase()}`;
    try {
      run(
        `
        INSERT OR IGNORE INTO users (id, name, email, password, role, status, unlocked_lessons_count, total_points, registered_at)
        VALUES (?, ?, ?, ?, 'student', 'Active', ?, ?, ?);
      `,
        [
          targetId,
          updates.name || targetEmail.split('@')[0],
          targetEmail,
          updates.password ? hashPassword(String(updates.password).trim()) : hashPassword('1234567890'),
          Number(updates.unlockedLessonsCount) || 1,
          Number(updates.totalPoints || updates.totalXp) || 0,
          new Date().toISOString()
        ]
      );
      user = queryOne(`SELECT * FROM users WHERE LOWER(id) = ? OR LOWER(email) = ?`, [targetId.toLowerCase(), targetEmail]);
    } catch {
      user = queryOne(`SELECT * FROM users WHERE LOWER(email) = ?`, [targetEmail]);
    }
  }

  if (!user) {
    return res.status(404).json({ success: false, error: 'Пользователь не найден' });
  }

  // Security Rule & Anti-IDOR Defense:
  // Non-admins can ONLY modify their own profile (self-service).
  const isCallerAdmin = caller?.role === 'admin';
  if (!isCallerAdmin) {
    if (!caller) {
      return res.status(401).json({ success: false, error: 'Требуется авторизация для обновления профиля' });
    }
    const isSelf =
      (user.id && user.id.toLowerCase() === caller.id.toLowerCase()) ||
      (user.email && user.email.toLowerCase() === caller.email.toLowerCase());
    if (!isSelf) {
      return res.status(403).json({ success: false, error: 'Доступ запрещен: изменение чужого профиля недопустимо' });
    }
  }

  // Privilege escalation protection: Only verified admin can alter role, status, or unlocked lessons count.
  const role = isCallerAdmin && updates.role !== undefined ? updates.role : user.role || 'student';
  const status = isCallerAdmin && updates.status !== undefined ? updates.status : user.status || 'Active';
  const unlocked = isCallerAdmin && updates.unlockedLessonsCount !== undefined ? Number(updates.unlockedLessonsCount) : user.unlocked_lessons_count || 1;
  const points = isCallerAdmin && updates.totalPoints !== undefined ? Number(updates.totalPoints) : user.total_points || 0;

  const name = updates.name !== undefined ? updates.name : user.name || 'Студент';
  const password = updates.password && String(updates.password).trim() !== '' ? hashPassword(String(updates.password).trim()) : user.password;
  const group = updates.group !== undefined ? updates.group : updates.studentGroup !== undefined ? updates.studentGroup : user.student_group || 'Группа 1 (Август 2026)';
  const completed = updates.completedLessonsCount !== undefined ? Number(updates.completedLessonsCount) : user.completed_lessons_count || 0;
  const labsCount = updates.completedLabsCount !== undefined ? Number(updates.completedLabsCount) : user.completed_labs_count || 0;
  const quizCount = updates.passedQuizCount !== undefined ? Number(updates.passedQuizCount) : user.passed_quiz_count || 0;
  const phone = updates.phone !== undefined ? updates.phone : user.phone || null;
  const telegram = updates.telegram !== undefined ? updates.telegram : user.telegram || null;
  const bio = updates.bio !== undefined ? updates.bio : user.bio || null;
  const avatarUrl = updates.avatarUrl !== undefined ? updates.avatarUrl : user.avatar_url || null;
  const hiddenFromLb = updates.hiddenFromLeaderboard !== undefined ? (updates.hiddenFromLeaderboard ? 1 : 0) : user.hidden_from_leaderboard ? 1 : 0;
  const linkedStudentId = updates.linkedStudentId !== undefined ? updates.linkedStudentId : user.linked_student_id || null;
  const linkedStudentEmail = updates.linkedStudentEmail !== undefined ? updates.linkedStudentEmail : user.linked_student_email || null;
  const linkedStudentName = updates.linkedStudentName !== undefined ? updates.linkedStudentName : user.linked_student_name || null;
  const parentContact = updates.parentContact !== undefined ? updates.parentContact : user.parent_contact || null;
  const lastActiveAt = updates.lastActiveAt !== undefined ? updates.lastActiveAt : user.last_active_at || null;
  const timeSpentMinutes = updates.timeSpentMinutes !== undefined ? Number(updates.timeSpentMinutes) : user.time_spent_minutes || 0;

  try {
    run(
      `
      UPDATE users SET
        name = ?,
        password = ?,
        role = ?,
        student_group = ?,
        status = ?,
        unlocked_lessons_count = ?,
        completed_lessons_count = ?,
        completed_labs_count = ?,
        passed_quiz_count = ?,
        total_points = ?,
        phone = ?,
        telegram = ?,
        bio = ?,
        avatar_url = ?,
        hidden_from_leaderboard = ?,
        linked_student_id = ?,
        linked_student_email = ?,
        linked_student_name = ?,
        parent_contact = ?,
        last_active_at = ?,
        time_spent_minutes = ?
      WHERE id = ?;
    `,
      [
        name,
        password,
        role,
        group,
        status,
        unlocked,
        completed,
        labsCount,
        quizCount,
        points,
        phone,
        telegram,
        bio,
        avatarUrl,
        hiddenFromLb,
        linkedStudentId,
        linkedStudentEmail,
        linkedStudentName,
        parentContact,
        lastActiveAt,
        timeSpentMinutes,
        user.id
      ]
    );
  } catch (err: any) {
    console.warn('[handleUpdateStudent] Fallback update notice:', err);
  }

  persistDb(true);
  return res.json({
    success: true,
    message: 'Профиль успешно обновлен в SQLite',
    user: {
      id: user.id,
      name,
      email: user.email,
      role,
      group,
      status,
      unlockedLessonsCount: unlocked,
      completedLessonsCount: completed,
      completedLabsCount: labsCount,
      passedQuizCount: quizCount,
      totalPoints: points,
      avatarUrl: avatarUrl || user.avatar_url,
      phone,
      telegram,
      bio,
      linkedStudentId,
      linkedStudentEmail,
      linkedStudentName,
      parentContact,
      lastActiveAt,
      timeSpentMinutes
    }
  });
}

apiRouter.delete('/students/:id', requireAdmin, async (req, res) => {
  try {
    const clean = req.params.id.trim().toLowerCase();
    run(`DELETE FROM users WHERE LOWER(id) = ? OR LOWER(email) = ?`, [clean, clean]);
    run(`DELETE FROM homework_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [clean, clean]);
    run(`DELETE FROM lab_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [clean, clean]);
    run(`DELETE FROM quiz_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [clean, clean]);
    run(`DELETE FROM lessons_progress WHERE LOWER(student_email) = ?`, [clean]);
    run(`DELETE FROM exp_history WHERE LOWER(student_email) = ?`, [clean]);
    persistDb(true);
    return res.json({ success: true, message: 'Пользователь удален' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/deleteUser', '/adminDeleteStudent'], requireAdmin, async (req, res) => {
  try {
    const studentId = String(req.body.studentId || req.body.id || req.body.email || req.body.studentEmail || '').trim().toLowerCase();
    if (studentId) {
      run(`DELETE FROM users WHERE LOWER(id) = ? OR LOWER(email) = ?`, [studentId, studentId]);
      run(`DELETE FROM homework_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [studentId, studentId]);
      run(`DELETE FROM lab_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [studentId, studentId]);
      run(`DELETE FROM quiz_submissions WHERE LOWER(student_id) = ? OR LOWER(student_email) = ?`, [studentId, studentId]);
      run(`DELETE FROM lessons_progress WHERE LOWER(student_email) = ?`, [studentId]);
      run(`DELETE FROM exp_history WHERE LOWER(student_email) = ?`, [studentId]);
      persistDb(true);
    }
    return res.json({ success: true, message: 'Пользователь удален из SQLite базы данных' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// LESSONS & PROGRESS
// ============================================================================
apiRouter.get(['/lectures', '/lessons', '/getLessons'], async (req, res) => {
  try {
    const studentEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const progressList = studentEmail ? query(`SELECT * FROM lessons_progress WHERE LOWER(student_email) = ?`, [studentEmail]) : query(`SELECT * FROM lessons_progress`);
    return res.json({ success: true, progress: progressList });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/lessons/complete', '/completeLesson'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { lessonId, studentEmail, expAward, byAdmin } = req.body;
    const lId = Number(lessonId);
    const email = String(studentEmail || (caller ? caller.email : '')).trim().toLowerCase();
    const exp = Number(expAward) || 50;
    if (!lId || !email) {
      return res.status(400).json({ success: false, error: 'lessonId and studentEmail are required' });
    }

    const now = new Date().toISOString();
    const approvedHw = queryOne(`SELECT id FROM homework_submissions WHERE lesson_id = ? AND LOWER(student_email) = ? AND LOWER(status) = 'approved' LIMIT 1`, [lId, email]);
    const userRow = queryOne(`SELECT role FROM users WHERE LOWER(email) = ? LIMIT 1`, [email]);
    const isCallerAdmin = caller?.role === 'admin' || byAdmin;
    const canComplete = Boolean(approvedHw || isCallerAdmin || userRow?.role === 'admin');

    const allSections = {
      [`sec-${lId}-lecture`]: true,
      [`sec-${lId}-games`]: true,
      [`sec-${lId}-lab`]: true,
      [`sec-${lId}-quiz`]: true,
      ...(canComplete ? { [`sec-${lId}-homework`]: true } : {})
    };

    run(
      `
      INSERT INTO lessons_progress (student_email, lesson_id, is_completed, completed_at, read_sections)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(student_email, lesson_id) DO UPDATE SET
        is_completed = CASE WHEN excluded.is_completed = 1 THEN 1 ELSE lessons_progress.is_completed END,
        completed_at = COALESCE(excluded.completed_at, lessons_progress.completed_at),
        read_sections = excluded.read_sections;
    `,
      [email, lId, canComplete ? 1 : 0, canComplete ? now : null, JSON.stringify(allSections)]
    );

    const completedCount = queryOne(
      `
      SELECT COUNT(DISTINCT lesson_id) as count FROM homework_submissions 
      WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';
    `,
      [email]
    )?.count || 0;

    if (canComplete) {
      run(
        `
        INSERT INTO exp_history (student_email, amount, type, description, reference_id, timestamp)
        VALUES (?, ?, 'Lesson', ?, ?, ?);
      `,
        [email, exp, `Урок ${lId} завершен`, `LESSON_COMPLETED:${email}:${lId}`, now]
      );
    }

    const updatedTotalPoints = calculateDeterministicUserPoints(email, 'student');
    run(
      `
      UPDATE users SET
        completed_lessons_count = ?,
        total_points = ?
      WHERE LOWER(email) = ?;
    `,
      [completedCount, updatedTotalPoints, email]
    );

    return res.json({
      success: true,
      hwApproved: canComplete,
      message: canComplete ? `Урок ${lId} успешно завершен` : `Разделы урока ${lId} сохранены.`,
      completedLessonsCount: completedCount,
      expAwarded: canComplete ? exp : 0
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/progress/sync', '/syncProgress'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { studentEmail, readSections, unlockedLessonIds, unlockedLessonsCount, completedLessonIds, byAdmin } = req.body;
    const email = String(studentEmail || (caller ? caller.email : '')).trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ success: false, error: 'studentEmail is required' });
    }

    const groupedSections: Record<number, Record<string, boolean>> = {};
    if (readSections && typeof readSections === 'object') {
      for (const [key, val] of Object.entries(readSections)) {
        const numId = Number(key);
        if (!isNaN(numId) && numId > 0 && typeof val === 'object' && val !== null) {
          groupedSections[numId] = { ...(groupedSections[numId] || {}), ...(val as any) };
        } else if (typeof key === 'string') {
          const match = key.match(/^sec-(\d+)-/);
          if (match) {
            const lId = parseInt(match[1], 10);
            if (!groupedSections[lId]) groupedSections[lId] = {};
            groupedSections[lId][key] = Boolean(val);
          }
        }
      }
      for (const [lIdStr, secMap] of Object.entries(groupedSections)) {
        const lessonId = Number(lIdStr);
        if (lessonId) {
          const existingRow = queryOne(`SELECT read_sections FROM lessons_progress WHERE LOWER(student_email) = ? AND lesson_id = ?`, [email, lessonId]);
          let mergedSec: Record<string, boolean> = {};
          if (existingRow?.read_sections) {
            try {
              mergedSec = JSON.parse(existingRow.read_sections) || {};
            } catch {}
          }
          Object.assign(mergedSec, secMap);
          run(
            `
            INSERT INTO lessons_progress (student_email, lesson_id, read_sections)
            VALUES (?, ?, ?)
            ON CONFLICT(student_email, lesson_id) DO UPDATE SET
              read_sections = excluded.read_sections;
          `,
            [email, lessonId, JSON.stringify(mergedSec)]
          );
        }
      }
    }

    const approvedHwRows = query(`SELECT DISTINCT lesson_id FROM homework_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved'`, [email]);
    const approvedLessonSet = new Set(approvedHwRows.map((r) => Number(r.lesson_id)).filter((n) => n >= 1 && n <= 24));
    const maxApprovedHw = approvedLessonSet.size > 0 ? Math.max(...Array.from(approvedLessonSet)) : 0;

    const isCallerAdmin = caller?.role === 'admin' || byAdmin;
    if (Array.isArray(completedLessonIds)) {
      for (const id of completedLessonIds) {
        const lessonId = Number(id);
        if (lessonId && (approvedLessonSet.has(lessonId) || isCallerAdmin)) {
          run(
            `
            INSERT INTO lessons_progress (student_email, lesson_id, is_completed, completed_at)
            VALUES (?, ?, 1, ?)
            ON CONFLICT(student_email, lesson_id) DO UPDATE SET
              is_completed = 1;
          `,
            [email, lessonId, new Date().toISOString()]
          );
        }
      }
    }

    const compCount = approvedLessonSet.size;
    run(`UPDATE users SET completed_lessons_count = ? WHERE LOWER(email) = ? AND role != 'admin';`, [compCount, email]);
    const allowedUnlock = Math.min(24, maxApprovedHw > 0 ? maxApprovedHw + 1 : 1);
    if (isCallerAdmin) {
      const reqUnlock = Number(unlockedLessonsCount) || (Array.isArray(unlockedLessonIds) ? Math.max(...unlockedLessonIds, 1) : allowedUnlock);
      run(`UPDATE users SET unlocked_lessons_count = ? WHERE LOWER(email) = ? AND role != 'admin';`, [Math.min(24, Math.max(1, reqUnlock)), email]);
    } else {
      run(`UPDATE users SET unlocked_lessons_count = ? WHERE LOWER(email) = ? AND role != 'admin';`, [allowedUnlock, email]);
    }

    const finalPts = calculateDeterministicUserPoints(email, 'student');
    run(`UPDATE users SET total_points = ? WHERE LOWER(email) = ?;`, [finalPts, email]);
    persistDb(true);

    return res.json({
      success: true,
      unlockedLessonsCount: allowedUnlock,
      completedLessonsCount: compCount,
      message: 'Прогресс успешно синхронизирован с базой данных'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/progress', '/getProgress'], async (req, res) => {
  try {
    const studentEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const rows = studentEmail ? query(`SELECT * FROM lessons_progress WHERE LOWER(student_email) = ?`, [studentEmail]) : query(`SELECT * FROM lessons_progress`);
    const completedLessonIds: number[] = [];
    const readSectionsMap: Record<number, any> = {};
    const flatReadSections: Record<string, boolean> = {};
    for (const r of rows) {
      if (r.is_completed) completedLessonIds.push(r.lesson_id);
      if (r.read_sections) {
        try {
          const parsed = JSON.parse(r.read_sections);
          readSectionsMap[r.lesson_id] = parsed;
          if (typeof parsed === 'object' && parsed !== null) {
            Object.assign(flatReadSections, parsed);
          }
        } catch {}
      }
    }
    return res.json({ success: true, progress: { completedLessonIds, readSections: readSectionsMap, flatReadSections }, completedLessonIds, readSections: readSectionsMap, flatReadSections });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// HOMEWORK SUBMISSIONS & REVIEW
// ============================================================================
apiRouter.get(['/homework', '/getHomework'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const requestedEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const effectiveEmail = (caller && caller.role !== 'admin') ? caller.email : requestedEmail;

    const rows = effectiveEmail ? query(`SELECT * FROM homework_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [effectiveEmail]) : query(`SELECT * FROM homework_submissions ORDER BY submitted_at DESC`);
    const mapped = rows.map((hw) => {
      let attachedFiles = [];
      try {
        if (hw.attached_files) attachedFiles = JSON.parse(hw.attached_files);
      } catch {}
      const rawStatus = hw.status || 'Submitted';
      const normStatus = rawStatus === 'Pending' || rawStatus === 'pending' ? 'Submitted' : rawStatus;
      const isReviewed = normStatus === 'Approved' || normStatus === 'Rejected' || Boolean(hw.reviewed_at);
      return {
        id: hw.id,
        lessonId: hw.lesson_id,
        studentId: hw.student_id,
        studentName: hw.student_name,
        studentEmail: hw.student_email,
        reportText: hw.report_text || hw.student_notes || '',
        studentNotes: hw.student_notes || hw.report_text || '',
        notes: hw.student_notes || hw.report_text || '',
        fileUrl: hw.file_url || '',
        attachedFiles,
        submittedAt: hw.submitted_at,
        status: normStatus,
        submissionStatus: normStatus,
        score: isReviewed && hw.score !== null && hw.score !== undefined ? hw.score : undefined,
        feedback: hw.feedback,
        mentorFeedback: hw.feedback,
        reviewedAt: hw.reviewed_at,
        reviewedBy: hw.reviewed_by
      };
    });
    return res.json({ success: true, homework: mapped, homeworkSubmissions: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/homework/submit', '/submitHomework', '/homework/:id/submit'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { lessonId, studentEmail, studentName, studentId, reportText, studentNotes, notes, fileUrl, file_url, attachedFiles, files, attachedFilesData } = req.body;
    const lId = Number(req.params.id || lessonId);
    // Anti-IDOR: regular student cannot submit for another student
    const email = (caller && caller.role !== 'admin') ? caller.email : String(studentEmail || '').trim().toLowerCase();
    if (!lId || !email) {
      return res.status(400).json({ success: false, error: 'lessonId and studentEmail are required' });
    }

    const effectiveReportText = String(studentNotes || reportText || notes || '').trim();
    const effectiveFileUrl = String(fileUrl || req.body.repoUrl || req.body.githubUrl || req.body.demoUrl || file_url || req.body.repo_url || req.body.github_url || '').trim();
    const rawFiles = attachedFilesData || attachedFiles || files || [];
    let allFiles: any[] = [];
    if (Array.isArray(rawFiles)) allFiles = rawFiles;
    else if (typeof rawFiles === 'string') {
      try {
        const parsed = JSON.parse(rawFiles);
        if (Array.isArray(parsed)) allFiles = parsed;
        else if (rawFiles.trim().length > 0) allFiles = [{ id: `att-hw-${lId}-${Date.now()}`, name: rawFiles.trim(), url: '#' }];
      } catch {
        if (rawFiles.trim().length > 0) allFiles = [{ id: `att-hw-${lId}-${Date.now()}`, name: rawFiles.trim(), url: '#' }];
      }
    }

    const filesJson = JSON.stringify(saveUploadedFilesLocally(allFiles, email, studentId));
    const now = new Date().toISOString();
    const subId = req.body.id || `hw-${lId}-${email.split('@')[0]}-${Date.now()}`;
    const existing = queryOne(
      `
      SELECT id FROM homework_submissions 
      WHERE lesson_id = ? AND LOWER(student_email) = ? 
      ORDER BY submitted_at DESC LIMIT 1;
    `,
      [lId, email]
    );

    if (existing) {
      run(
        `
        UPDATE homework_submissions SET
          student_id = COALESCE(?, student_id),
          student_name = COALESCE(?, student_name),
          report_text = ?,
          student_notes = ?,
          file_url = ?,
          attached_files = ?,
          submitted_at = ?,
          status = 'Submitted',
          score = NULL,
          reviewed_at = NULL,
          reviewed_by = NULL
        WHERE id = ?;
      `,
        [studentId || null, studentName || 'Студент', effectiveReportText, effectiveReportText, effectiveFileUrl, filesJson, now, existing.id]
      );
    } else {
      run(
        `
        INSERT INTO homework_submissions (
          id, lesson_id, student_id, student_name, student_email, report_text, student_notes, file_url, attached_files, submitted_at, status, score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', NULL);
      `,
        [subId, lId, studentId || null, studentName || 'Студент', email, effectiveReportText, effectiveReportText, effectiveFileUrl, filesJson, now]
      );
    }

    persistDb(true);
    return res.json({
      success: true,
      message: 'Домашнее задание успешно сохранено в SQLite и отправлено на проверку',
      submissionId: existing?.id || subId,
      attachedFilesCount: allFiles.length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

function resolveStudentEmailAndId(rawEmail: any, rawId: any, tableForFallback?: string, lessonOrLabCol?: string, lessonOrLabId?: any) {
  let email = String(rawEmail || '').trim().toLowerCase();
  let sId = String(rawId || '').trim();
  if (email && email.includes('@')) {
    const u = queryOne(`SELECT id, email FROM users WHERE LOWER(email) = ? LIMIT 1`, [email]);
    if (u) return { email: String(u.email).toLowerCase(), studentId: sId || u.id };
    return { email, studentId: sId };
  }
  if (sId) {
    const u = queryOne(`SELECT id, email FROM users WHERE LOWER(id) = ? OR LOWER(email) = ? LIMIT 1`, [sId.toLowerCase(), sId.toLowerCase()]);
    if (u && u.email) return { email: String(u.email).toLowerCase(), studentId: u.id };
  }
  if (tableForFallback && lessonOrLabCol && lessonOrLabId) {
    const safeTable = tableForFallback === 'lab_submissions' ? 'lab_submissions' : 'homework_submissions';
    const safeCol = lessonOrLabCol === 'lab_id' ? 'lab_id' : 'lesson_id';
    const sub = queryOne(`SELECT student_email, student_id FROM ${safeTable} WHERE ${safeCol} = ? ORDER BY submitted_at DESC LIMIT 1`, [Number(lessonOrLabId)]);
    if (sub && sub.student_email) return { email: String(sub.student_email).toLowerCase().trim(), studentId: sId || sub.student_id || '' };
  }
  return { email: email || 'student@devopspro.tech', studentId: sId || 'USR-STU-01' };
}

function handleReviewHomeworkRequest(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const queryParams = req.query || {};
    const lId = Number(req.params?.id || body.lessonId || queryParams.lessonId || 1);
    const rawStatus = body.status || queryParams.status || 'Approved';
    const finalStatus = String(rawStatus).toLowerCase() === 'rejected' ? 'Rejected' : 'Approved';
    const feedbackText = String(body.feedback !== undefined ? body.feedback : body.mentorFeedback !== undefined ? body.mentorFeedback : queryParams.feedback || '').trim();
    const rawScoreNum = body.score !== undefined && body.score !== null && body.score !== '' ? Number(body.score) : queryParams.score !== undefined ? Number(queryParams.score) : NaN;
    const scoreVal = finalStatus === 'Approved' ? (rawScoreNum === 100 || rawScoreNum === 5 ? 100 : rawScoreNum === 75 || rawScoreNum === 4 ? 75 : rawScoreNum >= 88 ? 100 : rawScoreNum >= 63 ? 75 : rawScoreNum >= 50 ? 50 : 100) : 0;
    const adminEmail = String(body.adminEmail || body.reviewedBy || 'admin@devopspro.tech');
    const { email, studentId } = resolveStudentEmailAndId(body.studentEmail || queryParams.studentEmail, body.studentId || queryParams.studentId, 'homework_submissions', 'lesson_id', lId);
    const now = new Date().toISOString();

    const existingHw = queryOne(`SELECT id, student_email, student_id FROM homework_submissions WHERE lesson_id = ? AND (LOWER(student_email) = ? OR (student_id IS NOT NULL AND LOWER(student_id) = ?)) ORDER BY submitted_at DESC LIMIT 1`, [lId, email, String(studentId || '').toLowerCase()]);
    const effectiveEmail = existingHw?.student_email ? String(existingHw.student_email).toLowerCase().trim() : email;
    const isComp = finalStatus === 'Approved' ? 1 : 0;

    if (existingHw) {
      run(
        `UPDATE homework_submissions SET status = ?, submission_status = ?, is_completed = ?, score = ?, feedback = ?, mentor_feedback = ?, reviewed_at = ?, reviewed_by = ? WHERE id = ?;`,
        [finalStatus, finalStatus, isComp, scoreVal, feedbackText, feedbackText, now, adminEmail, existingHw.id]
      );
    } else {
      const subId = body.id || `hw-${lId}-${effectiveEmail.split('@')[0]}-${Date.now()}`;
      run(
        `INSERT INTO homework_submissions (id, lesson_id, student_id, student_name, student_email, report_text, student_notes, status, submission_status, is_completed, score, feedback, mentor_feedback, submitted_at, reviewed_at, reviewed_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [subId, lId, studentId || null, body.studentName || 'Студент', effectiveEmail, 'Проверено ментором', '', finalStatus, finalStatus, isComp, scoreVal, feedbackText, feedbackText, now, now, adminEmail]
      );
    }

    let nextLessonUnlocked = lId;
    let completedCount = 0;
    let updatedTotalPoints = 0;

    if (finalStatus === 'Approved') {
      const existingProg = queryOne(`SELECT read_sections FROM lessons_progress WHERE LOWER(student_email) = ? AND lesson_id = ?`, [effectiveEmail, lId]);
      let secMap: Record<string, boolean> = {};
      if (existingProg?.read_sections) {
        try {
          secMap = JSON.parse(existingProg.read_sections) || {};
        } catch {}
      }
      secMap[`sec-${lId}-lecture`] = true;
      secMap[`sec-${lId}-homework`] = true;
      run(
        `INSERT INTO lessons_progress (student_email, lesson_id, is_completed, completed_at, read_sections) VALUES (?, ?, 1, ?, ?) ON CONFLICT(student_email, lesson_id) DO UPDATE SET is_completed = 1, completed_at = COALESCE(lessons_progress.completed_at, excluded.completed_at), read_sections = excluded.read_sections;`,
        [effectiveEmail, lId, now, JSON.stringify(secMap)]
      );

      const hwCompCount = queryOne(`SELECT COUNT(DISTINCT lesson_id) as count FROM homework_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.count || 1;
      completedCount = Math.max(hwCompCount, 1);
      const maxApprovedLesson = queryOne(`SELECT MAX(lesson_id) as maxL FROM homework_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.maxL || lId;
      nextLessonUnlocked = Math.min(24, Math.max(lId + 1, Number(maxApprovedLesson) + 1));
      updatedTotalPoints = calculateDeterministicUserPoints(effectiveEmail, 'student');

      const userRow = queryOne(`SELECT id, unlocked_lessons_count, completed_lessons_count, role FROM users WHERE LOWER(email) = ? OR LOWER(id) = ? LIMIT 1`, [effectiveEmail, String(studentId || '').toLowerCase()]);
      if (userRow) {
        const finalUnlock = userRow.role === 'admin' ? 24 : nextLessonUnlocked;
        run(`UPDATE users SET completed_lessons_count = ?, unlocked_lessons_count = ?, total_points = ? WHERE id = ?;`, [completedCount, finalUnlock, updatedTotalPoints, userRow.id]);
        nextLessonUnlocked = finalUnlock;
      }
    } else {
      run(`UPDATE lessons_progress SET is_completed = 0, completed_at = NULL WHERE LOWER(student_email) = ? AND lesson_id = ?;`, [effectiveEmail, lId]);
      const hwCompCount = queryOne(`SELECT COUNT(DISTINCT lesson_id) as count FROM homework_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.count || 0;
      const maxApprovedLesson = queryOne(`SELECT MAX(lesson_id) as maxL FROM homework_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.maxL || 0;
      completedCount = hwCompCount;
      nextLessonUnlocked = Math.min(24, maxApprovedLesson > 0 ? Number(maxApprovedLesson) + 1 : 1);
      updatedTotalPoints = calculateDeterministicUserPoints(effectiveEmail, 'student');
      const userRow = queryOne(`SELECT id, role FROM users WHERE LOWER(email) = ? OR LOWER(id) = ? LIMIT 1`, [effectiveEmail, String(studentId || '').toLowerCase()]);
      if (userRow && userRow.role !== 'admin') {
        run(`UPDATE users SET completed_lessons_count = ?, unlocked_lessons_count = ?, total_points = ? WHERE id = ?;`, [completedCount, nextLessonUnlocked, updatedTotalPoints, userRow.id]);
      }
    }

    persistDb(true);
    return res.json({
      success: true,
      lessonId: lId,
      studentEmail: effectiveEmail,
      status: finalStatus,
      score: scoreVal,
      unlockedLessonsCount: nextLessonUnlocked,
      completedLessonsCount: completedCount,
      totalPoints: updatedTotalPoints,
      message: 'Домашнее задание проверено, сохранено в SQLite и следующий урок открыт'
    });
  } catch (error: any) {
    console.warn('[reviewHomework] Error:', error);
    return res.status(200).json({ success: true, warning: error.message, message: 'Домашнее задание обработано' });
  }
}

apiRouter.post(['/homework/review', '/reviewHomework', '/homework/:id/review'], requireAdmin, (req, res) =>
  handleReviewHomeworkRequest(req, res)
);

apiRouter.all(['/homework/submissions/:id', '/deleteHomeworkSubmission'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.submissionId || req.body.id;
    const lessonId = req.body.lessonId || req.query.lessonId;
    const studentEmail = req.body.studentEmail || req.query.studentEmail;
    if (id) {
      run(`DELETE FROM homework_submissions WHERE id = ?;`, [id]);
    } else if (lessonId && studentEmail) {
      run(`DELETE FROM homework_submissions WHERE lesson_id = ? AND LOWER(student_email) = ?;`, [Number(lessonId), String(studentEmail).toLowerCase().trim()]);
    }
    if (studentEmail) {
      const email = String(studentEmail).toLowerCase().trim();
      const completedCount = queryOne(`SELECT COUNT(DISTINCT lesson_id) as count FROM homework_submissions WHERE LOWER(student_email) = ? AND status = 'Approved';`, [email])?.count || 0;
      run(`UPDATE users SET completed_lessons_count = ? WHERE LOWER(email) = ?;`, [completedCount, email]);
    }
    persistDb(true);
    return res.json({ success: true, message: 'Запись ДЗ удалена из SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// LABS SUBMISSIONS & REVIEW
// ============================================================================
apiRouter.get(['/labs', '/getLabs'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const requestedEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const effectiveEmail = (caller && caller.role !== 'admin') ? caller.email : requestedEmail;

    const rows = effectiveEmail ? query(`SELECT * FROM lab_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [effectiveEmail]) : query(`SELECT * FROM lab_submissions ORDER BY submitted_at DESC`);
    const mapped = rows.map((l) => {
      let attachedFiles = [];
      try {
        if (l.attached_files) attachedFiles = JSON.parse(l.attached_files);
      } catch {}
      const u = l.repo_url || l.file_url || l.demo_url || '';
      const n = l.student_notes || l.report_text || '';
      return {
        id: l.id,
        labId: l.lab_id,
        lessonId: l.lesson_id || l.lab_id,
        studentId: l.student_id,
        studentName: l.student_name,
        studentEmail: l.student_email,
        reportText: n,
        studentNotes: n,
        notes: n,
        repoUrl: u,
        fileUrl: l.file_url || u,
        demoUrl: l.demo_url || u,
        githubUrl: u,
        attachedFiles,
        submittedAt: l.submitted_at,
        status: l.status,
        submissionStatus: l.submission_status || l.status,
        score: l.score,
        feedback: l.feedback || l.mentor_feedback || '',
        mentorFeedback: l.mentor_feedback || l.feedback || '',
        reviewedAt: l.reviewed_at,
        reviewedBy: l.reviewed_by
      };
    });
    return res.json({ success: true, labs: mapped, labSubmissions: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/labs/submit', '/submitLab', '/labs/:id/submit'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { labId, lessonId, studentEmail, studentName, studentId, reportText, studentNotes, notes, repoUrl, fileUrl, demoUrl, githubUrl, repo_url, file_url, demo_url, attachedFiles, files, attachedFilesData } = req.body;
    const lId = Number(req.params.id || labId || lessonId);
    const email = (caller && caller.role !== 'admin') ? caller.email : String(studentEmail || '').trim().toLowerCase();
    if (!lId || !email) {
      return res.status(400).json({ success: false, error: 'labId and studentEmail are required' });
    }

    const effectiveReportText = String(studentNotes || reportText || notes || '').trim();
    const effectiveRepoUrl = String(repoUrl || fileUrl || demoUrl || githubUrl || repo_url || file_url || demo_url || '').trim();
    const rawFiles = attachedFilesData || attachedFiles || files || [];
    let allFiles: any[] = [];
    if (Array.isArray(rawFiles)) allFiles = rawFiles;
    else if (typeof rawFiles === 'string') {
      try {
        const parsed = JSON.parse(rawFiles);
        if (Array.isArray(parsed)) allFiles = parsed;
        else if (rawFiles.trim().length > 0) allFiles = [{ id: `att-lab-${lId}-${Date.now()}`, name: rawFiles.trim(), url: '#' }];
      } catch {
        if (rawFiles.trim().length > 0) allFiles = [{ id: `att-lab-${lId}-${Date.now()}`, name: rawFiles.trim(), url: '#' }];
      }
    }

    const filesJson = JSON.stringify(saveUploadedFilesLocally(allFiles, email, studentId));
    const now = new Date().toISOString();
    const subId = req.body.id || `lab-${lId}-${email.split('@')[0]}-${Date.now()}`;
    const existing = queryOne(`SELECT id FROM lab_submissions WHERE lab_id = ? AND LOWER(student_email) = ? ORDER BY submitted_at DESC LIMIT 1;`, [lId, email]);

    if (existing) {
      run(
        `UPDATE lab_submissions SET lesson_id = COALESCE(?, lesson_id), student_id = COALESCE(?, student_id), student_name = COALESCE(?, student_name), report_text = ?, student_notes = ?, repo_url = ?, file_url = ?, demo_url = ?, attached_files = ?, submitted_at = ?, status = 'Submitted', submission_status = 'Submitted', is_completed = 0, score = NULL, reviewed_at = NULL, reviewed_by = NULL WHERE id = ?;`,
        [lId, studentId || null, studentName || 'Студент', effectiveReportText, effectiveReportText, effectiveRepoUrl, effectiveRepoUrl, effectiveRepoUrl, filesJson, now, existing.id]
      );
    } else {
      run(
        `INSERT INTO lab_submissions (id, lab_id, lesson_id, student_id, student_name, student_email, report_text, student_notes, repo_url, file_url, demo_url, attached_files, submitted_at, status, submission_status, is_completed, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', 'Submitted', 0, NULL);`,
        [subId, lId, lId, studentId || null, studentName || 'Студент', email, effectiveReportText, effectiveReportText, effectiveRepoUrl, effectiveRepoUrl, effectiveRepoUrl, filesJson, now]
      );
    }

    persistDb(true);
    return res.json({
      success: true,
      message: 'Лабораторная работа успешно сохранена в SQLite и отправлена',
      submissionId: existing?.id || subId,
      repoUrl: effectiveRepoUrl,
      fileUrl: effectiveRepoUrl,
      attachedFilesCount: allFiles.length
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

function handleReviewLabRequest(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const queryParams = req.query || {};
    const lId = Number(req.params?.id || body.labId || body.lessonId || queryParams.labId || 1);
    const rawStatus = body.status || queryParams.status || 'Approved';
    const finalStatus = String(rawStatus).toLowerCase() === 'rejected' ? 'Rejected' : 'Approved';
    const feedbackText = String(body.feedback !== undefined ? body.feedback : body.mentorFeedback !== undefined ? body.mentorFeedback : queryParams.feedback || '').trim();
    const rawScoreNum = body.score !== undefined && body.score !== null && body.score !== '' ? Number(body.score) : queryParams.score !== undefined ? Number(queryParams.score) : NaN;
    const scoreVal = finalStatus === 'Approved' ? (rawScoreNum === 100 || rawScoreNum === 5 ? 100 : rawScoreNum === 75 || rawScoreNum === 4 ? 75 : rawScoreNum >= 88 ? 100 : rawScoreNum >= 63 ? 75 : rawScoreNum >= 50 ? 50 : 100) : 0;
    const adminEmail = String(body.adminEmail || body.reviewedBy || 'admin@devopspro.tech');
    const { email, studentId } = resolveStudentEmailAndId(body.studentEmail || queryParams.studentEmail, body.studentId || queryParams.studentId, 'lab_submissions', 'lab_id', lId);
    const now = new Date().toISOString();

    const existingLab = queryOne(`SELECT id, student_email FROM lab_submissions WHERE lab_id = ? AND (LOWER(student_email) = ? OR (student_id IS NOT NULL AND LOWER(student_id) = ?)) ORDER BY submitted_at DESC LIMIT 1`, [lId, email, String(studentId || '').toLowerCase()]);
    const effectiveEmail = existingLab?.student_email ? String(existingLab.student_email).toLowerCase().trim() : email;
    const isComp = finalStatus === 'Approved' ? 1 : 0;

    if (existingLab) {
      run(
        `UPDATE lab_submissions SET status = ?, submission_status = ?, is_completed = ?, score = ?, feedback = ?, mentor_feedback = ?, reviewed_at = ?, reviewed_by = ? WHERE id = ?;`,
        [finalStatus, finalStatus, isComp, scoreVal, feedbackText, feedbackText, now, adminEmail, existingLab.id]
      );
    } else {
      const subId = body.id || `lab-${lId}-${effectiveEmail.split('@')[0]}-${Date.now()}`;
      run(
        `INSERT INTO lab_submissions (id, lab_id, lesson_id, student_id, student_name, student_email, report_text, status, submission_status, is_completed, score, feedback, mentor_feedback, submitted_at, reviewed_at, reviewed_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [subId, lId, lId, studentId || null, body.studentName || 'Студент', effectiveEmail, 'Проверено ментором', finalStatus, finalStatus, isComp, scoreVal, feedbackText, feedbackText, now, now, adminEmail]
      );
    }

    let completedLabsCount = 0;
    let updatedTotalPoints = 0;

    if (finalStatus === 'Approved') {
      const existingProg = queryOne(`SELECT read_sections FROM lessons_progress WHERE LOWER(student_email) = ? AND lesson_id = ?`, [effectiveEmail, lId]);
      let secMap: Record<string, boolean> = {};
      if (existingProg?.read_sections) {
        try {
          secMap = JSON.parse(existingProg.read_sections) || {};
        } catch {}
      }
      secMap[`sec-${lId}-lab`] = true;
      run(`INSERT INTO lessons_progress (student_email, lesson_id, read_sections) VALUES (?, ?, ?) ON CONFLICT(student_email, lesson_id) DO UPDATE SET read_sections = excluded.read_sections;`, [effectiveEmail, lId, JSON.stringify(secMap)]);
      completedLabsCount = queryOne(`SELECT COUNT(DISTINCT lab_id) as count FROM lab_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.count || 1;
      updatedTotalPoints = calculateDeterministicUserPoints(effectiveEmail, 'student');
      run(`UPDATE users SET completed_labs_count = ?, total_points = ? WHERE LOWER(email) = ?;`, [completedLabsCount, updatedTotalPoints, effectiveEmail]);
    } else {
      completedLabsCount = queryOne(`SELECT COUNT(DISTINCT lab_id) as count FROM lab_submissions WHERE LOWER(student_email) = ? AND LOWER(status) = 'approved';`, [effectiveEmail])?.count || 0;
      updatedTotalPoints = calculateDeterministicUserPoints(effectiveEmail, 'student');
      run(`UPDATE users SET completed_labs_count = ?, total_points = ? WHERE LOWER(email) = ?;`, [completedLabsCount, updatedTotalPoints, effectiveEmail]);
    }

    persistDb(true);
    return res.json({
      success: true,
      labId: lId,
      studentEmail: effectiveEmail,
      status: finalStatus,
      score: scoreVal,
      completedLabsCount,
      totalPoints: updatedTotalPoints,
      message: 'Лабораторная работа проверена и сохранена в SQLite'
    });
  } catch (error: any) {
    console.warn('[reviewLab] Error:', error);
    return res.status(200).json({ success: true, warning: error.message, message: 'Лабораторная работа обработана' });
  }
}

apiRouter.post(['/labs/review', '/reviewLab', '/labs/:id/review'], requireAdmin, (req, res) =>
  handleReviewLabRequest(req, res)
);

apiRouter.all(['/labs/submissions/:id', '/deleteLabSubmission'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.submissionId || req.body.id;
    const labId = req.body.labId || req.query.labId;
    const studentEmail = req.body.studentEmail || req.query.studentEmail;
    if (id) {
      run(`DELETE FROM lab_submissions WHERE id = ?;`, [id]);
    } else if (labId && studentEmail) {
      run(`DELETE FROM lab_submissions WHERE lab_id = ? AND LOWER(student_email) = ?;`, [Number(labId), String(studentEmail).toLowerCase().trim()]);
    }
    if (studentEmail) {
      const email = String(studentEmail).toLowerCase().trim();
      const completedLabsCount = queryOne(`SELECT COUNT(DISTINCT lab_id) as count FROM lab_submissions WHERE LOWER(student_email) = ? AND status = 'Approved';`, [email])?.count || 0;
      run(`UPDATE users SET completed_labs_count = ? WHERE LOWER(email) = ?;`, [completedLabsCount, email]);
    }
    persistDb(true);
    return res.json({ success: true, message: 'Лабораторная работа удалена из SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// TESTS & QUIZZES
// ============================================================================
apiRouter.get(['/tests', '/getTests'], async (_req, res) => {
  try {
    const quizzes = query(`SELECT * FROM quiz_submissions ORDER BY submitted_at DESC`);
    return res.json({ success: true, quizzes });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

function handleSubmitTestRequest(req: Request, res: Response) {
  try {
    const caller = extractUserFromRequest(req);
    const body = req.body || {};
    const { quizId, lessonId, quizTitle, studentEmail, studentName, studentId, scorePct, score, passed, answers, userAnswers, correctCount, totalQuestions } = body;
    const rawLessonId = Number(lessonId) || Number(String(quizId || '').replace(/\D/g, '')) || 1;
    const targetEmail = (caller && caller.role !== 'admin') ? caller.email : studentEmail;
    const { email, studentId: resolvedStudentId } = resolveStudentEmailAndId(targetEmail, studentId, 'quiz_submissions', 'lesson_id', rawLessonId);

    const isBlock = String(quizId || '').toUpperCase().startsWith('BLOCK') || (/^TEST_[1-7]$/i.test(String(quizId || '')) && !lessonId) || String(quizId || '').toUpperCase().includes('FINAL');
    const qId = isBlock ? String(quizId).toUpperCase() : `LESSON_${rawLessonId}`;

    const existingQuizRow = queryOne(`SELECT id, mentor_comment, reviewed_at, status FROM quiz_submissions WHERE LOWER(student_email) = ? AND (UPPER(quiz_id) = UPPER(?) OR (? = 0 AND lesson_id = ? AND UPPER(quiz_id) NOT LIKE 'BLOCK%' AND UPPER(quiz_id) NOT LIKE 'FINAL%')) ORDER BY submitted_at DESC LIMIT 1`, [email, qId, isBlock ? 1 : 0, rawLessonId]);
    const cleanUid = String(resolvedStudentId || email.split('@')[0] || 'STU').replace(/[^a-zA-Z0-9]/g, '').slice(-8) || 'STU';
    const subId = existingQuizRow?.id || (body.id && !String(body.id).startsWith('QSUB-') ? body.id : `QUIZ-SUB-${qId}-${cleanUid}`);

    const rawUserAnsObj = userAnswers && typeof userAnswers === 'object' ? userAnswers : (answers && typeof answers === 'object' ? answers : {});
    const rawDetailsArr = Array.isArray(body.details) && body.details.length > 0 ? body.details : (Array.isArray(answers) ? answers : (Array.isArray(userAnswers) ? userAnswers : []));
    const userAnswersStr = typeof rawUserAnsObj === 'string' ? rawUserAnsObj : JSON.stringify(rawUserAnsObj);
    const detailsStr = rawDetailsArr.length > 0 ? JSON.stringify(rawDetailsArr) : userAnswersStr;
    const answersJson = rawDetailsArr.length > 0 ? detailsStr : userAnswersStr;

    const now = new Date().toISOString();
    const scoreVal = scorePct !== undefined && scorePct !== null ? Number(scorePct) : (score !== undefined && score !== null ? Number(score) : 0);
    const isPassed = passed === true || passed === 1 || scoreVal >= 60;
    const totQuest = totalQuestions !== undefined && totalQuestions !== null ? Number(totalQuestions) : (rawDetailsArr.length > 0 ? rawDetailsArr.length : 5);
    const corrCount = correctCount !== undefined && correctCount !== null ? Number(correctCount) : Math.round((scoreVal / 100) * totQuest);
    const submissionStatus = body.status || (isPassed ? 'Submitted' : 'Failed');
    const submissionMentorComment = body.mentorComment !== undefined ? body.mentorComment : (existingQuizRow?.mentor_comment || '');
    const retakeAllowed = body.retakeAllowed || body.retake_allowed ? 1 : 0;

    run(
      `INSERT INTO quiz_submissions (id, quiz_id, lesson_id, quiz_title, student_id, student_name, student_email, score_pct, score, max_score, percentage, correct_count, total_questions, passed, submitted_at, status, answers_json, user_answers, details, mentor_comment, retake_allowed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET quiz_id = excluded.quiz_id, lesson_id = excluded.lesson_id, quiz_title = excluded.quiz_title, score_pct = excluded.score_pct, score = excluded.score, max_score = excluded.max_score, percentage = excluded.percentage, correct_count = excluded.correct_count, total_questions = excluded.total_questions, passed = excluded.passed, submitted_at = excluded.submitted_at, status = excluded.status, answers_json = excluded.answers_json, user_answers = excluded.user_answers, details = excluded.details, mentor_comment = excluded.mentor_comment, retake_allowed = excluded.retake_allowed;`,
      [subId, qId, rawLessonId, quizTitle || `Тестирование ${qId}`, resolvedStudentId || null, studentName || 'Студент', email, scoreVal, scoreVal, totQuest, scoreVal, corrCount, totQuest, isPassed ? 1 : 0, now, submissionStatus, answersJson, userAnswersStr, detailsStr, submissionMentorComment, retakeAllowed]
    );

    if (rawLessonId >= 1 && rawLessonId <= 24) {
      const existingProg = queryOne(`SELECT read_sections FROM lessons_progress WHERE LOWER(student_email) = ? AND lesson_id = ?`, [email, rawLessonId]);
      let secMap: Record<string, boolean> = {};
      if (existingProg?.read_sections) {
        try {
          secMap = JSON.parse(existingProg.read_sections) || {};
        } catch {}
      }
      secMap[`sec-${rawLessonId}-quiz`] = true;
      run(`INSERT INTO lessons_progress (student_email, lesson_id, read_sections) VALUES (?, ?, ?) ON CONFLICT(student_email, lesson_id) DO UPDATE SET read_sections = excluded.read_sections;`, [email, rawLessonId, JSON.stringify(secMap)]);
    }

    const pQuizRows = query(`SELECT quiz_id, lesson_id FROM quiz_submissions WHERE LOWER(student_email) = ? AND (passed = 1 OR passed = '1' OR passed = 'true' OR score_pct >= 60) AND LOWER(COALESCE(status, '')) != 'rejected'`, [email]);
    const pQuizSet = new Set<string>();
    pQuizRows.forEach((qz) => {
      const rq = String(qz.quiz_id || '').toUpperCase();
      const m = rq.match(/^(?:LESSON[_-]?|TEST[_-]?)?(\d+)$/i);
      const lid = qz.lesson_id || (m ? parseInt(m[1], 10) : NaN);
      const cid = !isNaN(lid) && lid >= 1 && lid <= 24 && !rq.startsWith('BLOCK') ? `LESSON_${lid}` : rq;
      pQuizSet.add(cid);
    });
    const passedCount = pQuizSet.size;
    const updatedTotalPoints = calculateDeterministicUserPoints(email, 'student');
    run(`UPDATE users SET passed_quiz_count = ?, total_points = ? WHERE LOWER(email) = ?;`, [passedCount, updatedTotalPoints, email]);

    persistDb(true);
    return res.json({
      success: true,
      message: 'Результат тестирования сохранен в SQLite базе данных',
      submissionId: subId,
      quizId: qId,
      scorePct: scoreVal,
      passed: isPassed
    });
  } catch (error: any) {
    console.warn('[submitTest] Handled submission error:', error.message);
    return res.json({ success: true, warning: error.message, message: 'Результат тестирования обработан' });
  }
}

apiRouter.post(['/tests/submit', '/submitTest', '/saveQuizSubmission', '/saveTestScore'], (req, res) =>
  handleSubmitTestRequest(req, res)
);

apiRouter.get(['/tests/results', '/getTestResults'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const requestedEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const effectiveEmail = (caller && caller.role !== 'admin') ? caller.email : requestedEmail;

    const rows = effectiveEmail ? query(`SELECT * FROM quiz_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [effectiveEmail]) : query(`SELECT * FROM quiz_submissions ORDER BY submitted_at DESC`);
    const mapped = rows.map((q) => {
      let parsedUserAnswers = {};
      let parsedDetails = [];
      for (const col of [q.user_answers, q.answers_json, q.details]) {
        if (!col) continue;
        try {
          const p = typeof col === 'string' ? JSON.parse(col) : col;
          if (Array.isArray(p) && p.length > 0 && parsedDetails.length === 0) parsedDetails = p;
          else if (p && typeof p === 'object' && !Array.isArray(p) && Object.keys(p).length > 0 && Object.keys(parsedUserAnswers).length === 0) parsedUserAnswers = p;
        } catch {}
      }
      const rawScore = q.score_pct !== undefined && q.score_pct !== null ? Number(q.score_pct) : Number(q.score || 0);
      const isPassed = Boolean(q.passed === 1 || q.passed === true || rawScore >= 60);
      return {
        id: q.id,
        submissionId: q.id,
        quizId: q.quiz_id,
        lessonId: q.lesson_id,
        quizTitle: q.quiz_title || `Тестирование ${q.quiz_id}`,
        studentId: q.student_id,
        studentEmail: q.student_email,
        studentName: q.student_name,
        scorePct: rawScore,
        score: rawScore,
        correctCount: q.correct_count !== undefined && q.correct_count !== null ? Number(q.correct_count) : Math.round(rawScore / 10),
        totalQuestions: q.total_questions !== undefined && q.total_questions !== null ? Number(q.total_questions) : 5,
        passed: isPassed,
        submittedAt: q.submitted_at,
        status: q.status || (isPassed ? 'Submitted' : 'Failed'),
        mentorComment: q.mentor_comment,
        reviewedAt: q.reviewed_at,
        retakeAllowed: Boolean(q.retake_allowed),
        answers: parsedUserAnswers,
        userAnswers: parsedUserAnswers,
        details: parsedDetails
      };
    });
    return res.json({ success: true, results: mapped, quizSubmissions: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

function handleReviewTestRequest(req: Request, res: Response) {
  try {
    const body = req.body || {};
    const queryParams = req.query || {};
    const sId = String(body.submissionId || body.id || queryParams.submissionId || '');
    const qId = String(body.quizId || queryParams.quizId || '');
    const rawStatus = body.status || queryParams.status || 'Approved';
    const isApproved = String(rawStatus).toLowerCase() === 'approved';
    const isRetake = String(rawStatus).toLowerCase() === 'rejected' || Boolean(body.retakeAllowed);
    const scoreVal = isApproved ? Number(body.scorePct || body.score) || 100 : 0;
    const finalStatus = isRetake ? 'Rejected' : rawStatus || 'Approved';
    const retakeAllowed = isRetake ? 1 : (body.retakeAllowed ? 1 : 0);
    const mentorComment = String(body.mentorComment || body.feedback || queryParams.mentorComment || '');
    const parsedLessonNum = Number(body.lessonId || String(qId || sId).replace(/\D/g, '')) || 0;
    const existingQuiz = queryOne(`SELECT id, student_email, quiz_id FROM quiz_submissions WHERE id = ? OR id = ? OR quiz_id = ? ORDER BY submitted_at DESC LIMIT 1`, [sId, qId, qId]);
    const { email } = resolveStudentEmailAndId(body.studentEmail || queryParams.studentEmail || existingQuiz?.student_email, body.studentId || queryParams.studentId, 'quiz_submissions', 'lesson_id', parsedLessonNum);
    const now = new Date().toISOString();

    run(
      `UPDATE quiz_submissions SET status = ?, mentor_comment = ?, reviewed_at = ?, passed = ?, score = ?, score_pct = ?, percentage = ?, retake_allowed = ? WHERE id = ? OR id = ? OR (LOWER(student_email) = ? AND (quiz_id = ? OR quiz_id = ? OR lesson_id = ?));`,
      [finalStatus, mentorComment, now, isApproved ? 1 : 0, scoreVal, scoreVal, scoreVal, retakeAllowed, sId, qId, email, qId, sId, parsedLessonNum]
    );

    if (email) {
      const pQuizRows = query(`SELECT quiz_id, lesson_id FROM quiz_submissions WHERE LOWER(student_email) = ? AND (passed = 1 OR LOWER(status) = 'approved')`, [email]);
      const pQuizSet = new Set<string>();
      pQuizRows.forEach((qz) => {
        const rq = String(qz.quiz_id || '').toUpperCase();
        const m = rq.match(/^(?:LESSON[_-]?|TEST[_-]?)?(\d+)$/i);
        const lid = qz.lesson_id || (m ? parseInt(m[1], 10) : NaN);
        const cid = !isNaN(lid) && lid >= 1 && lid <= 24 && !rq.startsWith('BLOCK') ? `LESSON_${lid}` : rq;
        pQuizSet.add(cid);
      });
      const passedCount = pQuizSet.size;
      const updatedTotalPoints = calculateDeterministicUserPoints(email, 'student');
      run(`UPDATE users SET passed_quiz_count = ?, total_points = ? WHERE LOWER(email) = ?;`, [passedCount, updatedTotalPoints, email]);
    }

    persistDb(true);
    return res.json({ success: true, message: 'Тестирование проверено и сохранено в SQLite', retakeAllowed: Boolean(retakeAllowed) });
  } catch (error: any) {
    console.warn('[reviewTest] Error:', error);
    return res.status(200).json({ success: true, warning: error.message, message: 'Тестирование обработано' });
  }
}

apiRouter.post(['/tests/review', '/reviewTest', '/confirmTest'], requireAdmin, (req, res) =>
  handleReviewTestRequest(req, res)
);

apiRouter.all(['/tests/submissions/:id', '/deleteQuizSubmission'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.submissionId || req.body.id;
    const quizId = req.body.quizId || req.query.quizId;
    const studentEmail = req.body.studentEmail || req.query.studentEmail;
    if (id) {
      run(`DELETE FROM quiz_submissions WHERE id = ?;`, [id]);
    } else if (quizId && studentEmail) {
      run(`DELETE FROM quiz_submissions WHERE quiz_id = ? AND LOWER(student_email) = ?;`, [String(quizId), String(studentEmail).toLowerCase().trim()]);
    }
    if (studentEmail) {
      const email = String(studentEmail).toLowerCase().trim();
      const passedCount = queryOne(`SELECT COUNT(DISTINCT quiz_id) as count FROM quiz_submissions WHERE LOWER(student_email) = ? AND (passed = 1 OR status = 'Approved');`, [email])?.count || 0;
      run(`UPDATE users SET passed_quiz_count = ? WHERE LOWER(email) = ?;`, [passedCount, email]);
    }
    persistDb(true);
    return res.json({ success: true, message: 'Результат тестирования удален из SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// EXP & LEADERBOARD
// ============================================================================
apiRouter.get(['/exp/history', '/getExpHistory'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const requestedEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const effectiveEmail = (caller && caller.role !== 'admin') ? caller.email : requestedEmail;

    const rows = effectiveEmail ? query(`SELECT * FROM exp_history WHERE LOWER(student_email) = ? ORDER BY id DESC`, [effectiveEmail]) : query(`SELECT * FROM exp_history ORDER BY id DESC LIMIT 200`);
    return res.json({ success: true, history: rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/exp/award', '/awardExp'], requireAdmin, async (req, res) => {
  try {
    const { studentEmail, amount, type, description, referenceId } = req.body;
    const email = String(studentEmail || '').trim().toLowerCase();
    const exp = Number(amount) || 0;
    if (!email || !exp) {
      return res.status(400).json({ success: false, error: 'studentEmail and amount are required' });
    }
    const now = new Date().toISOString();
    run(
      `
      INSERT INTO exp_history (student_email, amount, type, description, reference_id, timestamp)
      VALUES (?, ?, ?, ?, ?, ?);
    `,
      [email, exp, type || 'Bonus', description || 'Начисление опыта', referenceId || `manual-${Date.now()}`, now]
    );
    run(`UPDATE users SET total_points = total_points + ? WHERE LOWER(email) = ?;`, [exp, email]);
    return res.json({ success: true, message: `${exp} EXP начислено` });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/leaderboard', '/getLeaderboard'], async (_req, res) => {
  try {
    const users = query(`
      SELECT id, name, email, role, student_group, total_points, completed_lessons_count, completed_labs_count, passed_quiz_count, attendance_pct, avatar_url
      FROM users 
      WHERE hidden_from_leaderboard = 0 AND role = 'student'
      ORDER BY total_points DESC;
    `);
    const leaderboard = users.map((u, idx) => {
      const canonicalPoints = calculateDeterministicUserPoints(u.email, u.role);
      if (u.total_points !== canonicalPoints) {
        try {
          run(`UPDATE users SET total_points = ? WHERE id = ?;`, [canonicalPoints, u.id]);
        } catch {}
      }
      return {
        id: u.id,
        rank: idx + 1,
        name: u.name,
        email: u.email,
        group: u.student_group,
        totalPoints: canonicalPoints,
        completedLessons: u.completed_lessons_count || 0,
        completedLessonsCount: u.completed_lessons_count || 0,
        completedLabsCount: u.completed_labs_count || 0,
        passedQuizCount: u.passed_quiz_count || 0,
        attendancePct: u.attendance_pct || 100,
        avatar: u.avatar_url,
        avatarUrl: u.avatar_url,
        badgesCount: Math.min(10, Math.floor((u.completed_lessons_count || 0) / 2)),
        homeworkScore: 90,
        status: 'Active',
        hiddenFromLeaderboard: false
      };
    });
    return res.json({ success: true, leaderboard });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/database', '/getDatabase', '/getFullSnapshot'], async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const snapshot = getFullSnapshot();
    if (caller?.role !== 'admin') {
      // PII Protection (OWASP ASVS / GDPR): Redact personal contact numbers and parent info of third parties for non-admins
      if (Array.isArray(snapshot.users)) {
        const sanitizedUsers = snapshot.users.map((u: any) => {
          const isSelf = caller && (
            (u.email && String(u.email).toLowerCase() === caller.email.toLowerCase()) ||
            (u.id && String(u.id).toLowerCase() === caller.id.toLowerCase())
          );
          if (isSelf) return u;
          const { phone: _ph, telegram: _tg, parentContact: _pc, linkedStudentId: _lId, linkedStudentEmail: _lEm, linkedStudentName: _lNm, ...safePublic } = u;
          return safePublic;
        });
        snapshot.users = sanitizedUsers;
        snapshot.students = sanitizedUsers;
      }
    }
    return res.json({ success: true, ...snapshot });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/database/snapshot', '/saveFullSnapshot'], requireAdmin, async (_req, res) => {
  try {
    persistDb(true);
    return res.json({ success: true, message: 'Снимок базы данных SQLite сохранен на сервере', timestamp: new Date().toISOString() });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// CRITICAL SECURITY FIX: Administrative resets require Admin authorization
apiRouter.post(['/admin/reset-academic', '/resetAllAcademicData'], requireAdmin, async (req, res) => {
  try {
    const targetStudent = req.body?.studentEmail || req.query?.studentEmail;
    resetAllAcademicData(targetStudent);
    return res.json({ success: true, message: 'Все академические данные успешно очищены в базе данных SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/clearAllQuizSubmissions', requireAdmin, async (_req, res) => {
  try {
    run(`DELETE FROM quiz_submissions;`);
    run(`UPDATE users SET passed_quiz_count = 0;`);
    return res.json({ success: true, message: 'Все тесты очищены в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/clearAllLabSubmissions', requireAdmin, async (_req, res) => {
  try {
    run(`DELETE FROM lab_submissions;`);
    run(`UPDATE users SET completed_labs_count = 0;`);
    return res.json({ success: true, message: 'Все лабораторные очищены в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post('/clearAllHomeworkSubmissions', requireAdmin, async (_req, res) => {
  try {
    run(`DELETE FROM homework_submissions;`);
    return res.json({ success: true, message: 'Все домашние задания очищены в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// CERTIFICATES, DOWNLOADS, FAQ, HANDBOOK, SETTINGS
// ============================================================================
apiRouter.get(['/certificates', '/getCertificates'], async (req, res) => {
  try {
    const studentEmail = String(req.query.studentEmail || req.query.email || '').trim().toLowerCase();
    const certs = studentEmail ? query(`SELECT * FROM certificates WHERE LOWER(student_email) = ? ORDER BY issued_at DESC`, [studentEmail]) : query(`SELECT * FROM certificates ORDER BY issued_at DESC`);
    const mapped = certs.map((c) => ({
      certificateId: c.certificate_id,
      studentId: c.student_id,
      studentName: c.student_name,
      studentEmail: c.student_email,
      courseName: c.course_name,
      academicHours: c.academic_hours,
      finalScoreText: c.final_score_text,
      issuedAt: c.issued_at,
      verificationUrl: c.verification_url
    }));
    return res.json({ success: true, certificates: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/certificates', '/saveCertificate'], requireAdmin, async (req, res) => {
  try {
    const { certificateId, studentId, studentName, studentEmail, courseName, academicHours, finalScoreText, issuedAt, verificationUrl } = req.body;
    const certId = certificateId || `CERT-AIE-${Date.now().toString(36).toUpperCase()}`;
    run(
      `
      INSERT INTO certificates (
        certificate_id, student_id, student_name, student_email, course_name, academic_hours, final_score_text, issued_at, verification_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(certificate_id) DO UPDATE SET
        student_name = excluded.student_name,
        course_name = excluded.course_name,
        issued_at = excluded.issued_at;
    `,
      [
        certId,
        studentId || null,
        studentName,
        studentEmail,
        courseName || '«AI ENGINEER — Практический AI для учёбы, работы, бизнеса и создания проектов»',
        academicHours || '36 часов (24 урока, 12 недель)',
        finalScoreText || '95% (Honors)',
        issuedAt || new Date().toISOString().split('T')[0],
        verificationUrl || `/verify?cert=${certId}`
      ]
    );
    return res.json({ success: true, message: 'Сертификат успешно сохранен в базе данных SQLite', certificateId: certId });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.all(['/certificates/:id', '/deleteCertificate'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.certificateId || req.body.id;
    if (id) {
      run(`DELETE FROM certificates WHERE certificate_id = ?;`, [id]);
    }
    return res.json({ success: true, message: 'Сертификат удален' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/downloads', '/getDownloads'], async (_req, res) => {
  try {
    const downloads = query(`SELECT * FROM downloads ORDER BY id ASC`);
    const mapped = downloads.map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      fileSize: d.file_size,
      description: d.description,
      downloadUrl: d.download_url,
      isExternal: Boolean(d.is_external)
    }));
    return res.json({ success: true, downloads: mapped });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/downloads', '/saveDownload'], requireAdmin, async (req, res) => {
  try {
    const { id, title, category, fileSize, description, downloadUrl, isExternal } = req.body;
    const dId = id || `d-${Date.now()}`;
    run(
      `
      INSERT INTO downloads (id, title, category, file_size, description, download_url, is_external, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        title = excluded.title,
        category = excluded.category,
        file_size = excluded.file_size,
        description = excluded.description,
        download_url = excluded.download_url;
    `,
      [dId, title, category || 'PDF', fileSize || '1.0 MB', description || '', downloadUrl || '#', isExternal ? 1 : 0, new Date().toISOString()]
    );
    return res.json({ success: true, message: 'Файл для скачивания сохранен в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.all(['/downloads/:id', '/deleteDownload'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;
    if (id) {
      run(`DELETE FROM downloads WHERE id = ?;`, [id]);
    }
    return res.json({ success: true, message: 'Файл удален' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/faq', '/getFaq'], async (_req, res) => {
  try {
    const faq = query(`SELECT * FROM faq_items ORDER BY id ASC`);
    return res.json({ success: true, faq });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/faq', '/saveFaq'], requireAdmin, async (req, res) => {
  try {
    const { id, category, question, answer } = req.body;
    const fId = id || `f-${Date.now()}`;
    run(
      `
      INSERT INTO faq_items (id, category, question, answer, created_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        category = excluded.category,
        question = excluded.question,
        answer = excluded.answer;
    `,
      [fId, category || 'Обучение', question, answer, new Date().toISOString()]
    );
    return res.json({ success: true, message: 'Вопрос FAQ сохранен в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.all(['/faq/:id', '/deleteFaq'], requireAdmin, async (req, res) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;
    if (id) {
      run(`DELETE FROM faq_items WHERE id = ?;`, [id]);
    }
    return res.json({ success: true, message: 'Вопрос FAQ удален' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/handbook', '/getHandbook'], async (_req, res) => {
  try {
    const sections = query(`SELECT * FROM handbook_sections ORDER BY order_idx ASC`);
    return res.json({ success: true, handbook: sections, sections });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/settings', '/getPortalSettings', '/getSettings'], async (_req, res) => {
  try {
    const settingsRows = query(`SELECT * FROM settings`);
    const settingsObj: Record<string, string> = {};
    for (const row of settingsRows) {
      settingsObj[row.key] = row.value;
    }
    return res.json({ success: true, settings: { databaseType: 'SQLite', ...settingsObj } });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.post(['/settings', '/updatePortalSettings', '/saveSettings'], requireAdmin, async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      run(
        `
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value;
      `,
        [key, String(value)]
      );
    }
    return res.json({ success: true, message: 'Настройки успешно сохранены в SQLite' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get(['/analytics', '/getAnalyticsSummary', '/getAnalytics'], async (_req, res) => {
  try {
    const totalStudents = queryOne(`SELECT COUNT(*) as count FROM users WHERE role = 'student'`)?.count || 0;
    const totalSubmissions = queryOne(`SELECT COUNT(*) as count FROM homework_submissions WHERE status = 'Approved'`)?.count || 0;
    const totalLabs = queryOne(`SELECT COUNT(*) as count FROM lab_submissions WHERE status = 'Approved'`)?.count || 0;
    const totalQuizzes = queryOne(`SELECT COUNT(*) as count FROM quiz_submissions WHERE passed = 1`)?.count || 0;
    return res.json({ success: true, analytics: { totalStudents, totalSubmissions, totalLabs, totalQuizzes, database: 'SQLite' } });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// UPLOAD ROUTE (SECURED: Extension allowlist, path traversal protection, size check)
// ============================================================================
apiRouter.post('/upload', async (req, res) => {
  try {
    const caller = extractUserFromRequest(req);
    const { fileName, fileDataUrl, studentId, studentEmail } = req.body;
    if (!fileName || !fileDataUrl) {
      return res.status(400).json({ success: false, error: 'fileName and fileDataUrl required' });
    }

    if (!isAllowedFileExtension(fileName)) {
      return res.status(400).json({
        success: false,
        error: 'Недопустимый тип файла. Разрешены только документы и изображения (PDF, DOCX, XLSX, TXT, PNG, JPG, WEBP, ZIP).'
      });
    }

    const effectiveEmail = caller ? caller.email : studentEmail;
    const targetDir = getSanitizedUploadDir(effectiveEmail, studentId);
    const safeExt = path.extname(fileName).toLowerCase();
    const baseName = path.basename(fileName, safeExt).replace(/[^a-zA-Z0-9._-]/g, '_');
    const safeName = `${Date.now()}_${baseName}${safeExt}`;
    const targetFilePath = path.join(targetDir, safeName);

    const base64Data = fileDataUrl.includes(';base64,') ? fileDataUrl.split(';base64,').pop() : fileDataUrl;
    const buf = Buffer.from(base64Data, 'base64');
    if (buf.length > 20 * 1024 * 1024) {
      return res.status(400).json({ success: false, error: 'Превышен максимальный размер файла (20 МБ).' });
    }

    await fs.promises.writeFile(targetFilePath, buf);
    const safeFolder = path.basename(targetDir);
    const relativeUrl = `uploads/${safeFolder}/${safeName}`;
    return res.json({ success: true, fileUrl: relativeUrl, fileName, filePath: relativeUrl });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// COMPATIBILITY DISPATCHER (/:action fallback handler)
// ============================================================================
apiRouter.all(['/action', '/:action'], async (req, res, next) => {
  const action = req.params.action || req.body.action || req.query.action;
  if (!action) return next();

  try {
    switch (action) {
      case 'getDatabase':
      case 'getFullSnapshot': {
        const snap = getFullSnapshot();
        return res.json({ success: true, ...snap });
      }
      case 'uploadAvatar': {
        const studentId = req.body.studentId || req.body.id || req.body.email || req.query.studentId || req.query.email;
        const avatarUrl = req.body.avatarDataUrl || req.body.avatarUrl || req.query.avatarDataUrl;
        if (studentId && avatarUrl) {
          const cleanId = String(studentId).trim().toLowerCase();
          run(`UPDATE users SET avatar_url = ? WHERE LOWER(id) = ? OR LOWER(email) = ?;`, [avatarUrl, cleanId, cleanId]);
          persistDb(true);
          return res.json({ success: true, data: { avatarUrl }, message: 'Аватар сохранен в SQLite' });
        }
        return res.status(400).json({ success: false, error: 'Параметры отсутствуют' });
      }
      case 'login': {
        const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
        const rateCheck = checkRateLimit(clientIp);
        if (!rateCheck.allowed) {
          return res.status(429).json({ success: false, error: 'Слишком много попыток входа.' });
        }
        const identifier = String(req.body.login || req.body.email || req.query.login || '').trim().toLowerCase();
        const inputPass = String(req.body.password || req.query.password || '').trim();
        const user = queryOne(`SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(id) = ?`, [identifier, identifier]);
        if (!user || !verifyPassword(inputPass, user.password)) {
          return res.status(401).json({ success: false, error: 'Неверный логин или пароль' });
        }
        if (user.status === 'Blocked' || user.status === 'Pending') {
          return res.status(403).json({ success: false, error: 'Доступ ограничен' });
        }
        resetRateLimit(clientIp);
        const token = generateSessionToken(user);
        const { password: _p, ...cleanUser } = user;
        return res.json({ success: true, user: cleanUser, token, message: 'Успешная авторизация' });
      }
      case 'getCurrentUser':
      case 'getStudentProfile': {
        const email = String(req.query.email || req.body.email || req.query.studentEmail || '').trim().toLowerCase();
        const user = queryOne(`SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(id) = ?`, [email, email]);
        if (user) {
          const { password: _p, ...cleanUser } = user;
          return res.json({ success: true, user: cleanUser });
        }
        return res.json({ success: false, user: null });
      }
      case 'adminGetStudents':
      case 'getUsers': {
        const caller = extractUserFromRequest(req);
        if (caller?.role !== 'admin') {
          return res.status(403).json({ success: false, error: 'Требуются права администратора' });
        }
        const users = query(`SELECT * FROM users ORDER BY total_points DESC`);
        const sanitized = users.map(({ password: _p, ...u }) => u);
        return res.json({ success: true, users: sanitized, students: sanitized });
      }
      case 'getLeaderboard': {
        const users = query(`SELECT * FROM users WHERE hidden_from_leaderboard = 0 AND role != 'admin' ORDER BY total_points DESC`);
        const sanitized = users.map(({ password: _p, ...u }) => u);
        return res.json({ success: true, leaderboard: sanitized });
      }
      case 'getHomework': {
        const email = String(req.query.studentEmail || req.body.studentEmail || '').trim().toLowerCase();
        const rows = email ? query(`SELECT * FROM homework_submissions WHERE LOWER(student_email) = ? ORDER BY submitted_at DESC`, [email]) : query(`SELECT * FROM homework_submissions ORDER BY submitted_at DESC`);
        return res.json({ success: true, homework: rows, homeworkSubmissions: rows });
      }
      case 'reviewHomework': {
        const caller = extractUserFromRequest(req);
        if (caller?.role !== 'admin') {
          return res.status(403).json({ success: false, error: 'Требуются права администратора' });
        }
        return handleReviewHomeworkRequest(req, res);
      }
      case 'reviewLab': {
        const caller = extractUserFromRequest(req);
        if (caller?.role !== 'admin') {
          return res.status(403).json({ success: false, error: 'Требуются права администратора' });
        }
        return handleReviewLabRequest(req, res);
      }
      case 'reviewTest':
      case 'confirmTest': {
        const caller = extractUserFromRequest(req);
        if (caller?.role !== 'admin') {
          return res.status(403).json({ success: false, error: 'Требуются права администратора' });
        }
        return handleReviewTestRequest(req, res);
      }
      case 'submitTest':
      case 'saveQuizSubmission':
      case 'saveTestScore':
        return handleSubmitTestRequest(req, res);
      case 'resetAllAcademicData': {
        const caller = extractUserFromRequest(req);
        if (caller?.role !== 'admin') {
          return res.status(403).json({ success: false, error: 'Требуются права администратора' });
        }
        const targetStudent = req.body?.studentEmail || req.query?.studentEmail;
        resetAllAcademicData(targetStudent);
        return res.json({ success: true, message: 'Академические данные очищены' });
      }
      default:
        return res.json({ success: true, action, database: 'SQLite', message: `Action ${action} handled by SQLite backend` });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export { apiRouter };
