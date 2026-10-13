import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Target,
  Sparkles,
  Check,
  ShieldCheck,
  Send,
  HelpCircle
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

// Import newly generated high-resolution badge for Lesson 4
import badgeProductMakerImg from '../../assets/images/lesson4_badge_1790071752375.jpg';

export const Lesson4QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // PART 1: SPEED CHALLENGE (90 СЕКУНД)
  // ==========================================
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [speedDone, setSpeedDone] = useState(false);

  const handleSpeedSubmit = () => {
    if (!ans1.trim() || !ans2.trim() || !ans3.trim()) return;
    setSpeedDone(true);
    addReward(50, '⚡ Быстрое испытание 3/3 сдано на отлично! (+50 Опыта)');
  };

  // ==========================================
  // PART 2: BOSS QUIZ (5 ВОПРОСОВ)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: 'Что такое МРП (MVP — Minimum Viable Product)?',
      options: [
        'Финальная, дорогая и идеальная версия продукта со всеми функциями',
        'Самая простая версия, которая уже работает и приносит реальную пользу',
        'Черновой набросок бизнес-плана на листке бумаги',
        'Рекламный ролик будущего приложения на телевидении'
      ],
      correct: 1,
      expl: 'Правильно! МРП — это минимальная работающая версия (например, один точный промпт), решающая боль пользователя.'
    },
    {
      id: 2,
      q: 'С чего ВСЕГДА начинается разработка любого успешного цифрового продукта?',
      options: [
        'С красивого логотипа и ярких шрифтов',
        'С настоящей проблемы («меня бесит тратить на это кучу времени»)',
        'С миллионного бюджета и покупки серверов',
        'С громкого пафосного названия'
      ],
      correct: 1,
      expl: 'Верно! Без реальной боли человека даже самый красивый сервис окажется никому не нужным.'
    },
    {
      id: 3,
      q: 'Зачем создателю помощника нужен чёткий «портрет пользователя» (возраст, привычки, время)?',
      options: [
        'Просто для галочки и красоты отчёта',
        'Чтобы решение идеально подходило конкретному человеку в конкретный момент дня',
        'Это не нужно — лучше делать продукт для всех людей сразу',
        'Чтобы максимально усложнить код программы'
      ],
      correct: 1,
      expl: 'Именно так! Если делать продукт «для всех вообще», он не решит проблему ни одного конкретного человека.'
    },
    {
      id: 4,
      q: 'Каким должен быть настоящий стартап-питч на 60 секунд?',
      options: [
        'Длинным, академическим и без показа самого продукта',
        'Коротким, понятным: Проблема (10с) → Решение (15с) → Демо (25с) → Будущее (10с)',
        'Состоять только из текста на 20 слайдах презентации',
        'Сразу начинать с цены, скрывая проблему'
      ],
      correct: 1,
      expl: 'Точно! Инвестор или класс за 60 секунд должны сразу увидеть проблему, решение и живое демо.'
    },
    {
      id: 5,
      q: 'Твой ИИ-помощник пытается делать 10 задач сразу (учить, готовить, тренировать). Что делать?',
      options: [
        'Оставить как есть — чем больше функций, тем круче',
        'Сузить до ОДНОЙ ключевой проблемы и решить её идеально',
        'Добавить ещё 15 задач, чтобы удивить всех',
        'Удалить нейросеть и бросить проект'
      ],
      correct: 1,
      expl: 'Именно! Золотое правило МРП: сделай одну вещь превосходно, а не десять посредственно.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    4,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    showResults,
    setShowResults,
    setTestScore
  );

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    setTestScore(score);
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setTestScore(0);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Проверка знаний • Раздел 3
          </span>
          <span className="text-xs text-slate-400 font-mono">Быстрое испытание + Финальный тест (5/5)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Сертификация: Product Maker (Lv.4)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Сдай блиц-испытание по своему продукту и подтверди знания создателя на финальном тесте, чтобы собрать полный комплект значков первого модуля!
        </p>
      </div>

      {/* PART 1: БЫСТРОЕ ИСПЫТАНИЕ (90 СЕКУНД) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Часть 1: Быстрое испытание (3 вопроса за 90 секунд)
          </h3>
          <span className="text-xs font-mono text-amber-400">+50 ОП за 3/3</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Ответь коротко и чётко на 3 главных вопроса о своём продукте:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-bold text-cyan-300">
              1. Какую ОДНУ конкретную проблему решает твой продукт?
            </label>
            <input
              type="text"
              placeholder="Например: Забываю делать домашку по геометрии и английскому..."
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-bold text-purple-300">
              2. Кто именно твой пользователь (возраст, город, распорядок)?
            </label>
            <input
              type="text"
              placeholder="Например: Школьник 13 лет в Худжанде, вторая смена, тренировки по вечерам..."
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-bold text-emerald-300">
              3. Почему твоя текущая версия — это именно МРП, а не финальный комбайн?
            </label>
            <input
              type="text"
              placeholder="Например: Это один рабочий диалог с ИИ, который уже решает проблему без сложного сайта..."
              value={ans3}
              onChange={(e) => setAns3(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleSpeedSubmit}
            disabled={!ans1.trim() || !ans2.trim() || !ans3.trim()}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow ${
              ans1.trim() && ans2.trim() && ans3.trim()
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Сдать блиц-испытание
          </button>
          {speedDone && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Испытание 3/3 зачтено! (+50 XP)
            </span>
          )}
        </div>
      </div>

      {/* PART 2: BOSS QUIZ (5 ВОПРОСОВ) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Часть 2: Финальный тест (5 вопросов)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Отвечено: {Object.keys(selectedAnswers).length} из {quizQuestions.length}
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => {
            const userChoice = selectedAnswers[q.id];
            const isAnswered = userChoice !== undefined;
            const isCorrect = userChoice === q.correct;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="font-bold text-white text-sm sm:text-base flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{q.q}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (showResults) {
                      if (optIdx === q.correct) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-bold shadow';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono text-xs opacity-60 mt-0.5">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed border animate-in fade-in ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-800 text-rose-200'
                    }`}
                  >
                    <strong>{isCorrect ? '✅ Правильно!' : '❌ Ошибка:'}</strong> {q.expl}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Результат теста и разблокировка бейджа */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {!showResults ? (
            <button
              onClick={handleCheckQuiz}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg ${
                Object.keys(selectedAnswers).length === quizQuestions.length
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Проверить ответы
            </button>
          ) : (
            <div className="w-full flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-cyan-500/40">
              <div className="flex items-center gap-3">
                <img
                  src={badgeProductMakerImg}
                  alt="Бейдж Product Maker"
                  className="w-14 h-14 rounded-2xl border border-amber-400/80 shadow-lg"
                />
                <div>
                  <div className="font-bold text-white text-base">
                    Твой результат: {testScore} из {quizQuestions.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testScore >= 4
                      ? '🎉 Офарин! Ты успешно получил ранг PRODUCT MAKER (Уровень 4) и закрыл первый блок курса!'
                      : 'Попробуй ещё раз, чтобы набрать 4 или 5 баллов.'}
                  </div>
                </div>
              </div>
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Пройти снова
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ТАБЛИЦА НАЧИСЛЕНИЯ ОП ЗА МИССИЮ */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-cyan-300 uppercase font-mono">
          💰 Твой Опыт (ОП) за Миссию 04:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Урок пройден:</span> <strong className="text-white">+50 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Ролевая игра:</span> <strong className="text-white">+25 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Запрос 2.0 собран:</span> <strong className="text-white">+50 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Улучшение v1 → v2:</span> <strong className="text-white">+50 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Доктор продукта:</span> <strong className="text-white">+25 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Испытание 3/3:</span> <strong className="text-white">+50 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Питч на сцене:</span> <strong className="text-white">+25 ОП</strong>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Финальный тест 5/5:</span> <strong className="text-white">+25 ОП</strong>
          </div>
        </div>
      </div>

      {/* ВСТРОЕННАЯ СДАЧА ТЕСТА МЕНТОРУ */}
      <InlineTestSubmission
        testId="lesson-4-test"
        defaultTitle="Финальный тест: Продукт №1 и Product Maker"
      />
    </div>
  );
};
