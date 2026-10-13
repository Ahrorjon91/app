import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Trophy,
  RotateCcw,
  Zap,
  Timer,
  Users,
  Mic,
  ShieldCheck,
  CheckSquare,
  ThumbsUp,
  Activity,
  Lock,
  Rocket,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

interface DoctorSymptom {
  id: number;
  symptom: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  advice: string;
  explanation: string;
}

export const Lesson24QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // =========================================================================
  // LEVEL 5A: DOCTOR OF PRESENTATION (3 CASES, +25 EXP EACH)
  // =========================================================================
  const symptoms: DoctorSymptom[] = [
    {
      id: 1,
      symptom: 'Презентация длится 10 минут, зрители начинают зевать и отвлекаться в телефоны',
      options: [
        { id: '1a', text: 'Попросить всех убрать телефоны и читать еще быстрее', isCorrect: false },
        { id: '1b', text: 'Сократить речь до 3–5 минут: лучше коротко и ярко показать главное, чем долго и скучно', isCorrect: true },
        { id: '1c', text: 'Выключить презентацию и уйти со сцены', isCorrect: false }
      ],
      advice: 'Золотой стандарт питча: 3–5 минут!',
      explanation: 'Внимание аудитории максимально в первые 3 минуты. Сфокусируйтесь на боли, решении и живом показе.'
    },
    {
      id: 2,
      symptom: 'Спикер читает весь текст со слайда спиной к залу, не глядя в глаза гостям',
      options: [
        { id: '2a', text: 'Выучить первую и последнюю фразу наизусть, а слайды использовать только как визуальную опору', isCorrect: true },
        { id: '2b', text: 'Увеличить шрифт на слайде до максимума', isCorrect: false },
        { id: '2c', text: 'Закрыть глаза во время выступления', isCorrect: false }
      ],
      advice: 'Зрительный контакт создает магию доверия!',
      explanation: 'Люди пришли слушать вас, а не читать текст со стены. Первая фраза наизусть мгновенно снимает стартовый страх.'
    },
    {
      id: 3,
      symptom: 'Студент пытается за 4 минуты поверхностно перечислить все 5 проектов курса',
      options: [
        { id: '3a', text: 'Говорить со скоростью рэпера', isCorrect: false },
        { id: '3b', text: 'Выбрать 2–3 самых любимых проекта и показать их глубоко и с душой', isCorrect: true },
        { id: '3c', text: 'Показать только иконки проектов', isCorrect: false }
      ],
      advice: 'Глубина ценнее беглого перечисления!',
      explanation: 'Один или два проекта, показанные в живом действии с горящими глазами, производят в 10 раз большее впечатление.'
    }
  ];

  const [symptomAnswers, setSymptomAnswers] = useState<Record<number, string>>({});
  const [symptomSolved, setSymptomSolved] = useState<Record<number, boolean>>({});

  const handleSymptomSelect = (sId: number, optId: string, isCorrect: boolean) => {
    setSymptomAnswers(prev => ({ ...prev, [sId]: optId }));
    if (isCorrect && !symptomSolved[sId]) {
      setSymptomSolved(prev => ({ ...prev, [sId]: true }));
      addReward(25, `🩺 Совет Доктора Презентации №${sId} применен верно! (+25 ОП)`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // =========================================================================
  // LEVEL 5B: FUN FINAL QUIZ (THE WHOLE COURSE IN 6 QUESTIONS, +50 EXP)
  // =========================================================================
  const funQuestions = [
    {
      id: 1,
      q: '1. Какая универсальная формула нужна, чтобы ИИ понял твою задачу с первого раза?',
      options: [
        'Role + Goal + Context + Constraints + Output (Роль + Цель + Контекст + Ограничения + Формат)',
        'Просто написать «Сделай красиво и быстро»',
        'Скопировать текст из Википедии'
      ],
      correctIndex: 0
    },
    {
      id: 2,
      q: '2. Как в индустрии называется первая рабочая, простая версия цифрового продукта?',
      options: [
        'МРП / MVP (Minimum Viable Product)',
        'Черновик на салфетке',
        'Финальный монолит'
      ],
      correctIndex: 0
    },
    {
      id: 3,
      q: '3. Как называется эффект, когда веб-сайт рассказывает увлекательную историю по мере прокрутки экрана?',
      options: [
        'Scrollytelling (Скрорителлинг)',
        'Бесконечный спам',
        'Паралич прокрутки'
      ],
      correctIndex: 0
    },
    {
      id: 4,
      q: '4. Что нужно ВСЕГДА делать перед тем, как поверить важному факту от искусственного интеллекта?',
      options: [
        'Проверить в независимом авторитетном источнике (Fact-Check)',
        'Спросить у того же ИИ: «Ты точно не врешь?»',
        'Сразу опубликовать в чат'
      ],
      correctIndex: 0
    },
    {
      id: 5,
      q: '5. Как называется ИИ, который не просто отвечает текстом, а сам планирует и выполняет цепочку действий?',
      options: [
        'Автономный AI-агент (Agent)',
        'Обычный поисковик',
        'Калькулятор'
      ],
      correctIndex: 0
    },
    {
      id: 6,
      q: '6. Главный закон и девиз всего курса AI for LIFE — что важнее ответа нейросети?',
      options: [
        'GENERATE ≠ FINISHED — ценность создает твоя проверка, мысль и улучшение!',
        'ИИ всегда прав',
        'Чем быстрее нажал кнопку, тем лучше'
      ],
      correctIndex: 0
    }
  ];

  const [funAnswers, setFunAnswers] = useState<Record<number, number>>({});
  const [funSubmitted, setFunSubmitted] = useState(false);
  const [funScore, setFunScore] = useState(0);

  useLessonQuizPersistence(
    24,
    funQuestions,
    funAnswers,
    setFunAnswers,
    funSubmitted,
    setFunSubmitted,
    setFunScore
  );

  const handleSelectFun = (qId: number, idx: number) => {
    if (funSubmitted) return;
    setFunAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const handleFinishFunQuiz = () => {
    let score = 0;
    funQuestions.forEach(q => {
      if (funAnswers[q.id] === q.correctIndex) score += 1;
    });
    setFunScore(score);
    setFunSubmitted(true);
    if (score === 6) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    }
  };

  // =========================================================================
  // LEVEL 6: DEMO DAY MAIN EVENT EXP TRACKER (UP TO +250 EXP)
  // =========================================================================
  const [demoDayActions, setDemoDayActions] = useState({
    spokeOnStage: false,
    keptTiming: false,
    showedTwoLive: false,
    answeredQuestions: false,
    supportedOthers: false,
    askedGoodQuestion: false
  });

  const toggleDemoAction = (k: keyof typeof demoDayActions, expVal: number, title: string) => {
    const nextVal = !demoDayActions[k];
    setDemoDayActions(prev => ({ ...prev, [k]: nextVal }));
    if (nextVal) {
      addReward(expVal, `🎤 Demo Day: ${title} (+${expVal} ОП)`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px] font-bold">
                ПРОВЕРКА И ПРАЗДНИК
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono text-[11px] font-bold">
                Уровни 5–6
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Проверка Знаний: Доктор Презентации, Fun Quiz и Demo Day
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Устраните последние ошибки выступления, пройдите праздничный викторинный марафон и зарабатывайте опыт прямо во время живых защит!
        </p>
      </div>

      {/* LEVEL 5A: DOCTOR OF PRESENTATION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Уровень 5A: Доктор Презентации (3 Симптома волнения)
            </h3>
            <p className="text-xs text-slate-400">
              Поставьте диагноз частым ошибкам оратора (+25 ОП за каждый верный рецепт)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {symptoms.map(s => {
            const chosen = symptomAnswers[s.id];
            const isSolved = symptomSolved[s.id];
            return (
              <div key={s.id} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 font-mono text-xs flex items-center justify-center">
                      {s.id}
                    </span>
                    <span>Симптом: {s.symptom}</span>
                  </span>
                  {isSolved && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> ВЫЛЕЧЕНО (+25 ОП)
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {s.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSymptomSelect(s.id, opt.id, opt.isCorrect)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                        chosen === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-mono text-slate-400 mt-0.5">{opt.id.slice(1)})</span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  ))}
                </div>

                {isSolved && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 text-xs">
                    <strong>{s.advice}</strong> {s.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LEVEL 5B: FUN FINAL QUIZ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Уровень 5B: Fun Final Quiz — Весь курс за 5 минут!
              </h3>
              <p className="text-xs text-slate-400">
                Это не строгий экзамен, а праздничное воспоминание ключевых открытий (+50 ОП за 6/6)
              </p>
            </div>
          </div>

          {funSubmitted && (
            <div className="px-3.5 py-1 rounded-xl bg-amber-950 border border-amber-800 text-amber-300 font-mono text-xs font-bold">
              Результат: {funScore} из 6
            </div>
          )}
        </div>

        <div className="space-y-4">
          {funQuestions.map(item => {
            const chosen = funAnswers[item.id];
            return (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="text-xs sm:text-sm font-bold text-white">{item.q}</div>
                <div className="space-y-1.5">
                  {item.options.map((opt, i) => {
                    const isSelected = chosen === i;
                    return (
                      <button
                        key={i}
                        disabled={funSubmitted}
                        onClick={() => handleSelectFun(item.id, i)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                          funSubmitted
                            ? i === item.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : isSelected
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!funSubmitted && (
          <div className="flex justify-end">
            <button
              onClick={handleFinishFunQuiz}
              disabled={Object.keys(funAnswers).length < 6}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              Проверить ответы (+50 ОП)
            </button>
          </div>
        )}
      </div>

      {/* LEVEL 6: DEMO DAY MAIN EVENT EXP TRACKER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Уровень 6: DEMO DAY — Главное Событие (до +250 ОП)
              </h3>
              <p className="text-xs text-slate-400">
                Отмечайте достижения прямо во время выступлений в классе
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            { id: 'spokeOnStage' as const, exp: 100, label: '🎤 Вышел(ла) на сцену и защитил(а) проект (+100 ОП)' },
            { id: 'keptTiming' as const, exp: 25, label: '⏱️ Уложился(лась) в регламент 3–5 минут (+25 ОП)' },
            { id: 'showedTwoLive' as const, exp: 50, label: '🌐 Показал(а) минимум 2 проекта вживую по ссылке (+50 ОП)' },
            { id: 'answeredQuestions' as const, exp: 25, label: '💡 Честно и уверенно ответил(а) на вопрос гостя (+25 ОП)' },
            { id: 'supportedOthers' as const, exp: 25, label: '👏 Поддержал(а) аплодисментами одногруппников (+25 ОП)' },
            { id: 'askedGoodQuestion' as const, exp: 25, label: '🙋 Задал(а) глубокий вопрос другому спикеру (+25 ОП)' }
          ].map(action => {
            const isDone = demoDayActions[action.id];
            return (
              <div
                key={action.id}
                onClick={() => toggleDemoAction(action.id, action.exp, action.label)}
                className={`p-4 rounded-2xl border text-xs cursor-pointer flex items-center gap-3 transition-all ${
                  isDone
                    ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="font-medium leading-relaxed">{action.label}</span>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong>Каждый, кто вышел на сцену сегодня — уже победитель!</strong> Это не соревнование за «лучший проект», а праздник того, что построил каждый из вас.
          </span>
        </div>
      </div>
    </div>
  );
};
