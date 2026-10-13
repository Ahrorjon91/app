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
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson20HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Project Card state
  const [projName, setProjName] = useState('');
  const [projProblem, setProjProblem] = useState('');
  const [projSolution, setProjSolution] = useState('');
  const [projAi, setProjAi] = useState('');
  const [projLink, setProjLink] = useState('');
  const [projTakeaway, setProjTakeaway] = useState('');
  const [copiedCard, setCopiedCard] = useState(false);

  // Side quests
  const [opalQuestDone, setOpalQuestDone] = useState(false);
  const [familyQuestDone, setFamilyQuestDone] = useState(false);

  // AI Diary
  const [agentDifferenceNote, setAgentDifferenceNote] = useState('');
  const [proudNote, setProudNote] = useState('');
  const [diarySaved, setDiarySaved] = useState(false);

  const getFullProjectCardText = () => {
    return `━━━━━━━━━━━━━━━━━━
🚀 PROJECT #05 — My Life App

НАЗВАНИЕ: ${projName || 'My Life App'}
ПРОБЛЕМА: ${projProblem || 'Описана реальная проблема'}
РЕШЕНИЕ: ${projSolution || 'Интерактивное веб-приложение'}
AI-ФУНКЦИЯ: ${projAi || 'AI Tutor / Quiz Generator'}
LIVE-ССЫЛКА: ${projLink || 'https://...'}
ЧТО Я УЗНАЛ ЗА ВЕСЬ БЛОК «AI APPS»: ${projTakeaway || 'Понял разницу между ответом и действием ИИ, освоил System Prompt и агентное мышление'}
━━━━━━━━━━━━━━━━━━`;
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(getFullProjectCardText());
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleSaveDiary = () => {
    setDiarySaved(true);
    addReward(25, 'Запись в Дневнике ИИ сохранена! (+25 ОП)');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>4. Домашнее Задание • Миссия 20</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              🎒 Agent Improvement + Project Card #05
            </h2>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
            ⏱ ~25 минут • Финал Блока
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Оформление финальной карточки Project #5 для портфолио, сайд-квесты и подготовка к блоку Demo Day.
        </p>
      </div>

      {/* PROJECT CARD BUILDER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Паспорт Проекта #05: My Life App</span>
          </h3>
          <button
            onClick={handleCopyCard}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-amber-500/30 self-start sm:self-auto"
          >
            {copiedCard ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Скопировано в буфер!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать карточку проекта</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Название проекта:</label>
            <input
              type="text"
              placeholder="MathHero / HabitForge / SleepTracker"
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Реальная проблема:</label>
            <input
              type="text"
              placeholder="Какую конкретную проблему решает продукт"
              value={projProblem}
              onChange={(e) => setProjProblem(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Решение (что делает приложение):</label>
            <input
              type="text"
              placeholder="Интерфейс, сохранение прогресса, трекер"
              value={projSolution}
              onChange={(e) => setProjSolution(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Встроенная AI-функция:</label>
            <input
              type="text"
              placeholder="AI-тьютор, генератор тестов, мотиватор"
              value={projAi}
              onChange={(e) => setProjAi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Live-ссылка (GitHub Pages):</label>
            <input
              type="text"
              placeholder="https://yourname.github.io/my-life-app/"
              value={projLink}
              onChange={(e) => setProjLink(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Что я узнал за блок «AI Apps»:</label>
            <input
              type="text"
              placeholder="Архитектура UI, Local Storage, System Prompt, Агенты"
              value={projTakeaway}
              onChange={(e) => setProjTakeaway(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Live Preview of the Project Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
          {getFullProjectCardText()}
        </div>
      </div>

      {/* SIDE QUESTS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>⭐ Дополнительные Квесты</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Quest 1: Opal Experiment */}
          <div
            className={`p-4 rounded-2xl border transition-all space-y-3 ${
              opalQuestDone
                ? 'bg-purple-950/40 border-purple-500/60'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                🤖 Opal Experiment
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-xs">
                +25 ОП
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Построй в Google Opal ещё одного мини-агента на любую тему для практики (например, генератор меню или подборщик фильмов).
            </p>
            <button
              onClick={() => {
                setOpalQuestDone(!opalQuestDone);
                if (!opalQuestDone) addReward(25, 'Квест Opal Experiment выполнен! (+25 ОП)');
              }}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                opalQuestDone
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {opalQuestDone ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Выполнено!
                </>
              ) : (
                'Отметить как выполненный'
              )}
            </button>
          </div>

          {/* Quest 2: Family Launch */}
          <div
            className={`p-4 rounded-2xl border transition-all space-y-3 ${
              familyQuestDone
                ? 'bg-emerald-950/40 border-emerald-500/60'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                👨‍👩‍👧 Family Launch
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                +25 ОП
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Покажи родным или друзьям финальное работающее приложение на телефоне и запиши их живой отзыв.
            </p>
            <button
              onClick={() => {
                setFamilyQuestDone(!familyQuestDone);
                if (!familyQuestDone) addReward(25, 'Квест Family Launch выполнен! (+25 ОП)');
              }}
              className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                familyQuestDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {familyQuestDone ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Выполнено!
                </>
              ) : (
                'Отметить как выполненный'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI DIARY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>📝 Твой Дневник ИИ (Рефлексия)</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">
              1. Разница между обычным ИИ и агентом своими словами:
            </label>
            <textarea
              rows={2}
              placeholder="Обычный ИИ только отвечает текстом, а агент сам планирует шаги и выполняет задачу до готового продукта..."
              value={agentDifferenceNote}
              onChange={(e) => setAgentDifferenceNote(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">
              2. Чем я больше всего горжусь в своём My Life App:
            </label>
            <textarea
              rows={2}
              placeholder="Горжусь тем, что данные реально сохраняются, а тьютор дает наводящие подсказки без спойлеров..."
              value={proudNote}
              onChange={(e) => setProudNote(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={handleSaveDiary}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg"
          >
            {diarySaved ? (
              <>
                <Check className="w-3.5 h-3.5" /> Запись в дневнике сохранена!
              </>
            ) : (
              'Сохранить в дневник (+25 ОП)'
            )}
          </button>
        </div>
      </div>

      {/* CHEATSHEET & MINI-DICTIONARY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Шпаргалка на один экран & Словарь</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-slate-300 space-y-1.5">
          <div><strong className="text-cyan-400">AGENT</strong> = Модель + Инструкции + Инструменты</div>
          <div><strong className="text-purple-400">ФОРМУЛА ДЕЙСТВИЯ:</strong> Цель → План → Инструменты → Действие → Результат</div>
          <div><strong className="text-amber-400">ОТВЕЧАЕТ vs ДЕЙСТВУЕТ:</strong> Обычный ИИ советует • Агент делает сам</div>
          <div><strong className="text-emerald-400">ГЛАВНОЕ ПРАВИЛО:</strong> Агент — не волшебство. Всегда проверяй результат.</div>
          <div><strong className="text-rose-400">DEFINITION OF DONE:</strong> Проблема • Хранилище • AI • UI/UX • Мобильный • Опубликован</div>
        </div>

        {/* Mini Dictionary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-4 font-bold">Слово</th>
                <th className="py-2 font-bold">Что значит</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 pr-4 font-bold text-cyan-400">AI-агент</td>
                <td className="py-2">ИИ, который сам планирует и выполняет шаги для достижения цели</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-cyan-400">Google Opal</td>
                <td className="py-2">Бесплатный no-code инструмент Google для создания ИИ-мини-приложений</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-cyan-400">MCP</td>
                <td className="py-2">Стандартный «переходник», через который агент подключается к инструментам и базам</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-cyan-400">Workflow</td>
                <td className="py-2">Последовательность автоматических шагов, выполняемых агентом</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-bold text-cyan-400">Definition of Done</td>
                <td className="py-2">Чёткий список требований завершённости программного продукта</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* NEXT MISSION TEASER: MISSION 21 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 space-y-3 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-wider">
          <ArrowRight className="w-4 h-4" />
          <span>Следующая Миссия • Новый Блок!</span>
        </div>
        <h3 className="text-lg sm:text-xl font-black text-white">
          🔮 МИССИЯ 21: QA ENGINEER — Test cases, Bugs, Regression
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Поздравляем: ты завершил ВСЕ 5 проектов курса (AI Helper, AI Video, Website, WOW Website, My Life App)! Впереди финальный блок: <strong>PORTFOLIO & DEMO DAY</strong>. На следующем уроке мы станем профессиональными тестировщиками (QA), чтобы вычистить баги перед большой защитой перед миром! 🚀
        </p>
      </div>

      {/* INLINE HOMEWORK SUBMISSION */}
      <InlineHomeworkSubmission
        lessonId={20}
        homeworkTitle="Project Card #05 & Финал My Life App"
      />
    </div>
  );
};
