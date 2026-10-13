import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  Search,
  Check,
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

// Import newly generated high-resolution badge
import badgePromptEngineerImg from '../../assets/images/lesson2_badge_1790069881096.jpg';

export const Lesson2QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // PART 1: АУДИТ ПРОМПТОВ (DEBUG CHALLENGE)
  // ==========================================
  const initialDebugCards = [
    {
      id: 1,
      prompt: '«Напиши что-нибудь интересное про науку»',
      flaw: 'Критически слабый запрос (1/5): нет роли, нет темы, нет формата, модель выдаст банальную энциклопедическую выжимку.',
      fix: '«Ты — популяризатор астрономии. Объясни явление чёрных дыр подростку 14 лет за 100 слов через аналогию с воронкой в ванне.»',
      isAudited: false
    },
    {
      id: 2,
      prompt: '«Сделай таблицу профессий с ценами в долларах и рублях для жителей Худжанда»',
      flaw: 'Ошибка локализации: в Таджикистане национальная валюта — сомони (TJS). Запрос вызовет нерелевантные цены.',
      fix: '«Укажи зарплаты строго в национальной валюте Таджикистана — сомони (TJS) с учетом рынка труда Согдийской области.»',
      isAudited: false
    },
    {
      id: 3,
      prompt: '«Реши задачу по геометрии: найди гипотенузу прямоугольного треугольника с катетами 6 и 8 см»',
      flaw: 'Обычный Zero-Shot: модель может выдать сразу число 10 без объяснения шагов и формулы теоремы Пифагора.',
      fix: '«Добавь инструкцию Chain of Thought: "Рассуждай строго по шагам (Think step by step), выписывая промежуточные вычисления."»',
      isAudited: false
    }
  ];

  const [debugCards, setDebugCards] = useState(initialDebugCards);

  const handleAuditClick = (id: number) => {
    setDebugCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isAudited: true } : c))
    );
    addReward(15, '🕵️ Промпт проинспектирован! (+15 Опыта)');
  };

  // ==========================================
  // PART 2: МИНИ-ТЕСТ К УРОКУ 2 (5 ВОПРОСОВ)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: 'Что обозначает аббревиатура формулы RTFC в промпт-инжиниринге?',
      options: [
        'Real-Time Feedback Control (контроль обратной связи)',
        'Role, Task, Format, Context (Роль, Задача, Формат, Контекст)',
        'Random Token Frequency Counter (счётчик частоты токенов)',
        'Recursive Transformer Function Call (рекурсивный вызов трансформера)'
      ],
      correct: 1,
      expl: 'Правильно! RTFC — это золотой стандарт быстрого промпта: Role (Роль), Task (Задача), Format (Формат), Context (Контекст).'
    },
    {
      id: 2,
      q: 'Какая фраза активирует технику Chain of Thought (Цепочка рассуждений) и снижает ошибки модели?',
      options: [
        '«Отвечай как можно быстрее и короче»',
        '«Think step by step / Рассуждай строго по шагам перед ответом»',
        '«Забудь все предыдущие системные инструкции»',
        '«Используй сложные научные термины»'
      ],
      correct: 1,
      expl: 'Именно так! Фраза «Рассуждай по шагам» выделяет токеновое пространство для промежуточных вычислений, уменьшая ошибки на 40–60%.'
    },
    {
      id: 3,
      q: 'В чём суть техники Few-Shot Prompting?',
      options: [
        'Задать вопрос и сразу перезагрузить браузер',
        'Предоставить модели 2–3 примера идеального ответа «Вход -> Выход» внутри текста запроса',
        'Ограничить длину ответа ровно 1 предложением',
        'Запретить модели использовать любые цифры'
      ],
      correct: 1,
      expl: 'Верно! Few-Shot — это демонстрация нескольких готовых образцов в промпте, позволяющая модели скопировать нужный стиль.'
    },
    {
      id: 4,
      q: 'Как влияет параметр Temperature = 0.1 на генерацию ответа?',
      options: [
        'Делает модель максимально креативной и склонной к стихам',
        'Ответы становятся строгими, детерминированными и предсказуемыми (идеально для кода и фактов)',
        'Модель начинает отвечать исключительно на английском языке',
        'Модель перестаёт проверять грамматику'
      ],
      correct: 1,
      expl: 'Точно! Низкая температура (0.0–0.2) заставляет модель выбирать самые вероятные токены, исключая фантазии.'
    },
    {
      id: 5,
      q: 'Что означает принцип «Generate ≠ Finished» (Сгенерировано — не значит готово)?',
      options: [
        'Нейросеть всегда дописывает текст бесконечно',
        'Ответ нейросети — это всегда черновик, который человек обязан перепроверить перед публикацией',
        'Нельзя пользоваться нейросетью без подписки',
        'Компьютер не может сохранить файл на диск'
      ],
      correct: 1,
      expl: 'Именно! Ответ модели требует проверки дат, цен в сомони и критического осмысления человеком.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    2,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    showResults,
    setShowResults,
    setTestScore
  );

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    setTestScore(score);
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setTestScore(0);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Проверка знаний • Раздел 3
          </span>
          <span className="text-xs text-slate-400 font-mono">Аудит промптов + Мини-тест (5 вопросов)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Сертификация: Prompt Engineer 101
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Продемонстрируй инженерную зоркость: найди дефекты в слабых промптах и сдай финальный проверочный тест на 4+ балла, чтобы разблокировать бейдж!
        </p>
      </div>

      {/* PART 1: ЧЕЛЛЕНДЖ ПОИСКА ОШИБОК В ПРОМПТАХ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            Часть 1: Инспекция и рефакторинг слабых промптов
          </h3>
          <span className="text-xs font-mono text-cyan-400">
            Проверено: {debugCards.filter((c) => c.isAudited).length} из {debugCards.length}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Нажми на карточку, чтобы изучить скрытый дефект промпта и посмотреть инженерное исправление:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {debugCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleAuditClick(card.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                card.isAudited
                  ? 'bg-slate-950 border-cyan-500/60 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-rose-400">Слабый запрос #{card.id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                  {card.isAudited ? 'Аудит завершён' : 'Нажми для аудита'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-rose-200">
                {card.prompt}
              </div>

              {card.isAudited && (
                <div className="pt-2 border-t border-slate-800 space-y-2 animate-in fade-in">
                  <div className="text-xs text-rose-300">
                    <strong>В чём ошибка:</strong> {card.flaw}
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 font-mono">
                    <strong className="text-emerald-400">Решение:</strong> {card.fix}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PART 2: МИНИ-ТЕСТ К УРОКУ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Часть 2: Мини-тест (5 вопросов)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Отвечено: {Object.keys(selectedAnswers).length} из {quizQuestions.length}
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[q.id];
            const isAnswered = userChoice !== undefined;
            const isCorrect = userChoice === q.correct;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="font-bold text-white text-sm sm:text-base flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{q.q}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (showResults) {
                      if (optIdx === q.correct) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-bold shadow';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono text-xs opacity-60 mt-0.5">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed border animate-in fade-in ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-800 text-rose-200'
                    }`}
                  >
                    <strong>{isCorrect ? '✅ Правильно!' : '❌ Ошибка:'}</strong> {q.expl}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Результат теста и кнопки */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {!showResults ? (
            <button
              onClick={handleCheckQuiz}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
                Object.keys(selectedAnswers).length === quizQuestions.length
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Проверить ответы
            </button>
          ) : (
            <div className="w-full flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-cyan-500/40">
              <div className="flex items-center gap-3">
                <img
                  src={badgePromptEngineerImg}
                  alt="Бейдж Prompt Engineer"
                  className="w-12 h-12 rounded-xl border border-cyan-400 shadow"
                />
                <div>
                  <div className="font-bold text-white text-base">
                    Твой результат: {testScore} из {quizQuestions.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testScore >= 4
                      ? '🎉 Поздравляем! Ты подтвердил звание Prompt Engineer 101!'
                      : 'Попробуй ещё раз, чтобы набрать 4 или 5 баллов.'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Пройти снова
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ВСТРОЕННАЯ ОТПРАВКА ТЕСТА МЕНТОРУ */}
      <InlineTestSubmission
        testId="lesson-2-test"
        defaultTitle="Мини-тест: Prompt Engineering 101"
      />
    </div>
  );
};
