import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Send,
  Layers,
  Check,
  Copy,
  Users,
  Camera,
  RotateCcw,
  BookOpen,
  Lock,
  ArrowRight,
  Award,
  Heart,
  Smile,
  ShieldAlert
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson6HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Project: 3 Scenes with Character
  const [heroName, setHeroName] = useState('Амина');
  const [scene1Location, setScene1Location] = useState('Крыша лаборатории на рассвете с видом на реку Сырдарья');
  const [scene1Prompt, setScene1Prompt] = useState('чинит антенну связи, утренний золотистый свет, лёгкий ветер развевает чёлку');

  const [scene2Location, setScene2Location] = useState('Школьная цифровая библиотека будущего');
  const [scene2Prompt, setScene2Prompt] = useState('сидит за голографическим монитором, сосредоточенный взгляд, рука у подбородка');

  const [scene3Location, setScene3Location] = useState('Магнитный экспресс над Худжандом');
  const [scene3Prompt, setScene3Prompt] = useState('смотрит в панорамное окно поезда, радостная улыбка, наушники на шее');

  const [similarityScore, setSimilarityScore] = useState<number>(5);
  const [refinementNote, setRefinementNote] = useState('В версии 2 я явно уточнил цвет ветровки, чтобы ИИ не менял её на серый свитер');

  // Side Quests State
  const [heroMotto, setHeroMotto] = useState('«Если техника сломалась — значит, её можно сделать в 10 раз лучше!»');
  const [familyReaction, setFamilyReaction] = useState('Младший брат сразу узнал героя на всех 3 картинках по оранжевому капюшону');

  // AI Journal
  const [journalTrait, setJournalTrait] = useState('Невероятное упорство и любовь к созданию полезных вещей для людей');

  const [hwSaved, setHwSaved] = useState(false);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(15, '📋 Текст домашнего отчёта скопирован! (+15 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getFullHomeworkReport = () => {
    return `ОТЧЁТ К МИССИИ 06: «3 СЦЕНЫ С ПЕРСОНАЖЕМ»

ГЕРОЙ: ${heroName}

СЦЕНА 1:
- Локация: ${scene1Location}
- Действие/Промпт: ${scene1Prompt}

СЦЕНА 2:
- Локация: ${scene2Location}
- Действие/Промпт: ${scene2Prompt}

СЦЕНА 3:
- Локация: ${scene3Location}
- Действие/Промпт: ${scene3Prompt}

ОЦЕНКА СХОДСТВА (1-5): ${similarityScore}/5
ЧТО УТОЧНЕНО В ПАСПОРТЕ: ${refinementNote}

ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ:
- Девиз героя: ${heroMotto}
- Реакция семьи (Family Meet): ${familyReaction}

ДНЕВНИК ИИ:
- Главная черта характера: ${journalTrait}`;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Шапка домашнего задания */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Домашнее задание • Миссия 06
          </div>
          <span className="text-xs font-mono text-pink-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            ⏱️ ~25 минут • Срок: до Миссии 07
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Проект: «3 сцены с персонажем» + Дневник ИИ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Помести своего героя в 3 абсолютно разные локации, используя один и тот же неизменный Паспорт внешности!
          </p>
        </div>
      </div>

      {/* КАРТОЧКА ПРОЕКТА: 3 СЦЕНЫ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Генерация 3 сцен с одним героем
          </h3>
          <span className="text-xs font-mono text-cyan-300">Награда +50 ОП</span>
        </div>

        {/* Имя героя */}
        <div className="space-y-1 text-xs">
          <label className="text-slate-400 font-bold">Имя твоего героя:</label>
          <input
            type="text"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400"
          />
        </div>

        {/* Сетка 3 сцен */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Сцена 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-[10px] uppercase font-mono">
                Сцена 1
              </span>
              <span className="text-xs">🌅</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Место / Локация:</label>
              <input
                type="text"
                value={scene1Location}
                onChange={(e) => setScene1Location(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Что делает герой:</label>
              <textarea
                rows={2}
                value={scene1Prompt}
                onChange={(e) => setScene1Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Сцена 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300 font-bold text-[10px] uppercase font-mono">
                Сцена 2
              </span>
              <span className="text-xs">📚</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Место / Локация:</label>
              <input
                type="text"
                value={scene2Location}
                onChange={(e) => setScene2Location(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Что делает герой:</label>
              <textarea
                rows={2}
                value={scene2Prompt}
                onChange={(e) => setScene2Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Сцена 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-pink-950 border border-pink-800 text-pink-300 font-bold text-[10px] uppercase font-mono">
                Сцена 3
              </span>
              <span className="text-xs">🚄</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Место / Локация:</label>
              <input
                type="text"
                value={scene3Location}
                onChange={(e) => setScene3Location(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Что делает герой:</label>
              <textarea
                rows={2}
                value={scene3Prompt}
                onChange={(e) => setScene3Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Оценка сходства и правки Паспорта */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Насколько похож герой во всех 3 сценах (1–5)?</label>
            <select
              value={similarityScore}
              onChange={(e) => setSimilarityScore(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400"
            >
              <option value={5}>5 из 5 — Полное совпадение черт лица и стиля</option>
              <option value={4}>4 из 5 — Почти одинаковый, мелкие различия</option>
              <option value={3}>3 из 5 — Узнаваем, но одежда слегка изменилась</option>
              <option value={2}>2 из 5 — Сложно узнать без подсказки</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Что ты уточнил(а) в Паспорте для лучшего результата?</label>
            <input
              type="text"
              value={refinementNote}
              onChange={(e) => setRefinementNote(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ & ДНЕВНИК ИИ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Квесты */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Дополнительные квесты
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">📛 Квест 1: Имя и девиз героя</span>
                <span className="text-[10px] text-amber-400 font-mono">+15 ОП</span>
              </div>
              <input
                type="text"
                value={heroMotto}
                onChange={(e) => setHeroMotto(e.target.value)}
                placeholder="Придумай девиз своего героя в одну ёмкую фразу"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-300">👨‍👩‍👧 Квест 2: Family Meet (Показ семье)</span>
                <span className="text-[10px] text-pink-400 font-mono">+20 ОП</span>
              </div>
              <input
                type="text"
                value={familyReaction}
                onChange={(e) => setFamilyReaction(e.target.value)}
                placeholder="Покажи героя семье: узнали ли они его на всех кадрах?"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Запись в Дневник ИИ */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Запись в Дневник ИИ
          </h4>
          <div className="space-y-2 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">Имя персонажа:</label>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-cyan-300">
                {heroName}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">Главная черта характера твоего героя:</label>
              <textarea
                rows={2}
                value={journalTrait}
                onChange={(e) => setJournalTrait(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки сохранения и копирования */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => handleCopy(getFullHomeworkReport(), 'hw6-text')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 flex items-center gap-1.5"
        >
          {copiedKey === 'hw6-text' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKey === 'hw6-text' ? 'Скопировано!' : 'Скопировать текст отчёта'}</span>
        </button>

        <button
          onClick={() => {
            setHwSaved(true);
            addReward(25, '💾 Домашнее задание сохранено в браузере! (+25 Опыта)');
          }}
          className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-pink-500/20"
        >
          <Award className="w-4 h-4" />
          <span>{hwSaved ? 'Сохранено! ✓' : 'Сохранить отчёт (+25 XP)'}</span>
        </button>
      </div>

      {/* 🔮 ТИЗЕР СЛЕДУЮЩЕЙ МИССИИ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300 font-mono uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" /> Что ждёт впереди: Миссия 07
        </div>
        <div className="space-y-1">
          <h4 className="text-lg sm:text-xl font-black text-white">
            МИССИЯ 07 — ИИ-РЕЖИССЁР
          </h4>
          <p className="text-xs text-slate-300">
            Картинка → История → Видео • Оживи своего персонажа
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30 text-xs text-purple-200 italic">
          🤖 <strong>NOVA:</strong> «У тебя есть город и персонаж. Пора его <strong>оживить</strong>! На следующей миссии твой герой заговорит и задвигается — мы превратим статичный кадр в кинематографичное видео! Подумай заранее: что делает твой герой в один обычный день? 🚀»
        </div>
      </div>

      {/* ОФИЦИАЛЬНАЯ СДАЧА ДОМАШНЕГО ЗАДАНИЯ В ПОРТАЛ */}
      <div className="pt-4 border-t border-slate-800">
        <InlineHomeworkSubmission
          lessonId={4}
          homeworkTitle="Домашнее задание: Урок 4 (3 варианта одной идеи, 3 сцены с персонажем и Дневник ИИ)"
        />
      </div>
    </div>
  );
};
