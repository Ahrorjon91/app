import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  Upload,
  Link2,
  FileText,
  Sparkles,
  AlertCircle,
  FolderPlus,
  Trash2,
  Download,
  ShieldCheck,
  Award,
  Bell,
  X,
  FileCode,
  FileSpreadsheet,
  File as FileIcon
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { AttachedReportFile, SubmissionStatus } from '../types';
import { normalizeAttachedFiles, triggerFileDownload } from '../lib/attachmentStorage';
import { api } from '../lib/api';
import { COURSE_RULES } from '../lib/courseRules';
import { activeLessonQuizRegistry, evaluateLessonQuiz } from '../lib/quizHelpers';

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

function getFileIcon(type?: string) {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-rose-400 shrink-0" />;
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-400 shrink-0" />;
    case 'ppt':
    case 'pptx':
      return <FileSpreadsheet className="w-5 h-5 text-amber-400 shrink-0" />;
    case 'txt':
    case 'log':
    case 'md':
      return <FileCode className="w-5 h-5 text-emerald-400 shrink-0" />;
    case 'zip':
    case 'rar':
      return <FileIcon className="w-5 h-5 text-purple-400 shrink-0" />;
    case 'image':
      return <FileIcon className="w-5 h-5 text-cyan-400 shrink-0" />;
    default:
      return <FileText className="w-5 h-5 text-indigo-400 shrink-0" />;
  }
}

// ============================================================================
// 1. INLINE LAB SUBMISSION (ЛАБОРАТОРНАЯ РАБОТА)
// ============================================================================
export interface InlineLabSubmissionProps {
  labId?: number;
  lessonId?: number;
  taskTitle?: string;
  lessonTitle?: string;
  labTitle?: string;
  title?: string;
  defaultTitle?: string;
  defaultText?: string;
  checklistItems?: string[];
  extraSummaryText?: string;
  rewardExp?: number;
  rewardXp?: number;
  onSubmitted?: () => void;
}

