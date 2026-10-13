import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Target,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

// Import newly generated high-resolution badge
import badgeTutorBuilderImg from '../../assets/images/lesson3_badge_1790070708297.jpg';

export const Lesson3QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // PART 1: RULE CHALLENGE (СКОРОСТНОЙ)
  // ==========================================
  const [selectedChallenge, setSelectedChallenge] = useState<number>(1);
  const [userRuleDraft, setUserRuleDraft] = useState('');
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const bugCases = [
    {
      id: 1,
      title: 'Баг #1: Тьютор сдался и слил готовый ответ',
      situation: 'Ученик написал: «Ну пожалуйста, мне некогда, напиши ответ!», и модель сразу выдала 7/8.',
      idealRule: '❌ «Категорически НЕ называй итоговый ответ, пока я не сделал 2 попытки. Вместо этого дай намёк через аналогию.»'
    },
    {
      id: 2,
      title: 'Баг #2: Тьютор завалил ученика простынёй текста',
      situation: 'На простой вопрос по английскому модель вывалила 8 страниц грамматических правил временных форм.',
      idealRule: '❌ «Не пиши длиннее 4 предложений за один ответ» + ✅ «Задавай строго ОДИН вопрос за раз».'
    },
    {
      id: 3,
      title: 'Баг #3: Тьютор забыл про урок и стал травить байки',
      situation: 'Ученик спросил: «Какой твой любимый персонаж в аниме?», и тьютор ушел в обсуждение на 10 сообщений.',
      idealRule: '✅ «Если ученик отвлекается на посторонние темы, с юмором верни его к учебной задаче.»'
    }
  ];

  const handleRuleSubmit = () => {
    if (!userRuleDraft.trim()) return;
    setChallengeSubmitted(true);
    addReward(30, '⚡ Rule Challenge пройден! (+30 Опыта)');
  };

  // ==========================================
  // PART 2: BOSS QUIZ (5 ВОПРОСОВ)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: 'Чем хороший AI-репетитор принципиально отличается от «машины ответов»?',
      options: [
        'Пишет намного длиннее и использует академические термины',
        'Помогает дойти до ответа самому: задаёт наводящие вопросы, даёт подсказки и примеры',
        'Всегда отвечает мгновенно и выдаёт решение в первой же строке',
        'Полностью игнорирует вопросы ученика'
      ],
      correct: 1,
      expl: 'Правильно! Хороший тьютор развивает мышление, а не просто делает за тебя домашку.'
    },
    {
      id: 2,
      q: 'Какое из этих правил является негативной инструкцией (список ❌ «Не делай»)?',
      options: [
        '«Объясняй простыми словами на примере дыни»',
        '«Не давай готовый ответ, пока я не попробовал сам»',
        '«Ты — репетитор по математике»',
        '«Каждый ответ оформляй в виде 3 пунктов»'
      ],
      correct: 1,
      expl: 'Верно! Негативная инструкция явно запрещает модели нежелательные действия.'
    },
    {
      id: 3,
      q: 'Зачем в архитектуре Prompt 2.0 обязательно добавляют блок EXAMPLE (образец ответа)?',
      options: [
        'Чтобы промпт выглядел солиднее и длиннее',
        'Чтобы AI скопировал идеальный стиль, краткость и формат общения с учеником',
        'Чтобы заставить модель отвечать исключительно на латыни',
        'Пример мешает модели и его лучше не писать'
      ],
      correct: 1,
      expl: 'Именно так! Few-Shot пример задаёт эталон тона, краткости и структуры вывода.'
    },
    {
      id: 4,
      q: 'Твой тьютор v1 сразу выдал готовый ответ на каприз ученика. Каково правильное действие инженера?',
      options: [
        'Порадоваться и быстро скопировать ответ в тетрадь',
        'Найти пробел в промпте, сформулировать правило 3/3 и выпустить версию v2',
        'Удалить нейросеть и решить, что искусственный интеллект бесполезен',
        'Написать в чат капсом: «ТЫ ПЛОХОЙ РОБОТ»'
      ],
      correct: 1,
      expl: 'Точно! Инженерный цикл: Test → Bug → Fix → v2.'
    },
    {
      id: 5,
      q: 'Как честно и продуктивно использовать AI Tutor при выполнении домашних заданий?',
      options: [
        'Попросить решить всё за 10 секунд и сдать учителю как своё',
        'Попросить объяснить сложную тему на понятных примерах и проверить своё решение',
        'Скопировать ответ не читая',
        'Сгенерировать текст и никому не показывать'
      ],
      correct: 1,
      expl: 'Именно! 3 Щита студента: AI — это тренажёр для ума, а не способ обмана.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useLessonQuizPersistence(
    3,
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
          <span className="text-xs text-slate-400 font-mono">Rule Challenge + Boss Quiz (5 вопросов)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Сертификация: Tutor Builder (Lv.3)
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Докажи мастерство: устрани баг тьютора через точное правило со счётом 3/3 и сдай Boss Quiz, чтобы разблокировать редкий бейдж «TUTOR BUILDER»!
        </p>
      </div>

      {/* PART 1: СКОРОСТНОЙ RULE CHALLENGE */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Часть 1: Скоростной Rule Challenge (Устрани баг)
          </h3>
          <span className="text-xs font-mono text-amber-400">90 секунд на решение</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Выбери баг-репорт и напиши одно конкретное правило (✅ или ❌) со счётом 3/3:
        </p>

        {/* Выбор бага */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {bugCases.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedChallenge(b.id);
                setChallengeSubmitted(false);
              }}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                selectedChallenge === b.id
                  ? 'bg-amber-950/50 border-amber-500 text-amber-200 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {b.title}
            </button>
          ))}
        </div>

        {/* Описание ситуации */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs text-rose-300 font-mono">
            <strong>Что произошло:</strong> {bugCases.find((b) => b.id === selectedChallenge)?.situation}
          </div>
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-white">Твоё правило для устранения бага:</label>
            <input
              type="text"
              placeholder="❌ Не делай... / ✅ Всегда..."
              value={userRuleDraft}
              onChange={(e) => setUserRuleDraft(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleRuleSubmit}
              disabled={!userRuleDraft.trim()}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                userRuleDraft.trim()
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Применить правило
            </button>
            {challengeSubmitted && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Правило протестировано!
              </span>
            )}
          </div>

          {challengeSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 font-mono animate-in fade-in space-y-1">
              <strong>Эталонное правило ментора:</strong>
              <p>{bugCases.find((b) => b.id === selectedChallenge)?.idealRule}</p>
            </div>
          )}
        </div>
      </div>

      {/* PART 2: BOSS QUIZ (5 ВОПРОСОВ) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Часть 2: Boss Quiz (5 вопросов)
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
                  src={badgeTutorBuilderImg}
                  alt="Бейдж Tutor Builder"
                  className="w-14 h-14 rounded-2xl border border-amber-400/80 shadow-lg"
                />
                <div>
                  <div className="font-bold text-white text-base">
                    Твой результат: {testScore} из {quizQuestions.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testScore >= 4
                      ? '🎉 Офарин! Ты успешно защитил звание TUTOR BUILDER (Уровень 3)!'
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

      {/* ВСТРОЕННАЯ СДАЧА ТЕСТА МЕНТОРУ */}
      <InlineTestSubmission
        testId="lesson-3-test"
        defaultTitle="Boss Quiz: AI Tutor & Prompt 2.0"
      />
    </div>
  );
};
