import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Flame,
  Check,
  Clock
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeAiArtistImg from '../../assets/images/lesson5_badge_ai_artist_1790073270769.jpg';

export const Lesson5QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 1. Быстрое испытание (Speed Challenge) - Собери формулу за 90 секунд
  const [speedChallengeStarted, setSpeedChallengeStarted] = useState(false);
  const [speedSelected, setSpeedSelected] = useState<string[]>([]);
  const [speedCompleted, setSpeedCompleted] = useState(false);

  const speedFormulaOptions = [
    { id: 'subject', label: '🧍 Герой (Subject)', isCorrect: true },
    { id: 'style', label: '🎨 Стиль (Style)', isCorrect: true },
    { id: 'length', label: '📏 Количество страниц', isCorrect: false },
    { id: 'location', label: '🏞️ Место (Environment)', isCorrect: true },
    { id: 'lighting', label: '💡 Свет (Lighting)', isCorrect: true },
    { id: 'price', label: '💰 Цена токена', isCorrect: false },
    { id: 'camera', label: '📷 Ракурс (Camera)', isCorrect: true },
    { id: 'mood', label: '🎭 Настроение (Mood)', isCorrect: true }
  ];

  const handleToggleSpeedOption = (id: string) => {
    if (speedCompleted) return;
    const next = speedSelected.includes(id)
      ? speedSelected.filter((i) => i !== id)
      : [...speedSelected, id];
    setSpeedSelected(next);

    const correctIds = speedFormulaOptions.filter((o) => o.isCorrect).map((o) => o.id);
    const hasAllCorrect = correctIds.every((c) => next.includes(c));
    const hasNoWrong = next.every((n) => correctIds.includes(n));

    if (hasAllCorrect && hasNoWrong && next.length === 6) {
      setSpeedCompleted(true);
      addReward(50, '⚡ Быстрое испытание пройдено! Все 6 частей формулы найдены! (+50 Опыта)');
    }
  };

  // 2. Финальный тест (5 вопросов из учебной программы)
  const quizQuestions = [
    {
      id: 1,
      question: '1. Из скольки базовых частей состоит каноническая формула визуального запроса?',
      options: [
        { key: 'A', text: 'Из 3 частей (только картинка, размер и дата)' },
        { key: 'B', text: 'Из 6 частей (Герой + Стиль + Место + Свет + Ракурс + Настроение)' },
        { key: 'C', text: 'Из 10 частей (нужно перечислять все RGB-коды пикселей)' },
        { key: 'D', text: 'Всего из 1 случайного слова' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! 6 частей дают полный контроль над сценой, композицией и эмоцией.'
    },
    {
      id: 2,
      question: '2. Что произойдёт, если в визуальном запросе не указать художественный стиль?',
      options: [
        { key: 'A', text: 'ИИ откажется генерировать изображение' },
        { key: 'B', text: 'Результат будет случайным: нейросеть выберет стиль на свой вкус' },
        { key: 'C', text: 'Картинка обязательно станет шедевром' },
        { key: 'D', text: 'Ничего не изменится' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Без стиля модель смешает типичные шаблоны из обучающей базы.'
    },
    {
      id: 3,
      question: '3. Как правильно улучшать картинку от версии к версии (v1 → v2 → v3)?',
      options: [
        { key: 'A', text: 'Каждый раз переписывать весь запрос целиком с нуля' },
        { key: 'B', text: 'Менять строго одну часть за раз и сравнивать результаты' },
        { key: 'C', text: 'Добавлять как можно больше восклицательных знаков' },
        { key: 'D', text: 'Никогда не трогать первоначальный вариант' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Правило одной переменной позволяет точно понять причину изменений.'
    },
    {
      id: 4,
      question: '4. Можно ли сгенерировать реалистичное фото своего учителя или одноклассника без его разрешения?',
      options: [
        { key: 'A', text: 'Да, если это для весёлого мема в чате' },
        { key: 'B', text: 'Нет, это прямое нарушение правил безопасности, приватности и уважения' },
        { key: 'C', text: 'Да, если никто не узнает автора' },
        { key: 'D', text: 'Можно, если написать приписку «в будущем»' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Щит №2 запрещает создавать дипфейки и изображения реальных людей без их согласия.'
    },
    {
      id: 5,
      question: '5. Ты показываешь другу красивую картину Худжанда будущего. Что честно и правильно сказать?',
      options: [
        { key: 'A', text: 'Промолчать, пусть думает, что это настоящая фотография с дрона' },
        { key: 'B', text: 'Честно рассказать, что это создано с помощью ИИ по твоей формуле запроса' },
        { key: 'C', text: 'Сказать, что нарисовал картину маслом вручную' },
        { key: 'D', text: 'Соврать, если работа очень красивая' }
      ],
      correct: 'B',
      explanation: 'Правильный ответ B! Щит №3 — быть честным. Создание крутого промпта — это тоже навык, которым можно гордиться открыто!'
    }
  ];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useLessonQuizPersistence(
    5,
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
            <HelpCircle className="w-3.5 h-3.5" /> Проверка знаний • Миссия 05
          </div>
          <span className="text-xs font-mono text-purple-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            Награда до +75 ОП
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Тестирование: Формула визуала и Этический кодекс
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Пройди скоростной челлендж на знание 6 частей формулы и сдай финальный тест для получения ранга AI ARTIST (Lv.5)!
          </p>
        </div>
      </div>

      {/* ⚡ 1. БЫСТРОЕ ИСПЫТАНИЕ: СОБЕРИ 6 ЧАСТЕЙ ФОРМУЛЫ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Уровень 5B — Быстрое испытание: 6 частей формулы
          </h3>
          <span className="text-xs font-mono text-amber-300">+50 ОП за 6/6</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Выбери ровно 6 компонентов, которые входят в формулу визуального запроса. Отсеки ложные варианты:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {speedFormulaOptions.map((opt) => {
            const isSelected = speedSelected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => handleToggleSpeedOption(opt.id)}
                className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                  isSelected
                    ? opt.isCorrect
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40'
                      : 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {isSelected && (opt.isCorrect ? <Check className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />)}
                </div>
              </button>
            );
          })}
        </div>

        {speedCompleted && (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Шикарно! Формула полностью собрана: Герой + Стиль + Место + Свет + Ракурс + Настроение (+50 ОП)!</span>
          </div>
        )}
      </div>

      {/* 🏆 2. ФИНАЛЬНЫЙ ТЕСТ ИЗ 5 ВОПРОСОВ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-pink-400" />
            Уровень 7 — Финальный тест: Получение ранга AI ARTIST
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
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 disabled:opacity-40 text-slate-950 font-black text-sm transition-all shadow-lg shadow-pink-500/20"
          >
            Завершить тест и проверить знания
          </button>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-950 border border-pink-500/40 space-y-4 text-center animate-in zoom-in-95">
            <div className="flex flex-col items-center gap-3">
              <img
                src={badgeAiArtistImg}
                alt="Значок AI Artist"
                className="w-24 h-24 rounded-full ring-4 ring-pink-500/50 shadow-2xl shadow-pink-500/30 object-cover"
              />
              <div>
                <h4 className="text-xl font-black text-white">Твой результат: {score} из 5 правильных!</h4>
                <p className="text-xs text-pink-300 font-mono mt-1">
                  {score >= 4
                    ? '🎉 Поздравляем! Ты получаешь официальный статус: AI ARTIST (Lv.5)!'
                    : 'Хорошая попытка! Повтори формулу из шпаргалки и попробуй ещё раз.'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono max-w-md mx-auto">
              🟡 PRODUCT MAKER Lv.4 ──▶ 🌸 <strong>AI ARTIST Lv.5</strong><br />
              Новый бейдж-набор «AI Creative» открыт: 1/4 ⭐
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
          testId={5}
          lessonTitle="Тест №5: ИИ-Художник — Формула визуального запроса"
        />
      </div>
    </div>
  );
};
