import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Shield,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Flame,
  Zap,
  Code2,
  Cpu,
  Layers,
  HelpCircle,
  AlertTriangle,
  Award,
  ArrowRight,
  Globe,
  Compass,
  FileCode,
  Layout,
  MessageSquare,
  Users,
  CheckCircle2
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import websiteSkeletonImg from '../../assets/images/lesson9_website_skeleton_1790077640068.jpg';

export const Lesson9LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Accessibility settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Easter Egg Terminal State
  const [showTerminalEasterEgg, setShowTerminalEasterEgg] = useState(false);
  const [terminalEasterEggClaimed, setTerminalEasterEggClaimed] = useState(false);

  const handleTriggerTerminal = () => {
    setShowTerminalEasterEgg(true);
    if (!terminalEasterEggClaimed) {
      setTerminalEasterEggClaimed(true);
      addReward(25, '💻 ПАСХАЛКА: Ты запустил Терминал Nova! Код компилируется на лету! (+25 Опыта)');
    }
  };

  // Level 1: Comparison Voting
  const [votedRequest, setVotedRequest] = useState<number | null>(null);
  const [level1RewardClaimed, setLevel1RewardClaimed] = useState(false);

  const handleVoteRequest = (reqId: number) => {
    setVotedRequest(reqId);
    if (!level1RewardClaimed) {
      setLevel1RewardClaimed(true);
      addReward(25, '🔥 Запуск завершён! Ты выделил силу точного Строительного промпта! (+25 Опыта)');
    }
  };

  // Level 2: Site X-Ray Interactive state
  const [activeXRayZone, setActiveXRayZone] = useState<'header' | 'main' | 'footer'>('header');

  // Level 3: Roleplay Product Owner vs Coder
  const [roleplayMode, setRoleplayMode] = useState<'po' | 'coder'>('po');
  const [roleplayClarified, setRoleplayClarified] = useState(false);
  const [roleplayRewardClaimed, setRoleplayRewardClaimed] = useState(false);

  const handleCompleteRoleplay = () => {
    setRoleplayClarified(true);
    if (!roleplayRewardClaimed) {
      setRoleplayRewardClaimed(true);
      addReward(25, '🎭 Ролевая игра пройдена! Ты мыслишь как Product Owner и формулируешь как Coder! (+25 Опыта)');
    }
  };

  // Cheat sheet copy state
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  const cheatSheetText = `VIBE CODING:  ИДЕЯ → ПРОМПТ → ИИ СТРОИТ → ТЫ ПРОВЕРЯЕШЬ → УЛУЧШАЕШЬ

СТРОИТЕЛЬНЫЙ ПРОМПТ = Роль + Цель + Контекст + Ограничения + Результат

СКЕЛЕТ САЙТА:  Шапка (Header) → Контент (Main) → Подвал (Footer)

ПРАВИЛО УЛУЧШЕНИЯ:  меняй по одной детали за раз, а не переписывай всё заново

ЧЕСТНОСТЬ:  никаких личных данных на сайте (телефон, адрес, полное имя)

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheatSheet = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2000);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Top Controls: Sound, Animations & Easter Egg */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" /> БЛОК 3: ВАЙБ-КОДИНГ И САЙТЫ
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Миссия 09 • Старт Проекта #3
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Easter Egg Terminal Button */}
          <button
            onClick={handleTriggerTerminal}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition flex items-center gap-1 text-xs font-mono"
            title="Пасхалка: Терминал Nova"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">CLI Easter Egg</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition text-xs"
            title={soundEnabled ? 'Звук включен' : 'Звук выключен'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Animations Toggle */}
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition text-xs"
            title={animationsEnabled ? 'Анимации активны' : 'Анимации отключены'}
          >
            {animationsEnabled ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Terminal Easter Egg Modal */}
      {showTerminalEasterEgg && (
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/80 shadow-2xl shadow-cyan-500/20 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" /> NOVA_AI_STUDIO_VIBE_KERNEL v2026.9
            </span>
            <button
              onClick={() => setShowTerminalEasterEgg(false)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              ✕ Закрыть
            </button>
          </div>
          <div className="space-y-1 text-slate-300">
            <p className="text-purple-400">&gt; nova.vibe_check(user="Future Visionary", mission=9)</p>
            <p className="text-emerald-400">&gt; [OK] Neural syntax module bypassed. Natural language engine initialized.</p>
            <p className="text-cyan-300">&gt; [VIBE]: "Ты больше не пишешь скобки и точки с запятой. Ты — архитектор логики!"</p>
            <p className="text-amber-300">&gt; [RULE 2026]: Generate != Finished. Check with your own hands!</p>
            <p className="text-emerald-300 font-bold">&gt; +25 ОП начислено в твой портал! 🚀</p>
          </div>
        </div>
      )}

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30">
        <div className="p-6 sm:p-8 space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
              ⚡ 90 МИНУТ • 7 УРОВНЕЙ
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
              🛠️ 1 ЖИВОЙ МИНИ-САЙТ
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              🎁 ДО +150 ОП
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              МИССИЯ 09: ВАЙБ-КОДЕР
            </h1>
            <p className="text-sm sm:text-lg text-cyan-300 font-semibold mt-1">
              Не пишешь код руками — договариваешься с ИИ, что построить
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Сегодня ты станешь <strong>Vibe Coder</strong> — человеком, который строит работающие сайты, не зная синтаксиса программирования. Ты будешь не печатать код, а <strong>договариваться</strong> с ИИ на его языке — точным и структурным. Это профессия прямо сейчас! 💻
          </p>
        </div>
      </div>

      {/* NOVA Incoming Transmission */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/40 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg shadow-cyan-500/20">
          🤖
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm sm:text-base">Входящее сообщение от NOVA</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              AI Guide
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            «Салом, Future Visionary! 👋 Ты уже создавал картинки, героя и видео. Сегодня начинается новый Проект — <strong>My First Live Website</strong>. И первый шаг — понять, что такое <strong>Vibe Coding</strong>: способ строить настоящие сайты и приложения, просто объясняя ИИ, что тебе нужно. Звучит как магия? Нет — это просто новый вид точного языка. Погнали! 🟢»
          </p>
        </div>
      </div>

      {/* 3 Shields & Special Rule */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div>
            <strong className="text-white block font-bold">1. Проверяй</strong>
            <span className="text-slate-400 text-[11px]">Тестируй ссылки и верстку</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <strong className="text-white block font-bold">2. Не делись личным</strong>
            <span className="text-slate-400 text-[11px]">Без адресов и телефонов</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <strong className="text-white block font-bold">3. Будь честным</strong>
            <span className="text-slate-400 text-[11px]">Сайт собран с помощью ИИ</span>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/50 flex items-center gap-3">
          <Zap className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <div>
            <strong className="text-white block font-bold">Generate ≠ Finished</strong>
            <span className="text-cyan-300 text-[11px]">Сгенерировал → проверь руками!</span>
          </div>
        </div>
      </div>

      {/* 2026 AI News Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              НОВОСТИ ИИ ЗА ЭТУ НЕДЕЛЮ (2026)
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              📰 Главные события в мире разработки и вайб-кодинга
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              💻 Термин «вайб-кодинг» стал стандартом
            </span>
            <p className="text-slate-300 leading-relaxed">
              Введённый в 2025 году Андреем Карпаты, в 2026 году термин стал уже не экспериментом, а обычным рабочим процессом для миллионов людей по всему миру.
            </p>
            <div className="text-[11px] text-purple-300 font-mono">
              💡 Связь: Этому мы и учимся прямо сейчас — с первого сайта!
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              📊 Подавляющее большинство пишет код с ИИ
            </span>
            <p className="text-slate-300 leading-relaxed">
              Разработчики еженедельно используют ИИ-инструменты, а значительная часть нового кода пишется в диалоге с большими моделями.
            </p>
            <div className="text-[11px] text-purple-300 font-mono">
              💡 Связь: Навык точной формулировки важнее заучивания синтаксиса.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              🧰 Конкуренция десятков ИИ-инструментов
            </span>
            <p className="text-slate-300 leading-relaxed">
              На рынке соперничают инструменты для визуального дизайна, автоматизации и сложных агентных сценариев (Google AI Studio, Claude Code, Cursor).
            </p>
            <div className="text-[11px] text-purple-300 font-mono">
              💡 Связь: Важно понимать, какой инструмент для какой задачи подходит.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              🚀 Запуск сервисов людьми без опыта в коде
            </span>
            <p className="text-slate-300 leading-relaxed">
              Школьники и предприниматели запускают рабочие сайты и проекты с реальными пользователями за считанные дни через вайб-кодинг.
            </p>
            <div className="text-[11px] text-purple-300 font-mono">
              💡 Связь: Твой сегодняшний мини-сайт — тот самый первый шаг!
            </div>
          </div>
        </div>

        {/* Discussion Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/50 to-cyan-950/50 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-cyan-300 flex-shrink-0" />
          <div>
            <strong>Вопрос для обсуждения в классе:</strong> Если ИИ пишет код за тебя, что тогда становится <em>САМОЙ важной работой человека</em>? (Ответ: понимание задачи, архитектура идеи, формулировка ограничений и тестирование качества!)
          </div>
        </div>
      </div>

      {/* LEVEL 1: Launch (Chaotic vs Precise Request) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-rose-400 font-mono">УРОВЕНЬ 1 • ⏱️ 0–10 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400" /> 🔥 Запуск: Хаотичный промпт против точного
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
            +25 ОП за анализ
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Посмотри на два запроса к ИИ на создание сайта. Какой из них даст понятный и работающий результат?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Request 1: Chaotic */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between text-rose-400 font-bold">
              <span>Запрос 1 (Хаотичный)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300">😵 Ошибка</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 font-mono text-slate-300 border border-slate-800">
              «Сделай сайт про мою мечту.»
            </div>
            <div className="space-y-1.5 text-slate-400 text-xs">
              <p>❌ Нет роли: ИИ не знает, кто он — дизайнер или верстальщик.</p>
              <p>❌ Нет контекста: О какой мечте речь? Для кого сайт?</p>
              <p>❌ Нет структуры: Сколько страниц? Какие блоки нужны?</p>
              <p className="text-rose-300 font-medium">Результат: что-то случайное, поломанное или вообще не то.</p>
            </div>
            <button
              onClick={() => handleVoteRequest(1)}
              className={`w-full py-2 rounded-xl font-bold text-xs transition border ${
                votedRequest === 1
                  ? 'bg-rose-950 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {votedRequest === 1 ? '✓ Твой голос (Хаотичный)' : 'Проверить этот запрос'}
            </button>
          </div>

          {/* Request 2: Precise */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-3 shadow-lg shadow-emerald-950/20">
            <div className="flex items-center justify-between text-emerald-300 font-bold">
              <span>Запрос 2 (Точный, по формуле)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">🤩 Идеал</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-200 border border-emerald-900/60 leading-relaxed">
              «Ты — веб-разработчик. Создай одностраничный сайт о моей мечте стать робототехником. Нужны: заголовок, короткий текст о мечте, 3 шага к цели, кнопка "Написать мне". Стиль: светлый, дружелюбный, мобильный.»
            </div>
            <div className="space-y-1.5 text-slate-300 text-xs">
              <p>✓ <strong>Роль:</strong> веб-разработчик.</p>
              <p>✓ <strong>Цель & Контекст:</strong> одностраничник о мечте стать робототехником.</p>
              <p>✓ <strong>Результат & Ограничения:</strong> заголовок, текст, 3 шага, кнопка, мобильный стиль.</p>
              <p className="text-emerald-300 font-medium">Результат: сайт с чёткой структурой, готовый к открытию на телефоне!</p>
            </div>
            <button
              onClick={() => handleVoteRequest(2)}
              className={`w-full py-2 rounded-xl font-bold text-xs transition border ${
                votedRequest === 2
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black'
              }`}
            >
              {votedRequest === 2 ? '✓ Выбран лучший запрос (+25 ОП)!' : 'Выбрать этот запрос как верный'}
            </button>
          </div>
        </div>
      </div>

      {/* LEVEL 2: Decoding (Anatomy of Construction Prompt & Site Skeleton) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-black text-cyan-400 font-mono">УРОВЕНЬ 2 • ⏱️ 10–25 МИН</span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> 🧠 Расшифровка: Анатомия Строительного промпта & Скелет сайта
          </h3>
        </div>

        {/* Card 1: What is Vibe Coding */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-cyan-800/40 space-y-3">
          <h4 className="font-black text-sm sm:text-base text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" /> Карточка 1: Что такое Vibe Coding
          </h4>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono font-bold text-xs sm:text-sm text-white tracking-wide">
            VIBE CODING = ИДЕЯ ──▶ ПРОМПТ ──▶ ИИ СТРОИТ ──▶ ТЫ ПРОВЕРЯЕШЬ ──▶ УЛУЧШАЕШЬ
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ты не пишешь код построчно — ты <strong>объясняешь результат, который хочешь получить</strong>, а ИИ превращает это объяснение в работающий сайт. Твоя роль меняется: из «печатающего код» ты становишься <strong>архитектором и тестировщиком</strong> идеи.
          </p>
        </div>

        {/* Card 2: 5 Parts of Construction Prompt */}
        <div className="space-y-4">
          <h4 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" /> Карточка 2: Строительный промпт (5 частей)
          </h4>
          <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 font-mono text-center text-xs sm:text-sm text-purple-300 font-bold">
            СТРОИТЕЛЬНЫЙ ПРОМПТ = РОЛЬ + ЦЕЛЬ + КОНТЕКСТ + ОГРАНИЧЕНИЯ + РЕЗУЛЬТАТ
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-800/60 space-y-1.5">
              <span className="font-bold text-cyan-400 block">🎭 1. РОЛЬ</span>
              <p className="text-slate-400 text-[11px]">Кем должен «быть» ИИ?</p>
              <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px]">
                «Ты — веб-разработчик и UX-дизайнер»
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-1.5">
              <span className="font-bold text-amber-400 block">🎯 2. ЦЕЛЬ</span>
              <p className="text-slate-400 text-[11px]">Что именно построить?</p>
              <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px]">
                «Одностраничный сайт-визитка обо мне»
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-800/60 space-y-1.5">
              <span className="font-bold text-indigo-400 block">🧩 3. КОНТЕКСТ</span>
              <p className="text-slate-400 text-[11px]">Для кого и о чём это?</p>
              <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px]">
                «Для одноклассников, моё хобби — роботы»
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-800/60 space-y-1.5">
              <span className="font-bold text-rose-400 block">🚧 4. ОГРАНИЧЕНИЯ</span>
              <p className="text-slate-400 text-[11px]">Что важно учесть?</p>
              <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px]">
                «Мобильный, светлая тема, без личных данных»
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-1.5">
              <span className="font-bold text-emerald-400 block">📦 5. РЕЗУЛЬТАТ</span>
              <p className="text-slate-400 text-[11px]">Из чего состоит сайт?</p>
              <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px]">
                «Заголовок, 3 блока текста, кнопка контакта»
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Interactive Site X-Ray (Рентген сайта) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                ИНТЕРАКТИВНЫЙ МОДУЛЬ
              </span>
              <h4 className="font-bold text-base sm:text-lg text-white mt-0.5 flex items-center gap-2">
                <Layout className="w-5 h-5 text-cyan-400" /> 🩻 Рентген сайта: Скелет страницы
              </h4>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveXRayZone('header')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  activeXRayZone === 'header' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Шапка
              </button>
              <button
                onClick={() => setActiveXRayZone('main')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  activeXRayZone === 'main' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Контент
              </button>
              <button
                onClick={() => setActiveXRayZone('footer')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  activeXRayZone === 'footer' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Подвал
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Skeleton representation */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 p-4 space-y-3">
              {/* Header Zone */}
              <div
                onClick={() => setActiveXRayZone('header')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeXRayZone === 'header'
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold font-mono">
                  <span>🧭 ШАПКА (header)</span>
                  <span>{activeXRayZone === 'header' ? 'АКТИВНА ЗОНА' : ''}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">Логотип / Название + Навигация</div>
              </div>

              {/* Main Content Zone */}
              <div
                onClick={() => setActiveXRayZone('main')}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${
                  activeXRayZone === 'main'
                    ? 'bg-purple-950/80 border-purple-400 shadow-lg shadow-purple-500/20 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
                  <span>📄 КОНТЕНТ (main)</span>
                  <span>{activeXRayZone === 'main' ? 'АКТИВНА ЗОНА' : ''}</span>
                </div>
                <div className="text-xs text-slate-300 mt-2 space-y-1">
                  <div className="h-2 w-3/4 bg-purple-400/40 rounded" />
                  <div className="h-2 w-1/2 bg-purple-400/30 rounded" />
                  <div className="h-6 w-24 bg-cyan-400/40 rounded mt-2" />
                </div>
              </div>

              {/* Footer Zone */}
              <div
                onClick={() => setActiveXRayZone('footer')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeXRayZone === 'footer'
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold font-mono">
                  <span>🦶 ПОДВАЛ (footer)</span>
                  <span>{activeXRayZone === 'footer' ? 'АКТИВНА ЗОНА' : ''}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">Контакты + Копирайт + Плашка честности</div>
              </div>
            </div>

            {/* Zone explanation */}
            <div className="space-y-4">
              {activeXRayZone === 'header' && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                  <h5 className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                    🧭 ШАПКА (header): Первое, что видит человек
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Здесь размещается название твоего проекта, логотип и короткие ссылки для перехода по странице. Шапка задаёт тон всему сайту.
                  </p>
                  <div className="text-[11px] text-cyan-200 font-mono bg-cyan-950/80 p-2 rounded-lg">
                    Промпт-подсказка: «В шапке сделай крупное название "RoboKhujand" и кнопку меню».
                  </div>
                </div>
              )}

              {activeXRayZone === 'main' && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-2">
                  <h5 className="font-bold text-purple-300 text-sm flex items-center gap-1.5">
                    📄 КОНТЕНТ (main): Главная ценность страницы
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Основное тело сайта: то, ради чего посетитель открыл страницу. Заголовки, описания проектов, карточки шагов, интерактивные кнопки.
                  </p>
                  <div className="text-[11px] text-purple-200 font-mono bg-purple-950/80 p-2 rounded-lg">
                    Промпт-подсказка: «В контенте расположи 3 карточки с шагами создания робота и кнопку контакта».
                  </div>
                </div>
              )}

              {activeXRayZone === 'footer' && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <h5 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                    🦶 ПОДВАЛ (footer): Завершение и доверие
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Нижняя плашка сайта. Здесь размещаются безопасные контакты (ссылка на соцсеть или email без телефона), копирайт и маркировка «Создано с помощью ИИ».
                  </p>
                  <div className="text-[11px] text-emerald-200 font-mono bg-emerald-950/80 p-2 rounded-lg">
                    Промпт-подсказка: «В подвале напиши "2026 • Создано с помощью ИИ в Google AI Studio"».
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-400">
                💡 Даже не зная кода, запомни эти три слова: <strong>Header, Main, Footer</strong>. С ними ты сможешь точечно командовать ИИ: «Поменяй только в Header...».
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Antipatterns to avoid */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3">
          <h4 className="font-black text-sm sm:text-base text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Карточка 4: Чего избегать при вайб-кодинге
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-rose-300">❌ «Сделай мне сразу огромный сайт со всем на свете»</strong>
              <p className="text-slate-400">ИИ теряется, результат хаотичный и его сложно чинить. Начинай с малого!</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-rose-300">❌ Не тестировать результат сразу</strong>
              <p className="text-slate-400">Ошибки накапливаются, потом трудно понять, где именно сломалось.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-rose-300">❌ Личные данные (адрес, телефон, паспорт)</strong>
              <p className="text-slate-400">Прямое нарушение Щита «Не делись личным». Используй вымышленные контакты!</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <strong className="text-rose-300">❌ Переписывать весь промпт с нуля</strong>
              <p className="text-slate-400">Дольше и непредсказуемо. Делай точечные уточнения: «поменяй только цвет кнопки».</p>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 3: Roleplay Product Owner and Coder */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-purple-400 font-mono">УРОВЕНЬ 3 • ⏱️ 25–40 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" /> 🎭 Ролевая игра: Product Owner и Coder
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
            +25 ОП за практику
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В реальных ИТ-компаниях заказчик (Product Owner) описывает идею простыми словами, а инженер (Coder) переводит её в точные требования для ИИ.
        </p>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRoleplayMode('po')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              roleplayMode === 'po'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            💼 Роль 1: Product Owner (Заказчик)
          </button>
          <button
            onClick={() => setRoleplayMode('coder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              roleplayMode === 'coder'
                ? 'bg-cyan-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            🧑‍💻 Роль 2: Coder (Инженер ИИ)
          </button>
        </div>

        {/* Roleplay Content */}
        {roleplayMode === 'po' ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/50 space-y-3">
            <h4 className="font-bold text-sm text-purple-300">
              Голос заказчика: «Слушай, сделай сайт для нашего школьного шахматного клуба!»
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              «Хочу, чтобы ребята видели расписание кружка по вторникам и четвергам в Худжанде, могли записаться на турнир и видели фото наших кубков. Всё должно быть просто и круто!»
            </p>
            <div className="text-[11px] text-slate-400 italic">
              Задача Coder: превратить эти сырые мысли в 5 частей Строительного промпта и найти, чего не хватает (например, забыли ограничения и безопасные контакты).
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/50 space-y-4">
            <h4 className="font-bold text-sm text-cyan-300">
              Превращение в Строительный промпт (Coder):
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">РОЛЬ:</span> Веб-разработчик
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold">ЦЕЛЬ:</span> Одностраничный сайт школьного шахматного клуба
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">КОНТЕКСТ:</span> Для школьников Худжанда, расписание вт/чт
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">ОГРАНИЧЕНИЯ:</span> Мобильная верстка, без личных номеров телефонов
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">РЕЗУЛЬТАТ:</span> Шапка с названием, блок расписания, блок кубков, кнопка «Записаться на турнир»
              </div>
            </div>

            <button
              onClick={handleCompleteRoleplay}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              {roleplayClarified ? 'Формулировка принята (+25 ОП)!' : 'Зафиксировать разбор промпта'}
            </button>
          </div>
        )}
      </div>

      {/* Cheat Sheet & Mini-Dictionary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-emerald-400 font-mono">СПРАВОЧНИК</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-400" /> 📄 Шпаргалка на один экран & Словарь
            </h3>
          </div>
          <button
            onClick={handleCopyCheatSheet}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition flex items-center gap-1.5 border border-slate-700"
          >
            {copiedCheatSheet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCheatSheet ? 'Скопировано!' : 'Скопировать шпаргалку'}
          </button>
        </div>

        {/* Cheat Sheet Box */}
        <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {cheatSheetText}
        </pre>

        {/* Mini Dictionary */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">📖 Мини-словарь вайб-кодера:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-cyan-300 block font-mono">Vibe Coding</strong>
              <p className="text-slate-400">Создание сайтов через объяснение результата ИИ вместо ручного написания кода.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-purple-300 block font-mono">Строительный промпт</strong>
              <p className="text-slate-400">Точный запрос: Роль + Цель + Контекст + Ограничения + Результат.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-emerald-300 block font-mono">Header / Main / Footer</strong>
              <p className="text-slate-400">Скелет любого сайта: шапка, контентная часть и подвал.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-amber-300 block font-mono">Итерация (iterate)</strong>
              <p className="text-slate-400">Маленький шаг улучшения по одной детали, а не переделка всего заново.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-rose-300 block font-mono">Баг (bug)</strong>
              <p className="text-slate-400">Ошибка или неточность в сайте, которую нужно найти при тестировании.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-indigo-300 block font-mono">Generate ≠ Finished</strong>
              <p className="text-slate-400">Золотое правило: любой черновик ИИ требует проверки своими руками.</p>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <strong className="text-cyan-300 block">🔗 Инструменты сегодняшней миссии:</strong>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
            <div>• <strong>Google AI Studio</strong> (генерация и запуск сайта)</div>
            <div>• <strong>Google Antigravity</strong> (агентный режим)</div>
            <div>• <strong>Портал курса</strong> (ОП и витрина проектов)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
