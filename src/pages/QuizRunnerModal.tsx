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

    const totalQ = (quiz?.questions || []).length || 1;
    const scorePct = Math.round((correctCount / totalQ) * 100);
    const passingThreshold = quiz.id === 'FINAL_EXAM' ? 85 : 60;
    const passed = scorePct >= passingThreshold;

    const details: QuizAnswerDetail[] = (quiz?.questions || []).map((q, idx) => {
      const selectedOptIndex = userAnswers[idx] !== undefined ? userAnswers[idx] : -1;
      const isCorrect = selectedOptIndex === q.correctIndex;
      const qOptions = q.options || [];
      return {
        questionId: typeof q.id === 'number' ? q.id : idx + 1,
        questionText: q.question,
        selectedOptionIndex: selectedOptIndex,
        selectedOptionText: selectedOptIndex >= 0 ? (qOptions[selectedOptIndex] || 'Не отвечено') : 'Не отвечено',
        correctOptionIndex: q.correctIndex,
        correctOptionText: qOptions[q.correctIndex] || '',
        isCorrect,
        explanation: q.explanation || ''
      };
    });

    const cleanUid = (profile.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '').slice(-8) || 'STU';
    const cleanQid = (quiz.id || 'TEST_1').replace(/[^a-zA-Z0-9_]/g, '');
    const submissionResult: QuizSubmissionResult = {
      id: `QUIZ-SUB-${cleanQid}-${cleanUid}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentName: profile.name || 'Студент',
      studentId: profile.id || 'USR-STU-01',
      studentEmail: profile.email || 'student@devopspro.tech',
      submittedAt: new Date().toLocaleString('ru-RU'),
      scorePct,
      passed,
      correctCount,
      totalQuestions: (quiz?.questions || []).length,
      status: 'Approved',
      details
    };

    setLatestSubmission(submissionResult);

    if (saveQuizSubmission) {
      saveQuizSubmission(submissionResult);
    } else {
      saveTestScore(quiz.id, scorePct, passed);
    }

    if (passed) {
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  }, [quiz, userAnswers, saveTestScore, saveQuizSubmission, profile.email, profile.name, profile.id]);

  const finishQuizRef = useRef(finishQuiz);
  finishQuizRef.current = finishQuiz;

  useEffect(() => {
    if (isFinished || !isUnlocked || hasFinishedRef.current) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuizRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, selectedQuizId, isUnlocked]);

  const handleRetake = () => {
    if (!canRetakeQuiz(quiz.id)) return;
    recordQuizRetake(quiz.id);
    setIsFinished(false);
    setIsReviewOpen(false);
    setLatestSubmission(null);
    setCurrentIndex(0);
    setUserAnswers({});
    hasFinishedRef.current = false;
    setTimeLeft(quiz.timeLimitMinutes * 60);
  };

  if (!isUnlocked) {
    const maxUnlockedLesson = Math.max(...(unlockedLessonIds || [1]), 1);
    const requiredLessonNum = quiz.blockId === 1 ? 1 : (quiz.blockId - 1) * 4 + 1;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40 text-xs font-mono font-bold">
              ТЕСТ ЗАБЛОКИРОВАН
            </span>
            <h2 className="text-xl font-bold text-white">Доступ ограничен</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Тест «{quiz.title}» доступен по мере прохождения уроков программы.
              Ваш доступ открыт до <strong className="text-amber-400 font-semibold">Урока #{maxUnlockedLesson}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>Тематический Блок:</span>
              <span className="text-white font-bold">Блок {quiz.blockId}</span>
            </div>
            <div className="flex justify-between">
              <span>Требуемый урок:</span>
              <span className="text-amber-400 font-bold">Урок #{requiredLessonNum}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedLessonId(maxUnlockedLesson);
                setActivePage('lesson-detail');
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Перейти к Уроку #{maxUnlockedLesson}</span>
            </button>
            <button
              onClick={() => setActivePage('quizzes')}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all border border-slate-700"
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
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 text-center space-y-6">
            <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border-4 shadow-xl ${
              passed
                ? 'shadow-emerald-950/50 bg-emerald-950/40 border-emerald-500 text-emerald-400'
                : 'shadow-rose-950/50 bg-rose-950/40 border-rose-500 text-rose-400'
            }`}>
              {passed ? <Trophy className="w-10 h-10 text-yellow-400" /> : <AlertCircle className="w-10 h-10 text-rose-400" />}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">
                {passed ? 'Поздравляем! Тест сдан 🎉' : 'Тест не пройден'}
              </h2>
              <p className="text-xs text-slate-300">
                Ваш результат: <span className="text-white font-bold">{scorePct}%</span> ({correctCount} из {totalQ} верно, ошибок: <span className={mistakesCount > 4 ? 'text-rose-400 font-bold' : 'text-slate-300 font-bold'}>{mistakesCount}</span>).
                {passed ? ' Отличная работа!' : ` Проходной балл: ${passingThreshold}%.`}
              </p>

              {earnedExp > 0 ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold text-xs font-mono">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>+{earnedExp} EXP начислено в профиль</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{mistakesCount > 4 ? `Допущено ${mistakesCount} ошибок (>4). Тест заблокирован, 0 EXP.` : '0 EXP начислено.'}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Результат сохранен в академический журнал SQLite</span>
                </span>
                {!passed && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    canRetake ? 'bg-amber-950 text-amber-300 border border-amber-800/50' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {canRetake ? 'Доступна 1 попытка пересдачи' : 'Попытка пересдачи использована'}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>{passed ? 'Посмотреть разбор теста' : 'Посмотреть ошибки и разбор'}</span>
              </button>

              {!passed && (
                canRetake ? (
                  <button
                    onClick={handleRetake}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4 text-purple-400" />
                    <span>Пройти заново (1 попытка)</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-2xl bg-slate-800/50 text-slate-500 font-bold text-xs border border-slate-800 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-600" />
                    <span>Попытка исчерпана</span>
                  </button>
                )
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setActivePage('lesson-detail')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
                >
                  Вернуться к Уроку
                </button>
                <button
                  onClick={() => setActivePage(quiz.id === 'FINAL_EXAM' ? 'final-exam' : 'quizzes')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700"
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
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 space-y-6 my-8">
        {/* Modal Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{quiz.id} • БЛОК {quiz.blockId}</span>
            <h3 className="text-sm font-bold text-white">{quiz.title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button onClick={() => setActivePage(quiz.id === 'FINAL_EXAM' ? 'final-exam' : 'quizzes')} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Вопрос {currentIndex + 1} из {quiz.questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / quiz.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="space-y-4">
          <h4 className="text-base font-extrabold text-white leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {((currentQ && currentQ.options) || []).map((opt, optIdx) => {
              const isSelected = userAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs font-medium flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg font-mono font-bold text-[10px] flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://t.me/aivioratj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Связаться с менеджером</span>
          </a>

          <div className="flex items-center gap-3">
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Назад
              </button>
            )}

            {currentIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <span>Далее</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
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
