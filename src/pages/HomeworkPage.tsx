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
  HardDrive
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
      className={`p-5 rounded-[28px] border transition-colors flex flex-col justify-between space-y-4 ${
        unlocked
          ? isSubmitted
            ? 'bg-[#161618] border-[#ff791b]/30 hover:border-[#ff791b]/60'
            : 'bg-[#161618] border-white/[0.08] hover:border-white/[0.18]'
          : 'bg-[#0a0a0b] border-[#1c1c1f] opacity-55'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#ff791b] text-[10px] font-mono font-medium border border-[#262629]">
            ДЗ УРОК #{lesson.id}
          </span>
          {unlocked ? (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                (rawHw?.status as any) === 'Approved' || (rawHw?.status as any) === 'Graded'
                  ? 'bg-[#1c2e22] text-[#00d959]'
                  : isSubmitted
                  ? 'bg-[#1c2333] text-[#0071e3]'
                  : 'bg-[#1c1c1f] text-[#86868b]'
              }`}
            >
              {rawHw?.status === 'Approved'
                ? `✓ Подтверждено (+${rawHw.score && rawHw.score >= 88 ? 100 : rawHw.score && rawHw.score >= 63 ? 75 : rawHw.score && rawHw.score > 0 ? 50 : 100} EXP)`
                : rawHw?.status === 'Rejected'
                ? 'На доработке'
                : isSubmitted
                ? 'На проверке'
                : 'Ожидает сдачи'}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1c1c1f] text-[#6e6e73] flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#6e6e73]" /> Закрыто
            </span>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#f5f5f7] leading-snug">{lesson.titleRu}</h3>
          <p className="text-[11px] text-[#86868b] font-mono mt-0.5 line-clamp-1">{lesson.title}</p>
        </div>

        {isSubmitted && rawHw && (
          <div className="p-3.5 rounded-[18px] bg-[#000000] border border-[#262629] text-xs space-y-2">
            <div className="flex justify-between items-center text-[10px] text-[#86868b] tabular-nums">
              <span>Сдано: {rawHw.submittedAt}</span>
              {rawHw.status === 'Approved' ? (
                <span className="text-[#00d959] font-medium text-xs">
                  +{rawHw.score && rawHw.score >= 88 ? 100 : rawHw.score && rawHw.score >= 63 ? 75 : rawHw.score && rawHw.score > 0 ? 50 : 100} EXP
                </span>
              ) : rawHw.status === 'Rejected' ? (
                <span className="text-rose-400 font-medium text-xs">На доработке</span>
              ) : (
                <span className="text-[#ff791b] font-medium text-[11px]">На оценке</span>
              )}
            </div>

            {/* Attached files */}
            {safePersistentFiles && safePersistentFiles.length > 0 && (
              <div className="space-y-1 pt-1.5 border-t border-[#262629]">
                <div className="flex items-center justify-between text-[10px] text-[#86868b]">
                  <span className="font-medium flex items-center gap-1">
                    <Paperclip className="w-3 h-3 text-[#ff791b]" /> Файлы ({safePersistentFiles.length}):
                  </span>
                  <span className="text-[9px] text-[#00d959] font-mono">Сохранено</span>
                </div>
                <div className="space-y-1">
                  {safePersistentFiles.map((f) => (
                    <div
                      key={f.id}
                      className="p-1.5 rounded-lg bg-[#161618] border border-[#262629] flex items-center justify-between gap-1 text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileText className="w-3.5 h-3.5 text-[#ff791b] shrink-0" />
                        <span className="truncate text-[#f5f5f7]">{f.name}</span>
                        <span className="text-[9px] text-[#86868b] font-mono">({f.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadFileAttachment(f)}
                        title="Скачать файл"
                        className="p-1 rounded hover:bg-[#262629] text-[#0071e3] transition-colors shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rawHw.fileUrl && (
              <div className="pt-1 border-t border-[#262629] text-[11px] truncate">
                <span className="text-[#86868b] text-[10px] block">Ссылка:</span>
                <a
                  href={rawHw.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0071e3] hover:underline truncate block"
                >
                  {rawHw.fileUrl}
                </a>
              </div>
            )}

            {rawHw.mentorFeedback && (
              <p className="text-[11px] text-[#86868b] italic pt-1 border-t border-[#262629]">
                "{rawHw.mentorFeedback}"
              </p>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#262629] flex items-center justify-between">
        <span className="text-xs text-[#86868b] font-mono flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> 2-4 часа
        </span>
        {unlocked ? (
          <button
            onClick={() => onOpenSubmitModal(lesson.id)}
            className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isSubmitted ? 'Пересдать' : 'Загрузить ДЗ'}</span>
          </button>
        ) : (
          <button
            disabled
            className="px-3.5 py-1.5 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs flex items-center gap-1.5 cursor-not-allowed border border-[#262629]"
          >
            <Lock className="w-3 h-3" />
            <span>Закрыто</span>
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
    <div className="space-y-6 text-[#f5f5f7]">
      {/* Top Controls & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setContextSelectedLessonId(selectedLessonId);
            setActivePage('lesson-detail');
          }}
          className="flex items-center gap-2 text-xs font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors bg-[#1c1c1f] hover:bg-[#262629] px-4 py-2 rounded-full border border-[#333336] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Вернуться к Уроку #{selectedLessonId}</span>
        </button>

        <a
          href="https://t.me/aivioratj"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium flex items-center gap-2 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-[#0071e3]" />
          <span>Telegram</span>
        </a>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262629] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#ff791b]" /> Сдача Домашних Заданий (24 ДЗ)
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            Загрузка отчетов, ссылок на репозитории и проверка ментором
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000000] border border-[#262629] text-xs text-[#86868b]">
          <HardDrive className="w-3.5 h-3.5 text-[#ff791b] shrink-0" />
          <span>Хранилище: <strong className="text-[#f5f5f7]">IndexedDB</strong></span>
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#262629] pb-4">
              <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#0071e3]" /> Сдать ДЗ к Уроку #{selectedLessonId}
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#86868b] font-medium">
                  Ссылка на Google Drive, GitHub или сайт проекта
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={fileUrlInput}
                  onChange={(e) => setFileUrlInput(e.target.value)}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                />
              </div>

              {/* Local File Attachments */}
              <div className="space-y-2">
                <div>
                  <label className="block text-[#86868b] font-medium">
                    Прикрепить файлы отчета (PDF, DOCX, TXT, Архивы)
                  </label>
                  <p className="text-[10px] text-[#6e6e73]">Файлы сохраняются локально в безопасном хранилище</p>
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
                  className="w-full p-3 rounded-[20px] border border-dashed border-[#333336] hover:border-[#0071e3] bg-[#000000] text-[#86868b] hover:text-[#f5f5f7] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Paperclip className="w-4 h-4 text-[#0071e3]" />
                  <span>Выбрать файлы с устройства</span>
                </button>

                {(() => {
                  const safeModalFiles = Array.isArray(attachedFiles) ? attachedFiles : normalizeAttachedFiles(attachedFiles);
                  if (safeModalFiles.length === 0) return null;
                  return (
                    <div className="space-y-1.5 pt-1">
                      {safeModalFiles.map((f, fIdx) => (
                        <div
                          key={`hw-modal-file-${f.id || 'att'}-${fIdx}`}
                          className="p-2 rounded-xl bg-[#000000] border border-[#262629] flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                            <span className="truncate text-[#f5f5f7] font-medium">{f.name}</span>
                            <span className="text-[10px] text-[#86868b] font-mono">({f.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(f.id)}
                            className="text-[#86868b] hover:text-rose-400 shrink-0 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#86868b] font-medium">
                  Комментарий или заметка ментору
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишите выполненные задачи или возникшие вопросы..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-[18px] p-3 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] font-medium transition-colors cursor-pointer border border-[#262629]"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
