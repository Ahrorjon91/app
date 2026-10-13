import React, { useState } from 'react';
import {
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson15RoadmapLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [labSteps, setLabSteps] = useState<Record<number, boolean>>({});
  const [startFrameUrl, setStartFrameUrl] = useState('');
  const [endFrameUrl, setEndFrameUrl] = useState('');
  const [gifOrFolderReady, setGifOrFolderReady] = useState(true);
  const [labSubmitted, setLabSubmitted] = useState(false);

  const toggleStep = (stepNum: number) => {
    const next = { ...labSteps, [stepNum]: !labSteps[stepNum] };
    setLabSteps(next);
    if (Object.values(next).filter(Boolean).length >= 4) {
      if (markLabTaskCompleted) markLabTaskCompleted('15', 't15_1');
    }
  };

  const handleSubmitLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (labSubmitted) return;
    setLabSubmitted(true);
    addReward(150, '🏆 Урок 15: Лабораторная работа «Запускаю сайт сам: от терминала до интернета» выполнена! (+150 ОП)');
    if (markLabTaskCompleted) {
      markLabTaskCompleted('15', 't15_1');
      markLabTaskCompleted('15', 't15_2');
      markLabTaskCompleted('15', 't15_3');
    }
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header / Information Block */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🧪 LABS — ЛАБОРАТОРНАЯ РАБОТА · УРОК 15
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            ⏱ Время: 40 минут · 🚫 Без помощи ИИ
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          «Запускаю сайт сам: от терминала до интернета»
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-1">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold">🎯 Цель</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              Вручную запустить сайт из Google AI Studio локально и опубликовать его.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">🧰 Нужно</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              Antigravity IDE, Node.js, Git, аккаунт GitHub, ZIP-архив сайта.
            </p>
          </div>
        </div>
      </div>

      {/* Шаги (1-11) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          <span>Шаги лабораторной работы:</span>
        </h3>

        <div className="space-y-3">
          {[
            {
              num: 1,
              content: (
                <>
                  <strong>Распакуй</strong> ZIP-архив в папку <code className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">my-site</code>.
                </>
              )
            },
            {
              num: 2,
              content: (
                <>
                  <strong>Открой</strong> папку в Antigravity IDE (<em>File → Open Folder</em>).
                </>
              )
            },
            {
              num: 3,
              content: (
                <>
                  <strong>Открой терминал</strong> (<em>Terminal → New Terminal</em>).
                </>
              )
            },
            {
              num: 4,
              content: (
                <>
                  <strong>Проверь инструменты:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">node -v</code>, <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">npm -v</code>, <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git --version</code>.
                </>
              )
            },
            {
              num: 5,
              content: (
                <>
                  <strong>Установи зависимости:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">npm install</code>.
                </>
              )
            },
            {
              num: 6,
              content: (
                <>
                  <strong>Запусти сайт:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">npm run dev</code> и открой ссылку <code className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">localhost</code>.
                </>
              )
            },
            {
              num: 7,
              content: (
                <>
                  <strong>Измени заголовок</strong> на своё имя, сохрани (Ctrl + S) и проверь в браузере.
                </>
              )
            },
            {
              num: 8,
              content: (
                <>
                  <strong>Собери проект:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">npm run build</code>.
                </>
              )
            },
            {
              num: 9,
              content: (
                <div className="space-y-1">
                  <div>
                    <strong>Сохрани в Git</strong> одним из способов:
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1 pl-2">
                    <li>🖱️ кнопками: Source Control → <em>Initialize Repository</em> → сообщение → <em>Commit</em>;</li>
                    <li>
                      ⌨️ командами: <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git init</code> → <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git add .</code> → <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git commit -m "Моя лаба"</code>.
                    </li>
                  </ul>
                </div>
              )
            },
            {
              num: 10,
              content: (
                <div className="space-y-1">
                  <div>
                    <strong>Отправь на GitHub</strong> одним из способов:
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1 pl-2">
                    <li>🖱️ кнопками: <em>Publish Branch</em> → <em>Public repository</em> → войти в GitHub;</li>
                    <li>
                      ⌨️ командами: создай пустой репозиторий, затем <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git remote add origin ...</code> и <code className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono">git push -u origin main</code>.
                    </li>
                  </ul>
                </div>
              )
            },
            {
              num: 11,
              content: (
                <>
                  <strong>Опубликуй</strong> через Vercel или GitHub Pages.
                </>
              )
            }
          ].map(item => {
            const checked = !!labSteps[item.num];
            return (
              <div
                key={item.num}
                onClick={() => toggleStep(item.num)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  checked
                    ? 'bg-emerald-950/30 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                  <span className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="leading-relaxed">{item.content}</div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                    checked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {checked ? '✓ Выполнено' : 'Отметить'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Что сдать и Подсказка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <h4 className="text-base font-black text-emerald-300">✅ Что сдать</h4>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-1.5">
              <li>Скриншот сайта на <code className="text-cyan-300 font-mono">localhost</code> с твоим именем в заголовке</li>
              <li>Ссылка на репозиторий GitHub</li>
              <li>Ссылка на опубликованный сайт</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
            <h4 className="text-base font-black text-amber-300">💡 Подсказка</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Если ошибка, прочитай последние строки терминала, проверь, что ты в нужной папке (<code className="text-amber-300 font-mono">pwd</code>, <code className="text-amber-300 font-mono">ls</code>), и запусти заново.
            </p>
          </div>
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={15}
        labId={15}
        labTitle="Лабораторная работа #15: «Запускаю сайт сам: от терминала до интернета»"
        rewardExp={100}
      />
    </div>
  );
};
