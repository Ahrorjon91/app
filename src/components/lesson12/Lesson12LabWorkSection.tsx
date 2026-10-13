import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Bug,
  ShieldCheck,
  AlertTriangle,
  Rocket,
  Watch,
  Smartphone,
  Terminal,
  Play,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson12LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted || ((_labId: number, _taskId: string) => {});

  // Interactive Deployment Lab Simulator: Phase 1 (GitHub Raw HTML/JS Fail) -> Phase 2 (Vercel Build Success)
  const [labDeployPhase, setLabDeployPhase] = useState<'idle' | 'github_failed' | 'vercel_building' | 'vercel_live'>('idle');
  const [fixedBugs, setFixedBugs] = useState<Record<string, boolean>>({
    scrollReset: false,
    memoryCleanup: false,
    securityHeaders: false,
    videoPoster: false
  });

  const [dodChecklist, setDodChecklist] = useState({
    step1_watchPage: false,
    step2_pageSwitcher: false,
    step3_scrollVideo: false,
    step4_bugAndSecFix: false,
    step5_githubFailTested: false,
    step6_vercelLive: false
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleBugFix = (key: string) => {
    const next = { ...fixedBugs, [key]: !fixedBugs[key] };
    setFixedBugs(next);
    if (Object.values(next).every(Boolean)) {
      addReward(25, '🛡️ Все 4 бага и уязвимости мультистраничного сайта устранены (+25 ОП)!');
    }
  };

  const toggleDodStep = (key: keyof typeof dodChecklist) => {
    const next = { ...dodChecklist, [key]: !dodChecklist[key] };
    setDodChecklist(next);

    const completedCount = Object.values(next).filter(Boolean).length;
    if (completedCount >= 2) markLabTaskCompleted(13, 't13_1');
    if (completedCount >= 4) markLabTaskCompleted(13, 't13_2');
    if (completedCount === 6) {
      markLabTaskCompleted(13, 't13_3');
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(60, '🏆 Лабораторная работа Урока 13 (Apple Watch Ultra 4 + Vercel Live) выполнена (+60 ОП)!');
    }
  };

  const handleSimulateGitHubRawDeploy = () => {
    setLabDeployPhase('github_failed');
    setDodChecklist((prev) => ({ ...prev, step5_githubFailTested: true }));
    addReward(15, '🔍 Эксперимент выполнен: ты увидел, почему сырой React/TSX не открывается как обычный HTML на GitHub Pages (+15 ОП)!');
  };

  const handleSimulateVercelDeploy = () => {
    setLabDeployPhase('vercel_building');
    setTimeout(() => {
      setLabDeployPhase('vercel_live');
      setDodChecklist((prev) => ({ ...prev, step6_vercelLive: true }));
      addReward(25, '🚀 Сборка в Vercel успешна! Мультистраничный сайт iPhone 18 Pro + Watch Ultra 4 в онлайне (+25 ОП)!');
    }, 900);
  };

  const switcherCodeSnippet = `// Безопасный переключатель страниц iPhone 18 Pro <-> Apple Watch Ultra 4
const [activePage, setActivePage] = useState<'iphone' | 'watch'>('iphone');

const handleSwitchProduct = (target: 'iphone' | 'watch') => {
  setActivePage(target);
  // Фикс бага: плавный сброс скролла наверх при смене продукта
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

useEffect(() => {
  const onScroll = () => { /* расчёт кадров 0% -> 100% */ };
  window.addEventListener('scroll', onScroll, { passive: true });
  // Фикс утечки памяти: всегда очищаем слушатель!
  return () => window.removeEventListener('scroll', onScroll);
}, [activePage]);`;

  const completedDodCount = Object.values(dodChecklist).filter(Boolean).length;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* LAB HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-zinc-900 to-orange-950/40 border-2 border-orange-500/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🧪 ЛАБОРАТОРНАЯ РАБОТА • УРОК 13
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs font-bold">
            Прогресс практикума: {completedDodCount} / 6
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          ПРАКТИКУМ: Интерактивный конфигуратор ремешков Apple Watch Ultra 4 + Security Hardening + Сборка в Vercel
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          На лекции Ментор показал переключение между <strong>iPhone 18 Pro (Burgundy)</strong> и <strong>Apple Watch Ultra 4</strong>. В Лабораторной работе твоя задача — добавить на страницу часов <strong>переключатель 3 экспедиционных ремешков (Alpine Loop / Trail Loop / Ocean Band) с режимом ночного циферблата Wayfinder Night Mode</strong>, устранить 4 бага/уязвимости и пройти испытание деплоя: убедиться в ошибке сырого HTML/CSS/JS на GitHub и задеплоить проект через <strong>Vercel</strong>!
        </p>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">1. На Лекции (Показал Ментор)</span>
            <div className="text-sm font-black text-white">Базовый роутинг iPhone ⇄ Watch</div>
            <p className="text-xs text-slate-400">Ментор объяснил объединение двух страниц, видео-скролл и теорию ошибки GitHub Pages vs Vercel.</p>
          </div>
          <div className="p-4 rounded-2xl bg-orange-950/30 border-2 border-orange-500/50 space-y-1">
            <span className="text-[11px] font-mono uppercase text-orange-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-orange-200">3 Ремешка + Night Mode + Патчи Security + Vercel</div>
            <p className="text-xs text-slate-200">Внедряешь 4 патча памяти и CSP, тестируешь крах сырого HTML на GitHub и публикуешь билд в Vercel.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-950/25 border border-purple-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-purple-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-purple-200">3-я страница экосистемы + Единая Корзина (Apple Bag)</div>
            <p className="text-xs text-slate-300">Самостоятельный вайб-кодинг 3-й вкладки (AirPods Pro 3 / Vision Pro) и общей корзины предзаказа!</p>
          </div>
        </div>
      </div>

      {/* TASK 1: BUG & SECURITY FIXER SANDBOX */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              ЗАДАНИЕ 1 • ИСПРАВЛЕНИЕ БАГОВ, БЕЗОПАСНОСТЬ И ПАТТЕРН ПЕРЕКЛЮЧЕНИЯ
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Активируй 4 инженерных патча для стабильной работы двух страниц
            </h3>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(switcherCodeSnippet);
              setCopiedCode('switcher');
              setTimeout(() => setCopiedCode(null), 2000);
            }}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedCode === 'switcher' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode === 'switcher' ? 'Код скопирован!' : 'Скопировать паттерн переключателя'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
          {switcherCodeSnippet}
        </pre>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              key: 'scrollReset',
              title: '🐞 Баг #1: Прыжок скролла при смене iPhone ⇄ Watch',
              fix: 'Добавлен window.scrollTo({ top: 0, behavior: "smooth" }) и overflow-x: hidden.'
            },
            {
              key: 'memoryCleanup',
              title: '🐞 Баг #2: Утечка памяти (Memory Leak) слушателей скролла',
              fix: 'Добавлен return () => window.removeEventListener("scroll", onScroll) в useEffect.'
            },
            {
              key: 'securityHeaders',
              title: '🛡️ Security #3: Защита ссылок и ключей (.env + noopener)',
              fix: 'Все внешние ссылки защищены rel="noopener noreferrer", секреты вынесены из кода.'
            },
            {
              key: 'videoPoster',
              title: '🎬 Медиа #4: Видео-секция Apple Watch Ultra 4 без фризов',
              fix: 'Добавлены атрибуты autoplay muted loop playsinline и постер предзагрузки.'
            }
          ].map((item) => {
            const active = fixedBugs[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleBugFix(item.key)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  active
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black">{item.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      active ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {active ? 'ИСПРАВЛЕНО ✓' : 'ТРЕБУЕТ ФИКСА'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{item.fix}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* TASK 2: INTERACTIVE TERMINAL — GITHUB RAW HTML FAIL VS VERCEL CLOUD BUILD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-amber-500/35 shadow-xl space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            ЗАДАНИЕ 2 • ИНТЕРАКТИВНЫЙ СТЕНД ДЕПЛОЯ: ОТ ОШИБКИ GITHUB ДО VERCEL LIVE
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Протестируй оба пути: убедись, почему обычный деплой HTML/CSS/JS падает, и запусти сборку в Vercel!
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-rose-400 font-bold uppercase">
                ШАГ А (ОБЯЗАТЕЛЬНЫЙ ЭКСПЕРИМЕНТ)
              </div>
              <h4 className="text-base font-black text-white">
                1. Попробовать задеплоить в GitHub как обычный HTML/CSS/JS
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Пушим проект из AI Studio на GitHub и включаем ветку <code className="text-rose-300">main</code> в GitHub Pages без сборки. Смотрим, что увидит браузер!
              </p>
            </div>
            <button
              onClick={handleSimulateGitHubRawDeploy}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Запустить деплой как HTML/CSS/JS в GitHub</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                ШАГ Б (ПРОФЕССИОНАЛЬНОЕ РЕШЕНИЕ)
              </div>
              <h4 className="text-base font-black text-white">
                2. Подключить репозиторий GitHub к Vercel (Auto Vite Build)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Импортируем этот же репозиторий на <strong>vercel.com</strong>. Vercel сам скомпилирует TypeScript/React в чистый HTML/CSS/JS бандл!
              </p>
            </div>
            <button
              onClick={handleSimulateVercelDeploy}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Rocket className="w-4 h-4" />
              <span>Собрать и опубликовать через Vercel ▲</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Window */}
        <div className="p-5 rounded-2xl bg-black border border-slate-800 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>DEPLOYMENT DIAGNOSTIC CONSOLE</span>
            </span>
            <span className="text-[11px]">
              Статус:{' '}
              {labDeployPhase === 'idle' && 'Ожидание запуска...'}
              {labDeployPhase === 'github_failed' && '❌ ОШИБКА RAW GITHUB PAGES'}
              {labDeployPhase === 'vercel_building' && '⏳ СБОРКА НА VERCEL...'}
              {labDeployPhase === 'vercel_live' && '✅ САЙТ ОПУБЛИКОВАН НА VERCEL'}
            </span>
          </div>

          {labDeployPhase === 'idle' && (
            <div className="text-slate-400 py-4">
              Нажми сначала кнопку <strong>«Запустить деплой как HTML/CSS/JS в GitHub»</strong> слева, чтобы увидеть реальную ошибку, с которой сталкиваются студенты.
            </div>
          )}

          {labDeployPhase === 'github_failed' && (
            <div className="space-y-1.5 text-rose-300 py-2">
              <div>$ git push origin main → GitHub Pages (branch: main / root)</div>
              <div>🌐 Открываем https://student.github.io/apple-flagship-ultra/ ...</div>
              <div className="text-rose-400 font-bold">
                [ERROR 1] GET https://student.github.io/src/main.tsx — MIME type "text/plain" is not a valid JavaScript module!
              </div>
              <div className="text-rose-400 font-bold">
                [ERROR 2] Белый экран! Браузер не умеет выполнять .tsx и импорты пакетов из node_modules напрямую без сборки!
              </div>
              <div className="text-amber-300 pt-2">
                💡 Понятно! Чтобы превратить React + TypeScript из AI Studio в понятный браузеру HTML/CSS/JS, нужен облачный сборщик. Теперь нажми кнопку <strong>«Собрать и опубликовать через Vercel ▲»</strong> справа!
              </div>
            </div>
          )}

          {labDeployPhase === 'vercel_building' && (
            <div className="space-y-1.5 text-cyan-300 py-2 animate-pulse">
              <div>▲ Vercel CLI: Cloning github.com/student/apple-flagship-ultra (Branch: main)...</div>
              <div>▲ Running "npm install" & "npm run build" (Vite + TypeScript compiler)...</div>
            </div>
          )}

          {labDeployPhase === 'vercel_live' && (
            <div className="space-y-1.5 text-emerald-300 py-2">
              <div>▲ Vercel Build Complete (dist/index.html, dist/assets/index-a8f92.js, dist/assets/index-91b2c.css)</div>
              <div>✅ Маршрутизация проверена: страница iPhone 18 Pro (Burgundy) + страница Apple Watch Ultra 4 (Titanium) активны!</div>
              <div className="text-white font-bold pt-1">
                🌍 LIVE PRODUCTION URL: https://apple-flagship-ultra.vercel.app
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TASK 3: 6-STEP DEFINITION OF DONE CHECKLIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white">
            Чек-лист готовности Урока 13 (Definition of Done 6/6)
          </h3>
          <span className="text-xs font-mono text-orange-400 font-bold">
            Отметь выполненные пункты
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              key: 'step1_watchPage' as const,
              title: '1. Создана вторая страница Apple Watch Ultra 4 по DESIGN.md с styles.refero.design'
            },
            {
              key: 'step2_pageSwitcher' as const,
              title: '2. В шапке работает переключатель iPhone 18 Pro (Burgundy) ⇄ Apple Watch Ultra 4'
            },
            {
              key: 'step3_scrollVideo' as const,
              title: '3. Добавлено Hero-видео, плавная анимация и обновлён информационный скроллинг'
            },
            {
              key: 'step4_bugAndSecFix' as const,
              title: '4. Исправлены баги скролла/памяти и проверена безопасность (CSP, noopener, .env)'
            },
            {
              key: 'step5_githubFailTested' as const,
              title: '5. Проверен деплой как HTML/CSS/JS на GitHub и разобрана причина белого экрана (.tsx)'
            },
            {
              key: 'step6_vercelLive' as const,
              title: '6. Репозиторий подключён к Vercel, сборка прошла успешно и получен живой URL!'
            }
          ].map((item) => {
            const done = dodChecklist[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleDodStep(item.key)}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  done
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`}
                />
                <span className="text-xs sm:text-sm font-bold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={13}
        labId={13}
        labTitle="Лабораторная работа #13: Apple Watch Ultra 4 (3 ремешка + Night Mode) + Security Hardening + Сборка на Vercel"
        rewardExp={100}
      />
    </div>
  );
};
