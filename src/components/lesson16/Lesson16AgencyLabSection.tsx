import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Bug
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson16AgencyLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [businessNameCity, setBusinessNameCity] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [ownerMessage, setOwnerMessage] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const totalChecked = Object.values(stepChecked).filter(Boolean).length;

  const toggleStep = (step: number) => {
    const next = { ...stepChecked, [step]: !stepChecked[step] };
    setStepChecked(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 11) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(50, '🎉 Все 11 шагов создания демо-сайта для бизнеса выполнены! (+50 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('16', 't16_1');
    }
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveUrl.trim() || isPublished) return;
    setIsPublished(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
    addReward(100, '🚀 Демо-сайт для местного бизнеса опубликован! (+100 ОП)');
    if (markLabTaskCompleted) {
      markLabTaskCompleted('16', 't16_2');
      markLabTaskCompleted('16', 't16_3');
    }
  };

  const stepsList = [
    {
      num: 1,
      title: '1. Найди нишу.',
      desc: 'В Google Maps найди 3–5 бизнесов одного типа (например, салоны красоты) в своём городе.'
    },
    {
      num: 2,
      title: '2. Выбери один бизнес со слабым или отсутствующим сайтом.',
      desc: 'Запиши: название, тип, город, телефон, адрес (только из открытых данных).'
    },
    {
      num: 3,
      title: '3. Заполни мастер-промпт (раздел 4) своими данными.',
      desc: 'Если данных нет, удали строку, ничего не выдумывай.'
    },
    {
      num: 4,
      title: '4. Создай сайт в Google AI Studio (Pro-модель).',
      desc: 'Проверь, что кнопки «Позвонить» и WhatsApp есть.'
    },
    {
      num: 5,
      title: '5. Улучши сайт хотя бы одним дополнением:',
      desc: 'Реальные картинки (свои или разрешённые) или премиум-дизайн.'
    },
    {
      num: 6,
      title: '6. Скачай ZIP и открой проект в Antigravity IDE.',
      desc: 'Распакуй архив и открой папку через File → Open Folder.'
    },
    {
      num: 7,
      title: '7. Запусти локально: npm install → npm run dev.',
      desc: 'Проверь на компьютере и в режиме телефона (F12 → значок телефона).'
    },
    {
      num: 8,
      title: '8. Измени вручную один текст (например, заголовок) и сохрани.',
      desc: 'Проверь обновление в браузере (Ctrl + S).'
    },
    {
      num: 9,
      title: '9. Сохрани в Git и отправь на GitHub (кнопками или командами).',
      desc: 'Сделай Commit и опубликуй репозиторий.'
    },
    {
      num: 10,
      title: '10. Опубликуй на Vercel и получи ссылку.',
      desc: 'Подключи репозиторий на vercel.com и нажми Deploy.'
    },
    {
      num: 11,
      title: '11. Напиши сообщение владельцу бизнеса (текст из раздела 8).',
      desc: 'Не отправляй реальному бизнесу без разрешения преподавателя и родителей.'
    }
  ];

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🧪 LABS — ЛАБОРАТОРНАЯ РАБОТА · УРОК 16
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            ⏱ Время: 40 минут · Выполнено: {totalChecked} / 11
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          «Мой первый демо-сайт для местного бизнеса»
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-1">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold">🎯 Цель</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              Создать и опубликовать демо-сайт для одного местного бизнеса и подготовить вежливое сообщение.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-300 font-bold">🧰 Нужно</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              Google Maps, Google AI Studio, Antigravity IDE, Git, GitHub, Vercel.
            </p>
          </div>
        </div>
      </div>

      {/* Шаги (1-11) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <span>Шаги лабораторной работы (11 шагов):</span>
          </h3>
          <span className="text-xs font-mono text-indigo-300">{totalChecked}/11</span>
        </div>

        <div className="space-y-3">
          {stepsList.map(item => {
            const done = !!stepChecked[item.num];
            return (
              <div
                key={item.num}
                onClick={() => toggleStep(item.num)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  done
                    ? 'bg-emerald-950/30 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-black text-white">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                    done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {done ? '✓' : '☐'}
                </span>
              </div>
            );
          })}
        </div>

        {/* ✅ Что сдать & 🐞 Мини-детектив (5 минут) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <h4 className="text-base font-black text-emerald-300">✅ Что сдать</h4>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-1.5">
              <li>Название выбранного бизнеса и город</li>
              <li>Скриншот сайта (компьютер + телефон)</li>
              <li>Ссылка на GitHub</li>
              <li>Ссылка на опубликованный сайт</li>
              <li>Текст сообщения владельцу (не отправленный или одобренный преподавателем)</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
            <h4 className="text-base font-black text-amber-300 flex items-center gap-2">
              <Bug className="w-4 h-4" /> 🐞 Мини-детектив (5 минут)
            </h4>
            <p className="text-xs text-slate-300">
              Найди и исправь <strong>минимум 2 проблемы</strong> в своём сайте:
            </p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-1">
              <li>Кнопка «Позвонить» не работает?</li>
              <li>Текст не помещается на телефоне?</li>
              <li>Есть выдуманные факты, которых нет в данных бизнеса?</li>
              <li>Картинка обрезана или слишком тяжёлая?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={16}
        labId={16}
        labTitle="Лабораторная работа #16: «Мой первый демо-сайт для местного бизнеса»"
        rewardExp={100}
      />
    </div>
  );
};
