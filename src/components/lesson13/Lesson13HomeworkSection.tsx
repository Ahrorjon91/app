import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Send,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Search,
  Users,
  Compass
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson13HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Homework main quest state
  const [improvedEffect, setImprovedEffect] = useState('Главная кнопка «Заказать звонок»');
  const [beforeState, setBeforeState] = useState('Кнопка просто резко меняла цвет фона без перехода');
  const [afterState, setAfterState] = useState('Добавил scale(1.04), мягкую синюю тень и плавный переход transition: all 0.3s ease');
  const [isBetter, setIsBetter] = useState<'yes' | 'no'>('yes');
  const [mainQuestSubmitted, setMainQuestSubmitted] = useState(false);

  // Side quests state
  const [badAnimSite, setBadAnimSite] = useState('');
  const [badAnimSuggestion, setBadAnimSuggestion] = useState('');
  const [sideQuest1Done, setSideQuest1Done] = useState(false);

  const [familyTester, setFamilyTester] = useState('Мама / Папа / Брат');
  const [familyReaction, setFamilyReaction] = useState('');
  const [sideQuest2Done, setSideQuest2Done] = useState(false);

  // AI Diary
  const [diaryFavoriteEffect, setDiaryFavoriteEffect] = useState('Hover-эффект с мягким подъёмом карточки и неоновым свечением');
  const [diaryBalanceInsight, setDiaryBalanceInsight] = useState('Анимация должна быть быстрой (до 0.4 сек) и помогать пальцу или глазу, а не превращать страницу в цирк');
  const [diarySaved, setDiarySaved] = useState(false);

  const handleMainQuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainQuestSubmitted) {
      setMainQuestSubmitted(true);
      addReward(50, 'hw13_main_quest');
    }
  };

  const handleSideQuest1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sideQuest1Done) {
      setSideQuest1Done(true);
      addReward(20, 'hw13_sidequest_bad_anim');
    }
  };

  const handleSideQuest2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sideQuest2Done) {
      setSideQuest2Done(true);
      addReward(20, 'hw13_sidequest_family_test');
    }
  };

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diarySaved) {
      setDiarySaved(true);
      addReward(20, 'hw13_ai_diary');
    }
  };

  return (
    <div className="space-y-10 text-slate-100 text-base leading-relaxed">
      {/* Header */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" /> УРОК 9 • РАЗДЕЛ 4 • ДОМАШНЕЕ ЗАДАНИЕ (VIBE CODING CHALLENGE)
          </span>
          <span className="px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-sm shadow-md shadow-cyan-950/40">
            до +110 ОП
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          🧠 Vibe Code Самостоятельно: Витрина из 3 Тарифов с 3D-наклоном и Магнитной кнопкой
        </h2>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
          На лекции мы разбирали простые кнопки, в лабораторной собирали карточку игрового героя. А теперь <strong>включи мышление вайб-кодера</strong>: самостоятельно спроектируй промпт и создай в Google AI Studio <strong>интерактивную секцию из 3 карточек тарифов (Starter / Pro / Ultra)</strong>, где карточка «PRO» подсвечивается неоном, наклоняется в 3D за курсором и имеет переключатель <em>«Месяц / Год (-20%)»</em> с плавной сменой цифр!
        </p>
      </div>

      {/* Main Quest: Улучши взаимодействие */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">ОСНОВНОЙ КВЕСТ (~25 МИН)</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              «Улучши взаимодействие»: До и После
            </h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-sm shadow-md">
            +50 ОП
          </span>
        </div>

        <form onSubmit={handleMainQuestSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-300">Какой эффект я улучшал(а):</label>
              <input
                type="text"
                value={improvedEffect}
                onChange={(e) => setImprovedEffect(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-cyan-400 focus:outline-none transition-all shadow-inner"
                placeholder="Например: Кнопка отправки формы"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-300">Стало ли лучше восприятие?</label>
              <select
                value={isBetter}
                onChange={(e) => setIsBetter(e.target.value as 'yes' | 'no')}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
              >
                <option value="yes">Да, сайт ощущается намного живее и приятнее ✨</option>
                <option value="no">Нет, пока ещё подбираю параметры скорости</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-300">Что было ДО:</label>
              <textarea
                rows={3}
                value={beforeState}
                onChange={(e) => setBeforeState(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-cyan-400 focus:outline-none leading-relaxed transition-all shadow-inner"
                placeholder="Как выглядел элемент до доработки?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm sm:text-base font-bold text-slate-300">Что стало ПОСЛЕ:</label>
              <textarea
                rows={3}
                value={afterState}
                onChange={(e) => setAfterState(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-cyan-400 focus:outline-none leading-relaxed transition-all shadow-inner"
                placeholder="Какие CSS-свойства или тайминги добавились?"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={mainQuestSubmitted}
              className={`px-7 py-3.5 rounded-2xl text-sm sm:text-base font-black flex items-center gap-2 transition-all cursor-pointer ${
                mainQuestSubmitted
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-600/30'
              }`}
            >
              {mainQuestSubmitted ? <CheckCircle2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              <span>{mainQuestSubmitted ? 'Квест сдан (+50 ОП)' : 'Отправить отчёт по квесту'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Side Quests */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Исследования в реальном мире (+40 ОП)
            </h3>
          </div>
          <span className="text-sm text-slate-300">Выполняй для прокачки ранга</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Side Quest 1 */}
          <form onSubmit={handleSideQuest1Submit} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Search className="w-4 h-4" /> Квест 1: Охота за плохой анимацией
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs sm:text-sm font-bold border border-amber-800">
                  +20 ОП
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Найди пример сайта или приложения с раздражающей или перегруженной анимацией.
              </p>
              <input
                type="text"
                value={badAnimSite}
                onChange={(e) => setBadAnimSite(e.target.value)}
                placeholder="Где заметил(а) плохую анимацию?"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-amber-400"
                required
              />
              <textarea
                rows={2}
                value={badAnimSuggestion}
                onChange={(e) => setBadAnimSuggestion(e.target.value)}
                placeholder="Что конкретно ты бы убрал(а) или исправил(а)?"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sideQuest1Done}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                sideQuest1Done
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {sideQuest1Done ? '✓ Квест зачтён (+20 ОП)' : 'Зафиксировать наблюдение'}
            </button>
          </form>

          {/* Side Quest 2 */}
          <form onSubmit={handleSideQuest2Submit} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Квест 2: Family Hover Test
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-800">
                  +20 ОП
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Дай родным навести мышь на 3 элемента твоего сайта без подсказок. Заметь их реакцию!
              </p>
              <input
                type="text"
                value={familyTester}
                onChange={(e) => setFamilyTester(e.target.value)}
                placeholder="Кто тестировал сайт?"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-cyan-400"
                required
              />
              <textarea
                rows={2}
                value={familyReaction}
                onChange={(e) => setFamilyReaction(e.target.value)}
                placeholder="Что они сказали или почувствовали?"
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sideQuest2Done}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                sideQuest2Done
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {sideQuest2Done ? '✓ Тест сохранён (+20 ОП)' : 'Сохранить результат теста'}
            </button>
          </form>
        </div>
      </div>

      {/* AI Diary */}
      <form onSubmit={handleSaveDiary} className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>📔 Запись в Дневник ИИ</span>
          </h3>
          <span className="text-sm text-slate-300 font-mono">+20 ОП</span>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-300">Мой любимый эффект на этой неделе:</label>
            <input
              type="text"
              value={diaryFavoriteEffect}
              onChange={(e) => setDiaryFavoriteEffect(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-300">Что я понял(а) о балансе «мало / много» анимации:</label>
            <textarea
              rows={3}
              value={diaryBalanceInsight}
              onChange={(e) => setDiaryBalanceInsight(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm sm:text-base shadow-inner focus:outline-none focus:border-purple-400"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={diarySaved}
            className={`px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer ${
              diarySaved
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/30'
            }`}
          >
            {diarySaved ? '✓ Дневник сохранён (+20 ОП)' : 'Сохранить запись в Дневник'}
          </button>
        </div>
      </form>

      {/* Next Mission Teaser: Scroll Storyteller */}
      <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 border-2 border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400 text-xs font-mono font-bold">
            🔮 СЛЕДУЮЩАЯ МИССИЯ
          </span>
          <h4 className="text-2xl sm:text-3xl font-black text-white">
            МИССИЯ 14 — SCROLL STORYTELLER
          </h4>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
            🤖 NOVA: «Твой сайт теперь реагирует на клики. А что, если он начнёт <strong>рассказывать захватывающую историю</strong> по мере того, как человек его листает? На следующей миссии — Scroll Storytelling!»
          </p>
        </div>

        <div className="px-6 py-3.5 rounded-2xl bg-indigo-950 border border-indigo-700/80 text-indigo-200 text-sm font-mono font-bold flex items-center gap-2.5 shrink-0 shadow-lg">
          <Lock className="w-5 h-5 text-indigo-400" />
          <span>Открывается после Урока 9</span>
        </div>
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={9}
        lessonTitle="Домашнее задание #9: Vibe Code витрины из 3 тарифов с 3D-наклоном и магнитной кнопкой"
        rewardExp={100}
      />
    </div>
  );
};
