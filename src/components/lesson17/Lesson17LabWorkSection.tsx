import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  Sliders,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Gauge,
  CheckSquare,
  Award,
  Star,
  ExternalLink,
  ChevronRight,
  Code,
  Globe,
  Bug,
  FolderGit2,
  Send,
  Trophy,
  Share2,
  Eye,
  Plus,
  Trash2,
  RotateCcw,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson17LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Prototype Type Selection
  const [prototypeType, setPrototypeType] = useState<'todo' | 'quiz'>('todo');

  // Step 2: Formula Inputs
  const [formulaData, setFormulaData] = useState({
    user: 'Ученик 8 класса, готовящийся к олимпиаде',
    input: 'Ввод названия новой темы или задачи в текстовое поле + кнопка "Добавить"',
    logic: 'Проверяет на пустоту, создаёт объект {id, text, completed: false} и обновляет список',
    data: 'Хранит массив задач в состоянии React (State) и сохраняет в LocalStorage браузера',
    result: 'Новая интерактивная строка с чекбоксом, счётчик невыполненных задач и зачёркивание текста'
  });

  // Step 3: Prompt Constructor
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const generatedAiPrompt = `Создай простое веб-приложение: ${prototypeType === 'todo' ? 'интерактивный To-Do список задач' : 'мини-квиз викторина на 3 вопроса'}.
Пользователь: ${formulaData.user}.
Он может: ${formulaData.input}.
Приложение должно: ${formulaData.logic}. Сохранять данные: ${formulaData.data}.
Результат: ${formulaData.result}.
Стиль интерфейса: тёмно-синий фон (#0a0f1d), неоновый бирюзовый акцент (#22d3ee), крупные кнопки от 44px для удобства на сенсорных экранах, плавные CSS-переходы. Чистый HTML, CSS и Vanilla JavaScript в одном файле.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedAiPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Step 4: Live Interactive Sandbox Prototype
  // To-Do Sandbox State
  const [todos, setTodos] = useState([
    { id: 1, text: 'Понять формулу User → Input → Logic → Data → Result', completed: true },
    { id: 2, text: 'Собрать первый прототип в Google AI Studio', completed: false },
    { id: 3, text: 'Протестировать сохранение состояния без перезагрузки', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [todoFilter, setTodoFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const item = {
      id: Date.now(),
      text: newTodoText.trim(),
      completed: false
    };
    setTodos(prev => [item, ...prev]);
    setNewTodoText('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (todoFilter === 'active') return !t.completed;
    if (todoFilter === 'completed') return t.completed;
    return true;
  });

  // Mini-Quiz Sandbox State
  const quizQuestions = [
    {
      q: '1. Чем Web App отличается от обычного сайта?',
      options: ['Ничем', 'Позволяет взаимодействовать и сохранять данные', 'Только цветом'],
      correct: 1
    },
    {
      q: '2. Из скольких частей состоит формула любого приложения?',
      options: ['2 части (Input/Output)', '3 части (Код/Стиль/База)', '5 частей (User/Input/Logic/Data/Result)'],
      correct: 2
    },
    {
      q: '3. Что такое PWA (Progressive Web App)?',
      options: ['Сайт, который можно установить на телефон без магазина', 'Язык программирования', 'Игровой сервер'],
      correct: 0
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const calculateQuizScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  // Step 4 Reward claim
  const [sandboxXpClaimed, setSandboxXpClaimed] = useState(false);
  const handleClaimSandboxXp = () => {
    if (sandboxXpClaimed) return;
    setSandboxXpClaimed(true);
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } });
    addReward(75, '💻 Лаборатория: интерактивный прототип запущен и протестирован (+75 ОП)!');
  };

  // Step 5: User Testing Checklist
  const [testChecks, setTestChecks] = useState({
    canInput: true,
    dataPersists: false,
    resultClear: false
  });

  const allTestsPassed = testChecks.canInput && testChecks.dataPersists && testChecks.resultClear;
  const [testRewardClaimed, setTestRewardClaimed] = useState(false);

  const handleClaimTestReward = () => {
    if (testRewardClaimed || !allTestsPassed) return;
    setTestRewardClaimed(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    addReward(25, '🧪 Чек-лист тестирования 3/3 пройден (+25 ОП)!');
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-teal-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/40">
              УРОВЕНЬ 4 • ЛАБОРАТОРИЯ
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/40">
              ⏱ 40–70 мин · до +150 ОП
            </span>
          </div>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            Открыть Google AI Studio
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Сборка первого прототипа: To-Do List или Mini-Quiz
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
            От замысла к живому софту за 5 шагов. Мы не просто пишем код: мы формулируем задачу для ИИ, проверяем логику приложения и тестируем его как реальный пользователь.
          </p>
        </div>
      </div>

      {/* STEP 1: SELECT PROTOTYPE TYPE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center font-mono font-bold">1</span>
            🧪 Шаг 1 — Выбери тип прототипа (3 мин)
          </h3>
          <span className="text-xs text-slate-400">Определись с функционалом</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => {
              setPrototypeType('todo');
              setFormulaData({
                user: 'Школьник или студент с плотным графиком',
                input: 'Текст новой задачи + кнопка "Добавить"',
                logic: 'Валидация строки, генерация ID, переключение флага completed',
                data: 'Сохранение списка объектов в State и LocalStorage',
                result: 'Интерактивный список дел с прогресс-баром и фильтрами'
              });
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              prototypeType === 'todo'
                ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400/40'
                : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">✅</span>
              {prototypeType === 'todo' && <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Выбрано</span>}
            </div>
            <h4 className="font-bold text-white text-base">To-Do List (Список задач)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Классическое интерактивное приложение. Пользователь вводит задачи, отмечает выполненные, удаляет ненужные и видит актуальный прогресс.
            </p>
          </div>

          <div
            onClick={() => {
              setPrototypeType('quiz');
              setFormulaData({
                user: 'Любознательный школьник, проверяющий свои знания',
                input: 'Клик по одному из вариантов ответа (кнопка или радио-метка)',
                logic: 'Сравнение ID выбранного варианта с правильным ответом и подсчёт баллов',
                data: 'Хранение текущего номера вопроса и счётчика очков',
                result: 'Цветовая индикация верности ответа и итоговая карточка с результатами'
              });
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
              prototypeType === 'quiz'
                ? 'bg-teal-950/50 border-teal-400 ring-2 ring-teal-400/40'
                : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">❓</span>
              {prototypeType === 'quiz' && <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">Выбрано</span>}
            </div>
            <h4 className="font-bold text-white text-base">Mini-Quiz (Квиз на 3 вопроса)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Интерактивная игра-тест. Мгновенная проверка ответов, подсчёт очков и итоговая шкала знаний по теме урока.
            </p>
          </div>
        </div>
      </div>

      {/* STEP 2: FILL THE FORMULA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 text-xs flex items-center justify-center font-mono font-bold">2</span>
          🧪 Шаг 2 — Заполни формулу приложения (7 мин)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-cyan-300">USER (Кто пользователь?):</label>
            <input
              type="text"
              value={formulaData.user}
              onChange={(e) => setFormulaData({ ...formulaData, user: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-teal-300">INPUT (Что он вводит / куда нажимает?):</label>
            <input
              type="text"
              value={formulaData.input}
              onChange={(e) => setFormulaData({ ...formulaData, input: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-indigo-300">LOGIC (Какое правило и логика срабатывают?):</label>
            <input
              type="text"
              value={formulaData.logic}
              onChange={(e) => setFormulaData({ ...formulaData, logic: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-purple-300">DATA (Где и как сохраняется состояние?):</label>
            <input
              type="text"
              value={formulaData.data}
              onChange={(e) => setFormulaData({ ...formulaData, data: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="font-bold text-emerald-300">RESULT (Что видит пользователь в итоге?):</label>
            <input
              type="text"
              value={formulaData.result}
              onChange={(e) => setFormulaData({ ...formulaData, result: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* STEP 3: ASSEMBLE AI PROMPT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-mono font-bold">3</span>
            🧪 Шаг 3 — Собери запрос для ИИ (5 мин)
          </h3>
          <button
            onClick={handleCopyPrompt}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Скопировано в буфер!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Скопировать готовый промпт
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {generatedAiPrompt}
        </div>
        <p className="text-xs text-slate-400 italic">
          💡 Вставь этот промпт в Google AI Studio, сгенерируй код и посмотри, как модель реализует формулу шаг за шагом.
        </p>
      </div>

      {/* STEP 4: LIVE SANDBOX SIMULATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/40 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              ШАГ 4 • ⏱ 15 МИН • 🎁 +75 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Play className="w-5 h-5 text-cyan-400" />
              🧪 Шаг 4 — Интерактивная песочница работающего прототипа
            </h3>
          </div>
          <button
            onClick={handleClaimSandboxXp}
            disabled={sandboxXpClaimed}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {sandboxXpClaimed ? (
              <>
                <Check className="w-4 h-4" />
                +75 ОП Начислено!
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                Зачесть прототип (+75 ОП)
              </>
            )}
          </button>
        </div>

        {/* Sandbox Content Switcher */}
        {prototypeType === 'todo' ? (
          /* TO-DO SANDBOX */
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="font-black text-white text-base">To-Do App Simulator</h4>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                Задач: {todos.length} · Выполнено: {todos.filter(t => t.completed).length}
              </span>
            </div>

            {/* Input Form */}
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Введи новую задачу..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Добавить
              </button>
            </form>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {(['all', 'active', 'completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTodoFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    todoFilter === f
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'Все' : f === 'active' ? 'В работе' : 'Сделано'}
                </button>
              ))}
            </div>

            {/* Todo List Items */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    todo.completed
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-600 focus:ring-cyan-400"
                    />
                    <span className={`text-xs sm:text-sm ${todo.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {todo.text}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* QUIZ SANDBOX */
          <div className="p-6 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                <h4 className="font-black text-white text-base">Mini-Quiz Simulator (3 Вопроса)</h4>
              </div>
              {quizSubmitted && (
                <span className="text-xs font-mono font-bold text-teal-300 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
                  Результат: {calculateQuizScore()} из 3 верных
                </span>
              )}
            </div>

            <div className="space-y-4">
              {quizQuestions.map((item, qIdx) => (
                <div key={qIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-xs sm:text-sm">{item.q}</div>
                  <div className="space-y-1.5">
                    {item.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = item.correct === optIdx;
                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                        else if (isSelected) btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else if (isSelected) {
                        btnStyle = 'bg-teal-950/60 border-teal-400 text-teal-200 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < 3 || quizSubmitted}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50"
              >
                Проверить ответы
              </button>
              {quizSubmitted && (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Пройти заново
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* STEP 5: REAL USER TESTING CHECKLIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-extrabold text-purple-400 font-mono uppercase tracking-widest">
              ШАГ 5 • ⏱ 10 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-purple-400" />
              🧪 Шаг 5 — Протестируй как настоящий пользователь
            </h3>
          </div>
          <button
            onClick={handleClaimTestReward}
            disabled={testRewardClaimed || !allTestsPassed}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-40"
          >
            {testRewardClaimed ? (
              <>
                <Check className="w-4 h-4" />
                +25 ОП Получено!
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                Зачесть тестирование (+25 ОП)
              </>
            )}
          </button>
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={testChecks.canInput}
              onChange={() => setTestChecks({ ...testChecks, canInput: !testChecks.canInput })}
              className="w-4 h-4 rounded text-purple-500 bg-slate-900 border-slate-700 focus:ring-purple-400"
            />
            <span className="text-slate-200">
              ☐ Могу добавить задачу / ответить на вопрос без зависания интерфейса
            </span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={testChecks.dataPersists}
              onChange={() => setTestChecks({ ...testChecks, dataPersists: !testChecks.dataPersists })}
              className="w-4 h-4 rounded text-purple-500 bg-slate-900 border-slate-700 focus:ring-purple-400"
            />
            <span className="text-slate-200">
              ☐ Данные не пропадают при взаимодействии и кликах по кнопкам
            </span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={testChecks.resultClear}
              onChange={() => setTestChecks({ ...testChecks, resultClear: !testChecks.resultClear })}
              className="w-4 h-4 rounded text-purple-500 bg-slate-900 border-slate-700 focus:ring-purple-400"
            />
            <span className="text-slate-200">
              ☐ Результат показывается понятно (счётчик обновляется, карточки наглядны)
            </span>
          </label>
        </div>
      </div>

      {/* FORMAL LAB SUBMISSION FORM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача лабораторной работы в систему
        </h3>
        <InlineLabSubmission
          labId={17}
          lessonTitle="Миссия 17: App Builder — Прототип To-Do или Quiz"
        />
      </div>
    </div>
  );
};
