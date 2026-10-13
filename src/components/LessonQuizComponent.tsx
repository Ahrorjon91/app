import React, { useState } from 'react';
import { QuizQuestion, QuizAnswerDetail, QuizSubmissionResult } from '../types';
import { LESSON_QUIZZES } from '../data/lessonQuizzesData';
import { usePortal } from '../context/PortalContext';
import { InlineTestSubmission } from './InlineLabAndHomeworkSubmission';
import { COURSE_RULES } from '../lib/courseRules';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RefreshCw,
  Send,
  ShieldCheck,
  MessageSquare,
  Lock,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonQuizProps {
  lessonId: number;
  lessonTitle: string;
}

export const LessonQuizComponent: React.FC<LessonQuizProps> = ({ lessonId, lessonTitle }) => {
  const {
    setSelectedQuizId,
    setActivePage,
    saveTestScore,
    saveQuizSubmission,
    quizSubmissions,
    testScores,
    readSections,
    markSectionRead,
    toggleReadSection,
    profile
  } = usePortal();
  const questions: QuizQuestion[] = LESSON_QUIZZES[lessonId] || [];

  const studentSub = (quizSubmissions || []).find(
    (qs) => (qs.quizId === `LESSON_${lessonId}` || qs.quizId === String(lessonId) || qs.quizId === `LESSON_TEST_${lessonId}`) &&
    (qs.studentEmail?.toLowerCase() === profile?.email?.toLowerCase() || (profile?.id && qs.studentId === profile?.id) || profile?.role === 'admin')
  );

  const studentTestScore = testScores[`LESSON_${lessonId}`] || testScores[`LESSON_TEST_${lessonId}`] || testScores[String(lessonId)];

  const userIdentifier = profile?.email || profile?.id || 'user';
  const retryStorageKey = `mini_quiz_retries_${userIdentifier}_${lessonId}`;
  const MAX_RETRIES = 2;

  const [retryCount, setRetryCount] = useState<number>(() => {
    try {
      const val = localStorage.getItem(retryStorageKey);
      return val ? parseInt(val, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    if (studentSub?.details && Array.isArray(studentSub.details)) {
      const map: Record<number, number> = {};
      studentSub.details.forEach((d, idx) => {
        if (d.selectedOptionIndex !== undefined && d.selectedOptionIndex >= 0) {
          map[idx] = d.selectedOptionIndex;
        }
      });
      return map;
    }
    return {};
  });
  const [submitted, setSubmitted] = useState<boolean>(() => Boolean(studentSub || studentTestScore?.passed));
  const [claimedExp, setClaimedExp] = useState<boolean>(() => Boolean(studentSub || studentTestScore?.passed));

  React.useEffect(() => {
    if (studentSub) {
      setSubmitted(true);
      setClaimedExp(true);
      if (studentSub.details && Array.isArray(studentSub.details)) {
        const map: Record<number, number> = {};
        studentSub.details.forEach((d, idx) => {
          if (d.selectedOptionIndex !== undefined && d.selectedOptionIndex >= 0) {
            map[idx] = d.selectedOptionIndex;
          }
        });
        setSelectedAnswers((prev) => Object.keys(prev).length > 0 ? prev : map);
      }
    } else if (studentTestScore?.passed) {
      setSubmitted(true);
      setClaimedExp(true);
    } else if (!studentSub && !studentTestScore) {
      setSubmitted(false);
      setClaimedExp(false);
    }
  }, [studentSub?.id, studentSub?.scorePct, studentSub?.mentorComment, studentTestScore, lessonId]);

  if (questions.length === 0) return null;

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    const pct = Math.round((score / questions.length) * 100);
    const mistakes = Math.max(0, questions.length - score);
    const earnedExp = COURSE_RULES.calculateTestExp(pct, score, questions.length);
    const isTestPassed = earnedExp > 0 && mistakes <= 4;

    // Generate detailed quiz submission result for Mentor
    if (saveQuizSubmission) {
      const details: QuizAnswerDetail[] = questions.map((q, qIdx) => {
        const userChoice = selectedAnswers[qIdx] ?? -1;
        const isCorrect = userChoice === q.correctIndex;
        return {
          questionId: q.id,
          questionText: q.question,
          selectedOptionIndex: userChoice,
          selectedOptionText: userChoice >= 0 ? q.options[userChoice] : 'Ответ не выбран',
          correctOptionIndex: q.correctIndex,
          correctOptionText: q.options[q.correctIndex],
          isCorrect,
          explanation: q.explanation
        };
      });

      const cleanUid = (profile?.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '').slice(-8) || 'STU';
      const submissionResult: QuizSubmissionResult = {
        id: (studentSub?.id && !studentSub.id.startsWith('QSUB-')) ? studentSub.id : `QUIZ-SUB-LESSON_${lessonId}-${cleanUid}`,
        quizId: `LESSON_${lessonId}`,
        quizTitle: `⚡ Мини-тест к Уроку №${lessonId}: ${lessonTitle}`,
        studentName: profile?.name || 'Студент',
        studentId: profile?.id || 'USR-STU-01',
        studentEmail: profile?.email || 'student@devopspro.tech',
        submittedAt: new Date().toLocaleString('ru-RU'),
        scorePct: pct,
        passed: isTestPassed,
        correctCount: score,
        totalQuestions: questions.length,
        mentorComment: studentSub?.mentorComment || '',
        details
      };

      saveQuizSubmission(submissionResult);
    } else if (saveTestScore) {
      saveTestScore(`LESSON_${lessonId}`, pct, isTestPassed);
    }

    if (isTestPassed && !readSections?.[`sec-${lessonId}-quiz`]) {
      if (typeof markSectionRead === 'function') {
        markSectionRead(lessonId, `sec-${lessonId}-quiz`);
      } else if (typeof toggleReadSection === 'function') {
        toggleReadSection(`sec-${lessonId}-quiz`, lessonId);
      }
    }

    setClaimedExp(true);
    if (isTestPassed) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const score = calculateScore();
  const pct = Math.round((score / questions.length) * 100);
  const mistakesCount = Math.max(0, questions.length - score);
  const earnedExp = COURSE_RULES.calculateTestExp(pct, score, questions.length);

  const isPassed = submitted && (
    pct >= 60 ||
    Boolean(studentSub?.passed) ||
    Boolean(studentTestScore?.passed)
  );

  const isFailed = submitted && !isPassed;
  const retriesLeft = Math.max(0, MAX_RETRIES - retryCount);
  const canRetry = isFailed && retriesLeft > 0;

  const handleReset = () => {
    if (!canRetry && profile?.role !== 'admin') return;
    const nextRetry = retryCount + 1;
    setRetryCount(nextRetry);
    try {
      localStorage.setItem(retryStorageKey, String(nextRetry));
    } catch {}
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="p-0 sm:p-6 rounded-none sm:rounded-3xl bg-transparent sm:bg-slate-950 border-0 sm:border sm:border-slate-800 space-y-5 sm:space-y-6">
      <div className="p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-slate-950 sm:bg-transparent border border-slate-800 sm:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:border-b sm:border-slate-800 sm:pb-4">
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400 shrink-0" />
            <span>ТЕСТ & Проверка Знаний: Урок №{lessonId}</span>
          </h4>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            {questions.length} вопросов с мгновенной проверкой ответов и пояснениями
          </p>
        </div>

        <div className="flex items-center gap-2">
          {submitted ? (
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
                isPassed
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                  : 'bg-rose-950 text-rose-300 border-rose-800/60'
              }`}
            >
              {isPassed ? (
                <>Результат: {score}/{questions.length} ({pct}%) — СДАН (+{earnedExp} EXP) ✅</>
              ) : (
                <>Результат: {score}/{questions.length} ({pct}%) — {mistakesCount > 4 ? 'ЗАБЛОКИРОВАН (>4 ошибок, 0 EXP) ❌' : 'НЕ СДАН ❌'}</>
              )}
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-purple-950/60 text-purple-300 border border-purple-800/50 flex items-center gap-1.5" title="Шкала наград: 10/10 — +100 EXP, 1-3 ошибки — +75 EXP, 4 ошибки — +50 EXP, >4 ошибок — 0 EXP">
              <Award className="w-4 h-4 text-purple-400 shrink-0" /> Тест: до +100 EXP (100 / 75 / 50 EXP)
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all space-y-3.5 sm:space-y-4 ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-cyan-300 font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  Q{qIdx + 1}
                </span>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {q.question}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optStyle = 'bg-slate-950 sm:bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700';

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-950/80 border-rose-600 text-rose-200 font-medium';
                    } else {
                      optStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3.5 sm:p-4 rounded-xl border text-left text-base transition-all flex items-center justify-between gap-2.5 ${optStyle}`}
                    >
                      <span className="leading-relaxed">{opt}</span>
                      {submitted ? (
                        optIdx === q.correctIndex ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : isSelected && !isCorrect ? (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        ) : null
                      ) : isSelected ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="sm:ml-10 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm sm:text-base text-slate-100 space-y-1.5">
                  <span className="font-bold text-cyan-400 block text-xs sm:text-sm uppercase tracking-wider">
                    Пояснение эксперта:
                  </span>
                  <p className="text-slate-100 leading-relaxed text-sm sm:text-base">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {studentSub?.mentorComment && (
        <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-sm sm:text-base text-purple-200 space-y-1.5">
          <div className="font-bold flex items-center gap-2 text-purple-300">
            <MessageSquare className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Персональная Рекомендация Ментора:</span>
          </div>
          <p className="text-slate-100 leading-relaxed sm:pl-6">{studentSub.mentorComment}</p>
        </div>
      )}

      <div className="p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-slate-950 sm:bg-transparent border border-slate-800 sm:border-0 pt-3 sm:pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
              Object.keys(selectedAnswers).length === questions.length
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20 cursor-pointer'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Проверить Ответы ({Object.keys(selectedAnswers).length}/{questions.length})</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {isPassed ? (
              <button
                disabled
                className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-emerald-950/60 text-emerald-300 font-bold text-sm sm:text-base flex items-center gap-2 border border-emerald-800/60 cursor-not-allowed opacity-90"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Тест успешно сдан (пересдача заблокирована)</span>
              </button>
            ) : canRetry ? (
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Пройти Заново (осталось пересдач: {retriesLeft})</span>
                </button>
                <span className="text-sm text-amber-300 font-medium">
                  Использовано попыток: {retryCount} из {MAX_RETRIES}
                </span>
              </div>
            ) : (
              <div className="space-y-1.5 w-full">
                <button
                  disabled
                  className="w-full sm:w-auto justify-center px-5 py-3 rounded-xl bg-rose-950/40 text-rose-300/80 font-bold text-sm sm:text-base flex items-center gap-2 border border-rose-800/40 cursor-not-allowed opacity-80"
                >
                  <Lock className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>Кнопка «Пройти Заново» заблокирована (0 попыток)</span>
                </button>
                <p className="text-sm text-rose-400/90 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  Лимит пересдач исчерпан (максимум {MAX_RETRIES} пересдачи). Обратитесь к Ментору для разблокировки.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Результаты теста и разбор автоматически отправлены вашему Ментору</span>
        </div>
      </div>

      {/* Форма сдачи отчета по тесту Ментору с прикреплением файлов и ссылок */}
      <div className="pt-2">
        <InlineTestSubmission lessonId={lessonId} testTitle={lessonTitle} />
      </div>
    </div>
  );
};
