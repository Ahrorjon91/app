import React, { useState } from 'react';
import {
  CheckCircle2,
  Stethoscope,
  AlertTriangle,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { AcademicBadgeIcon } from '../AcademicBadgeIcon';
import { LESSON_QUIZZES } from '../../data/lessonQuizzesData';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson12QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const saveQuizScore = portal?.saveQuizScore || ((_id: string, _score: number) => {});

  // Doctor of Multi-Page & Vercel Deployment (3 clinical cases)
  const [doctorAnswers, setDoctorAnswers] = useState<Record<number, number>>({});
  const [doctorDone, setDoctorDone] = useState(false);

  const doctorCases = [
    {
      id: 1,
      title: 'Пациент #1: Белый экран при деплое проекта из AI Studio на GitHub Pages',
      symptom:
        'Ученик выгрузил проект (iPhone 18 Pro + Apple Watch Ultra 4) из Google AI Studio в GitHub, включил GitHub Pages как для обычного HTML/CSS/JS сайта, но вместо сайта открылся пустой белый экран и ошибка MIME type на /src/main.tsx.',
      options: [
        'Удалить все картинки с сайта',
        'Понять, что браузер не читает сырой React/TypeScript (.tsx) без компиляции, и подключить репозиторий GitHub к платформе Vercel, которая автоматически выполнит сборку (npm run build)',
        'Перекрасить фон в синий цвет'
      ],
      correct: 1
    },
    {
      id: 2,
      title: 'Пациент #2: При переключении с iPhone 18 Pro на Apple Watch Ultra 4 страница открывается в самом низу',
      symptom:
        'Пользователь доскроллил страницу iPhone 18 Pro до 90%, нажал в шапке на вкладку «Apple Watch Ultra 4» и оказался сразу в подвале второй страницы, пропустив Hero-видео и первые карточки.',
      options: [
        'Запретить пользователю крутить колесо мыши',
        'При переключении вкладки вызывать window.scrollTo({ top: 0, behavior: "smooth" }) и очищать старые слушатели событий скролла в useEffect cleanup',
        'Удалить страницу Apple Watch Ultra 4'
      ],
      correct: 1
    },
    {
      id: 3,
      title: 'Пациент #3: Уязвимость безопасности перед публикацией в интернет',
      symptom:
        'Перед деплоем на Vercel выяснилось, что внешние ссылки открываются через target="_blank" без защиты, а ключ API записан прямо внутри файла компонента.',
      options: [
        'Оставить как есть, никто не заметит',
        'Вынести секретные ключи в переменные окружения (.env / Vercel Environment Variables) и добавить rel="noopener noreferrer" ко всем внешним ссылкам',
        'Отключить интернет'
      ],
      correct: 1
    }
  ];

  const handleDoctorSelect = (caseId: number, idx: number) => {
    const next = { ...doctorAnswers, [caseId]: idx };
    setDoctorAnswers(next);
    const allCorrect = doctorCases.every((c) => next[c.id] === c.correct);
    if (allCorrect && !doctorDone) {
      setDoctorDone(true);
      addReward(35, '🩺 Доктор Экосистемы и Деплоя (Урок 13) пройден (+35 ОП)!');
    }
  };

  // Official 5-question quiz for Lesson 13
  const questions = LESSON_QUIZZES[13] || [];
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useLessonQuizPersistence(
    13,
    questions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const quizScore = questions.reduce(
    (acc, q, idx) => (quizAnswers[idx] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const handleSubmitQuiz = () => {
    if (Object.keys(quizAnswers).length < questions.length) return;
    setQuizSubmitted(true);
    const pct = Math.round((quizScore / questions.length) * 100);
    saveQuizScore('13', pct);
    if (pct >= 80) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
      addReward(75, `🏆 Финальный тест Урока 13 сдан на ${pct}%! Бейдж FULL-STACK PRODUCT DEPLOYER (Lv.13) открыт!`);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-orange-500/30 shadow-2xl space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
          🩺 УРОВЕНЬ 5–7 • ДОКТОР ДЕПЛОЯ И КВАЛИФИКАЦИОННЫЙ ТЕСТ (УРОК 13)
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Проверка знаний: Apple Watch Ultra 4, баг-фиксы, Security и деплой на Vercel
        </h2>
      </div>

      {/* Doctor Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-orange-400" />
            Доктор Мультистраничного Сайта и Деплоя (3 кейса)
          </h3>
          {doctorDone && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              ✓ Все 3 диагноза верны (+35 ОП)
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctorCases.map((c) => {
            const chosen = doctorAnswers[c.id];
            return (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-sm font-black text-white">{c.title}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.symptom}</p>
                </div>
                <div className="space-y-1.5">
                  {c.options.map((opt, idx) => {
                    const isSelected = chosen === idx;
                    const isRight = idx === c.correct;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleDoctorSelect(c.id, idx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? isRight
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
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
      </div>

      {/* Main 5-Question Quiz */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AcademicBadgeIcon level={13} className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-black text-white">Квалификационный тест Урока 13 (5 вопросов)</h3>
              <p className="text-xs text-slate-400">
                Награда за прохождение: официальный бейдж «FULL-STACK PRODUCT DEPLOYER (Lv.13)»
              </p>
            </div>
          </div>
          {quizSubmitted && (
            <button
              onClick={handleRetakeQuiz}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              Пройти заново
            </button>
          )}
        </div>

        <div className="space-y-5">
          {questions.map((q, qIdx) => {
            const chosen = quizAnswers[qIdx];
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-sm sm:text-base font-bold text-white">
                  {qIdx + 1}. {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                          quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                              : isSelected
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900/50 border-slate-800 text-slate-400'
                            : isSelected
                            ? 'bg-orange-500/20 border-orange-400 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(quizAnswers).length < questions.length}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm cursor-pointer disabled:opacity-40"
          >
            Проверить ответы ({Object.keys(quizAnswers).length}/{questions.length})
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <span className="text-sm font-black text-emerald-300">
              Результат: {quizScore} из {questions.length} ({Math.round((quizScore / questions.length) * 100)}%)
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        )}
      </div>
    </div>
  );
};
