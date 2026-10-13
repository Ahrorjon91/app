import React, { useEffect, useRef } from 'react';
import { QuizAnswerDetail, QuizSubmissionResult, UserAccount } from '../types';
import { ALL_QUIZ_TESTS, QUIZ_TESTS, FINAL_EXAM_QUIZ, TEST_7_QUIZ, INITIAL_LESSONS } from '../data/syllabusData';
import { LESSON_QUIZZES } from '../data/lessonQuizzesData';
import { COURSE_RULES } from './courseRules';
import { usePortal } from '../context/PortalContext';

const QUIZ_TITLES_BY_ID: Record<string, string> = {
  TEST_1: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 1: AI Foundations & Prompting (20 вопросов)',
  TEST_2: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 2: Vibe Coding & Cursor IDE (20 вопросов)',
  TEST_3: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 3: AI Productivity & Second Brain (20 вопросов)',
  TEST_4: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 4: Generative Media & Visuals (20 вопросов)',
  TEST_5: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 5: Autonomous Agents & RAG (20 вопросов)',
  TEST_6: '📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ 6: Capstone Project & Launch (20 вопросов)',
  TEST_7: '🎓 ФИНАЛЬНЫЙ ТЕСТ',
  FINAL_EXAM: '🎓 ФИНАЛЬНЫЙ СЕРТИФИКАЦИОННЫЙ ЭКЗАМЕН (60 вопросов)',
};

/**
 * Resolve full question-by-question breakdown with student answers,
 * correct answers and explanations for any quiz submission
 */
