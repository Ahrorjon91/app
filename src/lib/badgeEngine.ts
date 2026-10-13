import { BadgeItem, LessonData, LabData } from '../types';
import { INITIAL_BADGES } from '../data/syllabusData';

export interface BadgeEvaluationContext {
  role?: string;
  email?: string;
  id?: string;
  lessons?: LessonData[];
  readSections?: Record<string, boolean>;
  labs?: LabData[];
  homeworks?: Record<string, any>;
  testScores?: Record<string, any>;
  attendancePct?: number;
  daysOnline?: number;
  totalXp?: number;
  rank?: number;
  completedLessonsCount?: number;
  completedLabsCount?: number;
  passedQuizCount?: number;
  labSubmissions?: any[];
  homeworkSubmissions?: any[];
  quizSubmissions?: any[];
}

/**
 * Flexible student matcher that safely compares emails, IDs, and usernames.
 */
export function matchesStudent(
  subEmail?: string,
  subId?: string,
  targetEmail?: string,
  targetId?: string
): boolean {
  if (!targetEmail && !targetId) return true;
  const sEmail = String(subEmail || '').toLowerCase().trim();
  const tEmail = String(targetEmail || '').toLowerCase().trim();
  const sId = String(subId || '').toLowerCase().trim();
  const tId = String(targetId || '').toLowerCase().trim();

  if (tEmail && sEmail) {
    if (sEmail === tEmail || sEmail.includes(tEmail) || tEmail.includes(sEmail)) return true;
    const sUser = sEmail.split('@')[0];
    const tUser = tEmail.split('@')[0];
    if (sUser && tUser && (sUser === tUser || sUser.includes(tUser) || tUser.includes(sUser))) return true;
  }
  if (tId && sId) {
    if (tId === sId || tId.includes(sId) || sId.includes(tId)) return true;
  }
  return false;
}

/**
 * Extracts a numeric lesson or lab index from arbitrary test IDs, keys, or labels.
 */
export function parseNumberFromKey(key: any): number | null {
  if (key === undefined || key === null) return null;
  if (typeof key === 'number') return isNaN(key) ? null : key;
  const str = String(key).trim();
  const m = str.match(/(?:LESSON_|TEST_LESSON_|LESSON_TEST_|QUIZ_|QUIZ-|LAB_|LAB-|TEST_|test_|lesson[_-]?|lab[_-]?|sec[_-])(\d+)/i);
  if (m) return parseInt(m[1], 10);
  const num = parseInt(str, 10);
  return isNaN(num) ? null : num;
}

/**
 * Automatically evaluates badge requirements against student achievements.
 * Preserves already unlocked badges and returns the updated badge collection.
 */
