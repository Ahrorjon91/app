import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  Clock,
  Compass,
  Layers,
  Sliders,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Film,
  RotateCcw,
  Play,
  Pause,
  ArrowDown,
  Navigation,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Monitor,
  Smartphone
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson14LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Navigation smooth scroll helper
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Superpowers checkbox state
  const [checkedPowers, setCheckedPowers] = useState<Record<number, boolean>>({});
  const togglePower = (idx: number) => {
    setCheckedPowers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Discussion state
  const [discussionAnswer, setDiscussionAnswer] = useState('');
  const [discussionSent, setDiscussionSent] = useState(false);

  // Voting state: Level 1
  const [voteChoice, setVoteChoice] = useState<'static' | 'scrolly' | null>(null);
  const [voteStats, setVoteStats] = useState({ static: 4, scrolly: 96 });

  const handleVote = (choice: 'static' | 'scrolly') => {
    if (voteChoice) return;
    setVoteChoice(choice);
    if (choice === 'scrolly') {
      setVoteStats({ static: 3, scrolly: 97 });
      addReward(25, '🗳️ Голос учтён: Ты выбрал кинематографичный Scrollytelling! (+25 ОП)');
    } else {
      setVoteStats({ static: 5, scrolly: 95 });
      addReward(10, '🗳️ Голос учтён! (+10 ОП)');
    }
  };

  // Level 3: Interactive "Live Scroll" Stage Simulator
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setScrollProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAuto(false);
            return 100;
          }
          return prev + 2;
        });
      }, 70);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto]);

  // Which scene is active based on scrollProgress
  // Scene 1: 0 - 25% (🌑 Завязка)
  // Scene 2: 26 - 55% (🏙️ Действие)
  // Scene 3: 56 - 80% (⚡ Поворот)
  // Scene 4: 81 - 100% (🎉 Финал)
  let activeScene = 1;
  if (scrollProgress >= 81) activeScene = 4;
  else if (scrollProgress >= 56) activeScene = 3;
  else if (scrollProgress >= 26) activeScene = 2;

  // Easter Egg: Rapid clicks on scroll runner
  const [clickCount, setClickCount] = useState(0);
  const [eggUnlocked, setEggUnlocked] = useState(false);
  const handleRunnerClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5 && !eggUnlocked) {
      setEggUnlocked(true);
      addReward(25, '🥚 Пасхалка найдена: NOVA кричит «Не так быстро! Дай читателю вдохнуть!» (+25 ОП)');
    }
  };

  // Copy AI Prompt
  const [promptCopied, setPromptCopied] = useState(false);
  const handleCopyPrompt = () => {
    const p = `Сделай scroll-секцию из 4 экранов для моего проекта:
1) Тёмный фон, крупный текст "Что, если твой город изменится за одну ночь?", fade-появление по центру.
2) Картинка города Худжанд-2050, текст сбоку появляется через slide при прокрутке.
3) Портрет героя, текст про его открытие, reveal-эффект (fade + slide-up).
4) Финальный экран с кнопкой действия "Узнать больше", яркий фон с неоновым свечением.
Добавь фиксированную полоску прогресса (Scroll Progress Bar) вверху страницы и поддержку prefers-reduced-motion.`;
    navigator.clipboard.writeText(p);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2500);
  };

  // Copy Cheat Sheet
  const [sheetCopied, setSheetCopied] = useState(false);
  const handleCopySheet = () => {
    const s = `SCROLLYTELLING: История, которая раскрывается по мере прокрутки страницы
СЮЖЕТНАЯ ДУГА: Завязка → Действие → Поворот → Финал
SCROLL-ЗАПРОС = Сцены + Что появляется + Эффект (Миссия 13) + Темп
ТЕМП: Быстро = энергия · Медленно = торжественность
ГЛАВНОЕ ПРАВИЛО: История должна работать даже без анимации — эффект усиливает, а не заменяет
GENERATE ≠ FINISHED | Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;
    navigator.clipboard.writeText(s);
    setSheetCopied(true);
    setTimeout(() => setSheetCopied(false), 2500);
  };

  return (
    <div className="space-y-12 text-slate-100 w-full pb-16">
      {/* Real-time Dynamic Top Progress Bar Simulation for Scrollytelling demo */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 py-2.5 px-4 -mx-4 rounded-b-2xl shadow-xl">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
              SCROLL STORYTELLER • ДЕМО-ИНДИКАТОР ПРОГРЕССА
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {scrollProgress}% СЮЖЕТА
          </span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
          <div
            className="bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold font-mono uppercase tracking-wider">
            МИССИЯ 14 • БЛОК 4
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold font-mono">
            90 МИНУТ · 7 УРОВНЕЙ
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold font-mono">
            БЕЙДЖ: SCROLL STORYTELLER
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          SCROLL STORYTELLER
        </h1>
        <p className="text-base sm:text-xl text-cyan-200/90 font-medium mt-1">
          📜 Scrolling = Storytelling — прокрутка как машина времени для истории
        </p>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed italic">
          «Сегодня прокрутка страницы перестаёт быть просто «пролистать вниз». Она станет <strong>сюжетом</strong>. Страница оживает под пальцем на экране!» 📖✨
        </p>
      </div>

      {/* Sticky Fast-Navigation Menu */}
      <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-sm sticky top-14 z-30">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span>Быстрый переход по карте урока:</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          {[
            { id: 'sec-nova', label: '📡 NOVA' },
            { id: 'sec-news', label: '📰 Новости ИИ' },
            { id: 'sec-reqs', label: '🎒 Что нужно' },
            { id: 'sec-powers', label: '🎯 Суперсилы' },
            { id: 'sec-map', label: '🗺️ Карта' },
            { id: 'sec-shields', label: '🛡️ 3 Щита' },
            { id: 'sec-lvl1', label: '🔥 Уровень 1: Машина времени' },
            { id: 'sec-lvl2', label: '🧠 Уровень 2: Сюжетная дуга' },
            { id: 'sec-lvl3', label: '🎭 Уровень 3: Живая Прокрутка' },
            { id: 'sec-dict', label: '📖 Словарь' },
            { id: 'sec-tools', label: '🔗 Инструменты' },
            { id: 'sec-cheatsheet', label: '📋 Шпаргалка' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => scrollToAnchor(btn.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-900/40 hover:text-cyan-300 text-slate-300 border border-slate-700/60 transition-all cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Incoming Transmission from NOVA */}
      <div id="sec-nova" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              ВХОДЯЩЕЕ СООБЩЕНИЕ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🤖 NOVA: «Прокрутка — это твой кинопроектор»
            </h2>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-base sm:text-lg leading-relaxed">
          «Салом, Motion Designer! 👋 Твой сайт уже реагирует на курсор. Но что, если весь сайт — это <strong>одна большая захватывающая история</strong>, а прокрутка — это то, как читатель её листает?<br />
          Это называется <strong>scrollytelling</strong>, и этим приёмом пользуются лучшие мировые издания (New York Times, National Geographic) и передовые бренды. Сегодня ты попробуешь сам. 🟢»
        </div>
      </div>

      {/* News of the Week */}
      <div id="sec-news" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              📰 НОВОСТИ ИИ И SCROLLYTELLING ЗА ЭТУ НЕДЕЛЮ
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Почему ведущие мировые медиа и цифровые студии отказались от скучного чтения
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-300 font-mono text-xs uppercase">
                <th className="py-3 px-4">Событие / Факт</th>
                <th className="py-3 px-4">Почему это важно рассказчику</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">
                  🏆 Приём scroll-историй придумали журналисты — проект <span className="text-cyan-300">«Snow Fall»</span> про лавину в 2012 году получил <strong className="text-amber-400">Пулитцеровскую премию</strong>
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Это не просто «модный спецэффект» — это признанный высшей журналистикой способ глубокого повествования.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">
                  ⏱️ Люди проводят на scroll-страницах на <strong className="text-emerald-400">+400% больше времени</strong>, чем на обычных статичных
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Твоя история буквально удерживает внимание читателя в 5 раз дольше, превращая случайного гостя в преданного зрителя.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">
                  🧠 Люди <strong className="text-purple-400">запоминают на 67% лучше</strong> информацию, поданную через scroll-историю
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Хочешь, чтобы люди поняли и запомнили твою идею будущего? Расскажи её через интерактивную прокрутку.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-4 px-4 font-bold text-white">
                  ✈️🐦 В 2026 году бренды используют scroll-истории везде: от интерактивных карт авиакомпаний до миграции птиц в National Geographic
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Этим приёмом пользуются топовые международные компании, агентства и дизайн-студии прямо сейчас.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Discussion */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>💬 Вопрос для обсуждения в классе:</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Вспомните любой сайт или презентацию продукта, где прокрутка ощущалась как захватывающее «путешествие». Что там происходило при скролле?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <input
              type="text"
              placeholder="например: Презентация iPhone, где детали телефона разлетались и собирались при скролле..."
              value={discussionAnswer}
              onChange={e => setDiscussionAnswer(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => {
                if (discussionAnswer.trim()) {
                  setDiscussionSent(true);
                  addReward(15, '💬 Мысль отправлена в копилку класса! (+15 ОП)');
                }
              }}
              disabled={discussionSent || !discussionAnswer.trim()}
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer"
            >
              {discussionSent ? '✓ Отправлено' : 'Поделиться мнением'}
            </button>
          </div>
        </div>
      </div>

      {/* Requirements Section: Что нужно для миссии */}
      <div id="sec-reqs" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>🎒 Что нужно для миссии</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-mono text-xs uppercase font-bold">Оборудование</div>
            <h4 className="text-base font-bold text-white">💻 Ноутбук / Планшет</h4>
            <p className="text-xs text-slate-300">Портал курса + редактор кода твоего сайта.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-purple-400 font-mono text-xs uppercase font-bold">Профиль</div>
            <h4 className="text-base font-bold text-white">🔑 Логин в портале</h4>
            <p className="text-xs text-slate-300">Накопление ОП и публикация в Галерее историй.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-mono text-xs uppercase font-bold">ИИ-Студия</div>
            <h4 className="text-base font-bold text-white">🛠️ Google AI Studio</h4>
            <p className="text-xs text-slate-300">Написание HTML/CSS/JS кода scroll-истории.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-amber-400 font-mono text-xs uppercase font-bold">Материалы</div>
            <h4 className="text-base font-bold text-white">🏙️ «Худжанд-2050»</h4>
            <p className="text-xs text-slate-300">Арт города и героя из Миссий 05–06.</p>
          </div>
        </div>
      </div>

      {/* Superpowers: 🎯 Суперсилы Миссии 14 */}
      <div id="sec-powers" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>🎯 Суперсилы Миссии 14</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Отмечай галочками навыки, которые ты осваиваешь на этом уроке:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            '📖 Строить сюжетную дугу для scroll-страницы (Завязка → Действие → Поворот → Финал)',
            '🎬 Разбивать историю на сцены-секции, сменяющиеся при прокрутке экрана',
            '📊 Показывать прогресс истории пользователю через интерактивный индикатор',
            '🎞️ Соединять hover / fade / slide / reveal из прошлой миссии в единый поток',
            '⏳ Управлять темпом: где ускорить события, а где дать зрителю паузу на вдох'
          ].map((power, idx) => (
            <div
              key={idx}
              onClick={() => togglePower(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                checkedPowers[idx]
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checkedPowers[idx]}
                onChange={() => {}}
                className="w-5 h-5 rounded text-cyan-500 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium">{power}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Map: 🗺️ Карта миссии */}
      <div id="sec-map" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <span>🗺️ Карта миссии (90 минут)</span>
          </h2>
          <span className="text-xs font-mono text-cyan-300 font-bold">
            Общая награда: до +450 ОП
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-400 font-mono uppercase">
                <th className="py-2.5 px-3">Уровень</th>
                <th className="py-2.5 px-3">Название уровня</th>
                <th className="py-2.5 px-3">Время</th>
                <th className="py-2.5 px-3">Раздел урока</th>
                <th className="py-2.5 px-3">ОП</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 1</td>
                <td className="py-3 px-3">🔥 ЗАПУСК — Новости + Прокрутка как машина времени</td>
                <td className="py-3 px-3 font-mono">0–10 мин</td>
                <td className="py-3 px-3">1. Лекция</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 2</td>
                <td className="py-3 px-3">🧠 РАСШИФРОВКА — Сюжетная дуга и сцены</td>
                <td className="py-3 px-3 font-mono">10–25 мин</td>
                <td className="py-3 px-3">1. Лекция</td>
                <td className="py-3 px-3 font-mono text-slate-400">—</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 3</td>
                <td className="py-3 px-3">🎭 РОЛЕВАЯ ИГРА — Живая Прокрутка</td>
                <td className="py-3 px-3 font-mono">25–40 мин</td>
                <td className="py-3 px-3">1. Лекция</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 4</td>
                <td className="py-3 px-3">💻 ЛАБОРАТОРИЯ — Строим Scroll-Сцену</td>
                <td className="py-3 px-3 font-mono">40–70 мин</td>
                <td className="py-3 px-3">2. Лабораторная</td>
                <td className="py-3 px-3 font-mono text-cyan-300 font-bold">до +150 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 5</td>
                <td className="py-3 px-3">🩺 ДОКТОР ТЕМПА + ⚡ ИСПЫТАНИЕ 3/3</td>
                <td className="py-3 px-3 font-mono">70–80 мин</td>
                <td className="py-3 px-3">3. Проверка</td>
                <td className="py-3 px-3 font-mono text-purple-300 font-bold">до +100 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 6</td>
                <td className="py-3 px-3">🎤 SCROLL-ПРЕМЬЕРА (20-секундный питч)</td>
                <td className="py-3 px-3 font-mono">80–87 мин</td>
                <td className="py-3 px-3">2. Лабораторная</td>
                <td className="py-3 px-3 font-mono text-amber-400 font-bold">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-mono font-bold text-white">Уровень 7</td>
                <td className="py-3 px-3">🏆 НОВЫЙ РАНГ — Финальный тест & Бейдж</td>
                <td className="py-3 px-3 font-mono">87–90 мин</td>
                <td className="py-3 px-3">3. Проверка знаний</td>
                <td className="py-3 px-3 font-mono text-emerald-400 font-bold">до +25 ОП</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ASCII Roadmap */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-center text-cyan-300 overflow-x-auto whitespace-nowrap">
          [ЗАПУСК] → [РАСШИФРОВКА] → [РОЛЕВАЯ ИГРА] → [ЛАБОРАТОРИЯ] → [ДОКТОР+ИСПЫТАНИЕ] → [ПРЕМЬЕРА] → [РАНГ]
          <br />
          &nbsp;&nbsp;&nbsp;🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🧠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🎭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🩺 ⚡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🎤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🏆
        </div>
      </div>

      {/* 3 Shields: 🛡️ 3 Щита */}
      <div id="sec-shields" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span>🛡️ 3 Щита (всегда с тобой)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Щит 1</span>
            <h4 className="text-base font-bold text-white">🛡️ Проверяй</h4>
            <p className="text-xs text-slate-300">
              Смотри на мобильном и десктопе. Плавный ли скролл? Понятен ли текст без анимации?
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Щит 2</span>
            <h4 className="text-base font-bold text-white">🛡️ Не делись личным</h4>
            <p className="text-xs text-slate-300">
              В сюжетах используй вымышленных персонажей и безопасные данные будущего.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Щит 3</span>
            <h4 className="text-base font-bold text-white">🛡️ Будь честным</h4>
            <p className="text-xs text-slate-300">
              Если иллюстрации или код сгенерированы ИИ — открыто указывай это в титрах.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs sm:text-sm leading-relaxed">
          📜 <strong>Особое правило миссии:</strong> история должна быть <strong>понятна без анимации</strong> — если убрать все спецэффекты, текст всё равно должен рассказывать связную историю. Анимация усиливает историю, но не заменяет её!
        </div>
      </div>

      {/* LEVEL 1: 🔥 ЗАПУСК: Прокрутка как машина времени */}
      <div id="sec-lvl1" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              УРОВЕНЬ 1 • 0–10 МИНУТ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              🔥 ЗАПУСК: Прокрутка как машина времени
            </h2>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
            +25 ОП за домашку
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          <strong>Быстрый повтор (2 мин):</strong> покажи ментору 3 эффекта на своём сайте из прошлой миссии.<br />
          <strong>Демонстрация (6 мин):</strong> Взгляни на фундаментальную разницу в архитектуре восприятия:
        </p>

        {/* Comparison: Ordinary vs Scrolly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Static Site */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-mono font-bold">
                ❌ ОБЫЧНАЯ СТРАНИЦА
              </span>
              <span className="text-xs text-slate-500 font-mono">Скучно и плоско</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
              <div className="p-2 bg-slate-800 rounded text-slate-300">[Заголовок сайта]</div>
              <div className="p-2 bg-slate-800 rounded">[Текст статьи на 5 абзацев]</div>
              <div className="p-2 bg-slate-800 rounded">[Статичная картинка]</div>
              <div className="p-2 bg-slate-800 rounded">[Ещё текст] [Кнопка]</div>
            </div>
            <p className="text-xs text-slate-400 italic">
              — Всё видно сразу, глаз устаёт от простыни текста, читатель бегло пролистывает вниз и закрывает вкладку через 4 секунды.
            </p>
          </div>

          {/* Scrollytelling Site */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold">
                ✅ SCROLL-ИСТОРИЯ (SCROLLYTELLING)
              </span>
              <span className="text-xs text-emerald-400 font-mono">Кинематограф</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="p-2 bg-slate-950 border border-cyan-800/40 rounded text-cyan-200">
                Экран 1: Тёмный фон, одна интригующая фраза появляется медленно...
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (пользователь скроллит)</div>
              <div className="p-2 bg-slate-950 border border-purple-800/40 rounded text-purple-200">
                Экран 2: Появляется город Худжанд-2050, текст раскрывает проблему...
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (пользователь скроллит)</div>
              <div className="p-2 bg-slate-950 border border-emerald-800/40 rounded text-emerald-200">
                Экран 3: Герой находит открытие, анимация подчёркивает момент...
              </div>
              <div className="text-center text-cyan-400 text-[10px]">↓ (пользователь скроллит)</div>
              <div className="p-2 bg-slate-950 border border-amber-800/40 rounded text-amber-200">
                Экран 4: Финал — яркий призыв и кнопка действия!
              </div>
            </div>
            <p className="text-xs text-slate-300">
              🤯 Прокрутка стала <strong>временем истории</strong>. Каждый шаг колесика — как перелистывание страниц захватывающей книги.
            </p>
          </div>
        </div>

        {/* Voting: Какая версия интереснее? */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>🗳️ Голосуем: Какую страницу тебе интереснее исследовать?</span>
            </h4>
            <span className="text-xs font-mono text-cyan-400">Награда: +25 ОП</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleVote('static')}
              disabled={!!voteChoice}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                voteChoice === 'static'
                  ? 'bg-rose-950/60 border-rose-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Обычный статичный сайт</span>
                <span className="font-mono text-xs text-slate-400">{voteStats.static}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">«Привычно, просто много текста сразу на экране»</p>
            </button>

            <button
              onClick={() => handleVote('scrolly')}
              disabled={!!voteChoice}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                voteChoice === 'scrolly'
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-cyan-300">Интерактивная Scroll-история</span>
                <span className="font-mono text-xs text-cyan-400 font-bold">{voteStats.scrolly}%</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">«Ощущается как фильм, где я сам управляю показом кадра»</p>
            </button>
          </div>
        </div>
      </div>

      {/* LEVEL 2: 🧠 РАСШИФРОВКА: Сюжетная дуга и сцены */}
      <div id="sec-lvl2" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            УРОВЕНЬ 2 • 10–25 МИНУТ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            🧠 РАСШИФРОВКА: Сюжетная дуга и сцены
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            Изучи 4 базовые карточки, которые превратят твои веб-страницы в захватывающий лонгрид
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono text-xs font-bold">
                КАРТОЧКА 1
              </span>
              <span className="text-xs font-mono text-slate-400">Формула</span>
            </div>
            <h3 className="text-lg font-bold text-white">Сюжетная дуга (уже знакома!)</h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-cyan-300 font-bold text-xs sm:text-sm">
              ЗАВЯЗКА → ДЕЙСТВИЕ → ПОВОРОТ → ФИНАЛ
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              💡 Это та же формула, что и в раскадровке видео (Миссия 07)! Разница в том, что теперь зритель <strong>сам управляет темпом</strong>, прокручивая страницу пальцем или мышкой.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 font-mono text-xs font-bold">
                КАРТОЧКА 2
              </span>
              <span className="text-xs font-mono text-slate-400">Архитектура</span>
            </div>
            <h3 className="text-lg font-bold text-white">Из сюжета в секции сайта</h3>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="p-2 rounded bg-slate-900 flex items-start gap-2">
                <span className="font-bold text-white shrink-0">🌑 Завязка:</span>
                <span>Тёмный экран, интрига: <em>«Что, если твой город изменится за ночь?»</em></span>
              </div>
              <div className="p-2 rounded bg-slate-900 flex items-start gap-2">
                <span className="font-bold text-white shrink-0">🏙️ Действие:</span>
                <span>Картинка Худжанд-2050, текст объясняет, что именно изменилось.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 flex items-start gap-2">
                <span className="font-bold text-white shrink-0">⚡ Поворот:</span>
                <span>Появляется герой, открывает тайну или находит решение проблемы.</span>
              </div>
              <div className="p-2 rounded bg-slate-900 flex items-start gap-2">
                <span className="font-bold text-white shrink-0">🎉 Финал:</span>
                <span>Яркий вывод + кнопка призыва: <em>«Хочешь построить это будущее?»</em></span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-300 font-mono text-xs font-bold">
                КАРТОЧКА 3
              </span>
              <span className="text-xs font-mono text-slate-400">Ритм</span>
            </div>
            <h3 className="text-lg font-bold text-white">Темп: Где ускорить, а где дать вдохнуть</h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1 text-slate-200">
              <div><strong className="text-amber-400">БЫСТРО (короткие сцены):</strong> Напряжение, энергия, динамика</div>
              <div><strong className="text-cyan-400">МЕДЛЕННО (пауза, воздух):</strong> Торжественность, открытие, смысл</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Не лепи сцены вплотную! Дай читателю пару экранов свободного пространства перед главным открытием.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-mono text-xs font-bold">
                КАРТОЧКА 4
              </span>
              <span className="text-xs font-mono text-slate-400">Формула промпта</span>
            </div>
            <h3 className="text-lg font-bold text-white">Scroll-запрос для ИИ</h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
              SCROLL-ЗАПРОС = СЦЕНЫ + ЧТО В КАЖДОЙ + ЭФФЕКТ (L13) + ТЕМП
            </div>
            <div className="pt-1">
              <button
                onClick={handleCopyPrompt}
                className="w-full py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {promptCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{promptCopied ? 'Промпт скопирован!' : 'Скопировать готовый scroll-промпт'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 3: 🎭 РОЛЕВАЯ ИГРА: Живая Прокрутка */}
      <div id="sec-lvl3" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-purple-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              УРОВЕНЬ 3 • 25–40 МИНУТ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              🎭 РОЛЕВАЯ ИГРА: «Живая Прокрутка»
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Интерактивный симулятор сцен: двигай ползунок времени и наблюдай, как сцены оживают по очереди!
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
            +25 ОП за игру
          </span>
        </div>

        {/* Live Simulator Controls */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-600/20"
              >
                {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingAuto ? 'Остановить скролл' : 'Авто-прокрутка'}</span>
              </button>
              <button
                onClick={() => setScrollProgress(0)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>В начало</span>
              </button>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">ТЕКУЩАЯ СЦЕНА:</span>
              <span className="text-sm sm:text-base font-bold font-mono text-cyan-300">
                {activeScene === 1 && '🌑 Сцена 1: Завязка (0–25%)'}
                {activeScene === 2 && '🏙️ Сцена 2: Действие (26–55%)'}
                {activeScene === 3 && '⚡ Сцена 3: Поворот (56–80%)'}
                {activeScene === 4 && '🎉 Сцена 4: Финал (81–100%)'}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>0% (Верх сайта)</span>
              <span
                onClick={handleRunnerClick}
                className="cursor-pointer hover:text-cyan-300 transition-colors"
                title="Кликни 5 раз!"
              >
                {scrollProgress}% {eggUnlocked ? '🐰 NOVA: «Не спеши!»' : '🏃 Читатель скроллит'}
              </span>
              <span>100% (Футер)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scrollProgress}
              onChange={e => setScrollProgress(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* 4 Virtual Stage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Scene 1 */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeScene === 1
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-900/40 scale-105 ring-2 ring-cyan-400/20'
                  : 'bg-slate-950 border-slate-800 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 font-bold">СЦЕНА 1</span>
                <span className="text-xs font-mono">0–25%</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">🌑 Завязка</h4>
              <p className="text-xs text-slate-300 italic">
                «Что, если твой родной город Худжанд изменится за одну единственную ночь?..»
              </p>
              <div className="mt-3 text-[11px] text-cyan-300 font-mono">Эффект: Fade-in</div>
            </div>

            {/* Scene 2 */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeScene === 2
                  ? 'bg-slate-900 border-purple-400 shadow-lg shadow-purple-900/40 scale-105 ring-2 ring-purple-400/20'
                  : 'bg-slate-950 border-slate-800 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-purple-400 font-bold">СЦЕНА 2</span>
                <span className="text-xs font-mono">26–55%</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">🏙️ Действие</h4>
              <p className="text-xs text-slate-300 italic">
                «Неоновые аллеи, летающие дроны над Сырдарьей и сады на крышах небоскребов.»
              </p>
              <div className="mt-3 text-[11px] text-purple-300 font-mono">Эффект: Slide-left</div>
            </div>

            {/* Scene 3 */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeScene === 3
                  ? 'bg-slate-900 border-emerald-400 shadow-lg shadow-emerald-900/40 scale-105 ring-2 ring-emerald-400/20'
                  : 'bg-slate-950 border-slate-800 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 font-bold">СЦЕНА 3</span>
                <span className="text-xs font-mono">56–80%</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">⚡ Поворот</h4>
              <p className="text-xs text-slate-300 italic">
                «Но за этим сиянием скрывался сбой центрального ядра... Герой находит ключ!»
              </p>
              <div className="mt-3 text-[11px] text-emerald-300 font-mono">Эффект: Reveal</div>
            </div>

            {/* Scene 4 */}
            <div
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeScene === 4
                  ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-900/40 scale-105 ring-2 ring-amber-400/20'
                  : 'bg-slate-950 border-slate-800 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400 font-bold">СЦЕНА 4</span>
                <span className="text-xs font-mono">81–100%</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">🎉 Финал</h4>
              <p className="text-xs text-slate-300 italic">
                «Город спасён! Построй свой собственный мир будущего вместе с нами.»
              </p>
              <button className="mt-2 w-full py-1 rounded bg-amber-400 text-slate-950 font-bold text-[10px]">
                Исследовать Худжанд →
              </button>
            </div>
          </div>
        </div>

        {/* Real life group game description */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          👥 <strong>Как играть в классе (в группах по 4 человека):</strong> Режиссёр медленно шагает вдоль ряда учеников. Каждый ученик отвечает за свою сцену и произносит фразу ровно в тот момент, когда режиссёр поравнялся с ним! Сначала быстро, потом медленно с паузами — сравните ощущения зрителей.
        </div>
      </div>

      {/* Mini-Dictionary: 📖 Мини-словарь */}
      <div id="sec-dict" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <span>📖 Мини-словарь Миссии 14</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { word: 'Scrollytelling', def: 'Рассказ интерактивной истории через прокрутку веб-страницы' },
            { word: 'Сюжетная дуга', def: 'Структура истории: завязка, действие, поворот и финал' },
            { word: 'Сцена / Секция', def: 'Один экран истории на scroll-странице' },
            { word: 'Темп (Pacing)', def: 'Скорость и ритм подачи истории (быстро vs торжественная пауза)' },
            { word: 'Индикатор прогресса', def: 'Полоска или точки, показывающие, сколько сюжета осталось впереди' },
            { word: 'Intersection Observer', def: 'Браузерная технология, отслеживающая появление элементов при скролле' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-mono font-bold text-cyan-300 text-sm block">{item.word}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools: 🔗 Инструменты миссии */}
      <div id="sec-tools" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            <span>🔗 Инструменты миссии</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Основные и продвинутые утилиты для создания scrollytelling сайтов
          </p>
        </div>

        {/* Core Tools */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Основные инструменты:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white text-sm">Google AI Studio</h5>
              <p className="text-xs text-slate-400">Генерация чистого кода scroll-истории и разметки.</p>
              <span className="text-[11px] font-mono text-cyan-400 block pt-1">aistudio.google.com</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white text-sm">Твой сайт на GitHub Pages</h5>
              <p className="text-xs text-slate-400">Публикация живой страницы в интернете для всего мира.</p>
              <span className="text-[11px] font-mono text-purple-400 block pt-1">Миссия 12</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white text-sm">Портал AI for LIFE</h5>
              <p className="text-xs text-slate-400">Галерея проектов, зачисление ОП и бейдж ранга.</p>
              <span className="text-[11px] font-mono text-emerald-400 block pt-1">Твой портал</span>
            </div>
          </div>
        </div>

        {/* Additional Tools */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-mono font-bold uppercase text-amber-400">🆕 Дополнительные инструменты:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-amber-300 text-sm">Google Antigravity</h5>
              <p className="text-xs text-slate-300">Продвинутый ИИ-инструмент для сложных многошаговых scroll-эффектов.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-cyan-300 text-sm">Intersection Observer API</h5>
              <p className="text-xs text-slate-300">Нативный механизм браузера для отслеживания видимости экранов.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-purple-300 text-sm">Галереи Scrollytelling</h5>
              <p className="text-xs text-slate-300">Примеры в The Pudding, NYT, National Geographic для вдохновения.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cheat Sheet: 📋 Шпаргалка на один экран */}
      <div id="sec-cheatsheet" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              КОНСПЕКТ ДЛЯ РАБОТЫ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              📋 Шпаргалка Миссии 14 — на один экран
            </h2>
          </div>
          <button
            onClick={handleCopySheet}
            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer w-fit"
          >
            {sheetCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{sheetCopied ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>

        <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
{`SCROLLYTELLING:  История, которая раскрывается по мере прокрутки страницы

СЮЖЕТНАЯ ДУГА:  Завязка → Действие → Поворот → Финал

SCROLL-ЗАПРОС = Сцены + Что появляется + Эффект (Миссия 13) + Темп

ТЕМП:  Быстро = энергия · Медленно = торжественность

ГЛАВНОЕ ПРАВИЛО:  История должна работать даже без анимации — эффект усиливает, а не заменяет

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`}
        </pre>
      </div>

      {/* Next Mission Teaser */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            🔮 СЛЕДУЮЩИЙ ШАГ
          </span>
          <h4 className="text-lg sm:text-xl font-black text-white">
            МИССИЯ 15: MEDIA WEB
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Prompt → Image → Video → Website → Animation (Соединяем все медиа курса в единый WOW-проект!)
          </p>
        </div>
        <button
          onClick={() => scrollToAnchor('sec-lvl1')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shrink-0 cursor-pointer shadow-lg shadow-cyan-500/20"
        >
          Наверх к материалам ↑
        </button>
      </div>
    </div>
  );
};
