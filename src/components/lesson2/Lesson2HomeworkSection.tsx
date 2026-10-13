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
  BookOpen
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson2HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 3 боевых Boss Prompts
  const [prompt1, setPrompt1] = useState(
    `[РОЛЬ]: Ты — ведущий методист и тьютор по точным наукам.\n[ЗАДАЧА]: Составь пошаговое объяснение логарифмов для школьника 10 класса.\n[КОНТЕКСТ]: Ученик готовится к поступлению в политехнический институт, любит компьютеры.\n[ФОРМАТ]: 3 пункта с жизненной аналогией + 1 проверочная задача.\n[ОГРАНИЧЕНИЯ]: Без готового ответа, до 150 слов.`
  );
  const [prompt2, setPrompt2] = useState(
    `[РОЛЬ]: Ты — SMM-маркетолог ремесленной пекарни в Худжанде у базара Панджшанбе.\n[ЗАДАЧА]: Напиши вовлекающий утренний пост для Instagram о горячих лепёшках и самбусе.\n[КОНТЕКСТ]: Цены строго в сомони (TJS), местный колорит, тёплый дружелюбный тон.\n[ФОРМАТ]: Заголовок, 3 вкусных описания с ценами, призыв к заказу.\n[ОГРАНИЧЕНИЯ]: До 120 слов. Без штампов «окунитесь в мир вкуса».`
  );
  const [prompt3, setPrompt3] = useState(
    `[РОЛЬ]: Ты — старший QA-инженер и тестировщик мобильных приложений.\n[ЗАДАЧА]: Составь чек-лист из 5 тест-кейсов для проверки экрана входа в приложение.\n[КОНТЕКСТ]: Приложение онлайн-банкинга в Таджикистане (вход по номеру телефона и SMS).\n[ФОРМАТ]: Markdown таблица: Номер | Тест-кейс | Входные данные | Ожидаемый результат.\n[ОГРАНИЧЕНИЯ]: Без лишней теории, только конкретные проверки безопасности.`
  );
  const [libraryNotes, setLibraryNotes] = useState(
    'Создал личную папку в Google Docs / Notion «Prompt Library». Добавил теги: #SMM, #Education, #Code. Протестировал каждый промпт в ChatGPT и Claude 3.5 Sonnet.'
  );

  const [saved, setSaved] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const savedData = localStorage.getItem('ai_homework_lesson_2');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.prompt1) setPrompt1(parsed.prompt1);
        if (parsed.prompt2) setPrompt2(parsed.prompt2);
        if (parsed.prompt3) setPrompt3(parsed.prompt3);
        if (parsed.libraryNotes) setLibraryNotes(parsed.libraryNotes);
      } catch (e) {
        console.error('Error loading Lesson 2 homework', e);
      }
    }
  }, []);

  const handleSaveLocal = () => {
    localStorage.setItem(
      'ai_homework_lesson_2',
      JSON.stringify({ prompt1, prompt2, prompt3, libraryNotes })
    );
    setSaved(true);
    addReward(25, '💾 Домашнее задание сохранено в браузере! (+25 Опыта)');
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyAll = () => {
    const fullText = `=== ДОМАШНЕЕ ЗАДАНИЕ: УРОК 2 (PROMPT ENGINEERING 101) ===

1. BOSS PROMPT #1 (ОБУЧЕНИЕ):
${prompt1}

2. BOSS PROMPT #2 (ЛОКАЛЬНЫЙ БИЗНЕС ХУДЖАНДА):
${prompt2}

3. BOSS PROMPT #3 (ПРОФЕССИОНАЛЬНЫЙ ИНСТРУМЕНТ):
${prompt3}

ЗАМЕТКИ О PROMPT LIBRARY:
${libraryNotes}`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    addReward(15, '📋 Текст домашнего задания скопирован! (+15 Опыта)');
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> Домашнее задание • Урок 2
          </span>
          <span className="text-xs text-slate-400 font-mono">Награда: +50 XP за выполнение</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          3 боевых Boss Prompts (5/5) & Личная Prompt Library
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Спроектируй 3 авторских промпта по золотой формуле 5 элементов (Роль, Задача, Контекст, Формат, Ограничения), протестируй в двух нейросетях и организуй собственную библиотеку проверенных запросов!
        </p>
      </div>

      {/* 3 ПОЛЯ ВВОДА PROMPTS */}
      <div className="space-y-4">
        {/* Промпт 1 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300 uppercase font-mono">
              1. Boss Prompt: Образовательный тьютор (5/5)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Школа / Олимпиада / Английский</span>
          </div>
          <textarea
            rows={4}
            value={prompt1}
            onChange={(e) => setPrompt1(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Промпт 2 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 uppercase font-mono">
              2. Boss Prompt: Локальный бизнес Худжанда / Таджикистана (5/5)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Панджшанбе / Сырдарья / TJS</span>
          </div>
          <textarea
            rows={4}
            value={prompt2}
            onChange={(e) => setPrompt2(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Промпт 3 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase font-mono">
              3. Boss Prompt: Профессиональный инструмент (5/5)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">IT / Аналитика / Дизайн / Кодинг</span>
          </div>
          <textarea
            rows={4}
            value={prompt3}
            onChange={(e) => setPrompt3(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Заметки о библиотеке */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase font-mono">
              4. Организация личной Prompt Library
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Где и как ты хранишь свои лучшие запросы</span>
          </div>
          <textarea
            rows={2}
            value={libraryNotes}
            onChange={(e) => setLibraryNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* КНОПКИ ДЕЙСТВИЙ */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSaveLocal}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
        >
          {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          <span>{saved ? 'Сохранено!' : 'Сохранить черновик'}</span>
        </button>

        <button
          onClick={handleCopyAll}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'Скопировано!' : 'Скопировать весь текст'}</span>
        </button>
      </div>

      {/* АНОНС УРОКА 3 */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-800/40 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Rocket className="w-4 h-4" /> Следующая миссия: Урок 3
        </div>
        <h4 className="text-base font-black text-white">
          Mission 03: Multimodal AI — Зрение, Голос и Генерация изображений
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          В следующем уроке мы выйдем за рамки только текста: научимся «кормить» нейросеть фотографиями, анализировать рукописные конспекты, создавать визуальные концепты и управлять генераторами изображений!
        </p>
      </div>

      {/* ВСТРОЕННАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ */}
      <InlineHomeworkSubmission
        lessonNumber={2}
        defaultTitle="Домашнее задание: 3 Boss Prompts и Prompt Library"
      />
    </div>
  );
};
