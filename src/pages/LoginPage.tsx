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

  // Handle Login Submit with Server Authentication & Session Token
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
        throw new Error('Пожалуйста, заполните все обязательные поля.');
      }

      if (regPassword.length < 4) {
        throw new Error('Пароль должен содержать минимум 4 символа.');
      }

      if (regPassword !== regPasswordConfirm) {
        throw new Error('Пароли не совпадают. Пожалуйста, проверьте ввод.');
      }

      const cleanEmail = regEmail.trim().toLowerCase();
      const existingUser = (userAccounts || []).find(
        (u) => (u.email || '').toLowerCase().trim() === cleanEmail
      );
      if (existingUser) {
        throw new Error('Пользователь с таким Email уже зарегистрирован в системе.');
      }

      const staticId = getStaticUserIdForEmail(cleanEmail, userAccounts);

      const newStudentUser = {
        id: staticId,
        name: regName.trim(),
        email: cleanEmail,
        password: regPassword.trim(),
        role: 'student' as const,
        status: 'Pending' as const,
        group: regGroup,
        unlockedLessonsCount: 1,
        completedLessonsCount: 0,
        completedLabsCount: 0,
        passedQuizCount: 0,
        attendancePct: 100,
      };
      await addUserAccount(newStudentUser);

      setLoading(false);
      setUsername(cleanEmail);
      setPassword(regPassword.trim());
      setSuccessMessage(
        `Регистрация прошла успешно. Аккаунт "${regName.trim()}" передан на подтверждение администратору.`
      );
      
      setAuthMode('login');
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
    <div className="min-h-screen bg-[#111111] text-[#f5f5f7] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-md space-y-6 relative z-10 my-8">
        {/* Branding Logo: Apple Titanium Minimalist Style */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1c1c1f] text-[#f5f5f7] border border-[#333336] mb-1">
            <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#f5f5f7]">
            AI ACADEMY
          </h1>
          <p className="text-xs text-[#86868b]">
            Vibe Coding & Generative AI Learning Platform
          </p>
        </div>

        {/* Main Card: Absolute Black Stage #000000, 28px Radius */}
        <div className="bg-[#000000] border border-white/[0.08] rounded-[28px] p-6 sm:p-8 space-y-6">
          {/* Tabs: Apple Pill Selector */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-[#1c1c1f] border border-[#262629]">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-[#0071e3] text-white'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
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
              className={`py-2 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#0071e3] text-white'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Регистрация</span>
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-[18px] bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-[18px] bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959] text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0" />
              <span className="leading-relaxed">{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#0071e3]" /> Вход в личный кабинет
                </h2>
                <p className="text-[11px] text-[#86868b]">
                  Введите логин или Email для доступа к учебным материалам
                </p>
              </div>

              {/* Username / Student Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#86868b] block">
                  Логин или Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="student@devopspro.tech"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2.5 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#86868b] block">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2.5 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button: Apple Purchase Blue Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Проверка данных...</span>
                ) : (
                  <>
                    <span>Войти в систему</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#0071e3]" /> Регистрация студента
                </h2>
                <p className="text-[11px] text-[#86868b]">
                  Заполните анкету для создания учетной записи
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#86868b] block">
                  ФИО / Имя и Фамилия
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Муллоджон Кобилов"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Email / Username */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#86868b] block">
                  Email или Логин
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="text"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="mullojon@devopspro.tech"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#86868b] block">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Минимум 4 символа"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Password Confirm */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#86868b] block">
                  Повторите Пароль
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
                  <input
                    type="password"
                    required
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                    placeholder="Повторите пароль"
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-4 py-2 text-xs text-[#f5f5f7] placeholder-[#6e6e73] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
              </div>

              {/* Select Group */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#86868b] block">
                  Учебная Группа
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b] pointer-events-none" />
                  <select
                    value={regGroup}
                    onChange={(e) => setRegGroup(e.target.value)}
                    className="w-full bg-[#1c1c1f] border border-[#333336] rounded-full pl-11 pr-4 py-2 text-xs text-[#f5f5f7] focus:outline-none focus:border-[#0071e3] transition-colors"
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
                className="w-full py-3 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer mt-1"
              >
                {loading ? (
                  <span>Отправка данных...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Отправить заявку</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#86868b]">
          AI Academy Platform · High-Speed SQLite Edition
        </p>
      </div>
    </div>
  );
};
