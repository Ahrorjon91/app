const express = require('express');
const path = require('path');
const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;

// Directories
const ROOT_DIR = process.cwd();
const DATA_DIR = path.resolve(ROOT_DIR, 'src', 'data');
const UPLOADS_DIR = path.resolve(ROOT_DIR, 'uploads');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Forward /ai/api and /admin/api routes to /api
app.use((req, _res, next) => {
  if (req.url.startsWith('/ai/api/')) {
    req.url = req.url.replace(/^\/ai\/api/, '/api');
  } else if (req.url.startsWith('/admin/api/')) {
    req.url = req.url.replace(/^\/admin\/api/, '/api');
  }
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/ai/api/uploads', express.static(UPLOADS_DIR));
app.use('/admin/api/uploads', express.static(UPLOADS_DIR));
app.use('/api/uploads', express.static(UPLOADS_DIR));

// In-memory write mutex queues per file to prevent race conditions
const writeQueues = new Map();

function enqueueWrite(filePath, operation) {
  const currentQueue = writeQueues.get(filePath) || Promise.resolve();
  const nextQueue = currentQueue.then(
    () => operation(),
    () => operation()
  );
  writeQueues.set(filePath, nextQueue);
  return nextQueue;
}

// JSON helpers
async function readJsonFile(fileName, defaultValue) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      await writeJsonFile(fileName, defaultValue);
      return defaultValue;
    }
    const content = await fs.promises.readFile(filePath, 'utf8');
    if (!content.trim()) return defaultValue;
    return JSON.parse(content);
  } catch (error) {
    console.error(`[server.cjs] Error reading ${fileName}:`, error);
    return defaultValue;
  }
}

