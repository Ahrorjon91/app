import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Trophy,
  Bug
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson23PortfolioLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [partAChecks, setPartAChecks] = useState<Record<number, boolean>>({});
  const [partBChecks, setPartBChecks] = useState<Record<number, boolean>>({});
  const [partCChecks, setPartCChecks] = useState<Record<number, boolean>>({});
  const [partDChecks, setPartDChecks] = useState<Record<number, boolean>>({});
  const [detectiveChecks, setDetectiveChecks] = useState<Record<number, boolean>>({});
  const [submitChecks, setSubmitChecks] = useState<Record<number, boolean>>({});
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const [projectsSummary, setProjectsSummary] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [fixesNote, setFixesNote] = useState('');

  const blitzQuestions = [
    '1. Что такое промпт и из каких частей состоит хороший запрос?',
    '2. Чем HTML, CSS и JavaScript отличаются друг от друга?',
    '3. Для чего нужны Git и GitHub?',
    '4. Что делает команда npm install?',
    '5. Как сайт попадает в интернет через GitHub и Vercel?',
    '6. Что такое триггер в n8n?',
    '7. Почему токен Telegram-бота нужно хранить в секрете?',
    '8. Что такое MCP простыми словами?',
    '9. Что делает NotebookLM, а что Gamma?',
    '10. Какие три правила честной работы с ИИ ты запомнил(а)?'
  ];

  const partBItems = [
    '1. Заполни Паспорт проекта для каждого проекта из списка (минимум 4).',
    '2. Сделай скриншот каждого проекта (для бота и n8n скриншот workflow без токена).',
    '3. Проверь, что ссылки открываются.',
    '4. Напиши по формуле «что это → как работает → чему научился».'
  ];

  const partCItems = [
    '1. Открой Google AI Studio (Build → веб-приложение).',
    '2. Заполни промпт для портфолио (раздел 6 лекции) данными из паспортов.',
    '3. Вставь промпт и дождись первой версии.',
    '4. Проверь сайт в предпросмотре.',
    '5. Отправь 1–2 follow-up-промпта (премиум-эффекты, телефон, понятность).',
    '6. Проверь, что ссылки в карточках проектов совпадают с твоими паспортами.',
    '7. Скачай проект, открой в Antigravity IDE, запусти npm install и npm run dev.'
  ];

  const partDItems = [
    '1. Сохрани проект в Git (кнопками или командами).',
    '2. Отправь на GitHub в новый репозиторий (например, my-portfolio).',
    '3. Создай файл README.md (образец в разделе 9 лекции).',
    '4. Опубликуй на Vercel и получи ссылку.',
    '5. Открой ссылку на телефоне.'
  ];

  const detectiveItems = [
    'Есть ли ссылка, которая не открывается или ведёт не туда?',
    'Нет ли личных данных на сайте?',
    'Совпадают ли названия проектов с реальностью?',
    'Помещается ли текст на телефоне?'
  ];

  const submitItems = [
    'Список проектов и 4+ заполненных «Паспорта проектов»',
    'Ссылка на опубликованное портфолио',
    'Ссылка на репозиторий GitHub (с README)',
    'Скриншот портфолио на телефоне',
    'Заполненный чек-лист проверки'
  ];

  const handleClaimLabReward = () => {
    if (!rewardClaimed) {
      setRewardClaimed(true);
      addReward(50, '🧪 Лабораторная работа Урока 23 выполнена! (+50 ОП)');
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* LAB HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-200" />
          🧪 LABS — Лабораторная работа · Урок 23
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
          «Собираю портфолио»
        </h2>
        <p className="text-white/95 text-sm sm:text-base leading-relaxed">
          <strong>⏱ Время:</strong> 40 минут · <strong>🧰 Нужно:</strong> список твоих проектов, браузер, GitHub, Vercel, Antigravity IDE
        </p>
      </div>

      {/* ЧАСТЬ A */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
          ✅ Часть A. Блиц-повторение и сбор проектов (8 минут)
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <strong>Блиц (устно или в парах):</strong> ответь на вопросы по памяти.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {blitzQuestions.map((item, idx) => {
            const done = !!partAChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setPartAChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs sm:text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-sm text-amber-950 dark:text-amber-200">
          <strong>Затем:</strong> составь <strong>список всех своих проектов</strong> (минимум 4) и запиши рядом, где он лежит (ссылка, GitHub, скриншот).
        </div>
      </div>

      {/* ЧАСТЬ B */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
          ✅ Часть B. «Паспорта проектов» (10 минут)
        </h3>
        <div className="space-y-2.5">
          {partBItems.map((item, idx) => {
            const done = !!partBChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setPartBChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-sm text-emerald-900 dark:text-emerald-200">
          <strong>✅ Результат:</strong> минимум 4 заполненных паспорта и папка со скриншотами.
        </div>
      </div>

      {/* ЧАСТЬ C */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
          ✅ Часть C. Создаю портфолио-сайт (15 минут)
        </h3>
        <div className="space-y-2.5">
          {partCItems.map((item, idx) => {
            const done = !!partCChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setPartCChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-sm text-emerald-900 dark:text-emerald-200">
          <strong>✅ Результат:</strong> портфолио-сайт, который открывается локально.
        </div>
      </div>

      {/* ЧАСТЬ D */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
          ✅ Часть D. Публикация (7 минут)
        </h3>
        <div className="space-y-2.5">
          {partDItems.map((item, idx) => {
            const done = !!partDChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setPartDChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-sm text-emerald-900 dark:text-emerald-200">
          <strong>✅ Результат:</strong> живая ссылка на портфолио и репозиторий GitHub.
        </div>
      </div>

      {/* МИНИ-ДЕТЕКТИВ */}
      <div className="rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <Bug className="w-5 h-5 text-amber-600" />
          🐞 Мини-детектив (5 минут)
        </h3>
        <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
          Пройди <strong>чек-лист пользователя</strong> (раздел 10 лекции). Найди и исправь <strong>минимум 2 проблемы</strong>:
        </p>
        <div className="space-y-2.5">
          {detectiveItems.map((item, idx) => {
            const done = !!detectiveChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setDetectiveChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-100/80 dark:bg-emerald-950/50 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                    : 'bg-white/80 dark:bg-slate-900/70 border-amber-200 dark:border-amber-800/60'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-amber-500'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>

        {/* ПОЛЯ ДЛЯ ЗАПИСИ ОТВЕТА */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Ссылка на опубликованное портфолио (Vercel):
            </label>
            <input
              type="text"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://my-portfolio.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Ссылка на репозиторий GitHub (с README):
            </label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/my-portfolio"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Список твоих 4+ проектов и паспортов:
            </label>
            <input
              type="text"
              value={projectsSummary}
              onChange={(e) => setProjectsSummary(e.target.value)}
              placeholder="1. Сайт... 2. Бот... 3. Приложение... 4. Автоматизация..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Мини-детектив: какие 2 проблемы нашёл(ла) и исправил(а)?
            </label>
            <input
              type="text"
              value={fixesNote}
              onChange={(e) => setFixesNote(e.target.value)}
              placeholder="Например: исправил ссылку на GitHub и размер кнопок на телефоне..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ЧТО СДАТЬ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
          ✅ Что сдать
        </h3>
        <div className="space-y-2.5">
          {submitItems.map((item, idx) => {
            const done = !!submitChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSubmitChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  done
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 ${
                    done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                  }`}
                >
                  {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium">{item}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleClaimLabReward}
            disabled={rewardClaimed}
            className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition shadow-md ${
              rewardClaimed
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {rewardClaimed ? 'Лабораторная отмечена (+50 ОП)' : 'Отметить выполнение LABS (+50 ОП)'}
          </button>
        </div>
      </div>

      {/* PORTAL LAB SUBMISSION */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold flex items-center gap-2">
          <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          📤 Отправка лабораторной работы (LABS)
        </h3>
        <InlineLabSubmission
          lessonId={23}
          checklistItems={[
            '4+ Паспорта проектов',
            'Ссылка на опубликованное портфолио',
            'Ссылка на репозиторий GitHub (с README)',
            'Скриншот на телефоне и чек-лист проверки'
          ]}
          extraSummaryText={`Портфолио: ${portfolioUrl || '-'} | GitHub: ${githubUrl || '-'} | Проекты: ${projectsSummary || '-'} | Исправления: ${fixesNote || '-'}`}
        />
      </div>
    </div>
  );
};
