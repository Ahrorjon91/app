import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  PageView,
  UserRole,
  StudentProfileData,
  LessonData,
  LabData,
  LabSubmission,
  HomeworkSubmission,
  UserAccount,
  QuizSubmissionResult,
  BadgeItem,
  LeaderboardUser,
  CertificateData,
  AttachedReportFile,
} from '../types';
import {
  COURSE_BLOCKS,
  INITIAL_LESSONS,
  INITIAL_LABS,
  INITIAL_BADGES,
} from '../data/syllabusData';
import { CourseId, CourseConfig, AVAILABLE_COURSES, getCourseConfig } from '../data/coursesConfig';
import {
  SYSADMIN_COURSE_BLOCKS,
  SYSADMIN_LESSONS,
  SYSADMIN_LABS,
  SYSADMIN_DOWNLOADS,
} from '../data/sysadminCourseData';
import {
  INITIAL_HOMEWORK_SUBMISSIONS,
  INITIAL_LAB_SUBMISSIONS,
  INITIAL_QUIZ_SUBMISSIONS,
} from '../data/initialSubmissions';
import {
  calculateAcademicScore,
  calculateLeaderboard,
  validateCourseCompletion,
  CourseCompletionStatus,
  generateXpLedger,
  calculateXpBreakdown,
  XpBreakdown,
} from '../lib/calculationEngine';
import {
  triggerFileDownload,
  getAttachmentsForTarget,
  saveMultipleAttachmentsToVault,
  clearAllVaultAttachments,
} from '../lib/attachmentStorage';
import { getStaticUserIdForEmail } from '../lib/userIdUtils';
import { api, subscribeApiState, ApiState } from '../lib/api';
import { COURSE_RULES } from '../lib/courseRules';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import { sanitizeQuizSubmission } from '../lib/quizHelpers';

export { isLegacyDummySubmission } from '../lib/quizHelpers';

export interface NotificationItem {
  id: string;
  message: string;
  type?: 'reward' | 'badge' | 'info' | 'success';
  timestamp: number;
}

export interface PortalContextType {
  // Navigation & Page State
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  selectedLessonId: number;
  setSelectedLessonId: (id: number) => void;
  selectedLabId: number;
  setSelectedLabId: (id: number) => void;
  selectedQuizId: string;
  setSelectedQuizId: (id: string) => void;
  setAiDrawerOpen: (open: boolean) => void;
  setAiMode: (mode: string) => void;
  isXpModalOpen: boolean;
  setIsXpModalOpen: (open: boolean) => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isSyllabusModalOpen: boolean;
  setIsSyllabusModalOpen: (open: boolean) => void;
  xpBreakdown: XpBreakdown;

  // Multi-Course Architecture (AI for Life + Linux SysAdmin in one app)
  currentCourseId: CourseId;
  setCurrentCourseId: (courseId: CourseId) => void;
  courses: CourseConfig[];
  currentCourse: CourseConfig;
  courseBlocks: CourseBlock[];

  // Profile & Authentication
  profile: StudentProfileData;
  updateProfile: (data: Partial<StudentProfileData>) => Promise<void>;
  loginStudent: (userData: any) => void;
  logoutStudent: () => void;

  // Lessons, Labs, and Progress
  lessons: LessonData[];
  labs: LabData[];
  unlockedLessonIds: number[];
  readSections: Record<string, boolean>;
  markSectionRead: (arg1: any, arg2?: any) => void;
  toggleReadSection: (arg1: any, arg2?: any) => void;
  toggleLessonCompletion: (lessonId: number) => void;
  toggleLabTask: (labId: number, taskId: string) => void;
  completeLab: (labId: number) => void;
  isLessonUnlocked: (lessonId: number) => boolean;
  isLabUnlocked: (labId: number) => boolean;
  isQuizUnlocked: (quizId: string) => boolean;
  isHomeworkUnlocked: (lessonId: number) => boolean;
  isFinalExamUnlocked: boolean;

  // Homework & Labs Submissions
  homeworks: any[];
  homeworkSubmissions: HomeworkSubmission[];
  labSubmissions: LabSubmission[];
  submitHomework: (
    lessonId: number,
    fileUrlInput: string,
    notesInput: string,
    attachedFiles: AttachedReportFile[]
  ) => Promise<void>;
  reviewHomework: (
    lessonId: number,
    arg2: any,
    arg3?: any,
    arg4?: any,
    arg5?: any,
    arg6?: any
  ) => Promise<void>;
  deleteHomeworkSubmission: (
    submissionId: string,
    lessonId?: number,
    studentEmail?: string,
    studentId?: string
  ) => Promise<void>;
  clearAllHomeworkSubmissions: () => Promise<void>;
  submitLabReport: (
    labId: number,
    screenshots: string[],
    pdfName: string,
    attachedFiles: AttachedReportFile[],
    repoUrl?: string,
    studentNotes?: string
  ) => Promise<void>;
  reviewLab: (
    labId: number,
    arg2: any,
    arg3?: any,
    arg4?: any,
    arg5?: any,
    arg6?: any
  ) => Promise<void>;
  deleteLabSubmission: (
    labId: number,
    studentEmail?: string,
    studentId?: string
  ) => Promise<void>;
  clearAllLabSubmissions: () => Promise<void>;
  getPersistentAttachmentsForLab: (labId: number) => Promise<AttachedReportFile[]>;
  getPersistentAttachmentsForLesson: (
    lessonId: number,
    studentEmail?: string
  ) => Promise<AttachedReportFile[]>;
  downloadFileAttachment: (file: AttachedReportFile) => void;

  // Quizzes & Tests
  testScores: Record<string, any>;
  quizSubmissions: QuizSubmissionResult[];
  quizRetakes: Record<string, number>;
  canRetakeQuiz: (quizId: string) => boolean;
  recordQuizRetake: (quizId: string) => void;
  saveTestScore: (quizId: string, score: number, passed?: boolean) => void;
  saveQuizSubmission: (submission: Partial<QuizSubmissionResult>) => Promise<void>;
  reviewQuizSubmission: (
    submissionId: string,
    status: string,
    mentorComment: string,
    scorePct?: number,
    studentEmail?: string,
    studentId?: string
  ) => Promise<void>;
  updateQuizSubmissionComment: (submissionId: string, mentorComment: string) => Promise<void>;
  deleteQuizSubmission: (
    submissionId: string,
    studentEmail?: string,
    quizId?: string
  ) => Promise<void>;
  clearAllQuizSubmissions: () => Promise<void>;

  // Users & Admin Management
  userAccounts: UserAccount[];
  addUserAccount: (user: Partial<UserAccount>) => Promise<void>;
  updateUserAccount: (id: string, updates: Partial<UserAccount>) => Promise<void>;
  deleteUserAccount: (id: string) => Promise<void>;
  unlockLesson: (id: number, studentEmail?: string) => void;
  lockLesson: (id: number) => void;
  unlockAllLessons: () => void;
  toggleBadgeForUser: (userEmail: string, badgeId: string) => void;
  recalculateAllStudentsScores: () => Promise<void>;
  fetchDatabaseFromWebApp: () => Promise<void>;
  syncAllToGoogleSheets: () => Promise<{ success: boolean; message?: string }>;
  restoreAllFromGoogleSheets: () => Promise<{ success: boolean; message?: string }>;
  syncDataToSheets: () => Promise<{ success: boolean; message?: string }>;

  // Gamification, Stats, Leaderboard & Certificates
  badges: BadgeItem[];
  unlockBadge: (badgeId: string) => void;
  totalXp: number;
  stats: any;
  leaderboard: LeaderboardUser[];
  courseCompletionStatus: CourseCompletionStatus;
  certificates: CertificateData[];
  saveCertificate: (cert: CertificateData) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;

  // Database, Sync & Utilities
  refreshDatabase: () => Promise<void>;
  isSyncingDb: boolean;
  lastSavedDbAt: string | null;
  resetData: (studentEmail?: string) => Promise<void> | void;
  clearBrowserCache: () => void;
  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  addReward: (exp: number, msg?: string) => void;

