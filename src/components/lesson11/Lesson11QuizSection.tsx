import React, { useState } from 'react';
import {
  Stethoscope,
  CheckCircle2,
  Shield,
  Wand2
} from 'lucide-react';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

interface Lesson11QuizSectionProps {
  onTestSubmitted?: () => void;
}

export const Lesson11QuizSection: React.FC<Lesson11QuizSectionProps> = ({ onTestSubmitted }) => {
  const [patientStatus, setPatientStatus] = useState<Record<number, boolean>>({});
  const [patientAnswers, setPatientAnswers] = useState<Record<number, string>>({});

  const patients = [
    {
      id: 1,
      title: 'Пациент №1: Хаос вместо дизайна',
      symptom: 'Ученик сразу написал в генератор кода «Сделай сайт машины» без UX-анализа и UI-прототипа. Получилась каша из 12 кнопок и случайных блоков.',
      options: [
        { id: 'a', text: 'Нарушен принцип «Сначала дизайн. Потом код»: нужно идти по пути Idea → UX → UI (Google Stitch) → Prototype → Code', correct: true },
        { id: 'b', text: 'Нужно просто добавить больше анимаций', correct: false },
        { id: 'c', text: 'Сайты всегда делают без дизайна', correct: false }
      ],
      cure: 'Верно! Сначала проектируем структуру и визуальную иерархию в Google Stitch, и только потом переходим к коду.'
    },
    {
      id: 2,
      title: 'Пациент №2: Потерянный фокус на первом экране',
      symptom: 'На Hero-экране одновременно размещены 8 баннеров, мелкий серый заголовок и 6 одинаковых кнопок без воздуха (whitespace).',
      options: [
        { id: 'a', text: 'Добавить седьмую кнопку', correct: false },
        { id: 'b', text: 'Применить промпт улучшения в Google Stitch: усилить визуальную иерархию, добавить whitespace и оставить чёткий CTA без лишних элементов', correct: true },
        { id: 'c', text: 'Удалить название продукта', correct: false }
      ],
      cure: 'Точно! Премиальный технологический интерфейс (как у Tesla Model X) строится на воздухе, чёткой типографике и ясной иерархии.'
    },
    {
      id: 3,
      title: 'Пациент №3: Сломанный Product Storytelling',
      symptom: 'Секции лендинга идут вразнобой: сначала мелкие сноски, потом футер, а характеристики спрятаны в самом низу.',
      options: [
        { id: 'a', text: 'Выстроить последовательный Product Storytelling (Interior → Exterior → Performance → Utility → Charging → Safety) и карточки метрик', correct: true },
        { id: 'b', text: 'Убрать все изображения продукта', correct: false },
        { id: 'c', text: 'Сделать весь текст одним сплошным абзацем', correct: false }
      ],
      cure: 'Отлично! Последовательное раскрытие продукта шаг за шагом удерживает внимание и ведёт пользователя к целевому действию.'
    }
  ];

  const handlePatientSelect = (patientId: number, optId: string, isCorrect: boolean) => {
    setPatientAnswers((prev) => ({ ...prev, [patientId]: optId }));
    setPatientStatus((prev) => ({ ...prev, [patientId]: isCorrect }));
  };

  const quizQuestions = [
    {
      id: 1,
      q: 'Какова главная формула правильного продуктового процесса в миссии «Сначала дизайн. Потом код.»?',
      options: [
        'Prompt → Code → хаос',
        'Idea → UX → UI → Prototype → Code',
        'Сразу публиковать черновик без проверки',
        'Копировать чужой код без понимания структуры'
      ],
      correct: 1,
      explanation: 'Путь Idea → UX → UI → Prototype → Code гарантирует продуманный пользовательский опыт и чистый премиальный интерфейс.'
    },
    {
      id: 2,
      q: 'Как Google описывает инструмент Google Stitch?',
      options: [
        'Текстовый блокнот без графики',
        'AI design canvas (ИИ-холст для дизайна), который превращает инструкции на естественном языке в high-fidelity UI, который можно итеративно улучшать',
        'Антивирус для телефона',
        'Табличный калькулятор'
      ],
      correct: 1,
      explanation: 'Google Stitch — это AI design canvas для быстрой генерации и итеративной доработки высококачественных пользовательских интерфейсов.'
    },
    {
      id: 3,
      q: 'Какая последовательность Product Storytelling используется на странице Tesla Model X?',
      options: [
        'Только прайс-лист и контакты',
        'Interior → Exterior → Performance → Utility → Charging → Safety',
        'Случайный набор картинок без подписей',
        'Только текстовая инструкция по ремонту'
      ],
      correct: 1,
      explanation: 'На странице Tesla Model X история продукта раскрывается последовательно: от салона и экстерьера к динамике, практичности, зарядке и безопасности.'
    },
    {
      id: 4,
      q: 'Какие 6 элементов интерфейса мы обязательно проверяем на Шаге 5 (Inspect) в Google Stitch?',
      options: [
        'Hierarchy, Spacing, Typography, Buttons, Cards, Navigation',
        'Только цвет курсора мыши',
        'Только скорость интернета',
        'Название папки на диске'
      ],
      correct: 0,
      explanation: 'Инспекция включает иерархию, отступы (whitespace), типографику, кнопки, карточки характеристик и навигацию.'
    },
    {
      id: 5,
      q: 'Какой промпт мы используем на Шаге 6 в Google Stitch для финальной полировки интерфейса?',
      options: [
        'Add 20 popups and neon banners everywhere',
        'Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements.',
        'Delete all sections',
        'Make all text 8px'
      ],
      correct: 1,
      explanation: 'Этот промпт усиливает визуальную иерархию и минималистичную премиальность без добавления визуального шума.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  useLessonQuizPersistence(
    5,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    testSubmitted,
    setTestSubmitted
  );

  return (
    <div className="space-y-8 text-slate-200">
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Shield className="w-3.5 h-3.5" /> Проверка знаний · Урок 5 (Google Stitch & Tesla UX)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            UX/UI Инспектор и Квалификационный тест по Google Stitch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Исправь 3 архитектурные ошибки дизайна и пройди тест из 5 вопросов.
          </p>
        </div>
      </div>

      {/* Doctor Interface */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-rose-400" /> UX Инспектор: 3 кейса
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Исправлено: {Object.values(patientStatus).filter(Boolean).length} из 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map((p) => {
            const isResolved = patientStatus[p.id];
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                  isResolved
                    ? 'bg-emerald-950/20 border-emerald-600/50'
                    : 'bg-black/60 border-slate-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{p.title}</span>
                    {isResolved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-300 italic">{p.symptom}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  {p.options.map((opt) => {
                    const isPicked = patientAnswers[p.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePatientSelect(p.id, opt.id, opt.correct)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isPicked
                            ? opt.correct
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                  {isResolved && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-[11px] text-emerald-300 mt-2">
                      {p.cure}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Questions */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-cyan-400" /> Тест Урока 5: AI Product Designer — Google Stitch (5 вопросов)
        </h3>

        <div className="space-y-4">
          {quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-5 rounded-2xl bg-black/50 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white">
                {idx + 1}. {q.q}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const showResult = testSubmitted;
                  const isCorrectOpt = q.correct === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => {
                        if (!testSubmitted) {
                          setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                        }
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        showResult
                          ? isCorrectOpt
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400'
                          : isSelected
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {testSubmitted && (
                <div className="text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <InlineTestSubmission
          lessonId={5}
          questions={quizQuestions.map((q) => ({
            id: q.id,
            question: q.q,
            options: q.options,
            correctIndex: q.correct
          }))}
          selectedAnswers={selectedAnswers}
          onSubmitted={() => {
            setTestSubmitted(true);
            if (onTestSubmitted) onTestSubmitted();
          }}
        />
      </div>
    </div>
  );
};
