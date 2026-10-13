import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  Smartphone,
  Award,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson19AndroidHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [reportText, setReportText] = useState({
    appNameAndForWhom: '',
    firstPrompt: '',
    fiveFixPrompts: '',
    fixedBug: ''
  });
  const [reportSaved, setReportSaved] = useState(false);

  const toggleStep = (step: number) => {
    setStepChecked(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const handleSaveReport = () => {
    if (reportSaved) return;
    setReportSaved(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    addReward(25, '🏠 Мини-отчёт по домашнему заданию Урока 19 сохранён (+25 ОП)!');
  };

  const hwSteps = [
    {
      num: 1,
      title: '1. Придумай идею полезного приложения для себя, семьи или друзей.',
      desc: 'Примеры: трекер чтения книг, карманный словарик английских слов, таймер для тренировок, учёт карманных расходов, расписание кружков.'
    },
    {
      num: 2,
      title: '2. Создай первую версию в Google AI Studio (платформа Android).'
    },
    {
      num: 3,
      title: '3. Проведи 5 коротких итераций улучшения:',
      desc: 'Не менее 2 правок внешнего вида (цвета, отступы, шрифты, прокрутка) и не менее 2 правок функций (новые кнопки, фильтр, подсчёт результата, защита от пустого ввода). 1 правка удобства (понятные подписи, пустое состояние списка).'
    },
    {
      num: 4,
      title: '4. Составь краткий отчёт разработчика (4 пункта):',
      desc: 'Как называется приложение и кому оно помогает? Каким был твой первый промпт? Какие 5 коротких промптов ты написал для улучшения? Какую ошибку в первой версии удалось найти и исправить?'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            📝 HW • ДОМАШНЕЕ ЗАДАНИЕ
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Формат: дома · Время: 35–45 минут
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🏠 Своё полезное Android-приложение: от черновика до версии 2.0
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>Цель задания:</strong> самостоятельно придумать и создать новое Android-приложение (не то, что делали в классе) и довести его до аккуратного рабочего вида за 5 шагов.
        </p>
      </div>

      {/* Что нужно сделать (4 шага) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <span>Что нужно сделать</span>
          </h3>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Отмечено: {Object.values(stepChecked).filter(Boolean).length} / 4
          </span>
        </div>

        <div className="space-y-3">
          {hwSteps.map((st) => {
            const done = !!stepChecked[st.num];
            return (
              <button
                key={st.num}
                onClick={() => toggleStep(st.num)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  done
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold ${
                    done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {done ? '✓' : st.num}
                </div>
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold">{st.title}</div>
                  {st.desc && <div className="text-xs text-slate-400 leading-relaxed">{st.desc}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Краткий отчёт разработчика (4 пункта) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h3 className="text-lg sm:text-xl font-black text-white">
          📋 Краткий отчёт разработчика (4 пункта)
        </h3>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              1. Как называется приложение и кому оно помогает?
            </label>
            <input
              type="text"
              value={reportText.appNameAndForWhom}
              onChange={(e) => setReportText({ ...reportText, appNameAndForWhom: e.target.value })}
              placeholder="Например: Трекер чтения книг — помогает школьникам читать каждый день..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              2. Каким был твой первый промпт?
            </label>
            <textarea
              rows={2}
              value={reportText.firstPrompt}
              onChange={(e) => setReportText({ ...reportText, firstPrompt: e.target.value })}
              placeholder="Вставь сюда свой первый промпт..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              3. Какие 5 коротких промптов ты написал для улучшения?
            </label>
            <textarea
              rows={3}
              value={reportText.fiveFixPrompts}
              onChange={(e) => setReportText({ ...reportText, fiveFixPrompts: e.target.value })}
              placeholder="Перечисли 5 коротких промптов (2 внешнего вида, 2 функций, 1 удобства)..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              4. Какую ошибку в первой версии удалось найти и исправить?
            </label>
            <input
              type="text"
              value={reportText.fixedBug}
              onChange={(e) => setReportText({ ...reportText, fixedBug: e.target.value })}
              placeholder="Например: можно было добавить пустую запись без названия..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleSaveReport}
            disabled={reportSaved}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              reportSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
            }`}
          >
            {reportSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {reportSaved ? 'Отчёт разработчика сохранён (+25 ОП)' : 'Сохранить черновик отчёта (+25 ОП)'}
          </button>
        </div>
      </div>

      {/* Что сдать + Бонус */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать</span>
          </h3>
          <ul className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>2 скриншота: <strong>первая версия (До)</strong> и <strong>финальная версия после 5 правок (После)</strong>.</li>
            <li>Краткий отчёт разработчика (4 пункта выше).</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>🌟 Бонус (по желанию)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Покажи приложение кому-то из семьи, попроси понажимать кнопки и запиши одно их пожелание: что бы они добавили в твоё приложение?
          </p>
        </div>
      </div>

      {/* Штатная форма сдачи домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача домашнего задания #19 в портал
        </h3>
        <InlineHomeworkSubmission lessonId={19} />
      </div>
    </div>
  );
};
