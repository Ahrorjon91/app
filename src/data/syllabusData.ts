import { CourseBlock, LessonData, QuizTest, BadgeItem, ResourceDownload, FAQItemData } from '../types';
import { INITIAL_LABS } from './labsData';
import { LESSON_QUIZZES } from './lessonQuizzesData';

export { INITIAL_LABS };

export const COURSE_BLOCKS: CourseBlock[] = [
  {
    id: 1,
    title: "AI Foundations & Prompt Mastery",
    titleRu: "Блок 1: Основы ИИ и Мастерство Промптинга (Нед. 1–2)",
    weeks: "Недели 1–2",
    lessonRange: "№1–4",
    description: "Что такое интеллект, архитектура LLM, токенизация, формулы эффективного промптинга (RTFC, Few-Shot, CoT), мультимодальный AI, безопасность и борьба с галлюцинациями. Проект #1: «My AI Life Helper».",
    color: "from-cyan-600 to-blue-600",
    testId: "TEST_1",
  },
  {
    id: 2,
    title: "Vibe Coding: Building Apps without Boilerplate",
    titleRu: "Блок 2: Вайб-кодинг — Создание веб-приложений (Нед. 3–4)",
    weeks: "Недели 3–4",
    lessonRange: "№5–8",
    description: "Философия Vibe Coding, инструменты Cursor / Windsurf / Claude Code, создание современных интерактивных интерфейсов, отладка кода через AI, подключение API и баз данных. Проект #2: «Interactive Web Utility».",
    color: "from-emerald-600 to-teal-600",
    testId: "TEST_2",
  },
  {
    id: 3,
    title: "AI for Productivity, Study & Deep Research",
    titleRu: "Блок 3: ИИ для продуктивности, учебы и исследований (Нед. 5–6)",
    weeks: "Недели 5–6",
    lessonRange: "№9–12",
    description: "AI-ассистенты в учебе и работе: конспекты, флэш-карты, глубокий фактчекинг и ресерч (Perplexity, Gemini Deep Search), формулы таблиц, генераторы презентаций и Second Brain в Notion/Obsidian. Проект #3: «Personal Knowledge Base».",
    color: "from-amber-600 to-orange-600",
    testId: "TEST_3",
  },
  {
    id: 4,
    title: "Creative AI: Media, Design & Audio",
    titleRu: "Блок 4: Креативный ИИ: Графика, Видео и Звук (Нед. 7–8)",
    weeks: "Недели 7–8",
    lessonRange: "№13–16",
    description: "Генерация графики и UI-дизайна (Midjourney, Flux), AI-видеогенерация (Runway Gen-3, Kling, Luma), клонирование голоса и аудио-продакшн (ElevenLabs, Suno). Проект #4: «AI Multimedia Brand Campaign».",
    color: "from-purple-600 to-violet-600",
    testId: "TEST_4",
  },
  {
    id: 5,
    title: "Autonomous AI Agents & Automations",
    titleRu: "Блок 5: Автономные ИИ-агенты и автоматизация (Нед. 9–10)",
    weeks: "Недели 9–10",
    lessonRange: "№17–20",
    description: "Архитектура автономных агентов (ReAct, Function Calling), интеграция без кода (Zapier, Make, n8n, Webhooks), RAG-боты по базам знаний и мультиагентные пайплайны. Проект #5: «Autonomous Personal Assistant».",
    color: "from-rose-600 to-red-600",
    testId: "TEST_5",
  },
  {
    id: 6,
    title: "AI Capstone Project & Career Launch",
    titleRu: "Блок 6: Финальный Capstone-проект и Карьера (Нед. 11–12)",
    weeks: "Недели 11–12",
    lessonRange: "№21–24",
    description: "Проектирование и Vibe Coding собственного полнофункционального цифрового продукта, полировка UI/UX, деплой на production-хостинг, защита на Demo Day и международный сертификат AI for LIFE Master.",
    color: "from-blue-600 to-indigo-700",
    testId: "TEST_6",
  },
];

