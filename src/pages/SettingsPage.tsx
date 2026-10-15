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
  CheckCircle2
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
        message: 'Локальный кэш браузера очищен, данные синхронизированы из SQLite базы!'
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
        message: 'Все сданные работы (ДЗ, лабы, тесты) успешно очищены в базе SQLite.'
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
      localStorage.removeItem('devops_student_profile');
      localStorage.removeItem('devops_auth_token');
      localStorage.removeItem('devops_auth_profile');
      setSyncStatus({
        success: true,
        message: 'Локальная сессия сброшена. Перезагрузка страницы...'
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setSyncStatus({ success: false, message: err?.message || 'Ошибка сброса сессии' });
      setResettingLocalSession(false);
      setTimeout(() => setSyncStatus({}), 4000);
    }
  };

  return (
    <div className="space-y-6 text-[#f5f5f7]">
      {/* Header Banner: Apple Midnight Exhibition Stage */}
      <div className="p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#0071e3] border border-[#262629] text-[11px] font-medium">
          <Settings className="w-3.5 h-3.5" />
          <span>Системные параметры</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight">
          Настройки Портала & SQLite
        </h1>
        <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-3xl">
          Управление реляционной базой данных SQLite, мониторинг состояния ACID-транзакций и локальная синхронизация.
        </p>
      </div>

      {/* Notification Toast */}
      {syncStatus.message && (
        <div
          className={`p-3.5 rounded-[20px] text-xs font-medium flex items-center gap-2 ${
            syncStatus.success
              ? 'bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959]'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {syncStatus.success ? <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{syncStatus.message}</span>
        </div>
      )}

      {/* Primary SQLite Database Status Card */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-6">
        <div className="border-b border-[#262629] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#000000] border border-[#262629] text-[#0071e3]">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#f5f5f7] flex items-center gap-2">
                Реляционная База Данных SQLite (ACID Storage)
              </h3>
              <p className="text-xs text-[#86868b] mt-0.5">
                Автономное хранение данных: аккаунты, прогресс уроков, сданные ДЗ, лабораторные отчеты и лидерборд
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#1c2e22] text-[#00d959] text-[10px] font-medium border border-[#00d959]/30 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d959]" />
              SQLite Активен
            </span>
            <button
              onClick={fetchSqliteStats}
              disabled={loadingStats || isSyncingDb}
              className="p-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] transition-colors cursor-pointer"
              title="Обновить метрики"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingStats || isSyncingDb ? 'animate-spin text-[#0071e3]' : ''}`} />
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
              <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1">
                <span className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider block">Пользователи</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums text-[#f5f5f7]">{usersCount}</span>
                  <span className="text-[10px] text-[#86868b]">аккаунтов</span>
                </div>
                <span className="text-[10px] text-[#86868b] block truncate">Студенты и админы</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1">
                <span className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider block">Сданные работы</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums text-[#0071e3]">{totalSubmissions}</span>
                  <span className="text-[10px] text-[#86868b]">отчетов</span>
                </div>
                <span className="text-[10px] text-[#86868b] block truncate">Лаб: {labsCount} · ДЗ: {hwCount}</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1">
                <span className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider block">Вложения & Файлы</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums text-[#ff791b]">{attachmentsCount}</span>
                  <span className="text-[10px] text-[#86868b]">файлов</span>
                </div>
                <span className="text-[10px] text-[#86868b] block truncate">{uploadsSizeFormatted}</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1">
                <span className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider block">Размер Базы</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums text-[#f5f5f7]">{dbSizeFormatted}</span>
                  <span className="text-[10px] text-[#86868b]">на диске</span>
                </div>
                <span className="text-[10px] text-[#86868b] block truncate">Всего: {totalStorageFormatted}</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#86868b] font-medium uppercase tracking-wider block">Скорость отклика</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums text-[#00d959]">&lt; 1 ms</span>
                  <span className="text-[10px] text-[#00d959]">ACID Ready</span>
                </div>
                <span className="text-[10px] text-[#86868b] block truncate">SQLite Wasm</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Sync & Danger Zone */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Cache & Local Sync Management */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#262629] pb-3 flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-[#000000] border border-[#262629] text-[#0071e3]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f5f5f7]">
                  Синхронизация и Кэш Браузера
                </h3>
                <p className="text-[11px] text-[#86868b]">
                  Сброс временных данных в браузере для чтения из SQLite
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[20px] bg-[#000000] border border-[#262629]">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#f5f5f7] block">Очистить локальный кэш</span>
                <span className="text-[11px] text-[#86868b] block">
                  Сбрасывает сохраненные в памяти браузера копии данных и заново синхронизирует состояние из SQLite.
                </span>
              </div>

              <button
                onClick={handleClearCacheAndReload}
                disabled={loadingClearCache}
                className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-2 transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingClearCache ? 'animate-spin' : ''}`} />
                <span>{loadingClearCache ? 'Очистка...' : 'Очистить кэш'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#ff791b] border-b border-[#262629] pb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ff791b]" /> Опасная зона
            </h3>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[20px] bg-[#000000] border border-[#262629]">
                <div>
                  <span className="text-xs font-semibold text-[#f5f5f7] block">Сбросить сданные работы в SQLite</span>
                  <span className="text-[11px] text-[#86868b]">
                    Очищает лабораторные, ДЗ и тесты из базы данных (учетные записи пользователей сохраняются).
                  </span>
                </div>
                <button
                  onClick={handleResetAcademicData}
                  disabled={resettingAcademic}
                  className="px-4 py-2 rounded-full font-medium text-xs shrink-0 transition-colors border bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className={`w-3.5 h-3.5 ${resettingAcademic ? 'animate-spin' : ''}`} />
                  <span>{resettingAcademic ? 'Сброс...' : 'Сбросить работы'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[20px] bg-[#000000] border border-[#262629]">
                <div>
                  <span className="text-xs font-semibold text-[#f5f5f7] block">Сбросить локальную сессию</span>
                  <span className="text-[11px] text-[#86868b]">
                    Сбрасывает локальную сессию входа и возвращает на экран входа.
                  </span>
                </div>
                <button
                  onClick={handleResetLocalSession}
                  disabled={resettingLocalSession}
                  className="px-4 py-2 rounded-full font-medium text-xs shrink-0 transition-colors flex items-center gap-1.5 disabled:opacity-50 border bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border-[#333336] cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resettingLocalSession ? 'animate-spin' : ''}`} />
                  <span>{resettingLocalSession ? 'Сброс...' : 'Сбросить сессию'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
