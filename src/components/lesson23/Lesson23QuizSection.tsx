import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Trophy,
  RotateCcw,
  Zap,
  Timer,
  Users,
  Mic,
  ShieldCheck,
  CheckSquare,
  ThumbsUp,
  Activity,
  Lock,
  Rocket,
  Globe,
  Server,
  Share2,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { useLessonQuizPersistence } from '../../lib/quizHelpers';
import badgeProductionImg from '../../assets/images/lesson23_badge_production_1790406855297.jpg';

interface PatientCase {
  id: number;
  title: string;
  incident: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  diagnosis: string;
  explanation: string;
}

export const Lesson23QuizSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // =========================================================================
  // LEVEL 5A: DOCTOR OF PRODUCTION (3 PATIENT INCIDENTS, +25 EXP EACH)
  // =========================================================================
  const patients: PatientCase[] = [
    {
      id: 1,
      title: 'Пациент №1: Украденный ключ и счет на $1500',
      incident:
        'Студент встроил приватный ключ Gemini прямо в React-компонент (const KEY = "AIzaSy..."). Через двое суток ему пришел счет на $1500 за миллион чужих запросов к моделям.',
      options: [
        { id: '1a', text: 'Нужно было просто изменить шрифт на сайте', isCorrect: false },
        { id: '1b', text: 'Клиентский код исполняется в браузере! Ключ нужно было скрыть за серверным прокси /api/generate в process.env', isCorrect: true },
        { id: '1c', text: 'Надо было выключить монитор на ночь', isCorrect: false }
      ],
      diagnosis: 'Фатальная утечка учетных данных через клиентский бандл!',
      explanation:
        'Все, что попадает в React-код, доступно любому человеку через вкладку DevTools Network. Приватные ключи живут только на бэкенде.'
    },
    {
      id: 2,
      title: 'Пациент №2: Падение на Vercel с ошибкой 500 (undefined key)',
      incident:
        'На локальном ноутбуке проект работал безупречно из файла .env. После деплоя на Vercel все запросы к ИИ стали падать с ошибкой 500: process.env.GEMINI_API_KEY is undefined.',
      options: [
        { id: '2a', text: 'Файл .env не попадает в Git, поэтому переменные окружения нужно вручную добавить в настройках Vercel Dashboard (Settings → Environment Variables)', isCorrect: true },
        { id: '2b', text: 'Нужно удалить репозиторий и никогда больше не программировать', isCorrect: false },
        { id: '2c', text: 'Vercel запрещает использовать искусственный интеллект', isCorrect: false }
      ],
      diagnosis: 'Потеря переменных окружения при переносе в облако!',
      explanation:
        'Поскольку .env скрыт в .gitignore ради безопасности, облачный хостинг ничего не знает о ваших ключах, пока вы не укажете их в панели управления хостингом.'
    },
    {
      id: 3,
      title: 'Пациент №3: Ссылка-спам в Telegram без картинки',
      incident:
        'Студент отправил ссылку на свой Capstone-проект партнерам, но в мессенджере она отобразилась как голая серая ссылка без картинки и описания. Получатели приняли ее за фишинг.',
      options: [
        { id: '3a', text: 'В мессенджерах запрещены ссылки на сайты', isCorrect: false },
        { id: '3b', text: 'В index.html отсутствовали мета-теги Open Graph (og:title, og:description, og:image)', isCorrect: true },
        { id: '3c', text: 'Надо было отправить архив ZIP вместо ссылки', isCorrect: false }
      ],
      diagnosis: 'Атрофия протокола Open Graph!',
      explanation:
        'Теги Open Graph в теге <head> — визитная карточка современного веба. Они формируют красивое кликабельное превью.'
    }
  ];

  const [patientAnswers, setPatientAnswers] = useState<Record<number, string>>({});
  const [patientSolved, setPatientSolved] = useState<Record<number, boolean>>({});

  const handlePatientSelect = (patientId: number, optionId: string, isCorrect: boolean) => {
    setPatientAnswers(prev => ({ ...prev, [patientId]: optionId }));
    if (isCorrect && !patientSolved[patientId]) {
      setPatientSolved(prev => ({ ...prev, [patientId]: true }));
      addReward(25, `🩺 Диагноз Пациенту №${patientId} поставлен верно! (+25 ОП)`);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // =========================================================================
  // LEVEL 5B: BLITZ SPRINT (90 SECONDS, +50 EXP)
  // =========================================================================
  const [blitzTimer, setBlitzTimer] = useState<number>(90);
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzChecked, setBlitzChecked] = useState<{ q1: boolean; q2: boolean; q3: boolean }>({
    q1: false,
    q2: false,
    q3: false
  });
  const [blitzRewardClaimed, setBlitzRewardClaimed] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (blitzActive && blitzTimer > 0) {
      interval = setInterval(() => {
        setBlitzTimer(t => t - 1);
      }, 1000);
    } else if (blitzTimer === 0) {
      setBlitzActive(false);
    }
    return () => clearInterval(interval);
  }, [blitzActive, blitzTimer]);

  const handleStartBlitz = () => {
    setBlitzTimer(90);
    setBlitzActive(true);
    setBlitzChecked({ q1: false, q2: false, q3: false });
  };

  const handleToggleBlitzQ = (key: 'q1' | 'q2' | 'q3') => {
    const updated = { ...blitzChecked, [key]: !blitzChecked[key] };
    setBlitzChecked(updated);
    if (updated.q1 && updated.q2 && updated.q3 && !blitzRewardClaimed) {
      setBlitzRewardClaimed(true);
      setBlitzActive(false);
      addReward(50, '⚡ Блиц-спринт по продакшену пройден за рекордное время! (+50 ОП)');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }
  };

  // =========================================================================
  // LEVEL 6: 20-SECOND RELEASE PITCH CHECKLIST
  // =========================================================================
  const [pitchSteps, setPitchSteps] = useState({
    nameAndUrl: false,
    problemSolved: false,
    securityProof: false,
    futureVision: false
  });

  const togglePitchStep = (k: keyof typeof pitchSteps) => {
    setPitchSteps(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const allPitchDone = Object.values(pitchSteps).every(Boolean);

  // =========================================================================
  // LEVEL 7: FINAL QUALIFICATION TEST (5 CANONICAL QUESTIONS)
  // =========================================================================
  const quizQuestions = [
    {
      id: 2301,
      question:
        'Почему КАТЕГОРИЧЕСКИ запрещено вшивать приватные API-ключи (например, GEMINI_API_KEY) в клиентский React-код?',
      options: [
        'Код перестанет компилироваться на компьютере',
        'Клиентский код исполняется в браузере пользователя, и любой желающий может открыть DevTools и украсть ваш платный ключ',
        'Это замедлит интернет провайдера',
        'Браузер покажет синий экран смерти'
      ],
      correctIndex: 1,
      explanation:
        'Все приватные ключи обязаны храниться исключительно на сервере в переменных окружения process.env, недоступных клиенту.'
    },
    {
      id: 2302,
      question: 'Как безопасно организовать обращение к AI API из браузера?',
      options: [
        'Спрятать ключ в CSS-файл стилей',
        'Фронтенд отправляет запрос на собственный бэкенд-эндпоинт (/api/generate), а сервер с приватным ключом делает вызов к LLM',
        'Попросить каждого пользователя вводить свой личный пароль',
        'Отправить ключ в URL параметре'
      ],
      correctIndex: 1,
      explanation:
        'Серверный прокси-роут выступает бронированным щитом, скрывающим учетные данные от внешнего мира.'
    },
    {
      id: 2303,
      question: 'Для чего нужен файл .env.example в репозитории проекта?',
      options: [
        'Для хранения личных паролей от почты',
        'Для документирования списка всех требуемых переменных окружения без раскрытия реальных секретных значений',
        'Это временный ненужный мусорный файл',
        'Для запуска сервера базы данных'
      ],
      correctIndex: 1,
      explanation:
        '.env.example показывает другим разработчикам и CI/CD, какие переменные нужно настроить для запуска приложения.'
    },
    {
      id: 2304,
      question:
        'Что делают метатеги Open Graph (og:title, og:image, og:description) в файле index.html?',
      options: [
        'Ускоряют скорость интернета',
        'Формируют красивую визуальную карточку с картинкой, заголовком и описанием при шеринге ссылки в Telegram, WhatsApp и соцсетях',
        'Шифруют трафик пользователя',
        'Меняют цвет значка батареи на смартфоне'
      ],
      correctIndex: 1,
      explanation:
        'Качественная OG-карточка повышает доверие и привлекательность ссылки в мессенджерах в несколько раз.'
    },
    {
      id: 2305,
      question:
        'Какая облачная платформа предоставляет мгновенный глобальный деплой веб-приложений с автоматическим HTTPS и CI/CD?',
      options: [
        'Vercel / Netlify / Google Cloud Run',
        'Дискета 3.5 дюйма',
        'Microsoft Paint',
        'Архиватор WinRAR'
      ],
      correctIndex: 0,
      explanation:
        'Современные серверлесс-платформы разворачивают проект по git push за считанные секунды с бесплатным SSL-сертификатом.'
    }
  ];

  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);

  useLessonQuizPersistence(
    23,
    quizQuestions,
    testAnswers,
    setTestAnswers,
    testSubmitted,
    setTestSubmitted,
    setTestScore
  );

  const handleSelectTestOption = (qId: number, optionIdx: number) => {
    if (testSubmitted) return;
    setTestAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFinishTest = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (testAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setTestScore(score);
    setTestSubmitted(true);

    if (score >= 4) {
      setBadgeUnlocked(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[11px] font-bold">
                КОНТРОЛЬ ЗНАНИЙ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono text-[11px] font-bold">
                Уровни 5–7
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Проверка Знаний: Доктор Продакшена, Блиц и Аттестация Lv.23
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Пройдите клинические кейсы утечек, 90-секундный спринт и финальный тест для получения почетного бейджа <strong>Production Architect</strong>.
        </p>
      </div>

      {/* LEVEL 5A: DOCTOR OF PRODUCTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Уровень 5A: Доктор Продакшена (3 Клинических Инцидента)
              </h3>
              <p className="text-xs text-slate-400">
                Поставьте правильный диагноз сбоям деплоя (+25 ОП за каждый верный диагноз)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {patients.map(p => {
            const chosen = patientAnswers[p.id];
            const isSolved = patientSolved[p.id];

            return (
              <div
                key={p.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 font-mono text-xs flex items-center justify-center">
                      {p.id}
                    </span>
                    <span>{p.title}</span>
                  </h4>
                  {isSolved && (
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> ВЫЛЕЧЕН (+25 ОП)
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong>Инцидент:</strong> {p.incident}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400">
                    Выберите верный рецепт лечения инженера:
                  </span>
                  <div className="space-y-2">
                    {p.options.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handlePatientSelect(p.id, opt.id, opt.isCorrect)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                          chosen === opt.id
                            ? opt.isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-mono text-slate-400 uppercase mt-0.5">
                          {opt.id.slice(1)})
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {isSolved && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 text-xs space-y-1 animate-in fade-in">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{p.diagnosis}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{p.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LEVEL 5B: BLITZ SPRINT (90 SECONDS) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Уровень 5B: Быстрое Испытание в Парах (Спринт 90 секунд)
              </h3>
              <p className="text-xs text-slate-400">
                3 критических факта безопасности перед открытием публичного доступа (+50 ОП)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-amber-400">
              <Timer className="w-4 h-4" />
              <span>{blitzTimer} сек</span>
            </div>

            {!blitzActive && !blitzRewardClaimed && (
              <button
                onClick={handleStartBlitz}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/20"
              >
                Старт (90с)
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'q1' as const,
              label: '1. Клиентский код в браузере НИКОГДА не является секретным хранилищем (любой ключ можно украсть через DevTools).'
            },
            {
              id: 'q2' as const,
              label: '2. Файл .env всегда должен быть добавлен в .gitignore, а для коллег подготовлен .env.example без реальных паролей.'
            },
            {
              id: 'q3' as const,
              label: '3. Метатеги Open Graph обязательны для того, чтобы ссылка в Telegram и WhatsApp не выглядела как спам.'
            }
          ].map(q => (
            <div
              key={q.id}
              onClick={() => handleToggleBlitzQ(q.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                blitzChecked[q.id]
                  ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                  blitzChecked[q.id]
                    ? 'bg-amber-500 border-amber-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {blitzChecked[q.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs sm:text-sm font-medium">{q.label}</span>
            </div>
          ))}
        </div>

        {blitzRewardClaimed && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Блиц успешно закрыт! Награда +50 ОП начислена в ваш академический профиль.</span>
          </div>
        )}
      </div>

      {/* LEVEL 6: 20-SECOND RELEASE PITCH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Уровень 6: 20-секундный Release Pitch (Презентация релиза)
            </h3>
            <p className="text-xs text-slate-400">
              Четкая речь перед аудиторией и ментором перед показом живого проекта
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-3">
          <div className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
            Формула питча:
          </div>
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            «Привет! Мой проект называется <strong>[Название]</strong>. Он решает проблему <strong>[Какую]</strong>. Проект уже задеплоен на Vercel по адресу <strong>[URL]</strong>, защищен серверным прокси и готов к использованию прямо сейчас!»
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'nameAndUrl' as const, label: '1. Назвал имя проекта и его живой HTTPS URL' },
            { id: 'problemSolved' as const, label: '2. Сформулировал проблему пользователя за 1 предложение' },
            { id: 'securityProof' as const, label: '3. Подтвердил безопасность ключей через серверный прокси' },
            { id: 'futureVision' as const, label: '4. Показал готовность к открытому показу на Demo Day' }
          ].map(s => (
            <div
              key={s.id}
              onClick={() => togglePitchStep(s.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center gap-3 transition-all ${
                pitchSteps[s.id]
                  ? 'bg-purple-950/40 border-purple-500/60 text-purple-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  pitchSteps[s.id]
                    ? 'bg-purple-500 border-purple-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {pitchSteps[s.id] && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LEVEL 7: FINAL QUALIFICATION TEST & BADGE UNLOCK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Уровень 7: Квалификационный Тест (5 вопросов)
              </h3>
              <p className="text-xs text-slate-400">
                Порог сдачи: 4 из 5 (80%). Награда: официальный бейдж Production Architect (+100 ОП)
              </p>
            </div>
          </div>

          {testSubmitted && (
            <div
              className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                testScore >= 4
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border-rose-800'
              }`}
            >
              Результат: {testScore} / 5 {testScore >= 4 ? '• ТЕСТ СДАН' : '• НЕ СДАНО'}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, idx) => {
            const chosen = testAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="font-bold text-white text-sm leading-relaxed">{q.question}</div>
                </div>

                <div className="grid grid-cols-1 gap-2 pl-9">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    return (
                      <button
                        key={optIdx}
                        disabled={testSubmitted}
                        onClick={() => handleSelectTestOption(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                          testSubmitted
                            ? optIdx === q.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : isSelected
                            ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-mono text-slate-400 uppercase mt-0.5">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {testSubmitted && (
                  <div className="pl-9 pt-2 text-xs text-slate-400">
                    <span className="font-bold text-slate-300">Пояснение: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!testSubmitted ? (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleFinishTest}
              disabled={Object.keys(testAnswers).length < 5}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Завершить тест и проверить ответы
            </button>
          </div>
        ) : (
          /* BADGE UNLOCKED SECTION */
          <div className="pt-4 border-t border-slate-800 space-y-4">
            {badgeUnlocked ? (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-purple-950/60 border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center gap-6 animate-in fade-in">
                <div className="relative w-28 h-28 shrink-0">
                  <img
                    src={badgeProductionImg}
                    alt="Production Architect Badge"
                    className="w-full h-full object-cover rounded-2xl border-2 border-cyan-400 shadow-xl shadow-cyan-500/30"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-lg">
                    23
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-mono font-bold">
                      🏆 АКАДЕМИЧЕСКИЙ БЕЙДЖ ПОЛУЧЕН
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-mono font-bold">
                      +100 ОП
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    PRODUCTION ARCHITECT (Lv.23)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Поздравляем! Вы в совершенстве овладели архитектурой безопасного деплоя, изоляцией приватных ключей за бэкенд-прокси и публикацией проектов в глобальный интернет.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 text-xs sm:text-sm text-rose-300 flex items-center justify-between gap-4">
                <span>Для получения бейджа нужно ответить верно минимум на 4 вопроса. Повторите материал лекции и попробуйте снова!</span>
                <button
                  onClick={() => {
                    setTestSubmitted(false);
                    setTestAnswers({});
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shrink-0"
                >
                  Пройти заново
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
