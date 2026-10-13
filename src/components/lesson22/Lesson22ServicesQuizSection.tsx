import React, { useState } from 'react';
import {
  CheckCircle2,
  Trophy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson22ServicesQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ✅ TEST — «Проверь себя: NotebookLM, Pomelli и Gamma» (5 вопросов)
  const questions = [
    {
      id: 1,
      q: '1. Для чего лучше всего подходит NotebookLM?',
      options: [
        { id: 'a', text: 'A) Для изучения материалов, которые ты сам(а) загрузил(а), с ответами по источникам', isCorrect: true },
        { id: 'b', text: 'B) Для игры в шахматы', isCorrect: false },
        { id: 'c', text: 'C) Для редактирования видео', isCorrect: false },
        { id: 'd', text: 'D) Для скачивания музыки', isCorrect: false }
      ],
      explanation: 'NotebookLM читает загруженные тобой источники и отвечает на вопросы строго по ним с указанием ссылок-цитат.'
    },
    {
      id: 2,
      q: '2. Что делает Pomelli?',
      options: [
        { id: 'a', text: 'A) Создаёт рекламные материалы в стиле бизнеса по адресу его сайта', isCorrect: true },
        { id: 'b', text: 'B) Измеряет скорость интернета', isCorrect: false },
        { id: 'c', text: 'C) Пишет домашние задания за ученика', isCorrect: false },
        { id: 'd', text: 'D) Исправляет ошибки в Telegram', isCorrect: false }
      ],
      explanation: 'Pomelli анализирует публичный сайт бизнеса, формирует Business DNA и создаёт рекламные посты и изображения в стиле бренда.'
    },
    {
      id: 3,
      q: '3. Что делает Gamma?',
      options: [
        { id: 'a', text: 'A) Создаёт презентации из текста или идеи', isCorrect: true },
        { id: 'b', text: 'B) Запускает серверы', isCorrect: false },
        { id: 'c', text: 'C) Ремонтирует компьютеры', isCorrect: false },
        { id: 'd', text: 'D) Ищет места на карте', isCorrect: false }
      ],
      explanation: 'Gamma превращает план или текст в готовую оформленную презентацию, которую можно отредактировать и скачать в PDF или PPTX.'
    },
    {
      id: 4,
      q: '4. Что нужно сделать, чтобы убедиться, что NotebookLM не ошибся?',
      options: [
        { id: 'a', text: 'A) Ничего, ИИ всегда прав', isCorrect: false },
        { id: 'b', text: 'B) Нажать на ссылку-цитату и проверить источник', isCorrect: true },
        { id: 'c', text: 'C) Выключить компьютер', isCorrect: false },
        { id: 'd', text: 'D) Спросить у соседа без проверки', isCorrect: false }
      ],
      explanation: 'В NotebookLM возле каждого факта есть номер ссылки-цитаты — нажав на него, можно проверить точный фрагмент исходного текста.'
    },
    {
      id: 5,
      q: '5. Что такое «Business DNA» в Pomelli?',
      options: [
        { id: 'a', text: 'A) Профиль бизнеса: цвета, шрифты, стиль и тон текста, найденные на сайте', isCorrect: true },
        { id: 'b', text: 'B) Биологический тест', isCorrect: false },
        { id: 'c', text: 'C) Пароль от сайта', isCorrect: false },
        { id: 'd', text: 'D) Название картинки', isCorrect: false }
      ],
      explanation: 'Business DNA («ДНК бизнеса») — это автоматически собранный профиль фирменного стиля сайта (цвета, шрифты, описание и тон общения).'
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    22,
    questions,
    testAnswers,
    setTestAnswers,
    testSubmitted,
    setTestSubmitted,
    setTestScore
  );

  const handleTestOptionClick = (questionId: number, optionId: string) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishTest = () => {
    let score = 0;
    questions.forEach((q) => {
      const selected = testAnswers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect)?.id;
      if (selected === correctOption) {
        score += 1;
      }
    });

    setTestScore(score);
    setTestSubmitted(true);

    if (score >= 4) {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
      addReward(50, `🏆 Тест «NotebookLM, Pomelli и Gamma» сдан (${score}/${questions.length})! (+50 ОП)`);
    }
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestScore(0);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            ✅ TEST • ТЕСТ УРОКА 22
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 10–15 минут · Формат: 5 вопросов с одним правильным ответом
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Проверка знаний и тесты: «Проверь себя: NotebookLM, Pomelli и Gamma»
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Проверь, как ты усвоил назначение каждого из трёх ИИ-помощников, проверку цитат и правила безопасности и честности.
        </p>
      </div>

      {/* Questions List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Вопросы теста (5 вопросов)
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs font-mono">
            {testSubmitted
              ? `Результат: ${testScore} / ${questions.length}`
              : `Отвечено: ${Object.keys(testAnswers).length} / ${questions.length}`}
          </span>
        </div>

        <div className="space-y-4">
          {questions.map((q) => {
            const selected = testAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="text-xs sm:text-sm font-black text-white">
                  {q.q}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.id;
                    let optionStyle =
                      'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (testSubmitted) {
                      if (opt.isCorrect) {
                        optionStyle =
                          'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle =
                          'bg-rose-950/40 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={testSubmitted}
                        onClick={() => handleTestOptionClick(q.id, opt.id)}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt.text}</span>
                        {testSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {testSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-emerald-400">Пояснение:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!testSubmitted ? (
          <button
            onClick={handleFinishTest}
            disabled={Object.keys(testAnswers).length < questions.length}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Проверить ответы ({Object.keys(testAnswers).length}/{questions.length})</span>
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-3">
            <div className="text-xl font-black text-white">
              Результат: {testScore} из {questions.length} правильных ответов!
            </div>
            <button
              onClick={handleResetTest}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
            >
              Пройти тест заново
            </button>
          </div>
        )}
      </div>

      {/* INLINE TEST SUBMISSION */}
      <InlineTestSubmission
        testId="test-22"
        lessonId={22}
        testTitle="Проверь себя: NotebookLM, Pomelli и Gamma"
      />
    </div>
  );
};
