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

export const Lesson23LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Easter Egg: Click 🌐 in header 4 times -> secret portal reveals globally (+25 EXP)
  const [globeClicks, setGlobeClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  const handleGlobeClick = () => {
    const next = globeClicks + 1;
    setGlobeClicks(next);
    if (next === 4 && !easterEggUnlocked) {
      setEasterEggUnlocked(true);
      addReward(25, '🌍 Глобальный Edge-сервер активирован! NOVA подтверждает мгновенный доступ из любой точки Земли! (+25 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    }
  };

  // Animations toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Voting: Where will you host your Capstone production app?
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleVote = (option: string) => {
    setSelectedVote(option);
    if (!voteSubmitted) {
      setVoteSubmitted(true);
      addReward(15, '🗳️ Твой выбор хостинга зафиксирован! (+15 ОП)');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // Level 2 Card 1: Interactive DevTools Simulator (Client-side key leak vs Server-side Proxy)
  const [proxyMode, setProxyMode] = useState<'dangerous' | 'secure'>('dangerous');
  const [networkLogOpened, setNetworkLogOpened] = useState(false);
  const [simulatedRequestStatus, setSimulatedRequestStatus] = useState<string | null>(null);

  const handleRunRequest = () => {
    if (proxyMode === 'dangerous') {
      setSimulatedRequestStatus('⚠️ ВНИМАНИЕ: Запрос отправлен напрямую в Google API. Загляни во вкладку Network ниже!');
    } else {
      setSimulatedRequestStatus('🛡️ УСПЕХ: Запрос прошел через защищенный роут /api/generate. Браузер не знает секретный ключ!');
    }
  };

  // Level 2 Card 4: Open Graph live interactive preview
  const [ogTitle, setOgTitle] = useState('AI Habit Tracker — Умный трекер привычек');
  const [ogDesc, setOgDesc] = useState('Персональный помощник с искусственным интеллектом для выработки полезных привычек за 21 день.');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop');

  // Copy helpers
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* ========================================================================= */}
      {/* HERO BANNER SECTION                                                       */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-900 shadow-2xl">
        <div className="relative p-6 sm:p-8 w-full overflow-hidden space-y-4">
          {/* Floating Badge in Banner */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400" /> Миссия 23 • Блок 6 • Неделя 12
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Production Release
                </span>
                <button
                  onClick={handleGlobeClick}
                  className="p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all hover:scale-105 shadow-lg group"
                  title="Секретный Edge-портал NOVA"
                >
                  <Globe className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                Деплой, Продакшн-Хостинг & Безопасность Ключей
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium drop-shadow">
                Выводим проект в глобальный интернет: Vercel, Cloud Run, серверный прокси для защиты API-ключей, переменные окружения и карточки Open Graph.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700/60 shadow-lg">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-300">
                90 мин (30м теория + 60м практика)
              </span>
            </div>
          </div>
        </div>

        {/* Easter egg announcement alert */}
        {easterEggUnlocked && (
          <div className="p-4 bg-gradient-to-r from-cyan-950 via-emerald-950 to-cyan-950 border-t border-cyan-500/40 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400 shrink-0 animate-bounce" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-white">Пасхалка разблокирована: </span>
                <span className="text-cyan-200">
                  NOVA активировала глобальную сеть CDN! Ваши приложения доступны со скоростью света на всех континентах (+25 ОП).
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold shrink-0">
              +25 ОП ПОЛУЧЕНО
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 1: WARMUP & LIVE INTERACTIVE VOTING                                  */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Уровень 1: Интерактивный разогрев — Выбор боевого хостинга
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Каждый инженер выбирает платформу деплоя под задачи своего Capstone-проекта
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            +15 ОП за ответ
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-200 font-semibold">
            Вопрос на старте: Какую облачную инфраструктуру ты считаешь оптимальной для финального релиза?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                id: 'vercel',
                title: '⚡ Vercel / Netlify (Serverless)',
                desc: 'Мгновенный деплой по Git Push, бесплатный SSL, авто-сборка Vite/React и поддержка Edge Functions.',
                votes: '64%'
              },
              {
                id: 'cloudrun',
                title: '🐳 Google Cloud Run / Docker',
                desc: 'Контейнеризация проекта, масштабирование до нуля и неограниченный контроль над бэкендом.',
                votes: '22%'
              },
              {
                id: 'githubpages',
                title: '🐙 GitHub Pages (Статика)',
                desc: 'Идеально для чистых клиентских сайтов без секретных серверных API-роутов.',
                votes: '9%'
              },
              {
                id: 'vps',
                title: '🖥️ Собственный VPS (Ubuntu + PM2 + Nginx)',
                desc: 'Полный ручной контроль над сервером, портами и базами данных SQLite / PostgreSQL.',
                votes: '5%'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleVote(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  selectedVote === opt.id
                    ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                    {opt.title}
                  </span>
                  {selectedVote === opt.id && (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{opt.desc}</p>
                {voteSubmitted && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>Выбор сообщества выпускников:</span>
                    <span className="font-bold">{opt.votes}</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {voteSubmitted && (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 text-xs sm:text-sm text-cyan-200 flex items-center gap-3">
              <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                <strong>Комментарий ментора:</strong> Для Full-Stack Vibe Coding связка <strong>Vercel + Express Proxy</strong> или развертывание на собственном VPS — два самых востребованных сценария на рынке 2026 года!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2: 4 DEEP INTERACTIVE TECHNICAL CARDS                               */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Уровень 2: 4 Опоры Продакшен-Инженера
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Архитектура безопасности, переменные окружения, конвейер релиза и Open Graph
            </p>
          </div>
        </div>

        {/* CARD 1: THE DANGER OF CLIENT-SIDE KEYS & DEVTOOLS SIMULATOR */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono font-bold text-sm">
                01
              </span>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Золотое Правило: Почему API-ключ в браузере — катастрофа?</span>
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                </h3>
                <p className="text-xs text-slate-400">
                  Интерактивный симулятор вкладки DevTools Network
                </p>
              </div>
            </div>

            {/* Switcher Mode */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => {
                  setProxyMode('dangerous');
                  setSimulatedRequestStatus(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  proxyMode === 'dangerous'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>❌ Клиентский вызов</span>
              </button>
              <button
                onClick={() => {
                  setProxyMode('secure');
                  setSimulatedRequestStatus(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  proxyMode === 'secure'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>🛡️ Серверный Прокси</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Когда вы пишете код на React, всё, что компилируется бандлером (Vite / Webpack), загружается прямо на устройство пользователя в виде обычного JavaScript.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  {proxyMode === 'dangerous' ? 'Плохой код (React Component)' : 'Безопасный код (Server Route)'}
                </span>

                {proxyMode === 'dangerous' ? (
                  <pre className="text-xs font-mono text-rose-300 overflow-x-auto p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 leading-relaxed">
{`// ❌ ОПАСНО ДЛЯ ЖИЗНИ: Ключ прямо в браузере!
const API_KEY = "AIzaSyD-STEAL-ME-12345";

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
  method: "POST",
  body: JSON.stringify({ contents: [...] })
});`}
                  </pre>
                ) : (
                  <pre className="text-xs font-mono text-emerald-300 overflow-x-auto p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 leading-relaxed">
{`// 🛡️ БЕЗОПАСНО: Браузер стучится на сервер, сервер читает .env
// 1. Клиент (React):
await fetch("/api/generate", { method: "POST", body: ... });

// 2. Сервер (Express / server.ts):
app.post("/api/generate", async (req, res) => {
  const key = process.env.GEMINI_API_KEY; // Вне зоны видимости браузера!
  const response = await callGemini(key, req.body);
  res.json(response);
});`}
                  </pre>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunRequest}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Выполнить тестовый запрос
                </button>
                <button
                  onClick={() => setNetworkLogOpened(!networkLogOpened)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  {networkLogOpened ? 'Скрыть DevTools' : 'Открыть DevTools Network'}
                </button>
              </div>

              {simulatedRequestStatus && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium border animate-in fade-in ${
                    proxyMode === 'dangerous'
                      ? 'bg-rose-950/50 border-rose-800 text-rose-200'
                      : 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                  }`}
                >
                  {simulatedRequestStatus}
                </div>
              )}
            </div>

            {/* Interactive Browser DevTools Window Simulation */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-bold text-slate-300">Chrome DevTools — Network</span>
                </div>
                <span className="text-[10px] text-slate-400">F12 / Cmd+Opt+I</span>
              </div>

              <div className="p-4 space-y-3 flex-1">
                <div className="grid grid-cols-4 gap-2 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800/80 pb-2">
                  <span>Name</span>
                  <span>Status</span>
                  <span>Type</span>
                  <span>Initiator</span>
                </div>

                {proxyMode === 'dangerous' ? (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/60 text-rose-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold truncate text-rose-200">
                          gemini-1.5-flash:generateContent?key=AIzaSyD-STEAL-ME-12345
                        </span>
                        <span className="text-emerald-400 font-bold">200 OK</span>
                      </div>
                      <div className="text-[11px] text-rose-400 flex items-center gap-1.5">
                        <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>КЛЮЧ РАСКРЫТ! Любой пользователь в 1 клик может скопировать ваш ключ и обнулить счет.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-in fade-in">
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold truncate text-emerald-200">
                          POST /api/generate
                        </span>
                        <span className="text-emerald-400 font-bold">200 OK</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Ключа НЕТ в заголовках и URL! Браузер видит только локальный серверный маршрут.</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-900 text-slate-400 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>Remote Address:</span>
                    <span className="text-slate-300">104.21.55.90:443 (SSL Secure)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Server Header:</span>
                    <span className="text-slate-300">Express / Cloudflare Edge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: THE 3-TIER ENVIRONMENT VARIABLES (.ENV) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              02
            </span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Матрешка Окружений: .env.local vs .env.example vs Hosting Secrets</span>
                <Key className="w-5 h-5 text-amber-400 shrink-0" />
              </h3>
              <p className="text-xs text-slate-400">
                Где хранить секреты на разных стадиях разработки
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-amber-400 uppercase tracking-wider">
                  💻 Локальный ПК
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                  .env / .env.local
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">Личные секреты разработчика</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Файл лежит только на вашем жестком диске. <strong>СТРОГО занесен в .gitignore!</strong> Никогда не попадает в публичные коммиты на GitHub.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300">
                GEMINI_API_KEY=AIzaSyA_9948...
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-wider">
                  🐙 Публичный GitHub
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                  .env.example
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">Шаблон документации</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Открытый файл для репозитория. Показывает список требуемых ключей без самих паролей, чтобы любой другой программист знал, что настроить.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                GEMINI_API_KEY=your_key_here
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-emerald-400 uppercase tracking-wider">
                  ☁️ Боевой Облачный Хостинг
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                  Vercel / Cloud Run
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">Production Environment Variables</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Зашифрованное хранилище секретов в настройках хостинга (Settings → Environment Variables). Сервер читает их на лету во время работы.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300">
                Encrypted Vault: [Hidden]
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: 4-STEP PRODUCTION RELEASE PIPELINE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
              03
            </span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Пайплайн Релиза: От Кода до Публичного HTTPS URL</span>
                <Workflow className="w-5 h-5 text-cyan-400 shrink-0" />
              </h3>
              <p className="text-xs text-slate-400">
                4 обязательных шага перед тем, как отправить ссылку миру
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '1',
                title: 'Build Verification',
                cmd: 'npm run build',
                desc: 'Vite компилирует TypeScript. Если есть синтаксические ошибки или сломанные импорты — билд упадет здесь, спасая прод.',
                icon: Terminal,
                badge: 'Локально'
              },
              {
                step: '2',
                title: 'Git Push to Main',
                cmd: 'git push origin main',
                desc: 'Отправка проверенного кода в главную ветку. Вебхук хостинга мгновенно ловит сигнал и запускает сборку.',
                icon: GitBranch,
                badge: 'GitHub'
              },
              {
                step: '3',
                title: 'Cloud Compilation',
                cmd: 'Cloud Build / Vercel',
                desc: 'Облачный сервер подтягивает переменные окружения, собирает бандл и распределяет статику по CDN-нодам.',
                icon: Server,
                badge: 'Сервер'
              },
              {
                step: '4',
                title: 'SSL & Domain Live',
                cmd: 'https://your-app.vercel.app',
                desc: 'Автоматическая выдача бесплатного сертификата Let’s Encrypt. Зеленый замок и активная ссылка готовы к показу!',
                icon: Globe,
                badge: 'Интернет'
              }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.step} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                      {p.step}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {p.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{p.title}</span>
                  </h4>
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-cyan-300">
                    {p.cmd}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 4: OPEN GRAPH (OG) SOCIAL SHARING PREVIEW */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
              04
            </span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Open Graph Метатеги: Визитка проекта в мессенджерах</span>
                <Share2 className="w-5 h-5 text-purple-400 shrink-0" />
              </h3>
              <p className="text-xs text-slate-400">
                Настрой карточку предпросмотра для Telegram, WhatsApp и соцсетей
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Когда вы отправляете ссылку в Telegram, мессенджер читает скрытые теги в <code>&lt;head&gt;</code> вашего <code>index.html</code>. Без них ссылка выглядит как подозрительный спам.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    og:title (Название карточки)
                  </label>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    og:description (Краткое описание проекта)
                  </label>
                  <textarea
                    rows={2}
                    value={ogDesc}
                    onChange={(e) => setOgDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    og:image (Ссылка на обложку 1200x630px)
                  </label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-900 pb-1 mb-1">
                  <span>HTML для вставки в index.html</span>
                  <button
                    onClick={() =>
                      handleCopy(
`<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDesc}" />
<meta property="og:image" content="${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />`,
                        'og'
                      )
                    }
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedCode === 'og' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'og' ? 'Скопировано!' : 'Копировать'}</span>
                  </button>
                </div>
                <div>&lt;meta property="og:title" content="{ogTitle}" /&gt;</div>
                <div>&lt;meta property="og:description" content="{ogDesc.slice(0, 35)}..." /&gt;</div>
                <div>&lt;meta property="og:image" content="{ogImage.slice(0, 30)}..." /&gt;</div>
              </div>
            </div>

            {/* Telegram Message Preview Bubble */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-cyan-400" /> Живой вид сообщения в Telegram:
              </span>

              <div className="p-4 rounded-3xl bg-[#182533] border border-[#2b5278] shadow-2xl max-w-sm mx-auto space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                    Ты
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white">Выпускник AI for LIFE</span>
                    <span className="text-[10px] text-slate-400 ml-2">14:30</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200">
                  Всем привет! Мой выпускной проект задеплоен и доступен онлайн: <span className="text-sky-400 underline">https://my-app.vercel.app</span> 🚀
                </p>

                {/* Rich Link Card */}
                <div className="rounded-xl overflow-hidden border border-sky-500/30 bg-[#212d3b] shadow-md space-y-2">
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-sky-400 font-bold">
                      my-app.vercel.app
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {ogTitle}
                    </div>
                    <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {ogDesc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3: ROLEPLAY CASE STUDY (NIGHT INCIDENT: LEAKED KEY)                 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Уровень 3: Инцидент в 03:00 Ночи — «Утечка Ключа на GitHub»
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Как профессиональный инженер реагирует на утечку за 3 минуты
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-3 text-rose-300 text-xs sm:text-sm font-semibold">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
            <span>Сценарий: Бот хакеров нашел ваш API-ключ в открытом коммите через 45 секунд после пуша. Ваши действия?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-rose-400" /> ШАГ 1: Revoke (Отозвать)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Немедленно зайти в Google AI Studio (Get API key) и нажать <strong>Delete Key</strong>. Старый ключ мгновенно перестанет работать.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-400" /> ШАГ 2: Clean History
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Удалить коммит из истории Git или пересоздать репозиторий. Простая правка файла в новом коммите сохраняет старый ключ в истории!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ШАГ 3: Re-issue to .env
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Сгенерировать новый ключ, записать его в <code>.env</code> и на хостинге, убедившись, что <code>.env</code> есть в <code>.gitignore</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 4: CHEAT SHEET & VOCABULARY GLOSSARY                                 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Шпаргалка Миссии 23: Безопасный Продакшн
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Концентрированные правила и словарь терминов
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              handleCopy(
`# Шпаргалка Урока 23: Безопасный Деплой & Продакшн
1. ЗОЛОТОЕ ПРАВИЛО: Никаких API-ключей в React/браузере. Только серверный роут (/api/generate).
2. .ENV: .env.local (свои пароли) · .env.example (шаблон для GitHub) · Hosting Secrets (в облаке).
3. ПАЙПЛАЙН: npm run build → git push → Cloud Build → SSL Live URL.
4. OPEN GRAPH: og:title, og:description, og:image формируют визитку в Telegram.
5. GENERATE ≠ FINISHED: Проверяй живую ссылку в режиме Инкогнито!`,
                'cheatsheet'
              )
            }
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            {copiedCode === 'cheatsheet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode === 'cheatsheet' ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
              <span>Production (Прод)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Боевая версия сайта или сервиса, доступная реальным пользователям 24/7 по публичному адресу в интернете.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span>Backend Proxy (Серверный прокси)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Серверный маршрут, который принимает запрос от вашего фронтенда, добавляет секретный ключ из переменных окружения и сам обращается к внешней LLM.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>Environment Variables (.env)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Системные переменные операционной системы или сервера, позволяющие хранить настройки и секреты отдельно от исходного кода.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
              <span>Open Graph (OG)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Стандарт протокола мета-тегов, разработанный Facebook и поддерживаемый Telegram/WhatsApp, превращающий текстовую ссылку в богатую карточку.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 5: TOOLS & PRODUCTION HOSTING DIRECTORY                             */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-cyan-400" />
          <span>Каталог Продакшен-Инструментов 2026 года</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all block space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-cyan-400 transition-colors text-sm">
                Vercel
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400">
              Мировой стандарт деплоя фронтенда и серверлесс-роутов в один клик.
            </p>
          </a>

          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all block space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-cyan-400 transition-colors text-sm">
                Google AI Studio
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400">
              Панель управления API-ключами Gemini: создание, установка квот и отзыв ключей.
            </p>
          </a>

          <a
            href="https://www.opengraph.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all block space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-purple-400 transition-colors text-sm">
                OpenGraph.xyz
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400" />
            </div>
            <p className="text-xs text-slate-400">
              Бесплатный онлайн-валидатор превью ссылок в Telegram, Twitter, LinkedIn и WhatsApp.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
