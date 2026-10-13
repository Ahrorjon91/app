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
  Rocket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeDevOpsImg from '../../assets/images/badge_devops_engineer_1790256021466.jpg';

interface PatientCase {
  id: number;
  title: string;
  incident: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  diagnosis: string;
  explanation: string;
}

export const Lesson22QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // =========================================================================
  // УРОВЕНЬ 5A: ДОКТОР БЕЗОПАСНОСТИ (3 ПАЦИЕНТА, +25 ОП ЗА КАЖДОГО)
  // =========================================================================
  const patients: PatientCase[] = [
    {
      id: 1,
      title: 'Пациент №1: Эксперименты на живом сайте',
      incident: 'Разработчик решил быстро проверить новую кнопку оформления заказа прямо на боевом сайте (Live). В итоге форма упала с ошибкой, и клиенты 2 часа не могли совершать покупки.',
      options: [
        { id: '1a', text: 'Нужно было отключить сервер на весь день', isCorrect: false },
        { id: '1b', text: 'Нужно было сначала протестировать в Test-окружении (ветке черновика)', isCorrect: true },
        { id: '1c', text: 'Клиенты сами виноваты, надо было перезагрузить страницу', isCorrect: false }
      ],
      diagnosis: 'Острое пренебрежение Test-окружением!',
      explanation: 'Правило DevOps: любые новые фичи и эксперименты проводятся ТОЛЬКО в Test-окружении. В Live попадает только 100% проверенный код.'
    },
    {
      id: 2,
      title: 'Пациент №2: «Спрятанный» в комментариях ключ',
      incident: 'Студент закомментировал API-ключ в коде: // const key = "AIza123...". Через 10 минут после пуша на GitHub ему пришло уведомление о списании $200 за чужие запросы.',
      options: [
        { id: '2a', text: 'Комментарии не защищают код! Ключ нужно было вынести в Environment Variable (.env)', isCorrect: true },
        { id: '2b', text: 'Надо было просто удалить одну букву из ключа', isCorrect: false },
        { id: '2c', text: 'В комментариях код не читается браузером, это просто случайность', isCorrect: false }
      ],
      diagnosis: 'Иллюзия безопасности через комментарии!',
      explanation: 'Боты на GitHub сканируют весь файл целиком, включая комментарии. Единственный способ обезопасить ключ — файл .env или GitHub Secrets.'
    },
    {
      id: 3,
      title: 'Пациент №3: Игнорирование красного крестика в CI/CD',
      incident: 'Робот автоматической проверки GitHub Actions показал ❌ красный крестик при сборке. Разработчик проигнорировал ошибку и принудительно нажал "Deploy". Сайт превратился в белый экран.',
      options: [
        { id: '3a', text: 'Красный крестик — это рекомендация, а не правило', isCorrect: false },
        { id: '3b', text: 'Надо было удалить файл deploy.yml, чтобы он не мешал', isCorrect: false },
        { id: '3c', text: 'Красный крестик — сигнал немедленно ОСТАНОВИТЬСЯ, прочесть лог и исправить ошибку перед деплоем', isCorrect: true }
      ],
      diagnosis: 'Игнорирование аварийной сигнализации автопилота!',
      explanation: 'Если робот CI/CD упал с ошибкой — деплой должен быть заблокирован. Робот спасает репутацию проекта!'
    }
  ];

  const [patientAnswers, setPatientAnswers] = useState<Record<number, string>>({});
  const [patientSolved, setPatientSolved] = useState<Record<number, boolean>>({});

  const handlePatientSelect = (patientId: number, optionId: string, isCorrect: boolean) => {
    setPatientAnswers((prev) => ({ ...prev, [patientId]: optionId }));
    if (isCorrect && !patientSolved[patientId]) {
      setPatientSolved((prev) => ({ ...prev, [patientId]: true }));
      addReward(25, `🩺 Диагноз Пациенту №${patientId} поставлен верно! (+25 ОП)`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // =========================================================================
  // УРОВЕНЬ 5B: БЫСТРОЕ ИСПЫТАНИЕ В ПАРАХ (90 СЕКУНД, +50 ОП)
  // =========================================================================
  const [blitzTimer, setBlitzTimer] = useState<number>(90);
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzChecked, setBlitzChecked] = useState<{ q1: boolean; q2: boolean; q3: boolean }>({
    q1: false,
    q2: false,
    q3: false
  });
  const [blitzRewardClaimed, setBlitzRewardClaimed] = useState(false);

  const startBlitz = () => {
    setBlitzActive(true);
    setBlitzTimer(90);
    const interval = setInterval(() => {
      setBlitzTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setBlitzActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleBlitzQuestion = (key: 'q1' | 'q2' | 'q3') => {
    const next = { ...blitzChecked, [key]: !blitzChecked[key] };
    setBlitzChecked(next);
    if (next.q1 && next.q2 && next.q3 && !blitzRewardClaimed) {
      setBlitzRewardClaimed(true);
      addReward(50, '⚡ Блиц-испытание 3/3 в парах пройдено блестяще! (+50 ОП)');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  // =========================================================================
  // УРОВЕНЬ 6: ОТЧЁТ DEVOPS (20 СЕКУНД, +25 ОП)
  // =========================================================================
  const [devopsPitchTimer, setDevopsPitchTimer] = useState<number>(20);
  const [devopsPitchActive, setDevopsPitchActive] = useState(false);
  const [devopsPitchCompleted, setDevopsPitchCompleted] = useState(false);

  const startDevopsPitch = () => {
    setDevopsPitchActive(true);
    setDevopsPitchTimer(20);
    let remaining = 20;
    const timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timer);
        setDevopsPitchTimer(0);
        setDevopsPitchActive(false);
        setDevopsPitchCompleted(true);
        addReward(25, '🎤 Отчёт DevOps сдан за 20 секунд! (+25 ОП)');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
      } else {
        setDevopsPitchTimer(remaining);
      }
    }, 1000);
  };

  // =========================================================================
  // УРОВЕНЬ 7: ФИНАЛЬНЫЙ ТЕСТ (5 ВОПРОСОВ, ДО +25 ОП)
  // =========================================================================
  const questions = [
    {
      id: 1,
      q: 'Что означает цепочка Build → Test → Deploy?',
      options: [
        { id: 'a', text: 'Собрать → Проверить → Опубликовать', isCorrect: true },
        { id: 'b', text: 'Купить → Продать → Забыть', isCorrect: false },
        { id: 'c', text: 'Название языка программирования', isCorrect: false },
        { id: 'd', text: 'Тип графического дизайна', isCorrect: false }
      ]
    },
    {
      id: 2,
      q: 'Чем Test-окружение отличается от Live?',
      options: [
        { id: 'a', text: 'Ничем не отличается, это просто разные слова', isCorrect: false },
        { id: 'b', text: 'Test можно безопасно ломать, а Live видят реальные пользователи', isCorrect: true },
        { id: 'c', text: 'Live всегда работает медленнее', isCorrect: false },
        { id: 'd', text: 'Test-окружение не нужно создавать', isCorrect: false }
      ]
    },
    {
      id: 3,
      q: 'Что такое Environment Variable (переменная окружения)?',
      options: [
        { id: 'a', text: 'Способ спрятать секрет отдельно от кода, который видят все', isCorrect: true },
        { id: 'b', text: 'Переменная для анимации фона страницы', isCorrect: false },
        { id: 'c', text: 'Ошибка в сборщике Vite', isCorrect: false },
        { id: 'd', text: 'Имя автора проекта на GitHub', isCorrect: false }
      ]
    },
    {
      id: 4,
      q: 'Что означает красный крестик ❌ в CI/CD после отправки кода?',
      options: [
        { id: 'a', text: 'Всё отлично, можно праздновать', isCorrect: false },
        { id: 'b', text: 'Что-то сломалось — нужно остановиться и исправить', isCorrect: true },
        { id: 'c', text: 'Просто украшение консоли разработчика', isCorrect: false },
        { id: 'd', text: 'Публикация прошла успешно в фоновом режиме', isCorrect: false }
      ]
    },
    {
      id: 5,
      q: 'Почему нельзя экспериментировать прямо в Live-окружении?',
      options: [
        { id: 'a', text: 'Можно, если никто не заметит', isCorrect: false },
        { id: 'b', text: 'Реальные пользователи сразу увидят любую поломку и потеряют доверие', isCorrect: true },
        { id: 'c', text: 'Live-окружение не поддерживает изменение кода', isCorrect: false },
        { id: 'd', text: 'Это не имеет никакого значения', isCorrect: false }
      ]
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    22,
    questions,
    testAnswers,
    setTestAnswers,
    testSubmitted,
    setTestSubmitted,
    setTestScore
  );

  const handleTestOptionClick = (questionId: number, optionId: string) => {
    if (testSubmitted) return;
    setTestAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleFinishTest = () => {
    let score = 0;
    questions.forEach((q) => {
      const selected = testAnswers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect)?.id;
      if (selected === correctOption) {
        score += 1;
      }
    });

    setTestScore(score);
    setTestSubmitted(true);

    if (score >= 4) {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleResetTest = () => {
    setTestAnswers({});
    setTestSubmitted(false);
    setTestScore(0);
  };

  return (
    <div className="space-y-10 text-slate-100">
      {/* ============================================================== */}
      {/* 🩺 УРОВЕНЬ 5A: ДОКТОР БЕЗОПАСНОСТИ                            */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              УРОВЕНЬ 5A • 70–76 МИН • КОНСИЛИУМ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <span>Доктор Безопасности: 3 Реальных Пациента</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 font-bold">
            +25 ОП ЗА ПАЦИЕНТА
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Поставь точный диагноз каждой аварийной ситуации, которая произошла в IT-командах из-за нарушения стандартов безопасности:
        </p>

        <div className="space-y-4">
          {patients.map((pat) => {
            const isSolved = patientSolved[pat.id];
            const currentSelected = patientAnswers[pat.id];

            return (
              <div
                key={pat.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSolved
                    ? 'bg-emerald-950/20 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm sm:text-base text-white">{pat.title}</span>
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      isSolved
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {isSolved ? '✓ ДИАГНОЗ ВЕРЕН' : 'ОЖИДАЕТ КОНСИЛИУМА'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 mb-3 leading-relaxed">
                  <strong>Что произошло:</strong> {pat.incident}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {pat.options.map((opt) => {
                    const isPicked = currentSelected === opt.id;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (isPicked) {
                      style = opt.isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/50 border-rose-500 text-rose-200';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePatientSelect(pat.id, opt.id, opt.isCorrect)}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span>{opt.text}</span>
                        {isPicked && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                        {isPicked && !opt.isCorrect && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Diagnosis Details */}
                {isSolved && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-in fade-in">
                    <div className="font-bold flex items-center gap-1.5">
                      <span>🩺 Диагноз: {pat.diagnosis}</span>
                    </div>
                    <p className="text-slate-300">{pat.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ⚡ УРОВЕНЬ 5B: БЫСТРОЕ ИСПЫТАНИЕ В ПАРАХ (90 СЕК)             */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              УРОВЕНЬ 5B • 76–80 МИН • БЛИЦ-ИСПЫТАНИЕ
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Быстрое испытание в парах: 90 секунд</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 font-bold">
            +50 ОП ЗА 3/3
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Запусти таймер на 90 секунд и объясни своему напарнику 3 ключевых понятия без подсказок:
        </p>

        {/* Timer Control */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Timer className={`w-6 h-6 ${blitzActive ? 'text-amber-400 animate-spin' : 'text-slate-500'}`} />
            <div>
              <span className="text-xs text-slate-400 block font-mono">ТАЙМЕР БЛИЦА</span>
              <span className="text-2xl font-black font-mono text-white">{blitzTimer} сек</span>
            </div>
          </div>

          <button
            type="button"
            disabled={blitzActive}
            onClick={startBlitz}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
          >
            {blitzActive ? 'Идет испытание...' : 'Старт (90 секунд)'}
          </button>
        </div>

        {/* 3 Questions Checklist */}
        <div className="space-y-2.5 text-xs sm:text-sm">
          {[
            { id: 'q1' as const, text: '1. Чем Test-окружение отличается от Live простыми словами?' },
            { id: 'q2' as const, text: '2. Что такое Environment Variable (сейф) и почему ключ нельзя писать в коде?' },
            { id: 'q3' as const, text: '3. Что означает аббревиатура CI/CD и робот автопилота?' }
          ].map((item) => {
            const isDone = blitzChecked[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleBlitzQuestion(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{item.text}</span>
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ml-3 ${
                    isDone ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🎤 УРОВЕНЬ 6: ОТЧЁТ DEVOPS (20 СЕКУНД)                         */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              УРОВЕНЬ 6 • 80–87 МИН • ПИТЧ-ОТЧЁТ
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-indigo-400" />
              <span>Отчёт DevOps: 20 секунд на каждого</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800 font-bold">
            +25 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          За 20 секунд громко озвучь классу и ментору статус безопасности своих проектов по формуле:
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 space-y-1.5">
          <div>«Проверено проектов: <strong>5 из 5</strong></div>
          <div>Самая важная находка: <strong>(например: удалил скрытый API-ключ в чат-боте)</strong></div>
          <div>Все проекты теперь безопасны? <strong>ДА, ГОТОВ К ВЫПУСКНОМУ!</strong>»</div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Timer className={`w-5 h-5 ${devopsPitchActive ? 'text-indigo-400 animate-spin' : 'text-slate-500'}`} />
            <span className="font-mono text-lg font-bold text-white">{devopsPitchTimer} сек</span>
          </div>

          <button
            type="button"
            disabled={devopsPitchActive}
            onClick={startDevopsPitch}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg cursor-pointer"
          >
            {devopsPitchActive ? 'Идет отсчет 20 сек...' : 'Старт отсчета питча (20 сек)'}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 🏆 УРОВЕНЬ 7: ФИНАЛЬНЫЙ ТЕСТ И ЗВАНИЕ DEVOPS ENGINEER          */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              УРОВЕНЬ 7 • 87–90 МИН • АТТЕСТАЦИЯ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>Финальный Тест: Звание DevOps Engineer</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 font-bold">
            ДО +25 ОП ЗА 5/5
          </span>
        </div>

        {/* 5 Questions */}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const selectedOpt = testAnswers[q.id];

            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="font-bold text-xs sm:text-sm text-cyan-300">
                  Вопрос #{idx + 1}: {q.q}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (testSubmitted) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={testSubmitted}
                        onClick={() => handleTestOptionClick(q.id, opt.id)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {testSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Test Control Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {!testSubmitted ? (
            <button
              type="button"
              disabled={Object.keys(testAnswers).length < questions.length}
              onClick={handleFinishTest}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Завершить тест и получить звание (+25 ОП)</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-emerald-400">
                Результат: {testScore} из {questions.length} верно!
              </span>
              <button
                type="button"
                onClick={handleResetTest}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Пройти заново</span>
              </button>
            </div>
          )}
        </div>

        {/* Badge Award Celebration Card */}
        {testSubmitted && testScore >= 4 && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-purple-950/60 border-2 border-cyan-400/60 flex flex-col sm:flex-row items-center gap-6 shadow-2xl animate-in fade-in">
            <img
              src={badgeDevOpsImg}
              alt="Бейдж DevOps Engineer"
              className="w-28 h-28 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
                <Rocket className="w-3.5 h-3.5" />
                <span>НОВЫЙ РАНГ ПРИСВОЕН: DEVOPS ENGINEER (Lv.22)</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                Поздравляем! Ты — Официальный DevOps Engineer курса!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Твои проекты прошли через огонь, воду, QA-тесты и тотальный Security Audit. 
                В коде нет секретов, окружения настроены, а ссылки готовы к открытию миру. 
                Дальше — только Сборка Портфолио (Миссия 23) и Большой Выпускной Demo Day! 🚀
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
