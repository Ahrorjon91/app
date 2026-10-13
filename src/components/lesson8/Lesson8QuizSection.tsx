import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Clock,
  Wrench,
  Server,
  GitBranch,
  Video,
  Globe,
  Sparkles
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineTestSubmission } from '../InlineLabAndHomeworkSubmission';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';

export const Lesson8QuizSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 1. Deployment & DNS Doctor (4 real-world deployment issues)
  const [fixedCases, setFixedCases] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const deployCases = [
    {
      id: 1,
      title: 'Сбой #1: Кнопка «Save to GitHub» не создаёт репозиторий',
      symptom: 'Ученик нажимает Save to GitHub на STEP 4, но список аккаунтов пуст или возникает ошибка авторизации.',
      solution:
        'Заранее зарегистрироваться на GitHub.com, подтвердить email и разрешить OAuth-доступ (Connect GitHub account) в окне Google AI Studio.'
    },
    {
      id: 2,
      title: 'Сбой #2: Видео в Hero-секции не запускается автоматически',
      symptom: 'После вставки ссылки из Cloudinary видео стоит на паузе или показывает чёрный прямоугольник на мобильном телефоне.',
      solution:
        'Использовать прямую .mp4 ссылку из Cloudinary и добавить в тег <video> обязательные атрибуты: autoplay loop muted playsinline.'
    },
    {
      id: 3,
      title: 'Сбой #3: Настоящий домен (Real DNS) не открывает Linux-сервер',
      symptom: 'Конфиг Nginx / Apache включён, по IP-адресу 203.0.113.50 сайт открывается, а по домену teslax.myproject.com — ошибка DNS_PROBE_FINISHED_NXDOMAIN.',
      solution:
        'В панели регистратора домена добавить DNS A-записи для @ и www, указывающие на публичный IPv4 адрес Linux-сервера (203.0.113.50).'
    },
    {
      id: 4,
      title: 'Сбой #4: Nginx / Apache выдаёт 403 Forbidden после загрузки по SCP',
      symptom: 'Файлы скопированы в /var/www/teslamodelx напрямую без GitHub, но веб-сервер пишет 403 Forbidden.',
      solution:
        'Проверить наличие index.html в корне папки и выдать права чтения пользователю веб-сервера: sudo chown -R www-data:www-data /var/www/teslamodelx && sudo chmod -R 755 /var/www/teslamodelx.'
    }
  ];

  const handleFixCase = (id: number) => {
    if (!fixedCases[id]) {
      setFixedCases(prev => ({ ...prev, [id]: true }));
      addReward(25, `🛠️ Сбой публикации #${id} устранён! (+25 ОП)`);
    }
  };

  // 2. Speed Blitz 3/3 (90s)
  const [speedAnswers, setSpeedAnswers] = useState({ q1: false, q2: false, q3: false });
  const [speedDone, setSpeedDone] = useState(false);

  const toggleSpeed = (key: 'q1' | 'q2' | 'q3') => {
    const next = { ...speedAnswers, [key]: !speedAnswers[key] };
    setSpeedAnswers(next);
    if (next.q1 && next.q2 && next.q3 && !speedDone) {
      setSpeedDone(true);
      addReward(40, '⚡ Блиц-проверка Publisher 3/3 пройдена! (+40 ОП)');
    }
  };

  // 3. Final 5-Question Quiz
  const quizQuestions = [
    {
      id: 1,
      question: '1. Какие 5 пунктов нужно обязательно проверить в STEP 3 (Test) перед публикацией проекта из Google AI Studio?',
      options: [
        { key: 'A', text: 'Только цвет фона и размер шрифта' },
        { key: 'B', text: 'buttons, navigation, responsive, console, images' },
        { key: 'C', text: 'Только скорость кулера на ноутбуке' },
        { key: 'D', text: 'Ничего проверять не нужно' }
      ],
      correct: 'B',
      explanation:
        'Предполётный тест STEP 3 включает 5 обязательных проверок: кнопки (buttons), навигацию (navigation), мобильную адаптивность (responsive), отсутствие ошибок в консоли (console) и загрузку картинок (images).'
    },
    {
      id: 2,
      question: '2. Что ученик должен увидеть в своём репозитории (например, TeslaModelX) на шаге STEP 7 — Open GitHub?',
      options: [
        { key: 'A', text: 'Только пустую страницу' },
        { key: 'B', text: 'README, src, package.json и остальные файлы проекта' },
        { key: 'C', text: 'Только ярлык браузера' },
        { key: 'D', text: 'Файлы операционной системы Linux' }
      ],
      correct: 'B',
      explanation:
        'После успешного Push (STEP 6) в репозитории на GitHub отображается структура современного проекта: README, папка src, файл package.json и др.'
    },
    {
      id: 3,
      question: '3. Что входит в обязательную сдачу 🎯 FINAL CHALLENGE в конце урока?',
      options: [
        { key: 'A', text: 'Только текстовое описание идеи' },
        { key: 'B', text: 'GitHub URL + Live URL + Screenshot' },
        { key: 'C', text: 'Только ссылка на главную страницу Google' },
        { key: 'D', text: 'Аудиозапись рассказа о сайте' }
      ],
      correct: 'B',
      explanation:
        'В 🎯 FINAL CHALLENGE ученик отправляет три доказательства: ссылку на репозиторий GitHub (GitHub URL), ссылку на живой сайт (Live URL) и скриншот работающего сайта (Screenshot).'
    },
    {
      id: 4,
      question: '4. Как добавить своё видео в Hero-секцию и обновить живой сайт без сбоев?',
      options: [
        { key: 'A', text: 'Загрузить видео на Cloudinary (cloudinary.com/users/login), попросить AI Studio вставить URL в Hero-секцию, затем нажать Save и Publish' },
        { key: 'B', text: 'Указать локальный путь C:\\Videos\\car.mp4 со своего компьютера' },
        { key: 'C', text: 'Удалить репозиторий и создать новый аккаунт' },
        { key: 'D', text: 'Переименовать картинку .jpg в .mp4' }
      ],
      correct: 'A',
      explanation:
        'Видео загружается в облако Cloudinary, откуда копируется прямая HTTPS-ссылка и передаётся в промпт AI Studio. После нажатия Save и Publish живой сайт обновляется без единой ошибки.'
    },
    {
      id: 5,
      question: '5. Как выполняется прямой деплой проекта на Linux-сервер без GitHub с настоящим доменом (Real DNS)?',
      options: [
        { key: 'A', text: 'Файлы копируются на сервер в /var/www/ по SSH (SCP/SFTP), настраивается VirtualHost в Nginx или Apache, а в DNS домена прописывается A-запись на IP сервера' },
        { key: 'B', text: 'Файлы просто отправляются в корзину' },
        { key: 'C', text: 'Достаточно переименовать папку на рабочем столе Windows' },
        { key: 'D', text: 'Без GitHub запустить сайт на Linux невозможно' }
      ],
      correct: 'A',
      explanation:
        'Прямой деплой на Linux VPS включает передачу файлов по SSH (scp/sftp) в /var/www/teslamodelx, настройку блока server в Nginx (или VirtualHost в Apache2) и привязку домена через DNS A-запись к IP-адресу сервера.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useLessonQuizPersistence(
    8,
    quizQuestions,
    selectedAnswers,
    setSelectedAnswers,
    quizSubmitted,
    setQuizSubmitted
  );

  const resetPersistedQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectOption = (qId: number, key: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const correctCount = quizQuestions.filter(q => selectedAnswers[q.id] === q.correct).length;

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) return;
    setQuizSubmitted(true);
    if (correctCount >= 4) {
      addReward(100, `🏆 Тест Урока 8 сдан (${correctCount}/5)! Бейдж «GLOBAL WEB PUBLISHER (Lv.8)» разблокирован! (+100 ОП)`);
    } else {
      addReward(30, `📝 Тест завершён (${correctCount}/5). Повтори подсказки и попробуй улучшить результат!`);
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* 1. DEPLOYMENT & DNS DOCTOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Тренажёр отладки релизов • 4 кейса
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              🩺 Доктор Деплоя: GitHub, Cloudinary Video и Linux DNS
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            Исправлено: {Object.values(fixedCases).filter(Boolean).length} / 4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deployCases.map(c => {
            const isFixed = fixedCases[c.id];
            return (
              <div
                key={c.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  isFixed ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-sm font-black text-white">{c.title}</div>
                  <p className="text-xs text-rose-300/90 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl">
                    <strong>Симптом:</strong> {c.symptom}
                  </p>
                  {isFixed && (
                    <p className="text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-700/40 p-2.5 rounded-xl">
                      <strong>Решение инженера:</strong> {c.solution}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleFixCase(c.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isFixed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {isFixed ? '✅ Сбой устранён (+25 ОП)' : '🔧 Показать решение и исправить сбой'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SPEED BLITZ CHECKLIST 3/3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            ⚡ Быстрая предполётная сверка Издателя (3/3)
          </h3>
          <span className="text-xs font-mono text-cyan-400">Бонус +40 ОП</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              key: 'q1' as const,
              title: 'GitHub.com + Repo TeslaModelX',
              desc: 'Я знаю все 7 шагов публикации из AI Studio в GitHub и какие файлы лежат внутри (README, src, package.json).'
            },
            {
              key: 'q2' as const,
              title: 'Cloudinary Video + Update Live',
              desc: 'Я умею загружать видео на cloudinary.com/users/login, добавлять его в Hero-секцию и обновлять сайт без ошибок.'
            },
            {
              key: 'q3' as const,
              title: 'Linux VPS (Nginx / Apache + DNS)',
              desc: 'Я понимаю, как загрузить сайт по SCP в /var/www/, настроить Nginx или Apache и привязать домен через A-запись.'
            }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => toggleSpeed(item.key)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                speedAnswers[item.key]
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-black text-cyan-300">{item.title}</span>
                <CheckCircle2
                  className={`w-4 h-4 ${speedAnswers[item.key] ? 'text-emerald-400' : 'text-slate-600'}`}
                />
              </div>
              <p className="text-xs leading-relaxed opacity-85">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. FINAL 5-QUESTION QUIZ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              Финальный тест Урока 8 • 5 вопросов
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              Проверка знаний: 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!» и Linux Deployment
            </h3>
          </div>
          {quizSubmitted && (
            <button
              onClick={resetPersistedQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Пройти заново
            </button>
          )}
        </div>

        <div className="space-y-5">
          {quizQuestions.map(q => {
            const chosen = selectedAnswers[q.id];
            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-sm sm:text-base font-bold text-white">{q.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map(opt => {
                    const isSelected = chosen === opt.key;
                    const isCorrect = opt.key === q.correct;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      style = 'bg-indigo-950/70 border-indigo-400 text-white';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer ${style}`}
                      >
                        <span className="font-mono font-black">{opt.key}.</span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-emerald-400">Пояснение:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 disabled:opacity-40 text-slate-950 font-black text-sm transition-all cursor-pointer shadow-lg"
          >
            Проверить ответы ({Object.keys(selectedAnswers).length} / {quizQuestions.length})
          </button>
        ) : (
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-base font-black text-white">
                  Результат теста: {correctCount} из {quizQuestions.length}
                </div>
                <div className="text-xs text-emerald-300">
                  Бейдж «GLOBAL WEB PUBLISHER (Lv.8)» активирован!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INLINE PORTAL TEST SUBMISSION */}
      <InlineTestSubmission
        lessonId={8}
        title="Отправка результатов теста Урока 8 (🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»)"
        score={quizSubmitted ? Math.round((correctCount / quizQuestions.length) * 100) : 100}
        details={`Тест Урока 8 (🚀 Publisher — Git + GitHub + «Мой сайт LIVE!» & Linux Server Deployment): ${
          quizSubmitted ? `${correctCount}/${quizQuestions.length}` : '5/5'
        }. Доктор Деплоя и DNS пройден.`}
      />
    </div>
  );
};
