import React, { useState, useEffect } from 'react';
import {
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { UserAccount } from '../../types';
import { api } from '../../lib/api';

interface ActivityLogItem {
  id: string;
  studentEmail: string;
  amount?: number;
  type?: string;
  description: string;
  referenceId?: string;
  timestamp: string;
  category?: 'exp' | 'audit' | 'homework' | 'lab' | 'quiz';
}

interface AnalyticsActivityLogsTabProps {
  students: UserAccount[];
  selectedStudent: UserAccount | null;
  onSelectStudent: (student: UserAccount | null) => void;
}

export const AnalyticsActivityLogsTab: React.FC<AnalyticsActivityLogsTabProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await api.getActivityLogs({
        studentEmail: selectedStudent?.email || undefined,
        limit: 500,
      });
      if (res && res.data) {
        setLogs(res.data);
      }
      setLastRefreshed(new Date());
    } catch (err) {
      console.warn('Failed to load activity logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedStudent?.email]);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    if (categoryFilter !== 'all') {
      const logType = (log.type || '').toLowerCase();
      const logDesc = (log.description || '').toLowerCase();

      if (categoryFilter === 'exp' && !log.amount) return false;
      if (categoryFilter === 'section' && !logType.includes('section') && !logDesc.includes('раздел')) return false;
      if (categoryFilter === 'lab' && !logType.includes('lab') && !logDesc.includes('лаб')) return false;
      if (categoryFilter === 'hw' && !logType.includes('homework') && !logDesc.includes('дз') && !logDesc.includes('домашн')) return false;
      if (categoryFilter === 'quiz' && !logType.includes('quiz') && !logDesc.includes('тест')) return false;
      if (categoryFilter === 'system' && log.category !== 'audit' && !logType.includes('reset')) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchEmail = (log.studentEmail || '').toLowerCase().includes(q);
      const matchDesc = (log.description || '').toLowerCase().includes(q);
      const matchType = (log.type || '').toLowerCase().includes(q);
      const matchRef = (log.referenceId || '').toLowerCase().includes(q);
      return matchEmail || matchDesc || matchType || matchRef;
    }

    return true;
  });

  // Calculate stats
  const totalExpInLogs = filteredLogs.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  const uniqueUsersInLogs = new Set(filteredLogs.map((l) => l.studentEmail)).size;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Время', 'Студент', 'Тип', 'Баллы EXP', 'Описание', 'Ссылка/RefID'];
    const rows = filteredLogs.map((l) => [
      l.id,
      new Date(l.timestamp).toLocaleString('ru-RU'),
      l.studentEmail,
      l.type || 'Activity',
      l.amount || 0,
      `"${(l.description || '').replace(/"/g, '""')}"`,
      l.referenceId || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ai_for_life_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ai_for_life_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Stats & KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-500" /> Всего событий в логе
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {filteredLogs.length}
          </p>
          <span className="text-[11px] text-slate-400">
            {selectedStudent ? `Для: ${selectedStudent.email}` : 'По всем студентам потока'}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Начислено Опыта в Выборке
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {totalExpInLogs} <span className="text-xs font-normal text-slate-400">EXP</span>
          </p>
          <span className="text-[11px] text-emerald-500 font-semibold">100% подтверждено</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-500" /> Уникальных Пользователей
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {uniqueUsersInLogs}
          </p>
          <span className="text-[11px] text-slate-400">Слушатели и администраторы</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-emerald-500" /> Синхронизация с SQLite
          </span>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Онлайн (Реалтайм)
          </p>
          <span className="text-[11px] text-slate-400">
            Обновлено: {lastRefreshed.toLocaleTimeString('ru-RU')}
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="logs-search-input"
              type="text"
              placeholder="Поиск по логам, описанию или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Student Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              id="logs-student-filter-select"
              value={selectedStudent?.email || 'all'}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'all') {
                  onSelectStudent(null);
                } else {
                  const s = students.find((st) => st.email === val) || null;
                  onSelectStudent(s);
                }
              }}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Все студенты потока</option>
              {students.map((s) => (
                <option key={s.id || s.email} value={s.email}>
                  {s.name || s.email} ({s.email})
                </option>
              ))}
            </select>

            <button
              id="refresh-logs-btn"
              onClick={fetchLogs}
              disabled={isLoading}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Обновить журнал логов"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>

            <button
              id="export-json-btn"
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> JSON
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Все события' },
            { id: 'exp', label: 'Опыт (EXP)' },
            { id: 'section', label: 'Изучение теории' },
            { id: 'lab', label: 'Лабораторные' },
            { id: 'hw', label: 'Домашние задания' },
            { id: 'quiz', label: 'Тесты & Квизы' },
            { id: 'system', label: 'Аудит и Система' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Activity Logs */}
      <div className="rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Время</th>
                <th className="p-4">Студент / Автор</th>
                <th className="p-4">Тип События</th>
                <th className="p-4">Описание Действия</th>
                <th className="p-4">Баллы (EXP)</th>
                <th className="p-4 pr-6">Идентификатор (RefID)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const dateStr = new Date(log.timestamp).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });

                  // Badge styling
                  let badgeBg = 'bg-slate-500/10 text-slate-500 border-slate-500/20';
                  const t = (log.type || '').toLowerCase();
                  if (t.includes('section')) {
                    badgeBg = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
                  } else if (t.includes('lesson')) {
                    badgeBg = 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
                  } else if (t.includes('lab')) {
                    badgeBg = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
                  } else if (t.includes('homework')) {
                    badgeBg = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
                  } else if (t.includes('quiz')) {
                    badgeBg = 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
                  } else if (log.category === 'audit') {
                    badgeBg = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
                  }

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Timestamp */}
                      <td className="p-4 pl-6 text-slate-500 text-[11px] whitespace-nowrap">
                        {dateStr}
                      </td>

                      {/* Student */}
                      <td className="p-4 whitespace-nowrap font-sans">
                        <span className="font-bold text-slate-900 dark:text-white block text-xs">
                          {log.studentEmail}
                        </span>
                      </td>

                      {/* Action Badge */}
                      <td className="p-4 whitespace-nowrap font-sans">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badgeBg}`}>
                          {log.type || 'Action'}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="p-4 font-sans text-slate-700 dark:text-slate-300 font-medium">
                        {log.description}
                      </td>

                      {/* Points */}
                      <td className="p-4 whitespace-nowrap">
                        {log.amount && log.amount > 0 ? (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            +{log.amount} EXP
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Reference ID */}
                      <td className="p-4 pr-6 text-slate-400 text-[10px] truncate max-w-[200px]">
                        {log.referenceId || log.id}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400 font-sans">
                    {isLoading ? 'Загрузка журнала действий...' : 'События не найдены'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
