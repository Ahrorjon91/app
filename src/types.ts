export type PageView =
  | 'dashboard'
  | 'profile'
  | 'lessons'
  | 'lesson-detail'
  | 'labs'
  | 'lab-detail'
  | 'homework'
  | 'quizzes'
  | 'tests'
  | 'quiz-runner'
  | 'final-exam'
  | 'project'
  | 'mentor'
  | 'handbook'
  | 'leaderboard'
  | 'certificates'
  | 'downloads'
  | 'faq'
  | 'settings'
  | 'user-management'
  | 'unlock-lessons'
  | 'analytics'
  | 'access-denied'
  | 'login'
  | 'ai-vibe-coding';

export type UserRole = 'admin' | 'student';

export interface StudentProfileData {
  name: string;
  id: string; // e.g., "STU-2026-8841"
  email: string;
  phone: string;
  telegram: string;
  course: string;
  startDate: string;
  graduationDate: string;
  mentorName: string;
  avatarUrl: string;
  mentorAvatarUrl?: string;
  rank: number;
  attendancePct: number;
  totalPoints: number;
  qrCodeValue: string;
  loginUsername?: string;
  loginPassword?: string;
  role?: UserRole;
  unlockedLessonsCount?: number;
  isAuthenticated?: boolean;
  group?: string;
  hiddenFromLeaderboard?: boolean;
}

export interface CourseBlock {
  id: number;
  title: string;
  titleRu: string;
  weeks: string;
  lessonRange: string;
  description: string;
  color: string; // Tailwind color class
  testId?: string;
}

export interface LessonData {
  id: number;
  blockId: number;
  week: number;
  lessonNumber: number;
  title: string;
  titleRu: string;
  theoryDuration: number; // 45 min
  practiceDuration: number; // 35 min
  theorySummary: string;
  learningObjectives: string[];
  tools: string[];
  commands: { command: string; description: string; OS: 'Linux' | 'Windows' | 'Cross' | 'macOS' }[];
  homeworkTitle: string;
  homeworkDesc: string;
  videoUrl?: string;
  presentationUrl?: string;
  cheatSheetMd: string;
  isCompleted?: boolean;
  completedAt?: string;
  submissionStatus?: string;
  labId?: number;
  quizId?: number;
}

export type Lesson = LessonData;

export interface LabTaskItem {
  id: string;
  text: string;
  descriptionRu?: string;
  expectedCommand?: string;
  hint?: string;
  completed: boolean;
}

export interface AttachedReportFile {
  id: string;
  name: string;
  size?: string;
  type: 'pdf' | 'docx' | 'txt' | 'ppt' | 'image' | 'zip' | 'other';
  dataUrl?: string;
  url?: string;
  downloadUrl?: string;
  driveFileId?: string;
}

export interface LabData {
  id: number;
  lessonId: number;
  blockId: number;
  title: string;
  titleRu?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  requirements: string[];
  topologyDesc: string;
  scenario: string;
  scenarioRu?: string;
  tasks: LabTaskItem[];
  hints: string[];
  solutionGuide: string;
  verificationCmd: string;
  isCompleted: boolean;
  wowMoment?: string;
  screenshots?: string[];
  attachedFiles?: AttachedReportFile[];
  fileUrl?: string;
  repoUrl?: string;
  studentNotes?: string;
  pdfReportUrl?: string;
  pdfReportName?: string;
  submissionStatus?: 'Not Submitted' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedAt?: string;
  score?: number;
  mentorFeedback?: string;
  studentName?: string;
  studentId?: string;
  studentEmail?: string;
}

export type SubmissionStatus = 'Not Submitted' | 'In Progress' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';

export interface HomeworkSubmission {
  id?: string;
  lessonId: number;
  lessonTitle?: string;
  submittedAt?: string;
  status: SubmissionStatus;
  score?: number; // 0 - 100
  fileUrl?: string;
  githubUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  attachedFiles?: AttachedReportFile[];
  studentNotes?: string;
  reportText?: string;
  mentorFeedback?: string;
  studentName?: string;
  studentId?: string;
  studentEmail?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface LabSubmission {
  id?: string;
  labId: number;
  labTitle?: string;
  submittedAt?: string;
  status?: SubmissionStatus | string;
  submissionStatus?: SubmissionStatus | string;
  score?: number;
  tasksCompleted?: number;
  totalTasks?: number;
  repoUrl?: string;
  demoUrl?: string;
  fileUrl?: string;
  studentNotes?: string;
  reportText?: string;
  mentorFeedback?: string;
  studentName?: string;
  studentEmail?: string;
  studentId?: string;
  isCompleted?: boolean;
  screenshots?: string[];
  pdfReportName?: string;
  attachedFiles?: AttachedReportFile[];
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  registeredAt: string;
  unlockedLessonsCount: number;
  completedLessonsCount: number;
  completedLabsCount: number;
  passedQuizCount: number;
  attendancePct: number;
  status: 'Active' | 'Blocked' | 'Pending';
  group?: string;
  hiddenFromLeaderboard?: boolean;
  avatarUrl?: string;
  mentorAvatarUrl?: string;
  phone?: string;
  telegram?: string;
  bio?: string;
  mentorName?: string;
  totalPoints?: number;
  completedHomeworkCount?: number;
  rank?: number;
  totalTimeSpentMinutes?: number;
  lastOnlineAt?: string;
  readSections?: any;
  badges?: any;
  testScores?: any;
}

export interface QuizAnswerDetail {
  questionId: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizSubmissionResult {
  id: string;
  submissionId?: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
  studentId: string;
  studentEmail: string;
  submittedAt: string;
  scorePct: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  details?: QuizAnswerDetail[];
  answers?: any;
  userAnswers?: any;
  mentorComment?: string;
  mentorFeedback?: string;
  fileUrl?: string;
  attachedFiles?: AttachedReportFile[];
  studentNotes?: string;
  status?: 'Submitted' | 'Approved' | 'Rejected' | 'Pending' | 'Reviewed';
  reviewedAt?: string;
  reviewedBy?: string;
  lessonId?: number;
  retakeAllowed?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTest {
  id: string;
  blockId: number;
  title: string;
  titleRu?: string;
  description?: string;
  timeLimitMinutes?: number;
  durationMinutes?: number;
  questionsCount?: number;
  passingScore?: number;
  maxAttempts?: number;
  xpReward?: number;
  questions?: QuizQuestion[];
  userScore?: number;
  passed?: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  titleRu?: string;
  descriptionRu?: string;
  xpReward?: number;
  icon: string;
  category: 'Linux' | 'Network' | 'Security' | 'SysAdmin' | 'General' | 'AI';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardUser {
  id?: string;
  rank: number;
  name: string;
  email?: string;
  avatar: string;
  completedLessons: number;
  homeworkScore: number;
  attendancePct: number;
  totalPoints: number;
  badgesCount: number;
  isCurrentUser?: boolean;
  group?: string;
  hiddenFromLeaderboard?: boolean;
  status?: 'Active' | 'Pending' | 'Blocked';
}

export interface CertificateData {
  id?: string;
  certificateId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  issuedAt: string;
  verificationUrl?: string;
  finalScoreText?: string;
  academicHours?: string;
  directorName?: string;
  mentorConfirmed?: boolean;
  confirmedByMentor?: string;
  confirmedAt?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
}

export interface ResourceDownload {
  id: string;
  title: string;
  category: 'ISO' | 'VM' | 'Software' | 'Scripts' | 'PDF' | 'PacketTracer' | string;
  fileSize: string;
  description: string;
  downloadUrl: string;
  iconName: string;
}

export interface FAQItemData {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface ProjectMilestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

