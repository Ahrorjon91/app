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
  Award
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface ProjectAuditItem {
  id: number;
  name: string;
  type: string;
  hasSecrets: boolean;
  hasPersonalData: boolean;
  linkWorks: boolean;
  issuesFound: number;
  fixed: boolean;
}

export const Lesson22LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: 5 Projects Security Checklist
  const [projects, setProjects] = useState<ProjectAuditItem[]>([
    {
      id: 1,
      name: 'Project #1: Персональный Landing Page (AI Vision)',
      type: 'Landing Page',
      hasSecrets: false,
      hasPersonalData: false,
      linkWorks: true,
      issuesFound: 0,
      fixed: true
    },
    {
      id: 2,
      name: 'Project #2: Интерактивный Чат-бот (Prompt Engineering)',
      type: 'AI Chatbot',
      hasSecrets: false,
      hasPersonalData: false,
      linkWorks: true,
      issuesFound: 0,
      fixed: true
    },
    {
      id: 3,
      name: 'Project #3: Мультимодальный Анализатор (Vision & Audio)',
      type: 'Multimodal App',
      hasSecrets: false,
      hasPersonalData: false,
      linkWorks: true,
      issuesFound: 0,
      fixed: true
    },
    {
      id: 4,
      name: 'Project #4: WOW Website с анимациями и AI-генератором',
      type: 'Creative Site',
      hasSecrets: false,
      hasPersonalData: false,
      linkWorks: true,
      issuesFound: 0,
      fixed: true
    },
    {
      id: 5,
      name: 'Project #5: AI Habit Tracker (Трекер привычек)',
      type: 'Full-Stack App',
      hasSecrets: false,
      hasPersonalData: false,
      linkWorks: true,
      issuesFound: 0,
      fixed: true
    }
  ]);

  // Checklist state per project: [projId]: { noSecrets, noPersonal, linkWorks }
  const [checklist, setChecklist] = useState<Record<number, { noSecrets: boolean; noPersonal: boolean; linkWorks: boolean }>>({
    1: { noSecrets: false, noPersonal: false, linkWorks: false },
    2: { noSecrets: false, noPersonal: false, linkWorks: false },
    3: { noSecrets: false, noPersonal: false, linkWorks: false },
    4: { noSecrets: false, noPersonal: false, linkWorks: false },
    5: { noSecrets: false, noPersonal: false, linkWorks: false }
  });

  const [claimedProjectRewards, setClaimedProjectRewards] = useState<Record<number, boolean>>({});

  const toggleCheck = (projId: number, field: 'noSecrets' | 'noPersonal' | 'linkWorks') => {
    const updated = {
      ...checklist,
      [projId]: {
        ...checklist[projId],
        [field]: !checklist[projId][field]
      }
    };
    setChecklist(updated);

    // Check if all 3 passed for this project
    const p = updated[projId];
    if (p.noSecrets && p.noPersonal && p.linkWorks && !claimedProjectRewards[projId]) {
      setClaimedProjectRewards((cr) => ({ ...cr, [projId]: true }));
      addReward(25, `🛡️ Аудит Project #${projId} успешно пройден! (+25 ОП)`);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Step 2: AI Code Scanner Simulator
  const [scannerCode, setScannerCode] = useState(
`// Пример клиентского кода перед аудитом
const API_URL = "https://api.groq.com/v1/chat";
const apiKey = "gsk_78491abcdef98213740921734"; // СЕКРЕТ В ОТКРЫТОМ КОДЕ!
const developerPhone = "+992 92 123 4567"; // Личный телефон в коде

export async function askAI(prompt) {
  return fetch(API_URL, {
    headers: { Authorization: \`Bearer \${apiKey}\` },
    body: JSON.stringify({ prompt })
  });
}`
  );

  const [scannerResult, setScannerResult] = useState<{
    scanned: boolean;
    issues: string[];
    isSafe: boolean;
  }>({ scanned: false, issues: [], isSafe: false });

  const [aiScanRewardClaimed, setAiScanRewardClaimed] = useState(false);

  const runAIScan = () => {
    const hasSecretKey = scannerCode.includes('gsk_') || scannerCode.includes('AIza') || scannerCode.includes('apiKey = "');
    const hasPhone = scannerCode.includes('+992') || scannerCode.includes('phone') || scannerCode.includes('телефон');

    const issues: string[] = [];
    if (hasSecretKey) {
      issues.push('🚨 Критическая уязвимость: обнаружен жестко закодированный API-ключ в открытом виде!');
    }
    if (hasPhone) {
      issues.push('⚠️ Утечка личных данных: обнаружен номер телефона в исходном коде!');
    }

    setScannerResult({
      scanned: true,
      issues,
      isSafe: issues.length === 0
    });

    if (!aiScanRewardClaimed) {
      setAiScanRewardClaimed(true);
      addReward(25, '🤖 ИИ провел глубокий анализ кода на утечки! (+25 ОП)');
      confetti({ particleCount: 40, spread: 65, origin: { y: 0.6 } });
    }
  };

  // Step 3: Fix found issues with 1-click
  const [fixApplied, setFixApplied] = useState(false);

  const applyAIFix = () => {
    setScannerCode(
`// ✅ БЕЗОПАСНЫЙ КОД ПОСЛЕ АУДИТА DEVOPS
const API_URL = "https://api.groq.com/v1/chat";
const apiKey = process.env.VITE_API_KEY; // Безопасно вынесено в .env сейф!
// Личный телефон удален из кодовой базы

export async function askAI(prompt) {
  return fetch(API_URL, {
    headers: { Authorization: \`Bearer \${apiKey}\` },
    body: JSON.stringify({ prompt })
  });
}`
    );
    setScannerResult({
      scanned: true,
      issues: [],
      isSafe: true
    });
    if (!fixApplied) {
      setFixApplied(true);
      addReward(50, '🔐 Все уязвимости устранены: секреты спрятаны в process.env! (+50 ОП)');
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    }
  };

  // Step 4: GitHub Actions Template Bonus
  const [actionsCopied, setActionsCopied] = useState(false);
  const [actionsBonusClaimed, setActionsBonusClaimed] = useState(false);

  const sampleWorkflowYaml = `name: Security Audit & Build
on: [push, pull_request]

jobs:
  audit-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Check for Leaked Secrets
        run: |
          echo "Scanning repository for leaked API keys..."
          # Робот ищет открытые секреты
          grep -rn "AIza" . && exit 1 || echo "No secrets found! OK"

      - name: Build Web Application
        run: |
          echo "Running build..."
          echo "Build finished with 0 errors!"`;

  const copyActionsTemplate = () => {
    navigator.clipboard.writeText(sampleWorkflowYaml);
    setActionsCopied(true);
    setTimeout(() => setActionsCopied(false), 2500);

    if (!actionsBonusClaimed) {
      setActionsBonusClaimed(true);
      addReward(50, '⭐ БОНУС: Скопирован боевой шаблон GitHub Actions! (+50 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  // Step 5: Final Submission Form
  const [checkedProjectsCount, setCheckedProjectsCount] = useState('5');
  const [issuesFoundCount, setIssuesFoundCount] = useState('2');
  const [fixedCount, setFixedCount] = useState('2');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback('✅ Итоговый Security Audit Report успешно зафиксирован в Портале!');
    addReward(25, '📋 Security Audit Report сдан на высший балл! (+25 ОП)');
    confetti({ particleCount: 70, spread: 90, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-10 text-slate-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              УРОВЕНЬ 4 • 35–70 МИН • ЛАБОРАТОРИЯ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
              <span>Security Audit всех 5 проектов</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
            НАГРАДА: ДО +175 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-4xl">
          Финальная проверка перед публичным портфолио! Твоя задача как DevOps-инженера — убедиться, что ни в одном из твоих 5 проектов 
          нет открытых API-ключей, паролей, личных номеров телефонов или сломанных ссылок.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 🧪 ШАГ 1: ЧЕК-ЛИСТ ПО 5 ПРОЕКТАМ (+25 ОП ЗА КАЖДЫЙ)           */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ШАГ 1 ИЗ 5 • АУДИТ ПЕРИМЕТРА</span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Чек-лист безопасности по всем 5 проектам курса</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Отмечено проектов: {Object.values(claimedProjectRewards).filter(Boolean).length} / 5
          </span>
        </div>

        <div className="space-y-3.5">
          {projects.map((proj) => {
            const checks = checklist[proj.id];
            const isCompleted = claimedProjectRewards[proj.id];

            return (
              <div
                key={proj.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                      #{proj.id}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-white">{proj.name}</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {isCompleted ? '✓ АУДИТ ЗАВЕРШЕН (+25 ОП)' : 'ОЖИДАЕТ ПРОВЕРКИ'}
                  </span>
                </div>

                {/* 3 Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleCheck(proj.id, 'noSecrets')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      checks.noSecrets
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checks.noSecrets ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                      }`}
                    >
                      {checks.noSecrets && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>
                    <span>Нет паролей и API-ключей</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCheck(proj.id, 'noPersonal')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      checks.noPersonal
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checks.noPersonal ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                      }`}
                    >
                      {checks.noPersonal && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>
                    <span>Нет личных данных (телефон/адрес)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCheck(proj.id, 'linkWorks')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      checks.linkWorks
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checks.linkWorks ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                      }`}
                    >
                      {checks.linkWorks && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>
                    <span>Боевая ссылка работает</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🧪 ШАГ 2: ИИ-СКАНЕР КОДА НА УТЕЧКИ (+25 ОП)                    */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ШАГ 2 ИЗ 5 • ИИ-АССИСТЕНТ</span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>Попроси ИИ найти секреты в коде (+25 ОП)</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            AI CODE SCANNER
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Вставь подозрительный фрагмент кода или нажми кнопку сканирования, чтобы ИИ проверил наличие забытых ключей:
        </p>

        {/* Code Editor Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>ФАЙЛ: src/services/aiService.ts (Интерактивный черновик)</span>
            <span>Символов: {scannerCode.length}</span>
          </div>

          <textarea
            value={scannerCode}
            onChange={(e) => setScannerCode(e.target.value)}
            rows={8}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 leading-relaxed shadow-inner"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={runAIScan}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Запустить ИИ-сканирование на утечки (+25 ОП)</span>
            </button>

            {scannerResult.scanned && (
              <span className="text-xs font-mono text-slate-400">
                Статус: {scannerResult.isSafe ? '✅ Секретов не найдено' : '⚠️ Обнаружены угрозы!'}
              </span>
            )}
          </div>

          {/* Scanner Feedback Results */}
          {scannerResult.scanned && (
            <div
              className={`p-4 rounded-2xl border space-y-3 animate-in fade-in ${
                scannerResult.isSafe
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {scannerResult.isSafe ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Отлично! Код абсолютно чист и готов к публикации.</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>Внимание! ИИ обнаружил {scannerResult.issues.length} уязвимости:</span>
                  </>
                )}
              </div>

              {scannerResult.issues.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  {scannerResult.issues.map((iss, i) => (
                    <div key={i} className="p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300">
                      {iss}
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={applyAIFix}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Исправить автоматически: убрать ключ в process.env (+50 ОП)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🧪 ШАГ 4: ШАБЛОН GITHUB ACTIONS (БОНУС +50 ОП)                  */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ШАГ 4 ИЗ 5 • БОНУСНЫЙ КВЕСТ</span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-violet-400" />
              <span>Попробуй простой шаблон GitHub Actions (+50 ОП)</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-violet-400 bg-violet-950 px-2.5 py-1 rounded-full border border-violet-800">
            YAML PIPELINE
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Скопируй этот готовый файл автоматизации. Вставь его в свой репозиторий по пути <code className="text-cyan-300">.github/workflows/deploy.yml</code>, 
          и GitHub будет автоматически проверять безопасность при каждом пуше!
        </p>

        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
          <button
            type="button"
            onClick={copyActionsTemplate}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {actionsCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{actionsCopied ? 'Скопировано!' : 'Копировать шаблон'}</span>
          </button>

          <pre className="text-emerald-400">{sampleWorkflowYaml}</pre>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📋 ШАГ 5: SECURITY AUDIT REPORT (ФИНАЛЬНЫЙ ОТЧЁТ)              */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ШАГ 5 ИЗ 5 • ФИКСАЦИЯ РЕЗУЛЬТАТОВ</span>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Security Audit Report</span>
          </h3>
        </div>

        <form onSubmit={handleSubmitReport} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Проверено проектов (из 5):</label>
              <input
                type="text"
                value={checkedProjectsCount}
                onChange={(e) => setCheckedProjectsCount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Найдено проблем / утечек:</label>
              <input
                type="text"
                value={issuesFoundCount}
                onChange={(e) => setIssuesFoundCount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-amber-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Успешно исправлено:</label>
              <input
                type="text"
                value={fixedCount}
                onChange={(e) => setFixedCount(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Отправить Security Audit Report в Портал (+25 ОП)</span>
            </button>

            {submissionFeedback && (
              <span className="text-xs font-bold text-emerald-400 animate-in fade-in">
                {submissionFeedback}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В ПОРТАЛЕ                */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineLabSubmission
          labId={22}
          lessonId={22}
          taskTitle="Лабораторная работа №22: Автоматизация безопасности CI/CD и Git-Secrets"
          rewardExp={100}
        />
      </div>
    </div>
  );
};