export function evaluateStudentBadges(
  currentBadges: BadgeItem[] | undefined,
  ctx: BadgeEvaluationContext
): { badges: BadgeItem[]; newlyUnlocked: BadgeItem[] } {
  const baseBadges = currentBadges && currentBadges.length > 0 ? currentBadges : INITIAL_BADGES;
  const today = new Date().toISOString().split('T')[0];
  const newlyUnlocked: BadgeItem[] = [];

  const isAdmin = ctx.role === 'admin' || (ctx.email && ctx.email.toLowerCase().trim() === 'admin@devopspro.tech');

  // If Admin, all badges are unlocked
  if (isAdmin) {
    const adminBadges = baseBadges.map((b) => ({
      ...b,
      titleRu: b.titleRu || b.title,
      descriptionRu: b.descriptionRu || b.description,
      unlocked: true,
      unlockedAt: b.unlockedAt || today,
    }));
    return { badges: adminBadges, newlyUnlocked: [] };
  }

  // Check if student is active (cannot earn badges if Blocked)
  const isInactive = ctx.role === 'blocked' || (ctx as any).status === 'Blocked' || (ctx as any).status === 'Inactive';
  if (isInactive) {
    const lockedBadges = baseBadges.map((b) => ({
      ...b,
      titleRu: b.titleRu || b.title,
      descriptionRu: b.descriptionRu || b.description,
      unlocked: false,
      unlockedAt: undefined,
    }));
    return { badges: lockedBadges, newlyUnlocked: [] };
  }

  // 1. Collect completed lesson IDs strictly from verified lesson completions or mentor-approved homeworks
  const completedLessonIds = new Set<number>();
  if (ctx.lessons && ctx.lessons.length > 0) {
    ctx.lessons.forEach((l) => {
      if (l.isCompleted) completedLessonIds.add(l.id);
    });
  }
  if (ctx.homeworkSubmissions && ctx.homeworkSubmissions.length > 0) {
    ctx.homeworkSubmissions.forEach((s: any) => {
      if (!s) return;
      if (!matchesStudent(s.studentEmail || s.student_email, s.studentId || s.student_id, ctx.email, ctx.id)) return;
      const st = String(s.status || s.submissionStatus || '').toLowerCase().trim();
      if (st === 'approved') {
        const num = Number(s.lessonId || s.lesson_id || parseNumberFromKey(s.id));
        if (!isNaN(num) && num >= 1 && num <= 24) {
          completedLessonIds.add(num);
        }
      }
    });
  }
  if (ctx.homeworks) {
    Object.entries(ctx.homeworks).forEach(([k, h]: [string, any]) => {
      if (!h) return;
      const st = String(h.status || h.submissionStatus || '').toLowerCase().trim();
      if (st === 'approved') {
        const num = Number(h.lessonId || h.lesson_id || k);
        if (!isNaN(num) && num >= 1 && num <= 24) {
          completedLessonIds.add(num);
        }
      }
    });
  }
  if (completedLessonIds.size === 0 && (!ctx.lessons || ctx.lessons.length === 0) && ctx.completedLessonsCount) {
    for (let i = 1; i <= Math.min(24, ctx.completedLessonsCount); i++) {
      completedLessonIds.add(i);
    }
  }

  // 2. Helper: Check if student passed a block's test WITHOUT ANY MISTAKE (score === 100%, 0 mistakes)
  const hasPerfectTest = (blockNum: number): boolean => {
    // Check in testScores object
    if (ctx.testScores) {
      const keys = [`TEST_${blockNum}`, `QUIZ_${blockNum}`, `test_${blockNum}`, `block_${blockNum}`];
      for (const k of keys) {
        const val = ctx.testScores[k];
        if (val) {
          const sc = typeof val === 'number' ? val : Number(val.scorePct ?? val.score ?? 0);
          const mistakes = val.mistakesCount ?? val.wrongAnswersCount ?? 0;
          if (sc >= 100 && mistakes === 0) return true;
        }
      }
    }
    // Check in quizSubmissions
    if (ctx.quizSubmissions) {
      const match = ctx.quizSubmissions.some((q: any) => {
        if (!matchesStudent(q.studentEmail, q.studentId, ctx.email, ctx.id)) return false;
        const qId = String(q.quizId || q.id || '');
        const num = parseNumberFromKey(qId);
        if (num !== blockNum) return false;
        const sc = Number(q.scorePct ?? q.score ?? 0);
        const mistakes = q.mistakesCount ?? q.wrongAnswersCount ?? 0;
        return sc >= 100 && mistakes === 0;
      });
      if (match) return true;
    }
    return false;
  };

  // 3. Helper: Check if student has at least one Lab in the theme with 100 EXP approved by mentor
  const has100ExpLab = (labIds: number[]): boolean => {
    const targetSet = new Set(labIds);
    if (ctx.labs) {
      const found = ctx.labs.some((l: any) => {
        const num = parseNumberFromKey(String(l.id || l.labId || ''));
        if (num === null || !targetSet.has(num)) return false;
        const st = String(l.submissionStatus || l.status || '').toLowerCase();
        const sc = Number(l.score ?? 0);
        const isApproved = st === 'approved' || st.includes('зачт') || st.includes('одобрен');
        return isApproved && sc === 100;
      });
      if (found) return true;
    }
    if (ctx.labSubmissions) {
      const found = ctx.labSubmissions.some((s: any) => {
        if (!matchesStudent(s.studentEmail, s.studentId, ctx.email, ctx.id)) return false;
        const num = parseNumberFromKey(String(s.labId || s.id || ''));
        if (num === null || !targetSet.has(num)) return false;
        const st = String(s.status || s.submissionStatus || '').toLowerCase();
        const sc = Number(s.score ?? 0);
        const isApproved = st === 'approved' || st.includes('зачт') || st.includes('одобрен');
        return isApproved && sc === 100;
      });
      if (found) return true;
    }
    return false;
  };

  // 4. Helper: Check if student has at least one Homework in the theme with 100 EXP approved by mentor
  const has100ExpHomework = (hwIds: number[]): boolean => {
    const targetSet = new Set(hwIds);
    if (ctx.homeworks) {
      const found = Object.values(ctx.homeworks).some((h: any) => {
        const num = parseNumberFromKey(String(h.lessonId || h.id || ''));
        if (num === null || !targetSet.has(num)) return false;
        const st = String(h.status || h.submissionStatus || '').toLowerCase();
        const sc = Number(h.score ?? 0);
        const isApproved = st === 'approved' || st.includes('зачт') || st.includes('одобрен');
        return isApproved && sc === 100;
      });
      if (found) return true;
    }
    if (ctx.homeworkSubmissions) {
      const found = ctx.homeworkSubmissions.some((s: any) => {
        if (!matchesStudent(s.studentEmail, s.studentId, ctx.email, ctx.id)) return false;
        const num = parseNumberFromKey(String(s.lessonId || s.id || ''));
        if (num === null || !targetSet.has(num)) return false;
        const st = String(s.status || s.submissionStatus || '').toLowerCase();
        const sc = Number(s.score ?? 0);
        const isApproved = st === 'approved' || st.includes('зачт') || st.includes('одобрен');
        return isApproved && sc === 100;
      });
      if (found) return true;
    }
    return false;
  };

  // 5. Helper: Check if all lessons of a theme are finished
  const hasFinishedThemeLessons = (lessonIds: number[]): boolean => {
    return lessonIds.every((id) => completedLessonIds.has(id));
  };

  const effectiveLessonsCount = Math.max(ctx.completedLessonsCount || 0, completedLessonIds.size);

  // Evaluate each badge strictly by theme
  const updatedBadges = baseBadges.map((badge) => {
    let shouldUnlock = false;

    switch (badge.id) {
      // Academic Awards unlocked progressively by completing lessons/quizzes
      case 'b_ai_explorer': {
        const passedL1Quiz = Boolean(
          ctx.testScores?.['LESSON_1']?.passed ||
          ctx.testScores?.['1']?.passed ||
          ctx.testScores?.['lesson-1-test']?.passed ||
          (typeof ctx.testScores?.['LESSON_1'] === 'number' && ctx.testScores['LESSON_1'] >= 60) ||
          (typeof ctx.testScores?.['1'] === 'number' && ctx.testScores['1'] >= 60) ||
          (typeof ctx.testScores?.['lesson-1-test'] === 'number' && ctx.testScores['lesson-1-test'] >= 60) ||
          (ctx.quizSubmissions || []).some((q: any) =>
            matchesStudent(q.studentEmail, q.studentId, ctx.email, ctx.id) &&
            (q.quizId === '1' || q.quizId === 'LESSON_1' || q.quizId === 'LESSON_TEST_1' || q.quizId === 'lesson-1-test' || q.lessonId === 1) &&
            (q.passed === true || q.passed === 1 || Number(q.scorePct ?? q.score ?? 0) >= 60)
          )
        );
        shouldUnlock = completedLessonIds.has(1) || passedL1Quiz;
        break;
      }
      case 'b_prompt_master': {
        shouldUnlock = completedLessonIds.has(2);
        break;
      }
      case 'b_multimodal': {
        shouldUnlock = completedLessonIds.has(4);
        break;
      }
      case 'b_vibe_coder': {
        shouldUnlock = completedLessonIds.has(8);
        break;
      }

      // b7: Virtualization Expert (Theme 1: Lessons 1-4)
      // Awarded ONLY after Theme 1 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b7':
        shouldUnlock =
          hasFinishedThemeLessons([1, 2, 3, 4]) &&
          hasPerfectTest(1) &&
          has100ExpLab([1, 2, 3, 4]) &&
          has100ExpHomework([1, 2, 3, 4]);
        break;

      // b1: Linux Hero (Theme 2: Lessons 5-8)
      // Awarded ONLY after Theme 2 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b1':
        shouldUnlock =
          hasFinishedThemeLessons([5, 6, 7, 8]) &&
          hasPerfectTest(2) &&
          has100ExpLab([5, 6, 7, 8]) &&
          has100ExpHomework([5, 6, 7, 8]);
        break;

      // b8: Automation Ninja (Theme 2 Automation: Bash/Cron Lessons 5, 6)
      case 'b8':
        shouldUnlock =
          hasFinishedThemeLessons([5, 6]) &&
          hasPerfectTest(2) &&
          has100ExpLab([5, 6]) &&
          has100ExpHomework([5, 6]);
        break;

      // b2: Network Master (Theme 3: Lessons 9-12)
      // Awarded ONLY after Theme 3 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b2':
        shouldUnlock =
          hasFinishedThemeLessons([9, 10, 11, 12]) &&
          hasPerfectTest(3) &&
          has100ExpLab([9, 10, 11, 12]) &&
          has100ExpHomework([9, 10, 11, 12]);
        break;

      // b5: Server Guru (Theme 4: Lessons 13-16)
      // Awarded ONLY after Theme 4 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b5':
        shouldUnlock =
          hasFinishedThemeLessons([13, 14, 15, 16]) &&
          hasPerfectTest(4) &&
          has100ExpLab([13, 14, 15, 16]) &&
          has100ExpHomework([13, 14, 15, 16]);
        break;

      // b6: Active Directory Master (Theme 4 Active Directory: Lessons 13, 14)
      case 'b6':
        shouldUnlock =
          hasFinishedThemeLessons([13, 14]) &&
          hasPerfectTest(4) &&
          has100ExpLab([13, 14]) &&
          has100ExpHomework([13, 14]);
        break;

      // b3: Cyber Defender (Theme 5: Lessons 17-20)
      // Awarded ONLY after Theme 5 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b3':
        shouldUnlock =
          hasFinishedThemeLessons([17, 18, 19, 20]) &&
          hasPerfectTest(5) &&
          has100ExpLab([17, 18, 19, 20]) &&
          has100ExpHomework([17, 18, 19, 20]);
        break;

      // b4: HelpDesk Pro (Theme 6: Lessons 21-24)
      // Awarded ONLY after Theme 6 is finished, test passed without mistake (100%), and HW & Lab are 100 EXP from mentors
      case 'b4':
        shouldUnlock =
          hasFinishedThemeLessons([21, 22, 23, 24]) &&
          hasPerfectTest(6) &&
          has100ExpLab([21, 22, 23, 24]) &&
          has100ExpHomework([21, 22, 23, 24]);
        break;

      // b9: Perfect Attendance (Идеальная Посещаемость)
      // Awarded ONLY if student comes online daily for more than 1 month (>= 30 days) and attendance >= 95%
      // NEVER awarded after just passing 1st lesson!
      case 'b9': {
        const attendancePct = ctx.attendancePct ?? 100;
        const daysOnline = (ctx as any).daysOnline || (ctx as any).streakDays || 0;
        // Requires at least 30 days of daily online attendance and at least 8 completed lessons (representing 1 month of study)
        shouldUnlock = attendancePct >= 95 && daysOnline >= 30 && effectiveLessonsCount >= 8;
        break;
      }

      case 'b_motion_designer':
        shouldUnlock = completedLessonIds.has(13);
        break;

      case 'b_scroll_storyteller':
        shouldUnlock = completedLessonIds.has(14);
        break;

      case 'b_creative_technologist':
        shouldUnlock = completedLessonIds.has(15);
        break;

      case 'app-builder-17':
        shouldUnlock = completedLessonIds.has(17);
        break;

      case 'data-engineer-18':
        shouldUnlock = completedLessonIds.has(18);
        break;

      case 'qa-engineer-21':
        shouldUnlock = completedLessonIds.has(21);
        break;

      case 'production-architect-23':
        shouldUnlock = completedLessonIds.has(23);
        break;

      case 'b_ui_crafter':
        shouldUnlock = completedLessonIds.has(6);
        break;

      case 'b_deep_researcher':
        shouldUnlock = completedLessonIds.has(9);
        break;

      case 'b_creative_synthesizer':
        shouldUnlock = completedLessonIds.has(12);
        break;

      case 'b_agent_architect':
        shouldUnlock = completedLessonIds.has(20);
        break;

      case 'b_rag_expert':
        shouldUnlock = completedLessonIds.has(19);
        break;

      case 'b_capstone_master': {
        shouldUnlock = completedLessonIds.has(24);
        break;
      }

      default:
        shouldUnlock = Boolean(badge.unlocked);
        break;
    }

    if (shouldUnlock) {
      const unlockedBadge = {
        ...badge,
        titleRu: badge.titleRu || badge.title,
        descriptionRu: badge.descriptionRu || badge.description,
        unlocked: true,
        unlockedAt: badge.unlockedAt || today,
      };
      if (!badge.unlocked) {
        newlyUnlocked.push(unlockedBadge);
      }
      return unlockedBadge;
    }

    // Strictly lock badge if criteria are not satisfied
    return {
      ...badge,
      titleRu: badge.titleRu || badge.title,
      descriptionRu: badge.descriptionRu || badge.description,
      unlocked: false,
      unlockedAt: undefined,
    };
  });

  return { badges: updatedBadges, newlyUnlocked };
}

