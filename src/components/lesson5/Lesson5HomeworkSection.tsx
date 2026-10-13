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
  Heart
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson5HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Project: 3 Versions of One Idea state
  const [ideaTopic, setIdeaTopic] = useState('Мой эко-дом в Худжанде 2050 года');
  const [v1Style, setV1Style] = useState('Реалистичная 3D-иллюстрация');
  const [v1Prompt, setV1Prompt] = useState('Уютный эко-дом с солнечными батареями и виноградником на крыше');

  const [v2Style, setV2Style] = useState('Неоновый синтвейв');
  const [v2Prompt, setV2Prompt] = useState('Ночной дом с неоновой бирюзовой подсветкой террасы и фонарями');

  const [v3Style, setV3Style] = useState('Воздушная акварель');
  const [v3Prompt, setV3Prompt] = useState('Нежные полупрозрачные тона, утренний туман над садом');

  const [favoriteVersion, setFavoriteVersion] = useState<string>('v1');
  const [favoriteReason, setFavoriteReason] = useState('Версия v1 самая тёплая и выглядит как настоящий дом мечты');

  // AI Journal Entries
  const [journalWorkName, setJournalWorkName] = useState('«Дом у реки: Худжанд-2050»');
  const [journalBestFormula, setJournalBestFormula] = useState(
    'Герой (эко-дом) + Стиль (3D) + Место (Худжанд) + Свет (золотой закат) + Ракурс (улица) + Настроение (уют)'
  );

  // Side quests state
  const [sideQuests, setSideQuests] = useState({
    fixIt: false,
    familyVote: false
  });

  const [fixItDescription, setFixItDescription] = useState('У человека на балконе получилось 6 пальцев на правой руке');
  const [familyVoteChoice, setFamilyVoteChoice] = useState('Маме больше понравилась акварельная версия за нежные цвета');

  const [hwSaved, setHwSaved] = useState(false);

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(15, '📋 Текст домашнего задания скопирован! (+15 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getFullHomeworkText = () => {
    return `ДОМАШНЕЕ ЗАДАНИЕ К МИССИИ 05: «3 ВАРИАНТА ОДНОЙ ИДЕИ»

ИДЕЯ: ${ideaTopic}

ВАРИАНТ 1:
- Стиль: ${v1Style}
- Промпт: ${v1Prompt}

ВАРИАНТ 2:
- Стиль: ${v2Style}
- Промпт: ${v2Prompt}

ВАРИАНТ 3:
- Стиль: ${v3Style}
- Промпт: ${v3Prompt}

ФАВОРИТ:
- Лучший вариант: ${favoriteVersion.toUpperCase()}
- Почему: ${favoriteReason}

ДНЕВНИК ИИ:
- Название работы: ${journalWorkName}
- Лучшая формула: ${journalBestFormula}

ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ:
- Fix It (дефект арта): ${fixItDescription}
- Family Vote (выбор семьи): ${familyVoteChoice}`;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Шапка домашнего задания */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Домашнее задание • Миссия 05
          </div>
          <span className="text-xs font-mono text-pink-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            ⏱️ ~30 минут • Награда +75 ОП
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Проект: «3 варианта одной идеи» + Дневник ИИ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Возьми одну визуальную концепцию (например, свой дом будущего) и раскрой её в трёх абсолютно разных стилях и настроениях!
          </p>
        </div>
      </div>

      {/* КАРТОЧКА ПРОЕКТА: 3 ВЕРСИИ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Генерация 3 версий одной идеи
          </h3>
          <span className="text-xs font-mono text-cyan-300">Срок сдачи: до Миссии 06</span>
        </div>

        {/* Общая тема */}
        <div className="space-y-1 text-xs">
          <label className="text-slate-400 font-bold">Главная идея (например, «мой дом в будущем»):</label>
          <input
            type="text"
            value={ideaTopic}
            onChange={(e) => setIdeaTopic(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* 3 карточки версий */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Версия 1 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-[10px] uppercase font-mono">
                Версия 1
              </span>
              <span className="text-xs">📸</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Стиль 1:</label>
              <input
                type="text"
                value={v1Style}
                onChange={(e) => setV1Style(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Описание / промпт:</label>
              <textarea
                rows={2}
                value={v1Prompt}
                onChange={(e) => setV1Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Версия 2 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300 font-bold text-[10px] uppercase font-mono">
                Версия 2
              </span>
              <span className="text-xs">📸</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Стиль 2:</label>
              <input
                type="text"
                value={v2Style}
                onChange={(e) => setV2Style(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Описание / промпт:</label>
              <textarea
                rows={2}
                value={v2Prompt}
                onChange={(e) => setV2Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Версия 3 */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-pink-950 border border-pink-800 text-pink-300 font-bold text-[10px] uppercase font-mono">
                Версия 3
              </span>
              <span className="text-xs">📸</span>
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Стиль 3:</label>
              <input
                type="text"
                value={v3Style}
                onChange={(e) => setV3Style(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-bold">Описание / промпт:</label>
              <textarea
                rows={2}
                value={v3Prompt}
                onChange={(e) => setV3Prompt(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Сравнение и выбор лучшей версии */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Какая версия получилась самой удачной?</label>
            <select
              value={favoriteVersion}
              onChange={(e) => setFavoriteVersion(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400"
            >
              <option value="v1">Версия 1 ({v1Style})</option>
              <option value="v2">Версия 2 ({v2Style})</option>
              <option value="v3">Версия 3 ({v3Style})</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Почему именно она?</label>
            <input
              type="text"
              value={favoriteReason}
              onChange={(e) => setFavoriteReason(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* ДНЕВНИК ИИ И ДОПОЛНИТЕЛЬНЫЕ КВЕСТЫ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Запись в Дневник ИИ */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Запись в Дневник ИИ
          </h4>
          <div className="space-y-2 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">Моя лучшая работа называется:</label>
              <input
                type="text"
                value={journalWorkName}
                onChange={(e) => setJournalWorkName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">Формула, которая сработала лучше всего:</label>
              <textarea
                rows={2}
                value={journalBestFormula}
                onChange={(e) => setJournalBestFormula(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Дополнительные квесты */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Дополнительные квесты (+20 ОП каждый)
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">🖼️ Квест 1: Fix It (Найди дефект)</span>
                <span className="text-[10px] text-amber-400 font-mono">+20 ОП</span>
              </div>
              <input
                type="text"
                value={fixItDescription}
                onChange={(e) => setFixItDescription(e.target.value)}
                placeholder="Что пошло не так на картинке со странностями?"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-300">👨‍👩‍👧 Квест 2: Family Vote (Выбор семьи)</span>
                <span className="text-[10px] text-amber-400 font-mono">+20 ОП</span>
              </div>
              <input
                type="text"
                value={familyVoteChoice}
                onChange={(e) => setFamilyVoteChoice(e.target.value)}
                placeholder="Какая версия больше понравилась родным и почему?"
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка сохранения и копирования текста ДЗ (Часть 1) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => handleCopy(getFullHomeworkText(), 'hw-text')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 flex items-center gap-1.5"
        >
          {copiedKey === 'hw-text' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKey === 'hw-text' ? 'Скопировано!' : 'Скопировать текст отчёта'}</span>
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
    </div>
  );
};