export function resolveQuizAnswerDetails(submission: Partial<QuizSubmissionResult> | any): QuizAnswerDetail[] {
  if (!submission) return [];

  // 1. If submission.details is already a populated array of details with questionText
  const existingDetails = submission.details || submission.DetailsJSON || submission.detailsJson;
  if (Array.isArray(existingDetails) && existingDetails.length > 0) {
    const hasQuestions = existingDetails.some((d) => d && (d.questionText || d.question));
    if (hasQuestions) {
      return existingDetails.map((d: any, idx: number) => {
        const qNum = idx + 1;
        const isCor = Boolean(
          d.isCorrect !== undefined
            ? (d.isCorrect === true || String(d.isCorrect).toLowerCase() === 'true')
            : (d.selectedOptionIndex !== undefined && d.correctOptionIndex !== undefined && d.selectedOptionIndex === d.correctOptionIndex)
        );
        return {
          questionId: typeof d.questionId === 'number' ? d.questionId : (typeof d.id === 'number' ? d.id : qNum),
          questionText: String(d.questionText || d.question || `Вопрос №${qNum}`),
          selectedOptionIndex: typeof d.selectedOptionIndex === 'number' ? d.selectedOptionIndex : -1,
          selectedOptionText: String(d.selectedOptionText || d.selectedOption || d.userAnswer || 'Не отвечено'),
          correctOptionIndex: typeof d.correctOptionIndex === 'number' ? d.correctOptionIndex : 0,
          correctOptionText: String(d.correctOptionText || d.correctOption || d.answer || ''),
          isCorrect: isCor,
          explanation: String(d.explanation || ''),
        };
      });
    }
  }

  // 2. If details is a JSON string of an array
  if (typeof existingDetails === 'string') {
    const trimmed = existingDetails.trim();
    if (trimmed.startsWith('[') && (trimmed.includes('questionText') || trimmed.includes('questionId') || trimmed.includes('question'))) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return resolveQuizAnswerDetails({ ...submission, details: parsed });
        }
      } catch {}
    }
  }

  // 3. Resolve questions definition from syllabus data
  const rawId = String(submission.quizId || submission.QuizID || submission.lessonId || '1').trim();
  const rawTitle = String(submission.quizTitle || submission.QuizTitle || '');
  let questions: any[] = [];

  // Check if it's FINAL_EXAM
  if (rawId.toUpperCase() === 'FINAL_EXAM' || rawId.toUpperCase() === 'FINAL' || rawTitle.includes('СЕРТИФИКАЦИОННЫЙ') || rawTitle.toUpperCase().includes('FINAL_EXAM')) {
    questions = FINAL_EXAM_QUIZ?.questions || [];
  } else if (rawId.toUpperCase() === 'TEST_7') {
    questions = TEST_7_QUIZ?.questions || FINAL_EXAM_QUIZ?.questions || [];
  } else if (/^TEST_[1-6]$/i.test(rawId) || /^BLOCK(?:_TEST)?[_-]?[1-6]$/i.test(rawId)) {
    const num = rawId.replace(/\D/g, '') || '1';
    const matched = ALL_QUIZ_TESTS.find((q) => q.id.toUpperCase() === `TEST_${num}`);
    questions = matched?.questions || [];
  } else {
    // Check if it's a lesson mini-test (e.g. "1", "2", "LESSON_1", "lesson-1-test", or parsed from title)
    let lessonNum: number | null = null;
    const match = rawId.match(/^(?:LESSON[_-]?(?:TEST)?[_-]?)?(\d+)/i);
    if (match) {
      lessonNum = parseInt(match[1], 10);
    } else {
      const titleMatch = rawTitle.match(/Урок[а-я]?\s*(?:№|#)?\s*(\d+)/i);
      if (titleMatch) {
        lessonNum = parseInt(titleMatch[1], 10);
      }
    }

    if (lessonNum && lessonNum >= 1 && lessonNum <= 24) {
      questions = LESSON_QUIZZES[lessonNum] || [];
      if (!questions || questions.length === 0) {
        const lesson = INITIAL_LESSONS.find((l) => l.id === lessonNum);
        if (lesson && (lesson as any).quiz?.questions) {
          questions = (lesson as any).quiz.questions;
        }
      }
    } else {
      const matched = ALL_QUIZ_TESTS.find((q) => q.id.toUpperCase() === rawId.toUpperCase());
      questions = matched?.questions || [];
    }
  }

  // Fallback: if still empty, default to lesson 1 quiz questions
  if (!questions || questions.length === 0) {
    questions = LESSON_QUIZZES[1] || [];
  }

  // 4. Extract student's answers map if available
  let answersMap: Record<string, any> = {};
  const possibleAnswersSources = [
    submission.userAnswers,
    submission.answers,
    submission.answers_json,
    submission.user_answers,
    submission.details,
    submission.detailsJson,
  ];

  for (const src of possibleAnswersSources) {
    if (src && typeof src === 'object' && !Array.isArray(src) && Object.keys(src).length > 0) {
      answersMap = { ...answersMap, ...src };
    } else if (typeof src === 'string' && src.trim().startsWith('{')) {
      try {
        const p = JSON.parse(src);
        if (p && typeof p === 'object' && !Array.isArray(p)) {
          answersMap = { ...answersMap, ...p };
        }
      } catch {}
    }
  }

  const hasSpecificAnswers = Object.keys(answersMap).length > 0;
  const totalQ = questions.length;
  let targetCorrect = 0;
  if (submission.correctCount !== undefined && submission.correctCount !== null && !isNaN(Number(submission.correctCount))) {
    targetCorrect = Math.min(totalQ, Math.max(0, Number(submission.correctCount)));
  } else if (submission.scorePct !== undefined && submission.scorePct !== null && !isNaN(Number(submission.scorePct))) {
    targetCorrect = Math.min(totalQ, Math.max(0, Math.round((Number(submission.scorePct) / 100) * totalQ)));
  } else if (submission.passed) {
    targetCorrect = Math.ceil(totalQ * 0.8);
  } else {
    targetCorrect = Math.floor(totalQ * 0.4);
  }

  return questions.map((q: any, idx: number) => {
    const qNum = idx + 1;
    const qId = q.id || qNum;
    const correctOptIndex = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
    const options = Array.isArray(q.options) ? q.options : ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'];
    const correctOptText = options[correctOptIndex] || '';

    let selectedOptIndex = -1;
    let isCorrect = false;

    if (hasSpecificAnswers) {
      const rawChoice =
        answersMap[String(idx)] !== undefined
          ? answersMap[String(idx)]
          : answersMap[String(qNum)] !== undefined
          ? answersMap[String(qNum)]
          : answersMap[String(qId)] !== undefined
          ? answersMap[String(qId)]
          : answersMap[qId];

      if (rawChoice !== undefined && rawChoice !== null) {
        if (typeof rawChoice === 'number') {
          selectedOptIndex = rawChoice;
          isCorrect = selectedOptIndex === correctOptIndex;
        } else if (typeof rawChoice === 'string') {
          const numChoice = parseInt(rawChoice, 10);
          if (!isNaN(numChoice) && numChoice >= 0 && numChoice < options.length) {
            selectedOptIndex = numChoice;
            isCorrect = selectedOptIndex === correctOptIndex;
          } else {
            // Choice text match
            selectedOptIndex = options.findIndex((opt: string) => opt.toLowerCase() === rawChoice.toLowerCase());
            if (selectedOptIndex < 0) selectedOptIndex = 0;
            isCorrect = selectedOptIndex === correctOptIndex;
          }
        }
      }
    }

    // If specific answer was not found in answersMap, reconstruct based on targetCorrect count
    if (selectedOptIndex === -1) {
      isCorrect = idx < targetCorrect;
      if (isCorrect) {
        selectedOptIndex = correctOptIndex;
      } else {
        selectedOptIndex = (correctOptIndex + 1) % options.length;
      }
    }

    const selectedOptText = options[selectedOptIndex] || (selectedOptIndex >= 0 ? `Вариант ${selectedOptIndex + 1}` : 'Не отвечено');

    return {
      questionId: qId,
      questionText: q.question || `Вопрос №${qNum}`,
      selectedOptionIndex: selectedOptIndex,
      selectedOptionText: selectedOptText,
      correctOptionIndex: correctOptIndex,
      correctOptionText: correctOptText,
      isCorrect,
      explanation: q.explanation || '',
    };
  });
}

export function isValidQuizId(quizId: string): boolean {
  if (!quizId || typeof quizId !== 'string') return false;
  const clean = quizId.trim().toUpperCase();
  if (clean.includes('@') || clean.includes(' ') || clean.length > 30) return false;
  if (clean.startsWith('ADM-') || clean.startsWith('USR-') || clean.startsWith('STU-')) return false;
  if (clean.startsWith('TEST_') || clean.startsWith('TEST-') || clean === 'FINAL_EXAM') return true;
  if (clean.startsWith('LESSON_') || clean.startsWith('QUIZ_') || clean.startsWith('QUIZ-')) return true;
  if (/^\d+$/.test(clean)) return true;
  return Boolean(QUIZ_TITLES_BY_ID[clean] || ALL_QUIZ_TESTS.some(t => t.id.toUpperCase() === clean));
}

export function isLegacyDummySubmission(item: any): boolean {
  if (!item) return true;
  const id = String(item.id || item.submissionId || '');
  const quizId = String(item.quizId || item.testId || item.QuizID || '');
  const quizTitle = String(item.quizTitle || item.title || item.QuizTitle || '');

  // Only apply quiz checks if this item is a quiz submission
  const isQuiz = Boolean(quizId || (item.quizTitle && !item.lessonId) || id.startsWith('QUIZ-') || id.startsWith('QSUB-'));
  if (isQuiz) {
    if (quizId.includes('@') || quizTitle.includes('@')) {
      return true;
    }
    if (
      quizId.toUpperCase().startsWith('ADM-') ||
      quizId.toUpperCase().startsWith('USR-') ||
      quizId.toUpperCase().startsWith('STU-')
    ) {
      return true;
    }
    if (quizId && !isValidQuizId(quizId)) {
      return true;
    }
    if (
      id.startsWith('QUIZ-SUB-SYNTH-') ||
      id === 'QUIZ-SUB-USR-STU-02-L1' ||
      id === 'QUIZ-SUB-USR-5666-798-L1'
    ) {
      return true;
    }
  }

  // Only check static dummy test fixture strings
  if (
    id === 'SUB-HW-L1-001' ||
    id === 'SUB-HW-L1-002'
  ) {
    return true;
  }
  return false;
}

export function isLegacyDummyScore(testId?: string, item?: any): boolean {
  if (!testId && !item) return true;
  const id = String(testId || item?.id || item?.quizId || item?.submissionId || '');
  if (
    id.includes('@') ||
    id.toUpperCase().startsWith('ADM-') ||
    id.toUpperCase().startsWith('USR-') ||
    id.toUpperCase().startsWith('STU-')
  ) {
    return true;
  }
  if (id && !isValidQuizId(id)) {
    return true;
  }
  if (
    id.startsWith('QUIZ-SUB-SYNTH-') ||
    id === 'QUIZ-SUB-USR-STU-02-L1' ||
    id === 'QUIZ-SUB-USR-5666-798-L1'
  ) {
    return true;
  }
  return false;
}

/**
 * Detect quiz ID from question IDs in details array
 */
export function detectQuizIdFromQuestions(details: any[]): string {
  if (!Array.isArray(details) || details.length === 0) return 'LESSON_1';
  const firstId = Number(details[0]?.questionId || details[0]?.id || 0);
  if (firstId >= 101 && firstId <= 2405) {
    const lessonNum = Math.floor(firstId / 100);
    if (lessonNum >= 1 && lessonNum <= 24) {
      return `LESSON_${lessonNum}`;
    }
  }
  if (firstId >= 8000 || firstId >= 800) return 'FINAL_EXAM';
  return 'LESSON_1';
}

/**
 * Get human-readable title for a quiz ID
 */
export function getCleanQuizTitle(quizId: string, fallbackTitle?: string): string {
  if (!quizId || typeof quizId !== 'string' || quizId.includes('@') || quizId.startsWith('ADM-') || quizId.startsWith('USR-') || quizId.startsWith('STU-')) {
    return QUIZ_TITLES_BY_ID.TEST_1;
  }
  const cleanId = quizId.toUpperCase().trim();
  if (QUIZ_TITLES_BY_ID[cleanId]) {
    return QUIZ_TITLES_BY_ID[cleanId];
  }
  if (cleanId.startsWith('LESSON_')) {
    const num = cleanId.replace(/\D/g, '') || '1';
    if (fallbackTitle && !fallbackTitle.includes('[') && !fallbackTitle.includes('@') && !fallbackTitle.includes('{')) {
      return fallbackTitle.startsWith('⚡') ? fallbackTitle : `⚡ ${fallbackTitle}`;
    }
    return `⚡ Мини-тест к Уроку №${num}`;
  }
  const matched = ALL_QUIZ_TESTS.find((q) => q.id.toUpperCase() === cleanId);
  if (matched?.title) {
    return matched.title;
  }
  if (fallbackTitle && !fallbackTitle.includes('[') && !fallbackTitle.toLowerCase().includes('unknown') && !fallbackTitle.includes('@') && fallbackTitle !== 'Результаты Тестов') {
    return fallbackTitle;
  }
  const num = quizId.replace(/\D/g, '');
  if (num) {
    return `📝 РУБЕЖНЫЙ ТЕСТ ПО БЛОКУ ${num} (20 вопросов)`;
  }
  return `📝 РУБЕЖНЫЙ ТЕСТ (${cleanId || 'Тест'})`;
}

/**
 * Thoroughly sanitize and normalize a quiz submission object from any source
 * (Google Sheets, Apps Script WebApp, localStorage, GViz)
 */
export function sanitizeQuizSubmission(q: any, userAccounts?: UserAccount[]): QuizSubmissionResult {
  if (!q) {
    return {
      id: `QUIZ-SUB-${Date.now()}`,
      quizId: 'TEST_1',
      quizTitle: QUIZ_TITLES_BY_ID.TEST_1,
      studentName: 'Студент',
      studentId: 'USR-STU-01',
      studentEmail: 'student@devopspro.tech',
      submittedAt: new Date().toLocaleString('ru-RU'),
      scorePct: 80,
      passed: true,
      correctCount: 8,
      totalQuestions: 10,
      mentorComment: '',
      details: [],
    };
  }

  let details: any[] = [];

  // Check all possible fields where JSON question details might have been placed
  const possibleJsonSources = [
    q.details,
    q.DetailsJSON,
    q.detailsJson,
    q.Details,
    q['Details JSON'],
    q['DetailsJSON'],
    q.submittedAt,
    q.SubmittedAt,
    q['Submitted At'],
    q.quizTitle,
    q.QuizTitle,
    q['Quiz Title'],
    q.quizId,
    q.QuizID,
    q['Quiz ID'],
    q.mentorComment,
    q.MentorComment,
    q['Mentor Comment'],
    q.id,
    q.SubmissionID,
    q.submissionId,
    q['Submission ID'],
  ];

  for (const src of possibleJsonSources) {
    if (Array.isArray(src) && src.length > 0 && details.length === 0) {
      details = src;
    } else if (typeof src === 'string' && src.trim().startsWith('[') && (src.includes('questionId') || src.includes('questionText')) && details.length === 0) {
      try {
        const parsed = JSON.parse(src);
        if (Array.isArray(parsed) && parsed.length > 0) {
          details = parsed;
        }
      } catch {}
    }
  }

  // Clean details items to ensure consistent schema
  let cleanDetails: any[] = [];
  if (Array.isArray(details) && details.length > 0) {
    cleanDetails = details.map((d: any, idx: number) => {
      if (!d || typeof d !== 'object') return null;
      const qNum = idx + 1;
      const isCor = Boolean(
        d.isCorrect !== undefined
          ? (d.isCorrect === true || String(d.isCorrect).toLowerCase() === 'true')
          : (d.selectedOptionIndex !== undefined && d.correctOptionIndex !== undefined && d.selectedOptionIndex === d.correctOptionIndex)
      );
      return {
        questionId: typeof d.questionId === 'number' ? d.questionId : (typeof d.id === 'number' ? d.id : qNum),
        questionText: String(d.questionText || d.question || `Вопрос №${qNum}`),
        selectedOptionIndex: typeof d.selectedOptionIndex === 'number' ? d.selectedOptionIndex : (typeof d.selectedChoice === 'number' ? d.selectedChoice : -1),
        selectedOptionText: String(d.selectedOptionText || d.selectedOption || d.userAnswer || 'Не отвечено'),
        correctOptionIndex: typeof d.correctOptionIndex === 'number' ? d.correctOptionIndex : (typeof d.correctChoice === 'number' ? d.correctChoice : 0),
        correctOptionText: String(d.correctOptionText || d.correctOption || d.answer || ''),
        isCorrect: isCor,
        explanation: String(d.explanation || ''),
      };
    }).filter(Boolean);
  }

  // Sanitize submittedAt
  let submittedAt = q.submittedAt || q.submitted_at || q.SubmittedAt || q['Submitted At'] || q.completedAt || q.CompletedAt || '';
  if (typeof submittedAt === 'string' && (submittedAt.trim().startsWith('[') || submittedAt.trim().startsWith('{') || submittedAt.includes('questionId') || submittedAt.includes('questionText'))) {
    submittedAt = new Date().toLocaleString('ru-RU');
  }
  if (!submittedAt || submittedAt === '—' || submittedAt === 'undefined' || submittedAt === 'null') {
    submittedAt = new Date().toLocaleString('ru-RU');
  }

  // Sanitize quizId (support camelCase, snake_case from SQLite, and numeric IDs)
  let quizId = q.quizId || q.quiz_id || q.QuizID || q['Quiz ID'] || q.lesson_id || q.lessonId || q.testId || '';
  if (typeof quizId === 'number') {
    quizId = String(quizId);
  }
  if (typeof quizId === 'string') {
    quizId = quizId.trim();
    if (quizId.startsWith('[') || quizId.startsWith('{') || quizId.includes('questionId') || quizId.includes('@') || quizId.startsWith('ADM-') || quizId.startsWith('USR-') || quizId.startsWith('STU-') || quizId.length > 35) {
      quizId = detectQuizIdFromQuestions(cleanDetails);
    }
  }
  if (!quizId || quizId.toLowerCase() === 'unknown') {
    quizId = detectQuizIdFromQuestions(cleanDetails);
  }
  // Standardize quiz ID format (e.g. 1 -> LESSON_1, lesson-1-test -> LESSON_1, test_1 -> TEST_1)
  if (quizId.toUpperCase() === 'FINAL_EXAM' || quizId.toUpperCase() === 'FINAL') {
    quizId = 'FINAL_EXAM';
  } else if (/^BLOCK(?:_TEST)?[_-]?[1-6]$/i.test(quizId)) {
    const num = quizId.replace(/\D/g, '') || '1';
    quizId = `TEST_${num}`;
  } else if (/^TEST_[1-6]$/i.test(quizId) && (cleanDetails?.length >= 15 || (q as any)?.totalQuestions >= 15 || String(q.quizTitle || q.quiz_title || '').includes('БЛОК') || String(q.quizTitle || q.quiz_title || '').includes('РУБЕЖН'))) {
    quizId = quizId.toUpperCase();
  } else if (/^\d+$/.test(quizId)) {
    const num = parseInt(quizId, 10);
    quizId = `LESSON_${num}`;
  } else if (/^(?:LESSON|QUIZ|TEST)[_-]?(\d+)/i.test(quizId)) {
    const m = quizId.match(/^(?:LESSON|QUIZ|TEST)[_-]?(\d+)/i);
    const num = m ? parseInt(m[1], 10) : 1;
    quizId = `LESSON_${num}`;
  } else if (quizId.toUpperCase().startsWith('LESSON_')) {
    quizId = quizId.toUpperCase();
  }

  if (!isValidQuizId(quizId)) {
    quizId = detectQuizIdFromQuestions(cleanDetails);
    if (!isValidQuizId(quizId)) {
      quizId = 'LESSON_1';
    }
  }

  // Sanitize quizTitle
  let rawQuizTitle = q.quizTitle || q.quiz_title || q.QuizTitle || q['Quiz Title'] || '';
  if (
    !rawQuizTitle ||
    rawQuizTitle.toLowerCase() === 'unknown' ||
    rawQuizTitle.includes('@') ||
    rawQuizTitle.trim().startsWith('[') ||
    rawQuizTitle.trim().startsWith('{') ||
    rawQuizTitle.includes('questionId') ||
    rawQuizTitle.startsWith('Результаты Тестов') ||
    rawQuizTitle === 'Тестовое задание'
  ) {
    rawQuizTitle = getCleanQuizTitle(quizId);
  } else {
    // If it has "Результаты Тестов ([...])", strip the JSON part
    if (rawQuizTitle.includes('([') || rawQuizTitle.includes('({"') || rawQuizTitle.length > 150) {
      rawQuizTitle = getCleanQuizTitle(quizId);
    }
  }

  // Sanitize Student info
  let studentId = q.studentId || q.student_id || q.StudentID || q.StudentId || q['Student ID'] || q['Student Id'] || '';
  let studentEmail = (q.studentEmail || q.student_email || q.StudentEmail || q['Student Email'] || q.email || q.Email || '').toLowerCase().trim();
  let studentName = q.studentName || q.student_name || q.StudentName || q['Student Name'] || q.name || '';

  if (typeof studentId === 'string' && (studentId.trim().startsWith('[') || studentId.trim().startsWith('{') || studentId.includes('questionId'))) {
    studentId = '';
  }
  if (typeof studentEmail === 'string' && (studentEmail.trim().startsWith('[') || studentEmail.trim().startsWith('{') || studentEmail.includes('questionId') || !studentEmail.includes('@'))) {
    studentEmail = '';
  }
  if (typeof studentName === 'string' && (studentName.trim().startsWith('[') || studentName.trim().startsWith('{') || studentName.includes('questionId'))) {
    studentName = '';
  }

  if (userAccounts && userAccounts.length > 0) {
    const matchedUser = userAccounts.find(
      (u) =>
        (studentId && (u.id === studentId || u.id === `USR-STU-${studentId.replace(/\D/g, '')}` || u.id.endsWith(studentId.replace(/\D/g, '')))) ||
        (studentEmail && u.email && u.email.toLowerCase() === studentEmail.toLowerCase())
    );

    if (matchedUser) {
      if (!studentName || studentName.toLowerCase() === 'unknown' || studentName === 'Студент' || studentName === 'Student') {
        studentName = matchedUser.name;
      }
      if (!studentId) studentId = matchedUser.id;
      if (!studentEmail) studentEmail = matchedUser.email;
    }
  }

  if (!studentEmail) {
    studentEmail = 'student@devopspro.tech';
  }
  if (!studentId) {
    const digits = studentEmail.replace(/\D/g, '');
    studentId = digits ? `USR-${digits.slice(-7)}` : 'USR-STU-01';
  }
  if (!studentName || studentName.toLowerCase() === 'unknown') {
    studentName = studentEmail ? studentEmail.split('@')[0] : (studentId ? `Студент (${studentId})` : 'Студент');
  }

  // Scores (strictly default to 0 and false if not completed or failed)
  let scorePct = 0;
  if (q.scorePct !== undefined && q.scorePct !== null && q.scorePct !== '') {
    scorePct = Number(q.scorePct);
  } else if (q.score_pct !== undefined && q.score_pct !== null && q.score_pct !== '') {
    scorePct = Number(q.score_pct);
  } else if (q.ScorePct !== undefined && q.ScorePct !== null && q.ScorePct !== '') {
    scorePct = Number(q.ScorePct);
  } else if (q.percentage !== undefined && q.percentage !== null && q.percentage !== '') {
    scorePct = Number(q.percentage);
  } else if (q.score !== undefined && q.score !== null && q.score !== '') {
    scorePct = Number(q.score);
  } else if (cleanDetails.length > 0) {
    const cor = cleanDetails.filter((d: any) => d && d.isCorrect).length;
    scorePct = Math.round((cor / cleanDetails.length) * 100);
  }
  if (isNaN(scorePct)) scorePct = 0;

  const passedRaw = q.passed !== undefined ? q.passed : (q.Passed !== undefined ? q.Passed : (q.status === 'Approved' ? true : undefined));
  let passed = false;
  if (passedRaw !== undefined) {
    const str = String(passedRaw).toUpperCase();
    if (str === 'FALSE' || str === 'FAILED' || passedRaw === false || q.status === 'Rejected') {
      passed = false;
    } else if (str === 'PASSED' || str === 'TRUE' || passedRaw === true) {
      passed = scorePct >= 60 || (scorePct === 0 && cleanDetails.length === 0);
    } else {
      passed = scorePct >= 60;
    }
  } else {
    passed = scorePct >= 60;
  }

  let totalQuestions = Number(q.totalQuestions || q.total_questions || q.TotalQuestions || q['Total Questions'] || (cleanDetails.length > 0 ? cleanDetails.length : 10));
  if (isNaN(totalQuestions) || totalQuestions <= 0) totalQuestions = 10;

  let correctCount = Number(q.correctCount !== undefined ? q.correctCount : (q.correct_count !== undefined ? q.correct_count : (q.CorrectCount !== undefined ? q.CorrectCount : q['Correct Count'])));
  if (isNaN(correctCount)) {
    if (cleanDetails.length > 0) {
      correctCount = cleanDetails.filter((d: any) => d && d.isCorrect).length;
    } else {
      correctCount = Math.round((scorePct / 100) * totalQuestions);
    }
  }

  let mentorComment = q.mentorComment || q.mentor_comment || q.MentorComment || q['Mentor Comment'] || '';
  if (typeof mentorComment === 'string' && (mentorComment.trim().startsWith('[') || mentorComment.trim().startsWith('{') || mentorComment.includes('questionId'))) {
    mentorComment = '';
  }

  // Sanitize submission ID (CRITICAL: ensure it is deterministic, clean and not random/JSON/email)
  let subId = q.id || q.SubmissionID || q.submissionId || q['Submission ID'] || q.SubmissionId || '';
  if (
    typeof subId === 'string' &&
    (subId.trim().startsWith('[') ||
      subId.trim().startsWith('{') ||
      subId.includes('questionId') ||
      subId.includes('questionText') ||
      (!subId.toLowerCase().startsWith('quiz') && subId.includes('@')) ||
      subId.length > 80)
  ) {
    subId = '';
  }
  if (!subId || subId.toLowerCase() === 'unknown' || subId.startsWith('QSUB-')) {
    const cleanUid = studentId.replace(/[^a-zA-Z0-9]/g, '').slice(-8) || 'STU';
    const cleanQid = (quizId || 'TEST_1').replace(/[^a-zA-Z0-9_]/g, '');
    subId = `QUIZ-SUB-${cleanQid}-${cleanUid}`;
  }

  // Ensure cleanDetails is fully resolved if missing or incomplete
  const hadExplicitDetails = cleanDetails.length > 0;
  const hadExplicitScore =
    (q.scorePct !== undefined && q.scorePct !== null && q.scorePct !== '') ||
    (q.score_pct !== undefined && q.score_pct !== null && q.score_pct !== '') ||
    (q.ScorePct !== undefined && q.ScorePct !== null && q.ScorePct !== '') ||
    (q.percentage !== undefined && q.percentage !== null && q.percentage !== '') ||
    (q.score !== undefined && q.score !== null && q.score !== '');

  // Extract clean userAnswers map (never an array)
  let cleanUserAnswers: Record<string, any> = {};
  const rawUserAnsCandidates = [q.userAnswers, q.user_answers, q.answers, q.answers_json];
  for (const cand of rawUserAnsCandidates) {
    if (cand && typeof cand === 'object' && !Array.isArray(cand) && Object.keys(cand).length > 0) {
      cleanUserAnswers = { ...cand };
      break;
    } else if (typeof cand === 'string' && cand.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(cand);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length > 0) {
          cleanUserAnswers = { ...parsed };
          break;
        }
      } catch {}
    }
  }

  if (cleanDetails.length === 0) {
    cleanDetails = resolveQuizAnswerDetails({
      quizId,
      quizTitle: rawQuizTitle,
      correctCount,
      totalQuestions,
      scorePct,
      passed,
      userAnswers: cleanUserAnswers,
      details: q.details,
    });
  }

  if (hadExplicitDetails && !hadExplicitScore && cleanDetails.length > 0) {
    totalQuestions = cleanDetails.length;
    correctCount = cleanDetails.filter((d: any) => d && d.isCorrect).length;
    scorePct = Math.round((correctCount / totalQuestions) * 100);
    passed = scorePct >= 60;
  } else if (cleanDetails.length > 0 && !hadExplicitDetails && hadExplicitScore) {
    // Ensure synthesized details match the explicit correctCount / scorePct
    totalQuestions = cleanDetails.length;
    const targetCor = Math.min(totalQuestions, Math.max(0, Math.round((scorePct / 100) * totalQuestions)));
    if (isNaN(correctCount) || correctCount <= 0) {
      correctCount = targetCor;
    }
    cleanDetails = cleanDetails.map((d: any, idx: number) => {
      const shouldBeCorrect = idx < correctCount;
      if (Boolean(d.isCorrect) === shouldBeCorrect) return d;
      return {
        ...d,
        isCorrect: shouldBeCorrect,
        selectedOptionIndex: shouldBeCorrect ? d.correctOptionIndex : (d.correctOptionIndex + 1) % 4,
        selectedOptionText: shouldBeCorrect ? d.correctOptionText : d.selectedOptionText,
      };
    });
  }

  if (Object.keys(cleanUserAnswers).length === 0 && cleanDetails.length > 0) {
    cleanDetails.forEach((d: any, idx: number) => {
      if (d && typeof d.selectedOptionIndex === 'number' && d.selectedOptionIndex >= 0) {
        const key = d.questionId !== undefined ? d.questionId : idx + 1;
        cleanUserAnswers[String(key)] = d.selectedOptionIndex;
      }
    });
  }

  const lessonIdMatch = String(quizId).match(/^LESSON_(\d+)$/i);
  const resolvedLessonId =
    Number(q.lessonId || q.lesson_id || (lessonIdMatch ? parseInt(lessonIdMatch[1], 10) : 0)) || undefined;

  return {
    id: subId,
    quizId,
    lessonId: resolvedLessonId,
    quizTitle: rawQuizTitle,
    studentName,
    studentId,
    studentEmail,
    submittedAt,
    scorePct,
    passed,
    correctCount,
    totalQuestions,
    userAnswers: cleanUserAnswers,
    mentorComment,
    details: cleanDetails,
    status: q.status || (mentorComment ? 'Approved' : 'Submitted'),
    reviewedAt: q.reviewedAt || q.ReviewedAt,
    reviewedBy: q.reviewedBy || q.ReviewedBy,
  };
}

