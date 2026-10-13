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

export const Lesson21McpQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ✅ TEST — «Проверь себя: MCP и Claude + n8n» (5 вопросов)
  const quizQuestions = [
    {
      id: 1,
      q: '1. Что такое MCP?',
      options: [
        'A) Общий стандарт («разъём»), чтобы подключать ИИ к другим программам',
        'B) Название Telegram-бота',
        'C) Вид процессора',
        'D) Игра'
      ],
      correct: 0,
      explanation: 'MCP (Model Context Protocol) — это общий стандарт («разъём» как USB-C), чтобы подключать ИИ к разным программам и сервисам.'
    },
    {
      id: 2,
      q: '2. Кто в нашей схеме MCP-клиент?',
      options: [
        'A) Claude',
        'B) Telegram',
        'C) Клавиатура',
        'D) Принтер'
      ],
      correct: 0,
      explanation: 'MCP-клиент — это тот, кто отправляет запрос на выполнение действия (в нашем уроке — Claude).'
    },
    {
      id: 3,
      q: '3. Кто в нашей схеме MCP-сервер?',
      options: [
        'A) n8n',
        'B) Монитор',
        'C) Мышка',
        'D) Колонки'
      ],
      correct: 0,
      explanation: 'MCP-сервер — это система, которая умеет выполнять действия и предоставляет инструменты (в нашем уроке — n8n).'
    },
    {
      id: 4,
      q: '4. Что такое tools (инструменты) в MCP?',
      options: [
        'A) Список действий, которые разрешено выполнять (найти, запустить, создать workflow)',
        'B) Молоток и отвёртка',
        'C) Цвета интерфейса',
        'D) Пароли'
      ],
      correct: 0,
      explanation: 'Tools — это перечень разрешённых действий, которые MCP-сервер предоставляет клиенту ИИ.'
    },
    {
      id: 5,
      q: '5. Что нужно включить для каждого workflow, чтобы ИИ мог его использовать?',
      options: [
        'A) Available in MCP',
        'B) Тёмную тему',
        'C) Спящий режим',
        'D) Полный экран'
      ],
      correct: 0,
      explanation: 'Для каждого конкретного workflow в его настройках нужно явно включить опцию Available in MCP.'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useLessonQuizPersistence(
    21,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score += 1;
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) return;
    setQuizSubmitted(true);
    const score = calculateScore();
    if (score >= 4) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
      addReward(50, `🏆 Тест «MCP и Claude + n8n» успешно сдан (${score}/${quizQuestions.length})! (+50 ОП)`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            ✅ TEST • ТЕСТ УРОКА 21
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 10–15 минут · Формат: 5 вопросов с одним правильным ответом
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Проверка знаний и тесты: «Проверь себя: MCP и Claude + n8n»
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Проверь знания о протоколе MCP, ролях клиента и сервера, настройке Available in MCP и правилах безопасности.
        </p>
      </div>

      {/* Questions List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-violet-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Вопросы теста (5 вопросов)
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 font-bold text-xs font-mono">
            {quizSubmitted
              ? `Результат: ${calculateScore()} / ${quizQuestions.length}`
              : `Отвечено: ${Object.keys(quizAnswers).length} / ${quizQuestions.length}`}
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, qIdx) => {
            const selected = quizAnswers[qIdx];
            const isCorrect = selected === q.correct;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="text-xs sm:text-sm font-black text-white">
                  {q.q}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    let optionStyle =
                      'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (optIdx === q.correct) {
                        optionStyle =
                          'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle =
                          'bg-rose-950/40 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'bg-violet-950/40 border-violet-500 text-violet-200 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && optIdx === q.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-violet-400">Пояснение:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(quizAnswers).length < quizQuestions.length}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-black text-sm transition-all shadow-xl disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>Проверить ответы ({Object.keys(quizAnswers).length}/{quizQuestions.length})</span>
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-violet-500/40 text-center space-y-3">
            <div className="text-xl font-black text-white">
              Результат: {calculateScore()} из {quizQuestions.length} правильных ответов!
            </div>
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setQuizAnswers({});
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
        testId="test-21"
        lessonId={21}
        testTitle="Проверь себя: MCP и Claude + n8n"
      />
    </div>
  );
};
