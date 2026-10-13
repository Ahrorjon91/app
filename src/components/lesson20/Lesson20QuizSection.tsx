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
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeAgentBuilderImg from '../../assets/images/lesson20_badge_agent_builder_1790243070655.jpg';

export const Lesson20QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // LEVEL 5A: FINAL DOCTOR PARTNER CHECKS
  // ==========================================
  const [docChecks, setDocChecks] = useState<{ [key: string]: boolean }>({
    problem: false,
    aiFeature: false,
    mobile: false
  });

  const toggleDocCheck = (key: string) => {
    const updated = { ...docChecks, [key]: !docChecks[key] };
    setDocChecks(updated);
    if (!docChecks[key]) {
      addReward(25, 'Финальный Доктор: проверка партнера пройдена! (+25 ОП)');
    }
  };

  // ==========================================
  // LEVEL 5B: 6/6 CHECKLIST
  // ==========================================
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    problem: false,
    data: false,
    ai: false,
    ui: false,
    mobile: false,
    live: false
  });

  const toggleChecklistItem = (key: string) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    const count = Object.values(updated).filter(Boolean).length;
    if (count === 6) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      addReward(50, '⚡ Финальный чек-лист 6/6 закрыт! (+50 ОП)');
    }
  };

  const checklistCount = Object.values(checklist).filter(Boolean).length;

  // ==========================================
  // LEVEL 6: 30-SEC PITCH TIMER & FORM
  // ==========================================
  const [pitchTimer, setPitchTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [appName, setAppName] = useState('');
  const [appProblem, setAppProblem] = useState('');
  const [appAi, setAppAi] = useState('');
  const [appLink, setAppLink] = useState('');
  const [pitchVoted, setPitchVoted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && pitchTimer > 0) {
      interval = setInterval(() => {
        setPitchTimer((prev) => prev - 1);
      }, 1000);
    } else if (pitchTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pitchTimer]);

  const startPitch = () => {
    setPitchTimer(30);
    setIsTimerRunning(true);
  };

  // ==========================================
  // LEVEL 7: FINAL BLOCK QUIZ (5 QUESTIONS)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: '1. Чем AI-агент отличается от обычного ИИ-ответа?',
      options: [
        { key: 'A', text: 'Ничем не отличается' },
        {
          key: 'B',
          text: 'Агент сам планирует и выполняет несколько шагов для достижения цели, а не только отвечает текстом'
        },
        { key: 'C', text: 'Агент работает только без интернета' },
        { key: 'D', text: 'Агент нельзя использовать бесплатно' }
      ],
      correctKey: 'B',
      explanation:
        'Обычный ИИ выдает готовый текстовый ответ на вопрос. Агент планирует цепочку действий, вызывает нужные инструменты и работает до получения итогового результата.'
    },
    {
      id: 2,
      q: '2. Из чего состоит агент?',
      options: [
        { key: 'A', text: 'Только модель (мозг)' },
        { key: 'B', text: 'Модель (мозг) + Инструкции (правила) + Инструменты (руки)' },
        { key: 'C', text: 'Только инструменты' },
        { key: 'D', text: 'Только код' }
      ],
      correctKey: 'B',
      explanation:
        'Формула агента: Модель (рассуждения) + Инструкции (System Prompt и ограничения) + Инструменты (API, калькулятор, веб-поиск, генератор медиа).'
    },
    {
      id: 3,
      q: '3. Что делает Google Opal?',
      options: [
        { key: 'A', text: 'Пишет код вручную построчно' },
        {
          key: 'B',
          text: 'Позволяет создавать ИИ-мини-приложения через обычный текст, без кода'
        },
        { key: 'C', text: 'Это устройство для измерения скорости интернета' },
        { key: 'D', text: 'Только генерирует картинки' }
      ],
      correctKey: 'B',
      explanation:
        'Google Opal — это no-code платформа, превращающая текстовую постановку задачи в работающее веб-приложение со встроенным агентным workflow.'
    },
    {
      id: 4,
      q: '4. Что означает "агент сам уточняет детали", как в обновлении Opal 2026 года?',
      options: [
        { key: 'A', text: 'Агент всегда следует жёсткому сценарию без изменений' },
        {
          key: 'B',
          text: 'Агент может задать вопрос пользователю, если не хватает информации, вместо того чтобы гадать'
        },
        { key: 'C', text: 'Агент никогда не задаёт вопросов' },
        { key: 'D', text: 'Это не имеет значения' }
      ],
      correctKey: 'B',
      explanation:
        'В отличие от жестких алгоритмов, современные агенты обладают способностью к активному диалогу: они уточняют неоднозначные моменты перед запуском тяжелых действий.'
    },
    {
      id: 5,
      q: '5. Почему важно всегда проверять результат работы агента?',
      options: [
        { key: 'A', text: 'Не нужно проверять, агент никогда не ошибается' },
        {
          key: 'B',
          text: 'Агент может ошибиться в плане или выборе инструмента — ответственность за результат остаётся на человеке'
        },
        { key: 'C', text: 'Проверка замедляет работу без пользы' },
        { key: 'D', text: 'Только разработчики должны проверять' }
      ],
      correctKey: 'B',
      explanation:
        'Главное правило: агент — не волшебство. Он может выбрать неподходящий инструмент или ошибиться в расчетах. Человек всегда проверяет финальный артефакт.'
    }
  ];

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);

  useLessonQuizPersistence(
    20,
    quizQuestions,
    userAnswers,
    setUserAnswers,
    showResults,
    setShowResults
  );

  const handleSelectAnswer = (qId: number, optionKey: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctKey) score += 1;
    });
    return score;
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
    const score = calculateScore();
    if (score === 5 && !badgeUnlocked) {
      setBadgeUnlocked(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* LEVEL 5A: FINAL DOCTOR PARTNER CHECKS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              Уровень 5A • Финальный Доктор (01:05 – 01:12)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🩺 Финальный Доктор: Проверка Партнером
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-400">
            +25 ОП за каждую проверку
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Покажи свой экран партнеру по парте. Пусть партнер честно проверит 3 главных аспекта твоего My Life App:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {[
            {
              key: 'problem',
              title: '🩺 1. Реальная Проблема',
              desc: 'Действительно ли приложение решает настоящую, а не выдуманную проблему из школьной/личной жизни?'
            },
            {
              key: 'aiFeature',
              title: '🩺 2. AI-Функция',
              desc: 'Встроенный ИИ реально полезен (тьютор, квиз, помощник), а не просто шаблонный текст для галочки?'
            },
            {
              key: 'mobile',
              title: '🩺 3. Мобильная Версия',
              desc: 'Всё аккуратно открывается на смартфоне или в режиме адаптивности, кнопки легко нажимать?'
            }
          ].map((item) => {
            const isChecked = docChecks[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleDocCheck(item.key)}
                className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black ${
                      isChecked ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                      isChecked
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-700'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* LEVEL 5B: 6/6 CHECKLIST */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
              Уровень 5B • Финальный Чек-Лист (01:12 – 01:18)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ⚡ Финальный Чек-Лист: 6/6 = Project #5 DONE!
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-bold text-xs">
            🎁 +50 ОП за «6/6»
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {[
            { key: 'problem', label: 'Реальная проблема' },
            { key: 'data', label: 'Данные в памяти' },
            { key: 'ai', label: 'AI-функция' },
            { key: 'ui', label: 'Удобный UX' },
            { key: 'mobile', label: 'Мобильный' },
            { key: 'live', label: 'Опубликовано' }
          ].map((item) => {
            const isChecked = checklist[item.key];
            return (
              <button
                key={item.key}
                onClick={() => toggleChecklistItem(item.key)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isChecked
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center ${
                    isChecked ? 'bg-slate-950 text-cyan-400' : 'border border-slate-700'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-[11px] font-bold leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LEVEL 6: 30-SEC PITCH PREMIERE */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Уровень 6 • Большая Премьера (01:18 – 01:27)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-amber-400" />
              <span>Большая Премьера: 30 секунд на твой Project #5</span>
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 font-bold text-xs">
            +25 ОП за питч
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Особенный момент: финал целого блока! Каждый студент презентует экран ровно 30 секунд по структуре:
        </p>

        {/* Pitch Template Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">1. Название моего приложения:</label>
            <input
              type="text"
              placeholder="Например: StudyBoost AI или HabitTracker"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">2. Проблема, которую оно решает:</label>
            <input
              type="text"
              placeholder="Например: Помогает не забывать домашку и повторять формулы"
              value={appProblem}
              onChange={(e) => setAppProblem(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">3. Моя встроенная AI-функция:</label>
            <input
              type="text"
              placeholder="Например: AI-тьютор по физике + генератор квизов"
              value={appAi}
              onChange={(e) => setAppAi(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">4. Живая ссылка на проект:</label>
            <input
              type="text"
              placeholder="https://username.github.io/my-life-app/"
              value={appLink}
              onChange={(e) => setAppLink(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* 30-sec Timer Bar */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
              00:{pitchTimer < 10 ? `0${pitchTimer}` : pitchTimer}
            </div>
            <span className="text-xs text-slate-400">
              {isTimerRunning ? 'Идёт питч! Рассказывай!' : '30-секундный таймер готов'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={startPitch}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Начать питч (30с)</span>
            </button>
            <button
              onClick={() => {
                setPitchVoted(true);
                addReward(25, 'Голос за лучшее My Life App отдан! (+25 ОП)');
              }}
              disabled={pitchVoted}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all disabled:opacity-50"
            >
              {pitchVoted ? 'Голос принят! 🏆' : 'Голосовать за проект'}
            </button>
          </div>
        </div>
      </div>

      {/* LEVEL 7: NEW RANK — BLOCK FINALE QUIZ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
              Уровень 7 • Аттестация и Финал Блока (01:27 – 01:30)
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              🏆 Новый Ранг: AGENT BUILDER (Lv.20)
            </h2>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs">
            Итоговый тест 5/5
          </span>
        </div>

        {/* 5 Quiz Questions */}
        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const selected = userAnswers[q.id];
            const isAnswered = !!selected;
            const isCorrect = selected === q.correctKey;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="text-xs sm:text-sm font-black text-white">
                  {q.q}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.key;
                    let optionStyle =
                      'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (showResults) {
                      if (opt.key === q.correctKey) {
                        optionStyle =
                          'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                      } else if (isSelected) {
                        optionStyle =
                          'bg-rose-950/40 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'bg-purple-950/40 border-purple-500 text-purple-300';
                    }

                    return (
                      <button
                        key={opt.key}
                        disabled={showResults}
                        onClick={() => handleSelectAnswer(q.id, opt.key)}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>
                          <strong>{opt.key})</strong> {opt.text}
                        </span>
                        {showResults && opt.key === q.correctKey && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-400 space-y-1">
                    <span className="font-bold text-cyan-400">Объяснение:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz button */}
        {!showResults ? (
          <button
            onClick={handleCheckAnswers}
            disabled={Object.keys(userAnswers).length < 5}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm transition-all shadow-xl disabled:opacity-40"
          >
            Проверить ответы и разблокировать ранг
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-amber-500/40 text-center space-y-4">
            <div className="text-xl sm:text-2xl font-black text-white">
              Результат: {calculateScore()} из 5 правильных ответов!
            </div>
            {calculateScore() === 5 && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-emerald-300 font-bold">
                  🎉 Идеально! Ты завершил финал Блока 5 «AI Apps» и открыл ранг AGENT BUILDER (Lv.20)!
                </p>
                <div className="flex justify-center">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-500/30">
                    <img
                      src={badgeAgentBuilderImg}
                      alt="Значок AGENT BUILDER Lv.20"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* INLINE TEST SUBMISSION */}
      <InlineTestSubmission
        testId="test-20"
        lessonId={20}
        testTitle="Квалификационный тест: Agent Thinking & Project #5"
      />
    </div>
  );
};
