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
  Globe,
  Share2,
  Terminal
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson23HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main Homework Checklist: «Production Live URL & Social Share Card»
  const [hwStep1, setHwStep1] = useState(false);
  const [hwStep2, setHwStep2] = useState(false);
  const [hwStep3, setHwStep3] = useState(false);
  const [hwHostingPlatform, setHwHostingPlatform] = useState('');
  const [hwRewardClaimed, setHwRewardClaimed] = useState(false);

  // Extra Quests (+20 EXP each)
  const [questSecretVault, setQuestSecretVault] = useState(false);
  const [questTelegramShare, setQuestTelegramShare] = useState(false);

  // AI Diary Inputs
  const [diarySecurityInsight, setDiarySecurityInsight] = useState('');
  const [diaryReleaseFeeling, setDiaryReleaseFeeling] = useState('');
  const [diarySubmitted, setDiarySubmitted] = useState(false);

  // Submission Form State
  const [submissionLink, setSubmissionLink] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cheat Sheet Copy
  const [cheatSheetCopied, setCheatSheetCopied] = useState(false);

  const cheatSheetText = `ПУТЬ:  🖥️ Компьютер → Build → Test → Backend Proxy (.env) → Vercel / Cloud Run → 🌍 Live HTTPS
СЕКРЕТЫ:  Никаких ключей в браузере! Только process.env на сервере.
.ENV МАТРЕШКА:  .env.local (свои пароли) · .env.example (документация) · Hosting Secrets (в облаке)
OPEN GRAPH:  og:title · og:description · og:image формируют визитку в Telegram
GENERATE ≠ FINISHED:  Проверяй сайт в режиме Инкогнито на смартфоне!
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
      addReward(50, '🚀 Домашнее задание: Production Live URL & Social Share Card выполнено! (+50 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleToggleQuest = (quest: 'vault' | 'telegram') => {
    if (quest === 'vault') {
      const next = !questSecretVault;
      setQuestSecretVault(next);
      if (next) {
        addReward(20, '🔐 Квест «Secret Vault Master»: .env.example настроен в репозитории! (+20 ОП)');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    } else {
      const next = !questTelegramShare;
      setQuestTelegramShare(next);
      if (next) {
        addReward(20, '📱 Квест «Telegram Share Master»: Ссылка с превью отправлена близким! (+20 ОП)');
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }
    }
  };

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diarySecurityInsight.trim() || !diaryReleaseFeeling.trim()) return;
    setDiarySubmitted(true);
    addReward(20, '📓 Запись в Дневник ИИ сохранена! (+20 ОП)');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleSubmitFinalHw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionLink.trim()) return;
    setIsSubmitted(true);
    addReward(50, '🎉 Домашняя работа #23 отправлена на проверку ментору! (+50 ОП)');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[11px] font-bold">
                  ДОМАШНЕЕ ЗАДАНИЕ #23
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[11px] font-bold">
                  Выпускной релиз
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Релиз: «Production Live URL & Social Share Card»
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-mono text-sm font-bold w-fit">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Награда: +50 ОП</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Опубликуйте свое веб-приложение в глобальном интернете, настройте безопасные переменные окружения, пропишите теги Open Graph и подготовьтесь к генеральной репетиции перед <strong>Demo Day (Урок 24)</strong>!
        </p>
      </div>

      {/* MAIN HOMEWORK 3-STEP CHECKLIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <span>Основная миссия: 3 шага к публичному релизу</span>
            </h3>
            <p className="text-xs text-slate-400">
              Отметьте каждый выполненный этап релиза (+50 ОП)
            </p>
          </div>
          {hwRewardClaimed && (
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              МИССИЯ ВЫПОЛНЕНА (+50 ОП)
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div
            onClick={() => handleToggleHwStep(1)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              hwStep1
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 ${
                hwStep1
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              {hwStep1 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-1">
              <div className={`text-sm font-bold ${hwStep1 ? 'text-cyan-200' : 'text-white'}`}>
                1. Деплой на облачную платформу (Vercel, Cloud Run или VPS)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Сайт доступен по постоянному публичному адресу и открывается через защищенное HTTPS-соединение (зеленый замок).
              </p>
            </div>
          </div>

          <div
            onClick={() => handleToggleHwStep(2)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              hwStep2
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 ${
                hwStep2
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              {hwStep2 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-1">
              <div className={`text-sm font-bold ${hwStep2 ? 'text-cyan-200' : 'text-white'}`}>
                2. Защита секретов и переменные окружения в панели хостинга
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ключ GEMINI_API_KEY добавлен в раздел Environment Variables хостинга, а не вшит в клиентские файлы React.
              </p>
            </div>
          </div>

          <div
            onClick={() => handleToggleHwStep(3)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              hwStep3
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 ${
                hwStep3
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                  : 'border-slate-700 bg-slate-900'
              }`}
            >
              {hwStep3 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-1">
              <div className={`text-sm font-bold ${hwStep3 ? 'text-cyan-200' : 'text-white'}`}>
                3. Карточка Open Graph проверена в Telegram / WhatsApp
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                При отправке ссылки появляется заголовок, описание и баннер проекта вместо сухой строки текста.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <label className="block text-xs font-mono text-slate-400">
            Какую платформу хостинга вы использовали для деплоя?
          </label>
          <input
            type="text"
            value={hwHostingPlatform}
            onChange={e => setHwHostingPlatform(e.target.value)}
            placeholder="Например: Vercel Serverless + Express Proxy / Ubuntu VPS на PM2"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* EXTRA SIDE-QUESTS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Дополнительные Сайд-Квесты (+20 ОП каждый)
            </h3>
            <p className="text-xs text-slate-400">
              Повысьте академический рейтинг и статус своего проекта
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* QUEST 1 */}
          <div
            onClick={() => handleToggleQuest('vault')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              questSecretVault
                ? 'bg-purple-950/40 border-purple-500/60 text-purple-200 shadow-md'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-purple-400 flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> Квест #1: Secret Vault Master
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-[10px] font-mono text-purple-300">
                +20 ОП
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">Файл .env.example в репозитории</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Создайте шаблон <code>.env.example</code> с перечнем всех настроек (без секретов) и добавьте инструкцию по запуску в <code>README.md</code>.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold pt-1">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  questSecretVault
                    ? 'bg-purple-500 border-purple-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {questSecretVault && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{questSecretVault ? 'Квест выполнен!' : 'Отметить выполнение'}</span>
            </div>
          </div>

          {/* QUEST 2 */}
          <div
            onClick={() => handleToggleQuest('telegram')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              questTelegramShare
                ? 'bg-purple-950/40 border-purple-500/60 text-purple-200 shadow-md'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-purple-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Квест #2: Telegram Share Master
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-[10px] font-mono text-purple-300">
                +20 ОП
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">Первый семейный шеринг</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Отправьте живую ссылку родителям или в учебный чат группы. Убедитесь, что превью загрузилось с вашим заголовком и картинкой.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold pt-1">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  questTelegramShare
                    ? 'bg-purple-500 border-purple-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {questTelegramShare && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{questTelegramShare ? 'Квест выполнен!' : 'Отметить выполнение'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI DIARY REFLECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Запись в Личный AI Дневник (+20 ОП)
            </h3>
            <p className="text-xs text-slate-400">
              Осмысление инженерного опыта релиза в глобальный веб
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveDiary} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              1. Что самое главное вы вынесли о безопасности API-ключей и работе браузера?
            </label>
            <textarea
              rows={2}
              required
              value={diarySecurityInsight}
              onChange={e => setDiarySecurityInsight(e.target.value)}
              placeholder="Раньше казалось, что если переменная в коде не отображается на экране, её никто не видит. Теперь я знаю, что DevTools Network видит всё..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              2. Каково это — осознавать, что созданный вами продукт прямо сейчас доступен любому человеку на Земле?
            </label>
            <textarea
              rows={2}
              required
              value={diaryReleaseFeeling}
              onChange={e => setDiaryReleaseFeeling(e.target.value)}
              placeholder="Невероятное ощущение: я открыл ссылку на телефоне без компьютера, и приложение работало идеально..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={diarySubmitted}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                diarySubmitted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              }`}
            >
              {diarySubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Запись сохранена в дневнике (+20 ОП)</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Сохранить рефлексию в дневник (+20 ОП)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* QUICK CHEAT SHEET BLOCK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Шпаргалка Миссии 23 (Production Rules)</span>
          </h4>
          <button
            onClick={handleCopyCheatSheet}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            {cheatSheetCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{cheatSheetCopied ? 'Скопировано!' : 'Копировать'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {cheatSheetText}
        </pre>
      </div>

      {/* ANNOUNCEMENT OF LESSON 24: DEMO DAY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/70 to-slate-900 border border-indigo-500/30 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" /> Анонс Финального Урока курса!
        </div>
        <h4 className="text-lg sm:text-xl font-black text-white">
          Урок 24: Demo Day, 3-минутный Питч и Международная Сертификация
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Впереди кульминация 12 недель! Вы представите свой Capstone-проект жюри и менторам, сдадите комплексный финальный экзамен и получите именной сертификат <strong>AI for LIFE Master</strong> с уникальным QR-кодом верификации в реестре.
        </p>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ В ПОРТАЛЕ                  */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineHomeworkSubmission
          lessonId={23}
          taskTitle="Домашнее задание №23: Релиз «Production Live URL & Social Share Card»"
          rewardExp={50}
        />
      </div>
    </div>
  );
};
