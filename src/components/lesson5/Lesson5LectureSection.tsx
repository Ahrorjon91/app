import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Radio,
  Rocket,
  Lightbulb,
  Camera,
  Sun,
  Eye,
  Smile,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Check,
  Copy,
  Users,
  Bug,
  BookOpen,
  ExternalLink,
  ChevronRight,
  Sliders,
  RotateCcw,
  Zap,
  SlidersHorizontal,
  Flame,
  Layers,
  HelpCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

// Generated assets for Lesson 5
import badgeAiArtistImg from '../../assets/images/lesson5_badge_ai_artist_1790073270769.jpg';

export const Lesson5LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subsections navigation (8 total)
  const [activeSubTab, setActiveSubTab] = useState<
    'news' | 'framework' | 'styles' | 'roleplay' | 'doctor' | 'cheatsheet' | 'dictionary' | 'tools' | 'builder'
  >('news');

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Промпт скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Easter egg: click Nova 5 times
  const [novaClicks, setNovaClicks] = useState(0);
  const [novaEasterEggFound, setNovaEasterEggFound] = useState(false);
  const handleNovaClick = () => {
    if (novaEasterEggFound) return;
    const next = novaClicks + 1;
    setNovaClicks(next);
    if (next >= 5) {
      setNovaEasterEggFound(true);
      addReward(25, '🎨 Секретная палитра Nova найдена! Робот нарисовал созвездие Согда! (+25 Опыта)');
    }
  };

  // Voting A vs B state
  const [votedOption, setVotedOption] = useState<'A' | 'B' | null>(null);

  // Doctor section state
  const [activeDoctorPatient, setActiveDoctorPatient] = useState<number>(1);
  const [doctorCured, setDoctorCured] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false
  });

  // Before/After comparison slider percentage (0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);

  // Live Visual Prompt Builder state (6 parts)
  const [subject, setSubject] = useState('Футуристичный трамвай на магнитной подушке');
  const [style, setStyle] = useState('Реалистичная 3D-иллюстрация');
  const [location, setLocation] = useState('Худжанд, набережная Сырдарьи с видом на Могултау');
  const [lighting, setLighting] = useState('Тёплый закат, мягкий золотистый свет');
  const [camera, setCamera] = useState('Вид с высоты птичьего полёта, кинематографичный ракурс');
  const [mood, setMood] = useState('Уютный, мирный, технологичный, без мрачной антиутопии');

  const buildVisualPrompt = () => {
    return `${subject}. Стиль: ${style}. Место: ${location}. Освещение: ${lighting}. Ракурс камеры: ${camera}. Настроение и атмосфера: ${mood}. Clean visual, high detail, masterpiece.`;
  };

  return (
    <div className="space-y-6 text-slate-100 w-full max-w-full overflow-hidden">
      {/* 📰 НОВОСТНАЯ БЕГУЩАЯ СТРОКА (AI NEWS TICKER) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 p-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 shrink-0 px-2 uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
          <span>Новости генеративного визуала за неделю:</span>
        </div>
        <div className="overflow-x-auto whitespace-nowrap text-xs text-slate-300 py-1 flex items-center gap-6 font-mono">
          <span className="inline-flex items-center gap-1.5 text-cyan-200">
            🖼️ <strong>Фотореализм 2026:</strong> новые модели рисуют настолько точно, что нужен навык проверки
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-purple-200">
            🕵️ <strong>Детекторы синтетики:</strong> сервисы проверки «AI или реальное фото» внедряются в браузеры
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-amber-200">
            💰 <strong>Анти-фейк:</strong> всплеск сгенерированных «историй успеха» учит медиаграмотности
          </span>
          <span className="text-slate-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-200">
            🎬 <strong>ИИ-кино:</strong> видеоролики от нейросетей набирают сотни миллионов просмотров
          </span>
        </div>
      </div>

      {/* 🌟 HERO BANNER & MISSION INTRO */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 shadow-2xl">
        <div className="relative p-6 sm:p-8 md:p-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Palette className="w-3.5 h-3.5" /> Миссия 05 • Визуальные нейросети
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700">
                ⏱️ 90 минут
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-pink-500/20 border border-pink-500/40 text-pink-300 font-bold flex items-center gap-1">
                🌸 Ранг: AI ARTIST (Lv.5)
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Миссия 05: ИИ-Художник
            </h1>
            <p className="text-base sm:text-lg text-cyan-200 font-medium">
              «От слов — к изображению. Строим „Худжанд-2050“».
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Сегодня твои слова превращаются в визуальные шедевры. Мы создадим картину города, в котором ты мечтаешь жить через 25 лет: с чистой формулой из 6 частей, управлением стилем, светом и ракурсом!
            </p>
          </div>

          {/* 🤖 ВХОДЯЩЕЕ СООБЩЕНИЕ ОТ NOVA */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md flex items-start gap-3.5">
            <div
              onClick={handleNovaClick}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 cursor-pointer select-none transition-all shadow-lg ${
                novaEasterEggFound
                  ? 'bg-pink-500 text-slate-950 ring-4 ring-pink-400 animate-bounce'
                  : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:scale-110'
              }`}
              title="Нажми на Nova 5 раз для секретной пасхалки!"
            >
              🎨
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-bold text-cyan-300 flex items-center gap-2">
                <span>Входящее от робота NOVA:</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono">
                  Online
                </span>
              </div>
              <p className="text-slate-300 italic">
                «Салом, Product Maker! 👋 Ты уже строишь продукты словами. А теперь попробуй <strong>рисовать словами</strong>. Сегодня ты создашь свою первую visual-идею — картину города, в котором ты хотел бы жить через 25 лет. Это первый шаг к твоему большому проекту „Мой Мир Будущего“! 🟢»
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 НАВИГАЦИЯ ПО 8 ПОДРАЗДЕЛАМ ЛЕКЦИИ */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'news', label: '1. Запуск & Два запроса', icon: Sparkles },
          { id: 'framework', label: '2. Формула 6 частей', icon: Sliders },
          { id: 'styles', label: '3. Карта стилей & До/После', icon: Palette },
          { id: 'roleplay', label: '4. Ролевая игра', icon: Users },
          { id: 'doctor', label: '5. Доктор Картинки', icon: Bug },
          { id: 'cheatsheet', label: '📋 Шпаргалка', icon: FileText },
          { id: 'dictionary', label: '📖 Словарь', icon: BookOpen },
          { id: 'tools', label: '🔗 Инструменты', icon: ExternalLink },
          { id: 'builder', label: '🎮 Конструктор запроса', icon: SlidersHorizontal }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                active
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. ЗАПУСК: ОДИН ГОРОД, ДВА ЗАПРОСА */}
      {/* ========================================================= */}
      {activeSubTab === 'news' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Уровень 1 — Запуск: Один город, два разных запроса
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 0–10 минут • +25 ОП</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Посмотри, как нейросеть воспринимает одну и ту же идею, если написать размытое слово или передать точные визуальные координаты:
            </p>

            {/* Сравнение двух запросов A vs B */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Запрос A: Слабый */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold uppercase tracking-wider">
                    Запрос A (Слабый)
                  </span>
                  <span className="text-xs text-slate-500 font-mono">1 слово</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 text-xs font-mono text-rose-200 border border-slate-800">
                  «Город будущего.»
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Что нарисует ИИ:</strong> Случайный шаблонный пейзаж со стеклянными летающими тарелками, серым туманом и без намёка на родной город. Это не твой город.
                </p>
                <button
                  onClick={() => {
                    setVotedOption('A');
                    addReward(5, 'Голос учтён за Запрос A');
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                    votedOption === 'A'
                      ? 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {votedOption === 'A' ? 'Твой выбор: Запрос A (Шаблон)' : 'Выбрать вариант A'}
                </button>
              </div>

              {/* Запрос B: Сильный */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    Запрос B (Мастерский)
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">6 частей формулы</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 text-xs font-mono text-emerald-200 border border-slate-800 leading-relaxed">
                  «Футуристичный город Худжанд в 2050 году, вид с горы Могултау на закате, солнечные панели на крышах старых домов, современный трамвай едет вдоль реки Сырдарья, тёплый золотой свет, стиль — реалистичная 3D-иллюстрация.»
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Что нарисует ИИ:</strong> Узнаваемые контуры гор, искрящуюся реку, уютные восточные элементы в гармонии с эко-технологиями. Узнаваемо, живо и с душой!
                </p>
                <button
                  onClick={() => {
                    setVotedOption('B');
                    addReward(15, 'Голос учтён: Запрос B с формулой 6 частей! (+15 Опыта)');
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                    votedOption === 'B'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  {votedOption === 'B' ? 'Твой выбор: Запрос B (Идеально!) ✅' : 'Выбрать вариант B (Рекомендовано)'}
                </button>
              </div>
            </div>

            {/* 🛡️ 3 ЩИТА ИИ-ХУДОЖНИКА */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>3 Щита цифрового художника (Этический кодекс)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" /> 1. Проверяй
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Ищи дефекты, лишние пальцы, искривлённые тексты и странную анатомию перед показом.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> 2. Не делись личным
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Никогда не генерируй лица реальных людей (одноклассников, учителей) без их согласия!
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 3. Будь честным
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Всегда открыто говори: «Это сгенерировано мной с помощью нейросети». Не выдавай за фото!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. РАСШИФРОВКА: ФОРМУЛА ВИЗУАЛЬНОГО ЗАПРОСА (6 ЧАСТЕЙ) */}
      {/* ========================================================= */}
      {activeSubTab === 'framework' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                Уровень 2 — Расшифровка: Золотая формула из 6 частей
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 10–25 минут</span>
            </div>

            {/* Карточка 1: Главная математическая формула */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
              <div className="text-xs font-bold text-purple-300 uppercase font-mono tracking-wider">
                Каноническая формула генерации изображений:
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-purple-800 text-center text-xs sm:text-sm font-mono font-bold text-cyan-300 overflow-x-auto">
                ЗАПРОС = 🧍 ГЕРОЙ + 🎨 СТИЛЬ + 🏞️ МЕСТО + 💡 СВЕТ + 📷 РАКУРС + 🎭 НАСТРОЕНИЕ
              </div>
              <p className="text-xs text-slate-300 text-center max-w-2xl mx-auto">
                Если пропустить хотя бы 2 части, нейросеть «додумает» их сама на свой вкус. С шестью частями ты управляешь кадром как профессиональный кинорежиссёр!
              </p>
            </div>

            {/* Интерактивная таблица 6 составляющих */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  icon: '🧍',
                  title: '1. Герой (Subject)',
                  desc: 'Что или кто главное в кадре?',
                  example: '«Футуристичный эко-трамвай с солнечной крышей»'
                },
                {
                  icon: '🎨',
                  title: '2. Стиль (Style)',
                  desc: 'Как именно нарисовано изображение?',
                  example: '«Реалистичная 3D-иллюстрация, как в Pixar»'
                },
                {
                  icon: '🏞️',
                  title: '3. Место (Environment)',
                  desc: 'Где разворачивается действие?',
                  example: '«Худжанд, вид с горы Могултау на реку Сырдарья»'
                },
                {
                  icon: '💡',
                  title: '4. Свет (Lighting)',
                  desc: 'Какое освещение и время суток?',
                  example: '«Тёплый закатный золотой свет, длинные мягкие тени»'
                },
                {
                  icon: '📷',
                  title: '5. Ракурс (Camera)',
                  desc: 'Откуда смотрит объектив камеры?',
                  example: '«С высоты птичьего полёта, широкий угол 24mm»'
                },
                {
                  icon: '🎭',
                  title: '6. Настроение (Mood)',
                  desc: 'Какую эмоцию вызывает сцена?',
                  example: '«Уютное, безмятежное, живое, без антиутопии»'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                    {item.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Карточка «Отрицательный промптинг» */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase font-mono">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Секрет мастеров: Указывай, чего НЕ должно быть!
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                В хорошем запросе всегда есть защитные слова-исключения: <em>«без мрачной антиутопии», «без мусора и разрушений», «чистый воздух», «без текста и водяных знаков»</em>. Это уберегает картинку от мрачных стереотипов киберпанка.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. КАРТА СТИЛЕЙ & ИНТЕРАКТИВНЫЙ СЛАЙДЕР ДО/ПОСЛЕ */}
      {/* ========================================================= */}
      {activeSubTab === 'styles' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Карта стилей & Интерактивное сравнение «До / После»
              </h3>
              <span className="text-xs font-mono text-cyan-300">Выбери свой стиль</span>
            </div>

            {/* 5 проверенных визуальных стилей */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {[
                {
                  id: '3d',
                  name: '🖼️ 3D-Иллюстрация',
                  vibe: 'Чистая, современная, детализированная, как в анимационном шедевре'
                },
                {
                  id: 'synth',
                  name: '🌆 Синтвейв / Неон',
                  vibe: 'Яркие бирюзовые и розовые огни, ночные светящиеся линии, ретро-будущее'
                },
                {
                  id: 'water',
                  name: '🎨 Акварель',
                  vibe: 'Мягкие полупрозрачные тона, потёки краски, спокойное поэтичное настроение'
                },
                {
                  id: 'iso',
                  name: '📐 Изометрия',
                  vibe: 'Вид под углом 45 градусов сверху, как в любимой стратегии или SimCity'
                },
                {
                  id: 'sketch',
                  name: '✏️ Архитектурный скетч',
                  vibe: 'Чёрно-белый чертёжный набросок пером с акцентами золотого цвета'
                }
              ].map((st) => (
                <div
                  key={st.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-pink-500/50 transition-all cursor-pointer"
                  onClick={() => addReward(5, `Стиль изучен: ${st.name}`)}
                >
                  <div className="font-bold text-white text-xs">{st.name}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{st.vibe}</p>
                </div>
              ))}
            </div>

            {/* ИНТЕРАКТИВНЫЙ СЛАЙДЕР «ДО / ПОСЛЕ» (v1 vs v2) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
                  Интерактивный слайдер качества: Версия v1 (Случайная) vs Версия v2 (С формулой 6 частей)
                </span>
                <span className="text-xs text-slate-400 font-mono">Шторка: {sliderPos}%</span>
              </div>

              {/* Интерактивный канвас слайдера */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 select-none">
                {/* Слой ПОСЛЕ (справа / базовый) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 flex flex-col justify-end p-6">
                  <div className="max-w-md space-y-1 z-0">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500 text-[10px] font-bold uppercase font-mono">
                      Версия v2 (С формулой)
                    </span>
                    <h4 className="text-base font-black text-white">Худжанд-2050: Золотой закат на Сырдарье</h4>
                    <p className="text-xs text-slate-300">
                      Солнечные батареи, чистые зелёные сады, скоростной трамвай, теплый золотой свет Могултау.
                    </p>
                  </div>
                </div>

                {/* Слой ДО (слева, отсекается ползунком) */}
                <div
                  className="absolute inset-y-0 left-0 bg-slate-950 border-r-2 border-cyan-400 flex flex-col justify-end p-6 overflow-hidden transition-none"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="w-80 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500 text-[10px] font-bold uppercase font-mono">
                      Версия v1 (Без деталей)
                    </span>
                    <h4 className="text-base font-black text-slate-300">Размытый серый мегаполис</h4>
                    <p className="text-xs text-slate-500">
                      Серые небоскрёбы, летающие тарелки из клипарта, непонятный туман без души.
                    </p>
                  </div>
                </div>

                {/* Ручка слайдера */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee] cursor-ew-resize flex items-center justify-center -translate-x-1/2"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg">
                    ↔
                  </div>
                </div>

                {/* Невидимый input range для плавного управления пальцем и мышью */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>← Двигай влево: v1 (Слабый запрос)</span>
                <span>Двигай вправо: v2 (6 частей формулы) →</span>
              </div>
            </div>

            {/* Карточка: Цикл улучшения одной переменной */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-xs flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                Правило одной переменной (Научный подход):
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Когда результат v1 не идеален — <strong>меняй строго ОДНУ часть за раз</strong> (например, только свет со «дня» на «закат», или только ракурс с «улицы» на «высоту птичьего полёта»). Если поменять всё разом — ты никогда не поймёшь, какое именно слово испортило или спасло картинку!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. РОЛЕВАЯ ИГРА: АРТ-ДИРЕКТОР И ИИ-ХУДОЖНИК */}
      {/* ========================================================= */}
      {activeSubTab === 'roleplay' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Уровень 3 — Ролевая игра: Арт-директор и ИИ-Художник
              </h3>
              <span className="text-xs font-mono text-cyan-300">⏱️ 25–40 минут • +25 ОП</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              В цифровой индустрии создание арта — это командная работа. Один человек ставит видение, а второй — точно формулирует код промпта:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>🎬 Роль 1: Арт-директор (Art Director)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Придумывает образ Худжанда будущего (что на переднем плане, что вдалеке).</li>
                  <li>Диктует партнёру все 6 частей формулы строго по порядку.</li>
                  <li>Принимает результат: «Слишком темно, давай сделаем закатный свет».</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>🖌️ Роль 2: ИИ-Художник (Prompt Specialist)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Записывает запрос слово в слово за арт-директором.</li>
                  <li>Запускает генерацию в Google Whisk или Gemini.</li>
                  <li>Указывает на пропущенные части: «Ты забыл сказать, какой ракурс камеры!»</li>
                </ul>
              </div>
            </div>

            {/* Вывод урока */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800 text-xs text-purple-200">
              💡 <strong>Главный инсайт:</strong> Если ИИ-художник получает неполную команду — результат получается случайным. В генерации изображений <strong>точность каждого прилагательного важнее скорости</strong>.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ДОКТОР КАРТИНКИ (ДИАГНОСТИКА БОЛЬНЫХ ЗАПРОСОВ) */}
      {/* ========================================================= */}
      {activeSubTab === 'doctor' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Bug className="w-5 h-5 text-rose-400" />
                Уровень 5A — Доктор Картинки: Исправь сломанные промпты
              </h3>
              <span className="text-xs font-mono text-cyan-300">+25 ОП за каждого пациента</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Перед тобой 3 типичных ошибки начинающих пользователей. Поставь диагноз и примени правильный рецепт:
            </p>

            {/* Выбор пациента */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 1,
                  title: 'Пациент №1: «Город»',
                  desc: 'Запрос из одного слова. Результат непредсказуем.',
                  diag: '🤒 Не хватает 5 частей формулы! Нейросеть выберет стиль и ракурс наугад.',
                  cure: 'Добавить героя, место (Худжанд), стиль (3D), закатный свет и ракурс сверху.'
                },
                {
                  id: 2,
                  title: 'Пациент №2: «Винегрет стилей»',
                  desc: '«Акварель, аниме, неон, реализм, мрачный и весёлый»',
                  diag: '🤒 Конфликт стилей! Модель смешивает несовместимые токены и выдаёт мыло.',
                  cure: 'Выбрать строго ОДИН стиль (например, чистый неоновый синтвейв) и ОДНО настроение.'
                },
                {
                  id: 3,
                  title: 'Пациент №3: «Лицо учителя»',
                  desc: '«Портрет моего учителя в будущем»',
                  diag: '🤒 Нарушение этики и безопасности! Нельзя генерировать реальных людей без разрешения.',
                  cure: 'Заменить на вымышленного персонажа: «Учитель-робот будущего с добрыми глазами».'
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
                  <div className="text-[11px] text-slate-300 mt-2 italic">{p.desc}</div>
                </div>
              ))}
            </div>

            {/* Рентген пациента */}
            {(() => {
              const p = [
                {
                  id: 1,
                  title: 'Пациент №1: «Город»',
                  bad: '«Город»',
                  diag: 'Не хватает стиля, света, ракурса, настроения и места.',
                  recipe:
                    '«Футуристичный жилой квартал Худжанда в 2050 году. Стиль: чистая 3D-иллюстрация. Вертикальные сады на балконах, солнечные панели, мягкий утренний свет, вид с улицы. Уютно и без мрачной антиутопии.»'
                },
                {
                  id: 2,
                  title: 'Пациент №2: «Винегрет стилей»',
                  bad: '«Реалистичный космический город, акварелью, неоном, аниме, мрачный и весёлый одновременно»',
                  diag: 'Слишком много противоположных определений. Нейросеть создаёт шумное неразборчивое пятно.',
                  recipe:
                    '«Ночной Худжанд-2050 в стиле синтвейв. Неоновые бирюзовые и розовые мосты через Сырдарью, вид сверху, кинематографичное освещение, атмосфера праздника и энергии.»'
                },
                {
                  id: 3,
                  title: 'Пациент №3: «Лицо учителя»',
                  bad: '«Реалистичное фото моего учителя химии в будущем»',
                  diag: 'Генерация реальных людей без согласия запрещена правилами безопасности и уважения.',
                  recipe:
                    '«Добрый футуристичный наставник робот-профессор в химической лаборатории 2050 года, дружелюбная улыбка, стиль 3D-анимации, мягкий тёплый свет.»'
                }
              ].find((item) => item.id === activeDoctorPatient);

              if (!p) return null;

              return (
                <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-3">
                  <div className="text-xs font-bold text-rose-300 uppercase font-mono">
                    Диагностическая карта: {p.title}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 font-mono">
                    ❌ Ошибочный запрос: {p.bad}
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong>Диагноз:</strong> {p.diag}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 font-mono">
                    ✅ Лекарство (Правильный запрос): {p.recipe}
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
      {/* 6. ШПАРГАЛКА (CHEAT SHEET) */}
      {/* ========================================================= */}
      {activeSubTab === 'cheatsheet' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Шпаргалка ИИ-Художника на один экран
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `ШПАРГАЛКА ИИ-ХУДОЖНИКА (МИССИЯ 05):

1. ФОРМУЛА ВИЗУАЛЬНОГО ЗАПРОСА:
ЗАПРОС = ГЕРОЙ + СТИЛЬ + МЕСТО + СВЕТ + РАКУРС + НАСТРОЕНИЕ

2. ЦИКЛ УЛУЧШЕНИЯ:
v1 → Смотрю → Что не так? → Меняю ОДНУ часть → v2

3. ПРАВИЛО ОДНОЙ ПЕРЕМЕННОЙ:
Меняй только 1 параметр за раз (например, только свет со дня на закат).

4. ЭТИЧЕСКИЙ КОДЕКС:
- Не генерируй реальных людей без их согласия.
- Честно говори, что работа создана ИИ.
- Добавляй исключения: «без мусора, без текста, без мрачной антиутопии».`,
                    'cheatsheet'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 flex items-center gap-1.5"
              >
                {copiedKey === 'cheatsheet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cheatsheet' ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300 uppercase font-mono">📐 Формула 6 частей:</div>
                <p className="text-slate-300">
                  🧍 <strong>Герой:</strong> Главный объект кадра<br />
                  🎨 <strong>Стиль:</strong> 3D-иллюстрация, акварель, синтвейв<br />
                  🏞️ <strong>Место:</strong> Худжанд, Сырдарья, Могултау<br />
                  💡 <strong>Свет:</strong> Золотой закат, утреннее солнце<br />
                  📷 <strong>Ракурс:</strong> Вид с высоты птичьего полёта, широкий угол<br />
                  🎭 <strong>Настроение:</strong> Уютное, футуристичное, мирное
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-purple-300 uppercase font-mono">🛡️ Правила безопасности:</div>
                <p className="text-slate-300">
                  • <strong>GENERATE ≠ FINISHED:</strong> Первая картинка — черновик, доработай её в v2!<br />
                  • <strong>No Real Faces:</strong> Не делай дипфейки знакомых или учителей.<br />
                  • <strong>Честность:</strong> Делись артом с гордостью, но открыто говори: «Это ИИ-арт».
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. СЛОВАРЬ (ГЛОССАРИЙ) */}
      {/* ========================================================= */}
      {activeSubTab === 'dictionary' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Мини-словарь визуального инжиниринга
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Термины, которыми пользуются дизайнеры компьютерных игр и художники генеративных студий:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  word: 'Визуальный запрос',
                  meaning: 'Текстовое описание сцены, которое нейросеть превращает в пиксели изображения.'
                },
                {
                  word: 'Стиль (Style)',
                  meaning: 'Художественная манера рисунка (3D, акварель, пиксель-арт, аниме, фотореализм).'
                },
                {
                  word: 'Композиция',
                  meaning: 'Расположение предметов в кадре (на переднем, среднем и заднем плане).'
                },
                {
                  word: 'Ракурс камеры',
                  meaning: 'Точка, из которой зритель смотрит на сцену (сверху, снизу, от первого лица).'
                },
                {
                  word: 'Артефакт (Artifact)',
                  meaning: 'Ошибки генерации нейросети: лишний палец, размытый глаз, кривые буквы на вывеске.'
                },
                {
                  word: 'Дипфейк (Deepfake)',
                  meaning: 'Поддельное реалистичное изображение или видео реального человека. Требует строгого контроля.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-300 text-xs font-mono">{item.word}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. ИНСТРУМЕНТЫ */}
      {/* ========================================================= */}
      {activeSubTab === 'tools' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-amber-400" />
              Инструменты художника для Миссии 05
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span>🎨 Google Whisk</span>
                  <span className="text-[10px] text-cyan-300 font-mono">labs.google/whisk</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Экспериментальная студия генерации от Google. Отлично понимает композицию, стиль и ракурс.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span>✨ Google Gemini (Image Gen)</span>
                  <span className="text-[10px] text-purple-300 font-mono">gemini.google.com</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Мгновенная генерация иллюстраций прямо в диалоге с поддержкой русскоязычных промптов.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span>🖌️ Canva AI & Magic Studio</span>
                  <span className="text-[10px] text-emerald-300 font-mono">canva.com</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Быстрое оформление готовых картинок в постеры, обложки для видео и плакаты для школы.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span>🕵️ Детекторы синтетики</span>
                  <span className="text-[10px] text-rose-300 font-mono">aiordnot.com</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Сервисы для проверки подлинности фотографий и поиска невидимых водяных знаков ИИ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. ЖИВОЙ КОНСТРУКТОР ВИЗУАЛЬНОГО ЗАПРОСА */}
      {/* ========================================================= */}
      {activeSubTab === 'builder' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                Интерактивный тренажёр: Конструктор «Худжанд-2050»
              </h3>
              <span className="text-xs font-mono text-cyan-300">Собери свой запрос из 6 частей</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Выбери параметры своей картины, настрой параметры и скопируй безупречный промпт:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {/* Герой */}
              <div className="space-y-1">
                <label className="text-cyan-300 font-bold">1. Герой (Что главное?):</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Футуристичный трамвай на магнитной подушке">🚊 Трамвай на магнитной подушке</option>
                  <option value="Школа будущего с прозрачным куполом и садами на крыше">🏫 Школа будущего с садами</option>
                  <option value="Экологичный жилой квартал с солнечными панелями">🏙️ Эко-квартал с панелями</option>
                  <option value="Дрон-курьер, доставляющий худжандские гранаты">🛸 Дрон-курьер с фруктами</option>
                  <option value="Парк технологий на берегу с фонтанами">🌳 Парк технологий на берегу</option>
                </select>
              </div>

              {/* Стиль */}
              <div className="space-y-1">
                <label className="text-pink-300 font-bold">2. Стиль рисунка:</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-pink-400"
                >
                  <option value="Реалистичная 3D-иллюстрация, чистая, как в мультфильме">🖼️ Реалистичная 3D-иллюстрация</option>
                  <option value="Неоновый синтвейв, ночной город с бирюзовыми огнями">🌆 Синтвейв / Неон</option>
                  <option value="Мягкая воздушная акварель, поэтичные цвета">🎨 Акварель</option>
                  <option value="Изометрия под углом 45 градусов, детальная сцена">📐 Изометрия</option>
                  <option value="Чертёжный архитектурный скетч с золотыми акцентами">✏️ Архитектурный скетч</option>
                </select>
              </div>

              {/* Место */}
              <div className="space-y-1">
                <label className="text-purple-300 font-bold">3. Место действия:</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="Худжанд, набережная Сырдарьи с видом на горы Могултау">🌊 Набережная Сырдарьи + Могултау</option>
                  <option value="Центральная площадь Панджшанбе в 2050 году">🏛️ Площадь Панджшанбе-2050</option>
                  <option value="Вершина горы Могултау с солнечной обсерваторией">🏔️ Вершина Могултау</option>
                  <option value="Уютная улица в махалле будущего с вертикальными садами">🏡 Улица в махалле будущего</option>
                </select>
              </div>

              {/* Свет */}
              <div className="space-y-1">
                <label className="text-amber-300 font-bold">4. Освещение:</label>
                <select
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="Тёплый закат, мягкий золотистый свет">🌅 Тёплый золотой закат</option>
                  <option value="Яркий утренний солнечный свет, чистое небо">☀️ Яркое утреннее солнце</option>
                  <option value="Сияющие неоновые ночные вывески и фонари">🌙 Ночной неон и фонари</option>
                  <option value="Мягкий рассеянный свет после теплого весеннего дождя">🌧️ Свет после дождя</option>
                </select>
              </div>

              {/* Ракурс */}
              <div className="space-y-1">
                <label className="text-emerald-300 font-bold">5. Ракурс камеры:</label>
                <select
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="Вид с высоты птичьего полёта, кинематографичный ракурс">🦅 С высоты птичьего полёта</option>
                  <option value="Вид с уровня глаз пешехода на тротуаре">🚶 С уровня глаз пешехода</option>
                  <option value="Крупный план с деталями фасадов">🔍 Крупный план</option>
                  <option value="Широкоугольная панорама горизонта">📸 Широкоугольная панорама</option>
                </select>
              </div>

              {/* Настроение */}
              <div className="space-y-1">
                <label className="text-rose-300 font-bold">6. Настроение:</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                >
                  <option value="Уютный, мирный, технологичный, без мрачной антиутопии">🕊️ Уютный, мирный, без антиутопии</option>
                  <option value="Энергичный, динамичный, праздник науки">⚡ Энергичный, праздник науки</option>
                  <option value="Поэтичный, сказочный, ностальгический">📖 Поэтичный и сказочный</option>
                </select>
              </div>
            </div>

            {/* Вывод собранного запроса */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
                  Собранный промпт (Запусти в Google Whisk или Gemini):
                </span>
                <button
                  onClick={() => handleCopy(buildVisualPrompt(), 'builder-prompt')}
                  className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  {copiedKey === 'builder-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'builder-prompt' ? 'Скопировано!' : 'Скопировать промпт'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed">
                {buildVisualPrompt()}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
