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

export const Lesson20N8nQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ✅ TEST — «Проверь себя: n8n и Telegram-бот» (5 вопросов)
  const quizQuestions = [
    {
      id: 1,
      q: '1. Что такое автоматизация?',
      options: [
        { key: 'A', text: 'Когда компьютер сам выполняет повторяющиеся действия по правилу' },
        { key: 'B', text: 'Когда компьютер выключается' },
        { key: 'C', text: 'Когда человек делает всё вручную' },
        { key: 'D', text: 'Когда интернет работает быстрее' }
      ],
      correctKey: 'A',
      explanation: 'Автоматизация — это выполнение повторяющихся задач компьютером по правилу: «Если случилось событие → то выполни действия».'
    },
    {
      id: 2,
      q: '2. Что такое workflow в n8n?',
      options: [
        { key: 'A', text: 'Один пароль' },
        { key: 'B', text: 'Одна автоматизация целиком, собранная из кубиков-нод' },
        { key: 'C', text: 'Название Telegram-бота' },
        { key: 'D', text: 'Команда терминала' }
      ],
      correctKey: 'B',
      explanation: 'Workflow (воркфлоу) — это вся схема автоматизации целиком, состоящая из соединённых кубиков-нод.'
    },
    {
      id: 3,
      q: '3. Что делает Trigger?',
      options: [
        { key: 'A', text: 'Отвечает за дизайн' },
        { key: 'B', text: 'Определяет, когда запускается workflow' },
        { key: 'C', text: 'Удаляет workflow' },
        { key: 'D', text: 'Меняет токен' }
      ],
      correctKey: 'B',
      explanation: 'Trigger (триггер) — это первый кубик в схеме, который отвечает на вопрос «когда запускаться?» (по кнопке, по расписанию или по событию).'
    },
    {
      id: 4,
      q: '4. Где создают Telegram-бота?',
      options: [
        { key: 'A', text: 'У @BotFather' },
        { key: 'B', text: 'В настройках компьютера' },
        { key: 'C', text: 'На сайте GitHub' },
        { key: 'D', text: 'В Google Maps' }
      ],
      correctKey: 'A',
      explanation: 'Официальный бот @BotFather (с синей галочкой) в Telegram используется для создания новых ботов и получения токенов.'
    },
    {
      id: 5,
      q: '5. Что такое токен бота?',
      options: [
        { key: 'A', text: 'Секретный ключ, как пароль' },
        { key: 'B', text: 'Картинка бота' },
        { key: 'C', text: 'Название чата' },
        { key: 'D', text: 'Номер телефона' }
      ],
      correctKey: 'A',
      explanation: 'Токен бота — это секретный ключ доступа. Кто знает токен, тот управляет ботом, поэтому его нельзя никому показывать.'
    }
  ];

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  useLessonQuizPersistence(
    20,
    quizQuestions,
    userAnswers,
    setUserAnswers,
    showResults,
    setShowResults
  );

  const handleSelectAnswer = (qId: number, optionKey: string) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctKey) score += 1;
    });
    return score;
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score >= 4) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
      addReward(50, `🏆 Тест «n8n и Telegram-бот» успешно пройден (${score}/${quizQuestions.length})! (+50 ОП)`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            ✅ TEST • ТЕСТ УРОКА 20
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 10–15 минут · Формат: 5 вопросов с одним правильным ответом
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Проверка знаний и тесты: «Проверь себя: n8n и Telegram-бот»
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ответь на 5 вопросов по автоматизации, нодам n8n и безопасности токена BotFather.
        </p>
      </div>

      {/* Questions List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Вопросы теста (5 вопросов)
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs font-mono">
            {showResults
              ? `Результат: ${calculateScore()} / ${quizQuestions.length}`
              : `Отвечено: ${Object.keys(userAnswers).length} / ${quizQuestions.length}`}
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const selected = userAnswers[q.id];
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
                    const isSelected = selected === opt.key;
                    let optionStyle =
                      'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (showResults) {
                      if (opt.key === q.correctKey) {
                        optionStyle =
                          'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        optionStyle =
                          'bg-rose-950/40 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'bg-cyan-950/40 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        disabled={showResults}
                        onClick={() => handleSelectAnswer(q.id, opt.key)}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>
                          <strong>{opt.key})</strong> {opt.text}
                        </span>
                        {showResults && opt.key === q.correctKey && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-cyan-400">Пояснение:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showResults ? (
          <button
            onClick={handleCheckAnswers}
            disabled={Object.keys(userAnswers).length < quizQuestions.length}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Проверить ответы ({Object.keys(userAnswers).length}/{quizQuestions.length})</span>
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center space-y-3">
            <div className="text-xl font-black text-white">
              Результат: {calculateScore()} из {quizQuestions.length} правильных ответов!
            </div>
            <button
              onClick={() => {
                setShowResults(false);
                setUserAnswers({});
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
            >
              Пройти тест заново
            </button>
          </div>
        )}
      </div>

      {/* INLINE TEST SUBMISSION */}
      <InlineTestSubmission
        testId="test-20"
        lessonId={20}
        testTitle="Проверь себя: n8n и Telegram-бот"
      />
    </div>
  );
};
