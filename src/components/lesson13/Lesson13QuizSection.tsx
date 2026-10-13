import React, { useState } from 'react';
import {
  Sparkles,
  Stethoscope,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Award,
  Timer,
  Play,
  RotateCcw,
  Check,
  X,
  HelpCircle,
  ShieldCheck,
  MousePointer
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeMotionDesignerImg from '../../assets/images/lesson13_badge_motion_designer_1790161471084.jpg';

export const Lesson13QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Level 5A: Doctor of Animation (3 patients)
  const [curedPatient1, setCuredPatient1] = useState(false);
  const [curedPatient2, setCuredPatient2] = useState(false);
  const [curedPatient3, setCuredPatient3] = useState(false);

  const handleCure = (patientNum: number) => {
    if (patientNum === 1 && !curedPatient1) {
      setCuredPatient1(true);
      addReward(25, 'cure_patient_13_1');
    } else if (patientNum === 2 && !curedPatient2) {
      setCuredPatient2(true);
      addReward(25, 'cure_patient_13_2');
    } else if (patientNum === 3 && !curedPatient3) {
      setCuredPatient3(true);
      addReward(25, 'cure_patient_13_3');
    }
  };

  // Level 5B: 90-sec blitz challenge
  const [blitzTimer, setBlitzTimer] = useState<number>(90);
  const [isBlitzRunning, setIsBlitzRunning] = useState<boolean>(false);
  const [blitzAnswered, setBlitzAnswered] = useState<boolean>(false);

  const startBlitz = () => {
    setIsBlitzRunning(true);
    setBlitzTimer(90);
    setBlitzAnswered(false);

    const interval = setInterval(() => {
      setBlitzTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsBlitzRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCompleteBlitz = () => {
    if (!blitzAnswered) {
      setBlitzAnswered(true);
      setIsBlitzRunning(false);
      addReward(50, 'blitz_13_completed');
    }
  };

  // Level 7: Final Quiz
  const questions = [
    {
      id: 1,
      q: 'Что такое hover-эффект?',
      options: [
        'Анимация, которая играет сама по себе без причины',
        'Реакция элемента на наведение мышки/пальца',
        'Звуковое сопровождение на сайте',
        'Смена языка интерфейса'
      ],
      correct: 1,
      explanation: 'Hover — это мгновенный и плавный визуальный отклик интерфейса на приближение курсора или касание.'
    },
    {
      id: 2,
      q: 'Чем отличается fade от slide?',
      options: [
        'Fade — это движение сбоку, slide — появление из прозрачности',
        'Fade — плавное появление/исчезновение через прозрачность, slide — плавное движение элемента',
        'Это одно и то же',
        'Fade работает исключительно на смартфонах'
      ],
      correct: 1,
      explanation: 'Fade меняет opacity (прозрачность), а slide меняет координаты положения (transform: translate).'
    },
    {
      id: 3,
      q: 'Что означает фундаментальное правило «Don\'t animate everything»?',
      options: [
        'Анимация вообще не нужна на современных сайтах',
        'Анимировать нужно только важные элементы для фокуса внимания, а не всё подряд',
        'Нужно анимировать абсолютно каждый текст и иконку',
        'Анимация должна длиться не менее 10 секунд'
      ],
      correct: 1,
      explanation: 'Избыточная анимация утомляет зрение и сбивает пользователя. Движение должно направлять внимание к цели.'
    },
    {
      id: 4,
      q: 'Зачем сайтам необходима поддержка prefers-reduced-motion?',
      options: [
        'Чтобы ускорить интернет-соединение провайдера',
        'Чтобы людям с вестибулярной чувствительностью было комфортно пользоваться сайтом',
        'Это устаревший стандарт, который нигде не поддерживается',
        'Чтобы сделать цвета на экране более контрастными'
      ],
      correct: 1,
      explanation: 'Медиа-запрос prefers-reduced-motion отключает резкие движения для людей, у которых анимация вызывает тошноту или головокружение.'
    },
    {
      id: 5,
      q: 'Какая оптимальная скорость (transition duration) для большинства микро-анимаций (кнопки, hover)?',
      options: [
        '5–10 секунд',
        '0.2–0.5 секунды',
        'Мгновенно без анимации (0 секунд)',
        'Ровно 1 минута'
      ],
      correct: 1,
      explanation: 'Интервал 0.2–0.5 секунды — золотой стандарт: человек успевает заметить плавность, но не ждёт отклика.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [badgeAwarded, setBadgeAwarded] = useState<boolean>(false);

  useLessonQuizPersistence(
    9,
    questions,
    selectedAnswers,
    setSelectedAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateScore();
    if (score >= 4 && !badgeAwarded) {
      setBadgeAwarded(true);
      if (portal?.unlockBadge) {
        portal.unlockBadge('b_motion_designer');
      }
    }
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" /> РАЗДЕЛ 3 • ТЕСТЫ И ДИАГНОСТИКА
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 font-bold text-xs sm:text-sm">
            до +100 ОП
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          Доктор Анимации + Скоростной Блиц + Тест на звание Motion Designer
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Проверь свои навыки: вылечи сайты с дефектами динамики, пройди 90-секундный челлендж и получи значок <strong>«MOTION DESIGNER (Lv.13)»</strong>.
        </p>
      </div>

      {/* Level 5A: Doctor of Animation (3 Patients) */}
      <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">УРОВЕНЬ 5A • ПРИЁМНЫЙ ПОКОЙ</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-red-400" />
              Доктор Анимации: 3 проблемных пациента
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-red-950 border border-red-800 text-red-300 font-bold text-xs sm:text-sm">
            +25 ОП за каждого вылеченного
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient 1: Hyper-animated */}
          <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
            curedPatient1 ? 'bg-emerald-950/40 border-emerald-600' : 'bg-slate-950 border-red-500/40'
          }`}>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-400">🩺 ПАЦИЕНТ №1</span>
              <h4 className="text-base font-bold text-white">Гипер-анимация: всё мигает и пляшет</h4>
              <p className="text-xs text-slate-400">
                Каждая строчка и кнопка крутятся и вибрируют. Пользователь теряет фокус и закрывает сайт.
              </p>

              {/* Simulation */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center overflow-hidden">
                <div className={`p-3 rounded-lg font-bold text-xs text-white ${
                  curedPatient1
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                    : 'bg-red-600 animate-spin'
                }`}>
                  {curedPatient1 ? 'Спокойный важный блок ✨' : 'СПАСИТЕ Я КРУЧУСЬ!'}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCure(1)}
              disabled={curedPatient1}
              className={`w-full py-2.5 rounded-xl text-xs font-black transition-all ${
                curedPatient1
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30 cursor-pointer'
              }`}
            >
              {curedPatient1 ? '✓ Пациент вылечен (+25 ОП)' : 'Вылечить: оставить только фокус'}
            </button>
          </div>

          {/* Patient 2: Sluggish 3 seconds button */}
          <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
            curedPatient2 ? 'bg-emerald-950/40 border-emerald-600' : 'bg-slate-950 border-amber-500/40'
          }`}>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">🩺 ПАЦИЕНТ №2</span>
              <h4 className="text-base font-bold text-white">Улиточная анимация: 3.0 секунды</h4>
              <p className="text-xs text-slate-400">
                Кнопка разворачивается целых 3 секунды. Люди кликают по 5 раз, думая, что сайт повис.
              </p>

              {/* Simulation */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <button
                  type="button"
                  style={{
                    transitionDuration: curedPatient2 ? '0.3s' : '3.0s',
                    transitionProperty: 'all'
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:scale-125 text-slate-950 font-bold text-xs"
                >
                  {curedPatient2 ? 'Быстрый отклик 0.3с' : 'Наведи: жди 3 секунды...'}
                </button>
              </div>
            </div>

            <button
              onClick={() => handleCure(2)}
              disabled={curedPatient2}
              className={`w-full py-2.5 rounded-xl text-xs font-black transition-all ${
                curedPatient2
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30 cursor-pointer'
              }`}
            >
              {curedPatient2 ? '✓ Скорость настроена (+25 ОП)' : 'Вылечить: установить 0.3с'}
            </button>
          </div>

          {/* Patient 3: Mobile Touch Ghost */}
          <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
            curedPatient3 ? 'bg-emerald-950/40 border-emerald-600' : 'bg-slate-950 border-purple-500/40'
          }`}>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400">🩺 ПАЦИЕНТ №3</span>
              <h4 className="text-base font-bold text-white">Мобильный призрак: hover без клика</h4>
              <p className="text-xs text-slate-400">
                На смартфоне нет курсора мыши. Если кнопка выглядит серой до наведения, палец её не находит.
              </p>

              {/* Simulation */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className={`p-2.5 rounded-lg text-xs font-bold ${
                  curedPatient3
                    ? 'bg-purple-900/80 border border-purple-400 text-purple-200 ring-2 ring-purple-400/40'
                    : 'bg-slate-800 text-slate-600 border border-transparent'
                }`}>
                  {curedPatient3 ? 'Заметная кнопка для пальца 📱' : 'Серая невидимка'}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCure(3)}
              disabled={curedPatient3}
              className={`w-full py-2.5 rounded-xl text-xs font-black transition-all ${
                curedPatient3
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 cursor-pointer'
              }`}
            >
              {curedPatient3 ? '✓ Добавлен touch-отклик (+25 ОП)' : 'Вылечить: добавить рамку и active'}
            </button>
          </div>
        </div>
      </div>

      {/* Level 5B: Speed Blitz 3/3 (90 sec) */}
      <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">УРОВЕНЬ 5B • БЫСТРОЕ ИСПЫТАНИЕ</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              Блиц-вызов: 3 вопроса за 90 секунд
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-xs sm:text-sm">
            +50 ОП за 3/3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Объясни партнёру или проговори вслух:</h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                1️⃣ <strong>Чем отличается fade от slide?</strong>
                <p className="text-slate-400 text-xs mt-1">Fade — это прозрачность (opacity), slide — движение в пространстве (translateX/Y).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                2️⃣ <strong>Что такое reveal-эффект?</strong>
                <p className="text-slate-400 text-xs mt-1">Появление блока при скролле страницы (fade + slide снизу).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                3️⃣ <strong>Почему не стоит анимировать вообще всё?</strong>
                <p className="text-slate-400 text-xs mt-1">Чтобы не отвлекать и не раздражать посетителя хаосом.</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-24 h-24 rounded-full bg-cyan-950/80 border-2 border-cyan-500/50 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="font-mono text-3xl font-black text-white">{blitzTimer}</span>
              <span className="text-[10px] font-mono text-cyan-300 uppercase">секунд</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startBlitz}
                disabled={isBlitzRunning}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-600/30 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isBlitzRunning ? 'Идёт отсчёт...' : 'Старт таймера'}</span>
              </button>
              <button
                onClick={handleCompleteBlitz}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  blitzAnswered
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {blitzAnswered ? '✓ 3/3 Сдано (+50 ОП)' : 'Подтвердить 3/3'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Level 7: Final Qualification Quiz & Badge */}
      <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">УРОВЕНЬ 7 • НОВЫЙ РАНГ</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              Финальный тест квалификации: Motion Designer
            </h3>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300 font-bold text-xs sm:text-sm">
            5 вопросов • +25 ОП и бейдж
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correct;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-base font-bold text-white leading-snug">{q.q}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, oIdx) => {
                    let btnStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';

                    if (userAnswer === oIdx) {
                      btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 ring-2 ring-cyan-400/30';
                    }

                    if (quizSubmitted) {
                      if (oIdx === q.correct) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (userAnswer === oIdx && !isCorrect) {
                        btnStyle = 'bg-red-950 border-red-500 text-red-200';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && oIdx === q.correct && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && userAnswer === oIdx && !isCorrect && (
                          <X className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="text-xs text-slate-400 pt-1 italic">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit button & Results */}
        {!quizSubmitted ? (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleFinishQuiz}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Завершить тест и проверить ответы
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-amber-500/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-black text-white">
                  Ваш результат: {calculateScore()} из {questions.length} правильных ответов!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {calculateScore() >= 4
                    ? 'Поздравляем! Вы блестяще овладели искусством веб-динамики и микро-взаимодействий.'
                    : 'Почти получилось! Ознакомьтесь с подсказками к вопросам и закрепите материал.'}
                </p>
              </div>

              {calculateScore() >= 4 && (
                <span className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shrink-0">
                  Квалификация подтверждена 🌟
                </span>
              )}
            </div>

            {/* Badge presentation */}
            {calculateScore() >= 4 && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-amber-500/50 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={badgeMotionDesignerImg}
                  alt="Badge Motion Designer"
                  className="w-24 h-24 rounded-full border-2 border-amber-400 shadow-xl shadow-amber-500/20 shrink-0 object-cover"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400 text-xs font-mono font-bold">
                    РАНГ ОБНОВЛЁН: LV.13
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">
                    Бейдж «MOTION DESIGNER»
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Бейдж-набор «WOW Website»: 1/4 ⭐. Твой сайт теперь отзывается на каждое движение мышки или прикосновение пальца.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
