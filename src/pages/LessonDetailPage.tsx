import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS } from '../data/syllabusData';
import { getCustomLessonSections, LessonSection } from '../data/lessonSectionsData';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChevronRight,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Layers,
  Zap
} from 'lucide-react';

export const LessonDetailPage: React.FC = () => {
  const {
    selectedLessonId,
    setSelectedLessonId,
    lessons,
    setActivePage,
    setSelectedLabId,
    setSelectedQuizId,
    toggleLessonCompletion,
    profile,
    stats,
    isLessonUnlocked,
    readSections,
    markSectionRead: portalMarkSectionRead,
    setIsXpModalOpen,
    xpBreakdown,
    homeworkSubmissions,
  } = usePortal();

  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const block = COURSE_BLOCKS.find((b) => b.id === lesson.blockId);
  const unlocked = isLessonUnlocked(lesson.id);

  const currentEmail = (profile.email || '').toLowerCase().trim();
  const currentId = profile.id || '';
  const studentHw = (homeworkSubmissions || []).find(
    (h) =>
      Number(h.lessonId) === lesson.id &&
      (!h.studentEmail ||
        h.studentEmail.toLowerCase().trim() === currentEmail ||
        (currentId && h.studentId === currentId))
  );
  const isHwApprovedByMentor = studentHw?.status === 'Approved';
  const isHwSubmitted = studentHw?.status === 'Submitted';

  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem(`devops_active_sec_${lesson.id}`);
      if (saved) return saved;
    } catch {}
    return `sec-${lesson.id}-lecture`;
  });

  const markSectionRead = (sectionId: string, _expReward?: number) => {
    portalMarkSectionRead(sectionId, lesson.id);
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSectionId(sectionId);
    try {
      sessionStorage.setItem(`devops_active_sec_${lesson.id}`, sectionId);
    } catch {}
    setTimeout(() => {
      const el = document.getElementById('lesson-sections-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const sectionsToRender: LessonSection[] = getCustomLessonSections(lesson, {
    setSelectedLabId,
    setSelectedQuizId,
    setActivePage
  });

  // Exact dynamic EXP calculation for current lesson from unified engine
  const currentLessonXpItem = xpBreakdown?.lessonItems?.find((it) => it.lessonId === lesson.id);
  const labXp = currentLessonXpItem?.labXp || 0;
  const testXp = currentLessonXpItem?.testXp || 0;
  const homeworkXp = currentLessonXpItem?.homeworkXp || 0;
  const lessonBonusXp = currentLessonXpItem?.lessonBonusXp || 0;

  const isLectureRead = Boolean(
    lesson.isCompleted ||
      readSections[`sec-${lesson.id}-lecture`] ||
      readSections[`lesson-${lesson.id}-lecture`] ||
      readSections[`lesson-${lesson.id}-sec-1`]
  );
  const isLabRead = Boolean(
    lesson.isCompleted ||
      readSections[`sec-${lesson.id}-lab`] ||
      readSections[`lesson-${lesson.id}-lab`] ||
      readSections[`lesson-${lesson.id}-sec-2`] ||
      labXp > 0
  );
  const isQuizRead = Boolean(
    lesson.isCompleted ||
      readSections[`sec-${lesson.id}-quiz`] ||
      readSections[`lesson-${lesson.id}-quiz`] ||
      readSections[`lesson-${lesson.id}-sec-3`] ||
      readSections[`${lesson.id}-quiz`] ||
      testXp > 0
  );
  const isHwRead = Boolean(
    lesson.isCompleted ||
      readSections[`sec-${lesson.id}-homework`] ||
      readSections[`lesson-${lesson.id}-homework`] ||
      readSections[`lesson-${lesson.id}-sec-4`] ||
      homeworkXp > 0
  );

  const isSectionCompleted = (secId: string) => {
    if (secId.includes('lecture')) return isLectureRead;
    if (secId.includes('lab')) return isLabRead;
    if (secId.includes('quiz')) return isQuizRead;
    if (secId.includes('homework')) return isHwRead;
    return Boolean(readSections[secId]);
  };

  const completedSectionsCount = sectionsToRender.filter((s) => isSectionCompleted(s.id)).length;
  const progressPct = sectionsToRender.length > 0 ? Math.round((completedSectionsCount / sectionsToRender.length) * 100) : 0;

  const lectureXp = isLectureRead ? 25 : 0;
  const computedLocalLessonXp =
    (isLectureRead ? 25 : 0) +
    (isLabRead ? 25 : 0) +
    (isQuizRead ? 25 : 0) +
    (isHwRead ? 25 : 0) +
    labXp +
    testXp +
    homeworkXp +
    lessonBonusXp;
  const totalLessonXp = currentLessonXpItem ? currentLessonXpItem.totalLessonXp : computedLocalLessonXp;

  useEffect(() => {
    if (sectionsToRender && sectionsToRender.length > 0) {
      try {
        const saved = sessionStorage.getItem(`devops_active_sec_${lesson.id}`);
        if (saved && sectionsToRender.some((s) => s.id === saved)) {
          setActiveSectionId(saved);
          return;
        }
      } catch {}
      setActiveSectionId(sectionsToRender[0].id);
    }
  }, [lesson.id]);

  if (!unlocked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Урок #{lesson.id} Заблокирован</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          Чтобы получить доступ к этому уроку, пройдите предыдущий материал и отправьте практическое задание или тест на проверку ментору.
        </p>
        <button
          onClick={() => setActivePage('lessons')}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться к списку уроков
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-content-reader w-full space-y-4 sm:space-y-6 animate-in fade-in duration-300 px-0 sm:px-2 md:px-4">
      {/* Top Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setActivePage('lessons')}
          className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-300 hover:text-white transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Назад к списку уроков</span>
          <span className="sm:hidden">К урокам</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              if (profile.role !== 'admin' && !isHwApprovedByMentor && !isHwSubmitted) {
                const hwSec = sectionsToRender.find((s) => s.id.includes('homework'));
                if (hwSec) handleSectionChange(hwSec.id);
              }
              toggleLessonCompletion(lesson.id);
            }}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold border flex items-center gap-2 transition-all ${
              isHwApprovedByMentor || (profile.role === 'admin' && lesson.isCompleted)
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60 shadow-md shadow-emerald-950/40'
                : isHwSubmitted
                ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 shrink-0 ${
                isHwApprovedByMentor ? 'text-emerald-400' : isHwSubmitted ? 'text-amber-400' : 'text-slate-400'
              }`}
            />
            <span>
              {isHwApprovedByMentor
                ? 'ДЗ подтверждено Ментором • Урок Пройден'
                : isHwSubmitted
                ? 'ДЗ на проверке у Ментора'
                : profile.role === 'admin'
                ? lesson.isCompleted
                  ? 'Урок Пройден'
                  : 'Отметить пройденным'
                : 'Сдать ДЗ для открытия след. урока'}
            </span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Header */}
      <div className="p-3.5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-3 sm:space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono font-bold text-xs sm:text-sm">
            УРОК #{lesson.id} • НЕДЕЛЯ {lesson.week}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm">
            {block?.titleRu || 'AI for LIFE'}
          </span>
          <span className="text-slate-200 flex items-center gap-1.5 sm:ml-auto text-xs sm:text-sm font-medium">
            <Clock className="w-4 h-4 text-cyan-400" /> 90 мин ({lesson.theoryDuration}м теор + {lesson.practiceDuration}м практ)
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">{lesson.titleRu}</h1>
        <p className="text-slate-300 text-sm sm:text-base font-mono">{lesson.title}</p>

        {/* Lesson Reading Progress & EXP tracker */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="text-slate-200 font-bold">Прогресс изучения:</span>
              <span className="text-cyan-400 font-mono font-bold">{completedSectionsCount} / {sectionsToRender.length} ({progressPct}%)</span>
            </div>
            <div className="w-full sm:w-56 h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-800/40 text-amber-300 text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer"
              title="Открыть детализацию начисления EXP"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
              <span>Ваш баланс: {stats.totalPoints || profile.totalPoints || 0} EXP</span>
              <span className="text-xs text-amber-400/90 underline ml-1">Расчёт EXP</span>
            </button>
          </div>
        </div>

        {/* 4-Section EXP Calculation Breakdown Grid */}
        <div className="pt-3 border-t border-slate-800/60 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="font-bold text-slate-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Начисление EXP по 4 разделам Урока #{lesson.id}:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-emerald-400 font-black text-xs sm:text-sm bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                Заработано: +{totalLessonXp} / 450 EXP
              </span>
              {lessonBonusXp > 0 ? (
                <span className="text-xs font-mono text-amber-300 bg-amber-950/80 border border-amber-800/60 px-2.5 py-1 rounded-md font-bold">
                  ✓ Бонус +50 EXP
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                  Бонус: +0 / 50 EXP
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-sm">
            {/* 1. Лекция урока */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-lecture`)}
              className={`p-3 rounded-2xl border space-y-1 transition-all cursor-pointer ${
                isLectureRead ? 'bg-cyan-950/40 border-cyan-500/50 shadow-xs' : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 font-mono">1. ЛЕКЦИЯ УРОКА</span>
                <span className="text-sm font-black font-mono text-white">
                  +{lectureXp} / 25 EXP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                +25 EXP за каждую изученную секцию урока.
              </p>
              <div className="text-xs text-slate-400 pt-0.5 flex items-center gap-1">
                {isLectureRead ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Секция изучена
                  </span>
                ) : (
                  <span className="text-slate-400">• Не изучено (+0 EXP)</span>
                )}
              </div>
            </div>

            {/* 2. Лабораторная работа */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-lab`)}
              className={`p-3 rounded-2xl border space-y-1 transition-all cursor-pointer ${
                labXp > 0 || isLabRead ? 'bg-emerald-950/40 border-emerald-500/50 shadow-xs' : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">2. ЛАБОРАТОРНАЯ</span>
                <span className="text-sm font-black font-mono text-white">
                  +{(isLabRead ? 25 : 0) + labXp} / 125 EXP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                +100 EXP за принятую лабу (100 / 75 / 50 EXP).
              </p>
              <div className="text-xs text-slate-300 pt-0.5 flex items-center justify-between">
                <span>Секция: +{isLabRead ? 25 : 0} EXP</span>
                <span className={labXp > 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  Лаба: +{labXp} EXP
                </span>
              </div>
            </div>

            {/* 3. Проверка знаний и тесты */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-quiz`)}
              className={`p-3 rounded-2xl border space-y-1 transition-all cursor-pointer ${
                testXp > 0 || isQuizRead ? 'bg-purple-950/40 border-purple-500/50 shadow-xs' : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 font-mono">3. ТЕСТЫ & ПРОВЕРКА</span>
                <span className="text-sm font-black font-mono text-white">
                  +{(isQuizRead ? 25 : 0) + testXp} / 125 EXP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                +100 EXP (10/10), +75 EXP (1–3 ош.), +50 EXP (4 ош.).
              </p>
              <div className="text-xs text-slate-300 pt-0.5 flex items-center justify-between">
                <span>Секция: +{isQuizRead ? 25 : 0} EXP</span>
                <span className={testXp > 0 ? 'text-purple-300 font-bold' : 'text-slate-400'}>
                  Тест: +{testXp} EXP
                </span>
              </div>
            </div>

            {/* 4. Домашнее задание */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-homework`)}
              className={`p-3 rounded-2xl border space-y-1 transition-all cursor-pointer ${
                homeworkXp > 0 || isHwRead ? 'bg-amber-950/40 border-amber-500/50 shadow-xs' : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">4. ДОМАШНЕЕ ЗАДАНИЕ</span>
                <span className="text-sm font-black font-mono text-white">
                  +{(isHwRead ? 25 : 0) + homeworkXp} / 125 EXP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                +100 EXP за принятое ДЗ (100 / 75 / 50 EXP).
              </p>
              <div className="text-xs text-slate-300 pt-0.5 flex items-center justify-between">
                <span>Секция: +{isHwRead ? 25 : 0} EXP</span>
                <span className={homeworkXp > 0 ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                  ДЗ: +{homeworkXp} EXP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout — Frameless on mobile so sections have full width */}
      <div className="space-y-4 sm:space-y-6">
        <div
          id="lesson-sections-container"
          className="p-0 sm:p-6 md:p-8 rounded-none sm:rounded-3xl bg-transparent sm:bg-slate-900/90 border-0 sm:border sm:border-slate-800 space-y-4 sm:space-y-6 shadow-none sm:shadow-2xl"
        >
          {/* Section Switcher Header Card */}
          <div className="p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-slate-900/90 sm:bg-transparent border border-slate-800 sm:border-0 space-y-3.5 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" /> Интерактивный учебный материал урока
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-1">
                  Переключайте разделы ниже и получайте +25 EXP за каждый изученный блок
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-3.5 py-1.5 rounded-full w-fit">
                Раздел {sectionsToRender.findIndex((s) => s.id === activeSectionId) + 1} из {sectionsToRender.length}
              </span>
            </div>

            {/* Mobile-optimized Section Switcher Dropdown */}
            <div className="block md:hidden space-y-1.5">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Быстрый выбор раздела урока:</span>
              </label>
              <select
                value={activeSectionId}
                onChange={(e) => handleSectionChange(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {sectionsToRender.map((sec, idx) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.title} {isSectionCompleted(sec.id) ? '✓ (Изучено)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Tabs / Navigation Buttons (2x2 grid on mobile, flex on desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
              {sectionsToRender.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className={`px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeSectionId === sec.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-300/50'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {isSectionCompleted(sec.id) ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 text-slate-200 text-xs sm:text-sm flex items-center justify-center font-mono shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className="truncate">{sec.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Content — No outer frame on mobile! */}
          {sectionsToRender.map((sec, currentSecIndex) => {
            const isCurrent = sec.id === activeSectionId;
            const isRead = isSectionCompleted(sec.id);

            return (
              <div
                key={sec.id}
                className={`space-y-4 sm:space-y-6 transition-all ${
                  isCurrent ? 'block' : 'hidden'
                }`}
              >
                {/* Section Header & Mark Read Banner */}
                <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/95 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">{sec.title}</h3>
                      <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed">{sec.subtitle}</p>
                    </div>

                    <button
                      onClick={() => markSectionRead(sec.id, sec.exp)}
                      disabled={isRead}
                      className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all shrink-0 w-full sm:w-fit ${
                        isRead
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95'
                      }`}
                    >
                      {isRead ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>Изучено (+{sec.exp} EXP)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 shrink-0" />
                          <span>Отметить изученным (+{sec.exp} EXP)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Active Section Dedicated EXP Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 shrink-0 mt-0.5 sm:mt-0">
                        <Zap className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="font-bold text-slate-100 block text-sm sm:text-base">
                          {sec.id.includes('lecture') && '1. Лекция урока: +25 EXP за изучение секции'}
                          {sec.id.includes('lab') && '2. Лабораторная работа: +25 EXP за секцию + до 100 EXP за лабу'}
                          {sec.id.includes('quiz') && '3. Проверка знаний и тесты: +25 EXP за секцию + до 100 EXP за тест'}
                          {sec.id.includes('homework') && '4. Домашнее задание: +25 EXP за секцию + до 100 EXP за принятое ДЗ'}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                          {sec.id.includes('lecture') && 'Изучите теоретический материал урока. Завершение всех 4 секций начисляет бонус +50 EXP.'}
                          {sec.id.includes('lab') && 'Выполните лабораторную практику, прикрепите отчет и отправьте ментору.'}
                          {sec.id.includes('quiz') && 'Ответьте на вопросы теста урока. Ошибки снижают награду: 100 / 75 / 50 EXP.'}
                          {sec.id.includes('homework') && 'Сдайте проектное ДЗ ментору. За принятое задание начисляется до 100 EXP.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold text-xs sm:text-sm shrink-0">
                      {sec.id.includes('lecture') && (
                        <span className={isLectureRead ? 'text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/60' : 'text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800'}>
                          {isLectureRead ? '+25 / 25 EXP ✓' : '+0 / 25 EXP'}
                        </span>
                      )}
                      {sec.id.includes('lab') && (
                        <span className={labXp > 0 || isLabRead ? 'text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/60' : 'text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800'}>
                          +{(isLabRead ? 25 : 0) + labXp} / 125 EXP
                        </span>
                      )}
                      {sec.id.includes('quiz') && (
                        <span className={testXp > 0 || isQuizRead ? 'text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-800/60' : 'text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800'}>
                          +{(isQuizRead ? 25 : 0) + testXp} / 125 EXP
                        </span>
                      )}
                      {sec.id.includes('homework') && (
                        <span className={homeworkXp > 0 || isHwRead ? 'text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-800/60' : 'text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800'}>
                          +{(isHwRead ? 25 : 0) + homeworkXp} / 125 EXP
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actual Section Content — Full width on mobile, larger readable text */}
                <div className="lesson-content-reader text-base sm:text-lg text-slate-100 leading-relaxed w-full">
                  {sec.content}
                </div>

                {/* In-Section Switching Navigation Bar */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    disabled={currentSecIndex <= 0}
                    onClick={() => {
                      if (currentSecIndex > 0) {
                        handleSectionChange(sectionsToRender[currentSecIndex - 1].id);
                      }
                    }}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-100 text-sm sm:text-base font-bold flex items-center gap-2 transition-all border border-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Предыдущий Раздел</span>
                  </button>

                  <span className="text-sm sm:text-base text-slate-300 font-mono font-bold">
                    Раздел {currentSecIndex + 1} из {sectionsToRender.length}
                  </span>

                  {currentSecIndex < sectionsToRender.length - 1 ? (
                    <button
                      onClick={() => {
                        handleSectionChange(sectionsToRender[currentSecIndex + 1].id);
                      }}
                      className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm sm:text-base font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20"
                    >
                      <span>Следующий Раздел</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleLessonCompletion(lesson.id)}
                      className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base font-bold flex items-center gap-2 transition-all shadow-md ${
                        isHwApprovedByMentor
                          ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                          : isHwSubmitted
                          ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                          : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        {isHwApprovedByMentor
                          ? `Урок #${lesson.id} Пройден (ДЗ подтверждено)`
                          : isHwSubmitted
                          ? `ДЗ на проверке у Ментора (Урок #${Math.min(24, lesson.id + 1)})`
                          : `Завершить Урок #${lesson.id}`}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Toolbar: Prev Lesson | Section Switcher | Next Lesson */}
        <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {lesson.id > 1 ? (
            <button
              onClick={() => {
                setSelectedLessonId(lesson.id - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all border border-slate-700 shadow-md shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Предыдущий Урок #{lesson.id - 1}</span>
            </button>
          ) : (
            <div className="hidden md:block" />
          )}

          {/* Section Switcher Toolbar */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-sm font-bold text-cyan-400 px-1 flex items-center gap-1.5 shrink-0">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Разделы урока:</span>
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
              {sectionsToRender.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSectionId(sec.id);
                    const elem = document.getElementById('lesson-sections-container');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeSectionId === sec.id
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 ring-1 ring-cyan-400/40'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {isSectionCompleted(sec.id) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-slate-300 text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                  )}
                  <span>Раздел {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {lesson.id < lessons.length ? (
            isLessonUnlocked(lesson.id + 1) ? (
              <button
                onClick={() => {
                  setSelectedLessonId(lesson.id + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/30 shrink-0"
              >
                <span>Следующий Урок #{lesson.id + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled
                title="Следующий урок откроется автоматически после подтверждения ДЗ ментором"
                className="w-full md:w-auto px-5 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 cursor-not-allowed opacity-80 shrink-0"
              >
                <span>
                  Урок #{lesson.id + 1} Заблокирован (после подтверждения ДЗ)
                </span>
              </button>
            )
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </div>
    </div>
  );
};
