import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import { AVAILABLE_MENTORS, MentorInfo } from '../data/mentorData';
import { MentorGradingGuide } from '../components/MentorGradingGuide';
import { api } from '../lib/api';
import { COURSE_RULES } from '../lib/courseRules';
import { AttachedReportFile } from '../types';
import { triggerFileDownload } from '../lib/attachmentStorage';
import {
  Headphones, Calendar, Send, Award, Clock, CheckCircle2, MessageSquare,
  UserCheck, Linkedin, Phone, Mail, ExternalLink, Briefcase, GraduationCap,
  Layers, Server, ShieldCheck, Cpu, Database, Wrench, Code2, Globe, Camera, Upload, Link as LinkIcon, Calculator, BookOpen,
  FolderCheck, FileText, Download, Link2, FileCheck, ThumbsUp, ThumbsDown, AlertCircle, FileCode, FileSpreadsheet, Search, Filter, Sparkles
} from 'lucide-react';

export const MentorPage: React.FC = () => {
  const {
    setAiDrawerOpen,
    setAiMode,
    profile,
    updateProfile,
    labSubmissions,
    homeworkSubmissions,
    labs,
    lessons,
    reviewLab,
    reviewHomework
  } = usePortal() as any;
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-08-10');
  const [selectedTime, setSelectedTime] = useState('16:00');
  const [consultBooked, setConsultBooked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'projects' | 'education' | 'eval-rules'>('overview');

  // Submissions Review State
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(100);
  const [gradeFeedback, setGradeFeedback] = useState<string>('Работа проверена! Итоговая оценка: 100/100.');
  const [gradeSuccessMsg, setGradeSuccessMsg] = useState<string | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentMentor: MentorInfo = AVAILABLE_MENTORS[0];

  const [summaryLang, setSummaryLang] = useState<'ru' | 'en'>('ru');
  const [mentorAvatar, setMentorAvatar] = useState<string>(() => {
    try {
      return profile.mentorAvatarUrl || localStorage.getItem('mentor_avatar_url') || currentMentor.avatarUrl || '';
    } catch {
      return profile.mentorAvatarUrl || currentMentor.avatarUrl || '';
    }
  });

  React.useEffect(() => {
    if (profile.mentorAvatarUrl) {
      setMentorAvatar(profile.mentorAvatarUrl);
    }
  }, [profile.mentorAvatarUrl]);
  const [imgError, setImgError] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  const safeSetLocalStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn(`Failed to save ${key} to localStorage:`, err);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultBooked(true);

    api.bookMentorConsultation({
      studentName: profile.name || 'Студент',
      studentEmail: profile.email || 'student@devopspro.tech',
      date: selectedDate,
      time: selectedTime,
      topic: 'Индивидуальная менторская консультация',
    }).catch((err) => console.error('[MentorPage] Booking error:', err));

    const tgMsg = encodeURIComponent(
      `Здравствуйте, Ahrorjon! Хочу забронировать менторскую консультацию на ${selectedDate} в ${selectedTime}.`
    );
    const tgUrl = `https://t.me/itadminahror?text=${tgMsg}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
  };

  const compressAndSaveImage = (dataUrl: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const maxDim = 300;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.82);
        setMentorAvatar(compressed);
        safeSetLocalStorage('mentor_avatar_url', compressed);
        updateProfile({ mentorAvatarUrl: compressed });
      } else {
        setMentorAvatar(dataUrl);
        safeSetLocalStorage('mentor_avatar_url', dataUrl);
        updateProfile({ mentorAvatarUrl: dataUrl });
      }
    };
    img.onerror = () => {
      setMentorAvatar(dataUrl);
      safeSetLocalStorage('mentor_avatar_url', dataUrl);
      updateProfile({ mentorAvatarUrl: dataUrl });
    };
    img.src = dataUrl;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setImgError(false);
          compressAndSaveImage(result);
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = photoUrlInput.trim();
    if (url) {
      setMentorAvatar(url);
      safeSetLocalStorage('mentor_avatar_url', url);
      updateProfile({ mentorAvatarUrl: url });
      setImgError(false);
      setPhotoUrlInput('');
      setShowPhotoModal(false);
    }
  };

  const handleResetAvatar = () => {
    try {
      localStorage.removeItem('mentor_avatar_url');
    } catch (e) {
      console.warn('Failed to remove mentor_avatar_url from localStorage:', e);
    }
    const defaultUrl = currentMentor.avatarUrl || '';
    setMentorAvatar(defaultUrl);
    updateProfile({ mentorAvatarUrl: defaultUrl });
    setImgError(false);
    setShowPhotoModal(false);
  };

  const getFileIcon = (type?: string) => {
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
      default:
        return <FileText className="w-5 h-5 text-purple-400 shrink-0" />;
    }
  };

  // Aggregated submissions for Mentor Review
  const allSubmissionsList = useMemo(() => {
    const list: Array<{
      id: string;
      kind: 'lab' | 'homework';
      number: number;
      title: string;
      studentName: string;
      studentEmail: string;
      studentId: string;
      submittedAt: string;
      status: string;
      score?: number;
      repoUrl?: string;
      notes?: string;
      feedback?: string;
      attachedFiles?: AttachedReportFile[];
    }> = [];

    // Process Labs
    (labSubmissions || []).forEach((lab: any) => {
      const lId = Number(lab.labId || lab.id || 1);
      const matchingLesson = (lessons || []).find((les: any) => les.id === lId || les.labId === lId);
      const title = lab.labTitle || matchingLesson?.titleRu || `Лабораторная работа #${lId}`;
      const repoUrl =
        lab.repoUrl ||
        lab.fileUrl ||
        lab.demoUrl ||
        lab.githubUrl ||
        localStorage.getItem(`devops_lab_${lId}_repo_url`) ||
        '';
      const notes =
        lab.studentNotes ||
        lab.reportText ||
        lab.notes ||
        localStorage.getItem(`devops_lab_${lId}_notes`) ||
        '';
      const rawFiles = lab.attachedFiles || [];
      const cachedFiles = localStorage.getItem(`devops_lab_${lId}_files`);
      let files = rawFiles.length > 0 ? rawFiles : [];
      if (files.length === 0 && cachedFiles) {
        try {
          files = JSON.parse(cachedFiles);
        } catch {}
      }

      list.push({
        id: lab.id || `lab-${lId}-${lab.studentEmail || 'student'}`,
        kind: 'lab',
        number: lId,
        title,
        studentName: lab.studentName || profile.name || 'Студент',
        studentEmail: lab.studentEmail || profile.email || 'student@devopspro.tech',
        studentId: lab.studentId || profile.id || 'std',
        submittedAt: lab.submittedAt || new Date().toLocaleString('ru-RU'),
        status: lab.status || lab.submissionStatus || 'Submitted',
        score: lab.score,
        repoUrl,
        notes,
        feedback: lab.mentorFeedback || lab.feedback || '',
        attachedFiles: files
      });
    });

    // Process Homeworks
    (homeworkSubmissions || []).forEach((hw: any) => {
      const lesId = Number(hw.lessonId || hw.id || 1);
      const matchingLesson = (lessons || []).find((les: any) => les.id === lesId);
      const title = hw.lessonTitle || matchingLesson?.homeworkTitle || `Домашнее задание к Уроку #${lesId}`;
      const repoUrl =
        hw.githubUrl ||
        hw.fileUrl ||
        hw.repoUrl ||
        hw.demoUrl ||
        localStorage.getItem(`devops_hw_${lesId}_repo_url`) ||
        '';
      const notes =
        hw.studentNotes ||
        hw.reportText ||
        hw.notes ||
        localStorage.getItem(`devops_hw_${lesId}_notes`) ||
        '';
      const rawFiles = hw.attachedFiles || [];
      const cachedFiles = localStorage.getItem(`devops_hw_${lesId}_files`);
      let files = rawFiles.length > 0 ? rawFiles : [];
      if (files.length === 0 && cachedFiles) {
        try {
          files = JSON.parse(cachedFiles);
        } catch {}
      }

      list.push({
        id: hw.id || `hw-${lesId}-${hw.studentEmail || 'student'}`,
        kind: 'homework',
        number: lesId,
        title,
        studentName: hw.studentName || profile.name || 'Студент',
        studentEmail: hw.studentEmail || profile.email || 'student@devopspro.tech',
        studentId: hw.studentId || profile.id || 'std',
        submittedAt: hw.submittedAt || new Date().toLocaleString('ru-RU'),
        status: hw.status || 'Submitted',
        score: hw.score,
        repoUrl,
        notes,
        feedback: hw.mentorFeedback || hw.feedback || '',
        attachedFiles: files
      });
    });

    // Sort by date descending
    return list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [labSubmissions, homeworkSubmissions, lessons, profile]);

  const pendingCount = allSubmissionsList.filter(
    (s) => s.status !== 'Approved' && s.status !== 'Rejected'
  ).length;
  const approvedCount = allSubmissionsList.filter((s) => s.status === 'Approved').length;
  const rejectedCount = allSubmissionsList.filter((s) => s.status === 'Rejected').length;

  const filteredSubmissions = useMemo(() => {
    return allSubmissionsList.filter((sub) => {
      // Filter by status tab
      if (submissionFilter === 'pending' && (sub.status === 'Approved' || sub.status === 'Rejected')) {
        return false;
      }
      if (submissionFilter === 'approved' && sub.status !== 'Approved') {
        return false;
      }
      if (submissionFilter === 'rejected' && sub.status !== 'Rejected') {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = sub.title.toLowerCase().includes(q);
        const matchesStudent = sub.studentName.toLowerCase().includes(q) || sub.studentEmail.toLowerCase().includes(q);
        const matchesRepo = (sub.repoUrl || '').toLowerCase().includes(q);
        const matchesNotes = (sub.notes || '').toLowerCase().includes(q);
        return matchesTitle || matchesStudent || matchesRepo || matchesNotes;
      }

      return true;
    });
  }, [allSubmissionsList, submissionFilter, searchQuery]);

  const [cardScores, setCardScores] = useState<Record<string, number>>({});

  const getSubScore = (sub: any): number => {
    if (cardScores[sub.id] !== undefined) return cardScores[sub.id];
    if (sub.status === 'Approved') {
      return COURSE_RULES.calculateMentorExp(sub.score, 'Approved', sub.feedback);
    }
    return gradeScore;
  };

  const setSubScore = (subId: string, pts: number) => {
    setCardScores((prev) => ({ ...prev, [subId]: pts }));
    setGradeScore(pts);
    if (!gradeFeedback || gradeFeedback.startsWith('Работа проверена!') || gradeFeedback.startsWith('Отличная работа!') || gradeFeedback.startsWith('Оценка ниже')) {
      if (pts === 100) setGradeFeedback('Работа проверена! Итоговая оценка: 100/100. Отличный результат!');
      else if (pts === 75) setGradeFeedback('Работа проверена! Итоговая оценка: 75/100. Хорошая работа.');
      else if (pts === 50) setGradeFeedback('Работа проверена! Итоговая оценка: 50/100. Зачтено с замечаниями.');
      else setGradeFeedback('Оценка ниже 50 баллов. Задание отправлено на доработку.');
    }
  };

  const handleApproveSub = async (sub: any, overrideScore?: number) => {
    const rawChosen = overrideScore !== undefined ? overrideScore : getSubScore(sub);
    const chosenScore = rawChosen >= 88 ? 100 : rawChosen >= 63 ? 75 : 50;
    if (sub.kind === 'lab') {
      await reviewLab(
        sub.number,
        'Approved',
        chosenScore,
        gradeFeedback || `Лабораторная работа проверена и подтверждена ментором! Начислено: ${chosenScore} EXP.`,
        sub.studentId,
        sub.studentEmail
      );
    } else {
      await reviewHomework(
        sub.number,
        'Approved',
        chosenScore,
        gradeFeedback || `Домашнее задание проверено и подтверждено ментором! Начислено: ${chosenScore} EXP.`,
        sub.studentId,
        sub.studentEmail
      );
    }
    setGradeSuccessMsg(
      sub.kind === 'homework'
        ? `ДЗ к Уроку #${sub.number} подтверждено ментором (+${chosenScore} EXP)! Следующий Урок #${Math.min(24, sub.number + 1)} автоматически разблокирован!`
        : `Лабораторная работа #${sub.number} подтверждена ментором! Начислено: +${chosenScore} EXP`
    );
    setTimeout(() => setGradeSuccessMsg(null), 4500);
  };

  const handleRejectSub = async (sub: any) => {
    const finalScore = gradeScore >= 50 ? 40 : gradeScore;
    if (sub.kind === 'lab') {
      await reviewLab(
        sub.number,
        'Rejected',
        finalScore,
        gradeFeedback || 'Оценка ниже 50 баллов. Лабораторная работа отправлена на доработку.',
        sub.studentId,
        sub.studentEmail
      );
    } else {
      await reviewHomework(
        sub.number,
        'Rejected',
        finalScore,
        gradeFeedback || 'Оценка ниже 50 баллов. Домашнее задание отправлено на доработку.',
        sub.studentId,
        sub.studentEmail
      );
    }
    setGradeSuccessMsg(`Задание #${sub.number} отправлено на доработку.`);
    setTimeout(() => setGradeSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Top Mentor Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-5 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/50 text-xs font-semibold">
          <Headphones className="w-4 h-4 text-purple-400" />
          <span>Персональный Ментор Курса</span>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-2">
          <div className="relative shrink-0 group flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-1 shadow-xl relative overflow-hidden">
              {Boolean(mentorAvatar) && !imgError ? (
                <img
                  src={mentorAvatar || currentMentor.avatarUrl}
                  alt={currentMentor.name}
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-center p-2 text-white">
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    AT
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Ahrorjon T.</span>
                </div>
              )}
            </div>

            {profile.role === 'admin' && (
              <button
                onClick={() => setShowPhotoModal(true)}
                className="mt-2.5 px-3 py-1 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-700/80 text-[10px] font-bold text-purple-200 flex items-center justify-center gap-1.5 transition-all shadow-md"
                title="Изменить фото ментора (Только Администратор)"
              >
                <Camera className="w-3 h-3 text-purple-300" />
                <span>Изменить фото</span>
              </button>
            )}
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{currentMentor.name}</h1>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  Назначен вам ✓
                </span>
              </div>
              <p className="text-sm text-cyan-300 font-semibold">{currentMentor.role}</p>
              <p className="text-xs text-slate-400 font-mono">Опыт работы: {currentMentor.experience}</p>
            </div>

            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {currentMentor.bio}
            </p>

            {/* Direct Contact Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <a
                href={currentMentor.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: {currentMentor.telegram}</span>
              </a>

              <a
                href={currentMentor.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`tel:${currentMentor.phone}`}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentMentor.phone}</span>
              </a>

              <a
                href={`mailto:${currentMentor.email}`}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-2 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentMentor.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Обзор & Связь</span>
        </button>

        <button
          onClick={() => setActiveTab('tech')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'tech'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Технологии & Инструменты</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Опыт & Проекты ({(currentMentor.projects || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'education'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Образование & Сферы</span>
        </button>
      </div>

      {/* Tab 1: Overview & Services */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-500" /> Профессиональное Резюме (Professional Summary)
              </h3>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[11px] font-bold">
                <button
                  onClick={() => setSummaryLang('ru')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    summaryLang === 'ru'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  RU (Русский)
                </button>
                <button
                  onClick={() => setSummaryLang('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    summaryLang === 'en'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  EN (English)
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {summaryLang === 'ru' ? (currentMentor.summaryRu || currentMentor.summary) : currentMentor.summary}
            </p>
          </div>

          {/* Consultation Schedule & AI Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-500" /> График консультаций & Менторских Сессий
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Индивидуальный созвон 1-на-1 с Ahrorjon T.</h4>
                      <p className="text-slate-500 dark:text-slate-400">30 минут • Разбор лабораторий, кода, Linux/Networking и карьерный трек</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 shrink-0"
                  >
                    Забронировать
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Связь с Менеджером в Telegram</h4>
                      <p className="text-slate-500 dark:text-slate-400">Прямой чат с менеджером по всем вопросам обучения и поддержки</p>
                    </div>
                  </div>
                  <a
                    href="https://t.me/aivioratj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Написать Менеджеру</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Key Expertise Highlights */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Основная Специализация
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                {(currentMentor.specialties || []).map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tech Stack & Tools */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(currentMentor.techCategories || []).map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Wrench className="w-4 h-4" />
                  <h4>{cat.category}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(cat.items || []).map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-slate-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Projects & Work Experience */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="space-y-6">
            {(currentMentor.projects || []).map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 transition-all hover:border-purple-500/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                      {proj.company}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{proj.position}</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold">
                      {proj.duration}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Команда: {proj.teamSize}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {proj.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" /> Обязанности и Достижения:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
                    {(proj.responsibilities || []).map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">Стек технологий проекта:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(proj.techStack || []).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Education & Background */}
      {activeTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" /> Высшее Образование
            </h3>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{currentMentor.education}</h4>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Квалификация: {currentMentor.qualification}</p>
            </div>
          </div>

          {/* Industries Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-500" /> Отрасли и Индустрии (Industries)
            </h3>
            <div className="flex flex-wrap gap-2">
              {(currentMentor.industries || []).map((ind, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 text-xs font-bold"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Запись на консультацию к {currentMentor.name}</h3>
            {consultBooked ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold space-y-3 text-center">
                <p>✔ Запрос на консультацию сформирован на {selectedDate} в {selectedTime}!</p>
                <p className="text-[11px] font-normal text-slate-600 dark:text-slate-300">
                  Открываем Telegram ({currentMentor.telegram}) для прямой связи с Ahrorjon...
                </p>
                <a
                  href={`https://t.me/itadminahror?text=${encodeURIComponent(
                    `Здравствуйте, Ahrorjon! Хочу забронировать менторскую консультацию на ${selectedDate} в ${selectedTime}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Открыть Telegram ({currentMentor.telegram})</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Выберите дату</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Выберите удобное время</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="14:00">14:00 - 14:30</option>
                    <option value="16:00">16:00 - 16:30</option>
                    <option value="18:00">18:00 - 18:30</option>
                    <option value="20:00">20:00 - 20:30</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md shadow-purple-600/20"
                >
                  Подтвердить запись
                </button>
              </form>
            )}
            <button onClick={() => setShowConsultModal(false)} className="w-full text-center text-xs text-slate-500 hover:text-slate-300">
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Change Mentor Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-500" /> Изменить фото ментора ({currentMentor.name})
              </h3>
            </div>

            {/* Current preview */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
              <div className="w-14 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-purple-500/30">
                {Boolean(mentorAvatar) && !imgError ? (
                  <img src={mentorAvatar || currentMentor.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-300 font-bold text-lg">AT</div>
                )}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">Текущий аватар</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Загрузите изображение с компьютера или вставьте прямую ссылку.
                </p>
              </div>
            </div>

            {/* Option 1: File Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-purple-400" />
                <span>Загрузить файл с устройства</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
              />
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-slate-400">ИЛИ</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            {/* Option 2: Image URL Input */}
            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Вставить URL фотографии</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-mono placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                disabled={!photoUrlInput.trim()}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20"
              >
                Сохранить по URL
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleResetAvatar}
                className="text-xs text-amber-500 hover:text-amber-400 font-medium"
              >
                Сбросить к исходному
              </button>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
