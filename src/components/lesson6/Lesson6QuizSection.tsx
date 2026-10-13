import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  RotateCcw,
  Check,
  ShieldCheck,
  Smile,
  Users
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeCharDesignerImg from '../../assets/images/lesson6_badge_char_designer_1790073992390.jpg';

export const Lesson6QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 1. Быстрое испытание (Speed Challenge) - Тест сходства 3/3
  const [consistencyChecks, setConsistencyChecks] = useState({
    hairAndEyes: false,
    outfitRecognizable: false,
    instantlyIdentified: false
  });
  const [speedCompleted, setSpeedCompleted] = useState(false);

  const handleToggleCheck = (key: keyof typeof consistencyChecks) => {
    const nextState = !consistencyChecks[key];
    const updated = { ...consistencyChecks, [key]: nextState };
    setConsistencyChecks(updated);

    if (updated.hairAndEyes && updated.outfitRecognizable && updated.instantlyIdentified && !speedCompleted) {
      setSpeedCompleted(true);
      addReward(50, '⚡ Быстрое испытание 3/3 пройдено! Твой герой максимально узнаваем! (+50 Опыта)');
    }
  };

  // 2. Финальный тест (5 вопросов из программы урока)
  const quizQuestions = [
    {
      id: 1,
      question: '1. Из каких 4 компонентов состоит канонический Паспорт персонажа?',
      options: [
        { key: 'A', text: 'Только имя и возраст' },
        { key: 'B', text: 'Внешность + Характер + История + Способность' },
        { key: 'C', text: 'Только внешность и одежда' },
        { key: 'D', text: 'Только суперспособность' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Четыре части (Внешность, Характер, История, Способность) создают цельный образ персонажа.'
    },
    {
      id: 2,
      question: '2. Как добиться того, чтобы ИИ рисовал одного и того же героя в разных сценах?',
      options: [
        { key: 'A', text: 'Каждый раз придумывать новое короткое описание' },
        { key: 'B', text: 'Использовать один и тот же подробный текст-описание внешности (референс) в каждом запросе' },
        { key: 'C', text: 'Это невозможно в 2026 году' },
        { key: 'D', text: 'Рисовать только портреты и никогда не менять фон' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Reference-приём (один и тот же точный блок внешности + новая сцена) удерживает постоянство героя.'
    },
    {
      id: 3,
      question: '3. Как показать другую эмоцию у персонажа, не потеряв его внешность?',
      options: [
        { key: 'A', text: 'Полностью переписать весь текст описания внешности' },
        { key: 'B', text: 'Оставить блок внешности неизменным, поменять только описание выражения лица и позы' },
        { key: 'C', text: 'Сгенерировать нового случайного человека' },
        { key: 'D', text: 'Нейросети не умеют менять эмоции' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Секрет прост: [Паспорт] остаётся базой, а в конец добавляется только модификатор эмоции.'
    },
    {
      id: 4,
      question: '4. Можно ли скопировать Человека-Паука или Наруто и выдать за своего маскота курса?',
      options: [
        { key: 'A', text: 'Да, если слегка перекрасить куртку' },
        { key: 'B', text: 'Нет — это чужая собственность, нужно придумать своего уникального персонажа (OC)' },
        { key: 'C', text: 'Да, в нейросетях можно брать любых героев' },
        { key: 'D', text: 'Можно, если никому не говорить' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Этический кодекс требует создавать собственного оригинального героя (OC).'
    },
    {
      id: 5,
      question: '5. Что делать, если Паспорт получился на 250 слов и ИИ путается в деталях?',
      options: [
        { key: 'A', text: 'Добавить ещё 100 слов описания' },
        { key: 'B', text: 'Оставить только 5–7 самых важных якорных признаков (правило золотых деталей)' },
        { key: 'C', text: 'Удалить весь промпт и написать одно слово' },
        { key: 'D', text: 'Писать всё заглавными буквами' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! 5–7 точных примет работают намного лучше, чем перегруженный длинный текст.'
    }
  ];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useLessonQuizPersistence(
    6,
    quizQuestions,
    answers,
    setAnswers,
    submitted,
    setSubmitted,
    setScore
  );

  const handleSelectOption = (questionId: number, key: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
  };

  const handleSubmitQuiz = () => {
    let currentScore = 0;
    quizQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Шапка раздела тестов */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Проверка знаний • Миссия 06
          </div>
          <span className="text-xs font-mono text-purple-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            Награда до +75 ОП
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Тестирование: Паспорт персонажа и Постоянство (Consistency)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Пройди скоростное испытание 3/3 на качество своего персонажа и сдай финальный тест для получения ранга CHARACTER DESIGNER (Lv.6)!
          </p>
        </div>
      </div>

      {/* ⚡ 1. БЫСТРОЕ ИСПЫТАНИЕ 3/3 */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              Уровень 5B: Быстрое испытание «3/3 Сходство»
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300">+50 ОП за 3/3</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Сравни сгенерированные кадры своего героя (портрет, полный рост, эмоция, город) и отметь совпадения:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              key: 'hairAndEyes',
              label: '1. Цвет волос и глаз одинаковый везде?',
              desc: 'Черты лица и причёска узнаются на каждом изображении'
            },
            {
              key: 'outfitRecognizable',
              label: '2. Одежда узнаваема на всех картинках?',
              desc: 'Цвет куртки, нашивка или фирменный аксессуар на месте'
            },
            {
              key: 'instantlyIdentified',
              label: '3. Ты бы сразу узнал, что это один герой?',
              desc: 'Одноклассник не перепутает его с другим персонажем'
            }
          ].map((item) => {
            const isChecked = consistencyChecks[item.key as keyof typeof consistencyChecks];
            return (
              <div
                key={item.key}
                onClick={() => handleToggleCheck(item.key as keyof typeof consistencyChecks)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isChecked
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{item.label}</span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 border ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isChecked ? '✓' : ''}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {speedCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Великолепно! 3 из 3 пунктов выполнены — твой Паспорт персонажа работает безупречно (+50 ОП)!</span>
          </div>
        )}
      </div>

      {/* 🏆 2. ФИНАЛЬНЫЙ ТЕСТ ИЗ 5 ВОПРОСОВ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-pink-400" />
            Уровень 7: Финальный тест — Ранг «CHARACTER DESIGNER»
          </h3>
          <span className="text-xs text-slate-400 font-mono">5 вопросов • +25 ОП</span>
        </div>

        <div className="space-y-5">
          {quizQuestions.map((q) => {
            const userChoice = answers[q.id];
            const isCorrect = userChoice === q.correct;

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <h4 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = userChoice === opt.key;
                    let styleClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (submitted) {
                      if (opt.key === q.correct) {
                        styleClass = 'bg-emerald-950 border-emerald-500 text-emerald-300';
                      } else if (isSelected) {
                        styleClass = 'bg-rose-950 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      styleClass = 'bg-cyan-950 border-cyan-500 text-cyan-200';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        disabled={submitted}
                        className={`w-full p-3 rounded-xl border text-xs text-left flex items-start gap-2.5 transition-all ${styleClass}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-950 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border border-slate-800">
                          {opt.key}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`p-3 rounded-xl text-xs font-mono leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950/40 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Результат теста и разблокировка бейджа */}
        {!submitted ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(answers).length < 5}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-600 hover:opacity-90 disabled:opacity-40 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            Завершить тест и открыть ранг
          </button>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-950 border border-teal-500/40 space-y-4 text-center animate-in zoom-in-95">
            <div className="flex flex-col items-center gap-3">
              <img
                src={badgeCharDesignerImg}
                alt="Значок Character Designer"
                className="w-24 h-24 rounded-full ring-4 ring-teal-500/50 shadow-2xl shadow-teal-500/30 object-cover"
              />
              <div>
                <h4 className="text-xl font-black text-white">Твой результат: {score} из 5 правильных!</h4>
                <p className="text-xs text-teal-300 font-mono mt-1">
                  {score >= 4
                    ? '🎉 Поздравляем! Ты получаешь официальный статус: CHARACTER DESIGNER (Lv.6)!'
                    : 'Хорошая попытка! Освежи шпаргалку персонажа и попробуй ещё раз.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono max-w-md mx-auto">
              🌸 AI ARTIST Lv.5 ──▶ 🦸 <strong>CHARACTER DESIGNER Lv.6</strong><br />
              Бейдж-набор «AI Creative»: 2/4 ⭐⭐
            </div>

            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Попробовать снова</span>
            </button>
          </div>
        )}
      </div>

      {/* ОФИЦИАЛЬНАЯ ФИКСАЦИЯ РЕЗУЛЬТАТОВ ТЕСТА В ПОРТАЛЕ */}
      <div className="pt-4 border-t border-slate-800">
        <InlineTestSubmission
          testId={6}
          lessonTitle="Тест №6: Дизайнер персонажей — Постоянство и Паспорт"
        />
      </div>
    </div>
  );
};
