import React, { useState } from 'react';
import {
  CheckCircle2,
  Trophy,
  BookOpen,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const Lesson23PortfolioQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const quizQuestions: QuizQuestion[] = [
    {
      id: 2301,
      question: '1. Зачем нужно портфолио?',
      options: [
        'A) Чтобы собрать свои проекты в одном месте и показать их одной ссылкой',
        'B) Чтобы скрыть свои проекты',
        'C) Чтобы сменить пароль',
        'D) Чтобы ускорить интернет'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Портфолио собирает все твои проекты, ссылки и описания в одну удобную витрину.'
    },
    {
      id: 2302,
      question: '2. Что нельзя публиковать в портфолио?',
      options: [
        'A) Названия и описания проектов',
        'B) Домашний адрес, телефон, школу и другие личные данные',
        'C) Ссылки на проекты',
        'D) Скриншоты проектов'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. В публичном портфолио нельзя размещать домашний адрес, телефон, номер школы и класса и другие личные данные.'
    },
    {
      id: 2303,
      question: '3. Что входит в «Паспорт проекта»?',
      options: [
        'A) Название, описание, инструменты, ссылки, скриншот и чему научился(ась)',
        'B) Только цвет фона',
        'C) Только пароль',
        'D) Номер телефона'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Паспорт проекта включает название, что это, инструменты, ссылки «Открыть» и «GitHub», скриншот и чему ты научился(ась).'
    },
    {
      id: 2304,
      question: '4. Как правильно описывать проект?',
      options: [
        'A) Что это → как работает → чему научился(ась)',
        'B) Только «круто»',
        'C) Придумать несуществующие награды',
        'D) Скопировать чужое описание'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Описание строится по формуле из 3 частей: «Что это» → «Как работает» → «Чему научился(ась)».'
    },
    {
      id: 2305,
      question: '5. Что делать с токеном Telegram-бота?',
      options: [
        'A) Опубликовать на сайте',
        'B) Хранить в секрете и никогда не показывать на сайте и скриншотах',
        'C) Отправить друзьям',
        'D) Написать в README'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. Токены и пароли никогда не должны попадать на сайт, в код, в README или на скриншоты.'
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    23,
    quizQuestions,
    testAnswers,
    setTestAnswers,
    testSubmitted,
    setTestSubmitted,
    setTestScore
  );

  const handleSelectOption = (qId: number, idx: number) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const handleSubmitTest = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (testAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setTestScore(score);
    setTestSubmitted(true);
    addReward(score * 10, `✅ Тест Урока 23 завершён: ${score}/${quizQuestions.length}!`);
    if (score >= 4) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestScore(0);
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-200" />
          ✅ TEST — Тест · Урок 23
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          «Проверь себя: повторение курса и портфолио»
        </h2>
        <p className="text-white/90 text-sm sm:text-base">
          <strong>⏱ Время:</strong> 10–15 минут · <strong>Формат:</strong> 5 вопросов с одним правильным ответом
        </p>
      </div>

      {/* QUESTIONS LIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Вопросы теста (5 вопросов)
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-300 font-bold text-xs font-mono">
            {testSubmitted
              ? `Результат: ${testScore} / ${quizQuestions.length}`
              : `Отвечено: ${Object.keys(testAnswers).length} / ${quizQuestions.length}`}
          </span>
        </div>

        <div className="space-y-5">
          {quizQuestions.map((q) => {
            const selected = testAnswers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 space-y-4"
              >
                <h3 className="text-sm sm:text-base font-extrabold">{q.question}</h3>
                <div className="space-y-2.5">
                  {q.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = q.correctIndex === idx;

                    let style =
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400';
                    if (testSubmitted) {
                      if (isCorrect) {
                        style =
                          'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        style =
                          'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      style =
                        'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={testSubmitted}
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition flex items-center justify-between gap-3 ${style}`}
                      >
                        <span className="text-xs sm:text-sm font-medium">{opt}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {testSubmitted && (
                  <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ACTIONS & SCORE */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          {testSubmitted ? (
            <>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-500" />
                <div>
                  <div className="text-lg font-extrabold">
                    Твой результат: {testScore} из {quizQuestions.length}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {testScore >= 4
                      ? 'Отлично! Ты полностью готов(а) к сборке портфолио и показу родителям.'
                      : 'Повтори конспект лекции и попробуй пройти тест ещё раз.'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetTest}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-sm font-bold hover:bg-slate-300 transition"
              >
                Пройти заново
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Отвечено вопросов: <strong>{Object.keys(testAnswers).length}</strong> из {quizQuestions.length}
              </div>
              <button
                type="button"
                onClick={handleSubmitTest}
                disabled={Object.keys(testAnswers).length < quizQuestions.length}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Проверить ответы
              </button>
            </>
          )}
        </div>
      </div>

      {/* INLINE TEST SUBMISSION */}
      <InlineTestSubmission
        testId="test-23"
        lessonId={23}
        testTitle="Проверь себя: повторение курса и портфолио"
      />
    </div>
  );
};
