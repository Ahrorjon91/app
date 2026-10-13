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
  Bug,
  GitBranch,
  Split,
  Search,
  Activity,
  Workflow,
  Wrench,
  Target,
  Trophy,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson21LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🐛 in banner 3 times -> bug runs away & unlocks bonus
  const [bugClicks, setBugClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  const [bugEscaping, setBugEscaping] = useState(false);

  // Animations & Sound toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Level 1: Interactive Voting & Developer vs QA demonstration
  const [devQaStep, setDevQaStep] = useState<number>(0);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [voteStats, setVoteStats] = useState({ yes: 42, no: 5 });

  // Level 2: Interactive Bug Type Switcher
  const [activeBugType, setActiveBugType] = useState<'ui' | 'logic' | 'responsive'>('ui');

  // Level 2: Interactive Expected vs Actual Sandbox
  const [expectedInput, setExpectedInput] = useState('Кнопка должна добавить задачу с валидацией');
  const [actualInput, setActualInput] = useState('Добавляется пустая строка в список задач');
  const [isBugConfirmed, setIsBugConfirmed] = useState(false);

  // Level 2: Regression Demonstration Simulator
  const [regressionFixedA, setRegressionFixedA] = useState(false);
  const [regressionTriggeredB, setRegressionTriggeredB] = useState(false);

  // Level 3: Pair Roleplay Challenge Generator
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [partnerBugLogged, setPartnerBugLogged] = useState(false);
  const [partnerRole, setPartnerRole] = useState<'qa' | 'dev'>('qa');

  const funnyScenarios = [
    {
      title: 'Двойной клик на адреналине',
      action: 'Нажми кнопку «Отправить/Сохранить» 5 раз подряд за 1 секунду',
      target: 'Форма добавления или корзина',
      expected: 'Только одна запись, кнопка блокируется (disable) на время отправки'
    },
    {
      title: 'Пустой призрак',
      action: 'Не вводи ничего в текстовое поле и нажми Enter',
      target: 'Поле ввода имени/задачи/промпта',
      expected: 'Подсветка красным и сообщение «Пожалуйста, заполните поле»'
    },
    {
      title: 'Война экранов (Мобильный тест)',
      action: 'Открой DevTools (F12) -> нажми иконку смартфона (iPhone SE / Galaxy Fold)',
      target: 'Главное меню и карточки',
      expected: 'Кнопки не вылезают за экран, текст переносится и легко читается'
    },
    {
      title: 'Эмодзи-шторм и спецсимволы',
      action: 'Введи в поле ввода строку: 🚀🔥👾 <script>alert(1)</script> !@#$%^&*()',
      target: 'Любой текстовый инпут',
      expected: 'Приложение корректно отображает текст и не ломает разметку'
    }
  ];

  // Handle Easter Egg
  const handleBugClick = () => {
    const next = bugClicks + 1;
    setBugClicks(next);
    if (next >= 3 && !easterEggUnlocked) {
      setBugEscaping(true);
      setEasterEggUnlocked(true);
      if (animationsEnabled) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      addReward(25, '🐛 Пасхалка: Ловкий QA Engineer поймал баг! (+25 ОП)');
      setTimeout(() => setBugEscaping(false), 2000);
    }
  };

  const handleVote = (choice: string) => {
    if (userVote) return;
    setUserVote(choice);
    if (choice === 'yes') {
      setVoteStats((prev) => ({ ...prev, yes: prev.yes + 1 }));
    } else {
      setVoteStats((prev) => ({ ...prev, no: prev.no + 1 }));
    }
    addReward(15, 'Голос в опросе QA принят! (+15 ОП)');
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* ============================================================== */}
      {/* HERO BANNER SECTION                                            */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> AI FOR LIFE · МИССИЯ 21
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Блок 6: Portfolio & Demo Day
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> 90 минут · 7 уровней
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              QA ENGINEER: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Охота на ошибки во всех 5 проектах</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Test cases, баги и regression. 5 проектов, которые нужно проверить как профессионал. 
              Прежде чем показывать свои приложения миру на Demo Day, убедись: они реально работают в любой нестандартной ситуации! 🐛🔍
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleBugClick}
                className={`relative px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center gap-2 hover:bg-cyan-950/60 transition-all cursor-pointer shadow-md ${
                  bugEscaping ? 'animate-bounce text-emerald-400 border-emerald-400' : ''
                }`}
                title="Секретный баг миссии! Кликни 3 раза"
              >
                <Bug className={`w-4 h-4 text-emerald-400 ${bugClicks > 0 ? 'animate-pulse' : ''}`} />
                <span>
                  {easterEggUnlocked
                    ? '🎉 Пасхалка поймана: +25 ОП!'
                    : `Поймай баг в шапке (${bugClicks}/3)`}
                </span>
              </button>

              <button
                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                {animationsEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                <span>{animationsEnabled ? 'Анимации включены' : 'Анимации отключены'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📡 ВХОДЯЩЕЕ СООБЩЕНИЕ ОТ NOVA                                    */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/70 to-indigo-950/40 border border-cyan-500/30 shadow-lg relative">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-cyan-600/30 border border-cyan-400/40">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-cyan-300 text-sm sm:text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Входящее сообщение от NOVA
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Приоритет: Высокий
              </span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              «Салом, Agent Builder! 👋 У тебя уже есть 5 готовых проектов. Но "готово" и "проверено" — это совершенно разные вещи. 
              Сегодня ты наденешь шляпу <strong className="text-cyan-300 not-italic">QA Engineer</strong> — человека, чья работа 
              <span className="text-amber-300 not-italic font-bold"> ломать вещи специально</span>, чтобы найти проблемы раньше пользователей.
              Это начало финального блока курса: Portfolio & Demo Day. Через 4 миссии — большая открытая презентация! 🟢»
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📰 НОВОСТИ ИИ ЗА ЭТУ НЕДЕЛЮ                                    */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> 📰 НОВОСТИ ИИ ЗА ЭТУ НЕДЕЛЮ: QA & Тестирование
          </h3>
          <span className="text-xs text-slate-400">Свежие инсайты индустрии 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-cyan-500/40 transition-colors">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-cyan-400" /> ИИ генерирует тест-кейсы
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ИИ теперь умеет <strong>сам</strong> генерировать тест-кейсы по описанию функций — это сокращает время на планирование тестов до <strong>60%</strong>.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-1.5">
              💡 <em>Почему важно:</em> можешь попросить ИИ придумать нестандартные тест-кейсы для твоих проектов.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition-colors">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-emerald-400" /> «Самовосстанавливающиеся» тесты
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Появились "самовосстанавливающиеся" автотесты — если кнопка поменяла название или цвет, ИИ сам находит её по контексту, а тест не ломается.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-1.5">
              💡 <em>Почему важно:</em> технологии умнеют, но фундаментальный принцип Expected vs Actual неизменен.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-violet-500/40 transition-colors">
            <div className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-violet-400" /> Автономные ИИ-исследователи
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Новые ИИ-агенты умеют <strong>самостоятельно исследовать</strong> интерфейс приложения как живой пользователь и находить непредвиденные баги.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-1.5">
              💡 <em>Почему важно:</em> именно этим ты сегодня займешься руками — примерив роль исследователя ошибок.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-amber-500/40 transition-colors">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-amber-400" /> Человек незаменим в QA
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Специалисты в один голос заявляют: <strong>ИИ не заменяет тестировщика полностью</strong>. Человеческое критическое мышление, эмпатия и здравый смысл остаются ключевыми.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-1.5">
              💡 <em>Почему важно:</em> твоя работа сегодня реальна и ценна, это не просто тренировочное упражнение.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-cyan-200">
            <strong>💬 Вопрос для дискуссии в группе:</strong> Почему, по-вашему, даже самый продвинутый ИИ не может ПОЛНОСТЬЮ заменить человека в тестировании программ?
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎒 ЧТО НУЖНО + СУПЕРСИЛЫ + 3 ЩИТА                              */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Что нужно для миссии */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> 🎒 Что нужно для миссии
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span><strong>Ноутбук / планшет:</strong> Портал + проекты</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span><strong>Логин в портале:</strong> Начисление ОП и баг-лог</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span><strong>GitHub:</strong> Ветки (branches) и коммиты</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span><strong>Все 5 проектов:</strong> То, что мы сегодня тестируем</span>
            </li>
          </ul>
        </div>

        {/* Суперсилы Миссии 21 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> 🎯 Суперсилы Миссии 21
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Писать тест-кейсы: Expected → Actual</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Различать 3 типа багов: UI, Logic, Responsive</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Понимать феномен regression (откат качества)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Использовать ветки Git (branches)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Вести профессиональный Bug Report Log</span>
            </li>
          </ul>
        </div>

        {/* 3 Щита */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 🛡️ 3 Щита Миссии
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">1. Проверяй</span>
              <span className="text-slate-400">— подвергай сомнению даже «рабочий» код</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">2. Не делись личным</span>
              <span className="text-slate-400">— в отчетах не используй пароли и тайны</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-amber-400 font-bold">3. Будь честным</span>
              <span className="text-slate-400">— найденный баг — это находка, а не провал!</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🗺️ КАРТА МИССИИ (7 УРОВНЕЙ)                                      */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" /> 🗺️ Карта миссии (90 минут · 7 уровней)
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">ИТОГО ДО +500 ОП</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          {[
            { lvl: 1, title: 'ЗАПУСК', time: '0–10м', xp: '+25 ОП', icon: '🔥', active: true },
            { lvl: 2, title: 'РАСШИФРОВКА', time: '10–25м', xp: 'Теория', icon: '🧠', active: true },
            { lvl: 3, title: 'РОЛЕВАЯ ИГРА', time: '25–40м', xp: '+25 ОП', icon: '🎭', active: true },
            { lvl: 4, title: 'ЛАБОРАТОРИЯ', time: '40–70м', xp: '+175 ОП', icon: '💻', active: true },
            { lvl: 5, title: 'ДОКТОР + ТЕСТ', time: '70–80м', xp: '+100 ОП', icon: '🩺⚡', active: true },
            { lvl: 6, title: 'ОТЧЁТ QA', time: '80–87м', xp: '+25 ОП', icon: '🎤', active: true },
            { lvl: 7, title: 'НОВЫЙ РАНГ', time: '87–90м', xp: '+25 ОП', icon: '🏆', active: true },
          ].map((item) => (
            <div
              key={item.lvl}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-between gap-1 hover:border-cyan-500/40 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[11px] font-bold text-white line-clamp-1">{item.title}</span>
              <span className="text-[10px] text-slate-400">{item.time}</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                {item.xp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🔥 УРОВЕНЬ 1 — ЗАПУСК: «У меня всё работает!»                   */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-cyan-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
              УРОВЕНЬ 1
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              🔥 ЗАПУСК: «У меня всё работает!»
            </h3>
          </div>
          <span className="text-xs text-slate-400">⏱️ 0–10 мин · 🎁 +25 ОП</span>
        </div>

        {/* Интерактивный диалог: Разработчик vs QA */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" /> Интерактивная демонстрация ментора: Два взгляда на мир
          </h4>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
              <span className="text-lg">🧑‍💻</span>
              <div>
                <strong>Разработчик:</strong> «У меня всё работает! Я только что нажал кнопку и всё сохранилось!» 😊
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 flex items-start gap-3">
              <span className="text-lg">🕵️</span>
              <div>
                <strong>QA Engineer:</strong> «А если нажать вот так дважды? А если открыть на старом смартфоне? А если ничего не вводить в инпут и нажать Enter? А если ввести 1000 смайликов?»
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 text-rose-300 flex items-start gap-3">
              <span className="text-lg">😱</span>
              <div>
                <strong>Разработчик:</strong> «...ой. Оно сломалось намертво и стёрло всю базу данных.»
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic">
            💡 Разработчик инстинктивно тестирует «счастливый путь» (Happy Path) — как приложение ДОЛЖНО использоваться.
            QA Engineer тестирует «неправильные пути» — потому что реальные пользователи нажимают кнопки невпопад, отключают интернет и роняют телефон.
          </p>
        </div>

        {/* Интерактивное голосование */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-amber-400" /> 🗳️ Опрос класса: Ломались ли у тебя приложения от неожиданных действий?
          </h4>
          <p className="text-xs text-slate-300">
            Вспомни случай, когда программа падала от двойного клика, быстрого скролла или спецсимволов.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => handleVote('yes')}
              disabled={!!userVote}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                userVote === 'yes'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <span>Да, постоянно! ({voteStats.yes})</span>
              {userVote === 'yes' && <Check className="w-3.5 h-3.5 text-white" />}
            </button>

            <button
              onClick={() => handleVote('no')}
              disabled={!!userVote}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                userVote === 'no'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <span>Ни разу не замечал ({voteStats.no})</span>
              {userVote === 'no' && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          </div>

          {userVote && (
            <p className="text-xs text-emerald-400 font-medium">
              Спасибо за участие! Твой опыт подтверждает: именно крайние случаи (Edge Cases) определяют надёжность приложения.
            </p>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🧠 УРОВЕНЬ 2 — РАСШИФРОВКА: 4 КЛЮЧЕВЫЕ КАРТОЧКИ QA            */}
      {/* ============================================================== */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
              УРОВЕНЬ 2
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              🧠 РАСШИФРОВКА: 4 Инструмента QA-Инженера
            </h3>
          </div>
          <span className="text-xs text-slate-400">⏱️ 10–25 мин · Фундаментальные понятия</span>
        </div>

        {/* Карточка 1: Test Case Formula */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">1</span>
              🃏 Карточка 1 — Test Case: Expected vs Actual
            </h4>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
              ФОРМУЛА БАГА
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-200 space-y-1.5">
            <div>ОЖИДАЕТСЯ (Expected): что ДОЛЖНО произойти по замыслу проекта</div>
            <div>ФАКТИЧЕСКИ (Actual): что произошло НА САМОМ ДЕЛЕ в браузере</div>
            <div className="text-rose-400 font-bold pt-1">
              Если Expected ≠ Actual ➔ 🐛 ЭТО БАГ!
            </div>
          </div>

          {/* Интерактивный валидатор тест-кейса */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Интерактивный генератор формулы тест-кейса
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-emerald-400 font-semibold block mb-1">
                  Expected (Ожидаемый результат):
                </label>
                <input
                  type="text"
                  value={expectedInput}
                  onChange={(e) => setExpectedInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-rose-400 font-semibold block mb-1">
                  Actual (Фактическое поведение):
                </label>
                <input
                  type="text"
                  value={actualInput}
                  onChange={(e) => setActualInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-300">
                Результат проверки: {expectedInput !== actualInput ? (
                  <strong className="text-rose-400">🐛 Найдено расхождение! (Баг зафиксирован)</strong>
                ) : (
                  <strong className="text-emerald-400">✅ Поведение совпадает (Тест пройден)</strong>
                )}
              </span>
              <button
                onClick={() => {
                  setIsBugConfirmed(true);
                  addReward(20, 'Формула тест-кейса успешно рассчитана! (+20 ОП)');
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Записать в лог
              </button>
            </div>
          </div>
        </div>

        {/* Карточка 2: 3 типа багов */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">2</span>
              🃏 Карточка 2 — 3 типа багов: UI, Logic, Responsive
            </h4>
            <span className="text-xs text-slate-400">Кликни для разбора</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'ui',
                icon: '🎨',
                title: 'UI Bug',
                subtitle: 'Что-то выглядит неправильно',
                example: 'Кнопка съехала, текст обрезан, иконка наезжает на заголовок, цвет не контрастный',
                color: 'from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300'
              },
              {
                id: 'logic',
                icon: '🧠',
                title: 'Logic Bug',
                subtitle: 'Что-то работает неправильно',
                example: 'Счётчик считает в минус, кнопка ведёт не на ту страницу, пустые данные сохраняются',
                color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300'
              },
              {
                id: 'responsive',
                icon: '📱',
                title: 'Responsive Bug',
                subtitle: 'Ломается на размере экрана',
                example: 'На мобильном горизонтальный скролл, форма вылезает за пределы, кнопки слишком мелкие',
                color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300'
              }
            ].map((b) => (
              <div
                key={b.id}
                onClick={() => setActiveBugType(b.id as any)}
                className={`p-4 rounded-xl border bg-gradient-to-br cursor-pointer transition-all ${b.color} ${
                  activeBugType === b.id ? 'ring-2 ring-white scale-[1.02]' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="font-bold text-white text-sm">{b.title}</div>
                <div className="text-[11px] text-slate-300 mb-2">{b.subtitle}</div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  <strong>Пример:</strong> {b.example}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <LightbulbIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Совет эксперта:</strong> Большинство начинающих разработчиков ищут только UI-баги. Настоящий QA Engineer ищет <strong>все три категории</strong>!
            </span>
          </div>
        </div>

        {/* Карточка 3: Regression */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-rose-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">3</span>
              🃏 Карточка 3 — Regression: когда исправление ломает другое
            </h4>
            <span className="text-xs font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
              ЦЕПНАЯ РЕАКЦИЯ
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span>Исправил Баг A</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">🎉 Работает!</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Проверил остальное</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-rose-400 font-bold">😱 Баг B появился там, где всё было идеально!</span>
            </div>

            <p className="text-slate-400 font-sans text-xs leading-relaxed pt-1">
              🔁 Это называется <strong>regression</strong> («откат назад» в качестве). 
              Именно поэтому после ЛЮБОГО, даже самого маленького фикса, обязательно нужно 
              <strong> перепроверить весь проект заново</strong>.
            </p>
          </div>

          {/* Интерактивный симулятор регрессии */}
          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
            <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
              <span>🔬 Интерактивный симулятор: Попробуй починить кнопку A</span>
              <span className="text-[10px] text-slate-400">Кликни «Исправить Баг A»</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setRegressionFixedA(true);
                  setRegressionTriggeredB(true);
                  if (animationsEnabled) {
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  regressionFixedA
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                }`}
              >
                {regressionFixedA ? '✅ Баг A успешно исправлен!' : '🔧 Исправить Баг A (Кнопка Сохранить)'}
              </button>

              <button
                onClick={() => {
                  setRegressionFixedA(false);
                  setRegressionTriggeredB(false);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Сброс симулятора
              </button>
            </div>

            {regressionTriggeredB && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-600/60 text-xs text-rose-200 flex items-start gap-2.5 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong>РЕГРЕССИЯ ОБНАРУЖЕНА!</strong> Баг A закрыт, но в компоненте корзины кнопка «Отмена» перестала реагировать на клик. 
                  Требуется полный Regression Test всего модуля.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Карточка 4: Git-ветка */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
              🃏 Карточка 4 — Git-ветка (branch): тестируй, не боясь сломать
            </h4>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              GIT SAFETY
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-emerald-300 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span><strong>main</strong> (основная рабочая версия — ВСЕГДА стабильна)</span>
            </div>
            <div className="pl-6 text-cyan-300 flex items-center gap-2 border-l-2 border-slate-700 ml-2">
              <Split className="w-3.5 h-3.5 text-cyan-400" />
              <span><strong>bug-hunt-test</strong> (ветка эксперимента — ломай и чини смело)</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            🌿 Ветка — это как черновик рядом с чистовиком. Если эксперимент в тестовой ветке сломался — 
            ты просто удаляешь её за 1 секунду. Основная версия на проде (<code className="text-cyan-300 font-mono">main</code>) 
            остаётся целой и невредимой!
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎭 УРОВЕНЬ 3 — РОЛЕВАЯ ИГРА: QA Engineer vs Developer           */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-violet-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-violet-500/20 text-violet-300 font-bold text-xs border border-violet-500/30">
              УРОВЕНЬ 3
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              🎭 РОЛЕВАЯ ИГРА: QA Engineer vs Developer
            </h3>
          </div>
          <span className="text-xs text-slate-400">⏱️ 25–40 мин · 🎁 +25 ОП</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
              🧑‍💻 Роль 1: Developer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Показывает свой проект партнёру по парте, уверенно демонстрируя «как должно работать» по замыслу.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
              🕵️ Роль 2: QA Engineer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Пытается сломать проект: нажимает неожиданно, вводит пустые данные, меняет масштаб экрана и тестирует крайние случаи.
            </p>
          </div>
        </div>

        {/* Генератор испытаний для пары */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-violet-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" /> Генератор каверзных сценариев для проверки:
            </h4>
            <button
              onClick={() => setScenarioIndex((prev) => (prev + 1) % funnyScenarios.length)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Другой сценарий
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Сценарий #{scenarioIndex + 1}: {funnyScenarios[scenarioIndex].title}
            </div>
            <div className="text-xs text-amber-300 font-mono">
              Действие QA: {funnyScenarios[scenarioIndex].action}
            </div>
            <div className="text-xs text-slate-400">
              Цель: {funnyScenarios[scenarioIndex].target}
            </div>
            <div className="text-xs text-emerald-400">
              Ожидается: {funnyScenarios[scenarioIndex].expected}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={() => {
                setPartnerBugLogged(true);
                addReward(25, 'Баг из ролевой игры зафиксирован! (+25 ОП)');
              }}
              disabled={partnerBugLogged}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                partnerBugLogged
                  ? 'bg-emerald-600 text-white'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30'
              }`}
            >
              {partnerBugLogged ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Ролевой баг зафиксирован (+25 ОП)
                </>
              ) : (
                <>
                  <Bug className="w-4 h-4" /> Нашли баг в паре? Зафиксировать (+25 ОП)
                </>
              )}
            </button>

            <span className="text-[11px] text-slate-400">
              Поменяйтесь ролями через 7 минут! Запишите минимум 1 баг для каждого проекта.
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📖 МИНИ-СЛОВАРЬ МИССИИ 21                                      */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>📖 Мини-словарь Миссии 21: QA Engineer</span>
          </h3>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
            QA VOCABULARY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-cyan-500/40 transition-all">
            <div className="font-mono font-bold text-cyan-400 text-sm">Test Case (Тест-кейс)</div>
            <p className="text-slate-300 leading-relaxed">
              Формализованный сценарий проверки: предварительные условия, шаги, ожидаемый результат (Expected) и фактический (Actual).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-rose-500/40 transition-all">
            <div className="font-mono font-bold text-rose-400 text-sm">Bug (Баг / Дефект)</div>
            <p className="text-slate-300 leading-relaxed">
              Несоответствие между тем, как программа ДОЛЖНА работать, и тем, как она РЕАЛЬНО сработала в браузере или приложении.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-pink-500/40 transition-all">
            <div className="font-mono font-bold text-pink-400 text-sm">UI Bug (Баг интерфейса)</div>
            <p className="text-slate-300 leading-relaxed">
              Визуальная ошибка верстки: съехавший текст, перекрытые кнопки, сломанные тени, обрезанные картинки и нечитаемые шрифты.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-amber-500/40 transition-all">
            <div className="font-mono font-bold text-amber-400 text-sm">Logic Bug (Баг логики)</div>
            <p className="text-slate-300 leading-relaxed">
              Сбой программного кода: неверный математический расчет, счетчик уходит в минус, форма сохраняет пустоту, бесконечный цикл.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-blue-500/40 transition-all">
            <div className="font-mono font-bold text-blue-400 text-sm">Responsive Bug (Баг адаптива)</div>
            <p className="text-slate-300 leading-relaxed">
              Поломка макета при смене ширины экрана: появление боковой горизонтальной полосы прокрутки или исчезновение меню на мобильных.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-violet-500/40 transition-all">
            <div className="font-mono font-bold text-violet-400 text-sm">Regression (Регрессия)</div>
            <p className="text-slate-300 leading-relaxed">
              «Эффект домино»: когда исправление одного бага или новая фича случайно ломает функционал, который ранее безупречно работал.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 sm:col-span-2 lg:col-span-3 hover:border-emerald-500/40 transition-all">
            <div className="font-mono font-bold text-emerald-400 text-sm">Git Branch (Ветка в Git)</div>
            <p className="text-slate-300 leading-relaxed">
              Изолированная параллельная версия кодовой базы (например, <code className="text-cyan-300">bug-hunt-test</code>), позволяющая смело экспериментировать и тестировать фиксы, не рискуя сломать рабочую ветку <code className="text-emerald-300">main</code>.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🔗 ИНСТРУМЕНТЫ МИССИИ 21 (С ПЕРЕХОДОМ В НОВОЙ ВКЛАДКЕ)         */}
      {/* ============================================================== */}
      <div id="l21-tools" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>🔗 Инструменты миссии 21</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            Кликни по ссылке любого инструмента, чтобы открыть официальный ресурс в новой вкладке 🚀
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                <th className="py-3 px-4">Инструмент</th>
                <th className="py-3 px-4">Назначение в Bug Hunt</th>
                <th className="py-3 px-4 text-right">Где открыть (ссылка)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-emerald-300 flex items-center gap-2">
                  <span>🐙 GitHub Branches & Pull Requests</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Создание тестовых веток, фиксация коммитов и слияние проверенного кода в main</td>
                <td className="py-3.5 px-4 text-right">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>github.com</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-cyan-300 flex items-center gap-2">
                  <span>⚡ Google AI Studio</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Генерация матриц тест-кейсов, диагностика скрытых багов и точечные исправления</td>
                <td className="py-3.5 px-4 text-right">
                  <a
                    href="https://aistudio.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>aistudio.google.com</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-amber-300 flex items-center gap-2">
                  <span>🛠️ Chrome DevTools (F12)</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Device Mode (эмуляция iPhone/Android), консоль JavaScript-ошибок и инспектор стилей</td>
                <td className="py-3.5 px-4 text-right">
                  <a
                    href="https://developer.chrome.com/docs/devtools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-300 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>devtools.docs</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-indigo-300 flex items-center gap-2">
                  <span>📱 Responsively App</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Одновременное зеркальное тестирование на 5 устройствах с синхронным скроллом и кликами</td>
                <td className="py-3.5 px-4 text-right">
                  <a
                    href="https://responsively.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>responsively.app</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-teal-300 flex items-center gap-2">
                  <span>🎓 Портал AI for LIFE</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Интерактивный Bug Report Log, тренажёр Git-веток и мини-игра «Найди 5 багов»</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-950 border border-teal-800 text-teal-300 font-mono text-xs font-bold">
                    <span>Текущий портал 🧭</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================== */}
        {/* 🆕 ДОПОЛНИТЕЛНЫЕ ИНСТРУМЕНТЫ                                   */}
        {/* ============================================================== */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🆕 Дополнительные инструменты</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-400">
            Профессиональные QA-утилиты для поиска утечек данных, симуляции сетевых сбоев и проверки доступности:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
            <a
              href="https://www.browserstack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-sm group-hover:text-cyan-300 flex items-center gap-1.5">
                  <span>BrowserStack</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Cross-Browser
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Облачное тестирование на сотнях реальных моделей смартфонов iPhone, Samsung, Xiaomi и планшетов без покупки девайсов.
              </p>
            </a>

            <a
              href="https://wave.webaim.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-amber-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-sm group-hover:text-amber-300 flex items-center gap-1.5">
                  <span>WAVE Accessibility</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  Accessibility
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Автоматический сканер контрастности цветов, alt-тегов и доступности интерфейса для людей с особенностями зрения (a11y).
              </p>
            </a>

            <a
              href="https://pagespeed.web.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-emerald-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm group-hover:text-emerald-300 flex items-center gap-1.5">
                  <span>Google PageSpeed</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Speed Test
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Стресс-тест производительности: проверка скорости загрузки на медленном 4G-интернете и выявление тяжелых картинок.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function LightbulbIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
