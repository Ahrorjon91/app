import React from 'react';
import { usePortal } from '../context/PortalContext';
import { QUIZ_TESTS, COURSE_BLOCKS } from '../data/syllabusData';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { TypewriterText } from '../components/TypewriterText';
import {
  BookOpen,
  FlaskConical,
  FileCheck,
  Trophy,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Lock,
  Send,
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  Layers,
  Flame,
  FileText
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

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

export const DashboardPage: React.FC = () => {
  const {
    profile,
    stats,
    lessons,
    labs,
    leaderboard,
    testScores,
    unlockedLessonIds,
    isLessonUnlocked,
    isQuizUnlocked,
    isHomeworkUnlocked,
    isFinalExamUnlocked,
    setActivePage,
    setSelectedLessonId,
    setSelectedLabId,
    setSelectedQuizId,
    setIsXpModalOpen,
    setIsSyllabusModalOpen
  } = usePortal();

  // Find next uncompleted lesson and lab
  const nextLesson = lessons.find((l) => !l.isCompleted) || lessons[lessons.length - 1];
  const nextLab = labs.find((lab) => !lab.isCompleted) || labs[labs.length - 1];
  const isAllLessonsCompleted = lessons.every((l) => l.isCompleted);

  // Student progress calculation
  const maxUnlockedLessonId = Math.max(...(unlockedLessonIds || [1]), 1);
  const currentBlockId = Math.min(6, Math.ceil(maxUnlockedLessonId / 4) || 1);

  // Dynamic Upcoming Quiz Test
  const upcomingBlockTest =
    QUIZ_TESTS.find((test) => {
      const isPassed = testScores[test.id]?.passed;
      return !isPassed && isQuizUnlocked(test.id);
    }) ||
    QUIZ_TESTS.find((test) => test.blockId === currentBlockId) ||
    QUIZ_TESTS[0];

  const isUpcomingTestUnlocked = isQuizUnlocked(upcomingBlockTest.id);
  const upcomingTestPassed = testScores[upcomingBlockTest.id]?.passed;

  // Dynamic Homework Lesson
  const pendingHomeworkLesson =
    lessons.find((l) => (isHomeworkUnlocked ? isHomeworkUnlocked(l.id) : l.id <= maxUnlockedLessonId) && !l.isCompleted && l.homeworkTitle) ||
    lessons.find((l) => (isHomeworkUnlocked ? isHomeworkUnlocked(l.id) : l.id <= maxUnlockedLessonId) && l.homeworkTitle) ||
    lessons[0];

  // Dynamically calculate progress history by week
  const progressHistoryData = [1, 2, 3, 4, 5, 6, 7].map((weekNum) => {
    const targetLessonCount = Math.min(24, weekNum * 3.5);
    const completedUpToWeek = lessons.filter((l) => l.isCompleted && l.week <= weekNum).length;
    const progressVal = Math.min(100, Math.round((completedUpToWeek / (targetLessonCount || 1)) * 100));
    const labsCompleted = labs.filter((lab) => lab.isCompleted && lab.blockId <= Math.ceil(weekNum / 2)).length;
    const testsPassed = QUIZ_TESTS.filter((t) => Boolean(testScores[t.id]?.passed)).length;
    return {
      week: `Нед ${weekNum}`,
      progress: progressVal,
      labs: labsCompleted,
      tests: testsPassed,
    };
  });

  // Dynamically calculate competency from completed labs
  const getBlockLabCompletion = (blockIds: number[]) => {
    const domainLabs = labs.filter((l) => blockIds.includes(l.blockId));
    if (domainLabs.length === 0) return 75;
    const completedDomainLabs = domainLabs.filter((l) => l.isCompleted || (l.tasks.length > 0 && l.tasks.every((t) => t.completed))).length;
    return Math.min(100, Math.round(60 + (completedDomainLabs / domainLabs.length) * 40));
  };

  const skillsData = [
    { skill: 'Основы ИИ', level: getBlockLabCompletion([1]), color: '#0071e3' },
    { skill: 'Вайб-кодинг', level: getBlockLabCompletion([2]), color: '#00d959' },
    { skill: 'Продуктивность', level: getBlockLabCompletion([3]), color: '#f5f5f7' },
    { skill: 'Медиа и Звук', level: getBlockLabCompletion([4]), color: '#86868b' },
    { skill: 'ИИ-Агенты', level: getBlockLabCompletion([5]), color: '#ff791b' },
    { skill: 'Capstone', level: getBlockLabCompletion([6]), color: '#0071e3' },
  ];

  // Block progress items calculation
  const blockProgressItems = COURSE_BLOCKS.map((block) => {
    const blockLessons = lessons.filter((l) => l.blockId === block.id);
    const completedCount = blockLessons.filter((l) => l.isCompleted).length;
    const totalCount = blockLessons.length || 4;
    const pct = Math.round((completedCount / totalCount) * 100);
    const isTestPassed = Boolean(block.testId && testScores[block.testId]?.passed);
    const isUnlocked = blockLessons.some((l) => isLessonUnlocked(l.id));
    return {
      ...block,
      blockLessons,
      completedCount,
      totalCount,
      pct,
      isTestPassed,
      isUnlocked,
    };
  });

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. HERO EXHIBITION STAGE (APPLE MIDNIGHT AESTHETIC) */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#000000] border border-white/[0.08] p-6 sm:p-8 text-[#f5f5f7]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#262629] text-[11px] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#00d959]" />
              <span className="text-[#f5f5f7]">AI ACADEMY</span>
              <span>·</span>
              <span>Vibe Coding & Generative Agents</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#f5f5f7]">
              С возвращением, {profile.name}
            </h1>

            <p className="text-[#86868b] text-xs sm:text-sm leading-relaxed max-w-2xl">
              <TypewriterText
                text={`Вы успешно завершили ${stats.completedLessonsCount} из 24 практических занятий программы AI for LIFE. ${
                  isAllLessonsCompleted
                    ? 'Все материалы курса успешно освоены.'
                    : `Рекомендуем перейти к Уроку #${nextLesson.id}: «${nextLesson.titleRu || nextLesson.title}».`
                }`}
                speed={16}
              />
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Purchase Blue Pill Button: Primary Action */}
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                setActivePage('lesson-detail');
              }}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-white" />
              <span>{isAllLessonsCompleted ? 'Открыть уроки' : `Урок #${nextLesson.id}`}</span>
            </button>

            {/* EXP Breakdown Button */}
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#00d959] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Детализация EXP"
            >
              <Zap className="w-3.5 h-3.5 text-[#00d959] fill-current" />
              <span className="tabular-nums"><AnimatedCounter value={stats.totalPoints || 0} suffix=" EXP" /></span>
            </button>

            {/* Syllabus Passport Modal */}
            <button
              onClick={() => setIsSyllabusModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#f5f5f7] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Силлабус</span>
            </button>

            {/* Telegram Manager Support */}
            <a
              href="https://t.me/aivioratj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Global Progress Bar: Restrained Apple instrument style */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#86868b] font-medium flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#00d959]" /> Общий прогресс курса
              </span>
              <span className="text-[#00d959] font-semibold tabular-nums text-sm">
                <AnimatedCounter value={stats.progressPct} suffix="%" />
              </span>
            </div>
            <div className="relative w-full bg-[#1c1c1f] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#00d959] h-full rounded-full transition-all duration-700"
                style={{ width: `${stats.progressPct}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end text-xs text-[#86868b] gap-4">
            <div>
              <span className="block text-[#f5f5f7] font-semibold tabular-nums text-sm">
                <AnimatedCounter value={stats.attendancePct} suffix="%" />
              </span>
              <span className="text-[11px] text-[#86868b]">Посещаемость</span>
            </div>
            <div className="h-6 w-px bg-[#262629]" />
            <div>
              <span className="block text-[#0071e3] font-semibold tabular-nums text-sm">#{stats.rank}</span>
              <span className="text-[11px] text-[#86868b]">В рейтинге</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. KPI TILES (ROUNDED-28PX, BLACK SURFACES, TABULAR NUMS) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Completed Lessons Card */}
        <div
          onClick={() => setActivePage('lessons')}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-colors space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#86868b] font-medium">Уроки</span>
            <BookOpen className="w-4 h-4 text-[#0071e3]" />
          </div>
          <div>
            <span className="text-2xl font-semibold tabular-nums text-[#f5f5f7]">
              <AnimatedCounter value={stats.completedLessonsCount} />
            </span>
            <span className="text-xs text-[#86868b] tabular-nums"> / 24</span>
          </div>
          <div className="w-full bg-[#262629] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0071e3] h-full rounded-full transition-all duration-500" style={{ width: `${(stats.completedLessonsCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Labs Card */}
        <div
          onClick={() => setActivePage('labs')}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-colors space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#86868b] font-medium">Лабораторные</span>
            <FlaskConical className="w-4 h-4 text-[#00d959]" />
          </div>
          <div>
            <span className="text-2xl font-semibold tabular-nums text-[#f5f5f7]">
              <AnimatedCounter value={stats.completedLabsCount} />
            </span>
            <span className="text-xs text-[#86868b] tabular-nums"> / 24</span>
          </div>
          <div className="w-full bg-[#262629] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00d959] h-full rounded-full transition-all duration-500" style={{ width: `${(stats.completedLabsCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Homework Card */}
        <div
          onClick={() => setActivePage('homework')}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-colors space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#86868b] font-medium">Домашние</span>
            <FileCheck className="w-4 h-4 text-[#ff791b]" />
          </div>
          <div>
            <span className="text-2xl font-semibold tabular-nums text-[#f5f5f7]">
              <AnimatedCounter value={stats.submittedHomeworkCount} />
            </span>
            <span className="text-xs text-[#86868b] tabular-nums"> / 24</span>
          </div>
          <div className="w-full bg-[#262629] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#ff791b] h-full rounded-full transition-all duration-500" style={{ width: `${(stats.submittedHomeworkCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Attendance Card */}
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#86868b] font-medium">Посещаемость</span>
            <TrendingUp className="w-4 h-4 text-[#00d959]" />
          </div>
          <div>
            <span className="text-2xl font-semibold tabular-nums text-[#f5f5f7]">
              <AnimatedCounter value={stats.attendancePct} suffix="%" />
            </span>
          </div>
          <span className="text-[11px] text-[#00d959] font-medium block">
            Активное участие
          </span>
        </div>

        {/* Rank Card */}
        <div
          onClick={() => setActivePage('leaderboard')}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-colors space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#86868b] font-medium">Рейтинг</span>
            <Trophy className="w-4 h-4 text-[#ff791b]" />
          </div>
          <div>
            <span className="text-2xl font-semibold tabular-nums text-[#f5f5f7]">
              #{stats.rank}
            </span>
            <span className="text-xs text-[#86868b] tabular-nums"> / {Math.max(leaderboard.length || 1, 3)}</span>
          </div>
          <span className="text-[11px] text-[#0071e3] font-medium block">
            Таблица лидеров →
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SYLLABUS & ROADMAP EXHIBITION BAY */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#262629] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[#86868b]">
              <span className="text-[#0071e3] font-medium uppercase tracking-wider text-[11px]">Дорожная карта</span>
              <span>·</span>
              <span>24 занятия</span>
              <span>·</span>
              <span>6 блоков</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0071e3]" />
              Программа Обучения AI for LIFE
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-3xl leading-relaxed">
              Практический курс: архитектура современных LLM, генеративные медиа, автономные агенты и разработка готовых продуктов.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsSyllabusModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#262629] hover:bg-[#333336] text-[#f5f5f7] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Паспорт Урока 1</span>
            </button>
            <button
              onClick={() => setActivePage('lessons')}
              className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Все 24 Урока</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Methodology Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1.5">
            <div className="flex items-center gap-2 text-[#0071e3] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Методология</span>
            </div>
            <p className="text-xs text-[#f5f5f7] font-medium">
              Learn → Try → Build → Test → Improve → Share
            </p>
            <span className="text-[11px] text-[#86868b] block">
              30% теория · 60% разработка · 10% демонстрация.
            </span>
          </div>

          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1.5">
            <div className="flex items-center gap-2 text-[#ff791b] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Принцип Инженера</span>
            </div>
            <p className="text-xs text-[#f5f5f7] font-medium">
              Generate ≠ Finished (Сгенерировано ≠ готово)
            </p>
            <span className="text-[11px] text-[#86868b] block">
              Обязательная проверка фактов, отладка и доработка.
            </span>
          </div>

          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] space-y-1.5">
            <div className="flex items-center gap-2 text-[#00d959] text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Стек Инструментов</span>
            </div>
            <p className="text-xs text-[#f5f5f7] font-medium">
              ChatGPT · Gemini · Claude · Cursor · Flux · Suno
            </p>
            <span className="text-[11px] text-[#86868b] block">
              Передовые мультимодальные модели и среды вайб-кодинга.
            </span>
          </div>
        </div>

        {/* 6 Thematic Course Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {blockProgressItems.map((block) => (
            <div
              key={block.id}
              className={`p-5 rounded-[24px] border transition-colors flex flex-col justify-between space-y-4 ${
                block.isUnlocked
                  ? 'bg-[#000000] border-[#262629] hover:border-white/[0.18]'
                  : 'bg-[#0a0a0b] border-[#1c1c1f] opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-[#86868b]">
                    {block.weeks} · {block.lessonRange}
                  </span>
                  {block.pct === 100 && block.isTestPassed ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#1c2e22] text-[#00d959] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Завершён
                    </span>
                  ) : block.completedCount > 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#1c2333] text-[#0071e3]">
                      В процессе ({block.completedCount}/4)
                    </span>
                  ) : block.isUnlocked ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#262629] text-[#86868b]">
                      Доступен
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#1c1c1f] text-[#6e6e73] flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Закрыт
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#f5f5f7] leading-snug">
                    {block.titleRu}
                  </h3>
                  <p className="text-xs text-[#86868b] mt-1.5 line-clamp-3 leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>

              {/* Progress and Buttons */}
              <div className="space-y-3 pt-3 border-t border-[#262629]">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] tabular-nums">
                    <span className="text-[#86868b]">Пройдено:</span>
                    <span className="text-[#f5f5f7] font-medium">{block.completedCount} из {block.totalCount} ({block.pct}%)</span>
                  </div>
                  <div className="w-full bg-[#1c1c1f] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        block.pct === 100 ? 'bg-[#00d959]' : 'bg-[#0071e3]'
                      }`}
                      style={{ width: `${block.pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (block.blockLessons.length > 0) {
                        setSelectedLessonId(block.blockLessons[0].id);
                      }
                      setActivePage('lessons');
                    }}
                    className="flex-1 py-2 px-3 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#f5f5f7] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>К урокам</span>
                  </button>
                  {block.testId && (
                    <button
                      onClick={() => {
                        setSelectedQuizId(block.testId!);
                        setActivePage('quizzes');
                      }}
                      className={`py-2 px-3.5 rounded-full text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                        block.isTestPassed
                          ? 'bg-[#1c2e22] text-[#00d959] hover:bg-[#243c2c]'
                          : 'bg-[#262629] text-[#f5f5f7] hover:bg-[#333336]'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{block.isTestPassed ? 'Тест ✓' : 'Тест'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. UPCOMING DEADLINES & ACTIVE TASKS */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Next Block Test */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-[#86868b] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#0071e3]" /> Контрольный Тест
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                upcomingTestPassed ? 'bg-[#1c2e22] text-[#00d959]' : isUpcomingTestUnlocked ? 'bg-[#1c2333] text-[#0071e3]' : 'bg-[#262629] text-[#86868b]'
              }`}>
                {upcomingTestPassed ? 'Сдан ✓' : isUpcomingTestUnlocked ? 'Доступен' : 'Закрыт'}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7] leading-snug">
              {upcomingBlockTest.title}
            </h4>
            <p className="text-xs text-[#86868b] line-clamp-2">
              {upcomingBlockTest.description}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedQuizId(upcomingBlockTest.id);
              setActivePage('quizzes');
            }}
            className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>{upcomingTestPassed ? 'Результаты теста' : 'Пройти Тест'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Current Homework Assignment */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-[#86868b] flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#ff791b]" /> Домашнее Задание
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#311400] text-[#ff791b]">
                Урок #{pendingHomeworkLesson.id}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7] leading-snug">
              {pendingHomeworkLesson.homeworkTitle || `ДЗ к уроку #${pendingHomeworkLesson.id}`}
            </h4>
            <p className="text-xs text-[#86868b] line-clamp-2">
              {pendingHomeworkLesson.homeworkDesc || 'Выполните практическое задание и прикрепите отчет на проверку ментору.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedLessonId(pendingHomeworkLesson.id);
              setActivePage('homework');
            }}
            className="w-full py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#f5f5f7] font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Сдать Домашнее Задание</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recommended Lab */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-[#86868b] flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-[#00d959]" /> Лабораторная Работа
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1c2e22] text-[#00d959]">
                Лаба #{nextLab.id}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7] leading-snug">
              {nextLab.title}
            </h4>
            <p className="text-xs text-[#86868b] line-clamp-2">
              {nextLab.scenario || 'Выполните все пошаговые задания в интерактивном терминале.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedLabId(nextLab.id);
              setActivePage('lab-detail');
            }}
            className="w-full py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#f5f5f7] font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5 text-[#00d959]" />
            <span>Запустить Лабу</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. CHARTS & ANALYTICS */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Dynamics Chart */}
        <div className="lg:col-span-2 min-w-0 p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0071e3]" /> Динамика прохождения курса
              </h3>
              <p className="text-xs text-[#86868b]">Выполненные уроки и сданные тесты по неделям</p>
            </div>
            <span className="px-3 py-1 bg-[#000000] text-[#86868b] border border-[#262629] rounded-full text-xs tabular-nums">
              Недели 1–7
            </span>
          </div>

          <SafeChartContainer height={240} className="h-60">
            {(chartWidth, chartHeight) => (
              <AreaChart width={chartWidth} height={chartHeight} data={progressHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071e3" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0071e3" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#86868b" fontSize={11} tickLine={false} />
                <YAxis stroke="#86868b" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#000000', borderColor: '#333336', borderRadius: '16px', fontSize: '12px', color: '#f5f5f7' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#0071e3" strokeWidth={2} fillOpacity={1} fill="url(#progressGrad)" />
              </AreaChart>
            )}
          </SafeChartContainer>
        </div>

        {/* Competency Profile */}
        <div className="min-w-0 p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00d959]" /> Профиль навыков
            </h3>
            <p className="text-xs text-[#86868b]">Уровень освоения по результатам лаб</p>
          </div>

          <SafeChartContainer height={240} className="h-60">
            {(chartWidth, chartHeight) => (
              <BarChart width={chartWidth} height={chartHeight} data={skillsData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#86868b" fontSize={10} hide />
                <YAxis dataKey="skill" type="category" stroke="#86868b" fontSize={11} tickLine={false} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#333336', borderRadius: '16px', fontSize: '12px', color: '#f5f5f7' }} />
                <Bar dataKey="level" radius={[0, 8, 8, 0]} barSize={12}>
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </SafeChartContainer>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. BOTTOM ROW: NEXT STEP & LEADERBOARD */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Lesson Launcher */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0071e3]" /> Рекомендуемый шаг
            </h3>
            <span className="text-xs text-[#86868b] tabular-nums">
              {nextLesson.isCompleted ? 'Все пройдены' : `Урок #${nextLesson.id}`}
            </span>
          </div>

          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-[#ff791b] font-medium">
                Урок #{nextLesson.id} {nextLesson.isCompleted ? '· Завершён ✓' : '· Доступен'}
              </span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">{nextLesson.titleRu || nextLesson.title}</h4>
              <p className="text-xs text-[#86868b]">{nextLesson.theorySummary || nextLesson.title}</p>
            </div>
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                setActivePage('lesson-detail');
              }}
              className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Открыть</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lab Shortcut */}
          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-[#00d959] font-medium">
                Лабораторная #{nextLab.id} {nextLab.isCompleted ? '· Выполнена ✓' : '· Доступна'}
              </span>
              <h4 className="text-sm font-semibold text-[#f5f5f7]">{nextLab.title}</h4>
              <p className="text-xs text-[#86868b]">{nextLab.scenario || 'Практические задания в тренажере'}</p>
            </div>
            <button
              onClick={() => {
                setSelectedLabId(nextLab.id);
                setActivePage('lab-detail');
              }}
              className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#f5f5f7] font-medium text-xs shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#00d959]" />
              <span>Запустить</span>
            </button>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#ff791b]" /> Таблица Лидеров
            </h3>
            <button
              onClick={() => setActivePage('leaderboard')}
              className="text-xs text-[#0071e3] hover:underline font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Весь рейтинг</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {(profile.role === 'admin' 
              ? leaderboard 
              : leaderboard.filter((u) => (u.group || 'Группа 1 (Август 2026)') === (profile.group || 'Группа 1 (Август 2026)'))
            ).slice(0, 4).map((user, idx) => {
              const isMe = user.isCurrentUser || user.name === profile.name;
              return (
                <div
                  key={`${user.id || user.name}-${idx}`}
                  className={`p-3 rounded-[20px] flex items-center justify-between transition-colors ${
                    isMe
                      ? 'bg-[#1c2333] border border-[#0071e3]/40'
                      : 'bg-[#000000] border border-[#262629]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-xs w-6 text-center text-[#86868b] tabular-nums">
                      {idx === 0 ? '1' : idx === 1 ? '2' : idx === 2 ? '3' : `${idx + 1}`}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#f5f5f7]">{user.name}</span>
                        {isMe && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#0071e3] text-white font-medium">
                            Вы
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#86868b] block tabular-nums">
                        {user.completedLessons}/24 уроков · {user.attendancePct}%
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-xs text-[#00d959] tabular-nums block">
                      {user.totalPoints} EXP
                    </span>
                    <span className="text-[11px] text-[#86868b]">
                      Уровень {Math.max(1, Math.floor((user.totalPoints || 0) / 500) + 1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
