import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS, INITIAL_LESSONS } from '../data/syllabusData';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Play,
  ChevronRight,
  Check,
  FileText,
  Lock,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  X,
  LayoutGrid,
  Terminal,
  Zap,
  Rocket,
  TrendingUp
} from 'lucide-react';

export const LessonsPage: React.FC = () => {
  const {
    lessons: contextLessons,
    setSelectedLessonId,
    setActivePage,
    toggleLessonCompletion,
    isLessonUnlocked,
    profile,
    xpBreakdown,
    setIsXpModalOpen,
    readSections,
    testScores,
    quizSubmissions,
    labs,
    homeworkSubmissions,
  } = usePortal() as any;

  const lessons = useMemo(() => {
    return contextLessons && contextLessons.length > 0 ? contextLessons : INITIAL_LESSONS;
  }, [contextLessons]);

  const [selectedBlockId, setSelectedBlockId] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'completed' | 'projects' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'by_blocks' | 'all_grid'>('by_blocks');

  // Milestone Project Lessons (Lessons 4, 8, 12, 16, 20, 24)
  const projectLessonIds = useMemo(() => [4, 8, 12, 16, 20, 24], []);

  // Course Progress Stats
  const completedLessonsCount = lessons.filter((l: any) => l.isCompleted).length;
  const unlockedLessonsCount = lessons.filter((l: any) => isLessonUnlocked(l.id)).length;
  const progressPct = Math.round((completedLessonsCount / 24) * 100);

  // Next recommended lesson
  const nextUpLesson = useMemo(() => {
    return lessons.find((l: any) => isLessonUnlocked(l.id) && !l.isCompleted) || lessons[0];
  }, [lessons, isLessonUnlocked]);

  // Clean title helper
  const getCleanTitle = (title: string, id: number) => {
    if (!title) return `Урок ${id}`;
    return title.replace(/^(Урок|Lesson)\s*\d+[:.\s-]*/i, '').trim();
  };

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((l: any) => {
      if (selectedBlockId !== 'all' && l.blockId !== selectedBlockId) return false;
      if (statusFilter === 'unlocked' && (!isLessonUnlocked(l.id) || l.isCompleted)) return false;
      if (statusFilter === 'completed' && !l.isCompleted) return false;
      if (statusFilter === 'locked' && isLessonUnlocked(l.id)) return false;
      if (statusFilter === 'projects' && !projectLessonIds.includes(l.id)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (l.titleRu || l.title || '').toLowerCase().includes(q);
        const inDesc = (l.theorySummary || '').toLowerCase().includes(q);
        const inTools = (l.tools || []).some((t: string) => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inTools) return false;
      }

      return true;
    });
  }, [lessons, selectedBlockId, statusFilter, searchQuery, isLessonUnlocked, projectLessonIds]);

  return (
    <div className="space-y-6 lessons-page-reader">
      {/* 1. Header Banner: Absolute Black Exhibition Stage */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#000000] border border-white/[0.08] p-6 sm:p-8 text-[#f5f5f7]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#262629] text-[11px] font-medium">
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" />
              <span className="text-[#f5f5f7]">Учебная программа</span>
              <span>·</span>
              <span>24 занятия</span>
              <span>·</span>
              <span>6 блоков</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#f5f5f7]">
              Уроки Курса AI for LIFE
            </h1>

            <p className="text-[#86868b] text-xs sm:text-sm leading-relaxed">
              От фундаментальных концепций Machine Learning и промпт-инжиниринга до автономных ИИ-агентов, MCP и создания полномасштабных цифровых сервисов.
            </p>

            {nextUpLesson && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLessonId(nextUpLesson.id);
                    setActivePage('lesson-detail');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-xs text-[#f5f5f7] transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00d959]" />
                  <span className="text-[#86868b]">Следующий:</span>
                  <span className="font-semibold text-[#f5f5f7]">
                    Урок #{nextUpLesson.id} «{getCleanTitle(nextUpLesson.titleRu, nextUpLesson.id)}»
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0071e3]" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-3 shrink-0">
            {/* Progress Card */}
            <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.08] min-w-[210px] space-y-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#86868b] font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00d959]" />
                  <span>Общий прогресс:</span>
                </span>
                <span className="text-[#00d959] font-semibold tabular-nums text-sm">{progressPct}%</span>
              </div>
              <div className="w-full bg-[#262629] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#00d959] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#86868b] tabular-nums">
                <span>Пройдено: <strong className="text-[#f5f5f7] font-semibold">{completedLessonsCount}</strong>/24</span>
                <span>Открыто: <strong className="text-[#0071e3] font-semibold">{unlockedLessonsCount}</strong>/24</span>
              </div>
            </div>

            {/* EXP Card */}
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="p-4 rounded-[20px] bg-[#161618] hover:bg-[#1c1c1f] border border-white/[0.08] text-[#f5f5f7] transition-colors flex flex-col justify-between cursor-pointer text-left min-w-[170px]"
            >
              <div className="flex items-center justify-between gap-1 text-xs font-semibold text-[#86868b]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d959]" />
                  <span>EXP Баланс</span>
                </div>
                <span className="text-[10px] text-[#0071e3]">Детали →</span>
              </div>
              <div className="text-xl font-semibold tabular-nums text-[#00d959] my-1">
                {xpBreakdown?.totalXp || profile?.points || 0} <span className="text-xs text-[#86868b] font-normal">EXP</span>
              </div>
              <div className="text-[10px] text-[#86868b] flex items-center gap-1">
                <Award className="w-3 h-3 text-[#ff791b]" />
                <span>+150 EXP за каждый урок</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 24 Lessons Interactive Ribbon */}
      <div className="p-4 sm:p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0071e3] shrink-0" />
            <h3 className="text-xs font-semibold text-[#f5f5f7]">Интерактивная лента 24 уроков:</h3>
            <span className="text-xs text-[#86868b] hidden md:inline">(6 тематических блоков)</span>
          </div>
          <div className="text-xs text-[#86868b] flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00d959] inline-block" /> Пройден
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0071e3] inline-block" /> Доступен
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6e6e73] inline-block" /> Закрыт
            </span>
          </div>
        </div>

        {/* 24 Lesson Buttons Ribbon */}
        <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-24 gap-1.5 pt-1">
          {lessons.map((l: any) => {
            const unlocked = isLessonUnlocked(l.id);
            const isCompleted = l.isCompleted;
            const isProject = projectLessonIds.includes(l.id);
            const isNext = nextUpLesson?.id === l.id;

            return (
              <button
                key={l.id}
                onClick={() => {
                  if (unlocked) {
                    setSelectedLessonId(l.id);
                    setActivePage('lesson-detail');
                  }
                }}
                disabled={!unlocked}
                title={`Урок #${l.id}: ${l.titleRu}${isProject ? ' · Курсовой проект' : ''}`}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-medium flex flex-col items-center justify-center transition-colors border relative cursor-pointer ${
                  !unlocked
                    ? 'bg-[#000000] text-[#6e6e73] border-[#262629] cursor-not-allowed opacity-50'
                    : isCompleted
                    ? 'bg-[#1c2e22] text-[#00d959] border-[#00d959]/30'
                    : isNext
                    ? 'bg-[#0071e3] text-white border-[#0071e3]'
                    : 'bg-[#1c1c1f] text-[#f5f5f7] border-[#333336] hover:bg-[#262629]'
                }`}
              >
                <span className="text-[11px] tabular-nums">#{l.id}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00d959] mt-0.5 shrink-0" />
                ) : !unlocked ? (
                  <Lock className="w-3.5 h-3.5 text-[#6e6e73] mt-0.5 shrink-0" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-white fill-current mt-0.5 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="space-y-3.5 p-4 sm:p-5 rounded-[28px] bg-[#161618] border border-white/[0.08]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input: Apple Pill Style */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]" />
            <input
              type="text"
              placeholder="Поиск по урокам и инструментам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-[#333336] rounded-full pl-11 pr-9 py-2 text-xs text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status & View Mode Switches */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#000000] border border-[#262629] rounded-full text-xs font-medium">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#0071e3] text-white'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                Все ({lessons.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('unlocked')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  statusFilter === 'unlocked'
                    ? 'bg-[#0071e3] text-white'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                Доступные ({unlockedLessonsCount - completedLessonsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-[#00d959] text-black font-semibold'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                Пройденные ({completedLessonsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('projects')}
                className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                  statusFilter === 'projects'
                    ? 'bg-[#ff791b] text-white'
                    : 'text-[#ff791b] hover:text-[#ff9245]'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Проекты (6)</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#000000] border border-[#262629] rounded-full text-xs font-medium">
              <button
                type="button"
                onClick={() => setViewMode('by_blocks')}
                className={`p-1.5 px-3 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'by_blocks'
                    ? 'bg-[#262629] text-[#f5f5f7]'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
                title="По блокам"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">По блокам</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all_grid')}
                className={`p-1.5 px-3 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'all_grid'
                    ? 'bg-[#262629] text-[#f5f5f7]'
                    : 'text-[#86868b] hover:text-[#f5f5f7]'
                }`}
                title="Сетка"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Сетка</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6 Block Filter Chips: Apple Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <button
            type="button"
            onClick={() => setSelectedBlockId('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedBlockId === 'all'
                ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                : 'bg-[#000000] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
            }`}
          >
            Все 6 блоков
          </button>
          {COURSE_BLOCKS.map((block) => {
            const isSelected = selectedBlockId === block.id;
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => setSelectedBlockId(block.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                    : 'bg-[#000000] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
                }`}
              >
                Блок {block.id} ({block.weeks})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lessons Content */}
      {viewMode === 'by_blocks' ? (
        <div className="space-y-8">
          {COURSE_BLOCKS.filter((block) => selectedBlockId === 'all' || selectedBlockId === block.id).map((block) => {
            const blockLessons = filteredLessons.filter((l: any) => l.blockId === block.id);
            if (blockLessons.length === 0 && (searchQuery || statusFilter !== 'all')) return null;

            const blockCompletedCount = lessons.filter((l: any) => l.blockId === block.id && l.isCompleted).length;

            return (
              <div key={block.id} className="space-y-4">
                {/* Block Section Header Banner */}
                <div className="p-5 rounded-[28px] bg-[#000000] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#86868b]">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1c1c1f] text-[#f5f5f7] border border-[#333336]">
                        БЛОК {block.id}
                      </span>
                      <span>{block.weeks} · {block.lessonRange}</span>
                      <span>·</span>
                      <span className="text-[#ff791b] flex items-center gap-1 font-medium">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Проект: Урок #{block.id * 4}</span>
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-[#f5f5f7] mt-0.5">
                      {block.titleRu}
                    </h2>

                    <p className="text-xs text-[#86868b] max-w-3xl leading-relaxed">
                      {block.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center bg-[#161618] px-3.5 py-1.5 rounded-full border border-[#262629]">
                    <span className="text-[11px] text-[#86868b]">Пройдено:</span>
                    <span className="text-xs font-semibold text-[#00d959] tabular-nums">
                      {blockCompletedCount} / 4 уроков
                    </span>
                  </div>
                </div>

                {/* Block Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                  {blockLessons.map((lesson: any) => renderLessonCard(lesson))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Flat Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLessons.map((lesson: any) => renderLessonCard(lesson))}
        </div>
      )}

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="p-12 rounded-[28px] bg-[#000000] border border-dashed border-[#262629] text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[#86868b] mx-auto" />
          <h4 className="text-sm font-semibold text-[#f5f5f7]">Уроки не найдены</h4>
          <p className="text-xs text-[#86868b] max-w-sm mx-auto">
            По запросу «{searchQuery}» уроков не найдено. Попробуйте сбросить фильтры.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedBlockId('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#f5f5f7] text-xs font-medium transition-colors cursor-pointer"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );

  // Lesson Card Component (Apple Midnight Stage)
  function renderLessonCard(lesson: any) {
    const unlocked = isLessonUnlocked(lesson.id);
    const isCompleted = Boolean(lesson.isCompleted);
    const totalDuration = (lesson.theoryDuration || 30) + (lesson.practiceDuration || 60);
    const isProjectLesson = projectLessonIds.includes(lesson.id);

    // Progress across the 4 sections
    const lessonItem = xpBreakdown?.lessonItems?.find((it: any) => it.lessonId === lesson.id);
    const sec1Done = Boolean(readSections[`sec-${lesson.id}-lecture`]);
    const sec2Done = Boolean(
      readSections[`sec-${lesson.id}-lab`] ||
        (lessonItem?.labXp && lessonItem.labXp > 0) ||
        labs?.some((lb: any) => lb.id === lesson.id && lb.isCompleted)
    );
    const sec3Done = Boolean(
      readSections[`sec-${lesson.id}-quiz`] ||
        readSections[`lesson-${lesson.id}-quiz`] ||
        readSections[`lesson-${lesson.id}-sec-3`] ||
        testScores[String(lesson.id)] !== undefined ||
        testScores[`lesson-${lesson.id}-test`] !== undefined ||
        testScores[`LESSON_${lesson.id}`] !== undefined ||
        quizSubmissions?.some(
          (q: any) =>
            q.quizId === String(lesson.id) ||
            q.quizId === `lesson-${lesson.id}-test` ||
            q.quizId === `LESSON_${lesson.id}`
        ) ||
        (lessonItem?.testXp && lessonItem.testXp > 0)
    );
    const sec4Done = Boolean(
      readSections[`sec-${lesson.id}-homework`] ||
        (lessonItem?.homeworkXp && lessonItem.homeworkXp > 0) ||
        homeworkSubmissions?.some(
          (h: any) => h.lessonId === lesson.id && (h.status === 'Approved' || h.status === 'Submitted')
        )
    );
    const doneCount = [sec1Done, sec2Done, sec3Done, sec4Done].filter(Boolean).length;
    const earnedXp = lessonItem?.totalLessonXp || 0;

    const sectionBadges = [
      { label: 'Лекция', done: sec1Done, secId: `sec-${lesson.id}-lecture` },
      { label: 'Лаба', done: sec2Done, secId: `sec-${lesson.id}-lab` },
      { label: 'Тест', done: sec3Done, secId: `sec-${lesson.id}-quiz` },
      { label: 'ДЗ', done: sec4Done, secId: `sec-${lesson.id}-homework` },
    ];

    const cleanTitle = getCleanTitle(lesson.titleRu, lesson.id);

    return (
      <div
        key={lesson.id}
        className={`p-5 rounded-[28px] border transition-colors flex flex-col justify-between space-y-4 group relative ${
          !unlocked
            ? 'bg-[#0a0a0b] border-[#1c1c1f] opacity-55'
            : isCompleted
            ? 'bg-[#161618] border-[#00d959]/30 hover:border-[#00d959]/50'
            : isProjectLesson
            ? 'bg-[#161618] border-[#ff791b]/30 hover:border-[#ff791b]/60'
            : 'bg-[#161618] border-white/[0.08] hover:border-white/[0.18]'
        }`}
      >
        <div className="space-y-3">
          {/* Top Unboxed Metadata Header */}
          <div className="flex items-center justify-between gap-2 border-b border-[#262629] pb-2.5">
            <div className="flex items-center gap-1.5 text-xs text-[#86868b] font-mono tabular-nums">
              <span className={`font-semibold ${isProjectLesson ? 'text-[#ff791b]' : 'text-[#f5f5f7]'}`}>
                УРОК #{lesson.id}
              </span>
              <span>·</span>
              <span>НЕД. {lesson.week}</span>
              <span>·</span>
              <span>~{totalDuration}м</span>
            </div>

            {/* Status Checkbox */}
            {unlocked ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLessonCompletion(lesson.id);
                }}
                className={`p-1 rounded-full border transition-colors cursor-pointer ${
                  isCompleted
                    ? 'bg-[#1c2e22] text-[#00d959] border-[#00d959]/40'
                    : 'bg-[#1c1c1f] text-[#86868b] hover:text-[#f5f5f7] border-[#333336]'
                }`}
                title={isCompleted ? 'Урок завершён' : 'Отметить как пройденный'}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[11px] text-[#6e6e73] flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#6e6e73]" /> Закрыт
              </span>
            )}
          </div>

          {/* Project Badge */}
          {isProjectLesson && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#ff791b] bg-[#311400] px-2.5 py-1 rounded-full font-medium">
              <Rocket className="w-3.5 h-3.5 text-[#ff791b] shrink-0" />
              <span>Курсовой проект блока {lesson.blockId}</span>
            </div>
          )}

          {/* Lesson Title & Subtitle */}
          <div className="space-y-1">
            <h3
              onClick={() => {
                if (unlocked) {
                  setSelectedLessonId(lesson.id);
                  setActivePage('lesson-detail');
                }
              }}
              className={`text-sm font-semibold transition-colors leading-snug ${
                unlocked
                  ? 'text-[#f5f5f7] group-hover:text-white cursor-pointer'
                  : 'text-[#86868b] cursor-not-allowed'
              }`}
            >
              {cleanTitle}
            </h3>
            {lesson.title && (
              <p className="text-[11px] text-[#86868b] font-mono truncate">{lesson.title}</p>
            )}
          </div>

          {/* Brief Summary */}
          {lesson.theorySummary && (
            <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
              {lesson.theorySummary}
            </p>
          )}

          {/* Tools Tags */}
          {lesson.tools && lesson.tools.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {lesson.tools.slice(0, 3).map((tool: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full bg-[#000000] border border-[#262629] text-[10px] font-mono text-[#86868b]"
                >
                  {tool}
                </span>
              ))}
              {lesson.tools.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] text-[#6e6e73] font-mono">
                  +{lesson.tools.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 4-Section Learning Path */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] tabular-nums">
              <span>Секции: {doneCount}/4</span>
              <span className={earnedXp > 0 ? 'text-[#00d959] font-medium' : 'text-[#86868b]'}>
                {earnedXp > 0 ? `+${earnedXp} EXP` : 'до 450 EXP'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {sectionBadges.map((sb) => (
                <button
                  key={sb.secId}
                  type="button"
                  disabled={!unlocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (unlocked) {
                      try {
                        sessionStorage.setItem(`devops_active_sec_${lesson.id}`, sb.secId);
                      } catch {}
                      setSelectedLessonId(lesson.id);
                      setActivePage('lesson-detail');
                    }
                  }}
                  className={`py-1 px-1 rounded-full text-[10px] font-medium flex items-center justify-center gap-0.5 border transition-colors cursor-pointer ${
                    sb.done
                      ? 'bg-[#1c2e22] text-[#00d959] border-[#00d959]/40'
                      : 'bg-[#000000] text-[#86868b] border-[#262629] hover:text-[#f5f5f7]'
                  } ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                  {sb.done && <Check className="w-2.5 h-2.5 text-[#00d959] shrink-0" />}
                  <span className="truncate">{sb.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Apple Pill Button */}
        <div className="pt-3 border-t border-[#262629] flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#00d959] font-semibold flex items-center gap-1 tabular-nums">
            <Award className="w-3.5 h-3.5" />
            <span>+150 EXP</span>
          </span>

          {unlocked ? (
            <button
              type="button"
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setActivePage('lesson-detail');
              }}
              className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{isCompleted ? 'Повторить' : 'Изучить'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-full bg-[#1c1c1f] text-[#6e6e73] text-xs font-medium flex items-center gap-1 cursor-not-allowed"
            >
              <Lock className="w-3 h-3 text-[#6e6e73]" />
              <span>Закрыт</span>
            </button>
          )}
        </div>
      </div>
    );
  }
};
