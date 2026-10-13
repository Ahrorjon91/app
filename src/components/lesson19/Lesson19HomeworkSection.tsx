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
  Send,
  Calendar,
  Star,
  Users,
  Smile,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson19HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main HW Form states
  const [hwFeatureAdded, setHwFeatureAdded] = useState('');
  const [hwNewRule, setHwNewRule] = useState('');
  const [hwVerifiedResult, setHwVerifiedResult] = useState('');
  const [mainHwSaved, setMainHwSaved] = useState(false);

  // Side Quests
  const [breakAgainDone, setBreakAgainDone] = useState(false);
  const [familyTestDone, setFamilyTestDone] = useState(false);

  // AI Journal
  const [journalFunctionName, setJournalFunctionName] = useState('');
  const [journalImportantRule, setJournalImportantRule] = useState('');
  const [journalReflection, setJournalReflection] = useState('');
  const [journalRating, setJournalRating] = useState<number | null>(5);
  const [journalSaved, setJournalSaved] = useState(false);

  // Cheat Sheet copy
  const [copiedCheat, setCopiedCheat] = useState(false);
  const cheatSheetText = `ИИ СНАРУЖИ:  Отдельная вкладка, ручное копирование
ИИ ВНУТРИ:   Кнопка в приложении → ответ прямо там

SYSTEM PROMPT = Роль + Задача + ✅ Делай + ❌ Не делай

ЦЕПОЧКА:  Кнопка → Запрос к ИИ-API → Правила (System Prompt) → Ответ в интерфейсе

ЗАЩИТА:  Обработка ошибок · Ограничение длины · Возврат к теме

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheat = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2500);
  };

  const handleSaveMainHw = () => {
    if (!hwFeatureAdded.trim() || mainHwSaved) return;
    setMainHwSaved(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
    addReward(25, '🎮 ДЗ «Add AI Feature» зафиксировано в журнале (+25 ОП)!');
  };

  const handleClaimBreakAgain = () => {
    if (breakAgainDone) return;
    setBreakAgainDone(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    addReward(20, '🥊 Сайд-квест «Break it Again» выполнен (+20 ОП)!');
  };

  const handleClaimFamilyTest = () => {
    if (familyTestDone) return;
    setFamilyTestDone(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    addReward(20, '👨‍👩‍👧 Сайд-квест «Family AI Test» выполнен (+20 ОП)!');
  };

  const handleSaveJournal = () => {
    if (journalSaved) return;
    setJournalSaved(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    addReward(15, '📝 Дневник ИИ Миссии 19 сохранён (+15 ОП)!');
  };

  return (
    <div className="space-y-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            РАЗДЕЛ 4 • ДОМАШНЯЯ РАБОТА И САЙД-КВЕСТЫ
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Срок: до следующей миссии • ~25 минут
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          4. Домашнее задание: «Add AI Feature» & Сайд-квесты
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Закрепи навык создания умного софта: добавь вторую AI-фичу, проверь устойчивость к багам и поделись своим приложением с семьёй!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HOMEWORK: ADD AI FEATURE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-violet-400 font-mono uppercase tracking-widest">
              ОСНОВНОЕ ЗАДАНИЕ • ⏱ ~25 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Brain className="w-6 h-6 text-violet-400" />
              🎮 «Add AI Feature»: Улучши ИИ или добавь вторую кнопку
            </h3>
          </div>
          <span className="text-xs font-mono text-violet-300 bg-violet-950 px-3 py-1 rounded-full border border-violet-800">
            Практика в AI Studio
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Улучши свою AI-функцию (например, научи её давать рифмованные подсказки или оценивать сложность темы) или встрой вторую кнопку (например, и Тьютора, и Генератор викторин одновременно).
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              1. Что я улучшил(а) или какую вторую AI-фичу добавил(а):
            </label>
            <input
              type="text"
              value={hwFeatureAdded}
              onChange={(e) => setHwFeatureAdded(e.target.value)}
              placeholder="Например: добавил(а) кнопку «Придумай аналогию из аниме/фильмов»"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-violet-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              2. Новое правило, добавленное в System Prompt:
            </label>
            <input
              type="text"
              value={hwNewRule}
              onChange={(e) => setHwNewRule(e.target.value)}
              placeholder="Например: «Используй только аналогии с персонажами Наруто или Гарри Поттера»"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-violet-400 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              3. Как я проверил(а), что стало лучше (результат теста):
            </label>
            <input
              type="text"
              value={hwVerifiedResult}
              onChange={(e) => setHwVerifiedResult(e.target.value)}
              placeholder="Например: нажал кнопку 3 раза на разных вопросах — ответы стали в 2 раза нагляднее"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-violet-400 outline-none"
            />
          </div>

          <button
            onClick={handleSaveMainHw}
            disabled={mainHwSaved || !hwFeatureAdded.trim()}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              mainHwSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20'
            }`}
          >
            {mainHwSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {mainHwSaved ? 'Задание «Add AI Feature» сохранено (+25 ОП)' : 'Сохранить отчёт о задании (+25 ОП)'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIDE QUESTS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          ⭐ Дополнительные квесты (Сайд-квесты)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sidequest 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <span>🥊</span>
                  <span>Break it Again</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  +20 ОП
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Придумай новый «хитрый» стресс-тест
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Попробуй сбить свой встроенный ИИ с толку новым нетипичным вопросом (на двух языках, с намеренной путаницей понятий). Если нашёл слабое место — допиши ограничение в System Prompt!
              </p>
            </div>

            <button
              onClick={handleClaimBreakAgain}
              disabled={breakAgainDone}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                breakAgainDone
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
              }`}
            >
              {breakAgainDone ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              {breakAgainDone ? 'Квест выполнен (+20 ОП)' : 'Я провёл хитрый тест (+20 ОП)'}
            </button>
          </div>

          {/* Sidequest 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>👨‍👩‍👧</span>
                  <span>Family AI Test</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  +20 ОП
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Протестируй приложение на родителях или друзьях
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Дай родителям или друзьям открыть твоё приложение на смартфоне, нажать на кнопку встроенного ИИ и задать свой вопрос. Запиши их реакцию — удивились ли они скорости?
              </p>
            </div>

            <button
              onClick={handleClaimFamilyTest}
              disabled={familyTestDone}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                familyTestDone
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
              }`}
            >
              {familyTestDone ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              {familyTestDone ? 'Квест выполнен (+20 ОП)' : 'Родные протестировали (+20 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AI JOURNAL (REFLECTIVE PRACTICE) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            📝 Дневник ИИ: Фиксация инсайтов Миссии 19
          </h3>
          <span className="text-xs font-mono text-violet-300 bg-violet-950 px-2.5 py-1 rounded-full border border-violet-800">
            🎁 +15 ОП
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Моя AI-функция называется:
              </label>
              <input
                type="text"
                value={journalFunctionName}
                onChange={(e) => setJournalFunctionName(e.target.value)}
                placeholder="Например: QuickTutor, QuizMaster..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Самое важное правило моего System Prompt:
              </label>
              <input
                type="text"
                value={journalImportantRule}
                onChange={(e) => setJournalImportantRule(e.target.value)}
                placeholder="Например: не более 25 слов и обязательный наводящий вопрос"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Главный инсайт урока (чему я сегодня научился):
            </label>
            <textarea
              rows={2}
              value={journalReflection}
              onChange={(e) => setJournalReflection(e.target.value)}
              placeholder="Что для меня стало открытием? Как изменилось моё понимание работы мобильных приложений с ИИ?"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono resize-none"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>Оценка миссии:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setJournalRating(star)}
                  className={`text-base transition-transform hover:scale-125 ${
                    (journalRating || 0) >= star ? 'text-amber-400' : 'text-slate-600'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <button
              onClick={handleSaveJournal}
              disabled={journalSaved}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                journalSaved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md'
              }`}
            >
              {journalSaved ? <Check className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
              {journalSaved ? 'Дневник сохранён (+15 ОП)' : 'Сохранить запись в Дневник (+15 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHEAT SHEET & DICTIONARY PREVIEW */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Copy className="w-5 h-5 text-cyan-400" />
            📄 Шпаргалка Миссии 19 для домашней работы
          </h3>
          <button
            onClick={handleCopyCheat}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedCheat ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCheat ? 'Скопировано!' : 'Скопировать шпаргалку'}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
{cheatSheetText}
        </pre>
      </div>

      {/* ========================================================================= */}
      {/* PREVIEW OF NEXT MISSION 20 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-950 to-slate-900 border border-indigo-500/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-lg border border-indigo-500/30 shrink-0">
            🔮
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
              СЛЕДУЮЩАЯ МИССИЯ 20 • ФИНАЛ МОДУЛЯ
            </span>
            <h3 className="text-lg font-black text-white">
              🎯 PROJECT #5: MY LIFE APP — Agent Thinking & Opal
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          «Твоё приложение уже думает и отвечает пользователям! На следующей миссии мы пойдём ещё дальше — построим настоящего <strong>AI-агента</strong>, который не просто отвечает на вопросы, а сам планирует и выполняет цепочки полезных дел для твоей реальной жизни.»
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/50 text-xs text-indigo-200 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Подумай заранее:</strong> какую рутинную задачу ты бы хотел(а), чтобы ИИ выполнял за тебя САМ, а не просто отвечал советами?
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INLINE HOMEWORK SUBMISSION FORM */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-violet-400" />
          Сдача домашнего задания #19 в портал
        </h3>
        <InlineHomeworkSubmission lessonId={19} />
      </div>
    </div>
  );
};
