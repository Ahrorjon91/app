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
  Terminal,
  RefreshCw,
  Send,
  Loader2,
  Cpu,
  Trophy,
  Share2,
  FileText,
  Bug,
  GitBranch,
  Wrench,
  Search,
  Monitor,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson21HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Homework Project 1-3 Tracker State
  const [hwProjects, setHwProjects] = useState([
    {
      id: 1,
      project: 'Project #1: Landing Page',
      bugFound: '',
      type: 'UI',
      isFixed: false
    },
    {
      id: 2,
      project: 'Project #2: AI Chatbot',
      bugFound: '',
      type: 'Logic',
      isFixed: false
    },
    {
      id: 3,
      project: 'Project #3: Multimodal App',
      bugFound: '',
      type: 'Responsive',
      isFixed: false
    }
  ]);

  const updateHwProject = (id: number, field: string, val: any) => {
    setHwProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  // Side Quests
  const [familyQuestDone, setFamilyQuestDone] = useState(false);
  const [fullLogQuestDone, setFullLogQuestDone] = useState(false);

  const handleToggleSideQuest = (quest: 'family' | 'log') => {
    if (quest === 'family' && !familyQuestDone) {
      setFamilyQuestDone(true);
      addReward(20, '⭐ Квест «Family Bug Hunter» выполнен! (+20 ОП)');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else if (quest === 'log' && !fullLogQuestDone) {
      setFullLogQuestDone(true);
      addReward(20, '⭐ Квест «Bug Report Log» выполнен! (+20 ОП)');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  // AI Diary
  const [unexpectedBugNote, setUnexpectedBugNote] = useState('');
  const [qaImportanceNote, setQaImportanceNote] = useState('');
  const [diarySaved, setDiarySaved] = useState(false);

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    setDiarySaved(true);
    addReward(25, '📖 Запись в Дневник ИИ сохранена! (+25 ОП)');
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
  };

  // Cheat Sheet copy state
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  const cheatSheetText = `TEST CASE:  Expected (должно быть) vs Actual (получилось) → разница = БАГ

3 ТИПА БАГОВ:  🎨 UI · 🧠 Logic · 📱 Responsive

REGRESSION:  Исправил одно → проверь ВСЁ остальное — не сломалось ли что-то ещё

GIT-ВЕТКА:  main (рабочая версия) + test-branch (безопасные эксперименты)

DEBUG-ЦЕПОЧКА:  Expected → Actual → Reproduce → Explain → Fix → Test

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheatSheet = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2000);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* ============================================================== */}
      {/* HEADER SECTION                                                 */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-cyan-500/30 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> РАЗДЕЛ 4: ДОМАШНЕЕ ЗАДАНИЕ
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> Срок: до следующей миссии (~25 минут)
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
          🎒 ДОМАШНЕЕ ЗАДАНИЕ: BUG HUNT В ОСТАВШИХСЯ ПРОЕКТАХ
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          В классе мы сосредоточились на Project #4 и Project #5. Дома примени метод Expected vs Actual 
          к оставшимся проектам (Project #1–3), выполни семейные квесты и заполни Дневник ИИ!
        </p>
      </div>

      {/* ============================================================== */}
      {/* 🎮 ОСНОВНОЕ ЗАДАНИЕ: BUG HUNT В ПРОЕКТАХ #1-3                   */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-cyan-400" /> 🎮 Чек-лист проверки оставшихся проектов (#1–3)
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">+50 ОП</span>
        </div>

        <div className="space-y-4">
          {hwProjects.map((proj) => (
            <div key={proj.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-cyan-300 font-mono">
                  {proj.project}
                </span>

                <div className="flex items-center gap-2">
                  <select
                    value={proj.type}
                    onChange={(e) => updateHwProject(proj.id, 'type', e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="UI">🎨 UI Bug</option>
                    <option value="Logic">🧠 Logic Bug</option>
                    <option value="Responsive">📱 Responsive Bug</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => updateHwProject(proj.id, 'isFixed', !proj.isFixed)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      proj.isFixed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {proj.isFixed ? 'Исправлен ✅' : 'Не исправлен'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Найденный баг (краткое описание):
                </label>
                <input
                  type="text"
                  value={proj.bugFound}
                  onChange={(e) => updateHwProject(proj.id, 'bugFound', e.target.value)}
                  placeholder={`Опиши найденную проблему в ${proj.project}...`}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ⭐ ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ                                       */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-amber-500/30 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" /> ⭐ Дополнительные квесты (+40 ОП)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Квест 1: Family Bug Hunter */}
          <div
            onClick={() => handleToggleSideQuest('family')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              familyQuestDone
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs flex items-center gap-1.5">
                🕵️ Family Bug Hunter
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                +20 ОП
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Дай родителям или друзьям попробовать сломать твоё приложение со смартфона. 
              Запиши, на каких неочевидных кнопках они споткнулись.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckCircle2 className={`w-4 h-4 ${familyQuestDone ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{familyQuestDone ? 'Квест выполнен!' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* Квест 2: Bug Report Log */}
          <div
            onClick={() => handleToggleSideQuest('log')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              fullLogQuestDone
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs flex items-center gap-1.5">
                📋 Bug Report Log в Notion / Документе
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                +20 ОП
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Собери единый сводный документ со всеми найденными за миссию багами (скриншоты, Expected/Actual, статус).
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckCircle2 className={`w-4 h-4 ${fullLogQuestDone ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{fullLogQuestDone ? 'Квест выполнен!' : 'Отметить выполнение'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📖 ДНЕВНИК ИИ                                                  */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> 📖 Дневник ИИ: Мысли QA-инженера
          </h3>
          <span className="text-xs text-slate-400">Рефлексия после охоты на баги</span>
        </div>

        <form onSubmit={handleSaveDiary} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              1. Самый неожиданный баг, который я нашёл(а) сегодня:
            </label>
            <textarea
              rows={2}
              required
              value={unexpectedBugNote}
              onChange={(e) => setUnexpectedBugNote(e.target.value)}
              placeholder="Какая ошибка удивила больше всего и почему она возникла?.."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              2. Что я понял(а) про важность профессионального тестирования:
            </label>
            <textarea
              rows={2}
              required
              value={qaImportanceNote}
              onChange={(e) => setQaImportanceNote(e.target.value)}
              placeholder="Почему нельзя доверять фразе «У меня всё работает»?.."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={diarySaved}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                diarySaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              {diarySaved ? 'Запись в Дневнике сохранена ✅' : 'Сохранить запись в Дневник (+25 ОП)'}
            </button>
          </div>
        </form>
      </div>

      {/* ============================================================== */}
      {/* 📄 ШПАРГАЛКА — НА ОДИН ЭКРАН                                   */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" /> 📄 Шпаргалка Миссии 21 — на один экран
          </h3>

          <button
            onClick={handleCopyCheatSheet}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedCheatSheet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCheatSheet ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
          {cheatSheetText}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📖 МИНИ-СЛОВАРЬ ТЕРМИНОВ QA                                     */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-amber-400" /> 📖 Мини-словарь QA-Инженера
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300">Test Case</span>
            <p className="text-slate-400">
              Конкретный сценарий проверки: что ожидается (Expected) и что получилось (Actual).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-rose-300">Bug (баг)</span>
            <p className="text-slate-400">
              Ошибка или дефект, когда фактический результат программы расходится с ожидаемым.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-pink-300">UI Bug</span>
            <p className="text-slate-400">
              Ошибка визуального отображения: съехавшая кнопка, обрезанный заголовок, наложение слоёв.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300">Logic Bug</span>
            <p className="text-slate-400">
              Сбой в логике работы: неверные вычисления, сломанный стейт, неправильный редирект.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-300">Responsive Bug</span>
            <p className="text-slate-400">
              Поломка верстки при смене разрешения экрана: горизонтальный скролл на смартфоне.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-violet-300">Regression</span>
            <p className="text-slate-400">
              Откат качества назад: когда исправление одной проблемы ломает ранее работавший модуль.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-3">
            <span className="font-bold text-emerald-300">Branch (ветка Git)</span>
            <p className="text-slate-400">
              Изолированная линия разработки: позволяет смело тестировать и ломать код, не рискуя стабильностью ветки main.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🔗 ИНСТРУМЕНТЫ МИССИИ                                          */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-400" /> 🔗 Инструменты миссии
          </h3>
          <span className="text-xs text-slate-400 font-mono">target="_blank"</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 space-y-1 block group transition-all"
          >
            <div className="font-bold text-white group-hover:text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-4 h-4 text-emerald-400" /> GitHub
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Ветки, коммиты черновиков bug-hunt-test и Pull Request слияния в main.
            </p>
          </a>

          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 space-y-1 block group transition-all"
          >
            <div className="font-bold text-white group-hover:text-cyan-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-cyan-400" /> Google AI Studio
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Генерация негативных тест-кейсов и поиск скрытых логических багов.
            </p>
          </a>

          <a
            href="https://developer.chrome.com/docs/devtools"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 space-y-1 block group transition-all"
          >
            <div className="font-bold text-white group-hover:text-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-amber-400" /> Chrome DevTools
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              F12: инспектор элементов, мобильный скейл (360px) и Console ошибок.
            </p>
          </a>

          <a
            href="https://responsively.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-violet-500/50 space-y-1 block group transition-all"
          >
            <div className="font-bold text-white group-hover:text-violet-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-violet-400" /> Responsively App
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Синхронный просмотр страницы сразу на 5 мобильных и десктоп экранах.
            </p>
          </a>
        </div>

        {/* 🆕 Дополнительные инструменты */}
        <div className="pt-3 border-t border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>🆕 Дополнительные инструменты</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <a
              href="https://www.browserstack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between group text-slate-300"
            >
              <span>BrowserStack (Real Devices)</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </a>
            <a
              href="https://wave.webaim.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between group text-slate-300"
            >
              <span>WAVE Accessibility Validator</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </a>
            <a
              href="https://pagespeed.web.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between group text-slate-300"
            >
              <span>Google PageSpeed Insights</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🔮 СЛЕДУЮЩАЯ МИССИЯ: DEVOPS                                    */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" /> СКОРО: МИССИЯ 22
          </span>
          <span className="text-xs text-slate-400 font-mono">Открывается после Миссии 21</span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white">
          МИССИЯ 22 — DEVOPS: Build → Test → Deploy
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
          🤖 <strong>NOVA:</strong> «Твои проекты теперь надёжнее. На следующей миссии — деплой, 
          окружения (environments), управление секретами и безопасность: последний технический рубеж перед тем, 
          как мы начнём упаковывать твоё итоговое портфолио к Demo Day!»
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Подумай заранее:</strong> Какой из твоих 5 проектов, по твоему мнению, самый надёжный, а какой ещё требует доработки перед публичным показом? 🚀
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ В ПОРТАЛЕ                  */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineHomeworkSubmission
          lessonId={21}
          taskTitle="Домашнее задание №21: Bug Hunt в оставшихся проектах (Project #1–3)"
          rewardExp={50}
        />
      </div>
    </div>
  );
};
