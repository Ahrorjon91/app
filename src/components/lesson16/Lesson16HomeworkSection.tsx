import React, { useState } from 'react';
import {
  Trophy,
  Send,
  Users,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson16HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [reportTitle, setReportTitle] = useState('iPhone 18 Pro — Burgundy Showcase + Trade-In Configurator');
  const [reportLiveUrl, setReportLiveUrl] = useState('');
  const [reportTools, setReportTools] = useState('Pinterest, Google Whisk, Google Flow, Ezgif, Google Fonts Archivo, Google AI Studio');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportLiveUrl.trim() || reportSubmitted) return;
    setReportSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    addReward(100, '📋 Финальный отчёт сайта на $1 000 000 (Project #4) сдан (+100 ОП)!');
  };

  const [familyReaction, setFamilyReaction] = useState('');
  const [quest1Claimed, setQuest1Claimed] = useState(false);

  const handleClaimQuest1 = () => {
    if (!familyReaction.trim() || quest1Claimed) return;
    setQuest1Claimed(true);
    addReward(25, '👨‍👩‍👧 Семейный показ сайта на $1 000 000 засчитан (+25 ОП)!');
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🏠 ДОМАШНЕЕ ЗАДАНИЕ • УРОК 12 (VIBE CODING CHALLENGE • PROJECT #4)
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Награда: до +125 ОП
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          🧠 Vibe Code Самостоятельно: Интерактивный Калькулятор Trade-In и Конфигуратор Памяти (256GB – 2TB)
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          На лекции мы собрали Hero-секцию со шрифтом <strong>Archivo («PRO»)</strong>, в лабораторной добавили Bento-сетку и переключатель 4 покрытий <strong>Burgundy</strong>. В Домашнем задании подумай как продуктовый инженер Apple и <strong>самостоятельно завайбкодь интерактивный блок «Купить iPhone 18 Pro»</strong>: выбор объёма памяти (256 ГБ / 512 ГБ / 1 ТБ / 2 ТБ), калькулятор скидки <strong>Apple Trade-In</strong> (выбор старой модели телефона снижает итоговую цену в реальном времени) и модальное окно предзаказа!
        </p>
      </div>

      {/* Main Report Form */}
      <form
        onSubmit={handleSubmitReport}
        className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-black text-white">
            Карточка портфолио: «$1,000,000 Product Showcase (Project #4)»
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Название флагманского проекта:</label>
            <input
              type="text"
              required
              value={reportTitle}
              onChange={e => setReportTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Живая ссылка (Live URL):</label>
            <input
              type="url"
              required
              placeholder="https://username.github.io/iphone-18-pro/"
              value={reportLiveUrl}
              onChange={e => setReportLiveUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-slate-300 font-bold block">Использованный стек инструментов Уроков 11 и 12:</label>
          <input
            type="text"
            value={reportTools}
            onChange={e => setReportTools(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300"
          />
        </div>

        <button
          type="submit"
          disabled={reportSubmitted || !reportLiveUrl.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{reportSubmitted ? '✓ Паспорт проекта сохранён (+100 ОП)' : 'Сдать финальный проект (+100 ОП)'}</span>
        </button>
      </form>

      {/* Family WOW-Test */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Семейный WOW-показ
          </span>
          <span className="text-xs font-mono text-emerald-400">+25 ОП</span>
        </div>
        <h4 className="text-lg font-bold text-white">
          Дай близким самим покрутить скролл твоего сайта iPhone 18 Pro!
        </h4>
        <input
          type="text"
          placeholder="Запиши их реакцию, когда смартфон начал подниматься поверх букв PRO..."
          value={familyReaction}
          onChange={e => setFamilyReaction(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
        />
        <button
          onClick={handleClaimQuest1}
          disabled={quest1Claimed || !familyReaction.trim()}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
        >
          {quest1Claimed ? '✓ Засчитано (+25 ОП)' : 'Зафиксировать реакцию (+25 ОП)'}
        </button>
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={12}
        lessonTitle="Домашнее задание #12: Vibe Code конфигуратора памяти (256GB–2TB) и калькулятора Trade-In для iPhone 18 Pro Burgundy"
        rewardExp={100}
      />
    </div>
  );
};
