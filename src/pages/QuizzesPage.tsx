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
    <div className="space-y-6 text-[#f5f5f7]">
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262629] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#0071e3]" /> Проекты Блоков, Тесты & Экзамен
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            6 практических проектов по блокам, экспресс-тесты к 24 урокам и Финальный Экзамен курса AI for LIFE
          </p>
        </div>

        {/* Tab Switcher: Apple Selector Chips */}
        <div className="flex items-center gap-1.5 p-1 bg-[#000000] border border-[#262629] rounded-full shrink-0">
          <button
            onClick={() => setActiveTab('block_tests')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'block_tests'
                ? 'bg-[#0071e3] text-white'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Проекты Блоков (6 Проектов)</span>
          </button>
          <button
            onClick={() => setActiveTab('lesson_quizzes')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'lesson_quizzes'
                ? 'bg-[#0071e3] text-white'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Мини-тесты к Урокам (24 урока)</span>
          </button>
        </div>
      </div>

      {activeTab === 'block_tests' ? (
        <div className="space-y-6">
          {/* Block Projects Section (6 Projects with GitHub, Vercel Live Preview & Mentor Confirmation) */}
          <BlockProjectsSection />

          {/* Section: Final Exam */}
          <div className="space-y-4 pt-4 border-t border-[#262629]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#f5f5f7] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#ff791b]" />
                <span>Финальный Комплексный Экзамен (60 Вопросов)</span>
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-[#311400] text-[#ff791b] border border-[#ff791b]/30 text-xs font-mono font-medium">
                Итоговая Сертификация
              </span>
            </div>

            <div className="p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#333336] text-[11px] font-mono font-medium">
                      FINAL_EXAM
                    </span>
                    {finalExamUnlocked ? (
                      finalExamScore ? (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                            finalExamPassed
                              ? 'bg-[#1c2e22] text-[#00d959] border border-[#00d959]/30'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {finalExamPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00d959]" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          )}
                          <span>{finalExamScore.scorePct}% ({finalExamPassed ? 'Сдан' : 'Не сдан'})</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1c2e22] text-[#00d959] border border-[#00d959]/30">
                          Доступен
                        </span>
                      )
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1c1c1f] text-[#6e6e73] border border-[#262629] flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#6e6e73]" /> Заблокировано
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-[#f5f5f7]">
                    {FINAL_EXAM_QUIZ.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                    60 комплексных вопросов (по 10 вопросов на каждый из 6 блоков программы, охватывающих все 24 урока): основы LLM и промптинг (RTFC/Few-Shot/CoT), вайб-кодинг в Cursor и Google AI Studio Build, scrollytelling и веб-анимации, автоматизация n8n и Telegram-боты, безопасность API-ключей (.env, серверный прокси), деплой на Vercel и защита Capstone-проекта на Demo Day.
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <div className="p-3.5 rounded-[20px] bg-[#161618] border border-[#262629] text-xs text-[#86868b] space-y-1.5 font-mono">
                    <div className="flex items-center gap-2 text-[#ff791b] font-medium">
                      <Clock className="w-4 h-4" />
                      <span>Таймер: {FINAL_EXAM_QUIZ.timeLimitMinutes} минут</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#86868b]">
                      <ShieldCheck className="w-4 h-4 text-[#00d959]" />
                      <span>Проходной балл: 85% (51/60)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262629] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#86868b] flex items-center gap-1.5 font-medium">
                  <Award className="w-4 h-4 text-[#ff791b]" />
                  <span>+500 EXP · Именной Сертификат AI for LIFE Academy</span>
                </span>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActivePage('final-exam')}
                    className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#f5f5f7] text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-[#333336] w-full sm:w-auto cursor-pointer"
                  >
                    <span>Страница экзамена</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {finalExamUnlocked ? (
                    finalExamScore ? (
                      finalExamPassed ? (
                        <button
                          onClick={() => openReviewModal('FINAL_EXAM', FINAL_EXAM_QUIZ.title, FINAL_EXAM_QUIZ.questions.length)}
                          className="px-5 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#00d959] font-medium text-xs border border-[#00d959]/30 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-[#00d959]" />
                          <span>Посмотреть результат экзамена</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => openReviewModal('FINAL_EXAM', FINAL_EXAM_QUIZ.title, FINAL_EXAM_QUIZ.questions.length)}
                            className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-rose-300 font-medium text-xs border border-rose-500/30 transition-colors flex items-center justify-center gap-1.5 flex-1 sm:flex-initial cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-rose-400" />
                            <span>Разбор ошибок</span>
                          </button>

                          {finalExamCanRetake ? (
                            <button
                              onClick={() => handleStartRetake('FINAL_EXAM')}
                              className="px-5 py-2 rounded-full bg-[#ff791b] hover:bg-[#ff8f3d] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-initial cursor-pointer"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Пройти заново (1 попытка)</span>
                            </button>
                          ) : (
                            <button
                              disabled
                              className="px-4 py-2 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs border border-[#262629] cursor-not-allowed flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                            >
                              <RotateCcw className="w-4 h-4 text-[#6e6e73]" />
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
                        className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Начать Экзамен</span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-[#262629] w-full sm:w-auto"
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
            <h2 className="text-base font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0071e3]" />
              <span>24 Экспресс-теста к Урокам (по 5-10 вопросов)</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#1c1c1f] text-[#86868b] border border-[#262629] text-xs font-mono font-medium">
              до +100 EXP за тест
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
                  className={`p-5 rounded-[28px] border transition-colors flex flex-col justify-between space-y-4 ${
                    lessonUnlocked
                      ? isPassed
                        ? 'bg-[#161618] border-[#00d959]/30 hover:border-[#00d959]/60'
                        : score
                          ? 'bg-[#161618] border-rose-500/30 hover:border-rose-500/50'
                          : 'bg-[#161618] border-white/[0.08] hover:border-white/[0.18]'
                      : 'bg-[#0a0a0b] border-[#1c1c1f] opacity-55'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#0071e3] border border-[#262629] text-[10px] font-mono font-medium">
                        Урок #{lesson.id} · Блок {lesson.blockId}
                      </span>
                      {lessonUnlocked ? (
                        score ? (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${
                              isPassed
                                ? 'bg-[#1c2e22] text-[#00d959]'
                                : 'bg-rose-500/10 text-rose-300'
                            }`}
                          >
                            {isPassed ? <CheckCircle2 className="w-3 h-3 text-[#00d959]" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                            <span className="tabular-nums">{score.scorePct}% ({isPassed ? 'Сдан' : 'Не сдан'})</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1c1c1f] text-[#86868b]">
                            Не пройден
                          </span>
                        )
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1c1c1f] text-[#6e6e73] flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Закрыт
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-[#f5f5f7] line-clamp-2 leading-snug">
                      {lesson.titleRu || lesson.title}
                    </h3>

                    <p className="text-[11px] text-[#86868b] font-mono">
                      {questions.length} вопросов · 10 минут · 60%
                    </p>

                    {sub?.mentorComment && (
                      <div className="p-3 rounded-[16px] bg-[#000000] border border-[#262629] text-[11px] text-[#86868b]">
                        <span className="font-semibold text-[#f5f5f7]">Ментор: </span>
                        <span>{sub.mentorComment}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#262629] flex items-center justify-between gap-2">
                    <span className="text-xs text-[#00d959] font-medium tabular-nums shrink-0">
                      +100 EXP
                    </span>

                    {lessonUnlocked ? (
                      score ? (
                        isPassed ? (
                          <button
                            onClick={() => openReviewModal(quizKey, `ТЕСТ к Уроку №${lesson.id}: ${lesson.titleRu || ''}`, questions.length)}
                            className="px-3.5 py-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#0071e3] font-medium text-xs transition-colors flex items-center gap-1.5 border border-[#333336] cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#0071e3]" />
                            <span>Результат</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openReviewModal(quizKey, `ТЕСТ к Уроку №${lesson.id}: ${lesson.titleRu || ''}`, questions.length)}
                              className="px-2.5 py-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-rose-300 font-medium text-xs transition-colors flex items-center gap-1 border border-rose-500/30 cursor-pointer"
                              title="Посмотреть ошибки"
                            >
                              <Eye className="w-3 h-3 text-rose-400" />
                              <span>Разбор</span>
                            </button>

                            {canRetake ? (
                              <button
                                onClick={() => handleStartRetake(quizKey)}
                                className="px-3 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
                                title="1 попытка пересдачи"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Пересдать</span>
                              </button>
                            ) : (
                              <button
                                disabled
                                className="px-2.5 py-1.5 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs cursor-not-allowed border border-[#262629]"
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
                          className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Пройти тест</span>
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="px-3 py-1.5 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs flex items-center gap-1 cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Закрыт</span>
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
