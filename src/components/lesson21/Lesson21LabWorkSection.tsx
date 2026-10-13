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
  Target,
  Play,
  Pause,
  Terminal,
  RefreshCw,
  Send,
  Loader2,
  Cpu,
  Trophy,
  Globe,
  Database,
  Layout,
  Share2,
  Bug,
  GitBranch,
  Split,
  Plus,
  Trash2,
  CheckSquare,
  Filter,
  Monitor
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface BugRecord {
  id: string;
  project: string;
  type: 'UI' | 'Logic' | 'Responsive';
  title: string;
  expected: string;
  actual: string;
  severity: 'Critical' | 'Medium' | 'Low';
  isFixed: boolean;
  createdAt: string;
}

export const Lesson21LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // STEP-BY-STEP WORKFLOW TRACKER
  // ==========================================
  const [labSteps, setLabSteps] = useState({
    step1Branch: false,
    step2FoundBugs: false,
    step3FixedBugs: false,
    step4RegressionCheck: false,
    step5MergedMain: false,
  });

  const toggleLabStep = (stepKey: keyof typeof labSteps, exp: number, msg: string) => {
    const nextVal = !labSteps[stepKey];
    setLabSteps((prev) => ({ ...prev, [stepKey]: nextVal }));
    if (nextVal) {
      addReward(exp, `${msg} (+${exp} ОП)`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  // ==========================================
  // 🐛 LIVE BUG REPORT LOG
  // ==========================================
  const initialBugs: BugRecord[] = [
    {
      id: 'bug-1',
      project: 'Project #5 My Life App',
      type: 'Logic',
      title: 'Пустая привычка добавляется в трекер',
      expected: 'Поле ввода проверяется на пустоту, выводится подсказка',
      actual: 'Создаётся пустая карточка без текста и без категории',
      severity: 'Medium',
      isFixed: true,
      createdAt: 'Сегодня, 10:15'
    },
    {
      id: 'bug-2',
      project: 'Project #4 WOW Website',
      type: 'Responsive',
      title: 'Карточка портфолио вылезает за край на ширине 375px',
      expected: 'Сетка адаптируется в 1 колонку без горизонтальной полосы прокрутки',
      actual: 'Появляется горизонтальный скролл страницы на iPhone',
      severity: 'Medium',
      isFixed: false,
      createdAt: 'Сегодня, 10:32'
    },
    {
      id: 'bug-3',
      project: 'Project #2 AI Chatbot',
      type: 'UI',
      title: 'Кнопка очистки истории обрезана на темной теме',
      expected: 'Кнопка контрастная и текст полностью виден',
      actual: 'Текст "Очистить" сливается с фоном темной панели',
      severity: 'Low',
      isFixed: true,
      createdAt: 'Сегодня, 10:45'
    }
  ];

  const [bugs, setBugs] = useState<BugRecord[]>(() => {
    try {
      const saved = localStorage.getItem('devops_lesson21_bug_log');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialBugs;
  });

  useEffect(() => {
    try {
      localStorage.setItem('devops_lesson21_bug_log', JSON.stringify(bugs));
    } catch {}
  }, [bugs]);

  // Form State for new bug
  const [newProject, setNewProject] = useState('Project #5 My Life App');
  const [newType, setNewType] = useState<'UI' | 'Logic' | 'Responsive'>('UI');
  const [newTitle, setNewTitle] = useState('');
  const [newExpected, setNewExpected] = useState('');
  const [newActual, setNewActual] = useState('');
  const [newSeverity, setNewSeverity] = useState<'Critical' | 'Medium' | 'Low'>('Medium');
  const [filterType, setFilterType] = useState<string>('ALL');

  const handleAddBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRecord: BugRecord = {
      id: `bug-${Date.now()}`,
      project: newProject,
      type: newType,
      title: newTitle.trim(),
      expected: newExpected.trim() || 'Корректная работа интерфейса без сбоев',
      actual: newActual.trim() || 'Происходит визуальный или программный сбой',
      severity: newSeverity,
      isFixed: false,
      createdAt: 'Только что'
    };

    setBugs((prev) => [newRecord, ...prev]);
    setNewTitle('');
    setNewExpected('');
    setNewActual('');

    addReward(25, `🐛 Баг «${newType}» добавлен в Bug Report Log! (+25 ОП)`);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const toggleBugFixed = (id: string) => {
    setBugs((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextState = !b.isFixed;
          if (nextState) {
            addReward(20, `✅ Баг исправлен и подтвержден! (+20 ОП)`);
          }
          return { ...b, isFixed: nextState };
        }
        return b;
      })
    );
  };

  const deleteBug = (id: string) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBugs = bugs.filter((b) => {
    if (filterType === 'ALL') return true;
    return b.type === filterType;
  });

  const fixedCount = bugs.filter((b) => b.isFixed).length;

  // ==========================================
  // 🌿 INTERACTIVE GIT BRANCH VISUALIZER
  // ==========================================
  const [gitStage, setGitStage] = useState<number>(1); // 1: main only, 2: branched, 3: commit on branch, 4: merged
  const [branchMerged, setBranchMerged] = useState(false);

  const handleBranchStep = (step: number) => {
    setGitStage(step);
    if (step === 4 && !branchMerged) {
      setBranchMerged(true);
      addReward(25, '🌿 Ветка bug-hunt-test успешно слита в main! (+25 ОП)');
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  // ==========================================
  // 🕵️ MINI-GAME: "НАЙДИ БАГ" (5 INTENTIONAL BUGS)
  // ==========================================
  const [foundBugs, setFoundBugs] = useState<{ [key: string]: boolean }>({
    overflowTitle: false,
    negativeCounter: false,
    typoButton: false,
    misalignedBadge: false,
    brokenInput: false,
  });

  const handleSpotBug = (bugKey: string, expName: string) => {
    if (foundBugs[bugKey]) return;
    const updated = { ...foundBugs, [bugKey]: true };
    setFoundBugs(updated);
    addReward(15, `🎯 Найден баг: ${expName}! (+15 ОП)`);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });

    const totalFound = Object.values(updated).filter(Boolean).length;
    if (totalFound === 5) {
      addReward(50, '🏆 МАСТЕР-СЛЕДОПЫТ: Все 5 скрытых багов найдены! (+50 ОП)');
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const totalBugsSpotted = Object.values(foundBugs).filter(Boolean).length;

  // Mock counter state for Mini-game
  const [mockCounter, setMockCounter] = useState(0);

  return (
    <div className="space-y-8 text-slate-200">
      {/* ============================================================== */}
      {/* HEADER SECTION                                                 */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-cyan-500/30 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
            <Bug className="w-3.5 h-3.5 text-cyan-400" /> УРОВЕНЬ 4 — ЛАБОРАТОРИЯ
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" /> Награда: до +175 ОП
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
          💻 BUG HUNT ПО ВСЕМ 5 ПРОЕКТАМ КУРСА
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Приоритет тестирования — <strong>Project #4 (WOW Website)</strong> и <strong>Project #5 (My Life App)</strong>. 
          Создай безопасную тестовую ветку в Git, найди минимум 3 реальных бага разных типов, заполни тест-кейсы, 
          исправь проблемы, проведи проверку на регрессию и сделай слияние в <code className="text-cyan-300 font-mono">main</code>!
        </p>
      </div>

      {/* ============================================================== */}
      {/* 5 ШАГОВ ЛАБОРАТОРНОЙ РАБОТЫ (ЧЕК-ЛИСТ С НАГРАДАМИ)             */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" /> Пошаговый протокол QA-инженера
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Шаг 1 */}
          <div
            onClick={() => toggleLabStep('step1Branch', 25, 'Шаг 1: Тестовая ветка создана')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              labSteps.step1Branch
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs">Шаг 1. Тестовая ветка</span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                +25 ОП
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Создай ветку <code className="text-cyan-300 font-mono">bug-hunt-test</code> в GitHub, чтобы не рисковать рабочей версией.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${labSteps.step1Branch ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{labSteps.step1Branch ? 'Ветка готова' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* Шаг 2 */}
          <div
            onClick={() => toggleLabStep('step2FoundBugs', 75, 'Шаг 2: 3 бага разных типов найдены')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              labSteps.step2FoundBugs
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs">Шаг 2. Найти 3 бага</span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                3 × +25 ОП
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Выяви минимум 3 бага (по одному: 🎨 UI, 🧠 Logic, 📱 Responsive) с формулой Expected vs Actual.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${labSteps.step2FoundBugs ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{labSteps.step2FoundBugs ? '3 бага зафиксированы' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* Шаг 3 */}
          <div
            onClick={() => toggleLabStep('step3FixedBugs', 50, 'Шаг 3: Баги исправлены в коде')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              labSteps.step3FixedBugs
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs">Шаг 3. Исправление</span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                +50 ОП
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Исправь баги по одному через Cursor / AI Studio в своей тестовой ветке <code className="text-cyan-300 font-mono">bug-hunt-test</code>.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${labSteps.step3FixedBugs ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{labSteps.step3FixedBugs ? 'Баги исправлены' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* Шаг 4 */}
          <div
            onClick={() => toggleLabStep('step4RegressionCheck', 25, 'Шаг 4: Проверка на regression пройдена')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              labSteps.step4RegressionCheck
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs">Шаг 4. Regression Test</span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                +25 ОП
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              После исправления проверь <strong>весь проект заново</strong> — не сломались ли соседние экраны и кнопки.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${labSteps.step4RegressionCheck ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{labSteps.step4RegressionCheck ? 'Регрессия отсутствует' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* Шаг 5 */}
          <div
            onClick={() => toggleLabStep('step5MergedMain', 25, 'Шаг 5: Pull Request и слияние в main')}
            className={`p-4 rounded-xl border transition-all cursor-pointer md:col-span-2 lg:col-span-2 ${
              labSteps.step5MergedMain
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs">Шаг 5. Слияние в main (Merge PR)</span>
              <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                ФИНАЛЬНЫЙ РЕЛИЗ
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Когда все тесты пройдены, слей проверенную ветку в основную <code className="text-cyan-300 font-mono">main</code> и обнови деплой!
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${labSteps.step5MergedMain ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{labSteps.step5MergedMain ? 'Код успешно влит в main' : 'Отметить выполнение'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🌿 ИНТЕРАКТИВНАЯ ВИЗУАЛИЗАЦИЯ GIT-ВЕТОК                         */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-emerald-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-400" /> 🌿 Интерактивная визуализация Git-веток
            </h3>
            <p className="text-xs text-slate-400">
              Наглядно увидь, как ветка спасает главную версию (main) от поломки
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
            ЭТАП {gitStage} ИЗ 4
          </span>
        </div>

        {/* Схема веток */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
          <div className="min-w-[550px] space-y-6">
            {/* Ветка main */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> main
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 border-2 border-emerald-400 flex items-center justify-center text-xs font-mono text-emerald-200">
                  v1.0
                </div>
                <div className="h-1 flex-1 bg-emerald-500/60" />
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 border-2 border-emerald-400 flex items-center justify-center text-xs font-mono text-emerald-200">
                  v1.1
                </div>
                <div className={`h-1 flex-1 transition-all ${gitStage === 4 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-all ${
                  gitStage === 4
                    ? 'bg-emerald-500 border-emerald-300 text-white shadow-lg shadow-emerald-500/50'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}>
                  v2.0
                </div>
              </div>
            </div>

            {/* Ветка bug-hunt-test */}
            <div className={`flex items-center gap-4 pl-8 transition-opacity duration-300 ${gitStage >= 2 ? 'opacity-100' : 'opacity-25'}`}>
              <div className="w-24 text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 shrink-0">
                <Split className="w-3.5 h-3.5 text-cyan-400" /> test-branch
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-[10px] font-mono text-cyan-200">
                  fix1
                </div>
                <div className="h-0.5 flex-1 bg-cyan-500/60" />
                <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-[10px] font-mono text-cyan-200">
                  fix2
                </div>
                <div className="h-0.5 flex-1 bg-cyan-500/60" />
                <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-[10px] font-mono text-cyan-200">
                  fix3
                </div>
                <div className={`h-0.5 flex-1 transition-all ${gitStage === 4 ? 'bg-cyan-400 border-dashed' : 'bg-slate-800'}`} />
                <div className="text-[11px] font-mono text-cyan-300 italic shrink-0 pl-2">
                  {gitStage === 4 ? '➔ слияние завершено!' : '➔ эксперименты'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки управления шагами в Git */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleBranchStep(1)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              gitStage === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            1. Исходный main
          </button>
          <button
            onClick={() => handleBranchStep(2)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              gitStage === 2 ? 'bg-cyan-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            2. Ответвление test-branch
          </button>
          <button
            onClick={() => handleBranchStep(3)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              gitStage === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-300'
            }`}
          >
            3. Коммиты баг-фиксов
          </button>
          <button
            onClick={() => handleBranchStep(4)}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              gitStage === 4
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white'
            }`}
          >
            4. Слить в main (Merge PR) +25 ОП
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🐛 ЖИВОЙ BUG REPORT LOG (ИНТЕРАКТИВНЫЙ ТРЕКЕР)                  */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-cyan-400" /> 🐛 Живой Bug Report Log: Охота на ошибки
            </h3>
            <p className="text-xs text-slate-400">
              Фиксируй найденные баги по формуле Expected vs Actual. Сохраняется автоматически в браузере.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
              Всего: <strong className="text-cyan-400">{bugs.length}</strong>
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
              Исправлено: <strong className="text-emerald-400">{fixedCount}</strong>
            </span>
          </div>
        </div>

        {/* Форма добавления нового бага */}
        <form onSubmit={handleAddBug} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-cyan-400" /> Добавить найденный баг в лог
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Проект курса:
              </label>
              <select
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Project #5 My Life App">Project #5 My Life App (Приоритет)</option>
                <option value="Project #4 WOW Website">Project #4 WOW Website (Приоритет)</option>
                <option value="Project #3 Multimodal App">Project #3 Multimodal App</option>
                <option value="Project #2 AI Chatbot">Project #2 AI Chatbot</option>
                <option value="Project #1 Landing Page">Project #1 Landing Page</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Тип бага:
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="UI">🎨 UI Bug (Внешний вид)</option>
                <option value="Logic">🧠 Logic Bug (Поведение/Логика)</option>
                <option value="Responsive">📱 Responsive Bug (Мобильный адаптив)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Критичность (Severity):
              </label>
              <select
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Critical">🔴 Critical (Блокирует работу)</option>
                <option value="Medium">🟡 Medium (Неприятно, но терпимо)</option>
                <option value="Low">🟢 Low (Мелкая опечатка/стиль)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Название ошибки (Краткая суть):
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Например: Кнопка генерации ИИ зависает при повторном клике..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-emerald-400 block mb-1">
                Expected (Что ожидалось):
              </label>
              <input
                type="text"
                value={newExpected}
                onChange={(e) => setNewExpected(e.target.value)}
                placeholder="Что ДОЛЖНО было произойти..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-rose-400 block mb-1">
                Actual (Что произошло на самом деле):
              </label>
              <input
                type="text"
                value={newActual}
                onChange={(e) => setNewActual(e.target.value)}
                placeholder="Что СЛУЧИЛОСЬ на самом деле..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Добавить баг (+25 ОП)
            </button>
          </div>
        </form>

        {/* Фильтры карточек */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" /> Фильтр по типу:
            {['ALL', 'UI', 'Logic', 'Responsive'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  filterType === t
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {t === 'ALL' ? 'Все' : t}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400">
            Отображено: {filteredBugs.length} записей
          </span>
        </div>

        {/* Список карточек найденных багов */}
        <div className="space-y-3">
          {filteredBugs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
              Баги этого типа пока не добавлены. Найди ошибку в проекте и нажми «Добавить баг» выше!
            </div>
          ) : (
            filteredBugs.map((bug) => {
              const typeColor =
                bug.type === 'UI'
                  ? 'bg-pink-950/60 text-pink-300 border-pink-700/50'
                  : bug.type === 'Logic'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50';

              return (
                <div
                  key={bug.id}
                  className={`p-4 rounded-xl border transition-all ${
                    bug.isFixed
                      ? 'bg-slate-950/60 border-emerald-900/40 opacity-80'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${typeColor}`}>
                        {bug.type === 'UI' ? '🎨 UI' : bug.type === 'Logic' ? '🧠 Logic' : '📱 Responsive'}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {bug.project}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {bug.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBugFixed(bug.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          bug.isFixed
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {bug.isFixed ? 'Исправлен ✅' : 'Отметить исправленным'}
                      </button>

                      <button
                        onClick={() => deleteBug(bug.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Удалить запись"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className={`text-sm font-bold text-white mb-2 ${bug.isFixed ? 'line-through text-slate-400' : ''}`}>
                    {bug.title}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-emerald-300">
                      <strong>Expected:</strong> {bug.expected}
                    </div>
                    <div className="text-rose-300">
                      <strong>Actual:</strong> {bug.actual}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🕵️ МИНИ-ИГРА "НАЙДИ БАГ" (5 СКРЫТЫХ ЗОН-БАГОВ)                 */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-950 border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" /> 🕵️ Мини-игра тренажёр: «Найди 5 багов в интерфейсе»
            </h3>
            <p className="text-xs text-slate-400">
              Внимательно изучи демо-приложение ниже. Кликни по каждому элементу с ошибкой!
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700">
            НАЙДЕНО: {totalBugsSpotted} / 5 🐛
          </span>
        </div>

        {/* Мок интерфейса приложения с 5 намеренными багами */}
        <div className="p-5 rounded-2xl bg-slate-950 border-2 border-slate-800 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Monitor className="w-4 h-4 text-cyan-400" /> ДЕМО: Habit Tracker v1.0 (Предрелиз)
            </div>
            <div className="text-[11px] text-slate-500">Кликай по подозрительным местам!</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Баг 1: Съехавший заголовок (UI Bug) */}
            <div
              onClick={() => handleSpotBug('overflowTitle', 'Съехавший заголовок карточки')}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                foundBugs.overflowTitle
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 bg-slate-900 hover:border-amber-500/50'
              }`}
            >
              <div className="text-xs font-mono text-slate-500 mb-1">Компонент A</div>
              <h5 className="text-xs font-black text-rose-300 transform -rotate-2 truncate">
                Утренняя зарядка и пробежжжжжжжжжжжка на улице
              </h5>
              <p className="text-[10px] text-slate-400 mt-1">Категория: Спорт</p>
              {foundBugs.overflowTitle && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500">
                  Баг #1 (UI)
                </span>
              )}
            </div>

            {/* Баг 2: Счетчик уходит в минус (Logic Bug) */}
            <div
              onClick={() => handleSpotBug('negativeCounter', 'Счетчик уходит в отрицательные значения')}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                foundBugs.negativeCounter
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 bg-slate-900 hover:border-amber-500/50'
              }`}
            >
              <div className="text-xs font-mono text-slate-500 mb-1">Компонент B: Счётчик</div>
              <div className="flex items-center justify-between text-xs">
                <span>Дней подряд:</span>
                <span className="font-bold text-rose-400 font-mono text-sm">{mockCounter}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMockCounter(prev => prev - 1);
                    handleSpotBug('negativeCounter', 'Счетчик уходит в отрицательные значения');
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 text-xs text-white hover:bg-slate-700"
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMockCounter(prev => prev + 1);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 text-xs text-white hover:bg-slate-700"
                >
                  +1
                </button>
              </div>
              {foundBugs.negativeCounter && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500">
                  Баг #2 (Logic)
                </span>
              )}
            </div>

            {/* Баг 3: Опечатка на кнопке (UI Bug) */}
            <div
              onClick={() => handleSpotBug('typoButton', 'Опечатка в тексте кнопки')}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                foundBugs.typoButton
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 bg-slate-900 hover:border-amber-500/50'
              }`}
            >
              <div className="text-xs font-mono text-slate-500 mb-1">Компонент C</div>
              <button
                type="button"
                className="w-full py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
              >
                Сохраниьт привычку
              </button>
              <div className="text-[10px] text-slate-400 mt-1.5">Статус: Готово</div>
              {foundBugs.typoButton && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500">
                  Баг #3 (UI Опечатка)
                </span>
              )}
            </div>

            {/* Баг 4: Бейдж наезжает на текст (Responsive Bug) */}
            <div
              onClick={() => handleSpotBug('misalignedBadge', 'Бейдж наезжает на текст при малом экране')}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                foundBugs.misalignedBadge
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 bg-slate-900 hover:border-amber-500/50'
              }`}
            >
              <div className="text-xs font-mono text-slate-500 mb-1">Компонент D</div>
              <div className="relative">
                <span className="absolute -top-3 -left-2 px-1.5 py-0.5 rounded bg-rose-600 text-[9px] text-white font-bold">
                  NEW!
                </span>
                <p className="text-xs text-slate-300 pl-4">
                  План занятий на неделю
                </p>
              </div>
              {foundBugs.misalignedBadge && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500">
                  Баг #4 (Responsive)
                </span>
              )}
            </div>

            {/* Баг 5: Поле ввода без валидации (Logic / Validation Bug) */}
            <div
              onClick={() => handleSpotBug('brokenInput', 'Инпут без проверки и ограничения длины')}
              className={`p-3 rounded-xl border transition-all cursor-pointer relative sm:col-span-2 ${
                foundBugs.brokenInput
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40'
                  : 'border-slate-800 bg-slate-900 hover:border-amber-500/50'
              }`}
            >
              <div className="text-xs font-mono text-slate-500 mb-1">Компонент E: Валидация</div>
              <input
                type="text"
                readOnly
                value="<script>alert('Hacked')</script>"
                className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-rose-400 font-mono"
              />
              <div className="text-[10px] text-slate-400 mt-1">Инпут не экранирует опасный ввод и не проверяет длину</div>
              {foundBugs.brokenInput && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500">
                  Баг #5 (Logic/Security)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В ПОРТАЛЕ                */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineLabSubmission
          labId={21}
          lessonId={21}
          taskTitle="Лабораторная работа №21: Bug Hunt по всем 5 проектам и Доктор Регрессии"
          rewardExp={100}
        />
      </div>
    </div>
  );
};
