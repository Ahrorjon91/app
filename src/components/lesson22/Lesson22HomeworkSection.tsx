import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  CheckCircle2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Award,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Send,
  Lock,
  GitBranch,
  Wrench,
  Search,
  Monitor,
  Star,
  Layers,
  ArrowRight,
  Globe
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson22HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main Homework Checklist: «Deploy an Update»
  const [hwStep1, setHwStep1] = useState(false);
  const [hwStep2, setHwStep2] = useState(false);
  const [hwStep3, setHwStep3] = useState(false);
  const [hwProjectChangeDesc, setHwProjectChangeDesc] = useState('');
  const [hwRewardClaimed, setHwRewardClaimed] = useState(false);

  // Extra Quests
  const [questSecurityTeacher, setQuestSecurityTeacher] = useState(false);
  const [questActionsExplorer, setQuestActionsExplorer] = useState(false);

  // AI Diary Inputs
  const [diaryTestVsLive, setDiaryTestVsLive] = useState('');
  const [diaryAuditFinding, setDiaryAuditFinding] = useState('');
  const [diarySubmitted, setDiarySubmitted] = useState(false);

  // Submission Form State
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cheat Sheet Copy
  const [cheatSheetCopied, setCheatSheetCopied] = useState(false);

  const cheatSheetText = `ПУТЬ:  🖥️ Компьютер → Build → Test → Deploy → 🌍 Интернет
ОКРУЖЕНИЯ:  🧪 Test (можно ломать) · 🌍 Live (видят все, нельзя ломать)
СЕКРЕТЫ:  Никогда в коде! Используй Environment Variables (.env)
CI/CD:  Изменил код → робот сам собирает, тестирует, публикует
✅ = всё хорошо   |   ❌ = остановись и исправь
SECURITY CHECKLIST:  Нет секретов · Нет личных данных · Ссылка работает
GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheatSheet = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCheatSheetCopied(true);
    setTimeout(() => setCheatSheetCopied(false), 2000);
  };

  const handleToggleHwStep = (stepNumber: 1 | 2 | 3) => {
    let s1 = hwStep1;
    let s2 = hwStep2;
    let s3 = hwStep3;

    if (stepNumber === 1) s1 = !s1;
    if (stepNumber === 2) s2 = !s2;
    if (stepNumber === 3) s3 = !s3;

    setHwStep1(s1);
    setHwStep2(s2);
    setHwStep3(s3);

    if (s1 && s2 && s3 && !hwRewardClaimed) {
      setHwRewardClaimed(true);
      addReward(50, '🚀 Домашнее задание: Полный цикл Deploy an Update пройден! (+50 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleToggleQuest = (quest: 'teacher' | 'explorer') => {
    if (quest === 'teacher') {
      const next = !questSecurityTeacher;
      setQuestSecurityTeacher(next);
      if (next) {
        addReward(20, '🔐 Квест «Security Teacher»: Знания о безопасности переданы близким! (+20 ОП)');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    } else {
      const next = !questActionsExplorer;
      setQuestActionsExplorer(next);
      if (next) {
        addReward(20, '🤖 Квест «GitHub Actions Explorer»: Шаблоны автоматизации изучены! (+20 ОП)');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    }
  };

  const handleSubmitDiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryTestVsLive.trim()) return;
    setDiarySubmitted(true);
    addReward(25, '📔 Дневник ИИ DevOps-инженера заполнен! (+25 ОП)');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  const handleFinalHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addReward(50, '🎉 Домашняя работа Миссии 22 официально отправлена наставнику! (+50 ОП)');
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-10 text-slate-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              РАЗДЕЛ 4 • САМОСТОЯТЕЛЬНЫЙ ДЕПЛОЙ • СРОК: ДО СЛЕДУЮЩЕЙ МИССИИ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Rocket className="w-7 h-7 text-cyan-400" />
              <span>Домашнее задание: «Deploy an Update»</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
            НАГРАДА: ДО +165 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-4xl">
          Сделай одно небольшое улучшение (текст, цвет, иконка, валидация) в любом из своих 5 проектов, пройдя полный цикл профессионального DevOps-инженера: 
          <strong> Ветка Test → Проверка безопасности → Слияние в Live → Проверка рабочей ссылки</strong>.
        </p>
      </div>

      {/* ============================================================== */}
      {/* 🎮 ОСНОВНОЕ ЗАДАНИЕ: «DEPLOY AN UPDATE»                         */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">ОСНОВНОЙ КВЕСТ • ~25 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Пройди полный путь обновления проекта</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            +50 ОП
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Какое улучшение или фикс ты внес(ла)? (кратко опиши):
            </label>
            <input
              type="text"
              placeholder="Например: добавил анимацию кнопки в Project #4 и спрятал API-ключ в .env"
              value={hwProjectChangeDesc}
              onChange={(e) => setHwProjectChangeDesc(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleToggleHwStep(1)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                hwStep1
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs">ШАГ 1: TEST-ОКРУЖЕНИЕ</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    hwStep1 ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                  }`}
                >
                  {hwStep1 && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Создал(а) тестовую ветку и проверил(а) правку перед публичным показом
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleHwStep(2)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                hwStep2
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs">ШАГ 2: LIVE ДЕПЛОЙ</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    hwStep2 ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                  }`}
                >
                  {hwStep2 && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Опубликовал(а) финальную стабильную версию в ветку main / на хостинг
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleToggleHwStep(3)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                hwStep3
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs">ШАГ 3: ССЫЛКА РАБОТАЕТ</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    hwStep3 ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                  }`}
                >
                  {hwStep3 && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Открыл(а) боевую ссылку в режиме инкогнито или на смартфоне — всё работает!
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ⭐ ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ                                       */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          <span>⭐ Дополнительные квесты (+40 ОП)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => handleToggleQuest('teacher')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              questSecurityTeacher
                ? 'bg-amber-950/20 border-amber-500/50 text-amber-200'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>🔐 Security Teacher (+20 ОП)</span>
              </span>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  questSecurityTeacher ? 'bg-amber-500 border-amber-400' : 'border-slate-600'
                }`}
              >
                {questSecurityTeacher && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Объясни родителям или друзьям, почему пароли и API-ключи никогда нельзя писать прямо в коде, и как работает виртуальный "сейф".
            </p>
          </div>

          <div
            onClick={() => handleToggleQuest('explorer')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              questActionsExplorer
                ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-200'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>🤖 GitHub Actions Explorer (+20 ОП)</span>
              </span>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  questActionsExplorer ? 'bg-cyan-500 border-cyan-400' : 'border-slate-600'
                }`}
              >
                {questActionsExplorer && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Найди в интернете или в документации GitHub еще один пример простого готового шаблона автоматизации (например, запуск тестов при каждом пуше).
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📔 ДНЕВНИК ИИ DEVOPS-ИНЖЕНЕРА                                 */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>📔 Записи в Дневник ИИ</span>
          </h3>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
            РЕФЛЕКСИЯ (+25 ОП)
          </span>
        </div>

        <form onSubmit={handleSubmitDiary} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              1. Что я понял(а) про фундаментальную разницу Test- и Live-окружения?
            </label>
            <input
              type="text"
              required
              placeholder="Например: В Test можно смело ломать и экспериментировать, а в Live пользователи ждут безупречной работы."
              value={diaryTestVsLive}
              onChange={(e) => setDiaryTestVsLive(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              2. Самая важная находка во время Security Audit моих 5 проектов:
            </label>
            <input
              type="text"
              required
              placeholder="Например: Вовремя нашел в чат-боте открытый ключ и перенес его в process.env."
              value={diaryAuditFinding}
              onChange={(e) => setDiaryAuditFinding(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{diarySubmitted ? 'Запись в Дневник сохранена!' : 'Сохранить запись в Дневник (+25 ОП)'}</span>
          </button>
        </form>
      </div>

      {/* ============================================================== */}
      {/* 📄 ШПАРГАЛКА — НА ОДИН ЭКРАН                                   */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Copy className="w-5 h-5 text-cyan-400" />
            <span>📄 Шпаргалка — на один экран</span>
          </h3>

          <button
            type="button"
            onClick={handleCopyCheatSheet}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-1.5 cursor-pointer"
          >
            {cheatSheetCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{cheatSheetCopied ? 'Скопировано!' : 'Копировать'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
          {cheatSheetText}
        </pre>
      </div>

      {/* ============================================================== */}
      {/* 🔮 СЛЕДУЮЩАЯ МИССИЯ: АНОНС PORTFOLIO                          */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950 border border-purple-500/40 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4" />
          <span>СЛЕДУЮЩАЯ МИССИЯ • ФИНАЛЬНЫЙ СПРИНТ</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          МИССИЯ 23 — PORTFOLIO (ТВОЙ ЦИФРОВОЙ ШЕДЕВР) 🎨
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Технические миссии полностью завершены! Все твои 5 проектов проверены на баги и очищены от уязвимостей. 
          В Миссии 23 мы упакуем их в убойное портфолио с интерактивными кейсами, README-файлами и презентацией для Demo Day!
        </p>

        <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-800/80 text-xs text-purple-200 italic">
          💭 <strong>Подумай заранее:</strong> как бы ты хотел(а) представить себя как "AI Creator" в одном самом сильном предложении?
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ В ПОРТАЛЕ                  */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineHomeworkSubmission
          lessonId={22}
          taskTitle="Домашнее задание №22: Автоматизация безопасности CI/CD и Git-Secrets"
          rewardExp={50}
        />
      </div>
    </div>
  );
};
