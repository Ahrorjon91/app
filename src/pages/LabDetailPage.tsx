import React, { useState, useRef, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { AttachedReportFile, SubmissionStatus } from '../types';
import { normalizeAttachedFiles } from '../lib/attachmentStorage';
import { COURSE_RULES } from '../lib/courseRules';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Clock,
  Server,
  Cpu,
  Check,
  Zap,
  Sparkles,
  Upload,
  Image as ImageIcon,
  FileText,
  Send,
  Award,
  Eye,
  Trash2,
  AlertCircle,
  X,
  Bell,
  Download,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  FolderPlus,
  ExternalLink
} from 'lucide-react';

const createUniqueId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const LabDetailPage: React.FC = () => {
  const {
    selectedLabId,
    labs,
    toggleLabTask,
    completeLab,
    submitLabReport,
    downloadFileAttachment,
    getPersistentAttachmentsForLab,
    setActivePage,
    setAiDrawerOpen,
    setAiMode,
    profile
  } = usePortal();

  const lab = labs.find((l) => l.id === selectedLabId) || labs[0];

  const [showHintId, setShowHintId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Screenshots state
  const [screenshotList, setScreenshotList] = useState<string[]>(() => {
    if (lab.screenshots && lab.screenshots.length > 0) return lab.screenshots;
    return [
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ];
  });
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');
  const [showAddScreenshotModal, setShowAddScreenshotModal] = useState(false);
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);

  // Attached files state
  const [attachedFiles, setAttachedFiles] = useState<AttachedReportFile[]>(() => {
    const normalized = normalizeAttachedFiles(lab.attachedFiles);
    if (normalized.length > 0) return normalized;
    return [
      {
        id: '1',
        name: `DevOps_Lab_${lab.id}_Report_${String(profile.name || 'Student').replace(/\s+/g, '_')}.pdf`,
        size: '1.4 MB',
        type: 'pdf'
      },
      {
        id: '2',
        name: `Architecture_Topology_Diagram.pptx`,
        size: '2.8 MB',
        type: 'ppt'
      }
    ];
  });

  // Preview file modal state
  const [activePreviewFile, setActivePreviewFile] = useState<AttachedReportFile | null>(null);

  // PDF report state
  const [pdfAttached, setPdfAttached] = useState<boolean>(() => Boolean(lab.pdfReportName));
  const [pdfFileName, setPdfFileName] = useState<string>(
    lab.pdfReportName || `DevOps_Lab_${lab.id}_Report_${String(profile.name || 'Student').replace(/\s+/g, '_')}.pdf`
  );

  // Submission state
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(
    (lab.submissionStatus as SubmissionStatus) || 'Not Submitted'
  );
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (lab.screenshots && lab.screenshots.length > 0) {
      setScreenshotList(lab.screenshots);
    }
    const normalized = normalizeAttachedFiles(lab.attachedFiles);
    if (normalized.length > 0) {
      setAttachedFiles(normalized);
    } else {
      getPersistentAttachmentsForLab(lab.id)
        .then((saved) => {
          if (isMounted && saved && saved.length > 0) {
            setAttachedFiles(normalizeAttachedFiles(saved));
          }
        })
        .catch(() => {});
    }
    if (lab.pdfReportName) {
      setPdfAttached(true);
      setPdfFileName(lab.pdfReportName);
    }
    if (lab.submissionStatus) {
      setSubmissionStatus(lab.submissionStatus);
    }
    return () => {
      isMounted = false;
    };
  }, [lab.id, lab.submissionStatus, lab.pdfReportName]);

  // Download File Helper
  const downloadAttachedFile = (file: AttachedReportFile) => {
    downloadFileAttachment(file);
  };

  // Download Screenshot Helper
  const downloadScreenshot = (url: string, index: number) => {
    const fileName = `Lab_${lab.id}_Screenshot_${index + 1}.jpg`;
    if (url.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
        } catch {}
      }, 500);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle local file selection from PC or Mobile directory
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: AttachedReportFile['type'] = 'other';

      if (['pdf'].includes(ext)) type = 'pdf';
      else if (['doc', 'docx'].includes(ext)) type = 'docx';
      else if (['txt', 'log', 'md'].includes(ext)) type = 'txt';
      else if (['ppt', 'pptx'].includes(ext)) type = 'ppt';
      else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext) || file.type.startsWith('image/')) type = 'image';

      const fileSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const attachedObj: AttachedReportFile = {
          id: createUniqueId(),
          name: file.name,
          size: fileSize,
          type,
          dataUrl
        };
        setAttachedFiles((prev) => [...prev, attachedObj]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddSampleFile = (type: AttachedReportFile['type'], name: string) => {
    const newFile: AttachedReportFile = {
      id: createUniqueId(),
      name,
      size: type === 'pdf' ? '1.8 MB' : type === 'docx' ? '850 KB' : type === 'ppt' ? '3.2 MB' : '120 KB',
      type
    };
    setAttachedFiles((prev) => [...prev, newFile]);
  };

  const handleRemoveAttachedFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleFinishLab = () => {
    completeLab(lab.id);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleAddScreenshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScreenshotUrl.trim()) return;
    const updated = [...screenshotList, newScreenshotUrl.trim()];
    setScreenshotList(updated);
    setNewScreenshotUrl('');
    setShowAddScreenshotModal(false);
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshotList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmitToMentor = () => {
    submitLabReport(lab.id, screenshotList, pdfFileName, attachedFiles);
    setSubmissionStatus('Under Review');
    setNotificationSent(true);
    setTimeout(() => {
      setNotificationSent(false);
    }, 4000);
  };

  const completedTasksCount = lab.tasks.filter((t) => t.completed).length;

  const getFileIcon = (type: AttachedReportFile['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'docx':
        return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'ppt':
        return <FileSpreadsheet className="w-5 h-5 text-amber-400" />;
      case 'txt':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-cyan-400" />;
      default:
        return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hidden File Input for Device Upload (PC / Phone) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleLocalFileUpload}
        accept="image/*,.pdf,.docx,.txt,.ppt,.pptx"
        multiple
        className="hidden"
      />

      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('lesson-detail')}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#f5f5f7] hover:text-white transition-colors bg-[#161618] px-4 py-2 rounded-xl border border-white/[0.08]"
          >
            <ArrowLeft className="w-4 h-4 text-[#86868b]" />
            <span>Вернуться к Уроку</span>
          </button>
          <button
            onClick={() => setActivePage('labs')}
            className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          >
            <span>К списку лаб</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://t.me/aivioratj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] text-xs font-medium border border-white/[0.08] flex items-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4 text-[#0071e3]" />
            <span>Менеджер в Telegram</span>
          </a>
          <button
            onClick={handleFinishLab}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors active:scale-95 shadow-sm ${
              submissionStatus === 'Approved'
                ? 'bg-[#002a14] text-[#30d158] border border-[#30d158]/40'
                : 'bg-[#0071e3] hover:bg-[#0077ed] text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {submissionStatus === 'Approved'
                ? `✓ Подтверждено Ментором (+${lab.score && lab.score >= 88 ? 100 : lab.score && lab.score >= 63 ? 75 : lab.score && lab.score > 0 ? 50 : 100} EXP)`
                : 'Отметить шаги (50 / 75 / 100 EXP)'}
            </span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#002a14] text-[#30d158] border border-[#30d158]/40 font-mono tabular-nums font-semibold">
            ЛАБОРАТОРНАЯ #{lab.id}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.06] text-[#86868b] border border-white/[0.08] font-medium">
            {lab.difficulty} Difficulty
          </span>

          {submissionStatus === 'Approved' ? (
            <span className="px-3 py-1 rounded-full bg-[#002a14] text-[#30d158] border border-[#30d158]/40 font-semibold flex items-center gap-1.5 ml-auto">
              <ShieldCheck className="w-3.5 h-3.5" /> Подтверждено Ментором (+{lab.score && lab.score >= 88 ? 100 : lab.score && lab.score >= 63 ? 75 : lab.score && lab.score > 0 ? 50 : 100} EXP)
            </span>
          ) : submissionStatus === 'Under Review' || submissionStatus === 'Submitted' ? (
            <span className="px-3 py-1 rounded-full bg-[#311400] text-[#ff791a] border border-[#ff791a]/40 font-semibold flex items-center gap-1.5 ml-auto">
              <Clock className="w-3.5 h-3.5" /> На проверке у Ментора
            </span>
          ) : (
            <span className="text-[#86868b] flex items-center gap-1 ml-auto font-mono tabular-nums">
              <Clock className="w-4 h-4" /> ~{lab.estimatedMinutes} минут
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight">{lab.titleRu || lab.title}</h1>
        <p className="text-sm text-[#86868b] leading-relaxed max-w-4xl">{lab.scenarioRu || lab.scenario}</p>

        {lab.wowMoment && (
          <div className="p-4 rounded-2xl bg-[#311400]/40 border border-[#ff791a]/30 text-[#ff791a] text-xs sm:text-sm flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#ff791a] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#ff791a] mr-2">⚡ WOW-момент:</span>
              <span className="text-[#f5f5f7]">{lab.wowMoment}</span>
            </div>
          </div>
        )}

        {/* System Specs Badge */}
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono tabular-nums text-[#86868b] border-t border-white/[0.08]">
          <span className="flex items-center gap-1.5">
            <Server className="w-4 h-4 text-[#0071e3]" /> Host: devops-node-01.academy
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#bf5af2]" /> OS: Ubuntu 24.04 LTS
          </span>
        </div>
      </div>

      {/* Main Section: Clean Tasks Checklist */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Детализированный список задач и инструкции
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Выполните приведенные ниже шаги. По завершении всех задач прикрепите файлы отчета и отправьте работу ментору.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono font-bold">
            Выполнено: {completedTasksCount} / {lab.tasks.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(lab.tasks || []).map((task, idx) => {
            const hintText = task.hint || (lab.hints && lab.hints[idx]) || lab.hints?.[0];
            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                  task.completed
                    ? 'bg-slate-800/80 border-slate-700/80'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleLabTask(lab.id, task.id)}
                      className={`mt-0.5 p-1.5 rounded-lg border transition-all shrink-0 ${
                        task.completed
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white block leading-snug">
                        Задача #{idx + 1}: {task.descriptionRu || task.text}
                      </span>
                      {task.expectedCommand && (
                        <div className="pt-1">
                          <span className="text-[10px] text-slate-400 block font-mono mb-0.5">Рекомендуемая команда:</span>
                          <code className="text-[11px] font-mono bg-slate-950 px-2.5 py-1 rounded-lg text-emerald-400 border border-slate-800 block w-fit selection:bg-cyan-500 selection:text-black">
                            {task.expectedCommand}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hint Toggle */}
                {hintText && (
                  <div className="pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => setShowHintId(showHintId === task.id ? null : task.id)}
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showHintId === task.id ? 'Скрыть подсказку' : 'Показать подсказку'}</span>
                    </button>
                    {showHintId === task.id && (
                      <p className="mt-2 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-200 animate-in fade-in leading-relaxed">
                        💡 {hintText}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: Attachments (Local PC / Mobile File Upload) & Submit */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" /> Прикрепление скриншотов и документов (PDF, DOCX, TXT, PPT, Фото)
            </h2>
            <p className="text-xs text-slate-400">
              Выбирайте файлы прямо из файловой системы Вашего ПК или смартфона. Принимаются форматы PDF, DOCX, TXT, PPTX и скриншоты.
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 shrink-0 transition-all"
          >
            <FolderPlus className="w-4 h-4" />
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
                  Портал успешно зарегистрировал Лабораторную работу #{lab.id} с прикрепленными документами и отправил уведомление ментору ({profile.mentorName}).
                </p>
              </div>
            </div>
            <button onClick={() => setNotificationSent(false)} className="text-emerald-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Grid: Attached Local Documents & Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Attached Local Documents */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            {(() => {
              const safeLabFiles = Array.isArray(attachedFiles) ? attachedFiles : normalizeAttachedFiles(attachedFiles);
              return (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" /> Загруженные файлы и отчеты ({safeLabFiles.length})
                    </h3>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>+ Добавить еще</span>
                    </button>
                  </div>

                  {safeLabFiles.length === 0 ? (
                    <div className="p-6 text-center rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-500 text-xs space-y-2">
                      <p>Файлы пока не выбраны.</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-[11px] font-semibold"
                      >
                        Выбрать файл с устройства
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {safeLabFiles.map((file, fileIdx) => (
                        <div
                          key={`lab-file-${file.id || 'att'}-${fileIdx}`}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-mono font-bold text-white text-[11px] truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                                {file.type} • {file.size}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {file.url && (file.url.includes('drive.google.com') || file.url.includes('google.com')) && (
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1"
                                title="Открыть на Google Диске"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline text-[10px]">Диск</span>
                              </a>
                            )}
                            <button
                              onClick={() => downloadAttachedFile(file)}
                              className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold flex items-center gap-1"
                              title="Скачать файл"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[10px]">Скачать</span>
                            </button>
                            <button
                              onClick={() => setActivePreviewFile(file)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold"
                              title="Просмотреть"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleRemoveAttachedFile(file.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 text-[11px]"
                              title="Удалить"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* 2. Screenshots Section */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" /> Скриншоты выполнения ({screenshotList.length})
              </h3>
              <button
                onClick={() => setShowAddScreenshotModal(true)}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-md"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ Ссылка на фото</span>
              </button>
            </div>

            {screenshotList.filter((u): u is string => Boolean(u && u.trim())).length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-slate-500 text-xs">
                Скриншоты не добавлены.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {(screenshotList || []).filter((u): u is string => Boolean(u && u.trim())).map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-900 h-28">
                    <img
                      src={url}
                      alt={`Screenshot #${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setActivePreviewImage(url)}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => downloadScreenshot(url, idx)}
                        className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white"
                        title="Скачать скриншот"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActivePreviewImage(url)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                        title="Просмотреть"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemoveScreenshot(idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-white"
                        title="Удалить"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-white text-[9px] font-mono">
                      Скриншот #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send Notification to Mentor Action Bar */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Send className="w-4 h-4 text-cyan-400" /> Отправить лабораторную работу Ментору ({profile.mentorName})
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              Нажмите кнопку ниже, чтобы портал отправил уведомление Вашему ментору с прикрепленными файлами и скриншотами.
            </p>
          </div>

          <button
            onClick={handleSubmitToMentor}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>🚀 Отправить отчет и уведомить Ментора</span>
          </button>
        </div>

        {/* STUDENT VIEW: Submission Status Card */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Статус проверки лабораторной работы
            </h3>
          </div>

          {submissionStatus === 'Approved' ? (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 space-y-2">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Лабораторная работа успешно Зачтена Ментором!</h4>
                  <p className="text-xs text-emerald-300">
                    Оценка: <strong className="text-emerald-400 text-sm">{COURSE_RULES.calculateMentorExp(lab.score, 'Approved', lab.mentorFeedback)} / 100 EXP</strong>
                  </p>
                </div>
              </div>
              {lab.mentorFeedback && (
                <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-800/60 text-xs text-slate-200 mt-2">
                  <span className="font-bold text-emerald-400 block mb-0.5">Комментарий ментора:</span>
                  <p className="italic">{lab.mentorFeedback}</p>
                </div>
              )}
            </div>
          ) : submissionStatus === 'Under Review' ? (
            <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
              <div>
                <h4 className="text-sm font-bold text-white">Работа отправлена и находится на проверке у Ментора</h4>
                <p className="text-xs text-amber-300">
                  Ваш персональный ментор ({profile.mentorName}) проверит загруженные файлы, скриншоты и выставит итоговую оценку в реестр.
                </p>
              </div>
            </div>
          ) : submissionStatus === 'Rejected' ? (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Отчет отправлен ментором на доработку</h4>
                  <p className="text-xs text-rose-300">Пожалуйста, внесите необходимые правки и отправьте работу повторно.</p>
                </div>
              </div>
              {lab.mentorFeedback && (
                <div className="p-3 rounded-lg bg-slate-900 border border-rose-800 text-xs text-slate-200">
                  <span className="font-bold text-rose-400 block mb-0.5">Замечания ментора:</span>
                  <p>{lab.mentorFeedback}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Отчет еще не отправлен. После прикрепления файлов нажмите кнопку «Отправить отчет и уведомить Ментора».
              </span>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Add Screenshot URL */}
      {showAddScreenshotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 relative animate-in zoom-in-95 shadow-2xl">
            <button
              onClick={() => setShowAddScreenshotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" /> Прикрепить скриншот выполнения
            </h3>

            <form onSubmit={handleAddScreenshot} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Ссылка на скриншот (URL) или выберите пример</label>
                <input
                  type="url"
                  value={newScreenshotUrl}
                  onChange={(e) => setNewScreenshotUrl(e.target.value)}
                  placeholder="https://... (изображение терминала / работы)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-slate-400">Быстрые варианты скриншотов:</span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setNewScreenshotUrl('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80')
                    }
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-left border border-slate-800 flex items-center gap-2 text-[11px]"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Скриншот терминала и вывода команды CLI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewScreenshotUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80')
                    }
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-left border border-slate-800 flex items-center gap-2 text-[11px]"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Подтверждение успешного запуска сервиса</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Сохранить скриншот
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Fullscreen Image Preview */}
      {Boolean(activePreviewImage) && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePreviewImage!}
              alt="Screenshot Preview"
              className="w-full max-h-[80vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-xs text-slate-300">
              <span>Скриншот подлинности выполнения задачи</span>
              <div className="flex items-center gap-3">
                <a
                  href={activePreviewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Открыть в новой вкладке</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: File Details & Download Modal */}
      {activePreviewFile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 relative animate-in zoom-in-95 shadow-2xl">
            <button
              onClick={() => setActivePreviewFile(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                {getFileIcon(activePreviewFile.type)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{activePreviewFile.name}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Формат: {activePreviewFile.type.toUpperCase()} • Размер: {activePreviewFile.size}
                </p>
              </div>
            </div>

            {Boolean(activePreviewFile.dataUrl) && activePreviewFile.type === 'image' ? (
              <img
                src={activePreviewFile.dataUrl!}
                alt="File Preview"
                className="w-full max-h-80 object-contain rounded-xl bg-black border border-slate-800"
              />
            ) : (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 font-mono leading-relaxed">
                <p className="text-emerald-400 font-bold">✓ Файл прикреплен и готов к скачиванию ментором</p>
                <p className="text-slate-400">
                  Содержимое файла завалидировано платформой AI for LIFE Academy. Для проверки нажмите кнопку «Скачать файл».
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => downloadAttachedFile(activePreviewFile)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Скачать файл</span>
              </button>
              <button
                onClick={() => setActivePreviewFile(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
