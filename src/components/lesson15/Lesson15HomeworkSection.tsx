import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  ArrowRight
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson15HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [packName, setPackName] = useState('');
  const [framesCount, setFramesCount] = useState('120 кадров + GIF');
  const [hwSubmitted, setHwSubmitted] = useState(false);

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packName.trim() || hwSubmitted) return;
    setHwSubmitted(true);
    addReward(100, '🌟 Домашнее задание Урока 11 (Арт-пак для сайта на $1M) сдано! (+100 ОП)');
  };

  // Sidequest 1: Color Edition Remix
  const [remixColor, setRemixColor] = useState('');
  const [sidequest1Claimed, setSidequest1Claimed] = useState(false);

  const handleClaimSidequest1 = () => {
    if (!remixColor.trim() || sidequest1Claimed) return;
    setSidequest1Claimed(true);
    addReward(20, '🎨 Сайд-квест 1: Дополнительная расцветка в Whisk создана! (+20 ОП)');
  };

  // Sidequest 2: Pure Black Check
  const [blackCheckNote, setBlackCheckNote] = useState('');
  const [sidequest2Claimed, setSidequest2Claimed] = useState(false);

  const handleClaimSidequest2 = () => {
    if (!blackCheckNote.trim() || sidequest2Claimed) return;
    setSidequest2Claimed(true);
    addReward(20, '🖤 Сайд-квест 2: Проверка бесшовного фона #000000 выполнена! (+20 ОП)');
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-orange-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🏠 ДОМАШНЕЕ ЗАДАНИЕ • УРОК 11 (VIBE CODING CHALLENGE)
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Награда: до +140 ОП
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          🧠 Vibe Code Самостоятельно: Создай 3D-пакет ассетов для Своего Продукта Мечты!
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          На лекции мы разбирали <em>iPhone 18 Pro Burgundy</em>, в лабораторной тестировали <em>Four Gorgeous Finishes</em>. Теперь в Домашнем задании прояви креативность: <strong>выбери свой собственный флагманский гаджет</strong> (например: <em>AirPods Max 2 Burgundy, MacBook Pro M5, Vision Pro 2 или суперкар</em>), напиши для него промпты Кадра 1 (по центру) и Кадра 2 (справа) в <strong>Google Whisk</strong>, оживи в <strong>Google Flow</strong> и прикрепи отчёт ниже!
        </p>
      </div>

      {/* Main Homework Form */}
      <form onSubmit={handleSubmitHomework} className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-400" />
          <span>Основное задание: Сдача пакета 3D-ассетов (Start + End + GIF/Frames)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-bold uppercase">
              Название подготовленной папки / ссылка на облако:
            </label>
            <input
              type="text"
              required
              placeholder="например: iPhone18Pro_Orange_Frames"
              value={packName}
              onChange={e => setPackName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-400 focus:outline-none text-white text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-bold uppercase">
              Состав папки (Start, End, MP4, GIF/JPG):
            </label>
            <input
              type="text"
              required
              value={framesCount}
              onChange={e => setFramesCount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-400 focus:outline-none text-white text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={hwSubmitted}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm cursor-pointer disabled:opacity-50"
        >
          {hwSubmitted ? '✓ Домашнее задание сдано (+100 ОП)' : 'Сдать пакет ассетов (+100 ОП)'}
        </button>
      </form>

      {/* Sidequests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase">🎨 Сайд-квест 1 • Color Remix</span>
            <span className="text-xs font-mono text-emerald-400">+20 ОП</span>
          </div>
          <h4 className="text-lg font-bold text-white">Создай вторую расцветку корпуса в Whisk</h4>
          <p className="text-xs text-slate-300">
            Попробуй заменить в русском промпте «анодированный оранжевый» на титановый синий, изумрудный или матовый чёрный обсидиан.
          </p>
          <input
            type="text"
            placeholder="Какой второй цвет ты протестировал?"
            value={remixColor}
            onChange={e => setRemixColor(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
          <button
            onClick={handleClaimSidequest1}
            disabled={sidequest1Claimed || !remixColor.trim()}
            className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
          >
            {sidequest1Claimed ? '✓ Засчитано (+20 ОП)' : 'Отметить выполнение (+20 ОП)'}
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase">🖤 Сайд-квест 2 • Тест фона #000000</span>
            <span className="text-xs font-mono text-emerald-400">+20 ОП</span>
          </div>
          <h4 className="text-lg font-bold text-white">Проверка отсутствия швов на чёрном экране</h4>
          <p className="text-xs text-slate-300">
            Открой свою GIF/кадры на чисто чёрном фоне и убедись, что края смартфона растворяются в темноте без рамок.
          </p>
          <input
            type="text"
            placeholder="Впечатление от теста на чёрном фоне..."
            value={blackCheckNote}
            onChange={e => setBlackCheckNote(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          />
          <button
            onClick={handleClaimSidequest2}
            disabled={sidequest2Claimed || !blackCheckNote.trim()}
            className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
          >
            {sidequest2Claimed ? '✓ Засчитано (+20 ОП)' : 'Отметить выполнение (+20 ОП)'}
          </button>
        </div>
      </div>

      {/* Teaser for Lesson 12 */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-950/60 via-slate-900 to-cyan-950/60 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-orange-300 uppercase font-bold">ЧТО ДАЛЬШЕ В УРОКЕ 12:</span>
          <h4 className="text-lg sm:text-xl font-black text-white">
            💎 Сборка сайта на $1 000 000 в Google AI Studio + Шрифт Archivo («PRO»)
          </h4>
          <p className="text-xs text-slate-300">
            Мы загрузим нашу папку кадров в AI Studio, подключим шрифт Archivo для гигантской надписи PRO и запустим настоящий Apple Scroll Reveal!
          </p>
        </div>
        <ArrowRight className="w-8 h-8 text-orange-400 shrink-0" />
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={11}
        lessonTitle="Домашнее задание #11: Пакет 3D-ассетов (Whisk + Flow + Ezgif) для собственного флагманского продукта"
        rewardExp={100}
      />
    </div>
  );
};
