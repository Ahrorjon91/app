import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Lightbulb,
  Target,
  Sparkles,
  Zap,
  Award,
  Copy,
  Check,
  Search,
  Users,
  Play,
  ArrowRight,
  ShieldCheck,
  Clock,
  HelpCircle,
  Bug,
  BookOpen,
  Send,
  SlidersHorizontal,
  FileText,
  MessageSquare,
  AlertTriangle,
  RotateCcw,
  Volume2,
  VolumeX,
  Radio,
  Share2,
  Compass,
  ExternalLink,
  ChevronRight,
  Flame,
  CheckCircle2,
  Smile,
  RefreshCw,
  Gift
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

// Import generated assets for Lesson 4
import badgeProductMakerImg from '../../assets/images/lesson4_badge_1790071752375.jpg';

export const Lesson4LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subsections navigation (8 total)
  const [activeSubTab, setActiveSubTab] = useState<
    'news' | 'framework' | 'roleplay' | 'doctor' | 'cheatsheet' | 'dictionary' | 'tools' | 'builder'
  >('news');

  // Copy helper state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Скопировано в буфер! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Easter egg state: click Nova 5 times
  const [novaClicks, setNovaClicks] = useState(0);
  const [novaEasterEggFound, setNovaEasterEggFound] = useState(false);
  const handleNovaClick = () => {
    if (novaEasterEggFound) return;
    const next = novaClicks + 1;
    setNovaClicks(next);
    if (next >= 5) {
      setNovaEasterEggFound(true);
      addReward(25, '🎉 Секретная пасхалка Nova активирована! Робот танцует «Лязги»! (+25 Опыта)');
    }
  };

  // Checklist of superpowers
  const [superpowers, setSuperpowers] = useState<{ [key: string]: boolean }>({
    sp1: false,
    sp2: false,
    sp3: false,
    sp4: false,
    sp5: false
  });
  const toggleSuperpower = (key: string) => {
    const willBeChecked = !superpowers[key];
    const next = { ...superpowers, [key]: willBeChecked };
    setSuperpowers(next);

    if (willBeChecked) {
      const allChecked = Object.values(next).every(Boolean);
      if (allChecked) {
        addReward(25, '🏆 Все 5 суперсил Продукта разблокированы! (+25 Опыта)');
      } else {
        addReward(5, 'Суперсила активирована! (+5 XP)');
      }
    }
  };

  // Live Card Builder state (Card 4 interactive preview)
  const [cardName, setCardName] = useState('Homework Buddy');
  const [cardProblem, setCardProblem] = useState('Каждый вечер забываю, что задали по геометрии и английскому');
  const [cardSolution, setCardSolution] = useState('Каждый вечер в 19:00 задает 1 вопрос и формирует чек-лист на завтра');
  const [cardUser, setCardUser] = useState('Школьник 13 лет, Худжанд, учится во 2-ю смену');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Doctor diagnosis state
  const [activeDoctorPatient, setActiveDoctorPatient] = useState<number>(1);
  const [doctorCured, setDoctorCured] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false
  });

  // Dictionary search
  const [searchQuery, setSearchQuery] = useState('');

  // Life Helper Studio Generator state
  const [studioCategory, setStudioCategory] = useState<'homework' | 'english' | 'sport' | 'exam' | 'namoz'>('homework');
  const [studioTone, setStudioTone] = useState<'friendly' | 'mentor' | 'game'>('friendly');
  const [studioAge, setStudioAge] = useState('14');
  const [studioSchedule, setStudioSchedule] = useState('Каждый вечер в 20:00');

  const generateHelperPrompt = () => {
    const categoryConfigs = {
      homework: {
        name: 'Homework Buddy (Устод Зафар)',
        goal: 'Помоги мне не забывать и успевать делать домашние задания по школьным предметам.',
        problem: 'Я постоянно вспоминаю про уроки в 22:00 и не успеваю выспаться.',
        analogy: 'школьный дневник и вечерний чек-лист из 3 пунктов'
      },
      english: {
        name: 'Word Coach (Mr. Alex)',
        goal: 'Помоги мне учить по 5 новых разговорных английских слов каждый день.',
        problem: 'Учу слова, но через два дня напрочь их забываю.',
        analogy: 'живой диалог в кафе и мини-викторина с эмодзи'
      },
      sport: {
        name: 'Training Planner (Тренер Тимур)',
        goal: 'Помоги составить баланс между тренировками по борьбе/футболу и уроками.',
        problem: 'После тренировки падаю от усталости и забрасываю учёбу.',
        analogy: 'режим чемпиона и 15-минутные интервалы отдыха'
      },
      exam: {
        name: 'Exam Coach (Наставник Нигина)',
        goal: 'Помоги без паники подготовиться к четвертным контрольным работам.',
        problem: 'Боюсь забыть формулы и впадаю в ступор перед тестом.',
        analogy: 'метод карточек-вопросов и пошаговый разбор по 1 вопросу'
      },
      namoz: {
        name: 'Namoz & Time Helper (Рафик)',
        goal: 'Помоги мягко помнить время намаза и гармонично планировать день в Худжанде.',
        problem: 'Заигрываюсь в телефон и пропускаю вечернее время.',
        analogy: 'расписание согдийского времени и уважительный доброжелательный тон'
      }
    };

    const cfg = categoryConfigs[studioCategory];
    return `РОЛЬ:
Ты — ${cfg.name}, доброжелательный и системный персональный ИИ-помощник.

ЦЕЛЬ:
${cfg.goal} Твоя задача — помочь мне шаг за шагом, без занудства и без лекций.

КОНТЕКСТ:
Мне ${studioAge} лет, я живу в Худжанде. Моя главная трудность: ${cfg.problem}
Режим общения: ${studioSchedule}. Тон: ${studioTone === 'friendly' ? 'дружеский, как старший брат' : studioTone === 'mentor' ? 'мудрый наставник' : 'игровой, с начислением баллов'}.

ОГРАНИЧЕНИЯ (ПРАВИЛА 3/3):
✅ Делай: пиши кратко (максимум 3-4 предложения за сообщение).
✅ Делай: задавай строго ОДИН понятный вопрос за раз и жди моего ответа.
✅ Делай: используй аналогию: ${cfg.analogy}.
❌ Не делай: категорически НЕ пиши длинные простыни текста.
❌ Не делай: не ругай за пропуски, поддерживай позитивно.

ПРИМЕР ДИАЛОГА:
Пользователь: «Я сегодня сильно устал и ничего не хочу делать...»
Помощник: «Понимаю тебя отлично! Давай сделаем всего одно микро-действие на 3 минуты, а потом ты пойдёшь отдыхать. С какого предмета начнём?»

ФОРМАТ ВЫВОДА:
1) Поддержка (1 фраза) 2) Одно короткое действие 3) Вопрос мне.`;
  };

  return (
    <div className="space-y-6 text-slate-100 w-full max-w-full overflow-hidden">
      {/* 📰 НОВОСТНАЯ БЕГУЩАЯ СТРОКА (AI NEWS TICKER) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 p-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 shrink-0 px-2 uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
          <span>Новости ИИ за неделю:</span>
        </div>
        <div className="overflow-x-auto whitespace-nowrap text-xs text-slate-300 py-1 flex items-center gap-6 animate-none md:animate-marquee font-mono">
          <span className="inline-flex items-center gap-1.5 text-cyan-200">
            🏃 <strong>Робот-гуманоид</strong> пробежал полумарафон вместе с людьми
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-purple-200">
            🪐 ИИ помог астрономам открыть <strong>100+ новых экзопланет</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-200">
            🌐 Робот на приёме гостей поздоровался на <strong>11 языках подряд</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-amber-200">
            🧠 Живые клетки мозга подключили к видеоигре — и они научились играть!
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-rose-300">
            🍻 ИИ-агент обзвонил 3000 пабов в Ирландии и случайно <strong>обрушил цены на пиво</strong>
          </span>
        </div>
      </div>

      {/* 🌟 HERO BANNER & MISSION INTRO */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 shadow-2xl">
        <div className="relative p-6 sm:p-8 md:p-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Rocket className="w-3.5 h-3.5" /> Проект №1 • Первый цифровой продукт
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700">
                ⏱️ 90 минут
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                🏆 Ранг: PRODUCT MAKER
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Миссия 04: Мой Личный ИИ-Помощник
            </h1>
            <p className="text-base sm:text-lg text-cyan-200 font-medium">
              «90 минут. 7 уровней. 1 продукт, который решает ТВОЮ проблему.»
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Сегодня ты перестаёшь быть просто потребителем нейросетей. Ты становишься <strong className="text-white">создателем продукта</strong>. Мы научимся находить настоящую проблему, превращать её в решение и собирать рабочий MVP за один урок!
            </p>
          </div>

          {/* 🤖 NOVA INCOMING MESSAGE & EASTER EGG */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md flex items-start gap-3.5">
            <div
              onClick={handleNovaClick}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 cursor-pointer select-none transition-all shadow-lg ${
                novaEasterEggFound
                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-400 animate-bounce'
                  : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:scale-110'
              }`}
              title="Нажми на Nova 5 раз для секретной пасхалки!"
            >
              🤖
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-300">NOVA (ИИ-Гид):</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono">
                  {novaEasterEggFound ? '💃 ТАНЦУЕТ ЛЯЗГИ!' : 'Входящее сообщение'}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {novaEasterEggFound
                  ? '«Офарин! 🎉 Ты нашёл пасхалку! Помни: лучший продукт создаётся с улыбкой. Твой проект №1 готов к взлёту!» (+25 ОП начислено)'
                  : '«Салом, Наставник! 👋 Ты уже умеешь строить запросы и чинить ИИ-репетиторов. Но зачем это всё? Чтобы решать НАСТОЯЩИЕ проблемы. Сегодня — твой первый проект в портфолио! Поехали! 🟢»'}
              </p>
            </div>
          </div>

          {/* 🛡️ 3 ЩИТА СТУДЕНТА */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {[
              { title: '🛡️ Проверяй', desc: 'Факты, расчёты, даты — Generate ≠ Finished' },
              { title: '🛡️ Не делись личным', desc: 'Никаких адресов, фамилий и телефонов в промпте' },
              { title: '🛡️ Будь честным', desc: 'ИИ — помощник, но автор и создатель — ТЫ' }
            ].map((shield, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex flex-col justify-center"
              >
                <span className="font-bold text-cyan-300">{shield.title}</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{shield.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎯 СУПЕРСИЛЫ МИССИИ 04 & ТРАЕКТОРИЯ 6 ШАГОВ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Чек-лист суперсил */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Суперсилы Миссии 04 (+25 XP)
            </h3>
            <span className="text-xs font-mono text-cyan-300">
              {Object.values(superpowers).filter(Boolean).length}/5 открыто
            </span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'sp1', label: '🔍 Находить настоящую проблему (а не выдуманную из головы)' },
              { id: 'sp2', label: '💡 Превращать жалобу «меня это бесит» в точное решение' },
              { id: 'sp3', label: '🧪 Строить первую рабочую версию — МРП (MVP) за 10 минут' },
              { id: 'sp4', label: '🎤 Представлять свой продукт за 60 секунд, как на стартап-питче' },
              { id: 'sp5', label: '📇 Заполнять Карточку Проекта №01 для своего портфолио' }
            ].map((sp) => (
              <label
                key={sp.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  superpowers[sp.id]
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={superpowers[sp.id]}
                  onChange={() => toggleSuperpower(sp.id)}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-xs leading-relaxed select-none">{sp.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 🗺️ КАРТА 7 УРОВНЕЙ МИССИИ */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Дорожная карта: 7 уровней к Проекту №1
            </h3>
            <p className="text-xs text-slate-400">
              Цепочка создателя: Learn → Try → Build → Test → Improve → Share
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {[
              { step: '1. Запуск', icon: '🔥', time: '10м', xp: '+25' },
              { step: '2. Формула', icon: '🧠', time: '15м', xp: 'Шпаргалка' },
              { step: '3. Ролевая игра', icon: '🎭', time: '15м', xp: '+25' },
              { step: '4. Лаборатория', icon: '💻', time: '30м', xp: '+150' },
              { step: '5. Доктор', icon: '🩺', time: '10м', xp: '+50' },
              { step: '6. Питч 60с', icon: '🎤', time: '7м', xp: '+25' },
              { step: '7. Ранг Lv.4', icon: '🏆', time: '3м', xp: '+25' }
            ].map((st, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-1 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-lg">{st.icon}</div>
                <div className="font-bold text-[11px] text-white truncate">{st.step}</div>
                <div className="text-[10px] text-cyan-400 font-mono">{st.xp}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
            <span>🎁 Награда за миссию: <strong>до +325 XP</strong></span>
            <span className="text-amber-300 font-bold">🎖️ Бейдж: PRODUCT MAKER</span>
          </div>
        </div>
      </div>

      {/* 📌 НАВИГАЦИЯ ПО 8 ПОДРАЗДЕЛАМ ЛЕКЦИИ */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'news', label: '1. Охота на проблему', icon: Flame },
          { id: 'framework', label: '2. Проблема → MVP', icon: Lightbulb },
          { id: 'roleplay', label: '3. Ролевая игра', icon: Users },
          { id: 'doctor', label: '4. Доктор продукта', icon: Bug },
          { id: 'cheatsheet', label: '5. Шпаргалка', icon: FileText },
          { id: 'dictionary', label: '6. Словарь', icon: BookOpen },
          { id: 'tools', label: '7. Инструменты', icon: ExternalLink },
          { id: 'builder', label: '8. Тренажёр Helper Studio', icon: SlidersHorizontal }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                active
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. ОХОТА НА ПРОБЛЕМУ */}
      {/* ========================================================= */}
      {activeSubTab === 'news' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-400" />
                Уровень 1 — Запуск: Секрет любого стартапа «Меня это бесит»
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 0–10 минут • +25 ОП</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Каждый великий цифровой продукт — будь то <strong>Duolingo</strong>, <strong>TikTok</strong>, <strong>Яндекс.Такси</strong> или обычный калькулятор — начинался не с гениального кода, а с одной простой человеческой мысли: <em className="text-white">«Меня бесит тратить на это кучу времени!»</em>
            </p>

            {/* Живой пример трансформации */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider font-mono">
                Как жалоба превращается в продукт за 3 секунды:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200">
                  <div className="font-bold text-rose-400">1. Проблема (Жалоба):</div>
                  «Я постоянно забываю домашку и вспоминаю про неё только в 23:00!»
                </div>
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200">
                  <div className="font-bold text-amber-400">2. Решение ИИ:</div>
                  Чат-бот, который каждый день в 19:00 спрашивает: «Что задали?» и делает список.
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
                  <div className="font-bold text-emerald-400">3. Продукт №1:</div>
                  <strong>«Homework Buddy»</strong> — личный школьный ассистент прямо в твоём телефоне.
                </div>
              </div>
            </div>

            {/* Интерактивная охота на проблему */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-cyan-400" />
                Охота на проблему: какие 3 вещи бесят тебя прямо сейчас?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    icon: '📚',
                    title: 'Школа и уроки',
                    examples: 'Забываю формулы, путаюсь в расписании, тяжело запоминать даты по истории'
                  },
                  {
                    icon: '🗣️',
                    title: 'Языки и навыки',
                    examples: 'Забываю английские слова, боюсь говорить на уроке, лень учить грамматику'
                  },
                  {
                    icon: '⏰',
                    title: 'Жизнь и распорядок',
                    examples: 'Поздно ложусь, залипаю в Shorts, не успеваю на тренировку, забываю намаз'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{item.examples}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setActiveSubTab('framework')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 ml-auto shadow"
              >
                <span>Узнать формулу продукта (Уровень 2)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. ПРОБЛЕМА → РЕШЕНИЕ → МРП (MVP) */}
      {/* ========================================================= */}
      {activeSubTab === 'framework' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Уровень 2 — Расшифровка: Проблема → Решение → МРП
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 10–25 минут</span>
            </div>

            {/* Карточка 1: Формула МРП */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider">
                  Формула Продукта:
                </span>
                <span className="text-[11px] text-slate-400 font-mono">MVP = Minimum Viable Product</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 py-2 text-center">
                <div className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-700 text-rose-200 font-bold text-sm">
                  🔍 ПРОБЛЕМА
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="px-4 py-2 rounded-xl bg-amber-950/60 border border-amber-700 text-amber-200 font-bold text-sm">
                  💡 РЕШЕНИЕ
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-700 text-emerald-200 font-bold text-sm">
                  🧪 МРП (MVP)
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
                <strong>МРП (Минимальный Рабочий Продукт)</strong> — это самая простая версия, которая <em>уже приносит пользу</em> прямо сейчас. Без сайта, без мобильного приложения — просто один мощный, выверенный Запрос 2.0 в чате с ИИ!
              </p>
            </div>

            {/* Карточка 2: Портрет пользователя (3 вопроса) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Кто твой пользователь? Ответь на 3 вопроса перед тем, как писать код:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-300 font-bold">1. Кто он?</div>
                  <p className="text-slate-400 mt-1">Сколько ему лет? Школьник, спортсмен, музыкант? В какую смену учится?</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-300 font-bold">2. Когда нужен?</div>
                  <p className="text-slate-400 mt-1">Утром перед уроками? В 19:00 после тренировки? На выходных?</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-300 font-bold">3. Что бесит СЕЙЧАС?</div>
                  <p className="text-slate-400 mt-1">Без конкретной боли продукт получится скучным и бесполезным.</p>
                </div>
              </div>
            </div>

            {/* Карточка 3: Каталог 6 проверенных ИИ-помощников */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Каталог идей: 6 проверенных личных помощников
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  {
                    name: '📚 Homework Buddy',
                    problem: 'Забываю задания',
                    solution: 'Каждый вечер в 19:00 спрашивает: «Что задали?» и составляет список.'
                  },
                  {
                    name: '🗣️ Word Coach',
                    problem: 'Забываю английские слова',
                    solution: 'Даёт ровно 5 слов в день + проводит мини-квиз с эмодзи.'
                  },
                  {
                    name: '🏃 Training Planner',
                    problem: 'Не успеваю на тренировки',
                    solution: 'Балансирует спорт и учёбу, считает время на дорогу и отдых.'
                  },
                  {
                    name: '🎯 Exam Coach',
                    problem: 'Боюсь экзаменов и тестов',
                    solution: 'Задаёт по 1 вопросу по билетам и доброжелательно разбирает ошибки.'
                  },
                  {
                    name: '🌙 Sleep Reminder Chat',
                    problem: 'Поздно ложусь спать',
                    solution: 'Мягко напоминает в 22:30 убрать телефон и даёт план на завтра.'
                  },
                  {
                    name: '🕌 Namoz Helper',
                    problem: 'Забываю время намаза',
                    solution: 'Ориентируется по Согдийскому расписанию и мягко напоминает.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="font-bold text-white text-xs">{item.name}</div>
                    <div className="text-[11px] text-rose-300 font-mono">Боль: {item.problem}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{item.solution}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточка 4: ЖИВАЯ КАРТОЧКА ПРОДУКТА (С АНИМАЦИЕЙ ПЕРЕВОРОТА) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Интерактивная «Живая Карточка Продукта»
                </span>
                <button
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1 border border-cyan-500/30 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isCardFlipped ? 'Показать лицо' : 'Перевернуть карточку'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Форма редактирования карточки */}
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400">Название продукта:</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Какую проблему решает:</label>
                    <input
                      type="text"
                      value={cardProblem}
                      onChange={(e) => setCardProblem(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-300 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Решение (1 предложение):</label>
                    <input
                      type="text"
                      value={cardSolution}
                      onChange={(e) => setCardSolution(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Кто пользователь:</label>
                    <input
                      type="text"
                      value={cardUser}
                      onChange={(e) => setCardUser(e.target.value)}
                      className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-200 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Живая визитка-превью с переворотом */}
                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className={`p-5 rounded-2xl border transition-all duration-500 cursor-pointer shadow-xl min-h-[190px] flex flex-col justify-between ${
                    isCardFlipped
                      ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border-purple-500/50'
                      : 'bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 border-cyan-500/50'
                  }`}
                >
                  {!isCardFlipped ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                          PROD CARD #01 • FRONT
                        </span>
                        <span className="text-xs">🚀 MVP</span>
                      </div>
                      <div className="space-y-1 my-2">
                        <h4 className="text-base font-black text-white">{cardName || 'Без названия'}</h4>
                        <p className="text-xs text-rose-300">🚨 {cardProblem || 'Опиши проблему...'}</p>
                        <p className="text-xs text-emerald-300">💡 {cardSolution || 'Опиши решение...'}</p>
                      </div>
                      <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
                        <span>👤 {cardUser}</span>
                        <span className="text-cyan-400 font-mono text-[10px]">Кликни чтобы перевернуть 🔄</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          PROD CARD #01 • BACK
                        </span>
                        <span className="text-xs">🛡️ AI ETHICS</span>
                      </div>
                      <div className="space-y-1.5 my-2 text-xs text-slate-300 font-mono">
                        <div>⚙️ Стек: ChatGPT 4o / Gemini 1.5 Flash</div>
                        <div>📐 Архитектура: Prompt 2.0 (✅ / ❌)</div>
                        <div>🔒 Безопасность: No Personal Data</div>
                        <div>📊 Статус: Working Prototype (v1)</div>
                      </div>
                      <div className="text-[10px] text-purple-300 border-t border-purple-900 pt-2 flex items-center justify-between">
                        <span>Готов к питчу 60 сек</span>
                        <span>Кликни назад 🔄</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. РОЛЕВАЯ ИГРА: ВЛАДЕЛЕЦ И ИНЖЕНЕР */}
      {/* ========================================================= */}
      {activeSubTab === 'roleplay' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Уровень 3 — Ролевая игра: Владелец продукта и ИИ-Инженер
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 25–40 минут • +25 ОП</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Хороший продакт-менеджер никогда не гадает наугад — он <strong className="text-white">задаёт вопросы</strong>. В этой игре один ученик становится заказчиком идеи, а второй — ИИ-инженером, собирающим Запрос 2.0!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>💼 Роль 1: Владелец продукта (Product Owner)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Рассказывает свою идею помощника партнёру простыми словами.</li>
                  <li>Объясняет: кто пользователь, что его бесит и когда нужен бот.</li>
                  <li>Отвечает на каверзные вопросы инженера.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>🛠️ Роль 2: ИИ-Инженер (Prompt Architect)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Задаёт 3–5 уточняющих вопросов: «А что бот должен делать при лени?»</li>
                  <li>Формулирует строгие правила ✅ «Делай» и ❌ «Не делай».</li>
                  <li>Собирает и тестирует финальный Запрос 2.0 в нейросети.</li>
                </ul>
              </div>
            </div>

            {/* Шпаргалка вопросов для инженера */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-300 uppercase font-mono">
                Топ-5 вопросов, которые инженер обязан задать владельцу:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  1. «Если пользователь проигнорирует сообщение — бот должен напомнить мягко или замолчать?»
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  2. «Сколько максимум предложений должен писать бот за один ответ?»
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  3. «Какая аналогия из реальной жизни лучше всего подойдёт (спорт, базар, видеоигры)?»
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                  4. «Что боту категорически ЗАПРЕЩЕНО делать (например, давать длинные лекции)?»
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. ДОКТОР ПРОДУКТА */}
      {/* ========================================================= */}
      {activeSubTab === 'doctor' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Bug className="w-5 h-5 text-rose-400" />
                Уровень 4 — Доктор Продукта: Диагностика больных идей
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 70–76 минут • +25 ОП за рецепт</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Перед тобой 3 «пациента» — идеи, которые выглядят заманчиво, но обречены на провал без правильного лечения. Наведи «рентген», найди ошибку и вылечи продукт:
            </p>

            {/* Выбор пациента */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 1,
                  title: 'Пациент №1: «Всё-в-одном»',
                  idea: '«Мой помощник делает всё: учит, готовит еду, учит языки и планирует жизнь»',
                  diagnosis: '🤒 Слишком много задач сразу! МРП обязан решать ровно ОДНУ проблему хорошо.',
                  cure: 'Оставить только ОДНУ ключевую функцию (например, только вечерний план уроков).'
                },
                {
                  id: 2,
                  title: 'Пациент №2: «Для всех людей»',
                  idea: '«Мой помощник создан для учеников вообще всего мира»',
                  diagnosis: '🤒 Размытый портрет! Когда продукт для всех — он не нужен никому.',
                  cure: 'Сузить до конкретного возраста и города: «Для 13-летнего школьника в Худжанде».'
                },
                {
                  id: 3,
                  title: 'Пациент №3: «Эхо-попугай»',
                  idea: '«Помощник просто мило повторяет мои слова и соглашается со мной»',
                  diagnosis: '🤒 Нет реального решения! Это просто пустой разговор без результата.',
                  cure: 'Добавить конкретное действие: выдавать 3 пункта плана, задавать 1 вопрос, давать тест.'
                }
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveDoctorPatient(p.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    activeDoctorPatient === p.id
                      ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-xs flex items-center justify-between">
                    <span>{p.title}</span>
                    {doctorCured[p.id] && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                        Вылечен!
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-2 italic">{p.idea}</div>
                </div>
              ))}
            </div>

            {/* Карточка рентгена активного пациента */}
            {(() => {
              const p = [
                {
                  id: 1,
                  title: 'Пациент №1: «Всё-в-одном»',
                  idea: '«Мой помощник делает вообще всё: учит, готовит еду, планирует жизнь»',
                  diagnosis: '🤒 Слишком много задач сразу! МРП обязан решать ровно ОДНУ проблему хорошо.',
                  cure: 'Ограничь промпт строго ОДНОЙ функцией: «Твоя единственная цель — составить список из 3 уроков на завтра».'
                },
                {
                  id: 2,
                  title: 'Пациент №2: «Для всех людей»',
                  idea: '«Помощник для „учеников вообще“»',
                  diagnosis: '🤒 Непонятно, для кого именно — нужен конкретный портрет пользователя.',
                  cure: 'Укажи в КОНТЕКСТЕ: «Мне 14 лет, учусь в 7 классе в Худжанде, уроки с 13:00 до 18:00».'
                },
                {
                  id: 3,
                  title: 'Пациент №3: «Эхо-попугай»',
                  idea: '«Помощник просто повторяет мои слова»',
                  diagnosis: '🤒 Нет реального решения проблемы — только разговор ни о чём.',
                  cure: 'Добавь жесткий ФОРМАТ: «1) Одно действие прямо сейчас 2) Один проверочный вопрос мне».'
                }
              ].find((item) => item.id === activeDoctorPatient);

              if (!p) return null;

              return (
                <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-3">
                  <div className="text-xs font-bold text-rose-300 uppercase font-mono">
                    Рентген-диагностика: {p.title}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-200">
                    <strong>Диагноз:</strong> {p.diagnosis}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200">
                    <strong>Инженерный рецепт:</strong> {p.cure}
                  </div>

                  <div className="pt-1 text-right">
                    <button
                      onClick={() => {
                        setDoctorCured((prev) => ({ ...prev, [p.id]: true }));
                        addReward(25, `Пациент ${p.title} вылечен! (+25 Опыта)`);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 ml-auto shadow"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Применить рецепт (+25 XP)</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ШПАРГАЛКА — НА ОДИН ЭКРАН */}
      {/* ========================================================= */}
      {activeSubTab === 'cheatsheet' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Шпаргалка Миссии 04 — на один экран
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `ФОРМУЛА ПРОДУКТА: Проблема → Решение → МРП (первая простая версия)
ЗАПРОС 2.0: Роль + Цель + Контекст + Ограничения (✅/❌) + Пример + Формат
ПИТЧ 60 СЕК: Проблема (10с) → Решение (15с) → Демо (25с) → Будущее (10с)
ПРАВИЛО МРП: Реши ОДНУ проблему хорошо — а не 10 посредственно
GENERATE ≠ FINISHED | Проверяй · Не делись личным · Будь честным`,
                    'cheatsheet-full'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 flex items-center gap-1.5"
              >
                {copiedKey === 'cheatsheet-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cheatsheet-full' ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
                <div className="font-bold text-cyan-300 uppercase font-mono">1. Формула Продукта</div>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-cyan-200">
                  ПРОБЛЕМА 🔍 → РЕШЕНИЕ 💡 → МРП (MVP) 🧪
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Не создавай сайт или сложную программу, пока не доказал ценность на простом диалоге в чате!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
                <div className="font-bold text-purple-300 uppercase font-mono">2. Архитектура Запроса 2.0</div>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-purple-200">
                  РОЛЬ + ЦЕЛЬ + КОНТЕКСТ + ПРАВИЛА (✅/❌) + ПРИМЕР + ФОРМАТ
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Обязательно используй негативные ограничения (❌ «Не делай»), чтобы бот не уходил во флуд.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                <div className="font-bold text-amber-300 uppercase font-mono">3. Структура Питча (60 сек)</div>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-amber-200 space-y-1">
                  <div>1️⃣ Проблема (10с): «Многие школьники сталкиваются с...»</div>
                  <div>2️⃣ Решение (15с): «Мой помощник делает...»</div>
                  <div>3️⃣ Живое демо (25с): показ диалога</div>
                  <div>4️⃣ Будущее (10с): «В релизе v2 я добавлю...»</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-300 uppercase font-mono">4. Золотые правила творца</div>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-emerald-200 space-y-1">
                  <div>🛡️ Generate ≠ Finished</div>
                  <div>🛡️ Проверяй · Не делись личным · Будь честным</div>
                  <div>🔄 Learn → Try → Build → Test → Improve → Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. СЛОВАРЬ (ГЛОССАРИЙ) */}
      {/* ========================================================= */}
      {activeSubTab === 'dictionary' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Мини-словарь Миссии 04
              </h3>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск термина..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  word: 'МРП (MVP)',
                  trans: '[Минимальный Рабочий Продукт / Minimum Viable Product]',
                  def: 'Самая простая первая версия продукта, которая уже работает и приносит реальную пользу человеку.'
                },
                {
                  word: 'Продукт',
                  trans: '[Product]',
                  def: 'Любой инструмент, программа или сервис, который закрывает настоящую боль конкретного пользователя.'
                },
                {
                  word: 'Пользователь (User)',
                  trans: '[End User]',
                  def: 'Конкретный человек со своим возрастом, привычками и трудностями, ради которого создаётся помощник.'
                },
                {
                  word: 'Питч',
                  trans: '[Startup Pitch]',
                  def: 'Короткая, яркая и убедительная презентация идеи инвесторам или одноклассникам за 60 секунд.'
                },
                {
                  word: 'Итерация',
                  trans: '[Iteration: v1 → v2 → v3]',
                  def: 'Шаг последовательного улучшения продукта на основе тестов и найденных багов.'
                },
                {
                  word: 'Портфолио',
                  trans: '[Project Portfolio]',
                  def: 'Коллекция твоих реальных работающих проектов, подтверждающая твои навыки для учебы и карьеры.'
                }
              ]
                .filter(
                  (t) =>
                    t.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.def.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((term, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="font-bold text-white text-sm flex items-center justify-between">
                      <span>{term.word}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{term.trans}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{term.def}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. ИНСТРУМЕНТЫ МИССИИ */}
      {/* ========================================================= */}
      {activeSubTab === 'tools' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
              Инструменты: основные и карта сокровищ на будущее
            </h3>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-cyan-300 uppercase font-mono">
                Основные рабочие среды для Миссии 04:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: 'ChatGPT (OpenAI)',
                    desc: 'Тестируем диалог с помощником, настраиваем память и тон.',
                    link: 'https://chatgpt.com'
                  },
                  {
                    name: 'Google Gemini',
                    desc: 'Сравниваем реакцию, проверяем точность и длину ответов.',
                    link: 'https://gemini.google.com'
                  },
                  {
                    name: 'Портал AI For Life',
                    desc: 'Сохраняем карточку проекта в портфолио, получаем бейдж.',
                    link: '#'
                  }
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{tool.name}</div>
                      <p className="text-xs text-slate-400 mt-1">{tool.desc}</p>
                    </div>
                    {tool.link !== '#' && (
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 font-mono inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Открыть сервис</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-purple-300 uppercase font-mono">
                🆕 Дополнительные инструменты (твоя карта сокровищ):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white">NotebookLM (Google)</div>
                  <p className="text-slate-400 mt-1">Загружай свои школьные конспекты — ИИ делает из них аудиоподкаст и готовит к уроку.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white">Perplexity AI</div>
                  <p className="text-slate-400 mt-1">Поисковик нового поколения со ссылками на первоисточники — идеален для фактчекинга.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white">Canva AI</div>
                  <p className="text-slate-400 mt-1">Быстро оформить стильную карточку продукта или презентацию для питча.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white">Suno / Udio</div>
                  <p className="text-slate-400 mt-1">Генерация короткого джингла или музыкальной темы для презентации своего продукта.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-white">Google AI Studio</div>
                  <p className="text-slate-400 mt-1">Инженерная среда, где ИИ уже пишет настоящий код (подробно в Миссии 09!).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. ТРЕНАЖЁР HELPER STUDIO 1.0 */}
      {/* ========================================================= */}
      {activeSubTab === 'builder' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                Интерактивный тренажёр: Life Helper Studio 1.0
              </h3>
              <span className="text-xs font-mono text-cyan-300">Собери свой Запрос 2.0 за 1 клик</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Выбери параметры своего персонального помощника, настрой правила и скопируй готовый боевой промпт:
            </p>

            {/* Настройки генератора */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Категория */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-bold">Сфера проблемы:</label>
                <select
                  value={studioCategory}
                  onChange={(e) => setStudioCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="homework">📚 Домашка и уроки</option>
                  <option value="english">🗣️ Английские слова</option>
                  <option value="sport">🏃 Спорт и тренировки</option>
                  <option value="exam">🎯 Подготовка к экзаменам</option>
                  <option value="namoz">🕌 Расписание и намаз</option>
                </select>
              </div>

              {/* Тон */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-bold">Тон общения:</label>
                <select
                  value={studioTone}
                  onChange={(e) => setStudioTone(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="friendly">Дружеский (старший брат)</option>
                  <option value="mentor">Мудрый наставник</option>
                  <option value="game">Игровой (геймификация)</option>
                </select>
              </div>

              {/* Возраст */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-bold">Возраст пользователя:</label>
                <input
                  type="number"
                  value={studioAge}
                  onChange={(e) => setStudioAge(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* График */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-bold">Время связи:</label>
                <input
                  type="text"
                  value={studioSchedule}
                  onChange={(e) => setStudioSchedule(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Вывод сгенерированного промпта */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
                  Готовый Запрос 2.0 для твоего помощника:
                </span>
                <button
                  onClick={() => handleCopy(generateHelperPrompt(), 'studio-prompt')}
                  className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  {copiedKey === 'studio-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'studio-prompt' ? 'Скопировано!' : 'Скопировать промпт'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                {generateHelperPrompt()}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
