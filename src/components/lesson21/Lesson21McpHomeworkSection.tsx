import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  Plug,
  Award,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson21McpHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [hwDraft, setHwDraft] = useState({
    threePrompts: '',
    fiveSecurityRules: '',
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
    addReward(25, '🏠 Черновик домашнего задания Урока 21 сохранён (+25 ОП)!');
  };

  const steps = [
    {
      num: 1,
      title: '1. Придумай 3 идеи простых автоматизаций (например: напоминание, приветствие, ответ на команду).'
    },
    {
      num: 2,
      title: '2. Для каждой напиши запрос для ИИ по формуле: КТО → ЧТО → КОГДА → КУДА → КАК проверить.'
    },
    {
      num: 3,
      title: '3. Выбери самую интересную идею и собери этот workflow вручную в своём n8n (как на Уроке 20).'
    },
    {
      num: 4,
      title: '4. Проверь, как он работает в Telegram.'
    },
    {
      num: 5,
      title: '5. Напиши 5 правил безопасности, которые нужно помнить, когда ИИ подключают к своим сервисам.'
    },
    {
      num: 6,
      title: '6. Напиши 3–5 предложений: что быстрее: делать вручную или просить ИИ, и что нужно проверять всегда.'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            🏠 HW • ДОМАШНЕЕ ЗАДАНИЕ
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 30–40 минут
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🏠 «Пишу задание для ИИ-помощника»
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>🎯 Цель:</strong> научиться формулировать чёткие запросы и оценивать результат.
        </p>
      </div>

      {/* Шаги выполнения */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Plug className="w-5 h-5 text-violet-400" />
            <span>Шаги выполнения</span>
          </h3>
          <span className="text-xs font-mono text-violet-300 bg-violet-950 px-3 py-1 rounded-full border border-violet-800">
            Отмечено: {Object.values(stepChecked).filter(Boolean).length} / 6
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

      {/* Поля для подготовки текста домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white">
          📝 Подготовка текста задания
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              1. Три запроса для ИИ по формуле (КТО → ЧТО → КОГДА → КУДА → КАК проверить):
            </label>
            <textarea
              rows={3}
              value={hwDraft.threePrompts}
              onChange={(e) => setHwDraft({ ...hwDraft, threePrompts: e.target.value })}
              placeholder="Запрос 1: ...&#10;Запрос 2: ...&#10;Запрос 3: ..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              2. Пять правил безопасности при подключении ИИ к своим сервисам:
            </label>
            <textarea
              rows={3}
              value={hwDraft.fiveSecurityRules}
              onChange={(e) => setHwDraft({ ...hwDraft, fiveSecurityRules: e.target.value })}
              placeholder="1. Не отправлять токены и пароли в чат...&#10;2. Включать Available in MCP только для нужных workflow..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              3. Вывод (3–5 предложений: что быстрее — вручную или с ИИ, и что нужно проверять всегда):
            </label>
            <textarea
              rows={2}
              value={hwDraft.conclusion}
              onChange={(e) => setHwDraft({ ...hwDraft, conclusion: e.target.value })}
              placeholder="Напиши свой вывод..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <button
            onClick={handleSaveDraft}
            disabled={draftSaved}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              draftSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg'
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
            <li>Три запроса для ИИ (текст)</li>
            <li>Скриншот собранного вручную workflow (токен закрыт)</li>
            <li>Скриншот результата в Telegram</li>
            <li>Пять правил безопасности</li>
            <li>Вывод (3–5 предложений)</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>🌟 Бонус</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Составь «запрет-лист»: напиши 3 задачи, которые <strong>нельзя</strong> отдавать ИИ без проверки человеком, и объясни почему.
          </p>
        </div>
      </div>

      {/* Штатная форма сдачи домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-violet-400" />
          Сдача домашнего задания #21 в портал
        </h3>
        <InlineHomeworkSubmission lessonId={21} />
      </div>
    </div>
  );
};
