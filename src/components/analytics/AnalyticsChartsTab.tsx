import React, { useMemo } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  Layers,
  PieChart as PieIcon,
  Activity,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import { LessonData, LabData, UserAccount } from '../../types';

const SafeChartContainer: React.FC<{
  height: number;
  className?: string;
  children: (width: number, height: number) => React.ReactNode;
}> = ({ height, className = '', children }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.floor(el.getBoundingClientRect().width);
      if (w > 0) setWidth(w);
    };
    measure();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full min-w-0 ${className}`}>
      {width > 0 && height > 0 ? children(width, height) : null}
    </div>
  );
};

interface CompetencyScore {
  domain: string;
  score: number;
  level: string;
  status: 'high' | 'medium' | 'low';
}

interface AnalyticsChartsTabProps {
  student: UserAccount;
  lessons: LessonData[];
  labs: LabData[];
  homeworks: any[];
  testScores: Record<string, any>;
  competencies: CompetencyScore[];
  completedLessonIds?: number[];
  readSections?: Record<string, boolean>;
}

export const AnalyticsChartsTab: React.FC<AnalyticsChartsTabProps> = ({
  student,
  lessons,
  labs,
  homeworks,
  testScores,
  competencies,
  completedLessonIds,
  readSections,
}) => {
  // 1. Lessons completion status array for all 24 lessons
  const completedIds = useMemo(() => {
    if (Array.isArray(completedLessonIds) && completedLessonIds.length > 0) {
      return new Set(completedLessonIds);
    }
    const cCount = student.completedLessonsCount || 0;
    return new Set(Array.from({ length: cCount }, (_, i) => i + 1));
  }, [completedLessonIds, student.completedLessonsCount]);

  const unlockedCount = student.unlockedLessonsCount || Math.max(1, (student.completedLessonsCount || 0) + 1);

  const lessonBarsData = lessons.map((l) => {
    const isComp = completedIds.has(l.id);
    const isNext = !isComp && (l.id <= unlockedCount || l.id === (student.completedLessonsCount || 0) + 1);
    const statusText = isComp ? 'Завершен (100%)' : isNext ? 'В процессе (50%)' : 'Заблокирован (0%)';

    return {
      lesson: `#${l.id}`,
      name: l.title,
      statusText,
      progress: isComp ? 100 : isNext ? 50 : 0,
      color: isComp ? '#10b981' : isNext ? '#3b82f6' : '#64748b',
    };
  });

  // 2. Real dynamic XP Breakdown (unified calculation engine rules)
  const verifiedCompletedCount = completedIds.size;
  const theoryPoints = Number(verifiedCompletedCount * 100);
  const lessonBonusPoints = Number(verifiedCompletedCount * 50);

  const normalizeMentorExp = (rawScore: any) => {
    const num = typeof rawScore === 'number' && rawScore > 0 ? rawScore : 100;
    return num >= 88 ? 100 : num >= 63 ? 75 : 50;
  };

  const approvedLabsMap = new Map<number, number>();
  (labs || []).forEach((l: any) => {
    if (l.submissionStatus === 'Approved' || l.status === 'Approved' || l.isCompleted) {
      const lId = Number(l.id || l.labId);
      if (lId > 0) approvedLabsMap.set(lId, normalizeMentorExp(l.score));
    }
  });
  const labPoints =
    approvedLabsMap.size > 0
      ? Array.from(approvedLabsMap.values()).reduce((sum, v) => sum + v, 0)
      : Number((student.completedLabsCount || 0) * 100);

  const approvedHwMap = new Map<number, number>();
  (Array.isArray(homeworks) ? homeworks : []).forEach((h: any) => {
    if (h && (h.status === 'Approved' || h.submissionStatus === 'Approved')) {
      const hId = Number(h.lessonId || h.id);
      if (hId > 0) approvedHwMap.set(hId, normalizeMentorExp(h.score));
    }
  });
  const hwPoints =
    approvedHwMap.size > 0
      ? Array.from(approvedHwMap.values()).reduce((sum, v) => sum + v, 0)
      : Number((student.completedHomeworkCount || 0) * 100);

  const seenCanonicalTests = new Set<string>();
  let testPoints = 0;
  Object.entries(testScores || {}).forEach(([key, t]: [string, any]) => {
    if (!t) return;
    const sPct = typeof t === 'number' ? t : Number(t.scorePct ?? t.score ?? 0);
    const isPass = typeof t === 'object' && t.passed !== undefined ? Boolean(t.passed) : sPct >= 60;
    if (!isPass) return;
    const upperKey = String(key).toUpperCase();
    const isFinal = upperKey.includes('FINAL');
    const isBlock = (/^BLOCK(?:_TEST)?[_-]?[1-6]$/i.test(upperKey) || (/^TEST_[1-6]$/i.test(upperKey) && !t.lessonId && !upperKey.startsWith('LESSON')));
    const m = upperKey.match(/(\d+)/);
    const lessonNum = m ? parseInt(m[1], 10) : NaN;
    const canonId = isFinal ? 'FINAL_EXAM' : isBlock ? `BLOCK_${upperKey.replace(/\D/g, '')}` : (!isNaN(lessonNum) && lessonNum >= 1 && lessonNum <= 24) ? `LESSON_${lessonNum}` : upperKey;
    if (seenCanonicalTests.has(canonId)) return;
    seenCanonicalTests.add(canonId);
    if (isFinal) {
      testPoints += 500;
    } else {
      testPoints += (sPct >= 100 ? 100 : sPct >= 70 ? 75 : 50);
    }
  });

  const badgePoints = 250;
  const calculatedTotal: number = theoryPoints + lessonBonusPoints + labPoints + hwPoints + testPoints + badgePoints;
  const displayTotalExp: number = student.totalPoints ? Number(student.totalPoints) : calculatedTotal;

  const xpBreakdownData = [
    { source: 'Теория уроков', points: theoryPoints, fill: '#3b82f6' },
    { source: 'Бонусы за уроки', points: lessonBonusPoints, fill: '#6366f1' },
    { source: 'Одобренные лабы', points: labPoints, fill: '#10b981' },
    { source: 'Домашние задания', points: hwPoints, fill: '#f59e0b' },
    { source: 'Сданные тесты', points: testPoints, fill: '#8b5cf6' },
    { source: 'Бейджи и награды', points: badgePoints, fill: '#ec4899' },
  ];

  // 3. Lab difficulty data
  const labData = [
    {
      difficulty: 'Easy (Базовые)',
      completed: labs.filter((l) => l.difficulty === 'Easy' && (l.isCompleted || l.submissionStatus === 'Approved')).length,
      total: labs.filter((l) => l.difficulty === 'Easy').length || 8,
    },
    {
      difficulty: 'Medium (Продвинутые)',
      completed: labs.filter((l) => l.difficulty === 'Medium' && (l.isCompleted || l.submissionStatus === 'Approved')).length,
      total: labs.filter((l) => l.difficulty === 'Medium').length || 12,
    },
    {
      difficulty: 'Hard (Комплексные)',
      completed: labs.filter((l) => l.difficulty === 'Hard' && (l.isCompleted || l.submissionStatus === 'Approved')).length,
      total: labs.filter((l) => l.difficulty === 'Hard').length || 4,
    },
  ];

  // 4. Quiz scores data (strictly actual scores, 0 if not taken)
  const quizScoresData = [
    { name: 'Тест 1 (Основы IT)', score: testScores?.['TEST_1']?.scorePct ?? (testScores?.['TEST_1']?.passed ? 100 : 0), passScore: 70 },
    { name: 'Тест 2 (Сети & OSI)', score: testScores?.['TEST_2']?.scorePct ?? (testScores?.['TEST_2']?.passed ? 100 : 0), passScore: 70 },
    { name: 'Тест 3 (ОС Linux & Win)', score: testScores?.['TEST_3']?.scorePct ?? (testScores?.['TEST_3']?.passed ? 100 : 0), passScore: 70 },
    { name: 'Тест 4 (SysAdmin & AD)', score: testScores?.['TEST_4']?.scorePct ?? (testScores?.['TEST_4']?.passed ? 100 : 0), passScore: 70 },
    { name: 'Тест 5 (IT Безопасность)', score: testScores?.['TEST_5']?.scorePct ?? (testScores?.['TEST_5']?.passed ? 100 : 0), passScore: 70 },
    { name: 'Финальный Экзамен', score: testScores?.['FINAL_EXAM']?.scorePct ?? (testScores?.['FINAL_EXAM']?.passed ? 100 : 0), passScore: 70 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Competence Radar & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-7 min-w-0 p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-500" />
                Карта Компетенций AI & Vibe Coding Специалиста
              </h3>
              <p className="text-xs text-slate-500">
                Многоосевая оценка по 6 фундаментальным модулям курса AI for LIFE
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              AI for LIFE Radar
            </span>
          </div>

          <SafeChartContainer height={288} className="h-72">
            {(chartWidth, chartHeight) => (
              <RadarChart width={chartWidth} height={chartHeight} cx="50%" cy="50%" outerRadius="75%" data={competencies}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="domain" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar
                  name="Освоено студентом (%)"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d0d12',
                    borderRadius: '12px',
                    borderColor: '#2e2e38',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </RadarChart>
            )}
          </SafeChartContainer>
        </div>

        {/* Competencies Progress Bars */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-emerald-500" />
              Детализация Модульных Навыков
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Соотношение изученной теории, сданных лаб и тестов
            </p>

            <div className="space-y-3.5">
              {competencies.map((comp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{comp.domain}</span>
                    <span className={comp.score >= 70 ? 'text-emerald-500' : 'text-amber-500'}>
                      {comp.score}% • {comp.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        comp.score >= 70 ? 'bg-emerald-500' : comp.score >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/30 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">Критерий допуска к диплому:</span>
            Не менее 70% по каждому из 6 базовых блоков программы.
          </div>
        </div>
      </div>

      {/* 24 Lessons Progress BarChart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Динамика Прохождения 24 Уроков Программы
            </h3>
            <p className="text-xs text-slate-500">
              Зеленый = Завершен (100%), Синий = В процессе (50%), Серый = Заблокирован (0%)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Всего 24 занятия
          </span>
        </div>

        <SafeChartContainer height={256} className="h-64">
          {(chartWidth, chartHeight) => (
            <BarChart width={chartWidth} height={chartHeight} data={lessonBarsData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262630" />
              <XAxis dataKey="lesson" stroke="#94a3b8" fontSize={11} interval={0} />
              <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d0d12',
                  borderRadius: '12px',
                  borderColor: '#2e2e38',
                  color: '#fff',
                }}
                formatter={(val: any, name: any, item: any) => [
                  `${val}% - ${item.payload.name}`,
                  'Статус темы',
                ]}
              />
              <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                {lessonBarsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </SafeChartContainer>
      </div>

      {/* Dual Charts: XP Breakdown & Quiz Scores Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Breakdown BarChart */}
        <div className="min-w-0 p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-amber-500" />
            Структура Набранных Баллов (EXP Breakdown)
          </h3>
          <p className="text-xs text-slate-500">
            Фактическое распределение {displayTotalExp} EXP по видам учебной активности
          </p>

          <SafeChartContainer height={240} className="h-60">
            {(chartWidth, chartHeight) => (
              <BarChart width={chartWidth} height={chartHeight} data={xpBreakdownData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262630" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="source" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d0d12',
                    borderRadius: '12px',
                    borderColor: '#2e2e38',
                    color: '#fff',
                  }}
                  formatter={(val: any) => [`${val} EXP`, 'Начислено']}
                />
                <Bar dataKey="points" radius={[0, 6, 6, 0]}>
                  {xpBreakdownData.map((entry, index) => (
                    <Cell key={`cell-xp-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </SafeChartContainer>
        </div>

        {/* Quiz Scores & Benchmarks */}
        <div className="min-w-0 p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-500" />
              Результаты Модульных Тестов (Квизы)
            </h3>
            <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
              Порог сдачи: 70%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Сравнение фактического балла с минимальным академическим порогом
          </p>

          <SafeChartContainer height={240} className="h-60">
            {(chartWidth, chartHeight) => (
              <BarChart width={chartWidth} height={chartHeight} data={quizScoresData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262630" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d0d12',
                    borderRadius: '12px',
                    borderColor: '#2e2e38',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Балл студента (%)" />
                <Line type="monotone" dataKey="passScore" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" name="Проходной порог (70%)" />
              </BarChart>
            )}
          </SafeChartContainer>
        </div>
      </div>

      {/* Lab Difficulty Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-emerald-500" />
          Выполнение Практических Лабораторных по Уровням Сложности
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {labData.map((d, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{d.difficulty}</span>
                <span className="text-emerald-500 font-extrabold">{d.completed} / {d.total}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(d.completed / d.total) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                {Math.round((d.completed / d.total) * 100)}% выполнение
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