  // Backwards compatibility aliases
  user: any;
  currentLesson: number;
  setCurrentLesson: (lessonId: number) => void;
  unlockedLessons: number[];
  completedLessons: number[];
  points: number;
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  refreshData: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const DEFAULT_PROFILE: StudentProfileData = {
  id: '',
  name: '',
  email: '',
  phone: '',
  telegram: '',
  course: 'AI for LIFE — Vibe Coding & Agentic AI',
  startDate: '01.08.2026',
  graduationDate: '31.01.2027',
  mentorName: 'Алексей Смирнов',
  avatarUrl: studentAvatarSvg,
  rank: 1,
  attendancePct: 100,
  totalPoints: 0,
  qrCodeValue: '',
  role: 'student',
  unlockedLessonsCount: 1,
  isAuthenticated: false,
  group: 'Группа 1 (Август 2026)',
  hiddenFromLeaderboard: false,
};

const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'ADM-2026-0001',
    name: 'Administrator',
    email: 'admin@devopspro.tech',
    role: 'admin',
    registeredAt: '2026-01-01',
    unlockedLessonsCount: 24,
    completedLessonsCount: 24,
    completedLabsCount: 24,
    passedQuizCount: 24,
    attendancePct: 100,
    status: 'Active',
    group: 'Администрация',
    totalPoints: 3500,
    phone: '+992 90 000 00 00',
    telegram: '@admin_devops',
    rank: 1,
  },
  {
    id: 'USR-STU-01',
    name: 'John Smith',
    email: 'student@devopspro.tech',
    role: 'student',
    registeredAt: '2026-08-01',
    unlockedLessonsCount: 1,
    completedLessonsCount: 0,
    completedLabsCount: 0,
    passedQuizCount: 0,
    attendancePct: 100,
    status: 'Active',
    group: 'Группа 1 (Август 2026)',
    totalPoints: 0,
    phone: '+992 90 000 00 00',
    telegram: '@student_devops',
    rank: 1,
  },
  {
    id: 'USR-STU-02',
    name: 'Mullojon Rustamov',
    email: 'mullojon@devopspro.tech',
    role: 'student',
    registeredAt: '2026-08-01',
    unlockedLessonsCount: 1,
    completedLessonsCount: 0,
    completedLabsCount: 0,
    passedQuizCount: 0,
    attendancePct: 100,
    status: 'Active',
    group: 'Группа 1 (Август 2026)',
    totalPoints: 0,
    phone: '+992 91 123 45 67',
    telegram: '@mullojon_devops',
    rank: 2,
  },
];

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Course State (AI for Life vs Linux & DevOps SysAdmin)
  const [currentCourseId, setCurrentCourseId] = useState<CourseId>(() => {
    try {
      const savedCourse = localStorage.getItem('devops_selected_course') as CourseId;
      if (savedCourse === 'sysadmin-devops' || savedCourse === 'ai-for-life') {
        return savedCourse;
      }
      const savedAuth = localStorage.getItem('devops_auth_profile');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed.courseId === 'sysadmin-devops' || (parsed.course && parsed.course.toLowerCase().includes('linux'))) {
          return 'sysadmin-devops';
        }
      }
    } catch {}
    return 'ai-for-life';
  });

  const currentCourse = useMemo(() => getCourseConfig(currentCourseId), [currentCourseId]);
  const courseBlocks = useMemo(() => {
    return currentCourseId === 'sysadmin-devops' ? SYSADMIN_COURSE_BLOCKS : COURSE_BLOCKS;
  }, [currentCourseId]);

  const activeBaseLessons = useMemo(() => {
    return currentCourseId === 'sysadmin-devops' ? SYSADMIN_LESSONS : INITIAL_LESSONS;
  }, [currentCourseId]);

  const activeBaseLabs = useMemo(() => {
    return currentCourseId === 'sysadmin-devops' ? SYSADMIN_LABS : INITIAL_LABS;
  }, [currentCourseId]);

  // 1. Navigation State: Defaults to 'login' for new visitors and unauthenticated users
  const [activePage, setActivePage] = useState<PageView>(() => {
    try {
      const saved = localStorage.getItem('devops_auth_profile');
      const token = localStorage.getItem('devops_auth_token');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          parsed.isAuthenticated === true &&
          parsed.email &&
          (token || parsed.token || parsed.sessionToken)
        ) {
          const savedPage = localStorage.getItem('devops_active_page');
          if (savedPage && savedPage !== 'login') return savedPage as PageView;
          return 'dashboard';
        }
      }
    } catch {}
    return 'login';
  });
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedLabId, setSelectedLabId] = useState<number>(1);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('TEST_1');
  const [_aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [_aiMode, setAiMode] = useState<string>('chat');
  const [isXpModalOpen, setIsXpModalOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('lessons');

  // 2. Profile & Auth State: Strictly unauthenticated by default
  const [profile, setProfile] = useState<StudentProfileData>(() => {
    try {
      const saved = localStorage.getItem('devops_auth_profile');
      const token = localStorage.getItem('devops_auth_token');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          parsed.isAuthenticated === true &&
          parsed.email &&
          (token || parsed.token || parsed.sessionToken)
        ) {
          return {
            ...DEFAULT_PROFILE,
            ...parsed,
            course: parsed.course || currentCourse.title,
            courseId: parsed.courseId || currentCourseId,
            avatarUrl: parsed.avatarUrl || studentAvatarSvg,
            isAuthenticated: true,
          };
        }
      }
    } catch {}
    return {
      ...DEFAULT_PROFILE,
      course: currentCourse.title,
      courseId: currentCourseId,
    };
  });

  // 3. User Accounts
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('devops_user_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_USER_ACCOUNTS;
  });

  // 4. Lessons & Labs Data (Course-Aware)
  const [lessons, setLessons] = useState<LessonData[]>(() => {
    try {
      const savedCourse = localStorage.getItem('devops_selected_course');
      const isSysadmin = savedCourse === 'sysadmin-devops';
      const base = isSysadmin ? SYSADMIN_LESSONS : INITIAL_LESSONS;
      const key = isSysadmin ? 'devops_lessons_sysadmin-devops' : 'devops_lessons';
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return base.map((initLesson) => {
            const cached = parsed.find((p: any) => Number(p.id) === initLesson.id);
            if (!cached) return initLesson;
            return {
              ...initLesson,
              isCompleted: Boolean(cached.isCompleted),
              submissionStatus: cached.submissionStatus || initLesson.submissionStatus,
              completedAt: cached.completedAt || initLesson.completedAt,
            };
          });
        }
      }
      return base;
    } catch {}
    return INITIAL_LESSONS;
  });

  const [labs, setLabs] = useState<LabData[]>(() => {
    try {
      const savedAuth = localStorage.getItem('devops_auth_profile');
      const authObj = savedAuth ? JSON.parse(savedAuth) : null;
      if (authObj?.role === 'admin') {
        return activeBaseLabs;
      }
      const savedCourse = localStorage.getItem('devops_selected_course');
      const isSysadmin = savedCourse === 'sysadmin-devops';
      const base = isSysadmin ? SYSADMIN_LABS : INITIAL_LABS;
      const key = isSysadmin ? 'devops_labs_sysadmin-devops' : 'devops_labs';
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return base.map((initLab) => {
            const cached = parsed.find((p: any) => Number(p.id) === initLab.id);
            if (!cached) return initLab;
            return {
              ...initLab,
              isCompleted: Boolean(cached.isCompleted),
              submissionStatus: cached.submissionStatus || initLab.submissionStatus,
              score: cached.score !== undefined ? cached.score : initLab.score,
              mentorFeedback: cached.mentorFeedback || initLab.mentorFeedback,
              repoUrl: cached.repoUrl || (initLab as any).repoUrl,
              fileUrl: cached.fileUrl || initLab.fileUrl,
              studentNotes: cached.studentNotes || initLab.studentNotes,
            };
          });
        }
      }
      return base;
    } catch {}
    return INITIAL_LABS;
  });

  // Switch lessons and labs when changing active course
  useEffect(() => {
    try {
      const storageKey = `devops_lessons_${currentCourseId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLessons(
            activeBaseLessons.map((initLesson) => {
              const cached = parsed.find((p: any) => Number(p.id) === initLesson.id);
              if (!cached) return initLesson;
              return {
                ...initLesson,
                isCompleted: Boolean(cached.isCompleted),
                submissionStatus: cached.submissionStatus || initLesson.submissionStatus,
                completedAt: cached.completedAt || initLesson.completedAt,
              };
            })
          );
          return;
        }
      }
    } catch {}
    setLessons(activeBaseLessons);
  }, [currentCourseId, activeBaseLessons]);

  useEffect(() => {
    try {
      const storageKey = `devops_labs_${currentCourseId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLabs(
            activeBaseLabs.map((initLab) => {
              const cached = parsed.find((p: any) => Number(p.id) === initLab.id);
              if (!cached) return initLab;
              return {
                ...initLab,
                isCompleted: Boolean(cached.isCompleted),
                submissionStatus: cached.submissionStatus || initLab.submissionStatus,
                score: cached.score !== undefined ? cached.score : initLab.score,
                mentorFeedback: cached.mentorFeedback || initLab.mentorFeedback,
              };
            })
          );
          return;
        }
      }
    } catch {}
    setLabs(activeBaseLabs);
  }, [currentCourseId, activeBaseLabs]);

  useEffect(() => {
    try {
      localStorage.setItem(`devops_lessons_${currentCourseId}`, JSON.stringify(lessons));
    } catch {}
  }, [lessons, currentCourseId]);

  useEffect(() => {
    try {
      localStorage.setItem(`devops_labs_${currentCourseId}`, JSON.stringify(labs));
    } catch {}
  }, [labs, currentCourseId]);

  // 5. Unlocked lessons: only Lesson 1 unlocked for student by default; next lessons unlock strictly after Mentor HW confirmation
  const [unlockedLessonIds, setUnlockedLessonIds] = useState<number[]>(() => {
    try {
      const savedAuth = localStorage.getItem('devops_auth_profile');
      const authObj = savedAuth ? JSON.parse(savedAuth) : null;
      const role = authObj?.role || 'student';
      const currentEmail = (authObj?.email || '').toLowerCase().trim();
      const currentId = authObj?.id || '';
      if (role === 'admin') {
        return Array.from({ length: 24 }, (_, i) => i + 1);
      }
      const savedHwRaw = localStorage.getItem('devops_homework_submissions');
      const savedHw: any[] = savedHwRaw ? JSON.parse(savedHwRaw) : INITIAL_HOMEWORK_SUBMISSIONS;
      const approvedHwIds = Array.isArray(savedHw)
        ? savedHw
            .filter(
              (h) =>
                h &&
                h.status === 'Approved' &&
                (!currentEmail ||
                  (h.studentEmail && String(h.studentEmail).toLowerCase().trim() === currentEmail) ||
                  (currentId && h.studentId === currentId))
            )
            .map((h) => Number(h.lessonId))
            .filter((id) => id >= 1 && id <= 24)
        : [];
      const maxFromApprovedHw = Math.min(24, Math.max(1, ...approvedHwIds.map((id) => id + 1)));
      return Array.from({ length: maxFromApprovedHw }, (_, i) => i + 1);
    } catch {}
    return [1];
  });

  // 6. Read sections & Progress
  const [readSections, setReadSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('devops_read_sections');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // 7. Test Scores & Quizzes
  const [testScores, setTestScores] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('devops_test_scores');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [quizRetakes, setQuizRetakes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('devops_quiz_retakes');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmissionResult[]>(() => {
    try {
      const saved = localStorage.getItem('devops_quiz_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return INITIAL_QUIZ_SUBMISSIONS;
  });

  // 8. Homework & Labs Submissions
  const [homeworkSubmissions, setHomeworkSubmissions] = useState<HomeworkSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('devops_homework_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out dummy/curriculum lessons that lack actual submission content or student
          return parsed.filter((hw: any) => {
            if (!hw) return false;
            const hasContent =
              Boolean(hw.submittedAt) ||
              Boolean(hw.score !== undefined && Number(hw.score) > 0) ||
              Boolean(hw.fileUrl) ||
              Boolean(hw.githubUrl) ||
              Boolean(hw.repoUrl) ||
              Boolean(hw.studentNotes && String(hw.studentNotes).trim()) ||
              Boolean(hw.reportText && String(hw.reportText).trim()) ||
              (Array.isArray(hw.attachedFiles) && hw.attachedFiles.length > 0);
            const hasStudent = Boolean(hw.studentEmail || hw.studentId);
            return hasContent && hasStudent;
          });
        }
      }
    } catch {}
    return INITIAL_HOMEWORK_SUBMISSIONS;
  });

  const [labSubmissions, setLabSubmissions] = useState<LabSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('devops_lab_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return INITIAL_LAB_SUBMISSIONS as any;
  });

  // 9. Badges & Certificates
  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    return INITIAL_BADGES.map((b) => ({
      ...b,
      unlocked: false,
      unlockedAt: undefined,
    }));
  });

  const [certificates, setCertificates] = useState<CertificateData[]>(() => {
    try {
      const saved = localStorage.getItem('devops_certificates');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 10. Notifications & Sync State
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isSyncingDb, setIsSyncingDb] = useState<boolean>(false);
  const [lastSavedDbAt, setLastSavedDbAt] = useState<string | null>(null);

  // Subscribe to API saving status
  useEffect(() => {
    const unsub = subscribeApiState((state: ApiState) => {
      setIsSyncingDb(state.isSaving);
      if (state.lastSavedAt) {
        setLastSavedDbAt(state.lastSavedAt);
      }
    });
    return unsub;
  }, []);

  // Save changes to localStorage only if genuinely authenticated
  useEffect(() => {
    try {
      if (profile.isAuthenticated && profile.email) {
        localStorage.setItem('devops_auth_profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('devops_auth_profile');
        localStorage.removeItem('devops_auth_token');
      }
    } catch {}
  }, [profile]);

  // Persist current active view when authenticated
  useEffect(() => {
    try {
      if (profile.isAuthenticated && activePage !== 'login') {
        localStorage.setItem('devops_active_page', activePage);
      }
    } catch {}
  }, [activePage, profile.isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_user_accounts', JSON.stringify(userAccounts));
    } catch {}
  }, [userAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_lessons', JSON.stringify(lessons));
    } catch {}
  }, [lessons]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_labs', JSON.stringify(labs));
    } catch {}
  }, [labs]);

  // Enforce lesson unlocking based strictly on role and Mentor-confirmed (Approved) homework
  useEffect(() => {
    if (profile.role === 'admin') {
      setUnlockedLessonIds(Array.from({ length: 24 }, (_, i) => i + 1));
    } else {
      const currentEmail = (profile.email || '').toLowerCase().trim();
      const currentId = profile.id || '';
      const mySubmissions = homeworkSubmissions.filter(
        (h) =>
          !h.studentEmail ||
          h.studentEmail.toLowerCase().trim() === currentEmail ||
          (currentId && h.studentId === currentId)
      );
      const approvedHwLessonIds = mySubmissions
        .filter((h) => h.status === 'Approved')
        .map((h) => Number(h.lessonId))
        .filter((id) => id >= 1 && id <= 24);

      setLessons((prevLessons) => {
        let changed = false;
        const nextLessons = prevLessons.map((l) => {
          const isHwApproved = approvedHwLessonIds.includes(l.id);
          const matchingSub = mySubmissions.find((h) => Number(h.lessonId) === l.id);
          const desiredStatus = isHwApproved
            ? ('Approved' as const)
            : (matchingSub?.status as any) || ('Not Submitted' as const);
          if (l.isCompleted !== isHwApproved || l.submissionStatus !== desiredStatus) {
            changed = true;
            return {
              ...l,
              isCompleted: isHwApproved,
              submissionStatus: desiredStatus,
              completedAt: isHwApproved ? l.completedAt || new Date().toISOString() : undefined,
            };
          }
          return l;
        });
        return changed ? nextLessons : prevLessons;
      });

      const maxFromApprovedHw = Math.min(
        24,
        Math.max(1, ...approvedHwLessonIds.map((id) => id + 1))
      );

      setUnlockedLessonIds((prev) => {
        const autoRange = Array.from({ length: maxFromApprovedHw }, (_, i) => i + 1);
        const merged = Array.from(new Set([1, ...autoRange])).sort((a, b) => a - b);
        if (merged.length === prev.length && merged.every((v, i) => v === prev[i])) {
          return prev;
        }
        return merged;
      });
    }
  }, [profile.role, profile.email, profile.id, homeworkSubmissions]);

  // Dynamically unlock badges based on real lesson/quiz/lab completion
  useEffect(() => {
    const completedIds = new Set(lessons.filter((l) => l.isCompleted).map((l) => l.id));
    const passedLesson1Quiz =
      Boolean(testScores['1'] && Number(testScores['1']) >= 60) ||
      Boolean(testScores['lesson-1-test'] && Number(testScores['lesson-1-test']) >= 60) ||
      Boolean(testScores['LESSON_1'] && Number(testScores['LESSON_1']) >= 60) ||
      quizSubmissions.some(
        (q) =>
          (q.quizId === '1' || q.quizId === 'lesson-1-test' || q.quizId === 'LESSON_1') &&
          (q.passed || q.scorePct >= 60)
      );

    setBadges((prev) => {
      let changed = false;
      const next = prev.map((b) => {
        let shouldUnlock = false;
        if (b.id === 'b_ai_explorer') shouldUnlock = completedIds.has(1) || passedLesson1Quiz;
        else if (b.id === 'b_prompt_master') shouldUnlock = completedIds.has(2);
        else if (b.id === 'b_multimodal') shouldUnlock = completedIds.has(4);
        else if (b.id === 'b_vibe_coder') shouldUnlock = completedIds.has(8);
        else if (b.id === 'b_ui_crafter') shouldUnlock = completedIds.has(6);
        else if (b.id === 'b_deep_researcher') shouldUnlock = completedIds.has(9);
        else if (b.id === 'b_creative_synthesizer') shouldUnlock = completedIds.has(12);
        else if (b.id === 'b_motion_designer') shouldUnlock = completedIds.has(13);
        else if (b.id === 'b_scroll_storyteller') shouldUnlock = completedIds.has(14);
        else if (b.id === 'b_creative_technologist') shouldUnlock = completedIds.has(15);
        else if (b.id === 'app-builder-17') shouldUnlock = completedIds.has(17);
        else if (b.id === 'data-engineer-18') shouldUnlock = completedIds.has(18);
        else if (b.id === 'b_agent_architect') shouldUnlock = completedIds.has(20);
        else if (b.id === 'qa-engineer-21') shouldUnlock = completedIds.has(21);
        else if (b.id === 'production-architect-23') shouldUnlock = completedIds.has(23);
        else if (b.id === 'b_rag_expert') shouldUnlock = completedIds.has(19);
        else if (b.id === 'b_capstone_master') shouldUnlock = completedIds.has(24);

        if (b.unlocked !== shouldUnlock) {
          changed = true;
          return {
            ...b,
            unlocked: shouldUnlock,
            unlockedAt: shouldUnlock ? b.unlockedAt || new Date().toLocaleDateString('ru-RU') : undefined,
          };
        }
        return b;
      });
      return changed ? next : prev;
    });
  }, [lessons, testScores, quizSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_read_sections', JSON.stringify(readSections));
    } catch {}
  }, [readSections]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_unlocked_lessons', JSON.stringify(unlockedLessonIds));
    } catch {}
  }, [unlockedLessonIds]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_test_scores', JSON.stringify(testScores));
    } catch {}
  }, [testScores]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_quiz_retakes', JSON.stringify(quizRetakes));
    } catch {}
  }, [quizRetakes]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_quiz_submissions', JSON.stringify(quizSubmissions));
    } catch {}
  }, [quizSubmissions]);

  useEffect(() => {
    try {
      const compactHw = homeworkSubmissions.map((h) => ({
        ...h,
        attachedFiles: Array.isArray(h.attachedFiles)
          ? h.attachedFiles.map((f) => {
              if (f && f.dataUrl && (f.url?.startsWith('/uploads/') || f.dataUrl.length > 50000)) {
                const { dataUrl: _d, ...rest } = f as any;
                return rest;
              }
              return f;
            })
          : h.attachedFiles,
      }));
      localStorage.setItem('devops_homework_submissions', JSON.stringify(compactHw));
    } catch {}
  }, [homeworkSubmissions]);

  useEffect(() => {
    try {
      const compactLabs = labSubmissions.map((l) => ({
        ...l,
        attachedFiles: Array.isArray(l.attachedFiles)
          ? l.attachedFiles.map((f) => {
              if (f && f.dataUrl && (f.url?.startsWith('/uploads/') || f.dataUrl.length > 50000)) {
                const { dataUrl: _d, ...rest } = f as any;
                return rest;
              }
              return f;
            })
          : l.attachedFiles,
      }));
      localStorage.setItem('devops_lab_submissions', JSON.stringify(compactLabs));
    } catch {}
  }, [labSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_badges', JSON.stringify(badges));
    } catch {}
  }, [badges]);

  useEffect(() => {
    try {
      localStorage.setItem('devops_certificates', JSON.stringify(certificates));
    } catch {}
  }, [certificates]);

  // Notifications helper
  const addNotification = useCallback((message: string, type: 'reward' | 'badge' | 'info' | 'success' = 'info') => {
    const notif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      message,
      type,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [notif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Reward EXP & show notification
  const addReward = useCallback(
    (exp: number, msg?: string) => {
      if (exp > 0) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {}
      }

      if (msg) {
        addNotification(msg, exp > 0 ? 'reward' : 'info');
      }

      if (exp > 0) {
        setProfile((prev) => ({
          ...prev,
          totalPoints: (prev.totalPoints || 0) + exp,
        }));
      }
    },
    [addNotification]
  );

  const isRefreshingDbRef = useRef<boolean>(false);

  // Refresh full database snapshot from server on mount & periodically
  const refreshDatabase = useCallback(async () => {
    if (isRefreshingDbRef.current) return;
    isRefreshingDbRef.current = true;
    try {
      const dbRes = await api.getDatabase(profile.id, profile.email);
      const snap = dbRes?.database || dbRes?.snapshot || dbRes?.data || dbRes;

      const rawStudentList = Array.isArray(snap?.users)
        ? snap.users
        : Array.isArray(snap?.students)
        ? snap.students
        : null;

      let studentList = rawStudentList;
      if (!studentList) {
        const res = await api.adminGetStudents();
        if (res && res.success && Array.isArray(res.data || res.students)) {
          studentList = res.data || res.students;
        }
      }

      const hwList: any[] = Array.isArray(snap?.homeworkSubmissions)
        ? snap.homeworkSubmissions
        : Array.isArray(snap?.homework)
        ? snap.homework
        : [];
      const labList: any[] = Array.isArray(snap?.labSubmissions)
        ? snap.labSubmissions
        : Array.isArray(snap?.labs)
        ? snap.labs
        : [];
      const quizList: any[] = Array.isArray(snap?.quizSubmissions)
        ? snap.quizSubmissions
        : Array.isArray(snap?.quizzes)
        ? snap.quizzes
        : [];
      const progressMap: Record<string, any> = snap?.progress || {};

      const hasSnapshotArrays = Boolean(
        dbRes &&
          dbRes.success !== false &&
          snap &&
          (Array.isArray(snap.homeworkSubmissions) ||
            Array.isArray(snap.homework) ||
            Array.isArray(snap.users) ||
            Array.isArray(snap.students))
      );

      let myQuizzes: QuizSubmissionResult[] = [];

      if (hasSnapshotArrays) {
        const byHwKey = new Map<string, HomeworkSubmission>();
        hwList.forEach((h: any) => {
          const normStatus =
            h.status === 'Pending' || h.status === 'pending'
              ? 'Submitted'
              : h.status || h.submissionStatus || 'Submitted';
          const isApp = String(normStatus).toLowerCase() === 'approved';
          const fb = h.mentorFeedback || h.feedback || h.mentor_feedback || '';
          const rawScore = h.score !== undefined && h.score !== null ? Number(h.score) : undefined;
          const lessonIdNum = Number(h.lessonId ?? h.lesson_id ?? 1);
          let localHwRepo = '';
          let localHwNotes = '';
          try {
            localHwRepo = localStorage.getItem(`devops_hw_${lessonIdNum}_repo_url`) || '';
            localHwNotes = localStorage.getItem(`devops_hw_${lessonIdNum}_notes`) || '';
          } catch {}
          const resolvedHwUrl =
            h.fileUrl ||
            h.githubUrl ||
            h.repoUrl ||
            h.demoUrl ||
            h.file_url ||
            h.repo_url ||
            h.github_url ||
            h.demo_url ||
            localHwRepo ||
            '';
          const resolvedHwNotes =
            h.studentNotes ||
            h.reportText ||
            h.notes ||
            h.student_notes ||
            h.report_text ||
            localHwNotes ||
            '';
          const mappedHw: HomeworkSubmission = {
            id: h.id || `hw-${lessonIdNum}-${Date.now()}`,
            lessonId: lessonIdNum,
            studentEmail: h.studentEmail || h.student_email || '',
            studentName: h.studentName || h.student_name || 'Студент',
            studentId: h.studentId || h.student_id || '',
            submittedAt: h.submittedAt || h.submitted_at || new Date().toISOString(),
            status: normStatus,
            score: isApp ? COURSE_RULES.calculateMentorExp(rawScore, 'Approved', fb) : rawScore,
            fileUrl: resolvedHwUrl,
            githubUrl: h.githubUrl || h.github_url || resolvedHwUrl,
            repoUrl: h.repoUrl || h.repo_url || resolvedHwUrl,
            demoUrl: h.demoUrl || h.demo_url || resolvedHwUrl,
            studentNotes: resolvedHwNotes,
            reportText: resolvedHwNotes,
            mentorFeedback: fb,
            reviewedAt: h.reviewedAt || h.reviewed_at,
            reviewedBy: h.reviewedBy || h.reviewed_by,
            attachedFiles: Array.isArray(h.attachedFiles) ? h.attachedFiles : [],
          };
          const k = `${mappedHw.lessonId}-${(mappedHw.studentEmail || mappedHw.studentId || '').toLowerCase()}`;
          byHwKey.set(k, mappedHw);
        });
        setHomeworkSubmissions(Array.from(byHwKey.values()));

        const byLabKey = new Map<string, LabSubmission>();
        labList.forEach((l: any) => {
          const normStatus =
            l.status === 'Pending' || l.status === 'pending'
              ? 'Submitted'
              : l.status || l.submissionStatus || 'Submitted';
          const isApp = String(normStatus).toLowerCase() === 'approved';
          const fb = l.mentorFeedback || l.feedback || l.mentor_feedback || '';
          const rawScore = l.score !== undefined && l.score !== null ? Number(l.score) : 0;
          const labIdNum = Number(l.labId ?? l.lab_id ?? 1);
          let localLabRepo = '';
          let localLabNotes = '';
          try {
            localLabRepo = localStorage.getItem(`devops_lab_${labIdNum}_repo_url`) || '';
            localLabNotes = localStorage.getItem(`devops_lab_${labIdNum}_notes`) || '';
          } catch {}
          const resolvedLabUrl =
            l.repoUrl ||
            l.fileUrl ||
            l.demoUrl ||
            l.githubUrl ||
            l.repo_url ||
            l.file_url ||
            l.demo_url ||
            localLabRepo ||
            '';
          const resolvedLabNotes =
            l.studentNotes ||
            l.reportText ||
            l.notes ||
            l.student_notes ||
            l.report_text ||
            localLabNotes ||
            '';
          const mappedLab: LabSubmission = {
            id: l.id || `lab-${labIdNum}-${Date.now()}`,
            labId: labIdNum,
            studentEmail: l.studentEmail || l.student_email || '',
            studentName: l.studentName || l.student_name || 'Студент',
            studentId: l.studentId || l.student_id || '',
            submittedAt: l.submittedAt || l.submitted_at || new Date().toISOString(),
            status: normStatus,
            score: isApp ? COURSE_RULES.calculateMentorExp(rawScore, 'Approved', fb) : rawScore,
            screenshots: Array.isArray(l.screenshots) ? l.screenshots : [],
            pdfReportName: l.pdfReportName || '',
            attachedFiles: Array.isArray(l.attachedFiles) ? l.attachedFiles : [],
            repoUrl: resolvedLabUrl,
            demoUrl: l.demoUrl || l.demo_url || resolvedLabUrl,
            fileUrl: l.fileUrl || l.file_url || resolvedLabUrl,
            studentNotes: resolvedLabNotes,
            reportText: resolvedLabNotes,
            mentorFeedback: fb,
            reviewedAt: l.reviewedAt || l.reviewed_at,
            reviewedBy: l.reviewedBy || l.reviewed_by,
          };
          const k = `${mappedLab.labId}-${(mappedLab.studentEmail || mappedLab.studentId || '').toLowerCase()}`;
          byLabKey.set(k, mappedLab);
        });
        setLabSubmissions(Array.from(byLabKey.values()));

        const byQuizKey = new Map<string, QuizSubmissionResult>();
        quizList.forEach((q: any) => {
          const sanitized = sanitizeQuizSubmission(q, userAccounts);
          if (sanitized && sanitized.quizId) {
            byQuizKey.set(sanitized.id, sanitized);
          }
        });
        const mappedQuizzesArr = Array.from(byQuizKey.values());
        setQuizSubmissions(mappedQuizzesArr);

        if (Array.isArray(snap?.certificates)) {
          setCertificates(snap.certificates);
        }

        const activeEmailClean = (profile.email || '').toLowerCase().trim();
        const activeIdClean = profile.id || '';
        myQuizzes = mappedQuizzesArr.filter(
          (q) =>
            (q.studentEmail && q.studentEmail.toLowerCase().trim() === activeEmailClean) ||
            (activeIdClean && q.studentId === activeIdClean)
        );
        if (myQuizzes.length === 0) {
          setTestScores({});
          try {
            localStorage.removeItem('devops_lesson1_quiz_submitted');
            localStorage.removeItem('devops_lesson1_quiz_answers');
          } catch {}
        } else {
          const nextScores: Record<string, any> = {};
          myQuizzes.forEach((q) => {
            nextScores[q.quizId] = q.scorePct;
            const m =
              String(q.quizId).match(/^(?:lesson-)?(\d+)(?:-test)?$/i) ||
              String(q.quizId).match(/^LESSON_(\d+)$/i);
            const lid = m ? parseInt(m[1], 10) : null;
            if (lid && lid >= 1 && lid <= 24) {
              nextScores[String(lid)] = q.scorePct;
              nextScores[`lesson-${lid}-test`] = q.scorePct;
              nextScores[`LESSON_${lid}`] = q.scorePct;
            }
          });
          setTestScores(nextScores);
        }
      }

      const currentEmail = (profile.email || '').toLowerCase().trim();
      const currentId = profile.id || '';

      if (studentList && studentList.length > 0) {
        const mapped: UserAccount[] = studentList.map((s: any) => {
          const role = s.role || 'student';
          const sEmail = String(s.email || '').toLowerCase().trim();
          const studentApprovedHwLessons = hwList
            .filter(
              (h: any) =>
                String(h.status || h.submissionStatus || '').toLowerCase() === 'approved' &&
                (String(h.studentEmail || h.student_email || '').toLowerCase().trim() === sEmail ||
                  (s.id && (h.studentId === s.id || h.student_id === s.id)))
            )
            .map((h: any) => Number(h.lessonId ?? h.lesson_id ?? 0))
            .filter((n: number) => n >= 1 && n <= 24);

          const maxApprovedHwLesson = studentApprovedHwLessons.length > 0 ? Math.max(...studentApprovedHwLessons) : 0;
          const completedCount = studentApprovedHwLessons.length;
          const minUnlockedFromHw = maxApprovedHwLesson > 0 ? Math.min(24, maxApprovedHwLesson + 1) : 1;

          const safeUnlocked =
            role === 'admin'
              ? 24
              : Math.max(1, Math.min(24, minUnlockedFromHw));

          return {
            id: s.id || getStaticUserIdForEmail(s.email),
            name: s.name || 'Студент',
            email: s.email,
            password: s.password || '123456789',
            role,
            registeredAt: s.registered_at || s.registeredAt || '2026-08-01',
            unlockedLessonsCount: safeUnlocked,
            completedLessonsCount: completedCount,
            completedLabsCount: Number(s.completed_labs_count ?? s.completedLabsCount ?? 0),
            passedQuizCount: Number(s.passed_quiz_count ?? s.passedQuizCount ?? 0),
            attendancePct: Number(s.attendance_pct ?? s.attendancePct ?? 100),
            status: s.status || 'Active',
            group: s.group_name || s.group || s.student_group || 'Группа 1 (Август 2026)',
            totalPoints: Number(s.total_points ?? s.totalPoints ?? 0),
            phone: s.phone || '+992 90 000 00 00',
            telegram: s.telegram || '@student_devops',
            avatarUrl: s.avatar_url || s.avatarUrl || studentAvatarSvg,
          };
        });
        setUserAccounts(mapped);

        // Sync active student's profile, unlocked lessons, completed lessons, and read sections
        const activeAccount = mapped.find(
          (u) => u.email.toLowerCase().trim() === currentEmail || (currentId && u.id === currentId)
        );
        const rawActiveUser = studentList.find(
          (s: any) => String(s.email || '').toLowerCase().trim() === currentEmail || (currentId && s.id === currentId)
        );
        const userProgress = progressMap[currentEmail];

        const serverSections = {
          ...(rawActiveUser?.readSections && typeof rawActiveUser.readSections === 'object'
            ? rawActiveUser.readSections
            : {}),
          ...(userProgress?.flatReadSections && typeof userProgress.flatReadSections === 'object'
            ? userProgress.flatReadSections
            : {}),
        };
        if (Object.keys(serverSections).length > 0) {
          setReadSections((prev) => ({ ...prev, ...serverSections }));
        } else if (myQuizzes.length === 0 && hwList.length === 0 && labList.length === 0) {
          setReadSections({});
        }

        const myApprovedHwLessons = hwList
          .filter(
            (h: any) =>
              String(h.status || h.submissionStatus || '').toLowerCase() === 'approved' &&
              (String(h.studentEmail || h.student_email || '').toLowerCase().trim() === currentEmail ||
                (currentId && (h.studentId === currentId || h.student_id === currentId)))
          )
          .map((h: any) => Number(h.lessonId ?? h.lesson_id ?? 0))
          .filter((n: number) => n >= 1 && n <= 24);

        const allCompletedLessonIds = new Set<number>(myApprovedHwLessons);

        const myLabSubs = labList.filter(
          (l: any) =>
            String(l.studentEmail || l.student_email || '').toLowerCase().trim() === currentEmail ||
            (currentId && (l.studentId === currentId || l.student_id === currentId))
        );
        const myLabSubById = new Map<number, any>();
        myLabSubs.forEach((l: any) => {
          const lid = Number(l.labId ?? l.lab_id ?? 0);
          if (lid >= 1 && lid <= 24) {
            myLabSubById.set(lid, l);
          }
        });

        setLabs((prev) =>
          prev.map((l) => {
            const sub = myLabSubById.get(l.id);
            if (!sub) {
              return {
                ...l,
                isCompleted: false,
                submissionStatus: 'Not Submitted',
              };
            }
            const rawSt = String(sub.status || sub.submissionStatus || 'Submitted');
            const normSt = rawSt === 'Pending' || rawSt === 'pending' ? 'Submitted' : rawSt;
            const isApp = normSt.toLowerCase() === 'approved';
            const fb = sub.mentorFeedback || sub.feedback || sub.mentor_feedback || '';
            const subUrl =
              sub.repoUrl ||
              sub.fileUrl ||
              sub.demoUrl ||
              sub.githubUrl ||
              sub.repo_url ||
              sub.file_url ||
              sub.demo_url ||
              '';
            const subNotes =
              sub.studentNotes ||
              sub.reportText ||
              sub.notes ||
              sub.student_notes ||
              sub.report_text ||
              '';
            return {
              ...l,
              isCompleted: isApp,
              submissionStatus: normSt as any,
              score: isApp ? COURSE_RULES.calculateMentorExp(sub.score, 'Approved', fb) : undefined,
              mentorFeedback: fb || l.mentorFeedback,
              repoUrl: subUrl || (l as any).repoUrl,
              fileUrl: subUrl || l.fileUrl,
              studentNotes: subNotes || l.studentNotes,
            };
          })
        );

        setLessons((prev) =>
          prev.map((l) => ({
            ...l,
            isCompleted: allCompletedLessonIds.has(l.id),
            submissionStatus: allCompletedLessonIds.has(l.id) ? 'Approved' : l.submissionStatus,
            completedAt: allCompletedLessonIds.has(l.id) ? l.completedAt || new Date().toISOString() : undefined,
          }))
        );

        if (activeAccount && profile.role !== 'admin') {
          const maxUnlocked = Math.min(
            24,
            Math.max(1, ...Array.from(allCompletedLessonIds).map((id) => id + 1))
          );
          setUnlockedLessonIds(Array.from({ length: maxUnlocked }, (_, i) => i + 1));
        }
      }
    } catch (_e) {
      // Silent fallback on transient network hiccup
    } finally {
      isRefreshingDbRef.current = false;
      setIsSyncingDb(false);
    }
  }, [profile.id, profile.email, profile.role]);

  useEffect(() => {
    refreshDatabase();
    const interval = setInterval(() => {
      refreshDatabase();
    }, 15000);
    return () => clearInterval(interval);
  }, [refreshDatabase]);

  // Derived Course & Stats calculations
  const courseCompletionStatus: CourseCompletionStatus = useMemo(() => {
    try {
      return validateCourseCompletion(
        lessons,
        readSections,
        labs,
        {},
        testScores as any,
        profile.email,
        profile.id,
        labSubmissions as any,
        homeworkSubmissions,
        quizSubmissions
      );
    } catch {
      return {
        isCompleted: false,
        isEligibleForFinalExam: true,
        isCertificateEligible: false,
        isCertified: false,
        missingRequirements: [],
        finalExamMissingRequirements: [],
        lessonsCompleted: lessons.filter((l) => l.isCompleted).length,
        labsApproved: labs.filter((l) => l.isCompleted).length,
        hwApproved: homeworkSubmissions.filter((h) => h.status === 'Approved').length,
        miniTestsPassed: quizSubmissions.filter((q) => q.passed).length,
        blockTestsPassed: Object.values(testScores).filter(
          (s: any) => s && (s.passed || (typeof s === 'number' && s >= 60))
        ).length,
        finalExamPassed: false,
      };
    }
  }, [lessons, readSections, labs, testScores, profile, labSubmissions, homeworkSubmissions, quizSubmissions]);

  const xpBreakdown: XpBreakdown = useMemo(() => {
    try {
      const ledger = generateXpLedger(
        profile.id,
        lessons,
        readSections,
        labs,
        {},
        testScores as any,
        badges,
        profile.email,
        labSubmissions as any,
        homeworkSubmissions,
        quizSubmissions,
        profile.role
      );
      return calculateXpBreakdown(ledger, lessons);
    } catch {
      return {
        sectionXp: 0,
        lessonBonusXp: 0,
        labXp: 0,
        testXp: 0,
        homeworkXp: 0,
        blockTestXp: 0,
        finalExamXp: 0,
        badgeXp: 500,
        totalXp: 500,
        lessonItems: []
      };
    }
  }, [profile.id, profile.email, profile.role, lessons, readSections, labs, testScores, badges, labSubmissions, homeworkSubmissions, quizSubmissions]);

  // Sync profile.totalPoints and userAccounts totalPoints with unified calculation engine
  useEffect(() => {
    if (xpBreakdown.totalXp !== profile.totalPoints) {
      setProfile((prev) => {
        if (prev.totalPoints === xpBreakdown.totalXp) return prev;
        const next = { ...prev, totalPoints: xpBreakdown.totalXp };
        try {
          localStorage.setItem('devops_auth_profile', JSON.stringify(next));
        } catch {}
        return next;
      });
    }
    const activeEmail = (profile.email || '').toLowerCase().trim();
    const activeId = (profile.id || '').trim();
    if (activeEmail || activeId) {
      setUserAccounts((prev) => {
        let changed = false;
        const next = prev.map((u) => {
          const isMe =
            (activeEmail && (u.email || '').toLowerCase().trim() === activeEmail) ||
            (activeId && (u.id || '').trim() === activeId);
          if (isMe && u.totalPoints !== xpBreakdown.totalXp) {
            changed = true;
            return { ...u, totalPoints: xpBreakdown.totalXp };
          }
          return u;
        });
        return changed ? next : prev;
      });
    }
  }, [xpBreakdown.totalXp, profile.totalPoints, profile.email, profile.id]);

  const stats = useMemo(() => {
    const completedLessonsCount = lessons.filter((l) => l.isCompleted).length;
    const completedLabsCount = labs.filter((l) => l.isCompleted || (l as any).submissionStatus === 'Approved').length;
    const submittedHomeworkCount = homeworkSubmissions.filter(
      (h) => h.status === 'Approved' || h.status === 'Submitted'
    ).length;
    const passedTestsCount = Object.values(testScores).filter(
      (s: any) => s && (s.passed || (typeof s === 'number' && s >= 60) || s.scorePct >= 60)
    ).length;
    const attendancePct = profile.attendancePct !== undefined ? profile.attendancePct : 100;
    const progressPct = Math.round((completedLessonsCount / 24) * 100);

    const academicScoreObj = calculateAcademicScore(
      profile,
      labs,
      {},
      testScores as any,
      labSubmissions as any,
      homeworkSubmissions
    );

    const calculatedTotalAcademic = academicScoreObj
      ? Math.round(
          academicScoreObj.attendanceScore +
            academicScoreObj.practicalScore +
            academicScoreObj.blockTestsScore +
            academicScoreObj.homeworkScore
        )
      : 85;

    return {
      totalPoints: xpBreakdown.totalXp,
      progressPct,
      attendancePct,
      rank: profile.rank || 1,
      completedLessonsCount,
      completedLabsCount,
      submittedHomeworkCount,
      passedTestsCount,
      academicScore: calculatedTotalAcademic,
      ...academicScoreObj,
    };
  }, [lessons, labs, homeworkSubmissions, testScores, labSubmissions, profile, xpBreakdown.totalXp]);

  const leaderboard: LeaderboardUser[] = useMemo(() => {
    try {
      const res: any = calculateLeaderboard(
        profile,
        [],
        lessons,
        readSections,
        labs,
        {},
        testScores as any,
        badges,
        userAccounts,
        labSubmissions as any,
        homeworkSubmissions,
        quizSubmissions
      );
      if (res && Array.isArray(res.leaderboard)) {
        return res.leaderboard;
      }
    } catch {}
    return userAccounts.map((u, i) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      avatarUrl: u.avatarUrl || studentAvatarSvg,
      rank: i + 1,
      totalPoints: u.totalPoints || 0,
      group: u.group || 'Группа 1',
      attendancePct: u.attendancePct || 100,
      completedLessons: u.completedLessonsCount || 0,
      completedLabs: u.completedLabsCount || 0,
      passedQuizzes: u.passedQuizCount || 0,
      status: u.status || 'Active',
      hiddenFromLeaderboard: u.hiddenFromLeaderboard,
      sectionXp: (u.completedLessonsCount || 0) * 150,
      labXp: (u.completedLabsCount || 0) * 100,
      testXp: (u.passedQuizCount || 0) * 100,
      homeworkXp: (u.completedLessonsCount || 0) * 100,
      badgeXp: xpBreakdown.badgeXp || 150,
    }));
  }, [profile, lessons, readSections, labs, testScores, badges, userAccounts, labSubmissions, homeworkSubmissions, quizSubmissions, xpBreakdown.badgeXp]);

  // Lessons unlocking checkers
  const isLessonUnlocked = useCallback(
    (lessonId: number) => {
      if (profile.role === 'admin') return true;
      if (lessonId === 1) return true;
      return unlockedLessonIds.includes(lessonId);
    },
    [profile.role, unlockedLessonIds]
  );

  const isLabUnlocked = useCallback(
    (labId: number) => {
      if (profile.role === 'admin') return true;
      if (labId === 1) return true;
      return unlockedLessonIds.includes(labId);
    },
    [profile.role, unlockedLessonIds]
  );

  const isHomeworkUnlocked = useCallback(
    (lessonId: number) => {
      if (profile.role === 'admin') return true;
      if (lessonId === 1) return true;
      return unlockedLessonIds.includes(lessonId);
    },
    [profile.role, unlockedLessonIds]
  );

  const isQuizUnlocked = useCallback(
    (quizId: string) => {
      if (profile.role === 'admin') return true;
      if (quizId === 'FINAL_EXAM' || quizId === 'TEST_7') {
        return courseCompletionStatus.isEligibleForFinalExam || unlockedLessonIds.length >= 24;
      }
      const match = quizId.match(/TEST_(\d+)/i);
      if (match) {
        const blockNum = parseInt(match[1], 10);
        const requiredLesson = blockNum * 4;
        return unlockedLessonIds.includes(requiredLesson);
      }
      return true;
    },
    [profile.role, courseCompletionStatus.isEligibleForFinalExam, unlockedLessonIds]
  );

  const isFinalExamUnlocked = profile.role === 'admin' || courseCompletionStatus.isEligibleForFinalExam;

  // Actions: Lessons
  const toggleLessonCompletion = useCallback(
    (lessonId: number) => {
      const currentEmail = (profile.email || '').toLowerCase().trim();
      const currentId = profile.id || '';
      const studentHw = homeworkSubmissions.find(
        (h) =>
          Number(h.lessonId) === lessonId &&
          (!h.studentEmail ||
            h.studentEmail.toLowerCase().trim() === currentEmail ||
            (currentId && h.studentId === currentId))
      );
      const isHwConfirmedByMentor = studentHw?.status === 'Approved';

      if (profile.role !== 'admin' && !isHwConfirmedByMentor) {
        // Mark lecture section read so student's study progress is saved, but require Mentor HW confirmation to unlock next lesson
        setReadSections((prev) => {
          const next = { ...prev, [`sec-${lessonId}-lecture`]: true };
          if (profile.email) {
            api.syncProgress(profile.email, { readSections: next }).catch(() => {});
          }
          return next;
        });

        if (studentHw?.status === 'Submitted') {
          addNotification(
            `ДЗ к Уроку #${lessonId} на проверке у Ментора. Урок #${Math.min(24, lessonId + 1)} откроется автоматически после подтверждения Ментором!`,
            'info'
          );
        } else {
          addNotification(
            `Следующий Урок #${Math.min(24, lessonId + 1)} откроется автоматически после сдачи ДЗ к Уроку #${lessonId} и подтверждения Ментором!`,
            'info'
          );
        }
        return;
      }

      let wasCompleted = false;
      setLessons((prev) => {
        const next = prev.map((l) => {
          if (l.id === lessonId) {
            const isCompleted = !l.isCompleted;
            wasCompleted = isCompleted;
            return {
              ...l,
              isCompleted,
              completedAt: isCompleted ? new Date().toISOString() : undefined,
            };
          }
          return l;
        });

        const compIds = next.filter((l) => l.isCompleted).map((l) => l.id);
        if (profile.email) {
          if (wasCompleted) {
            api.completeLesson(lessonId, profile.email, profile.name).catch(() => {});
          }
          api
            .syncProgress(profile.email, {
              completedLessonIds: compIds,
              completedLessonsCount: compIds.length,
              unlockedLessonsCount: Math.min(24, Math.max(unlockedLessonIds.length, lessonId + 1)),
            })
            .catch(() => {});
        }
        return next;
      });

      if (wasCompleted && lessonId < 24) {
        setUnlockedLessonIds((prev) => {
          const nextId = lessonId + 1;
          if (!prev.includes(nextId)) {
            return [...prev, nextId].sort((a, b) => a - b);
          }
          return prev;
        });
      }
    },
    [profile.role, profile.email, profile.id, profile.name, homeworkSubmissions, unlockedLessonIds.length, addNotification]
  );

  const markSectionRead = useCallback(
    (arg1: any, arg2?: any) => {
      let sectionId: string;
      let lessonId: number | undefined;
      if (typeof arg1 === 'number') {
        lessonId = arg1;
        sectionId = String(arg2 || `sec-${arg1}`);
      } else {
        sectionId = String(arg1 || '');
        lessonId = typeof arg2 === 'number' ? arg2 : undefined;
      }
      setReadSections((prev) => {
        if (prev[sectionId]) return prev;
        const next = { ...prev, [sectionId]: true };
        if (profile.email) {
          api.syncProgress(profile.email, { readSections: next }).catch(() => {});
        }
        return next;
      });
      if (lessonId) {
        addReward(
          COURSE_RULES.sectionXP,
          `Раздел лекции к уроку #${lessonId} изучен (+${COURSE_RULES.sectionXP} EXP)`
        );
      }
    },
    [addReward, profile.email]
  );

  const toggleReadSection = useCallback(
    (arg1: any, arg2?: any) => {
      let sectionId: string;
      let lessonId: number | undefined;
      if (typeof arg1 === 'number') {
        lessonId = arg1;
        sectionId = String(arg2 || `sec-${arg1}`);
      } else {
        sectionId = String(arg1 || '');
        lessonId = typeof arg2 === 'number' ? arg2 : undefined;
      }
      setReadSections((prev) => {
        const isNowRead = !prev[sectionId];
        const next = { ...prev, [sectionId]: isNowRead };
        if (profile.email) {
          api.syncProgress(profile.email, { readSections: next }).catch(() => {});
        }
        return next;
      });
      if (lessonId) {
        addReward(COURSE_RULES.sectionXP);
      }
    },
    [addReward, profile.email]
  );

  const unlockLesson = useCallback(
    (id: number, studentEmail?: string) => {
      setUnlockedLessonIds((prev) => {
        const next = prev.includes(id) ? prev : [...prev, id].sort((a, b) => a - b);
        const targetEmail = (studentEmail || profile.email || '').toLowerCase().trim();
        if (targetEmail) {
          const maxId = Math.max(...next, id);
          api
            .syncProgress(targetEmail, {
              unlockedLessonIds: next,
              unlockedLessonsCount: maxId,
            })
            .catch(() => {});
        }
        return next;
      });
    },
    [profile.email]
  );

  const lockLesson = useCallback((id: number) => {
    setUnlockedLessonIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const unlockAllLessons = useCallback(() => {
    setUnlockedLessonIds(Array.from({ length: 24 }, (_, i) => i + 1));
  }, []);

  // Actions: Labs
  const toggleLabTask = useCallback((labId: number, taskId: string) => {
    setLabs((prev) =>
      prev.map((lab) => {
        if (lab.id === labId) {
          const updatedTasks = lab.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
          return {
            ...lab,
            tasks: updatedTasks,
          };
        }
        return lab;
      })
    );
  }, []);

  const completeLab = useCallback(
    (labId: number) => {
      setLabs((prev) =>
        prev.map((lab) => {
          if (lab.id === labId) {
            return {
              ...lab,
              tasks: lab.tasks.map((t) => ({ ...t, completed: true })),
            };
          }
          return lab;
        })
      );
      addNotification(
        `Все шаги лабораторной работы #${labId} отмечены! Отправьте отчёт на проверку Ментору для подтверждения (50, 75 или 100 EXP).`,
        'info'
      );
    },
    [addNotification]
  );

  const submitLabReport = useCallback(
    async (
      labId: number,
      screenshots: string[],
      pdfName: string,
      attachedFiles: AttachedReportFile[],
      repoUrl?: string,
      studentNotes?: string
    ) => {
      const newSub: LabSubmission = {
        id: `lab-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        labId,
        studentEmail: profile.email,
        studentName: profile.name,
        studentId: profile.id,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
        score: undefined,
        screenshots: screenshots || [],
        pdfReportName: pdfName,
        attachedFiles: attachedFiles || [],
        repoUrl: repoUrl || '',
        demoUrl: repoUrl || '',
        fileUrl: repoUrl || '',
        studentNotes: studentNotes || '',
        reportText: studentNotes || '',
      };

      setLabSubmissions((prev) => [
        newSub,
        ...prev.filter((l) => !(l.labId === labId && (l.studentEmail === profile.email || l.studentId === profile.id))),
      ]);

      setLabs((prev) =>
        prev.map((l) =>
          l.id === labId
            ? {
                ...l,
                isCompleted: false,
                submissionStatus: 'Submitted',
                score: undefined,
                repoUrl: repoUrl || (l as any).repoUrl,
                fileUrl: repoUrl || (l as any).fileUrl,
                studentNotes: studentNotes || (l as any).studentNotes,
                attachedFiles: attachedFiles && attachedFiles.length > 0 ? attachedFiles : l.attachedFiles,
              }
            : l
        )
      );

      if (attachedFiles && attachedFiles.length > 0) {
        await saveMultipleAttachmentsToVault(attachedFiles, {
          category: 'lab',
          targetId: labId,
          studentEmail: profile.email,
          studentId: profile.id,
        });
      }

      try {
        await api.submitLab({
          labId,
          lessonId: labId,
          studentEmail: profile.email,
          studentName: profile.name,
          studentId: profile.id,
          screenshots,
          pdfReportName: pdfName,
          attachedFiles,
          repoUrl: repoUrl || '',
          demoUrl: repoUrl || '',
          fileUrl: repoUrl || '',
          githubUrl: repoUrl || '',
          studentNotes: studentNotes || '',
          notes: studentNotes || '',
          reportText: studentNotes || '',
        });
      } catch (err) {
        console.warn('API submitLab fallback:', err);
      }

      addNotification(
        `Лабораторная работа #${labId} отправлена на проверку Ментору! Начисление EXP (50, 75 или 100 EXP) будет подтверждено после ревью.`,
        'info'
      );
    },
    [profile, addNotification]
  );

  const reviewLab = useCallback(
    async (
      labId: number,
      arg2: any,
      arg3?: any,
      arg4?: any,
      arg5?: any,
      arg6?: any
    ) => {
      let status: string;
      let rawScore: number;
      let feedback: string;
      let targetEmail: string = '';
      let targetStudentId: string = '';

      if (typeof arg2 === 'string' && ['Approved', 'Rejected', 'Submitted', 'Under Review'].includes(arg2)) {
        status = arg2;
        rawScore = typeof arg3 === 'number' ? arg3 : 100;
        feedback = arg4 || '';
        if (typeof arg6 === 'string' && arg6.includes('@')) {
          targetEmail = arg6;
          targetStudentId = typeof arg5 === 'string' ? arg5 : '';
        } else if (typeof arg5 === 'string' && arg5.includes('@')) {
          targetEmail = arg5;
        } else {
          targetStudentId = typeof arg5 === 'string' ? arg5 : '';
          targetEmail = typeof arg6 === 'string' ? arg6 : '';
        }
      } else {
        targetEmail = String(arg2 || '');
        status = arg3 || 'Approved';
        rawScore = typeof arg4 === 'number' ? arg4 : 100;
        feedback = arg5 || '';
      }

      const score = status === 'Approved' ? COURSE_RULES.calculateMentorExp(rawScore, 'Approved', feedback) : 0;

      const matchedSub = labSubmissions.find(
        (l) =>
          l.labId === labId &&
          ((targetEmail && l.studentEmail?.toLowerCase() === targetEmail.toLowerCase()) ||
            (targetStudentId && l.studentId === targetStudentId))
      ) || labSubmissions.find((l) => l.labId === labId);

      if (!targetEmail && matchedSub?.studentEmail) {
        targetEmail = matchedSub.studentEmail;
      }
      if (!targetStudentId && matchedSub?.studentId) {
        targetStudentId = matchedSub.studentId;
      }
      if (!targetEmail && targetStudentId) {
        const stu = userAccounts.find((u) => u.id === targetStudentId);
        if (stu?.email) targetEmail = stu.email;
      }

      setLabSubmissions((prev) =>
        prev.map((l) => {
          if (
            l.labId === labId &&
            (!targetEmail ||
              l.studentEmail?.toLowerCase() === targetEmail.toLowerCase() ||
              (targetStudentId && l.studentId === targetStudentId))
          ) {
            return {
              ...l,
              status: status as any,
              score,
              mentorFeedback: feedback,
              reviewedAt: new Date().toISOString(),
              reviewedBy: profile.name,
            };
          }
          return l;
        })
      );

      const isReviewingSelf =
        Boolean(targetEmail && profile.email && targetEmail.toLowerCase().trim() === profile.email.toLowerCase().trim()) ||
        Boolean(targetStudentId && profile.id && targetStudentId === profile.id);

      if (isReviewingSelf) {
        if (status === 'Approved') {
          setLabs((prev) =>
            prev.map((l) => (l.id === labId ? { ...l, isCompleted: true, submissionStatus: 'Approved', score } : l))
          );
        } else if (status === 'Rejected') {
          setLabs((prev) =>
            prev.map((l) => (l.id === labId ? { ...l, isCompleted: false, submissionStatus: 'Rejected', score: 0 } : l))
          );
        }
      }

      if (status === 'Approved') {
        addNotification(
          `Лабораторная работа #${labId} ${targetEmail ? `(${targetEmail}) ` : ''}подтверждена Ментором! Оценка: +${score} EXP.`,
          'success'
        );
      } else if (status === 'Rejected') {
        addNotification(
          `Лабораторная работа #${labId} ${targetEmail ? `(${targetEmail}) ` : ''}возвращена Ментором на доработку.`,
          'info'
        );
      }

      try {
        await api.reviewLab({
          labId,
          studentEmail: targetEmail,
          studentId: targetStudentId,
          status,
          score,
          feedback,
          adminEmail: profile.email,
        });
        await refreshDatabase();
      } catch (e) {
        console.warn('API reviewLab fallback:', e);
      }
    },
    [profile, labSubmissions, userAccounts, refreshDatabase, addNotification]
  );

  const deleteLabSubmission = useCallback(async (labId: number, studentEmail?: string, _studentId?: string) => {
    setLabSubmissions((prev) =>
      prev.filter(
        (l) => !(l.labId === labId && (!studentEmail || l.studentEmail?.toLowerCase() === studentEmail.toLowerCase()))
      )
    );
    try {
      await api.deleteLabSubmission(labId, studentEmail);
    } catch (e) {
      console.warn('API deleteLabSubmission fallback:', e);
    }
  }, []);

  const clearAllLabSubmissions = useCallback(async () => {
    setLabSubmissions([]);
    try {
      await api.clearAllLabSubmissions();
    } catch (e) {
      console.warn('API clearAllLabSubmissions fallback:', e);
    }
  }, []);

  // Actions: Homework
  const submitHomework = useCallback(
    async (
      lessonId: number,
      fileUrlInput: string,
      notesInput: string,
      attachedFiles: AttachedReportFile[]
    ) => {
      const newSubmission: HomeworkSubmission = {
        id: `hw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        lessonId,
        studentEmail: profile.email,
        studentName: profile.name,
        studentId: profile.id,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
        score: 0,
        fileUrl: fileUrlInput,
        githubUrl: fileUrlInput,
        repoUrl: fileUrlInput,
        demoUrl: fileUrlInput,
        studentNotes: notesInput,
        reportText: notesInput,
        attachedFiles: attachedFiles || [],
      };

      setHomeworkSubmissions((prev) => [
        newSubmission,
        ...prev.filter(
          (h) => !(h.lessonId === lessonId && (h.studentEmail === profile.email || h.studentId === profile.id))
        ),
      ]);

      if (attachedFiles && attachedFiles.length > 0) {
        await saveMultipleAttachmentsToVault(attachedFiles, {
          category: 'homework',
          targetId: lessonId,
          studentEmail: profile.email,
          studentId: profile.id,
        });
      }

      try {
        await api.submitHomework({
          lessonId,
          studentEmail: profile.email,
          studentName: profile.name,
          studentId: profile.id,
          notes: notesInput,
          studentNotes: notesInput,
          reportText: notesInput,
          fileUrl: fileUrlInput,
          githubUrl: fileUrlInput,
          repoUrl: fileUrlInput,
          demoUrl: fileUrlInput,
          attachedFiles,
        });
      } catch (err) {
        console.warn('API submitHomework fallback:', err);
      }

      addNotification(
        `Домашнее задание к уроку #${lessonId} отправлено на проверку Ментору! Начисление EXP (50, 75 или 100 EXP) и открытие следующего урока произойдет после подтверждения.`,
        'info'
      );
    },
    [profile, addNotification]
  );

  const reviewHomework = useCallback(
    async (
      lessonId: number,
      arg2: any,
      arg3?: any,
      arg4?: any,
      arg5?: any,
      arg6?: any
    ) => {
      let status: string;
      let rawScore: number;
      let feedback: string;
      let targetEmail: string = '';
      let targetStudentId: string = '';

      if (typeof arg2 === 'string' && ['Approved', 'Rejected', 'Submitted', 'Under Review'].includes(arg2)) {
        status = arg2;
        rawScore = typeof arg3 === 'number' ? arg3 : 100;
        feedback = arg4 || '';
        if (typeof arg6 === 'string' && arg6.includes('@')) {
          targetEmail = arg6;
          targetStudentId = typeof arg5 === 'string' ? arg5 : '';
        } else if (typeof arg5 === 'string' && arg5.includes('@')) {
          targetEmail = arg5;
        } else {
          targetStudentId = typeof arg5 === 'string' ? arg5 : '';
          targetEmail = typeof arg6 === 'string' ? arg6 : '';
        }
      } else {
        targetEmail = String(arg2 || '');
        status = arg3 || 'Approved';
        rawScore = typeof arg4 === 'number' ? arg4 : 100;
        feedback = arg5 || '';
      }

      const score = status === 'Approved' ? COURSE_RULES.calculateMentorExp(rawScore, 'Approved', feedback) : 0;

      const matchedSub =
        homeworkSubmissions.find(
          (h) =>
            h.lessonId === lessonId &&
            ((targetEmail && h.studentEmail?.toLowerCase() === targetEmail.toLowerCase()) ||
              (targetStudentId && h.studentId === targetStudentId))
        ) || homeworkSubmissions.find((h) => h.lessonId === lessonId);

      if (!targetEmail && matchedSub?.studentEmail) {
        targetEmail = matchedSub.studentEmail;
      }
      if (!targetStudentId && matchedSub?.studentId) {
        targetStudentId = matchedSub.studentId;
      }
      if (!targetEmail && targetStudentId) {
        const stu = userAccounts.find((u) => u.id === targetStudentId);
        if (stu?.email) targetEmail = stu.email;
      }

      setHomeworkSubmissions((prev) =>
        prev.map((h) => {
          if (
            h.lessonId === lessonId &&
            (!targetEmail ||
              h.studentEmail?.toLowerCase() === targetEmail.toLowerCase() ||
              (targetStudentId && h.studentId === targetStudentId))
          ) {
            return {
              ...h,
              status: status as any,
              score,
              mentorFeedback: feedback,
              reviewedAt: new Date().toISOString(),
              reviewedBy: profile.name,
            };
          }
          return h;
        })
      );

      // When Homework is Approved by Mentor, automatically complete the lesson and unlock the next lesson!
      if (status === 'Approved') {
        const nextLessonId = Math.min(24, lessonId + 1);
        setLessons((prev) =>
          prev.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  isCompleted: true,
                  submissionStatus: 'Approved',
                  completedAt: l.completedAt || new Date().toISOString(),
                }
              : l
          )
        );

        setUnlockedLessonIds((prev) => {
          const nextSet = new Set([...prev, 1, lessonId, nextLessonId]);
          return Array.from(nextSet).sort((a, b) => a - b);
        });

        if (targetEmail || targetStudentId) {
          const emailClean = (targetEmail || '').toLowerCase().trim();
          setUserAccounts((prev) =>
            prev.map((u) => {
              if (
                (emailClean && u.email.toLowerCase().trim() === emailClean) ||
                (targetStudentId && u.id === targetStudentId)
              ) {
                const currUnlock = u.unlockedLessonsCount || 1;
                const newUnlock =
                  u.role === 'admin'
                    ? 24
                    : currUnlock >= 24 && (u.completedLessonsCount || 0) < 23
                    ? nextLessonId
                    : Math.max(currUnlock, nextLessonId);
                return {
                  ...u,
                  unlockedLessonsCount: newUnlock,
                  completedLessonsCount: Math.max(u.completedLessonsCount || 0, 1),
                };
              }
              return u;
            })
          );
        }

        addNotification(
          `ДЗ к Уроку #${lessonId} подтверждено Ментором (+${score} EXP)! Урок #${nextLessonId} автоматически разблокирован.`,
          'success'
        );
      } else if (status === 'Rejected') {
        setLessons((prev) =>
          prev.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  isCompleted: false,
                  submissionStatus: 'Rejected',
                  completedAt: undefined,
                }
              : l
          )
        );
      }

      try {
        await api.reviewHomework({
          lessonId,
          studentEmail: targetEmail,
          studentId: targetStudentId,
          status,
          score,
          feedback,
          adminEmail: profile.email,
        });
        await refreshDatabase();
      } catch (e) {
        console.warn('API reviewHomework fallback:', e);
      }
    },
    [profile, homeworkSubmissions, userAccounts, refreshDatabase]
  );

  const deleteHomeworkSubmission = useCallback(
    async (submissionId: string, lessonId?: number, studentEmail?: string, studentId?: string) => {
      const emailLower = (studentEmail || '').toLowerCase().trim();
      setHomeworkSubmissions((prev) =>
        prev.filter((h) => {
          if (submissionId && (h.id === submissionId || (h as any).submissionId === submissionId)) {
            return false;
          }
          if (
            lessonId !== undefined &&
            h.lessonId === lessonId &&
            (!emailLower || (h.studentEmail && h.studentEmail.toLowerCase().trim() === emailLower))
          ) {
            return false;
          }
          if (
            studentId &&
            h.studentId === studentId &&
            lessonId !== undefined &&
            h.lessonId === lessonId
          ) {
            return false;
          }
          return true;
        })
      );
      try {
        await api.deleteHomeworkSubmission(submissionId, lessonId, studentEmail, studentId);
      } catch (e) {
        console.warn('API deleteHomeworkSubmission fallback:', e);
      }
    },
    []
  );

  const clearAllHomeworkSubmissions = useCallback(async () => {
    setHomeworkSubmissions([]);
    try {
      localStorage.removeItem('devops_homework_submissions');
    } catch {}
    try {
      await api.clearAllHomeworkSubmissions();
    } catch (e) {
      console.warn('API clearAllHomeworkSubmissions fallback:', e);
    }
  }, []);

  // Attachments
  const downloadFileAttachment = useCallback((file: AttachedReportFile) => {
    triggerFileDownload(file);
  }, []);

  const getPersistentAttachmentsForLab = useCallback(
    async (labId: number): Promise<AttachedReportFile[]> => {
      return await getAttachmentsForTarget('lab', labId);
    },
    []
  );

  const getPersistentAttachmentsForLesson = useCallback(
    async (lessonId: number, studentEmail?: string): Promise<AttachedReportFile[]> => {
      return await getAttachmentsForTarget('homework', lessonId, studentEmail || profile.email);
    },
    [profile.email]
  );

  // Actions: Quizzes & Tests
  const canRetakeQuiz = useCallback(
    (quizId: string) => {
      const retakesCount = quizRetakes[quizId] || 0;
      return retakesCount < 3;
    },
    [quizRetakes]
  );

  const recordQuizRetake = useCallback((quizId: string) => {
    setQuizRetakes((prev) => ({
      ...prev,
      [quizId]: (prev[quizId] || 0) + 1,
    }));
  }, []);

  const saveTestScore = useCallback((quizId: string, score: number, _passed?: boolean) => {
    const lessonMatch = String(quizId).match(/^(?:lesson-)?(\d+)(?:-test)?$/i) || String(quizId).match(/^LESSON_(\d+)$/i);
    const parsedLessonId = lessonMatch ? parseInt(lessonMatch[1], 10) : null;

    setTestScores((prev) => {
      const next: Record<string, any> = {
        ...prev,
        [quizId]: score,
      };
      if (parsedLessonId && parsedLessonId >= 1 && parsedLessonId <= 24) {
        next[String(parsedLessonId)] = score;
        next[`lesson-${parsedLessonId}-test`] = score;
        next[`LESSON_${parsedLessonId}`] = score;
      }
      return next;
    });

    if (parsedLessonId && parsedLessonId >= 1 && parsedLessonId <= 24) {
      setReadSections((prev) => ({
        ...prev,
        [`sec-${parsedLessonId}-quiz`]: true,
        [`lesson-${parsedLessonId}-quiz`]: true,
        [`lesson-${parsedLessonId}-sec-3`]: true,
        [`${parsedLessonId}-quiz`]: true,
      }));
    }
  }, []);

  const saveQuizSubmission = useCallback(
    async (sub: Partial<QuizSubmissionResult>) => {
      const rawQuizId = String(sub.quizId || '1');
      const lessonMatch =
        rawQuizId.match(/^(?:lesson-)?(\d+)(?:-test)?$/i) || rawQuizId.match(/^LESSON_(\d+)$/i);
      const parsedLessonId = lessonMatch ? parseInt(lessonMatch[1], 10) : null;
      const canonicalQuizId = parsedLessonId ? String(parsedLessonId) : rawQuizId;

      const rawSub = {
        ...sub,
        id: sub.id || `quiz-sub-${Date.now()}`,
        quizId: canonicalQuizId,
        studentEmail: sub.studentEmail || profile.email,
        studentName: sub.studentName || profile.name,
        studentId: sub.studentId || profile.id,
        submittedAt: sub.submittedAt || new Date().toISOString(),
        scorePct: sub.scorePct || 0,
        passed: sub.passed !== undefined ? sub.passed : (sub.scorePct || 0) >= 60,
        correctCount: sub.correctCount || 0,
        totalQuestions: sub.totalQuestions || 5,
        userAnswers: sub.userAnswers || {},
        status: sub.status || 'Submitted',
        mentorComment: sub.mentorComment || '',
        details: Array.isArray(sub.details) && sub.details.length > 0 ? sub.details : undefined,
      };

      const fullSub: QuizSubmissionResult = sanitizeQuizSubmission(rawSub, userAccounts);

      setQuizSubmissions((prev) => [
        fullSub,
        ...prev.filter(
          (q) =>
            q.id !== fullSub.id &&
            !(
              parsedLessonId &&
              (q.quizId === String(parsedLessonId) ||
                q.quizId === `lesson-${parsedLessonId}-test` ||
                q.quizId === `LESSON_${parsedLessonId}`) &&
              (q.studentEmail === fullSub.studentEmail || q.studentId === fullSub.studentId)
            )
        ),
      ]);

      if (fullSub.quizId) {
        setTestScores((prev) => {
          const next: Record<string, any> = {
            ...prev,
            [fullSub.quizId]: fullSub.scorePct,
          };
          if (parsedLessonId && parsedLessonId >= 1 && parsedLessonId <= 24) {
            next[String(parsedLessonId)] = fullSub.scorePct;
            next[`lesson-${parsedLessonId}-test`] = fullSub.scorePct;
            next[`LESSON_${parsedLessonId}`] = fullSub.scorePct;
          }
          return next;
        });
      }

      if (parsedLessonId && parsedLessonId >= 1 && parsedLessonId <= 24) {
        setReadSections((prev) => ({
          ...prev,
          [`sec-${parsedLessonId}-quiz`]: true,
          [`lesson-${parsedLessonId}-quiz`]: true,
          [`lesson-${parsedLessonId}-sec-3`]: true,
          [`${parsedLessonId}-quiz`]: true,
        }));
      }

      try {
        await api.submitTest({
          ...fullSub,
          id: fullSub.id,
          quizId: fullSub.quizId,
          lessonId: parsedLessonId || (fullSub as any).lessonId || undefined,
          studentEmail: fullSub.studentEmail,
          answers: fullSub.userAnswers || {},
          userAnswers: fullSub.userAnswers || {},
          details: fullSub.details || [],
        } as any);
      } catch (err) {
        console.warn('API submitTest fallback:', err);
      }

      if (fullSub.passed) {
        const earnedTestExp = COURSE_RULES.calculateTestExp(
          fullSub.scorePct,
          fullSub.passed,
          fullSub.quizId === 'FINAL_EXAM',
          fullSub.correctCount,
          fullSub.totalQuestions
        );
        addReward(
          earnedTestExp,
          `🏆 Тест «${fullSub.quizTitle}» сдан: ${fullSub.correctCount}/${fullSub.totalQuestions} (${fullSub.scorePct}%)! Начислено +${earnedTestExp} EXP`
        );
      } else {
        addReward(
          0,
          `📝 Результат теста «${fullSub.quizTitle}»: ${fullSub.correctCount}/${fullSub.totalQuestions} (${fullSub.scorePct}%). Отправлено ментору (0 EXP)`
        );
      }
    },
    [profile, addReward, userAccounts]
  );

  const reviewQuizSubmission = useCallback(
    async (
      submissionId: string,
      status: string,
      mentorComment: string,
      scorePct?: number,
      studentEmailArg?: string,
      studentIdArg?: string
    ) => {
      const matchedQuiz = quizSubmissions.find((q) => q.id === submissionId || q.quizId === submissionId);
      const resolvedEmail = studentEmailArg || matchedQuiz?.studentEmail || '';
      const resolvedStudentId = studentIdArg || matchedQuiz?.studentId || '';

      setQuizSubmissions((prev) =>
        prev.map((q) => {
          if (q.id === submissionId) {
            return {
              ...q,
              status: status as any,
              mentorComment,
              reviewedAt: new Date().toISOString(),
              retakeAllowed: status === 'Rejected' ? true : q.retakeAllowed,
              scorePct: scorePct !== undefined ? scorePct : q.scorePct,
              passed: scorePct !== undefined ? scorePct >= 60 : status === 'Approved' ? true : status === 'Rejected' ? false : q.passed,
            };
          }
          return q;
        })
      );
      try {
        await api.reviewTest({
          submissionId,
          quizId: matchedQuiz?.quizId || submissionId,
          status,
          mentorComment,
          scorePct,
          studentEmail: resolvedEmail,
          studentId: resolvedStudentId,
        });
        await refreshDatabase();
      } catch (e) {
        console.warn('API reviewTest fallback:', e);
      }
    },
    [quizSubmissions, refreshDatabase]
  );

  const updateQuizSubmissionComment = useCallback(
    async (submissionId: string, mentorComment: string) => {
      setQuizSubmissions((prev) =>
        prev.map((q) => (q.id === submissionId ? { ...q, mentorComment } : q))
      );
      try {
        await api.reviewTest(submissionId, 'Approved', mentorComment, undefined, undefined, undefined);
      } catch (e) {
        console.warn('API updateQuizSubmissionComment fallback:', e);
      }
    },
    []
  );

  const deleteQuizSubmission = useCallback(
    async (submissionId: string, studentEmail?: string, quizId?: string) => {
      setQuizSubmissions((prev) => {
        const target = prev.find((q) => q.id === submissionId);
        const resolvedQuizId = quizId || target?.quizId || '';
        const m =
          String(resolvedQuizId).match(/^(?:lesson-)?(\d+)(?:-test)?$/i) ||
          String(resolvedQuizId).match(/^LESSON_(?:TEST_)?(\d+)$/i);
        const lid = m ? parseInt(m[1], 10) : (target?.lessonId || null);
        if (lid) {
          try {
            localStorage.removeItem(`devops_lesson_${lid}_quiz_submitted`);
            localStorage.removeItem(`devops_lesson${lid}_quiz_submitted`);
            localStorage.removeItem(`lesson_${lid}_quiz_submitted`);
            localStorage.removeItem(`devops_lesson_${lid}_quiz_answers`);
            localStorage.removeItem(`devops_lesson${lid}_quiz_answers`);
            localStorage.removeItem(`lesson_${lid}_quiz_answers`);
          } catch {}
          setTestScores((scores) => {
            const next = { ...scores };
            delete next[String(lid)];
            delete next[`lesson-${lid}-test`];
            delete next[`LESSON_${lid}`];
            delete next[`LESSON_TEST_${lid}`];
            return next;
          });
          setReadSections((sects) => {
            const next = { ...sects };
            delete next[`sec-${lid}-quiz`];
            delete next[`lesson-${lid}-quiz`];
            return next;
          });
        }
        return prev.filter((q) => q.id !== submissionId);
      });
      try {
        await api.deleteQuizSubmission(submissionId, studentEmail, quizId);
      } catch (e) {
        console.warn('API deleteQuizSubmission fallback:', e);
      }
    },
    []
  );

  const clearAllQuizSubmissions = useCallback(async () => {
    setQuizSubmissions([]);
    setTestScores({});
    setReadSections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.includes('quiz')) delete next[k];
      });
      return next;
    });
    try {
      for (let lid = 1; lid <= 24; lid++) {
        localStorage.removeItem(`devops_lesson_${lid}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson${lid}_quiz_submitted`);
        localStorage.removeItem(`lesson_${lid}_quiz_submitted`);
        localStorage.removeItem(`devops_lesson_${lid}_quiz_answers`);
        localStorage.removeItem(`devops_lesson${lid}_quiz_answers`);
        localStorage.removeItem(`lesson_${lid}_quiz_answers`);
      }
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('mini_quiz_retries_') || k.startsWith('ai_test_'))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}
    try {
      await api.clearAllQuizSubmissions();
    } catch (e) {
      console.warn('API clearAllQuizSubmissions fallback:', e);
    }
  }, []);

  // Actions: User Management
  const addUserAccount = useCallback(async (newUser: Partial<UserAccount>) => {
    const fullAccount: UserAccount = {
      id: newUser.id || getStaticUserIdForEmail(newUser.email || 'student@devopspro.tech'),
      name: newUser.name || 'Студент',
      email: newUser.email || 'student@devopspro.tech',
      password: newUser.password || '123456789',
      role: newUser.role || 'student',
      registeredAt: newUser.registeredAt || new Date().toISOString().split('T')[0],
      unlockedLessonsCount: newUser.unlockedLessonsCount || 24,
      completedLessonsCount: newUser.completedLessonsCount || 0,
      completedLabsCount: newUser.completedLabsCount || 0,
      passedQuizCount: newUser.passedQuizCount || 0,
      attendancePct: newUser.attendancePct || 100,
      status: newUser.status || 'Active',
      group: newUser.group || 'Группа 1 (Август 2026)',
      totalPoints: newUser.totalPoints || 0,
      phone: newUser.phone || '+992 90 000 00 00',
      telegram: newUser.telegram || '@student_devops',
      avatarUrl: newUser.avatarUrl || studentAvatarSvg,
      ...newUser,
    };

    setUserAccounts((prev) => {
      const idx = prev.findIndex((u) => u.email.toLowerCase() === fullAccount.email.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...fullAccount };
        return copy;
      }
      return [...prev, fullAccount];
    });

    try {
      await api.adminCreateStudent(fullAccount);
    } catch (e) {
      console.warn('API create student fallback:', e);
    }
  }, []);

  const updateUserAccount = useCallback(async (id: string, updates: Partial<UserAccount>) => {
    setUserAccounts((prev) =>
      prev.map((u) => (u.id === id || (updates.email && u.email.toLowerCase() === updates.email.toLowerCase()) ? { ...u, ...updates } : u))
    );
    try {
      await api.adminUpdateStudent(id, updates);
    } catch (e) {
      console.warn('API update student fallback:', e);
    }
  }, []);

  const deleteUserAccount = useCallback(
    async (id: string) => {
      const user = userAccounts.find((u) => u.id === id);
      setUserAccounts((prev) => prev.filter((u) => u.id !== id));
      try {
        await api.deleteUser(id, user?.email);
      } catch (e) {
        console.warn('API delete user fallback:', e);
      }
    },
    [userAccounts]
  );

  const toggleBadgeForUser = useCallback((userEmail: string, badgeId: string) => {
    setUserAccounts((prev) =>
      prev.map((u) => {
        if (u.email.toLowerCase() === userEmail.toLowerCase()) {
          const userBadges: string[] = Array.isArray(u.badges) ? u.badges : [];
          const hasBadge = userBadges.includes(badgeId);
          const updatedBadges = hasBadge ? userBadges.filter((b) => b !== badgeId) : [...userBadges, badgeId];
          return { ...u, badges: updatedBadges };
        }
        return u;
      })
    );
  }, []);

  const recalculateAllStudentsScores = useCallback(async () => {
    try {
      await refreshDatabase();
    } catch {}
  }, [refreshDatabase]);

  const fetchDatabaseFromWebApp = useCallback(async () => {
    await refreshDatabase();
  }, [refreshDatabase]);

  const syncAllToGoogleSheets = useCallback(async () => {
    addNotification('Синхронизация с базой данных успешно завершена', 'success');
    return { success: true, message: 'Синхронизировано' };
  }, [addNotification]);

  const restoreAllFromGoogleSheets = useCallback(async () => {
    await refreshDatabase();
    addNotification('Данные успешно восстановлены из SQLite', 'success');
    return { success: true, message: 'Восстановлено' };
  }, [refreshDatabase, addNotification]);

  const syncDataToSheets = useCallback(async () => {
    await refreshDatabase();
    return { success: true, message: 'Синхронизировано' };
  }, [refreshDatabase]);

  // Actions: Badges & Certificates
  const unlockBadge = useCallback(
    (badgeId: string) => {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === badgeId
            ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('ru-RU') }
            : b
        )
      );
      addReward(COURSE_RULES.badgeXP, `Получен новый бейдж! (+${COURSE_RULES.badgeXP} EXP)`);
    },
    [addReward]
  );

  const saveCertificate = useCallback(async (cert: CertificateData) => {
    const idKey = cert.id || cert.certificateId;
    setCertificates((prev) => [cert, ...prev.filter((c) => (c.id || c.certificateId) !== idKey)]);
    try {
      await api.saveCertificate(cert);
    } catch (e) {
      console.warn('API saveCertificate fallback:', e);
    }
  }, []);

  const deleteCertificate = useCallback(async (id: string) => {
    setCertificates((prev) => prev.filter((c) => (c.id || c.certificateId) !== id && c.certificateId !== id));
    try {
      await api.deleteCertificate(id);
    } catch (e) {
      console.warn('API deleteCertificate fallback:', e);
    }
  }, []);

  // Actions: Profile & Auth
  const updateProfile = useCallback(
    async (updates: Partial<StudentProfileData>) => {
      setProfile((prev) => {
        const next = { ...prev, ...updates };
        return next;
      });
      try {
        await api.updateProfile(profile.id, updates);
      } catch (e) {
        console.warn('API updateProfile fallback:', e);
      }
    },
    [profile.id]
  );

  const switchCourse = useCallback(
    (newCourseId: CourseId) => {
      setCurrentCourseId(newCourseId);
      const courseCfg = getCourseConfig(newCourseId);
      setProfile((prev) => ({
        ...prev,
        course: courseCfg.title,
        courseId: newCourseId,
      }));
      try {
        localStorage.setItem('devops_selected_course', newCourseId);
      } catch {}
      addNotification(`Выбран курс: ${courseCfg.title}`, 'info');
    },
    [addNotification]
  );

  const loginStudent = useCallback(
    (userData: any) => {
      let targetCourseId: CourseId = 'ai-for-life';
      if (
        userData.courseId === 'sysadmin-devops' ||
        (userData.course && String(userData.course).toLowerCase().includes('linux')) ||
        (userData.course && String(userData.course).toLowerCase().includes('sysadmin'))
      ) {
        targetCourseId = 'sysadmin-devops';
      } else if (userData.courseId === 'ai-for-life') {
        targetCourseId = 'ai-for-life';
      } else if (currentCourseId) {
        targetCourseId = currentCourseId;
      }

      setCurrentCourseId(targetCourseId);
      try {
        localStorage.setItem('devops_selected_course', targetCourseId);
      } catch {}

      const courseCfg = getCourseConfig(targetCourseId);
      const newProfile: StudentProfileData = {
        ...DEFAULT_PROFILE,
        ...userData,
        course: userData.course || courseCfg.title,
        courseId: targetCourseId,
        isAuthenticated: true,
      };
      setProfile(newProfile);
      if (newProfile.role === 'admin') {
        setUnlockedLessonIds(Array.from({ length: 24 }, (_, i) => i + 1));
      } else {
        const count = Math.max(1, Math.min(24, Number(userData.unlockedLessonsCount) || 1));
        setUnlockedLessonIds(Array.from({ length: count }, (_, i) => i + 1));
      }
      setActivePage('dashboard');
    },
    [currentCourseId]
  );

  const logoutStudent = useCallback(() => {
    try {
      localStorage.removeItem('devops_auth_token');
      localStorage.removeItem('devops_auth_profile');
      localStorage.removeItem('devops_active_page');
      if (profile.email) {
        api.logout(profile.email).catch(() => {});
      }
    } catch {}
    setProfile(DEFAULT_PROFILE);
    setActivePage('login');
  }, [profile.email]);

  // Actions: Cache & Reset
  const clearBrowserCache = useCallback(async () => {
    try {
      const staticKeys = [
        'devops_read_sections',
        'devops_unlocked_lessons',
        'devops_test_scores',
        'devops_quiz_retakes',
        'devops_certificates',
        'devops_homework_submissions',
        'devops_lab_submissions',
        'devops_quiz_submissions',
        'devops_lessons',
        'devops_labs',
        'devops_badges',
        'devops_sqlite_pending_queue',
      ];
      staticKeys.forEach((k) => localStorage.removeItem(k));

      const dynamicKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          (k.startsWith('user_read_sections_') ||
            k.startsWith('devops_active_seconds_') ||
            k.startsWith('devops_last_online_') ||
            k.startsWith('devops_lab_') ||
            k.startsWith('devops_hw_') ||
            k.startsWith('devops_file_') ||
            k.startsWith('devops_lesson') ||
            k.startsWith('lesson_') ||
            k.startsWith('lesson1_') ||
            k.startsWith('ai_homework_') ||
            k.startsWith('ai_lab_') ||
            k.startsWith('ai_test_') ||
            k.startsWith('mini_quiz_retries_') ||
            k.startsWith('inline_test_sub_'))
        ) {
          dynamicKeys.push(k);
        }
      }
      dynamicKeys.forEach((k) => localStorage.removeItem(k));
    } catch {}
    try {
      sessionStorage.clear();
    } catch {}
    try {
      await clearAllVaultAttachments();
    } catch {}
  }, []);

  const resetData = useCallback(async (studentEmail?: string) => {
    await clearBrowserCache();
    const targetEmail = (studentEmail || '').trim().toLowerCase();
    const resetAllInDb = !targetEmail || targetEmail === 'all' || profile.role === 'admin';

    setUnlockedLessonIds(profile.role === 'admin' ? Array.from({ length: 24 }, (_, i) => i + 1) : [1]);
    setLessons(
      INITIAL_LESSONS.map((l) => ({
        ...l,
        isCompleted: false,
        submissionStatus: 'Not Submitted',
        completedAt: undefined,
      }))
    );
    setLabs(
      INITIAL_LABS.map((l) => ({
        ...l,
        isCompleted: false,
        submissionStatus: 'Not Submitted',
        score: undefined,
        attachedFiles: [],
        tasks: Array.isArray(l.tasks) ? l.tasks.map((t) => ({ ...t, completed: false })) : [],
      }))
    );
    setReadSections({});
    setTestScores({});
    setQuizRetakes({});
    setHomeworkSubmissions([]);
    setLabSubmissions([]);
    setQuizSubmissions([]);
    setCertificates([]);
    setBadges(INITIAL_BADGES.map((b) => ({ ...b, unlocked: false, unlockedAt: undefined })));

    setUserAccounts((prev) =>
      prev.map((u) => {
        if (!resetAllInDb && u.email.toLowerCase().trim() !== targetEmail) {
          return u;
        }
        return {
          ...u,
          unlockedLessonsCount: u.role === 'admin' ? 24 : (u.role as string) === 'parent' ? 0 : 1,
          completedLessonsCount: 0,
          completedLabsCount: 0,
          passedQuizCount: 0,
          totalPoints: u.role === 'admin' ? 3500 : 0,
          attendancePct: 100,
          badges: [],
        };
      })
    );

    setProfile((prev) => ({
      ...prev,
      unlockedLessonsCount: prev.role === 'admin' ? 24 : 1,
      totalPoints: 0,
      attendancePct: 100,
    }));

    try {
      await api.resetAllAcademicData({
        studentEmail: resetAllInDb ? 'all' : targetEmail,
      });
    } catch (e) {
      console.warn('API resetAllAcademicData fallback:', e);
    }
    addNotification('Все данные прогресса и сданные работы успешно сброшены', 'info');
  }, [clearBrowserCache, addNotification, profile.role]);

  // Backward compatibility user object
  const user = useMemo(
    () => ({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role || 'student',
      student_group: profile.group || 'Группа 1 (Август 2026)',
      total_points: profile.totalPoints || 150,
      unlocked_lessons_count: unlockedLessonIds.length,
      completed_lessons_count: lessons.filter((l) => l.isCompleted).length,
      completed_labs_count: labs.filter((l) => l.isCompleted).length,
      passed_quiz_count: quizSubmissions.filter((q) => q.passed).length,
      avatar_url: profile.avatarUrl || '',
    }),
    [profile, unlockedLessonIds, lessons, labs, quizSubmissions]
  );

  const unlockedLessons = unlockedLessonIds;
  const completedLessons = useMemo(
    () => lessons.filter((l) => l.isCompleted).map((l) => l.id),
    [lessons]
  );

  const totalXp = profile.totalPoints || 150;
  const role: UserRole = profile.role || 'student';
  const points = totalXp;
  const homeworks = useMemo(() => {
    const map: Record<number, HomeworkSubmission> & HomeworkSubmission[] = [
      ...homeworkSubmissions,
    ] as any;
    const currentEmail = (profile.email || '').toLowerCase().trim();
    const currentId = profile.id || '';
    // First pass: populate any submission per lessonId
    (homeworkSubmissions || []).forEach((sub) => {
      if (sub && sub.lessonId && !map[sub.lessonId]) {
        map[sub.lessonId] = sub;
      }
    });
    // Second pass: prioritize the active student's own submission for each lessonId
    (homeworkSubmissions || []).forEach((sub) => {
      if (
        sub &&
        sub.lessonId &&
        ((sub.studentEmail && sub.studentEmail.toLowerCase().trim() === currentEmail) ||
          (currentId && sub.studentId === currentId))
      ) {
        map[sub.lessonId] = sub;
      }
    });
    return map;
  }, [homeworkSubmissions, profile.email, profile.id]);

  const value: PortalContextType = {
    activePage,
    setActivePage,
    selectedLessonId,
    setSelectedLessonId,
    selectedLabId,
    setSelectedLabId,
    selectedQuizId,
    setSelectedQuizId,
    setAiDrawerOpen,
    setAiMode,
    isXpModalOpen,
    setIsXpModalOpen,
    isAuditModalOpen,
    setIsAuditModalOpen,
    isSyllabusModalOpen,
    setIsSyllabusModalOpen,
    xpBreakdown,

    currentCourseId,
    setCurrentCourseId: switchCourse,
    courses: AVAILABLE_COURSES,
    currentCourse,
    courseBlocks,

    profile,
    updateProfile,
    loginStudent,
    logoutStudent,

    lessons,
    labs,
    unlockedLessonIds,
    readSections,
    markSectionRead,
    toggleReadSection,
    toggleLessonCompletion,
    toggleLabTask,
    completeLab,
    isLessonUnlocked,
    isLabUnlocked,
    isQuizUnlocked,
    isHomeworkUnlocked,
    isFinalExamUnlocked,

    homeworks,
    homeworkSubmissions,
    labSubmissions,
    submitHomework,
    reviewHomework,
    deleteHomeworkSubmission,
    clearAllHomeworkSubmissions,
    submitLabReport,
    reviewLab,
    deleteLabSubmission,
    clearAllLabSubmissions,
    getPersistentAttachmentsForLab,
    getPersistentAttachmentsForLesson,
    downloadFileAttachment,

    testScores,
    quizSubmissions,
    quizRetakes,
    canRetakeQuiz,
    recordQuizRetake,
    saveTestScore,
    saveQuizSubmission,
    reviewQuizSubmission,
    updateQuizSubmissionComment,
    deleteQuizSubmission,
    clearAllQuizSubmissions,

    userAccounts,
    addUserAccount,
    updateUserAccount,
    deleteUserAccount,
    unlockLesson,
    lockLesson,
    unlockAllLessons,
    toggleBadgeForUser,
    recalculateAllStudentsScores,
    fetchDatabaseFromWebApp,
    syncAllToGoogleSheets,
    restoreAllFromGoogleSheets,
    syncDataToSheets,

    badges,
    unlockBadge,
    totalXp,
    stats,
    leaderboard,
    courseCompletionStatus,
    certificates,
    saveCertificate,
    deleteCertificate,

    refreshDatabase,
    isSyncingDb,
    lastSavedDbAt,
    resetData,
    clearBrowserCache,
    notifications,
    dismissNotification,
    addReward,

    user,
    currentLesson: selectedLessonId,
    setCurrentLesson: setSelectedLessonId,
    unlockedLessons,
    completedLessons,
    points,
    role,
    activeTab,
    setActiveTab,
    refreshData: refreshDatabase,
    setUser: setProfile as any,
  };

  return (
    <PortalContext.Provider value={value}>
      {children}
      {notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="pointer-events-auto p-4 rounded-2xl bg-slate-900/95 border border-indigo-500/50 shadow-2xl backdrop-blur-xl text-white text-xs sm:text-sm flex items-start justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex-1 font-medium">{n.message}</div>
              <button
                onClick={() => dismissNotification(n.id)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
