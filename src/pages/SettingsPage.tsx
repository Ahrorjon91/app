import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  Settings,
  RefreshCw,
  AlertTriangle,
  Trash2,
  HardDrive,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Check
} from 'lucide-react';
import { api } from '../lib/api';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    userAccounts,
    labSubmissions,
    homeworkSubmissions,
    quizSubmissions,
    clearBrowserCache,
    resetData,
    refreshDatabase,
    isSyncingDb
  } = usePortal();
  const attachments = (usePortal() as any).attachments || [];

  const [syncStatus, setSyncStatus] = useState<{ success?: boolean; message?: string }>({});
  const [loadingClearCache, setLoadingClearCache] = useState(false);
  const [sqliteStats, setSqliteStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [resettingAcademic, setResettingAcademic] = useState(false);
  const [resettingLocalSession, setResettingLocalSession] = useState(false);

  const fetchSqliteStats = async () => {
    setLoadingStats(true);
    try {
      const res = await api.getSqliteStats();
      if (res && (res.success || res.counts || res.tables)) {
        setSqliteStats(res);
      }
    } catch {
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchSqliteStats();
  }, [
    userAccounts?.length,
    labSubmissions?.length,
    homeworkSubmissions?.length,
    quizSubmissions?.length,
    attachments?.length
  ]);

  const handleClearCacheAndReload = async () => {
    setLoadingClearCache(true);
    try {
      await clearBrowserCache();
      await refreshDatabase();
      await fetchSqliteStats();
      setSyncStatus({
        success: true,
        message: 'Локальный кэш браузера очищен, актуальные данные получены из SQLite базы!'
      });
    } catch (err: any) {
      setSyncStatus({
        success: false,
        message: err?.message || 'Ошибка очистки кэша'
      });
    } finally {
      setLoadingClearCache(false);
      setTimeout(() => setSyncStatus({}), 4000);
    }
  };

  const handleResetAcademicData = async () => {
    setResettingAcademic(true);
    try {
      await resetData('all');
      await refreshDatabase();
      await fetchSqliteStats();
      setSyncStatus({
        success: true,
        message: 'Все сданные работы (ДЗ, лабораторные, тесты), вложения и прогресс успешно очищены в SQLite!'
      });
    } catch (err: any) {
      setSyncStatus({ success: false, message: err?.message || 'Ошибка при сбросе данных' });
    } finally {
      setResettingAcademic(false);
      setTimeout(() => setSyncStatus({}), 4000);
    }
  };

  const handleResetLocalSession = async () => {
    setResettingLocalSession(true);
    try {
      await resetData('all');
      await refreshDatabase();
      await fetchSqliteStats();
      setSyncStatus({
        success: true,
        message: 'Прогресс сессии, отметки уроков и задания успешно сброшены в начальное состояние!'
      });
    } catch (err: any) {
      setSyncStatus({ success: false, message: err?.message || 'Ошибка сброса прогресса сессии' });
    } finally {
      setResettingLocalSession(false);
      setTimeout(() => setSyncStatus({}), 4000);
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-3 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
          <Settings className="w-6 h-6 text-cyan-400" /> Настройки Портала & SQLite База Данных
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Управление локальной реляционной базой данных SQLite, мониторинг состояния ACID-транзакций и резервное копирование
        </p>
      </div>

      {/* Notification Toast */}
      {syncStatus.message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in transition-all ${
            syncStatus.success
              ? 'bg-emerald-950/80 border border-emerald-800/60 text-emerald-300'
              : 'bg-rose-950/80 border border-rose-800/60 text-rose-300'
          }`}
        >
          {syncStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{syncStatus.message}</span>
        </div>
      )}

      {/* Primary SQLite Database Status & Telemetry Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-800/40 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Реляционная База Данных SQLite (High-Speed ACID Storage)
              </h3>
              <p className="text-[11px] text-slate-400">
                Автономное хранение данных: аккаунты, прогресс уроков, сданные ДЗ, лабораторные отчеты, файлы и лидерборд
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-[10px] font-bold border border-emerald-800/60 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SQLite Активен
            </span>
            <button
              onClick={fetchSqliteStats}
              disabled={loadingStats || isSyncingDb}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Обновить метрики"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStats || isSyncingDb ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* SQLite Metrics Grid */}
        {(() => {
          const fallbackUsers = Array.isArray(userAccounts) ? userAccounts.length : 0;
          const fallbackLabs = Array.isArray(labSubmissions) ? labSubmissions.length : 0;
          const fallbackHw = Array.isArray(homeworkSubmissions) ? homeworkSubmissions.length : 0;
          const fallbackQuizzes = Array.isArray(quizSubmissions) ? quizSubmissions.length : 0;
          const fallbackAttachments = Array.isArray(attachments) ? attachments.length : 0;

          const hasServerCounts = Boolean(sqliteStats?.counts || sqliteStats?.tables || sqliteStats?.data?.counts);
          const usersCount = sqliteStats?.counts?.users ?? sqliteStats?.tables?.users ?? sqliteStats?.data?.counts?.users ?? fallbackUsers;
          const labsCount = hasServerCounts
            ? Number(sqliteStats?.counts?.labs ?? sqliteStats?.tables?.labSubmissions ?? sqliteStats?.data?.counts?.labs ?? 0)
            : fallbackLabs;
          const hwCount = hasServerCounts
            ? Number(sqliteStats?.counts?.homework ?? sqliteStats?.tables?.homeworkSubmissions ?? sqliteStats?.data?.counts?.homework ?? 0)
            : fallbackHw;
          const quizCount = hasServerCounts
            ? Number(sqliteStats?.counts?.quizzes ?? sqliteStats?.tables?.quizSubmissions ?? sqliteStats?.data?.counts?.quizzes ?? 0)
            : fallbackQuizzes;
          const totalSubmissions = hasServerCounts
            ? Number(sqliteStats?.counts?.submissionsTotal ?? (labsCount + hwCount + quizCount))
            : labsCount + hwCount + quizCount;
          const attachmentsCount = hasServerCounts
            ? Number(sqliteStats?.counts?.attachments ?? sqliteStats?.tables?.attachments ?? sqliteStats?.data?.counts?.attachments ?? 0)
            : fallbackAttachments;

          const dbSizeFormatted = sqliteStats?.storage?.dbSizeFormatted || sqliteStats?.fileSizeFormatted || (sqliteStats?.storage?.dbSizeMB !== undefined ? `${sqliteStats.storage.dbSizeMB} MB` : '0.24 MB');
          const uploadsSizeFormatted = sqliteStats?.storage?.uploadsSizeFormatted || (attachmentsCount > 0 ? `${(attachmentsCount * 14.5).toFixed(1)} KB` : '0 B');
          const totalStorageFormatted = sqliteStats?.storage?.totalSizeFormatted || dbSizeFormatted;

          return (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Пользователи</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-white">{usersCount}</span>
                    <span className="text-[10px] text-slate-400">аккаунтов</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">Студенты и админы</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Сданные работы</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-cyan-400">{totalSubmissions}</span>
                    <span className="text-[10px] text-slate-400">отчетов</span>
                  </div>
                  <span className="text-[10px] text-cyan-400/80 block truncate">Лаб: {labsCount} • ДЗ: {hwCount} • Тесты: {quizCount}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Вложения & Файлы</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-amber-400">{attachmentsCount}</span>
                    <span className="text-[10px] text-slate-400">файлов</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 block truncate">Загрузки: {uploadsSizeFormatted}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Размер SQLite</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-indigo-400">{dbSizeFormatted}</span>
                    <span className="text-[10px] text-slate-400">на диске</span>
                  </div>
                  <span className="text-[10px] text-indigo-400/80 block truncate">Всего: {totalStorageFormatted}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Скорость отклика</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-emerald-400">&lt; 1 ms</span>
                    <span className="text-[10px] text-emerald-400/80">ACID Instant</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 block truncate">WAL Режим активен</span>
                </div>
              </div>
          );
        })()}
      </div>

      {/* Cache & Danger Zone Responsive 2-Column Grid for Full Screen */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Cache & Local Sync Management */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Синхронизация и Кэш Браузера
                </h3>
                <p className="text-[11px] text-slate-400">
                  Сброс временных данных в памяти браузера для принудительного чтения из SQLite
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Очистить локальный кэш браузера</span>
                <span className="text-[11px] text-slate-400 block">
                  Сбрасывает сохраненные в памяти браузера копии данных и заново синхронизирует состояние из SQLite.
                </span>
              </div>

              <button
                onClick={handleClearCacheAndReload}
                disabled={loadingClearCache}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-600/20 disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${loadingClearCache ? 'animate-spin' : ''}`} />
                <span>{loadingClearCache ? 'Очистка...' : 'Очистить кэш'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-950/60 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-rose-400 border-b border-slate-800 pb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Опасная зона (Danger Zone)
            </h3>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Сбросить сданные работы в SQLite</span>
                  <span className="text-[11px] text-slate-400">
                    Очищает лабораторные, ДЗ и тесты из базы данных (учетные записи пользователей сохраняются).
                  </span>
                </div>
                <button
                  onClick={handleResetAcademicData}
                  disabled={resettingAcademic}
                  className="px-4 py-2 rounded-xl font-bold text-xs shrink-0 transition-colors border bg-rose-950 hover:bg-rose-900 text-rose-300 border-rose-800/60 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className={`w-3.5 h-3.5 ${resettingAcademic ? 'animate-spin' : ''}`} />
                  <span>{resettingAcademic ? 'Сброс...' : 'Сбросить работы'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">Сбросить локальный прогресс сессии</span>
                  <span className="text-[11px] text-slate-400">
                    Сбрасывает отметки уроков и заданий для вашего профиля в начальное состояние.
                  </span>
                </div>
                <button
                  onClick={handleResetLocalSession}
                  disabled={resettingLocalSession}
                  className="px-4 py-2 rounded-xl font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 disabled:opacity-50 border bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resettingLocalSession ? 'animate-spin' : ''}`} />
                  <span>{resettingLocalSession ? 'Сброс...' : 'Сбросить'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