export const INITIAL_LESSONS: LessonData[] = [
  // ==================== BLOCK 1: AI Foundations & Prompt Mastery ====================
  {
    id: 1,
    blockId: 1,
    week: 1,
    lessonNumber: 1,
    title: "Lesson 1: What is Intelligence? — AI Explorer Student Handbook",
    titleRu: "Урок 1: Что такое интеллект? (AI Explorer)",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Student Handbook: Learn → Try → Build → Test → Improve → Share. Разбор концепций Интеллект, AI, Machine Learning, Generative AI (3 Матрёшки), дуэль Человек vs AI, Next-Token Prediction, ограничения (Галлюцинации, Generate ≠ Finished), 6 правил цифровой безопасности. Практика: детективная игра «Human vs AI» (6 раундов), эксперименты ChatGPT vs Gemini, конструктор AI School Helper, Debug Challenge по проверке фактов, Mini-Test (5 вопросов) и ведение AI Journal.",
    learningObjectives: [
      "Объяснить, что такое интеллект, AI, Machine Learning и Generative AI (3 матрёшки)",
      "Сказать, что AI умеет хорошо, а что — делает плохо (Generate ≠ Finished)",
      "Провести свой первый сравнительный AI-эксперимент (ChatGPT vs Gemini)",
      "Найти ошибку в ответе AI и проверить её 3 способами (источник, пересчет, ссылка)",
      "Безопасно работать с AI (без паролей, личных данных и без банковских карт)"
    ],
    tools: ["ChatGPT", "Gemini", "AI School Helper", "Interactive Simulator", "Debug Fact-Check Cards", "AI Journal"],
    commands: [
      { command: "prompt: Act as a Patient Tutor...", description: "Задать системный промпт для роли репетитора по формуле RTFC", OS: "Cross" },
      { command: "compare: ChatGPT vs Gemini", description: "Сравнить полноту, структуру и подачу ответов двух ведущих AI", OS: "Cross" },
      { command: "debug: verify source & math", description: "Применить 3 метода проверки: второй источник, ручной расчет и проверка цитат", OS: "Cross" },
      { command: "safety: mask credentials & PII", description: "Правило нулевой утечки: исключить пароли и личные данные из промпта", OS: "Cross" }
    ],
    homeworkTitle: "Домашнее задание: «AI Journal» к Уроку 2",
    homeworkDesc: "Заполнить 6 пунктов AI Journal: 1) 3 идеи для школы; 2) Spot the AI (3 примера за день); 3) Разбор 1 ошибки AI; 4) Моя идея для AI; 5) Имя помощника; 6) Лучший prompt из урока.",
    cheatSheetMd: `# Шпаргалка Урока 1: Что такое интеллект и AI — Роль AI Explorer

## 1. Концепция трёх «Матрёшек»
* **Искусственный интеллект (AI)**: Любая компьютерная система, способная решать задачи, традиционно требующие человеческого интеллекта (игры, распознавание образов, навигация).
* **Машинное обучение (ML)**: Подраздел AI, где алгоритмы обучаются находить закономерности на больших массивах данных без жесткого программирования правил.
* **Генеративный ИИ (Generative AI)**: Современные модели (LLM, Diffusion), способные не просто анализировать, но создавать новый оригинальный контент (текст, код, изображения, музыку, видео).

## 2. Сравнение: Человек (Human) vs AI
| Критерий | Человек (Human) | Искусственный Интеллект (LLM) |
| :--- | :--- | :--- |
| **Основа решений** | Мозг, личный опыт, эмпатия, физическое тело | Обучающий датасет, веса нейросети, промпт |
| **Механизм** | Осмысление, понимание причин и следствий | Статистическое предсказание следующего токена |
| **Сильные стороны** | Творчество, мораль, критическое мышление, адаптивность | Скорость, анализ миллионов страниц за доли секунды |
| **Слабые стороны** | Усталость, забывчивость, когнитивные искажения | Галлюцинации, отсутствие реального понимания мира |

## 3. Как устроена генерация в LLM
* **Токенизация**: Модель разбивает текст на токены (~0.75 слова на английском, ~0.5 слова на русском).
* **Next-Token Prediction**: На каждом шаге модель вычисляет вероятности всех возможных следующих токенов на основе контекста.
* **Контекстное окно**: Оперативная память текущего диалога (от 8k до 1M+ токенов у Gemini 1.5 Pro).
* **Главное правило**: **Generate ≠ Finished** (Сгенерировано — не значит готово!). AI может ошибаться с абсолютной уверенностью.

## 4. Методология проверки фактов (Debug Challenge)
1. 🔎 **Второй независимый источник**: Проверять спорные факты в академических справочниках, энциклопедиях или учебниках.
2. 🧮 **Ручной пересчет**: Все математические расчеты, даты и суммы перепроверять на калькуляторе или вручную.
3. 🕵️ **Проверка цитат и ссылок**: Если AI цитирует закон, книгу или исследование — обязательно убедиться, что они действительно существуют.

## 5. Формула системного промпта (RTFC)
\`\`\`text
Роль (Role): Ты — терпеливый школьный репетитор по [Предмет] для ученика [Возраст] лет.
Задача (Task): Объясни тему [Тема] простым языком, используя жизненные аналогии.
Формат (Format): Разбей объяснение на 3 понятных пункта, в конце задай 1 вопрос на закрепление.
Контекст и Ограничения (Context): Не давай готовых ответов на задачи, направляй наводящими вопросами.
\`\`\`

## 6. Золотые правила цифровой безопасности
1. **Никогда** не передавайте пароли, API-ключи, номера телефонов, адреса и личные документы в открытые нейросети.
2. **Академическая честность**: Если AI помог с черновиком или идеей — открыто указывайте это.
3. **Финальная ответственность**: За любое решение и текст отвечает человек, а не AI.`
  },
  {
    id: 2,
    blockId: 1,
    week: 1,
    lessonNumber: 2,
    title: "Mission 02: Prompt Engineering 101 — Speak AI's Language",
    titleRu: "Урок 2: MISSION 02 — Prompt Engineering 101 («Говори с AI на его языке»)",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "Глубокое погружение в промпт-инжиниринг: почему AI отвечает банальностями на слабые запросы и как превратить нейросеть в первоклассного специалиста. Формула Boss Prompt из 5 ключевых элементов (Роль, Задача, Контекст, Формат, Ограничения), продвинутые техники (RTFC, Few-Shot, Chain of Thought), локальные кейсы Согда и Таджикистана, трансформация «ленивых» промптов в инженерные, методология слепого A/B тестирования и создание собственной Prompt Library.",
    learningObjectives: [
      "Применять безотказную формулу Boss Prompt из 5 элементов (Роль, Задача, Контекст, Формат, Ограничения)",
      "Отличать слабые «ленивые» промпты от инженерных структурированных запросов и мгновенно их рефакторить",
      "Использовать техники Few-Shot (обучение на примерах) и Chain of Thought («Рассуждай по шагам») для сложных задач",
      "Внедрять локальный контекст Худжанда и Таджикистана (Сырдарья, Панджшанбе, Согдийская область, валюта сомони TJS)",
      "Проводить объективное слепое A/B тестирование генераций (ChatGPT vs Claude vs Gemini) и вести личную Prompt Library"
    ],
    tools: ["ChatGPT (GPT-4o)", "Claude 3.5 Sonnet", "Gemini 1.5 Flash / Pro", "Prompt Studio", "Prompt Library", "A/B Comparison Matrix"],
    commands: [
      { command: "[РОЛЬ]: Ты — ведущий SMM-стратег и копирайтер в Худжанде", description: "Активация профессиональной роли и точного локального лексикона", OS: "Cross" },
      { command: "[ФОРМУЛА]: Роль + Задача + Контекст + Формат + Ограничения", description: "Базовый синтаксис 5-компонентного Boss Prompt", OS: "Cross" },
      { command: "[CoT]: Think step by step / Рассуждай строго по шагам", description: "Активация Chain of Thought для математики, логики и многоэтапного анализа", OS: "Cross" },
      { command: "[FEW-SHOT]: [Пример 1: Вход -> Выход], [Пример 2: Вход -> Выход]", description: "Передача эталонных образцов стиля и структуры данных", OS: "Cross" },
      { command: "[ОГРАНИЧЕНИЯ]: Без клише, до 150 слов, цены в сомони (TJS)", description: "Жесткие негативные фильтры и форматные рамки", OS: "Cross" },
      { command: "[A/B ТЕСТ]: Слепое сравнение генераций по 5 критериям", description: "Объективная оценка качества ответов без предвзятости к бренду модели", OS: "Cross" }
    ],
    homeworkTitle: "3 боевых Boss Prompts (5/5) & Формирование личной Prompt Library",
    homeworkDesc: "Спроектировать 3 авторских промпта высшего качества по формуле 5 элементов: 1) Учебный тьютор по сложному предмету; 2) Локальный бизнес-кейс (Худжанд/Таджикистан); 3) Творческий или аналитический инструмент. Протестировать каждый в 2 моделях, оценить результаты и оформить карточки в личную Prompt Library.",
    cheatSheetMd: `# Шпаргалка Урока 2: Prompt Engineering 101 («Говори с AI на его языке»)

## 1. Что такое Prompt Engineering?
**Промпт-инжиниринг** — это искусство и дисциплина составления точных инструкций для больших языковых моделей (LLM), позволяющая направлять вероятностное распределение токенов в сторону максимально качественного, структурированного и полезного ответа.

> **Главный парадокс AI**: Модель обладает знаниями терабайтов текстов, но без качественного промпта она выдаёт усреднённый, шаблонный и «водянистый» ответ. Качество ответа AI прямо пропорционально качеству заданного контекста.

---

## 2. «Ленивый» промпт против «Инженерного» (Boss Prompt)

| Параметр | Слабый («Ленивый») промпт | Инженерный («Boss Prompt») |
| :--- | :--- | :--- |
| **Пример** | *«Напиши пост про кафе в Худжанде»* | *«Ты — SMM-маркетолог ресторанов Худжанда. Напиши пост для Instagram о сезонном меню кафе у набережной Сырдарьи. Аудитория: семьи и студенты. Формат: цепляющий заголовок, 3 блюда с ценами в сомони, призыв к бронированию. До 150 слов, без банальных штампов вроде "окунитесь в мир вкуса".»* |
| **Результат** | Банальные фразы («уютное место с вкусной едой»), нет специфики, шаблонный текст | Живой, готовый к публикации пост с реальными ориентирами, местными ценами и четкой структурой |
| **Оценка** | 1 / 5 (требует полной переделки человеком) | 5 / 5 (требует лишь минимальной шлифовки) |

---

## 3. Золотая формула Boss Prompt из 5 элементов (R-T-C-F-C)

\`\`\`text
1. 🎭 РОЛЬ (Role / Persona)       -> Кем должен быть AI? (Специализация, уровень опыта, тон общения)
2. 🎯 ЗАДАЧА (Task / Action)       -> Что конкретно сделать? (Сильный глагол: проанализируй, составь, найди)
3. 📍 КОНТЕКСТ (Context)          -> В каких условиях? (Целевая аудитория, предыстория, локация, факты)
4. 📋 ФОРМАТ (Format / Output)     -> В каком виде выдать? (Таблица Markdown, список, JSON, лимит слов)
5. ⛔ ОГРАНИЧЕНИЯ (Constraints)    -> Чего делать НЕЛЬЗЯ? (Стоп-слова, анти-клише, валюта, защита от галлюцинаций)
\`\`\`

### Чек-лист проверки промпта на 5/5:
- [ ] **1 балл — Роль**: Четко задана профессия или образ мыслей (например: *«Опытный методист по математике»*).
- [ ] **1 балл — Задача**: Конкретное целевое действие с ожидаемым результатом.
- [ ] **1 балл — Контекст**: Описаны входные условия, уровень читателя и локальные реалии.
- [ ] **1 балл — Формат**: Указана форма вывода (колонки таблицы, пункты, максимальный объем).
- [ ] **1 балл — Ограничения**: Явно заданы запреты (без выдумок, без "воды", без сложных терминов).

---

## 4. Продвинутые техники промптинга

### 1. RTFC (Role, Task, Format, Context)
Базовый каркас для быстрых рабочих инструкций:
* **Role**: Эксперт-аналитик по профориентации.
* **Task**: Сравни 3 IT-профессии для школьника 14 лет.
* **Format**: Сравнительная Markdown-таблица: Профессия | Порог входа | Зарплата в Центральной Азии | С чего начать.
* **Context**: Ученик любит математику и рисование, живет в Худжанде, планирует учиться дистанционно.

### 2. Few-Shot Prompting (Обучение на примерах)
Вместо долгого описания правил, покажите модели 2–3 примера идеального ответа:
\`\`\`text
Классифицируй обращение клиента по тональности и категории:

Вход: «Ужасно долго ждал свой заказ, пицца остыла!»
Выход: { "sentiment": "negative", "category": "delivery_delay", "priority": "high" }

Вход: «Спасибо курьеру, доставили за 20 минут в 18-й микрорайон, всё горячее!»
Выход: { "sentiment": "positive", "category": "delivery_speed", "priority": "low" }

Вход: [Новое сообщение клиента]
Выход:
\`\`\`

### 3. Chain of Thought (Цепочка рассуждений / CoT)
Магическая фраза: **«Рассуждай строго по шагам перед тем, как дать окончательный ответ»** (*«Think step by step»*).
* Увеличивает вычислительное пространство модели в токенах.
* Снижает ошибки в математике, олимпиадных задачах и логических загадках на **40–60%**.

### 4. Negative Prompting (Ограничения и стоп-слова)
Прямой запрет паразитных конструкций:
* *«НЕ используй вводные фразы: "В современном мире", "Не секрет, что", "Как известно".»*
* *«НЕ давай готовое решение уравнения — задай 1 наводящий вопрос на понимание правила.»*
* *«Все цены приводи исключительно в национальной валюте — таджикских сомони (TJS).»*

---

## 5. Практические кейсы с локальным контекстом (Худжанд / Таджикистан)

### Кейс A: Локальный маркетинг для бизнеса
* **Контекст**: Кофейня-пекарня в историческом центре Худжанда рядом с рынком «Панджшанбе».
* **Промпт**: *«Ты — креативный копирайтер. Напиши 3 варианта коротких рекламных слоганов для баннера. Учти колорит Худжанда, утреннюю атмосферу и свежую выпечку. Формат: слоган на русском + адаптация мысли на таджикском.»*

### Кейс B: Подготовка к школьной олимпиаде
* **Контекст**: Подготовка ученика 9 класса к областной олимпиаде Согдийской области по физике.
* **Промпт**: *«Действуй как заслуженный преподаватель физики. Разбери закон сохранения импульса на примере столкновения двух тележек. Объясни через аналогию с бильярдными шарами, задай ученику проверочный вопрос с числами и не давай ответ, пока он не напишет свой вариант.»*

---

## 6. Слепое A/B тестирование промптов
Чтобы объективно оценить, какая модель или формулировка работает лучше:
1. Запустите один и тот же промпт в двух окнах (например, **ChatGPT** и **Claude 3.5 Sonnet**).
2. Скройте названия моделей и оцените результат вслепую по 5 критериям (шкала 1–5):
   * Точность соблюдения формата и ограничений
   * Отсутствие "воды" и шаблонных фраз
   * Логическая глубина и польза
   * Уместность тона и языка
   * Фактическая корректность (отсутствие галлюцинаций)
3. Занесите победивший промпт в **Personal Prompt Library**.

---

## 7. Чек-лист личной Prompt Library (Библиотеки промптов)
Храните свои лучшие проверенные промпты в структурированном виде:
* **Название промпта** (краткое и понятное)
* **Категория / Теги** (Учеба, Тексты, Код, Анализ, SMM)
* **Рекомендуемая модель** (GPT-4o, Claude 3.5, Gemini 1.5)
* **Текст промпта** (с переменными в квадратных скобках \`[ТЕМА]\`, \`[АУДИТОРИЯ]\`)
* **Оценка по чек-листу**: 5/5
* **Пример удачного ответа**`
  },
  {
    id: 3,
    blockId: 1,
    week: 2,
    lessonNumber: 3,
    title: "AI Tutor: Guide, Don't Solve",
    titleRu: "Урок 3: AI Tutor — Создай репетитора, который не даёт ответ, а учит думать",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "Разница между «Машиной ответов» и настоящим AI Tutor. Методология Prompt 2.0: правила ✅/❌, эталонный пример (EXAMPLE) и структурированный вывод (OUTPUT). Инженерный цикл v1 → Test → Bug → Fix → v2. Четыре стресс-теста на прочность («Скажи ответ», «Не понимаю», «Неверный ответ», «Off-topic») и правила 3/3 (Конкретно, Проверяемо, Запасной план).",
    learningObjectives: [
      "Понимать фундаментальную разницу между «машиной ответов» и мыслящим AI Tutor",
      "Применять архитектуру Prompt 2.0: правила ✅ Делай / ❌ Не делай, эталон (EXAMPLE) и структуру (OUTPUT)",
      "Улучшать системный промпт по циклу: v1 → Test → Bug → Fix → v2",
      "Проводить стресс-тесты («ломать» тьютора через 4 каверзных сценария учеников)",
      "Формулировать правила для AI по критериям 3/3 (Конкретно, Проверяемо, С запасным планом)"
    ],
    tools: ["ChatGPT", "Gemini", "Claude", "Portal Prompt Library", "Tutor Builder"],
    commands: [
      { command: "v1 -> Test -> Bug -> Fix -> v2", description: "Инженерный цикл итеративного улучшения промпта", OS: "Cross" },
      { command: "Rule 3/3 = Specific + Verifiable + Fallback", description: "Стандарт составления надёжных правил для AI", OS: "Cross" }
    ],
    homeworkTitle: "Side Quest: «Improve My Tutor» & Tutor Report",
    homeworkDesc: "Протестировать своего тьютора на 3 вопросах из школьного учебника, найти 2 новых бага, выпустить версию v3 и заполнить таблицу версий Tutor Report.",
    cheatSheetMd: `# Шпаргалка Урока 3: AI Tutor & Prompt 2.0

## Формула Prompt 2.0
\`\`\`text
PROMPT 2.0 = 🎭 ROLE + 🎯 GOAL + 🌍 CONTEXT + 🚧 CONSTRAINTS (✅ / ❌) + ⭐ EXAMPLE + 📦 OUTPUT
\`\`\`

## Признаки хорошего тьютора:
1. Задает по **ОДНОМУ** вопросу за раз и ждёт ответ ученика.
2. Даёт наводящую подсказку или аналогию из жизни вместо готового решения.
3. Говорит простыми словами (дележ дыни, базар Панджшанбе).
4. Не ругает за ошибку, а направляет: «Почти! Подумай про...».
5. Мягко возвращает к теме при отвлечении.

## 4 стресс-теста прочности (Break the Tutor):
* **T1 «Скажи ответ»**: ученик давит «Просто скажи ответ!» -> Тьютор не сдаётся и даёт подсказку.
* **T2 «Не понимаю»**: «Я ничего не понял» -> Тьютор меняет пример на ещё более простой.
* **T3 «Неверный ответ»**: ошибка ученика -> Тьютор подсказывает, где именно нестыковка.
* **T4 «Off-topic»**: «Расскажи анекдот» -> Тьютор вежливо возвращает к задаче.

## Стандарт правила 3/3:
* **Конкретно (1 б)**: Четко понятно, что именно запрещено или требуется.
* **Проверяемо (1 б)**: По тексту диалога можно однозначно сказать «нарушил / не нарушил».
* **С запасным планом (1 б)**: Сказано, что именно модель должна сделать ВМЕСТО нарушения.`
  },
  {
    id: 4,
    blockId: 1,
    week: 2,
    lessonNumber: 4,
    title: "AI Artist & Character Designer: Khujand-2050 & Consistent Mascot",
    titleRu: "Урок 4: ИИ-Художник и Дизайнер персонажей (Худжанд-2050 & Герой курса)",
    theoryDuration: 45,
    practiceDuration: 75,
    theorySummary: "Объединённый модуль визуального ИИ (Уроки 5 и 6): переход от текста к генерации реалистичных изображений и создание постоянного персонажа (Consistency). Золотая формула из 6 частей (Герой + Стиль + Место + Свет + Ракурс + Настроение), цикл улучшения v1 → v2 → v3. Канонический Паспорт Персонажа из 4 частей (Внешность + Характер + История + Способность), Reference-приём для сохранения черт лица во всех кадрах, матрица эмоций и сборка профессионального Character Sheet.",
    learningObjectives: [
      "Использовать каноническую формулу визуального запроса из 6 составляющих (Герой, Стиль, Место, Свет, Ракурс, Настроение)",
      "Итеративно улучшать изображение города «Худжанд-2050» через версии (v1 → v2 → v3), меняя одну переменную за раз",
      "Составлять Паспорт персонажа по формуле: Внешность + Характер + История + Способность",
      "Применять Reference-приём (неизменный блок внешности + новая сцена) для сохранения лица героя",
      "Собрать полный Character Sheet (портрет, полный рост, эмоции, город) и соблюдать этический кодекс ИИ-креатора"
    ],
    tools: ["Google Whisk (labs.google/whisk)", "Google Gemini (Image Gen)", "Canva AI", "Prompt Reference Engine", "Character Sheet Studio"],
    commands: [
      { command: "whisk: subject: tram + style: 3D render + location: Khujand + lighting: golden hour", description: "Генерация сцены по формуле 6 частей", OS: "Cross" },
      { command: "reference: [CHARACTER REFERENCE: 5-7 key features] + scene", description: "Генерация кадра с фиксацией внешности героя", OS: "Cross" },
      { command: "emotion_shift: keep [CHARACTER REFERENCE] + change expression only", description: "Смена эмоции без потери лица героя", OS: "Cross" }
    ],
    homeworkTitle: "Проекты «3 варианта одной идеи» + «3 сцены с персонажем» и Дневник ИИ",
    homeworkDesc: "Создать 3 стилевых варианта концепции города будущего и поместить своего персонажа в 3 разные сцены, используя неизменный Паспорт внешности. Заполнить Дневник ИИ и выполнить квесты Fix It, Family Vote и Family Meet.",
    cheatSheetMd: `# Шпаргалка Урока 4: ИИ-Художник & Дизайнер персонажей

## Часть 1: ИИ-Художник (Формула 6 частей)
\`ЗАПРОС = 🧍 ГЕРОЙ + 🎨 СТИЛЬ + 🏞️ МЕСТО + 💡 СВЕТ + 📷 РАКУРС + 🎭 НАСТРОЕНИЕ\`

* **Цикл улучшения**: \`v1 ──▶ 👀 Смотрю ──▶ 🤔 Что не так? ──▶ 🔧 Меняю ОДНУ часть ──▶ v2\`

## Часть 2: Дизайнер персонажей (Постоянство лица)
\`ПАСПОРТ = 👤 ВНЕШНОСТЬ + 💭 ХАРАКТЕР + 📖 ИСТОРИЯ + ⚡ СПОСОБНОСТЬ\`

1. Опиши внешность ОЧЕНЬ подробно (5–7 признаков: возраст, волосы, глаза, куртка, нашивка).
2. Сохрани этот текст как эталонный «Паспорт».
3. Вставляй этот же текст + новую сцену или эмоцию каждый раз!

## Этический кодекс:
- 🛡️ **Проверяй:** ищи лишние пальцы, искривлённые тексты и артефакты.
- 🛡️ **Не делись личным:** никакого создания лиц реальных людей без согласия.
- 🛡️ **Будь честным:** только свой оригинальный герой (OC) и открытая маркировка ИИ-арта.`
  },

  // ==================== BLOCK 2: Vibe Coding — Building Apps ====================
  {
    id: 5,
    blockId: 2,
    week: 3,
    lessonNumber: 5,
    title: "AI Product Designer — Google Stitch: Design First, Then Code (Tesla Model X UX/UI)",
    titleRu: "Урок 5: 🎨 AI Product Designer — Google Stitch («Сначала дизайн. Потом код.»)",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "Вот здесь начинается новая программа! Миссия «Сначала дизайн. Потом код.»: правильный пайплайн Idea → UX → UI → Prototype → Code (а не Prompt → Code → хаос). PART 1 — Анализ реального продукта Tesla Model X (hero, typography, whitespace, product storytelling: interior → exterior → performance → utility → charging → safety, CTA, image hierarchy, specification cards, scrolling sections, visual transitions, mobile behavior) и поиск 5 премиальных UX-решений. PART 2 — Работа в Google Stitch (AI design canvas для генерации high-fidelity UI по текстовым инструкциям): создание проекта по референсу tesla.com, инспекция 6 узлов интерфейса, итеративное улучшение иерархии, замена картинок и кнопок, сохранение и экспорт проекта.",
    learningObjectives: [
      "Применять продуктовый подход «Сначала дизайн. Потом код.»: Idea → UX → UI → Prototype → Code",
      "Анализировать 10 UX-паттернов Tesla Model X и последовательный Product Storytelling (interior → exterior → performance → utility → charging → safety)",
      "Находить 5 ключевых UX-решений (5 UX decisions), которые делают технологический сайт премиальным",
      "Генерировать High-Fidelity UI в Google Stitch по промпту в стиле tesla.com и проверять hierarchy, spacing, typography, buttons, cards, navigation",
      "Улучшать визуальную иерархию через AI-инструкции, генерировать новые картинки/кнопки, сохранять проект и экспортировать в код"
    ],
    tools: ["Google Stitch", "Tesla.com (Model X UX Reference)", "AI Design Canvas", "UI/UX Hierarchy Inspector", "HTML/Tailwind Code Exporter"],
    commands: [
      { command: "Design a modern website like tesla.com. Create a premium minimal interface", description: "Step 3: Базовый промпт генерации UI в Google Stitch", OS: "Cross" },
      { command: "Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements.", description: "Step 6: Промпт итеративного улучшения визуальной иерархии в Google Stitch", OS: "Cross" },
      { command: "Pipeline: Idea -> UX -> UI -> Prototype -> Code", description: "Формула продуктовой разработки без хаоса", OS: "Cross" }
    ],
    homeworkTitle: "5 UX-решений Tesla Model X + Проект в Google Stitch (Улучшение, картинки/кнопки и экспорт)",
    homeworkDesc: "Выписать 5 UX-решений, которые делают сайт Tesla Model X премиальным. В Google Stitch создать UI в стиле tesla.com, проинспектировать 6 элементов, применить промпт улучшения визуальной иерархии, сгенерировать новые картинки или кнопки, сохранить проект и экспортировать!",
    cheatSheetMd: `# Шпаргалка Урока 5: 🎨 AI Product Designer — Google Stitch

## 1. Главная миссия: «Сначала дизайн. Потом код.»
* ✅ **Правильный путь:** \`Idea → UX → UI → Prototype → Code\`
* ❌ **Путь к провалу:** \`Prompt → Code → хаос\`

**Google Stitch** — это AI design canvas, который превращает инструкции на естественном языке (natural-language instructions) в high-fidelity UI, который можно итеративно улучшать.

---

## 2. PART 1 — Анализ реального продукта (Tesla Model X)
Не копируем сайт 1:1 — изучаем **10 UX-паттернов**:
1. **Hero** (первый экран)
2. **Typography** (типографика)
3. **Whitespace** (воздух и чистые отступы)
4. **Product Storytelling** (последовательная история: \`interior → exterior → performance → utility → charging → safety\`)
5. **CTA** (четкие кнопки призыва к действию)
6. **Image Hierarchy** (иерархия изображений)
7. **Specification Cards** (карточки характеристик)
8. **Scrolling Sections** (секции прокрутки)
9. **Visual Transitions** (визуальные переходы)
10. **Mobile Behavior** (поведение на мобильном экране)

**Задание ученика (Student Task):** Найти **5 UX decisions**, которые делают сайт premium.

---

## 3. PART 2 — Алгоритм работы в Google Stitch (6 шагов)
* **Step 1:** Open Google Stitch.
* **Step 2:** Create project.
* **Step 3:** Describe product:
  \`Design a modern website like tesla.com. Create a premium minimal interface\`
* **Step 4:** Generate UI.
* **Step 5:** Inspect: \`hierarchy\`, \`spacing\`, \`typography\`, \`buttons\`, \`cards\`, \`navigation\`.
* **Step 6:** Ask AI to improve:
  \`Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements.\`

---

## 4. LAB (Практикум)
Создать макет в Google Stitch по эталону tesla.com, улучшать и исправлять иерархию, генерировать новые картинки или кнопки, сохранить проект и экспортировать!`
  },
  {
    id: 6,
    blockId: 2,
    week: 3,
    lessonNumber: 6,
    title: "Website Control Center: HTML, CSS & JS — Three Departments of One Team",
    titleRu: "Урок 6: Центр Управления Сайтом — HTML, CSS и JS как три отдела одной команды",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Заходим в диспетчерскую своего личного сайта: где HTML, CSS и JS работают как три отдела одной команды (транспортный слой структуры, слой визуализации и система живого мониторинга). Режимы «Сырые пакеты» vs «Голограмма». Анатомия тегов <тег>содержимое</тег> и правил селектор { свойство: значение; }. Ролевая игра «Дизайнер и Разработчик». Создание персонального сайта-визитки, интерактивная CSS-диспетчерская, JS-сигнал тревоги и мобильная адаптивность.",
    learningObjectives: [
      "Различать 3 отдела Центра Управления: HTML (структура) · CSS (стиль) · JS (поведение)",
      "Читать простой HTML-тег (h1, p, img, button, div) и понимать его назначение",
      "Менять оформление сайта через CSS-правило: селектор { свойство: значение; }",
      "Добавлять интерактивное поведение и реакцию на клик через JS",
      "Проверять адаптивность сайта на маленьком экране (375px) и соблюдать этический щит (без закрытых личных данных)"
    ],
    tools: ["Google AI Studio", "Google Antigravity", "Browser DevTools", "AI FOR LIFE Portal"],
    commands: [
      { command: "html: <div class=\"card\"><h1>Привет!</h1><button>Связь</button></div>", description: "Структура страницы (HTML)", OS: "Cross" },
      { command: "css: h1 { color: #22d3ee; font-size: 28px; text-align: center; }", description: "Правило оформления (CSS)", OS: "Cross" },
      { command: "js: button.addEventListener('click', () => alert('Сигнал принят!'));", description: "Обработчик клика (JS)", OS: "Cross" }
    ],
    homeworkTitle: "Задание «Второй отдел в деле», Сайд-квесты «Именной тег» & Family Tour",
    homeworkDesc: "Добавить на свой сайт-визитку ещё одну CSS-настройку и одну JS-фишку, протестировать на телефоне, выполнить квесты «Зачем нужен тег <div>» и «Family Tour» для близких.",
    cheatSheetMd: `# Шпаргалка Урока 6: Центр Управления Сайтом

\`\`\`text
3 ОТДЕЛА:  HTML (структура) · CSS (стиль) · JS (поведение)

HTML-ТЕГ:  <тег>содержимое</тег>

CSS-ПРАВИЛО:  селектор { свойство: значение; }

JS:  реагирует на клики, наведения и другие действия

ПРАВИЛО ПРОВЕРКИ:  всегда смотри сайт и на широком, и на узком экране

ЧЕСТНОСТЬ:  никаких личных данных на сайте (адрес, телефон, школа)

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
\`\`\``
  },
  {
    id: 7,
    blockId: 2,
    week: 4,
    lessonNumber: 7,
    title: "Website Control Center — HTML + CSS + JavaScript: Tesla Model X Landing Page in Google AI Studio",
    titleRu: "Урок 7: 🏗️ Website Control Center — HTML + CSS + JavaScript («Теперь дизайн превращается в настоящий сайт»)",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "Теперь дизайн превращается в настоящий сайт! Синтез знаний Урока 5 (🎨 AI Product Designer — Google Stitch: «Сначала дизайн. Потом код.») и Урока 6 (Центр Управления Сайтом — HTML, CSS и JS как три отдела одной команды) для старта настоящего Vibe Coding. Миссия: понять три роли (HTML = structure, CSS = appearance, JavaScript = behavior). Пошаговый гайд (STEP 1 — Open Google AI Studio, STEP 2 — Build Mode: Create a web application, STEP 3 — First Prompt по UX-дизайну из Google Stitch строго на чистых HTML, CSS и JS, STEP 4 — Поиск и разбор файлов index.html, style.css, script.js). Практикум сборки лендинга Tesla Model X (6 секций: Vehicles, Energy, Charging, Semi, Discover, Shop + канонический Footer Tesla © 2026). DEBUG CHALLENGE (охота на 4 бага: broken button, wrong CSS, missing image, JavaScript error) и полное руководство по экспорту исходного кода в ZIP и запуску на локальном ПК.",
    learningObjectives: [
      "Объединять UX/UI-дизайн из Google Stitch (Урок 5) и архитектуру HTML/CSS/JS (Урок 6) в единый процесс Vibe Coding",
      "Применять три роли веб-разработки: HTML = structure (структура), CSS = appearance (внешний вид), JavaScript = behavior (поведение)",
      "Проходить 4 шага в Google AI Studio (Build Mode) и находить ключевые файлы проекта: index.html, style.css, script.js",
      "Создавать полноценный лендинг Tesla Model X (https://www.tesla.com/modelx) с 6 секциями (Vehicles, Energy, Charging, Semi, Discover, Shop) и футером (Tesla © 2026, Privacy & Legal, Vehicle Recalls, Contact, News, Get Updates, Locations, Learn)",
      "Решать DEBUG CHALLENGE (broken button, wrong CSS, missing image, JavaScript error) с помощью точного промпта и экспортировать исходный код для запуска на локальном ПК"
    ],
    tools: ["Google AI Studio (Build Mode)", "Google Stitch (UX Design Reference)", "HTML5 / CSS3 / Vanilla JavaScript", "Browser DevTools", "Local PC (ZIP Export / VS Code Live Server)"],
    commands: [
      { command: "Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS.", description: "STEP 3: Первый промпт в Google AI Studio (Build Mode) по макету из Google Stitch", OS: "Cross" },
      { command: "Find the bug. Explain what caused it. Fix only the necessary code.", description: "DEBUG CHALLENGE: Универсальный промпт для точечной отладки кода без поломки проекта", OS: "Cross" },
      { command: "index.html (HTML = structure) | style.css (CSS = appearance) | script.js (JS = behavior)", description: "STEP 4: Три главных файла в архитектуре веб-приложения", OS: "Cross" }
    ],
    homeworkTitle: "Экспорт лендинга Tesla Model X на локальный ПК + Отладка 4 багов (DEBUG CHALLENGE)",
    homeworkDesc: "Собрать в Google AI Studio лендинг Tesla Model X по дизайну из Google Stitch (6 секций + Footer), пройти DEBUG CHALLENGE на 4 бага, экспортировать исходный код (ZIP) и запустить index.html на своём компьютере.",
    cheatSheetMd: `# Шпаргалка Урока 7: 🏗️ Website Control Center — HTML + CSS + JavaScript

## 1. Главная миссия: «Теперь дизайн превращается в настоящий сайт»
Мы объединяем **Урок 5 (Google Stitch UX/UI)** + **Урок 6 (3 отдела сайта)** и начинаем **Vibe Coding**:
* **HTML = structure** (\`index.html\` — семантический каркас, секции, кнопки, футер)
* **CSS = appearance** (\`style.css\` — минимализм Tesla, сетка, типографика, адаптивность)
* **JavaScript = behavior** (\`script.js\` — переключение вкладок, модальные окна, интерактив)

---

## 2. Пошаговый гайд в Google AI Studio (STEP 1 – STEP 4)
1. **STEP 1 — Create project:** Открой **Google AI Studio** (aistudio.google.com).
2. **STEP 2 — Build Mode:** Выбери режим **Build Mode** → *Create a web application* и прикрепи скриншот/экспорт дизайна из **Google Stitch**.
3. **STEP 3 — First Prompt:**
   \`Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS.\`
4. **STEP 4 — Identify files:** Найди в дереве проекта три файла:
   * \`index.html\`
   * \`style.css\`
   * \`script.js\`

---

## 3. Структура сайта LAB: https://www.tesla.com/modelx
* **6 обязательных секций:** \`1. Vehicles\` · \`2. Energy\` · \`3. Charging\` · \`4. Semi\` · \`5. Discover\` · \`6. Shop\`
* **8 ссылок Footer:** \`Tesla © 2026\` · \`Privacy & Legal\` · \`Vehicle Recalls\` · \`Contact\` · \`News\` · \`Get Updates\` · \`Locations\` · \`Learn\`

---

## 4. DEBUG CHALLENGE (4 бага от учителя)
Если сломались **broken button**, **wrong CSS**, **missing image** или **JavaScript error**, отправь ИИ точный промпт:
\`Find the bug. Explain what caused it. Fix only the necessary code.\`

---

## 5. Экспорт кода и запуск на локальном ПК (Local PC)
1. Нажми **Download / Export ZIP** в Google AI Studio.
2. Распакуй архив в папку на компьютере (проверь наличие \`index.html\`, \`style.css\`, \`script.js\`).
3. Открой \`index.html\` двойным кликом в браузере или через **VS Code Live Server** — твой сайт работает локально!`
  },
  {
    id: 8,
    blockId: 2,
    week: 4,
    lessonNumber: 8,
    title: "Publisher — Git + GitHub + 'My Website LIVE!' & Linux Server Deployment (Nginx / Apache + Real DNS)",
    titleRu: "Урок 8: 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!» (Публикация в интернет и Linux-сервер)",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "Эмоциональная кульминация блока веб-разработки: ученик впервые видит 🌍 свой сайт в настоящем интернете! Предварительная регистрация на GitHub.com. Пошаговый гайд Deploy Google AI Studio Project (7 шагов: Open Google AI Studio → Open project → Test buttons/navigation/responsive/console/images → Save to GitHub → Create repository TeslaModelX → Push project → Open GitHub и проверка README, src, package.json). Второй путь: прямая публикация одним кликом (Publish directly from AI Studio). Обновление живого сайта без поломок: загрузка видео через Cloudinary (https://cloudinary.com/users/login), промпт для добавления фонового видео в Hero-секцию и мгновенный редеплой. Полный профессиональный гайд деплоя проекта напрямую на Linux-сервер (Ubuntu/Debian VPS) без GitHub через веб-серверы Nginx или Apache с привязкой настоящего домена (Real DNS A-записи) и бесплатным SSL-сертификатом Let's Encrypt (Certbot).",
    learningObjectives: [
      "Зарегистрировать аккаунт на GitHub.com и понимать разницу между локальной папкой, Git-репозиторием и Live-хостингом в интернете",
      "Выполнить 7-шаговый протокол деплоя из Google AI Studio в GitHub (проверка 5 пунктов, коннект аккаунта, создание репозитория TeslaModelX, Push и ревизия README, src, package.json)",
      "Публиковать проект напрямую из Google AI Studio (Publish directly from AI Studio) и получать публичную Live URL ссылку",
      "Загружать видео-ассеты в облако Cloudinary, внедрять видео-фон в Hero-секцию через промпт в AI Studio и обновлять Live-сайт без ошибок",
      "Разворачивать сайт напрямую на Linux-сервере (Ubuntu VPS) без GitHub с помощью Nginx или Apache, настраивать реальный DNS (A-записи) и HTTPS (Certbot)"
    ],
    tools: [
      "Google AI Studio (Publish & GitHub Sync)",
      "GitHub.com (Repository TeslaModelX)",
      "Cloudinary (Video Hosting CDN)",
      "Linux VPS (Ubuntu 24.04 LTS)",
      "Nginx & Apache2 Web Servers",
      "DNS Manager (A-Records) & Certbot SSL"
    ],
    commands: [
      { command: "STEP 1..7: AI Studio -> Test (5 checks) -> Save to GitHub -> Repo: TeslaModelX -> Push -> Inspect", description: "Канонический маршрут публикации проекта в GitHub", OS: "Cross" },
      { command: "Add this Cloudinary video URL to the Hero section background with autoplay, loop, muted, playsinline. Save and update live deployment.", description: "Промпт для бесшовного добавления видео из Cloudinary в Hero-секцию", OS: "Cross" },
      { command: "scp -r ./tesla-model-x/* root@SERVER_IP:/var/www/teslamodelx && sudo systemctl reload nginx", description: "Прямая загрузка сайта на Linux-сервер без GitHub и перезапуск Nginx", OS: "Linux" }
    ],
    homeworkTitle: "🎯 FINAL CHALLENGE: GitHub URL + Live URL + Screenshot + Видео в Hero через Cloudinary и Linux DNS чек-лист",
    homeworkDesc: "Отправить 3 обязательных артефакта (GitHub URL репозитория TeslaModelX, публичный Live URL, скриншот живого сайта), обновить Hero-секцию с видео через Cloudinary и пройти конфигуратор деплоя на Linux-сервер (Nginx/Apache + Real DNS).",
    cheatSheetMd: `# Шпаргалка Урока 8: 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»

> **Важно перед стартом:** Заранее зарегистрируйся на **https://github.com** и подтверди свой email!
> **Эмоциональная миссия урока:** Сегодня ты впервые увидишь **🌍 свой собственный сайт в интернете**, доступный с любого телефона и компьютера мира!

---

## 1. GUIDE: Deploy Google AI Studio Project (Путь №1 — Через GitHub)

| Шаг | Действие | Что именно проверяем / делаем |
| :--- | :--- | :--- |
| **STEP 1** | **Open Google AI Studio** | Открываем [aistudio.google.com](https://aistudio.google.com) |
| **STEP 2** | **Open project** | Выбираем наш проект (Tesla Model X из прошлых уроков) |
| **STEP 3** | **Test (Предполётная проверка)** | Проверяем 5 элементов: \`buttons\`, \`navigation\`, \`responsive\`, \`console\`, \`images\` |
| **STEP 4** | **Save to GitHub** | Нажимаем кнопку интеграции с GitHub и подключаем аккаунт (\`Connect GitHub account\`) |
| **STEP 5** | **Create repository** | Задаём чистое имя репозитория, например: \`TeslaModelX\` |
| **STEP 6** | **Push project** | Отправляем (пушим) код проекта в облачное хранилище GitHub |
| **STEP 7** | **Open GitHub** | Открываем репозиторий на GitHub и видим структуру: \`README\`, \`src\`, \`package.json\` и др. |

---

## 2. Второй путь: Publish directly from AI Studio (Прямая публикация)
1. В верхнем правом углу Google AI Studio нажми кнопку **Publish / Deploy App**.
2. Подтверди настройки публичного доступа и получи мгновенную ссылку **Live URL** (\`https://...run.app\`).
3. Открой ссылку на смартфоне — твой сайт **LIVE**!

---

## 3. 🎯 FINAL CHALLENGE: Видео в Hero-секции через Cloudinary + Обновление без сбоев
1. Зайди на **https://cloudinary.com/users/login** (или зарегистрируйся бесплатно).
2. В разделе **Media Library** нажми **Upload** и загрузи красивый MP4-видеоролик (например, движение электромобиля Tesla Model X).
3. Скопируй прямую ссылку на видео (\`https://res.cloudinary.com/.../video/upload/...mp4\`).
4. Открой проект в Google AI Studio и отправь промпт:
\`\`\`text
Update the Hero section of my Tesla Model X website: replace the static background with an HTML5 <video autoplay loop muted playsinline> using this Cloudinary URL: [ВСТАВЬ_ССЫЛКУ]. Keep the text and CTA buttons readable over the video.
\`\`\`
5. Нажми **Save** и **Publish / Update** — твой живой сайт обновится за секунды без единой ошибки!

---

## 4. Бонус-Профи: Деплой напрямую на Linux-сервер (Nginx или Apache + Real DNS) БЕЗ GitHub

Когда ты работаешь как системный инженер и хочешь развернуть сайт напрямую на собственном VPS-сервере (Ubuntu 24.04) со своим доменом (например, \`teslax.myproject.com\`):

### Шаг А. Подготовка сборки и загрузка файлов по SSH (SCP / SFTP)
\`\`\`bash
# Если проект на чистом HTML/CSS/JS — берём папку целиком. Если с Vite — сначала собираем:
npm run build

# Копируем файлы напрямую с локального ПК на Linux-сервер по SSH (без GitHub!):
scp -r ./dist/* root@203.0.113.50:/var/www/teslamodelx/
\`\`\`

### Шаг Б. Настройка реального DNS (Real DNS у регистратора домена)
В панели управления доменом (Cloudflare, Namecheap, Reg.ru) добавь **A-записи**:
- **Type:** \`A\` | **Name:** \`@\` | **Value (IPv4):** \`203.0.113.50\` | **TTL:** \`Auto / 300\`
- **Type:** \`A\` | **Name:** \`www\` | **Value (IPv4):** \`203.0.113.50\` | **TTL:** \`Auto / 300\`

### Шаг В. Вариант 1 — Конфигурация веб-сервера Nginx
\`\`\`bash
sudo apt update && sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/teslamodelx
\`\`\`
Вставь конфиг:
\`\`\`nginx
server {
    listen 80;
    server_name teslax.myproject.com www.teslax.myproject.com;
    root /var/www/teslamodelx;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
\`\`\`
Активируй сайт:
\`\`\`bash
sudo ln -s /etc/nginx/sites-available/teslamodelx /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
\`\`\`

### Шаг Г. Вариант 2 — Конфигурация веб-сервера Apache2
\`\`\`bash
sudo apt update && sudo apt install apache2 -y
sudo nano /etc/apache2/sites-available/teslamodelx.conf
\`\`\`
Вставь конфиг:
\`\`\`apache
<VirtualHost *:80>
    ServerName teslax.myproject.com
    ServerAlias www.teslax.myproject.com
    DocumentRoot /var/www/teslamodelx

    <Directory /var/www/teslamodelx>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
\`\`\`
Активируй сайт:
\`\`\`bash
sudo a2ensite teslamodelx.conf
sudo systemctl reload apache2
\`\`\`

### Шаг Д. Бесплатный HTTPS (SSL-сертификат Let's Encrypt)
\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d teslax.myproject.com -d www.teslax.myproject.com
\`\`\``
  },

  // ==================== BLOCK 3: WOW Website: Motion, Storytelling & Modern Web ====================
  {
    id: 9,
    blockId: 3,
    week: 5,
    lessonNumber: 9,
    title: "Motion Designer: Animating the Web — Hover, Fade, Slide, Reveal & Reduced-Motion",
    titleRu: "Урок 9: Моушн-дизайнер — Оживляем сайт: hover, fade, slide, reveal",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Микро-взаимодействия (micro-interactions) как обязательный стандарт 2026 года. Мёртвый сайт против живого сайта. 4 вида анимации: HOVER (реакция на наведение), FADE (плавное появление через прозрачность), SLIDE (плавное движение элемента), REVEAL (появление при прокрутке страницы). Скорость и тайминг: почему 0.2–0.5с идеальны. Главное правило: Don't animate everything. Animate what matters. Доступность и забота: медиа-запрос @media (prefers-reduced-motion: reduce).",
    learningObjectives: [
      "Понимать разницу между статичным сайтом и интерфейсом с микро-взаимодействиями",
      "Применять 4 ключевых вида анимации: hover, fade, slide, reveal",
      "Составлять точные запросы для ИИ по формуле: ЭЛЕМЕНТ + ВИД ЭФФЕКТА + СКОРОСТЬ + УСЛОВИЕ",
      "Соблюдать правило скорости: 0.2–0.5с для большинства коротких эффектов",
      "Тестировать эффекты на мобильных устройствах (touch вместо hover) и внедрять prefers-reduced-motion"
    ],
    tools: ["Google AI Studio", "Browser DevTools", "GitHub Pages", "AI FOR LIFE Portal"],
    commands: [
      { command: "transition: all 0.3s ease-out; transform: scale(1.05);", description: "CSS-микроанимация hover с увеличением и плавным возвратом", OS: "Cross" },
      { command: "@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }", description: "Включение заботы о пользователях с чувствительностью к анимации", OS: "Cross" }
    ],
    homeworkTitle: "Квест «Улучши взаимодействие», Сайд-квесты «Охота за плохой анимацией» & «Family Hover Test»",
    homeworkDesc: "Довести до совершенства 1 интерактивный эффект на своём опубликованном сайте, провести семейное тестирование на реакцию без подсказок и сделать запись в Дневник ИИ о балансе анимации.",
    cheatSheetMd: `# Шпаргалка Урока 9: Motion Designer (Оживляем сайт)

\`\`\`text
HOVER   — реакция на наведение (увеличение, тень, цвет)
FADE    — плавное появление/исчезновение (прозрачность)
SLIDE   — плавное движение элемента на своё место
REVEAL  — появление при прокрутке (fade + slide вместе)

АНИМАЦИЯ-ЗАПРОС = Элемент + Вид эффекта + Скорость + Условие

ГЛАВНОЕ ПРАВИЛО:  Don't animate everything. Animate what matters.
СКОРОСТЬ:  0.2–0.5 секунды для большинства эффектов
ЗАБОТА:  Поддержка prefers-reduced-motion для комфорта всех пользователей

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share
\`\`\``
  },
  {
    id: 10,
    blockId: 3,
    week: 5,
    lessonNumber: 10,
    title: "Scroll Storyteller: Scrolling = Storytelling — Scrollytelling, Story Arc & Interactive Scenes",
    titleRu: "Урок 10: Scroll Storyteller — Прокрутка как машина времени: скрорителлинг и сцены",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Scrollytelling — рассказ интерактивной истории через прокрутку страницы. Сюжетная дуга (Завязка → Действие → Поворот → Финал). Управление темпом: где ускорить, а где дать паузу. Индикатор прогресса (Scroll Progress Bar). Главное правило: история должна работать даже без анимации — эффект усиливает, а не заменяет суть. Доктор темпа и ролевая игра «Живая Прокрутка».",
    learningObjectives: [
      "Строить сюжетную дугу для scroll-страницы (Завязка → Действие → Поворот → Финал)",
      "Разбивать историю на визуальные сцены-секции, сменяющиеся при прокрутке",
      "Показывать прогресс истории пользователю через интерактивный индикатор",
      "Соединять hover/fade/slide/reveal в единый бесшовный поток скрорителлинга",
      "Управлять темпом: создавать быстрые динамичные моменты и торжественные паузы"
    ],
    tools: ["Google AI Studio", "Browser DevTools", "GitHub Pages", "Intersection Observer API", "AI FOR LIFE Portal"],
    commands: [
      { command: "window.addEventListener('scroll', updateProgressBar);", description: "Расчёт процента прокрутки документа для индикатора прогресса", OS: "Cross" },
      { command: "const observer = new IntersectionObserver((entries) => ...);", description: "Отслеживание момента попадания сцены в область видимости экрана", OS: "Cross" }
    ],
    homeworkTitle: "Квест «Ещё 1 Scroll-Сцена», Сайд-квесты «Охота за Scroll-историями» & «Family Scroll»",
    homeworkDesc: "Добавить ещё одну сцену между Действием и Поворотом, найти реальный пример качественного scrollytelling в интернете и провести семейный тест-драйв молчаливой прокрутки.",
    cheatSheetMd: `# Шпаргалка Урока 10: Scroll Storyteller

\`\`\`text
SCROLLYTELLING:  История, которая раскрывается по мере прокрутки страницы

СЮЖЕТНАЯ ДУГА:  Завязка → Действие → Поворот → Финал

SCROLL-ЗАПРОС = Сцены + Что появляется + Эффект (Урок 9) + Темп

ТЕМП:  Быстро = энергия · Медленно = торжественность

ГЛАВНОЕ ПРАВИЛО:  История должна работать даже без анимации — эффект усиливает, а не заменяет

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share
\`\`\``
  },
  {
    id: 11,
    blockId: 3,
    week: 6,
    lessonNumber: 11,
    title: "Motion Designer & Media Web: Creating $1M Product Visuals (Whisk + Flow + ezgif)",
    titleRu: "Урок 11: ✨ Motion Designer & 🎥 Media Web — Ассеты на $1 000 000: iPhone 18 Pro в цвете Burgundy (из центра в правую часть)",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Теперь сайт начинает выглядеть дорого — на $1 000 000, как флагманская презентация Apple (https://www.apple.com/lae/iphone-18-pro/). «Выберите одно из четырёх великолепных покрытий с задним стеклом в тон корпусу. На фото: iPhone 18 Pro в цвете Бургунди (Burgundy)». Часть 1: Поиск референса на Pinterest и работа с Remix в Google Whisk. Часть 2: Создание начального кадра (Start Frame — крупный план камеры по центру в цвете Burgundy) и конечного кадра (End Frame — полный вертикальный вид смартфона, смещённый в правую часть экрана) по промптам на русском и английском. Часть 3: Генерация плавного 3D-перехода в Google Flow (из центра вправо) и нарезка кадров через Ezgif для AI Studio.",
    learningObjectives: [
      "Понимать архитектуру премиальных продуктовых сайтов за $1 000 000 (на примере Apple iPhone 18 Pro в цвете Burgundy)",
      "Создавать в Google Whisk начальный кадр (Start Frame по центру) и конечный кадр (End Frame со смещением в правую часть кадра, освобождая место слева для текста)",
      "Работать с промптами четвёрки роскошных покрытий с задним стеклом в тон корпусу (color-matched back glass, iPhone 18 Pro shown in Burgundy)",
      "Генерировать бесшовное AI-видео в Google Flow с плавным подъёмом и смещением смартфона из центра в правую сторону",
      "Конвертировать видеоролик в секвенцию кадров через ezgif.com и подготавливать папку ассетов для Google AI Studio"
    ],
    tools: ["Pinterest", "Google Whisk", "Google Flow", "Gemini", "Ezgif (Video to GIF / JPG)", "Google AI Studio"],
    commands: [
      { command: "Pinterest → Google Whisk (Start Center & End Right) → Google Flow (Video) → Ezgif (Frames)", description: "Полный конвейер создания 3D-ассетов iPhone 18 Pro в цвете Burgundy", OS: "Cross" },
      { command: "frame_0001.jpg (Center) ... frame_0120.jpg (Right Side)", description: "Последовательность кадров со смещением из центра в правую часть для Apple Scroll Reveal", OS: "Cross" }
    ],
    homeworkTitle: "Арт-пак «iPhone 18 Pro Burgundy Studio Assets», Сайд-квесты 4 Finishes Remix & Frame Quality Check",
    homeworkDesc: "Сгенерировать пару Start Frame (по центру) и End Frame (справа) в цвете Burgundy в Google Whisk, создать видео-переход в Google Flow и нарезать кадры в Ezgif.",
    cheatSheetMd: `# Шпаргалка Урока 11: ✨ Motion Designer & 🎥 Media Web ($1M Burgundy Assets)

\`\`\`text
ЭТАЛОН:     https://www.apple.com/lae/iphone-18-pro/
ЦВЕТ:       Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy.
КОНВЕЙЕР:   Pinterest → Google Whisk (Кадр 1 Центр → Кадр 2 Справа) → Google Flow → Ezgif

ШАГ 1 (PINTEREST): Найти референс iPhone 18 Pro Max (Burgundy / студийный свет)
ШАГ 2 (WHISK КАДР 1 - START): Крупный план блока камер по центру снизу (нижние 40% экрана, 3D-наклон)
ШАГ 3 (WHISK КАДР 2 - END): Полный корпус смартфона вертикально в ПРАВОЙ части кадра (освобождая левую сторону)
ШАГ 4 (GOOGLE FLOW): Загрузить Start Frame + End Frame → плавный подъём и смещение из центра вправо
ШАГ 5 (EZGIF): https://ezgif.com/video-to-gif → скачать папку кадров для AI Studio

ПРАВИЛО СВЕТА: Абсолютно чистый чёрный фон (#000000) сливается с фоном сайта без видимых швов!
\`\`\``
  },
  {
    id: 12,
    blockId: 3,
    week: 6,
    lessonNumber: 12,
    title: "Project #4: $1M Apple-Style Scroll Website — Building iPhone 18 Pro Burgundy with DESIGN.md (styles.refero.design)",
    titleRu: "Урок 12: 💎 Сайт на $1 000 000 (Project #4) — DESIGN.md (styles.refero.design) + Сборка iPhone 18 Pro Burgundy в AI Studio",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Финальная сборка премиального сайта на $1 000 000 в стиле Apple (https://www.apple.com/lae/iphone-18-pro/) в Google AI Studio! Главный секрет 100% попадания в оригинал: скачиваем готовый файл дизайн-системы DESIGN.md с сервиса https://styles.refero.design и прикрепляем его в Google AI Studio вместе с папкой кадров из Урока 11. Слоган секции: «Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy». При прокрутке (0% → 100%) смартфон поднимается из центра и плавно смещается в правую часть экрана, открывая слева пространство для стеклянных карточек характеристик и селектора 4 цветов. Типографика класса люкс: шрифт Google Font Archivo ('PRO' гигантским текстом позади смартфона).",
    learningObjectives: [
      "Получать эталонный файл спецификации DESIGN.md для Apple iPhone Pro на платформе https://styles.refero.design",
      "Загружать DESIGN.md + подготовленную папку кадров iPhone 18 Pro Burgundy из Урока 11 в Google AI Studio",
      "Подключать акцентный шрифт Google Fonts Archivo (https://fonts.google.com/specimen/Archivo?preview.text=PRO) для массивного заголовка PRO",
      "Настраивать трёхслойную сцену Hero с движением смартфона из центра в правую часть экрана при скролле по спецификации DESIGN.md",
      "Реализовывать блок «Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy» и публиковать готовый сайт"
    ],
    tools: ["https://styles.refero.design (DESIGN.md)", "Google AI Studio", "Google Fonts (Archivo)", "HTML5 Canvas / Scroll Sequence", "GitHub Pages"],
    commands: [
      { command: "https://styles.refero.design → Apple iPhone Pro → Download DESIGN.md", description: "Получение точной дизайн-системы Apple (токены цвета, сетка, отступы, радиусы и эффекты стекла) в формате DESIGN.md", OS: "Cross" },
      { command: "@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap');", description: "Подключение премиального шрифта Archivo для массивной типографики 'PRO'", OS: "Cross" },
      { command: "const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));", description: "Синхронизация скролла страницы с кадрами смещения смартфона из центра вправо", OS: "Cross" }
    ],
    homeworkTitle: "Релиз «$1M Flagship Product Website (Project #4)», Сайд-квесты DESIGN.md Audit & Family WOW-Test",
    homeworkDesc: "Скачать DESIGN.md с https://styles.refero.design, собрать и опубликовать свой флагманский продуктовый сайт iPhone 18 Pro Burgundy со скролл-анимацией из центра вправо.",
    cheatSheetMd: `# Шпаргалка Урока 12: 💎 Сайт на $1 000 000 (DESIGN.md + iPhone 18 Pro Burgundy)

\`\`\`text
ДИЗАЙН-ФАЙЛ: https://styles.refero.design → скачать DESIGN.md (Apple iPhone 18 Pro)
ШРИФТ PRO:   https://fonts.google.com/specimen/Archivo?preview.text=PRO (Archivo Black 900)
ЦВЕТА:       Фон #000000 · Секции #0A0A0C · Акцент #881337 / #9F1239 (Burgundy) · Текст #F5F5F7
СЛОГАН:      Choose from four gorgeous finishes with color-matched back glass.
             iPhone 18 Pro shown in Burgundy.

ТРАЕКТОРИЯ СКРОЛЛА (450vh sticky container + DESIGN.md):
• 0% – 20%:   Смартфон по центру снизу поверх букв "PRO" (крупный план камеры в цвете Burgundy)
• 25% – 55%:  Смартфон плавно поднимается и смещается из центра в ПРАВУЮ сторону экрана
• 55% – 85%:  Слева раскрывается карточка: «Choose from four gorgeous finishes with color-matched back glass»
• 85% – 100%: Финальная композиция (смартфон справа, характеристики и кнопка Предзаказ слева)
\`\`\``
  },

  // ==================== BLOCK 4: WOW Website: Motion, Storytelling & Modern Web ====================
  {
    id: 13,
    blockId: 4,
    week: 7,
    lessonNumber: 13,
    title: "Multi-Page Flagship Ecosystem: Apple Watch Ultra 4 Integration, Bug & Security Audit, Video Scroll & GitHub vs Vercel Deploy",
    titleRu: "Урок 13: ⌚ Экосистема Apple Watch Ultra 4 — Вторая страница, Переключение, Фикс багов, Безопасность и Деплой: ловушка GitHub HTML vs Vercel!",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Расширяем наш флагманский сайт на $1 000 000! Добавляем вторую страницу — Apple Watch Ultra 4 (Titanium 49mm, 3000 нит, GPS L1+L5, глубиномер 40м) по спецификации DESIGN.md с https://styles.refero.design и связываем её с iPhone 18 Pro (Burgundy) через мгновенный переключатель в шапке сайта. Обновляем информационный скроллинг (Information Scrolling), добавляем Hero-видео и плавную анимацию, устраняем баги (сброс скролла, утечки памяти useEffect, конфликты z-index) и укрепляем безопасность (CSP, защита от XSS, rel='noopener noreferrer', секреты в .env). Главный педагогический эксперимент перед релизом: сначала пробуем задеплоить проект на GitHub как обычный HTML/CSS/JS, сталкиваемся с пустым белым экраном и ошибкой чтения .tsx файлов, разбираем причину и выполняем пошаговый автоматический билд и деплой через связку GitHub + Vercel!",
    learningObjectives: [
      "Создавать вторую флагманскую страницу Apple Watch Ultra 4 по спецификации DESIGN.md (styles.refero.design) и интегрировать переключатель iPhone 18 Pro ⇄ Watch Ultra 4",
      "Обновлять информационный скроллинг (Information Scrolling), встраивать Hero-видео и настраивать плавную 60 FPS анимацию",
      "Находить и исправлять баги многостраничного перехода (Scroll Reset наверх, очистка слушателей событий, устранение горизонтального скролла) и укреплять безопасность (Security: .env, CSP, noopener)",
      "Проводить эксперимент с попыткой обычного HTML/CSS/JS деплоя на GitHub Pages и понимать, почему браузер не может напрямую исполнять React/TypeScript (.tsx) без этапа сборки",
      "Выполнять пошаговый профессиональный деплой через GitHub + Vercel (npm run build → dist) и получать живую ссылку .vercel.app"
    ],
    tools: ["Google AI Studio", "https://styles.refero.design (DESIGN.md)", "GitHub", "Vercel (https://vercel.com)", "Google Whisk / Flow", "Chrome DevTools"],
    commands: [
      { command: "window.scrollTo({ top: 0, behavior: 'smooth' });", description: "Сброс позиции прокрутки при переключении между страницами iPhone 18 Pro и Apple Watch Ultra 4", OS: "Cross" },
      { command: "npm run build → dist/ (HTML + CSS + JS bundle)", description: "Компиляция TypeScript (.tsx) и React-компонентов в понятный браузеру статический бандл на серверах Vercel", OS: "Cross" },
      { command: "GitHub Repo → Import to Vercel → Auto-Detect Vite → Deploy", description: "Бесшовный CI/CD пайплайн публикации мультистраничного сайта в интернет", OS: "Cross" }
    ],
    homeworkTitle: "🎯 FINAL CHALLENGE: GitHub + Vercel Live URL («iPhone 18 Pro + Apple Watch Ultra 4»)",
    homeworkDesc: "Добавить страницу Apple Watch Ultra 4 с переключателем, исправить баги и безопасность, протестировать ошибку прямого HTML-деплоя на GitHub и опубликовать рабочий сайт через Vercel.",
    cheatSheetMd: `# Шпаргалка Урока 13: ⌚ Apple Watch Ultra 4 + Интеграция + Фикс багов + GitHub & Vercel
    
\`\`\`text
ЭКОСИСТЕМА:  Страница 1: iPhone 18 Pro (Burgundy)  ⇄  Страница 2: Apple Watch Ultra 4 (Titanium)
НАВИГАЦИЯ:   Верхний стеклянный переключатель + автоматический сброс скролла window.scrollTo(0,0)
СКРОЛЛ+ВИДЕО: Hero-видео (<video autoplay muted loop playsinline>) + 4 карточки телеметрии Watch Ultra 4

ФИКС БАГОВ И БЕЗОПАСНОСТЬ (SECURITY):
• Баги: очистка window.removeEventListener('scroll') в useEffect, overflow-x: hidden, единый z-index
• Security: никаких API-ключей в коде (.env), rel="noopener noreferrer" на ссылках, защита форм от XSS

ПОЧЕМУ ПАДАЕТ ОБЫЧНЫЙ ДЕПЛОЙ В GITHUB КАК HTML/CSS/JS:
• Проект из AI Studio использует React + TypeScript (.tsx) + Vite.
• Браузер не понимает <script src="/src/main.tsx"> без компиляции → возникает Белый Экран!

РЕШЕНИЕ — ДЕПЛОЙ ЧЕРЕЗ VERCEL (6 ШАГОВ):
1. Сохранить проект из AI Studio в GitHub (Save to GitHub)
2. Войти на https://vercel.com через аккаунт GitHub
3. Нажать Add New → Project → выбрать репозиторий
4. Проверить Framework Preset: Vite (Build command: npm run build, Output: dist)
5. Нажать Deploy и получить живую ссылку https://project-name.vercel.app!
\`\`\``
  },
  {
    id: 14,
    blockId: 4,
    week: 7,
    lessonNumber: 14,
    title: "Edit an Existing AI-Built Website With Google AI Studio & Add WhatsApp Click-to-Chat",
    titleRu: "Урок 14: 🛠️ Импорт сайта из GitHub в Google AI Studio, точечный апгрейд и подключение WhatsApp",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Пошаговое руководство по профессиональному редактированию уже созданного ИИ-сайта: безопасный импорт кода из GitHub в Google AI Studio (Add files → Import from GitHub), первичный технический аудит без изменения кода (Import Audit: READY TO EDIT / NEEDS ATTENTION), защита секретных ключей, точечные правки через Annotation Mode по одной секции за шаг (Hero → Контент → Services → CTA → Footer) и подключение официальной кнопки WhatsApp Click-to-Chat (https://wa.me/[NUMBER]?text=...) с финальной проверкой на смартфоне и ПК.",
    learningObjectives: [
      "Импортировать существующий проект из GitHub обратно в Google AI Studio Build без потери рабочей продакшн-версии",
      "Проводить первичный аудит проекта (Import Audit) перед редизайном и проверять статус READY TO EDIT или NEEDS ATTENTION",
      "Использовать режим выделения Annotation Mode и правило «Одно изменение за раз» (Hero → Контент → Services) без поломки других секций",
      "Подключать официальную ссылку WhatsApp Click-to-Chat (https://wa.me/[NUMBER]) с закодированным предзаполненным сообщением",
      "Выполнять финальный WhatsApp Production Audit и тестировать отправку реального сообщения со смартфона и компьютера"
    ],
    tools: ["Google AI Studio Build", "GitHub Import", "Annotation Mode", "WhatsApp Click-to-Chat (wa.me)", "Vercel"],
    commands: [
      { command: "https://wa.me/77011234567?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!", description: "Официальный формат ссылки WhatsApp Click-to-Chat с предзаполненным текстом", OS: "Cross" },
      { command: "npm run build", description: "Проверка production-сборки сайта после точечных правок и добавления WhatsApp", OS: "Cross" }
    ],
    homeworkTitle: "🎯 FINAL REAL-WORLD TEST: Обновление сайта через GitHub Import + живой тест WhatsApp на телефоне",
    homeworkDesc: "Импортировать свой сайт из GitHub в Google AI Studio, провести Import Audit, точечно улучшить Hero и Услуги, подключить кнопку WhatsApp и протестировать отправку реального сообщения со смартфона.",
    cheatSheetMd: `# Шпаргалка Урока 14: Редактирование сайта из GitHub + WhatsApp
\`\`\`text
ЭТАП 1: ИМПОРТ И АУДИТ (0/4)
• Сохрани рабочую версию в GitHub и не удаляй исходный репозиторий
• В Google AI Studio Build: Add files (+) → Import from GitHub → Выбери репозиторий
• Никогда не храни приватные API-ключи в GitHub (используй Secrets)
• Начни с Import Audit (НЕ с редизайна!) → получи статус READY TO EDIT

ЭТАП 2: ТОЧЕЧНЫЕ ПРАВКИ И ANNOTATION MODE (0/5)
• Не пиши «Переделай весь сайт целиком»!
• Иди строго по 1 секции за раз: 1. Hero → 2. Services → 3. CTA → 4. Footer
• Используй Annotation Mode, чтобы выделить конкретный блок на экране

ЭТАП 3: ПОДКЛЮЧЕНИЕ WHATSAPP (0/3)
• Формат: https://wa.me/[НОМЕР_БЕЗ_ПЛЮСА_И_СКОБОК]?text=[ЗАКОДИРОВАННЫЙ_ТЕКСТ]
• Размещай в Hero CTA, секции Контактов или компактной плавающей кнопкой

ЭТАП 4: РЕАЛЬНЫЙ ТЕСТ НА ТЕЛЕФОНЕ И ПК (0/5)
1. Открой живой сайт на телефоне → 2. Нажми WhatsApp → 3. Проверь номер
4. Проверь предзаполненный текст → 5. Отправь тестовое сообщение → 6. Проверь доставку
\`\`\``
  },
  {
    id: 15,
    blockId: 4,
    week: 8,
    lessonNumber: 15,
    title: "Frontend Roadmap — Running & Publishing the Website Yourself (Without AI)",
    titleRu: "Урок 15: 🧭 Дорожная карта Frontend — запускаем и публикуем сайт сами (без ИИ)",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "ИИ (Google AI Studio) уже сделал нам сайт. Сегодня мы становимся настоящими разработчиками: изучаем карту пути разработчика roadmap.sh/frontend, разбираем простыми словами HTML, CSS, JavaScript, Git, GitHub, npm, React, Tailwind CSS и Vitest, сами открываем проект в Antigravity IDE, сами запускаем его в терминале (npm install, npm run dev), меняем код руками, проверяем тестами (npm test, npm run build) и сами публикуем через GitHub и Vercel без подсказок ИИ.",
    learningObjectives: [
      "Рассказать, что такое Frontend и из чего состоит путь разработчика (roadmap.sh/frontend)",
      "Объяснить простыми словами: HTML, CSS, JavaScript, Git, GitHub, npm, React, Tailwind, Vitest",
      "Открыть сайт, экспортированный из Google AI Studio, в Antigravity IDE",
      "Самостоятельно ввести в терминале команды установки и запуска (npm install, npm run dev)",
      "Внести небольшое изменение в код своими руками и увидеть результат в браузере",
      "Запустить проверку (npm test / npm run build) и опубликовать сайт в интернет через GitHub + Vercel"
    ],
    tools: ["roadmap.sh/frontend", "Antigravity IDE", "Node.js & npm", "Git & GitHub", "Vitest", "Vercel"],
    commands: [
      { command: "npm install && npm run dev", description: "Установка пакетов из package.json и локальный запуск сайта в терминале", OS: "Cross" },
      { command: "npm test && npm run build", description: "Запуск роботов-проверяющих (Vitest) и чистовая сборка проекта в папку dist", OS: "Cross" },
      { command: "git add . && git commit -m \"Моё обновление\" && git push", description: "Сохранение изменений в Git и отправка в облачный сейф GitHub", OS: "Cross" }
    ],
    homeworkTitle: "«Мой сайт — моя версия» (3 изменения вручную в Antigravity IDE + Git/GitHub + обновление сайта)",
    homeworkDesc: "Открыть свой проект в Antigravity IDE, запустить npm run dev, внести 3 изменения вручную (текст заголовка, цвет кнопки/блока, картинка/надпись), сохранить в Git и отправить на GitHub для автоматического обновления сайта.",
    cheatSheetMd: `# Шпаргалка Урока 15: 🧭 Дорожная карта Frontend — запускаем и публикуем сайт сами (без ИИ)

\`\`\`text
КАРТА РАЗРАБОТЧИКА: https://roadmap.sh/frontend
3 ГЕРОЯ САЙТА:      HTML (скелет) · CSS (одежда и стиль) · JavaScript (мозг и мышцы)
МАШИНА ВРЕМЕНИ:     Git (точка сохранения на ПК) · GitHub (облачный сейф в интернете)
ДЕТАЛИ LEGO:        npm (магазин деталей) · package.json (список покупок проекта)
СУПЕРСИЛЫ:          React (компоненты) · Tailwind CSS (быстрые классы-стикеры)
ПРОВЕРКА И СБОРКА:  Vitest (робот-тестировщик) · Vite Build (упаковка в папку dist)

ГЛАВНЫЕ КОМАНДЫ ТЕРМИНАЛА:
• node -v        — проверить, установлен ли Node.js
• npm install    — установить все пакеты и детали сайта (1 раз в начале)
• npm run dev    — запустить сайт у себя на компьютере (http://localhost:5173)
• Ctrl + C       — остановить работающий сайт в терминале
• npm test       — запустить роботов-проверяющих (тесты)
• npm run build  — собрать чистовую версию сайта для интернета
• git add . && git commit -m "Моё обновление" && git push — отправить в GitHub
\`\`\``
  },
  {
    id: 16,
    blockId: 4,
    week: 8,
    lessonNumber: 16,
    title: "Mini-Agency: Websites for Real Local Businesses — From Zero to Hero",
    titleRu: "Урок 16: 🚀 Мини-агентство: сайты для реальных бизнесов — от «нуля» до «героя»",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Финал блока «Создание сайтов»: превращаем навыки UI/UX дизайна, генерации кода с ИИ, публикации на GitHub и Vercel и локального запуска в услугу для реальных местных бизнесов. Правила безопасности и честности для учеников 12+ (согласование с преподавателем и родителями, никаких выдуманных фактов и отзывов, защита личных данных). Лестница сайтов (Простой → Бизнес-лендинг → Премиум со скролл-анимациями и параллаксом). Поиск бизнеса на Google Maps, создание демо по Мастер-промпту в Google AI Studio, 3 дополнения (реальные картинки, честные отзывы, премиум-дизайн) и вежливое сообщение владельцу.",
    learningObjectives: [
      "Объяснить, как устроена услуга «сайт для местного бизнеса»",
      "Найти бизнес со слабым или отсутствующим сайтом через Google Maps",
      "Создать демо-сайт по «мастер-промпту» в Google AI Studio",
      "Улучшить сайт: реальные фото, честные отзывы, премиальный дизайн",
      "Опубликовать демо в интернете (GitHub → Vercel)",
      "Написать короткое вежливое сообщение владельцу бизнеса и работать безопасно и честно"
    ],
    tools: ["Google Maps", "Google AI Studio", "GitHub", "Vercel", "Antigravity IDE"],
    commands: [
      { command: "Дизайн (Stitch) → Код с ИИ (AI Studio) → GitHub → Vercel / Hostinger → Обновления → Перенос", description: "Полная цепочка навыков мини-агентства", OS: "Cross" },
      { command: "npm install && npm run dev", description: "Локальная проверка демо-сайта в Antigravity IDE перед публикацией", OS: "Cross" }
    ],
    homeworkTitle: "«Три уровня одного сайта» (Простая / Бизнес-лендинг / Премиум) + Мини-прайс из 3 пакетов",
    homeworkDesc: "Создать и опубликовать на Vercel три версии сайта для бизнеса (Простая, Бизнес-лендинг, Премиум), проверить на телефоне, написать 3–5 предложений о лучшей версии и составить список из 3 пакетов услуг без цен.",
    cheatSheetMd: `# Шпаргалка Урока 16: 🚀 Мини-агентство (сайты для реальных бизнесов)

\`\`\`text
ЦЕПОЧКА: Дизайн (Stitch) → Код с ИИ (AI Studio) → GitHub → Vercel / Hostinger → Обновления → Перенос

ЛЕСТНИЦА САЙТОВ:
🥉 Простой        — одностраничный сайт: контакты, услуги, график
🥈 Бизнес-лендинг — кнопки «Позвонить» и «WhatsApp», карта, FAQ
🥇 Премиум        — скролл-анимации, параллакс, глубина, эффекты

ПУТЬ КЛИЕНТА (4 ШАГА):
1. 🔍 Найди возможность на Google Maps (бизнес без сайта или со слабым сайтом)
2. 🏗️ Создай сайт по Мастер-промпту в Google AI Studio (только реальные факты!)
3. ✨ Улучши сайт (реальные фото, настоящие отзывы, премиум-дизайн)
4. 🌍 Опубликуй на Vercel и подготовь короткое вежливое сообщение (только с разрешением!)

ПРАВИЛА БЕЗОПАСНОСТИ 12+:
• Согласуй с преподавателем и родителями перед тем, как писать бизнесу
• Не раскрывай личный адрес/телефон и не придумывай фальшивые отзывы
• Первое сообщение — короткое, вежливое и без ссылки
\`\`\``
  },

  // ==================== BLOCK 5: AI Apps & Mobile Web ====================
  {
    id: 17,
    blockId: 5,
    week: 9,
    lessonNumber: 17,
    title: "App Builder: Website vs Web App vs Mobile App — A New World Begins",
    titleRu: "Урок 17: App Builder — Website vs Web App vs Mobile App: новый мир начинается",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "90 минут. 7 уровней. 1 первый прототип настоящего приложения. Новый блок курса AI Apps! Сайт — это то, что ты читаешь. Приложение — это то, с чем ты взаимодействуешь. Сегодня разница станет предельно ясной: разбор 3 ступеней (Website → Web App → Mobile App), каноническая формула приложения (User → Input → Logic → Data → Result), мост PWA (установка сайта на телефон) и сборка первого работающего прототипа To-Do или Mini-Quiz.",
    learningObjectives: [
      "Отличать Website, Web App и Mobile App по функциям, хранению данных и способу запуска",
      "Применять каноническую формулу приложения: User → Input → Logic → Data → Result",
      "Писать понятную пятичастную спецификацию приложения в роли Product Owner",
      "Строить и тестировать рабочий прототип приложения (To-Do List или Mini-Quiz) с ИИ",
      "Понимать мост PWA: превращение сайта в устанавливаемое приложение на экране телефона"
    ],
    tools: ["Google AI Studio", "AI FOR LIFE Portal", "PWA Builder", "Figma / Скетч"],
    commands: [
      { command: "localStorage.setItem('todos', JSON.stringify(tasks))", description: "Сохранение данных приложения (Data State) в браузере", OS: "Cross" },
      { command: "<link rel='manifest' href='/manifest.json' />", description: "Подключение манифеста Progressive Web App (PWA)", OS: "Cross" },
      { command: "window.addEventListener('beforeinstallprompt', (e) => e.prompt())", description: "Вызов нативного окна установки веб-приложения на главный экран", OS: "Cross" }
    ],
    homeworkTitle: "Спецификация своего приложения «App Specification», Сайд-квесты App Detective & Family Test",
    homeworkDesc: "Придумать своё оригинальное приложение (не To-Do и не Quiz), составить пятичастную спецификацию User/Input/Logic/Data/Result, найти на телефоне 1 Web App и 1 Mobile App, и провести тестирование прототипа с близкими.",
    cheatSheetMd: `# Шпаргалка Миссии 17: App Builder

\`\`\`text
WEBSITE    = читаешь информацию
WEB APP    = взаимодействуешь и сохраняешь данные
MOBILE APP = устанавливается на телефон, работает офлайн

ФОРМУЛА ПРИЛОЖЕНИЯ:  User → Input → Logic → Data → Result

МОСТ:  Website → Web App → PWA → 📱 иконка на телефоне

ПРАВИЛО ПРОТОТИПА:  Одна главная функция, которая реально работает

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share
\`\`\``
  },
  {
    id: 18,
    blockId: 5,
    week: 9,
    lessonNumber: 18,
    title: "Data & API: Memory of an Application",
    titleRu: "Урок 18: Data & API — Память приложения и работа с внешними данными",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "Память приложения: как оно запоминает и «звонит» в интернет за данными. 3 вида памяти: State (в руках), Local Storage (в рюкзаке), API (звонок другу). Цепочка Request-Response. Безопасность данных: почему нельзя хранить секреты и пароли в коде. Практика подключения бесплатного API к прототипу.",
    learningObjectives: [
      "Понимать фундаментальную разницу между State, Local Storage и API",
      "Сохранять данные в Local Storage, чтобы они оставались после перезагрузки страницы (F5)",
      "Вызывать открытые безопасные API и обрабатывать цепочку Request ➔ Response",
      "Добавлять индикаторы загрузки и дружелюбную обработку сетевых ошибок (catch)",
      "Обеспечивать безопасность: никогда не вставлять секретные пароли и платные ключи в открытый код"
    ],
    tools: ["Google AI Studio", "Local Storage", "Fetch API", "Public APIs", "JSON", "Postman"],
    commands: [
      { command: "localStorage.setItem('tasks', JSON.stringify(tasks))", description: "Сохранение массива данных в долговременную память браузера", OS: "Cross" },
      { command: "const saved = JSON.parse(localStorage.getItem('tasks') || '[]')", description: "Считывание сохраненных данных из Local Storage при старте", OS: "Cross" },
      { command: "fetch('https://api.open-meteo.com/...').then(r => r.json())", description: "Вызов внешнего открытого API через JavaScript Fetch", OS: "Cross" }
    ],
    homeworkTitle: "Миссия «Add a Feature», Сайд-квесты API Explorer & Family Test",
    homeworkDesc: "Добавить 1 новую функцию в своё приложение, используя Local Storage или открытый API. Найти 1 интересный открытый API и провести Memory Test с семьёй.",
    cheatSheetMd: `# Шпаргалка Миссии 18: Data & API

\`\`\`text
STATE          = временная память "прямо сейчас" (исчезает при обновлении)
LOCAL STORAGE  = память, сохранённая на устройстве (остаётся)
API            = "звонок" в интернет за живыми данными

API-ЦЕПОЧКА:  Приложение → Request (запрос) → Сервер → Response (ответ) → Приложение

ПРИМЕРЫ API:  Погода · Цитаты · Факты о животных · Космос

БЕЗОПАСНОСТЬ:  Никогда не хранить пароли/платные ключи в коде приложения

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share
\`\`\``
  },
  {
    id: 19,
    blockId: 5,
    week: 10,
    lessonNumber: 19,
    title: "Building Your First Android App in Google AI Studio",
    titleRu: "Урок 19: 📱 Создаём своё первое Android-приложение в Google AI Studio",
    theoryDuration: 40,
    practiceDuration: 50,
    theorySummary: "📱 Создаём своё первое Android-приложение в Google AI Studio (раздел Build). По простому описанию (промпту) ИИ создаёт приложение на Jetpack Compose и Material 3, мы тестируем его в браузере (Preview), находим проблемы внешнего вида (UI/Layout) и логики и улучшаем короткими точечными промптами (итерациями).",
    learningObjectives: [
      "Открыть режим создания Android-приложений в Google AI Studio (Build → New App → Android)",
      "Написать понятный первый промпт для своего приложения (Jetpack Compose и Material 3)",
      "Протестировать приложение прямо в браузере на виртуальном телефоне (Preview)",
      "Найти ошибки во внешнем виде (UI / Layout) и в работе кнопок",
      "Улучшить приложение короткими уточняющими промптами (итерациями 1–2 изменения за шаг)",
      "Запустить приложение на своём телефоне (QR / APK) или сохранить исходный код (ZIP с Kotlin)"
    ],
    tools: ["Google AI Studio (Build)", "Android Mode", "Jetpack Compose", "Material 3", "Preview"],
    commands: [
      { command: "Build a simple Android app called Study Planner. Use Jetpack Compose and Material 3.", description: "Пример первого промпта для создания Android-приложения", OS: "Cross" },
      { command: "Move the Add Task button slightly higher so it does not overlap the bottom navigation.", description: "Пример короткого промпта для исправления (итерации)", OS: "Cross" }
    ],
    homeworkTitle: "🏠 «Своё полезное Android-приложение: от черновика до версии 2.0»",
    homeworkDesc: "Самостоятельно придумать и создать новое Android-приложение в Google AI Studio, провести 5 коротких итераций улучшения (2 внешнего вида, 2 функций, 1 удобства) и составить краткий отчёт разработчика.",
    cheatSheetMd: `# Шпаргалка Урока 19: Android-приложения в Google AI Studio

\`\`\`text
СХЕМА РАБОТЫ:
Идея → Промпт → Готовый черновик → Проверка в Preview → Короткие правки → Готовое приложение

4 ПУНКТА ПЕРВОГО ПРОМПТА:
1. Что это за приложение? (Study Planner)
2. Для кого оно? (Для школьников)
3. Главные функции (3–4 штуки)
4. Стиль: Jetpack Compose + Material 3

ЗОЛОТОЕ ПРАВИЛО ИТЕРАЦИЙ:
Один короткий промпт = 1–2 конкретных изменения (Правка → Тест → Правка)
\`\`\``
  },
  {
    id: 20,
    blockId: 5,
    week: 10,
    lessonNumber: 20,
    title: "n8n From Scratch: Automation & Telegram Bot",
    titleRu: "Урок 20: 🤖 n8n с нуля: автоматизация и Telegram-бот",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "🤖 Учим компьютер выполнять рутинные задачи сам: «если случилось A, сделай B». Строим кубики-«ноды» в n8n (Cloud или npx n8n), создаём Telegram-бота у @BotFather, безопасно храним токен, находим свой Chat ID и собираем три автоматизации: по кнопке, по расписанию и двустороннего бота.",
    learningObjectives: [
      "Объяснить, что такое автоматизация и чем она полезна",
      "Назвать главные понятия n8n: workflow, node, trigger, credentials, execution",
      "Создать Telegram-бота у @BotFather и безопасно хранить его токен (/revoke при утечке)",
      "Собрать первый workflow: n8n отправляет сообщение в Telegram",
      "Собрать автоматизацию по расписанию (Schedule Trigger) и выключать её после теста",
      "Собрать двустороннего бота (Telegram Trigger) и находить ошибки в Executions"
    ],
    tools: ["n8n Cloud / npx n8n", "Telegram", "@BotFather", "Schedule Trigger", "Telegram Trigger"],
    commands: [
      { command: "npx n8n", description: "Локальный запуск n8n на своём компьютере (http://localhost:5678)", OS: "Cross" },
      { command: "https://api.telegram.org/botТОКЕН/getUpdates", description: "Проверка входящих сообщений бота для получения своего Chat ID", OS: "Cross" }
    ],
    homeworkTitle: "🏠 «Моя полезная автоматизация»",
    homeworkDesc: "Придумать и собрать одну полезную мини-автоматизацию в n8n, нарисовать схему (триггер → действие → результат), проверить в Telegram, выключить workflow после теста и написать 3–5 предложений.",
    cheatSheetMd: `# Шпаргалка Урока 20: n8n и Telegram-бот

\`\`\`text
АВТОМАТИЗАЦИЯ:  Если случилось событие → то выполни действия
СХЕМА:          [Триггер] ──► [Действие 1] ──► [Действие 2]

ГЛАВНЫЕ СЛОВА N8N:
Workflow     = одна автоматизация целиком, как схема
Node         = один кубик-шаг
Trigger      = первый кубик («когда запускаться?»)
Credentials  = пароль или токен доступа
Execution    = одна «пробежка» воркфлоу (история в Executions)
Expression   = вставка данных, например {{ $json.message.text }}

БЕЗОПАСНОСТЬ:
Токен бота — это секрет! При утечке: /revoke у @BotFather.
После теста расписания — обязательно выключи workflow (Unpublish / Inactive).
\`\`\``
  },

  // ==================== BLOCK 6: Portfolio & Demo Day ====================
  {
    id: 21,
    blockId: 6,
    week: 11,
    lessonNumber: 21,
    title: "What is MCP & How to Connect Claude to n8n",
    titleRu: "Урок 21: 🔌 Что такое MCP и как подключить Claude к n8n",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "🔌 Вместо того чтобы вручную собирать кубики, просим ИИ: «Создай автоматизацию, которая…». Claude через MCP (Model Context Protocol — общий «разъём» для ИИ, как USB-C) подключается к n8n и сам ищет, запускает или строит workflow, а мы проверяем и управляем этим безопасно.",
    learningObjectives: [
      "Объяснить, что такое MCP, на понятной аналогии (USB-C для ИИ)",
      "Назвать роли: клиент (Claude), сервер (n8n), инструменты (tools)",
      "Включить доступ MCP в n8n и выбрать, какие workflow доступны ИИ (Available in MCP)",
      "Понимать, как преподаватель подключает Claude к n8n",
      "Сформулировать чёткую просьбу для ИИ по формуле (КТО → ЧТО → КОГДА → КУДА → КАК проверить) и проверить результат вручную",
      "Объяснить правила безопасности при подключении ИИ к своим сервисам"
    ],
    tools: ["n8n Cloud", "MCP (Model Context Protocol)", "Claude", "Telegram Bot"],
    commands: [
      { command: "Settings → Instance-level MCP → Enable MCP access", description: "Включение MCP-сервера в настройках n8n Cloud", OS: "Cross" },
      { command: "Workflow Settings → Available in MCP", description: "Разрешение доступа к конкретному workflow через MCP", OS: "Cross" }
    ],
    homeworkTitle: "🏠 «Пишу задание для ИИ-помощника»",
    homeworkDesc: "Придумать 3 идеи простых автоматизаций, написать для каждой запрос по формуле (КТО → ЧТО → КОГДА → КУДА → КАК проверить), собрать одну вручную в n8n, проверить в Telegram и сформулировать 5 правил безопасности.",
    cheatSheetMd: `# Шпаргалка Урока 21: MCP и Claude + n8n

\`\`\`text
MCP (Model Context Protocol) = общий «разъём» для ИИ, как USB-C

ТРИ РОЛИ:
MCP-клиент          = тот, кто просит (Claude)
MCP-сервер          = тот, кто умеет выполнять действия (n8n)
Tools (инструменты) = список разрешённых действий (найти, запустить, создать workflow)

ФОРМУЛА ЗАПРОСА К ИИ:
КТО делает → ЧТО делает → КОГДА → КУДА → КАК проверить

БЕЗОПАСНОСТЬ:
1. Включать Available in MCP только для нужных workflow
2. Не отправлять токены и пароли в чат с ИИ (они хранятся в Credentials n8n)
3. Всегда проверять ноды перед запуском и отзывать доступ (Revoke access) при необходимости
\`\`\``
  },
  {
    id: 22,
    blockId: 6,
    week: 11,
    lessonNumber: 22,
    title: "AI Services for Study & Creativity: NotebookLM, Pomelli & Gamma",
    titleRu: "Урок 22: 🎓 ИИ-сервисы для учёбы и творчества: NotebookLM, Pomelli и Gamma",
    theoryDuration: 30,
    practiceDuration: 60,
    theorySummary: "🎓 Три разных ИИ-помощника для трёх задач: разобраться в материале (NotebookLM), сделать красивую презентацию (Gamma) и создать рекламные картинки для бизнеса (Pomelli). Проходим каждый сервис шаг за шагом, проверяем факты по ссылкам-цитатам и собираем мини-проект.",
    learningObjectives: [
      "Объяснить, для чего нужны NotebookLM, Pomelli и Gamma, и чем они отличаются",
      "Загрузить материалы в NotebookLM, задать вопросы и получить конспект, ментальную карту и тест",
      "Создать презентацию в Gamma и сохранить её в PDF или PowerPoint",
      "Создать «ДНК бренда» (Business DNA) и рекламный пост в Pomelli по адресу сайта",
      "Проверять то, что сделал ИИ, и работать честно и безопасно"
    ],
    tools: ["NotebookLM", "Gamma (gamma.app)", "Pomelli (Google Labs)"],
    commands: [
      { command: "notebooklm.google.com → Создать блокнот → Добавить источники", description: "Создание учебного блокнота по своим проверенным материалам с цитатами", OS: "Cross" },
      { command: "gamma.app → Create new → Generate → Presentation (7–8 слайдов)", description: "Генерация презентации по плану и экспорт в PDF / PPTX", OS: "Cross" }
    ],
    homeworkTitle: "🏠 «Мой учебный набор с помощью ИИ»",
    homeworkDesc: "Выбрать тему из школьного предмета, загрузить 2–3 разрешённых источника в NotebookLM (создать конспект и пройти тест/карточки), сделать презентацию из 5–6 слайдов в Gamma и проверить 3 факта.",
    cheatSheetMd: `# Шпаргалка Урока 22: NotebookLM, Pomelli и Gamma

\`\`\`text
ТРИ ПОМОЩНИКА:
📓 NotebookLM = учёба по твоим материалам (ответы со ссылками-цитатами, конспект, тест, ментальная карта)
📊 Gamma      = презентации из текста или плана (экспорт в PDF / PPTX)
🎨 Pomelli    = «ДНК бизнеса» (Business DNA) и рекламные посты по адресу сайта

ЦЕПОЧКА МИНИ-ПРОЕКТА:
Материалы → NotebookLM (разобрались) → Gamma (оформили презентацию) → Pomelli (рекламные картинки)

ЗОЛОТОЕ ПРАВИЛО:
ИИ сделал → Я прочитал → Я проверил факты → Я исправил → Я сдал
\`\`\``
  },
  {
    id: 23,
    blockId: 6,
    week: 12,
    lessonNumber: 23,
    title: "Course Review & Building Your Premium Portfolio",
    titleRu: "Урок 23: 🏆 Повторяем всё пройденное и создаём своё премиум-портфолио",
    theoryDuration: 35,
    practiceDuration: 55,
    theorySummary: "🏆 За курс ты создал(а) много всего: сайты, приложения, бота, автоматизации. Сегодня мы собираем всё в одно место — в личное портфолио-сайт, заполняем «Паспорта проектов», публикуем через GitHub и Vercel и готовим презентацию для показа родителям на Уроке 24.",
    learningObjectives: [
      "Вспомнить и коротко рассказать о каждом блоке курса",
      "Собрать «Паспорта проектов»: название, ссылка, инструменты, чему научился",
      "Создать портфолио-сайт со всеми проектами и опубликовать его",
      "Проверить, что все ссылки работают и на сайте нет личных данных",
      "Начать готовить презентацию в Gamma и выступление на 3 минуты"
    ],
    tools: ["Google AI Studio", "Antigravity IDE", "GitHub", "Vercel", "Gamma"],
    commands: [
      { command: "npm install && npm run dev", description: "Локальная проверка портфолио-сайта в Antigravity IDE", OS: "Cross" },
      { command: "git add . && git commit -m 'portfolio' && git push", description: "Публикация портфолио на GitHub и автообновление на Vercel", OS: "Cross" }
    ],
    homeworkTitle: "🏠 «Готовлю показ для родителей»",
    homeworkDesc: "Дополнить портфолио, создать презентацию в Gamma (8–10 слайдов), написать и отрепетировать выступление на 3 минуты, подготовить запасной план (скриншоты/запись) и 2 вопроса от родителей с ответами.",
    cheatSheetMd: `# Шпаргалка Урока 23: Премиум-портфолио

\`\`\`text
ФОРМУЛА ОПИСАНИЯ ПРОЕКТА:
«Что это» → «Как работает» → «Чему научился(ась)»

СТРУКТУРА ПОРТФОЛИО:
1. Главный экран (имя, слоган, кнопка «Смотреть проекты»)
2. Обо мне (2–3 предложения, без личных данных)
3. Мои проекты (карточки с названием, описанием, инструментами и кнопками «Открыть» и «GitHub»)
4. Чему я научился(ась)
5. Как я работаю с ИИ (проверяю, не выдумываю, не делюсь личным)
6. Подвал: «Сделано в AI FOR LIFE 12+»
\`\`\``
  },
  {
    id: 24,
    blockId: 6,
    week: 12,
    lessonNumber: 24,
    title: "Demo Day, Pitching & Final Certification",
    titleRu: "Урок 24: Demo Day — Защита проектов, питчинг и Сертификация",
    theoryDuration: 20,
    practiceDuration: 70,
    theorySummary: "Кульминация 12-недельного пути AI for LIFE. Demo Day: публичная презентация выпускных Capstone-проектов перед менторами и одногруппниками. Правила 3-минутного питча (Проблема -> Решение -> Живое демо -> Технический стек -> Перспективы). Сдача комплексного Финального Экзамена (60 вопросов по всем темам курса) и вручение именных дипломов AI for LIFE Master.",
    learningObjectives: [
      "Подготовить и провести убедительный 3-минутный питч цифрового продукта",
      "Провести живую безошибочную демонстрацию (Live Demo) перед аудиторией",
      "Ответить на технические вопросы менторов по архитектуре и коду",
      "Успешно сдать комплексный Финальный Экзамен курса (порог ≥85%)",
      "Получить официальный именной сертификат AI for LIFE Master с QR-верификацией"
    ],
    tools: ["Live Demo Environment", "Pitch Deck Template", "Verification Portal", "Certificates Registry"],
    commands: [
      { command: "npm test && npm run audit", description: "Финальная проверка академической готовности", OS: "Cross" },
      { command: "generate-certificate --student id --honors true", description: "Генерация дипломированного сертификата", OS: "Cross" }
    ],
    homeworkTitle: "Выпускной портфолио-кейс «AI for LIFE Masterpiece»",
    homeworkDesc: "Оформить финальный кейс проекта в своем резюме и профиле LinkedIn / GitHub: видеодемонстрация, ссылка на продакшн, архитектурная схема и описание примененных навыков Vibe Coding.",
    cheatSheetMd: `# Шпаргалка Урока 24: Структура победного питча

## Формула 3-минутного питча:
1. **Hook & Problem (45 сек)**: С какой острой болью сталкивается пользователь?
2. **The Solution (45 сек)**: Как ваше AI-приложение решает эту боль в 10 раз быстрее?
3. **Live Demo (60 сек)**: Показ работающего интерфейса в реальном времени.
4. **Tech Stack & Future (30 сек)**: Стек (React, Cursor, SQLite, Gemini API) и дальнейшие планы.`
  }
];

// ==================== QUIZ TESTS FOR ALL 6 BLOCKS + FINAL EXAM ====================
export const QUIZ_TESTS: QuizTest[] = [
  {
    id: "TEST_1",
    blockId: 1,
    title: "Рубежный тест Блока 1: AI Foundations & Prompting",
    titleRu: "Рубежный тест Блока 1: Основы ИИ и Промпт-инжиниринг",
    description: "Проверка понимания работы LLM, токенизации, формулы RTFC, Chain of Thought, мультимодального анализа и безопасности.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[1] || []),
      ...(LESSON_QUIZZES[2] || []),
      ...(LESSON_QUIZZES[3] || []),
      ...(LESSON_QUIZZES[4] || []),
    ].slice(0, 10),
  },
  {
    id: "TEST_2",
    blockId: 2,
    title: "Рубежный тест Блока 2: Vibe Coding & Rapid Prototyping",
    titleRu: "Рубежный тест Блока 2: Вайб-кодинг и создание веб-приложений",
    description: "Тестирование навыков работы с Cursor/Windsurf, структурирования UI на Tailwind, отладки багов и интеграции API.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[5] || []),
      ...(LESSON_QUIZZES[6] || []),
      ...(LESSON_QUIZZES[7] || []),
      ...(LESSON_QUIZZES[8] || []),
    ].slice(0, 10),
  },
  {
    id: "TEST_3",
    blockId: 3,
    title: "Рубежный тест Блока 3: Productivity & Deep Research",
    titleRu: "Рубежный тест Блока 3: ИИ для продуктивности и исследований",
    description: "Проверка методов эффективной учебы (Фейнман, Корнелл, Anki), поиска в Perplexity, формул таблиц и системы Second Brain.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[9] || []),
      ...(LESSON_QUIZZES[10] || []),
      ...(LESSON_QUIZZES[11] || []),
      ...(LESSON_QUIZZES[12] || []),
    ].slice(0, 10),
  },
  {
    id: "TEST_4",
    blockId: 4,
    title: "Рубежный тест Блока 4: Creative AI — Media, Video & Audio",
    titleRu: "Рубежный тест Блока 4: Креативный ИИ — Графика, Видео и Звук",
    description: "Тест параметров Midjourney/Flux, кинематографичных промптов для Runway/Kling, клонирования голоса и саунд-дизайна.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[13] || []),
      ...(LESSON_QUIZZES[14] || []),
      ...(LESSON_QUIZZES[15] || []),
      ...(LESSON_QUIZZES[16] || []),
    ].slice(0, 10),
  },
  {
    id: "TEST_5",
    blockId: 5,
    title: "Рубежный тест Блока 5: Autonomous AI Agents & RAG",
    titleRu: "Рубежный тест Блока 5: ИИ-агенты, RAG и автоматизация",
    description: "Проверка архитектуры ReAct, Function Calling, вебхуков n8n/Make, векторных баз данных и мультиагентных систем.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[17] || []),
      ...(LESSON_QUIZZES[18] || []),
      ...(LESSON_QUIZZES[19] || []),
      ...(LESSON_QUIZZES[20] || []),
    ].slice(0, 10),
  },
  {
    id: "TEST_6",
    blockId: 6,
    title: "Рубежный тест Блока 6: AI Capstone Project & Career Launch",
    titleRu: "Рубежный тест Блока 6: Финальный Capstone-проект и Карьера",
    description: "Проверка навыков QA Bug Hunt, защиты API-ключей, деплоя в продакшн, подготовки питч-дека и презентации на Demo Day.",
    questionsCount: 10,
    durationMinutes: 15,
    timeLimitMinutes: 15,
    passingScore: 6,
    maxAttempts: 3,
    xpReward: 100,
    questions: [
      ...(LESSON_QUIZZES[21] || []),
      ...(LESSON_QUIZZES[22] || []),
      ...(LESSON_QUIZZES[23] || []),
      ...(LESSON_QUIZZES[24] || []),
    ].slice(0, 10),
  },
  {
    id: "FINAL_EXAM",
    blockId: 6,
    title: "Финальный Комплексный Экзамен: AI for LIFE Master",
    titleRu: "Финальный Комплексный Экзамен: AI for LIFE Master",
    description: "Итоговая сертификационная аттестация по всей программе (60 комплексных вопросов, по 10 вопросов на каждый из 6 блоков программы). Требуемый порог для получения диплома — 85% (51/60).",
    questionsCount: 60,
    durationMinutes: 90,
    timeLimitMinutes: 90,
    passingScore: 51,
    maxAttempts: 2,
    xpReward: 500,
    questions: [
      // Блок 1 (Уроки 1–4): 10 вопросов
      ...(LESSON_QUIZZES[1]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[2]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[3]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[4]?.slice(0, 2) || []),
      // Блок 2 (Уроки 5–8): 10 вопросов
      ...(LESSON_QUIZZES[5]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[6]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[7]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[8]?.slice(0, 2) || []),
      // Блок 3 (Уроки 9–12): 10 вопросов
      ...(LESSON_QUIZZES[9]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[10]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[11]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[12]?.slice(0, 2) || []),
      // Блок 4 (Уроки 13–16): 10 вопросов
      ...(LESSON_QUIZZES[13]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[14]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[15]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[16]?.slice(0, 2) || []),
      // Блок 5 (Уроки 17–20): 10 вопросов
      ...(LESSON_QUIZZES[17]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[18]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[19]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[20]?.slice(0, 2) || []),
      // Блок 6 (Уроки 21–24): 10 вопросов
      ...(LESSON_QUIZZES[21]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[22]?.slice(0, 3) || []),
      ...(LESSON_QUIZZES[23]?.slice(0, 2) || []),
      ...(LESSON_QUIZZES[24]?.slice(0, 2) || []),
    ],
  },
];

