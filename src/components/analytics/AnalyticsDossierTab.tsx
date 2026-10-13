import React from 'react';
import {
  User,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Mail,
  Shield,
  Layers,
  ChevronRight,
  Wifi,
  Activity,
  Calendar
} from 'lucide-react';
import { UserAccount, LessonData, LabData } from '../../types';
import { COURSE_BLOCKS } from '../../data/syllabusData';

interface AnalyticsDossierTabProps {
  student: UserAccount;
  lessons: LessonData[];
  labs: LabData[];
  homeworks: any[];
  testScores: Record<string, any>;
  readSections: Record<string, boolean>;
  weakSides: string[];
  strengths: string[];
  recommendations: string[];
  onOpenReportModal: () => void;
  onOpenResetModal: () => void;
  onSelectTab: (tabId: string) => void;
  totalStudents?: number;
  timeSpentFormatted?: string;
  totalTimeSpentMinutes?: number;
  lastOnlineText?: string;
  isOnline?: boolean;
}

export const AnalyticsDossierTab: React.FC<AnalyticsDossierTabProps> = ({
  student,
  lessons,
  labs,
  homeworks,
  testScores,
  readSections,
  weakSides,
  strengths,
  recommendations,
  onOpenReportModal,
  onOpenResetModal,
  onSelectTab,
  totalStudents = 1,
  timeSpentFormatted = '0м',
  totalTimeSpentMinutes = 0,
  lastOnlineText = 'Сегодня, 10:45',
  isOnline = false,
}) => {
  const completedLessons = student.completedLessonsCount ?? lessons.filter((l) => l.isCompleted).length;
  const totalPoints = student.totalPoints ?? 0;
  const progressPct = Math.round((completedLessons / 24) * 100);

  const approvedHwCount =
    student.completedHomeworkCount ??
    homeworks.filter((h: any) => h && (h.status === 'Approved' || h.submissionStatus === 'Approved')).length;

  const completedLabCount =
    student.completedLabsCount ??
    labs.filter((l) => l.isCompleted || l.submissionStatus === 'Approved').length;

  const passedQuizCount =
    student.passedQuizCount ??
    Object.values(testScores).filter((t: any) => t?.passed).length;

  const currentRank = student.rank || 1;

  // Determine current block from completed lessons
  const currentBlockId = Math.min(6, Math.max(1, Math.ceil((completedLessons + 1) / 4)));
  const currentBlockObj = COURSE_BLOCKS.find((b) => b.id === currentBlockId);
  const currentBlockTitle = currentBlockObj ? currentBlockObj.title : 'AI for LIFE Core';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Student Profile Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-indigo-500/20">
              {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#14141B] ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {student.name || 'Студент'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {student.group || 'Группа 1 (Август 2026)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {student.status || 'Active'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" /> ID: {student.id || 'USR-01'}
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                {isOnline ? (
                  <strong className="text-emerald-600 dark:text-emerald-400">Онлайн сейчас</strong>
                ) : (
                  <span>Последний вход: <strong className="text-slate-700 dark:text-slate-300">{lastOnlineText}</strong></span>
                )}
              </span>
              <span className="flex items-center gap-1.5 font-medium bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Время в системе: <strong className="text-indigo-600 dark:text-indigo-400">{timeSpentFormatted}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            id="dossier-open-report-btn"
            onClick={onOpenReportModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Printer className="w-4 h-4" /> Сформировать отчет KPI
          </button>
          <button
            id="dossier-open-reset-btn"
            onClick={onOpenResetModal}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Сбросить
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Academic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Points / EXP */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Академический Рейтинг
            </span>
            <span className="text-[11px] font-bold text-amber-500">
              Ранг #{currentRank} из {totalStudents}
            </span>
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {totalPoints} <span className="text-xs text-slate-400 font-normal">EXP</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full" style={{ width: `${Math.min(100, (totalPoints / 2500) * 100)}%` }} />
          </div>
          <span className="text-[11px] text-slate-400 block">
            Норматив: 2500 EXP ({Math.min(100, Math.round((totalPoints / 2500) * 100))}%)
          </span>
        </div>

        {/* Lessons Progress */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" /> Учебный План
            </span>
            <span className="text-[11px] font-bold text-blue-500">{progressPct}%</span>
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {completedLessons} <span className="text-xs text-slate-400 font-normal">/ 24 уроков</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-[11px] text-slate-400 block truncate">
            Текущий: Блок {currentBlockId} ({currentBlockTitle})
          </span>
        </div>

        {/* Labs Completed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-500" /> Лабораторные
            </span>
            <span className="text-[11px] font-bold text-emerald-500">
              {completedLabCount === 24 ? 'Все сданы' : `${completedLabCount}/24 сдано`}
            </span>
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {completedLabCount} <span className="text-xs text-slate-400 font-normal">/ 24 лаб</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${(completedLabCount / 24) * 100}%` }} />
          </div>
          <span className="text-[11px] text-slate-400 block">
            {completedLabCount} из 24 практик зачтено ментором
          </span>
        </div>

        {/* Approved Homeworks */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-2">
          <span className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-violet-500" /> Домашние Задания
            </span>
            <span className="text-[11px] font-bold text-violet-500">
              {approvedHwCount === 24 ? '100% зачет' : `${approvedHwCount}/24 сдано`}
            </span>
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {approvedHwCount} <span className="text-xs text-slate-400 font-normal">/ 24 ДЗ</span>
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-violet-500 h-full" style={{ width: `${(approvedHwCount / 24) * 100}%` }} />
          </div>
          <span className="text-[11px] text-slate-400 block">
            {approvedHwCount} из 24 ДЗ проверено и одобрено
          </span>
        </div>
      </div>

      {/* Time & Online Activity Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Spent Time Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-indigo-200/70 dark:border-indigo-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Общее Затраченное Время
                </h4>
                <p className="text-[11px] text-slate-400">
                  Totally spent time of student
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {timeSpentFormatted}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {timeSpentFormatted}
            </p>
            <span className="text-xs text-slate-400">
              ({totalTimeSpentMinutes} минут учебной работы)
            </span>
          </div>

          <div className="space-y-1">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalTimeSpentMinutes / (72 * 60)) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Норма курса: 72 академических часа</span>
              <span>Выполнено {Math.min(100, Math.round((totalTimeSpentMinutes / (72 * 60)) * 100))}%</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/60">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
            <span>Включает изучение теории, интерактивные стенды, тесты и сессии</span>
          </div>
        </div>

        {/* Last Time Online Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-emerald-200/70 dark:border-emerald-900/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Последняя Сессия и Статус
                </h4>
                <p className="text-[11px] text-slate-400">
                  Last time online of student
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 border ${
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {isOnline ? 'В сети' : 'Офлайн'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {isOnline ? 'Онлайн сейчас' : lastOnlineText}
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-500">Синхронизация профиля:</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Активна
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/60">
            <Wifi className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>Текущая сессия зафиксирована и верифицирована в журнале посещаемости</span>
          </div>
        </div>
      </div>


      {/* Weak Sides & Explanations (Crucial Requirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Sides & Knowledge Gaps Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-rose-200 dark:border-rose-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Анализ Слабых Мест и Зон Контроля (для Родителей и Руководства)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {weakSides.length} замечаний
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Автоматическая диагностика выявила следующие академические трудности и пробелы, требующие внимания куратора и дополнительной проработки:
          </p>

          <div className="space-y-3">
            {weakSides.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs space-y-1.5"
              >
                <div className="font-bold text-rose-800 dark:text-rose-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSelectTab('errors')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 flex items-center justify-center gap-2 transition-colors"
          >
            Подробный разбор ошибок и темы для повторения <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Strengths & Assets Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-emerald-200 dark:border-emerald-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Подтвержденные Сильные Стороны и Навыки
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {strengths.length} сильных сторон
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ключевые компетенции, в которых слушатель продемонстрировал уверенное владение материалом и высокую скорость выполнения:
          </p>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs space-y-1.5"
              >
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSelectTab('transcript')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 flex items-center justify-center gap-2 transition-colors"
          >
            Посмотреть ведомость 24 уроков <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Curator Recommendations Card */}
      <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          План Действий и Рекомендации Куратора для Менеджеров и Родителей
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Чтобы студент гарантированно освоил программу на уровне уверенного Vibe Coding & AI Specialist к завершению 24 уроков, рекомендуется придерживаться следующего регламента:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#14141B] border border-indigo-100 dark:border-indigo-900/40 space-y-2"
            >
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