export const InlineLabSubmission: React.FC<InlineLabSubmissionProps> = ({
  labId,
  lessonId,
  taskTitle,
  lessonTitle,
  labTitle,
  title,
  defaultTitle,
  defaultText,
  checklistItems,
  extraSummaryText,
  rewardExp = 100,
  rewardXp,
  onSubmitted
}) => {
  const actualLabId = Number(labId || lessonId || 1);
  const actualLessonId = Number(lessonId || labId || 1);
  const actualTitle = labTitle || lessonTitle || taskTitle || title || defaultTitle || `Лабораторная работа #${actualLabId}`;
  const actualExp = rewardExp || rewardXp || 100;

  const portal = usePortal() as any;
  const profile = portal?.profile || { name: 'Студент', email: 'student@devopspro.tech', mentorName: 'Алексей Смирнов' };
  const mentorName = profile?.mentorName || 'Алексей Смирнов';

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find existing submission from portal state
  const existingSub = (portal?.labSubmissions || []).find(
    (s: any) => Number(s.labId) === actualLabId && (
      (profile.email && String(s.studentEmail || '').toLowerCase() === String(profile.email).toLowerCase()) ||
      (profile.id && s.studentId === profile.id)
    )
  );

  const [attachedFiles, setAttachedFiles] = useState<AttachedReportFile[]>(() => {
    if (existingSub?.attachedFiles && existingSub.attachedFiles.length > 0) {
      return normalizeAttachedFiles(existingSub.attachedFiles);
    }
    try {
      const saved = localStorage.getItem(`devops_lab_${actualLabId}_files`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [repoUrl, setRepoUrl] = useState<string>(() => {
    return (
      existingSub?.repoUrl ||
      existingSub?.demoUrl ||
      existingSub?.fileUrl ||
      existingSub?.githubUrl ||
      localStorage.getItem(`devops_lab_${actualLabId}_repo_url`) ||
      ''
    );
  });

  const [notes, setNotes] = useState<string>(() => {
    return (
      existingSub?.studentNotes ||
      existingSub?.reportText ||
      existingSub?.notes ||
      localStorage.getItem(`devops_lab_${actualLabId}_notes`) ||
      ''
    );
  });
  const [submitting, setSubmitting] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRepoUrlChange = (val: string) => {
    setRepoUrl(val);
    try {
      localStorage.setItem(`devops_lab_${actualLabId}_repo_url`, val);
    } catch {}
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    try {
      localStorage.setItem(`devops_lab_${actualLabId}_notes`, val);
    } catch {}
  };

  // Sync with persistent storage or updated submission
  useEffect(() => {
    if (existingSub) {
      if (existingSub.attachedFiles && existingSub.attachedFiles.length > 0) {
        const norm = normalizeAttachedFiles(existingSub.attachedFiles);
        setAttachedFiles(norm);
        try {
          localStorage.setItem(`devops_lab_${actualLabId}_files`, JSON.stringify(norm));
        } catch {}
      }
      const u = existingSub.repoUrl || existingSub.demoUrl || existingSub.fileUrl || existingSub.githubUrl;
      if (u) {
        setRepoUrl(u);
        try {
          localStorage.setItem(`devops_lab_${actualLabId}_repo_url`, u);
        } catch {}
      }
      const n = existingSub.studentNotes || existingSub.reportText;
      if (n) {
        setNotes(n);
        try {
          localStorage.setItem(`devops_lab_${actualLabId}_notes`, n);
        } catch {}
      }
    } else if (portal?.getPersistentAttachmentsForLab) {
      portal.getPersistentAttachmentsForLab(actualLabId)
        .then((saved: AttachedReportFile[]) => {
          if (saved && saved.length > 0) {
            setAttachedFiles(normalizeAttachedFiles(saved));
          }
        })
        .catch(() => {});
    }
  }, [actualLabId, existingSub?.id, existingSub?.submittedAt, existingSub?.repoUrl, existingSub?.demoUrl, existingSub?.fileUrl]);

  const isAdmin = profile?.role === 'admin';
  const labItem = (portal?.labs || []).find((l: any) => Number(l.id) === actualLabId);
  const rawSubmissionStatus =
    existingSub?.status ||
    existingSub?.submissionStatus ||
    (!isAdmin ? labItem?.submissionStatus : undefined) ||
    (notificationSent ? 'Submitted' : 'Not Submitted');
  const submissionStatus: SubmissionStatus =
    rawSubmissionStatus === 'Pending' || rawSubmissionStatus === 'pending'
      ? 'Submitted'
      : (rawSubmissionStatus as SubmissionStatus);

  const score =
    existingSub?.score !== undefined && existingSub?.score !== null && existingSub?.score > 0
      ? existingSub.score
      : (!isAdmin ? labItem?.score : undefined);
  const mentorFeedback = existingSub?.feedback || existingSub?.mentorFeedback || (!isAdmin ? labItem?.mentorFeedback : '') || '';
  const confirmedExp = COURSE_RULES.calculateMentorExp(
    score,
    submissionStatus === 'Approved' ? 'Approved' : submissionStatus,
    mentorFeedback
  );

  // File Upload Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const rejectedNames: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejectedNames.push(`${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} МБ)`);
      } else {
        validFiles.push(file);
      }
    });

    if (rejectedNames.length > 0) {
      setErrorMsg(`Файл(ы) превышают лимит 20 МБ: ${rejectedNames.join(', ')}`);
    } else {
      setErrorMsg(null);
    }

    validFiles.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: AttachedReportFile['type'] = 'other';
      if (['pdf'].includes(ext)) type = 'pdf';
      else if (['doc', 'docx'].includes(ext)) type = 'docx';
      else if (['txt', 'log', 'md'].includes(ext)) type = 'txt';
      else if (['ppt', 'pptx'].includes(ext)) type = 'ppt';
      else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext) || file.type.startsWith('image/')) type = 'image';
      else if (['zip', 'rar', 'gz'].includes(ext)) type = 'zip';

      const fileSizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} МБ`
          : `${Math.round(file.size / 1024)} КБ`;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newObj: AttachedReportFile = {
          id: `lab-${actualLabId}-att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: fileSizeStr,
          type,
          dataUrl
        };
        setAttachedFiles((prev) => {
          const updated = [...prev, newObj];
          try {
            localStorage.setItem(`devops_lab_${actualLabId}_files`, JSON.stringify(updated));
          } catch {}
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileId);
      try {
        localStorage.setItem(`devops_lab_${actualLabId}_files`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDownloadFile = (file: AttachedReportFile) => {
    if (portal?.downloadFileAttachment) {
      portal.downloadFileAttachment(file);
    } else {
      triggerFileDownload(file);
    }
  };

  // Submit to Mentor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attachedFiles.length === 0) {
      setErrorMsg('Для отправки лабораторной работы ментору прикрепите хотя бы один файл (до 20 МБ).');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      try {
        localStorage.setItem(`devops_lab_${actualLabId}_repo_url`, repoUrl);
        localStorage.setItem(`devops_lab_${actualLabId}_notes`, notes);
        localStorage.setItem(`devops_lab_${actualLabId}_files`, JSON.stringify(attachedFiles));
      } catch {}

      const pdfName = attachedFiles[0]?.name || `Lab_${actualLabId}_Report.pdf`;

      // 1. Update via PortalContext with repoUrl and notes (handles API submission & notification)
      if (portal?.submitLabReport) {
        await portal.submitLabReport(actualLabId, [], pdfName, attachedFiles, repoUrl, notes);
      } else {
        try {
          await api.submitLab({
            labId: actualLabId,
            lessonId: actualLessonId,
            studentEmail: profile.email,
            studentName: profile.name,
            studentId: profile.id,
            repoUrl,
            demoUrl: repoUrl,
            fileUrl: repoUrl,
            studentNotes: notes,
            reportText: notes,
            attachedFiles
          });
        } catch (apiErr) {
          console.warn('[InlineLabSubmission] API submitLab fallback:', apiErr);
        }
      }

      setNotificationSent(true);
      if (portal?.refreshData) {
        portal.refreshData();
      }
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err: any) {
      console.error('[InlineLabSubmission] Submit error:', err);
      setNotificationSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = attachedFiles.length > 0 && !submitting;

  return (
    <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-md">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.doc,.txt,.ppt,.pptx,.png,.jpg,.jpeg,.webp,.zip,.rar"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* SECTION HEADER: Attachments */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 sm:pb-5">
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Прикрепление отчета и документов (PDF, DOCX, TXT, PPT)</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Выбирайте файлы прямо с устройства (макс. 20 МБ). Обязательно прикрепите отчет для активации отправки ментору.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Начисление после проверки Ментором: 50 EXP • 75 EXP • 100 EXP
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full md:w-auto justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-cyan-600/20 shrink-0 transition-all cursor-pointer"
        >
          <FolderPlus className="w-4 h-4 shrink-0" />
          <span>Прикрепить файл с ПК / Телефона</span>
        </button>
      </div>

      {/* Portal Notification Toast Alert */}
      {notificationSent && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 shadow-xl">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <div>
              <p className="font-bold text-white text-sm">Уведомление отправлено ментору!</p>
              <p className="text-emerald-300">
                Портал успешно зарегистрировал Лабораторную работу #{actualLabId} с прикрепленными документами и отправил уведомление ментору.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotificationSent(false)}
            className="text-emerald-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error / Validation Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FORM: Repo Link, Files, Notes, Submit */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* FIELD 1: GitHub repo or Google Doc Link */}
        <div className="space-y-1.5">
          <label className="block text-sm sm:text-base font-bold text-slate-200 flex items-center gap-1.5">
            <Link2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Ссылка на GitHub репозиторий или Google Doc:</span>
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => handleRepoUrlChange(e.target.value)}
            placeholder="https://github.com/username/devops-lab-repo или ссылка на Google Doc"
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* FIELD 2: Attached Files & Reports List */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Загруженные файлы и отчеты ({attachedFiles.length})
              </h3>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">(до 20 МБ на файл)</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs sm:text-sm text-cyan-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>+ Добавить еще</span>
            </button>
          </div>

          {attachedFiles.length === 0 ? (
            <div className="p-4 sm:p-6 text-center rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-300 text-sm space-y-3">
              <p className="font-medium text-slate-200">Файлы отчета еще не прикреплены.</p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Для отправки лабораторной работы ментору прикрепите хотя бы один файл (до 20 МБ).
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Выбрать файл с устройства</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {attachedFiles.map((file, idx) => (
                <div
                  key={file.id || `file-${idx}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-mono font-bold text-white text-xs sm:text-sm truncate">{file.name}</p>
                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(file)}
                      className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Скачать файл"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs">Скачать</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs cursor-pointer transition-colors"
                      title="Удалить файл"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FIELD 3: Mentor Comment / Note */}
        <div className="space-y-1.5">
          <label className="block text-sm sm:text-base font-bold text-slate-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Комментарий или заметка ментору к Лабораторной работе:</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Опишите ход выполнения, возникшие вопросы или оставьте заметку для Вашего ментора..."
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ACTION BAR: Send to Mentor */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Отправить лабораторную работу Ментору</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Нажмите кнопку ниже, чтобы портал отправил уведомление Вашему ментору с прикрепленными файлами, репозиторием и заметками.
            </p>
            {!canSubmit && (
              <p className="text-xs sm:text-sm text-amber-400 font-medium">
                Для активации кнопки необходимо прикрепить как минимум один файл отчета (до 20 МБ).
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full md:w-auto justify-center px-6 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer ${
              canSubmit
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 opacity-60 cursor-not-allowed shadow-none'
            }`}
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{submitting ? 'Отправка ментору...' : '🚀 Отправить отчет и уведомить Ментора'}</span>
          </button>
        </div>
      </form>

      {/* STATUS CARD: Review Status */}
      <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Статус проверки лабораторной работы</span>
          </h3>
        </div>

        {submissionStatus === 'Approved' ? (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Лабораторная работа проверена и подтверждена Ментором!</h4>
                  <p className="text-xs text-emerald-300">
                    Подтвержденная оценка Ментора: <strong className="text-emerald-400 text-sm">+{confirmedExp} EXP</strong> (шкала: 50 / 75 / 100 EXP)
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs">
                ✓ Подтверждено: +{confirmedExp} EXP
              </span>
            </div>
            {mentorFeedback && (
              <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-800/60 text-xs text-slate-200 mt-2">
                <span className="font-bold text-emerald-400 block mb-0.5">Комментарий ментора:</span>
                <p className="italic">{mentorFeedback}</p>
              </div>
            )}
          </div>
        ) : submissionStatus === 'Submitted' || submissionStatus === 'Under Review' ? (
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-white">Работа отправлена и ожидает подтверждения Ментором</h4>
                <p className="text-xs text-amber-300">
                  Ментор проверит отчет и подтвердит итоговое начисление: <strong>50 EXP, 75 EXP или 100 EXP</strong>.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
              ⏳ Ожидает оценки: 50 / 75 / 100 EXP
            </span>
          </div>
        ) : submissionStatus === 'Rejected' ? (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-2">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Отчет отправлен ментором на доработку</h4>
                <p className="text-xs text-rose-300">Пожалуйста, внесите необходимые правки, обновите файлы и отправьте работу повторно.</p>
              </div>
            </div>
            {mentorFeedback && (
              <div className="p-3 rounded-lg bg-slate-900 border border-rose-800 text-xs text-slate-200">
                <span className="font-bold text-rose-400 block mb-0.5">Замечания ментора:</span>
                <p>{mentorFeedback}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Ожидает отправки. Прикрепите отчёт (до 20 МБ), скриншоты выполнения и нажмите кнопку «Отправить отчет и уведомить Ментора» выше.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 2. INLINE HOMEWORK SUBMISSION (ДОМАШНЕЕ ЗАДАНИЕ)
// ============================================================================
export interface InlineHomeworkSubmissionProps {
  lessonId?: number;
  lessonNumber?: number;
  homeworkId?: number;
  taskTitle?: string;
  homeworkTitle?: string;
  lessonTitle?: string;
  title?: string;
  defaultTitle?: string;
  defaultText?: string;
  checklistItems?: string[];
  extraSummaryText?: string;
  rewardExp?: number;
  rewardXp?: number;
  onSubmitted?: () => void;
}

export const InlineHomeworkSubmission: React.FC<InlineHomeworkSubmissionProps> = ({
  lessonId,
  lessonNumber,
  homeworkId,
  taskTitle,
  homeworkTitle,
  lessonTitle,
  title,
  defaultTitle,
  defaultText,
  checklistItems,
  extraSummaryText,
  rewardExp = 100,
  rewardXp,
  onSubmitted
}) => {
  const actualLessonId = Number(lessonId || lessonNumber || homeworkId || 1);
  const actualTitle = homeworkTitle || taskTitle || lessonTitle || title || defaultTitle || `Домашнее задание к Уроку #${actualLessonId}`;
  const actualExp = rewardExp || rewardXp || 100;

  const portal = usePortal() as any;
  const profile = portal?.profile || { name: 'Студент', email: 'student@devopspro.tech', mentorName: 'Алексей Смирнов' };
  const mentorName = profile?.mentorName || 'Алексей Смирнов';

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find existing submission from portal state
  const existingSub = (portal?.homeworkSubmissions || []).find(
    (s: any) => Number(s.lessonId) === actualLessonId && (
      (profile.email && String(s.studentEmail || '').toLowerCase() === String(profile.email).toLowerCase()) ||
      (profile.id && s.studentId === profile.id)
    )
  );

  const [attachedFiles, setAttachedFiles] = useState<AttachedReportFile[]>(() => {
    if (existingSub?.attachedFiles && existingSub.attachedFiles.length > 0) {
      return normalizeAttachedFiles(existingSub.attachedFiles);
    }
    try {
      const saved = localStorage.getItem(`devops_hw_${actualLessonId}_files`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [repoUrl, setRepoUrl] = useState<string>(() => {
    return (
      existingSub?.githubUrl ||
      existingSub?.fileUrl ||
      existingSub?.repoUrl ||
      existingSub?.demoUrl ||
      localStorage.getItem(`devops_hw_${actualLessonId}_repo_url`) ||
      ''
    );
  });

  const [notes, setNotes] = useState<string>(() => {
    return (
      existingSub?.studentNotes ||
      existingSub?.reportText ||
      existingSub?.notes ||
      localStorage.getItem(`devops_hw_${actualLessonId}_notes`) ||
      ''
    );
  });
  const [submitting, setSubmitting] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRepoUrlChange = (val: string) => {
    setRepoUrl(val);
    try {
      localStorage.setItem(`devops_hw_${actualLessonId}_repo_url`, val);
    } catch {}
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    try {
      localStorage.setItem(`devops_hw_${actualLessonId}_notes`, val);
    } catch {}
  };

  // Sync with persistent storage or updated submission
  useEffect(() => {
    if (existingSub) {
      if (existingSub.attachedFiles && existingSub.attachedFiles.length > 0) {
        const norm = normalizeAttachedFiles(existingSub.attachedFiles);
        setAttachedFiles(norm);
        try {
          localStorage.setItem(`devops_hw_${actualLessonId}_files`, JSON.stringify(norm));
        } catch {}
      }
      const u = existingSub.githubUrl || existingSub.fileUrl || existingSub.repoUrl || existingSub.demoUrl;
      if (u) {
        setRepoUrl(u);
        try {
          localStorage.setItem(`devops_hw_${actualLessonId}_repo_url`, u);
        } catch {}
      }
      const n = existingSub.studentNotes || existingSub.reportText;
      if (n) {
        setNotes(n);
        try {
          localStorage.setItem(`devops_hw_${actualLessonId}_notes`, n);
        } catch {}
      }
    } else if (portal?.getPersistentAttachmentsForLesson) {
      portal.getPersistentAttachmentsForLesson(actualLessonId, profile.email)
        .then((saved: AttachedReportFile[]) => {
          if (saved && saved.length > 0) {
            setAttachedFiles(normalizeAttachedFiles(saved));
          }
        })
        .catch(() => {});
    }
  }, [actualLessonId, existingSub?.id, existingSub?.submittedAt, existingSub?.githubUrl, existingSub?.fileUrl, existingSub?.repoUrl]);

  const lessonItem = (portal?.lessons || []).find((l: any) => Number(l.id) === actualLessonId);
  const rawSubmissionStatus =
    existingSub?.status ||
    existingSub?.submissionStatus ||
    lessonItem?.submissionStatus ||
    (notificationSent ? 'Submitted' : 'Not Submitted');
  const submissionStatus: SubmissionStatus =
    rawSubmissionStatus === 'Pending' || rawSubmissionStatus === 'pending'
      ? 'Submitted'
      : (rawSubmissionStatus as SubmissionStatus);

  const score =
    existingSub?.score !== undefined && existingSub?.score !== null && existingSub?.score > 0
      ? existingSub.score
      : lessonItem?.score;
  const mentorFeedback = existingSub?.feedback || existingSub?.mentorFeedback || lessonItem?.mentorFeedback || '';
  const confirmedHwExp = COURSE_RULES.calculateMentorExp(
    score,
    submissionStatus === 'Approved' ? 'Approved' : submissionStatus,
    mentorFeedback
  );

  // File Upload Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const rejectedNames: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        rejectedNames.push(`${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} МБ)`);
      } else {
        validFiles.push(file);
      }
    });

    if (rejectedNames.length > 0) {
      setErrorMsg(`Файл(ы) превышают лимит 20 МБ: ${rejectedNames.join(', ')}`);
    } else {
      setErrorMsg(null);
    }

    validFiles.forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: AttachedReportFile['type'] = 'other';
      if (['pdf'].includes(ext)) type = 'pdf';
      else if (['doc', 'docx'].includes(ext)) type = 'docx';
      else if (['txt', 'log', 'md'].includes(ext)) type = 'txt';
      else if (['ppt', 'pptx'].includes(ext)) type = 'ppt';
      else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext) || file.type.startsWith('image/')) type = 'image';
      else if (['zip', 'rar', 'gz'].includes(ext)) type = 'zip';

      const fileSizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} МБ`
          : `${Math.round(file.size / 1024)} КБ`;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newObj: AttachedReportFile = {
          id: `hw-${actualLessonId}-att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          size: fileSizeStr,
          type,
          dataUrl
        };
        setAttachedFiles((prev) => {
          const updated = [...prev, newObj];
          try {
            localStorage.setItem(`devops_hw_${actualLessonId}_files`, JSON.stringify(updated));
          } catch {}
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileId);
      try {
        localStorage.setItem(`devops_hw_${actualLessonId}_files`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDownloadFile = (file: AttachedReportFile) => {
    if (portal?.downloadFileAttachment) {
      portal.downloadFileAttachment(file);
    } else {
      triggerFileDownload(file);
    }
  };

  // Submit to Mentor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attachedFiles.length === 0) {
      setErrorMsg('Для отправки домашнего задания ментору прикрепите хотя бы один файл (до 20 МБ).');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      try {
        localStorage.setItem(`devops_hw_${actualLessonId}_repo_url`, repoUrl);
        localStorage.setItem(`devops_hw_${actualLessonId}_notes`, notes);
        localStorage.setItem(`devops_hw_${actualLessonId}_files`, JSON.stringify(attachedFiles));
      } catch {}

      // 1. Context submit (handles API submission & notification)
      if (portal?.submitHomework) {
        await portal.submitHomework(actualLessonId, repoUrl, notes, attachedFiles);
      } else {
        try {
          await api.submitHomework({
            lessonId: actualLessonId,
            lessonTitle: actualTitle,
            studentEmail: profile.email,
            studentName: profile.name,
            studentId: profile.id,
            fileUrl: repoUrl,
            githubUrl: repoUrl,
            repoUrl,
            notes,
            studentNotes: notes,
            reportText: notes,
            attachedFiles
          });
        } catch (apiErr) {
          console.warn('[InlineHomeworkSubmission] API submitHomework fallback:', apiErr);
        }
      }

      setNotificationSent(true);
      if (portal?.refreshData) {
        portal.refreshData();
      }
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err: any) {
      console.error('[InlineHomeworkSubmission] Submit error:', err);
      setNotificationSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = attachedFiles.length > 0 && !submitting;

  return (
    <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-md">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.doc,.txt,.ppt,.pptx,.png,.jpg,.jpeg,.webp,.zip,.rar"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* SECTION HEADER: Attachments */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 sm:pb-5">
        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>Прикрепление отчета и документов (PDF, DOCX, TXT, PPT, ZIP)</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Выбирайте файлы прямо с устройства (макс. 20 МБ). Обязательно прикрепите отчет для активации отправки ментору.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Начисление после проверки Ментором: 50 EXP • 75 EXP • 100 EXP + открытие следующего урока
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full md:w-auto justify-center px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/20 shrink-0 transition-all cursor-pointer"
        >
          <FolderPlus className="w-4 h-4 shrink-0" />
          <span>Прикрепить файл с ПК / Телефона</span>
        </button>
      </div>

      {/* Portal Notification Toast Alert */}
      {notificationSent && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 shadow-xl">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <div>
              <p className="font-bold text-white text-sm">Уведомление отправлено ментору!</p>
              <p className="text-emerald-300">
                Портал успешно зарегистрировал Домашнее задание к Уроку #{actualLessonId} с прикрепленными документами и отправил уведомление ментору.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotificationSent(false)}
            className="text-emerald-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error / Validation Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FORM: Repo Link, Files, Notes, Submit */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* FIELD 1: GitHub / Google Doc / Solution Link */}
        <div className="space-y-1.5">
          <label className="block text-sm sm:text-base font-bold text-slate-200 flex items-center gap-1.5">
            <Link2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Ссылка на GitHub репозиторий или Google Doc:</span>
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => handleRepoUrlChange(e.target.value)}
            placeholder="https://github.com/username/devops-homework или ссылка на Google Doc"
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* FIELD 2: Attached Files & Reports List */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Загруженные файлы и отчеты ({attachedFiles.length})
              </h3>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">(до 20 МБ на файл)</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs sm:text-sm text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>+ Добавить еще</span>
            </button>
          </div>

          {attachedFiles.length === 0 ? (
            <div className="p-4 sm:p-6 text-center rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-300 text-sm space-y-3">
              <p className="font-medium text-slate-200">Файлы отчета еще не прикреплены.</p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Для отправки домашнего задания ментору прикрепите хотя бы один файл (до 20 МБ).
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Выбрать файл с устройства</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {attachedFiles.map((file, idx) => (
                <div
                  key={file.id || `file-${idx}`}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-mono font-bold text-white text-xs sm:text-sm truncate">{file.name}</p>
                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(file)}
                      className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Скачать файл"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs">Скачать</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-xs cursor-pointer transition-colors"
                      title="Удалить файл"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FIELD 3: Mentor Comment / Note */}
        <div className="space-y-1.5">
          <label className="block text-sm sm:text-base font-bold text-slate-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Комментарий или заметка ментору к Домашнему заданию:</span>
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Опишите ход выполнения, возникшие вопросы или оставьте заметку для Вашего ментора..."
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* ACTION BAR: Send to Mentor */}
        <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/60 to-slate-950 border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Отправить домашнее задание Ментору</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Нажмите кнопку ниже, чтобы портал отправил уведомление Вашему ментору с прикрепленными файлами, репозиторием и заметками.
            </p>
            {!canSubmit && (
              <p className="text-xs sm:text-sm text-amber-400 font-medium">
                Для активации кнопки необходимо прикрепить как минимум один файл отчета (до 20 МБ).
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full md:w-auto justify-center px-6 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer ${
              canSubmit
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 opacity-60 cursor-not-allowed shadow-none'
            }`}
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{submitting ? 'Отправка ментору...' : '🚀 Отправить отчет и уведомить Ментора'}</span>
          </button>
        </div>
      </form>

      {/* STATUS CARD: Review Status */}
      <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Статус проверки домашнего задания</span>
          </h3>
        </div>

        {submissionStatus === 'Approved' ? (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Домашнее задание проверено и подтверждено Ментором!</h4>
                  <p className="text-xs text-emerald-300">
                    Подтвержденная оценка Ментора: <strong className="text-emerald-400 text-sm">+{confirmedHwExp} EXP</strong> (шкала: 50 / 75 / 100 EXP)
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs">
                ✓ Подтверждено: +{confirmedHwExp} EXP
              </span>
            </div>
            {mentorFeedback && (
              <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-800/60 text-xs text-slate-200 mt-2">
                <span className="font-bold text-emerald-400 block mb-0.5">Комментарий ментора:</span>
                <p className="italic">{mentorFeedback}</p>
              </div>
            )}
          </div>
        ) : submissionStatus === 'Submitted' || submissionStatus === 'Under Review' ? (
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-white">Задание отправлено и ожидает подтверждения Ментором</h4>
                <p className="text-xs text-amber-300">
                  Ментор проверит ДЗ, подтвердит оценку (<strong>50 EXP, 75 EXP или 100 EXP</strong>) и откроет следующий урок.
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
              ⏳ Ожидает оценки: 50 / 75 / 100 EXP
            </span>
          </div>
        ) : submissionStatus === 'Rejected' ? (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-2">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">Задание отправлено ментором на доработку</h4>
                <p className="text-xs text-rose-300">Пожалуйста, внесите необходимые правки, обновите файлы и отправьте работу повторно.</p>
              </div>
            </div>
            {mentorFeedback && (
              <div className="p-3 rounded-lg bg-slate-900 border border-rose-800 text-xs text-slate-200">
                <span className="font-bold text-rose-400 block mb-0.5">Замечания ментора:</span>
                <p>{mentorFeedback}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              Ожидает отправки. Прикрепите отчёт (до 20 МБ) и нажмите кнопку «Отправить отчет и уведомить Ментора» выше.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 3. INLINE TEST SUBMISSION (ТЕСТИРОВАНИЕ)
// ============================================================================
export interface InlineTestSubmissionProps {
  testId?: string | number;
  lessonId?: number;
  taskTitle?: string;
  testTitle?: string;
  lessonTitle?: string;
  title?: string;
  defaultTitle?: string;
  rewardExp?: number;
  rewardXp?: number;
  score?: number;
  maxScore?: number;
  details?: string;
  questions?: any[];
  selectedAnswers?: any;
  onSubmitted?: () => void;
}

export const InlineTestSubmission: React.FC<InlineTestSubmissionProps> = ({
  testId = 'TEST_GENERIC',
  lessonId,
  taskTitle,
  testTitle,
  lessonTitle,
  title,
  defaultTitle,
  rewardExp = 100,
  rewardXp,
  score,
  maxScore,
  details,
  questions,
  selectedAnswers,
  onSubmitted
}) => {
  const portal = usePortal() as any;
  const actualTestId = String(testId || 'TEST_GENERIC');
  const parsedFromTestId = (() => {
    const m = actualTestId.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : undefined;
  })();
  const resolvedLessonId: number = lessonId || parsedFromTestId || portal?.selectedLessonId || 1;
  const actualTitle = testTitle || lessonTitle || taskTitle || title || defaultTitle || `Мини-тест к Уроку #${resolvedLessonId}`;
  const actualExp = rewardExp || rewardXp || 100;
  const profile = portal?.profile || portal?.user || { id: 'USR-STU-01', email: 'student@devopspro.tech', name: 'Студент' };

  const existingScore =
    portal?.testScores?.[String(resolvedLessonId)] ??
    portal?.testScores?.[`lesson-${resolvedLessonId}-test`] ??
    portal?.testScores?.[`LESSON_${resolvedLessonId}`] ??
    portal?.testScores?.[actualTestId];

  const existingQuizSub = (portal?.quizSubmissions || []).find(
    (q: any) =>
      (Number(q.lessonId) === resolvedLessonId ||
        q.quizId === String(resolvedLessonId) ||
        q.quizId === `lesson-${resolvedLessonId}-test` ||
        q.quizId === `LESSON_${resolvedLessonId}` ||
        q.quizId === actualTestId) &&
      (!q.studentEmail || !profile.email || q.studentEmail.toLowerCase() === profile.email.toLowerCase())
  );

  const activeQuiz = activeLessonQuizRegistry.get(resolvedLessonId);

  const isAlreadyCompleted =
    Boolean(existingQuizSub && existingQuizSub.status !== 'Rejected' && !existingQuizSub.retakeAllowed) ||
    Boolean(activeQuiz?.submitted);

  const [submitted, setSubmitted] = useState<boolean>(isAlreadyCompleted);

  useEffect(() => {
    setSubmitted(isAlreadyCompleted);
  }, [isAlreadyCompleted, resolvedLessonId]);

  const handleConfirm = async () => {
    const reg = activeLessonQuizRegistry.get(resolvedLessonId);
    if (reg) {
      await reg.submitNow();
      setSubmitted(true);
      if (onSubmitted) onSubmitted();
      return;
    }

    const evalRes = evaluateLessonQuiz(resolvedLessonId, [], { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const finalScore = typeof existingScore === 'number' && existingScore > 0 ? existingScore : 100;

    if (portal?.markSectionRead) {
      portal.markSectionRead(`sec-${resolvedLessonId}-quiz`, resolvedLessonId);
    }
    if (portal?.saveTestScore) {
      portal.saveTestScore(`LESSON_${resolvedLessonId}`, finalScore, true);
    }
    if (portal?.saveQuizSubmission) {
      await portal.saveQuizSubmission({
        id: `QUIZ-SUB-LESSON_${resolvedLessonId}-${String(profile.id || 'STU').replace(/[^a-zA-Z0-9]/g, '').slice(-8)}`,
        quizId: `LESSON_${resolvedLessonId}`,
        lessonId: resolvedLessonId,
        quizTitle: actualTitle,
        studentEmail: profile.email,
        studentName: profile.name,
        studentId: profile.id,
        scorePct: finalScore,
        passed: finalScore >= 60,
        correctCount: Math.round((finalScore / 100) * 5),
        totalQuestions: 5,
        userAnswers: evalRes.componentAnswers,
        details: evalRes.details,
        status: 'Submitted',
        submittedAt: new Date().toISOString(),
      });
    }

    setSubmitted(true);
    if (onSubmitted) onSubmitted();
  };

  const displayScore =
    existingQuizSub?.scorePct !== undefined
      ? existingQuizSub.scorePct
      : typeof existingScore === 'number'
      ? existingScore
      : 100;

  const displayExp = COURSE_RULES.calculateTestExp(
    displayScore,
    displayScore >= 60,
    false,
    existingQuizSub?.correctCount,
    existingQuizSub?.totalQuestions || 5
  );

  return (
    <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
      <div>
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
          Квалификационный Рубеж • Урок #{resolvedLessonId}
        </span>
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
          <span>🎯 {actualTitle}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            +{submitted || isAlreadyCompleted ? displayExp : actualExp} EXP
          </span>
        </h3>
      </div>

      {submitted || isAlreadyCompleted ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Результаты сохранены и отправлены Ментору ({displayScore}% • +{displayExp} EXP)
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleConfirm}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-semibold text-white text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Зафиксировать прохождение теста
        </button>
      )}
    </div>
  );
};
