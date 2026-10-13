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

export const Lesson15RoadmapQuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1501,
      question: '1. За что отвечают три главных героя любого сайта: HTML, CSS и JavaScript?',
      options: [
        'A) HTML — скелет и структура страницы, CSS — одежда и стиль (цвета, шрифты), JavaScript — мозг и интерактивность (нажатия кнопок, логика)',
        'B) Все три отвечают только за скорость интернета',
        'C) HTML рисует 3D-игры, а CSS перезагружает компьютер',
        'D) Это названия трёх разных браузеров'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. HTML создаёт каркас (заголовки, кнопки, блоки), CSS отвечает за внешний вид и дизайн, а JavaScript оживляет сайт.'
    },
    {
      id: 1502,
      question: '2. Что хранится в файле package.json и зачем нужна команда npm install?',
      options: [
        'A) В package.json хранятся пароли от почты, а npm install удаляет проект',
        'B) package.json — это паспорт проекта со списком нужных библиотек (пакетов), а команда npm install скачивает их в папку node_modules',
        'C) Это картинка логотипа сайта',
        'D) Команда для выключения монитора'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. В package.json записан список всех нужных проекту библиотек, а npm install автоматически скачивает их в папку node_modules.'
    },
    {
      id: 1503,
      question: '3. Какая команда в терминале запускает сайт локально на твоём компьютере для проверки в браузере?',
      options: [
        'A) npm run dev',
        'B) git delete',
        'C) close window',
        'D) format c:'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Команда npm run dev включает локальный сервер разработки (например, http://localhost:5173/), чтобы ты сразу видел сайт в браузере.'
    },
    {
      id: 1504,
      question: '4. Чем отличается команда npm test от команды npm run build?',
      options: [
        'A) Ничем не отличаются',
        'B) npm test запускает автоматическую проверку (тесты Vitest), а npm run build собирает чистовую оптимизированную версию сайта в папку dist для публикации',
        'C) npm run build удаляет код, а npm test меняет обои рабочего стола',
        'D) Обе команды работают только без компьютера'
      ],
      correctIndex: 1,
      explanation: 'Правильный ответ: B. npm test проверяет, нет ли в проекте ошибок, а npm run build упаковывает проект в готовую для интернета папку dist.'
    },
    {
      id: 1505,
      question: '5. Зачем разработчику связка Git + GitHub + Vercel?',
      options: [
        'A) Git сохраняет историю изменений кода, GitHub хранит проект в облаке, а Vercel автоматически публикует сайт в интернете по красивой ссылке',
        'B) Чтобы играть по сети',
        'C) Чтобы скрыть сайт от всех пользователей',
        'D) Это антивирусные программы'
      ],
      correctIndex: 0,
      explanation: 'Правильный ответ: A. Git делает точки сохранения кода, GitHub служит облачным хранилищем, а Vercel берёт проект из GitHub и делает его доступным по ссылке в интернете.'
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    15,
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
    addReward(score * 10, `✅ Тест Урока 15 завершён: ${score}/${quizQuestions.length}!`);
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
      <div className="rounded-3xl bg-gradient-to-br from-cyan-600 via-sky-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-200" />
          ✅ TEST — Тест · Урок 15
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          «Проверь себя: Дорожная карта Frontend и самостоятельный запуск сайта»
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
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 font-bold text-xs font-mono">
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
                      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400';
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
                        'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-cyan-950 dark:text-cyan-100';
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
                          <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center shrink-0">
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
                      ? 'Отлично! Ты уверенно разбираешься в устройстве проекта, терминале и публикации сайта.'
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
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition shadow-md"
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
          lessonId={15}
          testId="LESSON_15"
          testTitle="Урок 15: Проверка знаний и тесты (Frontend Roadmap)"
        />
      </div>
    </div>
  );
};

