import React from 'react';
import { usePortal } from '../context/PortalContext';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export const AccessDeniedPage: React.FC = () => {
  const { setActivePage, profile } = usePortal();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-white dark:bg-[#14141B] border border-rose-500/20 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/10">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-bold uppercase tracking-wider">
            Access Denied • 403 Forbidden
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Доступ Запрещен
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Вы вошли под ролью <strong className="text-slate-800 dark:text-slate-200 uppercase">{profile.role || 'student'}</strong>.
            У вас нет прав для доступа к системным настройкам, деплою VPS, управлению пользователями и разблокировке уроков.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/5 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Разрешенный доступ студента:</span>
          </div>
          <ul className="list-disc list-inside text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pl-1">
            <li>Дашборд и Профиль</li>
            <li>Доступные Уроки и Виртуальные Лабы</li>
            <li>Сдача Домашних Заданий и Тестов</li>
            <li>Сертификаты и Материалы</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>На Главный Дашборд</span>
          </button>
          <button
            onClick={() => setActivePage('lessons')}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>К Моим Урокам</span>
          </button>
        </div>
      </div>
    </div>
  );
};