const ZERO_INDEXED_QUIZ_LESSONS = new Set([12, 13, 14, 16, 17, 18, 19]);
const LETTER_KEY_QUIZ_LESSONS = new Set([5, 6, 7, 8, 20]);

export function evaluateLessonQuiz(
  lessonId: number,
  questions: any[],
  rawAnswers: Record<string | number, any> = {}
): {
  componentAnswers: Record<any, any>;
  details: QuizAnswerDetail[];
  correctCount: number;
  totalQuestions: number;
  scorePct: number;
  passed: boolean;
  earnedExp: number;
} {
  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : LESSON_QUIZZES[lessonId] || LESSON_QUIZZES[1] || [];
  const usesZeroIndex = ZERO_INDEXED_QUIZ_LESSONS.has(lessonId);
  const usesLetterKey = LETTER_KEY_QUIZ_LESSONS.has(lessonId);
  const usesLowerOptionId = lessonId === 22;

  const componentAnswers: Record<any, any> = {};
  let correctCount = 0;

  const details: QuizAnswerDetail[] = safeQuestions.map((q: any, idx: number) => {
    const qNum = idx + 1;
    const qId = q.id !== undefined ? q.id : qNum;
    const primaryKey = usesZeroIndex ? idx : qId;
    const questionText = String(q.q || q.question || `Вопрос №${qNum}`);
    const rawOpts: any[] = Array.isArray(q.options) ? q.options : Array.isArray(q.opts) ? q.opts : [];

    const normalizedOpts = rawOpts.map((opt: any, optIdx: number) => {
      if (typeof opt === 'string') {
        return {
          text: opt,
          key: String.fromCharCode(65 + optIdx),
          id: String.fromCharCode(97 + optIdx),
          isCorrect: false,
        };
      }
      return {
        text: String(opt?.text || opt?.label || `Вариант ${optIdx + 1}`),
        key: String(opt?.key || opt?.id || String.fromCharCode(65 + optIdx)),
        id: String(opt?.id || opt?.key || String.fromCharCode(97 + optIdx)),
        isCorrect: Boolean(opt?.isCorrect),
      };
    });

    let correctOptionIndex = 0;
    if (typeof q.correct === 'number') {
      correctOptionIndex = q.correct;
    } else if (typeof q.correctIndex === 'number') {
      correctOptionIndex = q.correctIndex;
    } else if (typeof q.correct === 'string' || typeof q.correctKey === 'string') {
      const targetKey = String(q.correct || q.correctKey).trim().toUpperCase();
      const foundIdx = normalizedOpts.findIndex((o) => o.key.toUpperCase() === targetKey);
      correctOptionIndex = foundIdx >= 0 ? foundIdx : Math.max(0, targetKey.charCodeAt(0) - 65);
    } else if (normalizedOpts.some((o) => o.isCorrect)) {
      correctOptionIndex = Math.max(0, normalizedOpts.findIndex((o) => o.isCorrect));
    }

    // Lookup user's raw answer for this question
    let rawChoice: any = undefined;
    if (rawAnswers && typeof rawAnswers === 'object' && !Array.isArray(rawAnswers)) {
      if (rawAnswers[primaryKey] !== undefined) {
        rawChoice = rawAnswers[primaryKey];
      } else if (rawAnswers[String(primaryKey)] !== undefined) {
        rawChoice = rawAnswers[String(primaryKey)];
      } else if (!usesZeroIndex && rawAnswers[qNum] !== undefined) {
        rawChoice = rawAnswers[qNum];
      } else if (!usesZeroIndex && rawAnswers[String(qNum)] !== undefined) {
        rawChoice = rawAnswers[String(qNum)];
      } else if (usesZeroIndex && rawAnswers[qId] !== undefined && rawAnswers[0] === undefined && rawAnswers['0'] === undefined) {
        rawChoice = rawAnswers[qId];
      } else if (!usesZeroIndex && rawAnswers[idx] !== undefined && rawAnswers[safeQuestions.length] === undefined && (rawAnswers[0] !== undefined || rawAnswers['0'] !== undefined)) {
        rawChoice = rawAnswers[idx];
      }
    }

    let selectedOptionIndex = -1;
    if (rawChoice !== undefined && rawChoice !== null && rawChoice !== -1 && rawChoice !== '') {
      if (typeof rawChoice === 'number') {
        selectedOptionIndex = rawChoice;
      } else if (typeof rawChoice === 'string') {
        const trimmed = rawChoice.trim();
        if (/^\d+$/.test(trimmed)) {
          selectedOptionIndex = parseInt(trimmed, 10);
        } else {
          const lower = trimmed.toLowerCase();
          const byKey = normalizedOpts.findIndex(
            (o) => o.key.toLowerCase() === lower || o.id.toLowerCase() === lower
          );
          if (byKey >= 0) {
            selectedOptionIndex = byKey;
          } else if (trimmed.length === 1 && /^[a-dA-D]$/.test(trimmed)) {
            selectedOptionIndex = trimmed.toUpperCase().charCodeAt(0) - 65;
          } else {
            const byText = normalizedOpts.findIndex((o) => o.text.toLowerCase() === lower);
            if (byText >= 0) selectedOptionIndex = byText;
          }
        }
      }
    }

    if (selectedOptionIndex >= 0 && selectedOptionIndex < normalizedOpts.length) {
      if (usesLetterKey) {
        componentAnswers[primaryKey] = normalizedOpts[selectedOptionIndex]?.key || String.fromCharCode(65 + selectedOptionIndex);
      } else if (usesLowerOptionId) {
        componentAnswers[primaryKey] = normalizedOpts[selectedOptionIndex]?.id || String.fromCharCode(97 + selectedOptionIndex);
      } else {
        componentAnswers[primaryKey] = selectedOptionIndex;
      }
    }

    const isCorrect = selectedOptionIndex >= 0 && selectedOptionIndex === correctOptionIndex;
    if (isCorrect) correctCount += 1;

    const selectedOptionText =
      selectedOptionIndex >= 0 && normalizedOpts[selectedOptionIndex]
        ? normalizedOpts[selectedOptionIndex].text
        : 'Ответ не выбран';
    const correctOptionText = normalizedOpts[correctOptionIndex]?.text || '';
    const explanation = String(q.explanation || q.expl || q.exp || q.hint || '');

    return {
      questionId: typeof qId === 'number' ? qId : qNum,
      questionText,
      selectedOptionIndex,
      selectedOptionText,
      correctOptionIndex,
      correctOptionText,
      isCorrect,
      explanation,
    };
  });

  const totalQuestions = safeQuestions.length || 5;
  const scorePct = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);
  const passed = scorePct >= 60;
  const earnedExp = COURSE_RULES.calculateTestExp(scorePct, passed, false, correctCount, totalQuestions);

  return {
    componentAnswers,
    details,
    correctCount,
    totalQuestions,
    scorePct,
    passed,
    earnedExp,
  };
}

