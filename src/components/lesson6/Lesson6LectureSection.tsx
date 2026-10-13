import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Compass,
  Zap,
  Shield,
  BookOpen,
  Copy,
  Check,
  Award,
  ChevronRight,
  Flame,
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Smile,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Volume2,
  VolumeX,
  Eye,
  Camera,
  Layers,
  Heart,
  Palette
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import conceptSheetImg from '../../assets/images/lesson6_concept_sheet_1790074007164.jpg';

export const Lesson6LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Accessibility toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Easter Egg: Nova masquerade faces
  const [novaFaceIndex, setNovaFaceIndex] = useState(0);
  const [novaEasterFound, setNovaEasterFound] = useState(false);
  const novaFaces = [
    { face: '🤖', title: 'Обычный NOVA' },
    { face: '🦸', title: 'NOVA-Супергерой' },
    { face: '🎭', title: 'NOVA-Актёр' },
    { face: '🥷', title: 'NOVA-Ниндзя' },
    { face: '👑', title: 'NOVA-Владыка Промптов' }
  ];

  const handleNovaFaceClick = () => {
    const next = (novaFaceIndex + 1) % novaFaces.length;
    setNovaFaceIndex(next);
    if (!novaEasterFound) {
      setNovaEasterFound(true);
      addReward(25, '🥚 Пасхалка найдена: NOVA примерил новое лицо! (+25 Опыта)');
    }
  };

  // State for Interactive News Tab
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const newsItems = [
    {
      title: 'Проблема 2026 года: «Меняющееся лицо» в генерациях',
      badge: 'Глобальный тренд',
      impact: 'Это главный вызов современной генерации: один и тот же герой в разных сценах выглядит как разные люди.',
      takeaway: 'Сегодня ты научишься решать эту проблему через канонический Паспорт Персонажа!'
    },
    {
      title: 'Референс-инструменты и сохранение стиля (Consistency)',
      badge: 'Новые технологии',
      impact: 'Инструменты Google Whisk и Imagen 3 учатся фиксировать черты лица, цвет глаз и костюм для серии кадров.',
      takeaway: 'Чем подробнее и точнее задана формула внешности, тем стабильнее модель удерживает образ.'
    },
    {
      title: 'ИИ-комиксы и постоянные персонажи студий',
      badge: 'Индустрия медиа',
      impact: 'Крупные веб-студии и авторы манги выпускают целые графические романы, создавая персонажа один раз.',
      takeaway: 'Твой герой сегодня станет маскотом курса «AI for Life» до самого Демо-Дня!'
    },
    {
      title: 'ИИ-компаньоны с характером и памятью',
      badge: 'Этика и общество',
      impact: 'Цифровые компаньоны обретают выраженный характер, манеру речи и индивидуальную предысторию.',
      takeaway: 'Повод задуматься: в чём отличие вымышленного ассистента от настоящего живого друга?'
    }
  ];

  // Level 1 Demo: Changing Face vs Detailed Passport
  const [demoState, setDemoState] = useState<'vague' | 'detailed'>('vague');

  // Level 2 Interactive Emotion Matrix
  const [selectedEmotion, setSelectedEmotion] = useState<'happy' | 'surprised' | 'thoughtful' | 'determined'>('happy');

  const emotionsData = {
    happy: {
      name: '😊 Радость',
      tag: 'улыбка и блеск глаз',
      promptModifier: 'широкая искренняя улыбка, радостный взгляд, прищуренные от смеха глаза, расслабленная поза',
      desc: 'Отлично подходит для сцен триумфа, побед на олимпиадах и встреч с друзьями.'
    },
    surprised: {
      name: '😲 Удивление',
      tag: 'расширенные глаза',
      promptModifier: 'широко открытые глаза, приподнятые брови, приоткрытый рот в изумлении, лёгкий наклон головы',
      desc: 'Подходит для момента первого знакомства с роботом NOVA или открытия тайной лаборатории.'
    },
    thoughtful: {
      name: '🤔 Задумчивость',
      tag: 'взгляд исследователя',
      promptModifier: 'взгляд в сторону, рука слегка касается подбородка, сосредоточенное выражение лица, мягкий прищур',
      desc: 'Идеально для моментов написания сложного кода, пайки солнечной панели или планирования.'
    },
    determined: {
      name: '😤 Решимость',
      tag: 'стальной фокус',
      promptModifier: 'сжатые губы, нахмуренные брови, целеустремлённый прямой взгляд в камеру, уверенная стойка',
      desc: 'Момент преодоления трудностей: починка летающего транспорта перед грозой.'
    }
  };

  // Level 5A: Doctor Character Interactive
  const [activePatient, setActivePatient] = useState<number>(0);
  const patients = [
    {
      id: 1,
      badge: 'Пациент №1: Синдром Хамелеона',
      problem: 'На 4 разных кадрах у героя то чёрные волосы, то рыжие, то длинные, то короткие.',
      diagnosis: 'Описание внешности было размытым («парень с волосами») или менялось от запроса к запросу.',
      cure: 'Зафиксируй неизменный блок: «короткие чёрные волосы с чёлкой набок, карие глаза» в каждом промпте.'
    },
    {
      id: 2,
      badge: 'Пациент №2: Чужой Клон',
      problem: 'Герой выглядит один в один как Человек-Паук или Наруто.',
      diagnosis: 'Нарушение правила уникальности и авторского права (Copyright).',
      cure: 'Придумай собственного героя из Худжанда: национальные узоры, личные аксессуары, уникальный цвет куртки.'
    },
    {
      id: 3,
      badge: 'Пациент №3: Словесный Перегруз',
      problem: 'Паспорт состоит из 250 слов: модель запуталась и выдала смазанную кашу.',
      diagnosis: 'Перенасыщение промпта: ИИ не может удержать 30 деталей одновременно.',
      cure: 'Правило золотых 5–7 признаков: возраст, причёска, глаза, ключевая одежда, 1 отличительный знак.'
    }
  ];

  // Interactive Live Passport Builder
  const [passport, setPassport] = useState({
    name: 'Амина',
    age: '16 лет',
    appearance: 'девушка 16 лет, короткие чёрные волосы до подбородка с ровной чёлкой, карие выразительные глаза, бирюзовая ветровка с неоновой молнией',
    personality: 'любознательная изобретательница, смелая, любит чинить сложную технику',
    backstory: 'выросла на берегу Сырдарьи, с 10 лет собирает мини-дронов из запчастей',
    ability: 'мгновенно находит поломку в любом электронном устройстве по звуку',
    cityTie: 'создаёт чистую энергию для кварталов Худжанда 2050 года'
  });

  const generateFullPrompt = (scene: string) => {
    return `[CHARACTER REFERENCE: ${passport.appearance}, character name: ${passport.name}] ${scene}, highly detailed clean 3D illustration style, cinematic lighting, masterpiece 8k, consistent facial features.`;
  };

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Скопировано в буфер обмена! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className={`space-y-6 text-slate-100 ${!animationsEnabled ? 'no-animations' : ''}`}>
      {/* 🚀 ВЕРХНЯЯ ПАНЕЛЬ И ПЕРЕКЛЮЧАТЕЛЬ ДОСТУПНОСТИ */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handleNovaFaceClick}
            title="Кликни по маске NOVA!"
            className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl hover:scale-110 active:scale-95 transition-transform"
          >
            {novaFaces[novaFaceIndex].face}
          </button>
          <div>
            <div className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
              <span>{novaFaces[novaFaceIndex].title}</span>
              {novaEasterFound && <span className="text-[10px] text-amber-400">★ Пасхалка</span>}
            </div>
            <div className="text-[11px] text-slate-400">Миссия 06: Дизайнер персонажей</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 border border-slate-700"
          >
            {animationsEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
            <span>{animationsEnabled ? 'Анимации: ВКЛ' : 'Анимации: ВЫКЛ'}</span>
          </button>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-xl">
            ⏱️ 90 минут • 7 уровней
          </span>
        </div>
      </div>

      {/* 🦸 ГЛАВНЫЙ БАННЕР МИССИИ */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-5 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold font-mono tracking-wider w-fit">
          <Users className="w-3.5 h-3.5" /> МИССИЯ 06 • AI MASCOT CREATOR
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Дизайнер персонажей: герой, который не меняет лицо
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Создай личного героя (AI for Life Mascot), который сохранит одинаковые черты лица, причёску и стиль во всех сценах до самого Демо-Дня!
        </p>
      </div>

      {/* 📡 ВХОДЯЩЕЕ СООБЩЕНИЕ ОТ NOVA */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/40 flex items-start gap-4">
        <div className="text-3xl shrink-0 p-2.5 rounded-2xl bg-purple-900/40 border border-purple-500/30">
          🤖
        </div>
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Входящий сигнал от NOVA
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            «Салом, AI Artist! 👋 Твой город Худжанд-2050 уже построен, но городу нужен житель. Сегодня ты создашь своего личного персонажа — <strong>AI for Life Mascot</strong>. Самое сложное в мире ИИ прямо сейчас — сделать так, чтобы он выглядел одинаково в любой ситуации. Это вызов даже для топ-разработчиков 2026 года. Начнём кастинг! 🟢»
          </p>
        </div>
      </div>

      {/* 📰 НОВОСТИ ИИ ЗА НЕДЕЛЮ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              Новости ИИ: Почему лицо «плывёт» в 2026 году?
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
            Дайджест индустрии
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {newsItems.map((n, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveNewsIndex(idx);
                addReward(5, `Прочитана новость: ${n.title}`);
              }}
              className={`p-3 rounded-2xl text-left text-xs font-bold transition-all border ${
                activeNewsIndex === idx
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] text-cyan-400 font-mono uppercase mb-1">{n.badge}</div>
              <div className="line-clamp-2">{n.title}</div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
          <h3 className="font-bold text-white text-sm">
            {newsItems[activeNewsIndex].title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {newsItems[activeNewsIndex].impact}
          </p>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono">
            💡 <strong>Вывод для нашей миссии:</strong> {newsItems[activeNewsIndex].takeaway}
          </div>
        </div>
      </div>

      {/* 🔥 УРОВЕНЬ 1 — ПРОБЛЕМА «МЕНЯЮЩЕГОСЯ ЛИЦА» */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Уровень 1: Эксперимент с меняющимся лицом
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            0–10 мин • +25 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Посмотри, что происходит, когда запрос сформулирован слишком коротко по сравнению с точным Паспортом персонажа:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setDemoState('vague')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              demoState === 'vague'
                ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/50'
                : 'bg-slate-950 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-400 font-mono">❌ КОРОТКИЙ ЗАПРОС</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-md border border-rose-800 font-mono">
                Разные люди
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 text-xs font-mono text-rose-200 mb-2">
              «Девушка-инженер с короткими тёмными волосами»
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              😱 Два запуска подряд дают абсолютно разных персонажей: один с азиатскими чертами, другой с европейскими; разный возраст, разная одежда и причёска.
            </p>
          </div>

          <div
            onClick={() => setDemoState('detailed')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              demoState === 'detailed'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">✅ ДЕТАЛЬНЫЙ ПАСПОРТ</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-800 font-mono">
                Высокая схожесть
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 text-xs font-mono text-emerald-200 mb-2">
              «Девушка 16 лет, короткие чёрные волосы до подбородка, карие глаза, зелёная куртка с жёлтой молнией-нашивкой»
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              🎯 Нейросеть цепляется за якорные признаки (длина волос, форма куртки, нашивка) и сохраняет образ стабильным!
            </p>
          </div>
        </div>
      </div>

      {/* 🧠 УРОВЕНЬ 2 — РАСШИФРОВКА: ПАСПОРТ ПЕРСОНАЖА */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Уровень 2: Из чего состоит Паспорт Персонажа?
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
            Формула успеха
          </span>
        </div>

        {/* Формула */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-950 border border-purple-500/40 text-center font-mono text-xs sm:text-sm font-black text-purple-200">
          ПАСПОРТ = 👤 ВНЕШНОСТЬ + 💭 ХАРАКТЕР + 📖 ИСТОРИЯ + ⚡ СПОСОБНОСТЬ
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
            <div className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
              <span>👤 ВНЕШНОСТЬ</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Точные детали: возраст, длина и цвет волос, цвет глаз, отличительная одежда и деталь (например, нашивка-молния или очки).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-1.5">
            <div className="font-bold text-pink-300 text-sm flex items-center gap-1.5">
              <span>💭 ХАРАКТЕР</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Темперамент и поведение: любопытный, дерзкий, осторожный, мечтательный, обожает чинить сломанное.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <span>📖 ИСТОРИЯ</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Откуда он взялся: вырос в горах, учился у дедушки-инженера, приехал в Худжанд развивать чистую энергию.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
              <span>⚡ СПОСОБНОСТЬ</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Главный навык: видит потоки солнечной энергии, чинит код за секунды, общается с роботами.
            </p>
          </div>
        </div>

        {/* Reference-приём карточка */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 font-mono uppercase">
            <Layers className="w-4 h-4" /> Reference-приём (Секрет профессионалов кино и анимации)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>1. Опиши</strong> внешность ОЧЕНЬ подробно (5–7 признаков).
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>2. Сохрани</strong> этот текст в заметках или портале как «Паспорт».
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <strong>3. Вставляй</strong> этот же текст + новую сцену каждый раз!
            </div>
          </div>
        </div>

        {/* Интерактивная матрица эмоций */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-pink-400" />
              Один герой — разные эмоции (Emotion Switcher):
            </span>
            <span className="text-[11px] text-pink-400 font-mono">
              [Паспорт] остаётся + меняется эмоция
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(emotionsData) as Array<keyof typeof emotionsData>).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedEmotion(key);
                  addReward(5, `Изучена эмоция: ${emotionsData[key].name}`);
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  selectedEmotion === key
                    ? 'bg-pink-950/70 border-pink-400 text-pink-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div>{emotionsData[key].name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{emotionsData[key].tag}</div>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <div className="text-pink-300 font-bold font-mono">
              Модификатор промпта для эмоции:
            </div>
            <div className="font-mono text-cyan-300 text-[11px]">
              «...[Паспорт], {emotionsData[selectedEmotion].promptModifier}»
            </div>
            <div className="text-slate-400 text-[11px] pt-1">
              {emotionsData[selectedEmotion].desc}
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 УРОВЕНЬ 3 — РОЛЕВАЯ ИГРА: КАСТИНГ ПЕРСОНАЖА */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Уровень 3: Ролевая игра «Кастинг персонажа»
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            25–40 мин • +25 ОП
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В киностудиях режиссёр проводит кастинг, чтобы отобрать лучшего актёра. Разбейтесь на пары на 10 минут:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
            <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <span>🎬 РОЛЬ 1: РЕЖИССЁР КАСТИНГА</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Задаёт партнёру 4 ключевых вопроса:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
              <li>«Как точно выглядит твой герой? Какая у него причёска и одежда?»</li>
              <li>«Какой у него характер, когда всё идёт не по плану?»</li>
              <li>«Откуда он родом и как оказался в Худжанде-2050?»</li>
              <li>«Какая его главная суперсила или способность?»</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
            <div className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
              <span>🎭 РОЛЬ 2: СОЗДАТЕЛЬ ПЕРСОНАЖА</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Отвечает подробно, на ходу придумывая яркие детали, и записывает удачные фразы в черновик Паспорта персонажа.
            </p>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-200 font-mono">
              💡 Через 5 минут поменяйтесь ролями, чтобы у каждого был готов черновик!
            </div>
          </div>
        </div>
      </div>

      {/* 🩺 УРОВЕНЬ 5A — ДОКТОР ПЕРСОНАЖА */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Уровень 5A: Доктор Персонажа (Разбор ошибок)
            </h3>
          </div>
          <span className="text-xs font-mono text-rose-300 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
            +25 ОП за пациента
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Выбери пациента, поставь точный диагноз и узнай рецепт лечения:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {patients.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePatient(idx);
                addReward(15, `Осмотрен пациент: ${p.badge}`);
              }}
              className={`p-3 rounded-2xl border text-xs text-left transition-all ${
                activePatient === idx
                  ? 'bg-rose-950/80 border-rose-400 text-rose-200 shadow-md shadow-rose-950/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bold">{p.badge}</div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2 text-xs">
          <div>
            <span className="text-slate-400 font-bold">Симптомы: </span>
            <span className="text-slate-200">{patients[activePatient].problem}</span>
          </div>
          <div>
            <span className="text-rose-400 font-bold">Диагноз: </span>
            <span className="text-rose-200 font-mono">{patients[activePatient].diagnosis}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono">
            💊 <strong>Рецепт лечения:</strong> {patients[activePatient].cure}
          </div>
        </div>
      </div>

      {/* 🎮 ИНТЕРАКТИВНЫЙ «ЖИВОЙ ПАСПОРТ ПЕРСОНАЖА» */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Интерактивный конструктор «Живой Паспорт Персонажа»
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800">
            ID-Card Generator
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Форма редактирования */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">ИМЯ ГЕРОЯ:</label>
                <input
                  type="text"
                  value={passport.name}
                  onChange={(e) => setPassport({ ...passport, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">ВОЗРАСТ:</label>
                <input
                  type="text"
                  value={passport.age}
                  onChange={(e) => setPassport({ ...passport, age: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">ВНЕШНОСТЬ (детали лица, волос, куртки):</label>
              <textarea
                rows={2}
                value={passport.appearance}
                onChange={(e) => setPassport({ ...passport, appearance: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">ХАРАКТЕР:</label>
              <input
                type="text"
                value={passport.personality}
                onChange={(e) => setPassport({ ...passport, personality: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">ИСТОРИЯ / СВЯЗЬ С ХУДЖАНДОМ:</label>
              <input
                type="text"
                value={passport.backstory}
                onChange={(e) => setPassport({ ...passport, backstory: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">ГЛАВНАЯ СУПЕРСИЛА / НАВЫК:</label>
              <input
                type="text"
                value={passport.ability}
                onChange={(e) => setPassport({ ...passport, ability: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Живая ID-карточка героя */}
          <div className="flex flex-col justify-between p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950/60 to-slate-950 border border-cyan-500/40 shadow-xl shadow-cyan-950/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    AI FOR LIFE • MASCOT ID
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">MISSION 06</span>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-white">{passport.name}</div>
                <div className="text-xs font-mono text-cyan-400">Возраст: {passport.age}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5 font-mono">
                <div><span className="text-slate-500">Внешность:</span> <span className="text-slate-200">{passport.appearance}</span></div>
                <div><span className="text-slate-500">Характер:</span> <span className="text-slate-200">{passport.personality}</span></div>
                <div><span className="text-slate-500">Суперсила:</span> <span className="text-emerald-300">{passport.ability}</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-slate-400">
                Готовый референс-промпт для портрета:
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 break-words line-clamp-2">
                {generateFullPrompt('close-up portrait, neutral calm expression')}
              </div>
              <button
                onClick={() => handleCopy(generateFullPrompt('close-up portrait, neutral calm expression'), 'id-prompt')}
                className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                {copiedKey === 'id-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'id-prompt' ? 'Скопировано в буфер!' : 'Скопировать референс-промпт'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📄 ШПАРГАЛКА — НА ОДИН ЭКРАН */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              Шпаргалка Миссии 06: Дизайнер персонажей
            </h3>
          </div>
          <button
            onClick={() =>
              handleCopy(
                `ШПАРГАЛКА МИССИИ 06:
ПАСПОРТ = Внешность + Характер + История + Способность
СЕКРЕТ: [Паспорт] + новая сцена каждый раз неизменно
ЭМОЦИИ: [Паспорт] остаётся, меняется только выражение лица
ПРАВИЛО: 5–7 точных признаков лучше, чем 20 расплывчатых
ЧЕСТНОСТЬ: Только уникальные персонажи — никаких чужих копий
GENERATE ≠ FINISHED | Проверяй · Не делись личным · Будь честным`,
                'cheat-sheet'
              )
            }
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5"
          >
            {copiedKey === 'cheat-sheet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Скопировать шпаргалку</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 leading-relaxed">
          <div><strong className="text-purple-300">ПАСПОРТ ПЕРСОНАЖА:</strong> Внешность + Характер + История + Способность</div>
          <div><strong className="text-cyan-300">СЕКРЕТ ПОСТОЯНСТВА:</strong> [Паспорт] + новая сцена — вставляй один и тот же текст внешности</div>
          <div><strong className="text-pink-300">ЭМОЦИИ:</strong> [Паспорт] неизменен, меняется только описание выражения лица</div>
          <div><strong className="text-amber-300">ПРАВИЛО 5–7:</strong> 5–7 точных признаков лучше, чем 20 расплывчатых слов</div>
          <div><strong className="text-emerald-300">ЧЕСТНОСТЬ И ЭТИКА:</strong> Только свои оригинальные персонажи, без чужих копий</div>
          <div className="pt-1 text-slate-500 border-t border-slate-900">GENERATE ≠ FINISHED • Проверяй · Не делись личным · Будь честным</div>
        </div>
      </div>

      {/* 📖 МИНИ-СЛОВАРЬ И ИНСТРУМЕНТЫ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Словарь */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Мини-словарь миссии
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-300 font-mono">Character consistency:</span> свойство героя выглядеть одинаково в разных сценах и позах.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-purple-300 font-mono">Reference (референс):</span> эталонное текстовое описание или картинка для повторения внешности.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-pink-300 font-mono">Mood/expression:</span> эмоция и мимика лица героя.
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-300 font-mono">Original Character (OC):</span> уникальный придуманный герой, а не копия из мультика.
            </div>
          </div>
        </div>

        {/* Инструменты */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            Инструменты для работы
          </h4>
          <div className="space-y-2 text-xs font-mono">
            <a
              href="https://labs.google/whisk"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-cyan-300 hover:border-cyan-400"
            >
              <span>Google Whisk (labs.google/whisk)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-purple-300 hover:border-purple-400"
            >
              <span>Google Gemini (gemini.google.com)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <span>Google Docs / Заметки:</span> хранить готовый текст Паспорта
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <span>Text-to-Speech (TTS):</span> для озвучки реплик героя в будущих миссиях
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
