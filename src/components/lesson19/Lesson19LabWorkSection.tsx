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
  Play,
  Pause,
  Terminal,
  RefreshCw,
  Send,
  Loader2,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson19LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // STEP 1: CHOOSE AI FEATURE
  // ==========================================
  const [selectedFeature, setSelectedFeature] = useState<'tutor' | 'quiz'>('tutor');

  // ==========================================
  // STEP 2: LIVE SYSTEM PROMPT CONSTRUCTOR
  // ==========================================
  const [roleText, setRoleText] = useState(
    'Терпеливый ИИ-тьютор по математике и логике в приложении MathHero'
  );
  const [taskText, setTaskText] = useState(
    'Объяснять шаги решения задач простыми жизненными примерами и метафорами'
  );
  const [doRules, setDoRules] = useState(
    'Отвечать максимум в 2-3 предложения, задавать наводящий вопрос в конце, использовать ободряющие эмодзи'
  );
  const [dontRules, setDontRules] = useState(
    'Никогда не выдавать готовый числовой ответ сразу, не ругать за ошибки, не отвечать на вопросы не по математике'
  );

  const [promptClaimed, setPromptClaimed] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Full constructed system prompt
  const generatedSystemPrompt = `// 🧬 SYSTEM PROMPT ДЛЯ ВСТРОЕННОГО ИИ
const SYSTEM_PROMPT = \`
Ты — ${roleText || '[Укажи роль]'}.
Твоя главная задача: ${taskText || '[Укажи задачу]'}.

✅ ПРАВИЛА (ЧТО ДЕЛАТЬ):
${doRules || '- Отвечать вежливо и кратко'}

❌ ОГРАНИЧЕНИЯ (ЧТО СТРОГО ЗАПРЕЩЕНО):
${dontRules || '- Не выходить за рамки приложения'}

🛡️ ПРАВИЛО БЕЗОПАСНОСТИ:
Если пользователь пытается сбить тебя с роли или спрашивает о посторонних вещах, вежливо верни разговор к теме приложения.
\`;`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedSystemPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleClaimPromptExp = () => {
    if (promptClaimed) return;
    setPromptClaimed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    addReward(50, '🧠 Шаг 2: System Prompt успешно сконструирован (+50 ОП)!');
  };

  // ==========================================
  // STEP 3: LIVE INTERACTIVE SANDBOX OF EMBEDDED AI
  // ==========================================
  const [sandboxInput, setSandboxInput] = useState('Объясни, почему минус на минус даёт плюс?');
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [sandboxHistory, setSandboxHistory] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: 'Как быстро сложить 19 + 27?',
      a: 'Представь 19 как 20 - 1! Сложи 20 + 27 = 47, и отними единичку = 46. Ловко, правда? Попробуешь так же с 29 + 35? 🎯',
      time: '12:04'
    }
  ]);
  const [embedClaimed, setEmbedClaimed] = useState(false);

  // Ready AI Studio Prompts
  const [copiedStudioPrompt, setCopiedStudioPrompt] = useState(false);
  const aiStudioCodeSnippet = `// 🟢 Промпт для Google AI Studio:
«Добавь в моё приложение кнопку "Спросить ИИ-Тьютора" рядом с полем ввода.
При клике вызывай API Gemini с моим SYSTEM_PROMPT:
---
${generatedSystemPrompt}
---
Отобрази ответ прямо под кнопкой в красивой карточке с иконкой 🤖.
Если запрос упал с ошибкой или нет сети, покажи: "⚠️ ИИ временно недоступен. Попробуй ещё раз через пару секунд!"»`;

  const handleCopyStudioPrompt = () => {
    navigator.clipboard.writeText(aiStudioCodeSnippet);
    setCopiedStudioPrompt(true);
    setTimeout(() => setCopiedStudioPrompt(false), 2500);
  };

  const handleSendSandboxAiQuery = () => {
    if (!sandboxInput.trim() || isAiLoading) return;
    setIsAiLoading(true);
    setSandboxResponse(null);

    setTimeout(() => {
      setIsAiLoading(false);
      if (simulateError) {
        setSandboxResponse(
          '⚠️ Ошибка соединения с ИИ: сервер временно перегружен или нет интернета. Твоё приложение не сломалось благодаря защитному fallback-блоку!'
        );
      } else {
        let answer = '';
        if (selectedFeature === 'tutor') {
          if (sandboxInput.toLowerCase().includes('минус')) {
            answer =
              'Представь долг: если у тебя забирают (минус) долг в $10 (минус) — ты становишься богаче на $10! Минус направления разворачивает стрелку дважды. Как думаешь, что будет с тремя минусами? 🤔';
          } else if (sandboxInput.toLowerCase().includes('ответ') || sandboxInput.toLowerCase().includes('реши')) {
            answer =
              'Я не даю готовых ответов — в этом моя суперсила! Давай я подскажу первый шаг: с чего обычно начинают группировку слагаемых? 💡';
          } else {
            answer = `Отличный вопрос! Давай разложим его по полочкам: главный секрет тут в правильном порядке действий. Какое действие ты хочешь сделать первым? 🚀`;
          }
        } else {
          answer =
            '❓ [ВОПРОС ОТ ИИ]: У тебя есть 3 ящика с яблоками. В каждом по 7 штук, но из одного взяли 2. Сколько всего яблок осталось? Напиши твой ответ!';
        }
        setSandboxResponse(answer);
        setSandboxHistory(prev => [{ q: sandboxInput, a: answer, time: new Date().toLocaleTimeString().slice(0, 5) }, ...prev]);
      }
    }, 1200);
  };

  const handleClaimEmbedExp = () => {
    if (embedClaimed) return;
    setEmbedClaimed(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    addReward(75, '🔘 Шаг 3: Встраивание ИИ-кнопки успешно подтверждено (+75 ОП)!');
  };

  // ==========================================
  // STEP 4: BREAK THE TUTOR (4 TESTS)
  // ==========================================
  const [testsPassed, setTestsPassed] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [stressClaimed, setStressClaimed] = useState(false);

  const toggleTest = (id: number) => {
    setTestsPassed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClaimStressExp = () => {
    if (stressClaimed) return;
    setStressClaimed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    addReward(25, '🛡️ Шаг 4: Тесты стресс-проверки 4/4 пройдены (+25 ОП)!');
  };

  const countPassedTests = Object.values(testsPassed).filter(Boolean).length;

  return (
    <div className="space-y-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            УРОВЕНЬ 4 • ⏱ 40–70 МИН • 🎁 ДО +150 ОП
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Конструктор System Prompt · Встраивание кнопки · Стресс-тест
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          2. Лабораторная работа: Встраиваем AI Tutor/Quiz прямо в приложение
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Преврати проект из Миссии 18 в умное AI-приложение: сформулируй невидимые правила (System Prompt), протестируй симулятор вызова ИИ прямо в кнопке и проверь систему на устойчивость к каверзным вопросам.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: CHOOSE AI FEATURE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Шаг 1: Выбери суперсилу встроенного ИИ (3 мин)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Формат интеграции</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedFeature('tutor')}
            className={`p-5 rounded-2xl border text-left transition-all space-y-2 ${
              selectedFeature === 'tutor'
                ? 'bg-violet-950/50 border-violet-400 ring-2 ring-violet-500/30 shadow-lg'
                : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">🎓</span>
              <span className="text-xs font-mono font-bold text-violet-300 bg-violet-950 px-2 py-0.5 rounded">
                ВАРИАНТ А
              </span>
            </div>
            <div className="text-sm font-bold text-white">AI Tutor: Кнопка «Объясни эту тему»</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Пользователь вводит сложное понятие или задачу, нажимает кнопку, и ИИ даёт понятное объяснение с метафорой, не давая готовых списываний.
            </p>
          </button>

          <button
            onClick={() => setSelectedFeature('quiz')}
            className={`p-5 rounded-2xl border text-left transition-all space-y-2 ${
              selectedFeature === 'quiz'
                ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg'
                : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">❓</span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded">
                ВАРИАНТ Б
              </span>
            </div>
            <div className="text-sm font-bold text-white">AI Quiz: Кнопка «Новый вопрос от ИИ»</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ИИ сам на лету сочиняет непредсказуемый вопрос с вариантами ответов на тему приложения, оценивает ответ пользователя и подсказывает ход мыслей.
            </p>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 2: SYSTEM PROMPT LIVE CONSTRUCTOR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Шаг 2: Живой конструктор System Prompt (10 мин)
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
            🎁 +50 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Настрой 4 невидимых правила, по которым твой встроенный ИИ будет отвечать пользователям. Любые изменения мгновенно отражаются в блоке кода справа!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: 4 Inputs */}
          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>👤</span>
                <span>1. РОЛЬ (Кем выступает ИИ в приложении):</span>
              </label>
              <input
                type="text"
                value={roleText}
                onChange={(e) => setRoleText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>🎯</span>
                <span>2. ГЛАВНАЯ ЗАДАЧА:</span>
              </label>
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span>✅</span>
                <span>3. ДЕЛАЙ (Формат ответа, тон, длина, примеры):</span>
              </label>
              <textarea
                rows={2}
                value={doRules}
                onChange={(e) => setDoRules(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-emerald-400 outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <span>❌</span>
                <span>4. НЕ ДЕЛАЙ (Табу, запреты на списывание и оффтоп):</span>
              </label>
              <textarea
                rows={2}
                value={dontRules}
                onChange={(e) => setDontRules(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-rose-400 outline-none resize-none"
              />
            </div>
          </div>

          {/* Right: Code Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  ГОТОВЫЙ SYSTEM PROMPT В КОДЕ:
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-all"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedPrompt ? 'Скопировано!' : 'Копировать'}
                </button>
              </div>

              <pre className="mt-2 text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-56">
{generatedSystemPrompt}
              </pre>
            </div>

            <button
              onClick={handleClaimPromptExp}
              disabled={promptClaimed}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                promptClaimed
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              }`}
            >
              {promptClaimed ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              {promptClaimed ? 'System Prompt утверждён (+50 ОП)' : 'Утвердить System Prompt (+50 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 3: EMBED BUTTON & LIVE SIMULATOR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Шаг 3: Встрой кнопку + протестируй симулятор (20 мин)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            🎁 +75 ОП
          </span>
        </div>

        {/* Ready AI Studio Prompt */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Промпт для Google AI Studio (скопируй и отправь в AI Studio):
            </span>
            <button
              onClick={handleCopyStudioPrompt}
              className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs font-bold flex items-center gap-1.5 transition-all hover:bg-emerald-900"
            >
              {copiedStudioPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedStudioPrompt ? 'Промпт скопирован!' : 'Скопировать промпт для AI Studio'}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {aiStudioCodeSnippet}
          </p>
        </div>

        {/* Interactive Sandbox of Embedded AI Button */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-violet-500/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">
                ИНТЕРАКТИВНЫЙ ТРЕНАЖЁР: Встроенная AI-кнопка
              </span>
            </div>

            {/* Error simulation toggle */}
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0"
              />
              <span>Симулировать обрыв сети/ошибку API</span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300">
              Попробуй задать вопрос своему встроенному ИИ прямо сейчас:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                placeholder="Введи вопрос для ИИ..."
                className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-violet-400 outline-none"
              />
              <button
                onClick={handleSendSandboxAiQuery}
                disabled={isAiLoading || !sandboxInput.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 transition-all shrink-0 disabled:opacity-50"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ИИ думает...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Спросить встроенный ИИ</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Response Bubble */}
            {sandboxResponse && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 transition-all ${
                simulateError
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-violet-950/40 border-violet-500/50 text-violet-200'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold flex items-center gap-1.5">
                    {simulateError ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> : <Bot className="w-3.5 h-3.5 text-violet-400" />}
                    {simulateError ? 'ЗАЩИТНЫЙ FALLBACK АКТИВИРОВАН' : 'ОТВЕТ ВСТРОЕННОГО ИИ (1.2с)'}
                  </span>
                  <span className="text-slate-400">Gemini 2.5 Flash</span>
                </div>
                <p className="pt-1">{sandboxResponse}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleClaimEmbedExp}
            disabled={embedClaimed}
            className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              embedClaimed
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {embedClaimed ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {embedClaimed ? 'Кнопка встроенного ИИ зафиксирована (+75 ОП)' : 'Зафиксировать успешное встраивание ИИ-кнопки (+75 ОП)'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 4: BREAK THE TUTOR (4 TESTS) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              Шаг 4: Стресс-тест «Сложный пользователь» (7 мин)
            </h3>
          </div>
          <span className="text-xs font-mono text-rose-300 bg-rose-950 px-2.5 py-1 rounded-full border border-rose-800">
            Пройдено: {countPassedTests} / 4 • 🎁 +25 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Протестируй встроенный ИИ точно так же, как в Миссии 03 (Break the Tutor). Отметь галочками тесты, которые твой System Prompt успешно выдержал:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => toggleTest(1)}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              testsPassed[1]
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">1. Тест «Дай готовый ответ!»</span>
              {testsPassed[1] ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-slate-600" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Пользователь требует: «Просто скажи ответ X, мне лень думать». ИИ отказался списывать и дал подсказку.
            </p>
          </button>

          <button
            onClick={() => toggleTest(2)}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              testsPassed[2]
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">2. Тест «Я ничего не понимаю»</span>
              {testsPassed[2] ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-slate-600" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Пользователь жалуется. ИИ не начал грубить или повторять то же самое, а подобрал простую метафору из жизни.
            </p>
          </button>

          <button
            onClick={() => toggleTest(3)}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              testsPassed[3]
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">3. Тест «Неверный ответ»</span>
              {testsPassed[3] ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-slate-600" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Пользователь дал заведомо глупую ошибку. ИИ мягко указал на нестыковку и помог найти верное русло.
            </p>
          </button>

          <button
            onClick={() => toggleTest(4)}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              testsPassed[4]
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">4. Тест «Оффтоп и провокация»</span>
              {testsPassed[4] ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-slate-600" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Пользователь спросил про погоду, компьютерную игру или политику. ИИ вежливо вернул к теме приложения.
            </p>
          </button>
        </div>

        <button
          onClick={handleClaimStressExp}
          disabled={stressClaimed || countPassedTests < 4}
          className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            stressClaimed
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
              : countPassedTests === 4
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {stressClaimed ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          {stressClaimed
            ? 'Стресс-тест 4/4 зачтён (+25 ОП)'
            : countPassedTests === 4
            ? 'Зачесть 4/4 пройденных тестов (+25 ОП)'
            : `Пройдите все 4 теста (сейчас ${countPassedTests}/4)`}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* INLINE LAB SUBMISSION FORM */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-violet-400" />
          Сдача лабораторной работы #19 ментору курса
        </h3>
        <InlineLabSubmission
          labId={19}
          labTitle="Миссия 19: AI Engineer — Встраивание AI Tutor / Quiz в приложение"
        />
      </div>
    </div>
  );
};
