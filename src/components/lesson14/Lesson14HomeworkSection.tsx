import React, { useState, useEffect } from 'react';
import {
  Home,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Send,
  Award,
  Zap,
  HelpCircle,
  Clock,
  Compass,
  Smile,
  ShieldCheck,
  Search,
  Users
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson14HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main quest choice
  const [questChoice, setQuestChoice] = useState<'questA' | 'questB'>('questA');
  const [siteUrl, setSiteUrl] = useState('');
  const [sceneDetail, setSceneDetail] = useState('');
  const [mainQuestSubmitted, setMainQuestSubmitted] = useState(false);

  // Side quest 1: Hunting
  const [sq1Url, setSq1Url] = useState('');
  const [sq1Note, setSq1Note] = useState('');
  const [sq1Submitted, setSq1Submitted] = useState(false);

  // Side quest 2: Family test
  const [sq2Reaction, setSq2Reaction] = useState('');
  const [sq2Submitted, setSq2Submitted] = useState(false);

  // AI Diary
  const [diarySurprise, setDiarySurprise] = useState('');
  const [diaryHardPart, setDiaryHardPart] = useState('');
  const [diaryInsight, setDiaryInsight] = useState('');
  const [diarySubmitted, setDiarySubmitted] = useState(false);

  // Submit Main Quest
  const handleMainQuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteUrl.trim() || !sceneDetail.trim()) return;
    setMainQuestSubmitted(true);
    addReward(25, '🏡 Главный квест Миссии 14 выполнен! (+25 ОП)');
  };

  // Submit Side Quest 1
  const handleSq1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sq1Url.trim()) return;
    setSq1Submitted(true);
    addReward(15, '🔍 Сайд-квест «Охота за Scroll-историями» сдан! (+15 ОП)');
  };

  // Submit Side Quest 2
  const handleSq2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sq2Reaction.trim()) return;
    setSq2Submitted(true);
    addReward(15, '👨‍👩‍👧 Сайд-квест «Family Scroll» сдан! (+15 ОП)');
  };

  // Submit Diary
  const handleDiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diarySurprise.trim() || !diaryHardPart.trim() || !diaryInsight.trim()) return;
    setDiarySubmitted(true);
    addReward(20, '📖 Запись в Дневник ИИ сохранена в портфолио! (+20 ОП)');
  };

  return (
    <div className="space-y-12 text-slate-100 w-full pb-16">
      {/* Header */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Home className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                ДОМАШНЕЕ ЗАДАНИЕ • УРОК 10 (VIBE CODING CHALLENGE)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                🧠 Vibe Code Самостоятельно: Интерактивная «Машина Времени» (5 эпох)
              </h2>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
            Награда: до +100 ОП
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          На лекции мы разбирали <em>«Худжанд-2050»</em>, а в лабораторной — <em>«Погружение на 11 000 метров»</em>. В Домашнем задании включи фантазию и <strong>самостоятельно завайбкодь интерактивный вертикальный таймлайн «Машина Времени» из 5 исторических эпох</strong> (например: эволюция смартфонов 1990→2030, история игр или твой путь разработчика) с Parallax-эффектом и счётчиком годов при прокрутке!
        </p>
      </div>

      {/* Main Quest: Выбор из 2 вариантов */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold">
              ОСНОВНОЙ КВЕСТ
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Выберите 1 вариант (+25 ОП)
            </h3>
          </div>
          {mainQuestSubmitted && (
            <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> СДАНО (+25 ОП)
            </span>
          )}
        </div>

        {/* Choice tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setQuestChoice('questA')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              questChoice === 'questA'
                ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-300">ВАРИАНТ А</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">+25 ОП</span>
            </div>
            <h4 className="font-bold text-white text-base">«Ещё 1 Scroll-Сцена»</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Добавь ещё одну сцену между Действием и Поворотом на своём опубликованном сайте.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setQuestChoice('questB')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              questChoice === 'questB'
                ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg shadow-purple-950'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-300">ВАРИАНТ Б</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">+25 ОП</span>
            </div>
            <h4 className="font-bold text-white text-base">«Ревизия темпа»</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Проверь сайт на «болезни темпа» и добавь паузы перед важными моментами для торжественности.
            </p>
          </button>
        </div>

        {/* Quest submission form */}
        <form onSubmit={handleMainQuestSubmit} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-cyan-300">
              🔗 Ссылка на опубликованный сайт (GitHub Pages / Vercel):
            </label>
            <input
              type="url"
              required
              disabled={mainQuestSubmitted}
              value={siteUrl}
              onChange={e => setSiteUrl(e.target.value)}
              placeholder="https://username.github.io/my-scrollytelling-site"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-purple-300">
              {questChoice === 'questA'
                ? '📝 Опиши добавленную сцену (что там происходит и какой применён эффект):'
                : '📝 Опиши, как ты скорректировал темп (где замедлил, где убрал лишнее):'}
            </label>
            <textarea
              required
              rows={3}
              disabled={mainQuestSubmitted}
              value={sceneDetail}
              onChange={e => setSceneDetail(e.target.value)}
              placeholder={
                questChoice === 'questA'
                  ? 'Я добавил сцену про лабораторию будущего, текст появляется сбоку через slide...'
                  : 'Я добавил отступ 80vh перед кульминацией, чтобы читатель успел осмыслить открытие...'
              }
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={mainQuestSubmitted || !siteUrl.trim() || !sceneDetail.trim()}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>{mainQuestSubmitted ? '✓ Квест сдан (+25 ОП)' : 'Отправить на проверку (+25 ОП)'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Side Quests */}
      <div className="space-y-6">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Сайд-квесты (по желанию, до +30 ОП)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Side Quest 1 */}
          <form
            onSubmit={handleSq1Submit}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-xs font-bold">
                  САЙД-КВЕСТ 1
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">+15 ОП</span>
              </div>
              <h4 className="font-bold text-white text-base">
                🔍 «Охота за Scroll-историями»
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Найди в интернете 1 классный пример scrollytelling (на The Pudding, NYT, Apple, NatGeo и т.д.) и поделись ссылкой с комментарием.
              </p>
              <input
                type="url"
                required
                disabled={sq1Submitted}
                value={sq1Url}
                onChange={e => setSq1Url(e.target.value)}
                placeholder="https://pudding.cool/..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 mt-2"
              />
              <input
                type="text"
                disabled={sq1Submitted}
                value={sq1Note}
                onChange={e => setSq1Note(e.target.value)}
                placeholder="Что тебе больше всего понравилось в подаче?"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={sq1Submitted || !sq1Url.trim()}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Search className="w-4 h-4" />
              <span>{sq1Submitted ? '✓ Ссылка сохранена (+15 ОП)' : 'Отправить находку (+15 ОП)'}</span>
            </button>
          </form>

          {/* Side Quest 2 */}
          <form
            onSubmit={handleSq2Submit}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-mono text-xs font-bold">
                  САЙД-КВЕСТ 2
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">+15 ОП</span>
              </div>
              <h4 className="font-bold text-white text-base">
                👨‍👩‍👧 «Family Scroll»
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Покажи сайт родителям или другу. Дай им прокрутить страницу молча, не подсказывая. Спроси: поняли ли они историю? Что запомнилось?
              </p>
              <textarea
                rows={3}
                required
                disabled={sq2Submitted}
                value={sq2Reaction}
                onChange={e => setSq2Reaction(e.target.value)}
                placeholder="Их реакция: «Мама сказала, что город будущего выглядит супер, но сначала листала слишком быстро...»"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400 leading-relaxed"
              />
            </div>
            <button
              type="submit"
              disabled={sq2Submitted || !sq2Reaction.trim()}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-600/20"
            >
              <Users className="w-4 h-4" />
              <span>{sq2Submitted ? '✓ Реакция записана (+15 ОП)' : 'Зафиксировать результат (+15 ОП)'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* AI Diary: 📖 ДНЕВНИК ИИ */}
      <form
        onSubmit={handleDiarySubmit}
        className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/30 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                📖 Дневник ИИ: Итоги Миссии 14
              </h3>
              <p className="text-xs text-slate-400">
                Три вопроса для закрепления нового ранга
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            +20 ОП в копилку
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-cyan-300">
              1. 😲 Одна вещь, которая меня удивила в скрорителлинге:
            </label>
            <input
              type="text"
              required
              disabled={diarySubmitted}
              value={diarySurprise}
              onChange={e => setDiarySurprise(e.target.value)}
              placeholder="например: Что люди проводят на таких страницах в 5 раз больше времени..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-purple-300">
              2. 🧩 Самый сложный момент при настройке сцен и темпа:
            </label>
            <input
              type="text"
              required
              disabled={diarySubmitted}
              value={diaryHardPart}
              onChange={e => setDiaryHardPart(e.target.value)}
              placeholder="например: Подобрать расстояние, чтобы текст не пролетал слишком быстро..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-emerald-300">
              3. 💡 Главный инсайт миссии:
            </label>
            <input
              type="text"
              required
              disabled={diarySubmitted}
              value={diaryInsight}
              onChange={e => setDiaryInsight(e.target.value)}
              placeholder="например: Анимация должна усиливать историю, но основа всегда — это смысл текста."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={diarySubmitted || !diarySurprise.trim() || !diaryHardPart.trim() || !diaryInsight.trim()}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>{diarySubmitted ? '✓ Запись сохранена (+20 ОП)' : 'Сохранить запись в Дневник (+20 ОП)'}</span>
          </button>
        </div>
      </form>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={10}
        lessonTitle="Домашнее задание #10: Vibe Code интерактивной «Машины Времени» (5 эпох с Parallax и счётчиком годов)"
        rewardExp={100}
      />
    </div>
  );
};
