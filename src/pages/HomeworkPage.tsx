import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import { AttachedReportFile, Lesson, HomeworkSubmission } from '../types';
import { normalizeAttachedFiles } from '../lib/attachmentStorage';
import {
  FileCheck,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  Send,
  X,
  Lock,
  ArrowLeft,
  FileSpreadsheet,
  FileCode,
  Paperclip,
  Download,
  HardDrive,
  CloudCheck,
  FolderSync
} from 'lucide-react';

interface HomeworkCardItemProps {
  lesson: Lesson;
  unlocked: boolean;
  rawHw?: HomeworkSubmission;
  onOpenSubmitModal: (lessonId: number) => void;
  downloadFileAttachment: (file: AttachedReportFile) => void;
  getPersistentAttachmentsForLesson: (lessonId: number, studentEmail?: string) => Promise<AttachedReportFile[]>;
  currentEmail: string;
}

const HomeworkCardItem: React.FC<HomeworkCardItemProps> = ({
  lesson,
  unlocked,
  rawHw,
  onOpenSubmitModal,
  downloadFileAttachment,
  getPersistentAttachmentsForLesson,
  currentEmail
}) => {
  const isSubmitted = !!rawHw && rawHw.status !== 'Not Submitted';
  const [persistentFiles, setPersistentFiles] = useState<AttachedReportFile[]>(() =>
    normalizeAttachedFiles(rawHw?.attachedFiles)
  );

  useEffect(() => {
    let isMounted = true;
    const normalized = normalizeAttachedFiles(rawHw?.attachedFiles);
    if (normalized.length > 0) {
      setPersistentFiles(normalized);
    } else if (isSubmitted) {
      getPersistentAttachmentsForLesson(lesson.id, currentEmail)
        .then((files) => {
          if (isMounted && files && files.length > 0) {
            setPersistentFiles(normalizeAttachedFiles(files));
          }
        })
        .catch(() => {});
    } else {
      setPersistentFiles([]);
    }
    return () => {
      isMounted = false;
    };
  }, [lesson.id, rawHw?.submittedAt, rawHw?.status, rawHw?.attachedFiles?.length, isSubmitted, currentEmail]);

  const safePersistentFiles = Array.isArray(persistentFiles) ? persistentFiles : normalizeAttachedFiles(persistentFiles);

  return (
    <div
      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
        unlocked
          ? isSubmitted
            ? 'bg-slate-900/90 border-slate-800/80 hover:border-amber-500/40'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
          : 'bg-slate-900/40 border-slate-800/50 opacity-60'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-400 text-[10px] font-bold font-mono border border-amber-800/40">
            ДЗ УРОК #{lesson.id}
          </span>
          {unlocked ? (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                (rawHw?.status as any) === 'Approved' || (rawHw?.status as any) === 'Graded'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                  : isSubmitted
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {rawHw?.status === 'Approved'
                ? `✓ Подтверждено (+${rawHw.score && rawHw.score >= 88 ? 100 : rawHw.score && rawHw.score >= 63 ? 75 : rawHw.score && rawHw.score > 0 ? 50 : 100} EXP)`
                : rawHw?.status === 'Rejected'
                ? 'На доработке'
                : isSubmitted
                ? '⏳ На проверке (50/75/100 EXP)'
                : 'Ожидает сдачи'}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Заблокировано
            </span>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">{lesson.titleRu}</h3>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{lesson.title}</p>
        </div>

        {isSubmitted && rawHw && (
          <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60 text-xs space-y-2">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Сдано: {rawHw.submittedAt}</span>
              {rawHw.status === 'Approved' ? (
                <span className="text-emerald-400 font-bold text-xs">
                  Оценка Ментора: +{rawHw.score && rawHw.score >= 88 ? 100 : rawHw.score && rawHw.score >= 63 ? 75 : rawHw.score && rawHw.score > 0 ? 50 : 100} EXP
                </span>
              ) : rawHw.status === 'Rejected' ? (
                <span className="text-rose-400 font-bold text-xs">На доработке (0 EXP)</span>
              ) : (
                <span className="text-amber-400 font-bold text-[11px]">Ожидает оценки: 50 / 75 / 100 EXP</span>
              )}
            </div>

            {/* Attached files display with download */}
            {safePersistentFiles && safePersistentFiles.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-700/40">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold flex items-center gap-1">
                    <Paperclip className="w-3 h-3 text-amber-400" /> Файлы отчета ({safePersistentFiles.length}):
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono">Сохранено</span>
                </div>
                <div className="space-y-1">
                  {safePersistentFiles.map((f) => (
                    <div
                      key={f.id}
                      className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-center justify-between gap-1 text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate text-slate-200">{f.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono">({f.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadFileAttachment(f)}
                        title="Скачать файл"
                        className="p-1 rounded-md hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rawHw.fileUrl && (
              <div className="pt-1 border-t border-slate-700/40 text-[11px] truncate">
                <span className="text-slate-400 text-[10px] block">Ссылка на проект:</span>
                <a
                  href={rawHw.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline truncate block"
                >
                  {rawHw.fileUrl}
                </a>
              </div>
            )}

            {rawHw.mentorFeedback && (
              <p className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-700/40">
                "{rawHw.mentorFeedback}"
              </p>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-500" /> 2-4 часа
        </span>
        {unlocked ? (
          <button
            onClick={() => onOpenSubmitModal(lesson.id)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-amber-600/20"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isSubmitted ? 'Пересдать' : 'Загрузить ДЗ'}</span>
          </button>
        ) : (
          <button
            disabled
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed border border-slate-700/60"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Заблокировано (Урок #{lesson.id})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const HomeworkPage: React.FC = () => {
  const {
    lessons,
    homeworks,
    homeworkSubmissions,
    submitHomework,
    downloadFileAttachment,
    getPersistentAttachmentsForLesson,
    isHomeworkUnlocked,
    selectedLessonId: contextSelectedLessonId,
    setSelectedLessonId: setContextSelectedLessonId,
    setActivePage,
    profile
  } = usePortal();

  const [selectedLessonId, setSelectedLessonId] = useState<number>(() => contextSelectedLessonId || 1);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [fileUrlInput, setFileUrlInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedReportFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentEmail = (profile?.email || 'student@devopspro.tech').toLowerCase().trim();
  const currentId = profile?.id || '';

  useEffect(() => {
    if (contextSelectedLessonId) {
      setSelectedLessonId(contextSelectedLessonId);
    }
  }, [contextSelectedLessonId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let type: AttachedReportFile['type'] = 'other';
      if (ext === 'pdf') type = 'pdf';
      else if (ext === 'docx' || ext === 'doc') type = 'docx';
      else if (ext === 'txt') type = 'txt';
      else if (ext === 'ppt' || ext === 'pptx') type = 'ppt';
      else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) type = 'image';

      const reader = new FileReader();
      reader.onload = () => {
        const newFile: AttachedReportFile = {
          id: `FILE-HW-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type,
          dataUrl: reader.result as string
        };
        setAttachedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleOpenSubmitModal = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    // Pre-populate if existing
    const existing = homeworks[lessonId] || homeworkSubmissions.find((h) => h.lessonId === lessonId && ((h.studentEmail && h.studentEmail.toLowerCase() === currentEmail) || (h.studentId && h.studentId === currentId)));
    setFileUrlInput(existing?.fileUrl || '');
    setNotesInput(existing?.studentNotes || '');
    if (existing?.attachedFiles && existing.attachedFiles.length > 0) {
      setAttachedFiles(normalizeAttachedFiles(existing.attachedFiles));
    } else {
      getPersistentAttachmentsForLesson(lessonId, currentEmail).then((saved) => {
        if (saved && saved.length > 0) setAttachedFiles(normalizeAttachedFiles(saved));
        else setAttachedFiles([]);
      }).catch(() => setAttachedFiles([]));
    }
    setShowSubmitModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitHomework(
      selectedLessonId,
      fileUrlInput || '',
      notesInput,
      attachedFiles
    );

    setShowSubmitModal(false);
    setFileUrlInput('');
    setNotesInput('');
    setAttachedFiles([]);
    setContextSelectedLessonId(selectedLessonId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls & Navigation Back to Lesson */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setContextSelectedLessonId(selectedLessonId);
            setActivePage('lesson-detail');
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться к Уроку #{selectedLessonId}</span>
        </button>

        <a
          href="https://t.me/aivioratj"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4 text-blue-200" />
          <span>Менеджер в Telegram</span>
        </a>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-amber-400" /> Сдача Домашних Заданий (24 ДЗ)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Загрузка отчетов, топологий и проверка ментором курса
          </p>
        </div>

        {/* Storage Location Badge Info */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
          <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Файлы сохраняются в: <strong>IndexedDB Vault</strong> + <strong>Google Drive</strong></span>
        </div>
      </div>

      {/* Homework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => {
          const unlocked = isHomeworkUnlocked(lesson.id);
          const rawHw = homeworks[lesson.id] || homeworkSubmissions.find((h) => h.lessonId === lesson.id && ((h.studentEmail && h.studentEmail.toLowerCase() === currentEmail) || (h.studentId && h.studentId === currentId)));
          const isMine = !rawHw || !rawHw.studentEmail || (rawHw.studentEmail.toLowerCase() === currentEmail) || (rawHw.studentId === currentId);
          const hw = isMine ? rawHw : undefined;

          return (
            <HomeworkCardItem
              key={lesson.id}
              lesson={lesson}
              unlocked={unlocked}
              rawHw={hw}
              onOpenSubmitModal={handleOpenSubmitModal}
              downloadFileAttachment={downloadFileAttachment}
              getPersistentAttachmentsForLesson={getPersistentAttachmentsForLesson}
              currentEmail={currentEmail}
            />
          );
        })}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" /> Загрузка ДЗ к Уроку #{selectedLessonId}
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Ссылка на Google Drive, GitHub или архив репозитория
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/devops-lab-repo"
                  value={fileUrlInput}
                  onChange={(e) => setFileUrlInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                />
              </div>

              {/* Local File Attachments */}
              <div className="space-y-2">
                <div>
                  <label className="block text-slate-300 font-semibold">
                    Прикрепить файлы отчета (PDF, DOCX, TXT, PPT, Картинки, Архивы)
                  </label>
                  <p className="text-[10px] text-slate-400">Файлы сохраняются в IndexedDB браузера и в папку Google Drive студента</p>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept=".pdf,.docx,.doc,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.zip,.tar,.gz,.json,.yaml"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Paperclip className="w-4 h-4 text-amber-400" />
                  <span>Выбрать файлы с устройства (ПК / Телефон)</span>
                </button>

                {(() => {
                  const safeModalFiles = Array.isArray(attachedFiles) ? attachedFiles : normalizeAttachedFiles(attachedFiles);
                  if (safeModalFiles.length === 0) return null;
                  return (
                    <div className="space-y-1.5 pt-1">
                      {safeModalFiles.map((f, fIdx) => (
                        <div
                          key={`hw-modal-file-${f.id || 'att'}-${fIdx}`}
                          className="p-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="truncate text-slate-200 font-medium">{f.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({f.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(f.id)}
                            className="text-slate-400 hover:text-rose-400 shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Комментарий или заметка ментору
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишите выполненные задачи, конфигурационные файлы или возникшие сложности..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить ментору</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