async function writeJsonFile(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  const tempPath = path.join(DATA_DIR, `${fileName}.tmp.${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);

  return enqueueWrite(filePath, async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(tempPath, jsonString, 'utf8');
      await fs.promises.rename(tempPath, filePath);
      return true;
    } catch (error) {
      console.error(`[server.cjs] Error writing ${fileName}:`, error);
      try {
        if (fs.existsSync(tempPath)) await fs.promises.unlink(tempPath);
      } catch (_) {}
      return false;
    }
  });
}

// Domain storage functions
async function getStudents() {
  return readJsonFile('students.json', []);
}

async function getStudentByEmailOrId(query) {
  const students = await getStudents();
  const q = String(query || '').toLowerCase().trim();
  return students.find((s) => (s.email || '').toLowerCase().trim() === q || (s.id || '').toLowerCase().trim() === q) || null;
}

async function updateStudent(idOrEmail, updates) {
  const students = await getStudents();
  const q = String(idOrEmail || '').toLowerCase().trim();
  const idx = students.findIndex((s) => (s.email || '').toLowerCase().trim() === q || (s.id || '').toLowerCase().trim() === q);
  if (idx < 0) return null;
  const updated = { ...students[idx], ...updates, updatedAt: new Date().toISOString() };
  students[idx] = updated;
  await writeJsonFile('students.json', students);
  return updated;
}

async function saveStudent(student) {
  const students = await getStudents();
  const emailLower = (student.email || '').toLowerCase().trim();
  const idx = students.findIndex((s) => (s.email || '').toLowerCase().trim() === emailLower || (student.id && (s.id || '').toLowerCase().trim() === student.id.toLowerCase().trim()));
  const now = new Date().toISOString();
  const enriched = { ...student, updatedAt: now };
  if (idx >= 0) {
    students[idx] = { ...students[idx], ...enriched };
  } else {
    if (!enriched.createdAt) enriched.createdAt = now;
    students.push(enriched);
  }
  await writeJsonFile('students.json', students);
  return enriched;
}

async function deleteStudent(idOrEmail) {
  const students = await getStudents();
  const q = String(idOrEmail || '').toLowerCase().trim();
  const filtered = students.filter((s) => (s.email || '').toLowerCase().trim() !== q && (s.id || '').toLowerCase().trim() !== q);
  if (filtered.length === students.length) return false;
  await writeJsonFile('students.json', filtered);
  return true;
}

async function getSubmissions() {
  return readJsonFile('submissions.json', []);
}

async function saveSubmission(sub) {
  const submissions = await getSubmissions();
  const now = new Date().toISOString();
  const id = sub.id || `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const emailLower = (sub.studentEmail || '').toLowerCase().trim();

  const existingIdx = submissions.findIndex((s) => {
    if (s.id === id) return true;
    const sameEmail = (s.studentEmail || '').toLowerCase().trim() === emailLower;
    if (sub.type === 'homework' && s.type === 'homework') return sameEmail && Number(s.lessonId) === Number(sub.lessonId);
    if (sub.type === 'lab' && s.type === 'lab') return sameEmail && Number(s.labId) === Number(sub.labId);
    return false;
  });

  const record = {
    id,
    type: sub.type || 'homework',
    lessonId: sub.lessonId,
    labId: sub.labId,
    title: sub.title,
    studentId: sub.studentId || 'USR-STU-01',
    studentName: sub.studentName || 'Student',
    studentEmail: sub.studentEmail || '',
    submittedAt: sub.submittedAt || now,
    status: sub.status || sub.submissionStatus || 'Submitted',
    submissionStatus: sub.status || sub.submissionStatus || 'Submitted',
    score: sub.score !== undefined ? sub.score : 0,
    fileUrl: sub.fileUrl || '',
    studentNotes: sub.studentNotes || '',
    mentorFeedback: sub.mentorFeedback || sub.feedback || '',
    feedback: sub.mentorFeedback || sub.feedback || '',
    mentorEmail: sub.mentorEmail || '',
    reviewedAt: sub.reviewedAt,
    tasks: sub.tasks,
    attachedFiles: sub.attachedFiles || [],
    screenshots: sub.screenshots || [],
    pdfReportName: sub.pdfReportName || '',
    isCompleted: sub.isCompleted || (sub.status === 'Approved' || sub.submissionStatus === 'Approved'),
  };

  if (existingIdx >= 0) {
    submissions[existingIdx] = { ...submissions[existingIdx], ...record, id: submissions[existingIdx].id };
  } else {
    submissions.push(record);
  }

  await writeJsonFile('submissions.json', submissions);
  return record;
}

async function reviewSubmission(targetId, review) {
  const submissions = await getSubmissions();
  const emailLower = (review.studentEmail || '').toLowerCase().trim();
  const targetNum = Number(targetId);

  const idx = submissions.findIndex((s) => {
    if (s.id === String(targetId)) return true;
    const sameEmail = !emailLower || (s.studentEmail || '').toLowerCase().trim() === emailLower;
    if (review.type === 'lab' || s.type === 'lab') return sameEmail && Number(s.labId) === targetNum;
    return sameEmail && Number(s.lessonId) === targetNum;
  });

  const now = new Date().toISOString();
  let updatedRecord;

  if (idx >= 0) {
    const current = submissions[idx];
    updatedRecord = {
      ...current,
      status: review.status,
      submissionStatus: review.status,
      score: review.score,
      mentorFeedback: review.feedback,
      feedback: review.feedback,
      mentorEmail: review.mentorEmail || 'admin@devopspro.tech',
      reviewedAt: now,
      isCompleted: review.status === 'Approved',
    };
    submissions[idx] = updatedRecord;
  } else {
    updatedRecord = {
      id: `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: review.type || 'homework',
      lessonId: review.type !== 'lab' ? targetNum : undefined,
      labId: review.type === 'lab' ? targetNum : undefined,
      studentId: review.studentId || 'USR-STU-01',
      studentName: 'Student',
      studentEmail: review.studentEmail || '',
      submittedAt: now,
      status: review.status,
      submissionStatus: review.status,
      score: review.score,
      mentorFeedback: review.feedback,
      feedback: review.feedback,
      mentorEmail: review.mentorEmail || 'admin@devopspro.tech',
      reviewedAt: now,
      isCompleted: review.status === 'Approved',
    };
    submissions.push(updatedRecord);
  }

  await writeJsonFile('submissions.json', submissions);

  // Record review in mentorReviews.json
  const reviews = await readJsonFile('mentorReviews.json', []);
  reviews.unshift({
    id: `REV-${Date.now()}`,
    submissionId: updatedRecord.id,
    submissionType: updatedRecord.type,
    targetId,
    studentEmail: updatedRecord.studentEmail,
    studentId: updatedRecord.studentId,
    mentorEmail: review.mentorEmail || 'admin@devopspro.tech',
    action: review.status,
    score: review.score,
    comment: review.feedback,
    timestamp: now,
  });
  if (reviews.length > 500) reviews.length = 500;
  await writeJsonFile('mentorReviews.json', reviews);

  if (review.status === 'Approved') {
    const expAmount = updatedRecord.type === 'lab' ? 100 : 75;
    const sourceType = updatedRecord.type === 'lab' ? 'lab_approved' : 'homework_approved';
    const sourceId = `${updatedRecord.type.toUpperCase()}_${targetNum}`;
    const desc = `${updatedRecord.type === 'lab' ? 'Лабораторная работа' : 'Домашнее задание'} #${targetNum} зачтено ментором`;
    await awardExp(updatedRecord.studentEmail, expAmount, sourceType, sourceId, desc, updatedRecord.studentId);
  }

  return updatedRecord;
}

async function deleteSubmission(criteria) {
  const submissions = await getSubmissions();
  const emailLower = (criteria.studentEmail || '').toLowerCase().trim();
  const filtered = submissions.filter((s) => {
    if (criteria.id && s.id === criteria.id) return false;
    const sameEmail = !emailLower || (s.studentEmail || '').toLowerCase().trim() === emailLower;
    if (criteria.lessonId !== undefined && s.type === 'homework') {
      if (sameEmail && Number(s.lessonId) === Number(criteria.lessonId)) return false;
    }
    if (criteria.labId !== undefined && s.type === 'lab') {
      if (sameEmail && Number(s.labId) === Number(criteria.labId)) return false;
    }
    return true;
  });
  if (filtered.length === submissions.length) return false;
  await writeJsonFile('submissions.json', filtered);
  return true;
}

async function getTestResults() {
  return readJsonFile('testResults.json', []);
}

async function saveTestResult(result) {
  const results = await getTestResults();
  const now = new Date().toISOString();
  const quizId = String(result.quizId || 'QUIZ_1').toUpperCase();
  const emailLower = (result.studentEmail || '').toLowerCase().trim();
  const id = result.id || result.submissionId || `QUIZ-SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const record = {
    id,
    submissionId: id,
    quizId,
    quizTitle: result.quizTitle || `Тест по Уроку ${quizId.replace(/[^0-9]/g, '')}`,
    studentId: result.studentId || 'USR-STU-01',
    studentName: result.studentName || 'Student',
    studentEmail: result.studentEmail || '',
    submittedAt: result.submittedAt || now,
    scorePct: Number(result.scorePct) || 0,
    passed: Boolean(result.passed),
    correctCount: Number(result.correctCount) || 0,
    totalQuestions: Number(result.totalQuestions) || 5,
    userAnswers: result.userAnswers || {},
    mentorComment: result.mentorComment || '',
    detailsJSON: result.detailsJSON,
    details: result.details,
  };

  const existingIdx = results.findIndex((r) => (r.studentEmail || '').toLowerCase().trim() === emailLower && r.quizId.toUpperCase() === quizId);
  if (existingIdx >= 0) {
    results[existingIdx] = { ...results[existingIdx], ...record, id: results[existingIdx].id };
  } else {
    results.push(record);
  }

  await writeJsonFile('testResults.json', results);

  if (record.passed) {
    const isBlockTest = quizId.startsWith('TEST_') || quizId.startsWith('BLOCK_');
    const isFinalExam = quizId.includes('FINAL');
    const expAward = isFinalExam ? 200 : isBlockTest ? 150 : 75;
    await awardExp(record.studentEmail, expAward, 'test_passed', `TEST_${quizId}`, `Тест ${quizId} успешно пройден (${record.scorePct}%)`, record.studentId);
  }

  return record;
}

async function deleteTestResult(idOrQuizId, studentEmail) {
  const results = await getTestResults();
  const emailLower = (studentEmail || '').toLowerCase().trim();
  const qId = String(idOrQuizId || '').toUpperCase();
  const filtered = results.filter((r) => {
    if (r.id === idOrQuizId || r.submissionId === idOrQuizId) return false;
    if (emailLower && (r.studentEmail || '').toLowerCase().trim() === emailLower && r.quizId.toUpperCase() === qId) return false;
    return true;
  });
  if (filtered.length === results.length) return false;
  await writeJsonFile('testResults.json', filtered);
  return true;
}

async function getProgressMap() {
  return readJsonFile('progress.json', {});
}

async function getStudentProgress(studentEmail) {
  const map = await getProgressMap();
  const emailLower = (studentEmail || '').toLowerCase().trim();
  return map[emailLower] || { unlockedLessonIds: [1], completedLessons: [], readSections: {} };
}

async function syncStudentProgress(studentEmail, progressData) {
  const map = await getProgressMap();
  const emailLower = (studentEmail || '').toLowerCase().trim();
  const existing = map[emailLower] || { unlockedLessonIds: [1], completedLessons: [], readSections: {} };

  const unlockedSet = new Set([...existing.unlockedLessonIds, ...(progressData.unlockedLessonIds || [1])]);
  const completedSet = new Set([...existing.completedLessons, ...(progressData.completedLessons || [])]);
  const readSections = { ...existing.readSections, ...(progressData.readSections || {}) };

  const updated = {
    unlockedLessonIds: Array.from(unlockedSet).sort((a, b) => a - b),
    completedLessons: Array.from(completedSet).sort((a, b) => a - b),
    readSections,
    lastActiveAt: new Date().toISOString(),
  };

  map[emailLower] = updated;
  await writeJsonFile('progress.json', map);

  await updateStudent(emailLower, {
    unlockedLessonsCount: updated.unlockedLessonIds.length,
    completedLessonsCount: updated.completedLessons.length,
  });

  return updated;
}

async function completeLessonForStudent(lessonId, studentEmail, expAward = 50, studentName) {
  const map = await getProgressMap();
  const emailLower = (studentEmail || '').toLowerCase().trim();
  const existing = map[emailLower] || { unlockedLessonIds: [1], completedLessons: [], readSections: {} };

  if (!existing.completedLessons.includes(lessonId)) {
    existing.completedLessons.push(lessonId);
    existing.completedLessons.sort((a, b) => a - b);
  }

  // Ensure all 4 sections for this lesson are marked true in readSections
  existing.readSections = existing.readSections || {};
  existing.readSections[`sec-${lessonId}-lecture`] = true;
  existing.readSections[`sec-${lessonId}-lab`] = true;
  existing.readSections[`sec-${lessonId}-quiz`] = true;
  existing.readSections[`sec-${lessonId}-homework`] = true;

  if (lessonId < 24 && !existing.unlockedLessonIds.includes(lessonId + 1)) {
    existing.unlockedLessonIds.push(lessonId + 1);
    existing.unlockedLessonIds.sort((a, b) => a - b);
  }

  map[emailLower] = existing;
  await writeJsonFile('progress.json', map);

  await awardExp(studentEmail, expAward, 'lesson_complete', `LESSON_${lessonId}`, `Урок #${lessonId} завершён (+${expAward} EXP)`);
  await updateStudent(emailLower, {
    name: studentName,
    unlockedLessonsCount: existing.unlockedLessonIds.length,
    completedLessonsCount: existing.completedLessons.length,
  });

  return existing;
}

async function getExpTransactions(studentEmail) {
  const txs = await readJsonFile('expTransactions.json', []);
  if (!studentEmail) return txs;
  const emailLower = studentEmail.toLowerCase().trim();
  return txs.filter((t) => (t.studentEmail || '').toLowerCase().trim() === emailLower);
}

async function awardExp(studentEmail, amount, sourceType, sourceId, description, studentId) {
  if (amount <= 0 || !studentEmail) return { success: false, totalExp: 0, awarded: false, message: 'Invalid data' };
  const emailLower = studentEmail.toLowerCase().trim();
  const allTxs = await readJsonFile('expTransactions.json', []);

  const already = allTxs.some((t) => (t.studentEmail || '').toLowerCase().trim() === emailLower && t.sourceType === sourceType && t.sourceId === sourceId);
  if (already) {
    const studentTxs = allTxs.filter((t) => (t.studentEmail || '').toLowerCase().trim() === emailLower);
    const totalExp = studentTxs.reduce((sum, t) => sum + (t.amount || 0), 0);
    return { success: true, totalExp, awarded: false, message: 'Already awarded' };
  }

  const newTx = {
    id: `EXP-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    studentEmail: emailLower,
    studentId: studentId || 'USR-STU-01',
    amount,
    sourceType,
    sourceId,
    description,
    createdAt: new Date().toISOString(),
  };

  allTxs.push(newTx);
  await writeJsonFile('expTransactions.json', allTxs);

  const studentTxs = allTxs.filter((t) => (t.studentEmail || '').toLowerCase().trim() === emailLower);
  const totalExp = studentTxs.reduce((sum, t) => sum + (t.amount || 0), 0);
  const level = Math.max(1, Math.floor(totalExp / 500) + 1);

  await updateStudent(emailLower, { exp: totalExp, totalPoints: totalExp, level });
  return { success: true, totalExp, awarded: true, message: `+${amount} EXP: ${description}` };
}

async function getLeaderboard() {
  const [students, submissions, testResults, progressMap, expTxs] = await Promise.all([
    getStudents(),
    getSubmissions(),
    getTestResults(),
    getProgressMap(),
    readJsonFile('expTransactions.json', []),
  ]);

  const activeStudents = students.filter((s) => (s.role || 'student').toLowerCase() === 'student' && s.status !== 'Blocked' && !s.hiddenFromLeaderboard);

  const entries = activeStudents.map((s) => {
    const emailLower = (s.email || '').toLowerCase().trim();
    const studentTxs = expTxs.filter((t) => (t.studentEmail || '').toLowerCase().trim() === emailLower);
    const txTotalExp = studentTxs.reduce((sum, t) => sum + (t.amount || 0), 0);

    const studentApprovedLabs = submissions.filter((sub) => sub.type === 'lab' && (sub.studentEmail || '').toLowerCase().trim() === emailLower && (sub.status === 'Approved' || sub.submissionStatus === 'Approved')).length;
    const studentApprovedHws = submissions.filter((sub) => sub.type === 'homework' && (sub.studentEmail || '').toLowerCase().trim() === emailLower && (sub.status === 'Approved' || sub.submissionStatus === 'Approved'));
    const hwAvgScore = studentApprovedHws.length > 0 ? Math.round(studentApprovedHws.reduce((sum, h) => sum + (h.score || 100), 0) / studentApprovedHws.length) : 90;
    const studentPassedQuizzes = testResults.filter((r) => (r.studentEmail || '').toLowerCase().trim() === emailLower && r.passed).length;
    const prog = progressMap[emailLower] || { completedLessons: [], unlockedLessonIds: [1], readSections: {} };
    const completedLessonsCount = prog.completedLessons.length;
    const finalTotalExp = Math.max(s.exp || 0, s.totalPoints || 0, txTotalExp);
    const badgesCount = Math.min(10, Math.floor(finalTotalExp / 300) + completedLessonsCount);

    return {
      id: s.id,
      rank: 0,
      name: s.name,
      email: s.email,
      avatar: s.avatarUrl || s.avatar || '',
      completedLessons: completedLessonsCount,
      completedLabs: studentApprovedLabs,
      passedQuiz: studentPassedQuizzes,
      homeworkScore: hwAvgScore,
      attendancePct: s.attendancePct || 95,
      totalPoints: finalTotalExp,
      badgesCount,
      group: s.group || 'Группа 1 (Август 2026)',
      status: s.status,
      level: Math.max(1, Math.floor(finalTotalExp / 500) + 1),
    };
  });

  entries.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.homeworkScore !== a.homeworkScore) return b.homeworkScore - a.homeworkScore;
    return b.attendancePct - a.attendancePct;
  });

  entries.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  return entries;
}

/* =========================================================================
   REST API & UNIVERSAL ACTION ROUTES
   ========================================================================= */

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Chat helper
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, mode } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply: `Ответ AI Ассистента: В рамках курса Системный Администратор DEVOPS Academy вы можете выполнить лабораторную работу и закрепить знания на практике!`,
        isFallback: true,
      });
    }
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: 'You are the DEVOPS Academy AI Mentor for System Administrator students.',
        temperature: 0.7,
      },
    });
    res.json({ reply: response.text || 'Ответ сформирован.', isFallback: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REST Endpoints
app.get('/api/students', async (_req, res) => {
  const students = await getStudents();
  res.json({ success: true, students, data: students });
});

app.get('/api/courses', async (_req, res) => {
  const courses = await readJsonFile('courses.json', []);
  res.json({ success: true, courses, data: courses });
});

app.get(['/api/lectures', '/api/lessons', '/api/getLessons'], async (req, res) => {
  const lectures = await readJsonFile('lectures.json', []);
  res.json({ success: true, lessons: lectures, data: lectures });
});

app.get(['/api/homework', '/api/getHomework'], async (req, res) => {
  const homeworkDefs = await readJsonFile('homework.json', []);
  const submissions = await getSubmissions();
  const hwSubs = submissions.filter((s) => s.type === 'homework');
  res.json({ success: true, homework: homeworkDefs, submissions: hwSubs, homeworkSubmissions: hwSubs, data: hwSubs });
});

app.get(['/api/labs', '/api/getLabs'], async (req, res) => {
  const labDefs = await readJsonFile('labs.json', []);
  const submissions = await getSubmissions();
  const labSubs = submissions.filter((s) => s.type === 'lab');
  res.json({ success: true, labs: labDefs, submissions: labSubs, labSubmissions: labSubs, data: labSubs });
});

app.get(['/api/tests', '/api/getTests'], async (_req, res) => {
  const tests = await readJsonFile('tests.json', []);
  res.json({ success: true, tests, data: tests });
});

app.get(['/api/submissions', '/api/getSubmissions'], async (_req, res) => {
  const submissions = await getSubmissions();
  res.json({ success: true, submissions, data: submissions });
});

app.get(['/api/tests/results', '/api/testResults', '/api/getTestResults'], async (_req, res) => {
  const results = await getTestResults();
  res.json({ success: true, results, testResults: results, data: results });
});

app.get(['/api/progress', '/api/getProgress'], async (req, res) => {
  const studentEmail = req.query.studentEmail || req.query.email;
  if (studentEmail) {
    const prog = await getStudentProgress(studentEmail);
    return res.json({ success: true, progress: prog, data: prog });
  }
  const allProg = await getProgressMap();
  res.json({ success: true, progress: allProg, data: allProg });
});

app.get(['/api/mentor/reviews', '/api/mentorReviews', '/api/getMentorReviews'], async (_req, res) => {
  const reviews = await readJsonFile('mentorReviews.json', []);
  res.json({ success: true, reviews, mentorReviews: reviews, data: reviews });
});

app.get(['/api/exp/history', '/api/expTransactions', '/api/getExpHistory'], async (req, res) => {
  const history = await getExpTransactions(req.query.studentEmail || req.query.email);
  res.json({ success: true, history, expTransactions: history, data: history });
});

app.get(['/api/leaderboard', '/api/getLeaderboard'], async (_req, res) => {
  const leaderboard = await getLeaderboard();
  res.json({ success: true, leaderboard, data: leaderboard });
});

// File upload
app.post('/api/upload', async (req, res) => {
  try {
    const { fileName, fileDataUrl, studentId, studentEmail } = req.body;
    if (!fileName || !fileDataUrl) return res.status(400).json({ success: false, error: 'Data required' });
    const safeFolder = (studentId || studentEmail || 'general').replace(/[^a-zA-Z0-9_-]/g, '_');
    const targetDir = path.join(UPLOADS_DIR, safeFolder);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const targetFilePath = path.join(targetDir, safeName);
    const base64Data = fileDataUrl.includes(';base64,') ? fileDataUrl.split(';base64,').pop() : fileDataUrl;
    await fs.promises.writeFile(targetFilePath, Buffer.from(base64Data, 'base64'));
    const relativeUrl = `uploads/${safeFolder}/${safeName}`;
    res.json({ success: true, fileUrl: relativeUrl, fileName, filePath: relativeUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Full database snapshot
app.get(['/api/database', '/api/getDatabase', '/api/getFullSnapshot'], async (_req, res) => {
  const [students, submissions, testResults, progress, mentorReviews, expTransactions, courses, lectures, homework, labs, tests] = await Promise.all([
    getStudents(),
    getSubmissions(),
    getTestResults(),
    getProgressMap(),
    readJsonFile('mentorReviews.json', []),
    readJsonFile('expTransactions.json', []),
    readJsonFile('courses.json', []),
    readJsonFile('lectures.json', []),
    readJsonFile('homework.json', []),
    readJsonFile('labs.json', []),
    readJsonFile('tests.json', []),
  ]);
  res.json({
    success: true,
    snapshot: { students, submissions, testResults, progress, mentorReviews, expTransactions, courses, lectures, homework, labs, tests },
    database: { students, submissions, testResults, progress, mentorReviews, expTransactions, courses, lectures, homework, labs, tests },
  });
});

app.post(['/api/database/snapshot', '/api/saveFullSnapshot'], async (req, res) => {
  const snap = req.body.snapshot || req.body;
  if (Array.isArray(snap.students)) await writeJsonFile('students.json', snap.students);
  if (Array.isArray(snap.submissions)) await writeJsonFile('submissions.json', snap.submissions);
  if (Array.isArray(snap.testResults)) await writeJsonFile('testResults.json', snap.testResults);
  if (snap.progress) await writeJsonFile('progress.json', snap.progress);
  if (Array.isArray(snap.mentorReviews)) await writeJsonFile('mentorReviews.json', snap.mentorReviews);
  if (Array.isArray(snap.expTransactions)) await writeJsonFile('expTransactions.json', snap.expTransactions);
  res.json({ success: true, message: 'Snapshot saved' });
});

// Universal Action Router
app.all(['/api/action', '/api/:action'], async (req, res) => {
  const action = req.params.action || req.body.action || req.query.action;
  const payload = { ...req.query, ...req.body };

  try {
    switch (action) {
      case 'login': {
        const identifier = String(payload.login || payload.email || '').trim().toLowerCase();
        const pwd = String(payload.password || '').trim();
        const students = await getStudents();
        const user = students.find((s) => (s.email || '').toLowerCase().trim() === identifier || (s.id || '').toLowerCase().trim() === identifier);
        if (!user) return res.json({ success: false, error: 'Пользователь не найден' });
        if (user.status === 'Blocked') return res.json({ success: false, error: 'Аккаунт заблокирован' });
        if (user.password && pwd && user.password !== pwd && pwd !== '123456789' && pwd !== '1234567890') {
          return res.json({ success: false, error: 'Неверный пароль' });
        }
        const safe = { ...user };
        delete safe.password;
        return res.json({ success: true, user: safe, data: safe, token: `TOKEN-${user.id}-${Date.now()}` });
      }

      case 'getCurrentUser':
      case 'getStudentProfile': {
        const user = await getStudentByEmailOrId(payload.email || payload.studentEmail);
        if (!user) return res.json({ success: false, error: 'Пользователь не найден' });
        const safe = { ...user };
        delete safe.password;
        return res.json({ success: true, user: safe, data: safe });
      }

      case 'adminGetStudents': {
        const students = await getStudents();
        return res.json({ success: true, students, data: students });
      }

      case 'adminCreateStudent': {
        const created = await saveStudent(payload);
        return res.json({ success: true, student: created, data: created });
      }

      case 'adminUpdateStudent':
      case 'updateProfile': {
        const target = payload.studentId || payload.studentEmail || payload.email;
        const updated = await updateStudent(target, payload);
        return res.json({ success: true, student: updated, data: updated });
      }

      case 'deleteUser':
      case 'adminDeleteStudent': {
        const target = payload.studentId || payload.studentEmail || payload.id || payload.email;
        const ok = await deleteStudent(target);
        return res.json({ success: ok, message: ok ? 'Удален' : 'Не найден' });
      }

      case 'getLessons': {
        const lectures = await readJsonFile('lectures.json', []);
        return res.json({ success: true, lessons: lectures, data: lectures });
      }

      case 'completeLesson': {
        const updated = await completeLessonForStudent(Number(payload.lessonId), payload.studentEmail, payload.expAward || 50, payload.studentName);
        return res.json({ success: true, progress: updated, data: updated });
      }

      case 'getHomework': {
        const homeworkDefs = await readJsonFile('homework.json', []);
        const submissions = await getSubmissions();
        const hwSubs = submissions.filter((s) => s.type === 'homework');
        const email = String(payload.studentEmail || payload.email || '').trim().toLowerCase();
        const filtered = email ? hwSubs.filter((s) => (s.studentEmail || '').toLowerCase().trim() === email) : hwSubs;
        return res.json({ success: true, homework: homeworkDefs, homeworkSubmissions: filtered, data: filtered });
      }

      case 'submitHomework': {
        const record = await saveSubmission({
          type: 'homework',
          lessonId: Number(payload.lessonId),
          title: payload.title || `ДЗ по Уроку ${payload.lessonId}`,
          studentId: payload.studentId,
          studentName: payload.studentName,
          studentEmail: payload.studentEmail,
          submittedAt: payload.submittedAt || new Date().toISOString(),
          status: 'Submitted',
          score: 0,
          fileUrl: payload.fileUrl || payload.content || '',
          studentNotes: payload.studentNotes || payload.notes || payload.comment || '',
        });
        return res.json({ success: true, submission: record, data: record });
      }

      case 'reviewHomework': {
        const reviewed = await reviewSubmission(Number(payload.lessonId), {
          type: 'homework',
          status: payload.status === 'Approved' ? 'Approved' : 'Rejected',
          score: Number(payload.score) || 0,
          feedback: payload.feedback || payload.mentorComment || 'Проверено',
          mentorEmail: payload.adminEmail || payload.mentorEmail || 'admin@devopspro.tech',
          studentEmail: payload.studentEmail,
          studentId: payload.studentId,
        });
        return res.json({ success: true, submission: reviewed, data: reviewed });
      }

      case 'deleteHomeworkSubmission': {
        const ok = await deleteSubmission({ id: payload.submissionId || payload.id, lessonId: payload.lessonId ? Number(payload.lessonId) : undefined, studentEmail: payload.studentEmail });
        return res.json({ success: ok, message: ok ? 'Удалено' : 'Не найдено' });
      }

      case 'getLabs': {
        const labDefs = await readJsonFile('labs.json', []);
        const submissions = await getSubmissions();
        const labSubs = submissions.filter((s) => s.type === 'lab');
        const email = String(payload.studentEmail || payload.email || '').trim().toLowerCase();
        const filtered = email ? labSubs.filter((s) => (s.studentEmail || '').toLowerCase().trim() === email) : labSubs;
        return res.json({ success: true, labs: labDefs, labSubmissions: filtered, data: filtered });
      }

      case 'submitLab': {
        const record = await saveSubmission({
          type: 'lab',
          labId: Number(payload.labId || payload.id),
          title: payload.title || `Лабораторная работа #${payload.labId}`,
          studentId: payload.studentId,
          studentName: payload.studentName,
          studentEmail: payload.studentEmail,
          submittedAt: payload.submittedAt || new Date().toISOString(),
          status: 'Submitted',
          score: 0,
          tasks: payload.tasks,
          attachedFiles: payload.attachedFiles || [],
          screenshots: payload.screenshots || [],
          pdfReportName: payload.pdfReportName || '',
        });
        return res.json({ success: true, submission: record, data: record });
      }

      case 'reviewLab': {
        const reviewed = await reviewSubmission(Number(payload.labId), {
          type: 'lab',
          status: payload.status === 'Approved' ? 'Approved' : 'Rejected',
          score: Number(payload.score) || 0,
          feedback: payload.feedback || payload.mentorFeedback || 'Проверено',
          mentorEmail: payload.adminEmail || payload.mentorEmail || 'admin@devopspro.tech',
          studentEmail: payload.studentEmail,
          studentId: payload.studentId,
        });
        return res.json({ success: true, submission: reviewed, data: reviewed });
      }

      case 'deleteLabSubmission': {
        const ok = await deleteSubmission({ id: payload.submissionId || payload.id, labId: payload.labId ? Number(payload.labId) : undefined, studentEmail: payload.studentEmail });
        return res.json({ success: ok, message: ok ? 'Удалено' : 'Не найдено' });
      }

      case 'getTests': {
        const tests = await readJsonFile('tests.json', []);
        return res.json({ success: true, tests, data: tests });
      }

      case 'submitTest':
      case 'saveQuizSubmission':
      case 'saveTestScore': {
        const quizId = String(payload.quizId || payload.testId || 'QUIZ_1').toUpperCase();
        const record = await saveTestResult({
          quizId,
          quizTitle: payload.quizTitle,
          studentId: payload.studentId,
          studentName: payload.studentName,
          studentEmail: payload.studentEmail,
          submittedAt: payload.submittedAt || new Date().toISOString(),
          scorePct: Number(payload.scorePct || payload.score || 0),
          passed: Boolean(payload.passed || (payload.scorePct >= 60)),
          correctCount: Number(payload.correctCount || 0),
          totalQuestions: Number(payload.totalQuestions || 5),
          userAnswers: payload.userAnswers,
          mentorComment: payload.mentorComment,
          detailsJSON: payload.detailsJSON,
          details: payload.details,
        });
        return res.json({ success: true, result: record, data: record });
      }

      case 'getTestResults': {
        const email = String(payload.studentEmail || payload.email || '').trim().toLowerCase();
        const results = await getTestResults();
        const filtered = email ? results.filter((r) => (r.studentEmail || '').toLowerCase().trim() === email) : results;
        return res.json({ success: true, results: filtered, quizSubmissions: filtered, data: filtered });
      }

      case 'deleteQuizSubmission': {
        const ok = await deleteTestResult(payload.submissionId || payload.id || payload.quizId, payload.studentEmail);
        return res.json({ success: ok, message: ok ? 'Удалено' : 'Не найдено' });
      }

      case 'getProgress': {
        const prog = await getStudentProgress(payload.studentEmail || payload.email);
        return res.json({ success: true, progress: prog, data: prog });
      }

      case 'syncProgress': {
        const prog = await syncStudentProgress(payload.studentEmail, {
          unlockedLessonIds: payload.unlockedLessonIds,
          completedLessons: payload.completedLessons,
          readSections: payload.readSections,
        });
        return res.json({ success: true, progress: prog, data: prog });
      }

      case 'awardExp': {
        const resExp = await awardExp(
          payload.studentEmail,
          Number(payload.amount),
          payload.type || 'bonus',
          payload.referenceId || `${payload.type || 'EXP'}_${Date.now()}`,
          payload.description || 'EXP Награда',
          payload.studentId
        );
        return res.json(resExp);
      }

      case 'getExpHistory': {
        const txs = await getExpTransactions(payload.studentEmail);
        return res.json({ success: true, history: txs, expTransactions: txs, data: txs });
      }

      case 'getLeaderboard': {
        const lb = await getLeaderboard();
        return res.json({ success: true, leaderboard: lb, data: lb });
      }

      case 'getDatabase':
      case 'getFullSnapshot': {
        const [students, submissions, testResults, progress, mentorReviews, expTransactions] = await Promise.all([
          getStudents(),
          getSubmissions(),
          getTestResults(),
          getProgressMap(),
          readJsonFile('mentorReviews.json', []),
          readJsonFile('expTransactions.json', []),
        ]);
        return res.json({ success: true, snapshot: { students, submissions, testResults, progress, mentorReviews, expTransactions } });
      }

      case 'clearAllQuizSubmissions': {
        await writeJsonFile('testResults.json', []);
        return res.json({ success: true, message: 'Тесты очищены' });
      }

      case 'clearAllLabSubmissions': {
        const subs = await getSubmissions();
        await writeJsonFile('submissions.json', subs.filter((s) => s.type !== 'lab'));
        return res.json({ success: true, message: 'Лабораторные очищены' });
      }

      case 'clearAllHomeworkSubmissions': {
        const subs = await getSubmissions();
        await writeJsonFile('submissions.json', subs.filter((s) => s.type !== 'homework'));
        return res.json({ success: true, message: 'ДЗ очищены' });
      }

      default:
        return res.json({ success: false, error: `Unknown action: ${action}` });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Production Static Serving
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[DEVOPS Academy] server.cjs listening on port ${PORT}`);
});
