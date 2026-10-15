import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  User,
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

  // Auto-hide dropdowns when clicking outside
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
    { id: 1, title: 'Лабораторная #18 доступна к сдаче', time: '10 мин назад', read: false },
    { id: 2, title: 'Оценка за Домашнюю работу #15: 95/100', time: '2 часа назад', read: false },
    { id: 3, title: 'Консультация с Ментором в 16:00', time: '1 день назад', read: true }
  ];

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-15 bg-[#000000]/85 backdrop-blur-md border-b border-white/[0.08] text-[#f5f5f7] px-3 sm:px-5 md:px-8 flex items-center justify-between transition-colors gap-3">
      {/* Left controls & location */}
      <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
        <button
          onClick={onMobileToggle}
          className="p-2 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#262629] md:hidden shrink-0 transition-colors cursor-pointer"
          aria-label="Открыть меню"
        >
          <Menu className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#262629] hidden md:block shrink-0 transition-colors cursor-pointer"
          aria-label="Свернуть меню"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Apple Style Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#86868b] shrink min-w-0">
          <span className="text-[#f5f5f7] font-semibold tracking-tight text-[12px] shrink-0">AI Academy</span>
          <span className="text-[#424245]">/</span>
          <span className="text-[#86868b] capitalize truncate max-w-[140px]">{activePage.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Center Search bar: Apple pill search input */}
      <div className="flex-1 max-w-sm mx-2 hidden lg:block min-w-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Поиск по урокам и материалам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                setActivePage('lessons');
              }
            }}
            className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#0071e3] transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick Launch Button: Apple Pill Button */}
        <button
          onClick={() => setActivePage(activePage === 'lesson-detail' ? 'lessons' : 'lesson-detail')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activePage === 'lesson-detail'
              ? 'bg-[#0071e3] text-white'
              : 'bg-[#262629] text-[#f5f5f7] hover:bg-[#333336]'
          }`}
          title="Быстрый переход к текущему занятию"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00d959] shrink-0" />
          <span className="whitespace-nowrap tabular-nums text-[12px]">Урок {selectedLessonId || 1}</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative shrink-0" ref={notificationsDropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#262629] relative transition-colors cursor-pointer"
            aria-label="Уведомления"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#000000] border border-[#333336] rounded-[24px] py-2 z-50">
              <div className="px-4 py-2.5 border-b border-[#262629] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f5f5f7]">Уведомления</span>
                <span className="text-[11px] text-[#0071e3] font-medium">3 новых</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-[#1c1c1f]">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#161618] cursor-pointer transition-colors flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#f5f5f7] font-medium leading-snug">{n.title}</p>
                      <span className="text-[11px] text-[#86868b]">{n.time}</span>
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
            className="flex items-center gap-2 pl-2 pr-2 py-1 rounded-full hover:bg-[#262629] transition-colors cursor-pointer"
          >
            <img
              src={profile.avatarUrl || studentAvatarSvg}
              alt={profile.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-[#333336] shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = studentAvatarSvg;
              }}
            />
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#f5f5f7] leading-tight truncate max-w-[100px]">{profile.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-semibold uppercase tracking-wider shrink-0 ${
                  profile.role === 'admin'
                    ? 'bg-[#311400] text-[#ff791b]'
                    : 'bg-[#1c2e22] text-[#00d959]'
                }`}>
                  {profile.role || 'student'}
                </span>
              </div>
              <span className="text-[10px] text-[#86868b] font-medium font-mono">ID: {profile.id}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#86868b] hidden lg:block shrink-0" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#000000] border border-[#333336] rounded-[24px] py-2 z-50">
              <div className="px-4 py-3 border-b border-[#262629]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-[#f5f5f7]">{profile.name}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    profile.role === 'admin' ? 'bg-[#ff791b] text-white' : 'bg-[#00d959] text-black font-semibold'
                  }`}>
                    {profile.role || 'student'}
                  </span>
                </div>
                <p className="text-[11px] text-[#86868b] truncate font-mono">{profile.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActivePage('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs text-[#f5f5f7] hover:bg-[#161618] flex items-center gap-2.5 font-medium transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#0071e3]" />
                  <span>Профиль студента</span>
                </button>
                {profile.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActivePage('unlock-lessons');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-xs text-[#ff791b] hover:bg-[#161618] flex items-center gap-2.5 font-semibold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Разблокировка Уроков & ДЗ</span>
                  </button>
                )}
                <div className="pt-1 mt-1 border-t border-[#262629]">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logoutStudent();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 font-medium transition-colors cursor-pointer"
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
