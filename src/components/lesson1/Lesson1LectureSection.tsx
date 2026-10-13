import React, { useState } from 'react';
import {
  Brain,
  Layers,
  Cpu,
  ShieldCheck,
  FileText,
  BookOpen,
  ExternalLink,
  Gamepad2,
  Check,
  Rocket,
  Compass,
  Eye,
  AlertTriangle,
  RefreshCw,
  Search,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  Info
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

// Import newly generated high-resolution assets
import aiVsHumanImg from '../../assets/images/ai_vs_human_concept_1789981550527.jpg';

export const Lesson1LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Interactive Checklist: «Что ты сможешь после этого урока»
  const [checklist, setChecklist] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [allCheckedRewarded, setAllCheckedRewarded] = useState(false);

  // Active subtab inside Section 1 (Лекция урока)
  const [activeTab, setActiveTab] = useState<
    'concepts' | 'matryoshka' | 'tokens' | 'safety' | 'cheatsheet' | 'glossary' | 'sources' | 'play'
  >('concepts');

  // Token prediction interactive playground
  const [tokenStep, setTokenStep] = useState(0);
  const tokenSentences = [
    {
      text: 'Кот сидел на',
      options: [
        { word: 'тёплом коврике', prob: '68%' },
        { word: 'удобном диване', prob: '24%' },
        { word: 'космической ракете', prob: '8%' }
      ]
    },
    {
      text: 'Кот сидел на тёплом коврике и',
      options: [
        { word: 'громко мурлыкал', prob: '74%' },
        { word: 'внимательно наблюдал за птицей', prob: '21%' },
        { word: 'писал код на Python', prob: '5%' }
      ]
    },
    {
      text: 'Кот сидел на тёплом коврике и громко мурлыкал, пока',
      options: [
        { word: 'в комнате горел камин', prob: '62%' },
        { word: 'его не позвали на обед', prob: '31%' },
        { word: 'не наступила сингулярность', prob: '7%' }
      ]
    }
  ];

  // Abilities toggle: can AI do this?
  const [revealedAbility, setRevealedAbility] = useState<number | null>(null);

  // 3 Matryoshka layer expander
  const [expandedLayer, setExpandedLayer] = useState<number>(3);

  // Glossary search state
  const [glossarySearch, setGlossarySearch] = useState('');

  const toggleChecklist = (id: number) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    const count = Object.values(updated).filter(Boolean).length;
    if (count === 5 && !allCheckedRewarded) {
      setAllCheckedRewarded(true);
      addReward(25, '🎯 Все цели лекции приняты! (+25 Опыта)');
    }
  };

  const abilities = [
    {
      id: 1,
      icon: '📚',
      name: 'Учиться',
      example: 'Ты освоил новую сложную игру за 1 час',
      aiStatus: 'ИИ учится на гигантских массивах текстов и картинок (машинное обучение), но не через личный жизненный опыт.',
      badge: 'Умеет на примерах данных',
      color: 'from-blue-600/30 to-indigo-900/40 border-blue-500/40'
    },
    {
      id: 2,
      icon: '🧠',
      name: 'Помнить',
      example: 'Ты помнишь любимую песню, формулу или день рождения друга',
      aiStatus: 'ИИ хранит миллиарды параметров и связей, но у него нет личных воспоминаний, чувств и детства.',
      badge: 'Превосходит по объёму данных',
      color: 'from-purple-600/30 to-indigo-900/40 border-purple-500/40'
    },
    {
      id: 3,
      icon: '🔍',
      name: 'Рассуждать',
      example: 'Ты решаешь сложную задачу шаг за шагом',
      aiStatus: 'ИИ строит цепочки слов (пошаговое рассуждение), но не обладает реальным здравым смыслом физического мира.',
      badge: 'Имитирует логику',
      color: 'from-cyan-600/30 to-blue-900/40 border-cyan-500/40'
    },
    {
      id: 4,
      icon: '🎨',
      name: 'Творить',
      example: 'Ты придумал оригинальную историю, шутку или нарисовал комикс',
      aiStatus: 'Генеративный ИИ комбинирует известные фрагменты стилей и слов, создавая новое, но без искры души и замысла.',
      badge: 'Генерирует варианты',
      color: 'from-pink-600/30 to-purple-900/40 border-pink-500/40'
    },
    {
      id: 5,
      icon: '🔄',
      name: 'Адаптироваться',
      example: 'Ты перешел в новую школу и быстро освоился в незнакомой обстановке',
      aiStatus: 'Человек мгновенно меняет поведение в неизвестной среде. ИИ требует точного промпта или переобучения.',
      badge: 'Человек сильнее 🏆',
      color: 'from-amber-600/30 to-orange-900/40 border-amber-500/40'
    },
    {
      id: 6,
      icon: '❤️',
      name: 'Понимать людей',
      example: 'Ты чувствуешь, когда твоему другу грустно, и поддерживаешь его',
      aiStatus: 'У нейросети НЕТ эмоций, боли, сопереживания и радости. Она лишь подбирает вежливые фразы по формулам.',
      badge: 'Только Человек! ❤️',
      color: 'from-rose-600/30 to-red-900/40 border-rose-500/40'
    }
  ];

  const glossaryTerms = [
    {
      term: 'Искусственный интеллект (ИИ / AI)',
      transcription: 'Artificial Intelligence',
      definition: 'Компьютерные программы и системы, способные решать задачи, требующие интеллектуальных способностей человека: понимание языка, распознавание объектов, навигация, перевод.'
    },
    {
      term: 'Машинное обучение (ML)',
      transcription: 'Machine Learning',
      definition: 'Способ создания программ, при котором модель учится на тысячах и миллионах примеров, находя скрытые закономерности самостоятельно, вместо жесткого написания правил программистом.'
    },
    {
      term: 'Генеративный искусственный интеллект (GenAI)',
      transcription: 'Generative AI',
      definition: 'Современное поколение нейросетей, способных не просто анализировать или классифицировать информацию, а создавать совершенно новый оригинальный контент: текст, код, картинки, звук и видео.'
    },
    {
      term: 'Большая языковая модель (LLM)',
      transcription: 'Large Language Model',
      definition: 'Нейросеть огромного масштаба (сотни миллиардов параметров), обученная на текстах интернета и книг, способная вести диалог, отвечать на вопросы и писать эссе на естественном языке.'
    },
    {
      term: 'Промпт (Prompt)',
      transcription: 'Промпт / Запрос-инструкция',
      definition: 'Твоя текстовая инструкция, вопрос или контекст, который ты передаешь нейросети. Чем точнее сформулирован промпт, тем полезнее и качественнее ответ.'
    },
    {
      term: 'Вывод (Output)',
      transcription: 'Вывод / Ответ модели',
      definition: 'Результат работы нейросети: готовый текст, сгенерированный рисунок, строка программного кода или решение задачи.'
    },
    {
      term: 'Токен (Token)',
      transcription: 'Токен / Фрагмент слова',
      definition: 'Минимальный кусочек текста (обычно 3–4 символа, слог или знак препинания), которым оперирует языковая модель при чтении и создании предложений.'
    },
    {
      term: 'Предсказание следующего токена',
      transcription: 'Next-Token Prediction',
      definition: 'Базовый механизм работы языковых моделей: на каждом шаге модель математически вычисляет вероятность того, какое именно слово или слог должно идти следующим.'
    },
    {
      term: 'Галлюцинация (Hallucination)',
      transcription: 'Галлюцинация нейросети',
      definition: 'Опасная ошибка модели, когда она абсолютно уверенным и авторитетным тоном выдумывает несуществующие факты, авторов книг, исторические даты или научные законы.'
    },
    {
      term: 'Предвзятость данных (Bias)',
      transcription: 'Смещение / Искажение',
      definition: 'Необъективность или стереотипы в ответах нейросети, возникающие из-за того, что обучающие тексты из интернета содержали человеческие предрассудки.'
    },
    {
      term: 'Проверка фактов (Fact-checking)',
      transcription: 'Фактчекинг',
      definition: 'Обязательное правило исследователя: сверка утверждений нейросети через надежные первоисточники, энциклопедии, учебники и повторный пересчет цифр.'
    },
    {
      term: 'Пошаговое рассуждение',
      transcription: 'Цепочка мыслей / Chain of Thought',
      definition: 'Инструкция для модели решать сложную задачу поэтапно, рассуждая вслух, что резко уменьшает вероятность случайных ошибок и галлюцинаций.'
    }
  ];

  const filteredGlossary = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.transcription.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* 🖼️ ВВОДНАЯ МИССИЯ (HERO BANNER) */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-5 sm:p-8 md:p-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <Rocket className="w-3.5 h-3.5" /> Урок 1 • AI Исследователь
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-cyan-300 font-bold text-xs">
            ⏱️ 90 минут • Учебное пособие ученика
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Что такое интеллект? 🤖
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-cyan-200 font-medium max-w-3xl leading-relaxed">
          <span className="text-amber-400 font-bold">
            Учись → Пробуй → Создавай → Тестируй → Улучшай → Делись.
          </span>{' '}
          Не бойся ошибок: нейросеть тоже ошибается! Твоя задача — не просто копировать ответ, а научиться{' '}
          <span className="underline decoration-cyan-400 decoration-2 font-bold text-white">
            критически проверять и улучшать результат
          </span>
          . 😎
        </p>
      </div>

      {/* 🎯 ЧТО ТЫ СМОЖЕШЬ ПОСЛЕ ЭТОГО УРОКА (Интерактивный чек-лист) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-base">
              🎯
            </span>
            Что ты сможешь после этого урока:
          </h3>
          <span className="text-xs sm:text-sm font-bold text-cyan-400 font-mono bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
            Отмечено: {Object.values(checklist).filter(Boolean).length} из 5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 1, text: 'Объяснить, что такое интеллект, ИИ, машинное обучение и генеративный ИИ (3 матрёшки)' },
            { id: 2, text: 'Сказать, что ИИ умеет отлично, а что делает плохо (Сгенерировано ≠ Готово)' },
            { id: 3, text: 'Провести свой первый сравнительный эксперимент (ChatGPT против Gemini)' },
            { id: 4, text: 'Найти ошибку в ответе нейросети и проверить её 3 надёжными способами' },
            { id: 5, text: 'Безопасно работать с ИИ (без паролей, личных документов и без банковских карт)' }
          ].map((item) => {
            const checked = checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                  checked
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100 shadow-md shadow-emerald-950/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                    checked
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                      : 'border-slate-600 bg-slate-900 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
                <span className={`text-sm sm:text-base leading-snug font-medium ${checked ? 'line-through opacity-80' : ''}`}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🗺️ МАРШРУТ УРОКА: 6 ШАГОВ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-400" />
          Маршрут урока: 6 шагов к мастерству
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '1. Учись', icon: '🧠', desc: 'Интеллект & ИИ', where: '1. Лекция урока', color: 'border-blue-500/40 bg-blue-950/30 text-blue-300' },
            { step: '2. Пробуй', icon: '🎭', desc: 'Человек или ИИ?', where: '2. Лабораторная', color: 'border-purple-500/40 bg-purple-950/30 text-purple-300' },
            { step: '3. Создавай', icon: '🛠️', desc: 'Школьный помощник', where: '2. Лабораторная', color: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300' },
            { step: '4. Тестируй', icon: '🔍', desc: 'Поиск ошибок', where: '3. Проверка знаний', color: 'border-amber-500/40 bg-amber-950/30 text-amber-300' },
            { step: '5. Улучшай', icon: '⚡', desc: 'Прокачка промпта', where: '3. Проверка знаний', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' },
            { step: '6. Делись', icon: '🎤', desc: 'Рассказ за 30 сек', where: '4. Домашнее задание', color: 'border-rose-500/40 bg-rose-950/30 text-rose-300' },
          ].map((s, idx) => (
            <div key={idx} className={`p-3.5 rounded-2xl border ${s.color} space-y-1 text-center transition-all hover:scale-105`}>
              <div className="text-2xl">{s.icon}</div>
              <div className="font-black text-sm sm:text-base text-white">{s.step}</div>
              <div className="text-xs font-semibold">{s.desc}</div>
              <div className="text-[11px] opacity-75 font-mono">{s.where}</div>
            </div>
          ))}
        </div>
      </div>

      {/* НАВИГАЦИОННЫЕ ВКЛАДКИ РАЗДЕЛА 1 */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'concepts', label: '1️⃣ Интеллект & Человек vs ИИ', icon: Brain },
          { id: 'matryoshka', label: '2️⃣ Три «Матрёшки» (ИИ ⊃ ML ⊃ GenAI)', icon: Layers },
          { id: 'tokens', label: '3️⃣ Как создаётся ответ & Токены', icon: Cpu },
          { id: 'safety', label: '4️⃣ Ограничения & Безопасность', icon: ShieldCheck },
          { id: 'cheatsheet', label: '📋 Шпаргалка (Cheat Sheet)', icon: FileText },
          { id: 'glossary', label: '📖 Словарь (Глоссарий)', icon: BookOpen },
          { id: 'sources', label: '🔗 Источники и инструменты', icon: ExternalLink },
          { id: 'play', label: '🎮 Поиграть и разобраться', icon: Gamepad2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 ${
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

      {/* ВКЛАДКА 1: ИНТЕЛЛЕКТ & ЧЕЛОВЕК VS ИИ */}
      {activeTab === 'concepts' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 6 граней интеллекта */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Блок 1</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                1️⃣ Что значит «быть умным»? 6 граней интеллекта
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Когда мы говорим про человека «он умный», что именно он делает? Нажми на любую карточку, чтобы узнать:{' '}
                <strong className="text-cyan-300">может ли нейросеть делать то же самое?</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {abilities.map((ab) => {
                const isRevealed = revealedAbility === ab.id;
                return (
                  <div
                    key={ab.id}
                    onClick={() => setRevealedAbility(isRevealed ? null : ab.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-gradient-to-br ${ab.color} hover:scale-[1.02] space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{ab.icon}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-slate-700">
                        {isRevealed ? 'Скрыть разбор' : 'Нажми для проверки'}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{ab.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      <strong>Пример из жизни:</strong> {ab.example}
                    </p>

                    {isRevealed && (
                      <div className="pt-2 border-t border-slate-700/60 animate-in fade-in space-y-1.5">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {ab.badge}
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-2.5 rounded-xl">
                          {ab.aiStatus}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Сравнение: Человек vs ИИ */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Блок 2</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                2️⃣ Человек против ИИ: В чём разница?
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Нейросеть не мыслит как человек — она работает со статистикой вероятностей слов:
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Человек */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-black text-base">
                      <span className="text-xl">🧑</span> ЧЕЛОВЕК
                    </div>
                    <div className="font-mono text-xs text-amber-200/80">Человек → Мозг → Жизненный опыт → Осознанное решение</div>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                      <li>Учится на личном опыте, людях и ошибках</li>
                      <li>Творит из реальной жизни и переживаний</li>
                      <li>Понимает скрытый смысл, контекст и тонкий юмор</li>
                      <li>Сомневается, перепроверяет и задаёт вопросы</li>
                      <li><strong>Несёт полную моральную ответственность</strong></li>
                    </ul>
                  </div>

                  {/* ИИ */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-black text-base">
                      <span className="text-xl">🤖</span> НЕЙРОСЕТЬ (ИИ)
                    </div>
                    <div className="font-mono text-xs text-cyan-200/80">ИИ → Обучающие данные → Модель → Промпт → Сгенерированный ответ</div>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                      <li>Обучается на миллионах терабайт интернет-текстов</li>
                      <li>Выдаёт ответы с колоссальной скоростью (секунды)</li>
                      <li>Находит неочевидные паттерны и связи данных</li>
                      <li>Может ошибаться <strong>с абсолютной уверенностью</strong></li>
                      <li>Ответственность всегда остаётся на человеке</li>
                    </ul>
                  </div>
                </div>

                {/* Формула команды */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-slate-900 border border-emerald-500/50 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 text-2xl shrink-0">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-emerald-300">
                      Золотая формула успеха: Человек + ИИ
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                      ИИ помогает ускорить рутину и предлагает варианты. Человек —{' '}
                      <strong>направляет, перепроверяет факты и принимает окончательное решение</strong>.
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 2: ТРИ МАТРЁШКИ */}
      {activeTab === 'matryoshka' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Блок 3</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              2️⃣ Концепция трёх «Матрёшек»: ИИ ⊃ Машинное обучение ⊃ Генеративный ИИ
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Каждая следующая матрёшка находится внутри предыдущей. Нажимай на уровни, чтобы раскрыть подробности:
            </p>
          </div>

          <div className="space-y-3">
            {/* 1. Внешняя матрёшка: ИИ */}
            <div
              onClick={() => setExpandedLayer(1)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                expandedLayer === 1
                  ? 'bg-blue-950/70 border-blue-400 shadow-xl shadow-blue-950/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🪆</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-blue-300">
                      1. Искусственный интеллект (ИИ / AI) — Внешняя матрёшка
                    </h3>
                    <p className="text-xs text-slate-400">Все программы, решающие интеллектуальные задачи</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-900/80 text-blue-200 border border-blue-700">
                  Самый широкий круг
                </span>
              </div>
              {expandedLayer === 1 && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-blue-800/40 text-xs sm:text-sm text-slate-300 space-y-2 animate-in fade-in">
                  <p><strong>Простыми словами:</strong> Любая программа, решающая задачи «человеческого ума».</p>
                  <p><strong>Примеры из жизни:</strong> Боты в шахматах, алгоритм расчета пробок в навигаторе, рекомендация видео в ленте.</p>
                </div>
              )}
            </div>

            {/* 2. Средняя матрёшка: ML */}
            <div
              onClick={() => setExpandedLayer(2)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                expandedLayer === 2
                  ? 'bg-purple-950/70 border-purple-400 shadow-xl shadow-purple-950/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧩</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-purple-300">
                      2. Машинное обучение (Machine Learning / ML) — Средняя матрёшка
                    </h3>
                    <p className="text-xs text-slate-400">Программы, которые обучаются на массивах данных</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-900/80 text-purple-200 border border-purple-700">
                  Внутри ИИ
                </span>
              </div>
              {expandedLayer === 2 && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-purple-800/40 text-xs sm:text-sm text-slate-300 space-y-2 animate-in fade-in">
                  <p><strong>Простыми словами:</strong> Программа, которая учится на миллионах примеров, а не на жестких правилах, написанных человеком.</p>
                  <p><strong>Примеры из жизни:</strong> Спам-фильтр в почте (понимает подозрительные письма), распознавание лица при разблокировке смартфона.</p>
                </div>
              )}
            </div>

            {/* 3. Внутренняя матрёшка: Generative AI */}
            <div
              onClick={() => setExpandedLayer(3)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                expandedLayer === 3
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-xl shadow-cyan-950/50'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-cyan-300">
                      3. Генеративный ИИ (Generative AI) — Внутренняя матрёшка (Ядро)
                    </h3>
                    <p className="text-xs text-slate-400">Модели, создающие НОВЫЙ контент по твоему промпту</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-900/80 text-cyan-200 border border-cyan-700">
                  Самое современное
                </span>
              </div>
              {expandedLayer === 3 && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-cyan-800/40 text-xs sm:text-sm text-slate-300 space-y-2 animate-in fade-in">
                  <p><strong>Простыми словами:</strong> ИИ, который не просто классифицирует, а сам создаёт новые тексты, картинки, музыку, код и диалоги.</p>
                  <p><strong>Примеры:</strong> ChatGPT, Gemini, Midjourney, Claude, Suno (генерация музыки).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 3: ТОКЕНЫ & КАК СОЗДАЁТСЯ ОТВЕТ */}
      {activeTab === 'tokens' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Блок 4</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                3️⃣ Как создаётся ответ: Предсказание следующего токена
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Нейросеть не «думает» как философ. Она смотрит на твои слова и вычисляет математическую вероятность:{' '}
                <strong className="text-cyan-300">какое слово логичнее всего должно идти следующим?</strong>
              </p>
            </div>

            {/* Интерактивный симулятор токенов */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase">
                Интерактивный симулятор предсказания токена:
              </div>
              <div className="p-4 rounded-xl bg-slate-900 text-base sm:text-lg font-mono text-cyan-300 border border-slate-800">
                «{tokenSentences[tokenStep].text} <span className="animate-pulse text-amber-400">...</span>»
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400">
                  Модель оценивает вероятности следующего фрагмента (токена):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {tokenSentences[tokenStep].options.map((opt, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between ${
                        i === 0
                          ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>«{opt.word}»</span>
                      <span className="font-mono font-bold">{opt.prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setTokenStep((prev) => (prev + 1) % tokenSentences.length)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Сгенерировать следующий токен
                </button>
                <span className="text-xs text-slate-400 text-center sm:text-right">
                  Именно поэтому ответ звучит так уверенно, даже если модель ошиблась!
                </span>
              </div>
            </div>
          </div>

          {/* 8 мест где ИИ рядом с нами */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Блок 5</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Где ИИ был рядом с тобой вчера? (8 точек контакта)
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Вспомни свой день. Скорее всего, ты встретил алгоритмы минимум в 3 из этих мест:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '📱', name: 'Face ID', desc: 'Разблокировка смартфона по геометрии лица' },
                { icon: '🎵', name: 'Рекомендации', desc: 'Подбор музыки и видео по твоим вкусам' },
                { icon: '🗺️', name: 'Навигатор', desc: 'Расчет объезда пробок и быстрого маршрута' },
                { icon: '🌐', name: 'Переводчик', desc: 'Мгновенный перевод страниц и вывесок' },
                { icon: '🗣️', name: 'Голосовой ассистент', desc: 'Алиса, Siri, Google Assistant' },
                { icon: '🎮', name: 'Игры', desc: 'Умные боты и процедурная генерация уровней' },
                { icon: '✉️', name: 'Спам-фильтр', desc: 'Автоматическая очистка входящей почты' },
                { icon: '📸', name: 'Камера', desc: 'Улучшение ночных снимков и стабилизация' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1.5 hover:border-amber-500/40 transition-all">
                  <div className="text-2xl">{item.icon}</div>
                  <h4 className="font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 4: ОГРАНИЧЕНИЯ & БЕЗОПАСНОСТЬ */}
      {activeTab === 'safety' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Ограничения */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Блок 6</span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                Ограничения ИИ (Криптонит искусственного интеллекта)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { title: 'Галлюцинации', desc: 'ИИ может выдумать несуществующий факт, автора, цитату или дату и подать это с абсолютной уверенностью.', icon: '👻' },
                { title: 'Ошибки в вычислениях', desc: 'В сложной арифметике или подсчете букв языковая модель может ошибиться, потому что считает токенами, а не калькулятором.', icon: '🧮' },
                { title: 'Устаревшие сведения', desc: 'Если у модели нет онлайн-поиска, она не знает новости сегодняшнего утра.', icon: '⏳' },
                { title: 'Предвзятость данных', desc: 'Модель учится на текстах из интернета, где иногда встречаются человеческие стереотипы.', icon: '⚖️' },
                { title: 'Нет жизненного опыта', desc: 'Нейросеть никогда не ела мороженое, не гуляла под дождем и не отвечает за последствия советов.', icon: '💔' },
                { title: 'Зависимость от промпта', desc: 'Нечеткий запрос = размытый результат. Каков промпт — таков и ответ.', icon: '🎯' }
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-300 text-sm sm:text-base">
                    <span className="text-xl">{c.icon}</span> {c.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* ЗОЛОТОЕ ПРАВИЛО: Сгенерировано ≠ Готово */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-amber-950/40 to-slate-900 border-2 border-amber-400/80 shadow-xl space-y-1 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
              <div className="text-4xl shrink-0">🧠</div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-amber-300 tracking-wide">
                  ЗОЛОТОЕ ПРАВИЛО: СГЕНЕРИРОВАНО ≠ ГОТОВО (Generate ≠ Finished)
                </h3>
                <p className="text-xs sm:text-sm text-slate-200">
                  Ответ нейросети — это только <strong>черновик для размышлений</strong>. Проверь его, улучши своими словами и только тогда используй в деле!
                </p>
              </div>
            </div>
          </div>

          {/* 6 Правил безопасности */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Блок 7</span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                6 Правил безопасной работы с нейросетями
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { num: '1', title: 'Не публикуй пароли и ключи', desc: 'Никогда не отправляй в диалог пароли от почты, пин-коды от аккаунтов или токены доступа.' },
                { num: '2', title: 'Не загружай чужие документы', desc: 'Паспорта, медицинские справки, личные переписки и чужие фото защищены законом о приватности.' },
                { num: '3', title: 'Не указывай домашний адрес и телефон', desc: 'Не сообщай нейросети точный домашний адрес, номер школы и свои персональные данные.' },
                { num: '4', title: 'Проверяй важные факты (Правило 2 источников)', desc: 'Сверяй цифры, формулы, цитаты и исторические даты по проверенным учебникам и энциклопедиям.' },
                { num: '5', title: 'Соблюдай академическую честность', desc: 'Если нейросеть помогла с проектом или докладом — честно укажи это. Не выдавай черновик бота за свой авторский труд.' },
                { num: '6', title: 'Работа без банковских карт', desc: 'Пользуйся бесплатными тарифами через аккаунты родителей или ментора. Банковские карты вводить категорически не нужно!' }
              ].map((rule) => (
                <div key={rule.num} className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold shrink-0">
                    {rule.num}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm sm:text-base text-white">{rule.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 5: ШПАРГАЛКА (CHEAT SHEET) */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Экспресс-памятка
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  📋 ШПАРГАЛКА УРОКА 1 (CHEAT SHEET)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
                Всё главное на одном экране
              </span>
            </div>

            {/* Ключевые тезисы в виде сетки */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-2">
                <div className="font-bold text-blue-300 text-sm flex items-center gap-2">
                  <span>🪆</span> Три матрёшки
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>ИИ (AI)</strong> — широкая область «умных» задач.<br />
                  <strong>ML</strong> — обучение на данных.<br />
                  <strong>GenAI</strong> — создание нового (текст, код, фото, звук).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="font-bold text-purple-300 text-sm flex items-center gap-2">
                  <span>⚡</span> Как думает модель
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Модель не понимает смысл жизни. Она делит текст на <strong>токены</strong> и предсказывает наиболее вероятное следующее слово (<strong>Next-Token</strong>).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <span>🧠</span> Главное правило
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Сгенерировано ≠ Готово.</strong> Любой ответ нейросети — это черновик. Проверяй факты, пересчитывай цифры и добавляй свои мысли!
                </p>
              </div>
            </div>

            {/* Сводная таблица понятий */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950">
                    <th className="p-3.5 font-bold text-cyan-300">Понятие</th>
                    <th className="p-3.5 font-bold text-slate-200">Суть простыми словами</th>
                    <th className="p-3.5 font-bold text-amber-300">Пример или применение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Человек vs ИИ</td>
                    <td className="p-3.5 text-slate-300">Человек понимает смысл и чувствует. ИИ — находит шаблоны в данных с колоссальной скоростью.</td>
                    <td className="p-3.5 text-amber-200 font-mono">Человек + ИИ = лучший тандем</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Галлюцинация</td>
                    <td className="p-3.5 text-slate-300">Выдуманный, но крайне уверенно поданный факт от нейросети.</td>
                    <td className="p-3.5 text-amber-200 font-mono">Выдуманная книга или дата</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Промпт (Prompt)</td>
                    <td className="p-3.5 text-slate-300">Инструкция и задание для модели. Четкий контекст дает лучший результат.</td>
                    <td className="p-3.5 text-amber-200 font-mono">Роль + Цель + Контекст</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Фактчекинг (3 способа)</td>
                    <td className="p-3.5 text-slate-300">1) Второй независимый источник; 2) Ручной пересчет формул; 3) Проверка цитат и ссылок.</td>
                    <td className="p-3.5 text-amber-200 font-mono">Никогда не доверяй на слово</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Безопасность</td>
                    <td className="p-3.5 text-slate-300">Никаких паролей, личных адресов, чужих фото и ввода банковских карт.</td>
                    <td className="p-3.5 text-amber-200 font-mono">Бесплатный аккаунт ментора</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 6: СЛОВАРЬ (ГЛОССАРИЙ / GLOSSARY) */}
      {activeTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Справочник понятий
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                  📖 СЛОВАРЬ ТЕРМИНОВ УРОКА (GLOSSARY)
                </h2>
              </div>

              {/* Поисковая строка словаря */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск по терминам..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Каждый термин переведен и объяснен простыми словами без заумного академического языка:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-white">{item.term}</h4>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-800/60 shrink-0">
                      {item.transcription}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                Терминов по запросу «{glossarySearch}» не найдено. Попробуй другой запрос.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ВКЛАДКА 7: 🔗 ИСТОЧНИКИ И ИНСТРУМЕНТЫ (SOURCES & TOOLS) */}
      {activeTab === 'sources' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Ресурсы исследователя
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <ExternalLink className="w-6 h-6 text-cyan-400" />
                🔗 ИСТОЧНИКИ И ИНСТРУМЕНТЫ (SOURCES & TOOLS)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Официальные, проверенные и бесплатные нейросети и ресурсы для практики (без установки и без привязки карт):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  name: 'ChatGPT (OpenAI)',
                  url: 'https://chatgpt.com',
                  desc: 'Диалоговый помощник для мозгового штурма, объяснения школьных тем и написания текстов.',
                  tag: 'Бесплатно'
                },
                {
                  name: 'Google Gemini',
                  url: 'https://gemini.google.com',
                  desc: 'Мультимодальная нейросеть от Google с выходом в поиск и проверкой свежих фактов.',
                  tag: 'Google Аккаунт'
                },
                {
                  name: 'Claude (Anthropic)',
                  url: 'https://claude.ai',
                  desc: 'Нейросеть с упором на безопасность, академический тон и длинные рассуждения.',
                  tag: 'Бесплатный тариф'
                },
                {
                  name: 'DeepL Translator',
                  url: 'https://www.deepl.com/translator',
                  desc: 'Самый точный нейросетевой переводчик с учетом тонких контекстов и идиом.',
                  tag: 'Без регистрации'
                },
                {
                  name: 'Википедия (Wikipedia)',
                  url: 'https://ru.wikipedia.org',
                  desc: 'Главный инструмент фактчекинга для проверки дат, авторов и событий из ответов ИИ.',
                  tag: 'Фактчекинг'
                },
                {
                  name: 'Wolfram Alpha',
                  url: 'https://www.wolframalpha.com',
                  desc: 'Вычислительный движок знаний для точной проверки математики и сложных формул.',
                  tag: 'Математика'
                }
              ].map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm sm:text-base text-cyan-300 group-hover:text-cyan-200">
                        {src.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                        {src.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{src.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-cyan-400 pt-2 border-t border-slate-900">
                    <span>Перейти на сайт</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>

            {/* Памятка безопасности */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Памятка доступа для школьника:</strong> Используй школьный аккаунт или аккаунт родителей.
                Если какой-либо сайт просит ввести номер банковской карты —{' '}
                <strong className="underline">немедленно закрой его!</strong> Все задачи нашего курса выполняются
                на 100% бесплатных инструментах.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА 8: 🎮 ПОИГРАТЬ И РАЗОБРАТЬСЯ (ПО ЖЕЛАНИЮ) */}
      {activeTab === 'play' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-purple-500/40 shadow-2xl space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Интерактивные песочницы
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-purple-400" />
                🎮 ПОИГРАТЬ И РАЗОБРАТЬСЯ (ПО ЖЕЛАНИЮ)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Хочешь почувствовать нейросети в действии своими руками? Запусти эти интерактивные эксперименты:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Игра 1: Quick, Draw! */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🎨</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                      Google Эксперимент
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    «Быстрый рисунок» (Quick, Draw!)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Нейросеть даёт задание нарисовать предмет за 20 секунд (например, кота или самолёт) и в реальном
                    времени угадывает твои штрихи. Это живая демонстрация компьютерного зрения и машинного обучения!
                  </p>
                </div>
                <a
                  href="https://quickdraw.withgoogle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Сыграть в Quick, Draw!</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Игра 2: Teachable Machine */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">🤖</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Без программирования
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white">
                    «Обучаемая машина» (Teachable Machine)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Обучи свою собственную модель машинного обучения прямо в веб-камере за 5 минут! Покажи жесты
                    руками (лайк / дизлайк) или звуки, и модель научится безошибочно различать их.
                  </p>
                </div>
                <a
                  href="https://teachablemachine.withgoogle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Открыть Teachable Machine</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Встроенная мини-игра: Интуиция токенов */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Мини-тест на интуицию: «Какое слово выберет ИИ?»
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Представь, что в чат введено начало фразы: <em>«Ученик сел за парту, открыл тетрадь и...»</em>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {[
                  { word: 'взял ручку', prob: '82% вероятности (ИИ выберет это!)' },
                  { word: 'задумался о космосе', prob: '14% вероятности' },
                  { word: 'уснул на столе', prob: '4% вероятности' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                    <div className="font-bold text-cyan-300">«{item.word}»</div>
                    <div className="text-[11px] text-slate-400 mt-1">{item.prob}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
