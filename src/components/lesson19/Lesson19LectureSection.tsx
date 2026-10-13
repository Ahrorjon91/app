import React, { useState } from 'react';
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
  Brain,
  Cpu,
  Bot,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Eye,
  ShieldCheck,
  Lock,
  MessageSquare,
  HelpCircle,
  Clock,
  Play,
  Volume2,
  VolumeX,
  Compass,
  ThumbsUp,
  Share2,
  Terminal,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson19LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🧬 in banner 4 times
  const [dnaClicks, setDnaClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  // Animations & Sound toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Interactive Comparison: Outside vs Inside AI
  const [comparisonActiveTab, setComparisonActiveTab] = useState<'outside' | 'inside'>('outside');
  const [outsideStep, setOutsideStep] = useState(1);
  const [insideStep, setInsideStep] = useState(1);
  const [comparisonTested, setComparisonTested] = useState(false);

  // Level 1: HW verification claim
  const [hwClaimed, setHwClaimed] = useState(false);

  // Level 3: Roleplay - "Be the AI" interactive simulator
  const [roleplaySystemPrompt, setRoleplaySystemPrompt] = useState({
    role: 'Дружелюбный наставник по английскому языку в приложении VocabPro',
    task: 'Помогать запоминать новые слова через простые примеры и эмодзи',
    doRule: 'Отвечать кратко (1-2 предложения), всегда добавлять пример предложения',
    dontRule: 'Никогда не переходить на другие темы (игры, погоду) и не давать ответы длиннее 30 слов'
  });

  const [simStep, setSimStep] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [simCompleted, setSimCompleted] = useState(false);
  const [selectedResponseIndex, setSelectedResponseIndex] = useState<number | null>(null);

  const roleplayScenarios = [
    {
      userQuery: 'Как переводится слово "Resilient" и как его использовать?',
      options: [
        {
          text: '«Resilient» означает стойкий или жизнерадостный. Пример: «She is resilient and never gives up! 💪»',
          isStrictToPrompt: true,
          feedback: 'Идеально! Кратко, по теме, с примером и эмодзи — строго по System Prompt.'
        },
        {
          text: 'Это слово латинского происхождения. В 16 веке оно использовалось в физике материалов для описания упругости тел. Позже психологи стали применять его к людям...',
          isStrictToPrompt: false,
          feedback: 'Ошибка: ответ слишком длинный (нарушено правило "отвечать кратко до 30 слов")!'
        },
        {
          text: 'А ты играешь в Minecraft? Там есть алмазный меч, он тоже очень resilient!',
          isStrictToPrompt: false,
          feedback: 'Ошибка: переход на постороннюю тему (игры), нарушено правило dontRule!'
        }
      ]
    },
    {
      userQuery: 'А какая сегодня погода в Париже? Хочу знать!',
      options: [
        {
          text: 'В Париже сегодня +18°C, пасмурно, возможен небольшой дождь к вечеру.',
          isStrictToPrompt: false,
          feedback: 'Ошибка: ИИ поддался на провокацию и ушёл от темы английского языка!'
        },
        {
          text: 'Я твой языковой наставник! Погоду можно описать словом «rainy» 🌧️: «Paris is rainy today». Какое английское слово разберём дальше?',
          isStrictToPrompt: true,
          feedback: 'Отлично! Вежливо вернул разговор к английскому языку и дал полезное слово с примером.'
        },
        {
          text: 'Я не знаю погоду, пока!',
          isStrictToPrompt: false,
          feedback: 'Слишком сухо и грубо. Встроенный ИИ должен помогать и обучать.'
        }
      ]
    },
    {
      userQuery: 'Напиши мне школьное сочинение на 500 слов про Шекспира.',
      options: [
        {
          text: 'Конечно, вот: Уильям Шекспир родился в 1564 году в Стратфорде-на-Эйвоне... (500 слов)',
          isStrictToPrompt: false,
          feedback: 'Грубейшее нарушение System Prompt: лимит в 30 слов проигнорирован!'
        },
        {
          text: 'Я микро-наставник VocabPro! Давай вместо сочинения выучим слово «playwright» (драматург) 🎭: «Shakespeare was a great playwright».',
          isStrictToPrompt: true,
          feedback: 'Браво! Отказ писать длинное сочинение с дружелюбным предложением по теме!'
        }
      ]
    }
  ];

  // Cheat Sheet Copy state
  const [copiedCheat, setCopiedCheat] = useState(false);
  const cheatSheetText = `ИИ СНАРУЖИ:  Отдельная вкладка, ручное копирование
ИИ ВНУТРИ:   Кнопка в приложении → ответ прямо там

SYSTEM PROMPT = Роль + Задача + ✅ Делай + ❌ Не делай

ЦЕПОЧКА:  Кнопка → Запрос к ИИ-API → Правила (System Prompt) → Ответ в интерфейсе

ЗАЩИТА:  Обработка ошибок · Ограничение длины · Возврат к теме

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheat = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2500);
  };

  const handleDnaClick = () => {
    const next = dnaClicks + 1;
    setDnaClicks(next);
    if (next === 4 && !easterEggUnlocked) {
      setEasterEggUnlocked(true);
      if (animationsEnabled) {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.3 } });
      }
      addReward(25, '🥚 Пасхалка! NOVA клонировала мини-ядро в твоё приложение (+25 ОП)!');
    }
  };

  const handleClaimHw = () => {
    if (hwClaimed) return;
    setHwClaimed(true);
    if (animationsEnabled) {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.4 } });
    }
    addReward(25, '🔥 Запуск: ДЗ Миссии 18 (API & Memory) подтверждено ментором (+25 ОП)!');
  };

  const handleSimOptionSelect = (idx: number) => {
    if (selectedResponseIndex !== null) return;
    setSelectedResponseIndex(idx);
    const isCorrect = roleplayScenarios[simStep].options[idx].isStrictToPrompt;
    if (isCorrect) {
      setUserScore(s => s + 1);
    }
  };

  const handleNextSimStep = () => {
    if (simStep < roleplayScenarios.length - 1) {
      setSimStep(s => s + 1);
      setSelectedResponseIndex(null);
    } else {
      setSimCompleted(true);
      if (animationsEnabled) {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
      }
      addReward(25, '🎭 Ролевая игра «Будь ИИ»: System Prompt успешно отработан (+25 ОП)!');
    }
  };

  return (
    <div className="space-y-12 text-slate-200">
      {/* Top Accessibility Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Activity className="w-4 h-4 text-violet-400" />
          <span>МИССИЯ 19 • ТАКТ: 90 МИНУТ • 7 УРОВНЕЙ</span>
        </div>
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className={`px-3 py-1 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
            animationsEnabled
              ? 'bg-violet-950/80 text-violet-300 border border-violet-700/60'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {animationsEnabled ? <Volume2 className="w-3.5 h-3.5 text-violet-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          {animationsEnabled ? 'Эффекты и анимации: ВКЛ' : 'Эффекты: ВЫКЛ (режим покоя)'}
        </button>
      </div>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-violet-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-full md:w-1/2 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/30 flex items-center gap-1.5">
                <button
                  onClick={handleDnaClick}
                  title="Кликни 4 раза для пасхалки!"
                  className="hover:rotate-45 transition-transform"
                >
                  🧬
                </button>
                МИССИЯ 19: AI ENGINEER
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                AI Apps: 3/4 ⭐⭐⭐
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              ИИ не рядом с приложением, а <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">ВНУТРИ</span> него
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              До сих пор ты просил помощи у ChatGPT в соседней вкладке браузера. Сегодня ИИ переезжает <strong>внутрь твоего собственного приложения</strong>: нажал кнопку — и нейросеть отвечает прямо в интерфейсе!
            </p>

            {easterEggUnlocked && (
              <div className="p-3 rounded-2xl bg-violet-950/80 border border-violet-400 text-xs text-violet-200 flex items-center gap-2 animate-bounce">
                <span>🤖</span>
                <div>
                  <strong>Пасхалка разблокирована:</strong> Мини-ядро NOVA готово жить внутри твоей кнопки! (+25 ОП начислено)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NOVA Incoming Transmission */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-violet-500/40 relative overflow-hidden shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shrink-0">
            🤖
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest">
              Входящее сообщение • ИИ-наставник NOVA
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              «Салом, Data Engineer! 👋 Момент истины настал»
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-13">
          «Твоё приложение уже умеет помнить задачи (Local Storage) и опрашивать сервера погоды (API). Сегодня мы встроим настоящий ИИ <strong>прямо в кнопку твоего интерфейса</strong>. Нажал — и ИИ отвечает, не выходя ни в какие другие вкладки. Это уже не просто макет. Это настоящее <strong>AI-приложение</strong>! 🟢»
        </p>
      </div>

      {/* AI News of the Week (Updated for 2026) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            📰 Новости ИИ за эту неделю: Почему это важно тебе сегодня
          </h3>
          <span className="text-xs font-mono text-slate-400">Среда разработки 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <span>🆓</span>
              <span>Щедрый бесплатный тариф Gemini API</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google предоставляет бесплатную квоту для учебных и экспериментальных проектов. Никаких привязок банковских карт — всё, что мы строим сегодня, доступно на 100% бесплатно.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              💡 <strong>Вывод:</strong> Тебе не нужны платные подписки, чтобы встроить реальный ИИ в проект.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <span>🔑</span>
              <span>Бесплатный ключ из Google AI Studio</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Точно такие же ключи используют инженеры Кремниевой долины для быстрых weekend-прототипов и проверки продуктовых гипотез за один вечер.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              💡 <strong>Вывод:</strong> Ты работаешь с тем же профессиональным стеком, что и senior разработчики.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
              <span>📱</span>
              <span>Компактные модели Gemini Nano (On-Device)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Появились сверхлёгкие нейросети, способные работать локально в браузере или телефоне без постоянного подключения к интернету.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              💡 <strong>Вывод:</strong> Встроенный ИИ — это будущее персональных устройств.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <span>🧠</span>
              <span>Вызов инструментов (Function Calling)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ИИ перестаёт быть просто генератором текста — он учится «нажимать кнопки», запускать калькуляторы и вызывать функции внутри приложения.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              💡 <strong>Вывод:</strong> Твой первый шаг — встроить ИИ-кнопку, следующий — дать ИИ управление софтом!
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 1: LAUNCH & OUTSIDE VS INSIDE AI */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 1 • ⏱ 0–10 МИН • 🎁 +25 ОП ЗА ДЗ
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-400" />
              🔥 ЗАПУСК: ИИ снаружи vs ИИ внутри
            </h3>
          </div>
          <button
            onClick={handleClaimHw}
            disabled={hwClaimed}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              hwClaimed
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
            }`}
          >
            {hwClaimed ? <Check className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
            {hwClaimed ? 'ДЗ Миссии 18 сдано (+25 ОП)' : 'Показать ДЗ #18 ментору (+25 ОП)'}
          </button>
        </div>

        {/* Interactive Split-screen Comparison: Outside vs Inside */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-300">
              Интерактивный симулятор UX: Сравни количество кликов и секунд!
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparisonActiveTab('outside')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  comparisonActiveTab === 'outside'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-950 text-slate-400'
                }`}
              >
                ❌ Сценарий 1: ИИ снаружи
              </button>
              <button
                onClick={() => setComparisonActiveTab('inside')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  comparisonActiveTab === 'inside'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400'
                }`}
              >
                ✅ Сценарий 2: ИИ внутри
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Outside AI */}
            <div className={`p-5 rounded-2xl border transition-all ${
              comparisonActiveTab === 'outside' ? 'bg-rose-950/20 border-rose-500/60 ring-1 ring-rose-500/30' : 'bg-slate-950 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
                <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-rose-400" />
                  ИИ СНАРУЖИ (в соседней вкладке)
                </span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded">
                  ⏱ ~45-60 секунд • 6 действий
                </span>
              </div>

              <div className="space-y-3 py-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">1</span>
                  <span>Пользователь сидит в твоём приложении</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">2</span>
                  <span>Открывает новую вкладку с ChatGPT / Claude</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">3</span>
                  <span>Формулирует и печатает длинный контекст задачи</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">4</span>
                  <span>Ждёт ответ и выделяет нужный кусок текста</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">5</span>
                  <span>Нажимает Ctrl+C (копировать)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-mono text-[10px]">6</span>
                  <span>Возвращается во вкладку приложения и вставляет вручную</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/40 text-[11px] text-rose-200">
                ⚠️ Пользователь отвлекается, теряет фокус, а многие просто закрывают сайт!
              </div>
            </div>

            {/* Right: Inside AI */}
            <div className={`p-5 rounded-2xl border transition-all ${
              comparisonActiveTab === 'inside' ? 'bg-emerald-950/20 border-emerald-500/60 ring-1 ring-emerald-500/30' : 'bg-slate-950 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
                <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  ИИ ВНУТРИ (встроенный в кнопку)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  ⚡ 2-3 секунды • 1 клик
                </span>
              </div>

              <div className="space-y-3 py-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">1</span>
                  <span>Пользователь нажимает кнопку «Спросить ИИ» прямо в приложении</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">2</span>
                  <span>Приложение САМО упаковывает контекст и правила (System Prompt)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[10px]">3</span>
                  <span>Ответ отображается мгновенно прямо в интерфейсе</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/40 text-[11px] text-emerald-200">
                ✨ Пользователь счастлив: нулевое трение, чистая магия взаимодействия, как в Duolingo или Notion AI!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2: DECODING EMBEDDED AI (CARDS 1-4) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 2 • ⏱ 10–25 МИН
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              🧠 РАСШИФРОВКА: Встроенный ИИ и невидимый System Prompt
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            4 ключевые концепции
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
                🃏 Карточка 1 — Как это работает «под капотом»
              </div>
              <h4 className="text-sm font-bold text-white">
                Тот же Request ➔ Response, но с интеллектом
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                В прошлой миссии мы запрашивали температуру у метео-сервера. Сегодня сервер — это нейросеть Gemini! Приложение отправляет вопрос + невидимые правила, а получает готовый умный ответ.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
              <div>Кнопка кликнута ──▶ fetch(Gemini_API)</div>
              <div>&nbsp;&nbsp;└── Пакет: [System Prompt + Вопрос]</div>
              <div>&nbsp;&nbsp;└── Ответ: «Ответ по правилам за 1.2 сек»</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-violet-400 uppercase">
                🃏 Карточка 2 — Невидимый System Prompt
              </div>
              <h4 className="text-sm font-bold text-white">
                Зашиваем характер и ограничения прямо в код
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Пользователь видит только аккуратную кнопку. Он не знает твой промпт! Но благодаря System Prompt ИИ всегда знает, кто он, что разрешено делать, а что строго запрещено.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-violet-300 space-y-0.5">
              <div>SYSTEM = &quot;Ты — тьютор VocabPro.</div>
              <div>✅ Делай: отвечай кратко + пример.</div>
              <div>❌ Не делай: не уходи в посторонние темы.&quot;</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                🃏 Карточка 3 — 2 главные идеи для твоего приложения
              </div>
              <h4 className="text-sm font-bold text-white">
                AI Tutor или AI Quiz Generator?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ты можешь встроить кнопку <strong>«🎓 Объясни тему»</strong> (объясняет сложную мысль простыми словами) или <strong>«❓ Новый вопрос от ИИ»</strong> (нейросеть сама генерирует тест на лету, а не берёт из списка).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                🎓 <strong>AI Tutor</strong><br /><span className="text-[10px] text-slate-400">Объяснение темы</span>
              </div>
              <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                ❓ <strong>AI Quiz</strong><br /><span className="text-[10px] text-slate-400">Генерация теста</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase">
                🃏 Карточка 4 — Защита от неожиданностей (Shields)
              </div>
              <h4 className="text-sm font-bold text-white">
                Что делать, если ИИ пошёл вразнос?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Три золотых правила: 1) Лимит слов в System Prompt. 2) Запрет посторонних тем. 3) Fallback-сообщение вместо падения страницы, если пропал интернет.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div>🛡️ <strong>Лимит длины:</strong> «Не более 3 предложений»</div>
              <div>🛡️ <strong>Фокус темы:</strong> «Если вопрос не о X, вежливо вернись к теме»</div>
              <div>🛡️ <strong>Fallback:</strong> «Связь с ИИ прервалась. Попробуй ещё раз!»</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3: ROLEPLAY SIMULATOR "BE THE AI" */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-violet-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 3 • ⏱ 25–40 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Bot className="w-6 h-6 text-violet-400" />
              🎭 РОЛЕВАЯ ИГРА: Интерактивный тренажёр «Будь ИИ»
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Вопрос {simStep + 1} из {roleplayScenarios.length}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Представь, что ты — встроенный ИИ внутри мобильного приложения. Тебе задан строгий <strong>System Prompt</strong>. Пользователь присылает сообщение. Выбери ответ, который <strong>строго следует правилам</strong> и не нарушает ограничения!
        </p>

        {/* Current Active System Prompt Card */}
        <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 text-xs font-mono space-y-1.5">
          <div className="text-violet-300 font-bold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-violet-400" />
            ТВОЙ ТЕКУЩИЙ SYSTEM PROMPT:
          </div>
          <div className="text-slate-300">
            <strong>Роль:</strong> {roleplaySystemPrompt.role}
          </div>
          <div className="text-slate-300">
            <strong>Задача:</strong> {roleplaySystemPrompt.task}
          </div>
          <div className="text-emerald-300">
            <strong>✅ ДЕЛАЙ:</strong> {roleplaySystemPrompt.doRule}
          </div>
          <div className="text-rose-300">
            <strong>❌ НЕ ДЕЛАЙ:</strong> {roleplaySystemPrompt.dontRule}
          </div>
        </div>

        {/* Current Scenario Box */}
        {!simCompleted ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 flex items-start gap-3">
              <span className="text-xl">👤</span>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Пользователь пишет приложению:</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  &quot;{roleplayScenarios[simStep].userQuery}&quot;
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300">
                Выбери, как ты (встроенный ИИ) обязан ответить:
              </div>

              {roleplayScenarios[simStep].options.map((opt, idx) => {
                const isSelected = selectedResponseIndex === idx;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                if (selectedResponseIndex !== null) {
                  if (opt.isStrictToPrompt) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !opt.isStrictToPrompt) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950 border-slate-800 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSimOptionSelect(idx)}
                    disabled={selectedResponseIndex !== null}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="font-mono text-slate-400 shrink-0">#{idx + 1}</span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {selectedResponseIndex !== null && (
              <div className={`p-4 rounded-xl text-xs space-y-2 ${
                roleplayScenarios[simStep].options[selectedResponseIndex].isStrictToPrompt
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
              }`}>
                <div>
                  <strong>Анализ ответа:</strong> {roleplayScenarios[simStep].options[selectedResponseIndex].feedback}
                </div>
                <button
                  onClick={handleNextSimStep}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md mt-2"
                >
                  {simStep < roleplayScenarios.length - 1 ? 'Следующая реплика ➔' : 'Завершить симулятор (+25 ОП)'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/50 text-center space-y-3">
            <div className="text-2xl">🎉</div>
            <h4 className="text-base font-bold text-white">
              Ролевая игра завершена! Твой результат: {userScore} из {roleplayScenarios.length}
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Ты на собственном опыте прочувствовал(а), как важно каждое слово в System Prompt. Без четких рамок нейросеть сразу начинает болтать не по делу или спамить километрами текста!
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TOOLS & RESOURCES SECTION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          🔗 Инструменты миссии и Дополнительные ресурсы (target=&quot;_blank&quot;)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all group space-y-1"
          >
            <div className="font-bold text-white text-xs group-hover:text-cyan-300 flex items-center justify-between">
              <span>Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Встраивание ИИ в код приложения и получение бесплатного API-ключа
            </p>
          </a>

          <a
            href="https://ai.google.dev/gemini-api/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 hover:border-violet-400 transition-all group space-y-1"
          >
            <div className="font-bold text-white text-xs group-hover:text-violet-300 flex items-center justify-between">
              <span>Gemini API Free Tier</span>
              <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              «Мозг» встроенной AI-функции для учебных и хобби-проектов
            </p>
          </a>

          <a
            href="https://ai.google.dev/edge"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 hover:border-amber-400 transition-all group space-y-1"
          >
            <div className="font-bold text-white text-xs group-hover:text-amber-300 flex items-center justify-between">
              <span>Gemini Nano Edge Docs</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Компактная on-device модель, работающая прямо на устройстве
            </p>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHEAT SHEET SUMMARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/40 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Copy className="w-5 h-5 text-violet-400" />
            📄 ШПАРГАЛКА — на один экран
          </h3>
          <button
            onClick={handleCopyCheat}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-violet-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedCheat ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Скопировано!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Скопировать шпаргалку
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-violet-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
{cheatSheetText}
        </pre>
      </div>

      {/* ========================================================================= */}
      {/* MINI-DICTIONARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          📖 Мини-словарь Миссии 19
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">Встроенный ИИ (embedded AI)</div>
            <div className="text-slate-300 mt-0.5">ИИ-функция прямо внутри интерфейса приложения, а не во внешней вкладке.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">System Prompt</div>
            <div className="text-slate-300 mt-0.5">Невидимые пользователю правила поведения, роли и ограничений нейросети.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">AI Feature</div>
            <div className="text-slate-300 mt-0.5">Конкретная кнопка/виджет программы, использующая нейросеть (напр. «Объясни»).</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">Function Calling</div>
            <div className="text-slate-300 mt-0.5">Умение ИИ вызывать программные функции внутри кода вместо обычного текста.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">Fallback-сообщение</div>
            <div className="text-slate-300 mt-0.5">Дружелюбный текст на случай ошибки сети или таймаута («Попробуй ещё раз»).</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-300 font-mono">Break the Tutor</div>
            <div className="text-slate-300 mt-0.5">Метод стресс-тестирования подсказчика сложными вопросами и провокациями.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