/**
 * Evaluates and returns updated badges for any student account using available global submissions.
 */
export function evaluateBadgesForAccount(
  account: any,
  labSubmissions: any[] = [],
  homeworkSubmissions: any[] = [],
  quizSubmissions: any[] = [],
  rank?: number
): BadgeItem[] {
  if (account.role === 'admin' || (account.email && account.email.toLowerCase().trim() === 'admin@devopspro.tech')) {
    const today = new Date().toISOString().split('T')[0];
    return INITIAL_BADGES.map((b) => ({
      ...b,
      titleRu: b.titleRu || b.title,
      descriptionRu: b.descriptionRu || b.description,
      unlocked: true,
      unlockedAt: b.unlockedAt || today,
    }));
  }

  const manualBadgeIds = new Set<string>(
    Array.isArray(account.badges)
      ? account.badges.map((b: any) => (typeof b === 'string' ? b : b?.id)).filter(Boolean)
      : []
  );

  const existingBadges: BadgeItem[] =
    Array.isArray(account.badges) && account.badges.length > 0 && typeof account.badges[0] === 'object'
      ? account.badges
      : INITIAL_BADGES.map((b) => ({
          ...b,
          unlocked: manualBadgeIds.has(b.id),
        }));

  let daysOnline = 0;
  if (account.registeredAt) {
    const regTime = new Date(account.registeredAt).getTime();
    if (!isNaN(regTime)) {
      daysOnline = Math.max(0, Math.floor((Date.now() - regTime) / (1000 * 60 * 60 * 24)));
    }
  }

  const ctx: BadgeEvaluationContext = {
    role: account.role || 'student',
    email: account.email,
    id: account.id,
    lessons: account.lessons,
    homeworks: account.homeworks,
    attendancePct: account.attendancePct ?? 100,
    daysOnline,
    totalXp: Number(account.totalPoints ?? account.exp ?? 0),
    rank: rank,
    completedLessonsCount: account.completedLessonsCount || 0,
    completedLabsCount: account.completedLabsCount || 0,
    passedQuizCount: account.passedQuizCount || 0,
    testScores: account.testScores,
    readSections: account.readSections,
    labSubmissions,
    homeworkSubmissions,
    quizSubmissions,
  };

  const { badges } = evaluateStudentBadges(existingBadges, ctx);
  return badges;
}