export const ALL_QUIZ_TESTS: QuizTest[] = QUIZ_TESTS;
export const FINAL_EXAM_QUIZ: QuizTest = QUIZ_TESTS.find((q) => q.id === "FINAL_EXAM") || QUIZ_TESTS[QUIZ_TESTS.length - 1];
export const TEST_7_QUIZ: QuizTest = FINAL_EXAM_QUIZ;

export const INITIAL_BADGES: BadgeItem[] = [
  { id: "b_ai_explorer", title: "AI Explorer", titleRu: "AI Explorer", description: "Успешно освоил основы LLM, различие Human vs AI и правила безопасного промптинга.", descriptionRu: "Успешно освоил основы LLM, различие Human vs AI и правила безопасного промптинга.", icon: "Sparkles", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_prompt_master", title: "Prompt Architect", titleRu: "Мастер Промптов", description: "Освоил формулу RTFC, Few-Shot обучение и технику Chain of Thought.", descriptionRu: "Освоил формулу RTFC, Few-Shot обучение и технику Chain of Thought.", icon: "Terminal", category: "AI", unlocked: false, xpReward: 100 },
  { id: "b_multimodal", title: "Multimodal Visionary", titleRu: "Мультимодальный Эксперт", description: "Успешно анализировал схемы, рукописный текст и длинные PDF-документы через ИИ.", descriptionRu: "Успешно анализировал схемы, рукописный текст и длинные PDF-документы через ИИ.", icon: "Globe", category: "AI", unlocked: false, xpReward: 100 },
  { id: "b_vibe_coder", title: "Vibe Coder", titleRu: "Вайб-кодер", description: "Собрал и запустил полноценное React веб-приложение с помощью Cursor IDE.", descriptionRu: "Собрал и запустил полноценное React веб-приложение с помощью Cursor IDE.", icon: "Zap", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_ui_crafter", title: "UI/UX Wizard", titleRu: "Мастер Интерфейсов", description: "Спроектировал интерактивный аналитический дашборд с графиками и микро-анимациями.", descriptionRu: "Спроектировал интерактивный аналитический дашборд с графиками и микро-анимациями.", icon: "LayoutDashboard", category: "General", unlocked: false, xpReward: 100 },
  { id: "b_deep_researcher", title: "Deep Researcher", titleRu: "Глубокий Исследователь", description: "Провел академический ресерч в Perplexity и синтезировал десятки первоисточников.", descriptionRu: "Провел академический ресерч в Perplexity и синтезировал десятки первоисточников.", icon: "Search", category: "AI", unlocked: false, xpReward: 100 },
  { id: "b_creative_synthesizer", title: "Creative Synthesizer", titleRu: "Креативный Синтезатор", description: "Создал полноценный медиа-пак: фото в Midjourney, видео в Kling и трек в Suno.", descriptionRu: "Создал полноценный медиа-пак: фото в Midjourney, видео в Kling и трек в Suno.", icon: "Award", category: "General", unlocked: false, xpReward: 150 },
  { id: "b_motion_designer", title: "Motion Designer", titleRu: "Моушн-дизайнер (Lv.13)", description: "Оживил веб-интерфейс микро-взаимодействиями: hover, fade, slide, reveal и внедрил prefers-reduced-motion.", descriptionRu: "Оживил веб-интерфейс микро-взаимодействиями: hover, fade, slide, reveal и внедрил prefers-reduced-motion.", icon: "Sparkles", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_scroll_storyteller", title: "Scroll Storyteller", titleRu: "Скролл-сторителлер (Lv.14)", description: "Построил сюжетную дугу scrollytelling с 4 сценами, индикатором прогресса и управлением темпом.", descriptionRu: "Построил сюжетную дугу scrollytelling с 4 сценами, индикатором прогресса и управлением темпом.", icon: "Sparkles", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_creative_technologist", title: "Creative Technologist", titleRu: "Креативный Технолог (Lv.15)", description: "Объединил Prompt, Картинку, Видео, Сайт и Анимацию в одну быструю Media Landing Page и провел оптимизацию.", descriptionRu: "Объединил Prompt, Картинку, Видео, Сайт и Анимацию в одну быструю Media Landing Page и провел оптимизацию.", icon: "Sparkles", category: "AI", unlocked: false, xpReward: 150 },
  { id: "app-builder-17", title: "App Builder", titleRu: "Строитель Приложений (Lv.17)", description: "Собрал первый работающий прототип приложения с интерактивным состоянием по формуле User-Input-Logic-Data-Result.", descriptionRu: "Собрал первый работающий прототип приложения с интерактивным состоянием по формуле User-Input-Logic-Data-Result.", icon: "Smartphone", category: "AI", unlocked: false, xpReward: 150 },
  { id: "data-engineer-18", title: "Data Engineer", titleRu: "Инженер Данных (Lv.18)", description: "Дал приложению постоянную память (Local Storage) и подключил внешние живые данные через API.", descriptionRu: "Дал приложению постоянную память (Local Storage) и подключил внешние живые данные через API.", icon: "Database", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_agent_architect", title: "Agent Architect", titleRu: "Архитектор ИИ-Агентов", description: "Спроектировал автономного агента с Function Calling и вебхуками автоматизации.", descriptionRu: "Спроектировал автономного агента с Function Calling и вебхуками автоматизации.", icon: "Cpu", category: "AI", unlocked: false, xpReward: 150 },
  { id: "qa-engineer-21", title: "QA Engineer", titleRu: "QA-Инженер (Lv.21)", description: "Освоил охоту на ошибки во всех 5 проектах: Expected vs Actual, 3 типа багов, regression и Git-ветки.", descriptionRu: "Освоил охоту на ошибки во всех 5 проектах: Expected vs Actual, 3 типа багов, regression и Git-ветки.", icon: "ShieldCheck", category: "AI", unlocked: false, xpReward: 150 },
  { id: "production-architect-23", title: "Production Architect", titleRu: "Архитектор Продакшена (Lv.23)", description: "Вывел проект в глобальный интернет: защитил API-ключи серверным прокси, настроил .env и карточки Open Graph.", descriptionRu: "Вывел проект в глобальный интернет: защитил API-ключи серверным прокси, настроил .env и карточки Open Graph.", icon: "Rocket", category: "AI", unlocked: false, xpReward: 150 },
  { id: "b_rag_expert", title: "RAG Specialist", titleRu: "Специалист RAG", description: "Развернул чат-бота по закрытой корпоративной документации с векторным поиском.", descriptionRu: "Развернул чат-бота по закрытой корпоративной документации с векторным поиском.", icon: "Server", category: "AI", unlocked: false, xpReward: 100 },
  { id: "b_capstone_master", title: "AI for LIFE Master", titleRu: "AI for LIFE Master", description: "Успешно защитил Capstone-проект на Demo Day и сдал финальный экзамен на 85%+.", descriptionRu: "Успешно защитил Capstone-проект на Demo Day и сдал финальный экзамен на 85%+.", icon: "Trophy", category: "AI", unlocked: false, xpReward: 500 },
];

export { INITIAL_LEADERBOARD } from './leaderboardData';

export const INITIAL_DOWNLOADS: ResourceDownload[] = [
  { id: "d1", title: "Prompt Engineering RTFC Handbook (PDF)", category: "PDF", fileSize: "4.2 MB", description: "Полное руководство по составлению промптов: формулы, шаблоны Few-Shot, CoT и примеры.", downloadUrl: "#", iconName: "FileText" },
  { id: "d2", title: "Cursor & Windsurf Quickstart Pack", category: "Scripts", fileSize: "1.8 MB", description: "Настроенные конфигурации .cursorrules, горячие клавиши и шаблоны промптов для Vibe Coding.", downloadUrl: "#", iconName: "FileCode" },
  { id: "d3", title: "Midjourney & Flux Prompt Matrix", category: "PDF", fileSize: "6.5 MB", description: "Справочник стилей, художников, оптики камер, освещения и параметров Midjourney v6.", downloadUrl: "#", iconName: "FileText" },
  { id: "d4", title: "AI Agents & RAG Architecture Blueprint", category: "PDF", fileSize: "3.1 MB", description: "Архитектурные диаграммы построения автономных агентов, ReAct циклов и векторных баз данных.", downloadUrl: "#", iconName: "FileText" },
  { id: "d5", title: "Vibe Coding Starter Template (React + Vite + Tailwind)", category: "Scripts", fileSize: "2.4 MB", description: "Чистый готовый стартер для мгновенного прототипирования приложений через Cursor.", downloadUrl: "#", iconName: "Box" },
  { id: "d6", title: "Automations & n8n Workflow Templates", category: "Scripts", fileSize: "850 KB", description: "Готовые JSON-сценарии для n8n и Make: интеграция Telegram, AI-суммаризация и Notion.", downloadUrl: "#", iconName: "Zap" },
];

export const FAQ_ITEMS: FAQItemData[] = [
  { id: "f1", category: "Обучение", question: "Сколько длится курс и каков его формат?", answer: "Курс рассчитан на 12 недель (24 занятия по 90 минут), включает 24 интерактивные лаборатории, 5 курсовых проектов и итоговый Capstone-проект на Demo Day." },
  { id: "f2", category: "Инструменты", question: "Нужно ли покупать платные подписки на нейросети?", answer: "Все базовые задания курса выполняются на бесплатных тарифах (ChatGPT, Gemini, Claude, Cursor Free tier). Для продвинутых лабораторных предоставляются образовательные квоты и открытые альтернативы." },
  { id: "f3", category: "Vibe Coding", question: "Нужен ли опыт программирования для прохождения курса?", answer: "Нет! Курс построен по методике Vibe Coding: вы учитесь формулировать логику, архитектуру и задачи на естественном языке, а генерацию синтаксиса выполняет ИИ." },
  { id: "f4", category: "Оценки", question: "Как рассчитывается итоговый балл и выдача диплома?", answer: "Итоговый балл складывается из посещаемости (10%), практических лаб (30%), рубежных тестов (20%), домашних заданий (20%) и финального Capstone-проекта (20%). Проходной балл — 60%, диплом с отличием — от 90%." },
  { id: "f5", category: "Сертификат", question: "Какой сертификат выдается выпускникам?", answer: "Выпускники получают именной международный сертификат AI for LIFE Master с уникальным QR-кодом верификации в публичном реестре." },
];

export const HANDBOOK_SECTIONS = [
  {
    id: "rules",
    titleRu: "1. Общие правила и Регламент курса AI for LIFE",
    contentRu: `Добро пожаловать на флагманский курс AI for LIFE — Vibe Coding & Artificial Intelligence!
Данный регламент описывает структуру обучения, учебную этику и требования к сертификации.

📋 Основные параметры курса:
• Продолжительность: 12 недель (24 занятия)
• Занятий в неделю: 2 занятия по 90 минут
• Формат: 30% объяснение · 60% практика · 10% showcase/demo
• 6 тематических модулей
• 5 промежуточных проектов + 1 финальный Capstone-проект

1. Учебный график: Занятия проходят регулярно. Каждые две недели завершается отдельный модуль с рубежным тестом и проектом.
2. Дедлайны: Домашние задания сдаются в течение 7 дней после прохождения соответствующего урока.
3. Практика: Обучение ориентировано на создание реальных работающих цифровых продуктов.
4. Безопасность: Строго запрещено передавать конфиденциальные персональные данные и пароли в публичные LLM.`
  },
  {
    id: "grading",
    titleRu: "2. Система оценивания и Академический EXP",
    contentRu: `Итоговая оценка формируется из 5 компонентов:
- Посещаемость (10% | 100 EXP)
- Выполнение 24 Практических Лабораторий (30% | 2400 EXP)
- Рубежные Тесты 6 Модулей (20% | 900 EXP)
- Домашние задания и Проекты (20% | 1200 EXP)
- Финальный Capstone-проект и Экзамен (20% | 1000 EXP)

Проходной балл для выдачи Сертификата AI for LIFE: 60%.
Диплом с отличием (Honors Master): 90%+ EXP.`
  },
  {
    id: "vibe_mindset",
    titleRu: "3. Манифест Vibe Coder",
    contentRu: `Вайб-кодинг — это искусство превращать чистые мысли и идеи в работающий цифровой продукт со скоростью мысли.
- Мы мыслим архитектурой и пользовательским опытом, а не спотыкаемся о скобки и синтаксис.
- Мы используем ИИ как супер-инструмент, оставаясь главными режиссерами и критиками качества.
- Мы проверяем код, тестируем граничные случаи и бережно относимся к безопасности данных.`
  },
  {
    id: "career",
    titleRu: "4. Карьерный старт и Портфолио",
    contentRu: `Выпускники курса AI for LIFE формируют портфолио из 6 готовых продуктов:
1. Персональный AI Life Helper
2. Интерактивная Web Utility
3. Собственный Second Brain / Knowledge Base
4. Мультимедийная бренд-кампания (видео, графика, аудио)
5. Автономный Telegram-помощник
6. Полномасштабный Capstone веб-сервис`
  }
];
