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
  Info,
  Copy,
  Sliders,
  SlidersHorizontal,
  Terminal,
  ArrowRight,
  TrendingUp,
  Flame,
  Lightbulb,
  CheckSquare
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

// Import newly generated high-resolution assets for Lesson 2
import badgePromptEngineer from '../../assets/images/lesson2_badge_1790069881096.jpg';

export const Lesson2LectureSection: React.FC = () => {
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

  // Active subtab inside Section 1 (Лекция урока) - exactly the 8 subsections requested
  const [activeTab, setActiveTab] = useState<
    'concepts' | 'matryoshka' | 'tokens' | 'safety' | 'cheatsheet' | 'glossary' | 'sources' | 'play'
  >('concepts');

  // Copy notification states
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  // Abilities toggle: Human vs AI in Prompting
  const [revealedAbility, setRevealedAbility] = useState<number | null>(null);

  // 3 Matryoshka layer expander
  const [expandedLayer, setExpandedLayer] = useState<number>(3);

  // Glossary search state
  const [glossarySearch, setGlossarySearch] = useState('');

  // Interactive Temperature Playground
  const [sliderTemp, setSliderTemp] = useState<number>(0.7);

  // Boss Prompt Builder state
  const [builderRole, setBuilderRole] = useState<'smm' | 'tutor' | 'analyst'>('smm');
  const [builderTask, setBuilderTask] = useState<'post' | 'study_plan' | 'audit'>('post');
  const [builderContext, setBuilderContext] = useState<'khujand' | 'school' | 'startup'>('khujand');
  const [builderFormat, setBuilderFormat] = useState<'table' | 'bullet' | 'json'>('table');
  const [builderConstraints, setBuilderConstraints] = useState<'strict' | 'creative' | 'safe'>('strict');
  const [builderCopied, setBuilderCopied] = useState(false);

  // Lazy vs Boss Prompt Case Switcher
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [showBossResult, setShowBossResult] = useState<boolean>(true);

  const toggleChecklist = (id: number) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    const count = Object.values(updated).filter(Boolean).length;
    if (count === 5 && !allCheckedRewarded) {
      setAllCheckedRewarded(true);
      addReward(25, '🎯 Все цели Урока 2 приняты! (+25 Опыта)');
    }
  };

  const abilities = [
    {
      id: 1,
      icon: '🎯',
      name: 'Целеполагание (Зачем?)',
      example: 'Ты знаешь, зачем пишется пост: привлечь гостей в кафе у набережной Сырдарьи',
      aiStatus: 'ИИ не имеет собственных желаний и целей. Он начинает думать только тогда, когда человек задал вектор задачи.',
      badge: 'Человек — Архитектор 🏆',
      color: 'from-blue-600/30 to-indigo-900/40 border-blue-500/40'
    },
    {
      id: 2,
      icon: '🎭',
      name: 'Выбор экспертной роли (Кто?)',
      example: 'Ты говоришь модели: «Действуй как шеф-маркетолог ресторанов Худжанда»',
      aiStatus: 'ИИ активирует нужный сегмент словарного запаса и стилистики из обучающего корпуса, настраивая профессиональный тон.',
      badge: 'ИИ подстраивает стиль',
      color: 'from-purple-600/30 to-indigo-900/40 border-purple-500/40'
    },
    {
      id: 3,
      icon: '📍',
      name: 'Локальный контекст (Где и для кого?)',
      example: 'Ты указываешь: валюта сомони (TJS), рынок Панджшанбе, молодежная аудитория',
      aiStatus: 'Без указания локации ИИ выдаст абстрактный текст в долларах или рублях. Только человек связывает ИИ с реальностью.',
      badge: 'Локальная специфика 🇹🇯',
      color: 'from-cyan-600/30 to-blue-900/40 border-cyan-500/40'
    },
    {
      id: 4,
      icon: '📋',
      name: 'Форматирование (В каком виде?)',
      example: 'Ты требуешь: «Markdown-таблица из 3 колонок, не более 150 слов»',
      aiStatus: 'ИИ математически структурирует вывод по строгим шаблонам (таблицы, списки, JSON, код) без лишней «воды».',
      badge: 'ИИ структурирует данные',
      color: 'from-pink-600/30 to-purple-900/40 border-pink-500/40'
    },
    {
      id: 5,
      icon: '⛔',
      name: 'Ограничения (Чего нельзя?)',
      example: 'Ты запрещаешь: «Без штампов "окунитесь в мир вкуса", без клише и воды»',
      aiStatus: 'Ограничения отсекают самые высоковероятные банальные токены, заставляя нейросеть искать свежие формулировки.',
      badge: 'Фильтр банальностей ⚡',
      color: 'from-amber-600/30 to-orange-900/40 border-amber-500/40'
    },
    {
      id: 6,
      icon: '🕵️',
      name: 'Аудит и ответственность (Правда ли это?)',
      example: 'Ты проверяешь цены блюд, контакты и факт существования улицы',
      aiStatus: 'Generate ≠ Finished! Ответ ИИ — это всегда черновик. Человек несёт 100% юридическую и моральную ответственность.',
      badge: 'Человек проверяет факты! 🛡️',
      color: 'from-rose-600/30 to-red-900/40 border-rose-500/40'
    }
  ];

  const glossaryTerms = [
    {
      term: 'Промпт (Prompt)',
      transcription: 'Prompt / Запрос-инструкция',
      definition: 'Входящее текстовое сообщение человека, содержащее задачу, контекст, образцы и ограничения, направляющее генерацию языковой модели.'
    },
    {
      term: 'Промпт-инжиниринг (Prompt Engineering)',
      transcription: 'Prompt Engineering',
      definition: 'Дисциплина проектирования и оптимизации запросов для извлечения максимально точных, структурированных и профессиональных ответов от LLM.'
    },
    {
      term: 'Системный промпт (System Prompt)',
      transcription: 'System Instructions / Role',
      definition: 'Инструкция высшего приоритета, задающая глобальную роль, правила поведения, моральные рамки и формат ответов модели до начала диалога с пользователем.'
    },
    {
      term: 'Пользовательский промпт (User Prompt)',
      transcription: 'User Message',
      definition: 'Текущий конкретный вопрос или команда пользователя в ходе активного диалога.'
    },
    {
      term: 'Контекстное окно (Context Window)',
      transcription: 'Context Window / Memory',
      definition: 'Оперативная память диалога нейросети: максимальное количество токенов (от 8 000 до 1 000 000+ у Gemini 1.5 Pro), которое модель удерживает во внимании одновременно.'
    },
    {
      term: 'Температура (Temperature)',
      transcription: 'Temperature Parameter (0.0 - 1.0)',
      definition: 'Параметр генерации: при T=0.1 ответы строгие, точные и повторяемые (для кода и математики); при T=0.8+ ответы творческие, образные и неожиданные.'
    },
    {
      term: 'Zero-Shot Prompting',
      transcription: 'Запрос без примеров',
      definition: 'Задача ставится модели напрямую без единого образца «Вход -> Желаемый выход».'
    },
    {
      term: 'Few-Shot Prompting',
      transcription: 'Обучение на примерах в промпте',
      definition: 'Предоставление в теле промпта 2–5 эталонных пар «Входной текст -> Эталонный ответ», благодаря чему модель безошибочно копирует нужный стиль и формат.'
    },
    {
      term: 'Цепочка мыслей (Chain of Thought / CoT)',
      transcription: '«Рассуждай строго по шагам»',
      definition: 'Техника побуждения модели к промежуточным выводам вслух перед выдачей финального ответа. Снижает логические и математические ошибки на 40–60%.'
    },
    {
      term: 'Формула RTFC',
      transcription: 'Role, Task, Format, Context',
      definition: 'Проверенный каркас промпта: Роль эксперта + Конкретная задача + Формат вывода + Контекст и ограничения.'
    },
    {
      term: 'Негативный промптинг (Negative Prompting)',
      transcription: 'Ограничения и стоп-слова',
      definition: 'Явный перечень запретов в промпте: запрет клише («в современном мире»), лимиты по символам, указание валюты и тем, которые нельзя затрагивать.'
    },
    {
      term: 'Слепое A/B тестирование',
      transcription: 'Blind A/B Comparison',
      definition: 'Методика объективного сравнения двух моделей (или двух вариантов промпта) без знания того, какой ответ сгенерирован какой системой, по шкале 1–5.'
    },
    {
      term: 'Галлюцинация (Hallucination)',
      transcription: 'Уверенная выдумка фактов',
      definition: 'Явление, когда языковая модель с абсолютной уверенностью придумывает несуществующие книги, авторов, законы или математические расчеты.'
    },
    {
      term: 'Prompt Injection (Инъекция промпта)',
      transcription: 'Атака обхода инструкций',
      definition: 'Попытка стороннего пользователя в диалоге заставить модель проигнорировать системные инструкции (например, фразой «Забудь все предыдущие правила»).'
    },
    {
      term: 'Заземление (Grounding)',
      transcription: 'Привязка к первоисточникам',
      definition: 'Механизм проверки ответов модели по внешним проверенным базам данных, поисковым индексам или загруженным PDF-документам.'
    }
  ];

  const filteredGlossary = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.transcription.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // Lazy vs Boss Prompt Real Cases
  const promptCases = [
    {
      category: 'Бизнес & SMM в Худжанде',
      lazyTitle: 'Слабый («Ленивый») промпт: 1 / 5',
      lazyPrompt: '«Напиши пост про наше кафе в Худжанде для инсты»',
      lazyOutput: '«Добро пожаловать в наше уютное кафе! В современном мире важно находить время для отдыха. У нас вкуснейшая еда, отличная атмосфера и приветливый персонал. Проведите вечер с друзьями и окунитесь в мир изысканного вкуса! Ждем вас!»',
      lazyCritique: '❌ Банальные штампы («в современном мире», «окунитесь в мир вкуса»), нет названия, нет адреса, нет цен, нет упоминания национального колорита.',
      bossTitle: 'Инженерный Boss Prompt: 5 / 5',
      bossPrompt: `Ты — топовый SMM-копирайтер ресторанного бизнеса в Худжанде.
Задача: Напиши вовлекающий пост для Instagram о весеннем открытии террасы кафе «Сырдарья Бриз» на набережной.
Контекст: Целевая аудитория — семьи и молодёжь Худжанда. Валюта — сомони (TJS). Фирменные блюда: хрустящая самбуса из тандыра и чай с горными травами.
Формат:
1) Цепляющий заголовок с эмодзи
2) 3 коротких абзаца с акцентом на закат над рекой Сырдарья
3) Цены на сет: 45 TJS
4) Призыв к действию: бронь столика в Direct
Ограничения: До 120 слов. Категорически без штампов («окунитесь в мир вкуса»).`,
      bossOutput: `🌅 Закаты над Сырдарьей стали ещё вкуснее!

С сегодняшнего дня открыта наша открытая терраса с панорамным видом на реку и огни вечернего Худжанда. 

Почувствуйте аромат горячей самбусы прямо из тандыра с тончайшим слоёным тестом и согрейтесь чайником горного травяного чая с лимоном и мятой.

☕ Вечерний сет «Сырдарья Бриз» — всего 45 TJS на персону.

Бронируйте любимые столики у перил в Direct — весенние вечера в Худжанде начинаются здесь! 📍 Набережная, ориентир — парк Камоли Худжанди.`,
      bossCritique: '✅ 5/5 по всем критериям: чёткая роль, местный колорит, точная цена в сомони, без шаблонной воды, готово к публикации!'
    },
    {
      category: 'Учёба & Репетитор по физике',
      lazyTitle: 'Слабый («Ленивый») промпт: 1 / 5',
      lazyPrompt: '«Объясни закон сохранения импульса для школы»',
      lazyOutput: '«Закон сохранения импульса гласит, что векторная сумма импульсов всех тел замкнутой системы остается постоянной при любых взаимодействиях тел между собой. Формула: m1*v1 + m2*v2 = m1*v1\' + m2*v2\'. Он имеет фундаментальное значение в классической механике.»',
      lazyCritique: '❌ Сухой учебниковый пересказ формулы, нет наглядных аналогий, не вовлекает ученика, не проверяет понимание.',
      bossTitle: 'Инженерный Boss Prompt: 5 / 5',
      bossPrompt: `Ты — заслуженный и терпеливый школьный репетитор по физике для ученика 8 класса (14 лет).
Задача: Объясни закон сохранения импульса простым языком без сложного академизма.
Контекст: Ученик обожает бильярд и катание на коньках.
Формат:
1. Жизненная аналогия со столкновением двух бильярдных шаров на столе
2. Простое правило: «Сколько импульса отдал один — столько забрал другой»
3. Проверочный мини-вопрос на закрепление с числами
Ограничения: НЕ давай готовый ответ на вопрос! Дождись ответа ученика.`,
      bossOutput: `Привет! Представь, что ты играешь в бильярд. Белый шар на огромной скорости катится и врезается ровно в стоящий красный шар.

Что произойдёт? Белый шар резко замирает на месте, а красный — пулей летит вперёд с той же скоростью!

Куда делось движение белого шара? Оно не исчезло в никуда: белый шар *целиком передал свой импульс* (массу × скорость) красному шару. Суммарный «запас движения» на столе остался тем же!

А теперь проверим твою интуицию:
Шар массой 1 кг со скоростью 4 м/с сталкивается с точно таким же покоящимся шаром массой 1 кг и останавливается. С какой скоростью покатится второй шар? Напиши ответ, а я проверю! 😉`,
      bossCritique: '✅ 5/5: Терпеливая роль, яркая аналогия, правило на пальцах и интерактивный вопрос без подсказки!'
    },
    {
      category: 'Карьера & IT-развитие',
      lazyTitle: 'Слабый («Ленивый») промпт: 1 / 5',
      lazyPrompt: '«Как стать айтишником в Таджикистане?»',
      lazyOutput: '«Чтобы стать IT-специалистом, вам нужно учить языки программирования: Python, JavaScript, Java. Читайте книги, проходите онлайн-курсы, учите английский язык и создавайте проекты для портфолио. Это перспективная отрасль с высокими зарплатами.»',
      lazyCritique: '❌ Абстрактный совет из интернета, нет разбивки по направлениям, нет местных зарплат и специфики рынка Согдийской области.',
      bossTitle: 'Инженерный Boss Prompt: 5 / 5',
      bossPrompt: `Ты — карьерный консультант IT-академии в Таджикистане.
Задача: Сравни 3 входных IT-направления для старшеклассника: 1) Frontend-разработка; 2) QA-тестирование; 3) Prompt-инженер / AI-оператор.
Контекст: Старшеклассник из Худжанда, есть ноутбук со средней мощностью, базовый английский.
Формат: Сравнительная Markdown-таблица:
Направление | Время на старт | Средняя зарплата в Согде (TJS) | Первый практический шаг
Ограничения: До 180 слов. Без пустых мотивационных фраз, только реальные ориентиры рынка.`,
      bossOutput: `Вот объективная карта входа в IT-сферу для старта в Худжанде:

| Направление | Время на старт | Зарплата в Согде (TJS) | Первый практический шаг |
| :--- | :--- | :--- | :--- |
| **Prompt-инженер / AI-оператор** | 1–2 месяца | 2 500 – 5 000 TJS | Освоить формулы промптинга, автоматизацию рутины и генерацию контента |
| **QA-тестировщик (Junior)** | 3–4 месяца | 3 000 – 6 500 TJS | Изучить составление тест-кейсов, баг-репортов и тест мобильных приложений |
| **Frontend-разработчик** | 6–9 месяцев | 4 000 – 9 000 TJS | Сверстать первые 3 адаптивных лендинга на HTML, Tailwind CSS и React |

💡 **Совет ментора**: Начни с промпт-инжиниринга и AI-инструментов. Это усилит тебя в любой из этих специальностей в 3 раза быстрее!`,
      bossCritique: '✅ 5/5: Четкая сравнительная таблица, реальные вилки сомони для Согдийской области, конкретный первый шаг!'
    }
  ];

  // Generate Prompt for the Builder
  const getBuiltPrompt = () => {
    let roleText = 'Ты — ведущий SMM-стратег и маркетолог в Худжанде.';
    if (builderRole === 'tutor') roleText = 'Ты — терпеливый и вдохновляющий репетитор по точным наукам для школьника.';
    if (builderRole === 'analyst') roleText = 'Ты — строгий IT-бизнес-аналитик и специалист по цифровизации.';

    let taskText = 'Составь привлекательный план рекламной публикации для социальных сетей.';
    if (builderTask === 'study_plan') taskText = 'Разработай пошаговый недельный план обучения сложной теме.';
    if (builderTask === 'audit') taskText = 'Проведи экспресс-аудит проекта и найди 3 слабых места с вариантами улучшения.';

    let contextText = 'Контекст: Город Худжанд, набережная Сырдарьи, местная целевая аудитория, цены строго в сомони (TJS).';
    if (builderContext === 'school') contextText = 'Контекст: Подготовка к республиканской школьной олимпиаде в Согдийской области.';
    if (builderContext === 'startup') contextText = 'Контекст: Запуск нового молодёжного цифрового стартапа без стартового бюджета.';

    let formatText = 'Формат: Наглядная Markdown-таблица с колонками, таймингом и чёткими выводами.';
    if (builderFormat === 'bullet') formatText = 'Формат: Нумерованный список из 5 чётких шагов с краткими пояснениями.';
    if (builderFormat === 'json') formatText = 'Формат: Валидный JSON-объект с ключами "title", "steps", "metrics", "warnings".';

    let constraintsText = 'Ограничения: Максимум 150 слов. Категорически без штампов («в современном мире», «окунитесь в мир»).';
    if (builderConstraints === 'creative') constraintsText = 'Ограничения: Используй живой образный язык, избегай занудства, добавь 1 уместную шутку.';
    if (builderConstraints === 'safe') constraintsText = 'Ограничения: Никаких домыслов. Если факт не подтверждён — напиши «требует проверки».';

    return `[РОЛЬ]: ${roleText}\n[ЗАДАЧА]: ${taskText}\n[КОНТЕКСТ]: ${contextText}\n[ФОРМАТ]: ${formatText}\n[ОГРАНИЧЕНИЯ]: ${constraintsText}`;
  };

  const handleCopyBuiltPrompt = () => {
    navigator.clipboard.writeText(getBuiltPrompt());
    setBuilderCopied(true);
    addReward(15, '📋 Boss Prompt скопирован в буфер! (+15 Опыта)');
    setTimeout(() => setBuilderCopied(false), 2500);
  };

  const handleCopyFullCheatSheet = () => {
    const text = `# Шпаргалка Урока 2: Prompt Engineering 101 («Говори с AI на его языке»)

## Формула Boss Prompt из 5 частей:
1. 🎭 Роль (Role / Persona): Кем должен быть AI?
2. 🎯 Задача (Task / Action): Сильный глагол действия.
3. 📍 Контекст (Context): Где, для кого, входные факты, валюта сомони (TJS).
4. 📋 Формат (Format / Output): Markdown-таблица, список, JSON, лимит слов.
5. ⛔ Ограничения (Constraints): Чего делать НЕЛЬЗЯ (без клише, без выдумок).

## Продвинутые техники:
* Few-Shot: передача 2-3 примеров «Вход -> Выход».
* Chain of Thought (CoT): «Рассуждай строго по шагам».
* Negative Prompting: список запрещенных слов и тем.
* Generate ≠ Finished: проверяй факты и даты!`;
    navigator.clipboard.writeText(text);
    setCopiedCheatSheet(true);
    addReward(20, '📋 Полная шпаргалка скопирована! (+20 Опыта)');
    setTimeout(() => setCopiedCheatSheet(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* 🖼️ ВВОДНАЯ МИССИЯ (HERO BANNER) */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 p-5 sm:p-8 md:p-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <Rocket className="w-3.5 h-3.5" /> Урок 2 • Prompt Engineer 101
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-cyan-300 font-bold text-xs">
            ⏱️ 90 минут • «Говори с AI на его языке»
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Prompt Engineering 101 ⚡
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-cyan-200 font-medium max-w-3xl leading-relaxed">
          <span className="text-amber-400 font-bold">
            Слабый запрос рождает банальность. Инженерный промпт создаёт шедевр.
          </span>{' '}
          Освой формулу Boss Prompt из 5 частей (Роль, Задача, Контекст, Формат, Ограничения) и заставь нейросеть говорить как лучший профессионал Худжанда! 🚀
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
            { id: 1, text: 'Применять формулу Boss Prompt из 5 элементов (Роль, Задача, Контекст, Формат, Ограничения)' },
            { id: 2, text: 'Отличать «ленивый» промпт от инженерного и мгновенно превращать 1/5 в 5/5' },
            { id: 3, text: 'Использовать техники Few-Shot (примеры) и Chain of Thought («Рассуждай по шагам»)' },
            { id: 4, text: 'Внедрять локальный контекст Худжанда и Таджикистана (Сырдарья, Панджшанбе, сомони TJS)' },
            { id: 5, text: 'Проводить слепое A/B тестирование генераций и пополнять личную Prompt Library' }
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
          Маршрут Урока 2: 6 шагов к мастерству промптинга
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '1. Учись', icon: '🧠', desc: 'Формула 5 частей', where: '1. Лекция урока', color: 'border-blue-500/40 bg-blue-950/30 text-blue-300' },
            { step: '2. Пробуй', icon: '⚡', desc: 'Boss Prompt Builder', where: '1. Лекция: Игры', color: 'border-purple-500/40 bg-purple-950/30 text-purple-300' },
            { step: '3. Создавай', icon: '🛠️', desc: 'RTFC & Few-Shot', where: '2. Лабораторная', color: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300' },
            { step: '4. Тестируй', icon: '🔍', desc: 'Слепой A/B тест', where: '2. Лабораторная', color: 'border-amber-500/40 bg-amber-950/30 text-amber-300' },
            { step: '5. Улучшай', icon: '🏆', desc: 'Тест на 5/5', where: '3. Проверка знаний', color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' },
            { step: '6. Делись', icon: '📚', desc: 'Prompt Library', where: '4. Домашнее задание', color: 'border-rose-500/40 bg-rose-950/30 text-rose-300' },
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

      {/* НАВИГАЦИОННЫЕ ВКЛАДКИ РАЗДЕЛА 1 (8 Канонических подразделов) */}
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

      {/* ======================================================== */}
      {/* ВКЛАДКА 1: ИНТЕЛЛЕКТ & ЧЕЛОВЕК VS ИИ */}
      {/* ======================================================== */}
      {activeTab === 'concepts' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 6 граней взаимодействия */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Промпт-инжиниринг</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                1️⃣ Интеллект человека против ИИ в промптинге
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Нейросеть не умеет читать мысли. Качество её ответа — это зеркальное отражение твоего промпта! Нажми на карточку, чтобы узнать:{' '}
                <strong className="text-cyan-300">кто за что отвечает в тандеме «Человек + AI»?</strong>
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

          {/* Интерактивная дуэль: «Ленивый запрос» vs «Инженерный Boss Prompt» */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Живое сравнение</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Дуэль: Слабый запрос против Boss Prompt
                </h3>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {promptCases.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCaseIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCaseIdx === idx
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Кейс {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Тема кейса: {promptCases[activeCaseIdx].category}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Ленивый промпт */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-700">
                    ❌ {promptCases[activeCaseIdx].lazyTitle}
                  </span>
                  <span className="text-xs text-rose-400 font-mono">«Ленивый запрос»</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-900/50 text-xs font-mono text-rose-200">
                  {promptCases[activeCaseIdx].lazyPrompt}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Что сгенерировал AI:</div>
                  <p className="text-xs text-slate-300 italic p-3 rounded-xl bg-slate-950/50 border border-slate-800 leading-relaxed">
                    {promptCases[activeCaseIdx].lazyOutput}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/50 text-xs text-rose-300 leading-relaxed">
                  {promptCases[activeCaseIdx].lazyCritique}
                </div>
              </div>

              {/* Boss Prompt */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-700">
                    🏆 {promptCases[activeCaseIdx].bossTitle}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">«Инженерный подход»</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-900/50 text-xs font-mono text-emerald-200 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {promptCases[activeCaseIdx].bossPrompt}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase">Что сгенерировал AI:</div>
                  <p className="text-xs text-slate-200 p-3 rounded-xl bg-slate-950/50 border border-slate-800 whitespace-pre-line leading-relaxed">
                    {promptCases[activeCaseIdx].bossOutput}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-300 leading-relaxed">
                  {promptCases[activeCaseIdx].bossCritique}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 2: ТРИ МАТРЁШКИ (ИИ ⊃ ML ⊃ GenAI & АНАТОМИЯ КОНТЕКСТА) */}
      {/* ======================================================== */}
      {activeTab === 'matryoshka' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Концепция матрёшки</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                2️⃣ Три «Матрёшки» промптинга: как запрос активирует слои нейросети
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Каждый качественный промпт подобен матрёшке: от общей системы до генерации каждого конкретного слова. Нажми на слой, чтобы раскрыть его механику:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: 1,
                  title: '1. Внешняя матрёшка: AI',
                  sub: 'Искусственный Интеллект',
                  icon: '🌐',
                  color: 'border-blue-500/50 bg-blue-950/30 text-blue-300',
                  desc: 'Вся цифровая система, способная решать задачи: диалоговые движки, базы знаний, плагины и поиск в вебе.',
                  promptEffect: 'В промпте это: выбор модели (GPT-4o, Claude 3.5, Gemini 1.5) и активация веб-поиска.'
                },
                {
                  id: 2,
                  title: '2. Средняя матрёшка: ML',
                  sub: 'Машинное Обучение',
                  icon: '🧠',
                  color: 'border-purple-500/50 bg-purple-950/30 text-purple-300',
                  desc: 'Миллиарды весов нейросети, выучившие связи между словами и структуру профессиональных текстов.',
                  promptEffect: 'В промпте это: задание Роли (Role) и Few-Shot примеров для активации нужных паттернов.'
                },
                {
                  id: 3,
                  title: '3. Внутренняя матрёшка: GenAI',
                  sub: 'Генеративный ИИ',
                  icon: '✨',
                  color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300',
                  desc: 'Непосредственное порождение уникального текста токен за токеном на основе переданных ограничений.',
                  promptEffect: 'В промпте это: точные Ограничения (Constraints), Формат и запрет на банальности.'
                }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setExpandedLayer(m.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] space-y-3 ${m.color} ${
                    expandedLayer === m.id ? 'ring-2 ring-cyan-400 shadow-xl' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{m.icon}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700">
                      Слой #{m.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{m.title}</h3>
                    <div className="text-xs opacity-75 font-medium">{m.sub}</div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                  <div className="pt-2 border-t border-slate-700/60 text-xs font-semibold text-amber-300">
                    <strong>Влияние промпта:</strong> {m.promptEffect}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Анатомия формулы Boss Prompt (5 элементов) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Анатомия формулы Boss Prompt (R-T-C-F-C)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { tag: '🎭 1. РОЛЬ (Role)', q: 'КТО AI?', ex: '«Ты — опытный репетитор по математике»', color: 'border-blue-500/50 bg-blue-950/40 text-blue-200' },
                { tag: '🎯 2. ЗАДАЧА (Task)', q: 'ЧТО СДЕЛАТЬ?', ex: '«Объясни теорему Пифагора простым языком»', color: 'border-purple-500/50 bg-purple-950/40 text-purple-200' },
                { tag: '📍 3. КОНТЕКСТ (Context)', q: 'В КАКИХ УСЛОВИЯХ?', ex: '«Для ученика 13 лет, увлекающегося футболом»', color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200' },
                { tag: '📋 4. ФОРМАТ (Format)', q: 'В КАКОМ ВИДЕ?', ex: '«3 пункта с аналогией + 1 вопрос на проверку»', color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200' },
                { tag: '⛔ 5. ОГРАНИЧЕНИЯ (Constraints)', q: 'ЧТО ЗАПРЕЩЕНО?', ex: '«Без готового ответа, до 100 слов, без воды»', color: 'border-amber-500/50 bg-amber-950/40 text-amber-200' }
              ].map((el, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${el.color} space-y-2`}>
                  <div className="font-black text-xs uppercase tracking-wider">{el.tag}</div>
                  <div className="text-xs font-bold text-white font-mono">{el.q}</div>
                  <p className="text-xs italic opacity-90 leading-snug">{el.ex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 3: КАК СОЗДАЁТСЯ ОТВЕТ & ТОКЕНЫ */}
      {/* ======================================================== */}
      {activeTab === 'tokens' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Механика LLM</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                3️⃣ Как создаётся ответ: Токены, Память и Температура
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Модель не читает буквы и не думает абстрактными образами. Она разбивает входящий промпт на кусочки —{' '}
                <strong className="text-cyan-300">токены</strong>, и на каждом шаге математически предсказывает следующий токен:
              </p>
            </div>

            {/* Интерактивный разбор токенов */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Токенизация фразы про Худжанд
                </span>
                <span className="text-xs text-slate-400 font-mono">1 токен ≈ 2–3 символа (на русском)</span>
              </div>
              <div className="text-xs text-slate-300">
                Посмотри, как нейросеть «нарезает» текст на отдельные токены:
              </div>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                {[
                  { t: 'Худ', c: 'bg-blue-600/40 border-blue-500/50 text-blue-200' },
                  { t: 'жанд', c: 'bg-purple-600/40 border-purple-500/50 text-purple-200' },
                  { t: ' — ', c: 'bg-slate-700/40 border-slate-600/50 text-slate-200' },
                  { t: 'один', c: 'bg-emerald-600/40 border-emerald-500/50 text-emerald-200' },
                  { t: ' из ', c: 'bg-cyan-600/40 border-cyan-500/50 text-cyan-200' },
                  { t: 'древ', c: 'bg-amber-600/40 border-amber-500/50 text-amber-200' },
                  { t: 'ней', c: 'bg-pink-600/40 border-pink-500/50 text-pink-200' },
                  { t: 'ших ', c: 'bg-rose-600/40 border-rose-500/50 text-rose-200' },
                  { t: 'горо', c: 'bg-indigo-600/40 border-indigo-500/50 text-indigo-200' },
                  { t: 'дов ', c: 'bg-teal-600/40 border-teal-500/50 text-teal-200' },
                  { t: 'Цент', c: 'bg-blue-600/40 border-blue-500/50 text-blue-200' },
                  { t: 'ральной ', c: 'bg-purple-600/40 border-purple-500/50 text-purple-200' },
                  { t: 'Азии', c: 'bg-emerald-600/40 border-emerald-500/50 text-emerald-200' },
                  { t: '.', c: 'bg-slate-700/40 border-slate-600/50 text-slate-200' }
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border transition-all hover:scale-110 cursor-pointer ${item.c}`}
                    title={`Токен #${idx + 1}`}
                  >
                    {item.t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Слов: 7</span>
                <span>Символов: 45</span>
                <span className="text-cyan-400 font-bold">Токенов: 14 (~2.0 токена на слово)</span>
              </div>
            </div>

            {/* Интерактивный симулятор Температуры (Temperature) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    Параметр Temperature (Температура генерации): {sliderTemp.toFixed(1)}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Двигай ползунок и смотри, как меняется поведение языковой модели:
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  sliderTemp <= 0.2
                    ? 'bg-blue-950 border-blue-500 text-blue-300'
                    : sliderTemp <= 0.7
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-rose-950 border-rose-500 text-rose-300'
                }`}>
                  {sliderTemp <= 0.2 ? '❄️ Строгий / Детерминированный' : sliderTemp <= 0.7 ? '⚖️ Сбалансированный' : '🔥 Высокий креатив / Риск фантазий'}
                </span>
              </div>

              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={sliderTemp}
                onChange={(e) => setSliderTemp(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className={`p-3.5 rounded-xl border ${sliderTemp <= 0.2 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <div className="font-bold text-white mb-1">T = 0.0 – 0.2 (Холодная)</div>
                  Выбирает только токены с максимальной вероятностью. Идеально для программного кода, математических расчётов и SQL-запросов.
                </div>
                <div className={`p-3.5 rounded-xl border ${sliderTemp > 0.2 && sliderTemp <= 0.7 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <div className="font-bold text-white mb-1">T = 0.5 – 0.7 (Оптимальная)</div>
                  Баланс между логической точностью и разнообразием словарного запаса. Идеально для эссе, SMM-постов и переводов.
                </div>
                <div className={`p-3.5 rounded-xl border ${sliderTemp > 0.7 ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <div className="font-bold text-white mb-1">T = 0.8 – 1.0 (Горячая)</div>
                  Высокая вариативность, неожиданные метафоры. Идеально для мозгового штурма, стихов, но возрастает риск галлюцинаций!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 4: ОГРАНИЧЕНИЯ & БЕЗОПАСНОСТЬ */}
      {/* ======================================================== */}
      {activeTab === 'safety' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Цифровой щит</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                4️⃣ Ограничения промптинга & Цифровая безопасность
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Промпт-инженер обязан знать уязвимости моделей и правила защиты данных.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/50 space-y-3">
                <h4 className="text-base font-bold text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  Золотое правило: Generate ≠ Finished
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Сгенерированный текст — это черновик, а не истина в последней инстанции. Никогда не отправляй и не публикуй ответ нейросети без фактчекинга:
                </p>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✖</span> Даты, исторические лица и цитаты законов
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✖</span> Цены на товары и услуги в Согдийской области
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-400">✖</span> Математические вычисления и конвертации валют
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-3">
                <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Правило Zero Leakage (Нулевая утечка)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Публичные диалоговые нейросети могут обучаться на пользовательских промптах. Категорически запрещено передавать в чат:
                </p>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span> Пароли от аккаунтов, Wi-Fi и API-ключи
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span> Номера паспортов, личные телефоны и адреса
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✔</span> Данные банковских карт и финансовую отчетность
                  </li>
                </ul>
              </div>
            </div>

            {/* Negative Prompting Showcase */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/40 space-y-3">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Техника Negative Prompting (Как правильно запрещать)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Если просто написать «пиши хорошо», нейросеть будет использовать банальные слова-паразиты. Добавь в блок ограничений четкие стоп-слова:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-rose-300">
                  ⛔ «БЕЗ фраз "В современном быстро меняющемся мире..."»
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-rose-300">
                  ⛔ «БЕЗ клише "Окунитесь в мир незабываемых вкусов..."»
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-rose-300">
                  ⛔ «НЕ давай готовый ответ — задай 1 наводящий вопрос!»
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 5: ШПАРГАЛКА (CHEAT SHEET) */}
      {/* ======================================================== */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Конспект студента</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  📋 Шпаргалка Урока 2: Prompt Engineering 101
                </h2>
              </div>
              <button
                onClick={handleCopyFullCheatSheet}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                {copiedCheatSheet ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCheatSheet ? 'Скопировано!' : 'Скопировать всю шпаргалку (MD)'}</span>
              </button>
            </div>

            {/* Копируемый блок формулы */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
                  ⭐ Формула Boss Prompt из 5 частей
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`1. 🎭 Роль (Role): Кто AI? (Специализация, опыт, тон)
2. 🎯 Задача (Task): Сильный глагол действия.
3. 📍 Контекст (Context): Где, для кого, валюта сомони (TJS).
4. 📋 Формат (Format): Markdown таблица, список, JSON, лимит слов.
5. ⛔ Ограничения (Constraints): Без клише, без домыслов.`);
                    setCopiedFormula(true);
                    setTimeout(() => setCopiedFormula(false), 2000);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-300 border border-cyan-800 flex items-center gap-1.5"
                >
                  {copiedFormula ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedFormula ? 'Скопировано' : 'Скопировать формулу'}
                </button>
              </div>
              <pre className="text-xs font-mono text-cyan-200/90 whitespace-pre-wrap leading-relaxed">
{`1. 🎭 РОЛЬ (Role / Persona)    -> «Ты — ведущий SMM-маркетолог ресторанов Худжанда»
2. 🎯 ЗАДАЧА (Task / Action)    -> «Напиши пост для Instagram о сезонном меню»
3. 📍 КОНТЕКСТ (Context)       -> «Семьи и молодёжь, набережная Сырдарьи, цены в сомони (TJS)»
4. 📋 ФОРМАТ (Format / Output)  -> «Markdown таблица, до 120 слов, 1 цепляющий заголовок»
5. ⛔ ОГРАНИЧЕНИЯ (Constraints) -> «Без штампов "окунитесь в мир вкуса", без воды»`}
              </pre>
            </div>

            {/* Сравнительная таблица техник */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-cyan-300 border-b border-slate-800">
                    <th className="p-3.5 font-bold">Техника</th>
                    <th className="p-3.5 font-bold">Суть простыми словами</th>
                    <th className="p-3.5 font-bold">Когда применять</th>
                    <th className="p-3.5 font-bold">Пример фразы</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-300">
                  <tr>
                    <td className="p-3.5 font-bold text-white">RTFC</td>
                    <td className="p-3.5">Роль + Задача + Формат + Контекст</td>
                    <td className="p-3.5">Для 90% стандартных рабочих задач</td>
                    <td className="p-3.5 font-mono text-cyan-300">«Ты — аналитик, сравни 3 профессии в таблице...»</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Few-Shot</td>
                    <td className="p-3.5">Передача 2–3 образцов «Вход → Выход»</td>
                    <td className="p-3.5">Классификация, строгий JSON, перевод</td>
                    <td className="p-3.5 font-mono text-purple-300">«Пример 1: "Плохо" → Negative. Твой черёд: ...»</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Chain of Thought (CoT)</td>
                    <td className="p-3.5">Пошаговое рассуждение модели вслух</td>
                    <td className="p-3.5">Математика, олимпиадные задачи, логика</td>
                    <td className="p-3.5 font-mono text-amber-300">«Think step by step / Рассуждай строго по шагам»</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Negative Prompt</td>
                    <td className="p-3.5">Прямой запрет на слова и паттерны</td>
                    <td className="p-3.5">Устранение «воды» и рекламных штампов</td>
                    <td className="p-3.5 font-mono text-rose-300">«Категорически без клише "в современном мире"»</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Чек-лист оценки на 5/5 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Чек-лист Boss Prompt (набери 5 из 5 баллов):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong className="text-cyan-400">1 балл:</strong> Роль задана чётко
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong className="text-purple-400">1 балл:</strong> Сильный глагол действия
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong className="text-blue-400">1 балл:</strong> Локальный контекст и ЦА
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong className="text-emerald-400">1 балл:</strong> Формат и лимит объёма
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong className="text-amber-400">1 балл:</strong> Ограничения и стоп-слова
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 6: СЛОВАРЬ (ГЛОССАРИЙ) */}
      {/* ======================================================== */}
      {activeTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Терминология</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  📖 Словарь Prompt Engineer (15 ключевых понятий)
                </h2>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск по терминам..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm sm:text-base flex items-center justify-between">
                      <span>{item.term}</span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400 font-medium">
                      {item.transcription}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {item.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 7: ИСТОЧНИКИ И ИНСТРУМЕНТЫ */}
      {/* ======================================================== */}
      {activeTab === 'sources' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Экосистема</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                🔗 Проверенные источники и инструменты промптинга
              </h2>
              <p className="text-sm text-slate-300">
                Где практиковаться и тестировать промпты профессионального уровня:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'ChatGPT (OpenAI)',
                  badge: 'GPT-4o & Canvas',
                  desc: 'Универсальная диалоговая среда для тестирования роли, форматирования и генерации структурированных текстов.',
                  url: 'https://chatgpt.com',
                  color: 'border-emerald-500/40 bg-emerald-950/20'
                },
                {
                  name: 'Claude 3.5 Sonnet (Anthropic)',
                  badge: 'Эталон копирайтинга',
                  desc: 'Лучшая языковая модель для сложного анализа, кодинга и текстов без роботизированных штампов с поддержкой Artifacts.',
                  url: 'https://claude.ai',
                  color: 'border-amber-500/40 bg-amber-950/20'
                },
                {
                  name: 'Google AI Studio & Gemini 1.5',
                  badge: 'Контекст 1M+ токенов',
                  desc: 'Профессиональная среда разработчика: управление System Instructions, Temperature и загрузка гигантских документов.',
                  url: 'https://aistudio.google.com',
                  color: 'border-blue-500/40 bg-blue-950/20'
                },
                {
                  name: 'Learn Prompting (Курс)',
                  badge: 'Интерактивный учебник',
                  desc: 'Бесплатный международный справочник по продвинутым техникам промптинга от базового уровня до ReAct агентов.',
                  url: 'https://learnprompting.org',
                  color: 'border-purple-500/40 bg-purple-950/20'
                },
                {
                  name: 'Anthropic Prompt Engineering Tutorial',
                  badge: 'Официальный гайд',
                  desc: 'Пошаговый курс от создателей Claude по формулированию системных промптов, Few-Shot и защите от джейлбрейков.',
                  url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
                  color: 'border-cyan-500/40 bg-cyan-950/20'
                },
                {
                  name: 'OpenAI Prompt Engineering Guide',
                  badge: 'Best Practices',
                  desc: 'Официальная стратегия составления промптов: разделители, Chain of Thought и стратегии предоставления времени на размышление.',
                  url: 'https://platform.openai.com/docs/guides/prompt-engineering',
                  color: 'border-rose-500/40 bg-rose-950/20'
                }
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${tool.color} space-y-3 flex flex-col justify-between hover:scale-[1.02] transition-all`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-base">{tool.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950 text-cyan-300 border border-slate-700">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{tool.desc}</p>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2 border-t border-slate-800"
                  >
                    Открыть сервис <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ВКЛАДКА 8: ПОИГРАТЬ И РАЗОБРАТЬСЯ (ИНТЕРАКТИВНЫЕ ТРЕНАЖЁРЫ) */}
      {/* ======================================================== */}
      {activeTab === 'play' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Тренажёр 1: Конструктор Boss Prompt (5/5) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4" /> Интерактивный симулятор #1
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Конструктор «Boss Prompt Builder» (5/5 баллов)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold font-mono">
                  Boss Score: 5 / 5 🏆
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Выбери параметры для каждого из 5 блоков, собери идеальный промпт для нейросети и скопируй его:
            </p>

            {/* 5 переключателей */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* 1. Роль */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-900/50 space-y-2">
                <span className="text-xs font-bold text-blue-300 uppercase">1. Роль (Role)</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'smm', label: '📱 SMM в Худжанде' },
                    { id: 'tutor', label: '👨‍🏫 Репетитор физики' },
                    { id: 'analyst', label: '📊 IT-бизнес аналитик' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setBuilderRole(r.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        builderRole === r.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Задача */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-900/50 space-y-2">
                <span className="text-xs font-bold text-purple-300 uppercase">2. Задача (Task)</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'post', label: '✍️ Пост для Instagram' },
                    { id: 'study_plan', label: '📅 План обучения' },
                    { id: 'audit', label: '🔍 Экспресс-аудит' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setBuilderTask(t.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        builderTask === t.id
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Контекст */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-2">
                <span className="text-xs font-bold text-cyan-300 uppercase">3. Контекст</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'khujand', label: '🇹🇯 Худжанд & TJS' },
                    { id: 'school', label: '🏫 Олимпиада Согда' },
                    { id: 'startup', label: '🚀 Стартап с нуля' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setBuilderContext(c.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        builderContext === c.id
                          ? 'bg-cyan-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Формат */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase">4. Формат</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'table', label: '📊 Markdown таблица' },
                    { id: 'bullet', label: '📝 Список из 5 шагов' },
                    { id: 'json', label: '⚙️ JSON объект' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setBuilderFormat(f.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        builderFormat === f.id
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Ограничения */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase">5. Ограничения</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'strict', label: '🚫 Без клише и воды' },
                    { id: 'creative', label: '🎨 Живой язык + юмор' },
                    { id: 'safe', label: '🛡️ Строгий фактчекинг' }
                  ].map((lim) => (
                    <button
                      key={lim.id}
                      onClick={() => setBuilderConstraints(lim.id as any)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        builderConstraints === lim.id
                          ? 'bg-amber-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lim.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Собранный промпт */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> Сгенерированный Boss Prompt:
                </span>
                <button
                  onClick={handleCopyBuiltPrompt}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  {builderCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{builderCopied ? 'Скопировано!' : 'Скопировать Boss Prompt'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-200 whitespace-pre-wrap leading-relaxed">
                {getBuiltPrompt()}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Чек-лист Boss Score: 5/5 элементов соблюдены</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Готово к отправке в ChatGPT / Claude / Gemini
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
