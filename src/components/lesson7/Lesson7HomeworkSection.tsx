import React, { useState } from 'react';
import {
  BookOpen,
  Bug,
  Check,
  Code2,
  Copy,
  Download,
  FileText,
  FolderOpen,
  HardDrive,
  Layers,
  Sparkles
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson7HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [projectFolderName, setProjectFolderName] = useState('tesla-modelx-landing');
  const [filesVerified, setFilesVerified] = useState(true);
  const [sectionsVerified, setSectionsVerified] = useState(true);
  const [footerVerified, setFooterVerified] = useState(true);
  const [localBrowserTested, setLocalBrowserTested] = useState(true);

  const [debugNotes, setDebugNotes] = useState(
    'С помощью промпта "Find the bug. Explain what caused it. Fix only the necessary code." я исправил 4 бага: несовпадающий ID кнопки Order Now (broken button), съехавшую CSS Grid сетку характеристик (wrong CSS), битую ссылку на фото Model X (missing image) и ошибку querySelectorAll в script.js (JavaScript error).'
  );

  const [vibeSynthesisNotes, setVibeSynthesisNotes] = useState(
    'В Уроке 5 я создал UX/UI макет Tesla Model X в Google Stitch («Сначала дизайн. Потом код.»). В Уроке 6 изучил 3 отдела сайта (HTML, CSS, JS). А в Уроке 7 объединил их в Google AI Studio Build Mode и запустил готовый сайт локально на своём ПК!'
  );

  const [copiedReport, setCopiedReport] = useState(false);
  const [hwSaved, setHwSaved] = useState(false);

  const buildHomeworkReport = () => {
    return `ДОМАШНИЙ ОТЧЁТ К УРОКУ 7: 🏗️ WEBSITE CONTROL CENTER — HTML + CSS + JAVASCRIPT
Папка проекта на ПК: ${projectFolderName}

1. Проверка архитектуры и локального запуска:
   - Файлы index.html, style.css, script.js найдены и связаны: ${filesVerified ? 'Да' : 'В работе'}
   - 6 секций (Vehicles, Energy, Charging, Semi, Discover, Shop): ${sectionsVerified ? 'Да' : 'В работе'}
   - Канонический Footer (Tesla © 2026 + 7 ссылок): ${footerVerified ? 'Да' : 'В работе'}
   - Экспорт ZIP и запуск на локальном ПК: ${localBrowserTested ? 'Успешно работает!' : 'В процессе'}

2. Отчёт по DEBUG CHALLENGE (4 бага):
   ${debugNotes}

3. Синтез Уроков 5 + 6 + 7 (Старт Vibe Coding):
   ${vibeSynthesisNotes}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(buildHomeworkReport());
    setCopiedReport(true);
    addReward(15, '📋 Отчёт домашней работы Урока 7 скопирован! (+15 XP)');
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleSaveHomework = () => {
    setHwSaved(true);
    addReward(35, '🌟 Домашнее задание Урока 7 сохранено! (+35 XP)');
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* HEADER */}
      <div className="p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-widest">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>ДОМАШНЕЕ ЗАДАНИЕ УРОКА 7 · VIBE CODING НА ЛОКАЛЬНОМ ПК</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            4. Домашнее задание: Экспорт сайта Tesla Model X на ПК + Отчёт DEBUG CHALLENGE
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Скачай исходный код своего лендинга Tesla Model X из Google AI Studio, запусти его на домашнем компьютере и зафиксируй результаты отладки 4 багов.
          </p>
        </div>
        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-cyan-500 text-slate-950 tracking-wider shadow-lg">
          +50 XP
        </span>
      </div>

      {/* CHECKLIST: LOCAL PC & TESLA MODEL X */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">
            💻 Чек-лист запуска проекта на локальном компьютере
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-semibold">
              Название распакованной папки проекта на твоём ПК:
            </label>
            <input
              type="text"
              value={projectFolderName}
              onChange={(e) => setProjectFolderName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={filesVerified}
                onChange={(e) => setFilesVerified(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Найдены и проверены 3 файла: index.html, style.css, script.js</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={sectionsVerified}
                onChange={(e) => setSectionsVerified(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Собраны все 6 секций (Vehicles, Energy, Charging, Semi, Discover, Shop)</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={footerVerified}
                onChange={(e) => setFooterVerified(e.target.checked)}
                className="rounded accent-cyan-400"
              />
              <span>Добавлен Footer: Tesla © 2026, Privacy & Legal, Vehicle Recalls и др.</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950 border border-emerald-500/40 cursor-pointer">
              <input
                type="checkbox"
                checked={localBrowserTested}
                onChange={(e) => setLocalBrowserTested(e.target.checked)}
                className="rounded accent-emerald-400"
              />
              <span className="text-emerald-300 font-semibold">
                ZIP распакован, index.html успешно открывается и работает на ПК!
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* DEBUG CHALLENGE & SYNTHESIS NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl border border-rose-500/30 bg-slate-900/90 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <Bug className="w-4 h-4" />
            <span>Отчёт по DEBUG CHALLENGE (4 бага)</span>
          </div>
          <p className="text-xs text-slate-400">
            Опиши, какие ошибки ИИ нашёл и объяснил по запросу «Find the bug. Explain what caused it. Fix only the necessary code.»:
          </p>
          <textarea
            rows={4}
            value={debugNotes}
            onChange={(e) => setDebugNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-400 resize-none leading-relaxed"
          />
        </div>

        <div className="p-5 rounded-3xl border border-indigo-500/30 bg-slate-900/90 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Дневник Вайб-Кодера (Урок 5 + Урок 6 + Урок 7)</span>
          </div>
          <p className="text-xs text-slate-400">
            Как связка Google Stitch (UI) + 3 отдела (HTML/CSS/JS) + Google AI Studio помогла тебе создать настоящий сайт:
          </p>
          <textarea
            rows={4}
            value={vibeSynthesisNotes}
            onChange={(e) => setVibeSynthesisNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-400 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={handleCopyReport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
        >
          {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedReport ? 'Отчёт скопирован!' : 'Скопировать отчёт ДЗ'}</span>
        </button>

        <button
          onClick={handleSaveHomework}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            hwSaved
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{hwSaved ? 'Домашка зафиксирована (+35 XP)' : 'Зафиксировать выполнение'}</span>
        </button>
      </div>

      {/* OFFICIAL HOMEWORK SUBMISSION */}
      <div className="pt-2 border-t border-slate-800">
        <InlineHomeworkSubmission
          homeworkId={7}
          lessonId={7}
          lessonTitle="Домашнее задание #7: 🏗️ Website Control Center — HTML + CSS + JavaScript (Tesla Model X)"
        />
      </div>
    </div>
  );
};
