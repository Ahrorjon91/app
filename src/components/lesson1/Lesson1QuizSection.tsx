import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  Search,
  Check,
  RotateCcw
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

// Import newly generated high-resolution assets
import aiExplorerBadgeImg from '../../assets/images/ai_explorer_badge_1789981565416.jpg';

export const Lesson1QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // PART 1: ЧЕЛЛЕНДЖ ПОИСКА ОШИБОК (DEBUG CHALLENGE)
  // ==========================================
  const initialDebugCards = [
    {
      id: 1,
      claim: '«Юрий Гагарин стал первым человеком в космосе 12 апреля 1961 года на корабле "Восток-1".»',
      isFact: true,
      explanation: 'Правда! Это исторический факт. Полет продлился 108 минут.',
      userAnswer: null as boolean | null
    },
    {
      id: 2,
      claim: '«Если товар стоил 100 рублей, подорожал на 10%, а потом подешевел на 10%, его итоговая цена снова 100 рублей.»',
      isFact: false,
      explanation: 'Ошибка AI! 100 + 10% = 110 рублей. Затем 110 - 10% (11 руб) = 99 рублей! Это классическая математическая ловушка процентов.',
      userAnswer: null as boolean | null
    },
    {
      id: 3,
      claim: '«Александр Сергеевич Пушкин написал научно-фантастический роман "Аэлита" в 1833 году.»',
      isFact: false,
      explanation: 'Галлюцинация AI! Роман "Аэлита" написал Алексей Николаевич Толстой в 1923 году, почти через 100 лет после Пушкина.',
      userAnswer: null as boolean | null
    }
  ];

  const [debugCards, setDebugCards] = useState(initialDebugCards);

  const handleDebugAnswer = (cardId: number, answer: boolean) => {
    setDebugCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, userAnswer: answer } : c))
    );
    addReward(15, '🔍 Проверка факта выполнена! (+15 Опыта)');
  };

  // ==========================================
  // PART 2: МИНИ-ТЕСТ (5 ВОПРОСОВ)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: '1. Что из перечисленного НЕ является частью интеллекта человека?',
      options: [
        'A) Умение учиться на личном опыте и ошибках',
        'B) Способность сопереживать и понимать чувства других',
        'C) Мгновенный перебор триллионов чисел без понимания смысла',
        'D) Способность критически сомневаться'
      ],
      correct: 2,
      explanation: 'Правильно: перебор чисел на огромной скорости — это механическое свойство компьютеров, а не человеческий интеллект.'
    },
    {
      id: 2,
      q: '2. Какое утверждение о 3 «Матрёшках» верно?',
      options: [
        'A) ИИ находится внутри генеративного ИИ',
        'B) Генеративный ИИ — это часть машинного обучения, а то — часть ИИ',
        'C) Машинное обучение и ИИ — это абсолютно разные вещи, никак не связанные',
        'D) Генеративный ИИ изобрели раньше обычного ИИ'
      ],
      correct: 1,
      explanation: 'Именно так: ИИ (внешняя матрёшка) ⊃ Машинное обучение (средняя) ⊃ Генеративный ИИ (внутреннее ядро).'
    },
    {
      id: 3,
      q: '3. Что такое галлюцинация нейросети (AI Hallucination)?',
      options: [
        'A) Компьютерный вирус, ломающий видеокарту',
        'B) Ситуация, когда ИИ уверенно выдумывает несуществующий факт или книгу',
        'C) Слишком медленная генерация текста',
        'D) Ошибка подключения к интернету'
      ],
      correct: 1,
      explanation: 'Точно! Модель подбирает статистически вероятные слова, иногда придумывая вымышленные факты уверенным тоном.'
    },
    {
      id: 4,
      q: '4. Что нужно сделать, прежде чем доверять важному факту от нейросети?',
      options: [
        'A) Спросить у бота ещё раз тем же тоном',
        'B) Проверить во втором независимом источнике или пересчитать самому',
        'C) Ничего не делать: ИИ никогда не ошибается',
        'D) Очистить историю сообщений'
      ],
      correct: 1,
      explanation: 'Именно! Правило двух источников, ручной пересчет формул и проверка ссылок — золотой стандарт исследователя.'
    },
    {
      id: 5,
      q: '5. Что категорически запрещено отправлять в диалог с нейросетью?',
      options: [
        'A) Вопрос про решение сложного уравнения',
        'B) Идею для школьного научного проекта',
        'C) Пароль от личной почты, паспорт или адрес проживания',
        'D) Просьбу объяснить тему простыми словами'
      ],
      correct: 2,
      explanation: 'Абсолютно верно! Никогда не передавай пароли, личные документы и приватные персональные данные.'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(false);

  useLessonQuizPersistence(
    1,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted,
    undefined,
    'Урок 1: Проверка знаний и тесты'
  );

  React.useEffect(() => {
    if (quizSubmitted) {
      let correctCount = 0;
      quizQuestions.forEach((q) => {
        if (quizAnswers[q.id] === q.correct) correctCount++;
      });
      setBadgeUnlocked(correctCount === 5);
    } else {
      setBadgeUnlocked(false);
    }
  }, [quizSubmitted, quizAnswers]);

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setBadgeUnlocked(false);
  };

  const handleSelectQuizOption = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) correctCount++;
    });
    if (correctCount === 5) {
      setBadgeUnlocked(true);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* 1. DEBUG CHALLENGE: ПОЙМАЙ ОШИБКУ AI */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Челлендж фактчекинга
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            🔎 «Поймай ошибку нейросети» (Debug Challenge)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ниже приведены три ответа, выданные нейросетью. Определи: где реальный факт, а где ложь или математическая ошибка?
          </p>
        </div>

        {/* 3 Способа проверки */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🔎', title: 'Второй источник', desc: 'Найди тот же факт в проверенной энциклопедии или словаре' },
            { icon: '🧮', title: 'Ручной пересчет', desc: 'Все формулы, проценты и даты пересчитывай на калькуляторе' },
            { icon: '🕵️', title: 'Проверка ссылок', desc: 'Если ИИ ссылается на книгу или автора — проверь их существование' }
          ].map((m, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300">
                <span>{m.icon}</span> {m.title}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Карточки фактов */}
        <div className="space-y-3">
          {debugCards.map((card) => {
            const answered = card.userAnswer !== null;
            const isCorrect = card.userAnswer === card.isFact;

            return (
              <div key={card.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs sm:text-sm font-medium text-slate-200">
                  {card.claim}
                </div>

                {!answered ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDebugAnswer(card.id, true)}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all"
                    >
                      ✓ Это правда
                    </button>
                    <button
                      onClick={() => handleDebugAnswer(card.id, false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/70 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all"
                    >
                      ✕ Это ошибка / Ложь
                    </button>
                  </div>
                ) : (
                  <div
                    className={`p-3 rounded-xl border text-xs sm:text-sm animate-in fade-in space-y-1 ${
                      isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                    }`}
                  >
                    <div className="font-bold">
                      {isCorrect ? '🎉 Ты абсолютно прав!' : '⚠️ Обрати внимание на детали:'}
                    </div>
                    <p className="text-xs text-slate-200">{card.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. МИНИ-ТЕСТ (5 ВОПРОСОВ) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Итоговый тест
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              📝 Мини-тест: 5 вопросов (без стресса 😊)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
            Вопросов: 5 • Награда: до +50 Опыта
          </span>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => {
            const selectedOpt = quizAnswers[q.id];
            return (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm sm:text-base text-white">{q.q}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optStyle = 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300';
                    if (quizSubmitted) {
                      if (optIdx === q.correct) {
                        optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && isSelected !== (optIdx === q.correct)) {
                        optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-cyan-600 text-white border-cyan-400 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all ${optStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="text-xs text-cyan-300 font-mono pt-1">
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(quizAnswers).length < 5}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Завершить тест и получить Опыт
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-400 shrink-0 shadow-lg">
                  <img src={aiExplorerBadgeImg} alt="Бейдж AI Исследователь" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-black text-base sm:text-lg text-emerald-300">
                    Поздравляем! Ты подтвердил звание 🤖 «AI Исследователь»!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Бейдж «AI Исследователь» успешно разблокирован в твоем профиле ученика. Теперь переходи к Разделу 4 (Домашнее задание) для заполнения Дневника!
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Пройти заново
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* СДАЧА ОТЧЕТА ПО ТЕСТАМ И ФАКТЧЕКИНГУ МЕНТОРУ */}
      {/* ========================================================= */}
      <div className="pt-2">
        <InlineTestSubmission
          lessonId={1}
          testId="LESSON_1"
          testTitle="Урок 1: Проверка знаний и тесты (Debug Challenge & Mini-Test)"
        />
      </div>
    </div>
  );
};
