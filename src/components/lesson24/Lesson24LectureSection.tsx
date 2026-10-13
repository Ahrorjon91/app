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
  Activity,
  Workflow,
  Wrench,
  Target,
  Trophy,
  Star,
  Rocket,
  ShieldAlert,
  Server,
  Globe,
  GraduationCap,
  Users,
  Mic,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson24LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🎓 in header 3 times -> Nova's final firework salute (+50 EXP)
  const [gradClicks, setGradClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  const handleGradClick = () => {
    const next = gradClicks + 1;
    setGradClicks(next);
    if (next === 3 && !easterEggUnlocked) {
      setEasterEggUnlocked(true);
      addReward(50, '🎆 Финальный салют NOVA: «Ты официально стал Создателем новой цифровой эпохи!» (+50 ОП)');
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 } });
    }
  };

  // Level 1: Reflection Voting on favorite mission
  const [favoriteMission, setFavoriteMission] = useState<string | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleVote = (mId: string) => {
    setFavoriteMission(mId);
    if (!voteSubmitted) {
      setVoteSubmitted(true);
      addReward(25, '🗳️ Твой голос за любимую миссию курса учтен! (+25 ОП)');
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Level 3: Rehearsal Timer in Pairs
  const [rehearsalSeconds, setRehearsalSeconds] = useState(180); // 3 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [partnerFeedback, setPartnerFeedback] = useState({
    clearPoint: '',
    unclearPoint: '',
    impressivePoint: ''
  });
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  // Copy helper
  const [copiedFormula, setCopiedFormula] = useState(false);

  return (
    <div className="space-y-8 text-slate-200">
      {/* ========================================================================= */}
      {/* HERO BANNER SECTION                                                       */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-900 shadow-2xl">
        <div className="relative p-6 sm:p-8 w-full overflow-hidden space-y-4">
          {/* Banner Content */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> Миссия 24 • Финал Курса • Demo Day
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-cyan-400" /> 24 урока позади
                </span>
                <button
                  onClick={handleGradClick}
                  className="p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:border-amber-400 transition-all hover:scale-105 shadow-lg group"
                  title="Финальный выпускной салют NOVA"
                >
                  <GraduationCap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                🎓 DEMO DAY: Момент Показать Миру, Кем Ты Стал!
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium drop-shadow">
                Сегодня — твой момент. Родители, друзья, менторы — все здесь, чтобы увидеть 5 реальных работающих проектов, которые ты создал за 3 месяца.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/60 shadow-lg">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-slate-300">
                90 мин (Генеральная репетиция + Демо + Сертификация)
              </span>
            </div>
          </div>
        </div>

        {/* Easter egg message */}
        {easterEggUnlocked && (
          <div className="p-4 bg-gradient-to-r from-amber-950 via-purple-950 to-amber-950 border-t border-amber-500/40 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">Выпускной салют NOVA активирован: </span>
                <span className="text-amber-200">
                  «Ты не просто прошёл курс — ты овладел языком будущего. Продолжай строить и менять мир вокруг себя!» (+50 ОП)
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold shrink-0">
              +50 ОП
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* INCOMING TRANSMISSION FROM NOVA                                           */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              📡 Входящее прощальное сообщение
            </span>
            <h3 className="text-base font-bold text-white">NOVA — Твой AI-проводник за все 24 миссии</h3>
          </div>
        </div>

        <blockquote className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
          «Салом, Portfolio Creator! 👋 Это моё последнее сообщение тебе в этом курсе. 24 миссии назад ты не знал(а), что такое prompt. Сегодня у тебя 5 опубликованных проектов, портфолио и умение работать с ИИ, которого нет у большинства взрослых. Сегодня — Demo Day. Покажи миру, кем ты стал(а). Я горжусь тобой. 🏆»
        </blockquote>
      </div>

      {/* ========================================================================= */}
      {/* AI NEWS SPECIAL GRADUATION EDITION                                        */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Новости ИИ — Специальный Выпуск: «Что ждет тебя дальше»
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Почему навыки, полученные на курсе, открывают любые двери в 2026–2030 годах
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              badge: '📈 ВЭФ 2030',
              title: '+170 миллионов новых рабочих мест',
              desc: 'По прогнозам Всемирного экономического форума, технологии ИИ создадут больше возможностей, чем когда-либо — для тех, кто умеет ставить задачи и проверять результат.'
            },
            {
              badge: '💰 Рыночная ценность',
              title: 'Доход выше на 56%',
              desc: 'Специалисты, применяющие ИИ-инструменты в ежедневной работе, растут в профессиональных навыках в 1.5 раза быстрее сверстников.'
            },
            {
              badge: '🎓 Навыки > Диплом',
              title: 'Портфолио реальных проектов',
              desc: 'Ведущие технологические компании 2026 года в первую очередь смотрят на ссылки GitHub и работающие веб-приложения, а не на бумажные оценки.'
            },
            {
              badge: '⌨️ Новая грамотность',
              title: 'ИИ как слепая печать в 90-х',
              desc: 'Умение работать с LLM, собирать архитектуру и кодить в вайбе стало базовым фундаментальным навыком XXI века. Ты освоил его раньше большинства взрослых!'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                {item.badge}
              </span>
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 1: THE 24-MISSION JOURNEY EXPLORER                                  */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Уровень 1: Запуск — Твой путь за 24 миссии
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Вспомни эволюцию от новичка до создателя Full-Stack AI приложений
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-mono font-bold">
            +25 ОП за выбор
          </span>
        </div>

        {/* Milestone Path Horizontal Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-center">
          {[
            { id: 'm1', num: '01', title: 'Что такое AI?', icon: '🤖', level: 'Старт' },
            { id: 'm4', num: '04', title: 'AI Помощник', icon: '🎯', level: 'Промпты' },
            { id: 'm8', num: '08', title: 'AI Видео', icon: '🎬', level: 'Креатив' },
            { id: 'm12', num: '12', title: 'LIVE Сайт', icon: '🌍', level: 'HTML/CSS' },
            { id: 'm16', num: '16', title: 'WOW Website', icon: '🏆', level: 'Сайт #4' },
            { id: 'm20', num: '20', title: 'My Life App', icon: '📱', level: 'Агенты' },
            { id: 'm23', num: '23', title: 'Деплой и Ключи', icon: '📇', level: 'Релиз' },
            { id: 'm24', num: '24', title: 'Demo Day', icon: '🎓', level: 'ФИНАЛ' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => handleVote(m.id)}
              className={`p-3 rounded-2xl border text-center transition-all group ${
                favoriteMission === m.id
                  ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{m.icon}</div>
              <div className="font-mono text-[10px] text-amber-400 font-bold">М-{m.num}</div>
              <div className="font-bold text-white text-xs truncate">{m.title}</div>
              <div className="text-[10px] text-slate-400 mt-1">{m.level}</div>
            </button>
          ))}
        </div>

        {voteSubmitted && (
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-xs sm:text-sm text-amber-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Отличный выбор! Каждая пройденная миссия заложила фундамент для твоего главного триумфа сегодня на Demo Day.
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2: DECODING — THE DEMO DAY FORMULA (3–5 MINUTES)                    */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Уровень 2: Расшифровка — Формула идеального выступления (3–5 минут)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Каноническая 5-частная структура для защиты перед родителями, друзьями и менторами
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
`1️⃣ КТО Я (30 сек): "Меня зовут [Имя]. За 12 недель я прошел курс AI for Life."
2️⃣ ПРОБЛЕМА (30 сек): "Люди часто тратят часы на [Проблема]..."
3️⃣ ЧТО Я ПОСТРОИЛ (2 мин): [Живой показ 2-3 проектов по рабочей ссылке]
4️⃣ ЧЕМУ НАУЧИЛСЯ (30 сек): "Самое главное правило — Generate ≠ Finished..."
5️⃣ ЧТО ДАЛЬШЕ (30 сек): "В будущем я планирую развить проект в [Планы]"`
              );
              setCopiedFormula(true);
              setTimeout(() => setCopiedFormula(false), 2000);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFormula ? 'Скопировано!' : 'Скопировать формулу'}</span>
          </button>
        </div>

        {/* 5-Step Formula Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: '1️⃣',
              time: '30 сек',
              title: 'Кто я',
              speech: '«Меня зовут [Имя]. За 3 месяца на курсе я создал 5 полноценных веб-сервисов...»'
            },
            {
              step: '2️⃣',
              time: '30 сек',
              title: 'Проблема',
              speech: '«Я заметил, что мои друзья постоянно забывают привычки / теряют время на рутину...»'
            },
            {
              step: '3️⃣',
              time: '2 мин',
              title: 'Живой показ',
              speech: '«Вот работающая ссылка. Смотрите: я нажимаю кнопку, и встроенный ИИ мгновенно...»'
            },
            {
              step: '4️⃣',
              time: '30 сек',
              title: 'Урок',
              speech: '«Главный инсайт: Generate ≠ Finished. Настоящее качество создает человек, проверяя код.»'
            },
            {
              step: '5️⃣',
              time: '30 сек',
              title: 'Что дальше',
              speech: '«Я планирую добавить мобильную версию и показать проект на городском хакатоне!»'
            }
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">{f.step} {f.title}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">{f.time}</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">{f.speech}</p>
            </div>
          ))}
        </div>

        {/* 3 Secrets of Confidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span>🗣️ Говори медленнее, чем кажется</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Волнение заставляет тараторить. Сознательно делай короткие паузы перед важными мыслями.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span>👀 Смотри на людей, а не в экран</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Экран — это подсказка. Зрительный контакт с залом создает доверие и уверенность.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <span>💪 Волнение — это нормально!</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Даже спикеры Apple волнуются перед сценой. Это значит, что твой проект для тебя по-настоящему важен!
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3: PAIR REHEARSAL WITH TIMER                                        */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Уровень 3: Репетиция в парах (С таймером и обратной связью)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Одна репетиция вслух перед напарником стоит 10 репетиций про себя (+25 ОП)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-purple-400">
              <Timer className="w-4 h-4" />
              <span>{Math.floor(rehearsalSeconds / 60)}:{(rehearsalSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/20"
            >
              {isTimerRunning ? 'Пауза' : 'Старт таймера'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Что было понятно и четко?
            </label>
            <input
              type="text"
              placeholder="Ясно сформулировал проблему..."
              value={partnerFeedback.clearPoint}
              onChange={e => setPartnerFeedback({ ...partnerFeedback, clearPoint: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Что показалось неясным?
            </label>
            <input
              type="text"
              placeholder="Слишком быстро переключил экран..."
              value={partnerFeedback.unclearPoint}
              onChange={e => setPartnerFeedback({ ...partnerFeedback, unclearPoint: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Что впечатлило больше всего?
            </label>
            <input
              type="text"
              placeholder="Живая работа кнопки вызова ИИ!"
              value={partnerFeedback.impressivePoint}
              onChange={e => setPartnerFeedback({ ...partnerFeedback, impressivePoint: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              if (!partnerFeedback.clearPoint.trim()) return;
              setFeedbackSaved(true);
              addReward(25, '🎭 Репетиция в парах завершена: обратная связь зафиксирована! (+25 ОП)');
              confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
            }}
            disabled={feedbackSaved}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              feedbackSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20'
            }`}
          >
            {feedbackSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ThumbsUp className="w-4 h-4" />}
            <span>{feedbackSaved ? 'Обратная связь сохранена (+25 ОП)' : 'Зафиксировать репетицию (+25 ОП)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
