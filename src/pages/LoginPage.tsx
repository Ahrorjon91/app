import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  KeyRound,
  AlertCircle,
  UserPlus,
  CheckCircle2,
  Users,
  GraduationCap,
  Sparkles,
  Terminal,
  Layers,
  Check
} from 'lucide-react';
import { getStaticUserIdForEmail } from '../lib/userIdUtils';

import { authApi } from '../api/authApi';

export const LoginPage: React.FC = () => {
  const { loginStudent, addUserAccount, userAccounts, currentCourseId, setCurrentCourseId, courses } = usePortal();

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Selected Course
  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('devops_selected_course');
      if (saved) return saved;
    } catch {}
    return currentCourseId || 'ai-for-life';
  });

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    if (setCurrentCourseId) {
      setCurrentCourseId(courseId as any);
    }
    try {
      localStorage.setItem('devops_selected_course', courseId);
    } catch {}
  };

  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regGroup, setRegGroup] = useState('Группа 1 (Август 2026)');

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle Login Submit with Server Authentication & Cryptographic Session Token
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        throw new Error('Пожалуйста, введите логин и пароль.');
      }

      const inputClean = username.trim().toLowerCase();
      const inputPass = password.trim();

      // Real server-authoritative authentication via SQLite backend
      const res = await authApi.login(inputClean, inputPass);

      if (!res || !res.success) {
        throw new Error(res?.error || 'Неверный логин или пароль');
      }

      const rawUser = (res as any).user || (res as any).data?.user || (res as any).student;
      const rawToken = (res as any).token || (res as any).data?.token;

      if (!rawUser) {
        throw new Error('Не удалось получить профиль пользователя от сервера');
      }

      // Determine final course: if user selected a course on login page, use it; or use user's assigned course
      const effectiveCourseId = selectedCourseId || rawUser.courseId || (rawUser.course && rawUser.course.toLowerCase().includes('linux') ? 'sysadmin-devops' : 'ai-for-life');
      const effectiveCourseTitle = effectiveCourseId === 'sysadmin-devops' ? 'Linux & DevOps System Administration' : 'AI for LIFE — Vibe Coding & Agentic AI';

      if (setCurrentCourseId) {
        setCurrentCourseId(effectiveCourseId as any);
      }
      try {
        localStorage.setItem('devops_selected_course', effectiveCourseId);
      } catch {}

      if (rawToken) {
        localStorage.setItem('devops_auth_token', rawToken);
      }
      localStorage.setItem(
        'devops_auth_profile',
        JSON.stringify({
          ...rawUser,
          courseId: effectiveCourseId,
          course: effectiveCourseTitle,
          token: rawToken,
          sessionToken: rawToken,
          isAuthenticated: true,
        })
      );

      loginStudent({
        ...rawUser,
        courseId: effectiveCourseId,
        course: effectiveCourseTitle,
        token: rawToken,
        loginUsername: rawUser.email?.split('@')[0] || inputClean,
      });

      setLoading(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка входа');
      setLoading(false);
    }
  };

  // Handle Registration Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
        throw new Error('Заполните все обязательные поля!');
      }

      if (regPassword.length < 4) {
        throw new Error('Пароль должен содержать минимум 4 символа!');
      }

      if (regPassword !== regPasswordConfirm) {
        throw new Error('Пароли не совпадают! Проверьте повторный ввод.');
      }

      const cleanEmail = regEmail.trim().toLowerCase();

      // Check duplicate in local userAccounts
      const existsLocally = userAccounts.some(
        (u) =>
          (u.email && String(u.email).toLowerCase().trim() === cleanEmail) ||
          (u.name && String(u.name).toLowerCase().trim() === regName.trim().toLowerCase())
      );

      if (existsLocally) {
        throw new Error(`Пользователь с Email или логином "${cleanEmail}" уже зарегистрирован! Войдите в кабинет.`);
      }

      // 1. Generate permanent deterministic ID
      const staticId = getStaticUserIdForEmail(cleanEmail, userAccounts);

      const effectiveCourseTitle = selectedCourseId === 'sysadmin-devops' ? 'Linux & DevOps System Administration' : 'AI for LIFE — Vibe Coding & Agentic AI';
      // 2. Add user locally in PortalContext and persist directly into SQLite
      const newStudentUser = {
        id: staticId,
        name: regName.trim(),
        email: cleanEmail,
        password: regPassword.trim(),
        role: 'student' as const,
        status: 'Pending' as const, // Requires Admin Approval
        group: regGroup,
        course: effectiveCourseTitle,
        courseId: selectedCourseId,
        unlockedLessonsCount: 1,
        completedLessonsCount: 0,
        completedLabsCount: 0,
        passedQuizCount: 0,
        attendancePct: 100,
      };
      await addUserAccount(newStudentUser);

      setLoading(false);
      // Pre-fill login username with registered email/login
      setUsername(cleanEmail);
      setPassword(regPassword.trim());
      setSuccessMessage(
        `✅ Регистрация прошла успешно! Ваш аккаунт "${regName.trim()}" передан на подтверждение администратору. После одобрения вы сможете войти.`
      );
      
      // Default to Login Page after registration
      setAuthMode('login');

      // Clear registration form
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegPasswordConfirm('');

    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка при регистрации.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-200 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Glow Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl space-y-5 relative z-10 my-8">
        {/* Branding Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-emerald-500 text-white shadow-xl shadow-cyan-500/20 mb-1 border border-white/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            DEVOPS & AI <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">ACADEMY</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Единый портал обучения • AI for LIFE & Linux SysAdmin (2 курса в 1 приложении)
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#14141B] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {/* COURSE SELECTOR SECTION */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Выберите курс для входа / Choose Course:</span>
              </label>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                1 VPS • 2 Программы
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: AI for LIFE */}
              <button
                type="button"
                onClick={() => handleSelectCourse('ai-for-life')}
                className={`p-3.5 rounded-2xl text-left transition-all border relative cursor-pointer group ${
                  selectedCourseId === 'ai-for-life'
                    ? 'bg-gradient-to-br from-cyan-950/60 to-blue-950/40 border-cyan-500/80 shadow-lg shadow-cyan-500/15 ring-2 ring-cyan-500/40'
                    : 'bg-[#0E0E14] border-white/10 hover:border-cyan-500/40 hover:bg-[#12131C]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-sm shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        AI for LIFE
                      </h3>
                      <p className="text-[10px] text-cyan-400 font-semibold">
                        Vibe Coding & Agentic AI
                      </p>
                    </div>
                  </div>
                  {selectedCourseId === 'ai-for-life' ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold shrink-0">
                      <Check className="w-3 h-3" /> Выбран
                    </span>
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-slate-600 shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  Промпт-инжиниринг, Cursor/Windsurf, мультимодальный ИИ, веб-приложения и n8n-агенты.
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>📚 24 урока • 12 нед.</span>
                  <span className="text-cyan-400 font-semibold">AI Stack</span>
                </div>
              </button>

              {/* Option 2: Linux & SysAdmin */}
              <button
                type="button"
                onClick={() => handleSelectCourse('sysadmin-devops')}
                className={`p-3.5 rounded-2xl text-left transition-all border relative cursor-pointer group ${
                  selectedCourseId === 'sysadmin-devops'
                    ? 'bg-gradient-to-br from-emerald-950/60 to-teal-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/15 ring-2 ring-emerald-500/40'
                    : 'bg-[#0E0E14] border-white/10 hover:border-emerald-500/40 hover:bg-[#12131C]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-sm shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                        Linux & SysAdmin
                      </h3>
                      <p className="text-[10px] text-emerald-400 font-semibold">
                        DevOps & Servers
                      </p>
                    </div>
                  </div>
                  {selectedCourseId === 'sysadmin-devops' ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold shrink-0">
                      <Check className="w-3 h-3" /> Выбран
                    </span>
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-slate-600 shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  Архитектура Linux, Bash-скрипты, сети, Nginx, PostgreSQL, Docker, CI/CD и Prometheus.
                </p>
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>🐧 24 урока • 12 нед.</span>
                  <span className="text-emerald-400 font-semibold">DevOps Stack</span>
                </div>
              </button>
            </div>

            {/* Visual active course banner */}
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
              selectedCourseId === 'sysadmin-devops'
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                  selectedCourseId === 'sysadmin-devops' ? 'text-emerald-400' : 'text-cyan-400'
                }`} />
                <span className="text-[11px]">
                  Активный курс: <strong className="font-bold underline underline-offset-2">
                    {selectedCourseId === 'sysadmin-devops' ? 'Linux & DevOps System Administration' : 'AI for LIFE — Vibe Coding & Agentic AI'}
                  </strong>
                </span>
              </div>
              <span className="text-[10px] font-mono opacity-80 shrink-0 hidden sm:inline">
                {selectedCourseId === 'sysadmin-devops' ? '🐧 SysAdmin' : '🧠 AI Academy'}
              </span>
            </div>
          </div>

          {/* Tabs: Login vs Register */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#0D0D12] border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'login'
                  ? selectedCourseId === 'sysadmin-devops'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Вход</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Регистрация</span>
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="leading-relaxed">{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className={`w-4 h-4 ${selectedCourseId === 'sysadmin-devops' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                  Авторизация в Системе
                </h2>
                <p className="text-[11px] text-slate-400">
                  Введите ваш логин или Email и пароль для входа в кабинет курса {selectedCourseId === 'sysadmin-devops' ? 'Linux & SysAdmin' : 'AI for LIFE'}
                </p>
              </div>

              {/* Username / Student Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Логин или Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="student@devopspro.tech"
                    className={`w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                      selectedCourseId === 'sysadmin-devops'
                        ? 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                        : 'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                      selectedCourseId === 'sysadmin-devops'
                        ? 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                        : 'focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer ${
                  selectedCourseId === 'sysadmin-devops'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-500/20'
                }`}
              >
                {loading ? (
                  <span>Проверка данных...</span>
                ) : (
                  <>
                    <span>Войти в {selectedCourseId === 'sysadmin-devops' ? 'Linux & SysAdmin' : 'AI for LIFE'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-indigo-400" /> Регистрация Нового Студента
                </h2>
                <p className="text-[11px] text-slate-400">
                  Заполните данные для курса <strong className="text-white">{selectedCourseId === 'sysadmin-devops' ? 'Linux & SysAdmin' : 'AI for LIFE'}</strong>.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  ФИО / Имя и Фамилия
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Муллоджон Кобилов"
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Email / Username */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  Email или Логин
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mullojon@devopspro.tech"
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Придумайте пароль (мин. 4 символа)"
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Confirm */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  Повторите Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                    placeholder="Повторите введенный пароль"
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Select Group */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  Учебная Группа
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <select
                    value={regGroup}
                    onChange={(e) => setRegGroup(e.target.value)}
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="Группа 1 (Август 2026)">Группа 1 (Август 2026)</option>
                    <option value="Группа 2 (Сентябрь 2026)">Группа 2 (Сентябрь 2026)</option>
                    <option value="Индивидуальное Обучение">Индивидуальное Обучение</option>
                  </select>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer mt-1"
              >
                {loading ? (
                  <span>Отправка заявки...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Отправить Заявку на Регистрацию</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-500">
          DevOps & AI Unified Platform • High-Speed SQLite Database • Single VPS Architecture
        </p>
      </div>
    </div>
  );
};
