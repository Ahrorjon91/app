import React from 'react';
import { usePortal } from '../context/PortalContext';
import { PageView } from '../types';
import {
  LayoutDashboard,
  User,
  BookOpen,
  FlaskConical,
  FileCheck,
  HelpCircle,
  Award,
  Trophy,
  Download,
  Settings,
  Headphones,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Lock,
  ChevronRight,
  LogOut,
  Send,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, onMobileClose }) => {
  const {
    activePage,
    setActivePage,
    stats,
    logoutStudent,
    profile,
    testScores,
    quizSubmissions,
    certificates
  } = usePortal();

  const isAdmin = profile.role === 'admin';

  // Check Final Exam and Mentor confirmation status for Certificates page
  const finalExamScore = testScores['FINAL_EXAM'] || (quizSubmissions || []).find(
    (q) => (q.quizId === 'FINAL_EXAM' || q.quizId === 'FINAL') &&
      ((q.studentEmail && profile.email && q.studentEmail.toLowerCase().trim() === profile.email.toLowerCase().trim()) ||
       (q.studentId && profile.id && q.studentId === profile.id) ||
       (!q.studentEmail && !q.studentId))
  );
  const isFinalExamPassed = Boolean(
    (finalExamScore?.passed && (finalExamScore.scorePct === undefined || finalExamScore.scorePct >= 85)) ||
    (finalExamScore && finalExamScore.scorePct !== undefined && finalExamScore.scorePct >= 85)
  );

  const myEmailLower = String(profile.email || '').toLowerCase().trim();
  const myNameLower = String(profile.name || '').toLowerCase().trim();
  const myCert = (certificates || []).find(
    (c) =>
      (c.studentEmail && String(c.studentEmail).toLowerCase().trim() === myEmailLower) ||
      (c.studentName && String(c.studentName).toLowerCase().trim() === myNameLower)
  );
  const isMentorConfirmed = Boolean(myCert && myCert.mentorConfirmed !== false && myCert.status !== 'Rejected');
  const isCertUnlocked = isAdmin || (isFinalExamPassed && isMentorConfirmed);

  const certBadge = isAdmin
    ? undefined
    : isCertUnlocked
    ? '✨ Доступен'
    : isFinalExamPassed
    ? '⏳ На проверке'
    : '🔒 Закрыт';

  const studentNavItems: { id: PageView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'profile', label: 'Профиль Студента', icon: <User className="w-5 h-5" /> },
    { id: 'lessons', label: 'Уроки Курса (24)', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quizzes', label: 'Тесты и Экзамены', icon: <HelpCircle className="w-5 h-5" />, badge: `${stats.passedTestsCount}/6` },
    { id: 'final-exam', label: 'Финальный Экзамен', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'mentor', label: 'Ментор и Консультации', icon: <Headphones className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Таблица Лидеров', icon: <Trophy className="w-5 h-5" />, badge: `#${stats.rank}` },
    {
      id: 'certificates',
      label: 'Сертификат',
      icon: isCertUnlocked ? <Award className="w-5 h-5 text-amber-500" /> : <Lock className="w-5 h-5 text-amber-500" />,
      badge: certBadge
    },
    { id: 'downloads', label: 'Центр Загрузок', icon: <Download className="w-5 h-5" /> },
    { id: 'faq', label: 'FAQ и Помощь', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  const adminNavItems: { id: PageView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'unlock-lessons', label: 'Доступ Уроков & ДЗ', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'user-management', label: 'Пользователи & Роли', icon: <User className="w-5 h-5" /> },
    { id: 'analytics', label: 'Аналитика Успеваемости', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'settings', label: 'Настройки Портала', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 bg-white dark:bg-[#0D0D12] border-r border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black text-base shadow-lg shadow-cyan-500/25 shrink-0">
              AI
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">AI FOR <span className="text-cyan-500">LIFE</span></span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">Vibe Coding & Agents</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Pill Widget */}
        {!collapsed && (
          <div className="mx-3 mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#14141B] border border-slate-200 dark:border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Прогресс курса</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{stats.progressPct}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.progressPct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Уроки: {stats.completedLessonsCount}/24</span>
              <span>Лабы: {stats.completedLabsCount}/24</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
          {/* Main Student Section */}
          <div className="space-y-1">
            {!collapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Обучение & Практика
              </span>
            )}
            {studentNavItems.map((item) => {
              const isActive = activePage === item.id || (item.id === 'lessons' && activePage === 'lesson-detail') || (item.id === 'labs' && activePage === 'lab-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    onMobileClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-cyan-500/5'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Left glowing animated border indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r shadow-[0_0_8px_#06b6d4]" />
                  )}
                  <div className={`transition-all duration-200 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]'}`}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                        isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-200 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Panel Section - Only shown for Admin role */}
          {isAdmin && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-white/5">
              {!collapsed && (
                <div className="px-3 flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block">
                    Панель Администратора
                  </span>
                </div>
              )}
              {adminNavItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      onMobileClose();
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className={`${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer / Telegram & WhatsApp Managers */}
        <div className="p-3 border-t border-slate-200 dark:border-white/5 space-y-2">
          {!collapsed ? (
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href="https://t.me/aivioratj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 flex flex-col gap-1 transition-all group"
                title="Менеджер в Telegram (@aivioratj)"
              >
                <div className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-800 dark:text-slate-200 font-bold leading-tight text-[11px]">Telegram</span>
                </div>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate">@aivioratj</span>
              </a>

              <a
                href="https://wa.me/992170009000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 flex flex-col gap-1 transition-all group"
                title="WhatsApp: +992170009000"
              >
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-800 dark:text-slate-200 font-bold leading-tight text-[11px]">WhatsApp</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate">+992170009000</span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <a
                href="https://t.me/aivioratj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-blue-500 hover:bg-blue-500/10 transition-colors"
                title="Менеджер в Telegram (@aivioratj)"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/992170009000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                title="WhatsApp: +992170009000"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          )}

          <button
            onClick={logoutStudent}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-medium transition-colors"
            title="Выйти из аккаунта"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Выйти из системы</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
