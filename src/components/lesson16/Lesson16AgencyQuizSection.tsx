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

export const Lesson16AgencyQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1601,
      question: '1. Какое главное правило честности нужно соблюдать при создании демо-сайта для реального бизнеса?',
      options: [
        'A) Придумать 100 восторженных отзывов и 25 лет опыта для красоты',
        'B) Использовать только реальные открытые данные бизнеса и НЕ выдумывать фейковые отзывы, награды, рейтинги или сотрудников',
        'C) Скопировать чужой адрес из другого города',
        'D) Написать неправдивые скидки 99%'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. В демо-сайте для реального бизнеса мы используем только настоящие данные (название, услуги, адрес, часы работы) и никогда не выдумываем отзывы или награды.'
    },
    {
      id: 1602,
      question: '2. Какие данные нужно собрать на Google Maps перед тем, как заполнять Мастер-промпт?',
      options: [
        'A) Название бизнеса, тип услуг, город и адрес, телефон/WhatsApp и режим работы',
        'B) Только цвет соседнего здания',
        'C) Пароль от Wi-Fi кафе',
        'D) Прогноз погоды на месяц'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Чёткая карточка данных бизнеса (название, ниша, адрес, контакты, часы работы и услуги) — основа качественного демо-сайта.'
    },
    {
      id: 1603,
      question: '3. Какие главные кнопки обязательно должны работать на сайте для местного бизнеса?',
      options: [
        'A) Кнопки без ссылок, которые ничего не делают',
        'B) Понятные кнопки целевого действия: «Позвонить», «Написать в WhatsApp / Telegram» и «Как проехать» (маршрут)',
        'C) Кнопка закрытия браузера',
        'D) Только кнопка смены шрифта'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. Для местного бизнеса самое важное — чтобы клиент мог в один клик позвонить, написать в мессенджер или построить маршрут.'
    },
    {
      id: 1604,
      question: '4. Как правильно улучшать готовый сайт с помощью дополнительных промптов (реальные фото, отзывы, премиум-дизайн)?',
      options: [
        'A) Пошагово: просить ИИ точечно обновить нужный блок (фото, отзывы или визуал), сохраняя рабочими макет и все кнопки контактов',
        'B) Каждый раз удалять весь проект и начинать с нуля',
        'C) Убрать с сайта адрес и телефон',
        'D) Сделать текст нечитаемым на телефоне'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Итеративное улучшение позволяет по очереди добавить реальные фото, блок доверия и премиальный стиль, не ломая структуру сайта.'
    },
    {
      id: 1605,
      question: '5. Какое правило безопасности и этики действует для учеников при общении с владельцами бизнеса?',
      options: [
        'A) Писать ночью по 20 сообщений подряд и требовать оплату',
        'B) Общаться только с разрешения и вместе с родителями или наставником, вежливо предлагать посмотреть демо-превью и спокойно принимать любой ответ',
        'C) Публиковать свой домашний адрес и личные данные в интернете',
        'D) Спорить, если владельцу сейчас не нужен сайт'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. Любые контакты с реальными заказчиками проводятся только с согласия взрослых (родителей/наставника), вежливо и без навязчивости.'
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    16,
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
    addReward(score * 10, `✅ Тест Урока 16 завершён: ${score}/${quizQuestions.length}!`);
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
    <div className="space-y-8 text-slate-800 dark:text-slate-100 w-full pb-12">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-700 p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-200" />
          ✅ TEST — Тест · Урок 16
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          «Проверь себя: мини-агентство и сайты для реального бизнеса»
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
          <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 font-bold text-xs font-mono">
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
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400';
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
                        'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-950 dark:text-indigo-100';
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
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
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
                      ? 'Отлично! Ты готов(а) создавать честные и качественные демо-сайты для реальных бизнесов.'
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
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Проверить ответы
              </button>
            </>
          )}
        </div>
      </div>

      {/* СДАЧА ОТЧЕТА ПО ТЕСТАМ МЕНТОРУ */}
      <div className="pt-2">
        <InlineTestSubmission
          lessonId={16}
          testId="LESSON_16"
          testTitle="Урок 16: Проверка знаний и тесты (Мини-агентство)"
        />
      </div>
    </div>
  );
};

