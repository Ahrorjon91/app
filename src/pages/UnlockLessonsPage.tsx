import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import { AttachedReportFile, QuizSubmissionResult, HomeworkSubmission, LabData, SubmissionStatus } from '../types';
import { INITIAL_LABS } from '../data/labsData';
import {
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  FlaskConical,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  RotateCcw,
  Image as ImageIcon,
  FileText,
  Eye,
  FileSpreadsheet,
  FileCode,
  X,
  Check,
  Download,
  HelpCircle,
  Search,
  User,
  Send,
  BookOpen,
  Calculator,
  Trash2,
  ExternalLink,
  Globe,
  Maximize2,
  Filter
} from 'lucide-react';
import { MentorGradingGuide } from '../components/MentorGradingGuide';
import { QuizResultReviewModal } from '../components/QuizResultReviewModal';
import { sanitizeQuizSubmission, isLegacyDummySubmission, resolveQuizAnswerDetails } from '../lib/quizHelpers';
import { COURSE_RULES } from '../lib/courseRules';
import { triggerFileDownload } from '../lib/attachmentStorage';

export const UnlockLessonsPage: React.FC = () => {
  const {
    lessons,
    unlockedLessonIds,
    unlockLesson,
    lockLesson,
    unlockAllLessons,
    resetData,
    homeworks,
    homeworkSubmissions,
    reviewHomework,
    deleteHomeworkSubmission,
    clearAllHomeworkSubmissions,
    labs,
    labSubmissions,
    reviewLab,
    deleteLabSubmission,
    clearAllLabSubmissions,
    profile,
    userAccounts,
    quizSubmissions,
    reviewQuizSubmission,
    updateQuizSubmissionComment,
    deleteQuizSubmission,
    clearAllQuizSubmissions,
    syncAllToGoogleSheets,
    restoreAllFromGoogleSheets
  } = usePortal();

  const [isSyncing, setIsSyncing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [activeTab, setActiveTab] = useState<'homework' | 'labs' | 'quizzes' | 'eval-rules'>('homework');
  const [hwFilterTab, setHwFilterTab] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [hwSearchQuery, setHwSearchQuery] = useState('');
  const [labFilterTab, setLabFilterTab] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [quizFilterTab, setQuizFilterTab] = useState<'all' | 'pending' | 'passed' | 'failed' | 'reviewed'>('all');
  const [selectedReviewLessonId, setSelectedReviewLessonId] = useState<number | null>(null);
  const [selectedReviewHwKey, setSelectedReviewHwKey] = useState<string | null>(null);
  const [selectedLabReviewKey, setSelectedLabReviewKey] = useState<string | null>(null);
  const [selectedQuizSubmissionId, setSelectedQuizSubmissionId] = useState<string | null>(null);
  const [reviewModalSubmission, setReviewModalSubmission] = useState<QuizSubmissionResult | null>(null);
  const [quizItemFilter, setQuizItemFilter] = useState<Record<string, 'all' | 'mistakes' | 'correct'>>({});

  // Mentor Review state for Homework
  const [mentorComment, setMentorComment] = useState('Отличная работа! Домашнее задание выполнено в полном объеме согласно критериям оценки.');
  const [gradeScore, setGradeScore] = useState<number>(100);

  // Mentor Review state for Labs
  const [labScore, setLabScore] = useState<number>(100);
  const [labFeedback, setLabFeedback] = useState<string>(
    'Отличная работа! Все задачи из детализированного списка выполнены корректно. Скриншоты и PDF-отчет проверены.'
  );

  // Mentor Quiz note state
  const [quizMentorNotes, setQuizMentorNotes] = useState<Record<string, string>>({});
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [quizCategoryTab, setQuizCategoryTab] = useState<'all' | 'block_tests' | 'lesson_quizzes'>('all');
  const [labSearchQuery, setLabSearchQuery] = useState('');

  // Modal preview state
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);
  const [activePreviewFile, setActivePreviewFile] = useState<AttachedReportFile | null>(null);

  // In-app Delete Confirmation Modal State (Reliable inside iframes)
  interface DeleteTarget {
    type: 'homework' | 'lab' | 'quiz';
    id: string;
    lessonId?: number;
    labId?: number;
    submissionId?: string;
    quizId?: string;
    studentEmail?: string;
    studentId?: string;
    studentName?: string;
    title: string;
    description?: string;
  }

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // In-app Reset All Data (Labs, HW, Tests) Modal State
  const [isResetAllModalOpen, setIsResetAllModalOpen] = useState(false);
  const [isResettingAll, setIsResettingAll] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleResetAllData = () => {
    setIsResettingAll(true);
    try {
      resetData();
      setSelectedReviewLessonId(null);
      setSelectedLabReviewKey(null);
      setSelectedQuizSubmissionId(null);
      showToast('Все академические данные (Лабораторные работы, ДЗ и Тесты) успешно очищены!');
    } catch (err: any) {
      showToast(`Ошибка сброса данных: ${err?.message || 'Не удалось выполнить очистку'}`);
    } finally {
      setIsResettingAll(false);
      setIsResetAllModalOpen(false);
    }
  };

  const downloadAttachedFile = (file: AttachedReportFile) => {
    triggerFileDownload(file);
  };

  const allHomeworkList = useMemo(() => {
    const map = new Map<string, HomeworkSubmission>();

    const parseHwFiles = (rawAtt: any, fallbackUrl?: string, lessonIdNum?: number): AttachedReportFile[] => {
      let result: AttachedReportFile[] = [];
      if (Array.isArray(rawAtt)) {
        result = rawAtt
          .filter((f: any) => {
            if (!f) return false;
            if (typeof f === 'string') {
              const str = f.trim();
              return str.length > 0 && str !== '—' && str !== '[]' && str !== '{}' && str !== '[object Object]' && !/^file_\d+$/i.test(str);
            }
            const name = String(f.name || f.fileName || '').trim();
            const url = String(f.url || f.downloadUrl || '').trim();
            const hasData = Boolean(f.dataUrl || f.fileDataUrl || f.base64Data);
            if (!name && !url && !hasData) return false;
            if (name === '—' || name === '[]' || name === '{}' || name === '[object Object]') return false;
            if (/^file_\d+$/i.test(name) && !url && !hasData) return false;
            return true;
          })
          .map((f: any, fIdx: number) => {
            const rawName = typeof f === 'string' ? f : (f.name || f.fileName || '');
            const isUrl = String(rawName).startsWith('http') || String(f.url || '').startsWith('http') || String(f.downloadUrl || '').startsWith('http');
            const realUrl = isUrl ? (String(f.url || '').startsWith('http') ? f.url : (String(f.downloadUrl || '').startsWith('http') ? f.downloadUrl : rawName)) : (f.url || '#');
            const cleanDisplayName = isUrl && rawName.startsWith('http') ? (rawName.includes('google.com') ? `Google Drive Document #${fIdx + 1}` : `Файл ДЗ #${fIdx + 1}`) : (rawName || `Файл ДЗ #${fIdx + 1}`);
            const ext = cleanDisplayName.split('.').pop()?.toLowerCase() || '';
            const guessedType = f.type || (['pdf', 'docx', 'doc', 'txt', 'image', 'zip', 'ppt', 'pptx'].includes(ext) ? ext : 'pdf');

            return {
              id: f.id || `att-hw-${fIdx}`,
              name: cleanDisplayName,
              size: f.size || (isUrl ? 'Cloud Drive' : (f.dataUrl || f.fileDataUrl || f.base64Data ? '1.2 MB' : '')),
              type: guessedType as any,
              url: realUrl,
              downloadUrl: isUrl ? realUrl : undefined,
              dataUrl: f.dataUrl
            };
          });
      } else if (rawAtt && rawAtt !== '—' && rawAtt !== 'undefined' && rawAtt !== 'null') {
        const str = String(rawAtt).trim();
        if (str && str !== '—' && str !== '[]' && str !== '{}' && str !== '[object Object]' && !/^file_\d+$/i.test(str)) {
          result = str.split(', ').filter((fn) => {
            const clean = fn.replace(/^"|"$/g, '').trim();
            return clean && clean !== '—' && !/^file_\d+$/i.test(clean);
          }).map((fn: string, fIdx: number) => {
            const cleanFn = fn.replace(/^"|"$/g, '').trim();
            const isUrl = cleanFn.startsWith('http');
            const guessedType = cleanFn.toLowerCase().includes('.pdf') ? 'pdf' : (cleanFn.toLowerCase().includes('.doc') ? 'docx' : (cleanFn.toLowerCase().includes('.txt') ? 'txt' : (cleanFn.toLowerCase().includes('.ppt') ? 'ppt' : (cleanFn.toLowerCase().includes('.png') || cleanFn.toLowerCase().includes('.jpg') ? 'image' : 'other'))));
            const displayName = isUrl ? (cleanFn.includes('google.com') ? `Google Drive Document #${fIdx + 1}` : `Файл ДЗ #${fIdx + 1}`) : cleanFn;
            return {
              id: `att-hw-${fIdx}`,
              name: displayName,
              size: 'Cloud Drive',
              type: guessedType as any,
              url: isUrl ? cleanFn : '#',
              downloadUrl: isUrl ? cleanFn : undefined
            };
          });
        }
      }

      if (result.length === 0 && fallbackUrl && fallbackUrl.includes('drive.google.com')) {
        result = [{
          id: `att-hw-url-${lessonIdNum || 'drive'}`,
          name: 'Google Drive Document',
          size: 'Cloud Drive',
          type: 'pdf',
          url: fallbackUrl,
          downloadUrl: fallbackUrl
        }];
      }

      // Deduplicate files by (name || url) to prevent any duplicate files in mentor view
      const seenHwFiles = new Set<string>();
      return result.filter((f) => {
        if (!f) return false;
        const key = (f.name || f.url || f.id || '').trim().toLowerCase();
        if (key && seenHwFiles.has(key)) return false;
        if (key) seenHwFiles.add(key);
        return true;
      });
    };

    const processHw = (hw: any) => {
      if (!hw) return;
      const rawLessonId = hw.lessonId || hw.LessonID || (hw.id && typeof hw.id === 'number' ? hw.id : parseInt(String(hw.id || '').replace(/\D/g, ''), 10));
      const lId = Number(rawLessonId);
      if (!lId || isNaN(lId) || lId < 1 || lId > 30) return;

      const rawEmail = String(hw.studentEmail || hw.StudentEmail || hw.email || hw.Email || (profile.role === 'student' ? profile.email : '')).toLowerCase().trim();
      const rawStudentId = String(hw.studentId || hw.StudentID || hw.StudentId || '').trim();
      const matchedUser = (userAccounts || []).find((u) =>
        (rawEmail && u && u.email && String(u.email).toLowerCase().trim() === rawEmail) ||
        (rawStudentId && u && u.id && (String(u.id).trim() === rawStudentId || String(u.id).endsWith(rawStudentId.replace(/\D/g, ''))))
      );
      const studentEmail = rawEmail || matchedUser?.email || '';
      const studentId = rawStudentId || matchedUser?.id || (studentEmail ? studentEmail.split('@')[0] : '');
      const studentName = hw.studentName || hw.StudentName || matchedUser?.name || (studentEmail ? studentEmail.split('@')[0] : 'Студент');
      if (studentEmail === 'man@mail.com' || studentId === 'USR-STU-MAN' || studentName === 'Man') {
        return;
      }
      const key = `${lId}_${studentEmail || studentId || 'hw'}`;

      let rawStatus = String(hw.status || hw.Status || (hw.score ? 'Approved' : 'Submitted')).trim();
      const rawLower = rawStatus.toLowerCase();
      if (rawLower === 'not submitted' || rawLower === 'not started' || rawLower === 'не сдано' || rawLower === 'ожидает отправки') {
        return;
      }

      let normStatus: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' = 'Submitted';
      const sUpper = rawStatus.toUpperCase();
      if (sUpper.includes('APPROV') || sUpper.includes('ЗАЧТ') || sUpper.includes('ПРИНЯТ') || sUpper.includes('ОДОБРЕН') || sUpper.includes('GRADED')) {
        normStatus = 'Approved';
      } else if (sUpper.includes('REJECT') || sUpper.includes('ОТКЛОН') || sUpper.includes('ДОРАБОТ') || sUpper.includes('НЕ ЗАЧТ')) {
        normStatus = 'Rejected';
      } else if (sUpper.includes('REVIEW') || sUpper.includes('ПРОВЕРК') || sUpper.includes('НА ПРОВЕРКЕ')) {
        normStatus = 'Under Review';
      } else {
        normStatus = 'Submitted';
      }

      const parsedFiles = parseHwFiles(hw.attachedFiles || hw.AttachedFiles, hw.fileUrl || hw.FileUrl, lId);

      const existing = map.get(key);
      if (!existing || (normStatus === 'Approved' && existing.status !== 'Approved') || (Number(hw.score || hw.Score || 0) > Number(existing?.score || 0))) {
        map.set(key, {
          ...hw,
          id: hw.id || (hw as any).submissionId || `HW-${lId}-${studentEmail.replace(/[^a-z0-9]/g, '_') || studentId || 'std'}`,
          lessonId: lId,
          studentEmail,
          studentName,
          studentId,
          status: normStatus,
          score: hw.score !== undefined ? Number(hw.score) : (hw.Score !== undefined ? Number(hw.Score) : (normStatus === 'Approved' ? 100 : undefined)),
          fileUrl: hw.fileUrl || hw.FileUrl || hw.githubUrl || hw.repoUrl || (hw as any).demoUrl || '',
          githubUrl: hw.githubUrl || hw.repoUrl || hw.fileUrl || hw.FileUrl || (hw as any).demoUrl || '',
          repoUrl: hw.repoUrl || hw.githubUrl || hw.fileUrl || hw.FileUrl || '',
          studentNotes: hw.studentNotes || hw.StudentNotes || hw.notes || hw.reportText || '',
          mentorFeedback: hw.mentorFeedback || hw.MentorFeedback || hw.feedback || '',
          submittedAt: hw.submittedAt || hw.SubmittedAt || existing?.submittedAt || new Date().toLocaleString('ru-RU'),
          attachedFiles: parsedFiles.length > 0 ? parsedFiles : (existing?.attachedFiles || [])
        });
      } else if (parsedFiles.length > 0 && (!existing.attachedFiles || existing.attachedFiles.length === 0)) {
        existing.attachedFiles = parsedFiles;
      }
    };

    (homeworkSubmissions || []).forEach((hw) => processHw(hw));
    Object.values(homeworks || {}).forEach((hw: any) => processHw(hw));

    return Array.from(map.values());
  }, [homeworkSubmissions, homeworks, profile, userAccounts]);

  const pendingHomeworkList = allHomeworkList.filter(
    (h: any) => h.status === 'Submitted' || h.status === 'Under Review' || (!h.status && !h.score)
  );
  const reviewedHomeworkList = allHomeworkList.filter(
    (h: any) => h.status === 'Approved' || h.status === 'Rejected'
  );

  const tabFilteredHomeworkList =
    hwFilterTab === 'pending'
      ? pendingHomeworkList
      : hwFilterTab === 'reviewed'
      ? reviewedHomeworkList
      : allHomeworkList;

  const filteredHomeworkList = useMemo(() => {
    if (!hwSearchQuery.trim()) return tabFilteredHomeworkList;
    const q = hwSearchQuery.toLowerCase().trim();
    return tabFilteredHomeworkList.filter((hw: any) => {
      const matchName = String(hw.studentName || '').toLowerCase().includes(q);
      const matchEmail = String(hw.studentEmail || '').toLowerCase().includes(q);
      const matchId = String(hw.studentId || '').toLowerCase().includes(q);
      const matchLesson = String(hw.lessonId || '').includes(q) || String(hw.lessonTitle || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchId || matchLesson;
    });
  }, [tabFilteredHomeworkList, hwSearchQuery]);

  // Labs list and filtering (strict deduplication by labId + studentEmail like homework)
  const allLabsList = useMemo(() => {
    const map = new Map<string, LabData>();

    const parseLabFiles = (rawAtt: any, fallbackUrl?: string, labIdNum?: number): AttachedReportFile[] => {
      let result: AttachedReportFile[] = [];
      if (Array.isArray(rawAtt)) {
        result = rawAtt
          .filter((f: any) => {
            if (!f) return false;
            if (typeof f === 'string') {
              const str = f.trim();
              return str.length > 0 && str !== '—' && str !== '[]' && str !== '{}' && str !== '[object Object]' && !/^file_\d+$/i.test(str);
            }
            const name = String(f.name || f.fileName || '').trim();
            const url = String(f.url || f.downloadUrl || '').trim();
            const hasData = Boolean(f.dataUrl || f.fileDataUrl || f.base64Data);
            if (!name && !url && !hasData) return false;
            if (name === '—' || name === '[]' || name === '{}' || name === '[object Object]') return false;
            if (/^file_\d+$/i.test(name) && !url && !hasData) return false;
            return true;
          })
          .map((f: any, fIdx: number) => {
            const rawName = typeof f === 'string' ? f : (f.name || f.fileName || '');
            const isUrl = String(rawName).startsWith('http') || String(f.url || '').startsWith('http') || String(f.downloadUrl || '').startsWith('http');
            const realUrl = isUrl ? (String(f.url || '').startsWith('http') ? f.url : (String(f.downloadUrl || '').startsWith('http') ? f.downloadUrl : rawName)) : (f.url || '#');
            const cleanDisplayName = isUrl && rawName.startsWith('http') ? (rawName.includes('drive.google.com') ? `Google Drive Document #${fIdx + 1}` : `Файл #${fIdx + 1}`) : (rawName || `Файл #${fIdx + 1}`);
            const ext = cleanDisplayName.split('.').pop()?.toLowerCase() || '';
            const guessedType = f.type || (['pdf', 'docx', 'doc', 'txt', 'image', 'zip', 'ppt', 'pptx'].includes(ext) ? ext : 'pdf');

            return {
              id: f.id || `att-lab-${fIdx}`,
              name: cleanDisplayName,
              size: f.size || (isUrl ? 'Cloud Drive' : (f.dataUrl || f.fileDataUrl || f.base64Data ? '1.2 MB' : '')),
              type: guessedType as any,
              url: realUrl,
              downloadUrl: isUrl ? realUrl : undefined,
              dataUrl: f.dataUrl
            };
          });
      } else if (rawAtt && rawAtt !== '—' && rawAtt !== 'undefined' && rawAtt !== 'null') {
        const str = String(rawAtt).replace(/^"|"$/g, '').trim();
        if (str && str !== '—' && str !== '[]' && str !== '{}' && str !== '[object Object]' && !/^file_\d+$/i.test(str)) {
          result = str.split(', ').filter((fn) => {
            const clean = fn.replace(/^"|"$/g, '').trim();
            return clean && clean !== '—' && !/^file_\d+$/i.test(clean);
          }).map((fn: string, fIdx: number) => {
            const cleanFn = fn.replace(/^"|"$/g, '').trim();
            const isUrl = cleanFn.startsWith('http');
            const guessedType = cleanFn.toLowerCase().includes('.pdf') ? 'pdf' : (cleanFn.toLowerCase().includes('.doc') ? 'docx' : (cleanFn.toLowerCase().includes('.txt') ? 'txt' : (cleanFn.toLowerCase().includes('.ppt') ? 'ppt' : (cleanFn.toLowerCase().includes('.png') || cleanFn.toLowerCase().includes('.jpg') ? 'image' : 'other'))));
            const displayName = isUrl ? (cleanFn.includes('drive.google.com') ? `Google Drive Document #${fIdx + 1}` : `Файл #${fIdx + 1}`) : cleanFn;
            return {
              id: `att-lab-${fIdx}`,
              name: displayName,
              size: isUrl ? 'Cloud Drive' : '1.2 MB',
              type: guessedType as any,
              url: isUrl ? cleanFn : '#',
              downloadUrl: isUrl ? cleanFn : undefined
            };
          });
        }
      }

      if (result.length === 0 && fallbackUrl && fallbackUrl.includes('drive.google.com')) {
        result = [{
          id: `att-lab-url-${labIdNum || 'drive'}`,
          name: 'Google Drive Document',
          size: 'Cloud Drive',
          type: 'pdf',
          url: fallbackUrl,
          downloadUrl: fallbackUrl
        }];
      }

      // Deduplicate files by (name || url) to prevent any duplicate files in mentor view
      const seenLabFiles = new Set<string>();
      return result.filter((f) => {
        if (!f) return false;
        const key = (f.name || f.url || f.id || '').trim().toLowerCase();
        if (key && seenLabFiles.has(key)) return false;
        if (key) seenLabFiles.add(key);
        return true;
      });
    };

    const processLab = (l: any, isFromLabsState = false, originEmail?: string) => {
      if (!l || isLegacyDummySubmission(l)) return;
      const rawLabId = l.labId || l.LabID || l['ID Лабы'] || l['Lab ID'] || (typeof l.id === 'number' ? l.id : parseInt(String(l.id || '').replace(/\D/g, ''), 10));
      const lId = Number(rawLabId);
      if (!lId || isNaN(lId) || lId < 1 || lId > 30) return;

      const rawEmail = String(originEmail || l.studentEmail || l.StudentEmail || l.email || l.Email || (profile.role === 'student' ? profile.email : '')).toLowerCase().trim();
      const rawStudentId = String(l.studentId || l.StudentID || l.StudentId || (profile.role === 'student' ? profile.id : '')).trim();

      // If neither email nor student ID exists, this is NOT a student submission
      if (!rawEmail && !rawStudentId) {
        return;
      }

      const rawStatus = String(l.submissionStatus || l.Status || l.status || '').trim();
      const rawStLower = rawStatus.toLowerCase();

      const hasSubmittedContent =
        Boolean(l.submittedAt) ||
        Boolean(l.score !== undefined && l.score !== null && l.score > 0) ||
        Boolean(l.pdfReportName) ||
        Boolean(l.fileUrl) ||
        Boolean(l.repoUrl) ||
        Boolean((l as any).demoUrl) ||
        Boolean((l as any).githubUrl) ||
        Boolean(l.studentNotes) ||
        Boolean(l.reportText) ||
        (Array.isArray(l.screenshots) && l.screenshots.length > 0) ||
        (Array.isArray(l.attachedFiles) && l.attachedFiles.length > 0) ||
        (typeof l.attachedFiles === 'string' && l.attachedFiles.length > 2 && l.attachedFiles !== '[]') ||
        (Array.isArray(l.tasks) && l.tasks.some((t: any) => t && t.completed));

      // Mentors and admins are staff, not students - only skip if no actual submission content
      if ((rawEmail === 'admin@devopspro.tech' || rawEmail.includes('mentor') || rawEmail === 'mentor@devopspro.tech') && !hasSubmittedContent) {
        return;
      }

      const matchedUser = (userAccounts || []).find((u) =>
        (rawEmail && u && u.email && String(u.email).toLowerCase().trim() === rawEmail) ||
        (rawStudentId && u && u.id && (String(u.id).toLowerCase().trim() === rawStudentId.toLowerCase() || String(u.id).endsWith(rawStudentId.replace(/\D/g, ''))))
      );

      const email = rawEmail || matchedUser?.email || (profile.role === 'student' ? profile.email : '');
      const studentId = rawStudentId || matchedUser?.id || (profile.role === 'student' ? profile.id : (email ? email.split('@')[0] : ''));

      // If student cannot be determined or is placeholder without email
      if (!email && (!studentId || studentId === 'Без ID' || studentId === 'undefined' || studentId === 'std')) {
        return;
      }

      const studentName = l.studentName || l.StudentName || l.name || l.Name || matchedUser?.name || (profile.role === 'student' ? profile.name : (email ? email.split('@')[0] : 'Студент'));
      if (!studentName || (studentName === 'Студент' && !email && !studentId)) {
        return;
      }

      // Explicit unsubmitted states check
      const isExplicitlyNotSubmitted =
        rawStLower === 'not started' ||
        rawStLower === 'not submitted' ||
        rawStLower === 'не начато' ||
        rawStLower === 'не сдано' ||
        rawStLower.startsWith('not_') ||
        rawStLower.startsWith('not ');

      if (isExplicitlyNotSubmitted && !hasSubmittedContent) {
        return;
      }
      if (!rawStatus && !hasSubmittedContent && !l.isCompleted) {
        return;
      }

      // If from labs state and role is mentor/admin, never include default curriculum labs
      if (isFromLabsState && profile.role !== 'student') {
        return;
      }

      const isApproved = rawStLower.includes('approv') || rawStLower.includes('зачт') || rawStLower.includes('passed') || rawStLower.includes('принят') || rawStLower.includes('одобрен');
      const isRejected = rawStLower.includes('reject') || rawStLower.includes('доработ') || rawStLower.includes('отклон') || rawStLower.includes('не зачт');
      const isInProgress = rawStLower.includes('progress') || rawStLower.includes('процесс');

      let statusStr: SubmissionStatus = 'Under Review';
      if (isApproved) {
        statusStr = 'Approved';
      } else if (isRejected) {
        statusStr = 'Rejected';
      } else if (isInProgress) {
        statusStr = 'In Progress';
      } else {
        statusStr = 'Under Review';
      }

      const key = `${lId}_${email || studentId}`;
      const baseLab = INITIAL_LABS.find((b) => b.id === lId);
      const defaultTasks = baseLab?.tasks || [];
      const isLabFullyDone = statusStr === 'Approved' || (l.isCompleted && statusStr !== 'Under Review' && statusStr !== 'Rejected');
      const tasks = Array.isArray(l.tasks) && l.tasks.length > 0
        ? l.tasks.map((t: any) => ({ ...t, completed: isLabFullyDone ? true : Boolean(t.completed) }))
        : (Array.isArray(l.tasksData) && l.tasksData.length > 0
            ? l.tasksData.map((t: any) => ({ ...t, completed: isLabFullyDone ? true : Boolean(t.completed) }))
            : defaultTasks.map((t) => ({ ...t, completed: isLabFullyDone ? true : true })));

      const parsedLabFiles = parseLabFiles(l.attachedFiles || l.AttachedFiles || l['Прикрепленные Файлы'], l.pdfReportName || l.fileUrl || l.FileUrl, lId);

      let localRepoUrl = '';
      let localLabNotes = '';
      try {
        localRepoUrl = localStorage.getItem(`devops_lab_${lId}_repo_url`) || '';
        localLabNotes = localStorage.getItem(`devops_lab_${lId}_notes`) || '';
      } catch {}

      const existing = map.get(key);
      const resolvedUrl =
        l.repoUrl ||
        l.fileUrl ||
        l.FileUrl ||
        (l as any).demoUrl ||
        (l as any).githubUrl ||
        (l as any).repo_url ||
        (l as any).file_url ||
        (l as any).demo_url ||
        existing?.fileUrl ||
        (existing as any)?.repoUrl ||
        localRepoUrl ||
        '';
      const resolvedNotes =
        l.studentNotes ||
        l.notes ||
        l.reportText ||
        (l as any).student_notes ||
        (l as any).report_text ||
        existing?.studentNotes ||
        localLabNotes ||
        '';

      if (!existing || (statusStr === 'Approved' && existing.submissionStatus !== 'Approved') || (Number(l.score || 0) > Number(existing?.score || 0))) {
        map.set(key, {
          ...(baseLab || {}),
          ...l,
          id: lId,
          studentEmail: email,
          studentName,
          studentId,
          submissionStatus: statusStr,
          tasks,
          isCompleted: isLabFullyDone,
          score: l.score !== undefined ? Number(l.score) : (statusStr === 'Approved' ? 100 : existing?.score),
          mentorFeedback: l.mentorFeedback || existing?.mentorFeedback,
          submittedAt: l.submittedAt || existing?.submittedAt || new Date().toLocaleString('ru-RU'),
          attachedFiles: parsedLabFiles.length > 0 ? parsedLabFiles : (existing?.attachedFiles || []),
          fileUrl: resolvedUrl,
          repoUrl: resolvedUrl,
          studentNotes: resolvedNotes,
        });
      } else {
        if (parsedLabFiles.length > 0 && (!existing.attachedFiles || existing.attachedFiles.length === 0)) {
          existing.attachedFiles = parsedLabFiles;
        }
        if (resolvedUrl && !existing.fileUrl) {
          existing.fileUrl = resolvedUrl;
          (existing as any).repoUrl = resolvedUrl;
        }
        if (resolvedNotes && !existing.studentNotes) {
          existing.studentNotes = resolvedNotes;
        }
      }
    };

    (labSubmissions || []).forEach((l) => processLab(l, false));
    if (profile.role === 'student') {
      (labs || []).forEach((l) => processLab(l, true));
    }

    return Array.from(map.values());
  }, [labSubmissions, labs, profile, userAccounts]);

  const pendingLabsList = allLabsList.filter(
    (l) => l.submissionStatus === 'Under Review' || l.submissionStatus === 'Submitted' || l.submissionStatus === 'In Progress' || (!l.submissionStatus && l.isCompleted)
  );
  const reviewedLabsList = allLabsList.filter(
    (l) => l.submissionStatus === 'Approved' || l.submissionStatus === 'Rejected'
  );

  const filteredLabsList = useMemo(() => {
    let list = labFilterTab === 'pending'
      ? pendingLabsList
      : labFilterTab === 'reviewed'
      ? reviewedLabsList
      : allLabsList;

    if (labSearchQuery.trim()) {
      const q = labSearchQuery.toLowerCase().trim();
      list = list.filter((l) =>
        (l.studentName || '').toLowerCase().includes(q) ||
        (l.studentEmail || '').toLowerCase().includes(q) ||
        (l.studentId || '').toLowerCase().includes(q) ||
        (l.titleRu || l.title || '').toLowerCase().includes(q) ||
        String(l.id).includes(q)
      );
    }
    return list;
  }, [allLabsList, pendingLabsList, reviewedLabsList, labFilterTab, labSearchQuery]);

  // Quiz list and filtering with robust sanitization, deduplication and student lookup
  const cleanQuizSubmissions = useMemo(() => {
    const map = new Map<string, QuizSubmissionResult>();
    (quizSubmissions || []).forEach((rawQ) => {
      if (!rawQ) return;
      const q = sanitizeQuizSubmission(rawQ, userAccounts);
      if (!q || !q.quizId) return;
      const emailKey = (q.studentEmail || q.studentId || '').toLowerCase().trim();
      const quizKey = (q.quizId || '').toUpperCase().trim();
      const key = `${emailKey}_${quizKey}`;

      const existing = map.get(key);
      if (!existing) {
        map.set(key, q);
      } else {
        const existingScore = Number(existing.scorePct || 0);
        const newScore = Number(q.scorePct || 0);
        const existingDate = new Date(existing.submittedAt || 0).getTime() || 0;
        const newDate = new Date(q.submittedAt || 0).getTime() || 0;

        if (
          newScore > existingScore ||
          (newScore === existingScore && newDate >= existingDate) ||
          (q.status === 'Approved' && existing.status !== 'Approved')
        ) {
          map.set(key, q);
        }
      }
    });
    return Array.from(map.values());
  }, [quizSubmissions, userAccounts]);

  const pendingQuizSubmissions = cleanQuizSubmissions.filter((q) => q && (q.status === 'Pending' || q.status === 'Submitted' || (!q.mentorComment && !q.reviewedAt)));
  const approvedQuizSubmissions = cleanQuizSubmissions.filter((q) => q && (q.status === 'Approved' || (q.passed && (q.mentorComment || q.reviewedAt))));
  const passedQuizSubmissions = cleanQuizSubmissions.filter((q) => q && q.passed);
  const failedQuizSubmissions = cleanQuizSubmissions.filter((q) => q && (!q.passed || q.correctCount < q.totalQuestions));
  const blockQuizCount = cleanQuizSubmissions.filter((q) => q && (q.quizId.startsWith('TEST_') || q.quizId === 'FINAL_EXAM')).length;
  const lessonQuizCount = cleanQuizSubmissions.filter((q) => q && q.quizId.startsWith('LESSON_')).length;

  const filteredQuizSubmissions = cleanQuizSubmissions.filter((q) => {
    if (!q) return false;
    if (quizCategoryTab === 'block_tests') {
      const isBlock = q.quizId.startsWith('TEST_') || q.quizId === 'FINAL_EXAM';
      if (!isBlock) return false;
    } else if (quizCategoryTab === 'lesson_quizzes') {
      const isLesson = q.quizId.startsWith('LESSON_');
      if (!isLesson) return false;
    }

    if (quizFilterTab === 'pending') {
      const isPending = q.status === 'Pending' || q.status === 'Submitted' || (!q.mentorComment && !q.reviewedAt);
      if (!isPending) return false;
    } else if (quizFilterTab === 'passed' || quizFilterTab === 'reviewed') {
      if (!q.passed) return false;
    } else if (quizFilterTab === 'failed') {
      if (q.passed && q.correctCount === q.totalQuestions) return false;
    }
    if (!quizSearchQuery) return true;
    const query = quizSearchQuery.toLowerCase().trim();
    return (
      (q.studentName || '').toLowerCase().includes(query) ||
      (q.quizTitle || '').toLowerCase().includes(query) ||
      (q.studentEmail || '').toLowerCase().includes(query) ||
      (q.studentId || '').toLowerCase().includes(query) ||
      (q.quizId || '').toLowerCase().includes(query) ||
      (q.id || '').toLowerCase().includes(query)
    );
  });

  const handleApproveQuiz = async (qSub: any) => {
    const note = quizMentorNotes[qSub.id] !== undefined ? quizMentorNotes[qSub.id] : (qSub.mentorComment || 'Тестирование проверено и зачтено ментором. Отличный результат!');
    await reviewQuizSubmission(qSub.id, 'Approved', note, qSub.scorePct || 90, qSub.studentEmail, qSub.studentId);
    showToast(`Тест студента ${qSub.studentName} (${qSub.studentId || qSub.studentEmail}) успешно подтвержден и зачтен ментором!`);
  };

  const handleRejectQuiz = async (qSub: any) => {
    const note = quizMentorNotes[qSub.id] !== undefined ? quizMentorNotes[qSub.id] : (qSub.mentorComment || 'Тестирование не зачтено. Пожалуйста, повторите материал и пройдите тест повторно.');
    await reviewQuizSubmission(qSub.id, 'Rejected', note, 0, qSub.studentEmail, qSub.studentId);
    showToast(`Тест студента ${qSub.studentName} отправлен на пересдачу.`);
  };

  const handleApproveHomework = async (lessonId: number, studentId?: string, studentEmail?: string) => {
    if (gradeScore < 50) {
      await reviewHomework(lessonId, 'Rejected', 0, mentorComment || 'Оценка ниже 50 баллов (минимум для сдачи — 50 EXP). Задание отправлено на доработку.', studentId, studentEmail);
      showToast(`Оценка ниже 50 EXP. ДЗ по Уроку #${lessonId} отклонено и отправлено на доработку!`);
      setSelectedReviewLessonId(null);
      setSelectedReviewHwKey(null);
      setMentorComment('');
      return;
    }
    const confirmedExp = gradeScore >= 88 ? 100 : gradeScore >= 63 ? 75 : 50;
    await reviewHomework(lessonId, 'Approved', confirmedExp, mentorComment || `Работа проверена! Подтверждено начисление: ${confirmedExp} EXP.`, studentId, studentEmail);
    if (lessonId < 24) {
      unlockLesson(lessonId + 1, studentEmail);
      showToast(`ДЗ по Уроку #${lessonId} Подтверждено (+${confirmedExp} EXP)! Урок #${lessonId + 1} успешно РАЗБЛОКИРОВАН для студента.`);
    } else {
      showToast(`ДЗ по Уроку #${lessonId} Подтверждено (+${confirmedExp} EXP)! Все 24 урока пройдены.`);
    }
    setSelectedReviewLessonId(null);
    setSelectedReviewHwKey(null);
    setMentorComment('');
  };

  const handleRejectHomework = async (lessonId: number, studentId?: string, studentEmail?: string) => {
    await reviewHomework(lessonId, 'Rejected', 0, mentorComment || 'Оценка ниже 50 баллов (минимум 50 EXP). Задание требует доработки.', studentId, studentEmail);
    showToast(`ДЗ по Уроку #${lessonId} отклонено и отправлено на доработку.`);
    setSelectedReviewLessonId(null);
    setSelectedReviewHwKey(null);
    setMentorComment('');
  };

  const handleApproveLab = async (labId: number, studentId?: string, studentEmail?: string) => {
    if (labScore < 50) {
      await reviewLab(labId, 'Rejected', 0, labFeedback || 'Оценка ниже 50 баллов (минимум для сдачи — 50 EXP). Лабораторная работа отправлена на доработку.', studentId, studentEmail);
      showToast(`Оценка ниже 50 EXP. Лабораторная работа #${labId} отклонена и отправлена на доработку!`);
      setSelectedLabReviewKey(null);
      return;
    }
    const confirmedExp = labScore >= 88 ? 100 : labScore >= 63 ? 75 : 50;
    await reviewLab(labId, 'Approved', confirmedExp, labFeedback || `Лабораторная работа проверена! Подтверждено начисление: ${confirmedExp} EXP.`, studentId, studentEmail);
    showToast(`Лабораторная работа #${labId} Подтверждена Ментором! Начислено: +${confirmedExp} EXP.`);
    setSelectedLabReviewKey(null);
  };

  const handleRejectLab = async (labId: number, studentId?: string, studentEmail?: string) => {
    await reviewLab(labId, 'Rejected', 0, labFeedback || 'Оценка ниже 50 баллов (минимум 50 EXP). Лабораторная работа отправлена на доработку.', studentId, studentEmail);
    showToast(`Лабораторная работа #${labId} отправлена студенту на доработку.`);
    setSelectedLabReviewKey(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.type === 'homework') {
        await deleteHomeworkSubmission(deleteTarget.id, deleteTarget.lessonId, deleteTarget.studentEmail, deleteTarget.studentId);
        showToast(`Запись ДЗ по Уроку #${deleteTarget.lessonId} (${deleteTarget.studentName || 'Студент'}) успешно удалена.`);
      } else if (deleteTarget.type === 'lab') {
        await deleteLabSubmission(deleteTarget.labId!, deleteTarget.studentEmail, deleteTarget.studentId);
        showToast(`Запись Лабораторной работы #${deleteTarget.labId} (${deleteTarget.studentName || 'Студент'}) успешно удалена.`);
      } else if (deleteTarget.type === 'quiz') {
        await deleteQuizSubmission(deleteTarget.submissionId || deleteTarget.id, deleteTarget.studentEmail, deleteTarget.quizId);
        showToast(`Результат теста "${deleteTarget.title}" (${deleteTarget.studentName || 'Студент'}) успешно удален.`);
      }
    } catch (err: any) {
      showToast(`Ошибка удаления: ${err?.message || 'Не удалось выполнить операцию'}`);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const getFileIcon = (type: AttachedReportFile['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-400" />;
      case 'docx':
        return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'ppt':
        return <FileSpreadsheet className="w-4 h-4 text-amber-400" />;
      case 'txt':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-cyan-400" />;
      default:
        return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Панель Администратора и Ментора AI for LIFE Academy
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            Проверка Работ Студентов & Академический Контроль
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Рецензирование домашних заданий, проверка лабораторных работ и детальный анализ ошибок в тестах для помощи студентам
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={async () => {
              setIsSyncing(true);
              try {
                const res = await syncAllToGoogleSheets();
                if (res.success) {
                  showToast('Все данные студентов и работы успешно синхронизированы с Google Таблицей!');
                } else {
                  showToast(`Синхронизация: ${res.message || 'выполнена'}`);
                }
              } catch (err: any) {
                showToast(`Ошибка синхронизации: ${err?.message || 'Не удалось связаться с Google Sheets'}`);
              } finally {
                setIsSyncing(false);
              }
            }}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
            title="Отправить всю историю работ студентов в Google Sheets"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSyncing ? 'Синхронизация...' : 'Синхронизировать с Google Sheets'}</span>
          </button>

          <button
            onClick={async () => {
              setIsRestoring(true);
              try {
                const res = await restoreAllFromGoogleSheets();
                if (res.success) {
                  showToast('Все работы студентов успешно обновлены и загружены из Google Таблицы!');
                } else {
                  showToast(`Загрузка: ${res.message || 'выполнена'}`);
                }
              } catch (err: any) {
                showToast(`Ошибка загрузки: ${err?.message || 'Проверьте подключение к Google Sheets'}`);
              } finally {
                setIsRestoring(false);
              }
            }}
            disabled={isRestoring}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
            title="Загрузить актуальную историю всех студентов из Google Sheets"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRestoring ? 'Загрузка...' : 'Обновить из Google Sheets'}</span>
          </button>

          <button
            onClick={() => setIsResetAllModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white font-bold text-xs border border-rose-500/20 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            title="Очистить все лабораторные работы, ДЗ и результаты тестов"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Сбросить все данные (Labs, HW, Tests)</span>
          </button>
        </div>
      </div>

      {/* Safety and Data Integrity Information Alert */}
      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
          <span>
            <strong>Защита академической истории:</strong> Все выполненные домашние задания, лабораторные работы и тесты студентов (включая исторические данные) бережно сохранены и синхронизируются с Google Таблицей. История не перезаписывается и не удаляется при сбросе сессии.
          </span>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('homework')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'homework'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-slate-100 dark:bg-[#14141B] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Проверка ДЗ</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 dark:text-blue-300 text-[10px] font-extrabold">
            {allHomeworkList.length}
          </span>
          {pendingHomeworkList.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
              {pendingHomeworkList.length} на проверке
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('labs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'labs'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'bg-slate-100 dark:bg-[#14141B] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Проверка Лабораторных Работ (Панель Ментора)</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 dark:text-purple-300 text-[10px] font-extrabold">
            {allLabsList.length}
          </span>
          {pendingLabsList.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold animate-pulse">
              {pendingLabsList.length} на проверке
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'quizzes'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'bg-slate-100 dark:bg-[#14141B] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Результаты Тестов</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 dark:text-emerald-300 text-[10px] font-extrabold">
            {cleanQuizSubmissions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('eval-rules')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'eval-rules'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 hover:bg-purple-500/20'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Методика Оценивания & EXP</span>
        </button>
      </div>

      {/* Tab 2: Homework Review Queue & History */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          {/* Sub-filter tabs and search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-[#14141B] border border-slate-200 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setHwFilterTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  hwFilterTab === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                Все работы ({allHomeworkList.length})
              </button>
              <button
                onClick={() => setHwFilterTab('pending')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  hwFilterTab === 'pending'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>На проверке ({pendingHomeworkList.length})</span>
              </button>
              <button
                onClick={() => setHwFilterTab('reviewed')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  hwFilterTab === 'reviewed'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>История проверенных ({reviewedHomeworkList.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative min-w-[200px] flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Поиск ДЗ по студенту, ID или уроку..."
                  value={hwSearchQuery}
                  onChange={(e) => setHwSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#0D0D12] border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {hwSearchQuery && (
                  <button
                    onClick={() => setHwSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
              {allHomeworkList.length > 0 && (
                <button
                  onClick={async () => {
                    await clearAllHomeworkSubmissions();
                    showToast('Все домашние задания успешно удалены.');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Очистить все домашние задания"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Очистить все ДЗ</span>
                </button>
              )}
            </div>
          </div>

          {filteredHomeworkList.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 rounded-3xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto opacity-80" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Работы не найдены</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {hwFilterTab === 'pending'
                  ? 'Все отправленные домашние задания проверены!'
                  : hwFilterTab === 'reviewed'
                  ? 'История проверенных заданий пока пуста.'
                  : 'Студенты еще не отправляли домашние задания.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHomeworkList.map((hw, idx) => {
                const lesson = lessons.find((l) => l.id === hw.lessonId);
                const hwKey = hw.id || `${hw.lessonId}_${hw.studentEmail || hw.studentId || idx}`;
                const isSelected = selectedReviewHwKey === hwKey || (selectedReviewLessonId === hw.lessonId && !selectedReviewHwKey);
                const isReviewed = hw.status === 'Approved' || hw.status === 'Rejected';

                return (
                  <div
                    key={`hw-${hw.lessonId}-${hw.studentEmail || 'std'}-${idx}`}
                    className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 shadow-lg space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {hw.status === 'Approved' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase border border-emerald-500/20">
                              Зачтено ✓ (Оценка: {COURSE_RULES.calculateMentorExp(hw.score, 'Approved', hw.mentorFeedback)}/100 EXP)
                            </span>
                          ) : hw.status === 'Rejected' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase border border-rose-500/20">
                              На доработке (Оценка: {hw.score ?? 0}/100)
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase animate-pulse border border-amber-500/20">
                              Ожидает Рецензии Ментора
                            </span>
                          )}
                          <span className="text-xs text-slate-500">Сдано: {hw.submittedAt || 'Сегодня'}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          Урок #{hw.lessonId}: {hw.lessonTitle || lesson?.titleRu || `Урок #${hw.lessonId}`}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Студент: <span className="text-slate-800 dark:text-slate-200 font-bold">{hw.studentName || 'John Smith'} ({hw.studentId || 'STU-2026-1001'})</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: 'homework',
                              id: hw.id || `HW-${hw.lessonId}`,
                              lessonId: hw.lessonId,
                              studentEmail: hw.studentEmail,
                              studentId: hw.studentId,
                              studentName: hw.studentName,
                              title: `Урок #${hw.lessonId}: ${hw.lessonTitle || lesson?.titleRu || `Урок #${hw.lessonId}`}`,
                              description: `Студент: ${hw.studentName || 'Студент'} (${hw.studentId || hw.studentEmail || 'Без ID'})`
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          title="Удалить запись домашней работы"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Удалить</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReviewHwKey(isSelected ? null : hwKey);
                            setSelectedReviewLessonId(isSelected ? null : hw.lessonId);
                            if (hw.score !== undefined && hw.score > 0) setGradeScore(COURSE_RULES.calculateMentorExp(hw.score, 'Approved', hw.mentorFeedback));
                            else setGradeScore(100);
                            if (hw.mentorFeedback) setMentorComment(hw.mentorFeedback);
                            else setMentorComment('Работа проверена! Итоговая оценка: 100/100.');
                          }}
                          className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md ${
                            isReviewed
                              ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                          }`}
                        >
                          {isSelected
                            ? 'Скрыть Форму'
                            : isReviewed
                            ? 'Изменить Оценку / Рецензировать'
                            : 'Проверить Работу'}
                        </button>
                      </div>
                    </div>

                    {/* Mentor Feedback banner if reviewed */}
                    {isReviewed && hw.mentorFeedback && (
                      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-800 dark:text-purple-200 space-y-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                          <span>Отзыв и замечания Ментора:</span>
                        </span>
                        <p className="italic pl-5">{hw.mentorFeedback}</p>
                      </div>
                    )}

                    {/* Student Notes & Submitted Files */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/5 space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">Ответ студента:</span>
                        <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {hw.studentNotes || 'Студент не прикрепил текстовые заметки.'}
                        </p>
                      </div>

                      {/* Submitted URL or Repo */}
                      {(hw.fileUrl || hw.githubUrl || (hw as any).repoUrl || (hw as any).demoUrl) && (
                        <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                            <span className="text-slate-400 font-semibold shrink-0">Репозиторий / Google Doc:</span>
                            <span className="font-mono text-blue-300 truncate">
                              {hw.fileUrl || hw.githubUrl || (hw as any).repoUrl || (hw as any).demoUrl}
                            </span>
                          </div>
                          <a
                            href={hw.fileUrl || hw.githubUrl || (hw as any).repoUrl || (hw as any).demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 shrink-0 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Перейти</span>
                          </a>
                        </div>
                      )}

                      {/* Submitted Report Documents for Mentor Download */}
                      {hw.attachedFiles && Array.isArray(hw.attachedFiles) && hw.attachedFiles.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 dark:border-white/5 space-y-2">
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block">
                            Прикрепленные файлы ДЗ (Google Диск / Облако) ({hw.attachedFiles.length} шт.):
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(hw.attachedFiles || []).map((file, fileIdx) => {
                              const isDrive = file.url && (file.url.includes('drive.google.com') || file.url.includes('google.com'));
                              return (
                                <div
                                  key={`hwf-${file.id || 'f'}-${fileIdx}`}
                                  className="p-2.5 rounded-xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-2 shadow-sm"
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <div className={`p-1.5 rounded-lg shrink-0 ${isDrive ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                      <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                      <p className="text-[10px] text-slate-500 uppercase">
                                        {isDrive ? 'Google Drive' : file.type} • {file.size || 'Облако'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {isDrive ? (
                                      <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                                        title="Открыть документ на Google Диске"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Диск</span>
                                      </a>
                                    ) : null}
                                    <button
                                      onClick={() => downloadAttachedFile(file)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                                      title="Скачать файл отчета ДЗ в папку загрузок"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span>Скачать</span>
                                    </button>
                                    <button
                                      onClick={() => setActivePreviewFile(file)}
                                      className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold"
                                    >
                                      Открыть
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Review Form */}
                    {isSelected && (
                      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#0A0A0C] border border-blue-500/30 space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-500" /> Форма Проверки и Оценки Ментора
                          </h4>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            gradeScore >= 50
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {gradeScore >= 50 ? `✓ Зачет (${gradeScore} EXP)` : `✕ Меньше 50 (${gradeScore} EXP) — Доработка`}
                          </span>
                        </div>

                        {/* Quick score buttons: 100, 75, 50, <50 */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Быстрый выбор шкалы оценки:
                            </label>
                            <span className="text-[11px] text-slate-400">Мин. проходной: 50 EXP</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setGradeScore(100);
                                setMentorComment('Работа проверена! Итоговая оценка: 100/100. Отличный результат!');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                gradeScore === 100
                                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                              }`}
                            >
                              <span>100 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">100% Отлично</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setGradeScore(75);
                                setMentorComment('Работа проверена! Итоговая оценка: 75/100. Хорошая работа.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                gradeScore === 75
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                                  : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20'
                              }`}
                            >
                              <span>75 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">75% Хорошо</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setGradeScore(50);
                                setMentorComment('Работа проверена! Итоговая оценка: 50/100. Зачтено с замечаниями.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                gradeScore === 50
                                  ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30'
                                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20'
                              }`}
                            >
                              <span>50 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">50% Зачтено</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setGradeScore(40);
                                setMentorComment('Оценка ниже 50 баллов. Задание отклонено ментором и отправлено на доработку.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                gradeScore < 50
                                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                                  : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20'
                              }`}
                            >
                              <span>&lt; 50 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">Доработка</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Выбранная оценка Ментора (50 EXP / 75 EXP / 100 EXP)
                            </label>
                            <select
                              value={gradeScore < 50 ? 40 : gradeScore >= 88 ? 100 : gradeScore >= 63 ? 75 : 50}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setGradeScore(val);
                                if (!mentorComment || mentorComment.startsWith('Работа проверена!') || mentorComment.startsWith('Оценка ниже')) {
                                  if (val === 100) setMentorComment('Работа проверена! Итоговая оценка: 100/100. Отличный результат!');
                                  else if (val === 75) setMentorComment('Работа проверена! Итоговая оценка: 75/100. Хорошая работа.');
                                  else if (val === 50) setMentorComment('Работа проверена! Итоговая оценка: 50/100. Зачтено с замечаниями.');
                                  else setMentorComment('Оценка ниже 50 баллов. Задание отклонено ментором и отправлено на доработку.');
                                }
                              }}
                              className="w-full bg-white dark:bg-[#14141B] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-blue-500"
                            >
                              <option value={100}>100 EXP — Отлично (100%)</option>
                              <option value={75}>75 EXP — Хорошо (75%)</option>
                              <option value={50}>50 EXP — Удовлетворительно / Зачтено (50%)</option>
                              <option value={40}>&lt; 50 EXP — На доработку (Rejected)</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Комментарий Ментора / Рецензия
                            </label>
                            <input
                              type="text"
                              placeholder="Работа проверена! Итоговая оценка: 100/100."
                              value={mentorComment}
                              onChange={(e) => setMentorComment(e.target.value)}
                              className="w-full bg-white dark:bg-[#14141B] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            onClick={() => handleRejectHomework(hw.lessonId, hw.studentId, hw.studentEmail)}
                            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>Отклонить (На доработку)</span>
                          </button>
                          <button
                            onClick={() => handleApproveHomework(hw.lessonId, hw.studentId, hw.studentEmail)}
                            className={`px-5 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                              gradeScore >= 50
                                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
                                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                            }`}
                          >
                            {gradeScore >= 50 ? (
                              <>
                                <ThumbsUp className="w-4 h-4" />
                                <span>Подтвердить ДЗ (+{gradeScore >= 88 ? 100 : gradeScore >= 63 ? 75 : 50} EXP) & Разблокировать #{hw.lessonId + 1}</span>
                              </>
                            ) : (
                              <>
                                <ThumbsDown className="w-4 h-4" />
                                <span>Отклонить (Балл &lt; 50 — на доработку)</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: MENTOR REVIEW PANEL FOR LABS ("Панель проверки и выставления оценки Ментора") */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Панель проверки и выставления оценки Ментора:</strong> Просматривайте лабораторные работы, скриншоты, файлы отчетов из <code className="text-purple-400 font-mono">/src/assets/</code> и выставляйте баллы.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-purple-400 font-mono shrink-0">
              Персональный Ментор: {profile.mentorName}
            </span>
          </div>

          {/* Sub-filter tabs for Labs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-[#14141B] border border-slate-200 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLabFilterTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  labFilterTab === 'all'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                Все лабы ({allLabsList.length})
              </button>
              <button
                onClick={() => setLabFilterTab('pending')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  labFilterTab === 'pending'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>На проверке ({pendingLabsList.length})</span>
              </button>
              <button
                onClick={() => setLabFilterTab('reviewed')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  labFilterTab === 'reviewed'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>История проверенных ({reviewedLabsList.length})</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск по студенту / ID / номеру..."
                  value={labSearchQuery}
                  onChange={(e) => setLabSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 w-56"
                />
              </div>

              {allLabsList.length > 0 && (
                <button
                  onClick={async () => {
                    await clearAllLabSubmissions();
                    showToast('Все лабораторные работы успешно удалены.');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Очистить все лабораторные работы"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Очистить все лабы</span>
                </button>
              )}
            </div>
          </div>

          {filteredLabsList.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 rounded-3xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto opacity-80" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Лабораторные работы не найдены</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {labFilterTab === 'pending'
                  ? 'Все отправленные лабораторные работы проверены ментором!'
                  : labFilterTab === 'reviewed'
                  ? 'История проверенных лаб пока пуста.'
                  : 'Студенты еще не отправляли решения лабораторных работ.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredLabsList.map((lab, idx) => {
                const labStudentKey = (lab.studentEmail || lab.studentId || 'std').toLowerCase().trim();
                const itemKey = `${lab.id}_${labStudentKey}`;
                const isSelected = selectedLabReviewKey === itemKey || selectedLabReviewKey === String(lab.id);
                const baseLab = INITIAL_LABS.find((b) => b.id === lab.id);
                const labTasksList = (Array.isArray(lab.tasks) && lab.tasks.length > 0)
                  ? lab.tasks
                  : (baseLab?.tasks || []);
                const totalTasksCount = labTasksList.length > 0 ? labTasksList.length : 3;
                const isReviewed = lab.submissionStatus === 'Approved' || lab.submissionStatus === 'Rejected';
                const isFullyDone = lab.submissionStatus === 'Approved' || lab.isCompleted || Boolean(lab.submittedAt);
                const rawCompleted = labTasksList.filter((t) => t && t.completed).length;
                const completedTasksCount = (isFullyDone && rawCompleted === 0) ? totalTasksCount : (isFullyDone ? Math.max(rawCompleted, totalTasksCount) : rawCompleted);

                return (
                  <div
                    key={`lab-${lab.id}-${labStudentKey}-${idx}`}
                    className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 shadow-xl space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {lab.submissionStatus === 'Approved' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase border border-emerald-500/20">
                              Зачтено ✓ (Оценка: {COURSE_RULES.calculateMentorExp(lab.score, 'Approved', lab.mentorFeedback)}/100 EXP)
                            </span>
                          ) : lab.submissionStatus === 'Rejected' ? (
                            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase border border-rose-500/20">
                              На доработке (Оценка: {lab.score ?? 0}/100 EXP)
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase animate-pulse border border-amber-500/20">
                              Ожидает Проверки Ментора
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-mono">
                            Отправлено: {lab.submittedAt || 'Сегодня'}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          Лабораторная Работа #{lab.id}: {lab.titleRu || lab.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Студент: <span className="text-slate-900 dark:text-slate-200 font-bold">{lab.studentName || 'Студент'} ({lab.studentId || lab.studentEmail || 'Без ID'})</span> • Выполнено задач: <strong className="text-emerald-500">{completedTasksCount}/{totalTasksCount}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: 'lab',
                              id: String(lab.id),
                              labId: lab.id,
                              studentEmail: lab.studentEmail,
                              studentId: lab.studentId,
                              studentName: lab.studentName,
                              title: `Лабораторная Работа #${lab.id}: ${lab.titleRu || lab.title}`,
                              description: `Студент: ${lab.studentName || 'Студент'} (${lab.studentId || lab.studentEmail || 'Без ID'})`
                            })
                          }
                          className="px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          title="Удалить запись лабораторной работы"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Удалить</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLabReviewKey(isSelected ? null : itemKey);
                            if (lab.score !== undefined && lab.score > 0) setLabScore(COURSE_RULES.calculateMentorExp(lab.score, 'Approved', lab.mentorFeedback));
                            else setLabScore(100);
                            if (lab.mentorFeedback) setLabFeedback(lab.mentorFeedback);
                            else setLabFeedback('Отличная работа! Все задачи из детализированного списка выполнены корректно.');
                          }}
                          className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-lg ${
                            isReviewed
                              ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                              : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                          }`}
                        >
                          {isSelected
                            ? 'Скрыть Форму Оценки'
                            : isReviewed
                            ? 'Изменить Оценку / Рецензировать'
                            : 'Панель Выставления Оценки Ментора'}
                        </button>
                      </div>
                    </div>

                    {/* Compact Lab Tasks Checklist Preview */}
                    {labTasksList.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Чеклист задач лабораторной ({completedTasksCount}/{totalTasksCount}):</span>
                          </span>
                          <span className="text-[11px] font-mono text-emerald-500">
                            {Math.round((completedTasksCount / totalTasksCount) * 100)}% Выполнено
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {labTasksList.map((t, tIdx) => {
                            const isTDone = isFullyDone || t.completed;
                            return (
                              <div
                                key={t.id || `task-${tIdx}`}
                                className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                                  isTDone
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-medium'
                                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isTDone ? 'text-emerald-500' : 'text-slate-400'}`} />
                                <span className="line-clamp-2 text-[11px]">{t.descriptionRu || t.text || `Задача #${tIdx + 1}`}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Mentor Feedback Banner if already reviewed */}
                    {isReviewed && lab.mentorFeedback && (
                      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-800 dark:text-purple-200 space-y-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                          <span>Отзыв Ментора:</span>
                        </span>
                        <p className="italic pl-5">{lab.mentorFeedback}</p>
                      </div>
                    )}

                    {/* Submitted Screenshots Gallery */}
                    {lab.screenshots && Array.isArray(lab.screenshots) && lab.screenshots.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-cyan-400" /> Скриншоты выполнения студента ({lab.screenshots.length} шт.):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {(lab.screenshots || []).filter((u): u is string => Boolean(u && u.trim())).map((url, imgIdx) => (
                            <div
                              key={`scr-${lab.id}-${imgIdx}`}
                              onClick={() => setActivePreviewImage(url)}
                              className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black h-24 cursor-pointer"
                            >
                              <img
                                src={url}
                                alt={`Lab Screenshot #${imgIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submitted Local Documents (PDF, DOCX, TXT, PPT) */}
                    {lab.attachedFiles && Array.isArray(lab.attachedFiles) && lab.attachedFiles.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-purple-400" /> Прикрепленные файлы отчета ({lab.attachedFiles.length} шт.):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(lab.attachedFiles || []).map((file, fileIdx) => (
                            <div
                              key={`labf-${file.id || 'f'}-${fileIdx}`}
                              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                {getFileIcon(file.type)}
                                <div className="overflow-hidden">
                                  <p className="font-mono font-bold text-slate-900 dark:text-white text-[11px] truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-[10px] text-slate-500 uppercase">{file.type} • {file.size || '1.0 MB'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {file.url && (file.url.includes('drive.google.com') || file.url.includes('google.com')) ? (
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                                    title="Открыть документ на Google Диске / в облаке"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Диск</span>
                                  </a>
                                ) : null}
                                <button
                                  onClick={() => downloadAttachedFile(file)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                                  title="Скачать файл отчета в папку загрузок"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Скачать</span>
                                </button>
                                <button
                                  onClick={() => setActivePreviewFile(file)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold"
                                >
                                  Открыть
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* GitHub Repo / Google Doc link */}
                    {(() => {
                      const labLink = (
                        lab.fileUrl ||
                        (lab as any).repoUrl ||
                        (lab as any).demoUrl ||
                        (lab as any).githubUrl ||
                        (lab as any).repo_url ||
                        (lab as any).file_url ||
                        ''
                      ).trim();
                      if (!labLink) return null;
                      const safeHref = labLink.startsWith('http://') || labLink.startsWith('https://') ? labLink : `https://${labLink}`;
                      return (
                        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between gap-3 text-xs shadow-sm">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="text-slate-300 font-bold shrink-0">Ссылка на GitHub репозиторий или Google Doc:</span>
                            <a
                              href={safeHref}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-cyan-300 hover:text-cyan-200 underline truncate"
                            >
                              {labLink}
                            </a>
                          </div>
                          <a
                            href={safeHref}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Перейти</span>
                          </a>
                        </div>
                      );
                    })()}

                    {/* Student notes / comment */}
                    {(lab.studentNotes || (lab as any).notes) && (
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#14141B] border border-slate-200 dark:border-white/10 text-xs space-y-1">
                        <span className="text-slate-500 dark:text-slate-400 font-semibold block">Комментарий / заметка студента к работе:</span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-normal">{lab.studentNotes || (lab as any).notes}</p>
                      </div>
                    )}

                    {/* MENTOR EVALUATION FORM */}
                    {isSelected && (
                      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#0A0A0C] border border-purple-500/30 space-y-4 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-purple-500" /> Выставление решения и балла Ментора
                          </h4>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            labScore >= 50
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {labScore >= 50 ? `✓ Зачет (${labScore} EXP)` : `✕ Меньше 50 (${labScore} EXP) — Доработка`}
                          </span>
                        </div>

                        {/* Quick score buttons: 100, 75, 50, <50 */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Быстрый выбор шкалы оценки:
                            </label>
                            <span className="text-[11px] text-slate-400">Мин. проходной: 50 EXP</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setLabScore(100);
                                setLabFeedback('Работа проверена! Итоговая оценка: 100/100. Все практические шаги выполнены безупречно.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                labScore === 100
                                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                                  : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/20'
                              }`}
                            >
                              <span>100 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">100% Отлично</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setLabScore(75);
                                setLabFeedback('Работа проверена! Итоговая оценка: 75/100. Лабораторная работа выполнена хорошо.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                labScore === 75
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                                  : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20'
                              }`}
                            >
                              <span>75 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">75% Хорошо</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setLabScore(50);
                                setLabFeedback('Работа проверена! Итоговая оценка: 50/100. Лабораторная работа зачтена.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                labScore === 50
                                  ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/30'
                                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20'
                              }`}
                            >
                              <span>50 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">50% Зачтено</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setLabScore(40);
                                setLabFeedback('Оценка ниже 50 баллов. Лабораторная работа отклонена ментором и отправлена на доработку.');
                              }}
                              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-0.5 ${
                                labScore < 50
                                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                                  : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20'
                              }`}
                            >
                              <span>&lt; 50 EXP</span>
                              <span className="text-[10px] font-normal opacity-90">Доработка</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Выбранная оценка Ментора (50 / 75 / 100 EXP)
                            </label>
                            <select
                              value={labScore < 50 ? 40 : labScore >= 88 ? 100 : labScore >= 63 ? 75 : 50}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setLabScore(val);
                                if (!labFeedback || labFeedback.startsWith('Работа проверена!') || labFeedback.startsWith('Отличная работа!') || labFeedback.startsWith('Оценка ниже')) {
                                  if (val === 100) setLabFeedback('Работа проверена! Итоговая оценка: 100/100. Все практические шаги выполнены безупречно.');
                                  else if (val === 75) setLabFeedback('Работа проверена! Итоговая оценка: 75/100. Лабораторная работа выполнена хорошо.');
                                  else if (val === 50) setLabFeedback('Работа проверена! Итоговая оценка: 50/100. Лабораторная работа зачтена.');
                                  else setLabFeedback('Оценка ниже 50 баллов. Лабораторная работа отклонена ментором и отправлена на доработку.');
                                }
                              }}
                              className="w-full bg-white dark:bg-[#14141B] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                            >
                              <option value={100}>100 EXP — Отлично (100%)</option>
                              <option value={75}>75 EXP — Хорошо (75%)</option>
                              <option value={50}>50 EXP — Зачтено (50%)</option>
                              <option value={40}>&lt; 50 EXP — На доработку (Rejected)</option>
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Отзыв и замечания Ментора
                            </label>
                            <input
                              type="text"
                              value={labFeedback}
                              onChange={(e) => setLabFeedback(e.target.value)}
                              placeholder="Работа проверена! Итоговая оценка: 100/100."
                              className="w-full bg-white dark:bg-[#14141B] border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            onClick={() => handleRejectLab(lab.id, lab.studentId, lab.studentEmail)}
                            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>Отправить на Доработку</span>
                          </button>
                          <button
                            onClick={() => handleApproveLab(lab.id, lab.studentId, lab.studentEmail)}
                            className={`px-5 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 ${
                              labScore >= 50
                                ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                            }`}
                          >
                            {labScore >= 50 ? (
                              <>
                                <ThumbsUp className="w-4 h-4" />
                                <span>Подтвердить Лабораторную (+{labScore >= 88 ? 100 : labScore >= 63 ? 75 : 50} EXP)</span>
                              </>
                            ) : (
                              <>
                                <ThumbsDown className="w-4 h-4" />
                                <span>Отклонить (Балл &lt; 50 — на доработку)</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Student Quiz Results & Mentor Error Analysis */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 space-y-3 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40 text-[11px] font-bold">
                  Академическая Аналитика Ментора
                </span>
                <h2 className="text-xl font-black mt-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  <span>Результаты Тестов Студентов & Анализ Ошибок</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
                  Детальный журнал всех пройденных тестов. Проверяйте, где именно студенты допустили ошибки, какие ответы они выбрали и отправляйте индивидуальные рекомендации ментора.
                </p>
              </div>

              {/* KPI metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 shrink-0">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Всего Тестов</span>
                  <span className="text-lg font-black text-white">{cleanQuizSubmissions.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-center">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">Сдано</span>
                  <span className="text-lg font-black text-emerald-300">
                    {passedQuizSubmissions.length}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-rose-400 font-bold uppercase block">С Ошибками</span>
                  <span className="text-lg font-black text-rose-300">
                    {failedQuizSubmissions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter / Search input & sub-tabs */}
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setQuizCategoryTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  quizCategoryTab === 'all'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Все Категории ({cleanQuizSubmissions.length})
              </button>
              <button
                onClick={() => setQuizCategoryTab('block_tests')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  quizCategoryTab === 'block_tests'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 border border-slate-800 text-purple-400 hover:text-white'
                }`}
              >
                <span>📝 Рубежные Тесты Блоков (20 вопр.)</span>
                <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-[10px] font-extrabold">
                  {blockQuizCount}
                </span>
              </button>
              <button
                onClick={() => setQuizCategoryTab('lesson_quizzes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  quizCategoryTab === 'lesson_quizzes'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white'
                }`}
              >
                <span>⚡ Мини-тесты к Урокам (1–24)</span>
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-[10px] font-extrabold">
                  {lessonQuizCount}
                </span>
              </button>
            </div>

            <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={quizSearchQuery}
                  onChange={(e) => setQuizSearchQuery(e.target.value)}
                  placeholder="Поиск по ID (USR-STU-02, USR-5666-798), имени студента, теме теста или email..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 shrink-0 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setQuizFilterTab('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    quizFilterTab === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Все ({cleanQuizSubmissions.length})
                </button>
                <button
                  onClick={() => setQuizFilterTab('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    quizFilterTab === 'pending'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Ожидают проверки ({pendingQuizSubmissions.length})</span>
                </button>
                <button
                  onClick={() => setQuizFilterTab('passed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    quizFilterTab === 'passed'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Успешно ({passedQuizSubmissions.length})</span>
                </button>
                <button
                  onClick={() => setQuizFilterTab('failed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    quizFilterTab === 'failed'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <AlertCircle className="w-3 h-3 text-rose-400" />
                  <span>С ошибками ({failedQuizSubmissions.length})</span>
                </button>
                {cleanQuizSubmissions.length > 0 && (
                  <button
                    onClick={async () => {
                      await clearAllQuizSubmissions();
                      showToast('Все результаты тестов успешно удалены.');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all ml-1 cursor-pointer"
                    title="Очистить все результаты тестов"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Очистить</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* List of quiz submissions */}
          {filteredQuizSubmissions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Тесты не найдены</h3>
              <p className="text-xs text-slate-500">
                {quizFilterTab === 'pending'
                  ? 'Нет тестов, ожидающих проверки.'
                  : quizFilterTab === 'passed'
                  ? 'Нет тестов, сданных успешно.'
                  : quizFilterTab === 'failed'
                  ? 'Нет тестов с ошибками.'
                  : 'По вашему запросу не найдено ни одного пройденного теста.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuizSubmissions.map((qSub, idx) => {
                  const isExpanded = selectedQuizSubmissionId === qSub.id;
                  const isApproved = qSub.status === 'Approved' && Boolean(qSub.reviewedAt || qSub.mentorComment);
                  const isRejected = qSub.status === 'Rejected';
                  const isBlockTest = qSub.quizId.startsWith('TEST_') || qSub.quizId === 'FINAL_EXAM';

                  // Always resolve rich, complete question-by-question details
                  const details = (Array.isArray(qSub.details) && qSub.details.length > 0)
                    ? qSub.details
                    : resolveQuizAnswerDetails(qSub);
                  const totalQuestionsCount = details.length || qSub.totalQuestions || 5;
                  const realCorrectCount = details.filter((d) => d.isCorrect).length;
                  const mistakeCount = Math.max(0, totalQuestionsCount - realCorrectCount);
                  const activeFilter = quizItemFilter[qSub.id] || 'all';

                  const visibleDetails = details.filter((det) => {
                    if (activeFilter === 'mistakes') return !det.isCorrect;
                    if (activeFilter === 'correct') return det.isCorrect;
                    return true;
                  });

                  return (
                    <div
                      key={`qsub-${qSub.id}-${idx}`}
                      className={`p-5 rounded-3xl border transition-all space-y-4 ${
                        isApproved
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : isRejected
                          ? 'bg-rose-500/5 border-rose-500/30'
                          : qSub.passed
                          ? 'bg-white dark:bg-[#14141B] border-slate-200 dark:border-white/10'
                          : 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/40'
                      }`}
                    >
                      {/* Submission Row Bar */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold font-mono">
                              {qSub.quizId}
                            </span>
                            {isBlockTest ? (
                              <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold flex items-center gap-1">
                                📝 РУБЕЖНЫЙ ТЕСТ БЛОКА ({totalQuestionsCount} вопр.)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-extrabold flex items-center gap-1">
                                ⚡ МИНИ-ТЕСТ К УРОКУ ({totalQuestionsCount} вопр.)
                              </span>
                            )}
                            {qSub.studentId && (
                              <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-bold font-mono">
                                ID: {qSub.studentId}
                              </span>
                            )}
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                                isApproved
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                                  : isRejected
                                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {isApproved ? '✓ Зачтено ментором' : isRejected ? '✗ На пересдаче' : '⏳ Ожидает подтверждения'}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                              • Сдано: {qSub.submittedAt}
                            </span>
                          </div>

                          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{qSub.quizTitle}</span>
                          </h3>

                          {/* Student Info */}
                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-slate-600 dark:text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">{qSub.studentName}</span>
                            {qSub.studentId && (
                              <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-mono text-[11px] font-bold">
                                {qSub.studentId}
                              </span>
                            )}
                            <span className="text-slate-400 font-mono">({qSub.studentEmail})</span>
                          </div>
                        </div>

                        {/* Score and Mistake badges + Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-right space-y-1">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border inline-block ${
                                qSub.passed
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                              }`}
                            >
                              Результат: {qSub.scorePct}% ({realCorrectCount}/{totalQuestionsCount}) {qSub.passed ? '✓ Сдано' : '✗ Не сдано'}
                            </span>

                            <div className="text-[11px] font-medium text-slate-500">
                              {mistakeCount > 0 ? (
                                <span className="text-rose-500 dark:text-rose-400 font-bold flex items-center justify-end gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" /> Ошибок: {mistakeCount} из {totalQuestionsCount}
                                </span>
                              ) : (
                                <span className="text-emerald-500 font-semibold flex items-center justify-end gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Идеально! 0 ошибок
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            {/* Quick Confirm Button */}
                            {!isApproved && (
                              <button
                                onClick={() => handleApproveQuiz(qSub)}
                                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
                                title="Подтвердить и зачесть тест студенту"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Зачесть тест</span>
                              </button>
                            )}

                            {isApproved && (
                              <div className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Зачтено</span>
                              </div>
                            )}

                            <button
                              onClick={() =>
                                setDeleteTarget({
                                  type: 'quiz',
                                  id: qSub.id,
                                  submissionId: qSub.id,
                                  quizId: qSub.quizId,
                                  studentEmail: qSub.studentEmail,
                                  studentName: qSub.studentName,
                                  title: `Тестирование: ${qSub.quizTitle || qSub.quizId || 'Тест'}`,
                                  description: `Студент: ${qSub.studentName || 'Студент'} (${qSub.studentEmail || 'Без email'}) • Результат: ${qSub.scorePct}% (${realCorrectCount}/${totalQuestionsCount})`
                                })
                              }
                              className="px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                              title="Удалить результат теста"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Удалить</span>
                            </button>

                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setSelectedQuizSubmissionId(null);
                                } else {
                                  setSelectedQuizSubmissionId(qSub.id);
                                  if (quizMentorNotes[qSub.id] === undefined) {
                                    setQuizMentorNotes((prev) => ({ ...prev, [qSub.id]: qSub.mentorComment || '' }));
                                  }
                                }
                              }}
                              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                                isExpanded
                                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
                              }`}
                            >
                              <span>{isExpanded ? 'Скрыть детали' : 'Проверить ошибки'}</span>
                              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            <button
                              onClick={() =>
                                setReviewModalSubmission({
                                  ...qSub,
                                  details,
                                  correctCount: realCorrectCount,
                                  totalQuestions: totalQuestionsCount,
                                })
                              }
                              className="px-3 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-600 text-purple-600 dark:text-purple-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border border-purple-500/20"
                              title="Открыть полный разбор теста в модальном окне"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">В окне</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Question breakdown when expanded */}
                      {isExpanded && (
                        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in">
                          {/* Banner & Filter Controls */}
                          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span className="font-bold text-white">
                                Подробный разбор вопросов и ошибок ({qSub.studentName}):
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              {/* Filter Buttons */}
                              <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700/60 text-[11px]">
                                <button
                                  type="button"
                                  onClick={() => setQuizItemFilter((prev) => ({ ...prev, [qSub.id]: 'all' }))}
                                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                                    activeFilter === 'all'
                                      ? 'bg-purple-600 text-white shadow-sm'
                                      : 'text-slate-400 hover:text-white'
                                  }`}
                                >
                                  Все ({details.length})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setQuizItemFilter((prev) => ({ ...prev, [qSub.id]: 'mistakes' }))}
                                  className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                    activeFilter === 'mistakes'
                                      ? 'bg-rose-600 text-white shadow-sm'
                                      : mistakeCount > 0
                                      ? 'text-rose-400 hover:text-white'
                                      : 'text-slate-500 hover:text-white'
                                  }`}
                                >
                                  Ошибки ({mistakeCount})
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setQuizItemFilter((prev) => ({ ...prev, [qSub.id]: 'correct' }))}
                                  className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                    activeFilter === 'correct'
                                      ? 'bg-emerald-600 text-white shadow-sm'
                                      : 'text-emerald-400 hover:text-white'
                                  }`}
                                >
                                  Верно ({realCorrectCount})
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setReviewModalSubmission({
                                    ...qSub,
                                    details,
                                    correctCount: realCorrectCount,
                                    totalQuestions: totalQuestionsCount,
                                  })
                                }
                                className="px-2.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 border border-purple-500/30 cursor-pointer"
                                title="Развернуть в модальное окно"
                              >
                                <Maximize2 className="w-3 h-3" />
                                <span>Во весь экран</span>
                              </button>
                            </div>
                          </div>

                          {/* Questions breakdown */}
                          <div className="space-y-3">
                            {visibleDetails.length === 0 ? (
                              <div className="p-6 text-center rounded-2xl bg-slate-800/40 border border-slate-700/50">
                                {activeFilter === 'mistakes' ? (
                                  <div className="space-y-1">
                                    <p className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-2">
                                      <CheckCircle2 className="w-5 h-5" />
                                      У студента нет ошибок в этом тесте!
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      Все {details.length} вопросов решены верно (100% результат).
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-400">Нет вопросов для выбранного фильтра.</p>
                                )}
                              </div>
                            ) : (
                              visibleDetails.map((det, detIdx) => {
                                const originalIdx = details.findIndex((d) => d.questionId === det.questionId);
                                const displayNum = originalIdx >= 0 ? originalIdx + 1 : detIdx + 1;

                                return (
                                  <div
                                    key={`qdet-${qSub.id}-${det.questionId}-${detIdx}`}
                                    className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-all ${
                                      det.isCorrect
                                        ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20'
                                        : 'bg-rose-500/10 dark:bg-rose-950/40 border-rose-500/30'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-start gap-2">
                                        <span
                                          className={`w-6 h-6 rounded-lg font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 ${
                                            det.isCorrect
                                              ? 'bg-emerald-500 text-white'
                                              : 'bg-rose-500 text-white'
                                          }`}
                                        >
                                          Q{displayNum}
                                        </span>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">
                                          {det.questionText}
                                        </p>
                                      </div>

                                      <span
                                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase shrink-0 ${
                                          det.isCorrect
                                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                            : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                                        }`}
                                      >
                                        {det.isCorrect ? '✓ Верно' : '✗ Ошибка студента'}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                                      {/* Student's Choice */}
                                      <div
                                        className={`p-2.5 rounded-xl border ${
                                          det.isCorrect
                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
                                        }`}
                                      >
                                        <span className="text-[10px] uppercase font-bold block opacity-70">
                                          Выбранный ответ студента:
                                        </span>
                                        <span className="font-semibold">{det.selectedOptionText}</span>
                                      </div>

                                      {/* Correct Choice if wrong */}
                                      {!det.isCorrect && (
                                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200">
                                          <span className="text-[10px] uppercase font-bold block opacity-70">
                                            Правильный ответ:
                                          </span>
                                          <span className="font-semibold">{det.correctOptionText}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Explanation */}
                                    {det.explanation && (
                                      <div className="pl-8 pt-1 text-[11px] text-slate-600 dark:text-slate-300">
                                        <span className="font-bold text-purple-600 dark:text-purple-400">Пояснение: </span>
                                        <span>{det.explanation}</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* Mentor Feedback & Confirmation Box */}
                          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-purple-400" />
                              <span>Рекомендация Ментора & Решение по Тесту:</span>
                            </h4>
                            <textarea
                              rows={2}
                              value={quizMentorNotes[qSub.id] !== undefined ? quizMentorNotes[qSub.id] : (qSub.mentorComment || '')}
                              onChange={(e) => {
                                const val = e.target.value;
                                setQuizMentorNotes((prev) => ({ ...prev, [qSub.id]: val }));
                              }}
                              placeholder="Напишите совет, какую тему уроков повторить (например: «Обратите внимание на синтаксис chmod и разницу между RAID 0 и RAID 1»)..."
                              className="w-full bg-white dark:bg-[#14141B] border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                            />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                              {qSub.mentorComment ? (
                                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                  <span>Рекомендация сохранена ({qSub.studentName})</span>
                                </div>
                              ) : (
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                  Студент получит эту рекомендацию в своем личном кабинете.
                                </span>
                              )}

                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => handleRejectQuiz(qSub)}
                                  className="px-3.5 py-2 rounded-xl bg-rose-600/15 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white font-bold text-xs flex items-center gap-1.5 border border-rose-500/30 transition-all cursor-pointer shrink-0"
                                >
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  <span>На пересдачу</span>
                                </button>
                                <button
                                  onClick={() => {
                                    const noteValue = quizMentorNotes[qSub.id] !== undefined ? quizMentorNotes[qSub.id] : (qSub.mentorComment || '');
                                    updateQuizSubmissionComment(qSub.id, noteValue);
                                    showToast(`Рекомендация ментора сохранена и отправлена студенту ${qSub.studentName}!`);
                                  }}
                                  className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  <span>Сохранить заметку</span>
                                </button>
                                <button
                                  onClick={() => handleApproveQuiz(qSub)}
                                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Зачесть и начислить EXP</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Evaluation Methodology & EXP Rules */}
      {activeTab === 'eval-rules' && <MentorGradingGuide />}

      {/* MODAL: Image Preview */}
      {Boolean(activePreviewImage) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <button
              onClick={() => setActivePreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 text-white hover:bg-rose-600"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePreviewImage!}
              alt="Lab Screenshot"
              className="w-full max-h-[80vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* MODAL: File Preview */}
      {activePreviewFile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 relative">
            <button
              onClick={() => setActivePreviewFile(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              {getFileIcon(activePreviewFile.type)}
              <div>
                <h3 className="text-sm font-bold text-white">{activePreviewFile.name}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Тип: {activePreviewFile.type.toUpperCase()} • Размер: {activePreviewFile.size}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono p-4 rounded-2xl bg-black border border-slate-800">
              Документ лабораторного отчета зарегистрирован на сервере AI for LIFE Academy и готов к полной выгрузке.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => downloadAttachedFile(activePreviewFile)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Скачать файл</span>
              </button>
              <button
                onClick={() => setActivePreviewFile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: In-App Delete Confirmation */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isDeleting && setDeleteTarget(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1 pr-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Подтверждение удаления
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Вы действительно хотите удалить выбранную работу из реестра академического контроля?
                </p>
              </div>
              <button
                onClick={() => !isDeleting && setDeleteTarget(null)}
                disabled={isDeleting}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {deleteTarget.title}
              </div>
              {deleteTarget.description && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {deleteTarget.description}
                </div>
              )}
              {deleteTarget.studentName && (
                <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-700/50">
                  <span className="font-semibold">Студент:</span> {deleteTarget.studentName}
                  {deleteTarget.studentEmail && (
                    <span className="text-slate-400">({deleteTarget.studentEmail})</span>
                  )}
                </div>
              )}
            </div>

            <p className="text-[11px] text-rose-500/90 dark:text-rose-400 font-medium">
              * Запись будет удалена из локального реестра и обновлена в реестре синхронизации.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Удаление...' : 'Да, удалить запись'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: In-App Reset All Data (Labs, HW, Tests) Confirmation */}
      {isResetAllModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isResettingAll && setIsResetAllModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1 pr-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Сброс всех академических данных
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Вы собираетесь полностью очистить все лабораторные работы (Labs), домашние задания (HW) и результаты тестов.
                </p>
              </div>
              <button
                onClick={() => !isResettingAll && setIsResetAllModalOpen(false)}
                disabled={isResettingAll}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2.5">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block">
                Будут очищены следующие данные:
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Все отправленные и проверенные <strong>Лабораторные работы (Labs)</strong></li>
                <li>Все сданные <strong>Домашние задания (HW)</strong> и рецензии ментора</li>
                <li>Все результаты <strong>Тестов и Квизов</strong>, баллы и ошибки</li>
                <li>Локальный кэш выполненных заданий и секций уроков</li>
              </ul>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              * Это действие вернет портал в чистое состояние для нового цикла обучения.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsResetAllModalOpen(false)}
                disabled={isResettingAll}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleResetAllData}
                disabled={isResettingAll}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isResettingAll ? 'Очистка...' : 'Да, очистить все данные'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Full Quiz Result Review in Modal */}
      {reviewModalSubmission && (
        <QuizResultReviewModal
          submission={reviewModalSubmission}
          onClose={() => setReviewModalSubmission(null)}
        />
      )}
    </div>
  );
};
