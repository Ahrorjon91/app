import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Terminal,
  LogOut,
  User,
  Settings,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onMobileToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onMobileToggle }) => {
  const { profile, activePage, setActivePage, logoutStudent, selectedLessonId } = usePortal();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  // Auto-hide dropdowns when clicking outside or selecting other functions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Auto-close on page change
  useEffect(() => {
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  }, [activePage]);

  const notifications = [
    { id: 1, title: 'Лабораторная #18 доступна', time: '10 мин назад', read: false },
    { id: 2, title: 'Оценка за Домашнюю работу #15: 95/100', time: '2 часа назад', read: false },
    { id: 3, title: 'Консультация с Ментором завтра в 16:00', time: '1 день назад', read: true }
  ];

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/90 dark:bg-[#0D0D12]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 px-2.5 sm:px-4 md:px-6 flex items-center justify-between transition-colors duration-200 gap-2">
      {/* Left controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
        <button
          onClick={onMobileToggle}
          className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 md:hidden shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hidden md:block shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Location Breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 shrink min-w-0">
          <span className="text-cyan-500 dark:text-cyan-400 font-bold uppercase tracking-wider text-[11px] shrink-0">AI for LIFE</span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-800 dark:text-slate-100 font-semibold capitalize truncate max-w-[120px]">{activePage.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Center Search bar (compact & only on larger screens to avoid overflow) */}
      <div className="flex-1 max-w-xs mx-2 hidden xl:block min-w-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Поиск (AI, Vibe Coding, LLM)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                setActivePage('lessons');
              }
            }}
            className="w-full bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-full pl-8 pr-3 py-1 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls (all shrink-0 and compact) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Quick Launch: Quick Jump to Current Lesson (fits compactly in one line) */}
        <button
          onClick={() => setActivePage(activePage === 'lesson-detail' ? 'lessons' : 'lesson-detail')}
          className={`shrink-0 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all border ${
            activePage === 'lesson-detail'
              ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm shadow-cyan-600/30'
              : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/80 hover:border-cyan-500 hover:bg-cyan-900/40'
          }`}
          title="Быстрый переход к текущему занятию в 1 клик"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="whitespace-nowrap font-mono text-[11px] sm:text-xs">Урок {selectedLessonId || 1}</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative shrink-0" ref={notificationsDropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 relative transition-all group cursor-pointer"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bell transition-transform" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#14141B] border border-white/10 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Уведомления</span>
                <span className="text-[10px] text-blue-400 font-medium">3 новых</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-200 font-medium leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Student/Admin Profile Dropdown */}
        <div className="relative shrink-0" ref={profileDropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1.5 sm:pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-colors"
          >
            <img
              src={profile.avatarUrl || studentAvatarSvg}
              alt={profile.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-2 ring-blue-500/40 shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = studentAvatarSvg;
              }}
            />
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[100px]">{profile.name}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider shrink-0 ${
                  profile.role === 'admin'
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {profile.role || 'student'}
                </span>
              </div>
              <span className="text-[10px] text-blue-500 font-medium font-mono">ID: {profile.id}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block shrink-0" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2.5 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{profile.name}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                    profile.role === 'admin' ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {profile.role || 'student'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">{profile.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActivePage('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2.5 font-medium"
                >
                  <User className="w-4 h-4 text-blue-500" />
                  <span>Профиль студента</span>
                </button>
                {profile.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActivePage('unlock-lessons');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 flex items-center gap-2.5 font-bold"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Разблокировка Уроков & ДЗ</span>
                  </button>
                )}
                <div className="pt-1 mt-1 border-t border-slate-200 dark:border-white/5">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logoutStudent();
                    }}
                    className="w-full px-4 py-2 text-xs text-rose-500 hover:bg-rose-500/10 flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выйти из аккаунта</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
