import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { LESSON_QUIZZES } from '../../data/lessonQuizzesData';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeImg from '../../assets/images/lesson14_badge_scroll_storyteller_1790163732349.jpg';

export const Lesson14QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // Questions for lesson 10 (Scroll Storyteller)
  const questions = LESSON_QUIZZES[10] || [];

  // Selected options state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useLessonQuizPersistence(
    10,
    questions,
    selectedAnswers,
    setSelectedAnswers,
    isSubmitted,
    setIsSubmitted
  );

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const isPassed = isSubmitted && score >= 4;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (score >= 4 && !rewardClaimed) {
      setRewardClaimed(true);
      unlockBadge('b_scroll_storyteller');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-12 text-slate-100 w-full pb-16">
      {/* Header Level 7 */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                УРОВЕНЬ 7 • 87–90 МИНУТ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                🏆 НОВЫЙ РАНГ: SCROLL STORYTELLER
              </h2>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
            Награда: +50 ОП + Бейдж
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Ответь на 5 контрольных вопросов по скрорителлингу, подтверди квалификацию и получи официальный академический бейдж в портфолио!
        </p>
      </div>

      {/* Badge Presentation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/60 border-2 border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 bg-slate-950 flex items-center justify-center p-2">
            <img
              src={badgeImg}
              alt="Бейдж Scroll Storyteller"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-black uppercase">
            LVL 14
          </div>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-400/30">
              ОФИЦИАЛЬНЫЙ СЕРТИФИЦИРОВАННЫЙ БЕЙДЖ
            </span>
            {isPassed && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                РАЗБЛОКИРОВАН
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            SCROLL STORYTELLER
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Присваивается за освоение скрорителлинга, построение сюжетной дуги из 4 сцен, управление темпом и внедрение индикатора прогресса на живом веб-сайте.
          </p>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCorrect = isSubmitted && selectedAnswers[idx] === q.correctIndex;
          const isWrong = isSubmitted && selectedAnswers[idx] !== q.correctIndex;

          return (
            <div
              key={q.id || idx}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-900/90 border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/40'
                    : 'border-rose-500/50 shadow-lg shadow-rose-950/40'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Вопрос {idx + 1} из {questions.length}</span>
                </div>

                {isSubmitted && (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Верно (+10 ОП)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Ошибка
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {q.question}
              </h4>

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[idx] === optIdx;
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(idx, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  💡 <strong className="text-white">Пояснение:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Control Buttons & Score banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          {isSubmitted ? (
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ
              </span>
              <h3 className="text-2xl font-black text-white">
                Правильных ответов: <span className={score >= 4 ? 'text-emerald-400' : 'text-amber-400'}>{score}</span> из {questions.length}
              </h3>
              <p className="text-xs text-slate-300">
                {score >= 4
                  ? '🎉 Великолепно! Ты полностью овладел механикой Scrollytelling!'
                  : 'Почти получилось! Освежи шпаргалку и попробуй ещё раз.'}
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                ПРОХОДНОЙ БАЛЛ: 4 ИЗ 5
              </span>
              <h4 className="text-lg font-bold text-white">
                Готов сдать рубежный тест?
              </h4>
              <p className="text-xs text-slate-400">
                Ответь на все 5 вопросов перед отправкой.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSubmitted ? (
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Пройти заново</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Завершить тест и получить бейдж</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
