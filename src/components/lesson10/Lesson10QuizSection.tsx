import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Zap,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  Code,
  Palette
} from 'lucide-react';
import badgeImg from '../../assets/images/lesson10_badge_web_architect_1790078347907.jpg';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

interface Lesson10QuizSectionProps {
  onTestSubmitted?: () => void;
}

export const Lesson10QuizSection: React.FC<Lesson10QuizSectionProps> = ({ onTestSubmitted }) => {
  // Level 5A: Doctor Protocol patients
  const [patientStatus, setPatientStatus] = useState<Record<number, boolean>>({});
  const [patientAnswers, setPatientAnswers] = useState<Record<number, string>>({});

  const patients = [
    {
      id: 1,
      title: 'Пациент №1: Серый лист текста',
      symptom: 'Сайт загрузился как сплошной черно-белый текст сверху вниз, без цвета, полей и отступов.',
      options: [
        { id: 'a', text: 'Отдел CSS не подключен или не описан в промпте', correct: true },
        { id: 'b', text: 'В браузере отключен интернет', correct: false },
        { id: 'c', text: 'Нужно добавить больше HTML тегов <br>', correct: false }
      ],
      cure: 'Диагноз подтверждён: без CSS браузер отображает сырые данные в дефолтных стилях 1990-х годов.'
    },
    {
      id: 2,
      title: 'Пациент №2: Застывшая кнопка',
      symptom: 'Кнопка «Отправить заявку» красиво нарисована, но при нажатии вообще ничего не происходит.',
      options: [
        { id: 'a', text: 'Сломалась мышка или тачпад', correct: false },
        { id: 'b', text: 'Не описано JS-поведение — «система мониторинга» молчит', correct: true },
        { id: 'c', text: 'Кнопка нарисована неправильным цветом CSS', correct: false }
      ],
      cure: 'Диагноз подтверждён: кнопка без JavaScript — как звонок, не подключённый к проводам.'
    },
    {
      id: 3,
      title: 'Пациент №3: Текстовая каша',
      symptom: 'Заголовок, список увлечений и ссылка склеились в одну длинную нечитаемую строку.',
      options: [
        { id: 'a', text: 'Слишком яркий CSS фон', correct: false },
        { id: 'b', text: 'HTML-структура не продумана — нет отдельных тегов и блоков', correct: true },
        { id: 'c', text: 'JavaScript перегрузил процессор', correct: false }
      ],
      cure: 'Диагноз подтверждён: без контейнеров (div) и структурных тегов (h1, p) браузер не знает, как разделить контент.'
    }
  ];

  const handlePatientSelect = (patientId: number, optId: string, isCorrect: boolean) => {
    setPatientAnswers(prev => ({ ...prev, [patientId]: optId }));
    setPatientStatus(prev => ({ ...prev, [patientId]: isCorrect }));
  };

  // Level 5B: Speed Challenge (90s Timer)
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [blitzAnswers, setBlitzAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let interval: any;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(90);
    setTimerRunning(true);
    setBlitzAnswers({});
  };

  // Level 7: Final Test Questions
  const quizQuestions = [
    {
      id: 1,
      q: 'За что отвечает HTML на сайте?',
      options: [
        'За цвет и шрифт',
        'За структуру: что на странице вообще есть (текст, картинки, кнопки)',
        'За поведение и анимацию при клике',
        'За скорость интернета пользователя'
      ],
      correct: 1,
      explanation: 'HTML (HyperText Markup Language) — это скелет страницы, определяющий ее наполнение.'
    },
    {
      id: 2,
      q: 'Как синтаксически правильно выглядит CSS-правило?',
      options: [
        '<тег>значение</тег>',
        'селектор { свойство: значение; }',
        'функция(параметр);',
        'background = "red"'
      ],
      correct: 1,
      explanation: 'CSS строится по строгой формуле: селектор (к чему применить) { свойство: значение; }.'
    },
    {
      id: 3,
      q: 'Какова главная роль JavaScript (JS) на сайте?',
      options: [
        'Задавать фоновые изображения',
        'Создавать заголовки страниц',
        'Оживлять страницу: реагировать на действия пользователя (клики, таймеры, ввод данных)',
        'Ни за что не отвечает'
      ],
      correct: 2,
      explanation: 'JS — это отдел поведения и логики сайта.'
    },
    {
      id: 4,
      q: 'На сайте красивая кнопка не реагирует на нажатие. В чем вероятнее всего причина?',
      options: [
        'В CSS забыли указать цвет фона',
        'Не хватает HTML заголовка',
        'Не подключен JavaScript обработчик события клика',
        'Сайт открыт не в том браузере'
      ],
      correct: 2,
      explanation: 'Если визуальный элемент есть, но действие не запускается — отсутствует JS-обработчик.'
    },
    {
      id: 5,
      q: 'Почему критически важно проверять сайт на маленьком экране (375px)?',
      options: [
        'Это не имеет значения для визитки',
        'Более половины пользователей открывают сайты со смартфонов, и верстка без адаптивности ломается',
        'Только для красивого отчета ментору',
        'Чтобы сайт загружался в 10 раз быстрее'
      ],
      correct: 1,
      explanation: 'Mobile-first подход гарантирует, что сайт удобен на любых экранах, включая мобильные.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  useLessonQuizPersistence(
    6,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    testSubmitted,
    setTestSubmitted
  );

  const calculateScore = () => {
    return quizQuestions.reduce((acc, q) => {
      return selectedAnswers[q.id] === q.correct ? acc + 1 : acc;
    }, 0);
  };

  const isPassed = testSubmitted && calculateScore() >= 4;

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Shield className="w-3.5 h-3.5" /> Проверка знаний · 70–90 мин
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Уровни 5 & 7: Диагностика, Скоростной вызов и Финальный тест
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Вылечи 3 пациентов, пройди 90-секундный блиц и получи бейдж «WEB ARCHITECT Lv.6».
          </p>
        </div>
      </div>

      {/* УРОВЕНЬ 5A: Доктор Протокола (3 Пациента) */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Уровень 5A · 70–76 мин
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-rose-400" /> Доктор Протокола: 3 пациента (+25 ОП за каждого)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Вылечено: {Object.values(patientStatus).filter(Boolean).length} из 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map(p => {
            const isResolved = patientStatus[p.id];
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                  isResolved
                    ? 'bg-emerald-950/20 border-emerald-600/50'
                    : 'bg-black/60 border-slate-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{p.title}</span>
                    {isResolved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-300 italic">{p.symptom}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono text-slate-400">Поставь диагноз:</div>
                  {p.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handlePatientSelect(p.id, opt.id, opt.correct)}
                      className={`w-full p-2.5 rounded-xl text-xs text-left border transition-all ${
                        patientAnswers[p.id] === opt.id
                          ? opt.correct
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}

                  {isResolved && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-[11px] text-emerald-300">
                      ✨ {p.cure} (+25 ОП)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* УРОВЕНЬ 5B: Быстрое испытание 3/3 (90 секунд) */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-amber-900/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Уровень 5B · 76–80 мин
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Быстрое испытание 3/3 (+50 ОП за 90 секунд)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className={timeLeft <= 15 ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-300'}>
                {timeLeft} сек
              </span>
            </div>
            {!timerRunning ? (
              <button
                onClick={startTimer}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs transition-all"
              >
                Запустить таймер
              </button>
            ) : (
              <button
                onClick={() => setTimerRunning(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Пауза
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 1,
              q: '1. За что отвечает каждый отдел (HTML, CSS, JS)?',
              hint: 'HTML = структура, CSS = стиль, JS = поведение'
            },
            {
              id: 2,
              q: '2. Как выглядит CSS-правило?',
              hint: 'селектор { свойство: значение; }'
            },
            {
              id: 3,
              q: '3. Почему сайт проверяют на маленьком экране?',
              hint: 'Большинство людей сидит со смартфонов'
            }
          ].map(item => (
            <div key={item.id} className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">{item.q}</div>
              <div className="text-[11px] text-slate-400 italic">Подсказка: {item.hint}</div>
              <button
                onClick={() => setBlitzAnswers(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  blitzAnswers[item.id]
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                {blitzAnswers[item.id] ? '✓ Отвечено партнёру' : 'Ответить'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* УРОВЕНЬ 7: Финальный тест */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-indigo-900/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Уровень 7 · Новый ранг (87–90 мин)
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" /> Квалификационный тест на звание «WEB ARCHITECT»
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">Порог: 4 из 5</span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-3">
              <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                <span className="text-indigo-400 font-mono">0{idx + 1}.</span>
                <span>{q.q}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[q.id] === oIdx;
                  const isCorrect = q.correct === oIdx;
                  let btnClass = 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (testSubmitted) {
                    if (isCorrect) {
                      btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnClass = 'bg-rose-950/60 border-rose-500 text-rose-300';
                    }
                  } else if (isSelected) {
                    btnClass = 'bg-indigo-950 border-indigo-500 text-indigo-200 font-semibold';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={testSubmitted}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                      className={`p-3 rounded-xl text-xs text-left border transition-all flex items-start gap-2 ${btnClass}`}
                    >
                      <span className="font-mono text-slate-500">{String.fromCharCode(65 + oIdx)})</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {testSubmitted && (
                <div className="text-xs text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!testSubmitted ? (
          <button
            disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
            onClick={() => setTestSubmitted(true)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20"
          >
            Завершить тест и проверить результат
          </button>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="text-sm font-bold text-white">
              Результат: {calculateScore()} из {quizQuestions.length} правильных ответов
            </div>

            {isPassed ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> ТЕСТ СДАН НА ОТЛИЧНО! (+25 ОП)
                </div>

                {/* Badge Unlock Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-950 to-black border border-indigo-500/40 max-w-md mx-auto space-y-4">
                  <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-indigo-400/60 shadow-2xl shadow-indigo-500/30">
                    <img src={badgeImg} alt="Badge Web Architect" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">
                      Бейдж-набор «Vibe Coding» · 2/4 ⭐⭐
                    </div>
                    <h4 className="text-lg font-black text-white">WEB ARCHITECT (Lv.6)</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Ты освоил 3 отдела Центра Управления: структуру HTML, стилизацию CSS и поведение JavaScript.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-rose-400">
                  Нужно минимум 4 верных ответа. Повтори карточки и попробуй снова!
                </p>
                <button
                  onClick={() => {
                    setTestSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white transition-all flex items-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Попробовать снова
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Inline Test Submission */}
      <InlineTestSubmission
        testId="TEST_6"
        lessonId={6}
        rewardXp={50}
        onSubmitted={onTestSubmitted}
      />
    </div>
  );
};
