import React, { useState } from 'react';
import {
  Award,
  Bug,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Terminal,
  Wrench,
  XCircle
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson7QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 1. DEBUG CHALLENGE Diagnostic (4 Cases)
  const [debugCasesSolved, setDebugCasesSolved] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const handleSolveCase = (id: number) => {
    if (!debugCasesSolved[id]) {
      setDebugCasesSolved((prev) => ({ ...prev, [id]: true }));
      addReward(25, `🛠️ Диагностика #${id} завершена! Баг локализован и исправлен! (+25 XP)`);
    }
  };

  // 2. 90-second Speed Challenge (3/3)
  const [speedTimer, setSpeedTimer] = useState<number>(90);
  const [isSpeedRunning, setIsSpeedRunning] = useState<boolean>(false);
  const [speedAnswers, setSpeedAnswers] = useState({
    q1: false,
    q2: false,
    q3: false
  });
  const [speedCompleted, setSpeedCompleted] = useState<boolean>(false);

  const handleStartSpeedTest = () => {
    setIsSpeedRunning(true);
    setSpeedTimer(90);
    const interval = setInterval(() => {
      setSpeedTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSpeedRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleToggleSpeedAnswer = (key: 'q1' | 'q2' | 'q3') => {
    const updated = { ...speedAnswers, [key]: !speedAnswers[key] };
    setSpeedAnswers(updated);
    if (updated.q1 && updated.q2 && updated.q3 && !speedCompleted) {
      setSpeedCompleted(true);
      addReward(50, '⚡ Блиц 3/3 по архитектуре HTML + CSS + JS пройден! (+50 XP)');
    }
  };

  // 3. Final 5-Question Quiz
  const quizQuestions = [
    {
      id: 1,
      question: '1. Как распределяются три роли в веб-разработке согласно миссии Урока 7?',
      options: [
        { key: 'A', text: 'HTML = цвет, CSS = клики, JavaScript = текст' },
        {
          key: 'B',
          text: 'HTML = structure (структура), CSS = appearance (внешний вид), JavaScript = behavior (поведение)'
        },
        { key: 'C', text: 'Все три языка отвечают только за генерацию картинок' },
        { key: 'D', text: 'JavaScript полностью заменяет HTML и CSS' }
      ],
      correct: 'B',
      explanation:
        'Правильный ответ B! HTML задаёт семантическую структуру (index.html), CSS отвечает за внешний вид (style.css), а JavaScript — за поведение и интерактивность (script.js).'
    },
    {
      id: 2,
      question:
        '2. Какой промпт мы используем на Шаге 3 (STEP 3 — First Prompt) в Google AI Studio Build Mode?',
      options: [
        { key: 'A', text: 'Make a random site with 15 external frameworks' },
        {
          key: 'B',
          text: 'Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS.'
        },
        { key: 'C', text: 'Write only backend SQL tables' },
        { key: 'D', text: 'Draw one icon of a car' }
      ],
      correct: 'B',
      explanation:
        'Правильный ответ B! Этот промпт соединяет UX-макет из Google Stitch (Урок 5) с чистой архитектурой HTML, CSS и JS (Урок 6) без лишних библиотек.'
    },
    {
      id: 3,
      question:
        '3. Какие три файла ученик должен найти в проекте на Шаге 4 (STEP 4 — Identify files)?',
      options: [
        { key: 'A', text: 'image.png, audio.mp3, movie.mp4' },
        { key: 'B', text: 'index.html, style.css, script.js' },
        { key: 'C', text: 'report.docx, table.xlsx, slides.pptx' },
        { key: 'D', text: 'main.py, app.java, Dockerfile' }
      ],
      correct: 'B',
      explanation:
        'Правильный ответ B! Тройка файлов index.html, style.css и script.js — это фундамент любого классического веб-приложения.'
    },
    {
      id: 4,
      question:
        '4. Какие 6 обязательных секций должны быть на сайте https://www.tesla.com/modelx в Лабораторной работе?',
      options: [
        { key: 'A', text: 'Blog, Forum, Chat, Games, Weather, Music' },
        { key: 'B', text: '1. Vehicles, 2. Energy, 3. Charging, 4. Semi, 5. Discover, 6. Shop' },
        { key: 'C', text: 'Только один пустой экран с логотипом' },
        { key: 'D', text: 'Login, Signup, Settings, Admin, Logs, Logout' }
      ],
      correct: 'B',
      explanation:
        'Правильный ответ B! В LAB мы собираем все 6 разделов: Vehicles, Energy, Charging, Semi, Discover, Shop и футер Tesla © 2026.'
    },
    {
      id: 5,
      question:
        '5. Какой промпт ученик отправляет ИИ в DEBUG CHALLENGE, чтобы исправить broken button, wrong CSS, missing image или JavaScript error?',
      options: [
        { key: 'A', text: 'Delete the whole project and start over' },
        { key: 'B', text: 'Find the bug. Explain what caused it. Fix only the necessary code.' },
        { key: 'C', text: 'Hide all buttons so nobody clicks them' },
        { key: 'D', text: 'Add more random animations' }
      ],
      correct: 'B',
      explanation:
        'Правильный ответ B! Промпт "Find the bug. Explain what caused it. Fix only the necessary code." учит понимать причину бага и чинить код точечно.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  useLessonQuizPersistence(
    7,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    showResults,
    setShowResults
  );

  const handleSelectOption = (qId: number, optionKey: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const correctCount = quizQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;

  return (
    <div className="space-y-8 text-slate-200">
      {/* HEADER */}
      <div className="p-6 rounded-3xl border border-violet-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-violet-400 uppercase tracking-widest">
            <Award className="w-4 h-4 text-violet-400" />
            <span>АТТЕСТАЦИЯ УРОКА 7 · WEBSITE CONTROL CENTER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            3. Проверка знаний, DEBUG CHALLENGE & Квалификационный тест
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Проведи диагностику 4 багов (broken button, wrong CSS, missing image, JavaScript error), пройди 90-секундный блиц и ответь на 5 вопросов.
          </p>
        </div>
        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-violet-600 text-white tracking-wider shadow-lg">
          до +150 XP
        </span>
      </div>

      {/* PART A: 4 BUGS DIAGNOSTIC */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-base">
              Диагностика 4 багов DEBUG CHALLENGE (Find → Explain → Fix)
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
            +25 XP за каждый кейс
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            {
              id: 1,
              tag: 'broken button',
              symptom: 'Кнопка Order Now не реагирует на клик мыши.',
              diagnosis: 'В index.html и script.js не совпадает id кнопки или не навешан addEventListener.'
            },
            {
              id: 2,
              tag: 'wrong CSS',
              symptom: '4 карточки характеристик Model X выстроились в кривой столбик.',
              diagnosis: 'В style.css пропущен display: grid / flex у контейнера .specs-bar.'
            },
            {
              id: 3,
              tag: 'missing image',
              symptom: 'Вместо фото Tesla Model X отображается иконка битого файла.',
              diagnosis: 'Неверный путь в атрибуте src тега <img> в index.html.'
            },
            {
              id: 4,
              tag: 'JavaScript error',
              symptom: 'Красная ошибка Uncaught TypeError в консоли браузера.',
              diagnosis: 'Попытка вызвать метод на null-элементе или коллекции NodeList без forEach.'
            }
          ].map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">Кейс #{c.id}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[10px]">
                    {c.tag}
                  </span>
                </div>
                <p className="text-slate-300">
                  <strong>Симптом:</strong> {c.symptom}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 text-[11px] text-amber-300 border border-slate-800">
                  🔍 <strong>Диагноз:</strong> {c.diagnosis}
                </div>
              </div>
              <button
                onClick={() => handleSolveCase(c.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  debugCasesSolved[c.id]
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{debugCasesSolved[c.id] ? 'Исправлено (+25 XP)' : 'Применить Fix Prompt'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PART B: 90-SECOND SPEED BLITZ */}
      <div className="p-6 rounded-3xl border border-amber-500/40 bg-slate-900/90 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-white text-base">
            ⚡ Быстрое испытание 3/3 (Проверь себя за 90 секунд)
          </h3>
          <button
            onClick={handleStartSpeedTest}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isSpeedRunning ? `Таймер: ${speedTimer}с` : 'Запустить 90с таймер'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => handleToggleSpeedAnswer('q1')}
            className={`p-3.5 rounded-2xl border text-left transition space-y-1.5 cursor-pointer ${
              speedAnswers.q1
                ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-amber-400">
              <span>Блиц 1</span>
              {speedAnswers.q1 && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
            <p className="font-semibold">Назови три роли и три соответствующих файла проекта.</p>
            <p className="text-[11px] text-slate-400">
              Ответ: HTML = structure (index.html), CSS = appearance (style.css), JS = behavior (script.js).
            </p>
          </button>

          <button
            onClick={() => handleToggleSpeedAnswer('q2')}
            className={`p-3.5 rounded-2xl border text-left transition space-y-1.5 cursor-pointer ${
              speedAnswers.q2
                ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-amber-400">
              <span>Блиц 2</span>
              {speedAnswers.q2 && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
            <p className="font-semibold">Назови все 6 секций сайта Tesla Model X из LAB.</p>
            <p className="text-[11px] text-slate-400">
              Ответ: 1. Vehicles, 2. Energy, 3. Charging, 4. Semi, 5. Discover, 6. Shop.
            </p>
          </button>

          <button
            onClick={() => handleToggleSpeedAnswer('q3')}
            className={`p-3.5 rounded-2xl border text-left transition space-y-1.5 cursor-pointer ${
              speedAnswers.q3
                ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-amber-400">
              <span>Блиц 3</span>
              {speedAnswers.q3 && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
            <p className="font-semibold">Как запустить экспортированный из Google AI Studio сайт на ПК?</p>
            <p className="text-[11px] text-slate-400">
              Ответ: Скачать ZIP, распаковать в папку и открыть index.html в браузере или через VS Code Live Server.
            </p>
          </button>
        </div>
      </div>

      {/* PART C: 5-QUESTION QUIZ */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-white text-lg">
            Финальный тест Урока 7 (5 вопросов)
          </h3>
          {showResults && (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить ответы</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const userSelected = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="font-bold text-white text-sm">{q.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = userSelected === opt.key;
                    const isCorrect = q.correct === opt.key;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (showResults) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/70 border-cyan-400 text-white';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`p-3 rounded-xl border text-left text-xs transition flex items-start gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono font-bold text-cyan-400">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-200">
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition cursor-pointer shadow-lg"
          >
            Проверить результаты теста
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <div className="text-sm font-bold text-white">
              Результат: {correctCount} из {quizQuestions.length} правильных ответов!
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
              FULL-STACK VIBE BUILDER (Lv.7)
            </span>
          </div>
        )}

        <InlineTestSubmission
          testId="TEST_7"
          lessonId={7}
          testTitle="Тест #7: Website Control Center — HTML + CSS + JavaScript (Tesla Model X)"
          score={correctCount}
          maxScore={quizQuestions.length}
        />
      </div>
    </div>
  );
};
