import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS, INITIAL_LESSONS } from '../data/syllabusData';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Play,
  Clock,
  ChevronRight,
  Filter,
  Check,
  FileText,
  Lock,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  X,
  LayoutGrid,
  ListFilter,
  Code2,
  Terminal,
  Zap,
  FolderGit2,
  Rocket,
  Star,
  TrendingUp,
  Compass,
  Laptop,
  CheckCircle
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

  // Next recommended lesson (first unlocked lesson that is not yet completed)
  const nextUpLesson = useMemo(() => {
    return lessons.find((l: any) => isLessonUnlocked(l.id) && !l.isCompleted) || lessons[0];
  }, [lessons, isLessonUnlocked]);

  // Block theme color styling helper
  const getBlockStyle = (blockId: number) => {
    switch (blockId) {
      case 1:
        return {
          badge: 'bg-cyan-950/80 border-cyan-800/60 text-cyan-300',
          accent: 'text-cyan-400',
          glow: 'from-cyan-950/30 to-slate-900/40',
          border: 'border-cyan-500/30',
          dot: 'bg-cyan-400',
        };
      case 2:
        return {
          badge: 'bg-emerald-950/80 border-emerald-800/60 text-emerald-300',
          accent: 'text-emerald-400',
          glow: 'from-emerald-950/30 to-slate-900/40',
          border: 'border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 3:
        return {
          badge: 'bg-amber-950/80 border-amber-800/60 text-amber-300',
          accent: 'text-amber-400',
          glow: 'from-amber-950/30 to-slate-900/40',
          border: 'border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 4:
        return {
          badge: 'bg-purple-950/80 border-purple-800/60 text-purple-300',
          accent: 'text-purple-400',
          glow: 'from-purple-950/30 to-slate-900/40',
          border: 'border-purple-500/30',
          dot: 'bg-purple-400',
        };
      case 5:
        return {
          badge: 'bg-rose-950/80 border-rose-800/60 text-rose-300',
          accent: 'text-rose-400',
          glow: 'from-rose-950/30 to-slate-900/40',
          border: 'border-rose-500/30',
          dot: 'bg-rose-400',
        };
      case 6:
      default:
        return {
          badge: 'bg-indigo-950/80 border-indigo-800/60 text-indigo-300',
          accent: 'text-indigo-400',
          glow: 'from-indigo-950/30 to-slate-900/40',
          border: 'border-indigo-500/30',
          dot: 'bg-indigo-400',
        };
    }
  };

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson: any) => {
      const matchesBlock = selectedBlockId === 'all' || lesson.blockId === selectedBlockId;
      const isUnlocked = isLessonUnlocked(lesson.id);
      const isProject = projectLessonIds.includes(lesson.id);

      let matchesStatus = true;
      if (statusFilter === 'completed') matchesStatus = Boolean(lesson.isCompleted);
      if (statusFilter === 'unlocked') matchesStatus = isUnlocked && !lesson.isCompleted;
      if (statusFilter === 'projects') matchesStatus = isProject;
      if (statusFilter === 'locked') matchesStatus = !isUnlocked;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (lesson.titleRu || '').toLowerCase().includes(q) ||
        (lesson.title || '').toLowerCase().includes(q) ||
        (lesson.theorySummary || '').toLowerCase().includes(q) ||
        (lesson.tools || []).some((t: string) => t.toLowerCase().includes(q)) ||
        `урок ${lesson.id}`.includes(q) ||
        `#${lesson.id}`.includes(q);

      return matchesBlock && matchesStatus && matchesSearch;
    });
  }, [lessons, selectedBlockId, statusFilter, searchQuery, isLessonUnlocked, projectLessonIds]);

  // Clean title helper (strips repetitive "Урок X: " prefix for cleaner header display)
  const getCleanTitle = (titleRu?: string, id?: number) => {
    if (!titleRu) return `Урок #${id}`;
    return titleRu.replace(/^Урок\s*\d+\s*:\s*/i, '').trim();
  };

  return (
    <div className="lessons-page-reader space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Pro Hero Bar with Bento Metrics */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 border border-slate-800/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono font-bold">
                AI for LIFE Academy
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-300 font-semibold">Vibe Coding & Agentic AI</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-mono">24 Инженерных Урока</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              </span>
              <span>Программа Уроков Курса</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Практический маршрут от промпт-инжиниринга и генеративного контента до Cursor IDE,
              полноценных веб-приложений, n8n-автоматизаций и защиты выпускного Capstone-продукта на Demo Day.
            </p>

            {/* Quick Continue Lesson Bar */}
            {nextUpLesson && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLessonId(nextUpLesson.id);
                    setActivePage('lesson-detail');
                  }}
                  className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-xs text-white transition-all shadow-md shadow-cyan-950/30"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                  </span>
                  <span className="text-slate-400 font-medium">Продолжить обучение:</span>
                  <span className="font-bold text-cyan-300 group-hover:text-cyan-200">
                    Урок #{nextUpLesson.id} «{getCleanTitle(nextUpLesson.titleRu, nextUpLesson.id)}»
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Bento */}
          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-3 shrink-0">
            {/* Progress Card */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/90 min-w-[210px] space-y-2.5 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Общий прогресс:</span>
                </span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{progressPct}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-300 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/50"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                <span>Пройдено: <strong className="text-white font-bold">{completedLessonsCount}</strong>/24</span>
                <span>Открыто: <strong className="text-cyan-400 font-bold">{unlockedLessonsCount}</strong>/24</span>
              </div>
            </div>

            {/* EXP & Rating Card */}
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/40 via-slate-950 to-slate-950 hover:from-amber-950/60 border border-amber-500/30 text-amber-300 transition-all flex flex-col justify-between cursor-pointer group shadow-lg shadow-amber-950/20 text-left min-w-[170px]"
              title="Открыть подробные правила начисления EXP"
            >
              <div className="flex items-center justify-between gap-1 text-xs font-bold text-amber-400">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span>EXP Баланс</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono group-hover:text-amber-200">Детали →</span>
              </div>
              <div className="text-xl font-black font-mono text-white my-1">
                {xpBreakdown?.totalXp || profile?.points || 0} <span className="text-xs text-amber-400 font-normal">EXP</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                <Award className="w-3 h-3 text-amber-400" />
                <span>+150 EXP за каждый урок</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 24 Lessons Interactive Visual Roadmap Ribbon (Grouped into 6 Blocks) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
            <h3 className="text-sm font-extrabold text-white">Интерактивная лента 24 уроков:</h3>
            <span className="text-xs text-slate-400 hidden md:inline font-mono">(6 тематических блоков)</span>
          </div>
          <div className="text-xs text-slate-400 font-mono flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Пройден
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Доступен
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-600 inline-block" /> Заблокирован
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <Rocket className="w-3 h-3 text-purple-400 inline-block" /> Проект Блока
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
                title={`Урок #${l.id}: ${l.titleRu}${isProject ? ' • Курсовой Проект Блока' : ''}${!unlocked ? ' (Заблокирован)' : isCompleted ? ' (Пройден)' : ' (Доступен)'}`}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all border relative group ${
                  !unlocked
                    ? 'bg-slate-950/60 text-slate-600 border-slate-800/80 cursor-not-allowed opacity-60'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60 shadow-sm shadow-emerald-950/30'
                    : isNext
                    ? 'bg-gradient-to-b from-cyan-950 to-blue-950 text-cyan-200 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400 hover:-translate-y-0.5'
                    : 'bg-cyan-950/80 text-cyan-200 border-cyan-500/50 hover:bg-cyan-900/80 shadow-md shadow-cyan-950/40 hover:-translate-y-0.5'
                }`}
              >
                {/* Milestone Project Star Icon */}
                {isProject && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[8px] shadow-sm shadow-purple-600"
                    title="Курсовой Проект Блока"
                  >
                    🚀
                  </span>
                )}

                <span className="text-[11px]">#{l.id}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                ) : !unlocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-current mt-0.5 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="space-y-3.5 p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по урокам, технологиям (Cursor, n8n, Vercel, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status & View Mode Switches */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Все ({lessons.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('unlocked')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === 'unlocked'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Доступные ({unlockedLessonsCount - completedLessonsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === 'completed'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Пройденные ({completedLessonsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('projects')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  statusFilter === 'projects'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-purple-400 hover:text-purple-300'
                }`}
                title="6 уроков с курсовыми проектами блоков"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Проекты (6)</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('by_blocks')}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'by_blocks'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Группировать по 6 Блокам программы"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">По Блокам</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all_grid')}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'all_grid'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Показать все 24 урока одной сеткой"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Сетка</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6 Block Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setSelectedBlockId('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 border ${
              selectedBlockId === 'all'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            Все 6 Блоков (24)
          </button>
          {COURSE_BLOCKS.map((block) => {
            const isSelected = selectedBlockId === block.id;
            const bStyle = getBlockStyle(block.id);
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => setSelectedBlockId(block.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 border flex items-center gap-1.5 ${
                  isSelected
                    ? `${bStyle.badge} shadow-md`
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="font-mono text-[11px] font-bold">Блок {block.id}:</span>
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {block.titleRu.split(':')[1]?.split('(')[0]?.trim() || block.titleRu}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson List Rendering: Grouped by Blocks OR Full Grid */}
      {viewMode === 'by_blocks' && selectedBlockId === 'all' ? (
        /* Grouped by 6 Blocks */
        <div className="space-y-10">
          {COURSE_BLOCKS.map((block) => {
            const blockLessons = filteredLessons.filter((l: any) => l.blockId === block.id);
            if (blockLessons.length === 0) return null;

            const bStyle = getBlockStyle(block.id);
            const blockCompletedCount = blockLessons.filter((l: any) => l.isCompleted).length;

            return (
              <div key={block.id} className="space-y-4">
                {/* Block Section Header Banner */}
                <div className={`p-5 rounded-3xl bg-gradient-to-r ${bStyle.glow} border ${bStyle.border} shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-bold border ${bStyle.badge}`}>
                        БЛОК {block.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {block.weeks} • {block.lessonRange}
                      </span>
                      <span className="text-xs text-purple-300 font-semibold flex items-center gap-1">
                        <Rocket className="w-3.5 h-3.5 text-purple-400" />
                        <span>Курсовой проект: Урок #{block.id * 4}</span>
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                      {block.titleRu}
                    </h2>

                    <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                      {block.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center bg-slate-950/70 px-4 py-2 rounded-2xl border border-slate-800">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 font-mono">Пройдено в блоке:</div>
                      <div className="text-sm font-extrabold text-white font-mono">
                        <span className={bStyle.accent}>{blockCompletedCount}</span> / {blockLessons.length} уроков
                      </div>
                    </div>
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
        <div className="p-12 rounded-3xl bg-slate-900/60 border border-dashed border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-white">Уроки не найдены</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            По запросу «{searchQuery}» уроков не найдено. Попробуйте сбросить фильтры или изменить поисковый запрос.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedBlockId('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );

  // Pro Lesson Card Component
  function renderLessonCard(lesson: any) {
    const unlocked = isLessonUnlocked(lesson.id);
    const isCompleted = Boolean(lesson.isCompleted);
    const totalDuration = (lesson.theoryDuration || 30) + (lesson.practiceDuration || 60);
    const isProjectLesson = projectLessonIds.includes(lesson.id);
    const bStyle = getBlockStyle(lesson.blockId);

    // Progress across the 4 sections of this lesson
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
      { label: '1. Лекция', done: sec1Done, secId: `sec-${lesson.id}-lecture`, icon: BookOpen },
      { label: '2. Лаба', done: sec2Done, secId: `sec-${lesson.id}-lab`, icon: Terminal },
      { label: '3. Тест', done: sec3Done, secId: `sec-${lesson.id}-quiz`, icon: Zap },
      { label: '4. ДЗ', done: sec4Done, secId: `sec-${lesson.id}-homework`, icon: FileText },
    ];

    const cleanTitle = getCleanTitle(lesson.titleRu, lesson.id);

    return (
      <div
        key={lesson.id}
        className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 group relative ${
          !unlocked
            ? 'bg-slate-950/70 border-slate-800/80 opacity-70'
            : isCompleted
            ? 'bg-slate-900/95 border-emerald-500/40 hover:border-emerald-400/60 shadow-xl shadow-emerald-950/10'
            : isProjectLesson
            ? 'bg-gradient-to-b from-slate-900/95 via-slate-900 to-purple-950/30 border-purple-500/40 hover:border-purple-400/70 shadow-xl shadow-purple-950/20 hover:-translate-y-0.5'
            : 'bg-slate-900/95 border-slate-800 hover:border-cyan-500/50 shadow-xl shadow-slate-950/40 hover:-translate-y-0.5'
        }`}
      >
        <div className="space-y-3.5">
          {/* Top Unboxed Metadata Header (Zero-Pill Discipline) */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span className={`font-bold ${isProjectLesson ? 'text-purple-300' : 'text-slate-300'}`}>
                УРОК #{lesson.id}
              </span>
              <span aria-hidden="true">·</span>
              <span>НЕД. {lesson.week}</span>
              <span aria-hidden="true">·</span>
              <span>~{totalDuration}м</span>
            </div>

            {/* Status indicator */}
            {unlocked ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLessonCompletion(lesson.id);
                  }}
                  className={`p-1 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700/60'
                      : 'bg-slate-800 text-slate-500 hover:text-slate-300 border-slate-700'
                  }`}
                  title={isCompleted ? 'Урок пройден ✓' : 'Отметить как пройденный'}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" /> Закрыт
              </span>
            )}
          </div>

          {/* Special Milestone Project Banner Badge if Milestone Lesson */}
          {isProjectLesson && (
            <div className="flex items-center gap-1.5 text-[11px] text-purple-300 bg-purple-950/50 border border-purple-500/30 px-2.5 py-1 rounded-xl font-medium">
              <Rocket className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Курсовой Проект Блока {lesson.blockId} (GitHub + Vercel LIVE)</span>
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
              className={`text-base font-extrabold transition-colors leading-snug ${
                unlocked
                  ? 'text-white group-hover:text-cyan-300 cursor-pointer'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              {cleanTitle}
            </h3>
            {lesson.title && (
              <p className="text-xs text-slate-400 font-mono truncate">{lesson.title}</p>
            )}
          </div>

          {/* Brief Summary */}
          {lesson.theorySummary && (
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
              {lesson.theorySummary}
            </p>
          )}

          {/* Tools & Stack Tags */}
          {lesson.tools && lesson.tools.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {lesson.tools.slice(0, 3).map((tool: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                >
                  {tool}
                </span>
              ))}
              {lesson.tools.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] text-slate-500 font-mono">
                  +{lesson.tools.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 4-Section Interactive Learning Path Strip */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Секции: {doneCount}/4</span>
              </span>
              <span className={earnedXp > 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
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
                  className={`py-1 px-1 rounded-lg text-[10px] font-bold flex items-center justify-center gap-0.5 border transition-all ${
                    sb.done
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                      : 'bg-slate-950/70 text-slate-400 border-slate-800/80 hover:text-slate-200'
                  } ${unlocked ? 'cursor-pointer hover:border-cyan-500/40' : 'cursor-not-allowed opacity-60'}`}
                  title={`${sb.label}: ${sb.done ? 'Выполнено ✓' : 'Не пройдено'}`}
                >
                  {sb.done && <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />}
                  <span className="truncate">{sb.label.replace(/^\d+\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer & Action CTA */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono text-amber-300/90 font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>+150 EXP</span>
          </span>

          {unlocked ? (
            <button
              type="button"
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setActivePage('lesson-detail');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-600/20 cursor-pointer group-hover:shadow-cyan-500/30"
            >
              <span>{isCompleted ? 'Повторить' : 'Изучить'}</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-xs font-medium flex items-center gap-1 cursor-not-allowed"
              title="Сдайте ДЗ к предыдущему уроку, чтобы разблокировать этот урок"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Заблокирован</span>
            </button>
          )}
        </div>
      </div>
    );
  }
};
