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
  Shield,
  HeartHandshake,
  ArrowDown,
  Briefcase,
  CheckSquare,
  Wrench,
  BookOpen,
  MapPin,
  ExternalLink,
  Clock,
  Gauge,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Award,
  HelpCircle,
  Trophy,
  MousePointer,
  Eye,
  Globe,
  Monitor,
  Palette,
  Terminal,
  VolumeX,
  Volume2,
  Database,
  ArrowRight,
  Code,
  Download,
  Share2,
  RefreshCw,
  Cpu,
  Star,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson17LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Accessibility: animations enabled
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Superpowers checkboxes
  const [checkedPowers, setCheckedPowers] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false
  });

  const togglePower = (idx: number) => {
    setCheckedPowers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Easter Egg: Click Ladder icon 3 times
  const [ladderClicks, setLadderClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  const handleLadderClick = () => {
    if (easterEggUnlocked) return;
    const next = ladderClicks + 1;
    setLadderClicks(next);
    if (next >= 3) {
      setEasterEggUnlocked(true);
      if (animationsEnabled) {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      addReward(25, '🪜 Пасхалка: Nova взбежала по лестнице Website ➔ Web App ➔ Mobile App (+25 ОП)!');
    }
  };

  // Discussion poll: Which screen on your phone?
  const [pollSelected, setPollSelected] = useState<number | null>(null);
  const pollOptions = [
    { text: 'Обычный сайт в Safari / Chrome (только читал)', pct: 24, type: 'Website' },
    { text: 'Веб-сервис в браузере (задачи, калькулятор, тест)', pct: 36, type: 'Web App' },
    { text: 'Установленное приложение с иконкой на экране', pct: 40, type: 'Mobile App' }
  ];

  // Level 1: Guess Screen Game
  const [activeScreenTab, setActiveScreenTab] = useState<number>(1);
  const [guessedScreens, setGuessedScreens] = useState<Record<number, string | null>>({
    1: null,
    2: null,
    3: null
  });

  const screensData = [
    {
      id: 1,
      name: 'Экран 1: Расписание клуба',
      description: 'Страница с расписанием школьного клуба робототехники. Ты просто заходишь, читаешь время и уходишь.',
      correctType: 'Website',
      explanation: 'Правильно! Это чистый Website: пассивное отображение информации, нет ввода и сохранения данных.'
    },
    {
      id: 2,
      name: 'Экран 2: Список задач (To-Do)',
      description: 'Список дел в браузере. Можно вводить новые задачи, отмечать галочками, и они сохраняются при возвращении.',
      correctType: 'Web App',
      explanation: 'Бинго! Это Web App: пользователь вводит данные, логика обрабатывает их, а память сохраняет состояние.'
    },
    {
      id: 3,
      name: 'Экран 3: Иконка на телефоне',
      description: 'Иконка на главном экране смартфона. Запускается в полный экран без рамок браузера и работает даже в авиарежиме.',
      correctType: 'Mobile App',
      explanation: 'Точно! Это Mobile App (или PWA): установленное на устройство приложение с автономной работой.'
    }
  ];

  // Level 2: Interactive App Formula Builder
  const [formulaUser, setFormulaUser] = useState('Ученик, который хочет не забыть домашку');
  const [formulaInput, setFormulaInput] = useState('Текст новой задачи "Сделать математику"');
  const [formulaLogic, setFormulaLogic] = useState('Проверяет не пустой ли текст и добавляет в список');
  const [formulaData, setFormulaData] = useState('Сохраняет в массив и LocalStorage браузера');
  const [formulaResult, setFormulaResult] = useState('Новая карточка задачи со счётчиком и галочкой');

  const presets = [
    {
      name: '✅ To-Do List',
      user: 'Школьник с плотным расписанием уроков',
      input: 'Название задачи, дедлайн и приоритет',
      logic: 'Фильтрует по дате, переключает флаг completed',
      data: 'Сохраняет массив объектов задач в LocalStorage',
      result: 'Интерактивный список дел с прогресс-баром'
    },
    {
      name: '❓ Mini-Quiz',
      user: 'Студент, готовящийся к тесту по биологии',
      input: 'Клик по одному из 4 вариантов ответа',
      logic: 'Сравнивает выбранный ID с правильным ответом',
      data: 'Хранит текущий счётчик правильных очков (Score)',
      result: 'Зелёная/красная подсветка и финальный процент'
    },
    {
      name: '🔁 Habit Tracker',
      user: 'Подросток, формирующий привычку пить воду',
      input: 'Клик по кнопке "+250 мл воды"',
      logic: 'Прибавляет объём и сверяет с дневной нормой 2000 мл',
      data: 'Хранит историю выпитой воды по дням недели',
      result: 'Анимированная наполняющаяся бутылка и салют'
    },
    {
      name: '🗂️ Flashcards',
      user: 'Изучающий английские слова для IT',
      input: 'Клик "Знаю" или "Повторить"',
      logic: 'Алгоритм интервального повторения карточек',
      data: 'Уровень запоминания каждого иностранного слова',
      result: 'Переворот карточки и показ следующего слова'
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setFormulaUser(preset.user);
    setFormulaInput(preset.input);
    setFormulaLogic(preset.logic);
    setFormulaData(preset.data);
    setFormulaResult(preset.result);
  };

  // Level 2: PWA Bridge Simulator
  const [pwaInstalled, setPwaInstalled] = useState(false);
  const [pwaTransforming, setPwaTransforming] = useState(false);

  const triggerPwaBridge = () => {
    if (pwaInstalled) {
      setPwaInstalled(false);
      return;
    }
    setPwaTransforming(true);
    setTimeout(() => {
      setPwaTransforming(false);
      setPwaInstalled(true);
      if (animationsEnabled) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
      addReward(20, '🌉 Мост PWA активирован: сайт установлен на экран смартфона (+20 ОП)!');
    }, 1200);
  };

  // Level 3: Roleplay State
  const [roleplayActiveRole, setRoleplayActiveRole] = useState<'owner' | 'engineer'>('owner');
  const [roleplayIdea, setRoleplayIdea] = useState('Тренажер фокуса «Pomodoro Cat»: таймер 25 минут, где за каждый рабочий отрезок растет виртуальный котик.');
  const [roleplayFeedbackGiven, setRoleplayFeedbackGiven] = useState(false);

  const handleClaimRoleplayXp = () => {
    if (roleplayFeedbackGiven) return;
    setRoleplayFeedbackGiven(true);
    if (animationsEnabled) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
    addReward(25, '🎭 Ролевая игра «App Product Owner»: спецификация приложения готова (+25 ОП)!');
  };

  // Copy cheat sheet handler
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);
  const cheatSheetText = `WEBSITE    = читаешь информацию
WEB APP    = взаимодействуешь и сохраняешь данные
MOBILE APP = устанавливается на телефон, работает офлайн

ФОРМУЛА ПРИЛОЖЕНИЯ:  User → Input → Logic → Data → Result

МОСТ:  Website → Web App → PWA → 📱 иконка на телефоне

ПРАВИЛО ПРОТОТИПА:  Одна главная функция, которая реально работает

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheatSheet = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2500);
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Accessibility & Quick Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md sticky top-16 z-30 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            МИССИЯ 17
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-300 hidden sm:inline">
            APP BUILDER • 📱 Website vs Web App vs Mobile App
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Easter egg ladder icon */}
          <button
            onClick={handleLadderClick}
            title="Кликни 3 раза, чтобы Nova поднялась по лестнице!"
            className={`p-2 rounded-xl border transition-all ${
              easterEggUnlocked
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 ring-2 ring-amber-400/40'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Animation toggle */}
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            {animationsEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Анимации ВКЛ</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Анимации ВЫКЛ</span>
              </>
            )}
          </button>

          <a
            href="#sec-17-cheatsheet"
            className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 text-xs font-bold transition-all"
          >
            📄 Шпаргалка
          </a>
          <a
            href="#sec-17-tools"
            className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-purple-300 text-xs font-bold transition-all"
          >
            🔗 Инструменты
          </a>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
            🚀 Новый Блок Курса: AI Apps
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 text-xs font-bold backdrop-blur-md">
            ⏱ 90 минут · 7 уровней
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          APP BUILDER: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Website vs Web App vs Mobile App</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Сайт — это то, что ты <strong>читаешь</strong>. Приложение — это то, с чем ты <strong>взаимодействуешь</strong>. Сегодня начинается новый мир: собери свой первый работающий прототип! 📲
        </p>
      </div>

      {/* NOVA Incoming Transmission */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-purple-950/40 border border-cyan-500/30 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-cyan-400 tracking-wider uppercase font-mono">
                Входящее сообщение от NOVA
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
              «Салом, WOW Website Master! 👋 Ты только что триумфально завершил огромный блок сайтов. Но сайт и приложение — это не одно и то же. Сегодня начинается новый мир: <strong>AI Apps</strong>. Ты поймёшь разницу между Website, Web App и Mobile App — и построишь свой первый работающий прототип. Добро пожаловать в блок приложений! 🟢»
            </p>
          </div>
        </div>
      </div>

      {/* AI News of the Week */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            📰 Новости ИИ за эту неделю (Индустрия 2026)
          </h2>
          <span className="text-xs text-slate-400 font-mono">Актуальные тренды разработки</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/50">
                🏗️ 70% Новых Приложений
              </span>
              <span className="text-[11px] text-slate-500 font-mono">No-Code & AI</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Уже <strong>70% новых цифровых продуктов</strong> в мире создаются с помощью no-code и ИИ-инструментов, а не ручным кодингом с нуля.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-cyan-200/90">
              💡 <strong>Почему это важно:</strong> то, чему ты учишься сегодня — это то, как софт делают прямо сейчас в реальном мире.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-800/50">
                ⚡ Скорость × 85%
              </span>
              <span className="text-[11px] text-slate-500 font-mono">UI Генерация</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Современные ИИ-инструменты превращают текстовое описание в рабочий интерфейс приложения за минуты — это экономит <strong>больше 85% времени</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-teal-200/90">
              💡 <strong>Почему это важно:</strong> путь от идеи до первого рабочего прототипа теперь занимает не месяцы, а один школьный урок!
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/50">
                📲 PWA Стандарт 2026
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Мост к телефону</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              «Прогрессивные веб-приложения» (PWA) устанавливаются прямо с сайта на телефон в один клик, обходя магазины приложений App Store и Google Play.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-indigo-200/90">
              💡 <strong>Почему это важно:</strong> это мост между браузером и нативным приложением, который мы разберём сегодня.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/50">
                🚀 +40% Конверсия
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Smart Install UX</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ИИ сам вычисляет самый удачный момент для предложения установить PWA на домашний экран, повышая установки почти на <strong>40%</strong>.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-purple-200/90">
              💡 <strong>Почему это важно:</strong> момент клика и поведение интерфейса — это математически выверенный UX.
            </div>
          </div>
        </div>

        {/* Discussion Poll */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h4 className="font-bold text-white text-sm sm:text-base">
              💬 Вопрос классу: назовите одно приложение на своём телефоне прямо сейчас. Что это?
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pollOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setPollSelected(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all text-xs sm:text-sm ${
                  pollSelected === idx
                    ? 'bg-indigo-950/80 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-cyan-300 mb-1">{opt.type}</div>
                <div className="text-xs text-slate-300">{opt.text}</div>
                {pollSelected !== null && (
                  <div className="mt-2 text-right text-[11px] font-mono text-cyan-400 font-bold">
                    {opt.pct}% учеников
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment & Superpowers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What is needed */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            🎒 Что нужно для миссии
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-cyan-300">💻 Ноутбук / Планшет</span>
              <p className="text-xs text-slate-400">Портал + Google AI Studio для генерации прототипа</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-teal-300">🔑 Логин в портале</span>
              <p className="text-xs text-slate-400">Накопление ОП и твоя цифровая App Library</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-indigo-300">🛠️ Google AI Studio</span>
              <p className="text-xs text-slate-400">Быстрая сборка первого живого кода веб-приложения</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-purple-300">📱 Свой телефон</span>
              <p className="text-xs text-slate-400">Посмотреть на установленные приложения и PWA вживую</p>
            </div>
          </div>
        </div>

        {/* Superpowers */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            🎯 Суперсилы Миссии 17
          </h3>
          <div className="space-y-2.5">
            {[
              '🆚 Отличать Website, Web App и Mobile App по архитектуре и роли',
              '🧩 Понимать формулу приложения: User ➔ Input ➔ Logic ➔ Data ➔ Result',
              '📝 Писать простую и понятную спецификацию приложения',
              '🧪 Строить рабочий интерактивный прототип (To-Do List или Mini-Quiz)',
              '🌉 Понимать мост PWA: превращение обычного сайта в иконку на телефоне'
            ].map((power, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 hover:border-slate-700 cursor-pointer transition-colors text-xs sm:text-sm"
              >
                <input
                  type="checkbox"
                  checked={checkedPowers[idx] || false}
                  onChange={() => togglePower(idx)}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                />
                <span className={checkedPowers[idx] ? 'text-slate-200' : 'text-slate-400 line-through'}>
                  {power}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Map & 3 Shields */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            🗺️ Карта миссии: 7 уровней развития
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
            Всего до +425 ОП за миссию
          </span>
        </div>

        {/* Timeline Visual */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center text-xs">
          {[
            { lvl: 1, name: 'ЗАПУСК', time: '0–10м', xp: '+25 ОП', icon: '🔥', active: true },
            { lvl: 2, name: 'РАСШИФРОВКА', time: '10–25м', xp: 'Теория', icon: '🧠', active: false },
            { lvl: 3, name: 'РОЛЕВАЯ ИГРА', time: '25–40м', xp: '+25 ОП', icon: '🎭', active: false },
            { lvl: 4, name: 'ЛАБОРАТОРИЯ', time: '40–70м', xp: '+150 ОП', icon: '💻', active: false },
            { lvl: 5, name: 'ДОКТОР + ТЕСТ', time: '70–80м', xp: '+100 ОП', icon: '🩺⚡', active: false },
            { lvl: 6, name: 'ПОКАЗ', time: '80–87м', xp: '+25 ОП', icon: '🎤', active: false },
            { lvl: 7, name: 'НОВЫЙ РАНГ', time: '87–90м', xp: '+25 ОП', icon: '🏆', active: false }
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                step.active
                  ? 'bg-cyan-950/50 border-cyan-500/70 text-cyan-200 ring-2 ring-cyan-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xl mb-1">{step.icon}</div>
              <div className="font-extrabold text-white text-[11px] truncate">Ур.{step.lvl} {step.name}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{step.time}</div>
              <div className="text-[10px] text-cyan-400 font-bold mt-1">{step.xp}</div>
            </div>
          ))}
        </div>

        {/* 3 Shields + Special Privacy Rule */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                🛡️ 3 Щита с тобой: Проверяй · Не делись личным · Будь честным
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                📱 <strong>Особое правило приложений:</strong> приложение хранит данные пользователя (задачи, счёт, прогресс). Категорически запрещено собирать реальные телефоны, пароли и личные адреса в прототипе!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 1: LAUNCH — GUESS: WEBSITE OR APP? */}
      {/* ========================================================================= */}
      <div id="level-1" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-mono">
              УРОВЕНЬ 1 • ⏱ 0–10 МИН • 🎁 +25 ОП
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Flame className="w-6 h-6 text-amber-400" />
              🔥 ЗАПУСК: Угадай — сайт или приложение?
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            Ледокол и разминка
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Посмотри на 3 демонстрационных экрана. Как профессиональный инженер определи, к какому типу относится каждый из них:
        </p>

        {/* 3 Screens Interactive Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {screensData.map((screen) => {
            const currentGuess = guessedScreens[screen.id];
            const isCorrect = currentGuess === screen.correctType;

            return (
              <div
                key={screen.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                  currentGuess
                    ? isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
                      : 'bg-rose-950/40 border-rose-500/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 font-mono">Экран #{screen.id}</span>
                    {currentGuess && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {isCorrect ? '✓ Верно' : '✗ Ошибка'}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-base">{screen.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed min-h-[60px]">
                    {screen.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400">Твой вердикт:</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Website', 'Web App', 'Mobile App'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setGuessedScreens(prev => ({ ...prev, [screen.id]: type }));
                          if (type === screen.correctType && animationsEnabled) {
                            confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
                          }
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          currentGuess === type
                            ? type === screen.correctType
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-rose-500 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {currentGuess && (
                    <div className="text-[11px] text-slate-200 mt-2 p-2 rounded bg-slate-900 border border-slate-800 leading-tight">
                      {screen.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Ladder: Website -> Web App -> Mobile App */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-black text-white text-base sm:text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              🪜 Лестница типов: 3 ступени одного восхождения
            </h4>
            <span className="text-xs text-slate-400">Каждая ступень даёт больше возможностей</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">Ступень 1</span>
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h5 className="text-base font-extrabold text-cyan-200">🌐 Website</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Показывает информацию. Пользователь заходит, читает контент и уходит. Данные обычно не сохраняются.
              </p>
              <div className="text-[11px] text-cyan-400 font-mono">Пример: блог, визитка, расписание</div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-500/50 space-y-2 relative ring-1 ring-teal-500/30">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">Ступень 2 (Сегодня!)</span>
                <Sliders className="w-5 h-5 text-teal-400" />
              </div>
              <h5 className="text-base font-extrabold text-teal-200">📊 Web App</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Позволяет взаимодействовать и сохранять состояние. Ты кликаешь, вводишь текст, а сервис обрабатывает логику.
              </p>
              <div className="text-[11px] text-teal-300 font-mono">Пример: To-Do список, квиз, калькулятор</div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-800/40 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">Ступень 3</span>
                <Smartphone className="w-5 h-5 text-indigo-400" />
              </div>
              <h5 className="text-base font-extrabold text-indigo-200">📱 Mobile App / PWA</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Устанавливается на устройство. Имеет собственную иконку на рабочем столе, push-уведомления и работу офлайн.
              </p>
              <div className="text-[11px] text-indigo-300 font-mono">Пример: приложение из стора или PWA</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2: DECODING — 3 TYPES & APP FORMULA */}
      {/* ========================================================================= */}
      <div id="level-2" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest font-mono">
              УРОВЕНЬ 2 • ⏱ 10–25 МИН • КАРТОЧКИ ЗНАНИЙ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Brain className="w-6 h-6 text-teal-400" />
              🧠 РАСШИФРОВКА: 3 типа и формула приложения
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
            Анатомия приложений
          </span>
        </div>

        {/* Card 1: Comparison Matrix */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
              🃏 Карточка 1
            </span>
            <h3 className="font-bold text-white text-lg">Website vs Web App vs Mobile App</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300">
                  <th className="p-3.5 font-bold text-slate-400">Критерий</th>
                  <th className="p-3.5 font-bold text-cyan-400">🌐 Website</th>
                  <th className="p-3.5 font-bold text-teal-400">📊 Web App</th>
                  <th className="p-3.5 font-bold text-indigo-400">📱 Mobile App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-slate-300">Что делает</td>
                  <td className="p-3.5 text-slate-300">Показывает информацию для чтения</td>
                  <td className="p-3.5 text-slate-200">Позволяет взаимодействовать и сохранять данные</td>
                  <td className="p-3.5 text-slate-200">Устанавливается на телефон, работает как родное приложение</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-slate-300">Пример</td>
                  <td className="p-3.5 text-cyan-300">Страница школы, портфолио, статья</td>
                  <td className="p-3.5 text-teal-300">Список задач, калькулятор, квиз в браузере</td>
                  <td className="p-3.5 text-indigo-300">Telegram, Instagram, иконка с рабочего стола</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-slate-300">Данные</td>
                  <td className="p-3.5 text-slate-300">Обычно не хранит персональные данные</td>
                  <td className="p-3.5 text-slate-200">Хранит данные сессии (LocalStorage / база)</td>
                  <td className="p-3.5 text-slate-200">Хранит данные постоянно, работает офлайн</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-slate-300">Как открыть</td>
                  <td className="p-3.5 text-slate-300">Ссылка URL в окне любого браузера</td>
                  <td className="p-3.5 text-slate-200">Ссылка URL в браузере (или PWA)</td>
                  <td className="p-3.5 text-slate-200">Иконка прямо на главном экране телефона</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 2: App Inspiration Ideas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono text-xs font-bold">
              🃏 Карточка 2
            </span>
            <h3 className="font-bold text-white text-lg">Примеры приложений для вдохновения</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { icon: '✅', name: 'To-Do List', prob: 'Помогает не забыть важные уроки и дела' },
              { icon: '🧮', name: 'Calculator', prob: 'Мгновенный подсчёт и вычисления' },
              { icon: '👣', name: 'Step Counter', prob: 'Считает шаги и мотивирует к движению' },
              { icon: '❓', name: 'Quiz Game', prob: 'Проверяет знания в увлекательной форме' },
              { icon: '🗂️', name: 'Flashcards', prob: 'Помогает запоминать слова и формулы' },
              { icon: '📖', name: 'Vocab Trainer', prob: 'Тренирует словарный запас языка' },
              { icon: '🔁', name: 'Habit Tracker', prob: 'Отслеживает привычки: вода, сон, чтение' },
              { icon: '⏱️', name: 'Pomodoro Cat', prob: 'Учит концентрироваться 25 минут' }
            ].map((app, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all space-y-1.5"
              >
                <div className="text-2xl">{app.icon}</div>
                <div className="font-bold text-white text-xs sm:text-sm">{app.name}</div>
                <p className="text-[11px] text-slate-400 leading-snug">{app.prob}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: The Universal App Formula + LIVE BUILDER */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                🃏 Карточка 3
              </span>
              <h3 className="font-bold text-white text-lg">Формула любого приложения в мире</h3>
            </div>
            <span className="text-xs text-indigo-300 font-mono">5 фундаментальных шагов</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 text-center">
            <div className="font-mono text-xs sm:text-sm md:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              ПРИЛОЖЕНИЕ = USER (Пользователь) ➔ INPUT (Ввод) ➔ LOGIC (Логика) ➔ DATA (Данные) ➔ RESULT (Результат)
            </div>
          </div>

          {/* Interactive Live App Formula Builder */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/40 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  🧩 Живой конструктор формулы приложения
                </h4>
                <p className="text-xs text-slate-400">
                  Введи параметры или выбери готовый пресет — живая схема обновится на глазах:
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 5 Connected Interactive Nodes Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-1 text-center">
                <div className="text-[10px] uppercase font-bold text-cyan-400 font-mono">1. USER</div>
                <div className="text-xs font-semibold text-white truncate">{formulaUser}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/50 space-y-1 text-center">
                <div className="text-[10px] uppercase font-bold text-teal-400 font-mono">2. INPUT</div>
                <div className="text-xs font-semibold text-white truncate">{formulaInput}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/50 space-y-1 text-center">
                <div className="text-[10px] uppercase font-bold text-indigo-400 font-mono">3. LOGIC</div>
                <div className="text-xs font-semibold text-white truncate">{formulaLogic}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/50 space-y-1 text-center">
                <div className="text-[10px] uppercase font-bold text-purple-400 font-mono">4. DATA</div>
                <div className="text-xs font-semibold text-white truncate">{formulaData}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-1 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-400 font-mono">5. RESULT</div>
                <div className="text-xs font-semibold text-white truncate">{formulaResult}</div>
              </div>
            </div>

            {/* Editable Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-cyan-300">USER (Кто пользователь?):</label>
                <input
                  type="text"
                  value={formulaUser}
                  onChange={(e) => setFormulaUser(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-teal-300">INPUT (Что он вводит / нажимает?):</label>
                <input
                  type="text"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-indigo-300">LOGIC (Какое правило срабатывает?):</label>
                <input
                  type="text"
                  value={formulaLogic}
                  onChange={(e) => setFormulaLogic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-purple-300">DATA (Где и как сохраняется состояние?):</label>
                <input
                  type="text"
                  value={formulaData}
                  onChange={(e) => setFormulaData(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="font-bold text-emerald-300">RESULT (Что видит пользователь в итоге на экране?):</label>
                <input
                  type="text"
                  value={formulaResult}
                  onChange={(e) => setFormulaResult(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: The PWA Bridge & Simulation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              🃏 Карточка 4
            </span>
            <h3 className="font-bold text-white text-lg">Мост PWA: от сайта к иконке на телефоне</h3>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/30 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-xs font-bold">
                  🌉 Progressive Web App (PWA)
                </span>
                <h4 className="text-xl font-black text-white">
                  WEBSITE ➔ WEB APP ➔ PWA ➔ 📱 Иконка на телефоне
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  PWA — это «золотой мост»: обычный веб-сайт, который можно <strong>установить на телефон одной кнопкой</strong> прямо из браузера без Google Play и App Store! Он открывается в отдельном окне без адресной строки и может работать даже без интернета.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={triggerPwaBridge}
                    disabled={pwaTransforming}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {pwaTransforming ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Трансформация в PWA...
                      </>
                    ) : pwaInstalled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Установлено на главный экран!
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        Симулятор: «Установить на главный экран»
                      </>
                    )}
                  </button>
                  {pwaInstalled && (
                    <button
                      onClick={() => setPwaInstalled(false)}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Сброс
                    </button>
                  )}
                </div>
              </div>

              {/* Animated Smartphone Mockup */}
              <div className="w-56 h-80 rounded-[32px] border-4 border-slate-700 bg-slate-900 p-3 shadow-2xl relative flex flex-col justify-between shrink-0 overflow-hidden">
                {/* Speaker Notch */}
                <div className="w-20 h-3 bg-slate-800 rounded-full mx-auto mb-2" />

                {/* Smartphone Screen Content */}
                <div className="flex-1 rounded-2xl bg-slate-950 p-3 flex flex-col justify-center items-center text-center relative overflow-hidden">
                  {pwaInstalled ? (
                    <div className="space-y-2 animate-bounce">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/40">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-xs font-black text-white">My App PWA</div>
                      <div className="text-[10px] text-emerald-400 font-mono">● Установлено</div>
                    </div>
                  ) : pwaTransforming ? (
                    <div className="space-y-2">
                      <RefreshCw className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
                      <div className="text-xs text-purple-300 font-bold">Сборка манифеста...</div>
                    </div>
                  ) : (
                    <div className="space-y-2 opacity-60">
                      <Globe className="w-10 h-10 text-slate-500 mx-auto" />
                      <div className="text-xs text-slate-400">Сайт в окне браузера</div>
                      <div className="text-[9px] text-slate-500">Нажми кнопку слева</div>
                    </div>
                  )}
                </div>

                {/* Home Indicator */}
                <div className="w-16 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3: ROLEPLAY — APP PRODUCT OWNER */}
      {/* ========================================================================= */}
      <div id="level-3" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest font-mono">
              УРОВЕНЬ 3 • ⏱ 25–40 МИН • 🎁 +25 ОП
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <HeartHandshake className="w-6 h-6 text-indigo-400" />
              🎭 РОЛЕВАЯ ИГРА: App Product Owner vs App Engineer
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            Работа в парах
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          В IT-индустрии приложения создаются в тандеме: <strong>Product Owner</strong> формулирует проблему и ценность для пользователя, а <strong>Engineer</strong> раскладывает идею по технической формуле и записывает спецификацию.
        </p>

        {/* Roles Switcher & Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role 1 Card */}
          <div
            onClick={() => setRoleplayActiveRole('owner')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              roleplayActiveRole === 'owner'
                ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                : 'bg-slate-950 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 font-mono">РОЛЬ 1</span>
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="text-base font-black text-white">💼 App Product Owner</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Придумывает идею приложения и устно описывает партнёру, кто пользователь и какую боль оно решает.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-200">
              «Я хочу сделать таймер фокуса для школьников, чтобы они учились 25 минут без залипания в TikTok...»
            </div>
          </div>

          {/* Role 2 Card */}
          <div
            onClick={() => setRoleplayActiveRole('engineer')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              roleplayActiveRole === 'engineer'
                ? 'bg-cyan-950/60 border-cyan-500 ring-2 ring-cyan-500/30'
                : 'bg-slate-950 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 font-mono">РОЛЬ 2</span>
              <Wrench className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="text-base font-black text-white">🛠️ App Engineer</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Задаёт 5 вопросов по формуле (User? Input? Logic? Data? Result?) и фиксирует мини-спецификацию приложения.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-200">
              «Какой инпут получает система? Что сохраняем в памяти, если пользователь перезагрузит страницу?»
            </div>
          </div>
        </div>

        {/* Specification Draft Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Мини-спецификация вашего тандема:
          </h4>
          <textarea
            value={roleplayIdea}
            onChange={(e) => setRoleplayIdea(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
            placeholder="Запишите сюда согласованную идею и формулу..."
          />
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
            <span className="text-xs text-slate-400">
              Поменяйтесь ролями через 5 минут, чтобы каждый побыл и заказчиком, и инженером!
            </span>
            <button
              onClick={handleClaimRoleplayXp}
              disabled={roleplayFeedbackGiven}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {roleplayFeedbackGiven ? (
                <>
                  <Check className="w-4 h-4" />
                  +25 ОП Получено!
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  Зачесть ролевую игру (+25 ОП)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHEAT SHEET ON ONE SCREEN */}
      {/* ========================================================================= */}
      <div id="sec-17-cheatsheet" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            📄 ШПАРГАЛКА — на один экран
          </h3>
          <button
            onClick={handleCopyCheatSheet}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedCheatSheet ? (
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

        <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
{cheatSheetText}
        </pre>
      </div>

      {/* ========================================================================= */}
      {/* MINI-DICTIONARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          📖 Мини-словарь Миссии 17
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { word: 'Web App', def: 'Приложение, которое работает в браузере и интерактивно сохраняет данные.' },
            { word: 'PWA', def: 'Progressive Web App: сайт, который можно установить на телефон как обычное приложение.' },
            { word: 'Прототип', def: 'Первая рабочая, но упрощённая версия приложения для проверки главной функции.' },
            { word: 'Input / Output', def: 'То, что пользователь вводит (клик, текст) / то, что видит в ответ.' },
            { word: 'State (состояние)', def: 'Текущие данные приложения в памяти (список задач прямо сейчас, счёт игры).' },
            { word: 'APK', def: 'Файл установки приложения для Android-устройств.' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="font-bold text-teal-300 text-xs sm:text-sm font-mono">{item.word}</div>
              <p className="text-xs text-slate-300 leading-snug">{item.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MISSION TOOLS (EXTERNAL LINKS TARGET="_BLANK") */}
      {/* ========================================================================= */}
      <div id="sec-17-tools" className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-purple-400" />
            🔗 Инструменты миссии (открываются в новой вкладке)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Кликните по ссылке для перехода к рабочему инструменту:
          </p>
        </div>

        {/* Main Tools Table */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Основные инструменты:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/20 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-white text-sm group-hover:text-cyan-300 flex items-center gap-1.5">
                  Google AI Studio
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Строим рабочий прототип приложения</div>
              </div>
              <span className="text-xs text-cyan-400 font-mono font-bold">aistudio.google.com ↗</span>
            </a>

            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">AI FOR LIFE Портал</div>
                <div className="text-xs text-slate-400 mt-0.5">Личная App Library, счётчик ОП и сдача заданий</div>
              </div>
              <span className="text-xs text-purple-400 font-mono font-bold">Твой портал ●</span>
            </div>
          </div>
        </div>

        {/* New Additional Tools */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">🆕 Дополнительные инструменты:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://labs.google/opal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-400 transition-all group"
            >
              <div className="font-bold text-white text-xs sm:text-sm group-hover:text-teal-300 flex items-center gap-1">
                Google Opal
                <ExternalLink className="w-3 h-3 text-teal-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Сборка мини-приложений через естественный язык (попробуем в Миссии 20)
              </p>
            </a>

            <a
              href="https://www.pwabuilder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-400 transition-all group"
            >
              <div className="font-bold text-white text-xs sm:text-sm group-hover:text-indigo-300 flex items-center gap-1">
                PWA Builder (Microsoft)
                <ExternalLink className="w-3 h-3 text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Бесплатный инструмент: превращает сайт в устанавливаемое PWA
              </p>
            </a>

            <a
              href="https://www.figma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-400 transition-all group"
            >
              <div className="font-bold text-white text-xs sm:text-sm group-hover:text-purple-300 flex items-center gap-1">
                Figma / Набросок
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Быстро нарисовать экран приложения перед тем, как строить его с ИИ
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon helper
const Brain: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
