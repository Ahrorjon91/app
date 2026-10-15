import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import { AcademicBadgeIcon } from '../components/AcademicBadgeIcon';
import { AVAILABLE_MENTORS, MentorInfo } from '../data/mentorData';
import {
  User,
  Mail,
  Phone,
  Send,
  Calendar,
  Award,
  Headphones,
  QrCode,
  ShieldCheck,
  Printer,
  Edit2,
  Check,
  Trophy,
  CheckCircle2,
  Lock,
  Camera,
  ExternalLink,
  Percent,
  MessageSquare,
  Zap,
  BookOpen,
  Upload
} from 'lucide-react';

const PRESET_AVATARS = [
  { label: 'Dev 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { label: 'Dev 2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
  { label: 'Engineer 1', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
  { label: 'Architect', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80' },
  { label: 'SysAdmin', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
];

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, stats, badges, setAiDrawerOpen, setIsXpModalOpen, setIsAuditModalOpen } = usePortal();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    telegram: profile.telegram || '@mullojon_devops',
    avatarUrl: profile.avatarUrl || studentAvatarSvg,
    startDate: profile.startDate || '2026-05-10',
    graduationDate: profile.graduationDate || '2026-08-10',
    mentorName: profile.mentorName || AVAILABLE_MENTORS[0].name,
    attendancePct: profile.attendancePct || 95,
  });
  const [showQrCard, setShowQrCard] = useState(false);

  // Find currently selected mentor details
  const selectedMentor: MentorInfo = AVAILABLE_MENTORS.find(
    (m) => profile.mentorName && profile.mentorName.includes(m.name)
  ) || AVAILABLE_MENTORS[0];

  const [mentorImgError, setMentorImgError] = useState(false);
  const mentorAvatarUrl = React.useMemo(() => {
    try {
      return profile.mentorAvatarUrl || localStorage.getItem('mentor_avatar_url') || selectedMentor.avatarUrl;
    } catch {
      return profile.mentorAvatarUrl || selectedMentor.avatarUrl;
    }
  }, [profile.mentorAvatarUrl, selectedMentor.avatarUrl]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const mentorFileInputRef = React.useRef<HTMLInputElement>(null);

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
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
        updateProfile({ avatarUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMentorFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        try {
          localStorage.setItem('mentor_avatar_url', result);
        } catch {}
        updateProfile({ mentorAvatarUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hidden File Input for Student Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      {/* Hidden File Input for Mentor Avatar Upload */}
      <input
        type="file"
        ref={mentorFileInputRef}
        onChange={handleMentorFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Banner Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="relative group flex flex-col items-center">
            <img
              src={profile.avatarUrl || studentAvatarSvg}
              alt={profile.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover ring-4 ring-cyan-500/50 shadow-2xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = studentAvatarSvg;
              }}
            />
            <button
              onClick={() => setShowQrCard(true)}
              className="absolute top-1 right-1 p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all"
              title="Показать QR Student ID"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 px-3 py-1 rounded-xl bg-slate-800/90 hover:bg-cyan-600 border border-slate-700 text-[10px] font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Загрузить фото с ПК или телефона"
            >
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>Изменить фото</span>
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-xs font-mono font-bold">
                ID: {profile.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Активный Студент
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold">{profile.name}</h1>
            <p className="text-slate-300 text-xs md:text-sm font-medium">{profile.course}</p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" /> <strong>Старт:</strong> {profile.startDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> <strong>Выпуск:</strong> {profile.graduationDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-purple-400" /> <strong>Ментор:</strong> {selectedMentor.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-emerald-400" /> <strong>Посещаемость:</strong> {stats.attendancePct}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowQrCard(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>QR Пропуск</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Отмена' : 'Редактировать'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Centralized EXP & Academic Performance Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total EXP Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 dark:border-amber-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Накопленный EXP
            </span>
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold transition-all"
            >
              Детализация EXP
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalPoints || 0}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">EXP</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Ранг в группе: <strong className="text-slate-900 dark:text-white">#{stats.rank}</strong>
          </p>
        </div>

        {/* Academic Score Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" /> Академический Балл
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold">
              100 БАЛЛОВ МАКС
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{stats.academicScore || 0}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Посещаемость: <strong className="text-slate-900 dark:text-white">{stats.attendancePct}%</strong>
          </p>
        </div>

        {/* Course Progress Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 dark:border-blue-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" /> Общий Прогресс
            </span>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">{stats.progressPct}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.progressPct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Завершено: <strong>{stats.completedLessonsCount} / 24</strong> уроков</span>
            <span>Тесты: <strong>{stats.passedTestsCount} / 6</strong></span>
          </p>
        </div>
      </div>

      {/* Editing Modal or Inline Panel */}
      {isEditing && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-lg">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Edit2 className="w-5 h-5 text-cyan-500" /> Редактирование Профиля и Выбор Ментора
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ФИО Студента</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Телефон</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Telegram Handle</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Дата Старта Курса</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Graduation Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Дата Выпуска</label>
              <input
                type="date"
                value={formData.graduationDate}
                onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Attendance % */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Посещаемость (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.attendancePct}
                onChange={(e) => setFormData({ ...formData, attendancePct: Number(e.target.value) })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Mentor Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Назначенный Ментор</label>
              <select
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium"
              >
                {AVAILABLE_MENTORS.map((m) => (
                  <option key={m.id} value={`${m.name} (${m.role})`}>
                    {m.name} — {m.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Avatar URL & Preset & Local Upload Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Фото Профиля (Загрузить с локального ПК / URL / Аватары)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Загрузить с ПК / Телефона</span>
              </button>

              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="Или вставьте URL ссылки..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
                <img
                  src={formData.avatarUrl || studentAvatarSvg}
                  alt="Preview"
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500 shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = studentAvatarSvg;
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Быстрый выбор:</span>
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatarUrl: preset.url })}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-400 text-[11px] font-medium transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Сохранить профиль</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Details & Achievements & Mentor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact & Personal Info Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <User className="w-4 h-4 text-cyan-500" /> Контактные данные
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Email</span>
                <span className="text-slate-900 dark:text-white font-medium">{profile.email}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Телефон</span>
                <span className="text-slate-900 dark:text-white font-medium">{profile.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
              <Send className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Telegram</span>
                {profile.telegram ? (
                  <a
                    href={`https://t.me/${profile.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-1"
                  >
                    <span>{profile.telegram}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-500 font-medium">@student</span>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
              <Percent className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Посещаемость уроков & лаб</span>
                <span className="text-slate-900 dark:text-white font-bold">{stats.attendancePct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Assigned Mentor Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Headphones className="w-4 h-4 text-purple-500" /> Назначенный Ментор
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 font-bold">
              Online 24/7
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              {Boolean(mentorAvatarUrl) && !mentorImgError ? (
                <img
                  src={mentorAvatarUrl || selectedMentor.avatarUrl}
                  alt={selectedMentor.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-md"
                  onError={() => setMentorImgError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-center p-1 text-white ring-2 ring-purple-500/40 shadow-md">
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    AT
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Ahrorjon T.</span>
                </div>
              )}
              <button
                onClick={() => mentorFileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all cursor-pointer"
                title="Изменить фото ментора"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedMentor.name}</h4>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{selectedMentor.role}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{selectedMentor.experience}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            {selectedMentor.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedMentor.specialties.map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[10px] font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://t.me/aivioratj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Написать Менеджеру</span>
            </a>
          </div>
        </div>

        {/* Badges & Achievements (Full Width or Third Column) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Академические Награды
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
              {badges.filter((b) => b.unlocked).length} / {badges.length} получено
            </span>
          </div>

          <div className="space-y-3">
            {badges.map((badge) => {
              const displayTitle = badge.titleRu || badge.title;
              const displayDesc = badge.descriptionRu || badge.description;
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    badge.unlocked
                      ? 'bg-gradient-to-r from-amber-500/5 via-slate-50 to-emerald-500/5 dark:from-amber-500/10 dark:via-slate-800/70 dark:to-emerald-500/10 border-amber-500/30 dark:border-amber-500/20 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/40 opacity-60'
                  }`}
                >
                  <AcademicBadgeIcon badgeId={badge.id} title={displayTitle} unlocked={badge.unlocked} size="md" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{displayTitle}</h4>
                        {badge.unlocked ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Разблокировано
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-semibold">
                            <Lock className="w-3 h-3 text-slate-400" />
                            Не получено
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 shrink-0 font-mono">
                        +{badge.xpReward || 100} EXP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{displayDesc}</p>
                    {badge.unlocked && badge.unlockedAt && (
                      <div className="text-[10px] text-slate-400 pt-0.5 font-mono">
                        Дата награды: {badge.unlockedAt}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* QR Student ID Modal Card */}
      {showQrCard && (
        <div
          onClick={() => setShowQrCard(false)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95"
          >
            <button
              onClick={() => setShowQrCard(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="Закрыть"
            >
              ✕
            </button>

            {/* Simulated Badge Plastic Card */}
            <div className="bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden text-white">
              <div className="w-full bg-cyan-500 h-1.5 absolute top-0 left-0" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">AI for LIFE Academy</span>
                <span className="text-[10px] font-mono text-slate-400">STUDENT PASS</span>
              </div>

              <img
                src={profile.avatarUrl || studentAvatarSvg}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-cyan-500/40"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = studentAvatarSvg;
                }}
              />

              <div>
                <h3 className="text-lg font-extrabold">{profile.name}</h3>
                <p className="text-xs text-cyan-400 font-mono">{profile.id}</p>
              </div>

              {/* QR Box Visual */}
              <div className="bg-white p-3 rounded-xl w-36 h-36 mx-auto flex flex-col items-center justify-center shadow-lg">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                VALID UNTIL: {profile.graduationDate} • VERIFIED ID
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20"
              >
                <Printer className="w-4 h-4" />
                <span>Распечатать</span>
              </button>

              <button
                onClick={() => setShowQrCard(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-slate-700"
              >
                <span>Закрыть</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
