import React, { useState } from 'react';
import {
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { AcademicBadgeIcon } from '../AcademicBadgeIcon';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson16QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const unlockBadge = portal?.unlockBadge || ((_id: string) => {});

  // LEVEL 5A: DOCTOR OF $1M SCROLL WEBSITE
  const [doctorAudits, setDoctorAudits] = useState<Record<number, string>>({});
  const [doctorSolved, setDoctorSolved] = useState<Record<number, boolean>>({});

  const auditPatients = [
    {
      id: 1,
      title: 'Аудит 1: Дизайн сайта выглядит «примерным», а не 100% как у оригинального Apple iPhone 18 Pro',
      symptoms: 'Шрифты, отступы, карточки и цвета отличаются от эталонной страницы Apple, и сайт не производит впечатления продукта на $1 000 000.',
      options: [
        { id: 'wrong1', text: 'Подбирать цвета и отступы вслепую наугад', isCorrect: false },
        {
          id: 'correct',
          text: 'Перейти на https://styles.refero.design, скачать готовый файл дизайн-системы DESIGN.md для Apple iPhone 18 Pro и прикрепить его в Google AI Studio вместе с промптом',
          isCorrect: true,
          feedback: 'Безупречно! С файлом DESIGN.md из https://styles.refero.design ИИ получает точные CSS-токены, сетку и типографику Apple!'
        },
        { id: 'wrong2', text: 'Удалить все стили со страницы', isCorrect: false }
      ]
    },
    {
      id: 2,
      title: 'Аудит 2: Надпись «PRO» перекрывает смартфон сверху вместо того, чтобы быть позади него',
      symptoms: 'Гигантский текст PRO закрывает собой корпус телефона цвета Burgundy, из-за чего не видно камеру при движении из центра вправо.',
      options: [
        { id: 'wrong1', text: 'Удалить смартфон со страницы', isCorrect: false },
        {
          id: 'correct',
          text: 'Задать тексту «PRO» слой z-index: 1, а холсту <canvas> со смартфоном — слой z-index: 2, чтобы телефон поднимался поверх букв и плавно смещался из центра в правую часть экрана',
          isCorrect: true,
          feedback: 'Точный диагноз! Трёхслойная сцена по оси Z создаёт иллюзию настоящего 3D-пространства.'
        },
        { id: 'wrong2', text: 'Сделать шрифт размером 8px', isCorrect: false }
      ]
    },
    {
      id: 3,
      title: 'Аудит 3: Какой шрифт нужен для фирменного массивного заголовка «PRO»?',
      symptoms: 'Заголовок PRO выглядит тонким и скучным стандартным шрифтом Times New Roman.',
      options: [
        {
          id: 'correct',
          text: 'Подключить Google Font Archivo (https://fonts.google.com/specimen/Archivo?preview.text=PRO) в начертании 900 Black',
          isCorrect: true,
          feedback: 'Великолепно! Индустриальный гротеск Archivo Black придаёт заголовку PRO мощный флагманский характер.'
        },
        { id: 'wrong1', text: 'Оставить Times New Roman', isCorrect: false },
        { id: 'wrong2', text: 'Написать слово PRO мелким курсивом', isCorrect: false }
      ]
    }
  ];

  const handleSelectAudit = (patientId: number, optId: string, isCorrect: boolean) => {
    setDoctorAudits(prev => ({ ...prev, [patientId]: optId }));
    if (isCorrect && !doctorSolved[patientId]) {
      setDoctorSolved(prev => ({ ...prev, [patientId]: true }));
      addReward(25, `🩺 Аудит ${patientId} успешно пройден! (+25 ОП)`);
    }
  };

  // LEVEL 7: FINAL QUALIFICATION TEST (5/5)
  const quizQuestions = [
    {
      id: 1,
      q: '1. Какой ресурс мы используем в Уроке 12, чтобы получить файл DESIGN.md для идеального 100% совпадения с дизайном Apple iPhone 18 Pro?',
      opts: [
        'A) Пишем все стили наугад',
        'B) https://styles.refero.design — скачиваем файл DESIGN.md и прикрепляем его в Google AI Studio',
        'C) Калькулятор Windows',
        'D) Paint'
      ],
      correct: 1,
      exp: 'Платформа https://styles.refero.design предоставляет готовый файл DESIGN.md с точной дизайн-системой, токенами и пропорциями.'
    },
    {
      id: 2,
      q: '2. Какой шрифт из Google Fonts мы подключаем в Уроке 12 для создания гигантской металлической надписи «PRO»?',
      opts: [
        'A) Comic Sans MS',
        'B) Archivo (https://fonts.google.com/specimen/Archivo?preview.text=PRO)',
        'C) Times New Roman',
        'D) Courier New'
      ],
      correct: 1,
      exp: 'Шрифт Archivo в начертании Black (900) обладает мощной геометрией для исполинского заголовка PRO.'
    },
    {
      id: 3,
      q: '3. Как расположены слои (z-index) и куда движется смартфон в Hero-секции нашего сайта на $1 000 000?',
      opts: [
        'A) Текст перекрывает смартфон сверху',
        'B) 1) Чёрный фон со свечением Burgundy (z:0) → 2) Надпись «PRO» (z:1) → 3) Смартфон на Canvas (z:2), поднимающийся из центра и смещающийся в правую часть экрана',
        'C) Все элементы без слоёв',
        'D) Смартфон спрятан за чёрным квадратом'
      ],
      correct: 1,
      exp: 'Смартфон поднимается поверх букв PRO и плавно смещается из центра в правую сторону, открывая место слева для карточек.'
    },
    {
      id: 4,
      q: '4. Какая фирменная тема покрытий раскрывается на сайте по мере смещения смартфона в правую сторону?',
      opts: [
        'A) Прозрачный пластиковый корпус',
        'B) Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy',
        'C) Деревянный телефон',
        'D) На сайте вообще нет текста'
      ],
      correct: 1,
      exp: 'Фирменный слоган подчёркивает четыре роскошных покрытия с матовым задним стеклом в тон корпусу на примере цвета Бургунди (Burgundy).'
    },
    {
      id: 5,
      q: '5. Зачем перед запуском скролл-анимации выполняется предзагрузка (Preload) всех кадров в память браузера?',
      opts: [
        'A) Чтобы замедлить компьютер',
        'B) Чтобы во время прокрутки кадры переключались мгновенно со скоростью 60 кадров в секунду без мигания и задержек',
        'C) Чтобы увеличить счёт за интернет',
        'D) Это необязательный шаг'
      ],
      correct: 1,
      exp: 'Предзагрузка массива изображений гарантирует мгновенный отклик холста Canvas при скролле.'
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [badgeClaimed, setBadgeClaimed] = useState(false);

  useLessonQuizPersistence(
    12,
    quizQuestions,
    quizAnswers,
    setQuizAnswers,
    quizFinished,
    setQuizFinished
  );

  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizFinished) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    const score = quizQuestions.filter((q, idx) => quizAnswers[idx] === q.correct).length;
    if (score >= 4) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleClaimBadge = () => {
    if (badgeClaimed) return;
    setBadgeClaimed(true);
    unlockBadge('wow-website-master');
    addReward(50, '🎖️ Получен почётный бейдж: WOW WEBSITE MASTER (Lv.12)! (+50 ОП)');
  };

  const scoreCount = quizQuestions.filter((q, idx) => quizAnswers[idx] === q.correct).length;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/40 shadow-2xl space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
          🩺 ПРОВЕРКА ЗНАНИЙ И ТЕСТЫ • УРОК 12 (DESIGN.MD + $1M WEBSITE)
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Аудит Сайта по DESIGN.md (styles.refero.design) & Финальный тест мастера
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Проверь знание работы с <strong>DESIGN.md (https://styles.refero.design)</strong>, трёхслойной сцены, шрифта Archivo и покадрового Canvas-скролла и забери золотой бейдж <strong>WOW WEBSITE MASTER</strong>!
        </p>
      </div>

      {/* Doctor Section */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-rose-400" />
            <span>Доктор $1M-Сайта: 3 технических аудита</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            Решено: {Object.values(doctorSolved).filter(Boolean).length}/3
          </span>
        </div>

        <div className="space-y-4">
          {auditPatients.map(patient => {
            const selectedOptId = doctorAudits[patient.id];
            const isSolved = doctorSolved[patient.id];

            return (
              <div
                key={patient.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSolved ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">{patient.title}</h4>
                  {isSolved && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Исправлено (+25 ОП)
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-3">
                  ⚠️ <strong>Симптомы:</strong> {patient.symptoms}
                </div>

                <div className="space-y-2">
                  {patient.options.map(opt => {
                    const isSelected = selectedOptId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectAudit(patient.id, opt.id, opt.isCorrect)}
                        disabled={isSolved}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-950 border-emerald-500 text-white'
                              : 'bg-rose-950 border-rose-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>

                {isSolved && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300">
                    💡 {patient.options.find(o => o.isCorrect)?.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final 5 Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Квалификационный тест Урока 12 (5 вопросов)
        </h3>

        <div className="space-y-5">
          {quizQuestions.map((q, qIdx) => (
            <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-white">{q.q}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.opts.map((opt, optIdx) => {
                  const isSelected = quizAnswers[qIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuiz(qIdx, optIdx)}
                      disabled={quizFinished}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${
                        isSelected
                          ? quizFinished
                            ? optIdx === q.correct
                              ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                              : 'bg-rose-950 text-rose-300 border-rose-500'
                            : 'bg-rose-500 text-white border-rose-400 font-bold'
                          : quizFinished && optIdx === q.correct
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {quizFinished && <p className="text-xs text-slate-400 italic">💡 {q.exp}</p>}
            </div>
          ))}
        </div>

        {!quizFinished ? (
          <button
            onClick={handleFinishQuiz}
            disabled={Object.keys(quizAnswers).length < 5}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-sm cursor-pointer disabled:opacity-50"
          >
            Проверить ответы
          </button>
        ) : (
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <AcademicBadgeIcon badgeId="wow-website-master" title="WOW Website Master" size="lg" />
              <div>
                <h4 className="text-xl font-black text-white">
                  Результат: {scoreCount} / 5 • Бейдж WOW WEBSITE MASTER!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Ты освоил создание сайтов на $1 000 000 по спецификации DESIGN.md (styles.refero.design)!
                </p>
              </div>
            </div>
            <button
              onClick={handleClaimBadge}
              disabled={badgeClaimed}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              {badgeClaimed ? '✓ Бейдж получен (+50 ОП)' : 'Забрать бейдж (+50 ОП)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
