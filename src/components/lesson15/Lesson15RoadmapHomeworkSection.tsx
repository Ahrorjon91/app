import React from 'react';
import {
  CheckCircle2
} from 'lucide-react';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson15RoadmapHomeworkSection: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header / Information Block */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-orange-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🏠 HW — ДОМАШНЕЕ ЗАДАНИЕ · УРОК 15
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            ⏱ Время: 30–40 минут
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          «Мой сайт — моя версия»
        </h2>

        <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/30 space-y-1">
          <span className="text-xs font-mono uppercase text-orange-300 font-bold">🎯 Цель</span>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Закрепить запуск и публикацию, сделав сайт чуть более личным.
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
            <div>
              Открой свой проект в Antigravity IDE и запусти: <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">npm run dev</code>.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="space-y-1">
              <div><strong>Внеси 3 изменения вручную:</strong></div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>поменяй текст заголовка;</li>
                <li>поменяй цвет одной кнопки или блока;</li>
                <li>поменяй одну картинку или надпись.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div>Проверь результат в браузере.</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div className="space-y-1">
              <div>Сохрани изменения в Git (любым способом):</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li>🖱️ кнопками: Source Control → сообщение → <em>Commit</em> → <em>Sync Changes</em>;</li>
                <li>
                  ⌨️ командами: <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git add .</code> → <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git commit -m "Домашка: мои изменения"</code> → <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git push</code>.
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              5
            </span>
            <div>Дождись, пока сайт обновится (Vercel/GitHub Pages обновят его сами).</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-400/40 text-orange-300 font-black text-xs flex items-center justify-center shrink-0">
              6
            </span>
            <div>Открой опубликованную ссылку и проверь изменения.</div>
          </div>
        </div>

        {/* ✅ Что сдать */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
          <h4 className="text-base font-black text-emerald-300">✅ Что сдать</h4>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-1.5">
            <li>Ссылка на обновлённый сайт</li>
            <li>Ссылка на репозиторий GitHub</li>
            <li>2–3 предложения: <em>что я изменил и что было самым сложным</em></li>
          </ul>
        </div>
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={15}
        lessonTitle="Домашнее задание #15: «Мой сайт — моя версия»"
        rewardExp={100}
      />
    </div>
  );
};
