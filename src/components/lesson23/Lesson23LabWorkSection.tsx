import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Key,
  Bot,
  Terminal,
  ExternalLink,
  Sparkles,
  Rocket,
  Code,
  Copy,
  Check,
  RotateCcw,
  Send,
  Eye,
  FileText,
  AlertOctagon,
  HelpCircle,
  Award,
  Globe,
  Server,
  Play,
  Share2,
  Workflow,
  CheckCheck
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface AuditItem {
  id: number;
  name: string;
  type: string;
  clientClean: boolean;
  envProtected: boolean;
  buildsOk: boolean;
}

export const Lesson23LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Security Audit of Projects
  const [auditProjects, setAuditProjects] = useState<AuditItem[]>([
    { id: 1, name: 'Project #1: Персональный Landing Page', type: 'Static Landing', clientClean: true, envProtected: true, buildsOk: true },
    { id: 2, name: 'Project #2: AI Prompt Bot', type: 'Chatbot UI', clientClean: true, envProtected: true, buildsOk: true },
    { id: 3, name: 'Project #3: Multimodal Vision App', type: 'Media App', clientClean: true, envProtected: true, buildsOk: true },
    { id: 4, name: 'Project #4: WOW Website Portfolio', type: 'Animated Web', clientClean: true, envProtected: true, buildsOk: true },
    { id: 5, name: 'Project #5: AI Habit Tracker (Capstone)', type: 'Full-Stack App', clientClean: false, envProtected: false, buildsOk: false }
  ]);

  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleRunSecurityScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      // Automatically patch Capstone after scan
      setAuditProjects(prev =>
        prev.map(p => (p.id === 5 ? { ...p, clientClean: true, envProtected: true, buildsOk: true } : p))
      );
      addReward(25, '🔍 Тотальный аудит безопасности завершен: все 5 проектов очищены от захардкоженных ключей! (+25 ОП)');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }, 1500);
  };

  // Step 2: Interactive Backend Proxy Simulator
  const [proxyTestPrompt, setProxyTestPrompt] = useState('Сгенерируй 3 шага для деплоя');
  const [proxyResponse, setProxyResponse] = useState<string | null>(null);
  const [proxyLoading, setProxyLoading] = useState(false);

  const handleTestProxy = () => {
    setProxyLoading(true);
    setTimeout(() => {
      setProxyLoading(false);
      setProxyResponse(
        'Ответ получен через безопасный серверный роут /api/generate:\n1. Собрать бандл (npm run build)\n2. Запушить на GitHub (git push origin main)\n3. Активировать Live HTTPS URL на Vercel!'
      );
      addReward(25, '🛡️ Серверный прокси протестирован: API-ключ защищен от браузера! (+25 ОП)');
    }, 800);
  };

  // Step 3: Interactive Build Simulator
  const [buildRunning, setBuildRunning] = useState(false);
  const [buildDone, setBuildDone] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);

  const handleRunBuild = () => {
    setBuildRunning(true);
    setBuildDone(false);
    setBuildLogs(['> vite build', 'vite v5.4.2 building for production...']);

    setTimeout(() => {
      setBuildLogs(prev => [...prev, '✓ 142 modules transformed.', 'rendering chunks...']);
    }, 600);

    setTimeout(() => {
      setBuildLogs(prev => [
        ...prev,
        'computing gzip size...',
        'dist/index.html                   1.45 kB │ gzip:  0.62 kB',
        'dist/assets/index-B_oW6yM.css    45.12 kB │ gzip:  8.94 kB',
        'dist/assets/index-Cd9e2a1.js    214.30 kB │ gzip: 68.40 kB',
        '✓ built in 840ms with 0 errors.'
      ]);
      setBuildRunning(false);
      setBuildDone(true);
      addReward(25, '⚡ Продакшн-бандл успешно собран: 0 ошибок сборки! (+25 ОП)');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 } });
    }, 1400);
  };

  // Step 4: OpenGraph Generator & Live Preview
  const [ogTitle, setOgTitle] = useState('AI for LIFE Capstone Project');
  const [ogDescription, setOgDescription] = useState('Интеллектуальное веб-приложение нового поколения, созданное с помощью Vibe Coding.');
  const [copiedOg, setCopiedOg] = useState(false);

  // Step 5: Final Production Readiness Checklist (5 items)
  const [checklist, setChecklist] = useState({
    noHardcodedKeys: false,
    envConfigured: false,
    buildPasses: false,
    openGraphConfigured: false,
    liveUrlWorking: false
  });

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allCompleted = Object.values(checklist).every(Boolean);
  const completedCount = Object.values(checklist).filter(Boolean).length;

  // Student Project Submission Inputs
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveUrl.trim()) return;
    setIsSubmitted(true);
    addReward(175, '🏆 Лабораторная работа #23 принята! Проект запущен в глобальный интернет! (+175 ОП)');
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[11px] font-bold">
                  ПРАКТИКУМ #23
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px] font-bold">
                  Hard • 50 мин
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Миссия 23: Деплой приложения, защита API-ключей и продакшн-хостинг
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-mono text-sm font-bold w-fit">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Награда: +175 ОП</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Цель миссии:</strong> Очистить кодовую базу от уязвимостей, настроить безопасный серверный роут для вызова ИИ, проверить сборку бандла и развернуть свой выпускной Capstone-проект на облачной платформе с рабочей HTTPS-ссылкой.
        </p>

        {/* Topology Route */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-300 font-bold">Инженерный путь:</span>
          <span className="text-cyan-400">Git Repo</span> ➔
          <span className="text-cyan-400">Security Audit</span> ➔
          <span className="text-cyan-400">Backend Proxy (.env)</span> ➔
          <span className="text-cyan-400">npm run build</span> ➔
          <span className="text-emerald-400 font-bold">🌍 Live HTTPS URL</span>
        </div>
      </div>

      {/* STEP 1: SECURITY SCANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Шаг 1: Тотальный аудит безопасности (Secrets Audit)</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Сканирование всех 5 проектов курса на отсутствие захардкоженных API-ключей
              </p>
            </div>
          </div>

          <button
            onClick={handleRunSecurityScan}
            disabled={scanning || scanComplete}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              scanComplete
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : scanning
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
            }`}
          >
            {scanning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Сканирование репозиториев...</span>
              </>
            ) : scanComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Все 5 проектов защищены</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Запустить ИИ-сканер секретов</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {auditProjects.map(proj => (
              <div
                key={proj.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white text-sm">{proj.name}</div>
                  <div className="text-slate-400 font-mono text-[11px]">{proj.type}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1 ${
                      proj.clientClean
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-800 text-rose-300'
                    }`}
                  >
                    {proj.clientClean ? <Check className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-rose-400" />}
                    <span>Клиентский код: {proj.clientClean ? 'Чист' : 'Утечка ключа!'}</span>
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1 ${
                      proj.envProtected
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-800 text-rose-300'
                    }`}
                  >
                    {proj.envProtected ? <Check className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-rose-400" />}
                    <span>.env: {proj.envProtected ? 'В .gitignore' : 'В открытом доступе'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {scanComplete && (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Отлично! Все приватные ключи перенесены в <code>process.env</code>, а файл <code>.env</code> исключен из системы контроля версий.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2: BACKEND PROXY SIMULATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <span className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs">
            02
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Шаг 2: Тестирование безопасного серверного прокси (/api/generate)</span>
              <Server className="w-4 h-4 text-indigo-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Браузер отправляет запрос на сервер, сервер с ключом вызывает ИИ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-mono text-slate-400">
              Текст запроса от пользователя в браузере:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={proxyTestPrompt}
                onChange={e => setProxyTestPrompt(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
              <button
                onClick={handleTestProxy}
                disabled={proxyLoading}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
              >
                {proxyLoading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                <span>Отправить</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
              <div className="text-[11px] text-indigo-400 font-bold flex items-center gap-1">
                <Code className="w-3.5 h-3.5" />
                <span>Серверный обработчик (server.ts / Express):</span>
              </div>
              <pre className="text-[11px] text-slate-400 overflow-x-auto leading-relaxed">
{`app.post("/api/generate", async (req, res) => {
  const secret = process.env.GEMINI_API_KEY;
  // Ключ хранится на сервере и никогда не виден в браузере!
  const aiResult = await aiClient.generate(req.body.prompt);
  res.json({ reply: aiResult });
});`}
              </pre>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-2 flex flex-col font-mono text-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> Ответ от защищенного эндпоинта
            </span>

            <div className="flex-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 overflow-y-auto min-h-[120px] text-slate-300 whitespace-pre-wrap leading-relaxed">
              {proxyLoading ? (
                <div className="flex items-center gap-2 text-indigo-400 animate-pulse">
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Шифрование запроса и вызов LLM через сервер...</span>
                </div>
              ) : proxyResponse ? (
                <span className="text-emerald-300">{proxyResponse}</span>
              ) : (
                <span className="text-slate-400">
                  Нажмите «Отправить», чтобы проверить прохождение запроса через серверный прокси.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3: BUILD VERIFICATION SIMULATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
              03
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Шаг 3: Проверка сборки (Production Build Check)</span>
                <Terminal className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Компиляция TypeScript и создание оптимизированного бандла dist/
              </p>
            </div>
          </div>

          <button
            onClick={handleRunBuild}
            disabled={buildRunning}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              buildDone
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : buildRunning
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-500/20'
            }`}
          >
            {buildRunning ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-amber-400" />
                <span>Сборка проекта...</span>
              </>
            ) : buildDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Сборка готова (0 ошибок)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Выполнить npm run build</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-900 pb-1.5">
            <span>Terminal: ~/capstone-project</span>
            <span className="text-[11px] text-cyan-400">Vite 5.4 + TypeScript</span>
          </div>

          <div className="space-y-1 py-1 min-h-[90px]">
            {buildLogs.length === 0 ? (
              <span className="text-slate-400">
                Терминал ожидает запуска команды npm run build...
              </span>
            ) : (
              buildLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('✓')
                      ? 'text-emerald-400 font-bold'
                      : log.includes('error')
                      ? 'text-rose-400 font-bold'
                      : 'text-slate-300'
                  }
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* STEP 4: OPEN GRAPH CONFIGURATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
            04
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Шаг 4: Конструктор Open Graph мета-тегов</span>
              <Share2 className="w-4 h-4 text-purple-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Настройка визуальной карточки для отправки в Telegram и социальные сети
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Заголовок проекта (og:title)
              </label>
              <input
                type="text"
                value={ogTitle}
                onChange={e => setOgTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Краткое описание (og:description)
              </label>
              <textarea
                rows={2}
                value={ogDescription}
                onChange={e => setOgDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
`<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />`
                );
                setCopiedOg(true);
                setTimeout(() => setCopiedOg(false), 2000);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md shadow-purple-500/20"
            >
              {copiedOg ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedOg ? 'Теги скопированы!' : 'Скопировать блок <meta>'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Превью карточки:
            </span>
            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 space-y-1.5 shadow-md">
              <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                your-app.vercel.app
              </div>
              <div className="text-xs font-bold text-white">{ogTitle}</div>
              <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {ogDescription}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 5: PRODUCTION READINESS CHECKLIST (5/5) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              05
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Чек-лист готовности к релизу (Production Readiness 5/5)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-slate-400">
                Закрой все 5 пунктов перед отправкой финальной работы ментору
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-emerald-400">
            Готовность: {completedCount} / 5 ({Math.round((completedCount / 5) * 100)}%)
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {[
            {
              id: 'noHardcodedKeys' as const,
              title: '1. Никаких открытых API-ключей в коде React',
              desc: 'Все обращения к Gemini API вынесены на серверный прокси или в переменные окружения.'
            },
            {
              id: 'envConfigured' as const,
              title: '2. Секреты спрятаны (.env в .gitignore + подготовлен .env.example)',
              desc: 'Файл с реальными паролями не попадет в публичный репозиторий на GitHub.'
            },
            {
              id: 'buildPasses' as const,
              title: '3. Команда npm run build проходит чисто (0 ошибок компиляции)',
              desc: 'TypeScript типы проверены, бандл успешно генерируется в папку dist/.'
            },
            {
              id: 'openGraphConfigured' as const,
              title: '4. Метатеги Open Graph прописаны в index.html',
              desc: 'При шеринге ссылки в Telegram появляется аккуратная карточка с заголовком и описанием.'
            },
            {
              id: 'liveUrlWorking' as const,
              title: '5. Приложение открывается по живой публичной HTTPS-ссылке',
              desc: 'Проект задеплоен на Vercel, Cloud Run или VPS и работает в режиме Инкогнито без ошибок.'
            }
          ].map(item => {
            const isChecked = checklist[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-0.5">
                  <div className={`text-sm font-bold ${isChecked ? 'text-emerald-200' : 'text-white'}`}>
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В ПОРТАЛЕ                */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineLabSubmission
          labId={23}
          lessonId={23}
          taskTitle="Лабораторная работа №23: Деплой, хостинг в продакшн и безопасность API-ключей"
          rewardExp={100}
        />
      </div>
    </div>
  );
};
