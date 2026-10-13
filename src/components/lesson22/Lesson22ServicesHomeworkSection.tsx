import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  GraduationCap,
  Award,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson22ServicesHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [hwDraft, setHwDraft] = useState({
    topicAndSources: '',
    quizScore: '',
    threeVerifiedFacts: '',
    conclusion: ''
  });
  const [draftSaved, setDraftSaved] = useState(false);

  const toggleStep = (step: number) => {
    setStepChecked(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const handleSaveDraft = () => {
    if (draftSaved) return;
    setDraftSaved(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addReward(25, '🏠 Черновик домашнего задания Урока 22 сохранён (+25 ОП)!');
  };

  const steps = [
    {
      num: 1,
      title: '1. Выбери тему из школьного предмета, которая тебе сейчас нужна (история, биология, английский, география и т. д.).'
    },
    {
      num: 2,
      title: '2. Собери 2–3 разрешённых источника: свои конспекты, параграф из учебника в разрешённом виде, открытую статью.'
    },
    {
      num: 3,
      title: '3. Загрузи их в NotebookLM и создай: краткий конспект (через чат); тест или карточки; по желанию, аудио-обзор.'
    },
    {
      num: 4,
      title: '4. Пройди тест или карточки сам(а) и запиши результат (сколько правильных ответов).'
    },
    {
      num: 5,
      title: '5. Создай в Gamma короткую презентацию (5–6 слайдов) по этой теме.'
    },
    {
      num: 6,
      title: '6. Проверь минимум 3 факта по другому источнику (учебник, энциклопедия) и запиши, всё ли совпало.'
    },
    {
      num: 7,
      title: '7. Напиши 3–5 предложений: какой сервис был самым полезным и почему.'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            🏠 HW • ДОМАШНЕЕ ЗАДАНИЕ
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 30–40 минут
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🏠 «Мой учебный набор с помощью ИИ»
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>🎯 Цель:</strong> применить ИИ-помощников к своей настоящей школьной теме.
        </p>
      </div>

      {/* Шаги выполнения */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <span>Шаги выполнения</span>
          </h3>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Отмечено: {Object.values(stepChecked).filter(Boolean).length} / 7
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((st) => {
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
                <div className="text-xs sm:text-sm font-bold">{st.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Поля для подготовки домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white">
          📝 Подготовка отчёта по домашнему заданию
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              1. Название школьной темы и список 2–3 источников:
            </label>
            <input
              type="text"
              value={hwDraft.topicAndSources}
              onChange={(e) => setHwDraft({ ...hwDraft, topicAndSources: e.target.value })}
              placeholder="Например: Фотосинтез (биология) — мой конспект и статья..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              2. Твой результат прохождения теста или карточек в NotebookLM:
            </label>
            <input
              type="text"
              value={hwDraft.quizScore}
              onChange={(e) => setHwDraft({ ...hwDraft, quizScore: e.target.value })}
              placeholder="Например: 5 из 5 правильных ответов..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              3. Список из 3 проверенных фактов (что проверил(а) и где):
            </label>
            <textarea
              rows={3}
              value={hwDraft.threeVerifiedFacts}
              onChange={(e) => setHwDraft({ ...hwDraft, threeVerifiedFacts: e.target.value })}
              placeholder="Факт 1: ...&#10;Факт 2: ...&#10;Факт 3: ..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              4. Вывод (3–5 предложений: какой сервис был самым полезным и почему):
            </label>
            <textarea
              rows={2}
              value={hwDraft.conclusion}
              onChange={(e) => setHwDraft({ ...hwDraft, conclusion: e.target.value })}
              placeholder="Напиши свой вывод..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <button
            onClick={handleSaveDraft}
            disabled={draftSaved}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              draftSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
            }`}
          >
            {draftSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {draftSaved ? 'Черновик сохранён (+25 ОП)' : 'Сохранить черновик (+25 ОП)'}
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
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Название темы и список источников</li>
            <li>Скриншот теста или карточек и твой результат</li>
            <li>PDF-презентацию из Gamma</li>
            <li>Список из 3 проверенных фактов (что проверил(а) и где)</li>
            <li>Вывод (3–5 предложений)</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>🌟 Бонус</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Попроси NotebookLM объяснить сложную часть темы «как шестикласснику» и напиши, стало ли понятнее.
          </p>
        </div>
      </div>

      {/* Штатная форма сдачи домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача домашнего задания #22 в портал
        </h3>
        <InlineHomeworkSubmission lessonId={22} />
      </div>
    </div>
  );
};
