export const COURSE_RULES = {
  totalBlocks: 6,
  lessonsPerBlock: 4,
  totalLessons: 24,

  // EXP Rewards
  sectionXP: 25,          // Per read section (4 sections per lesson = 100 XP)
  lessonCompletionXP: 50, // Bonus when all 4 sections completed
  laboratoryXP: 100,      // Approved / Passed laboratory work (Mentor score: 100, 75, 50 EXP; <50 rejected)
  testXP: 100,            // Max test XP (100 EXP for 10/10; 75 EXP for 1-3 mistakes; 50 EXP for 4 mistakes; 0 EXP for >4 mistakes)
  homeworkXP: 100,        // Approved homework assignment (Mentor score: 100, 75, 50 EXP; <50 rejected)
  blockTestXP: 100,       // Block test XP (100 EXP for 10/10; 75 EXP for 1-3 mistakes; 50 EXP for 4 mistakes; 0 EXP for >4 mistakes)
  finalExamXP: 500,       // Passed final exam (FINAL_EXAM, passing threshold 85%)
  badgeXP: 100,           // Base XP per unlocked Academic Award / Badge (100–150 XP)

  // Helper for Mentor-reviewed Homework & Laboratory EXP calculation
  // Strict Mentor Score scale: 100 EXP (Отлично), 75 EXP (Хорошо), 50 EXP (Удовлетворительно / Зачтено).
  // Calculated and confirmed ONLY after Mentor review (status === 'Approved').
  calculateMentorExp(score?: number | null, status: string = 'Approved', feedback?: string | null): 0 | 50 | 75 | 100 {
    const normStatus = String(status || 'Approved').trim().toLowerCase();
    if (normStatus !== 'approved') return 0;

    const fb = String(feedback || '').trim();
    const numScore = typeof score === 'number' && !isNaN(score) ? score : 0;

    // Support legacy 5-point scale (5 -> 100, 4 -> 75, 3 -> 50)
    if (numScore === 5) return 100;
    if (numScore === 4) return 75;
    if (numScore === 3) return 50;

    // If score is 0 or 50 (e.g. from unnormalized fallback), check if mentor feedback explicitly states 100 or 75
    if (numScore <= 50 && fb) {
      if (/100\s*\/\s*100|\+?\s*100\s*EXP|отличная работа/i.test(fb)) return 100;
      if (/75\s*\/\s*100|\+?\s*75\s*EXP|хорошая работа/i.test(fb)) return 75;
      if (/50\s*\/\s*100|\+?\s*50\s*EXP/i.test(fb)) return 50;
    }

    if (numScore <= 0) return 100;
    if (numScore < 50) return 0;
    if (numScore >= 88) return 100;
    if (numScore >= 63) return 75;
    return 50;
  },

  // Helper for dynamic Test / Minitest EXP calculation
  // +100 EXP (10/10 без ошибок), +75 EXP (1–3 ошибки), +50 EXP (4 ошибки). При >4 ошибках тест блокируется (0 EXP).
  calculateTestExp(scorePct: number, correctCount?: number, totalQuestions?: number): number {
    const totalQ = totalQuestions && totalQuestions > 0 ? totalQuestions : 10;
    const correct = correctCount !== undefined ? correctCount : Math.round((scorePct / 100) * totalQ);
    const rawMistakes = Math.max(0, totalQ - correct);

    // If already a 10-question test:
    if (totalQ === 10) {
      if (rawMistakes === 0) return 100;
      if (rawMistakes >= 1 && rawMistakes <= 3) return 75;
      if (rawMistakes === 4) return 50;
      return 0; // >4 mistakes => blocked (0 EXP)
    }

    // Normalized to 10-question scale for tests of other lengths:
    const normalizedMistakes = Math.round((rawMistakes / totalQ) * 10);
    if (normalizedMistakes <= 0) return 100;
    if (normalizedMistakes >= 1 && normalizedMistakes <= 3) return 75;
    if (normalizedMistakes === 4) return 50;
    return 0; // >4 mistakes => blocked (0 EXP)
  },

  // Block Tests config
  blockTest: {
    questions: 20,
    durationMinutes: 20,
    passingPercent: 60,
  },

  // Final Exam config
  finalExam: {
    questions: 60,
    durationMinutes: 90,
    passingPercent: 85, // 51 / 60 correct
  },

  // Academic Score Weights (Total 100%)
  academicWeights: {
    attendance: 0.10,   // 10% Attendance
    practical: 0.30,    // 30% Practical / Labs
    blockTests: 0.20,   // 20% Block Tests (Average of 6 tests)
    homework: 0.20,     // 20% Homework Assignments
    finalExam: 0.20,    // 20% Final Exam / Project
  }
} as const;

export type CourseRules = typeof COURSE_RULES;
