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
  GraduationCap
} from 'lucide-react';
import { getStaticUserIdForEmail } from '../lib/userIdUtils';

import { authApi } from '../api/authApi';

export const LoginPage: React.FC = () => {
  const { loginStudent, addUserAccount, userAccounts } = usePortal();

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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

      if (rawToken) {
        localStorage.setItem('devops_auth_token', rawToken);
      }
      localStorage.setItem(
        'devops_auth_profile',
        JSON.stringify({
          ...rawUser,
          token: rawToken,
          sessionToken: rawToken,
          isAuthenticated: true,
        })
      );

      loginStudent({
        ...rawUser,
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

      // 2. Add user locally in PortalContext and persist directly into SQLite
      const newStudentUser = {
        id: staticId,
        name: regName.trim(),
        email: cleanEmail,
        password: regPassword.trim(),
        role: 'student' as const,
        status: 'Pending' as const, // Requires Admin Approval
        group: regGroup,
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
      <div className="w-full max-w-md space-y-5 relative z-10 my-8">
        {/* Branding Logo */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/20 mb-1 border border-white/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            DEVOPS <span className="text-cyan-400">ACADEMY</span>
          </h1>
          <p className="text-xs text-slate-400">
            Портал Обучения Системных Администраторов & DevOps Инженеров
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#14141B] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5">
          {/* Tabs: Login vs Register */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#0D0D12] border border-white/10">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authMode === 'login'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
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
              className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
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
                  <KeyRound className="w-4 h-4 text-cyan-400" /> Авторизация в Системе
                </h2>
                <p className="text-[11px] text-slate-400">
                  Введите ваш логин или Email и пароль для входа в Личный Кабинет
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
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
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
                    className="w-full bg-[#0D0D12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Проверка данных...</span>
                ) : (
                  <>
                    <span>Войти в Кабинет</span>
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
                  Заполните данные. Аккаунт отправляется на подтверждение администратору.
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
          AI for LIFE Platform v3.0.0 • High-Speed SQLite Database Edition
        </p>
      </div>
    </div>
  );
};
