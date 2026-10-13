import React from 'react';
import {
  Users,
  Award,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  FlaskConical,
  BookOpen,
  Printer,
  ChevronRight,
  ShieldAlert,
  Search
} from 'lucide-react';
import { UserAccount } from '../../types';

interface AnalyticsCohortTabProps {
  students: UserAccount[];
  selectedStudent: UserAccount | null;
  onSelectStudent: (student: UserAccount) => void;
  onOpenReportModal: (student: UserAccount) => void;
}

export const AnalyticsCohortTab: React.FC<AnalyticsCohortTabProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
  onOpenReportModal,
}) => {
  // Cohort stats
  const totalStudents = students.length;
  const totalExp = students.reduce((acc, s) => acc + (s.totalPoints || 0), 0);
  const avgExp = Math.round(totalExp / Math.max(1, totalStudents));
  const avgLessonsCompleted = Math.round(
    students.reduce((acc, s) => acc + (s.completedLessonsCount || 0), 0) / Math.max(1, totalStudents)
  );

  // Identify at-risk students (e.g., lessons < 3, or low EXP, or specific flag)
  const atRiskStudents = students.filter(
    (s) => (s.completedLessonsCount || 0) < 3 || (s.totalPoints || 0) < 1000
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-500" /> Слушателей в Потоке
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {totalStudents} <span className="text-xs font-normal text-slate-400">студентов</span>
          </p>
          <span className="text-[11px] text-emerald-500 font-semibold">100% активная группа</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" /> Средний Прогресс Уроков
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {avgLessonsCompleted} <span className="text-xs font-normal text-slate-400">/ 24 уроков</span>
          </p>
          <span className="text-[11px] text-slate-400">Текущий блок: Блок 2 (Сети)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" /> Средний Опыт (EXP)
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {avgExp} <span className="text-xs font-normal text-slate-400">EXP</span>
          </p>
          <span className="text-[11px] text-slate-400">Всего в группе: {totalExp} EXP</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Студенты в Зоне Риска
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {atRiskStudents.length} <span className="text-xs font-normal text-slate-400">чел.</span>
          </p>
          <span className="text-[11px] text-rose-500 font-semibold">Требуют внимания куратора</span>
        </div>
      </div>

      {/* At-Risk Warning Callout */}
      {atRiskStudents.length > 0 && (
        <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Оперативный Контроль: Слушатели, Отстающие от Графика Потока
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
              {atRiskStudents.length} под наблюдением
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Данные студенты имеют низкий темп сдачи практических лабораторных или не сдали промежуточные тесты. Рекомендуется связаться с родителями / руководителем для предотвращения отчисления:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {atRiskStudents.map((st) => (
              <div
                key={st.id || st.email}
                className="p-4 rounded-2xl bg-white dark:bg-[#14141B] border border-rose-200 dark:border-rose-900/40 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white text-xs block">
                    {st.name || st.email}
                  </span>
                  <p className="text-[11px] text-slate-500 font-mono">{st.email}</p>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    Прогресс: {st.completedLessonsCount || 0}/24 уроков • {st.totalPoints || 0} EXP
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectStudent(st)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                  >
                    Досье
                  </button>
                  <button
                    onClick={() => onOpenReportModal(st)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Сформировать KPI отчет"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Cohort Performance Table */}
      <div className="rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Сводная Ведомость и Рейтинг Потока (24 Урока)
            </h3>
            <p className="text-xs text-slate-500">
              Сравнение результатов всех слушателей группы для руководства и кураторов
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Ранг / Студент</th>
                <th className="p-4">Группа</th>
                <th className="p-4">Уроки (из 24)</th>
                <th className="p-4">Лабы</th>
                <th className="p-4">ДЗ</th>
                <th className="p-4">Квизы</th>
                <th className="p-4">Опыт (EXP)</th>
                <th className="p-4">Академический Статус</th>
                <th className="p-4 pr-6 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {students
                .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
                .map((st, idx) => {
                  const isSelected = selectedStudent?.email === st.email;
                  const isLeader = idx === 0;

                  return (
                    <tr
                      key={st.id || st.email}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${
                        isSelected ? 'bg-indigo-500/5' : ''
                      }`}
                    >
                      {/* Rank & Student */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                              isLeader
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            #{idx + 1}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">
                              {st.name || st.email}
                            </p>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {st.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Group */}
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {st.group || 'Группа 1'}
                      </td>

                      {/* Lessons Completed */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {st.completedLessonsCount || 0}
                          </span>
                          <span className="text-slate-400">/ 24</span>
                        </div>
                      </td>

                      {/* Labs */}
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">
                        {st.completedLabsCount || 0} лаб
                      </td>

                      {/* Homework */}
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">
                        {st.completedHomeworkCount || 0} ДЗ
                      </td>

                      {/* Quizzes */}
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">
                        {st.passedQuizCount || 0} тестов
                      </td>

                      {/* EXP */}
                      <td className="p-4">
                        <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                          {st.totalPoints || 0} EXP
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {(st.totalPoints || 0) >= 1500 ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Отличник
                          </span>
                        ) : (st.totalPoints || 0) >= 1000 ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            Успевает
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            В зоне риска
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          onClick={() => onSelectStudent(st)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected ? 'Выбран' : 'Открыть Досье'}
                        </button>
                        <button
                          onClick={() => onOpenReportModal(st)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Сформировать KPI отчет"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
