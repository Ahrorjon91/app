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
  Activity,
  Workflow,
  Wrench,
  Target,
  Trophy,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson20LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🤖 in banner 5 times (number of completed projects)
  const [robotClicks, setRobotClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  // Animations & Sound toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Interactive Level 1: "Отвечает vs Действует"
  const [activeTabA, setActiveTabA] = useState<'responds' | 'acts'>('responds');
  const [actingStep, setActingStep] = useState(0);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);

  // Level 1: Interactive Voting
  const [userVote, setUserVote] = useState<'responds' | 'acts' | null>(null);

  // Level 2: "Живая формула агента" (5 nodes sequential lighting)
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [isFormulaRunning, setIsFormulaRunning] = useState(false);

  // Level 3: Pair Phrase Generator
  const [selectedDomain, setSelectedDomain] = useState<'school' | 'habits' | 'hobby'>('school');
  const [customGoalPhrase, setCustomGoalPhrase] = useState('');
  const [copiedPhrase, setCopiedPhrase] = useState(false);

  // Handle Easter Egg
  const handleRobotClick = () => {
    const next = robotClicks + 1;
    setRobotClicks(next);
    if (next >= 5 && !easterEggUnlocked) {
      setEasterEggUnlocked(true);
      if (animationsEnabled) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      addReward(25, 'Пасхалка 5 звёзд Миссии 20 разблокирована! 🤖⭐');
    }
  };

  // Run Agent Steps in Level 1
  const runAgentSimulation = () => {
    setIsSimulatingAgent(true);
    setActingStep(1);
    setTimeout(() => setActingStep(2), 1200);
    setTimeout(() => setActingStep(3), 2400);
    setTimeout(() => {
      setActingStep(4);
      setIsSimulatingAgent(false);
      if (animationsEnabled) {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }, 3600);
  };

  // Run Formula Lighting in Level 2
  const runFormulaLighting = () => {
    if (isFormulaRunning) return;
    setIsFormulaRunning(true);
    setActiveNodeIndex(0);

    const stepIntervals = [800, 1600, 2400, 3200];
    stepIntervals.forEach((delay, idx) => {
      setTimeout(() => {
        setActiveNodeIndex(idx + 1);
        if (idx === stepIntervals.length - 1) {
          setIsFormulaRunning(false);
          if (animationsEnabled) {
            confetti({
              particleCount: 40,
              spread: 70,
              origin: { y: 0.7 }
            });
          }
        }
      }, delay);
    });
  };

  // Copy goal phrase
  const handleCopyPhrase = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(true);
    setTimeout(() => setCopiedPhrase(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* 1. HERO BANNER & MISSION HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-2xl p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Блок 5: AI Apps • Неделя 10 • Миссия 20 (ФИНАЛ БЛОКА)
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              🎯 PROJECT #5: MY LIFE APP
            </h1>
            <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              🤖 Agent Thinking + Opal — ИИ, который не отвечает, а ДЕЙСТВУЕТ
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              90 минут. 7 уровней. 1 финальное приложение блока «AI Apps». До сих пор твой встроенный ИИ отвечал на вопросы. Сегодня ты узнаешь, как сделать так, чтобы ИИ сам выполнял задачи — и завершишь Project #5! 🤖🏁
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> 90 минут
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Значок «AGENT BUILDER (Lv.20)»
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Project #5: 5 из 5 проектов готовы!
              </span>
              <button
                onClick={handleRobotClick}
                title="Нажми 5 раз для парада 5 проектов!"
                className="p-2 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg active:scale-90"
              >
                <Bot className="w-5 h-5" />
              </button>
            </div>
            {easterEggUnlocked && (
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/90 to-purple-600/90 text-white text-xs font-bold text-center shadow-lg animate-bounce">
                ⭐ Парад 5 Проектов: AI Helper • Video • Web • WOW Web • My Life App! (+25 ОП)
              </div>
            )}
          </div>
        </div>

        {/* Animation Toggle Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Статус портала: Готов к финалу блока AI Apps</span>
          </div>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {animationsEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Анимации и эффекты включены</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span>Анимации отключены</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. INCOMING TRANSMISSION FROM NOVA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Входящее сообщение • NOVA Companion
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              «От "думать" к "действовать" — двойная миссия и финал блока!»
            </h3>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
          «Салом, AI Engineer! 👋 Твоё приложение уже думает. Но "думать" и "делать" — разные вещи.
          Сегодня — двойная миссия: узнать, что такое <strong className="text-cyan-300">AI-агент</strong>, попробовать инструмент <strong className="text-cyan-300">Google Opal</strong>, и завершить твой финальный проект блока — <strong className="text-amber-300">My Life App</strong>.
          Оно должно решать РЕАЛЬНУЮ проблему из твоей жизни. Погнали, время дорого! 🟢»
        </p>
      </div>

      {/* 3. NEWS OF THE WEEK: OPAL FEB 2026 UPDATE */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-white uppercase tracking-wider">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Новости ИИ за эту неделю</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 space-y-1.5">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> Агентный шаг в Google Opal (Февраль 2026)
            </div>
            <p className="text-slate-300">
              Google обновил инструмент Opal: теперь он сам анализирует цель, решает какой подход лучше, и <span className="text-white font-semibold">сам вызывает нужные инструменты</span> (генерацию видео, поиск в вебе).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Бесплатный No-Code в 160+ странах
            </div>
            <p className="text-slate-300">
              Opal — полностью бесплатный конструктор ИИ-workflow. Превращает текстовое описание цели в готовое мини-приложение с постоянной ссылкой для друзей в 1 клик!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-1.5">
            <div className="font-bold text-purple-300 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Агенты сами уточняют детали
            </div>
            <p className="text-slate-300">
              Новые агенты задают уточняющие вопросы, если чего-то не хватает, вместо того чтобы следовать жесткому сценарию или гадать наугад.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Почему это важно тебе сегодня
            </div>
            <p className="text-slate-300">
              Мы разберём именно этот переход: от обычного чат-бота к ИИ, который сам планирует шаги и выполняет задачу до готового результата.
            </p>
          </div>
        </div>

        {/* Discussion Question */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">💬 Вопрос для обсуждения в группе:</span>
            В чём разница между «ИИ, который отвечает на твой вопрос» и «ИИ, который сам планирует и выполняет задачу»?
          </div>
        </div>
      </div>

      {/* 4. THREE SHIELDS & SPECIAL MISSION RULE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>3 Щита AI-инженера (Всегда с тобой)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-sm font-extrabold text-emerald-400 block">🛡️ Проверяй</span>
            <span className="text-xs text-slate-400">Агент может ошибиться в шагах — сверяй факты</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-sm font-extrabold text-cyan-400 block">🛡️ Не делись личным</span>
            <span className="text-xs text-slate-400">Никаких паролей, личных адресов и номеров карт</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-sm font-extrabold text-purple-400 block">🛡️ Будь честным</span>
            <span className="text-xs text-slate-400">Generate ≠ Finished: проект делаешь ты, а ИИ помогает</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Особое правило миссии:</strong> агент — не волшебство. Он может ошибиться в плане или выбрать не тот инструмент. Всегда проверяй, что агент сделал, прежде чем доверять результату.
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. LEVEL 1: ЗАПУСК — Отвечает vs Действует */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
              Уровень 1 • Запуск (00:00 – 00:10)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🔥 Отвечает vs Действует: Интерактивное Сравнение
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-bold text-xs">
            +25 ОП за ДЗ Миссии 19
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Сравните два подхода на реальном примере: подготовка к контрольной по математике.
        </p>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 max-w-md">
          <button
            onClick={() => setActiveTabA('responds')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTabA === 'responds'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ❌ Обычный ИИ (Отвечает)
          </button>
          <button
            onClick={() => setActiveTabA('acts')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTabA === 'acts'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ✅ AI-Агент (Действует)
          </button>
        </div>

        {/* Content Box */}
        {activeTabA === 'responds' ? (
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-3">
            <div className="text-xs text-rose-400 font-bold uppercase">
              Сценарий: Пользователь пишет «Помоги подготовиться к контрольной»
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-300 text-xs sm:text-sm space-y-2 font-mono">
              <p className="text-cyan-400 font-sans font-bold">Вы: «Помоги подготовиться к контрольной по дробям»</p>
              <p className="text-slate-300">
                ИИ: «Вот несколько советов: повтори правила сложения с разными знаменателями, порешай 10 примеров из учебника на стр. 45, выспись перед уроком и не волнуйся!»
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Итог:</strong> ИИ дал лишь текст советов. Все задачи, поиск примеров, проверку ответов и планирование человек должен делать сам.
              </span>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-bold uppercase">
                Сценарий: Агент получает цель «Помоги подготовиться к контрольной»
              </span>
              <button
                onClick={runAgentSimulation}
                disabled={isSimulatingAgent}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                {isSimulatingAgent ? 'Агент выполняет...' : 'Запустить симуляцию агента'}
              </button>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-2.5">
              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                  actingStep >= 1
                    ? 'bg-slate-900 border-cyan-500/50 text-white shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Анализ темы и составление плана на 3 дня</span>
                </div>
                {actingStep >= 1 && (
                  <p className="mt-1 text-xs text-slate-400 pl-7">
                    Агент разбил тему дробей на 3 блока: Знаменатели, Умножение, Смешанные числа.
                  </p>
                )}
              </div>

              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                  actingStep >= 2
                    ? 'bg-slate-900 border-purple-500/50 text-white shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Генерация 5 тренировочных вопросов</span>
                </div>
                {actingStep >= 2 && (
                  <p className="mt-1 text-xs text-slate-400 pl-7">
                    Сгенерированы интерактивные задачи разной сложности с вариантами ответов.
                  </p>
                )}
              </div>

              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                  actingStep >= 3
                    ? 'bg-slate-900 border-amber-500/50 text-white shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Проверка ответов и разбор слабых мест</span>
                </div>
                {actingStep >= 3 && (
                  <p className="mt-1 text-xs text-slate-400 pl-7">
                    Агент выявил ошибку в делении дробей и показал подсказку без спойлера.
                  </p>
                )}
              </div>

              <div
                className={`p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                  actingStep >= 4
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-xl'
                    : 'bg-slate-950/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Итоговый результат: Персональная карточка готовности (88%)</span>
                </div>
                {actingStep >= 4 && (
                  <p className="mt-1 text-xs text-emerald-400/90 pl-7">
                    Готовый отчёт сохранён в приложении. Ты готов к контрольной!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Voting */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-300">
            🗳️ Экспресс-голосование: Какой вариант полезнее лично вам перед контрольной?
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setUserVote('responds');
                addReward(5, 'Голос учтён!');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                userVote === 'responds'
                  ? 'bg-rose-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Советы текстом (12%)
            </button>
            <button
              onClick={() => {
                setUserVote('acts');
                addReward(10, 'Голос учтён!');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                userVote === 'acts'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Агент с пошаговым выполнением (88%)
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. LEVEL 2: РАСШИФРОВКА — Формула Агента */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
            Уровень 2 • Расшифровка (00:10 – 00:20)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            🧠 Формула Агента: Мозг + Инструкции + Инструменты
          </h2>
        </div>

        {/* Card 1: What is an agent */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>Карточка 1 — Анатомия Агента</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-xs sm:text-sm text-center text-cyan-300">
            AGENT = МОДЕЛЬ (мозг) + ИНСТРУКЦИИ (правила) + ИНСТРУМЕНТЫ (руки)
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            💡 Обычный чат — это только "мозг". Агент — это "мозг" + руки, которые могут реально что-то сделать: найти информацию в интернете, создать документ, запустить инструмент создания видео или сохранить данные в базу.
          </p>
        </div>

        {/* Card 2: Interactive 5 Nodes Formula */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-xs font-extrabold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Workflow className="w-4 h-4" />
              <span>Карточка 2 — Живая Формула Действия Агента</span>
            </div>
            <button
              onClick={runFormulaLighting}
              disabled={isFormulaRunning}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-400 transition-all flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              {isFormulaRunning ? 'Цепочка зажигается...' : 'Зажечь цепочку формулы'}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Нажмите на кнопку или кликните по узлу «ЦЕЛЬ», чтобы увидеть анимированное пошаговое выполнение агентного цикла:
          </p>

          {/* 5 Nodes Graph */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
            {[
              {
                id: 0,
                title: '1. ЦЕЛЬ',
                desc: 'Что нужно достичь',
                icon: Target,
                color: 'cyan'
              },
              {
                id: 1,
                title: '2. ПЛАН',
                desc: 'Разбивка на шаги',
                icon: Compass,
                color: 'purple'
              },
              {
                id: 2,
                title: '3. ИНСТРУМЕНТЫ',
                desc: 'Поиск, видео, код',
                icon: Wrench,
                color: 'amber'
              },
              {
                id: 3,
                title: '4. ДЕЙСТВИЕ',
                desc: 'Вызов и выполнение',
                icon: Zap,
                color: 'emerald'
              },
              {
                id: 4,
                title: '5. РЕЗУЛЬТАТ',
                desc: 'Готовый продукт',
                icon: Trophy,
                color: 'rose'
              }
            ].map((node) => {
              const Icon = node.icon;
              const isLit = activeNodeIndex >= node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeIndex(node.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    isLit
                      ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                      : 'bg-slate-950/80 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider ${
                        isLit ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {node.title}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isLit ? 'text-cyan-300 animate-pulse' : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isLit ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {node.desc}
                  </div>
                  {isLit && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Opal Real Example */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300">
              Пример (как в реальном обновлении Google Opal, февраль 2026):
            </div>
            <div className="font-mono text-slate-300 pl-2 border-l-2 border-cyan-500 space-y-1">
              <div><strong className="text-cyan-400">ЦЕЛЬ:</strong> «Подготовь мне видео-объяснение по теме»</div>
              <div><strong className="text-purple-400">ПЛАН:</strong> Агент решает: сначала текст сценария, потом генерация видео</div>
              <div><strong className="text-amber-400">ИНСТРУМЕНТЫ:</strong> Агент сам вызывает: текстовая модель → генератор видео</div>
              <div><strong className="text-emerald-400">ДЕЙСТВИЕ:</strong> Агент запускает цепочку шаг за шагом</div>
              <div><strong className="text-rose-400">РЕЗУЛЬТАТ:</strong> Готовое видео-объяснение, а не просто советы!</div>
            </div>
          </div>
        </div>

        {/* Card 3: MCP Simple explanation */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4" />
            <span>Карточка 3 — Простое объяснение MCP (Model Context Protocol, для любопытных!)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-center text-amber-300">
            AI Agent ──▶ MCP (Переходник) ──▶ Инструмент ──▶ Данные ──▶ Результат
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            🔌 <strong>MCP</strong> — это как универсальный «переходник» USB-C, который позволяет любому ИИ-агенту подключаться к разным инструментам и данным (файлам, базам данных, таблицам, другим сервисам). Не нужно зубрить детали — просто знай, что это индустриальный стандарт 2026 года, делающий агентов всемогущими.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. LEVEL 3: WOW-ДЕМО — Первый Агент в Opal */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              Уровень 3 • WOW-Демо (00:20 – 00:30)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🎭 Первый Агент в Google Opal: No-Code Workflow
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-bold text-xs">
            +25 ОП за Демо
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Google Opal позволяет собирать ИИ-агентов <strong className="text-white">обычным языком, без кода</strong>. Ты пишешь цель — Opal сам строит визуальный workflow, связывает модели с инструментами и выдаёт готовую постоянную ссылку на веб-приложение.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-400 block">Прямая ссылка для запуска:</span>
              <a
                href="https://opal.withgoogle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Открыть Google Opal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Goal Phrase Formulator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase flex items-center justify-between">
              <span>Мини-практика в парах: Формулировка цели агента</span>
              <span className="text-slate-500">3 мин</span>
            </div>

            <div className="flex gap-1.5">
              {[
                { id: 'school', label: 'Учёба' },
                { id: 'habits', label: 'Привычки' },
                { id: 'hobby', label: 'Хобби' }
              ].map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => {
                    setSelectedDomain(domain.id as any);
                    if (domain.id === 'school') {
                      setCustomGoalPhrase(
                        'Агент, который придумывает 3 идеи для доклада по заданной теме и сразу составляет план из 3 пунктов с источниками.'
                      );
                    } else if (domain.id === 'habits') {
                      setCustomGoalPhrase(
                        'Агент-тренер, который по списку привычек пользователя выявляет узкие места и составляет расписание на завтра.'
                      );
                    } else {
                      setCustomGoalPhrase(
                        'Агент-помощник музыканта, который по названию песни подбирает аккорды, ритм и темп для репетиции.'
                      );
                    }
                  }}
                  className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                    selectedDomain === domain.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200">
              {customGoalPhrase ||
                'Агент, который придумывает 3 идеи для доклада по заданной теме и сразу составляет план из 3 пунктов с источниками.'}
            </div>

            <button
              onClick={() =>
                handleCopyPhrase(
                  customGoalPhrase ||
                    'Агент, который придумывает 3 идеи для доклада по заданной теме и сразу составляет план из 3 пунктов с источниками.'
                )
              }
              className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {copiedPhrase ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Скопировано в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать формулировку для Opal / Project #5</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. COURSE PORTFOLIO WALL (5 of 5 PROJECTS) */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Портфолио-Стена Курса: Все 5 Проектов</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/40">
            5 ИЗ 5 ПРОЕКТОВ ЗАВЕРШЕНО! ⭐⭐⭐⭐⭐
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            {
              id: 1,
              mission: 'Миссия 04',
              title: 'Project #1: AI Helper',
              status: 'Done',
              color: 'emerald'
            },
            {
              id: 2,
              mission: 'Миссия 08',
              title: 'Project #2: AI Video Story',
              status: 'Done',
              color: 'emerald'
            },
            {
              id: 3,
              mission: 'Миссия 12',
              title: 'Project #3: Website MVP',
              status: 'Done',
              color: 'emerald'
            },
            {
              id: 4,
              mission: 'Миссия 16',
              title: 'Project #4: WOW Website',
              status: 'Done',
              color: 'emerald'
            },
            {
              id: 5,
              mission: 'Миссия 20',
              title: 'Project #5: My Life App',
              status: 'ФИНАЛ СЕГОДНЯ',
              color: 'amber',
              active: true
            }
          ].map((proj) => (
            <div
              key={proj.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                proj.active
                  ? 'bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-500/20 scale-[1.03]'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-extrabold uppercase text-slate-400">
                {proj.mission}
              </div>
              <div className="text-xs font-black text-white mt-1">
                {proj.title}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    proj.active
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {proj.status}
                </span>
                {proj.active ? (
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
