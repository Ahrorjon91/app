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
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        setMentorAvatar(compressed);
        safeSetLocalStorage('mentor_avatar_url', compressed);
        updateProfile({ mentorAvatarUrl: compressed });
        setImgError(false);
        setShowPhotoModal(false);
      }
    };
    img.onerror = () => {
      setMentorAvatar(dataUrl);
      safeSetLocalStorage('mentor_avatar_url', dataUrl);
      updateProfile({ mentorAvatarUrl: dataUrl });
      setImgError(false);
      setShowPhotoModal(false);
    };
    img.src = dataUrl;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        compressAndSaveImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrlInput.trim()) {
      const url = photoUrlInput.trim();
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

  return (
    <div className="space-y-6 text-[#f5f5f7] pb-8">
      {/* Top Mentor Banner: Apple Midnight Exhibition Stage */}
      <div className="p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] space-y-5 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#0071e3] border border-[#262629] text-[11px] font-medium">
          <Headphones className="w-3.5 h-3.5" />
          <span>Персональный Ментор Курса</span>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-1">
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[24px] bg-[#161618] border border-[#333336] p-1 overflow-hidden">
              {Boolean(mentorAvatar) && !imgError ? (
                <img
                  src={mentorAvatar || currentMentor.avatarUrl}
                  alt={currentMentor.name}
                  className="w-full h-full object-cover rounded-[20px]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-[20px] bg-[#000000] flex flex-col items-center justify-center text-center p-2 text-[#f5f5f7]">
                  <span className="text-2xl font-semibold text-[#0071e3]">AT</span>
                  <span className="text-[9px] text-[#86868b] mt-1 uppercase tracking-wider">Ahrorjon T.</span>
                </div>
              )}
            </div>

            {profile.role === 'admin' && (
              <button
                onClick={() => setShowPhotoModal(true)}
                className="mt-2.5 px-3 py-1 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[10px] font-medium text-[#86868b] hover:text-[#f5f5f7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Изменить фото ментора"
              >
                <Camera className="w-3 h-3 text-[#0071e3]" />
                <span>Изменить фото</span>
              </button>
            )}
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-semibold text-[#f5f5f7] tracking-tight">{currentMentor.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] border border-[#00d959]/30 text-xs font-medium">
                  Назначен вам ✓
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#0071e3] font-medium">{currentMentor.role}</p>
              <p className="text-xs text-[#86868b] font-mono">Опыт: {currentMentor.experience}</p>
            </div>

            <p className="text-xs text-[#86868b] max-w-3xl leading-relaxed">
              {currentMentor.bio}
            </p>

            {/* Direct Contact Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <a
                href={currentMentor.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: {currentMentor.telegram}</span>
              </a>

              <a
                href={currentMentor.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`tel:${currentMentor.phone}`}
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00d959]" />
                <span>{currentMentor.phone}</span>
              </a>

              <a
                href={`mailto:${currentMentor.email}`}
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>{currentMentor.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs: Apple Selector Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#262629] pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#0071e3] text-white'
              : 'bg-[#161618] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Обзор & Связь</span>
        </button>

        <button
          onClick={() => setActiveTab('tech')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'tech'
              ? 'bg-[#0071e3] text-white'
              : 'bg-[#161618] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Технологии</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-[#0071e3] text-white'
              : 'bg-[#161618] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Опыт & Проекты ({(currentMentor.projects || []).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'education'
              ? 'bg-[#0071e3] text-white'
              : 'bg-[#161618] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Образование</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between border-b border-[#262629] pb-3">
              <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0071e3]" /> Профессиональное Резюме
              </h3>
              <div className="flex items-center gap-1 bg-[#000000] p-1 rounded-full text-[11px] font-medium border border-[#262629]">
                <button
                  onClick={() => setSummaryLang('ru')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    summaryLang === 'ru'
                      ? 'bg-[#0071e3] text-white'
                      : 'text-[#86868b] hover:text-[#f5f5f7]'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setSummaryLang('en')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    summaryLang === 'en'
                      ? 'bg-[#0071e3] text-white'
                      : 'text-[#86868b] hover:text-[#f5f5f7]'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <p className="text-xs text-[#86868b] leading-relaxed">
              {summaryLang === 'ru' ? (currentMentor.summaryRu || currentMentor.summary) : currentMentor.summary}
            </p>
          </div>

          {/* Consultation Schedule & AI Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
              <h3 className="text-sm font-semibold text-[#f5f5f7] border-b border-[#262629] pb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0071e3]" /> График консультаций
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-[#1c1c1f] text-[#0071e3]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#f5f5f7]">Индивидуальный созвон 1-на-1</h4>
                      <p className="text-[#86868b]">30 минут · Разбор лабораторных, кода и архитектуры</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs shrink-0 cursor-pointer transition-colors"
                  >
                    Забронировать
                  </button>
                </div>

                <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-[#1c1c1f] text-[#00d959]">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#f5f5f7]">Связь с Менеджером в Telegram</h4>
                      <p className="text-[#86868b]">Прямой чат по всем организационным вопросам</p>
                    </div>
                  </div>
                  <a
                    href="https://t.me/aivioratj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] font-medium text-xs shrink-0 flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Написать</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Key Expertise Highlights */}
            <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-[#f5f5f7] border-b border-[#262629] pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00d959]" /> Специализация
              </h3>
              <ul className="space-y-2 text-[#86868b]">
                {(currentMentor.specialties || []).map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00d959] shrink-0" />
                    <span className="text-[#f5f5f7]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tech Stack */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(currentMentor.techCategories || []).map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3"
              >
                <div className="flex items-center gap-2 text-[#0071e3] font-medium text-sm border-b border-[#262629] pb-2">
                  <Wrench className="w-4 h-4" />
                  <h4>{cat.category}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(cat.items || []).map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-2.5 py-1 rounded-full bg-[#000000] text-[#86868b] text-xs font-mono border border-[#262629]"
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

      {/* Tab 3: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {(currentMentor.projects || []).map((proj, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262629] pb-3">
                <div>
                  <span className="text-xs font-medium text-[#0071e3] uppercase tracking-wider">
                    {proj.company}
                  </span>
                  <h3 className="text-base font-semibold text-[#f5f5f7]">{proj.position}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="px-3 py-1 rounded-full bg-[#000000] text-[#86868b] border border-[#262629] text-xs font-mono">
                    {proj.duration}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#86868b] leading-relaxed">
                {proj.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0071e3]" /> Обязанности:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#86868b] list-disc list-inside leading-relaxed">
                  {(proj.responsibilities || []).map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {(proj.techStack || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#86868b] border border-[#262629] text-[10px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Education */}
      {activeTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-semibold text-[#f5f5f7] border-b border-[#262629] pb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0071e3]" /> Высшее Образование
            </h3>
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-[#f5f5f7]">{currentMentor.education}</h4>
              <p className="text-xs text-[#86868b]">Квалификация: {currentMentor.qualification}</p>
            </div>
          </div>

          <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-semibold text-[#f5f5f7] border-b border-[#262629] pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#00d959]" /> Отрасли
            </h3>
            <div className="flex flex-wrap gap-2">
              {(currentMentor.industries || []).map((ind, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-[#000000] text-[#86868b] border border-[#262629] text-xs font-medium"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 text-center space-y-4">
            <h3 className="text-sm font-semibold text-[#f5f5f7]">Запись на консультацию</h3>
            {consultBooked ? (
              <div className="p-4 rounded-[20px] bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959] text-xs font-medium space-y-3">
                <p>✔ Запрос сформирован на {selectedDate} в {selectedTime}!</p>
                <a
                  href={`https://t.me/itadminahror?text=${encodeURIComponent(
                    `Здравствуйте, Ahrorjon! Хочу забронировать менторскую консультацию на ${selectedDate} в ${selectedTime}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Открыть Telegram</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-3 text-xs text-left">
                <div>
                  <label className="block text-[#86868b] mb-1">Дата</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="block text-[#86868b] mb-1">Время</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
                  >
                    <option value="14:00">14:00 - 14:30</option>
                    <option value="16:00">16:00 - 16:30</option>
                    <option value="18:00">18:00 - 18:30</option>
                    <option value="20:00">20:00 - 20:30</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Подтвердить запись
                </button>
              </form>
            )}
            <button
              onClick={() => setShowConsultModal(false)}
              className="w-full text-center text-xs text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Change Mentor Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#262629] pb-3">
              <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0071e3]" /> Изменить фото ментора
              </h3>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#86868b]">
                Загрузить с устройства
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs text-[#86868b] file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-[#0071e3] file:text-white hover:file:bg-[#0077ed] cursor-pointer"
              />
            </div>

            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1">
                  Или вставьте URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
                />
              </div>
              <button
                type="submit"
                disabled={!photoUrlInput.trim()}
                className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-50 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Сохранить по URL
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between border-t border-[#262629]">
              <button
                onClick={handleResetAvatar}
                className="text-xs text-[#ff791b] hover:underline cursor-pointer"
              >
                Сбросить
              </button>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#1c1c1f] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium cursor-pointer"
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
