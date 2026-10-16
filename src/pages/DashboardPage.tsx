import React from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import { QUIZ_TESTS, COURSE_BLOCKS } from '../data/syllabusData';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { TypewriterText } from '../components/TypewriterText';
import {
  BookOpen,
  FlaskConical,
  FileCheck,
  Award,
  Trophy,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Clock,
  Target,
  Lock,
  Send,
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  ExternalLink,
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
    setIsSyllabusModalOpen,
    currentCourseId,
    currentCourse,
    courseBlocks
  } = usePortal();

  // Find next uncompleted lesson and lab
  const nextLesson = lessons.find((l) => !l.isCompleted) || lessons[lessons.length - 1];
  const nextLab = labs.find((lab) => !lab.isCompleted) || labs[labs.length - 1];
  const isAllLessonsCompleted = lessons.every((l) => l.isCompleted);

  // Student progress calculation
  const maxUnlockedLessonId = Math.max(...(unlockedLessonIds || [1]), 1);
  const currentBlockId = Math.min(6, Math.ceil(maxUnlockedLessonId / 4) || 1);

  // Dynamic Upcoming Quiz Test (find first unpassed test that belongs to unlocked range or current block)
  const upcomingBlockTest =
    QUIZ_TESTS.find((test) => {
      const isPassed = testScores[test.id]?.passed;
      return !isPassed && isQuizUnlocked(test.id);
    }) ||
    QUIZ_TESTS.find((test) => test.blockId === currentBlockId) ||
    QUIZ_TESTS[0];

  const isUpcomingTestUnlocked = isQuizUnlocked(upcomingBlockTest.id);
  const upcomingTestPassed = testScores[upcomingBlockTest.id]?.passed;

  // Dynamic Homework Lesson (pending homework from unlocked lessons)
  const pendingHomeworkLesson =
    lessons.find((l) => (isHomeworkUnlocked ? isHomeworkUnlocked(l.id) : l.id <= maxUnlockedLessonId) && !l.isCompleted && l.homeworkTitle) ||
    lessons.find((l) => (isHomeworkUnlocked ? isHomeworkUnlocked(l.id) : l.id <= maxUnlockedLessonId) && l.homeworkTitle) ||
    lessons[0];

  const isFinalUnlocked = isQuizUnlocked('FINAL_EXAM') || isFinalExamUnlocked;

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

  // Dynamically calculate competency / skills from completed labs per domain
  const getBlockLabCompletion = (blockIds: number[]) => {
    const domainLabs = labs.filter((l) => blockIds.includes(l.blockId));
    if (domainLabs.length === 0) return 75;
    const completedDomainLabs = domainLabs.filter((l) => l.isCompleted || (l.tasks.length > 0 && l.tasks.every((t) => t.completed))).length;
    return Math.min(100, Math.round(60 + (completedDomainLabs / domainLabs.length) * 40));
  };

  const skillsData = [
    { skill: 'Основы ИИ', level: getBlockLabCompletion([1]), color: '#06b6d4' },
    { skill: 'Вайб-кодинг', level: getBlockLabCompletion([2]), color: '#3b82f6' },
    { skill: 'Продуктивность', level: getBlockLabCompletion([3]), color: '#10b981' },
    { skill: 'Медиа и Аудио', level: getBlockLabCompletion([4]), color: '#8b5cf6' },
    { skill: 'ИИ-Агенты', level: getBlockLabCompletion([5]), color: '#f59e0b' },
    { skill: 'Capstone и Запуск', level: getBlockLabCompletion([6]), color: '#ec4899' },
  ];

  // Block projects and badges data mapping
  const blockMetadata: Record<number, { project: string; badge: string; icon: string }> = {
    1: { project: 'Project #1 «My AI Life Helper»', badge: '🤖 AI Explorer', icon: '🤖' },
    2: { project: 'Project #2 «Interactive Web Utility»', badge: '⚡ Vibe Coder', icon: '💻' },
    3: { project: 'Project #3 «Personal Knowledge Base»', badge: '🧠 Deep Researcher', icon: '📚' },
    4: { project: 'Project #4 «AI Multimedia Brand Campaign»', badge: '🎨 Media Creator', icon: '🎬' },
    5: { project: 'Project #5 «Autonomous Personal Assistant»', badge: '🤖 Agent Architect', icon: '⚙️' },
    6: { project: 'Финальный дипломный «AI Capstone Project»', badge: '🎓 AI Master', icon: '🏆' },
  };

  // Block progress items calculation
  const blockProgressItems = (courseBlocks || COURSE_BLOCKS).map((block) => {
    const blockLessons = lessons.filter((l) => l.blockId === block.id);
    const completedCount = blockLessons.filter((l) => l.isCompleted).length;
    const totalCount = blockLessons.length || 4;
    const pct = Math.round((completedCount / totalCount) * 100);
    const isTestPassed = Boolean(block.testId && testScores[block.testId]?.passed);
    const isUnlocked = blockLessons.some((l) => isLessonUnlocked(l.id));
    const meta = blockMetadata[block.id] || { project: 'Практический проект', badge: 'AI Specialist', icon: '⭐' };
    return {
      ...block,
      meta,
      blockLessons,
      completedCount,
      totalCount,
      pct,
      isTestPassed,
      isUnlocked,
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ======================================================== */}
      {/* 1. ГЛАВНЫЙ БАННЕР С ПРИВЕТСТВИЕМ НА РУССКОМ ЯЗЫКЕ */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-cyan-500/20 p-6 md:p-8 shadow-2xl shadow-cyan-500/5 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold ${
              currentCourseId === 'sysadmin-devops'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                : 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${currentCourseId === 'sysadmin-devops' ? 'text-emerald-400' : 'text-cyan-400'} animate-pulse`} />
              <span>{currentCourse.title}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              С возвращением, <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">{profile.name}</span> 👋
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              <TypewriterText
                text={`Вы успешно завершили ${stats.completedLessonsCount} из 24 практических занятий программы ${currentCourse.shortName}. ${
                  isAllLessonsCompleted
                    ? 'Поздравляем! Вы прошли все материалы программы.'
                    : `Рекомендуем продолжить Урок #${nextLesson.id}: «${nextLesson.titleRu || nextLesson.title}».`
                }`}
                speed={18}
              />
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Primary Continue Lesson Button */}
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                setActivePage('lesson-detail');
              }}
              className="btn-shine-overlay px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-cyan-200" />
              <span>{isAllLessonsCompleted ? 'Открыть уроки' : `Продолжить Урок #${nextLesson.id}`}</span>
            </button>

            {/* EXP Modal Breakdown Button (Working 100%) */}
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:border-amber-400"
              title="Посмотреть детальную расшифровку накопленного EXP"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
              <AnimatedCounter value={stats.totalPoints || 0} suffix=" EXP" />
            </button>

            {/* Open Syllabus Passport Modal */}
            <button
              onClick={() => setIsSyllabusModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:border-cyan-400"
              title="Открыть паспорт и силлабус программы обучения"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Паспорт Силлабуса</span>
            </button>

            {/* Telegram Manager Support */}
            <a
              href="https://t.me/aivioratj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-blue-600/80 hover:bg-blue-500 text-white border border-blue-400/30 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
              title="Написать менеджеру курса в Telegram"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Менеджер в Telegram</span>
            </a>
          </div>
        </div>

        {/* Global Course Progress Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Target className="w-4 h-4 text-cyan-400" /> Общий академический прогресс курса
              </span>
              <span className="text-cyan-400 font-mono font-extrabold text-sm">
                <AnimatedCounter value={stats.progressPct} suffix="%" />
              </span>
            </div>
            <div className="relative w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
              <div
                className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 shadow-sm shadow-cyan-500/40 overflow-hidden"
                style={{ width: `${stats.progressPct}%` }}
              >
                <div className="absolute inset-0 animated-shimmer-bar" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end text-xs text-slate-400 gap-4">
            <div>
              <span className="block text-white font-mono font-bold text-sm">
                <AnimatedCounter value={stats.attendancePct} suffix="%" />
              </span>
              <span className="text-[10px]">Посещаемость</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="block text-cyan-400 font-mono font-bold text-sm">#{stats.rank}</span>
              <span className="text-[10px]">Ранг на Лидерборде</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. KPI КАРТОЧКИ УСПЕВАЕМОСТИ (С ПРАВИЛЬНЫМИ ПЕРЕХОДАМИ) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {/* Completed Lessons Card */}
        <div
          onClick={() => setActivePage('lessons')}
          className="cyber-glass-card cyber-card-hover p-4 rounded-2xl hover:border-cyan-500/40 cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Уроки Курса</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.completedLessonsCount} />
            </span>
            <span className="text-xs text-slate-400 font-mono font-semibold"> / 24</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${(stats.completedLessonsCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Labs Card -> Direct to LabsPage */}
        <div
          onClick={() => setActivePage('labs')}
          className="cyber-glass-card cyber-card-hover p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Лабораторные</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.completedLabsCount} />
            </span>
            <span className="text-xs text-slate-400 font-mono font-semibold"> / 24</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${(stats.completedLabsCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Homework Card -> Direct to HomeworkPage */}
        <div
          onClick={() => setActivePage('homework')}
          className="cyber-glass-card cyber-card-hover p-4 rounded-2xl hover:border-amber-500/40 cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">ДЗ Сдано</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.submittedHomeworkCount} />
            </span>
            <span className="text-xs text-slate-400 font-mono font-semibold"> / 24</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full rounded-full transition-all duration-500" style={{ width: `${(stats.submittedHomeworkCount / 24) * 100}%` }} />
          </div>
        </div>

        {/* Attendance Card */}
        <div className="cyber-glass-card cyber-card-hover p-4 rounded-2xl hover:border-cyan-500/40 group space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Посещаемость</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
              <AnimatedCounter value={stats.attendancePct} suffix="%" />
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Активный учёт
          </span>
        </div>

        {/* Rank Card -> Direct to Leaderboard */}
        <div
          onClick={() => setActivePage('leaderboard')}
          className="cyber-glass-card cyber-card-hover p-4 rounded-2xl hover:border-amber-400/50 cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Рейтинг</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform holo-badge-gold">
              <Trophy className="w-4 h-4 text-slate-900" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-mono text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              #{stats.rank}
            </span>
            <span className="text-xs text-slate-400 font-mono"> / {Math.max(leaderboard.length || 1, 3)}</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono font-medium block">
            Лидерборд ★
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. ОСНОВНОЙ ОБНОВЛЕННЫЙ DIV: ПРОГРАММА И МОДУЛИ КУРСА НА РУССКОМ ЯЗЫКЕ */}
      {/* ======================================================== */}
      <div className="p-6 md:p-8 rounded-3xl cyber-glass-card space-y-6 relative overflow-hidden border border-cyan-500/20 shadow-xl bg-slate-900/60">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                Силлабус и Дорожная Карта
              </span>
              <span className="text-xs text-slate-400 font-mono font-medium">
                24 занятия · 6 блоков · 5 проектов
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyan-400" />
              Программа Обучения AI for LIFE: Vibe Coding & Agents
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Актуальная программа курса: фундаментальное освоение современных LLM, генеративных мультимедиа, архитектуры автономных агентов и разработка реальных IT-продуктов без написания рутинного шаблонного кода.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSyllabusModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Паспорт Урока 1</span>
            </button>
            <button
              onClick={() => setActivePage('lessons')}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <span>Все 24 Урока</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Methodology & Principles Banner in Russian */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Методология Обучения</span>
            </div>
            <p className="text-xs text-slate-300 font-mono font-semibold">
              Learn → Try → Build → Test → Improve → Share
            </p>
            <span className="text-[11px] text-slate-400 block">
              30% теория и демонстрация · 60% практическая разработка · 10% Demo Day & Showcase.
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Главное Правило Инженера</span>
            </div>
            <p className="text-xs text-amber-300 font-bold">
              Generate ≠ Finished (Сгенерировано — не готово!)
            </p>
            <span className="text-[11px] text-slate-400 block">
              Обязательная проверка фактов (второй источник, расчет), отладка и доработка логики.
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Стек Инструментов</span>
            </div>
            <p className="text-xs text-purple-300 font-mono font-semibold">
              ChatGPT · Gemini · Claude · Cursor · Flux · Suno
            </p>
            <span className="text-[11px] text-slate-400 block">
              Ведущие AI-инструменты, мультимодальные модели и современные среды вайб-кодинга.
            </span>
          </div>
        </div>

        {/* 6 Thematic Course Blocks Grid in Russian */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {blockProgressItems.map((block) => (
            <div
              key={block.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                block.isUnlocked
                  ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950/40 border-slate-900 opacity-70'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-800/50">
                    {block.weeks} · {block.lessonRange}
                  </span>
                  {block.pct === 100 && block.isTestPassed ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Завершён
                    </span>
                  ) : block.completedCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      В процессе ({block.completedCount}/4)
                    </span>
                  ) : block.isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      Доступен
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Закрыт
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5 leading-snug">
                    <span>{block.meta.icon}</span>
                    <span>{block.titleRu}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {block.description}
                  </p>
                </div>

                {/* Project Badge Highlight */}
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> {block.meta.project}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Бейдж: {block.meta.badge}</span>
                    <span>Тест: {block.isTestPassed ? 'Сдан ✓' : 'Ожидает'}</span>
                  </div>
                </div>
              </div>

              {/* Block Progress Bar & Launch Buttons */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Пройдено уроков:</span>
                    <span className="text-white font-bold">{block.completedCount} из {block.totalCount} ({block.pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        block.pct === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
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
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>К урокам</span>
                  </button>
                  {block.testId && (
                    <button
                      onClick={() => {
                        setSelectedQuizId(block.testId!);
                        setActivePage('quizzes');
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                        block.isTestPassed
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                      }`}
                      title={block.isTestPassed ? 'Тест сдан (просмотреть результат)' : 'Сдать проверочный тест блока'}
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
      {/* 4. БЛИЖАЙШИЕ ДЕДЛАЙНЫ И ПРИОРИТЕТНЫЕ ЗАДАЧИ */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Next Block Test */}
        <div className="p-5 rounded-3xl cyber-glass-card space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Контрольный Тест
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                upcomingTestPassed ? 'bg-emerald-500/20 text-emerald-300' : isUpcomingTestUnlocked ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {upcomingTestPassed ? 'Сдан ✓' : isUpcomingTestUnlocked ? 'Доступен' : 'Заблокирован'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {upcomingBlockTest.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              {upcomingBlockTest.description}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedQuizId(upcomingBlockTest.id);
              setActivePage('quizzes');
            }}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
          >
            <span>{upcomingTestPassed ? 'Посмотреть результаты' : 'Пройти Тест'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Current Homework Assignment */}
        <div className="p-5 rounded-3xl cyber-glass-card space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" /> Домашнее Задание
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300">
                Урок #{pendingHomeworkLesson.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {pendingHomeworkLesson.homeworkTitle || `ДЗ к уроку #${pendingHomeworkLesson.id}`}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              {pendingHomeworkLesson.homeworkDesc || 'Выполните практическое задание и прикрепите отчет на проверку ментору.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedLessonId(pendingHomeworkLesson.id);
              setActivePage('homework');
            }}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-600/20 cursor-pointer"
          >
            <span>Сдать Домашнее Задание</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recommended Lab */}
        <div className="p-5 rounded-3xl cyber-glass-card space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5" /> Практическая Лаборатория
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                Лаба #{nextLab.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {nextLab.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              {nextLab.scenario || 'Выполните все пошаговые задания в интерактивном терминале и тренажере.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedLabId(nextLab.id);
              setActivePage('lab-detail');
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Запустить Лабораторную</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. ГРАФИКИ И АНАЛИТИКА ПРОГРЕССА */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress Chart (2 Columns) */}
        <div className="lg:col-span-2 min-w-0 p-5 rounded-3xl cyber-glass-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" /> Динамика прохождения курса
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Рост выполненных уроков и сданных тестов по неделям</p>
            </div>
            <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-xs font-mono font-semibold">
              Недели 1–7
            </span>
          </div>

          <SafeChartContainer height={256} className="h-64">
            {(chartWidth, chartHeight) => (
              <AreaChart width={chartWidth} height={chartHeight} data={progressHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d0d12', borderColor: 'rgba(6,182,212,0.3)', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#progressGrad)" />
              </AreaChart>
            )}
          </SafeChartContainer>
        </div>

        {/* Competency / Skills Radar Bar Chart */}
        <div className="min-w-0 p-5 rounded-3xl cyber-glass-card space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Профиль компетенций
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Оценка навыков по результатам выполненных лаб</p>
          </div>

          <SafeChartContainer height={256} className="h-64">
            {(chartWidth, chartHeight) => (
              <BarChart width={chartWidth} height={chartHeight} data={skillsData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={10} hide />
                <YAxis dataKey="skill" type="category" stroke="#64748b" fontSize={11} tickLine={false} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                <Bar dataKey="level" radius={[0, 8, 8, 0]} barSize={14}>
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
      {/* 6. НИЖНИЙ РЯД: РЕКОМЕНДУЕМЫЙ ЭТАП И РЕЙТИНГ */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Lesson Launcher */}
        <div className="p-5 rounded-3xl cyber-glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" /> Рекомендуемый следующий этап
            </h3>
            <span className="text-xs text-cyan-400 font-mono font-semibold">
              {nextLesson.isCompleted ? 'Все уроки пройдены' : `Урок #${nextLesson.id}`}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                Урок #{nextLesson.id} {nextLesson.isCompleted ? '• Завершен ✓' : '• Доступен'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{nextLesson.titleRu || nextLesson.title}</h4>
              <p className="text-xs text-slate-400">{nextLesson.theorySummary || nextLesson.title}</p>
            </div>
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                setActivePage('lesson-detail');
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shrink-0 flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <span>Открыть Урок</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Practice Lab Shortcut */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Практическая Лаба #{nextLab.id} {nextLab.isCompleted ? '• Выполнена ✓' : '• Готова к старту'}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{nextLab.title}</h4>
              <p className="text-xs text-slate-400">{nextLab.scenario || 'Выполните все практические таски в терминале'}</p>
            </div>
            <button
              onClick={() => {
                setSelectedLabId(nextLab.id);
                setActivePage('lab-detail');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Запустить Лабу</span>
            </button>
          </div>
        </div>

        {/* Leaderboard Preview (Таблица Лидеров) */}
        <div className="p-5 rounded-3xl cyber-glass-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Таблица Лидеров • {profile.role === 'admin' ? 'Все Группы' : (profile.group || 'Группа 1')}
            </h3>
            <button
              onClick={() => setActivePage('leaderboard')}
              className="text-xs text-cyan-400 hover:underline font-mono font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Полный Рейтинг</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {(profile.role === 'admin' 
              ? leaderboard 
              : leaderboard.filter((u) => (u.group || 'Группа 1 (Август 2026)') === (profile.group || 'Группа 1 (Август 2026)'))
            ).slice(0, 4).map((user, idx) => {
              const isMe = user.isCurrentUser || user.name === profile.name;
              return (
                <div
                  key={`${user.id || user.name}-${idx}`}
                  className={`p-3 rounded-2xl flex items-center justify-between transition-all ${
                    isMe
                      ? 'bg-cyan-500/10 border border-cyan-500/30 font-bold'
                      : 'bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-xs w-6 text-center">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </span>
                    <img
                      src={user.avatar || studentAvatarSvg}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = studentAvatarSvg;
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</span>
                        {isMe && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-400 font-bold">
                            Вы
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                        {user.completedLessons}/24 уроков • Посещаемость {user.attendancePct}%
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-extrabold text-xs text-amber-500 dark:text-amber-400 block">
                      {user.totalPoints} EXP
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      🏆 {user.badgesCount}
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
