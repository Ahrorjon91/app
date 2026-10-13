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
  Star,
  Rocket,
  ShieldAlert,
  Server,
  Key,
  Globe,
  RefreshCw,
  Sliders,
  CheckCheck,
  AlertOctagon,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson22LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🔐 in header 4 times -> NOVA reveals glowing vault (+25 EXP)
  const [lockClicks, setLockClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  const handleLockClick = () => {
    const next = lockClicks + 1;
    setLockClicks(next);
    if (next === 4 && !easterEggUnlocked) {
      setEasterEggUnlocked(true);
      addReward(25, '🗝️ Секретный сейф взломан! NOVA подмигивает: «Ключи под надежной охраной!» (+25 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    }
  };

  // Animations toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Voting: How many times do big companies deploy per month?
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleVote = (option: string) => {
    setSelectedVote(option);
    if (!voteSubmitted) {
      setVoteSubmitted(true);
      addReward(15, '🗳️ Твой голос в опросе учтен! (+15 ОП)');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // Level 2 Card 1: Interactive Environment Switcher (Test vs Live)
  const [activeEnv, setActiveEnv] = useState<'test' | 'live'>('test');
  const [envActionFeedback, setEnvActionFeedback] = useState<string | null>(null);

  const handleTestBreak = () => {
    setEnvActionFeedback('🧪 В Test-окружении произошел сбой! Никто из пользователей не пострадал. Можно спокойно чинить ветку!');
  };

  const handleLiveAlert = () => {
    setEnvActionFeedback('🚨 ВНИМАНИЕ! В Live-окружении реальные пользователи увидели ошибку 500! Никогда не ломай Live напрямую!');
  };

  // Level 2 Card 2: Interactive Secret Vault Demo
  const [secretType, setSecretType] = useState<'bad' | 'good'>('bad');
  const [vaultKeyCopied, setVaultKeyCopied] = useState(false);

  // Level 3: WOW-Demo - Interactive Live CI/CD Pipeline Simulator
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
  const [pipelineCurrentStep, setPipelineCurrentStep] = useState<number>(0);
  const [pipelineLog, setPipelineLog] = useState<string[]>([]);
  const [forceFailNext, setForceFailNext] = useState(false);
  const [pipelineRewardClaimed, setPipelineRewardClaimed] = useState(false);

  const runPipelineSimulation = () => {
    setPipelineState('running');
    setPipelineCurrentStep(1);
    setPipelineLog(['[CI/CD] Запущен робот GitHub Actions на ветке main...']);

    // Step 1: Build
    setTimeout(() => {
      setPipelineCurrentStep(2);
      setPipelineLog((prev) => [...prev, '✓ [1/3 BUILD] Vite компилирует TypeScript и сжимает бандл (2.4s)']);

      // Step 2: Test
      setTimeout(() => {
        if (forceFailNext) {
          setPipelineCurrentStep(2);
          setPipelineState('failure');
          setPipelineLog((prev) => [
            ...prev,
            '✗ [2/3 TEST FAILED] Ошибка в тестах безопасности: обнаружен жестко прописанный API-ключ в index.ts!',
            '🛑 Публикация ОСТАНОВЛЕНА! Робот защитил боевой сайт от поломки и утечки данных.'
          ]);
          setForceFailNext(false);
          return;
        }

        setPipelineCurrentStep(3);
        setPipelineLog((prev) => [...prev, '✓ [2/3 TEST] Проверка на регрессию и аудит секретов пройдены успешно (0.9s)']);

        // Step 3: Deploy
        setTimeout(() => {
          setPipelineCurrentStep(4);
          setPipelineState('success');
          setPipelineLog((prev) => [
            ...prev,
            '✓ [3/3 DEPLOY] Проект опубликован в облако! CDN обновлен.',
            '🚀 100% УСПЕХ: Весь мир видит обновленный сайт с зеленой галочкой ✅'
          ]);
          if (!pipelineRewardClaimed) {
            setPipelineRewardClaimed(true);
            addReward(25, '🚀 WOW-ДЕМО: Твой первый CI/CD Pipeline успешно завершен! (+25 ОП)');
            confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
          }
        }, 1200);
      }, 1300);
    }, 1100);
  };

  return (
    <div className="space-y-10 text-slate-100">
      {/* ============================================================== */}
      {/* 🚀 HERO-БАННЕР МИССИИ 22: DEVOPS ENGINEER                      */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/30 shadow-2xl p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls: Accessibility & Easter Egg */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>БЛОК 6: PORTFOLIO & DEMO DAY • НЕДЕЛЯ 11</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold">
              МИССИЯ 22 • 90 МИН
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Easter Egg Trigger */}
            <button
              onClick={handleLockClick}
              title="Кликни 4 раза для пасхалки!"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                easterEggUnlocked
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 ring-2 ring-amber-500/40'
                  : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
              }`}
            >
              <Lock className={`w-4 h-4 ${easterEggUnlocked ? 'animate-bounce text-amber-300' : ''}`} />
            </button>

            {/* Accessibility Toggle */}
            <button
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {animationsEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>{animationsEnabled ? 'Анимации вкл' : 'Анимации выкл'}</span>
            </button>
          </div>
        </div>

        {/* Easter Egg Banner if unlocked */}
        {easterEggUnlocked && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-cyan-500/20 border border-amber-500/50 flex items-center gap-3 shadow-lg animate-in fade-in">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0 animate-spin" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-amber-300">🔐 ПАСХАЛКА NOVA РАСКРЫТА (+25 ОП)!</span>
              <p className="text-slate-300">
                «Ты открыл цифровой сейф! Правило золотого стандарта: ни один API-ключ не попадет в коммит!»
              </p>
            </div>
          </div>
        )}

        {/* Banner Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>ФИНАЛЬНАЯ ТЕХНИЧЕСКАЯ МИССИЯ КУРСА</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              DEVOPS ENGINEER:{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                SHIP IT! 🚀
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Автоматизируй путь <strong>Build → Test → Deploy</strong>, настрой окружения (Test vs Live), 
              спрячь секреты в Environment Variables и проведи тотальный <strong>Security Audit</strong> всех 5 проектов перед выходом на открытый Demo Day!
            </p>

            {/* Mission Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Длительность</span>
                <span className="text-sm sm:text-base font-black text-cyan-400">90 МИН</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Уровней</span>
                <span className="text-sm sm:text-base font-black text-indigo-400">7 ЭТАПОВ</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Аудит</span>
                <span className="text-sm sm:text-base font-black text-amber-400">5 ПРОЕКТОВ</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Награда</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">+500 ОП</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📡 ВХОДЯЩЕЕ СООБЩЕНИЕ ОТ NOVA                                   */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shrink-0">
            <Bot className="w-7 h-7 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">📡 Входящее сообщение от NOVA</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                LIVE COMM
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              «Салом, QA Engineer! 👋 Твои проекты уже протестированы на баги в Миссии 21. 
              Сегодня — роль <strong>DevOps Engineer</strong>: человека, который следит, чтобы путь от "написал код" до "весь мир это видит" был 
              <span className="text-cyan-300 font-bold"> быстрым, надёжным и абсолютно безопасным</span>. 
              Это последняя техническая миссия курса. Дальше — только упаковка портфолио и Demo Day! 🟢»
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📰 НОВОСТИ ИИ В DEVOPS (2026)                                  */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              ТРЕНДЫ ИНДУСТРИИ • ФЕВРАЛЬ 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-cyan-400" />
              <span>Новости ИИ в DevOps за эту неделю</span>
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            Real Tech 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <span className="text-lg">📊</span>
              <span>Сокращение сбоев публикаций на 30%</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Команды, внедрившие ИИ в CI/CD (автоматическую публикацию), сократили число неудачных релизов на <strong>30%</strong> и стали выпускать обновления на <strong>20% чаще</strong>.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80 pt-1">
              💡 Почему это важно: быстрый релиз без ручной рутины дает свободу творчеству!
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <span className="text-lg">🛡️</span>
              <span>63% безопасников используют ИИ-сканеры</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Более <strong>63%</strong> специалистов по кибербезопасности назвали ИИ надежным напарником в поиске утечек ключей API и уязвимостей в кодовой базе.
            </p>
            <div className="text-[11px] font-mono text-indigo-400/80 pt-1">
              💡 Почему это важно: сегодня мы попросим ИИ провести аудит твоих 5 проектов.
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-violet-500/40 transition-all space-y-2">
            <div className="flex items-center gap-2 text-violet-300 font-bold text-sm">
              <span className="text-lg">🤖</span>
              <span>Переход к «Агентному DevOps»</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Индустрия переходит от простых скриптов к ИИ-агентам, которые сами замечают аномалии в логах и автоматически откатывают релиз назад (Rollback).
            </p>
            <div className="text-[11px] font-mono text-violet-400/80 pt-1">
              💡 Почему это важно: прямое продолжение темы автономных агентов из Миссии 20!
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <span className="text-lg">🔄</span>
              <span>Мгновенный откат (Zero Downtime)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Современные облачные платформы умеют переключать трафик между старой и новой версией за миллисекунды, гарантируя бесперебойную работу.
            </p>
            <div className="text-[11px] font-mono text-emerald-400/80 pt-1">
              💡 Почему это важно: у разработчика всегда должна быть стабильная рабочая версия.
            </div>
          </div>
        </div>

        {/* Interactive Class Poll */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 uppercase font-mono">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Опрос класса: Как часто крупные сервисы обновляются?</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">+15 ОП</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Как вы думаете, сколько раз в месяц крупные компании (например, ваша любимая игра или социальная сеть) публикуют обновления?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {[
              { id: 'opt1', text: '1-2 раза в месяц (вручную)' },
              { id: 'opt2', text: 'Каждую неделю по пятницам' },
              { id: 'opt3', text: 'Десятки раз в ДЕНЬ (через CI/CD) 🚀' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleVote(opt.id)}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedVote === opt.id
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {voteSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Верно!</strong> Крупнейшие компании (Amazon, Netflix, Google) делают тысячи автоматических микро-деплоев ежедневно именно благодаря CI/CD!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎯 СУПЕРСИЛЫ & КАРТА 7 УРОВНЕЙ                                  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Superpowers checklist */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span>🎯 Суперсилы Миссии 22</span>
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <Rocket className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Понимать полный путь: <strong>Build → Test → Deploy</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Различать <strong>Test-окружение</strong> и <strong>Live (Production)</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Находить и убирать секреты в <strong>Environment Variables (.env)</strong></span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <Workflow className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Понимать принцип <strong>CI/CD</strong> (автопилот с зеленой галочкой)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Провести 100% <strong>Security Audit</strong> по всем 5 проектам курса</span>
            </div>
          </div>
        </div>

        {/* 3 Shields */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>🛡️ 3 Щита Безопасности (Всегда с тобой)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Главное правило миссии: ни одного открытого пароля или личных данных в кодовой базе.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-xl">🛡️</div>
              <div className="font-bold text-xs text-cyan-300">Проверяй</div>
              <p className="text-[10px] text-slate-400">Код, сборку и ссылки перед показом миру</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-xl">🔐</div>
              <div className="font-bold text-xs text-amber-300">Не делись личным</div>
              <p className="text-[10px] text-slate-400">Ключи и пароли прячь в Environment Variables</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-xl">🤝</div>
              <div className="font-bold text-xs text-emerald-300">Будь честным</div>
              <p className="text-[10px] text-slate-400">Красный крестик — повод исправить, а не замалчивать</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Особое правило: убрать из всех 5 проектов любые пароли, API-ключи и чужие фото.</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🧠 УРОВЕНЬ 2: РАСШИФРОВКА — 4 КАРТОЧКИ DEVOPS                 */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              УРОВЕНЬ 2 • 10–25 МИН
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span>Расшифровка: Окружения, Секреты и CI/CD</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">4 фундаментальные концепции</span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Two Environments (Test vs Live) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                КАРТОЧКА 1 • ENVIRONMENTS
              </span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </div>

            <h4 className="text-base font-bold text-white">Два Окружения: Test vs Live</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Профессиональные инженеры никогда не экспериментируют на боевом сайте, где ходят реальные пользователи.
            </p>

            {/* Interactive Switcher */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveEnv('test')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeEnv === 'test'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🧪 Test (Песочница)
              </button>
              <button
                type="button"
                onClick={() => setActiveEnv('live')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeEnv === 'live'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌍 Live (Production)
              </button>
            </div>

            {activeEnv === 'test' ? (
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800 text-xs text-cyan-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span>🧪 Test-окружение (Черновик):</span>
                  <span className="text-emerald-400">МОЖНО ЛОМАТЬ ✅</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Твоя отдельная ветка `bug-hunt-test`. Здесь проводятся самые смелые тесты. Реальные пользователи этого не видят.
                </p>
                <button
                  type="button"
                  onClick={handleTestBreak}
                  className="px-3 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-[11px] font-semibold text-cyan-200 cursor-pointer"
                >
                  💥 Симулировать поломку в Test
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800 text-xs text-rose-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span>🌍 Live-окружение (Боевая ссылка):</span>
                  <span className="text-rose-400 font-bold">НЕЛЬЗЯ ЛОМАТЬ ❌</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Опубликованный сайт на GitHub Pages / Vercel. Любая ошибка здесь — позор перед клиентами и жюри!
                </p>
                <button
                  type="button"
                  onClick={handleLiveAlert}
                  className="px-3 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-[11px] font-semibold text-rose-200 cursor-pointer"
                >
                  ⚠️ Случайно сломать Live
                </button>
              </div>
            )}

            {envActionFeedback && (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-200 animate-in fade-in">
                {envActionFeedback}
              </div>
            )}
          </div>

          {/* Card 2: Environment Variables & Secrets */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800">
                КАРТОЧКА 2 • SECRETS & .ENV
              </span>
              <Key className="w-4 h-4 text-amber-400" />
            </div>

            <h4 className="text-base font-bold text-white">Секреты и Сейф: process.env</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Никогда не пиши API-ключи открытым текстом! Код на GitHub видят все, а секреты прячут в сейф:
            </p>

            {/* Code Comparison Switcher */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setSecretType('bad')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  secretType === 'bad' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                ❌ Как делать НЕЛЬЗЯ
              </button>
              <button
                type="button"
                onClick={() => setSecretType('good')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  secretType === 'good' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                ✅ Как делают ПРОФИ
              </button>
            </div>

            {secretType === 'bad' ? (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800 font-mono text-xs text-rose-300 space-y-1">
                <div className="text-[10px] text-rose-400 font-bold uppercase">ОПАСНОСТЬ: КЛЮЧ В ОТКРЫТОМ КОДЕ</div>
                <code>const apiKey = "AIzaSy1234567890abcdef";</code>
                <p className="text-[11px] text-slate-400 pt-1 font-sans">
                  Бот украдет этот ключ за 3 секунды после коммита на GitHub и потратит баланс твоего аккаунта!
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800 font-mono text-xs text-emerald-300 space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">БЕЗОПАСНО: КЛЮЧ В СЕЙФЕ</div>
                <code>const apiKey = process.env.API_KEY;</code>
                <p className="text-[11px] text-slate-400 pt-1 font-sans">
                  Ключ лежит в скрытом файле <code>.env</code> или в GitHub Secrets. Код открыт, а сейф заперт!
                </p>
              </div>
            )}
          </div>

          {/* Card 3: What is CI/CD? */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-violet-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-violet-400 px-2.5 py-0.5 rounded bg-violet-950/80 border border-violet-800">
                КАРТОЧКА 3 • CI/CD
              </span>
              <Workflow className="w-4 h-4 text-violet-400" />
            </div>

            <h4 className="text-base font-bold text-white">Что такое CI/CD простыми словами?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>CI/CD</strong> = Continuous Integration / Continuous Deployment («Постоянная сборка и публикация»).
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300">
                <span>1. Ты меняешь код</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>git push</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span>2. Робот САМ собирает</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>проверяет тесты</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span>3. Публикует в интернет</span>
                <ArrowRight className="w-3.5 h-3.5" />
                <span>весь мир видит!</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Вместо ручных копирований файлов специальный робот делает всё на автопилоте!
            </p>
          </div>

          {/* Card 4: Security Checklist before Demo Day */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                КАРТОЧКА 4 • CHECKLIST
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <h4 className="text-base font-bold text-white">Чек-лист перед показом миру</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              4 золотых пункта, которые гарантируют, что проект готов к публичной защите:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Нет паролей и API-ключей в открытом коде</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Нет настоящих личных данных (адрес, телефон, фамилия)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Нет чужих фото и документов без разрешения</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ссылка работает и открывается любым человеком</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎭 УРОВЕНЬ 3: WOW-ДЕМО — АВТОПИЛОТ ПУБЛИКАЦИИ (CI/CD)          */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              УРОВЕНЬ 3 • 25–35 МИН • WOW-ДЕМО
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <span>Автопилот Публикации: Твой первый CI/CD Pipeline</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            +25 ОП ЗА ЗАПУСК
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Посмотри, как работает настоящий автопилот: ты нажимаешь <code className="text-cyan-300 font-mono">git push</code>, 
          а робот последовательно проходит <strong>Build → Test → Deploy</strong>. 
          Если в коде спрятан секрет или баг — робот остановит публикацию и защитит боевой сайт!
        </p>

        {/* Live Pipeline Visualizer Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          {/* 3 Step Trackers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Step 1: BUILD */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                pipelineCurrentStep >= 1
                  ? pipelineCurrentStep === 1
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 animate-pulse'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold uppercase">1. BUILD (Сборка)</span>
                {pipelineCurrentStep > 1 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400">Компиляция TypeScript, упаковка Vite</p>
            </div>

            {/* Step 2: TEST */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                pipelineCurrentStep >= 2
                  ? pipelineState === 'failure'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-bounce'
                    : pipelineCurrentStep === 2
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 animate-pulse'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold uppercase">2. TEST (Безопасность)</span>
                {pipelineCurrentStep > 2 && <Check className="w-4 h-4 text-emerald-400" />}
                {pipelineState === 'failure' && <AlertOctagon className="w-4 h-4 text-rose-400" />}
              </div>
              <p className="text-[11px] text-slate-400">Поиск секретов и регрессионный тест</p>
            </div>

            {/* Step 3: DEPLOY */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                pipelineCurrentStep >= 3
                  ? pipelineCurrentStep === 3
                    ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200 animate-pulse'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold uppercase">3. DEPLOY (В эфир)</span>
                {pipelineCurrentStep === 4 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400">Публикация в облако и CDN</p>
            </div>
          </div>

          {/* Console Output Log */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1 min-h-[100px] max-h-48 overflow-y-auto">
            <div className="text-slate-500 text-[10px] pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>GITHUB ACTIONS CONSOLE • WORKFLOW: deploy.yml</span>
              <span className={`font-bold ${pipelineState === 'success' ? 'text-emerald-400' : pipelineState === 'failure' ? 'text-rose-400' : 'text-slate-400'}`}>
                STATUS: {pipelineState.toUpperCase()}
              </span>
            </div>
            {pipelineLog.length === 0 ? (
              <span className="text-slate-500 italic">Нажми кнопку ниже, чтобы отправить коммит и запустить pipeline...</span>
            ) : (
              pipelineLog.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    line.startsWith('✗') || line.startsWith('🛑')
                      ? 'text-rose-400 font-bold'
                      : line.startsWith('✓') || line.startsWith('🚀')
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pipelineState === 'running'}
                onClick={runPipelineSimulation}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Запустить Pipeline (git push)</span>
              </button>

              <button
                type="button"
                onClick={() => setForceFailNext(!forceFailNext)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  forceFailNext
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {forceFailNext ? '⚠️ Режим сбоя: ВКЛЮЧЕН' : 'Симулировать утечку ключа'}
              </button>
            </div>

            <span className="text-xs text-slate-400 italic">
              {pipelineState === 'success' && '✅ Зеленая галочка получена! Сайт обновлен.'}
              {pipelineState === 'failure' && '🛑 Робот спас продакшн от утечки секретов!'}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📖 МИНИ-СЛОВАРЬ МИССИИ 22                                      */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>📖 Мини-словарь Миссии 22: DevOps Engineer</span>
          </h3>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
            DEVOPS VOCABULARY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-cyan-500/40 transition-all">
            <div className="font-mono font-bold text-cyan-400 text-sm">Build (Сборка)</div>
            <p className="text-slate-300 leading-relaxed">
              Сборка проекта из отдельных исходных файлов кода и картинок в оптимизированный готовый продукт.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-indigo-500/40 transition-all">
            <div className="font-mono font-bold text-indigo-400 text-sm">Deploy (Деплой)</div>
            <p className="text-slate-300 leading-relaxed">
              Публикация проекта на сервере или в облаке, чтобы весь интернет мог открыть его по ссылке.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-amber-500/40 transition-all">
            <div className="font-mono font-bold text-amber-400 text-sm">Environment (Окружение)</div>
            <p className="text-slate-300 leading-relaxed">
              Место, где работает проект: изолированная черновая ветка (Test) или боевой общедоступный сайт (Live).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-emerald-500/40 transition-all">
            <div className="font-mono font-bold text-emerald-400 text-sm">Environment Variable</div>
            <p className="text-slate-300 leading-relaxed">
              Секретное значение (пароль, ключ API), хранящееся отдельно от публичного кода в надежном «сейфе».
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-violet-500/40 transition-all">
            <div className="font-mono font-bold text-violet-400 text-sm">CI/CD</div>
            <p className="text-slate-300 leading-relaxed">
              Автоматическая сборка, тестирование и публикация без участия человека при каждом изменении кода.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 hover:border-rose-500/40 transition-all">
            <div className="font-mono font-bold text-rose-400 text-sm">Rollback (Откат)</div>
            <p className="text-slate-300 leading-relaxed">
              Мгновенный возврат к предыдущей рабочей версии, если свежее обновление сломало сайт.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5 sm:col-span-2 lg:col-span-3 hover:border-teal-500/40 transition-all">
            <div className="font-mono font-bold text-teal-400 text-sm">Pipeline (Пайплайн)</div>
            <p className="text-slate-300 leading-relaxed">
              Четкая автоматическая цепочка этапов (Build → Test → Deploy), по которой код "летит" прямо в интернет с проверкой на каждом шагу.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🔗 ИНСТРУМЕНТЫ МИССИИ 22 (TARGET="_BLANK")                      */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>🔗 Инструменты миссии 22</span>
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
                <th className="py-3 px-4">Назначение в DevOps</th>
                <th className="py-3 px-4 text-right">Где открыть (ссылка)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-emerald-300 flex items-center gap-2">
                  <span>🐙 GitHub</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Публикация репозиториев, управление ветками и встроенный GitHub Actions</td>
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
                <td className="py-3.5 px-4 text-slate-300">Аудит безопасности, сканирование на скрытые пароли и генерация .env-шаблонов</td>
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
                <td className="py-3.5 px-4 font-bold text-teal-300 flex items-center gap-2">
                  <span>🎓 Портал AI for LIFE</span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">Security Audit Report, тренажёр CI/CD и сдача лабораторной работы</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-950 border border-teal-800 text-teal-300 font-mono text-xs font-bold">
                    <span>Текущий портал 🧭</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 🆕 Дополнительные инструменты */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🆕 Дополнительные инструменты</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-400">
            Профессиональные сервисы для автоматизации деплоя и хранения секретов:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <a
              href="https://docs.github.com/en/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400 text-sm group-hover:text-cyan-300 flex items-center gap-1.5">
                  <span>GitHub Actions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  CI/CD
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Официальный робот автоматизации внутри GitHub: проверяет тесты и деплоит сайт при каждом git push.
              </p>
            </a>

            <a
              href="https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-amber-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-sm group-hover:text-amber-300 flex items-center gap-1.5">
                  <span>GitHub Secrets</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  Vault
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Секретный сейф внутри репозитория: безопасное хранение API-ключей для авто-деплоя без утечек в коммитах.
              </p>
            </a>

            <a
              href="https://github.com/awslabs/git-secrets"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-emerald-500/50 transition-all group block space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-sm group-hover:text-emerald-300 flex items-center gap-1.5">
                  <span>git-secrets Scanner</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Security
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Утилита, которая автоматически блокирует `git commit`, если ты случайно забыл удалить пароль из кода.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
