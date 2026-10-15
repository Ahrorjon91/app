import React from 'react';
import { usePortal } from '../context/PortalContext';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export const AccessDeniedPage: React.FC = () => {
  const { setActivePage, profile } = usePortal();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-[#161618] border border-white/[0.08] rounded-[28px] p-8 space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#ff453a]/10 border border-[#ff453a]/20 text-[#ff453a] flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#ff453a]/10 border border-[#ff453a]/20 text-[#ff453a] text-[11px] font-semibold uppercase tracking-wider">
            Access Denied • 403 Forbidden
          </span>
          <h1 className="text-2xl font-semibold text-[#f5f5f7] tracking-tight">
            Доступ Запрещен
          </h1>
          <p className="text-xs text-[#86868b] leading-relaxed">
            Вы вошли под ролью <strong className="text-[#f5f5f7] uppercase font-semibold">{profile.role || 'student'}</strong>.
            У вас нет прав для доступа к системным настройкам, деплою VPS, управлению пользователями и разблокировке уроков.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] text-left text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[#f5f5f7]">
            <Lock className="w-4 h-4 text-[#ff791a]" />
            <span>Разрешенный доступ студента:</span>
          </div>
          <ul className="list-disc list-inside text-[11px] text-[#86868b] space-y-1 pl-1">
            <li>Дашборд и Профиль</li>
            <li>Доступные Уроки и Виртуальные Лабы</li>
            <li>Сдача Домашних Заданий и Тестов</li>
            <li>Сертификаты и Материалы</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full py-3 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>На Главный Дашборд</span>
          </button>
          <button
            onClick={() => setActivePage('lessons')}
            className="w-full py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] font-medium text-xs border border-white/[0.08] flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#86868b]" />
            <span>К Моим Урокам</span>
          </button>
        </div>
      </div>
    </div>
  );
};
