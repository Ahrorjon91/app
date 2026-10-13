import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Stethoscope,
  Zap,
  Award,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Timer,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeVibeCoderImg from '../../assets/images/lesson9_badge_vibe_coder_1790077625829.jpg';

export const Lesson9QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==================== LEVEL 5A: DOCTOR OF PROMPT ====================
  const [curedPatients, setCuredPatients] = useState<Record<number, boolean>>({});
  const [doctorRewardClaimed, setDoctorRewardClaimed] = useState(false);

  const patients = [
    {
      id: 1,
      symptom: '«Сайт получился вообще не про то — вместо школьного проекта роботов открылся каталог промышленного оборудования»',
      diagnosis: 'Не хватало Контекста и Аудитории',
      options: [
        { text: 'Переписать код на C++', correct: false },
        { text: 'Добавить в промпт: «Контекст: сайт для школьников Худжанда, увлекающихся кружком роботов, а не для завода»', correct: true },
        { text: 'Удалить все картинки', correct: false }
      ]
    },
    {
      id: 2,
      symptom: '«ИИ сгенерировал гигантский монстр-сайт: и интернет-магазин, и чат, и личный кабинет, и блог — ничего не работает»',
      diagnosis: 'Слишком широкая Цель (Размытый фокус)',
      options: [
        { text: 'Сузить цель: «Только одностраничный сайт-визитка с 3 карточками, без корзины, магазина и базы данных»', correct: true },
        { text: 'Добавить ещё платёжную систему', correct: false },
        { text: 'Подождать 3 дня', correct: false }
      ]
    },
    {
      id: 3,
      symptom: '«На странице в подвале появился реальный личный номер телефона и домашний адрес автора»',
      diagnosis: 'Нарушение Ограничений и Щита «Не делись личным»',
      options: [
        { text: 'Оставить как есть для удобства', correct: false },
        { text: 'Выложить сайт в соцсети', correct: false },
        { text: 'Ввести строгое ограничение: «Никаких личных телефонов — подвал содержит только вымышленную почту или форму без сбора ПД»', correct: true }
      ]
    }
  ];

  const handleCurePatient = (patientId: number, isCorrect: boolean) => {
    if (isCorrect) {
      const updated = { ...curedPatients, [patientId]: true };
      setCuredPatients(updated);
      if (Object.keys(updated).length === 3 && !doctorRewardClaimed) {
        setDoctorRewardClaimed(true);
        addReward(25, '🩺 Доктор Промпта: Все 3 пациента вылечены! Ты видишь баги насквозь! (+25 Опыта)');
      }
    }
  };

  // ==================== LEVEL 5B: SPEED CHALLENGE ====================
  const [speedActive, setSpeedActive] = useState(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(90);
  const [speedAnswers, setSpeedAnswers] = useState<Record<number, number>>({});
  const [speedRewardClaimed, setSpeedRewardClaimed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speedActive && speedTimeLeft > 0) {
      interval = setInterval(() => {
        setSpeedTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [speedActive, speedTimeLeft]);

  const speedQuestions = [
    {
      id: 1,
      q: 'Какая часть промпта отвечает за фразу: «Ты — опытный веб-разработчик»?',
      options: ['Ограничения', 'Роль', 'Контекст'],
      correct: 1
    },
    {
      id: 2,
      q: 'Где на странице сайта обычно располагается блок с девизом и логотипом?',
      options: ['В шапке (header)', 'В подвале (footer)', 'В корзине'],
      correct: 0
    },
    {
      id: 3,
      q: 'Что делать, если кнопка на сайте оказалась слишком бледной?',
      options: ['Удалить весь сайт и плакать', 'Дать точечный запрос: «Сделай кнопку ярче»', 'Забыть про сайт'],
      correct: 1
    }
  ];

  const handleSpeedAnswer = (qId: number, optIdx: number) => {
    const updated = { ...speedAnswers, [qId]: optIdx };
    setSpeedAnswers(updated);

    const isAllCorrect = speedQuestions.every(q => updated[q.id] === q.correct);
    if (isAllCorrect && !speedRewardClaimed) {
      setSpeedRewardClaimed(true);
      addReward(25, '⚡ Скоростной вызов 3/3 пройден на отлично! (+25 Опыта)');
    }
  };

  // ==================== LEVEL 7: FINAL QUIZ (5 QUESTIONS) ====================
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const finalQuestions = [
    {
      id: 1,
      question: 'Что такое Vibe Coding?',
      options: [
        'Написание кода вручную без ИИ',
        'Объяснение ИИ результата, который хочешь получить, вместо написания кода построчно',
        'Слушание музыки во время программирования',
        'Копирование чужого готового сайта'
      ],
      correct: 1,
      explanation: 'Vibe Coding — это новая парадигма: ты формулируешь замысел и логику на естественном языке, а ИИ генерирует код.'
    },
    {
      id: 2,
      question: 'Из каких частей состоит Строительный промпт?',
      options: [
        'Только Цель',
        'Роль + Цель + Контекст + Ограничения + Результат',
        'Только код',
        'Только картинка сайта'
      ],
      correct: 1,
      explanation: 'Каноническая 5-частная формула: Роль (кто), Цель (что), Контекст (для кого), Ограничения (правила), Результат (блоки).'
    },
    {
      id: 3,
      question: 'Из каких трёх частей состоит скелет сайта?',
      options: [
        'Шапка, контент, подвал',
        'Начало, середина, конец',
        'Кнопка, текст, фото',
        'HTML, CSS, JavaScript'
      ],
      correct: 0,
      explanation: 'Скелет любой страницы — Header (шапка), Main (основной контент) и Footer (подвал).'
    },
    {
      id: 4,
      question: 'Что делать сразу после того, как ИИ сгенерировал сайт?',
      options: [
        'Сразу показать всем и забыть',
        'Протестировать: посмотреть, что работает, а что нет',
        'Удалить и начать заново',
        'Ничего, ИИ всегда прав'
      ],
      correct: 1,
      explanation: 'Правило «Generate ≠ Finished»: всегда тестируй кликабельность, мобильный вид и отсутствие приватных данных руками!'
    },
    {
      id: 5,
      question: 'Ты хочешь исправить одну маленькую деталь на сайте. Что лучше сделать?',
      options: [
        'Переписать весь промпт с нуля',
        'Дать точечный запрос-уточнение на одну эту деталь',
        'Удалить сайт',
        'Оставить как есть, даже если не нравится'
      ],
      correct: 1,
      explanation: 'Точечные запросы («Оставь всё как есть, но сделай кнопку крупнее») сохраняют структуру и экономят время.'
    }
  ];

  const handleSelectQuizOption = (qId: number, optIdx: number) => {
    if (!quizSubmitted) {
      setQuizAnswers({ ...quizAnswers, [qId]: optIdx });
    }
  };

  useLessonQuizPersistence(
    9,
    finalQuestions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
  };

  const score = finalQuestions.filter(q => quizAnswers[q.id] === q.correct).length;
  const isPassed = score >= 4;

  return (
    <div className="space-y-8 text-slate-200">
      {/* LEVEL 5A: Doctor of Prompt */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-emerald-400 font-mono">УРОВЕНЬ 5A • ⏱️ 70–78 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-400" /> 🩺 Доктор Промпта: Исправь 3 сломанных сайта
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            +25 ОП за всех пациентов
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          К тебе на приём поступили 3 сломанных запроса на сайт. Поставь верный диагноз и выбери правильное лечение!
        </p>

        <div className="space-y-4">
          {patients.map(p => (
            <div
              key={p.id}
              className={`p-5 rounded-2xl border transition ${
                curedPatients[p.id]
                  ? 'bg-emerald-950/40 border-emerald-500/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                <span className="font-bold text-cyan-300">Пациент #{p.id}</span>
                <span className="text-slate-400 font-mono">Диагноз: {p.diagnosis}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-slate-300 text-xs italic mb-3 border border-slate-800">
                {p.symptom}
              </div>

              <div className="space-y-2">
                {p.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    disabled={curedPatients[p.id]}
                    onClick={() => handleCurePatient(p.id, opt.correct)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition border flex items-center justify-between ${
                      curedPatients[p.id] && opt.correct
                        ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {curedPatients[p.id] && opt.correct && (
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 5B: Speed Challenge */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-amber-400 font-mono">УРОВЕНЬ 5B • ⏱️ 78–80 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> ⚡ Скоростной вызов 3/3 (90 секунд)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800 flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5" /> {speedTimeLeft} сек
            </span>
            {!speedActive && (
              <button
                onClick={() => setSpeedActive(true)}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
              >
                Старт таймера
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {speedQuestions.map(sq => (
            <div key={sq.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-xs sm:text-sm font-bold text-white">
                {sq.id}. {sq.q}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {sq.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSpeedAnswer(sq.id, optIdx)}
                    className={`p-2.5 rounded-xl text-xs transition border font-medium ${
                      speedAnswers[sq.id] === optIdx
                        ? optIdx === sq.correct
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 7: Final Quiz */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-cyan-400 font-mono">УРОВЕНЬ 7 • ⏱️ 87–90 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" /> 🧠 Финальный тест: Проверка квалификации вайб-кодера
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            5 вопросов • +50 ОП
          </span>
        </div>

        <div className="space-y-6">
          {finalQuestions.map((q, qIndex) => {
            const selectedOpt = quizAnswers[q.id];
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {qIndex + 1}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    const isCorrect = optIndex === q.correct;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      style = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectQuizOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-400 text-xs border border-slate-800">
                    💡 <strong>Пояснение:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action */}
        {!quizSubmitted ? (
          <button
            onClick={handleGradeQuiz}
            disabled={Object.keys(quizAnswers).length < 5}
            className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Завершить тест и проверить ответы
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <h4 className="text-lg font-bold text-white">
              Результат: {score} из 5 правильных ответов
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {isPassed
                ? 'Отличная работа! Ты полностью освоил принципы вайб-кодинга и готов строить сайты!'
                : 'Ты близок к цели! Перечитай шпору и попробуй пройти еще раз.'}
            </p>
          </div>
        )}
      </div>

      {/* BADGE UNLOCKED CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 flex-shrink-0">
            <img
              src={badgeVibeCoderImg}
              alt="Бейдж Vibe Coder"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800">
              <Award className="w-4 h-4 text-amber-300" /> РАЗБЛОКИРОВАН НОВЫЙ БЕЙДЖ
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              VIBE CODER (Lv.9)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Бейдж-набор «Vibe Coding»: <strong>1/4 ⭐</strong>. Ты не печатал код руками, но построил работающий сайт на естественном языке, протестировал его по чек-листу и защитил на витрине!
            </p>
          </div>
        </div>
      </div>

      {/* Test submission form */}
      <InlineTestSubmission
        testId="TEST_9"
        lessonId={9}
        testTitle="Квалификационный рубеж Миссии 09: Vibe Coder"
        rewardExp={50}
      />
    </div>
  );
};
