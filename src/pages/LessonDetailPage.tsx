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

  // Exact dynamic EXP calculation for current lesson
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
    (profile.role !== 'admin' && lesson.isCompleted) ||
      readSections[`sec-${lesson.id}-lab`] ||
      readSections[`lesson-${lesson.id}-lab`] ||
      readSections[`lesson-${lesson.id}-sec-2`] ||
      labXp > 0
  );
  const isQuizRead = Boolean(
    (profile.role !== 'admin' && lesson.isCompleted) ||
      readSections[`sec-${lesson.id}-quiz`] ||
      readSections[`lesson-${lesson.id}-quiz`] ||
      readSections[`lesson-${lesson.id}-sec-3`] ||
      testXp > 0
  );
  const isHwRead = Boolean(
    (profile.role !== 'admin' && lesson.isCompleted) ||
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
    return Boolean(readSections[secId] || lesson.isCompleted);
  };

  const completedSectionsCount = sectionsToRender.filter((sec) => isSectionCompleted(sec.id)).length;
  const progressPct = Math.round((completedSectionsCount / (sectionsToRender.length || 1)) * 100);

  const lectureXp = isLectureRead ? 25 : 0;
  const totalLessonXp = lectureXp + labXp + testXp + homeworkXp + lessonBonusXp;

  return (
    <div className="space-y-6 lesson-content-reader max-w-6xl mx-auto text-[#f5f5f7]">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#262629]">
        <button
          onClick={() => setActivePage('lessons')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] border border-[#333336] text-xs font-medium transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>К списку уроков</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (profile.role === 'admin') {
                toggleLessonCompletion(lesson.id);
              }
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border flex items-center gap-2 transition-colors ${
              isHwApprovedByMentor
                ? 'bg-[#1c2e22] text-[#00d959] border-[#00d959]/40'
                : isHwSubmitted
                ? 'bg-[#311400] text-[#ff791b] border-[#ff791b]/40'
                : 'bg-[#1c1c1f] text-[#86868b] border-[#333336]'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 shrink-0 ${
                isHwApprovedByMentor ? 'text-[#00d959]' : isHwSubmitted ? 'text-[#ff791b]' : 'text-[#86868b]'
              }`}
            />
            <span>
              {isHwApprovedByMentor
                ? 'ДЗ зачтено ментором · Урок пройден'
                : isHwSubmitted
                ? 'ДЗ на проверке ментора'
                : profile.role === 'admin'
                ? lesson.isCompleted
                  ? 'Урок пройден'
                  : 'Отметить пройденным'
                : 'Сдайте ДЗ для открытия след. урока'}
            </span>
          </button>
        </div>
      </div>

      {/* Lesson Hero Header: Absolute Black Exhibition Stage */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] space-y-4 text-[#f5f5f7]">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-[#1c1c1f] text-[#f5f5f7] border border-[#333336] font-mono font-medium">
            УРОК #{lesson.id} · НЕДЕЛЯ {lesson.week}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#262629] font-medium">
            {block?.titleRu || 'AI for LIFE'}
          </span>
          <span className="text-[#86868b] flex items-center gap-1.5 sm:ml-auto font-medium">
            <Clock className="w-3.5 h-3.5 text-[#0071e3]" /> 90 мин ({lesson.theoryDuration}м теор + {lesson.practiceDuration}м практ)
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7] leading-tight">
          {lesson.titleRu}
        </h1>
        <p className="text-xs sm:text-sm text-[#86868b] font-mono">{lesson.title}</p>

        {/* Progress & EXP tracker */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#262629]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#86868b]">Прогресс изучения:</span>
              <span className="text-[#00d959] font-semibold tabular-nums">{completedSectionsCount} / {sectionsToRender.length} ({progressPct}%)</span>
            </div>
            <div className="w-full sm:w-56 h-1.5 rounded-full bg-[#1c1c1f] overflow-hidden">
              <div
                className="h-full bg-[#00d959] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsXpModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00d959] shrink-0" />
              <span>Баланс: <strong className="text-[#00d959] tabular-nums font-semibold">{stats.totalPoints || profile.totalPoints || 0} EXP</strong></span>
            </button>
          </div>
        </div>

        {/* 4-Section EXP Cards Grid */}
        <div className="pt-3 border-t border-[#262629] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-medium text-[#86868b] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
              <span>Начисление EXP по разделам Урока #{lesson.id}:</span>
            </span>
            <div className="flex items-center gap-2 tabular-nums">
              <span className="text-xs font-semibold text-[#00d959] bg-[#1c2e22] px-2.5 py-0.5 rounded-full border border-[#00d959]/30">
                Заработано: +{totalLessonXp} / 450 EXP
              </span>
              {lessonBonusXp > 0 && (
                <span className="text-xs font-medium text-[#f5f5f7] bg-[#1c1c1f] px-2 py-0.5 rounded-full border border-[#333336]">
                  ✓ Бонус +50 EXP
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {/* 1. Лекция */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-lecture`)}
              className={`p-3.5 rounded-[20px] border space-y-1 transition-colors cursor-pointer ${
                isLectureRead ? 'bg-[#1c2e22] border-[#00d959]/40' : 'bg-[#161618] border-[#262629] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase">1. Лекция</span>
                <span className="text-xs font-semibold tabular-nums text-[#f5f5f7]">+{lectureXp} / 25 EXP</span>
              </div>
              <p className="text-[11px] text-[#86868b] leading-snug">
                +25 EXP за изучение секции
              </p>
              <div className="pt-0.5 text-[10px]">
                {isLectureRead ? (
                  <span className="text-[#00d959] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Изучено
                  </span>
                ) : (
                  <span className="text-[#6e6e73]">Не изучено (+0 EXP)</span>
                )}
              </div>
            </div>

            {/* 2. Лабораторная */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-lab`)}
              className={`p-3.5 rounded-[20px] border space-y-1 transition-colors cursor-pointer ${
                labXp > 0 || isLabRead ? 'bg-[#1c2e22] border-[#00d959]/40' : 'bg-[#161618] border-[#262629] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase">2. Лабораторная</span>
                <span className="text-xs font-semibold tabular-nums text-[#f5f5f7]">+{(isLabRead ? 25 : 0) + labXp} / 125 EXP</span>
              </div>
              <p className="text-[11px] text-[#86868b] leading-snug">
                +100 EXP за принятую лабу
              </p>
              <div className="pt-0.5 text-[10px] flex items-center justify-between text-[#86868b] tabular-nums">
                <span>Секция: +{isLabRead ? 25 : 0}</span>
                <span className={labXp > 0 ? 'text-[#00d959] font-medium' : ''}>Лаба: +{labXp}</span>
              </div>
            </div>

            {/* 3. Тесты */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-quiz`)}
              className={`p-3.5 rounded-[20px] border space-y-1 transition-colors cursor-pointer ${
                testXp > 0 || isQuizRead ? 'bg-[#1c2e22] border-[#00d959]/40' : 'bg-[#161618] border-[#262629] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase">3. Тесты</span>
                <span className="text-xs font-semibold tabular-nums text-[#f5f5f7]">+{(isQuizRead ? 25 : 0) + testXp} / 125 EXP</span>
              </div>
              <p className="text-[11px] text-[#86868b] leading-snug">
                +100 EXP за тест без ошибок
              </p>
              <div className="pt-0.5 text-[10px] flex items-center justify-between text-[#86868b] tabular-nums">
                <span>Секция: +{isQuizRead ? 25 : 0}</span>
                <span className={testXp > 0 ? 'text-[#00d959] font-medium' : ''}>Тест: +{testXp}</span>
              </div>
            </div>

            {/* 4. Домашнее задание */}
            <div
              onClick={() => handleSectionChange(`sec-${lesson.id}-homework`)}
              className={`p-3.5 rounded-[20px] border space-y-1 transition-colors cursor-pointer ${
                homeworkXp > 0 || isHwRead ? 'bg-[#1c2e22] border-[#00d959]/40' : 'bg-[#161618] border-[#262629] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#86868b] uppercase">4. Домашнее</span>
                <span className="text-xs font-semibold tabular-nums text-[#f5f5f7]">+{(isHwRead ? 25 : 0) + homeworkXp} / 125 EXP</span>
              </div>
              <p className="text-[11px] text-[#86868b] leading-snug">
                +100 EXP за принятое ДЗ
              </p>
              <div className="pt-0.5 text-[10px] flex items-center justify-between text-[#86868b] tabular-nums">
                <span>Секция: +{isHwRead ? 25 : 0}</span>
                <span className={homeworkXp > 0 ? 'text-[#00d959] font-medium' : ''}>ДЗ: +{homeworkXp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-6">
        <div
          id="lesson-sections-container"
          className="p-4 sm:p-7 md:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-6"
        >
          {/* Section Switcher Bar */}
          <div className="space-y-3.5 pb-4 border-b border-[#262629]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f7] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0071e3] shrink-0" /> Учебные материалы урока
                </h3>
                <p className="text-xs text-[#86868b] mt-0.5">
                  Переключайте разделы и получайте +25 EXP за каждую изученную секцию
                </p>
              </div>
              <span className="text-xs text-[#86868b] bg-[#000000] border border-[#262629] px-3 py-1 rounded-full w-fit tabular-nums">
                Раздел {sectionsToRender.findIndex((s) => s.id === activeSectionId) + 1} из {sectionsToRender.length}
              </span>
            </div>

            {/* Mobile Dropdown */}
            <div className="block md:hidden">
              <select
                value={activeSectionId}
                onChange={(e) => handleSectionChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-full bg-[#000000] border border-[#333336] text-[#f5f5f7] font-medium text-xs focus:outline-none focus:border-[#0071e3]"
              >
                {sectionsToRender.map((sec, idx) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.title} {isSectionCompleted(sec.id) ? '✓ (Изучено)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Tabs: Apple Selector Chips */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              {sectionsToRender.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                    activeSectionId === sec.id
                      ? 'bg-[#0071e3] text-white font-semibold'
                      : 'bg-[#000000] text-[#86868b] hover:text-[#f5f5f7] border border-[#262629]'
                  }`}
                >
                  {isSectionCompleted(sec.id) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00d959] shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-[#1c1c1f] text-[#86868b] text-[10px] flex items-center justify-center tabular-nums shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className="truncate">{sec.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Content */}
          {sectionsToRender.map((sec, currentSecIndex) => {
            const isCurrent = sec.id === activeSectionId;
            const isRead = isSectionCompleted(sec.id);

            return (
              <div
                key={sec.id}
                className={`space-y-6 ${isCurrent ? 'block' : 'hidden'}`}
              >
                {/* Section Header & Mark Read Banner */}
                <div className="p-4 sm:p-5 rounded-[24px] bg-[#000000] border border-[#262629] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c1c1f] pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f7]">{sec.title}</h3>
                      <p className="text-xs text-[#86868b] mt-0.5">{sec.subtitle}</p>
                    </div>

                    <button
                      onClick={() => markSectionRead(sec.id, sec.exp)}
                      disabled={isRead}
                      className={`px-4 py-2 rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer ${
                        isRead
                          ? 'bg-[#1c2e22] text-[#00d959] border border-[#00d959]/30'
                          : 'bg-[#0071e3] hover:bg-[#0077ed] text-white'
                      }`}
                    >
                      {isRead ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0" />
                          <span>Изучено (+{sec.exp} EXP)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>Отметить изученным (+{sec.exp} EXP)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Actual Section Content */}
                <div className="lesson-content-reader text-sm sm:text-base text-[#f5f5f7] leading-relaxed w-full">
                  {sec.content}
                </div>

                {/* In-Section Navigation */}
                <div className="p-4 rounded-[24px] bg-[#000000] border border-[#262629] flex flex-wrap items-center justify-between gap-3">
                  <button
                    disabled={currentSecIndex <= 0}
                    onClick={() => {
                      if (currentSecIndex > 0) {
                        handleSectionChange(sectionsToRender[currentSecIndex - 1].id);
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] disabled:opacity-30 text-[#f5f5f7] text-xs font-medium flex items-center gap-2 transition-colors border border-[#333336] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Предыдущий раздел</span>
                  </button>

                  <span className="text-xs text-[#86868b] tabular-nums font-medium">
                    Раздел {currentSecIndex + 1} из {sectionsToRender.length}
                  </span>

                  {currentSecIndex < sectionsToRender.length - 1 ? (
                    <button
                      onClick={() => {
                        handleSectionChange(sectionsToRender[currentSecIndex + 1].id);
                      }}
                      className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Следующий раздел</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleLessonCompletion(lesson.id)}
                      className={`px-4 py-2 rounded-full text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                        isHwApprovedByMentor
                          ? 'bg-[#00d959] text-black font-semibold'
                          : 'bg-[#0071e3] hover:bg-[#0077ed]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        {isHwApprovedByMentor
                          ? `Урок #${lesson.id} завершён`
                          : isHwSubmitted
                          ? `ДЗ отправлено ментору`
                          : `Завершить Урок #${lesson.id}`}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className="p-4 sm:p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          {lesson.id > 1 ? (
            <button
              onClick={() => {
                setSelectedLessonId(lesson.id - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full bg-[#000000] hover:bg-[#1c1c1f] text-[#f5f5f7] font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-[#262629] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Урок #{lesson.id - 1}</span>
            </button>
          ) : (
            <div className="hidden md:block" />
          )}

          <div className="flex items-center gap-2 text-xs text-[#86868b]">
            <span>Урок {lesson.id} из {lessons.length}</span>
          </div>

          {lesson.id < lessons.length ? (
            isLessonUnlocked(lesson.id + 1) ? (
              <button
                onClick={() => {
                  setSelectedLessonId(lesson.id + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Урок #{lesson.id + 1}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 rounded-full bg-[#000000] text-[#6e6e73] font-medium text-xs flex items-center justify-center gap-2 border border-[#262629] cursor-not-allowed opacity-60"
              >
                <span>Урок #{lesson.id + 1} закрыт</span>
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
