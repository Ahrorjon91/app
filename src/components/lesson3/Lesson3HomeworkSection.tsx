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
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson3HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // State for Tutor Report
  const [tutorName, setTutorName] = useState('Устод Баходур (Математика)');
  const [questionsTested, setQuestionsTested] = useState(
    '1. Учебник алгебры 7 класс: сложение дробей 5/6 + 7/12.\n2. Задача на проценты: на сколько подешевела дыня.\n3. Геометрия: периметр прямоугольника.'
  );
  const [bugsFound, setBugsFound] = useState(
    '1. При третьей ошибке тьютор назвал ответ «17/12» сам.\n2. На вопрос «что задали?» ответил длинным списком из интернета.'
  );
  const [v3RulesAdded, setV3RulesAdded] = useState(
    '1. ❌ «Ни при каких обстоятельствах не пиши числовой ответ, пока ученик не подтвердит свой вариант».\n2. ✅ «Если ученик устал — предложи сделать 2-минутную паузу и сделать гимнастику для глаз».'
  );
  const [journalNotes, setJournalNotes] = useState(
    'Мой тьютор: Устод Баходур (v3)\nСамый интересный баг: Модель перешла на стихи про дыню, когда я спросил про проценты.\nСамое сильное правило: Ограничение «максимум 4 предложения и один вопрос».'
  );

  const [saved, setSaved] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // LocalStorage sync
  useEffect(() => {
    const savedData = localStorage.getItem('ai_homework_lesson_3');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.tutorName) setTutorName(parsed.tutorName);
        if (parsed.questionsTested) setQuestionsTested(parsed.questionsTested);
        if (parsed.bugsFound) setBugsFound(parsed.bugsFound);
        if (parsed.v3RulesAdded) setV3RulesAdded(parsed.v3RulesAdded);
        if (parsed.journalNotes) setJournalNotes(parsed.journalNotes);
      } catch (e) {
        console.error('Error loading Lesson 3 homework', e);
      }
    }
  }, []);

  const handleSaveLocal = () => {
    localStorage.setItem(
      'ai_homework_lesson_3',
      JSON.stringify({ tutorName, questionsTested, bugsFound, v3RulesAdded, journalNotes })
    );
    setSaved(true);
    addReward(25, '💾 Отчёт по тьютору сохранён в браузере! (+25 Опыта)');
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyAll = () => {
    const fullText = `=== ДОМАШНЕЕ ЗАДАНИЕ: MISSION 03 (AI TUTOR & PROMPT 2.0) ===

ТЬЮТОР: ${tutorName}

1. 3 РЕАЛЬНЫХ ВОПРОСА ИЗ УЧЕБНИКА:
${questionsTested}

2. НАЙДЕННЫЕ БАГИ И УТЕЧКИ:
${bugsFound}

3. НОВЫЕ ПРАВИЛА В ВЕРСИИ v3:
${v3RulesAdded}

4. ЗАПИСЬ В AI JOURNAL:
${journalNotes}`;

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
            <Bookmark className="w-3.5 h-3.5" /> Side Quest • Mission 03
          </span>
          <span className="text-xs text-slate-400 font-mono">Награда: до +150 XP</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Side Quest: «Improve My Tutor» & Релиз v3
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Протестируй своего тьютора на настоящих задачах из школьного учебника, найди ещё 2 скрытых бага, выпусти релиз v3 и заполни инженерный отчёт Tutor Report!
        </p>
      </div>

      {/* ТАБЛИЦА СДАЧИ ОТЧЁТА */}
      <div className="space-y-4">
        {/* Имя тьютора */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-2">
          <label className="text-xs font-bold text-cyan-300 uppercase font-mono">
            1. Имя твоего тьютора и предмет
          </label>
          <input
            type="text"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* 3 вопроса из учебника */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-blue-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-300 uppercase font-mono">
              2. Три реальных вопроса из школьного учебника (+20 XP)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Математика, физика, английский</span>
          </div>
          <textarea
            rows={3}
            value={questionsTested}
            onChange={(e) => setQuestionsTested(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Найденные баги */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-300 uppercase font-mono flex items-center gap-1.5">
              <Bug className="w-3.5 h-3.5" /> 3. Найденные баги и слабые места (+20 XP)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Где модель выдала готовый ответ?</span>
          </div>
          <textarea
            rows={3}
            value={bugsFound}
            onChange={(e) => setBugsFound(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Новые правила v3 */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 4. Добавленные правила в релизе v3 (+20 XP)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Правила 3/3 (✅ и ❌)</span>
          </div>
          <textarea
            rows={3}
            value={v3RulesAdded}
            onChange={(e) => setV3RulesAdded(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* AI Journal */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase font-mono">
              5. Запись в личный AI Journal
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Самый интересный инсайт</span>
          </div>
          <textarea
            rows={3}
            value={journalNotes}
            onChange={(e) => setJournalNotes(e.target.value)}
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
          <span>{copiedAll ? 'Скопировано!' : 'Скопировать весь отчёт'}</span>
        </button>
      </div>

      {/* АНОНС СЛЕДУЮЩЕЙ МИССИИ */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-800/40 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Rocket className="w-4 h-4" /> Впереди: MISSION 04 — AI FOR LIFE
        </div>
        <h4 className="text-base font-black text-white">
          Problem → Solution → MVP: Создай своего первого AI-помощника
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          «Ты создал тьютора для школьных предметов. В следующей миссии AI выйдет в реальную жизнь: мы начнём Project #1: My AI Life Helper — инструмент для решения настоящих бытовых, учебных или творческих задач!»
        </p>
      </div>

      {/* ВСТРОЕННАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ */}
      <InlineHomeworkSubmission
        lessonNumber={3}
        defaultTitle="Side Quest: «Improve My Tutor» & Релиз v3"
      />
    </div>
  );
};
