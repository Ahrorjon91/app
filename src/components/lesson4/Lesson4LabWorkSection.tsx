import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Target,
  Terminal,
  Play,
  RotateCcw,
  Check,
  Copy,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Calendar,
  Layers,
  ArrowRight,
  RefreshCw,
  Zap,
  Award
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson4LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subtabs
  const [activeLabTab, setActiveLabTab] = useState<
    'choose' | 'build' | 'test-days' | 'improve' | 'pitch' | 'submit'
  >('choose');

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Шаблон скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Selected problem template
  const [selectedProblemId, setSelectedProblemId] = useState<string>('homework');

  // 5-day test checklist
  const [dayTests, setDayTests] = useState<{
    day1: boolean;
    day2: boolean;
    day3: boolean;
    day4: boolean;
    day5: boolean;
  }>({
    day1: true,
    day2: false,
    day3: false,
    day4: false,
    day5: false
  });

  const toggleDayTest = (key: keyof typeof dayTests) => {
    const willBeChecked = !dayTests[key];
    setDayTests((prev) => ({ ...prev, [key]: willBeChecked }));
    if (willBeChecked) {
      addReward(5, 'День протестирован! (+5 XP)');
    }
  };

  // 60-Second Pitch Timer state
  const [pitchTimeLeft, setPitchTimeLeft] = useState<number>(60);
  const [isPitchRunning, setIsPitchRunning] = useState<boolean>(false);
  const [pitchDone, setPitchDone] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isPitchRunning && pitchTimeLeft > 0) {
      interval = setInterval(() => {
        setPitchTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (pitchTimeLeft === 0 && isPitchRunning) {
      setIsPitchRunning(false);
      setPitchDone(true);
      addReward(25, '🎤 Питч 60 секунд завершён! Овации зала! (+25 Опыта)');
    }
    return () => clearInterval(interval);
  }, [isPitchRunning, pitchTimeLeft]);

  const handleStartPitch = () => {
    setPitchTimeLeft(60);
    setPitchDone(false);
    setIsPitchRunning(true);
  };

  const handleResetPitch = () => {
    setIsPitchRunning(false);
    setPitchTimeLeft(60);
    setPitchDone(false);
  };

  // Timer color calculation
  const getTimerColorClass = () => {
    if (pitchTimeLeft > 30) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    if (pitchTimeLeft > 10) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40 animate-pulse';
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5" /> Лабораторная работа #4 • Практикум
          </span>
          <span className="text-xs text-slate-400 font-mono">⏱️ 40–70 мин • до +150 Опыта</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Лаборатория продуктов: Сборка МРП, Тест 5 дней и Стартап-Питч
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Преврати свою реальную бытовую или учебную проблему в рабочий прототип. Протестируй его на 5 виртуальных днях, устрани слабое место в релизе v2 и представь продукт за 60 секунд на сцене!
        </p>
      </div>

      {/* НАВИГАЦИЯ ЛАБОРАТОРНОЙ */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'choose', label: '1. Выбор проблемы', icon: Target },
          { id: 'build', label: '2. Сборка Запроса 2.0', icon: Terminal },
          { id: 'test-days', label: '3. Тест 5 дней', icon: Calendar },
          { id: 'improve', label: '4. Улучшение v1 → v2', icon: RefreshCw },
          { id: 'pitch', label: '5. Питч 60 секунд', icon: Mic },
          { id: 'submit', label: '6. Сдача ментору', icon: Send }
        ].map((t) => {
          const Icon = t.icon;
          const active = activeLabTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveLabTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                active
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ЭТАП 1: ВЫБОР ОДНОЙ ПРОБЛЕМЫ */}
      {activeLabTab === 'choose' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Шаг 1: Выбери ОДНУ настоящую проблему
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Золотое правило МРП: выбери не самую «крутую» идею, а <strong>самую настоящую</strong>, которая мешает именно тебе.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'homework',
                  name: '📚 Homework Buddy',
                  pain: 'Забываю задания по геометрии и английскому',
                  solution: 'Вечерний опрос в 19:00 + список из 3 главных уроков'
                },
                {
                  id: 'words',
                  name: '🗣️ Word Coach',
                  pain: 'Учу английские слова, но забываю через 2 дня',
                  solution: 'Ровно 5 слов в день с примерами из жизни + мини-тест'
                },
                {
                  id: 'sport',
                  name: '🏃 Training Planner',
                  pain: 'Устаю после секции и забрасываю учёбу',
                  solution: 'Балансирует 45 мин на уроки, дорогу и сон'
                },
                {
                  id: 'exams',
                  name: '🎯 Exam Coach',
                  pain: 'Боюсь контрольных и ступорюсь на тестах',
                  solution: 'Пошаговый разбор по 1 вопросу из билетов'
                },
                {
                  id: 'sleep',
                  name: '🌙 Sleep Reminder',
                  pain: 'Залипаю в телефоне до 01:00 ночи',
                  solution: 'Мягкий вечерний ритуал и план на завтра'
                },
                {
                  id: 'namoz',
                  name: '🕌 Namoz & Time Helper',
                  pain: 'Путаю время намаза и уроков в Худжанде',
                  solution: 'Ориентация по времени Согда и доброжелательные советы'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedProblemId(item.id);
                    addReward(10, `Выбран продукт: ${item.name}`);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedProblemId === item.id
                      ? 'bg-slate-950 border-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>{item.name}</span>
                    {selectedProblemId === item.id && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
                        Выбран
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-rose-300 font-mono">Боль: {item.pain}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">Решение: {item.solution}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('build')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Перейти к сборке Запроса 2.0 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 2: СБОРКА ЗАПРОСА 2.0 */}
      {activeLabTab === 'build' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              Шаг 2: Сборка Запроса 2.0 для твоего помощника (+50 XP)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Скопируй архитектурный шаблон и вставь его в ChatGPT или Gemini. Заполни квадратные скобки под свой проект:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                  Шаблон Запроса 2.0 (Prompt 2.0):
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `РОЛЬ:
Ты — [имя помощника], добрый и умный личный ассистент по [тема].

ЦЕЛЬ:
Помоги мне решить проблему: [опиши свою проблему]. Твоя задача — [что именно делать].

КОНТЕКСТ:
Мне [возраст] лет, я учусь в школе в Худжанде. 
Я буду писать тебе [каждый вечер / перед уроками / когда устал].

ОГРАНИЧЕНИЯ (ПРАВИЛА 3/3):
✅ Делай: пиши кратко, максимум 3-4 предложения за сообщение.
✅ Делай: задавай строго ОДИН вопрос или давай одно микро-задание за раз.
✅ Делай: если я не отвечаю или ленюсь — поддерживай мягко, без нотаций.
❌ Не делай: категорически НЕ пиши длинные скучные лекции.
❌ Не делай: не используй заумные академические слова.

ПРИМЕР:
Пользователь: «Я сегодня устал и ничего не успел...»
Помощник: «Ничего страшного, бывает у каждого! Давай сделаем всего 1 главный пункт, а остальное отложим на утро. Что самое срочное?»

ФОРМАТ ВЫВОДА:
1) Поддержка (1 фраза) 2) Одно конкретное действие 3) Вопрос мне.`,
                      'prompt-template'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-purple-300 border border-purple-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'prompt-template' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'prompt-template' ? 'Скопировано!' : 'Скопировать шаблон'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-200 whitespace-pre-wrap leading-relaxed">
{`РОЛЬ:
Ты — [имя помощника], добрый и умный личный ассистент по [тема].

ЦЕЛЬ:
Помоги мне решить проблему: [опиши свою проблему]. Твоя задача — [что именно делать].

КОНТЕКСТ:
Мне [возраст] лет, я учусь в школе в Худжанде. 
Я буду писать тебе [каждый вечер / перед уроками / когда устал].

ОГРАНИЧЕНИЯ (ПРАВИЛА 3/3):
✅ Делай: пиши кратко, максимум 3-4 предложения за сообщение.
✅ Делай: задавай строго ОДИН вопрос или давай одно микро-задание за раз.
✅ Делай: если я не отвечаю или ленюсь — поддерживай мягко, без нотаций.
❌ Не делай: категорически НЕ пиши длинные скучные лекции.
❌ Не делай: не используй заумные академические слова.

ПРИМЕР:
Пользователь: «Я сегодня устал и ничего не успел...»
Помощник: «Ничего страшного, бывает у каждого! Давай сделаем всего 1 главный пункт, а остальное отложим на утро. Что самое срочное?»

ФОРМАТ ВЫВОДА:
1) Поддержка (1 фраза) 2) Одно конкретное действие 3) Вопрос мне.`}
              </pre>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('test-days')}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Протестировать на 5 днях диалога →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 3: ТЕСТ 5 ДНЕЙ */}
      {activeLabTab === 'test-days' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              Шаг 3: Тест 5 дней (Симуляция длительного использования)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Поговори с помощником в одном чате, как будто прошло 5 дней. Отметь галочками, как он справился:
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 'day1' as const,
                  title: 'День 1: Знакомство и старт',
                  userMsg: '«Привет! С чего начнём сегодня?»',
                  check: 'Помощник понятно и тепло объяснил, как именно он будет помогать каждый день?'
                },
                {
                  id: 'day2' as const,
                  title: 'День 2: Обычный рабочий день',
                  userMsg: '«Сегодня задали 4 параграфа по истории и 5 задач по алгебре»',
                  check: 'Помощник не растерялся и помог расставить приоритеты на 1-2-3?'
                },
                {
                  id: 'day3' as const,
                  title: 'День 3: Усталость и лень',
                  userMsg: '«Мне лень, голова болит, ничего не хочу делать»',
                  check: 'Помощник не стал занудствовать, а мягко предложил микро-шаг или паузу?'
                },
                {
                  id: 'day4' as const,
                  title: 'День 4: Каприз и отвлечение',
                  userMsg: '«А расскажи мне про Brawl Stars или смешной мем»',
                  check: 'Помощник с юмором ответил, но мягко вернул фокус к делу?'
                },
                {
                  id: 'day5' as const,
                  title: 'День 5: Финальный вердикт',
                  userMsg: '«Спасибо за неделю! Подведём итоги?»',
                  check: 'Захотелось ли бы тебе пользоваться этим помощником в реальной жизни?'
                }
              ].map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">{d.title}</span>
                    <label className="flex items-center gap-2 text-xs font-bold text-emerald-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dayTests[d.id]}
                        onChange={() => toggleDayTest(d.id)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                      <span>{dayTests[d.id] ? 'Пройдено ✅' : 'Отметить как готово'}</span>
                    </label>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    Твой запрос: {d.userMsg}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>Критерий успеха:</strong> {d.check}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('improve')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Исправить слабости в релизе v2 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 4: УЛУЧШЕНИЕ v1 → v2 */}
      {activeLabTab === 'improve' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              Шаг 4: Апгрейд до версии v2 (+50 XP)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Почти в каждом v1 помощник иногда пишет слишком длинно или забывает спросить твой ответ. Добавь два защитных правила, как в этом боевом релизе:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 font-mono uppercase">
                  Улучшенный боевой промпт помощника (v2):
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `РОЛЬ: Ты — Homework Buddy (v2), верный школьный ассистент.
ЦЕЛЬ: Помоги мне каждый вечер за 10 минут спланировать и сделать уроки.
КОНТЕКСТ: Мне 13 лет, школа в Худжанде, учусь во вторую смену.
ПРАВИЛА v2 (ЗАЩИЩЕННЫЙ РЕЛИЗ):
✅ Делай: максимум 3 предложения в каждом ответе!
✅ Делай: в конце ВСЕГДА задавай ровно один вопрос, требующий от меня короткого ответа (да/нет или номер пункта).
✅ Делай: хвали за каждое выполненное микро-действие.
❌ Не делай: категорически НЕ пиши за меня сочинения или решения.
❌ Не делай: не перегружай список больше чем 3 уроками на вечер.
ФОРМАТ:
1. Одно одобряющее слово 2. Чек-лист из 3 уроков 3. «С какого начинаем?»`,
                      'v2-prompt'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-emerald-300 border border-emerald-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'v2-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'v2-prompt' ? 'Скопировано!' : 'Скопировать v2'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed">
{`РОЛЬ: Ты — Homework Buddy (v2), верный школьный ассистент.
ЦЕЛЬ: Помоги мне каждый вечер за 10 минут спланировать и сделать уроки.
КОНТЕКСТ: Мне 13 лет, школа в Худжанде, учусь во вторую смену.
ПРАВИЛА v2 (ЗАЩИЩЕННЫЙ РЕЛИЗ):
✅ Делай: максимум 3 предложения в каждом ответе!
✅ Делай: в конце ВСЕГДА задавай ровно один вопрос, требующий от меня короткого ответа (да/нет или номер пункта).
✅ Делай: хвали за каждое выполненное микро-действие.
❌ Не делай: категорически НЕ пиши за меня сочинения или решения.
❌ Не делай: не перегружай список больше чем 3 уроками на вечер.
ФОРМАТ:
1. Одно одобряющее слово 2. Чек-лист из 3 уроков 3. «С какого начинаем?»`}
              </pre>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('pitch')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Выйти на сцену показа (Питч 60 секунд) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 5: ПИТЧ 60 СЕКУНД (С ТАЙМЕРОМ) */}
      {activeLabTab === 'pitch' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <Mic className="w-5 h-5 text-rose-400" />
                  Уровень 6 — Сцена показа: Стартап-питч за 60 секунд (+25 XP)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Настоящий предприниматель умеет объяснить суть продукта всего за одну минуту.
                </p>
              </div>

              {/* КРУГОВОЙ ТАЙМЕР ПИТЧА */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono font-black text-2xl transition-all shadow-lg ${getTimerColorClass()}`}
                >
                  <span>{pitchTimeLeft}</span>
                  <span className="text-[9px] uppercase font-sans font-bold -mt-1">сек</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {!isPitchRunning ? (
                    <button
                      onClick={handleStartPitch}
                      className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{pitchDone ? 'Повторить' : 'Старт питча'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetPitch}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Сбросить</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4 ЭТАПА ПИТЧА С ПОДСКАЗКАМИ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  pitchTimeLeft <= 60 && pitchTimeLeft > 50
                    ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-rose-400 flex items-center justify-between">
                  <span>1️⃣ Проблема</span>
                  <span className="font-mono text-[10px]">10 сек</span>
                </div>
                <p className="text-slate-300 mt-2">
                  «Многие школьники в Худжанде сталкиваются с тем, что забывают домашку...»
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  pitchTimeLeft <= 50 && pitchTimeLeft > 35
                    ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-amber-400 flex items-center justify-between">
                  <span>2️⃣ Решение</span>
                  <span className="font-mono text-[10px]">15 сек</span>
                </div>
                <p className="text-slate-300 mt-2">
                  «Мой помощник Homework Buddy каждый вечер задаёт один вопрос и делает список...»
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  pitchTimeLeft <= 35 && pitchTimeLeft > 10
                    ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-emerald-400 flex items-center justify-between">
                  <span>3️⃣ Демо</span>
                  <span className="font-mono text-[10px]">25 сек</span>
                </div>
                <p className="text-slate-300 mt-2">
                  Показываем реальный экран диалога в чате: ответ модели за 3 секунды.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  pitchTimeLeft <= 10 && pitchTimeLeft > 0
                    ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="font-bold text-cyan-400 flex items-center justify-between">
                  <span>4️⃣ Будущее</span>
                  <span className="font-mono text-[10px]">10 сек</span>
                </div>
                <p className="text-slate-300 mt-2">
                  «В версии v2 я добавлю синхронизацию с Telegram и голосовые напоминания!»
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('submit')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Сдать лабораторный отчёт ментору →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 6: СДАЧА ОТЧЁТА МЕНТОРУ */}
      {activeLabTab === 'submit' && (
        <div className="space-y-5 animate-in fade-in">
          <InlineLabSubmission
            labId={4}
            defaultTitle="Лабораторная работа #4: Проект №1 — Мой личный ИИ-помощник"
          />
        </div>
      )}
    </div>
  );
};
