import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS, FINAL_EXAM_QUIZ, INITIAL_LESSONS } from '../data/syllabusData';
import { LESSON_QUIZZES } from '../data/lessonQuizzesData';
import { QuizResultReviewModal } from '../components/QuizResultReviewModal';
import { BlockProjectsSection } from '../components/quizzes/BlockProjectsSection';
import { QuizSubmissionResult } from '../types';
import {
  HelpCircle,
  Award,
  Play,
  Lock,
  GraduationCap,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageSquare,
  BookOpen,
  Zap,
  CheckCircle2,
  AlertCircle,
  Eye,
  RotateCcw,
  FileText,
  Rocket,
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const QuizzesPage: React.FC = () => {
  const {
    testScores,
    setSelectedQuizId,
    setSelectedLessonId,
    setSelectedLabId,
    setActivePage,
    isQuizUnlocked,
    isLessonUnlocked,
    quizSubmissions,
    canRetakeQuiz,
    recordQuizRetake,
    profile,
    lessons,
    labs,
    homeworkSubmissions,
    readSections,
    currentCourse,
    currentCourseId
  } = usePortal();

  const [activeTab, setActiveTab] = useState<'block_tests' | 'lesson_quizzes'>('block_tests');
  const [reviewingSubmission, setReviewingSubmission] = useState<QuizSubmissionResult | null>(null);

  const emailLower = (profile?.email || '').toLowerCase().trim();
  const studentId = (profile?.id || '').trim();

  const openReviewModal = (quizId: string, customTitle?: string, fallbackTotalQ = 20) => {
    const matchingSub = (quizSubmissions || []).find((qs) => {
      if (!qs) return false;
      if (qs.quizId === quizId) return true;
      if (quizId.startsWith('TEST_') && qs.quizId === `QUIZ_${quizId.replace('TEST_', '')}`) return true;
      if (quizId.startsWith('LESSON_') && qs.quizId === `LESSON_TEST_${quizId.replace('LESSON_', '')}`) return true;
      return false;
    });

    const scoreData = testScores[quizId] || (matchingSub ? {
      scorePct: typeof matchingSub.scorePct === 'number' ? matchingSub.scorePct : (matchingSub.passed ? 100 : 0),
      passed: Boolean(matchingSub.passed),
      completedAt: matchingSub.submittedAt || ''
    } : undefined);

    const submission: QuizSubmissionResult = matchingSub || {
      id: `QUIZ-SUB-${quizId}-${(profile.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '')}`,
      quizId: quizId,
      quizTitle: customTitle || `Тест ${quizId}`,
      studentName: profile.name || emailLower.split('@')[0],
      studentId: profile.id || 'USR-STU-01',
      studentEmail: profile.email || 'student@devopspro.tech',
      submittedAt: scoreData?.completedAt || new Date().toLocaleString('ru-RU'),
      scorePct: scoreData?.scorePct ?? 0,
      passed: Boolean(scoreData?.passed),
      correctCount: Math.round(((scoreData?.scorePct ?? 0) / 100) * fallbackTotalQ),
      totalQuestions: fallbackTotalQ,
      status: 'Approved',
      details: []
    };

    setReviewingSubmission(submission);
  };

  const handleStartRetake = (quizId: string) => {
    if (!canRetakeQuiz(quizId)) return;
    recordQuizRetake(quizId);
    setSelectedQuizId(quizId);
    setActivePage('quiz-runner');
  };

  const finalExamUnlocked = isQuizUnlocked('FINAL_EXAM');
  const finalExamSub = (quizSubmissions || []).find((qs) => {
    if (!qs || qs.quizId !== 'FINAL_EXAM') return false;
    if (profile?.role === 'admin') return true;
    const qsEmail = (qs.studentEmail || '').toLowerCase().trim();
    const qsId = (qs.studentId || '').trim();
    return (
      (qsEmail && emailLower && (qsEmail === emailLower || qsEmail.includes(emailLower) || emailLower.includes(qsEmail))) ||
      (qsId && studentId && (qsId === studentId || qsId.toLowerCase() === studentId.toLowerCase()))
    );
  });
  const finalExamScore = testScores['FINAL_EXAM'] || (finalExamSub ? {
    scorePct: typeof finalExamSub.scorePct === 'number' ? finalExamSub.scorePct : (finalExamSub.passed ? 100 : 0),
    passed: Boolean(finalExamSub.passed),
    completedAt: finalExamSub.submittedAt || ''
  } : undefined);
  const finalExamPassed = finalExamScore?.passed;
  const finalExamCanRetake = canRetakeQuiz('FINAL_EXAM');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Review Modal */}
      {reviewingSubmission && (
        <QuizResultReviewModal
          submission={reviewingSubmission}
          onClose={() => setReviewingSubmission(null)}
          onRetake={(qId) => {
            setReviewingSubmission(null);
            handleStartRetake(qId);
          }}
          canRetake={canRetakeQuiz(reviewingSubmission.quizId)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-purple-400" /> Проекты Блоков, Тесты & Экзамен
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            6 практических проектов по блокам программы, экспресс-тесты к 24 урокам и Финальный Экзамен курса {currentCourse.title}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('block_tests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'block_tests'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-purple-300" />
            <span>Проекты Блоков (6 Проектов)</span>
          </button>
          <button
            onClick={() => setActiveTab('lesson_quizzes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'lesson_quizzes'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>Мини-тесты к Урокам (24 урока)</span>
          </button>
        </div>
      </div>

      {activeTab === 'block_tests' ? (
        <div className="space-y-8">
          {/* Block Projects Section (6 Projects with GitHub, Vercel Live Preview & Mentor Confirmation) */}
          <BlockProjectsSection />

          {/* Section: Final Exam */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Финальный Комплексный Экзамен (60 Вопросов)</span>
              </h2>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40 text-xs font-mono font-bold">
                Итоговая Сертификация
              </span>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-amber-500/20 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40 text-xs font-mono font-bold">
                      FINAL_EXAM
                    </span>
                    {finalExamUnlocked ? (
                      finalExamScore ? (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                            finalExamPassed
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                              : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                          }`}
                        >
                          {finalExamPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          )}
                          <span>{finalExamScore.scorePct}% ({finalExamPassed ? 'Сдан' : 'Не сдан'})</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                          Доступен
                        </span>
                      )
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" /> Заблокировано
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-white">
                    {FINAL_EXAM_QUIZ.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    60 комплексных вопросов (по 10 вопросов на каждый из 6 блоков программы, охватывающих все 24 урока): основы LLM и промптинг (RTFC/Few-Shot/CoT), вайб-кодинг в Cursor и Google AI Studio Build, scrollytelling и веб-анимации, автоматизация n8n и Telegram-боты, безопасность API-ключей (.env, серверный прокси), деплой на Vercel и защита Capstone-проекта на Demo Day.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1 font-mono">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Таймер: {FINAL_EXAM_QUIZ.timeLimitMinutes} минут</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Проходной балл: 85% (51/60)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>+500 EXP • Именной Сертификат AI for LIFE Academy</span>
                </span>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActivePage('final-exam')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700 w-full sm:w-auto"
                  >
                    <span>Страница экзамена</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {finalExamUnlocked ? (
                    finalExamScore ? (
                      finalExamPassed ? (
                        /* Passed exam: show review result button */
                        <button
                          onClick={() => openReviewModal('FINAL_EXAM', FINAL_EXAM_QUIZ.title, FINAL_EXAM_QUIZ.questions.length)}
                          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-md"
                        >
                          <Eye className="w-4 h-4 text-amber-400" />
                          <span>Посмотреть результат экзамена</span>
                        </button>
                      ) : (
                        /* Failed exam: review mistakes + single retake */
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => openReviewModal('FINAL_EXAM', FINAL_EXAM_QUIZ.title, FINAL_EXAM_QUIZ.questions.length)}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs border border-rose-800/50 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                          >
                            <Eye className="w-4 h-4 text-rose-400" />
                            <span>Разбор ошибок</span>
                          </button>

                          {finalExamCanRetake ? (
                            <button
                              onClick={() => handleStartRetake('FINAL_EXAM')}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-600/25 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Пройти заново (1 попытка)</span>
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-4 py-2.5 rounded-xl bg-slate-800/60 text-slate-500 font-bold text-xs border border-slate-800 cursor-not-allowed flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                            >
                              <RotateCcw className="w-4 h-4 text-slate-600" />
                              <span>Попытка исчерпана</span>
                            </button>
                          )}
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedQuizId('FINAL_EXAM');
                          setActivePage('quiz-runner');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-600/25 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Начать Экзамен</span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700 w-full sm:w-auto"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Заблокировано</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 24 Lesson Mini-Quizzes Section */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>⚡ 24 Экспресс-теста к Урокам (по 5-10 вопросов)</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40 text-xs font-mono font-bold">
              Вкладка 3 в каждом уроке • до +100 EXP за тест (+25 EXP секция)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_LESSONS.map((lesson) => {
              const quizKey = `LESSON_${lesson.id}`;
              const questions = LESSON_QUIZZES[lesson.id] || [];
              const lessonUnlocked = isLessonUnlocked(lesson.id);
              const sub = (quizSubmissions || []).find((qs) => {
                if (
                  !qs ||
                  (qs.quizId !== quizKey &&
                    qs.quizId !== String(lesson.id) &&
                    qs.quizId !== `lesson-${lesson.id}-test` &&
                    qs.quizId !== `LESSON_TEST_${lesson.id}`)
                )
                  return false;
                if (profile?.role === 'admin') return true;
                const qsEmail = (qs.studentEmail || '').toLowerCase().trim();
                const qsId = (qs.studentId || '').trim();
                return (
                  (qsEmail && emailLower && (qsEmail === emailLower || qsEmail.includes(emailLower) || emailLower.includes(qsEmail))) ||
                  (qsId && studentId && (qsId === studentId || qsId.toLowerCase() === studentId.toLowerCase()))
                );
              });
              const rawScoreVal =
                testScores[quizKey] ??
                testScores[String(lesson.id)] ??
                testScores[`lesson-${lesson.id}-test`] ??
                testScores[`LESSON_TEST_${lesson.id}`];
              const score =
                rawScoreVal !== undefined
                  ? typeof rawScoreVal === 'number'
                    ? { scorePct: rawScoreVal, passed: rawScoreVal >= 60, completedAt: '' }
                    : rawScoreVal
                  : sub
                  ? {
                      scorePct: typeof sub.scorePct === 'number' ? sub.scorePct : sub.passed ? 100 : 0,
                      passed: Boolean(sub.passed),
                      completedAt: sub.submittedAt || '',
                    }
                  : undefined;
              const isPassed = score?.passed;
              const canRetake = canRetakeQuiz(quizKey);

              return (
                <div
                  key={quizKey}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    lessonUnlocked
                      ? isPassed
                        ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/40'
                        : score
                          ? 'bg-slate-900/90 border-rose-900/30 hover:border-rose-700/50'
                          : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
                      : 'bg-slate-900/40 border-slate-800/40 opacity-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40 text-[11px] font-mono font-bold">
                        Урок #{lesson.id} (Блок {lesson.blockId})
                      </span>
                      {lessonUnlocked ? (
                        score ? (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              isPassed
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                                : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                            }`}
                          >
                            {isPassed ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                            <span>{score.scorePct}% ({isPassed ? 'Сдан' : 'Не сдан'})</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                            Не пройден
                          </span>
                        )
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Закрыт
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-white line-clamp-2">
                      {lesson.titleRu || lesson.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 font-mono">
                      {questions.length} вопросов • 10 минут • 60%
                    </p>

                    {sub?.mentorComment && (
                      <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-[11px] text-cyan-200">
                        <span className="font-bold">Ментор: </span>
                        <span>{sub.mentorComment}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      +100 EXP
                    </span>

                    {lessonUnlocked ? (
                      score ? (
                        isPassed ? (
                          /* Passed lesson quiz: show Result button */
                          <button
                            onClick={() => openReviewModal(quizKey, `ТЕСТ к Уроку №${lesson.id}: ${lesson.titleRu || ''}`, questions.length)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-bold text-[11px] transition-all flex items-center gap-1 border border-cyan-800/40"
                          >
                            <Eye className="w-3 h-3 text-cyan-400" />
                            <span>Результат</span>
                          </button>
                        ) : (
                          /* Failed lesson quiz: Review + single retake */
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openReviewModal(quizKey, `ТЕСТ к Уроку №${lesson.id}: ${lesson.titleRu || ''}`, questions.length)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-[10px] transition-all flex items-center gap-1 border border-rose-800/40"
                              title="Посмотреть ошибки"
                            >
                              <Eye className="w-3 h-3 text-rose-400" />
                              <span>Разбор</span>
                            </button>

                            {canRetake ? (
                              <button
                                onClick={() => handleStartRetake(quizKey)}
                                className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] transition-all flex items-center gap-1 shadow-md shadow-cyan-600/20"
                                title="1 попытка пересдачи"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Пересдать</span>
                              </button>
                            ) : (
                              <button
                                disabled
                                className="px-2 py-1.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-[10px] cursor-not-allowed border border-slate-700/50"
                              >
                                Исчерпано
                              </button>
                            )}
                          </div>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedQuizId(quizKey);
                            setActivePage('quiz-runner');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-md shadow-cyan-600/20"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Пройти тест</span>
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-[11px] flex items-center gap-1 cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Заблокировано</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
