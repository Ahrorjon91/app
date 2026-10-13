import React, { useState } from 'react';
import {
  Palette,
  Users,
  Sparkles,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { InlineTestSubmission } from './InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../lib/quizHelpers';
import { Lesson5LectureSection } from './lesson5/Lesson5LectureSection';
import { Lesson5LabWorkSection } from './lesson5/Lesson5LabWorkSection';
import { Lesson5HomeworkSection } from './lesson5/Lesson5HomeworkSection';
import { Lesson6LectureSection } from './lesson6/Lesson6LectureSection';
import { Lesson6LabWorkSection } from './lesson6/Lesson6LabWorkSection';
import { Lesson6HomeworkSection } from './lesson6/Lesson6HomeworkSection';

import badgeAiArtistImg from '../assets/images/lesson5_badge_ai_artist_1790073270769.jpg';
import badgeCharacterDesignerImg from '../assets/images/lesson6_badge_char_designer_1790073992390.jpg';

export const Lesson4TheoryAndCheatSheet: React.FC = () => {
  return (
    <div className="space-y-8">
      <Lesson5LectureSection />
      <div className="pt-6 border-t border-slate-800">
        <Lesson6LectureSection />
      </div>
    </div>
  );
};

export const Lesson4LabWorkMerged: React.FC = () => {
  return (
    <div className="space-y-8">
      <Lesson5LabWorkSection />
      <div className="pt-6 border-t border-slate-800">
        <Lesson6LabWorkSection />
      </div>
    </div>
  );
};

export const Lesson4DetectiveAndQuiz: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // PART 1: ЧЕЛЛЕНДЖ ПРОВЕРКИ ВИЗУАЛЬНЫХ ПРОМПТОВ (DEBUG CHALLENGE)
  // ==========================================
  const initialDebugCards = [
    {
      id: 1,
      claim: '«Чтобы получить киношный шедевр Худжанда-2050, достаточно написать в нейросеть два слова: "красивый город".»',
      isFact: false,
      explanation: 'Ошибка! Короткий запрос даёт размытый, случайный результат. Настоящий ИИ-Художник использует Формулу 6 частей: Объект + Детали + Стиль + Освещение + Ракурс + Настроение.',
      userAnswer: null as boolean | null
    },
    {
      id: 2,
      claim: '«Приём Reference (образец) — когда ты загружаешь удачный портрет героя и просишь нейросеть: "Используй ТОЧНО ЭТОГО персонажа в новой сцене" — помогает сохранить одно и то же лицо.»',
      isFact: true,
      explanation: 'Правда! Reference Image + ключевая фраза "same character" и описание неизменных деталей из Паспорта Персонажа дают максимальное постоянство (Consistency).',
      userAnswer: null as boolean | null
    },
    {
      id: 3,
      claim: '«Если маскот улыбается или удивляется в новом кадре, нужно полностью менять цвет его глаз, причёску и одежду, чтобы показать эмоцию.»',
      isFact: false,
      explanation: 'Ошибка! При смене эмоций меняются только мимика (брови, рот, взгляд) и поза, а ключевые черты героя (лицо, очки, куртка с узором атлас) остаются неизменными!',
      userAnswer: null as boolean | null
    }
  ];

  const [debugCards, setDebugCards] = useState(initialDebugCards);

  const handleDebugAnswer = (cardId: number, answer: boolean) => {
    setDebugCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, userAnswer: answer } : c))
    );
    addReward(15, '🔍 Проверка визуального правила выполнена! (+15 Опыта)');
  };

  // ==========================================
  // PART 2: МИНИ-ТЕСТ (5 ВОПРОСОВ КАК В УРОКЕ 1)
  // ==========================================
  const quizQuestions = [
    {
      id: 1,
      q: '1. Какая из 6 частей визуальной формулы промпта отвечает за время суток, неоновые блики или закатное солнце?',
      options: [
        'A) Ракурс (Camera Angle)',
        'B) Освещение (Lighting)',
        'C) Главный объект (Subject)',
        'D) Настроение (Mood)'
      ],
      correct: 1,
      explanation: 'Правильно! Освещение (Lighting) — например, золотой закат, мягкий утренний туман или неоновые огни ночи — задаёт объём и драматизм кадра.'
    },
    {
      id: 2,
      q: '2. Зачем в промпте для генерации изображений используется блок «Негативный запрос» (Negative Prompt)?',
      options: [
        'A) Чтобы сделать картинку грустной и мрачной',
        'B) Чтобы явно запретить нейросети рисовать артефакты (лишние пальцы, размытие, кривые лица, водяные знаки)',
        'C) Чтобы удалить аккаунт пользователя',
        'D) Чтобы уменьшить размер файла в два раза'
      ],
      correct: 1,
      explanation: 'Верно! Negative Prompt отсекает типичные галлюцинации и брак генерации (extra fingers, blurry, deformed hands).'
    },
    {
      id: 3,
      q: '3. Что такое «Постоянство персонажа» (Character Consistency)?',
      options: [
        'A) Когда герой выглядит узнаваемо и одинаково во всех кадрах, ракурсах и сценах',
        'B) Когда нейросеть генерирует 10 совершенно разных людей подряд',
        'C) Скорость интернета при скачивании картинки',
        'D) Использование только чёрно-белых цветов'
      ],
      correct: 0,
      explanation: 'Именно так! Постоянство персонажа — главный навык дизайнера: маскот меняет эмоции и локации, но остаётся тем же самым героем.'
    },
    {
      id: 4,
      q: '4. Какие 4 кадра входят в профессиональный лист персонажа (Character Sheet) нашего курса?',
      options: [
        'A) 4 одинаковых паспорта без лица',
        'B) Портрет крупным планом, Полный рост, Эмоции (радость/удивление) и Персонаж в сцене (Худжанд-2050)',
        'C) Только текстовое описание на 5 страниц',
        'D) Случайные пейзажи без героя'
      ],
      correct: 1,
      explanation: 'Точно! Эти 4 кадра полностью раскрывают героя: от деталей лица и костюма до живых эмоций и действия в городе будущего.'
    },
    {
      id: 5,
      q: '5. Какое правило этики и безопасности обязательно для ИИ-Художника и Дизайнера персонажей?',
      options: [
        'A) Создавать фейковые фото реальных одноклассников без их разрешения',
        'B) Никогда не генерировать дипфейки реальных людей для обмана и честно указывать соавторство с ИИ',
        'C) Выдавать чужие арты за свои собственные рисунки карандашом',
        'D) Загружать чужие паспортные фотографии в публичные генераторы'
      ],
      correct: 1,
      explanation: 'Абсолютно верно! Честность автора и уважение к частной жизни людей — нерушимый закон цифрового создателя.'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(false);

  useLessonQuizPersistence(
    4,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizSubmitted,
    setQuizSubmitted,
    undefined,
    'Урок 4: ИИ-Художник и Дизайнер персонажей'
  );

  React.useEffect(() => {
    if (quizSubmitted) {
      let correctCount = 0;
      quizQuestions.forEach((q) => {
        if (quizAnswers[q.id] === q.correct) correctCount++;
      });
      setBadgeUnlocked(correctCount >= 4);
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
    if (correctCount >= 4) {
      setBadgeUnlocked(true);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* 1. DEBUG CHALLENGE: ПОЙМАЙ ОШИБКУ В ВИЗУАЛЬНОМ ПРОМПТЕ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Челлендж арт-директора
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            🔎 «Поймай ошибку визуального промпта» (Debug Challenge)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ниже приведены три утверждения о генерации города «Худжанд-2050» и создании Маскота курса. Определи: где профессиональное правило, а где ошибка новичка?
          </p>
        </div>

        {/* 3 Правила проверки визуальной генерации */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🎨', title: 'Формула 6 частей', desc: 'Объект + Детали + Стиль + Освещение + Ракурс + Настроение' },
            { icon: '🪪', title: 'Паспорт героя', desc: 'Фиксируй неизменные приметы лица, причёски и одежды в каждом кадре' },
            { icon: '🖼️', title: 'Приём Reference', desc: 'Опирайся на эталонный портрет + фразу "same character" для сходства 3/3' }
          ].map((m, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300">
                <span>{m.icon}</span> {m.title}
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Карточки утверждений */}
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
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      ✓ Это правда
                    </button>
                    <button
                      onClick={() => handleDebugAnswer(card.id, false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/70 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all cursor-pointer"
                    >
                      ✕ Это ошибка / Миф
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

      {/* 2. МИНИ-ТЕСТ (5 ВОПРОСОВ ПО ШАБЛОНУ УРОКА 1) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Итоговый тест Урока 4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              📝 Мини-тест: ИИ-Художник и Дизайнер персонажей (5 вопросов)
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
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${optStyle}`}
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
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" /> Завершить тест и получить Опыт
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center -space-x-3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-pink-400 shadow-lg">
                    <img src={badgeAiArtistImg} alt="Бейдж AI Artist" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-lg">
                    <img src={badgeCharacterDesignerImg} alt="Бейдж Character Designer" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-black text-base sm:text-lg text-emerald-300">
                    {badgeUnlocked
                      ? 'Поздравляем! Ты подтвердил звания 🎨 «AI ARTIST» & 🦸 «CHARACTER DESIGNER»!'
                      : 'Тест завершён! Попробуй набрать 4–5 из 5 для разблокировки двойного бейджа.'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Ты освоил Формулу 6 частей для генерации «Худжанд-2050» и приём постоянства персонажа (Consistency). Переходи к Разделу 4 (Домашнее задание)!
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
      {/* СДАЧА ОТЧЕТА ПО ТЕСТАМ МЕНТОРУ */}
      {/* ========================================================= */}
      <div className="pt-2">
        <InlineTestSubmission
          lessonId={4}
          testId="LESSON_4"
          testTitle="Урок 4: Проверка знаний и тесты (ИИ-Художник & Дизайнер персонажей)"
        />
      </div>
    </div>
  );
};

export const Lesson4JournalAndSideQuests: React.FC = () => {
  return (
    <div className="space-y-8">
      <Lesson5HomeworkSection />
      <div className="pt-6 border-t border-slate-800">
        <Lesson6HomeworkSection />
      </div>
    </div>
  );
};


