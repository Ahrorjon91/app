import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Code,
  Layers,
  ArrowRight,
  Brain,
  Bot,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Eye,
  ShieldCheck,
  Lock,
  MessageSquare,
  HelpCircle,
  Clock,
  Play,
  Pause,
  RefreshCw,
  Trophy,
  Stethoscope,
  ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeAiEngineerImg from '../../assets/images/lesson19_badge_ai_engineer_1790242344171.jpg';

export const Lesson19QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // ==========================================
  // LEVEL 5A: DOCTOR OF EMBEDDED AI (3 PATIENTS)
  // ==========================================
  const [patients, setPatients] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  const healPatient = (id: number) => {
    if (patients[id]) return;
    setPatients(prev => {
      const next = { ...prev, [id]: true };
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
      addReward(25, `🩺 Пациент #${id} успешно вылечен (+25 ОП)!`);
      return next;
    });
  };

  // ==========================================
  // LEVEL 5B: RAPID 90s CHALLENGE
  // ==========================================
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [rapidDone, setRapidDone] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(90);
  };

  const handleClaimRapid = () => {
    if (rapidDone) return;
    setRapidDone(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addReward(50, '⚡ Быстрое испытание (90с) в парах успешно зачтено (+50 ОП)!');
  };

  // ==========================================
  // LEVEL 6: SHOWCASE PITCH BUILDER & VOTING
  // ==========================================
  const [pitchFeature, setPitchFeature] = useState('AI Tutor для объяснения сложных понятий');
  const [pitchMechanism, setPitchMechanism] = useState('нажимаешь кнопку, и ответ с метафорой появляется прямо в карточке');
  const [pitchTestScore, setPitchTestScore] = useState('4/4 (не сдаётся на провокации)');
  const [votesCount, setVotesCount] = useState(16);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setVotesCount(v => v + 1);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    addReward(25, '🎤 Голос за самый умный встроенный ИИ отдан (+25 ОП)!');
  };

  // ==========================================
  // LEVEL 7: 5 QUALIFICATION QUIZ QUESTIONS
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: 'Чем встроенный ИИ отличается от отдельного чата с ChatGPT?',
      options: [
        'A) Ничем не отличается',
        'B) Встроенный ИИ работает прямо внутри приложения, без переключения вкладок',
        'C) Встроенный ИИ работает только офлайн',
        'D) Встроенный ИИ нельзя использовать бесплатно'
      ],
      correct: 1,
      explanation: 'Встроенный ИИ интегрирован прямо в пользовательский интерфейс по API: пользователь получает умный ответ в один клик без перехода на сторонние сайты.'
    },
    {
      id: 2,
      q: 'Что такое System Prompt?',
      options: [
        'A) Сообщение, которое видит пользователь',
        'B) Невидимые правила, по которым ИИ работает внутри приложения',
        'C) Название кнопки',
        'D) Ошибка в коде'
      ],
      correct: 1,
      explanation: 'System Prompt — это скрытая инструкция для модели. Она задаёт роль, задачу, стиль ответов и ограничения безопасности, которые пользователь не видит.'
    },
    {
      id: 3,
      q: 'Что должно произойти, если ИИ не отвечает (ошибка сети или превышение лимита)?',
      options: [
        'A) Белый экран без объяснений',
        'B) Дружелюбное сообщение об ошибке (fallback) вместо «падения» приложения',
        'C) Приложение должно закрыться',
        'D) Ничего, это не важно'
      ],
      correct: 1,
      explanation: 'Профессиональный софт защищён блоком try/catch: вместо белого экрана или зависания пользователь видит понятное ободряющее сообщение.'
    },
    {
      id: 4,
      q: 'Зачем в System Prompt указывать «не более X предложений»?',
      options: [
        'A) Это не нужно',
        'B) Чтобы ответ был коротким и удобным для интерфейса приложения',
        'C) Чтобы ИИ никогда не отвечал',
        'D) Чтобы усложнить код'
      ],
      correct: 1,
      explanation: 'Внутри мобильных и веб-приложений длинные простыни текста ломают вёрстку и утомляют пользователя. Лимит размера держит ответы компактными.'
    },
    {
      id: 5,
      q: 'ИИ в приложении для тренировки английского вдруг начал обсуждать посторонние темы. Что нужно исправить?',
      options: [
        'A) Ничего, это нормально',
        'B) Добавить в System Prompt правило возвращать разговор к теме приложения',
        'C) Удалить приложение',
        'D) Это вина пользователя'
      ],
      correct: 1,
      explanation: 'Правило удержания фокуса («Если вопрос не по теме, вежливо верни к теме») не позволяет пользователям сбивать ИИ с его целевой функции.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [badgeUnlockedNotified, setBadgeUnlockedNotified] = useState(false);

  useLessonQuizPersistence(
    19,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    return score;
  };

  const handleGradeQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) return;
    setQuizSubmitted(true);
    const score = calculateScore();

    if (score >= 4) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.4 } });
      unlockBadge('ai-engineer-19');
      setBadgeUnlockedNotified(true);
    }
  };

  return (
    <div className="space-y-12 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            УРОВНИ 5–7 • ⏱ 70–90 МИН • 🎁 ДО +175 ОП
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Диагностика · Спринт 90с · Питч · Аттестация
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Доктор Встроенного ИИ, Быстрое Испытание и Аттестация
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Вылечи 3 типичные болезни встроенных нейросетей, проведи 90-секундный спарринг с напарником и сдай экзамен на звание <strong>AI ENGINEER (Lv.19)</strong>!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 5A: DOCTOR OF EMBEDDED AI */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-rose-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 5A • ⏱ 70–76 МИН • 🎁 +25 ОП ЗА КАЖДОГО
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-rose-400" />
              🩺 ДОКТОР ВСТРОЕННОГО ИИ: Вылечи 3 багующих сценария
            </h3>
          </div>
          <span className="text-xs font-mono text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
            Вылечено: {Object.values(patients).filter(Boolean).length} / 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Patient 1 */}
          <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between transition-all ${
            patients[1] ? 'bg-emerald-950/30 border-emerald-500/60' : 'bg-slate-950 border-rose-500/40'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white">Пациент #1</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  patients[1] ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {patients[1] ? 'ВЫЛЕЧЕН 🎉' : 'БОЛЕН 🤒'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">
                «При нажатии кнопки — белый экран и краш»
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Диагноз:</strong> Сетевой запрос к Gemini упал, а в коде не было блока <code>catch</code> и fallback-сообщения. Интерфейс завис.
              </p>
            </div>

            <button
              onClick={() => healPatient(1)}
              disabled={patients[1]}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                patients[1]
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
              }`}
            >
              {patients[1] ? <Check className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
              {patients[1] ? 'Fallback сообщение добавлено (+25 ОП)' : 'Вылечить: добавить try/catch fallback'}
            </button>
          </div>

          {/* Patient 2 */}
          <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between transition-all ${
            patients[2] ? 'bg-emerald-950/30 border-emerald-500/60' : 'bg-slate-950 border-rose-500/40'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white">Пациент #2</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  patients[2] ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {patients[2] ? 'ВЫЛЕЧЕН 🎉' : 'БОЛЕН 🤒'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">
                «ИИ выдаёт гигантскую лекцию на 500 слов»
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Диагноз:</strong> В System Prompt забыли ограничить длину. Мобильный экран перегружен, читать неудобно.
              </p>
            </div>

            <button
              onClick={() => healPatient(2)}
              disabled={patients[2]}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                patients[2]
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
              }`}
            >
              {patients[2] ? <Check className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
              {patients[2] ? 'Лимит 2-3 предложений задан (+25 ОП)' : 'Вылечить: ограничить размер ответа'}
            </button>
          </div>

          {/* Patient 3 */}
          <div className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between transition-all ${
            patients[3] ? 'bg-emerald-950/30 border-emerald-500/60' : 'bg-slate-950 border-rose-500/40'
          }`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white">Пациент #3</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  patients[3] ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {patients[3] ? 'ВЫЛЕЧЕН 🎉' : 'БОЛЕН 🤒'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">
                «ИИ в тренажёре английского стал обсуждать игры»
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Диагноз:</strong> Нейросеть поддалась на провокацию. В System Prompt отсутствует защитное правило возврата к теме.
              </p>
            </div>

            <button
              onClick={() => healPatient(3)}
              disabled={patients[3]}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                patients[3]
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
              }`}
            >
              {patients[3] ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              {patients[3] ? 'Правило возврата к теме активно (+25 ОП)' : 'Вылечить: зашить правило возврата'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 5B: RAPID 90s CHALLENGE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 5B • ⏱ 76–80 МИН • 🎁 +50 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              ⚡ БЫСТРОЕ ИСПЫТАНИЕ: 90 секунд в парах
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Блиц-опрос напарника</span>
        </div>

        {/* Live Timer Display */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`text-4xl sm:text-5xl font-mono font-black ${
              timeLeft < 20 ? 'text-rose-500 animate-pulse' : 'text-amber-400'
            }`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-slate-400">
              {timerRunning ? '⏳ Время идёт! Задавай 3 вопроса напарнику' : 'Таймер остановлен'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTimer}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {timerRunning ? 'Пауза' : 'Старт таймера'}
            </button>
            <button
              onClick={resetTimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Rapid Questions */}
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <strong className="text-white">Чем встроенный ИИ отличается от отдельного чата с ChatGPT?</strong>
              <div className="text-slate-400 text-xs mt-0.5">
                (Подсказка: Встроенный ИИ живет внутри кнопки приложения, отвечает в 1 клик без ручного копирования)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <strong className="text-white">Что такое System Prompt простыми словами?</strong>
              <div className="text-slate-400 text-xs mt-0.5">
                (Подсказка: Невидимые пользователю правила роли, стиля и ограничений ИИ, зашитые прямо в код)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <strong className="text-white">Зачем нужна защита от «неожиданных» ответов ИИ?</strong>
              <div className="text-slate-400 text-xs mt-0.5">
                (Подсказка: Чтобы ограничить простыни текста, не уходить от темы софта и не ронять приложение при ошибках сети)
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleClaimRapid}
          disabled={rapidDone}
          className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            rapidDone
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
          }`}
        >
          {rapidDone ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
          {rapidDone ? 'Испытание 90с зачтено (+50 ОП)' : 'Оба ответили правильно! Зачесть 3/3 (+50 ОП)'}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 6: SHOWCASE PITCH & VOTING */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-violet-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 6 • ⏱ 80–87 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Award className="w-6 h-6 text-violet-400" />
              🎤 ПОКАЗ AI-ПРИЛОЖЕНИЙ: 20-секундный конструктор питча
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Презентация классу</span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">1. Моя AI-функция:</label>
              <input
                type="text"
                value={pitchFeature}
                onChange={(e) => setPitchFeature(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">2. Как она работает:</label>
              <input
                type="text"
                value={pitchMechanism}
                onChange={(e) => setPitchMechanism(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">3. Результат стресс-теста:</label>
              <input
                type="text"
                value={pitchTestScore}
                onChange={(e) => setPitchTestScore(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
              />
            </div>
          </div>

          {/* Constructed Pitch Box */}
          <div className="p-4 rounded-2xl bg-violet-950/40 border border-violet-500/40 text-xs sm:text-sm text-violet-200 leading-relaxed space-y-1">
            <div className="font-mono text-xs text-violet-300 font-bold uppercase">Твой готовый 20-секундный питч:</div>
            <p>
              «Привет всем! Моё приложение стало полноценным умным софтом: я встроил(а) в него <strong>{pitchFeature}</strong>. Работает это бесшовно: <strong>{pitchMechanism}</strong>! А главное — встроенный ИИ выдержал строгий стресс-тест на <strong>{pitchTestScore}</strong> и говорит строго от лица моего продукта!»
            </p>
          </div>

          {/* Voting Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              🏆 Голосуем за звание: <strong>«Самый умный ИИ внутри приложения»</strong>
            </div>
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                hasVoted
                  ? 'bg-violet-950 text-violet-300 border border-violet-700 cursor-default'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {hasVoted ? `Голос учтён (${votesCount})` : `Проголосовать (${votesCount} голосов)`}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 7: 5 QUALIFICATION QUESTIONS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 7 • ⏱ 87–90 МИН • 🎁 +50 ОП ЗА 4+
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-emerald-400" />
              🏆 Финальный тест квалификации (5 вопросов)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {quizSubmitted ? `Результат: ${calculateScore()} / 5` : 'Ответьте на все 5 вопросов'}
          </span>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => {
            const isAnswered = selectedAnswers[qIdx] !== undefined;
            const isCorrect = selectedAnswers[qIdx] === q.correct;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-white text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-violet-400 font-mono">#{q.id}.</span>
                  <span>{q.q}</span>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (optIdx === q.correct) {
                        optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      } else {
                        optStyle = 'bg-slate-900/40 border-slate-800 text-slate-500';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-violet-950 border-violet-400 text-violet-200 font-bold ring-1 ring-violet-400';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        disabled={quizSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans mt-2">
                    💡 <strong>Разбор:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleGradeQuiz}
            disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            Сдать тест квалификации (5/5 отвечено)
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-2">
            <div className="text-base font-bold text-white">
              {calculateScore() >= 4
                ? '🎉 Поздравляем! Ты подтвердил звание AI ENGINEER!'
                : 'Хорошая попытка! Прочитай разборы и попробуй ещё раз.'}
            </div>
            <div className="text-xs text-slate-400">
              Правильных ответов: {calculateScore()} из 5
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* XP SUMMARY TABLE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          📊 Сводная ведомость ОП за Миссию 19
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2">Этап миссии</th>
                <th className="pb-2">Действие</th>
                <th className="pb-2 text-right">Награда</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 text-amber-400">Уровень 1</td>
                <td className="py-2">Запуск: показ ДЗ Миссии 18 ментору</td>
                <td className="py-2 text-right text-emerald-400">+25 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-violet-400">Уровень 3</td>
                <td className="py-2">Ролевая игра: симулятор «Будь ИИ»</td>
                <td className="py-2 text-right text-emerald-400">+25 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400">Уровень 4</td>
                <td className="py-2">Лаборатория: System Prompt утверждён</td>
                <td className="py-2 text-right text-emerald-400">+50 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-cyan-400">Уровень 4</td>
                <td className="py-2">Лаборатория: AI-кнопка встроена</td>
                <td className="py-2 text-right text-emerald-400">+75 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-rose-400">Уровень 4</td>
                <td className="py-2">Лаборатория: Стресс-тест 4/4 пройден</td>
                <td className="py-2 text-right text-emerald-400">+25 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-rose-400">Уровень 5A</td>
                <td className="py-2">Доктор встроенного ИИ: 3 пациента</td>
                <td className="py-2 text-right text-emerald-400">+75 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-amber-400">Уровень 5B</td>
                <td className="py-2">Быстрое испытание (90с в парах)</td>
                <td className="py-2 text-right text-emerald-400">+50 ОП</td>
              </tr>
              <tr>
                <td className="py-2 text-violet-400">Уровень 6</td>
                <td className="py-2">Показ AI-приложений & Питч</td>
                <td className="py-2 text-right text-emerald-400">+25 ОП</td>
              </tr>
              <tr className="font-bold text-white border-t border-slate-700">
                <td className="py-2.5 text-cyan-400">ИТОГО</td>
                <td className="py-2.5">Максимум за миссию</td>
                <td className="py-2.5 text-right text-cyan-400">+350 ОП</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* NEW RANK & BADGE SHOWCASE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 via-slate-950 to-slate-900 border-2 border-violet-500/50 shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-violet-400 shadow-xl shrink-0 group">
          <img
            src={badgeAiEngineerImg}
            alt="Бейдж AI ENGINEER Lv.19"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="space-y-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
              НОВЫЙ РАНГ РАЗБЛОКИРОВАН
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
              AI Apps: 3/4 ⭐⭐⭐
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white">
            🧬 AI ENGINEER (Lv.19)
          </h3>

          <div className="text-xs font-mono text-slate-400">
            Эволюция: <span className="text-slate-300">🧠 DATA ENGINEER Lv.18</span> ──▶ <span className="text-violet-400 font-bold">🧬 AI ENGINEER Lv.19</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            «Ты сделал то, что раньше делали только профессиональные команды разработчиков: встроил настоящий ИИ внутрь своего продукта. Это уже полноценное AI-приложение!»
          </p>

          <div className="text-xs font-mono text-violet-400 font-bold">
            — ИИ-наставник NOVA
          </div>
        </div>
      </div>
    </div>
  );
};
