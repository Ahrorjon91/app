import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FlaskConical,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { LessonData, LabData, UserAccount } from '../../types';
import { COURSE_BLOCKS } from '../../data/syllabusData';

interface AnalyticsTranscriptTabProps {
  student: UserAccount;
  lessons: LessonData[];
  labs: LabData[];
  labSubmissions?: LabData[];
  homeworks: Record<number, any>;
  homeworkSubmissions?: any[];
  testScores: Record<string, any>;
  readSections: Record<string, boolean>;
  onNavigateLesson: (lessonId: number) => void;
}

export const AnalyticsTranscriptTab: React.FC<AnalyticsTranscriptTabProps> = ({
  student,
  lessons,
  labs,
  labSubmissions = [],
  homeworks,
  homeworkSubmissions = [],
  testScores,
  readSections,
  onNavigateLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'attention'>('all');

  // Pre-calculate status for each of the 24 lessons
  const lessonRows = useMemo(() => {
    const studentEmailLower = (student.email || '').toLowerCase().trim();
    const studentIdTrim = (student.id || '').trim();
    const matchesStudent = (item: any) => {
      if (!item) return false;
      const e = String(item.studentEmail || '').toLowerCase().trim();
      const id = String(item.studentId || '').trim();
      return (studentEmailLower && e === studentEmailLower) || (studentIdTrim && id === studentIdTrim);
    };

    const items = lessons.map((lesson) => {
      const blockId = Math.ceil(lesson.id / 4);
      const block = COURSE_BLOCKS.find((b) => b.id === blockId);
      const isBlockEnd = lesson.id % 4 === 0;

      // Section reads: support lecture, lab, quiz, and homework/hw
      const secPrefix = `sec-${lesson.id}-`;
      const isLectureRead = Boolean(readSections[`${secPrefix}lecture`]);
      const isLabRead = Boolean(readSections[`${secPrefix}lab`]);
      const isQuizRead = Boolean(readSections[`${secPrefix}quiz`]);
      const isHwRead = Boolean(readSections[`${secPrefix}homework`] || readSections[`${secPrefix}hw`]);
      const readCount = [isLectureRead, isLabRead, isQuizRead, isHwRead].filter(Boolean).length;
      const allSectionsRead = readCount === 4;

      // Lab submission resolution
      const labSub = (labSubmissions || []).find(
        (s) => (s.id === lesson.id || (s as any).labId === lesson.id) && matchesStudent(s)
      );
      const labDefault = labs.find((l) => l.id === lesson.id);
      const effectiveLab = labSub || labDefault;
      const labApproved = Boolean(effectiveLab && (effectiveLab.submissionStatus === 'Approved' || effectiveLab.isCompleted));
      const labUnderReview = Boolean(
        effectiveLab && (effectiveLab.submissionStatus === 'Under Review' || effectiveLab.submissionStatus === 'Submitted')
      );
      const labNeedsRev = Boolean(
        effectiveLab && ((effectiveLab.submissionStatus as any) === 'Needs Revision' || effectiveLab.submissionStatus === 'Rejected')
      );

      // Homework submission resolution
      const hwSub = (homeworkSubmissions || []).find(
        (h) => (h.lessonId === lesson.id || (h as any).id === lesson.id) && matchesStudent(h)
      );
      const hwDefault = homeworks ? homeworks[lesson.id] : undefined;
      const effectiveHw = hwSub || hwDefault;
      const hwApproved = Boolean(
        effectiveHw && (effectiveHw.status === 'Approved' || (effectiveHw as any).submissionStatus === 'Approved')
      );
      const hwUnderReview = Boolean(
        effectiveHw &&
          (effectiveHw.status === 'Under Review' ||
            effectiveHw.status === 'Submitted' ||
            (effectiveHw as any).submissionStatus === 'Under Review')
      );
      const hwNeedsRev = Boolean(
        effectiveHw &&
          (effectiveHw.status === 'Needs Revision' ||
            effectiveHw.status === 'Rejected' ||
            (effectiveHw as any).submissionStatus === 'Needs Revision')
      );

      // Block test / quiz
      const testScore = block?.testId ? testScores[block.testId] : null;
      const testFailed = Boolean(testScore && testScore.scorePct < 70);

      // Mini quiz for this lesson
      const miniQuizKey = `QUIZ_L${lesson.id}`;
      const miniQuizScore = testScores[miniQuizKey];
      const miniQuizPassed = Boolean(miniQuizScore && (miniQuizScore.passed || miniQuizScore.scorePct >= 60));

      // Criteria for lesson completion: strictly Mentor approved HW or verified completed list
      const isCompleted =
        hwApproved ||
        (Array.isArray((student as any).completedLessons) && (student as any).completedLessons.includes(lesson.id)) ||
        (Boolean(lesson.isCompleted) && hwApproved);

      const hasAttention = labNeedsRev || hwNeedsRev || (isBlockEnd && testFailed);
      const hasStarted = readCount > 0 || labUnderReview || hwUnderReview || labApproved || hwApproved || labNeedsRev || hwNeedsRev;

      const normalizeMentorScore = (raw: any) => {
        const n = typeof raw === 'number' && raw > 0 ? raw : 100;
        return n >= 88 ? 100 : n >= 63 ? 75 : 50;
      };
      const labExpVal = labApproved ? normalizeMentorScore(effectiveLab?.score) : 0;
      const hwExpVal = hwApproved ? normalizeMentorScore(effectiveHw?.score) : 0;
      const quizExpVal = miniQuizPassed
        ? (Number(miniQuizScore?.scorePct ?? 100) >= 100 ? 100 : Number(miniQuizScore?.scorePct ?? 100) >= 70 ? 75 : 50)
        : 0;

      // EXP calculation for this lesson based on unified calculation engine rules:
      // Theory (+100 EXP) and completion bonus (+50 EXP) are strictly confirmed upon lesson completion
      const lessonTheoryBonus = isCompleted ? (4 * 25 + 50) : 0;
      const lessonXp =
        lessonTheoryBonus +
        labExpVal +
        hwExpVal +
        quizExpVal;

      return {
        lesson,
        blockId,
        block,
        isBlockEnd,
        readCount,
        allSectionsRead,
        effectiveLab,
        labApproved,
        labUnderReview,
        labNeedsRev,
        effectiveHw,
        hwApproved,
        hwUnderReview,
        hwNeedsRev,
        testScore,
        testFailed,
        miniQuizScore,
        miniQuizPassed,
        isCompleted,
        hasAttention,
        hasStarted,
        lessonXp,
      };
    });

    // Identify next uncompleted lesson to study
    const firstUncompleted = items.find((it) => !it.isCompleted);
    const nextLessonId = firstUncompleted ? firstUncompleted.lesson.id : 25;

    return items.map((it) => {
      // In progress if not completed AND (already started reading/submitting OR is the next active lesson to study)
      const isInProgress = !it.isCompleted && (it.hasStarted || it.lesson.id === nextLessonId);
      const isLocked = !it.isCompleted && !isInProgress;

      return {
        ...it,
        isInProgress,
        isLocked,
      };
    });
  }, [lessons, labs, labSubmissions, homeworks, homeworkSubmissions, testScores, readSections, student]);

  // Dynamic counts for all filter buttons
  const completedCount = useMemo(() => lessonRows.filter((r) => r.isCompleted).length, [lessonRows]);
  const inProgressCount = useMemo(() => lessonRows.filter((r) => r.isInProgress).length, [lessonRows]);
  const attentionCount = useMemo(() => lessonRows.filter((r) => r.hasAttention).length, [lessonRows]);
  const allCount = lessonRows.length;

  // Filtered rows based on selected status tab and search query
  const filteredRows = useMemo(() => {
    return lessonRows.filter((row) => {
      if (statusFilter === 'completed' && !row.isCompleted) return false;
      if (statusFilter === 'in_progress' && !row.isInProgress) return false;
      if (statusFilter === 'attention' && !row.hasAttention) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = row.lesson.title.toLowerCase().includes(q);
        const matchNumber = `урок ${row.lesson.id}`.includes(q) || `#${row.lesson.id}`.includes(q);
        const matchBlock =
          `блок ${row.blockId}`.toLowerCase().includes(q) ||
          (row.block?.title || '').toLowerCase().includes(q);
        return matchTitle || matchNumber || matchBlock;
      }

      return true;
    });
  }, [lessonRows, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="transcript-search-input"
            type="text"
            placeholder="Поиск по 24 урокам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            id="transcript-filter-all"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Все уроки ({allCount})
          </button>
          <button
            id="transcript-filter-completed"
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Завершенные ({completedCount})
          </button>
          <button
            id="transcript-filter-in-progress"
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'in_progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            В процессе ({inProgressCount})
          </button>
          <button
            id="transcript-filter-attention"
            onClick={() => setStatusFilter('attention')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'attention'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Требуют внимания ({attentionCount})
          </button>
        </div>
      </div>

      {/* Transcript Table */}
      <div className="rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Урок / Модуль</th>
                <th className="p-4">Теория (Лекция)</th>
                <th className="p-4">Лабораторная</th>
                <th className="p-4">Тест (Квиз)</th>
                <th className="p-4">Домашнее Задание</th>
                <th className="p-4">Баллы (EXP)</th>
                <th className="p-4">Статус</th>
                <th className="p-4 pr-6 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                      <p className="font-bold text-slate-700 dark:text-slate-300">
                        {statusFilter === 'attention'
                          ? 'Все проверено! Замечаний или невыполненных заданий, требующих внимания, не обнаружено.'
                          : statusFilter === 'completed'
                          ? 'Пока нет полностью завершенных уроков.'
                          : statusFilter === 'in_progress'
                          ? 'Нет уроков в процессе выполнения.'
                          : 'Уроков по заданному фильтру не найдено.'}
                      </p>
                      {statusFilter !== 'all' && (
                        <button
                          onClick={() => setStatusFilter('all')}
                          className="mt-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20"
                        >
                          Сбросить фильтр и показать все 24 урока
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => {
                  const {
                    lesson,
                    blockId,
                    block,
                    isBlockEnd,
                    readCount,
                    allSectionsRead,
                    effectiveLab,
                    labApproved,
                    labUnderReview,
                    labNeedsRev,
                    effectiveHw,
                    hwApproved,
                    hwUnderReview,
                    hwNeedsRev,
                    testScore,
                    testFailed,
                    miniQuizScore,
                    miniQuizPassed,
                    isCompleted,
                    isInProgress,
                    isLocked,
                    hasAttention,
                    lessonXp,
                  } = row;

                  return (
                    <tr
                      key={lesson.id}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500/[0.02]'
                          : isInProgress
                          ? 'bg-blue-500/[0.03]'
                          : hasAttention
                          ? 'bg-rose-500/[0.03]'
                          : ''
                      }`}
                    >
                      {/* Lesson # & Title */}
                      <td className="p-4 pl-6 font-medium">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[11px] ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : isInProgress
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                : hasAttention
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}
                          >
                            #{lesson.id}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                              {lesson.title}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              Блок {blockId}: {block?.title || 'AI for LIFE Core'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Theory */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              allSectionsRead
                                ? 'bg-emerald-500'
                                : readCount > 0
                                ? 'bg-blue-500'
                                : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                          />
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">
                            {allSectionsRead ? (
                              <span className="text-emerald-600 dark:text-emerald-400">4/4 разд. (100%)</span>
                            ) : readCount > 0 ? (
                              <span className="text-blue-600 dark:text-blue-400">{readCount}/4 разд.</span>
                            ) : (
                              <span className="text-slate-400">0/4 разд.</span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Lab */}
                      <td className="p-4">
                        {labApproved ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Check className="w-3 h-3" /> Одобрено ({effectiveLab?.score || 100}б)
                          </span>
                        ) : labUnderReview ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Clock className="w-3 h-3" /> На проверке
                          </span>
                        ) : labNeedsRev ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <AlertTriangle className="w-3 h-3" /> Доработка
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Quiz */}
                      <td className="p-4">
                        {isBlockEnd && testScore ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              testScore.passed
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {testScore.passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Экзамен: {testScore.scorePct}%
                          </span>
                        ) : isBlockEnd ? (
                          <span className="text-slate-400 text-[11px]">Квиз Блока {blockId}</span>
                        ) : miniQuizPassed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Check className="w-3 h-3" /> Сдан ({miniQuizScore?.scorePct || 100}%)
                          </span>
                        ) : miniQuizScore ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <X className="w-3 h-3" /> Не сдан ({miniQuizScore.scorePct}%)
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Тема урока</span>
                        )}
                      </td>

                      {/* Homework */}
                      <td className="p-4">
                        {hwApproved ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Check className="w-3 h-3" /> Одобрено ({effectiveHw?.score || 100}б)
                          </span>
                        ) : hwUnderReview ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Clock className="w-3 h-3" /> На проверке
                          </span>
                        ) : hwNeedsRev ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <AlertCircle className="w-3 h-3" /> На доработке
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* EXP Earned */}
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                        {lessonXp > 0 ? (
                          <span className={isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-500'}>
                            +{lessonXp} EXP
                          </span>
                        ) : (
                          <span className="text-slate-400">0 EXP</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        {isCompleted ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Завершен
                          </span>
                        ) : hasAttention ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            На доработке
                          </span>
                        ) : isInProgress ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            В процессе
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-400">
                            Заблокирован
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-4 pr-6 text-right">
                        <button
                          onClick={() => onNavigateLesson(lesson.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Перейти к уроку"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

