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
  Terminal,
  RefreshCw,
  Send,
  Loader2,
  Cpu,
  Trophy,
  Star,
  Mic,
  Bug,
  ThumbsUp,
  Activity,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeQaEngineerImg from '../../assets/images/lesson21_badge_qa_engineer_1790248371118.jpg';

export const Lesson21QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // LEVEL 5A: ДОКТОР РЕГРЕССИИ (3 ПАЦИЕНТА)
  // ==========================================
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Пациент №1: Кнопка «Сохранить» & «Отмена»',
      symptom: 'Починили кнопку «Сохранить», но теперь почему-то ломается и зависает кнопка «Отмена»',
      options: [
        'Не хватает оперативной памяти компьютера',
        'Классическая regression — нужно перепроверить весь экран после фикса',
        'Проблема в браузере пользователя, можно игнорировать'
      ],
      correctIndex: 1,
      selectedIndex: null as number | null,
      cured: false,
      diagnosis: 'Классическая регрессия (Regression): правка стилей или стейта в одном месте затронула соседний обработчик событий.'
    },
    {
      id: 2,
      name: 'Пациент №2: Таинственный отчет тестировщика',
      symptom: 'QA-инженер написал в чат: «Ничего не работает!», но не указал, что именно ожидалось и на каком экране',
      options: [
        'Срочно переписать весь проект с нуля',
        'Неполный test case — нужны Expected и Actual, а не просто «сломано»',
        'Заблокировать тестировщика в репозитории'
      ],
      correctIndex: 1,
      selectedIndex: null as number | null,
      cured: false,
      diagnosis: 'Неполный баг-репорт: без формулы Expected vs Actual и шагов воспроизведения разработчик не сможет понять и повторить баг.'
    },
    {
      id: 3,
      name: 'Пациент №3: Прямой коммит в Production',
      symptom: 'Все исправления делались прямо в ветку main на лету без тестирования, и один мелкий фикс сломал рабочий live-сайт',
      options: [
        'Нужно всегда тестировать в отдельной Git-ветке перед публикацией',
        'Больше никогда не исправлять баги',
        'Удалить репозиторий с GitHub'
      ],
      correctIndex: 0,
      selectedIndex: null as number | null,
      cured: false,
      diagnosis: 'Нарушение изоляции веток: ветка main всегда должна быть неприкосновенной и рабочей. Все правки — только через test-branch.'
    }
  ]);

  const handleDiagnose = (patientId: number, optionIdx: number) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId && !p.cured) {
          const isCorrect = optionIdx === p.correctIndex;
          if (isCorrect) {
            addReward(25, `🩺 Пациент #${patientId} вылечен! Диагноз поставлен верно! (+25 ОП)`);
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
          }
          return {
            ...p,
            selectedIndex: optionIdx,
            cured: isCorrect
          };
        }
        return p;
      })
    );
  };

  const curedPatientsCount = patients.filter((p) => p.cured).length;

  // ==========================================
  // LEVEL 5B: БЫСТРОЕ ИСПЫТАНИЕ (90 СЕКУНД ТАЙМЕР)
  // ==========================================
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [challengeItems, setChallengeItems] = useState({
    bugTypes: false,
    regression: false,
    gitBranch: false
  });
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const toggleChallengeCheck = (key: keyof typeof challengeItems) => {
    const updated = { ...challengeItems, [key]: !challengeItems[key] };
    setChallengeItems(updated);

    const count = Object.values(updated).filter(Boolean).length;
    if (count === 3 && !challengeCompleted) {
      setChallengeCompleted(true);
      setTimerActive(false);
      addReward(50, '⚡ БЫСТРОЕ ИСПЫТАНИЕ ПРОЙДЕНО 3/3! (+50 ОП)');
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  // ==========================================
  // LEVEL 6: ОТЧЁТ QA (20 СЕКУНД ПРЕЗЕНТАЦИЯ)
  // ==========================================
  const [reportBugTitle, setReportBugTitle] = useState('');
  const [reportBugType, setReportBugType] = useState('UI Bug');
  const [reportFixMethod, setReportFixMethod] = useState('');
  const [reportSaved, setReportSaved] = useState(false);
  const [valuableVotes, setValuableVotes] = useState(14);
  const [userVotedValuable, setUserVotedValuable] = useState(false);

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportBugTitle.trim()) return;
    setReportSaved(true);
    addReward(25, '🎤 Отчёт QA успешно представлен ментору! (+25 ОП)');
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handleVoteValuable = () => {
    if (userVotedValuable) return;
    setUserVotedValuable(true);
    setValuableVotes((prev) => prev + 1);
    addReward(15, 'Голос за самый ценный баг учтён! (+15 ОП)');
  };

  // ==========================================
  // LEVEL 7: ФИНАЛЬНЫЙ ТЕСТ (5 ВОПРОСОВ)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: '1. Что такое test case по формуле Expected vs Actual?',
      options: [
        'A) Способ визуально украсить интерфейс',
        'B) Сравнение того, что должно произойти (Expected), с тем, что произошло на самом деле (Actual)',
        'C) Название кнопки отправки формы',
        'D) Тип шрифта в CSS'
      ],
      correct: 1,
      explanation: 'Правильно! Test Case всегда сравнивает ожидаемое поведение с реальным фактом. Если они не равны — это баг.'
    },
    {
      id: 2,
      q: '2. Какой из этих багов является Responsive Bug?',
      options: [
        'A) Кнопка неправильного фиолетового цвета',
        'B) Счётчик корзины считает неверно',
        'C) На телефоне с маленьким экраном текст наезжает на картинку и появляется горизонтальный скролл',
        'D) Опечатка в тексте заголовка'
      ],
      correct: 2,
      explanation: 'Точно! Responsive Bug проявляется именно при определенных размерах экрана или ориентации устройства.'
    },
    {
      id: 3,
      q: '3. Что такое regression в разработке ПО?',
      options: [
        'A) Когда приложение начинает работать в 2 раза быстрее',
        'B) Когда исправление одной проблемы случайно создает новую поломку в другом месте',
        'C) Название библиотеки машинного обучения',
        'D) Тип векторной базы данных'
      ],
      correct: 1,
      explanation: 'Именно так! Регрессия — это откат назад в качестве, когда фикс кнопки А незаметно ломает кнопку Б.'
    },
    {
      id: 4,
      q: '4. Зачем нужна отдельная Git-ветка (branch) для тестирования?',
      options: [
        'A) Чтобы искусственно усложнить работу',
        'B) Чтобы безопасно экспериментировать и тестировать баги, не рискуя сломать рабочую версию (main)',
        'C) Ветки в Git не нужны и не используются',
        'D) Только для огромных корпораций от 1000 сотрудников'
      ],
      correct: 1,
      explanation: 'В точку! Ветка — это как черновик. Если что-то пошло не так, ветку можно удалить, а main останется невредимым.'
    },
    {
      id: 5,
      q: '5. Почему найденный тестировщиком баг — это хорошо, а не плохо?',
      options: [
        'A) Это не хорошо, багов не должно быть никогда',
        'B) Намного лучше найти и исправить баг сейчас, чем опозориться перед жюри на Demo Day',
        'C) Баги делают проект красивее',
        'D) Это не имеет никакого значения'
      ],
      correct: 1,
      explanation: 'Блестяще! Найти баг сегодня — значит защитить себя от катастрофы на публичной презентации Demo Day!'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useLessonQuizPersistence(
    21,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted,
    setCorrectCount
  );

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    setCorrectCount(score);
    setQuizSubmitted(true);

    if (score >= 4) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* ============================================================== */}
      {/* HEADER                                                         */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-cyan-500/30 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> РАЗДЕЛ 3: ПРОВЕРКА ЗНАНИЙ
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Уровни 5, 6 и 7 (до +150 ОП)
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
          🩺 ДОКТОР РЕГРЕССИИ, БЫСТРЫЙ ТЕСТ И ЗВАНИЕ QA ENGINEER
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Пройди клиническую диагностику 3 пациентов с багами, выдержи 90-секундный блиц-экзамен, 
          подготовь 20-секундный отчёт о главном найденном баге и подтверди новый ранг!
        </p>
      </div>

      {/* ============================================================== */}
      {/* 🩺 УРОВЕНЬ 5A — ДОКТОР РЕГРЕССИИ (3 ПАЦИЕНТА)                   */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> 🩺 УРОВЕНЬ 5A — Доктор Регрессии: Консилиум по 3 пациентам
            </h3>
            <p className="text-xs text-slate-400">
              Поставь верный диагноз каждому случаю поломки в коде. Награда: +25 ОП за каждого пациента.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
            ВЫЛЕЧЕНО: {curedPatientsCount} / 3
          </span>
        </div>

        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                patient.cured
                  ? 'bg-emerald-950/30 border-emerald-500/50'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 font-mono">
                  {patient.name}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  patient.cured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {patient.cured ? 'Диагноз подтверждён (+25 ОП)' : 'Требуется диагноз'}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 mb-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                🤒 <strong>Симптом:</strong> {patient.symptom}
              </div>

              <div className="space-y-2">
                {patient.options.map((opt, optIdx) => {
                  const isSelected = patient.selectedIndex === optIdx;
                  const isCorrect = optIdx === patient.correctIndex;

                  let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800';
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-rose-600 text-white border-rose-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={patient.cured}
                      onClick={() => handleDiagnose(patient.id, optIdx)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSelected && isCorrect && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>

              {patient.cured && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Заключение доктора:</strong> {patient.diagnosis}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ⚡ УРОВЕНЬ 5B — БЫСТРОЕ ИСПЫТАНИЕ (90 СЕКУНД)                  */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> ⚡ УРОВЕНЬ 5B — Быстрое испытание (90 секунд)
            </h3>
            <p className="text-xs text-slate-400">
              За 90 секунд объясни партнёру 3 ключевых понятия. Награда: +50 ОП за «3/3».
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-mono font-black px-3 py-1 rounded-xl border ${
              timerSeconds <= 15
                ? 'bg-rose-950 text-rose-300 border-rose-600 animate-pulse'
                : 'bg-slate-950 text-amber-300 border-amber-600/40'
            }`}>
              ⏱️ {timerSeconds} сек
            </span>

            <button
              onClick={() => {
                if (timerSeconds === 0) setTimerSeconds(90);
                setTimerActive(!timerActive);
              }}
              className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer transition-colors"
            >
              {timerActive ? 'Пауза' : 'Старт'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Вопрос 1 */}
          <div
            onClick={() => toggleChallengeCheck('bugTypes')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              challengeItems.bugTypes
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-white mb-1">1. Назови 3 типа багов:</div>
            <p className="text-[11px] text-slate-400">
              🎨 UI (визуал), 🧠 Logic (работа/счётчик), 📱 Responsive (размер экрана)
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${challengeItems.bugTypes ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{challengeItems.bugTypes ? 'Объяснено верно!' : 'Партнёр принял ответ'}</span>
            </div>
          </div>

          {/* Вопрос 2 */}
          <div
            onClick={() => toggleChallengeCheck('regression')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              challengeItems.regression
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-white mb-1">2. Что такое regression?</div>
            <p className="text-[11px] text-slate-400">
              Когда починка бага А случайно ломает что-то другое (откат назад в качестве).
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${challengeItems.regression ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{challengeItems.regression ? 'Объяснено верно!' : 'Партнёр принял ответ'}</span>
            </div>
          </div>

          {/* Вопрос 3 */}
          <div
            onClick={() => toggleChallengeCheck('gitBranch')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              challengeItems.gitBranch
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-white mb-1">3. Зачем Git-ветка?</div>
            <p className="text-[11px] text-slate-400">
              Это безопасный черновик для экспериментов без риска поломать главную версию (main).
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
              <CheckSquare className={`w-4 h-4 ${challengeItems.gitBranch ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{challengeItems.gitBranch ? 'Объяснено верно!' : 'Партнёр принял ответ'}</span>
            </div>
          </div>
        </div>

        {challengeCompleted && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>Испытание 3/3 успешно завершено за отведённое время! ОП начислен на баланс.</span>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 🎤 УРОВЕНЬ 6 — ОТЧЁТ QA & ГОЛОСОВАНИЕ ЗА ЦЕННЫЙ БАГ             */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-violet-500/30 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-violet-300 flex items-center gap-2">
              <Mic className="w-5 h-5 text-violet-400" /> 🎤 УРОВЕНЬ 6 — Отчёт QA: 20 секунд перед аудиторией
            </h3>
            <p className="text-xs text-slate-400">
              Сформулируй свой главный трофей миссии и проголосуй за самый ценный баг класса
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-violet-400 bg-violet-950 px-2.5 py-1 rounded border border-violet-800">
            ПРЕЗЕНТАЦИЯ (+25 ОП)
          </span>
        </div>

        <form onSubmit={handleSaveReport} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Самый интересный найденный баг:
              </label>
              <input
                type="text"
                required
                value={reportBugTitle}
                onChange={(e) => setReportBugTitle(e.target.value)}
                placeholder="Например: Переполнение стейта при быстром скролле..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Тип бага:
              </label>
              <select
                value={reportBugType}
                onChange={(e) => setReportBugType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="UI Bug">🎨 UI Bug</option>
                <option value="Logic Bug">🧠 Logic Bug</option>
                <option value="Responsive Bug">📱 Responsive Bug</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              Как ты его исправил(а):
            </label>
            <input
              type="text"
              required
              value={reportFixMethod}
              onChange={(e) => setReportFixMethod(e.target.value)}
              placeholder="Например: Добавил debounce в хук и overflow-x: hidden..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={reportSaved}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                reportSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30'
              }`}
            >
              {reportSaved ? 'Отчёт сдан ментору ✅ (+25 ОП)' : 'Зафиксировать отчёт (+25 ОП)'}
            </button>

            {/* Голосование класса */}
            <button
              type="button"
              onClick={handleVoteValuable}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                userVotedValuable
                  ? 'bg-amber-600 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-700 text-amber-300 hover:bg-slate-800'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Голос за «Самый ценный баг» ({valuableVotes})</span>
            </button>
          </div>
        </form>
      </div>

      {/* ============================================================== */}
      {/* 🏆 УРОВЕНЬ 7 — ФИНАЛЬНЫЙ ТЕСТ (5 ВОПРОСОВ)                       */}
      {/* ============================================================== */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> 🏆 УРОВЕНЬ 7 — Новый ранг: Финальный тест
            </h3>
            <p className="text-xs text-slate-400">
              5 контрольных вопросов для присвоения квалификации QA Engineer (Lv.21)
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
            {quizSubmitted ? `Результат: ${correctCount}/5` : '5 вопросов'}
          </span>
        </div>

        <div className="space-y-5">
          {quizQuestions.map((q) => {
            const selectedOpt = quizAnswers[q.id];

            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {q.q}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = q.correct === optIdx;

                    let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-600/30 text-emerald-200 border-emerald-500 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-600/30 text-rose-200 border-rose-500';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-600 text-white border-cyan-500 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    💡 <strong>Разбор:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleFinishQuiz}
              disabled={Object.keys(quizAnswers).length < 5}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs sm:text-sm text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" /> Завершить финальный тест (+25 ОП)
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-emerald-200">
              Поздравляем! Ты набрал <strong>{correctCount} из 5</strong> баллов. Ранг QA Engineer подтвержден!
            </div>
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setQuizAnswers({});
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Пройти снова
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 🏅 НАГРАДА: ЗНАЧОК «QA ENGINEER» (LV.21)                        */}
      {/* ============================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/40 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-xl shadow-emerald-500/20 group">
          <img
            src={badgeQaEngineerImg}
            alt="Значок QA Engineer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-1 left-1 right-1 text-center text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/80 rounded py-0.5">
            LV.21 QA
          </span>
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" /> Ранг получен: QA ENGINEER (Lv.21)
            </span>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40">
              Бейдж-набор «Portfolio & Demo Day»: 1/4 ⭐
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white">
            🤖 AGENT BUILDER Lv.20 ➔ 🐛 QA ENGINEER Lv.21
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            🤖 <strong>NOVA:</strong> «Отлично сработано! 🐛 Твои проекты теперь надёжнее, чем вчера. 
            Ты только что спас себя от десятков неловких моментов на Demo Day. Настоящий инженер гордится не тем, что у него нет ошибок, 
            а тем, что он нашёл их сам до того, как их увидели пользователи!»
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 💰 ТВОЙ ОП ЗА МИССИЮ (СВОДНАЯ ТАБЛИЦА)                         */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" /> 💰 Сводка очков опыта (ОП) Миссии 21:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Прошёл урок:</span>
            <strong className="text-emerald-400">+50 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Домашка L20:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Ролевая игра:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Ветка в Git:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Найдены 3 бага:</span>
            <strong className="text-emerald-400">+75 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Исправление:</span>
            <strong className="text-emerald-400">+50 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Проверка регрессии:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Доктор регрессии:</span>
            <strong className="text-emerald-400">+75 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Быстрый блиц 3/3:</span>
            <strong className="text-emerald-400">+50 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Отчёт QA:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Финальный тест:</span>
            <strong className="text-emerald-400">+25 ОП</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Помощь коллеге:</span>
            <strong className="text-emerald-400">+50 ОП</strong>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ ФИКСАЦИЯ РЕЗУЛЬТАТОВ ТЕСТА В СИСТЕМЕ               */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineTestSubmission
          testId="TEST_LESSON_21"
          lessonId={21}
          testTitle="Тест №21: Квалификационный экзамен QA Engineer"
          rewardExp={50}
        />
      </div>
    </div>
  );
};
