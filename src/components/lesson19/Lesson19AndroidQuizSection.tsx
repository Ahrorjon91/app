import React, { useState } from 'react';
import {
  Trophy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson19AndroidQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // ✅ TEST — Проверочный тест по Уроку 19 (5 вопросов)
  const quizQuestions = [
    {
      id: 1,
      q: 'Вопрос 1. Что нужно обязательно переключить в Google AI Studio (раздел Build), чтобы создать именно мобильное приложение, а не сайт?',
      options: [
        'A) Язык браузера на китайский',
        'B) Платформу с Web на Android (Android App)',
        'C) Яркость монитора',
        'D) Звук на компьютере'
      ],
      correct: 1,
      explanation: 'В разделе Build → New App необходимо переключить платформу с Web на Android (или выбрать Android App в меню Platforms).'
    },
    {
      id: 2,
      q: 'Вопрос 2. Что лучше всего написать в самом первом промпте для создания приложения?',
      options: [
        'A) Только одно слово: «Приложение»',
        'B) Название приложения, для кого оно, 3–4 главные функции и чистый мобильный стиль (Material 3)',
        'C) Сразу 50 сложных функций и 20 экранов в одном предложении',
        'D) Случайный набор букв'
      ],
      correct: 1,
      explanation: 'Хороший первый промпт включает 4 понятных пункта: что это за приложение, для кого оно, 3–4 главные функции и стиль (Jetpack Compose / Material 3).'
    },
    {
      id: 3,
      q: 'Вопрос 3. Для чего в промпте упоминают Jetpack Compose и Material 3?',
      options: [
        'A) Это названия компьютерных игр',
        'B) Это современные инструменты и стиль оформления для аккуратных Android-приложений',
        'C) Это платные подписки',
        'D) Это программы для монтажа видео'
      ],
      correct: 1,
      explanation: 'Jetpack Compose — современный способ рисовать экраны на Android, а Material 3 — фирменный стиль кнопок, карточек и цветов в Android.'
    },
    {
      id: 4,
      q: 'Вопрос 4. Что такое окно Preview (Предпросмотр) в Google AI Studio?',
      options: [
        'A) Рекламный баннер',
        'B) Виртуальный экран телефона в браузере, где можно нажимать кнопки и проверять работу приложения',
        'C) Папка корзины на компьютере',
        'D) Чат с одноклассниками'
      ],
      correct: 1,
      explanation: 'Preview — это виртуальный экран телефона прямо в браузере, позволяющий сразу протестировать экраны и кнопки без установки.'
    },
    {
      id: 5,
      q: 'Вопрос 5. Ты заметил, что кнопка «Добавить» перекрывает нижнее меню. Как лучше всего попросить ИИ это исправить?',
      options: [
        'A) Написать: «Удали всё приложение и сделай заново»',
        'B) Написать короткий промпт: «Подними кнопку добавления немного выше, чтобы она не закрывала нижнюю панель»',
        'C) Ничего не делать, так и оставить',
        'D) Перезагрузить компьютер 5 раз'
      ],
      correct: 1,
      explanation: 'Короткий и точечный промпт исправляет конкретную проблему с кнопкой, не ломая остальной интерфейс.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useLessonQuizPersistence(
    19,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  const handleGradeQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) return;
    setQuizSubmitted(true);
    const score = calculateScore();

    if (score >= 4) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 } });
      unlockBadge('ai-engineer-19');
      addReward(50, `🏆 Тест Урока 19 успешно сдан (${score}/${quizQuestions.length})! (+50 ОП)`);
    }
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            ✅ TEST • ПРОВЕРОЧНЫЙ ТЕСТ ПО УРОКУ 19
          </span>
          <span className="text-xs text-slate-400 font-mono">
            5 вопросов с выбором одного правильного ответа
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Проверка знаний и тесты: Создаём своё первое Android-приложение
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Проверь, как ты усвоил создание Android-приложений в Google AI Studio, работу с окном Preview и правила коротких итераций.
        </p>
      </div>

      {/* Основной тест (5 вопросов) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              ✅ Проверочный тест по Уроку 19 (5 вопросов)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {quizSubmitted
              ? `Результат: ${calculateScore()} / ${quizQuestions.length}`
              : `Отвечено: ${Object.keys(selectedAnswers).length} / ${quizQuestions.length}`}
          </span>
        </div>

        <div className="space-y-5">
          {quizQuestions.map((q, qIdx) => {
            const isCorrect = selectedAnswers[qIdx] === q.correct;
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-white text-xs sm:text-sm">
                  {q.q}
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (optIdx === q.correct) {
                        optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      } else {
                        optStyle = 'bg-slate-900/40 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-emerald-950 border-emerald-400 text-emerald-200 font-bold ring-1 ring-emerald-400';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        disabled={quizSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed mt-2">
                    💡 <strong>Пояснение:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleGradeQuiz}
            disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            Проверить ответы ({Object.keys(selectedAnswers).length}/{quizQuestions.length})
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-2">
            <div className="text-base font-bold text-white">
              Результат теста: {calculateScore()} из {quizQuestions.length}
            </div>
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setSelectedAnswers({});
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
            >
              Пройти тест заново
            </button>
          </div>
        )}
      </div>

      {/* СДАЧА ОТЧЕТА ПО ТЕСТАМ МЕНТОРУ */}
      <div className="pt-2">
        <InlineTestSubmission
          lessonId={19}
          testId="LESSON_19"
          testTitle="Урок 19: Проверка знаний и тесты (Android-приложение)"
        />
      </div>
    </div>
  );
};
