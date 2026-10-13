import React from 'react';
import {
  CheckCircle2
} from 'lucide-react';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson16AgencyHomeworkSection: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header / Information */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-orange-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🏠 HW — ДОМАШНЕЕ ЗАДАНИЕ · УРОК 16
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            ⏱ Время: 40–60 минут
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          «Три уровня одного сайта»
        </h2>

        <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/30 space-y-1">
          <span className="text-xs font-mono uppercase text-orange-300 font-bold">🎯 Цель</span>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Показать, что ты умеешь делать сайты разной сложности.
          </p>
        </div>
      </div>

      {/* Шаги (1-6) и Что сдать */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-orange-400" />
          <span>Шаги выполнения домашнего задания:</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>Возьми бизнес из лабораторной (или другой учебный бизнес).</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="space-y-1">
              <div>Создай <strong>три версии</strong> сайта:</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>🥉 <strong>Простая</strong> — одностраничная страница с контактами и услугами;</li>
                <li>🥈 <strong>Бизнес-лендинг</strong> — с кнопками связи, картой, FAQ;</li>
                <li>🥇 <strong>Премиум</strong> — со scroll-анимациями и эффектом глубины или параллакса.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>Опубликуй <strong>каждую версию</strong> на Vercel (можно в разных репозиториях или ветках).</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div className="space-y-1">
              <div>Открой каждую на телефоне и проверь, что:</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>всё читается;</li>
                <li>кнопки работают;</li>
                <li>сайт быстро грузится.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              5
            </span>
            <div>Выбери любимую версию и напиши 3–5 предложений: <strong>почему она лучше для клиента</strong>.</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              6
            </span>
            <div>
              Составь <strong>мини-прайс</strong> из трёх пакетов (Базовый / Стандарт / Премиум): только список того, что входит, <strong>без цен</strong>, цены обсуди с преподавателем.
            </div>
          </div>
        </div>

        {/* ✅ Что сдать */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
          <h4 className="text-base font-black text-emerald-300">✅ Что сдать</h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-1.5">
            <li>Три ссылки на опубликованные версии</li>
            <li>Ссылка на репозиторий(и) GitHub</li>
            <li>Текст: почему выбранная версия лучше (3–5 предложений)</li>
            <li>Мини-список пакетов услуг</li>
          </ul>
        </div>
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={16}
        lessonTitle="Домашнее задание #16: «Три уровня одного сайта» (Простая / Бизнес-лендинг / Премиум)"
        rewardExp={100}
      />
    </div>
  );
};
