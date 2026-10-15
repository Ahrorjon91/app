import React from 'react';
import { usePortal } from '../context/PortalContext';
import { PageView } from '../types';
import {
  LayoutDashboard,
  User,
  BookOpen,
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
    ? 'Доступен'
    : isFinalExamPassed
    ? 'Проверка'
    : 'Закрыт';

  const studentNavItems: { id: PageView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Профиль Студента', icon: <User className="w-4 h-4" /> },
    { id: 'lessons', label: 'Уроки Курса (24)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quizzes', label: 'Тесты и Экзамены', icon: <HelpCircle className="w-4 h-4" />, badge: `${stats.passedTestsCount}/6` },
    { id: 'final-exam', label: 'Финальный Экзамен', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'mentor', label: 'Ментор и Консультации', icon: <Headphones className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Таблица Лидеров', icon: <Trophy className="w-4 h-4" />, badge: `#${stats.rank}` },
    {
      id: 'certificates',
      label: 'Сертификат',
      icon: isCertUnlocked ? <Award className="w-4 h-4 text-[#ff791b]" /> : <Lock className="w-4 h-4 text-[#86868b]" />,
      badge: certBadge
    },
    { id: 'downloads', label: 'Центр Загрузок', icon: <Download className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ и Помощь', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const adminNavItems: { id: PageView; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'unlock-lessons', label: 'Доступ Уроков & ДЗ', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'user-management', label: 'Пользователи & Роли', icon: <User className="w-4 h-4" /> },
    { id: 'analytics', label: 'Аналитика Успеваемости', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'settings', label: 'Настройки Портала', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 bg-[#000000] border-r border-white/[0.08] text-[#f5f5f7] ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-15 px-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1c1c1f] border border-[#333336] text-[#f5f5f7] font-semibold text-xs tracking-tight shrink-0">
              AI
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold tracking-tight text-[#f5f5f7] leading-tight text-sm">AI ACADEMY</span>
                <span className="text-[11px] text-[#86868b] font-medium tracking-wide">Vibe Coding & LLM</span>
              </div>
            )}
          </div>
        </div>

        {/* Course Progress Widget - Apple style black stage card */}
        {!collapsed && (
          <div className="mx-3.5 mt-4 p-3.5 rounded-[20px] bg-[#000000] border border-[#262629]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#86868b] font-medium">Прогресс курса</span>
              <span className="text-[#00d959] font-semibold tabular-nums">{stats.progressPct}%</span>
            </div>
            <div className="w-full bg-[#262629] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00d959] h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.progressPct}%` }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#86868b] tabular-nums">
              <span>Уроки: {stats.completedLessonsCount}/24</span>
              <span>Лабы: {stats.completedLabsCount}/24</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
          {/* Main Student Section */}
          <div className="space-y-1">
            {!collapsed && (
              <span className="px-3 text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block mb-1.5">
                Обучение
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full font-medium text-xs transition-colors duration-150 group cursor-pointer ${
                    isActive
                      ? 'bg-[#262629] text-[#f5f5f7] font-semibold'
                      : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#1c1c1f]'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className={`transition-colors ${isActive ? 'text-[#0071e3]' : 'text-[#86868b] group-hover:text-[#f5f5f7]'}`}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-full font-medium tabular-nums ${
                        isActive
                          ? 'bg-[#333336] text-[#f5f5f7]'
                          : 'bg-[#1c1c1f] text-[#86868b]'
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
            <div className="space-y-1 pt-3 border-t border-[#262629]">
              {!collapsed && (
                <span className="px-3 text-[11px] font-semibold text-[#ff791b] uppercase tracking-wider block mb-1.5">
                  Администратор
                </span>
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
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full font-medium text-xs transition-colors duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#311400] text-[#ff791b] font-semibold'
                        : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#1c1c1f]'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className={`${isActive ? 'text-[#ff791b]' : 'text-[#86868b]'}`}>
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
        <div className="p-3 border-t border-[#262629] space-y-2">
          {!collapsed ? (
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href="https://t.me/aivioratj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-[16px] bg-[#1c1c1f] hover:bg-[#262629] border border-[#262629] flex flex-col gap-0.5 transition-colors group"
                title="Менеджер в Telegram (@aivioratj)"
              >
                <div className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                  <span className="text-[#f5f5f7] font-semibold leading-tight text-[11px]">Telegram</span>
                </div>
                <span className="text-[10px] text-[#86868b] truncate">@aivioratj</span>
              </a>

              <a
                href="https://wa.me/992170009000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-[16px] bg-[#1c1c1f] hover:bg-[#262629] border border-[#262629] flex flex-col gap-0.5 transition-colors group"
                title="WhatsApp: +992170009000"
              >
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#00d959] shrink-0" />
                  <span className="text-[#f5f5f7] font-semibold leading-tight text-[11px]">WhatsApp</span>
                </div>
                <span className="text-[10px] text-[#86868b] truncate">+992170009000</span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <a
                href="https://t.me/aivioratj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-[#0071e3] hover:bg-[#1c1c1f] transition-colors"
                title="Менеджер в Telegram (@aivioratj)"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/992170009000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-[#00d959] hover:bg-[#1c1c1f] transition-colors"
                title="WhatsApp: +992170009000"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          )}

          <button
            onClick={logoutStudent}
            className="w-full flex items-center gap-2 p-2.5 rounded-full text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-medium transition-colors cursor-pointer"
            title="Выйти из аккаунта"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Выйти из системы</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
