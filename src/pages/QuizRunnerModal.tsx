import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortal } from '../context/PortalContext';
import { QUIZ_TESTS, FINAL_EXAM_QUIZ, TEST_7_QUIZ, ALL_QUIZ_TESTS, INITIAL_LESSONS } from '../data/syllabusData';
import { LESSON_QUIZZES } from '../data/lessonQuizzesData';
import { COURSE_RULES } from '../lib/courseRules';
import { QuizTest, QuizAnswerDetail, QuizSubmissionResult } from '../types';
import { QuizResultReviewModal } from '../components/QuizResultReviewModal';
import confetti from 'canvas-confetti';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  RotateCcw,
  Trophy,
  Sparkles,
  ShieldCheck,
  Lock,
  BookOpen,
  Send,
  Eye,
  FileText
} from 'lucide-react';

export const QuizRunnerModal: React.FC = () => {
  const {
    selectedQuizId,
    saveTestScore,
    saveQuizSubmission,
    quizRetakes,
    canRetakeQuiz,
    recordQuizRetake,
    profile,
    setActivePage,
    setAiMode,
    setAiDrawerOpen,
    isQuizUnlocked,
    unlockedLessonIds,
    setSelectedLessonId
  } = usePortal();
  
  const resolveQuiz = (): QuizTest => {
    if (selectedQuizId === 'FINAL_EXAM') {
      return FINAL_EXAM_QUIZ;
    }
    if (selectedQuizId === 'TEST_7') {
      return TEST_7_QUIZ;
    }
    if (selectedQuizId?.startsWith('LESSON_')) {
      const lessonIdStr = selectedQuizId.replace('LESSON_TEST_', '').replace('LESSON_', '');
      const lessonId = parseInt(lessonIdStr, 10);
      const lesson = INITIAL_LESSONS.find(l => l.id === lessonId);
      const questions = LESSON_QUIZZES[lessonId] || [];
      return {
        id: selectedQuizId,
        blockId: lesson?.blockId || 1,
        title: `ТЕСТ к Уроку №${lessonId}: ${lesson?.titleRu || ''}`,
        timeLimitMinutes: 10,
        questions: questions
      };
    }
    return ALL_QUIZ_TESTS.find((q) => q.id === selectedQuizId) || QUIZ_TESTS[0];
  };

  const quiz = resolveQuiz();
  const isUnlocked = isQuizUnlocked(quiz.id) || isQuizUnlocked(selectedQuizId) || profile.role === 'admin';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [latestSubmission, setLatestSubmission] = useState<QuizSubmissionResult | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewOpen(false);
    setLatestSubmission(null);
    hasFinishedRef.current = false;
    const q = resolveQuiz();
    setTimeLeft(q.timeLimitMinutes * 60);
  }, [selectedQuizId]);

  const finishQuiz = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFinished(true);
    let correctCount = 0;
    (quiz?.questions || []).forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const totalQ = quiz.questions.length || 1;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passingThreshold = quiz.id === 'FINAL_EXAM' ? 85 : 60;
    const passed = scorePct >= passingThreshold;
    const mistakesCount = Math.max(0, totalQ - correctCount);

    if (passed) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }

    const earnedExp = quiz.id === 'FINAL_EXAM'
      ? (passed ? 500 : 0)
      : COURSE_RULES.calculateTestExp(scorePct, correctCount, totalQ);

    saveTestScore(quiz.id, scorePct, passed);

    const emailClean = (profile.email || '').toLowerCase().trim();
    const subId = `QUIZ-SUB-${quiz.id}-${(profile.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '')}`;

    const submissionDetails: QuizAnswerDetail[] = quiz.questions.map((q, idx) => {
      const selectedIdx = userAnswers[idx] !== undefined ? userAnswers[idx] : -1;
      const isCor = selectedIdx === q.correctIndex;
      return {
        questionId: typeof q.id === 'number' ? q.id : (idx + 1),
        questionText: q.question,
        selectedOptionIndex: selectedIdx,
        selectedOptionText: selectedIdx >= 0 && q.options[selectedIdx] ? q.options[selectedIdx] : 'Не отвечено',
        correctOptionIndex: q.correctIndex,
        correctOptionText: q.options[q.correctIndex] || '',
        isCorrect: isCor,
        explanation: q.explanation || ''
      };
    });

    const newSub: QuizSubmissionResult = {
      id: subId,
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentName: profile.name || emailClean.split('@')[0],
      studentId: profile.id || 'USR-STU-01',
      studentEmail: profile.email || 'student@devopspro.tech',
      submittedAt: new Date().toLocaleString('ru-RU'),
      scorePct,
      passed,
      correctCount,
      totalQuestions: totalQ,
      status: 'Approved',
      details: submissionDetails
    };

    setLatestSubmission(newSub);
    saveQuizSubmission(newSub);
  }, [quiz, userAnswers, saveTestScore, saveQuizSubmission, profile]);

  useEffect(() => {
    if (isFinished || !isUnlocked) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, isUnlocked, finishQuiz]);

  const handleRetake = () => {
    if (!canRetakeQuiz(quiz.id)) return;
    recordQuizRetake(quiz.id);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewOpen(false);
    hasFinishedRef.current = false;
    setTimeLeft(quiz.timeLimitMinutes * 60);
  };

  const maxUnlockedLesson = Math.max(...(unlockedLessonIds || [1]), 1);
  const requiredLessonNum = Math.min(24, quiz.blockId * 4);

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 md:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#1c1c1f] border border-[#262629] flex items-center justify-center mx-auto text-[#6e6e73]">
            <Lock className="w-6 h-6 text-[#6e6e73]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#f5f5f7]">
              Тест пока заблокирован
            </h2>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Тест «{quiz.title}» доступен по мере прохождения уроков программы.
              Ваш доступ открыт до <strong className="text-[#0071e3] font-semibold">Урока #{maxUnlockedLesson}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#000000] border border-[#262629] text-left space-y-2 text-xs text-[#86868b] font-mono">
            <div className="flex justify-between">
              <span>Тематический Блок:</span>
              <span className="text-[#f5f5f7] font-semibold">Блок {quiz.blockId}</span>
            </div>
            <div className="flex justify-between">
              <span>Требуемый урок:</span>
              <span className="text-[#ff791b] font-semibold">Урок #{requiredLessonNum}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={() => {
                setSelectedLessonId(maxUnlockedLesson);
                setActivePage('lesson-detail');
              }}
              className="flex-1 py-2.5 px-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Перейти к Уроку #{maxUnlockedLesson}</span>
            </button>
            <button
              onClick={() => setActivePage('quizzes')}
              className="py-2.5 px-4 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] font-medium text-xs transition-colors border border-[#333336] cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentIndex] || quiz.questions[0] || {
    id: 'q_default',
    question: 'Вопрос загружается...',
    options: ['А', 'Б'],
    correctIndex: 0,
    explanation: ''
  };

  const handleSelectOption = (optIndex: number) => {
    if (isFinished) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount++;
    });
    const totalQ = quiz.questions.length || 1;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passingThreshold = quiz.id === 'FINAL_EXAM' ? 85 : 60;
    const passed = scorePct >= passingThreshold;
    const canRetake = canRetakeQuiz(quiz.id);
    const mistakesCount = Math.max(0, totalQ - correctCount);
    const earnedExp = quiz.id === 'FINAL_EXAM'
      ? (passed ? 500 : 0)
      : COURSE_RULES.calculateTestExp(scorePct, correctCount, totalQ);

    return (
      <>
        {isReviewOpen && latestSubmission && (
          <QuizResultReviewModal
            submission={latestSubmission}
            onClose={() => setIsReviewOpen(false)}
            onRetake={handleRetake}
            canRetake={canRetake}
          />
        )}
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 md:p-8 text-center space-y-6">
            <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center border-2 ${
              passed
                ? 'bg-[#1c2e22] border-[#00d959] text-[#00d959]'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
            }`}>
              {passed ? <Trophy className="w-8 h-8 text-[#00d959]" /> : <AlertCircle className="w-8 h-8 text-rose-400" />}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#f5f5f7]">
                {passed ? 'Поздравляем! Тест сдан' : 'Тест не пройден'}
              </h2>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Ваш результат: <span className="text-[#f5f5f7] font-semibold tabular-nums">{scorePct}%</span> ({correctCount} из {totalQ} верно, ошибок: <span className={mistakesCount > 4 ? 'text-rose-400 font-semibold' : 'text-[#86868b]'}>{mistakesCount}</span>).
                {passed ? ' Отличная работа!' : ` Проходной балл: ${passingThreshold}%.`}
              </p>

              {earnedExp > 0 ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959] font-medium text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d959]" />
                  <span>+{earnedExp} EXP начислено в профиль</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{mistakesCount > 4 ? `Допущено ${mistakesCount} ошибок (>4). Тест заблокирован, 0 EXP.` : '0 EXP начислено.'}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#000000] border border-[#262629] text-[11px] font-medium text-[#86868b]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Результат сохранен в базу SQLite</span>
                </span>
                {!passed && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    canRetake ? 'bg-[#311400] text-[#ff791b] border border-[#ff791b]/30' : 'bg-[#1c1c1f] text-[#6e6e73]'
                  }`}>
                    {canRetake ? 'Доступна 1 попытка пересдачи' : 'Попытка исчерпана'}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="w-full py-2.5 px-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{passed ? 'Посмотреть разбор теста' : 'Посмотреть ошибки и разбор'}</span>
              </button>

              {!passed && (
                canRetake ? (
                  <button
                    onClick={handleRetake}
                    className="w-full py-2.5 px-4 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#f5f5f7] font-medium text-xs border border-[#333336] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#ff791b]" />
                    <span>Пройти заново (1 попытка)</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-full bg-[#1c1c1f] text-[#6e6e73] font-medium text-xs border border-[#262629] cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-[#6e6e73]" />
                    <span>Попытка исчерпана</span>
                  </button>
                )
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setActivePage('lesson-detail')}
                  className="flex-1 py-2 px-3 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium transition-colors border border-[#262629] cursor-pointer"
                >
                  Вернуться к Уроку
                </button>
                <button
                  onClick={() => setActivePage(quiz.id === 'FINAL_EXAM' ? 'final-exam' : 'quizzes')}
                  className="flex-1 py-2 px-3 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium transition-colors border border-[#262629] cursor-pointer"
                >
                  {quiz.id === 'FINAL_EXAM' ? 'К экзамену' : 'К списку тестов'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-2xl w-full p-6 md:p-8 space-y-6 my-8">
        {/* Modal Bar */}
        <div className="flex items-center justify-between border-b border-[#262629] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#0071e3] font-medium uppercase tracking-wider">{quiz.id} · БЛОК {quiz.blockId}</span>
            <h3 className="text-sm font-semibold text-[#f5f5f7]">{quiz.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#000000] border border-[#262629] text-xs font-mono text-[#ff791b] font-medium flex items-center gap-1.5 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#ff791b]" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => setActivePage(quiz.id === 'FINAL_EXAM' ? 'final-exam' : 'quizzes')}
              className="text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[#86868b] font-mono tabular-nums">
            <span>Вопрос {currentIndex + 1} из {quiz.questions.length}</span>
            <span className="text-[#0071e3]">{Math.round(((currentIndex + 1) / quiz.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-[#000000] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0071e3] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="space-y-4">
          <h4 className="text-sm sm:text-base font-semibold text-[#f5f5f7] leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-2">
            {((currentQ && currentQ.options) || []).map((opt, optIdx) => {
              const isSelected = userAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-[18px] border transition-colors text-xs font-medium flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c2333] border-[#0071e3] text-white'
                      : 'bg-[#000000] border-[#262629] text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#161618]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full font-mono text-[10px] flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#0071e3] text-white' : 'bg-[#1c1c1f] text-[#86868b]'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className={isSelected ? 'text-white' : 'text-[#f5f5f7]'}>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0071e3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-[#262629] flex items-center justify-between">
          <a
            href="https://t.me/aivioratj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#0071e3] hover:underline flex items-center gap-1 font-medium"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Связаться с менеджером</span>
          </a>

          <div className="flex items-center gap-2.5">
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium border border-[#333336] transition-colors cursor-pointer"
              >
                Назад
              </button>
            )}

            {currentIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Далее</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                className="px-5 py-2 rounded-full bg-[#00d959] hover:bg-[#00e060] text-black font-semibold text-xs transition-colors cursor-pointer"
              >
                Завершить и проверить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
