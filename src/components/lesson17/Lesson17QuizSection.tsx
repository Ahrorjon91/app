import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  Clock,
  RotateCcw,
  Stethoscope,
  Timer,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Check,
  HelpCircle,
  Play,
  Pause,
  ExternalLink,
  Mic,
  Share2,
  Star,
  Users,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeAppBuilderImg from '../../assets/images/lesson17_badge_app_builder_1790240775829.jpg';

export const Lesson17QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // ==========================================
  // LEVEL 5A: APP DOCTOR (3 Patients)
  // ==========================================
  const [curedPatients, setCuredPatients] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  const patients = [
    {
      id: 1,
      name: 'Пациент №1: «Приложение-склерозник»',
      symptom: 'Задачу можно ввести и добавить в список, но при любом обновлении страницы (F5) все задачи бесследно исчезают.',
      diagnosis: '🤒 Отсутствует сохранение данных (DATA). Задачи хранятся только в оперативной памяти JS, а не в LocalStorage или базе.',
      cureText: 'Добавили localStorage.setItem("todos", JSON.stringify(tasks)) и чтение при старте. Память восстановлена!',
      cureCode: `// Лечение:
localStorage.setItem('my_todos', JSON.stringify(tasks));`
    },
    {
      id: 2,
      name: 'Пациент №2: «Квиз-молчун»',
      symptom: 'В квизе можно нажать на любую кнопку с вариантом ответа, но абсолютно ничего не происходит — цвет не меняется, очки не считаются.',
      diagnosis: '🤒 Отсутствует LOGIC. На кнопку не повешен обработчик onClick или внутри функции нет сравнения selected === correct.',
      cureText: 'Добавили onClick={() => handleCheck(idx)} с проверкой ответа и звуковым салютом. Кнопки ожили!',
      cureCode: `// Лечение:
<button onClick={() => checkAnswer(optIndex)}>Проверить</button>`
    },
    {
      id: 3,
      name: 'Пациент №3: «Швейцарский нож»',
      symptom: 'Новичок попытался за 30 минут сделать сразу 5 вещей: задачи, квиз, калькулятор, погоду и чат. В итоге ничего толком не работает.',
      diagnosis: '🤒 Синдром перегруженного прототипа. Нарушено базовое правило: «Одна главная функция, которая реально работает».',
      cureText: 'Удалили 4 лишних экрана, сфокусировались на ОДНОЙ фиче и довели её до безупречной работы. Пациент здоров!',
      cureCode: `// Золотое правило:
const CORE_FEATURE = "To-Do Only"; // One thing done well`
    }
  ];

  const handleCurePatient = (id: number) => {
    if (curedPatients[id]) return;
    setCuredPatients(prev => ({ ...prev, [id]: true }));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    addReward(25, `🩺 Пациент №${id} успешно вылечен (+25 ОП)!`);
  };

  // ==========================================
  // LEVEL 5B: RAPID CHALLENGE (90s Timer)
  // ==========================================
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [rapidDone, setRapidDone] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      setRapidDone(true);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleStartTimer = () => {
    setTimerSeconds(90);
    setTimerActive(true);
    setRapidDone(false);
  };

  const handleFinishRapid = () => {
    setTimerActive(false);
    setRapidDone(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    addReward(50, '⚡ Быстрое испытание 3/3 пройдено (+50 ОП)!');
  };

  // ==========================================
  // LEVEL 6: PROTOTYPE SHOW & VOTING
  // ==========================================
  const [pitchType, setPitchType] = useState('To-Do List для школьников');
  const [pitchAction, setPitchAction] = useState('добавляет задачи и отмечает галочками');
  const [pitchHardest, setPitchHardest] = useState('сохранение состояния в LocalStorage');
  const [pitchClaimed, setPitchClaimed] = useState(false);

  const [voteCount, setVoteCount] = useState(14);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) return;
    setVoted(true);
    setVoteCount(v => v + 1);
    addReward(25, '🎤 Показ прототипов: голос за «Самый рабочий прототип» отдан (+25 ОП)!');
  };

  // ==========================================
  // LEVEL 7: FINAL QUALIFICATION TEST (5 Questions)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: '1. Чем Web App отличается от обычного Website?',
      options: [
        'A) Ничем, это одно и то же',
        'B) Web App позволяет взаимодействовать и сохранять данные, а не только читать',
        'C) Website всегда лучше',
        'D) Web App нельзя открыть в браузере'
      ],
      correct: 1,
      explanation: 'Сайт в основном только читают. Web App — это интерактивный сервис, где сохраняются данные и есть логика.'
    },
    {
      id: 2,
      q: '2. Из каких 5 частей состоит формула любого приложения?',
      options: [
        'A) Дизайн, цвет, шрифт, кнопка, картинка',
        'B) User → Input → Logic → Data → Result',
        'C) Только Input и Output',
        'D) HTML, CSS, JavaScript, PHP, SQL'
      ],
      correct: 1,
      explanation: 'Фундаментальная цепочка: User (пользователь) → Input (ввод) → Logic (логика) → Data (данные) → Result (результат).'
    },
    {
      id: 3,
      q: '3. Что такое PWA (Progressive Web App)?',
      options: [
        'A) Обычный сайт, который можно установить на телефон без магазина приложений',
        'B) Название языка программирования',
        'C) То же самое, что и обычный сайт без возможности установки',
        'D) Приложение, которое нельзя открыть на компьютере'
      ],
      correct: 0,
      explanation: 'PWA — это сайт нового поколения: его можно установить в один клик прямо на экран смартфона.'
    },
    {
      id: 4,
      q: '4. В приложении можно добавить задачу, но она исчезает при обновлении страницы. В чём проблема?',
      options: [
        'A) Проблемы нет',
        'B) Отсутствует сохранение данных (DATA)',
        'C) Слишком красивый дизайн',
        'D) Слишком быстрая загрузка'
      ],
      correct: 1,
      explanation: 'Если данные не сохраняются в LocalStorage или базе данных, они стираются при перезагрузке страницы.'
    },
    {
      id: 5,
      q: '5. Почему для прототипа лучше выбрать ОДНУ главную функцию, а не пять сразу?',
      options: [
        'A) Потому что так проще и надёжнее довести до рабочего состояния',
        'B) Потому что больше функций — это плохо всегда',
        'C) Одна функция выглядит красивее',
        'D) Не имеет значения'
      ],
      correct: 0,
      explanation: 'Правило прототипа: «Одна главная функция, которая реально работает». Довести одну фичу до стабильности намного надежнее.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testFinished, setTestFinished] = useState(false);
  const [badgeUnlockedState, setBadgeUnlockedState] = useState(false);

  useLessonQuizPersistence(
    17,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    testFinished,
    setTestFinished
  );

  const calculateFinalScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    return correct;
  };

  const handleFinishTest = () => {
    setTestFinished(true);
    const score = calculateFinalScore();
    if (score >= 4) {
      setBadgeUnlockedState(true);
      unlockBadge('app-builder-17');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-cyan-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            УРОВЕНЬ 5–7 • АУДИТ, ТЕСТ И НАГРАДА
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Квалификационный финал Миссии 17
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          3. Проверка знаний, Доктор приложения и Новый ранг
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Проверь себя на практике: вылечи 3 типичных бага в роли Доктора Приложения, пройди 90-секундное быстрое испытание и подтверди новый ранг «APP BUILDER (Lv.17)»!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 5A: APP DOCTOR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-teal-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 5A • ⏱ 70–76 МИН • 🎁 +25 ОП ЗА ПАЦИЕНТА
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-teal-400" />
              🩺 ДОКТОР ПРИЛОЖЕНИЯ: 3 типичных диагноза
            </h3>
          </div>
          <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
            Вылечено: {Object.values(curedPatients).filter(Boolean).length} / 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map(p => {
            const isCured = curedPatients[p.id];
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isCured
                    ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-400 font-mono">Случай #{p.id}</span>
                    {isCured && <span className="text-xs font-bold text-emerald-400">✓ Вылечен</span>}
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base">{p.name}</h4>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-200">
                    <strong>Симптом:</strong> {p.symptom}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {p.diagnosis}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800">
                  {isCured ? (
                    <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-[11px] text-emerald-200 space-y-1">
                      <div className="font-bold">💊 Рецепт применён:</div>
                      <div>{p.cureText}</div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCurePatient(p.id)}
                      className="w-full py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Вылечить баг (+25 ОП)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 5B: RAPID CHALLENGE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 5B • ⏱ 76–80 МИН • 🎁 +50 ОП ЗА «3/3»
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              ⚡ БЫСТРОЕ ИСПЫТАНИЕ (90 секунд в парах)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full font-mono font-bold text-xs border ${
              timerSeconds < 20
                ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                : 'bg-slate-950 text-amber-300 border-amber-800/60'
            }`}>
              ⏱ {timerSeconds} сек
            </span>
            {!timerActive ? (
              <button
                onClick={handleStartTimer}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                Старт 90с
              </button>
            ) : (
              <button
                onClick={() => setTimerActive(false)}
                className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
              >
                Пауза
              </button>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm">За 90 секунд объясни партнёру своими словами:</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li><strong>Чем Web App отличается от обычного Website?</strong> (Чтение vs Взаимодействие и данные)</li>
            <li><strong>Из каких 5 частей состоит формула приложения?</strong> (User ➔ Input ➔ Logic ➔ Data ➔ Result)</li>
            <li><strong>Что такое PWA простыми словами?</strong> (Сайт, который можно установить на телефон в 1 клик)</li>
          </ol>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-slate-400">Справились вдвоём за отведённое время?</span>
            <button
              onClick={handleFinishRapid}
              disabled={rapidDone}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {rapidDone ? (
                <>
                  <Check className="w-4 h-4" />
                  3/3 Выполнено (+50 ОП)!
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  Зачесть испытание 3/3 (+50 ОП)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 6: PROTOTYPE SHOW & VOTING */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 6 • ⏱ 80–87 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Mic className="w-6 h-6 text-indigo-400" />
              🎤 ПОКАЗ ПРОТОТИПОВ (20-секундный питч)
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800">
            Презентация классу
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pitch Generator */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Твой 20-секундный питч:
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-cyan-200 leading-relaxed font-sans">
              «Мой прототип: <strong>{pitchType}</strong>. Пользователь <strong>{pitchAction}</strong>. Сложнее всего было построить <strong>{pitchHardest}</strong>.»
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <input
                type="text"
                value={pitchType}
                onChange={(e) => setPitchType(e.target.value)}
                placeholder="Тип..."
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
              <input
                type="text"
                value={pitchAction}
                onChange={(e) => setPitchAction(e.target.value)}
                placeholder="Что делает..."
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
              <input
                type="text"
                value={pitchHardest}
                onChange={(e) => setPitchHardest(e.target.value)}
                placeholder="Что сложнее..."
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* Voting Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 font-mono">НОМИНАЦИЯ</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">Голосов: {voteCount}</span>
              </div>
              <h4 className="text-base font-black text-white mt-1">
                🏆 «Самый рабочий прототип»
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Голосуем за тот проект, где кнопки реально нажимаются, а данные не теряются — функциональность превыше красивых картинок!
              </p>
            </div>

            <button
              onClick={handleVote}
              disabled={voted}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {voted ? (
                <>
                  <Check className="w-4 h-4" />
                  Твой голос учтён (+25 ОП)!
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4" />
                  Отдать голос за коллегу (+25 ОП)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 7: FINAL QUALIFICATION TEST */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 7 • ⏱ 87–90 МИН • 🎁 ДО +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-cyan-400" />
              🏆 НОВЫЙ РАНГ: Финальный тест квалификации
            </h3>
          </div>
          {testFinished && (
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Счёт: {calculateFinalScore()} из 5
            </span>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((item, qIdx) => (
            <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-sm sm:text-base">{item.q}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === optIdx;
                  const isCorrect = item.correct === optIdx;
                  let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (testFinished) {
                    if (isCorrect) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  } else if (isSelected) {
                    style = 'bg-cyan-950/70 border-cyan-400 text-cyan-200 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={testFinished}
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {testFinished && (
                <div className="text-[11px] text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                  💡 <strong>Разбор:</strong> {item.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          {!testFinished ? (
            <button
              onClick={handleFinishTest}
              disabled={Object.keys(selectedAnswers).length < 5}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-40"
            >
              <Check className="w-5 h-5" />
              Завершить тест и проверить ранг
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setTestFinished(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Пересдать тест
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* XP SUMMARY BREAKDOWN TABLE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          💰 Твой ОП за Миссию 17 (Сводная ведомость)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="p-3">Действие</th>
                <th className="p-3 text-right">Награда ОП</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr><td className="p-3 text-slate-300">Прошёл урок и изучил 7 уровней</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+50 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Домашка прошлой миссии (WOW Website)</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Ролевая игра «App Product Owner»</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Формула приложения заполнена</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Прототип построен в AI Studio</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+75 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Тестирование пройдено (3/3)</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Доктор приложения (вылечены пациенты)</td><td className="p-3 text-right font-bold text-teal-400 font-mono">до +75 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Быстрое испытание (3/3 за 90 секунд)</td><td className="p-3 text-right font-bold text-amber-400 font-mono">+50 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Показ прототипа и участие в голосовании</td><td className="p-3 text-right font-bold text-indigo-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Финальный тест квалификации (5/5)</td><td className="p-3 text-right font-bold text-cyan-400 font-mono">+25 ОП</td></tr>
              <tr><td className="p-3 text-slate-300">Помог товарищу в классе</td><td className="p-3 text-right font-bold text-purple-400 font-mono">+50 ОП</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RANK UPGRADE & BADGE UNLOCK CARD */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border-2 border-cyan-400/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/20 shrink-0 bg-slate-950">
            <img
              src={badgeAppBuilderImg}
              alt="Значок App Builder Lv.17"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 inline-block">
              НОВЫЙ РАНГ ПОЛУЧЕН
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              📱 APP BUILDER (Lv.17)
            </h3>
            <div className="text-xs font-mono text-cyan-300 font-bold">
              🏆 WOW WEBSITE MASTER Lv.16 ──▶ 📱 APP BUILDER Lv.17
            </div>
            <div className="text-xs text-indigo-300">
              Новый бейдж-набор «AI Apps»: 1/4 ⭐
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic pt-2">
              🤖 <strong>NOVA:</strong> «Новый мир открыт! 📱 Ты построил свой первый работающий прототип приложения. Дальше будет только интереснее!»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
