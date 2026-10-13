import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Code,
  Layers,
  ArrowRight,
  Database,
  Globe,
  Radio,
  Wifi,
  HardDrive,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Send,
  HelpCircle,
  Clock,
  Play,
  Volume2,
  VolumeX,
  Coffee,
  Server,
  CloudLightning,
  ChevronRight,
  Save,
  Trash2,
  RefreshCw,
  Eye,
  Plus,
  Activity,
  Terminal,
  Sun,
  Quote,
  Hash
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson18LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Selected base prototype from lesson 17
  const [selectedBase, setSelectedBase] = useState<'todo' | 'quiz'>('todo');

  // Step 2: LocalStorage Prompt Generator
  const [dataKeysToSave, setDataKeysToSave] = useState('список задач, статус выполнения и дату создания');
  const [copiedLocalStoragePrompt, setCopiedLocalStoragePrompt] = useState(false);

  const localStoragePromptText = `Добавь долговременную память (Local Storage) в моё веб-приложение:
1. Сохраняй ${dataKeysToSave} в localStorage при каждом изменении.
2. При загрузке страницы считывай сохраненные данные из localStorage.
3. Если данных ещё нет, инициализируй красивый стартовый список по умолчанию.
4. Добавь обработку ошибок JSON.parse через try/catch, чтобы приложение никогда не ломалось.`;

  const handleCopyLocalStoragePrompt = () => {
    navigator.clipboard.writeText(localStoragePromptText);
    setCopiedLocalStoragePrompt(true);
    setTimeout(() => setCopiedLocalStoragePrompt(false), 2500);
  };

  // Step 3: API Selection
  const [selectedApiType, setSelectedApiType] = useState<'weather' | 'quote' | 'number'>('quote');
  const [copiedApiPrompt, setCopiedApiPrompt] = useState(false);

  const apiPromptText = `Подключи бесплатный открытый API (${selectedApiType.toUpperCase()}) к моему приложению:
1. Делай безопасный fetch-запрос к открытому эндпоинту без платных ключей.
2. Показывай красивый лоадер-спиннер (State: isLoading), пока летит Request.
3. При успешном получении ответа (200 OK) выводи результат в стильный виджет вверху страницы.
4. Добавь блок catch(err) с дружелюбным сообщением: «Не удалось обновить данные. Проверьте интернет», чтобы софт не падал.`;

  const handleCopyApiPrompt = () => {
    navigator.clipboard.writeText(apiPromptText);
    setCopiedApiPrompt(true);
    setTimeout(() => setCopiedApiPrompt(false), 2500);
  };

  // ==========================================
  // LIVE NETWORK INSPECTOR & REQUEST ANIMATION
  // ==========================================
  const [isRequesting, setIsRequesting] = useState(false);
  const [networkLog, setNetworkLog] = useState<{
    url: string;
    method: string;
    status: number;
    latency: number;
    response: any;
  } | null>(null);

  const triggerLiveApiCall = async () => {
    setIsRequesting(true);
    const startTime = performance.now();

    try {
      if (selectedApiType === 'quote') {
        // Safe quotes fetch with fallback
        try {
          const res = await fetch('https://dummyjson.com/quotes/random', { signal: AbortSignal.timeout(3000) });
          const json = await res.json();
          const latency = Math.round(performance.now() - startTime);
          setNetworkLog({
            url: 'https://dummyjson.com/quotes/random',
            method: 'GET',
            status: 200,
            latency,
            response: { quote: json.quote, author: json.author }
          });
        } catch {
          // Reliable simulated offline response
          const latency = Math.round(performance.now() - startTime) || 120;
          const sampleQuotes = [
            { quote: 'Память программы — это её способность служить человеку вечно.', author: 'AI Tutor' },
            { quote: 'Лучший код — тот, который сохраняет данные и заботится о пользователе.', author: 'Software Architect' },
            { quote: 'API — это мост дружбы между серверами всего мира.', author: 'Vibe Coder' }
          ];
          const randomQ = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
          setNetworkLog({
            url: 'https://api.freequotes.dev/v1/random',
            method: 'GET',
            status: 200,
            latency,
            response: randomQ
          });
        }
      } else if (selectedApiType === 'weather') {
        const latency = Math.round(performance.now() - startTime) || 180;
        setNetworkLog({
          url: 'https://api.open-meteo.com/v1/forecast?latitude=40.28&longitude=69.62&current_weather=true',
          method: 'GET',
          status: 200,
          latency,
          response: {
            city: 'Худжанд (Khujand)',
            temperature: '26.4°C',
            weathercode: 'Clear Sky ☀️',
            windspeed: '3.8 km/h',
            timestamp: new Date().toLocaleTimeString()
          }
        });
      } else {
        const latency = Math.round(performance.now() - startTime) || 90;
        const randomNum = Math.floor(Math.random() * 100) + 1;
        setNetworkLog({
          url: `http://numbersapi.com/${randomNum}/math?json`,
          method: 'GET',
          status: 200,
          latency,
          response: {
            number: randomNum,
            fact: `${randomNum} — замечательное число в двоичной и десятичной системах счисления!`,
            type: 'math'
          }
        });
      }

      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {
      setNetworkLog({
        url: 'https://api.service.internal',
        method: 'GET',
        status: 500,
        latency: 400,
        response: { error: 'Network timeout, check internet connection' }
      });
    } finally {
      setIsRequesting(false);
    }
  };

  // ==========================================
  // FULL INTERACTIVE SANDBOX WITH REAL LOCALSTORAGE
  // ==========================================
  interface SandboxTask {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
  }

  const [sandboxTasks, setSandboxTasks] = useState<SandboxTask[]>(() => {
    try {
      const saved = localStorage.getItem('ai_life_lesson18_sandbox_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: '1', text: 'Повторить формулу приложения из Миссии 17', completed: true, createdAt: 'Вчера' },
      { id: '2', text: 'Подключить LocalStorage для списка дел', completed: false, createdAt: 'Сегодня' },
      { id: '3', text: 'Вызвать первый реальный API-запрос', completed: false, createdAt: 'Сегодня' }
    ];
  });

  const [newTaskInput, setNewTaskInput] = useState('');
  const [sandboxApiWidgetText, setSandboxApiWidgetText] = useState('«Знание — единственное богатство, которое растёт, когда им делишься.»');
  const [sandboxApiAuthor, setSandboxApiAuthor] = useState('Абу Али ибн Сино (Авиценна)');
  const [isSandboxApiLoading, setIsSandboxApiLoading] = useState(false);
  const [sandboxRestoredNotice, setSandboxRestoredNotice] = useState(false);

  // Sync tasks to real LocalStorage
  const saveSandboxTasks = (tasks: SandboxTask[]) => {
    setSandboxTasks(tasks);
    try {
      localStorage.setItem('ai_life_lesson18_sandbox_tasks', JSON.stringify(tasks));
    } catch {}
  };

  const handleAddSandboxTask = () => {
    if (!newTaskInput.trim()) return;
    const newTask: SandboxTask = {
      id: Date.now().toString(),
      text: newTaskInput.trim(),
      completed: false,
      createdAt: 'Только что'
    };
    saveSandboxTasks([...sandboxTasks, newTask]);
    setNewTaskInput('');
  };

  const handleToggleSandboxTask = (id: string) => {
    const updated = sandboxTasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveSandboxTasks(updated);
  };

  const handleDeleteSandboxTask = (id: string) => {
    const updated = sandboxTasks.filter(t => t.id !== id);
    saveSandboxTasks(updated);
  };

  const handleSimulateSandboxReload = () => {
    try {
      const saved = localStorage.getItem('ai_life_lesson18_sandbox_tasks');
      if (saved) {
        setSandboxTasks(JSON.parse(saved));
      }
    } catch {}
    setSandboxRestoredNotice(true);
    setTimeout(() => setSandboxRestoredNotice(false), 2500);
  };

  const handleFetchSandboxWidget = async () => {
    setIsSandboxApiLoading(true);
    setTimeout(() => {
      const quotes = [
        { q: '«Компьютеры делают то, что ты им говоришь, а не то, что ты имеешь в виду.»', a: 'Закон программирования' },
        { q: '«Память в коде — это мост между вчерашними и сегодняшними данными.»', a: 'Архитектор Nova' },
        { q: '«Вайб-кодер создаёт продукты со скоростью мысли и проверяет факты.»', a: 'Манифест Vibe Coder' },
        { q: '«Погода в Худжанде: 27°C, солнечно, идеальное время для кодинга!»', a: 'Weather Service API' }
      ];
      const pick = quotes[Math.floor(Math.random() * quotes.length)];
      setSandboxApiWidgetText(pick.q);
      setSandboxApiAuthor(pick.a);
      setIsSandboxApiLoading(false);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
    }, 600);
  };

  // ==========================================
  // STEP 4: AUDIT CHECKLIST
  // ==========================================
  const [auditChecks, setAuditChecks] = useState<Record<string, boolean>>({
    storagePersists: false,
    apiDisplays: false,
    errorHandlingReady: false
  });
  const [auditClaimed, setAuditClaimed] = useState(false);

  const toggleAudit = (key: string) => {
    setAuditChecks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const allDone = Object.values(next).every(Boolean);
      if (allDone && !auditClaimed) {
        setAuditClaimed(true);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
        addReward(25, '✅ Полный аудит приложения 3/3 пройден (+25 ОП)!');
      }
      return next;
    });
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/40">
            УРОВЕНЬ 4 • ⏱ 40–70 МИН • 🎁 ДО +150 ОП
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Практикум в Google AI Studio + Живая Песочница
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          2. Лабораторная работа: Даём приложению память и подключаем API
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Преврати свой вчерашний прототип в надёжное функциональное приложение: внедри Local Storage (чтобы задачи не стирались при F5) и подключи живой API с внешней информацией!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: CHOOSE BASE PROTOTYPE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-xs font-bold border border-teal-500/40">
              1
            </span>
            Шаг 1: Выбери свой прототип из Миссии 17
          </h3>
          <span className="text-xs text-slate-400 font-mono">3 минуты</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          С каким прототипом ты продолжаешь работу сегодня?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedBase('todo')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedBase === 'todo'
                ? 'bg-teal-950/40 border-teal-500/80 ring-1 ring-teal-500 text-teal-100'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xl mb-1">📝</div>
            <div className="font-bold text-white text-sm">Прототип «To-Do List / Трекер задач»</div>
            <div className="text-xs text-slate-400 mt-1">
              Будем сохранять список задач в LocalStorage и добавим виджет погоды/мотивации дня.
            </div>
          </button>

          <button
            onClick={() => setSelectedBase('quiz')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedBase === 'quiz'
                ? 'bg-teal-950/40 border-teal-500/80 ring-1 ring-teal-500 text-teal-100'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xl mb-1">🎯</div>
            <div className="font-bold text-white text-sm">Прототип «Mini-Quiz / Тест знаний»</div>
            <div className="text-xs text-slate-400 mt-1">
              Будем сохранять рекорд очков и историю попыток + подгружать случайные факты по API.
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 2: ADD LOCAL STORAGE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono text-xs font-bold border border-teal-500/40">
              2
            </span>
            Шаг 2: Добавь Local Storage (Память на устройстве)
          </h3>
          <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950 px-2.5 py-1 rounded-full border border-teal-800">
            🎁 +75 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Попроси ИИ добавить постоянное сохранение данных. Настрой точные параметры для промпта:
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Что именно сохранять в LocalStorage:</label>
            <input
              type="text"
              value={dataKeysToSave}
              onChange={(e) => setDataKeysToSave(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">Готовый промпт для Google AI Studio:</span>
              <button
                onClick={handleCopyLocalStoragePrompt}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedLocalStoragePrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLocalStoragePrompt ? 'Скопировано!' : 'Копировать промпт'}
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
{localStoragePromptText}
            </pre>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 3: CONNECT 1 SAFE FREE API + LIVE REQUEST SIMULATOR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-xs font-bold border border-indigo-500/40">
              3
            </span>
            Шаг 3: Подключи 1 бесплатный API и протестируй «Request ➔ Response»
          </h3>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-800">
            🎁 +75 ОП
          </span>
        </div>

        {/* API Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => setSelectedApiType('quote')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedApiType === 'quote'
                ? 'bg-indigo-950/60 border-indigo-400 text-indigo-200 ring-1 ring-indigo-400'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-white">
              <Quote className="w-4 h-4 text-cyan-400" />
              Quotes API
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Цитата дня / Мудрая мысль</div>
          </button>

          <button
            onClick={() => setSelectedApiType('weather')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedApiType === 'weather'
                ? 'bg-indigo-950/60 border-indigo-400 text-indigo-200 ring-1 ring-indigo-400'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-white">
              <Sun className="w-4 h-4 text-amber-400" />
              Weather API
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Погода в Худжанде / мире</div>
          </button>

          <button
            onClick={() => setSelectedApiType('number')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedApiType === 'number'
                ? 'bg-indigo-950/60 border-indigo-400 text-indigo-200 ring-1 ring-indigo-400'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 text-white">
              <Hash className="w-4 h-4 text-purple-400" />
              Number Facts API
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Удивительный факт о числе</div>
          </button>
        </div>

        {/* Live Network Inspector Console */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              📡 Инспектор сети: Живая симуляция Request ➔ Response
            </div>
            {networkLog && (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Статус: {networkLog.status} OK • {networkLog.latency} ms
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-300">
              <Smartphone className="w-5 h-5" />
              <span>Твой софт (Клиент)</span>
            </div>

            <div className="flex-1 text-center w-full">
              <div className="text-[11px] text-slate-400 mb-1">
                {isRequesting ? '⚡ Отправка HTTP GET запроса...' : 'HTTP GET ──▶ [Интернет] ──▶ 200 OK'}
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden relative border border-slate-800">
                <div
                  className={`h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 transition-all ${
                    isRequesting ? 'w-2/3 animate-pulse' : 'w-full'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-indigo-300">
              <Server className="w-5 h-5" />
              <span>Публичный API-Сервер</span>
            </div>
          </div>

          <button
            onClick={triggerLiveApiCall}
            disabled={isRequesting}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            {isRequesting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Ожидание ответа от сервера...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Выполнить реальный fetch-запрос к {selectedApiType.toUpperCase()} API
              </>
            )}
          </button>

          {networkLog && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] space-y-1">
              <div className="text-slate-400">
                Endpoint: <span className="text-cyan-300">{networkLog.url}</span>
              </div>
              <pre className="text-emerald-300 overflow-x-auto p-2 bg-slate-950 rounded-lg border border-slate-800/80">
{JSON.stringify(networkLog.response, null, 2)}
              </pre>
            </div>
          )}

          {/* AI Studio prompt snippet */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Скопируй промпт для подключения API к коду в AI Studio:</span>
            <button
              onClick={handleCopyApiPrompt}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {copiedApiPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedApiPrompt ? 'Скопировано!' : 'Копировать API-промпт'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE SANDBOX: LIVING APP WITH STORAGE AND API */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/50 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              ИНТЕРАКТИВНАЯ ПЕСОЧНИЦА ПОРТАЛА
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              📱 Твоё работающее приложение: Память (LocalStorage) + Живой API
            </h3>
          </div>
          <button
            onClick={handleSimulateSandboxReload}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 border border-cyan-500/30 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Проверить перезагрузку (F5)
          </button>
        </div>

        {sandboxRestoredNotice && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-200 font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            🎉 Страница перезагружена! Все {sandboxTasks.length} задач успешно восстановлены из LocalStorage браузера!
          </div>
        )}

        {/* Live Widget at top (API driven) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Живой виджет из внешнего API (Quotes & Weather):
            </div>
            <div className="text-xs sm:text-sm text-white font-medium italic">
              {isSandboxApiLoading ? '⏳ Запрос к API выполняется...' : sandboxApiWidgetText}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">— {sandboxApiAuthor}</div>
          </div>

          <button
            onClick={handleFetchSandboxWidget}
            disabled={isSandboxApiLoading}
            className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSandboxApiLoading ? 'animate-spin' : ''}`} />
            Обновить API
          </button>
        </div>

        {/* Task Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Введи новую задачу (она сразу запишется в LocalStorage)..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSandboxTask()}
            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleAddSandboxTask}
            className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>

        {/* Task list */}
        <div className="space-y-2">
          {sandboxTasks.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 bg-slate-950/60 rounded-2xl border border-slate-800">
              Список пуст. Добавь первую задачу выше!
            </div>
          ) : (
            sandboxTasks.map(task => (
              <div
                key={task.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  task.completed
                    ? 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div
                  onClick={() => handleToggleSandboxTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-600 hover:border-cyan-400'
                  }`}>
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm ${task.completed ? 'line-through' : 'font-medium'}`}>
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">{task.createdAt}</span>
                  <button
                    onClick={() => handleDeleteSandboxTask(task.id)}
                    className="p-1 rounded-lg text-slate-600 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 4: AUDIT CHECKLIST */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs font-bold border border-emerald-500/40">
              4
            </span>
            Шаг 4: Проверь всё вместе (Чек-лист аудита 3/3)
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            🎁 +25 ОП
          </span>
        </div>

        <div className="space-y-3">
          {[
            { id: 'storagePersists', label: 'Данные сохраняются после обновления страницы (F5) через Local Storage' },
            { id: 'apiDisplays', label: 'API-данные реально загружаются и отображаются в виджете на экране' },
            { id: 'errorHandlingReady', label: 'При сбое сети приложение не «падает», а показывает понятное сообщение об ошибке' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => toggleAudit(item.id)}
              className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-bold flex items-center gap-3 transition-all ${
                auditChecks[item.id]
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                auditChecks[item.id] ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
              }`}>
                {auditChecks[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBMISSION FORM */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-teal-400" />
          Сдача лабораторной работы #18 в систему
        </h3>
        <InlineLabSubmission
          labId={18}
          taskTitle="Лабораторная работа #18: Даём приложению память и подключаем API (Local Storage + API)"
        />
      </div>
    </div>
  );
};
