import React, { useState } from 'react';
import {
  Home,
  Palette,
  Users,
  BookOpen,
  Sparkles,
  Check,
  Send,
  ArrowRight,
  Shield,
  HelpCircle,
  Clock,
  Compass,
  Zap,
  Award
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson9HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main quest state
  const [mainImprovement, setMainImprovement] = useState('');
  const [mainDone, setMainDone] = useState(false);

  const handleCompleteMain = () => {
    if (mainImprovement.trim().length > 5 && !mainDone) {
      setMainDone(true);
      addReward(50, '🏡 Основной квест ДЗ выполнен: Точечное улучшение внесено! (+50 Опыта)');
    }
  };

  // Side quest 1: Palette
  const [palettePrompt, setPalettePrompt] = useState('Поменяй палитру: сделай сайт в неоновых тонах заката над горами Худжанда (акцентный коралловый + глубокий индиго)');
  const [paletteDone, setPaletteDone] = useState(false);

  const handleCompletePalette = () => {
    if (!paletteDone) {
      setPaletteDone(true);
      addReward(25, '🎨 Сайд-квест «Своя палитра» выполнен! (+25 Опыта)');
    }
  };

  // Side quest 2: Family Demo
  const [familyAdvice, setFamilyAdvice] = useState('');
  const [familyDone, setFamilyDone] = useState(false);

  const handleCompleteFamily = () => {
    if (familyAdvice.trim().length > 3 && !familyDone) {
      setFamilyDone(true);
      addReward(25, '👨‍👩‍👧 Сайд-квест «Family Demo» выполнен! Обратная связь получена! (+25 Опыта)');
    }
  };

  // Reflection Journal
  const [journalData, setJournalData] = useState({
    topic: 'Инженер-робототехник и дроны над Сырдарьей',
    unexpected: 'Что можно просто объяснить ИИ на обычном русском языке, и он сразу строит адаптивный сайт с кнопками!',
    nextBuild: 'Интерактивный сайт-портфолио с моими лучшими AI-артами и проектами'
  });
  const [journalDone, setJournalDone] = useState(false);

  const handleSaveJournal = () => {
    if (!journalDone) {
      setJournalDone(true);
      addReward(25, '📔 Запись в AI-Дневнике сохранена! Мысли зафиксированы! (+25 Опыта)');
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Homework Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
          ДОМАШНЯЯ МИССИЯ • 🎁 ДО +125 ОП
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          🏡 Домашнее задание: Полировка сайта, Family Demo и AI-Дневник
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Закрепи навыки вайб-кодинга: внеси ещё одно точечное улучшение, примерь новую палитру и покажи первый сайт родителям на телефоне!
        </p>
      </div>

      {/* MAIN QUEST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-amber-400 font-mono">ОСНОВНОЙ КВЕСТ • 🎁 +50 ОП</span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              ⭐ Основной квест: «Ещё одно точечное улучшение»
            </h3>
          </div>
          <button
            onClick={handleCompleteMain}
            disabled={mainDone || mainImprovement.trim().length < 5}
            className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs transition"
          >
            {mainDone ? '✓ Выполнено (+50 ОП)' : 'Зафиксировать улучшение'}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Придумай и выполни <strong>ОДНО</strong> точечное улучшение через короткий запрос: добавить новую кнопку, вставить цитату, изменить размер заголовка или добавить счетчик:
        </p>

        <textarea
          rows={3}
          value={mainImprovement}
          onChange={e => setMainImprovement(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
          placeholder="Например: «Оставь всё как есть, но добавь в подвал блок с цитатой Стива Джобса о технологиях и сделай шрифт чуть крупнее»..."
        />
      </div>

      {/* SIDE QUESTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Side Quest 1: Custom Palette */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-purple-400 font-mono">САЙД-КВЕСТ 1 • 🎁 +25 ОП</span>
              <Palette className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-white">
              🎨 «Своя палитра»
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Поменяй цветовую гамму страницы через точечный запрос: закатные тона, киберпанк или природный изумруд:
            </p>
            <input
              type="text"
              value={palettePrompt}
              onChange={e => setPalettePrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <button
            onClick={handleCompletePalette}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition"
          >
            {paletteDone ? '✓ Палитра сохранена (+25 ОП)' : 'Засчитать смену палитры'}
          </button>
        </div>

        {/* Side Quest 2: Family Demo */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-black text-emerald-400 font-mono">САЙД-КВЕСТ 2 • 🎁 +25 ОП</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-bold text-sm sm:text-base text-white">
              👨‍👩‍👧 «Family Demo»
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Открой сайт на телефоне, покажи родителям или друзьям и спроси: «Что можно сделать ещё понятнее?» Запиши их совет:
            </p>
            <input
              type="text"
              value={familyAdvice}
              onChange={e => setFamilyAdvice(e.target.value)}
              placeholder="Совет от близких: например, сделать буквы в меню чуть крупнее..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleCompleteFamily}
            disabled={familyAdvice.trim().length < 3}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-black text-xs transition"
          >
            {familyDone ? '✓ Совет записан (+25 ОП)' : 'Зафиксировать семейное демо'}
          </button>
        </div>
      </div>

      {/* AI JOURNAL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-cyan-400 font-mono">РЕФЛЕКСИЯ • 🎁 +25 ОП</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> 📔 AI-Дневник вайб-кодера
            </h3>
          </div>
          <button
            onClick={handleSaveJournal}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            {journalDone ? 'Дневник сохранен (+25 ОП)!' : 'Сохранить в портфолио'}
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="text-cyan-300 font-bold block">1. Тема моего первого живого сайта:</label>
            <input
              type="text"
              value={journalData.topic}
              onChange={e => setJournalData({ ...journalData, topic: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-purple-300 font-bold block">2. Что было самым неожиданным в процессе создания?</label>
            <textarea
              rows={2}
              value={journalData.unexpected}
              onChange={e => setJournalData({ ...journalData, unexpected: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-emerald-300 font-bold block">3. Какой проект я хочу построить в следующий раз?</label>
            <textarea
              rows={2}
              value={journalData.nextBuild}
              onChange={e => setJournalData({ ...journalData, nextBuild: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* TEASER FOR MISSION 10 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-950 to-purple-950 border border-indigo-500/50 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-300" /> СЛЕДУЮЩИЙ ШАГ В БЛОКЕ 3
        </div>
        <h4 className="text-lg sm:text-xl font-black text-white">
          🚀 Анонс Миссии 10: HTML/CSS/JS через AI (Personal site)
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В следующей миссии мы заглянем под капот любого сайта в интернете! Ты узнаешь три фундаментальных кирпичика (<strong>HTML, CSS и JavaScript</strong>) и научишься менять их через ИИ без страха сломать код. Финал — твой собственный многоблочный Personal Site!
        </p>
      </div>

      {/* Final Homework Submission */}
      <InlineHomeworkSubmission
        lessonId={9}
        taskTitle="Домашнее задание Миссии 09: Улучшение сайта & Family Demo"
        rewardExp={50}
      />
    </div>
  );
};
