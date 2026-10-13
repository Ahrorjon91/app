import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Send,
  Award,
  Sparkles,
  Rocket,
  CheckCircle2,
  Bookmark,
  Check,
  Zap,
  BookOpen,
  Bug,
  ShieldCheck,
  Palette,
  Users,
  RefreshCw
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson4HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // State for Project Card #01
  const [projName, setProjName] = useState('Homework Buddy (v2)');
  const [projProblem, setProjProblem] = useState(
    'Постоянно забываю расписание домашних заданий и начинаю делать уроки слишком поздно вечером.'
  );
  const [projSolution, setProjSolution] = useState(
    'Каждый вечер в 19:00 бот задаёт 1 короткий вопрос, составляет чек-лист из 3 уроков и не даёт отвлекаться.'
  );
  const [projTools, setProjTools] = useState('ChatGPT 4o + Google Gemini 1.5 Flash');
  const [projBuilt, setProjBuilt] = useState(
    'Рабочий прототип Запроса 2.0 с жесткими правилами ✅/❌: максимум 3 предложения, дружелюбный тон, обязательный вопрос в конце.'
  );
  const [projDialogue, setProjDialogue] = useState(
    'Я: «Я сегодня сильно устал»\nБот: «Понимаю тебя отлично! Давай сделаем всего 1 задачу по алгебре на 5 минут, а остальное оставим на утро. Согласен?»'
  );
  const [projLearned, setProjLearned] = useState(
    'Главный инсайт: МРП не должен решать 10 задач сразу. Чем уже фокус, тем полезнее продукт!'
  );
  const [projImprove, setProjImprove] = useState(
    'В релизе v3 подключу Telegram-бота и голосовые сообщения с напоминанием.'
  );

  // Extra Quests
  const [familyTestDone, setFamilyTestDone] = useState(false);
  const [familyFeedback, setFamilyFeedback] = useState(
    'Показал маме и брату: маме понравился вежливый тон, а брат попросил добавить таймер отдыха.'
  );
  const [v3Done, setV3Done] = useState(false);
  const [v3Rule, setV3Rule] = useState('Добавлено правило: напоминать выпить стакан воды перед домашкой.');

  const [saved, setSaved] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // LocalStorage sync
  useEffect(() => {
    const savedData = localStorage.getItem('ai_homework_lesson_4');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.projName) setProjName(parsed.projName);
        if (parsed.projProblem) setProjProblem(parsed.projProblem);
        if (parsed.projSolution) setProjSolution(parsed.projSolution);
        if (parsed.projTools) setProjTools(parsed.projTools);
        if (parsed.projBuilt) setProjBuilt(parsed.projBuilt);
        if (parsed.projDialogue) setProjDialogue(parsed.projDialogue);
        if (parsed.projLearned) setProjLearned(parsed.projLearned);
        if (parsed.projImprove) setProjImprove(parsed.projImprove);
        if (parsed.familyFeedback) setFamilyFeedback(parsed.familyFeedback);
        if (parsed.familyTestDone) setFamilyTestDone(parsed.familyTestDone);
        if (parsed.v3Rule) setV3Rule(parsed.v3Rule);
        if (parsed.v3Done) setV3Done(parsed.v3Done);
      } catch (e) {
        console.error('Error loading Lesson 4 homework', e);
      }
    }
  }, []);

  const handleSaveLocal = () => {
    localStorage.setItem(
      'ai_homework_lesson_4',
      JSON.stringify({
        projName,
        projProblem,
        projSolution,
        projTools,
        projBuilt,
        projDialogue,
        projLearned,
        projImprove,
        familyFeedback,
        familyTestDone,
        v3Rule,
        v3Done
      })
    );
    setSaved(true);
    addReward(25, '💾 Карточка Проекта №1 сохранена в браузере! (+25 Опыта)');
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyAll = () => {
    const fullText = `=== КАРТОЧКА ПРОЕКТА №01: МОЙ ЛИЧНЫЙ ИИ-ПОМОЩНИК ===

НАЗВАНИЕ:
${projName}

ПРОБЛЕМА:
${projProblem}

РЕШЕНИЕ:
${projSolution}

ИНСТРУМЕНТЫ:
${projTools}

ЧТО Я ПОСТРОИЛ (МРП):
${projBuilt}

ЛУЧШИЙ ДИАЛОГ С ИИ:
${projDialogue}

ЧТО Я УЗНАЛ:
${projLearned}

ЧТО БЫ УЛУЧШИЛ:
${projImprove}

ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ:
- Тест семьи: ${familyTestDone ? `Да (+25 XP). Отзыв: ${familyFeedback}` : 'Не пройден'}
- Релиз v3: ${v3Done ? `Да (+25 XP). Новое правило: ${v3Rule}` : 'Не пройден'}`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    addReward(15, '📋 Текст карточки скопирован для GitHub! (+15 Опыта)');
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> Side Quest • Mission 04
          </span>
          <span className="text-xs text-slate-400 font-mono">Награда: до +125 XP • Проект в портфолио</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Side Quest: «Карточка Проекта №01» для твоего портфолио
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Заполни паспорт своего первого цифрового продукта. Он пригодится тебе при публикации на GitHub, в резюме и при защите финального диплома курса!
        </p>
      </div>

      {/* ФОРМА КАРТОЧКИ ПРОЕКТА */}
      <div className="space-y-4">
        {/* Название */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-2">
          <label className="text-xs font-bold text-cyan-300 uppercase font-mono">
            1. Название проекта и версия
          </label>
          <input
            type="text"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Проблема */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-2">
          <label className="text-xs font-bold text-rose-300 uppercase font-mono">
            2. Какую настоящую проблему решает (Боль пользователя)
          </label>
          <textarea
            rows={2}
            value={projProblem}
            onChange={(e) => setProjProblem(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-rose-400"
          />
        </div>

        {/* Решение */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-2">
          <label className="text-xs font-bold text-emerald-300 uppercase font-mono">
            3. Решение (1-2 понятных предложения)
          </label>
          <textarea
            rows={2}
            value={projSolution}
            onChange={(e) => setProjSolution(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Инструменты и Стек */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-2">
          <label className="text-xs font-bold text-purple-300 uppercase font-mono">
            4. Использованные инструменты (ChatGPT, Gemini, NotebookLM и др.)
          </label>
          <input
            type="text"
            value={projTools}
            onChange={(e) => setProjTools(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-200 focus:outline-none focus:border-purple-400"
          />
        </div>

        {/* Что я построил (МРП) */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/50 space-y-2">
          <label className="text-xs font-bold text-blue-300 uppercase font-mono">
            5. Что именно ты построил (Архитектура МРП, Запрос 2.0, правила)
          </label>
          <textarea
            rows={3}
            value={projBuilt}
            onChange={(e) => setProjBuilt(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Лучший диалог */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2">
          <label className="text-xs font-bold text-amber-300 uppercase font-mono">
            6. Твой лучший диалог с ИИ (скриншот или цитата)
          </label>
          <textarea
            rows={3}
            value={projDialogue}
            onChange={(e) => setProjDialogue(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Что я узнал & Что бы улучшил */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase font-mono">
              7. Главный инсайт миссии:
            </label>
            <textarea
              rows={3}
              value={projLearned}
              onChange={(e) => setProjLearned(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase font-mono">
              8. Что планируешь добавить в будущем:
            </label>
            <textarea
              rows={3}
              value={projImprove}
              onChange={(e) => setProjImprove(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-black text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Дополнительные квесты (+50 XP)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Квест 1: Тест семьи */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                👨‍👩‍👧 Тест семьи (+25 XP)
              </span>
              <label className="flex items-center gap-1.5 text-xs text-cyan-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={familyTestDone}
                  onChange={() => {
                    setFamilyTestDone(!familyTestDone);
                    addReward(25, '👨‍👩‍👧 Тест семьи пройден! (+25 Опыта)');
                  }}
                  className="rounded border-slate-700 text-cyan-500"
                />
                <span>Выполнено</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Дай родителям, брату или сестре протестировать твоего помощника 5 минут. Что они сказали?
            </p>
            <textarea
              rows={2}
              value={familyFeedback}
              onChange={(e) => setFamilyFeedback(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Квест 2: Версия 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                🔁 Релиз v3 (+25 XP)
              </span>
              <label className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={v3Done}
                  onChange={() => {
                    setV3Done(!v3Done);
                    addReward(25, '🔁 Релиз v3 запущен! (+25 Опыта)');
                  }}
                  className="rounded border-slate-700 text-emerald-500"
                />
                <span>Выполнено</span>
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Добавь ещё одно правило или аналогию в версию v3 и запиши, что изменилось:
            </p>
            <textarea
              rows={2}
              value={v3Rule}
              onChange={(e) => setV3Rule(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* КНОПКИ ДЕЙСТВИЙ */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSaveLocal}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
        >
          {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          <span>{saved ? 'Сохранено!' : 'Сохранить карточку'}</span>
        </button>

        <button
          onClick={handleCopyAll}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'Скопировано!' : 'Скопировать весь отчёт'}</span>
        </button>
      </div>

      {/* 🔮 АНОНС СЛЕДУЮЩЕЙ МИССИИ */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-800/40 space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <Palette className="w-4 h-4" /> Впереди: МИССИЯ 05 — ИИ-ХУДОЖНИК
        </div>
        <h4 className="text-base font-black text-white">
          От слов — к изображению: Создай визуальный Город Будущего
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          «У тебя уже есть первый цифровой продукт. А что, если превратить слова в шедевр цифровой живописи? В следующей миссии ты освоишь визуальные нейросети (Midjourney, Stable Diffusion, Whisk) и создашь свой фантастический Город Будущего!»
        </p>
      </div>

      {/* ВСТРОЕННАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ */}
      <InlineHomeworkSubmission
        lessonNumber={4}
        defaultTitle="Проект №1: Карточка продукта «Мой личный ИИ-помощник»"
      />
    </div>
  );
};