export interface ActiveLessonQuizRegistration {
  lessonId: number;
  questions: any[];
  answers: Record<any, any>;
  setAnswers: (val: any) => void;
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
  setScore?: (val: number) => void;
  quizTitle?: string;
  submitNow: () => Promise<void>;
}

export const activeLessonQuizRegistry = new Map<number, ActiveLessonQuizRegistration>();

export function useLessonQuizPersistence(
  lessonId: number,
  questions: any[],
  answers: Record<any, any>,
  setAnswers: React.Dispatch<React.SetStateAction<any>>,
  submitted: boolean,
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setScore?: React.Dispatch<React.SetStateAction<number>>,
  quizTitle?: string
) {
  const portal = usePortal() as any;
  const wasManuallyResetRef = useRef<boolean>(false);
  const prevSubmittedRef = useRef<boolean>(submitted);
  const lastSubmittedSigRef = useRef<string>('');

  const activeEmail = String(portal?.profile?.email || '').toLowerCase().trim();
  const activeId = String(portal?.profile?.id || '').trim();

  const existingSub = (portal?.quizSubmissions || []).find((q: any) => {
    if (!q) return false;
    const qIdStr = String(q.quizId || '').trim().toUpperCase();
    const isThisLesson =
      Number(q.lessonId) === lessonId ||
      qIdStr === String(lessonId) ||
      qIdStr === `LESSON_${lessonId}` ||
      qIdStr === `LESSON_TEST_${lessonId}` ||
      qIdStr === `LESSON-${lessonId}-TEST` ||
      qIdStr === `TEST_LESSON_${lessonId}` ||
      qIdStr === `TEST-${lessonId}` ||
      (qIdStr === `TEST_${lessonId}` && (lessonId > 6 || Number(q.totalQuestions || 5) <= 10));
    if (!isThisLesson) return false;
    const subEmail = String(q.studentEmail || '').toLowerCase().trim();
    const subStuId = String(q.studentId || '').trim();
    if (!subEmail && !subStuId) return true;
    return (activeEmail && subEmail === activeEmail) || (activeId && subStuId === activeId);
  });

  const submitToPortalAndBackend = async (answersToSubmit: Record<any, any>) => {
    const evalResult = evaluateLessonQuiz(lessonId, questions, answersToSubmit);
    if (setScore) {
      setScore(evalResult.correctCount);
    }

    try {
      const jsonAns = JSON.stringify(evalResult.componentAnswers);
      localStorage.setItem(`devops_lesson_${lessonId}_quiz_answers`, jsonAns);
      localStorage.setItem(`devops_lesson${lessonId}_quiz_answers`, jsonAns);
      localStorage.setItem(`lesson_${lessonId}_quiz_answers`, jsonAns);
      localStorage.setItem(`devops_lesson_${lessonId}_quiz_submitted`, 'true');
      localStorage.setItem(`devops_lesson${lessonId}_quiz_submitted`, 'true');
      localStorage.setItem(`lesson_${lessonId}_quiz_submitted`, 'true');
    } catch {}

    if (portal?.markSectionRead) {
      portal.markSectionRead(`sec-${lessonId}-quiz`, lessonId);
    }
    if (portal?.saveTestScore) {
      portal.saveTestScore(`LESSON_${lessonId}`, evalResult.scorePct, evalResult.passed);
    }
    if (portal?.saveQuizSubmission) {
      const profile = portal?.profile || {
        id: 'USR-STU-01',
        email: 'student@devopspro.tech',
        name: 'Студент',
      };
      const cleanUid = String(profile.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '').slice(-8) || 'STU';
      const lessonObj = INITIAL_LESSONS.find((l) => l.id === lessonId);
      const resolvedTitle =
        quizTitle ||
        `⚡ Мини-тест к Уроку №${lessonId}${lessonObj?.titleRu ? `: ${lessonObj.titleRu}` : ''}`;

      await portal.saveQuizSubmission({
        id: existingSub?.id && !String(existingSub.id).startsWith('QSUB-')
          ? existingSub.id
          : `QUIZ-SUB-LESSON_${lessonId}-${cleanUid}`,
        quizId: `LESSON_${lessonId}`,
        lessonId,
        quizTitle: resolvedTitle,
        studentEmail: profile.email,
        studentName: profile.name,
        studentId: profile.id,
        submittedAt: new Date().toISOString(),
        scorePct: evalResult.scorePct,
        passed: evalResult.passed,
        correctCount: evalResult.correctCount,
        totalQuestions: evalResult.totalQuestions,
        userAnswers: evalResult.componentAnswers,
        details: evalResult.details,
        status: 'Submitted',
        mentorComment: existingSub?.mentorComment || '',
      });
    }
  };

  // Register active lesson quiz so InlineTestSubmission stays 100% synced
  useEffect(() => {
    activeLessonQuizRegistry.set(lessonId, {
      lessonId,
      questions,
      answers,
      setAnswers,
      submitted,
      setSubmitted,
      setScore,
      quizTitle,
      submitNow: async () => {
        let targetAnswers = answers;
        if (!targetAnswers || Object.keys(targetAnswers).length === 0) {
          // Synthesize 100% answers if confirmed via bottom button without clicking options
          const synthRaw: Record<number, number> = {};
          (questions || []).forEach((q: any, idx: number) => {
            const evalSingle = evaluateLessonQuiz(lessonId, [q], {});
            const cIdx = evalSingle.details[0]?.correctOptionIndex ?? 0;
            const key = ZERO_INDEXED_QUIZ_LESSONS.has(lessonId) ? idx : (q.id ?? idx + 1);
            synthRaw[key] = cIdx;
          });
          const evalSynth = evaluateLessonQuiz(lessonId, questions, synthRaw);
          targetAnswers = evalSynth.componentAnswers;
          setAnswers(targetAnswers);
        }
        wasManuallyResetRef.current = false;
        prevSubmittedRef.current = true;
        setSubmitted(true);
        await submitToPortalAndBackend(targetAnswers);
      },
    });
    return () => {
      activeLessonQuizRegistry.delete(lessonId);
    };
  }, [lessonId, questions, answers, submitted, existingSub?.id]);

  // Hydrate saved answers and submitted status on mount or when database loads
  useEffect(() => {
    if (wasManuallyResetRef.current) return;

    if (existingSub && (existingSub.status === 'Rejected' || existingSub.retakeAllowed)) {
      try {
        localStorage.removeItem(`devops_lesson_${lessonId}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson${lessonId}_quiz_submitted`);
        localStorage.removeItem(`lesson_${lessonId}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson_${lessonId}_quiz_answers`);
        localStorage.removeItem(`devops_lesson${lessonId}_quiz_answers`);
        localStorage.removeItem(`lesson_${lessonId}_quiz_answers`);
      } catch {}
      if (submitted) {
        prevSubmittedRef.current = false;
        setSubmitted(false);
      }
      return;
    }

    let restoredRawAnswers: Record<any, any> | null = null;
    try {
      const savedJson =
        localStorage.getItem(`devops_lesson_${lessonId}_quiz_answers`) ||
        localStorage.getItem(`devops_lesson${lessonId}_quiz_answers`) ||
        localStorage.getItem(`lesson_${lessonId}_quiz_answers`);
      if (savedJson) {
        const parsed = JSON.parse(savedJson);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length > 0) {
          restoredRawAnswers = parsed;
        }
      }
    } catch {}

    if (!restoredRawAnswers && existingSub) {
      if (
        existingSub.userAnswers &&
        typeof existingSub.userAnswers === 'object' &&
        !Array.isArray(existingSub.userAnswers) &&
        Object.keys(existingSub.userAnswers).length > 0
      ) {
        restoredRawAnswers = existingSub.userAnswers;
      } else if (Array.isArray(existingSub.details) && existingSub.details.length > 0) {
        const fromDetails: Record<any, number> = {};
        existingSub.details.forEach((d: any, idx: number) => {
          if (d && typeof d.selectedOptionIndex === 'number' && d.selectedOptionIndex >= 0) {
            const key = ZERO_INDEXED_QUIZ_LESSONS.has(lessonId)
              ? idx
              : (questions[idx]?.id ?? d.questionId ?? idx + 1);
            fromDetails[key] = d.selectedOptionIndex;
          }
        });
        if (Object.keys(fromDetails).length > 0) {
          restoredRawAnswers = fromDetails;
        }
      }

      if (!restoredRawAnswers) {
        // Reconstruct from existingSub.correctCount / scorePct
        const totalQ = questions.length || 5;
        const targetCor =
          typeof existingSub.correctCount === 'number'
            ? existingSub.correctCount
            : Math.round(((existingSub.scorePct || 80) / 100) * totalQ);
        const synth: Record<any, number> = {};
        questions.forEach((q: any, idx: number) => {
          const evalOne = evaluateLessonQuiz(lessonId, [q], {});
          const cIdx = evalOne.details[0]?.correctOptionIndex ?? 0;
          const key = ZERO_INDEXED_QUIZ_LESSONS.has(lessonId) ? idx : (q.id ?? idx + 1);
          synth[key] = idx < targetCor ? cIdx : (cIdx + 1) % 4;
        });
        restoredRawAnswers = synth;
      }
    }

    const isSavedSubmitted = Boolean(
      (existingSub && existingSub.status !== 'Rejected' && !existingSub.retakeAllowed) ||
        localStorage.getItem(`devops_lesson_${lessonId}_quiz_submitted`) === 'true' ||
        localStorage.getItem(`devops_lesson${lessonId}_quiz_submitted`) === 'true' ||
        localStorage.getItem(`lesson_${lessonId}_quiz_submitted`) === 'true'
    );

    if (restoredRawAnswers && Object.keys(answers || {}).length === 0) {
      const evalResult = evaluateLessonQuiz(lessonId, questions, restoredRawAnswers);
      if (Object.keys(evalResult.componentAnswers).length > 0) {
        setAnswers(evalResult.componentAnswers);
        if (isSavedSubmitted && setScore) {
          setScore(evalResult.correctCount);
        }
      }
    } else if (isSavedSubmitted && setScore && Object.keys(answers || {}).length > 0) {
      const evalResult = evaluateLessonQuiz(lessonId, questions, answers);
      setScore(evalResult.correctCount);
    }

    if (isSavedSubmitted && !submitted) {
      const evalCurrent = evaluateLessonQuiz(lessonId, questions, restoredRawAnswers || answers || {});
      if (existingSub) {
        lastSubmittedSigRef.current = `${lessonId}:${JSON.stringify(evalCurrent.componentAnswers)}`;
      } else {
        lastSubmittedSigRef.current = '';
      }
      prevSubmittedRef.current = true;
      setSubmitted(true);
    }
  }, [lessonId, existingSub?.id, existingSub?.scorePct, existingSub?.status]);

  // Save in-progress answers to localStorage whenever user selects an option
  useEffect(() => {
    if (answers && typeof answers === 'object' && Object.keys(answers).length > 0) {
      try {
        const json = JSON.stringify(answers);
        localStorage.setItem(`devops_lesson_${lessonId}_quiz_answers`, json);
        localStorage.setItem(`devops_lesson${lessonId}_quiz_answers`, json);
        localStorage.setItem(`lesson_${lessonId}_quiz_answers`, json);
      } catch {}
    }
  }, [lessonId, answers]);

  // Handle quiz submission and reset transitions
  useEffect(() => {
    const wasSubmitted = prevSubmittedRef.current;
    prevSubmittedRef.current = submitted;

    if (wasSubmitted && !submitted) {
      // User clicked Reset ("Пройти снова")
      wasManuallyResetRef.current = true;
      lastSubmittedSigRef.current = '';
      try {
        localStorage.removeItem(`devops_lesson_${lessonId}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson${lessonId}_quiz_submitted`);
        localStorage.removeItem(`lesson_${lessonId}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson_${lessonId}_quiz_answers`);
        localStorage.removeItem(`devops_lesson${lessonId}_quiz_answers`);
        localStorage.removeItem(`lesson_${lessonId}_quiz_answers`);
      } catch {}
      return;
    }

    if (submitted && Object.keys(answers || {}).length > 0) {
      wasManuallyResetRef.current = false;
      const sig = `${lessonId}:${JSON.stringify(answers)}`;
      if (!wasSubmitted || (!existingSub && lastSubmittedSigRef.current !== sig)) {
        lastSubmittedSigRef.current = sig;
        submitToPortalAndBackend(answers);
      }
    }
  }, [lessonId, submitted, answers]);
}

