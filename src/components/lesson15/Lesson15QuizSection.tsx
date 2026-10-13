import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Stethoscope,
  Timer
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { AcademicBadgeIcon } from '../AcademicBadgeIcon';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson15QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // LEVEL 5A: DOCTOR OF PRODUCT RENDER (3 Patients)
  const [patientPrescriptions, setPatientPrescriptions] = useState<Record<number, string>>({});
  const [patientSolved, setPatientSolved] = useState<Record<number, boolean>>({});

  const patients = [
    {
      id: 1,
      title: 'Пациент 1: Видимая серая рамка вокруг смартфона Burgundy на чёрном сайте',
      symptoms: 'Студент вставил анимацию смартфона iPhone 18 Pro в цвете Burgundy на чёрный сайт (#000000), но вокруг телефона виден некрасивый светло-серый прямоугольник с дымом.',
      options: [
        { id: 'wrong1', text: 'Сделать весь сайт белым', isCorrect: false },
        {
          id: 'correct',
          text: 'Указать в промпте Whisk: «Фон абсолютно чистый чёрный (#000000), без текстур, без дыма и без реквизита»',
          isCorrect: true,
          feedback: 'Браво! Чистый фон #000000 идеально сливается с фоном веб-страницы без видимых границ!'
        },
        { id: 'wrong2', text: 'Обрезать половину камеры', isCorrect: false }
      ]
    },
    {
      id: 2,
      title: 'Пациент 2: Смартфон перекрывает текст слева в конце скролла',
      symptoms: 'На финальном кадре (End Frame) смартфон остался строго посередине и закрыл собой важные карточки характеристик слева.',
      options: [
        { id: 'wrong1', text: 'Удалить все карточки характеристик с сайта', isCorrect: false },
        {
          id: 'correct',
          text: 'Задать в Кадре 2 (End Frame) и в Google Flow плавное смещение смартфона из центра в правую часть кадра (from center into right side)',
          isCorrect: true,
          feedback: 'Точно в цель! Смещение из центра вправо на 75–80% высоты открывает чистую зону слева для типографики и карточек.'
        },
        { id: 'wrong2', text: 'Уменьшить шрифт до 2 пикселей', isCorrect: false }
      ]
    },
    {
      id: 3,
      title: 'Пациент 3: Как подготовить скачанное из Flow видео для покадрового скролла в AI Studio?',
      symptoms: 'У ученика есть MP4-ролик движения смартфона в цвете Burgundy из центра вправо, но он не знает, как превратить его в GIF или набор кадров.',
      options: [
        {
          id: 'correct',
          text: 'Загрузить видео на https://ezgif.com/video-to-gif (или Video to JPG), конвертировать и скачать готовую папку для загрузки в AI Studio',
          isCorrect: true,
          feedback: 'Великолепно! Ezgif за пару секунд создаёт оптимизированную анимацию или секвенцию кадров.'
        },
        { id: 'wrong1', text: 'Делать скриншоты экрана вручную с телефона', isCorrect: false },
        { id: 'wrong2', text: 'Переименовать файл .mp4 в .txt', isCorrect: false }
      ]
    }
  ];

  const handleSelectPrescription = (patientId: number, optId: string, isCorrect: boolean) => {
    setPatientPrescriptions(prev => ({ ...prev, [patientId]: optId }));
    if (isCorrect && !patientSolved[patientId]) {
      setPatientSolved(prev => ({ ...prev, [patientId]: true }));
      addReward(25, `🩺 Кейс ${patientId} решён! (+25 ОП)`);
    }
  };

  // LEVEL 5B: SPEED CHALLENGE 3/3 (90s Timer)
  const [speedTimer, setSpeedTimer] = useState(90);
  const [speedActive, setSpeedActive] = useState(false);
  const [speedAnswers, setSpeedAnswers] = useState<Record<number, number>>({});
  const [speedFinished, setSpeedFinished] = useState(false);

  useEffect(() => {
    let t: any = null;
    if (speedActive && speedTimer > 0 && !speedFinished) {
      t = setInterval(() => {
        setSpeedTimer(prev => {
          if (prev <= 1) {
            setSpeedFinished(true);
            setSpeedActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [speedActive, speedTimer, speedFinished]);

  const speedQuestions = [
    {
      q: '1. Где расположен смартфон в Промпте №1 (Start Frame)?',
      options: ['Строго по центру в нижних 40% кадра с лёгким 3D-наклоном назад', 'В верхнем левом углу', 'За пределами экрана'],
      correct: 0
    },
    {
      q: '2. Куда перемещается смартфон в Промпте №2 (End Frame) и видео Google Flow?',
      options: ['Из центра в правую часть кадра (from center into right side), вставая во весь рост (75–80% высоты)', 'Уходит влево вверх', 'Падает вниз'],
      correct: 0
    },
    {
      q: '3. Какое фирменное описание цвета и стекла мы используем во всех промптах?',
      options: [
        'Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy',
        'Ярко-зелёный пластиковый корпус',
        'Деревянная крышка'
      ],
      correct: 0
    }
  ];

  const handleSpeedAnswer = (qIdx: number, optIdx: number) => {
    if (!speedActive && !speedFinished) {
      setSpeedActive(true);
    }
    const next = { ...speedAnswers, [qIdx]: optIdx };
    setSpeedAnswers(next);

    if (Object.keys(next).length === 3) {
      setSpeedFinished(true);
      setSpeedActive(false);
      const correctCount = speedQuestions.filter((q, idx) => next[idx] === q.correct).length;
      if (correctCount === 3) {
        addReward(50, '⚡ Блиц по Burgundy 3D-ассетам пройден на 3/3! (+50 ОП)');
      }
    }
  };

  // LEVEL 7: FINAL EXAM & BADGE UNLOCK
  const finalQuestions = [
    {
      id: 1,
      q: 'Какова правильная цепочка инструментов в Уроке 11 для создания 3D-анимации смартфона уровня Apple?',
      options: [
        'Сразу писать код в Блокноте без картинок',
        'Pinterest (референс) → Google Whisk (Кадр 1 в центре и Кадр 2 справа) → Google Flow (генерация видео из центра вправо) → Ezgif (нарезка в GIF / кадры) → AI Studio',
        'Скачать случайную картинку из поиска и растянуть её',
        'Нарисовать телефон в Paint'
      ],
      correct: 1,
      hint: 'Конвейер объединяет Pinterest, Google Whisk (Start в центре / End справа), Google Flow и Ezgif.'
    },
    {
      id: 2,
      q: 'Чем отличается Кадр 1 (Start Frame) от Кадра 2 (End Frame) в наших промптах для Google Whisk?',
      options: [
        'Они абсолютно одинаковые',
        'В Кадре 1 виден блок камер строго по центру в нижних 40% экрана под наклоном, а в Кадре 2 смартфон выпрямляется во весь рост (75–80% высоты) и смещается из центра в правую часть кадра (into right side)',
        'В Кадре 1 телефон синий, а в Кадре 2 зелёный',
        'В Кадре 1 телефон лежит на траве'
      ],
      correct: 1,
      hint: 'Переход из нижнего центра в правую часть экрана освобождает место слева для карточек характеристик.'
    },
    {
      id: 3,
      q: 'Почему в промптах для Google Whisk критически важно требовать абсолютно чистый чёрный фон (#000000)?',
      options: [
        'Чтобы сэкономить краску в мониторе',
        'Чтобы края изображения и видео бесшовно слились с чёрным фоном веб-сайта (#000000), создавая иллюзию парящего 3D-объекта',
        'Потому что ИИ не умеет рисовать другие цвета',
        'Это не имеет значения'
      ],
      correct: 1,
      hint: 'Совпадение цвета фона рендера (#000000) и страницы (#000000) убирает видимые швы.'
    },
    {
      id: 4,
      q: 'Для чего мы используем сервис https://ezgif.com/video-to-gif после генерации видео в Google Flow?',
      options: [
        'Чтобы добавить музыку в видео',
        'Чтобы сконвертировать MP4-видео в оптимизированную GIF-анимацию или покадровую секвенцию (JPG/WebP кадры) для загрузки в Google AI Studio',
        'Чтобы удалить видео',
        'Чтобы поменять шрифт на сайте'
      ],
      correct: 1,
      hint: 'Ezgif превращает видео в удобный формат кадров для управления скроллом.'
    },
    {
      id: 5,
      q: 'Какой цвет и материал корпуса задаётся во всех промптах Whisk и Flow для создания флагманского образа iPhone 18 Pro?',
      options: [
        'Прозрачный пластик',
        'Глубокий цвет Бургунди с матовым задним стеклом в тон корпусу (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy)',
        'Деревянный корпус',
        'Бумажное покрытие'
      ],
      correct: 1,
      hint: 'Оттенок Burgundy с матовым задним стеклом в тон корпусу (color-matched back glass) даёт ощущение продукта на миллион долларов.'
    }
  ];

  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  useLessonQuizPersistence(
    11,
    finalQuestions,
    examAnswers,
    setExamAnswers,
    examSubmitted,
    setExamSubmitted
  );

  const handleSelectExamAnswer = (qId: number, optIdx: number) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const correctExamCount = finalQuestions.filter(q => examAnswers[q.id] === q.correct).length;
  const isExamPassed = examSubmitted && correctExamCount >= 4;

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    if (correctExamCount >= 4) {
      unlockBadge('b_creative_technologist');
    }
  };

  return (
    <div className="space-y-12 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/30 shadow-2xl space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
          🩺 ПРОВЕРКА ЗНАНИЙ УРОКА 11 • BURGUNDY & CENTER → RIGHT SIDE
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Доктор Продуктового Рендера, Блиц и Тест Урока 11
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Проверь своё понимание конвейера <strong>Pinterest → Google Whisk → Google Flow → Ezgif</strong> для концепта <strong>iPhone 18 Pro shown in Burgundy</strong> и получи бейдж <strong>Creative Technologist</strong>!
        </p>
      </div>

      {/* Level 5A: Doctor */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              ПРАКТИКУМ ДИАГНОСТА 3D-АССЕТОВ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-rose-400" />
              <span>Доктор Продуктового Рендера: 3 кейса</span>
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Решено: {Object.values(patientSolved).filter(Boolean).length} / 3 (+75 ОП)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {patients.map(p => {
            const isSolved = patientSolved[p.id];
            const currentSelection = patientPrescriptions[p.id];

            return (
              <div
                key={p.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isSolved
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{p.title}</span>
                    {isSolved && <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Исправлено ✓</span>}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Награда: +25 ОП</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 mb-4 text-xs sm:text-sm text-slate-300">
                  <strong className="text-rose-400 font-mono">СИМПТОМЫ: </strong>
                  {p.symptoms}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {p.options.map(opt => {
                    const isChosen = currentSelection === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectPrescription(p.id, opt.id, opt.isCorrect)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          isChosen
                            ? opt.isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                              : 'bg-rose-950 text-rose-300 border-rose-500'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {isSolved && (
                  <p className="mt-3 text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{p.options.find(o => o.isCorrect)?.feedback}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Level 5B: Speed Challenge */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              ТУРБО-БЛИЦ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <Timer className="w-6 h-6 text-amber-400" />
              <span>Быстрое испытание 3/3 (90 секунд)</span>
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl font-mono font-bold text-base border bg-slate-950 border-cyan-500/50 text-cyan-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{speedTimer}с</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {speedQuestions.map((qItem, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="text-sm sm:text-base font-bold text-white">{qItem.q}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {qItem.options.map((opt, optIdx) => {
                  const isSelected = speedAnswers[idx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSpeedAnswer(idx, optIdx)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? speedFinished
                            ? optIdx === qItem.correct
                              ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                              : 'bg-rose-950 text-rose-300 border-rose-500'
                            : 'bg-cyan-600 text-white border-cyan-400 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level 7: Final Exam */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 shadow-2xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            ФИНАЛЬНЫЙ ТЕСТ УРОКА 11
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Квалификационный экзамен: Creative Technologist
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            Ответь минимум на 4 из 5 вопросов правильно, чтобы разблокировать бейдж <strong>Creative Technologist</strong>!
          </p>
        </div>

        <div className="space-y-6">
          {finalQuestions.map((q, idx) => (
            <div key={q.id} className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                  {idx + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">{q.q}</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = examAnswers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectExamAnswer(q.id, optIdx)}
                      disabled={examSubmitted}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? examSubmitted
                            ? optIdx === q.correct
                              ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                              : 'bg-rose-950 text-rose-300 border-rose-500'
                            : 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-md'
                          : examSubmitted && optIdx === q.correct
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {examSubmitted && (
                <p className="text-xs text-slate-400 italic pt-1">💡 {q.hint}</p>
              )}
            </div>
          ))}
        </div>

        {!examSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmitExam}
              disabled={Object.keys(examAnswers).length < 5}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/30 transition-all cursor-pointer disabled:opacity-50"
            >
              Завершить тест и проверить результат
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-emerald-500/50 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 shrink-0">
                <AcademicBadgeIcon badgeId="b_creative_technologist" title="Creative Technologist" size="lg" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-400">
                  {isExamPassed ? 'ТЕСТ УСПЕШНО СДАН!' : 'ТРЕБУЕТСЯ ПОВТОРЕНИЕ'}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  {isExamPassed ? 'Твой новый ранг: Creative Technologist! 🏆' : 'Результат: ' + correctExamCount + ' / 5'}
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {isExamPassed
                    ? 'Отлично! Теперь твоя папка с 3D-ассетами Burgundy (из центра вправо) полностью готова для сборки сайта на $1 000 000 в Уроке 12!'
                    : 'Попробуй перечитать промпты Урока 11 и сдать тест заново.'}
                </p>
              </div>
            </div>

            {isExamPassed && (
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Бейдж добавлен в твой профиль студента.
                </span>
                <button
                  onClick={() => {
                    setBadgeClaimed(true);
                    addReward(25, '🎉 Бейдж Creative Technologist активирован!');
                  }}
                  disabled={badgeClaimed}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {badgeClaimed ? '✓ Бейдж подтвержден' : 'Активировать бейдж (+25 ОП)'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
