import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  Trophy,
  Award,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson23PortfolioHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [stepChecks, setStepChecks] = useState<Record<number, boolean>>({});
  const [submitChecks, setSubmitChecks] = useState<Record<number, boolean>>({});
  const [bonusDone, setBonusDone] = useState(false);
  const [hwCompleted, setHwCompleted] = useState(false);

  const [speechText, setSpeechText] = useState('');
  const [liveDemoProjects, setLiveDemoProjects] = useState('');
  const [parentQ1, setParentQ1] = useState('');
  const [parentQ2, setParentQ2] = useState('');
  const [bonusHardestQ, setBonusHardestQ] = useState('');

  const steps = [
    '1. Дополни портфолио: добавь все недостающие проекты, обнови скриншоты, проверь ссылки.',
    '2. Создай презентацию в Gamma (8–10 слайдов): слайд 1 — название и твоё имя; слайд 2 — чему я учился(ась) на курсе; слайды 3–7 — мои лучшие проекты (скриншот + 1–2 предложения); слайд 8 — как я работаю с ИИ честно и безопасно; слайд 9 — чему научился(ась) и что хочу создать дальше; слайд 10 — спасибо.',
    '3. Напиши текст выступления на 3 минуты (структура: приветствие → какие проекты → что покажу вживую → чему научился(ась) → спасибо).',
    '4. Отрепетируй выступление перед кем-то из семьи или перед зеркалом. Засеки время: должно получиться около 3 минут.',
    '5. Подготовь запасной план: сохрани скриншоты и, по возможности, короткую запись экрана на случай, если не будет интернета.',
    '6. Проверь свой список проектов для показа вживую. Выбери 2–3 проекта, которые покажешь с экрана.',
    '7. Запиши 2 вопроса, которые могут задать родители, и придумай ответы.'
  ];

  const submitItems = [
    'Ссылка на обновлённое портфолио',
    'Презентация Gamma в PDF',
    'Текст выступления на 3 минуты',
    'Список проектов для показа вживую',
    'Запасной план (скриншоты или запись экрана)',
    '2 вопроса от «родителей» и твои ответы'
  ];

  const handleCompleteHw = () => {
    if (!hwCompleted) {
      setHwCompleted(true);
      addReward(50, '🏠 Домашнее задание Урока 23 подготовлено! (+50 ОП)');
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-200" />
          🏠 HW — Домашнее задание · Урок 23
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
          «Готовлю показ для родителей»
        </h2>
        <p className="text-white/95 text-sm sm:text-base leading-relaxed">
          <strong>⏱ Время:</strong> 40–60 минут
          <br />
          <strong>🎯 Цель:</strong> подготовиться к Уроку 24, на котором ты расскажешь о своей работе родителям.
        </p>
      </div>

      {/* ШАГИ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
          📋 Шаги выполнения
        </h3>
        <div className="space-y-2.5">
          {steps.map((item, idx) => {
            const done = !!stepChecks[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setStepChecks((p) => ({ ...p, [idx]: !p[idx] }))}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 ${
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
                  {done && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium leading-relaxed">{item}</span>
              </button>
            );
          })}
        </div>

        {/* ПОЛЯ ДЛЯ ПОДГОТОВКИ К ПОКАЗУ */}
        <div className="space-y-4 pt-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Текст выступления на 3 минуты (приветствие → какие проекты → что покажу вживую → чему научился(ась) → спасибо):
            </label>
            <textarea
              rows={3}
              value={speechText}
              onChange={(e) => setSpeechText(e.target.value)}
              placeholder="Привет! Меня зовут... За этот курс я создал(а)... Сейчас я покажу вживую..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Список проектов для показа вживую (2–3 проекта):
            </label>
            <input
              type="text"
              value={liveDemoProjects}
              onChange={(e) => setLiveDemoProjects(e.target.value)}
              placeholder="1. Моё портфолио, 2. Демо-сайт бизнеса, 3. Telegram-бот..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Вопрос №1 от «родителей» и твой ответ:
              </label>
              <input
                type="text"
                value={parentQ1}
                onChange={(e) => setParentQ1(e.target.value)}
                placeholder="Вопрос: Как ты проверял(а) то, что создал ИИ? Ответ: ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Вопрос №2 от «родителей» и твой ответ:
              </label>
              <input
                type="text"
                value={parentQ2}
                onChange={(e) => setParentQ2(e.target.value)}
                placeholder="Вопрос: Какой проект был самым интересным? Ответ: ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ЧТО СДАТЬ И БОНУС */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
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
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
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
        </div>

        <div className="rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              🌟 Бонус
            </h3>
            <p className="text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
              Попроси домашних задать тебе вопросы после репетиции и запиши, на какой вопрос было сложнее всего отвечать.
            </p>
            <input
              type="text"
              value={bonusHardestQ}
              onChange={(e) => setBonusHardestQ(e.target.value)}
              placeholder="Самый сложный вопрос от домашних..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-sm"
            />
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const next = !bonusDone;
                setBonusDone(next);
                if (next) {
                  addReward(25, '🌟 Бонус Урока 23 выполнен! (+25 ОП)');
                }
              }}
              className={`w-full p-3.5 rounded-2xl border text-left text-sm font-bold transition flex items-center justify-between ${
                bonusDone
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                  : 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700'
              }`}
            >
              <span>Бонус: репетиция с домашними и запись самого сложного вопроса</span>
              {bonusDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={handleCompleteHw}
              disabled={hwCompleted}
              className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md ${
                hwCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 cursor-default'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              {hwCompleted ? 'Домашнее задание отмечено (+50 ОП)' : 'Отметить готовность ДЗ (+50 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* PORTAL HOMEWORK SUBMISSION */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold flex items-center gap-2">
          <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          📤 Сдача домашнего задания (HW)
        </h3>
        <InlineHomeworkSubmission
          lessonId={23}
          checklistItems={[
            'Ссылка на обновлённое портфолио и презентация Gamma в PDF',
            'Текст выступления на 3 минуты и список проектов для показа вживую',
            'Запасной план (скриншоты/запись) и 2 вопроса от «родителей» с ответами'
          ]}
          extraSummaryText={`Выступление: ${speechText || '-'} | Показ вживую: ${liveDemoProjects || '-'} | Вопрос 1: ${parentQ1 || '-'} | Вопрос 2: ${parentQ2 || '-'} | Бонус: ${bonusHardestQ || '-'}`}
        />
      </div>
    </div>
  );
};
