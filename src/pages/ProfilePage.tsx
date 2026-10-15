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
  const { profile, updateProfile, stats, badges, setIsXpModalOpen } = usePortal();
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
    <div className="space-y-6 text-[#f5f5f7]">
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

      {/* Top Banner Profile Header: Apple Midnight Exhibition Stage */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#000000] border border-white/[0.08] p-6 md:p-8 text-[#f5f5f7]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="relative group flex flex-col items-center">
            <img
              src={profile.avatarUrl || studentAvatarSvg}
              alt={profile.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-[24px] object-cover border border-[#333336]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = studentAvatarSvg;
              }}
            />
            <button
              onClick={() => setShowQrCard(true)}
              className="absolute top-1 right-1 p-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#f5f5f7] border border-[#333336] transition-colors cursor-pointer"
              title="Показать QR Student ID"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2.5 px-3 py-1 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[10px] font-medium text-[#86868b] hover:text-[#f5f5f7] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Загрузить фото"
            >
              <Camera className="w-3 h-3 text-[#0071e3]" />
              <span>Изменить фото</span>
            </button>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1f] text-[#0071e3] border border-[#262629] text-[11px] font-mono font-medium">
                ID: {profile.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] border border-[#00d959]/30 text-[11px] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Активный Студент
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-[#f5f5f7]">{profile.name}</h1>
            <p className="text-[#86868b] text-xs md:text-sm">{profile.course}</p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#86868b]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0071e3]" /> <strong>Старт:</strong> {profile.startDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#ff791b]" /> <strong>Выпуск:</strong> {profile.graduationDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-[#86868b]" /> <strong>Ментор:</strong> {selectedMentor.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#00d959]" /> <strong>Посещаемость:</strong> {stats.attendancePct}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowQrCard(true)}
              className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Пропуск</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Отмена' : 'Редактировать'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Centralized EXP & Academic Performance Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Total EXP Card */}
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00d959]" /> Накопленный EXP
            </span>
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#00d959] text-[11px] font-medium transition-colors cursor-pointer"
            >
              Детализация EXP
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#f5f5f7]">{stats.totalPoints || 0}</span>
            <span className="text-xs text-[#00d959] font-medium">EXP</span>
          </div>
          <p className="text-[11px] text-[#86868b]">
            Ранг в группе: <strong className="text-[#0071e3] tabular-nums">#{stats.rank}</strong>
          </p>
        </div>

        {/* Academic Score Card */}
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#00d959]" /> Академический Балл
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] text-[10px] font-medium">
              100 БАЛЛОВ МАКС
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#f5f5f7]">{stats.academicScore || 0}</span>
            <span className="text-xs text-[#86868b] font-medium">/ 100</span>
          </div>
          <p className="text-[11px] text-[#86868b]">
            Посещаемость: <strong className="text-[#00d959] tabular-nums">{stats.attendancePct}%</strong>
          </p>
        </div>

        {/* Course Progress Card */}
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" /> Общий Прогресс
            </span>
            <span className="text-xs font-semibold tabular-nums text-[#0071e3]">{stats.progressPct}%</span>
          </div>
          <div className="w-full bg-[#1c1c1f] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0071e3] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.progressPct}%` }}
            />
          </div>
          <p className="text-[11px] text-[#86868b] flex items-center justify-between tabular-nums">
            <span>Завершено: <strong className="text-[#f5f5f7]">{stats.completedLessonsCount} / 24</strong> уроков</span>
            <span>Тесты: <strong className="text-[#f5f5f7]">{stats.passedTestsCount} / 6</strong></span>
          </p>
        </div>
      </div>

      {/* Editing Modal or Inline Panel */}
      {isEditing && (
        <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-5">
          <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2 border-b border-[#262629] pb-3">
            <Edit2 className="w-4 h-4 text-[#0071e3]" /> Редактирование Профиля и Ментора
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">ФИО Студента</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Телефон</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Telegram Handle</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Дата Старта Курса</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Дата Выпуска</label>
              <input
                type="date"
                value={formData.graduationDate}
                onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Посещаемость (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.attendancePct}
                onChange={(e) => setFormData({ ...formData, attendancePct: Number(e.target.value) })}
                className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">Назначенный Ментор</label>
              <select
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                className="w-full bg-[#1c1c1f] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
              >
                {AVAILABLE_MENTORS.map((m) => (
                  <option key={m.id} value={`${m.name} (${m.role})`}>
                    {m.name} — {m.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-medium text-[#86868b]">
              Фото Профиля
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Загрузить с устройства</span>
              </button>

              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="URL изображения..."
                  className="flex-1 bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
                />
                <img
                  src={formData.avatarUrl || studentAvatarSvg}
                  alt="Preview"
                  className="w-9 h-9 rounded-full object-cover border border-[#333336] shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = studentAvatarSvg;
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-[#86868b]">Пресеты:</span>
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatarUrl: preset.url })}
                  className="px-2.5 py-1 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-[11px] font-medium transition-colors cursor-pointer border border-[#262629]"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#262629] flex justify-end gap-2.5">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium border border-[#262629] cursor-pointer"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[#00d959] hover:bg-[#00e060] text-black text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Сохранить</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Details & Achievements & Mentor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info Card */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-5">
          <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2 border-b border-[#262629] pb-3">
            <User className="w-4 h-4 text-[#0071e3]" /> Контактные данные
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-[18px] bg-[#000000] border border-[#262629] flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#0071e3] shrink-0" />
              <div>
                <span className="block text-[10px] text-[#86868b]">Email</span>
                <span className="text-[#f5f5f7] font-medium">{profile.email}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] bg-[#000000] border border-[#262629] flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#00d959] shrink-0" />
              <div>
                <span className="block text-[10px] text-[#86868b]">Телефон</span>
                <span className="text-[#f5f5f7] font-medium">{profile.phone}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] bg-[#000000] border border-[#262629] flex items-center gap-3">
              <Send className="w-4 h-4 text-[#0071e3] shrink-0" />
              <div>
                <span className="block text-[10px] text-[#86868b]">Telegram</span>
                {profile.telegram ? (
                  <a
                    href={`https://t.me/${profile.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0071e3] font-medium hover:underline flex items-center gap-1"
                  >
                    <span>{profile.telegram}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[#86868b] font-medium">@student</span>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] bg-[#000000] border border-[#262629] flex items-center gap-3">
              <Percent className="w-4 h-4 text-[#00d959] shrink-0" />
              <div>
                <span className="block text-[10px] text-[#86868b]">Посещаемость</span>
                <span className="text-[#00d959] font-semibold tabular-nums">{stats.attendancePct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Assigned Mentor Card */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262629] pb-3">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#0071e3]" /> Назначенный Ментор
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] font-medium">
              Поддержка 24/7
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              {Boolean(mentorAvatarUrl) && !mentorImgError ? (
                <img
                  src={mentorAvatarUrl || selectedMentor.avatarUrl}
                  alt={selectedMentor.name}
                  className="w-16 h-16 rounded-[20px] object-cover border border-[#333336]"
                  onError={() => setMentorImgError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-[20px] bg-[#000000] border border-[#262629] flex flex-col items-center justify-center text-center p-1 text-[#f5f5f7]">
                  <span className="text-lg font-semibold text-[#0071e3]">AT</span>
                  <span className="text-[8px] text-[#86868b] uppercase">Ahrorjon T.</span>
                </div>
              )}
              <button
                onClick={() => mentorFileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] transition-colors cursor-pointer"
                title="Изменить фото ментора"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">{selectedMentor.name}</h4>
              <p className="text-xs text-[#0071e3] font-medium">{selectedMentor.role}</p>
              <p className="text-[11px] text-[#86868b]">{selectedMentor.experience}</p>
            </div>
          </div>

          <p className="text-xs text-[#86868b] leading-relaxed bg-[#000000] p-3 rounded-[18px] border border-[#262629]">
            {selectedMentor.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedMentor.specialties.map((spec, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#262629] text-[10px] font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="https://t.me/aivioratj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Написать Менеджеру</span>
            </a>
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between border-b border-[#262629] pb-3">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#ff791b]" /> Академические Награды
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#311400] text-[#ff791b] font-medium border border-[#ff791b]/30">
              {badges.filter((b) => b.unlocked).length} / {badges.length} получено
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {badges.map((badge) => {
              const displayTitle = badge.titleRu || badge.title;
              const displayDesc = badge.descriptionRu || badge.description;
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-[20px] border transition-colors flex items-start gap-3 ${
                    badge.unlocked
                      ? 'bg-[#000000] border-[#00d959]/30'
                      : 'bg-[#0a0a0b] border-[#1c1c1f] opacity-55'
                  }`}
                >
                  <AcademicBadgeIcon badgeId={badge.id} title={displayTitle} unlocked={badge.unlocked} size="md" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-semibold text-[#f5f5f7]">{displayTitle}</h4>
                        {badge.unlocked ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#1c2e22] text-[#00d959] text-[9px] font-medium">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Получено
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#1c1c1f] text-[#6e6e73] text-[9px] font-medium">
                            <Lock className="w-2.5 h-2.5" />
                            Закрыто
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#00d959] shrink-0 tabular-nums">
                        +{badge.xpReward || 100} EXP
                      </span>
                    </div>
                    <p className="text-[11px] text-[#86868b] leading-snug">{displayDesc}</p>
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
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-sm w-full p-6 text-center space-y-5"
          >
            <div className="flex items-center justify-between border-b border-[#262629] pb-3">
              <span className="text-xs font-semibold text-[#f5f5f7]">Student Pass ID</span>
              <button
                onClick={() => setShowQrCard(false)}
                className="text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#000000] border border-[#262629] rounded-[24px] p-6 text-center space-y-4">
              <img
                src={profile.avatarUrl || studentAvatarSvg}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#0071e3]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = studentAvatarSvg;
                }}
              />

              <div>
                <h3 className="text-base font-semibold text-[#f5f5f7]">{profile.name}</h3>
                <p className="text-xs text-[#0071e3] font-mono">{profile.id}</p>
              </div>

              <div className="bg-white p-3 rounded-[16px] w-32 h-32 mx-auto flex items-center justify-center">
                <QrCode className="w-24 h-24 text-black" />
              </div>

              <div className="text-[10px] text-[#86868b] font-mono">
                VALID: {profile.graduationDate} · VERIFIED
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Распечатать</span>
              </button>

              <button
                onClick={() => setShowQrCard(false)}
                className="flex-1 py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] font-medium text-xs transition-colors border border-[#262629] cursor-pointer"
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
