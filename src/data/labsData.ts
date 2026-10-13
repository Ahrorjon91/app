import { LabData } from '../types';

export const INITIAL_LABS: LabData[] = [
  // ==================== BLOCK 1 (Labs 1–4) ====================
  {
    id: 1,
    lessonId: 1,
    blockId: 1,
    title: "Лабораторная работа #1: Что такое интеллект и AI — Создание «AI School Helper»",
    titleRu: "Занятие 1: Что такое интеллект и AI — Роль AI Explorer",
    difficulty: "Easy",
    estimatedMinutes: 35,
    requirements: ["ChatGPT", "Gemini", "Claude", "Interactive Simulator"],
    topologyDesc: "Пользователь (Ученик) <---> Системный Промпт (RTFC) <---> LLM (Gemini / GPT-4o)",
    scenario: "Настроить системный промпт персонального AI-ассистента для учебы, протестировать устойчивость к нетипичным вопросам и сформулировать правила безопасности.",
    scenarioRu: "Практическое освоение роли AI Explorer: формулирование роли, задачи и ограничений в системном промпте, тестирование генерации и предотвращение утечки личных данных.",
    tasks: [
      {
        id: "t1_1",
        text: "Сформировать системный промпт для роли AI School Helper с правилами и ограничениями",
        descriptionRu: "Задать роль: терпеливый тьютор по математике/физике, который не дает готовых ответов, а задает наводящие вопросы.",
        expectedCommand: "prompt-cli set-system-prompt --role 'Patient Tutor' --safety-filter strict",
        hint: "Укажите: 'Действуй как терпеливый репетитор. Задавай наводящие вопросы вместо прямых ответов.'",
        completed: false
      },
      {
        id: "t1_2",
        text: "Протестировать токенизацию и сравнить размер контекстного окна в разных моделях",
        descriptionRu: "Провести замер длины ответа и токенов при сжатии и развертывании сложного текста.",
        expectedCommand: "prompt-cli analyze-tokens --input 'Explain Quantum Physics' --model gemini-1.5",
        hint: "Помните: 1 токен на русском языке составляет примерно 2-3 символа (0.5 слова).",
        completed: false
      },
      {
        id: "t1_3",
        text: "Провести тест безопасности: проверка на отказ делиться конфиденциальными данными",
        descriptionRu: "Протестировать поведение ассистента на запросы приватных данных и паролей.",
        expectedCommand: "prompt-cli test-safety --pattern 'credentials-leak'",
        hint: "Хорошо настроенный ассистент должен вежливо отклонить передачу приватных сведений.",
        completed: false
      }
    ],
    hints: [
      "При составлении промпта всегда четко ограничивайте область знаний.",
      "Используйте формат вывода с нумерованными шагами для облегчения чтения."
    ],
    solutionGuide: "1. Откройте чат с моделью.\n2. Введите системный промпт с ролью и правилами.\n3. Протестируйте 3 сценария диалога.\n4. Проверьте отсутствие галлюцинаций.",
    verificationCmd: "prompt-cli verify --lesson 1",
    wowMoment: "Вы только что настроили собственную виртуальную персону репетитора, которая может обучать миллионы людей одновременно!",
    isCompleted: false
  },
  {
    id: 2,
    lessonId: 2,
    blockId: 1,
    title: "Лабораторная работа #2: Мастерство промптинга — Формула RTFC и Chain of Thought",
    titleRu: "Занятие 2: Мастерство промптинга — RTFC и пошаговые рассуждения",
    difficulty: "Easy",
    estimatedMinutes: 40,
    requirements: ["Claude 3.5 Sonnet", "ChatGPT Plus", "Gemini 1.5 Pro"],
    topologyDesc: "Исходная задача <---> Промпт-шаблон (Few-Shot + CoT) <---> Структурированный ответ",
    scenario: "Построить Few-Shot промпт с 3 примерами для классификации клиентских отзывов и решения сложной логической задачи с помощью Chain of Thought.",
    scenarioRu: "Освоение формулы RTFC (Role, Task, Format, Context), Few-Shot примеров и техники 'Think step by step' для минимизации логических ошибок.",
    tasks: [
      {
        id: "t2_1",
        text: "Собрать промпт по формуле RTFC для генерации конспекта статьи",
        descriptionRu: "Задать Role, Task, Format (Markdown-таблица) и Context для целевой аудитории.",
        expectedCommand: "prompt-cli build-rtfc --role 'Tech Analyst' --format 'markdown-table'",
        hint: "Не забудьте явно перечислить заголовки колонок таблицы.",
        completed: false
      },
      {
        id: "t2_2",
        text: "Активировать Chain of Thought (пошаговое рассуждение) для решения олимпиадной задачи",
        descriptionRu: "Добавить инструкцию 'Рассуждай по шагам' и убедиться в проверке промежуточных этапов.",
        expectedCommand: "prompt-cli run-cot --task 'logic-puzzle-solve'",
        hint: "CoT позволяет модели использовать дополнительное вычислительное пространство перед генерацией ответа.",
        completed: false
      },
      {
        id: "t2_3",
        text: "Настроить Few-Shot промпт с 3 образцами 'Вход -> Выход'",
        descriptionRu: "Продемонстрировать модели желаемый тон и структуру через 3 пары примеров.",
        expectedCommand: "prompt-cli set-few-shot --samples 3 --strict-format json",
        hint: "Few-Shot обучение — самый надежный способ заставить модель отвечать в нужном формате.",
        completed: false
      }
    ],
    hints: [
      "Для математических задач используйте Temperature = 0.1.",
      "Для мозгового штурма повышайте Temperature до 0.8–0.9."
    ],
    solutionGuide: "1. Сформулируйте 3 блока Few-Shot.\n2. Добавьте фразу рассуждения по шагам.\n3. Сравните точность с простым промптом без CoT.",
    verificationCmd: "prompt-cli verify --lesson 2",
    wowMoment: "Добавление простой фразы 'Рассуждай по шагам' способно повысить математическую точность LLM более чем на 40%!",
    isCompleted: false
  },
  {
    id: 3,
    lessonId: 3,
    blockId: 1,
    title: "Лабораторная работа #3: Мультимодальный AI — Зрение, Анализ PDF и OCR",
    titleRu: "Занятие 3: Мультимодальный AI — Зрение и Документы",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Gemini 1.5 Pro", "GPT-4o Vision", "Whisper"],
    topologyDesc: "Изображение / PDF / Аудио <---> Мультимодальный энкодер <---> Структурированный JSON",
    scenario: "Загрузить фотографию рукописной таблицы и схему архитектуры. Извлечь данные в чистый CSV и получить аудит узких мест архитектуры.",
    scenarioRu: "Практика работы с мультимодальными возможностями: оптическое распознавание текста, чтение сложных графиков и извлечение данных.",
    tasks: [
      {
        id: "t3_1",
        text: "Извлечь рукописные данные из фотографии и преобразовать в валидный CSV",
        descriptionRu: "Использовать Vision-модель для распознавания сложного почерка и структурирования.",
        expectedCommand: "ai-vision ocr --input handwriting.jpg --output table.csv",
        hint: "Попросите модель пометить неразборчивые слова как [?].",
        completed: false
      },
      {
        id: "t3_2",
        text: "Провести аудит схемы архитектуры по прикрепленному изображению диаграммы",
        descriptionRu: "Найти точки единичного отказа (Single Point of Failure) на визуальной схеме.",
        expectedCommand: "ai-vision audit-diagram --input architecture.png --find-spof",
        hint: "Укажите модели конкретную область схемы для детального анализа.",
        completed: false
      },
      {
        id: "t3_3",
        text: "Выполнить транскрипцию и суммаризацию аудиозаписи",
        descriptionRu: "Использовать модель транскрипции Whisper для создания краткого саммари аудиофайла.",
        expectedCommand: "ai-audio transcribe --input lecture.mp3 --summarize",
        hint: "Whisper отлично распознает термины даже при наличии фонового шума.",
        completed: false
      }
    ],
    hints: [
      "Прикрепляйте изображения с разрешением не ниже 1080p для четкого OCR.",
      "Для многостраничных PDF используйте модели с контекстным окном от 1 млн токенов (Gemini)."
    ],
    solutionGuide: "1. Загрузите файл изображения.\n2. Задайте промпт на конвертацию в CSV.\n3. Проверьте правильность распознавания строк.",
    verificationCmd: "prompt-cli verify --lesson 3",
    wowMoment: "Нейросеть распознает рукописный текст врачей и за секунды превращает фото доски в готовый Excel!",
    isCompleted: false
  },
  {
    id: 4,
    lessonId: 4,
    blockId: 1,
    title: "Лабораторная работа #4: ИИ-Художник (Худжанд-2050) и Дизайнер персонажей (Character Sheet)",
    titleRu: "Занятие 4: Генерация «Худжанд-2050» по формуле 6 частей и сборка Character Sheet маскота",
    difficulty: "Medium",
    estimatedMinutes: 60,
    requirements: ["Google Whisk", "Google Gemini", "Prompt Reference Engine", "Character Sheet Studio"],
    topologyDesc: "Формула 6 частей + Паспорт персонажа (4 части) <---> Reference Prompt <---> Худжанд-2050 & Character Sheet",
    scenario: "Сгенерировать концепт «Худжанд-2050» через итерации v1 → v2 → v3 по формуле 6 частей и создать уникального маскота курса с сохранением лица в 4 кадрах (Character Sheet).",
    scenarioRu: "Практика визуального промптинга (Герой + Стиль + Место + Свет + Ракурс + Настроение) и сохранения постоянства лица героя (Reference-приём).",
    tasks: [
      {
        id: "t4_1",
        text: "Собрать и улучшить сцену «Худжанд-2050» через версии v1 → v2 → v3 по формуле 6 частей",
        descriptionRu: "Применить формулу (Герой, Стиль, Место, Свет, Ракурс, Настроение) и менять по одной детали на каждой итерации.",
        expectedCommand: "whisk: subject: tram + style: 3D render + location: Khujand + lighting: golden hour",
        hint: "Меняйте только одну переменную за шаг, чтобы точно контролировать результат.",
        completed: false
      },
      {
        id: "t4_2",
        text: "Сформировать канонический Паспорт персонажа: Внешность + Характер + История + Способность",
        descriptionRu: "Зафиксировать 5–7 неизменных якорных признаков внешности (волосы, глаза, куртка, аксессуар).",
        expectedCommand: "reference: [CHARACTER REFERENCE: 5-7 key features] + scene",
        hint: "5–7 точных деталей работают надежнее, чем длинное расплывчатое описание.",
        completed: false
      },
      {
        id: "t4_3",
        text: "Собрать Character Sheet из 4 кадров (портрет, полный рост, эмоции, город) без потери лица",
        descriptionRu: "Использовать неизменный блок [CHARACTER REFERENCE] во всех 4 сценах.",
        expectedCommand: "emotion_shift: keep [CHARACTER REFERENCE] + change expression only",
        hint: "Копируйте описание внешности слово в слово в каждый новый запрос.",
        completed: false
      }
    ],
    hints: [
      "Используйте каноническую формулу из 6 частей для управления светом, ракурсом и стилем.",
      "Вставляйте неизменный Паспорт внешности перед описанием каждой новой сцены или эмоции."
    ],
    solutionGuide: "1. Создайте арт «Худжанд-2050» (v1–v3).\n2. Оформите Паспорт персонажа.\n3. Соберите 4 кадра Character Sheet и сдайте работу.",
    verificationCmd: "prompt-cli verify --lesson 4",
    wowMoment: "Вы освоили управление стилем и светом в ИИ-арте и научились сохранять одно и то же лицо героя в разных сценах!",
    isCompleted: false
  },

  // ==================== BLOCK 2 (Labs 5–8) ====================
  {
    id: 5,
    lessonId: 5,
    blockId: 2,
    title: "Лабораторная работа #5: 🎨 AI Product Designer — Google Stitch и UX/UI по эталону Tesla Model X",
    titleRu: "Занятие 5: «Сначала дизайн. Потом код.» — Анализ Tesla Model X и создание UI в Google Stitch",
    difficulty: "Medium",
    estimatedMinutes: 55,
    requirements: ["Google Stitch", "Tesla.com (Model X)", "AI Design Canvas", "UI/UX Inspector"],
    topologyDesc: "Idea → UX (Tesla Model X Analysis) → UI (Google Stitch Canvas) → Prototype (Refine & Replace Assets) → Code Export",
    scenario: "Проанализировать страницу Tesla Model X и выписать 5 UX-решений, которые делают сайт премиальным. Открыть Google Stitch, создать проект по промпту в стиле tesla.com, проверить 6 узлов интерфейса, улучшить визуальную иерархию, сгенерировать новые картинки или кнопки, сохранить проект и экспортировать.",
    scenarioRu: "Практическое освоение пайплайна Idea → UX → UI → Prototype → Code в Google Stitch на примере премиального интерфейса Tesla Model X.",
    tasks: [
      {
        id: "t5_1",
        text: "PART 1: Изучить 10 UX-паттернов Tesla Model X и найти 5 UX decisions, делающих сайт premium",
        descriptionRu: "Проанализировать Hero, Typography, Whitespace, Product Storytelling (interior → exterior → performance → utility → charging → safety), CTA и Specification Cards.",
        expectedCommand: "ux-audit --target tesla.com/modelx --patterns 10 --select-top 5",
        hint: "Обратите внимание на последовательный сторителлинг и огромное количество свободного пространства (whitespace).",
        completed: false
      },
      {
        id: "t5_2",
        text: "PART 2: Сгенерировать UI в Google Stitch и провести инспекцию 6 узлов (Step 1 – Step 5)",
        descriptionRu: "Ввести промпт: 'Design a modern website like tesla.com. Create a premium minimal interface' и проверить hierarchy, spacing, typography, buttons, cards, navigation.",
        expectedCommand: "stitch-cli generate --prompt 'Design a modern website like tesla.com. Create a premium minimal interface'",
        hint: "Проверьте, чтобы карточки характеристик читались за 1 секунду, а кнопки CTA имели четкий приоритет.",
        completed: false
      },
      {
        id: "t5_3",
        text: "LAB: Улучшить визуальную иерархию (Step 6), обновить картинки/кнопки, сохранить проект и экспортировать",
        descriptionRu: "Применить промпт: 'Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements.'",
        expectedCommand: "stitch-cli refine-and-export --save-project --export-code",
        hint: "После полировки иерархии и замены визуальных элементов сохраните проект и экспортируйте чистый код.",
        completed: false
      }
    ],
    hints: [
      "Следуйте правилу: Idea → UX → UI → Prototype → Code, а не Prompt → Code → хаос.",
      "В Google Stitch просите модель улучшать визуальную иерархию без добавления лишних декоративных элементов."
    ],
    solutionGuide: "1. Выпишите 5 UX-решений Tesla Model X.\n2. Создайте проект в Google Stitch с промптом в стиле tesla.com.\n3. Проинспектируйте 6 элементов и примените промпт улучшения иерархии.\n4. Обновите картинки/кнопки, сохраните проект и экспортируйте код.",
    verificationCmd: "stitch-cli verify --lesson 5",
    wowMoment: "Вы спроектировали премиальный минималистичный интерфейс уровня Tesla в Google Stitch до написания единой строчки кода!",
    isCompleted: false
  },
  {
    id: 6,
    lessonId: 6,
    blockId: 2,
    title: "Лабораторная работа #6: Центр Управления Сайтом — HTML, CSS, JS и сайт-визитка",
    titleRu: "Занятие 6: Центр Управления Сайтом — HTML, CSS и JS как три отдела одной команды",
    difficulty: "Easy",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio", "Google Antigravity", "CSS-Диспетчерская", "Браузер"],
    topologyDesc: "Структурный план (HTML) ──▶ Стилизация (CSS) ──▶ Интерактив (JS) ──▶ Мобильная проверка ──▶ 20с Питч",
    scenario: "Пройти 5 уровней Центра Управления: составить план сайта, сгенерировать раздельный код (HTML, CSS, JS), настроить оформление в CSS-диспетчерской, добавить JS-обработчик события и защитить проект на Демонстрации.",
    scenarioRu: "Создание персонального сайта-визитки с полным пониманием трех уровней: разметки, стилей и скриптов.",
    tasks: [
      {
        id: "t6_1",
        text: "Сформировать структурный план сайта-визитки (Блоки HTML, Стили CSS, 1 JS-фишка)",
        descriptionRu: "Определить структуру страницы, ключевые увлечения и реакцию на клик.",
        expectedCommand: "site-control init --plan 'avatar,about,hobbies,contact' --mood 'cyber-matte'",
        hint: "Выбирай готовый шаблон или пиши свой уникальный концепт.",
        completed: false
      },
      {
        id: "t6_2",
        text: "Настроить оформление (CSS) в интерактивной Диспетчерской (color, background, border-radius)",
        descriptionRu: "Применить селекторы и свойства, чтобы превратить серый текст в стильную голограмму.",
        expectedCommand: "css-panel apply --color '#22d3ee' --bg 'obsidian' --radius '14px'",
        hint: "Свойство border-radius отвечает за мягкость углов карточки и кнопок.",
        completed: false
      },
      {
        id: "t6_3",
        text: "Подключить JS-обработчик клика с сигналом тревоги и проверить адаптивность (375px)",
        descriptionRu: "Убедиться, что кнопка реагирует на нажатие, а верстка не ломается на мобильном экране.",
        expectedCommand: "js-monitor attach --event 'click' --view 'mobile-375px'",
        hint: "Не забудь проверить: на сайте нет личных данных (адресов, телефонов и школы).",
        completed: false
      }
    ],
    hints: [
      "HTML отвечает за структуру (что есть), CSS — за стиль (как выглядит), JS — за поведение (реакция на клик).",
      "Всегда проверяй сайт на узком экране (375px): большинство посетителей откроют его с телефона."
    ],
    solutionGuide: "1. Заполни 3 поля структурного плана.\n2. Сгенерируй код с разделением HTML/CSS/JS.\n3. Настрой цвета и скругления в CSS-панели.\n4. Протестируй JS-кнопку и адаптивность.\n5. Защити визитку на 20-секундном питче.",
    verificationCmd: "site-control verify --lesson 6",
    wowMoment: "Сайт-визитка заиграл неоновыми стилями и ответил на нажатие кнопки собственным JS-сигналом!",
    isCompleted: false
  },
  {
    id: 7,
    lessonId: 7,
    blockId: 2,
    title: "Лабораторная работа #7: 🏗️ Website Control Center — HTML + CSS + JavaScript (Tesla Model X в Google AI Studio)",
    titleRu: "Занятие 7: 🏗️ Website Control Center — Сборка лендинга Tesla Model X (HTML + CSS + JS), DEBUG CHALLENGE и экспорт на ПК",
    difficulty: "Medium",
    estimatedMinutes: 55,
    requirements: ["Google AI Studio (Build Mode)", "Дизайн из Google Stitch (Урок 5)", "HTML + CSS + JavaScript", "Локальный ПК (ZIP Export)"],
    topologyDesc: "Google Stitch UI (Урок 5) + 3 Отдела (Урок 6) ──▶ Google AI Studio Build Mode (STEP 1–4) ──▶ Tesla Model X (6 секций + Footer) ──▶ DEBUG CHALLENGE (4 бага) ──▶ Export ZIP & Run on Local PC",
    scenario: "Превратить UX-дизайн из Google Stitch в настоящий рабочий сайт Tesla Model X в Google AI Studio (Build Mode) строго на HTML, CSS и JavaScript. Найти файлы index.html, style.css, script.js, собрать 6 секций (Vehicles, Energy, Charging, Semi, Discover, Shop) и канонический футер Tesla © 2026, исправить 4 бага в DEBUG CHALLENGE и запустить экспортированный код на локальном компьютере.",
    scenarioRu: "Полный цикл Vibe Coding от UI-макета Google Stitch и ролей HTML/CSS/JS до сборки лендинга https://www.tesla.com/modelx в Google AI Studio, отладки 4 багов и локального запуска на ПК.",
    tasks: [
      {
        id: "t7_1",
        text: "Пройти STEP 1–4 в Google AI Studio (Build Mode) и найти index.html, style.css, script.js",
        descriptionRu: "Создать веб-приложение по UX-дизайну из Google Stitch с промптом строго на семантическом HTML, современном CSS и JavaScript без лишних библиотек.",
        expectedCommand: "aistudio-build init --prompt 'Create TESLA EV cars landing page based on the attached UX design...' --files 'index.html,style.css,script.js'",
        hint: "Проверьте в дереве проекта наличие всех трёх файлов: index.html (structure), style.css (appearance), script.js (behavior).",
        completed: false
      },
      {
        id: "t7_2",
        text: "LAB: Собрать структуру https://www.tesla.com/modelx (6 секций + 8 ссылок Footer)",
        descriptionRu: "Проверить секции: 1. Vehicles, 2. Energy, 3. Charging, 4. Semi, 5. Discover, 6. Shop и футер: Tesla © 2026, Privacy & Legal, Vehicle Recalls, Contact, News, Get Updates, Locations, Learn.",
        expectedCommand: "tesla-site verify-structure --sections 'Vehicles,Energy,Charging,Semi,Discover,Shop' --footer 'Tesla © 2026'",
        hint: "Все 6 продуктовых разделов должны переключаться в навигации, а внизу страницы должен отображаться минималистичный футер из 8 пунктов.",
        completed: false
      },
      {
        id: "t7_3",
        text: "DEBUG CHALLENGE & Local PC: Исправить 4 бага промптом и запустить экспортированный сайт на локальном ПК",
        descriptionRu: "Устранить broken button, wrong CSS, missing image, JavaScript error промптом 'Find the bug. Explain what caused it. Fix only the necessary code.' и запустить ZIP-архив на компьютере.",
        expectedCommand: "aistudio-debug --fix-all 'broken-button,wrong-css,missing-image,js-error' && aistudio-export --zip --run-local",
        hint: "После скачивания ZIP-архива распакуйте его в отдельную папку и откройте index.html в браузере или через VS Code Live Server.",
        completed: false
      }
    ],
    hints: [
      "HTML = structure (index.html), CSS = appearance (style.css), JavaScript = behavior (script.js).",
      "Для исправления любого бага используйте точную формулу: 'Find the bug. Explain what caused it. Fix only the necessary code.'"
    ],
    solutionGuide: "1. Откройте Google AI Studio → Build Mode и загрузите UX-дизайн из Google Stitch.\n2. Отправьте First Prompt и найдите index.html, style.css, script.js.\n3. Соберите 6 секций Tesla Model X и футер Tesla © 2026.\n4. Исправьте 4 бага в DEBUG CHALLENGE.\n5. Скачайте ZIP с исходным кодом и запустите локально на ПК.",
    verificationCmd: "aistudio-build verify --lesson 7",
    wowMoment: "Дизайн из Google Stitch превратился в настоящий интерактивный сайт Tesla Model X на чистых HTML, CSS и JS, который работает прямо на вашем компьютере!",
    isCompleted: false
  },
  {
    id: 8,
    lessonId: 8,
    blockId: 2,
    title: "Лабораторная работа #8: 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!» и Linux Server Deployment",
    titleRu: "Занятие 8: Публикация проекта из Google AI Studio в GitHub (TeslaModelX), Cloudinary Video и деплой на Linux (Nginx/Apache + DNS)",
    difficulty: "Medium",
    estimatedMinutes: 55,
    requirements: [
      "Аккаунт на GitHub.com (зарегистрированный заранее)",
      "Google AI Studio (готовый проект сайта Tesla Model X)",
      "Аккаунт на Cloudinary (https://cloudinary.com/users/login)",
      "Базовый терминал Linux VPS (Ubuntu + Nginx или Apache + DNS панель)"
    ],
    topologyDesc: "Google AI Studio (Test 5 пунктов) ──▶ Путь 1: GitHub Repo (TeslaModelX: README, src, package.json) ──▶ Путь 2: Direct Publish (Live URL) ──▶ Cloudinary Video в Hero ──▶ Бонус: Linux VPS (Nginx / Apache + Real DNS)",
    scenario: "Впервые вывести свой собственный сайт в настоящий интернет (🌍 Мой сайт LIVE!). Пройти 7 шагов деплоя из Google AI Studio в GitHub-репозиторий TeslaModelX, опубликовать сайт напрямую из AI Studio, добавить фоновое видео в Hero-секцию через Cloudinary с мгновенным обновлением и освоить прямой деплой на Linux-сервер с Nginx или Apache и реальным DNS.",
    scenarioRu: "Практический вывод сайта в глобальную сеть: от предполётного тестирования (buttons, navigation, responsive, console, images) и сохранения в GitHub до обновления Hero-секции видеороликом из Cloudinary и настройки собственного Linux веб-сервера.",
    tasks: [
      {
        id: "t8_1",
        text: "Провести предполётный тест (STEP 3: buttons, navigation, responsive, console, images) и запушить проект в GitHub-репозиторий TeslaModelX (STEPS 4–7)",
        descriptionRu: "Подключить аккаунт GitHub в Google AI Studio, создать репозиторий TeslaModelX, выполнить Push и убедиться, что в репозитории появились README, src и package.json.",
        expectedCommand: "git push -u origin main # Repo: TeslaModelX (README.md, src/, package.json)",
        hint: "В STEP 7 обязательно открой свой профиль на github.com и проверь, что файлы README, папка src и package.json загрузились.",
        completed: false
      },
      {
        id: "t8_2",
        text: "Опубликовать сайт вторым путём (Publish directly from AI Studio) и проверить публичный Live URL",
        descriptionRu: "Использовать встроенную кнопку публикации в Google AI Studio, получить живую ссылку и открыть свой сайт в браузере и на телефоне.",
        expectedCommand: "aistudio publish --project TeslaModelX --public",
        hint: "Прямая публикация из AI Studio мгновенно создаёт облачный контейнер и выдаёт публичный HTTPS-адрес.",
        completed: false
      },
      {
        id: "t8_3",
        text: "Загрузить видео в Cloudinary, добавить его в Hero-секцию через AI Studio и обновить живой сайт без ошибок",
        descriptionRu: "Войти на https://cloudinary.com/users/login, загрузить MP4-видео, передать ссылку в промпт AI Studio для замены фона Hero-секции, сохранить и нажать Publish для бесшовного обновления.",
        expectedCommand: "aistudio prompt \"Add Cloudinary video URL to Hero section background with autoplay, loop, muted\" && aistudio publish --update",
        hint: "Используй прямую ссылку с расширением .mp4 из Cloudinary и атрибуты autoplay, loop, muted, playsinline.",
        completed: false
      },
      {
        id: "t8_4",
        text: "Настроить деплой на Linux-сервер без GitHub (Apache или Nginx + Real DNS) и отправить 🎯 FINAL CHALLENGE (GitHub URL + Live URL + Screenshot)",
        descriptionRu: "Сгенерировать конфигурацию VirtualHost для Nginx или Apache2 с реальной DNS A-записью и сдать три финальных артефакта: ссылку на GitHub, ссылку на Live-сайт и скриншот.",
        expectedCommand: "scp -r ./dist/* root@server:/var/www/teslamodelx && sudo systemctl reload nginx",
        hint: "Для привязки домена укажи IP-адрес твоего Linux-сервера в A-записи (@ и www) у DNS-провайдера.",
        completed: false
      }
    ],
    hints: [
      "Перед началом обязательно войди в свой аккаунт на github.com.",
      "В STEP 3 проверь консоль разработчика (F12 -> Console), чтобы не было красных ошибок.",
      "При загрузке видео на Cloudinary копируй прямую ссылку (Copy URL) из Media Library."
    ],
    solutionGuide: "1. Открой проект в Google AI Studio и проверь 5 пунктов: buttons, navigation, responsive, console, images.\n2. Нажми Save to GitHub -> создай репозиторий TeslaModelX -> Push project.\n3. Открой GitHub и проверь наличие README, src, package.json.\n4. Опубликуй сайт напрямую через Publish directly from AI Studio.\n5. Загрузи видео на https://cloudinary.com/users/login, попроси AI Studio вставить его в Hero-секцию, сохрани и обнови публикацию.\n6. Сдай в FINAL CHALLENGE: GitHub URL + Live URL + Screenshot!",
    verificationCmd: "deploy-cli verify --github TeslaModelX --live-url --cloudinary-video --linux-dns",
    wowMoment: "🌍 УРА! Твой сайт официально LIVE в мировом интернете! Ты умеешь публиковать проекты через GitHub, напрямую из AI Studio, обновлять видео через Cloudinary CDN и даже разворачивать сайты на боевом Linux-сервере с Nginx/Apache и реальным доменом!",
    isCompleted: false
  },

  // ==================== BLOCK 3 (Labs 9–12) ====================
  {
    id: 9,
    lessonId: 9,
    blockId: 3,
    title: "Лабораторная работа #9: Моушн-дизайнер — Оживляем сайт: hover, fade, slide, reveal",
    titleRu: "Урок 9: Моушн-дизайнер — 3 умных эффекта на живом сайте",
    difficulty: "Easy",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio", "Browser DevTools", "GitHub Pages (Сайт из Урока 8)", "prefers-reduced-motion"],
    topologyDesc: "Элемент ──▶ Вид эффекта (hover/fade/reveal) ──▶ Скорость (0.2–0.5с) ──▶ Reduced-Motion (A11y) ──▶ Живой отклик",
    scenario: "Выбрать 3 ключевые точки на опубликованном сайте, составить точные промпты для ИИ по канонической формуле, внедрить микро-анимации, проверить поведение на сенсорном экране смартфона и активировать поддержку режима уменьшения движения.",
    scenarioRu: "Добавление профессиональной микро-динамики и анимации переходов в работающий сайт с сохранением скорости и доступности.",
    tasks: [
      {
        id: "t9_1",
        text: "Выбрать 3 места на сайте и составить запрос для ИИ по канонической формуле",
        descriptionRu: "Использовать формулу: ЭЛЕМЕНТ + ВИД ЭФФЕКТА + СКОРОСТЬ + УСЛОВИЕ.",
        expectedCommand: "motion-cli prompt --formula 'element+effect+speed+trigger'",
        hint: "Не анимируй всё подряд — сфокусируйся на кнопке призыва к действию и карточках.",
        completed: false
      },
      {
        id: "t9_2",
        text: "Добавить hover-эффект на кнопку и плавное появление (fade/slide) карточки",
        descriptionRu: "Настроить оптимальную длительность переходов (transition: 0.2–0.5s ease).",
        expectedCommand: "css-motion --apply-hover --duration 0.3s --easing ease-out",
        hint: "Анимация дольше 0.5 секунды начинает казаться пользователю медленной и раздражающей.",
        completed: false
      },
      {
        id: "t9_3",
        text: "Проверить отклик на телефоне и включить prefers-reduced-motion",
        descriptionRu: "Убедиться, что сайт удобен на тач-экране, и добавить медиа-запрос для пользователей с вестибулярной чувствительностью.",
        expectedCommand: "a11y-cli test --feature prefers-reduced-motion --touch-mode true",
        hint: "Поддержка prefers-reduced-motion — признак заботы о каждом посетителе сайта.",
        completed: false
      }
    ],
    hints: [
      "Правило дня: Don't animate everything. Animate what matters.",
      "Для мобильных устройств всегда проверяй активные состояния касания (:active / touch).",
      "Проверь сайт на реальном смартфоне по ссылке из Урока 8."
    ],
    solutionGuide: "1. Выбери кнопку и карточки на сайте.\n2. Собери запрос для ИИ по формуле.\n3. Добавь CSS transitions.\n4. Протестируй на смартфоне.\n5. Добавь медиа-запрос prefers-reduced-motion.",
    verificationCmd: "motion-cli verify --lesson 9",
    wowMoment: "Кнопки и карточки отзываются на каждое движение мышки — сайт стал по-настоящему живым и интерактивным!",
    isCompleted: false
  },
  {
    id: 10,
    lessonId: 10,
    blockId: 3,
    title: "Лабораторная работа #10: Scroll Storyteller — Строим Scroll-Сцену",
    titleRu: "Урок 10: Scroll Storyteller — Интерактивная scroll-история",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio", "Материалы проекта", "Индикатор прогресса", "Браузер"],
    topologyDesc: "Сюжетная дуга (4 сцены) ──▶ Scroll-запрос для ИИ ──▶ Сборка в AI Studio ──▶ Индикатор прогресса ──▶ Тест «Только текст»",
    scenario: "Собрать захватывающую scroll-страницу по сюжетной дуге (Завязка → Действие → Поворот → Финал) с индикатором прогресса прокрутки, плавным появлением сцен и проверкой читаемости без анимаций.",
    scenarioRu: "Практика скрорителлинга: построение сцен, управление вниманием читателя через прокрутку и создание визуального темпа.",
    tasks: [
      {
        id: "t10_1",
        text: "Написать сюжетную дугу из 4 сцен (Завязка, Действие, Поворот, Финал)",
        descriptionRu: "Сформулировать интригующую завязку, сцену действия, кульминационный поворот и вдохновляющий финал с кнопкой.",
        expectedCommand: "story-cli plan-arc --scenes 'setup,action,twist,finale'",
        hint: "Помни формулу: Завязка задаёт вопрос, Действие развивает контекст, Поворот удивляет, Финал даёт действие.",
        completed: false
      },
      {
        id: "t10_2",
        text: "Собрать scroll-секцию с ИИ в Google AI Studio и подключить эффекты",
        descriptionRu: "Использовать формулу: СЦЕНЫ + ЧТО ПОЯВЛЯЕТСЯ + КАКОЙ ЭФФЕКТ + ТЕМП.",
        expectedCommand: "vibe-cli generate-scroll --scenes 4 --effects 'fade,slide,reveal' --responsive",
        hint: "Не запускай все анимации разом: каждая сцена должна плавно появляться при доскролливании.",
        completed: false
      },
      {
        id: "t10_3",
        text: "Добавить индикатор прогресса (Scroll Progress Bar) и пройти тест «Только текст»",
        descriptionRu: "Интегрировать верхнюю полоску прокрутки и убедиться, что сюжет понятен даже с отключенной анимацией.",
        expectedCommand: "scroll-cli test-clarity --progress-bar top --text-only-pass",
        hint: "Анимация усиливает историю, но не заменяет её: сильный текст — главный фундамент сюжета.",
        completed: false
      }
    ],
    hints: [
      "Используй короткие фразы на первом экране для создания интриги.",
      "Для важных кульминационных моментов давай больше свободного пространства и замедляй темп."
    ],
    solutionGuide: "1. Заполни 4 сцены сюжетной дуги.\n2. Собери scroll-запрос.\n3. Сгенерируй код в AI Studio.\n4. Добавь прогресс-бар вверху.\n5. Проверь читаемость текста с отключенной анимацией.",
    verificationCmd: "scroll-storyteller verify --lesson 10",
    wowMoment: "Простая прокрутка страницы превратилась в кинематографичное интерактивное путешествие пальцем по экрану!",
    isCompleted: false
  },
  {
    id: 11,
    lessonId: 11,
    blockId: 3,
    title: "Лабораторная работа #11: ✨ Motion Designer & 🎥 Media Web — 3D-ассеты iPhone 18 Pro Burgundy (из центра вправо)",
    titleRu: "Урок 11: Ассеты на $1 000 000 — iPhone 18 Pro в цвете Burgundy: от центра к правой части кадра",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Pinterest", "Google Whisk", "Google Flow (flow.google.com)", "Ezgif (ezgif.com/video-to-gif)", "Google AI Studio"],
    topologyDesc: "Pinterest (Референс) ──▶ Google Whisk (Кадр 1 Центр + Кадр 2 Справа в цвете Burgundy) ──▶ Google Flow (Видео) ──▶ Ezgif (Кадры)",
    scenario: "Найти референс iPhone 18 Pro на Pinterest, сгенерировать начальный кадр (крупный план камеры снизу по центру в цвете Burgundy с задним стеклом в тон корпусу) и конечный кадр (полный смартфон вертикально в правой части экрана) в Google Whisk, создать плавный видео-переход из центра вправо в Google Flow и нарезать видео на кадры в Ezgif.",
    scenarioRu: "Подготовка студийного 3D-контента iPhone 18 Pro в цвете Бургунди (Burgundy) со смещением из центра в правую часть экрана.",
    tasks: [
      {
        id: "t11_1",
        text: "Найти референс iPhone 18 Pro на Pinterest и создать Кадр 1 (Start Frame — по центру) в Google Whisk",
        descriptionRu: "Использовать Промпт №1: нижние 40% кадра строго по центру, 3D-наклон назад, покрытие Burgundy с задним стеклом в тон корпусу (color-matched back glass), фон #000000.",
        expectedCommand: "whisk-cli generate --frame start-center --color 'burgundy-glass' --bg '#000000'",
        hint: "Следи, чтобы фон вокруг смартфона был абсолютно чёрным (#000000) без серых пятен — тогда он идеально сольётся с сайтом.",
        completed: false
      },
      {
        id: "t11_2",
        text: "Создать Кадр 2 (End Frame — справа) в Google Whisk: полный вид смартфона в правой части кадра",
        descriptionRu: "Использовать Промпт №2: смартфон занимает 75–80% высоты и смещён в правую часть кадра (Right Side), освобождая левую половину под текст.",
        expectedCommand: "whisk-cli generate --frame end-right --view 'full-back-burgundy' --position 'right'",
        hint: "Используй функцию Remix в Whisk на основе первого кадра, чтобы сохранить тот же глубокий винный оттенок Burgundy и заднее стекло в тон корпусу.",
        completed: false
      },
      {
        id: "t11_3",
        text: "Сгенерировать видео-переход из центра вправо в Google Flow и конвертировать в GIF/кадры на Ezgif",
        descriptionRu: "Загрузить оба кадра в flow.google.com, получить плавный подъём со смещением из центра в правую сторону и разложить на кадры через ezgif.com/video-to-gif.",
        expectedCommand: "flow-video render --start center.png --end right.png && ezgif convert --to-frames",
        hint: "Оптимальная частота для плавного скролла — 24 или 30 кадров в секунду при длительности 3–4 секунды (около 90–120 кадров).",
        completed: false
      }
    ],
    hints: [
      "В обоих промптах используй формулировку: «Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy».",
      "Смещение смартфона из центра в правую часть кадра освобождает левую сторону экрана для карточек характеристик на сайте."
    ],
    solutionGuide: "1. Найди референс iPhone 18 Pro Burgundy на Pinterest.\n2. Сгенерируй Кадр 1 (по центру) и Кадр 2 (справа) в Google Whisk.\n3. Соедини их в видео (движение из центра вправо) в Google Flow.\n4. Конвертируй видео через Ezgif и сохрани папку для Урока 12.",
    verificationCmd: "media-web verify --lesson 11 --burgundy-assets-ready",
    wowMoment: "Две статичные картинки превратились в кинематографичный 3D-разворот смартфона цвета Бургунди со смещением из центра в правую сторону экрана!",
    isCompleted: false
  },
  {
    id: 12,
    lessonId: 12,
    blockId: 3,
    title: "Лабораторная работа #12: 💎 Сборка сайта на $1 000 000 — DESIGN.md (styles.refero.design) + iPhone 18 Pro Burgundy в AI Studio",
    titleRu: "Урок 12: Сборка флагманского сайта по DESIGN.md (styles.refero.design) со скроллом из центра вправо и шрифтом Archivo",
    difficulty: "Hard",
    estimatedMinutes: 50,
    requirements: ["https://styles.refero.design (DESIGN.md)", "Google AI Studio", "Папка кадров / GIF из Урока 11", "Google Fonts: Archivo", "GitHub Pages"],
    topologyDesc: "styles.refero.design (DESIGN.md) + Папка кадров (Burgundy Center→Right) + Шрифт Archivo ('PRO') ──▶ AI Studio ──▶ GitHub Pages",
    scenario: "Перейти на https://styles.refero.design, получить файл дизайн-системы DESIGN.md для Apple iPhone 18 Pro, загрузить его вместе с кадрами Burgundy из Урока 11 в Google AI Studio, подключить шрифт Archivo для гигантской надписи 'PRO' и собрать идеальный 1-в-1 лендинг.",
    scenarioRu: "Финальная сборка сайта на $1 000 000 по спецификации DESIGN.md (https://styles.refero.design) и образцу https://www.apple.com/lae/iphone-18-pro/ в цвете Бургунди.",
    tasks: [
      {
        id: "t12_1",
        text: "Получить файл DESIGN.md на https://styles.refero.design и подключить шрифт Google Fonts Archivo ('PRO')",
        descriptionRu: "Скачать DESIGN.md с https://styles.refero.design для точного попадания в дизайн Apple. Выстроить 3 слоя: фон #000000, текст 'PRO' шрифтом Archivo (z-index: 1) и смартфон (z-index: 2).",
        expectedCommand: "refero-cli export --source 'https://styles.refero.design' --output 'DESIGN.md'",
        hint: "Файл DESIGN.md содержит точные CSS-токены Apple: отступы, радиусы скругления, glassmorphism и типографическую шкалу.",
        completed: false
      },
      {
        id: "t12_2",
        text: "Прикрепить DESIGN.md + папку кадров и отправить Мастер-Промпт (Burgundy + смещение из центра вправо) в AI Studio",
        descriptionRu: "Синхронизировать прокрутку контейнера (450vh) со смещением смартфона в правую сторону и появлением слева карточки 4 покрытий (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy).",
        expectedCommand: "scroll-canvas bind --design 'DESIGN.md' --height 450vh --motion 'center-to-right' --finish 'burgundy'",
        hint: "Когда ИИ в Google AI Studio видит прикреплённый файл DESIGN.md, он генерирует вёрстку, на 100% совпадающую с оригинальным стилем Apple!",
        completed: false
      },
      {
        id: "t12_3",
        text: "Протестировать плавность скролла на ПК и смартфоне и опубликовать сайт на GitHub Pages",
        descriptionRu: "Проверить работу секций Обзор, 4 покрытия с задним стеклом в тон корпусу (Burgundy), Камера Pro и кнопки Предзаказ.",
        expectedCommand: "git push origin main && pages-deploy --verify-1m-site",
        hint: "При скролле назад (вверх) смартфон должен плавно возвращаться с правой стороны обратно в центр к начальному ракурсу камеры.",
        completed: false
      }
    ],
    hints: [
      "Бесплатный каталог дизайн-систем и стилей реальных сайтов: https://styles.refero.design (скачай оттуда DESIGN.md).",
      "Шрифт Archivo с превью текста PRO доступен по ссылке: https://fonts.google.com/specimen/Archivo?preview.text=PRO"
    ],
    solutionGuide: "1. Открой https://styles.refero.design и скачай DESIGN.md для Apple iPhone Pro.\n2. Загрузи DESIGN.md и ассеты Burgundy из Урока 11 в Google AI Studio.\n3. Скопируй русский Мастер-Промпт из урока и сгенерируй скролл-лендинг.\n4. Опубликуй проект и отправь живую ссылку.",
    verificationCmd: "project-cli verify --lesson 12 --million-dollar-build",
    wowMoment: "Благодаря DESIGN.md с https://styles.refero.design и кадрам из Google Flow сайт выглядит неотличимо от официальной презентации Apple за $1 000 000!",
    isCompleted: false
  },

  // ==================== BLOCK 4 (Labs 13–16) ====================
  {
    id: 13,
    lessonId: 13,
    blockId: 4,
    title: "Лабораторная работа #13: ⌚ Вторая страница Apple Watch Ultra 4, Фикс багов, Безопасность и Деплой в Vercel",
    titleRu: "Урок 13: Интеграция Apple Watch Ultra 4 + Переключатель + GitHub HTML Crash vs Vercel Live",
    difficulty: "Medium",
    estimatedMinutes: 50,
    requirements: ["Google AI Studio", "DESIGN.md (styles.refero.design)", "GitHub Account", "Vercel Account (vercel.com)"],
    topologyDesc: "iPhone 18 Pro ⇄ Apple Watch Ultra 4 ──▶ Фикс багов & Security ──▶ Попытка GitHub HTML (Ошибка .tsx) ──▶ Vercel Build (LIVE!)",
    scenario: "Добавить в проект вторую страницу Apple Watch Ultra 4 с видео и информационным скроллингом, настроить переключение между продуктами, исправить баги и уязвимости безопасности, проверить ошибку прямого деплоя на GitHub Pages и опубликовать рабочий сайт через Vercel.",
    scenarioRu: "Создание защищённой мультистраничной продуктовой экосистемы и освоение современной облачной сборки React/Vite проектов на платформе Vercel.",
    tasks: [
      {
        id: "t13_1",
        text: "Добавить страницу Apple Watch Ultra 4 (видео + скролл-карточки) и переключатель iPhone ⇄ Watch",
        descriptionRu: "Использовать DESIGN.md с https://styles.refero.design и русский Мастер-Промпт для интеграции второй страницы в Google AI Studio.",
        expectedCommand: "ai-studio integrate --page 'apple-watch-ultra-4' --switcher navbar --video-scroll",
        hint: "Не забудь добавить плавный сброс скролла window.scrollTo({ top: 0, behavior: 'smooth' }) при переключении вкладок.",
        completed: false
      },
      {
        id: "t13_2",
        text: "Исправить баги переключения (Memory Leak, overflow-x) и провести аудит безопасности (Security)",
        descriptionRu: "Очистить слушатели событий скролла в useEffect, защитить внешние ссылки rel='noopener noreferrer' и убрать секреты в .env.",
        expectedCommand: "security-audit fix --cleanup-listeners --rel-noopener --env-secrets",
        hint: "Никогда не оставляй приватные API-ключи в публичном коде перед отправкой в GitHub.",
        completed: false
      },
      {
        id: "t13_3",
        text: "Проверить ошибку деплоя как HTML/CSS/JS на GitHub и выполнить успешный деплой через Vercel",
        descriptionRu: "Убедиться, почему сырой .tsx не работает без сборки, подключить репозиторий к https://vercel.com и получить живой домен .vercel.app.",
        expectedCommand: "vercel deploy --prod --framework vite --output dist",
        hint: "Vercel автоматически запустит npm install и npm run build, превратив React/TypeScript в быстрый сайт.",
        completed: false
      }
    ],
    hints: [
      "Сначала покажи ученикам ошибку белого экрана на обычном GitHub Pages — это лучший способ навсегда понять, зачем нужен сборщик Vite и платформа Vercel.",
      "В Vercel не нужно ничего настраивать вручную: он сам распознаёт проект из Google AI Studio (Framework Preset: Vite)."
    ],
    solutionGuide: "1. Сгенерируй вторую страницу Apple Watch Ultra 4 и переключатель в AI Studio.\n2. Исправь баги скролла и проверь безопасность.\n3. Сохрани проект в GitHub и посмотри ошибку сырого main.tsx.\n4. Импортируй репозиторий на vercel.com и нажми Deploy.",
    verificationCmd: "vercel-cli verify --lesson 13 --multi-page-live",
    wowMoment: "После пугающего белого экрана на сыром GitHub Pages платформа Vercel за 40 секунд собирает проект, и обе страницы — iPhone 18 Pro и Apple Watch Ultra 4 — летают в онлайне!",
    isCompleted: false
  },
  {
    id: 14,
    lessonId: 14,
    blockId: 4,
    title: "Лабораторная работа #14: 🛠️ Импорт сайта из GitHub в AI Studio, точечный апгрейд и подключение WhatsApp",
    titleRu: "Миссия 14: Редактирование существующего ИИ-сайта из GitHub и интеграция WhatsApp Click-to-Chat",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio Build", "GitHub-репозиторий сайта", "Annotation Mode", "WhatsApp (wa.me)"],
    topologyDesc: "GitHub Repo ──▶ Import in AI Studio ──▶ Import Audit (READY TO EDIT) ──▶ Targeted Edits (Hero/Services) ──▶ WhatsApp Click-to-Chat & Mobile Test",
    scenario: "Импортировать существующий сайт из GitHub в Google AI Studio, провести технический аудит без изменения кода, выполнить точечные улучшения Hero и секции Услуг по очереди и подключить кнопку WhatsApp с предзаполненным сообщением и проверкой на телефоне.",
    scenarioRu: "Безопасное обновление рабочего сайта с сохранением всех функций и добавлением мгновенного канала связи через WhatsApp.",
    tasks: [
      {
        id: "t14_1",
        text: "Импортировать сайт из GitHub (Add files → Import from GitHub) и запустить промпт Import Audit",
        descriptionRu: "Проверить структуру проекта без изменения кода и получить статус READY TO EDIT.",
        expectedCommand: "ai-studio import-github --run-audit --check-status 'READY TO EDIT'",
        hint: "Не проси ИИ сразу переделывать дизайн: сначала запусти промпт аудита и убедись, что превью работает.",
        completed: false
      },
      {
        id: "t14_2",
        text: "Выполнить точечные правки по одной секции за шаг (Improve Hero, Update Content, Improve Services)",
        descriptionRu: "Использовать Annotation Mode или целевые промпты, сохраняя рабочие ссылки и не затрагивая соседние секции.",
        expectedCommand: "ai-studio edit-section --target 'hero,services' --preserve-links",
        hint: "Избегай глобального запроса «Переделай весь сайт» — меняй строго по 1 блоку за шаг.",
        completed: false
      },
      {
        id: "t14_3",
        text: "Подключить ссылку WhatsApp Click-to-Chat (https://wa.me/[NUMBER]?text=...) и пройти 6-шаговый тест на смартфоне",
        descriptionRu: "Добавить кнопку WhatsApp с закодированным текстом, провести WhatsApp Production Audit и отправить тестовое сообщение с телефона.",
        expectedCommand: "whatsapp-cli verify --format 'https://wa.me/NUMBER' --mobile-test-passed",
        hint: "Используй международный номер только из цифр без знака + и пробелов.",
        completed: false
      }
    ],
    hints: [
      "В ссылке https://wa.me/[NUMBER] никогда не используй плюс, дефисы или скобки — только цифры в международном формате.",
      "Плавающая кнопка WhatsApp на мобильном экране должна быть компактной и не перекрывать текст или меню."
    ],
    solutionGuide: "1. Нажми Add files (+) -> Import from GitHub в AI Studio.\n2. Запусти промпт Import Audit.\n3. Поочерёдно улучши Hero и секцию Услуг.\n4. Подключи ссылку https://wa.me/[NUMBER]?text=...\n5. Проведи WhatsApp Production Audit и проверь отправку сообщения с реального телефона.",
    verificationCmd: "ai-studio-upgrade verify --lesson 14 --whatsapp-live",
    wowMoment: "Клик по кнопке на твоём сайте с телефона мгновенно открывает приложение WhatsApp с уже набранным приветственным сообщением!",
    isCompleted: false
  },
  {
    id: 15,
    lessonId: 15,
    blockId: 4,
    title: "Лабораторная работа #15: Media Web — Сборка быстрой Media Landing Page",
    titleRu: "Миссия 15: Media Web — Объединяем всё и оптимизируем скорость",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Google Flow", "Google Whisk", "Google AI Studio", "Портал AI for LIFE", "Squoosh / TinyPNG"],
    topologyDesc: "Prompt ──▶ Whisk (Арт) ──▶ Video (Движение) ──▶ AI Studio (Сайт) ──▶ Оптимизация (WebP + Lazy)",
    scenario: "Объединить наработки курса (город, персонаж, видео) в одну потрясающую страницу и провести оптимизацию скорости: сжать картинки в WebP, включить lazy loading и настроить превью видео.",
    scenarioRu: "Создание финальной мультимедийной страницы с идеальным балансом красоты и мгновенной загрузки.",
    tasks: [
      {
        id: "t15_1",
        text: "Собрать наработки курса (Город 05, Персонаж 06, Видео 07, Сайт 12) в единый проект",
        descriptionRu: "Подготовить все файлы и проверить исходные размеры (ДО оптимизации).",
        expectedCommand: "media-web init --assets 'city.png,character.png,teaser.mp4,site.html'",
        hint: "Если какого-то файла нет под рукой, используй готовые заготовки из библиотеки Портала.",
        completed: false
      },
      {
        id: "t15_2",
        text: "Собрать единую Media Landing Page в AI Studio (Hero + Видео + Описание + Анимация)",
        descriptionRu: "Объединить медиа-компоненты на одном экране с отзывчивой адаптивной версткой.",
        expectedCommand: "vibe-cli assemble --layout 'hero,video-player,features,footer' --interactive",
        hint: "Не перегружай страницу: 1 ключевое видео и 2 фоновых арта достаточно для вау-эффекта.",
        completed: false
      },
      {
        id: "t15_3",
        text: "Провести оптимизацию скорости (WebP, loading='lazy', постер видео) и уложиться в 5 МБ",
        descriptionRu: "Замерить время загрузки до и после, проверить отсутствие белого экрана.",
        expectedCommand: "speed-audit optimize --format webp --lazy-load --max-size 5mb",
        hint: "Помни: loading='lazy' для всего, что ниже первого экрана, чтобы стартовая загрузка была мгновенной.",
        completed: false
      }
    ],
    hints: [
      "Картинка должна весить меньше 200 КБ, видео — меньше 3 МБ.",
      "Для видео всегда ставь атрибуты poster='...' и preload='none' или preload='metadata'."
    ],
    solutionGuide: "1. Собери материалы.\n2. Сгенерируй верстку в AI Studio.\n3. Конвертируй графику в WebP.\n4. Добавь loading='lazy'.\n5. Измерь скорость в DevTools Network.",
    verificationCmd: "media-web verify --lesson 15",
    wowMoment: "Страница с тяжелым видео и сочной графикой загружается быстрее, чем за одну секунду!",
    isCompleted: false
  },
  {
    id: 16,
    lessonId: 16,
    blockId: 4,
    title: "Лабораторная работа #16: День Сборки — Финал блока «WOW Website» (Project #4)",
    titleRu: "Занятие 16: Сборка, Охота на баги и Релиз WOW Website",
    difficulty: "Hard",
    estimatedMinutes: 50,
    requirements: ["Google AI Studio", "GitHub / GitHub Pages", "Google Whisk", "Kling", "WebP"],
    topologyDesc: "8 Частей Сайта <---> Чек-лист DoD (8/8) <---> Релиз на GitHub Pages (Project #4)",
    scenario: "Объединить все материалы Миссий 5–15 в один идеальный, работающий WOW Website, устранить все баги и опубликовать живую страницу на GitHub Pages.",
    scenarioRu: "Финальная сборка и полировка: создание главного цифрового шедевра блока «WOW Website».",
    tasks: [
      {
        id: "t16_1",
        text: "Собрать 8 обязательных частей сайта по чек-листу Definition of Done (DoD 8/8)",
        descriptionRu: "Убедиться в наличии Home, About, Gallery, Video, Animation, Interactive, Contact и Mobile.",
        expectedCommand: "project-cli verify --dod 8/8",
        hint: "Критерий готовности: каждая секция полностью функциональна и не содержит заглушек.",
        completed: false
      },
      {
        id: "t16_2",
        text: "Провести охоту на баги (Bug Hunt): исправить битые ссылки, наезды текста и пути к ассетам",
        descriptionRu: "Кликнуть на каждую ссылку, проверить консоль браузера на ошибки 404.",
        expectedCommand: "lint-web --check-links --check-responsive",
        hint: "Обязательно добавьте target='_blank' внешним ссылкам и установите loading='lazy' для картинок.",
        completed: false
      },
      {
        id: "t16_3",
        text: "Проверить верстку в мобильном эмуляторе и опубликовать живой сайт на GitHub Pages",
        descriptionRu: "Убедиться в отсутствии горизонтального скролла на смартфонах и прикрепить Live URL.",
        expectedCommand: "git push origin main && pages-deploy --verify",
        hint: "Проверьте сайт на своем реальном телефоне перед финальной защитой.",
        completed: false
      }
    ],
    hints: [
      "Done лучше, чем perfect-но-незаконченный: стабильность важнее лишних непроверенных свистелок.",
      "Убедитесь, что заголовок вкладки <title> назван красиво, а не оставлен шаблонным 'React App'."
    ],
    solutionGuide: "1. Соберите 8 секций в коде.\n2. Устраните все баги через консоль и эмулятор.\n3. Запушьте код на GitHub и активируйте GitHub Pages.\n4. Проверьте открытие по живому адресу.",
    verificationCmd: "project-cli verify --lesson 16 --final",
    wowMoment: "Ваш WOW Website (Project #4) официально завершён и опубликован во всемирной сети с оценкой 8/8 DoD!",
    isCompleted: false
  },

  // ==================== BLOCK 5 (Labs 17–20) ====================
  {
    id: 17,
    lessonId: 17,
    blockId: 5,
    title: "Лабораторная работа #17: App Builder — Прототип To-Do List или Mini-Quiz с ИИ",
    titleRu: "Миссия 17: App Builder — Сборка первого прототипа приложения (To-Do / Quiz)",
    difficulty: "Easy",
    estimatedMinutes: 30,
    requirements: ["Google AI Studio", "AI FOR LIFE Sandbox", "HTML/CSS/JS", "LocalStorage", "PWA Basics"],
    topologyDesc: "USER (Пользователь) ──▶ INPUT (Ввод) ──▶ LOGIC (Обработка) ──▶ DATA (Память) ──▶ RESULT (Экран)",
    scenario: "Собрать свой первый рабочий прототип интерактивного веб-приложения (To-Do List или Mini-Quiz): декомпозировать идею по 5-частной формуле, сгенерировать чистую структуру и логику в Google AI Studio, протестировать сохранение состояния и провести пользовательский аудит.",
    scenarioRu: "Превращение пассивного сайта в интерактивное приложение с состоянием, обработчиками событий и локальным хранилищем.",
    tasks: [
      {
        id: "t17_1",
        text: "Выбрать тип прототипа (To-Do или Quiz) и заполнить 5-частную формулу приложения",
        descriptionRu: "Сформулировать: User (кто), Input (что вводит), Logic (как обрабатывается), Data (где хранится), Result (что видит).",
        expectedCommand: "app-formula init --type 'todo' --steps 'user,input,logic,data,result'",
        hint: "Выбирай ОДНУ главную функцию. Done лучше, чем перегруженный и незаконченный прототип.",
        completed: false
      },
      {
        id: "t17_2",
        text: "Сгенерировать и протестировать логику прототипа (добавление задач / проверка ответов)",
        descriptionRu: "Проверить, что нажатие кнопок меняет состояние (State) и отображение интерфейса без перезагрузки.",
        expectedCommand: "app-builder test-prototype --check-interactivity --verify-state",
        hint: "Убедись, что данные не исчезают сразу после клика и приложение реагирует мгновенно.",
        completed: false
      },
      {
        id: "t17_3",
        text: "Провести 3-шаговый пользовательский аудит и подготовить 20-секундный питч прототипа",
        descriptionRu: "Проверить ввод данных, стабильность состояния и понятность результата для нового пользователя.",
        expectedCommand: "app-audit run --test-ux --pitch-ready",
        hint: "Будь готов назвать тип прототипа, действие пользователя и самую сложную решённую часть.",
        completed: false
      }
    ],
    hints: [
      "Приложение — это то, с чем взаимодействуют и где сохраняют данные, а не просто читают.",
      "Не собирай реальные личные данные (пароли, телефоны) пользователей в своём прототипе!"
    ],
    solutionGuide: "1. Выбери тип (To-Do или Quiz).\n2. Заполни 5 полей формулы приложения.\n3. Собери промпт для Google AI Studio.\n4. Запусти интерактивную песочницу и добавь свои задачи.\n5. Отметь чек-лист 3/3 и защити прототип.",
    verificationCmd: "app-cli verify --lesson 17",
    wowMoment: "Ты нажал кнопку, и задача осталась в списке даже после переключения вкладок — это настоящее Web App!",
    isCompleted: false
  },
  {
    id: 18,
    lessonId: 18,
    blockId: 5,
    title: "Лабораторная работа #18: Data & API — Память приложения и работа с внешними данными",
    titleRu: "Миссия 18: Data & API — Local Storage и подключение открытого API",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio", "Local Storage", "Fetch API", "Public APIs", "JSON"],
    topologyDesc: "USER ──▶ INPUT ──▶ LOGIC ──▶ LOCAL STORAGE (Память) + API (Внешние данные) ──▶ RESULT",
    scenario: "Превратить прототип из Миссии 17 в полноценный рабочий инструмент: настроить постоянное сохранение данных в Local Storage (чтобы задачи не стирались при перезагрузке) и подключить один безопасный бесплатный API с живой информацией.",
    scenarioRu: "Интеграция долговременного хранилища (Local Storage) и внешних веб-сервисов (API) в интерактивный пользовательский интерфейс.",
    tasks: [
      {
        id: "t18_1",
        text: "Внедрить сохранение состояния в Local Storage (localStorage.setItem / getItem)",
        descriptionRu: "Проверить, что добавленные задачи/данные не исчезают после обновления страницы (F5).",
        expectedCommand: "data-cli test-storage --key 'app_tasks' --verify-persistence",
        hint: "Не забудь обернуть JSON.parse в блок try/catch для защиты от некорректных данных.",
        completed: false
      },
      {
        id: "t18_2",
        text: "Подключить 1 бесплатный публичный API (погода, цитаты, факты) через fetch-запрос",
        descriptionRu: "Настроить индикатор загрузки (isLoading) и вывод полученных данных в виджет приложения.",
        expectedCommand: "data-cli test-api --endpoint 'public-api' --status-200",
        hint: "Используй только открытые API без платных ключей и секретных токенов.",
        completed: false
      },
      {
        id: "t18_3",
        text: "Добавить обработку ошибок сети (catch) и провести финальный аудит приложения (3/3)",
        descriptionRu: "Убедиться, что при обрыве интернета софт не падает, а показывает понятное сообщение пользователю.",
        expectedCommand: "data-cli audit-app --check-all --generate-report",
        hint: "Проверь 3 пункта аудита: сохранение в памяти, отображение API и защита от сбоев сети.",
        completed: false
      }
    ],
    hints: [
      "State — это оперативная память на одну сессию, Local Storage — рюкзак на устройстве, API — звонок другу.",
      "Никогда не храни личные пароли или секретные ключи в коде приложения!"
    ],
    solutionGuide: "1. Выбери прототип.\n2. Добавь Local Storage через Google AI Studio.\n3. Подключи бесплатный API (Quotes/Weather).\n4. Добавь лоадер и обработку catch(err).\n5. Проведи аудит 3/3 и защити проект.",
    verificationCmd: "data-cli verify --lesson 18",
    wowMoment: "Страница обновилась, а все твои дела остались на месте, плюс подгрузилась свежая цитата из интернета!",
    isCompleted: false
  },
  {
    id: 19,
    lessonId: 19,
    blockId: 5,
    title: "Лабораторная работа #19: AI Engineer — Встраиваем AI Tutor / Quiz в приложение",
    titleRu: "Миссия 19: AI Engineer — ИИ внутри кнопки приложения и System Prompt",
    difficulty: "Medium",
    estimatedMinutes: 45,
    requirements: ["Google AI Studio", "Gemini API Free Tier", "System Prompt", "Приложение из Миссии 18"],
    topologyDesc: "Пользователь кликает кнопку ──▶ fetch(Gemini_API) ──▶ System Prompt (Правила) ──▶ Ответ прямо в UI",
    scenario: "Выбрать AI-функцию (Tutor или Quiz), сконструировать System Prompt (роль, задача, правила, табу), внедрить кнопку в проект через Google AI Studio и провести стресс-тест 4/4 на сложных пользователях.",
    scenarioRu: "Встраивание настоящего ИИ внутрь приложения через Google AI Studio, написание невидимого системного промпта и стресс-тестирование.",
    tasks: [
      {
        id: "t19_1",
        text: "Выбрать AI-функцию и сконструировать System Prompt (Роль, Задача, Делай, Не делай)",
        descriptionRu: "Использовать каноническую формулу системных правил для ограничения модели рамками продукта.",
        expectedCommand: "ai-engineer-cli create-prompt --role 'tutor' --do 'short+example' --dont 'no-spoilers'",
        hint: "Чем строже ограничения по длине и теме в System Prompt, тем стабильнее работает интерфейс.",
        completed: false
      },
      {
        id: "t19_2",
        text: "Встроить кнопку вызова ИИ в приложение с индикатором загрузки и fallback-защитой",
        descriptionRu: "Добавить асинхронный вызов Gemini API, состояние загрузки и дружелюбное сообщение об ошибке.",
        expectedCommand: "ai-engineer-cli embed-button --api gemini --feature 'tutor' --fallback 'friendly-msg'",
        hint: "Не позволяй приложению показывать белый экран при задержках сети — всегда показывай лоадер.",
        completed: false
      },
      {
        id: "t19_3",
        text: "Провести стресс-тест 4/4 (Break the Tutor) на каверзных вопросах и защитить проект",
        descriptionRu: "Проверить реакцию ИИ на выпрашивание готового ответа, жалобы, ошибки и посторонние темы.",
        expectedCommand: "ai-engineer-cli run-stress-test --scenarios 4 --break-the-tutor",
        hint: "Если ИИ уходит в оффтоп, дополни System Prompt правилом возврата к теме приложения.",
        completed: false
      }
    ],
    hints: [
      "Встроенный ИИ говорит от имени твоего приложения — поэтому правила безопасности критически важны.",
      "Для учебных проектов бесплатного тарифа Gemini API более чем достаточно."
    ],
    solutionGuide: "1. Выбери суперсилу (Tutor или Quiz).\n2. Напиши System Prompt из 4 пунктов.\n3. Встрой кнопку вызова ИИ в AI Studio.\n4. Добавь обработку сетевых ошибок.\n5. Проведи 4 теста и сдай работу ментору.",
    verificationCmd: "ai-engineer-cli verify --lesson 19",
    wowMoment: "Нажатие на кнопку прямо в твоём приложении мгновенно вызывает настоящий искусственный интеллект без перехода в другие вкладки!",
    isCompleted: false
  },
  {
    id: 20,
    lessonId: 20,
    blockId: 5,
    title: "Лабораторная работа #20: Финал Project #5 — My Life App",
    titleRu: "Миссия 20: Финал Project #5 — My Life App & Agent Thinking",
    difficulty: "Medium",
    estimatedMinutes: 50,
    requirements: ["Google AI Studio", "Google Opal", "Local Storage", "GitHub Pages"],
    topologyDesc: "User Life Problem -> Local Storage -> AI Feature / Agent Workflow -> Deployed Web App",
    scenario: "Собрать прототип, локальное хранилище и встроенный ИИ воедино, закрыть 6 пунктов Definition of Done (DoD), при желании добавить агентную цепочку шагов и опубликовать финальный Project #5 на GitHub.",
    scenarioRu: "Сборка, полировка и релиз финального приложения блока «AI Apps» с соблюдением стандартов качества и защитой перед группой.",
    tasks: [
      {
        id: "t20_1",
        text: "Собрать воедино 3 слоя: Прототип (UI), Хранилище (Local Storage) и Встроенный ИИ",
        descriptionRu: "Проверить корректность связки разметки, чтения/записи в память браузера и вызова Gemini API.",
        expectedCommand: "ai-engineer-cli check-integration --layers ui,storage,ai",
        hint: "Убедитесь, что при перезагрузке страницы данные не сбрасываются в начальное состояние.",
        completed: false
      },
      {
        id: "t20_2",
        text: "Пройти чек-лист Definition of Done (все 6 пунктов качества)",
        descriptionRu: "1. Проблема 2. Хранилище 3. AI-функция 4. UX/UI 5. Мобильная адаптивность 6. Онлайн-публикация.",
        expectedCommand: "ai-engineer-cli verify-dod --checklist 6",
        hint: "Проверьте верстку на мобильном разрешении через панель разработчика (DevTools).",
        completed: false
      },
      {
        id: "t20_3",
        text: "(Бонус +50 ОП) Сконфигурировать агентную цепочку выполнения (Goal → Plan → Tools → Action → Result)",
        descriptionRu: "Научить ИИ решать многошаговую задачу (например, проверка привычек + составление плана + сохранение).",
        expectedCommand: "ai-engineer-cli test-agent-chain --steps 5",
        hint: "Агент не просто советует текстом, а сохраняет сгенерированный результат в приложение.",
        completed: false
      },
      {
        id: "t20_4",
        text: "Опубликовать релиз на GitHub Pages и защитить Project #5 на 30-секундном питче",
        descriptionRu: "Предоставить живую ссылку, озвучить проблему, решение и продемонстрировать AI-функцию.",
        expectedCommand: "git push origin main && project-cli submit --project-id 5",
        hint: "Говорите четко: Название → Проблема → Как помогает ИИ → Живая ссылка.",
        completed: false
      }
    ],
    hints: [
      "Definition of Done — это контракт качества: ни один пункт нельзя пропустить перед релизом.",
      "Для мобильного теста используйте DevTools: Ctrl+Shift+M (Windows) или Cmd+Opt+M (Mac)."
    ],
    solutionGuide: "1. Проверь три слоя (UI + Local Storage + AI).\n2. Закрой 6 пунктов DoD.\n3. (Опционально) Настрой агентный симулятор.\n4. Опубликуй на GitHub Pages и презентуй за 30 секунд.",
    verificationCmd: "ai-engineer-cli verify --lesson 20 --project-id 5",
    wowMoment: "Ваше собственное приложение теперь не просто отображает карточки, а само выполняет полезные задачи и сохраняет результат прямо в кармане пользователя!",
    isCompleted: false
  },

  // ==================== BLOCK 6 (Labs 21–24) ====================
  {
    id: 21,
    lessonId: 21,
    blockId: 6,
    title: "Лабораторная работа #21: Capstone Спринт 1 — Архитектура и каркас приложения",
    titleRu: "Занятие 21: Capstone-проект — Архитектура и Спринт 1",
    difficulty: "Medium",
    estimatedMinutes: 50,
    requirements: ["Cursor IDE", "React 18", "Tailwind CSS", "GitHub", "Vite"],
    topologyDesc: "Product Concept <---> Cursor Vibe Coding Sprint 1 <---> Работающий MVP",
    scenario: "Сформировать архитектурный план выпускного Capstone-проекта, развернуть репозиторий на GitHub и собрать интерактивный MVP за 60-минутный спринт.",
    scenarioRu: "Переход от идеи к работающему коду: декомпозиция фичей, настройка стейта и быстрая верстка основного пользовательского пути.",
    tasks: [
      {
        id: "t21_1",
        text: "Написать Product Spec: формулировка проблемы, целевая аудитория и список из 3 ключевых фичей",
        descriptionRu: "Зафиксировать рамки проекта в файле SPEC.md, избегая перегрузки лишними функциями.",
        expectedCommand: "capstone-cli init-spec --file SPEC.md",
        hint: "Фокусируйтесь на главном сценарии: решение должно давать вау-эффект за 3 клика.",
        completed: false
      },
      {
        id: "t21_2",
        text: "Развернуть стек React + TypeScript + Tailwind и закоммитить каркас на GitHub",
        descriptionRu: "Инициализировать git-репозиторий и выстроить чистую файловую структуру.",
        expectedCommand: "git init && git add . && git commit -m 'feat: capstone sprint 1 starter'",
        hint: "Создайте папки components, pages, lib, types для порядка в кодовой базе.",
        completed: false
      },
      {
        id: "t21_3",
        text: "Собрать работающий первый экран (MVP) с интерактивным взаимодействием",
        descriptionRu: "Реализовать ключевой интерфейс ввода данных и отображения первого результата.",
        expectedCommand: "npm run dev -- --host 0.0.0.0 --port 3000",
        hint: "Используйте Cursor Composer (Cmd+I) для быстрой сборки первого прототипа.",
        completed: false
      }
    ],
    hints: [
      "Делайте коммиты каждые 30 минут активной работы.",
      "Не отвлекайтесь на мелкие украшательства — сначала сделайте работающую логику."
    ],
    solutionGuide: "1. Напишите спецификацию.\n2. Соберите MVP через Cursor.\n3. Закоммитьте в репозиторий.",
    verificationCmd: "capstone-cli verify --sprint 1",
    wowMoment: "Каркас вашего выпускного продукта уже работает в браузере!",
    isCompleted: false
  },
  {
    id: 22,
    lessonId: 22,
    blockId: 6,
    title: "Лабораторная работа #22: Capstone Спринт 2 — Полировка UI/UX, анимации и обработка ошибок",
    titleRu: "Занятие 22: Capstone Спринт 2 — UI/UX Полировка",
    difficulty: "Medium",
    estimatedMinutes: 50,
    requirements: ["Framer Motion", "Sonner", "Lucide Icons", "Tailwind CSS"],
    topologyDesc: "Сырой MVP <---> Дизайн-система & Анимации <---> Release Candidate",
    scenario: "Довести UI/UX выпускного проекта до коммерческого уровня: внедрить плавные микро-анимации, индикаторы загрузки, всплывающие уведомления (Toasts) и мобильную адаптивность.",
    scenarioRu: "Финальная доводка продукта: отзывчивость интерфейса, обработка краевых случаев, защита от сбоев API и тестирование на мобильных устройствах.",
    tasks: [
      {
        id: "t22_1",
        text: "Внедрить скелетоны загрузки (Loading Skeletons) и спиннеры во время ожидания AI",
        descriptionRu: "Избавить пользователя от ощущения зависшего экрана при длинных запросах.",
        expectedCommand: "npm install framer-motion sonner",
        hint: "Пульсирующий скелетон создает ощущение мгновенной реакции системы.",
        completed: false
      },
      {
        id: "t22_2",
        text: "Подключить всплывающие уведомления (Toasts) об успехе и ошибках операций",
        descriptionRu: "Использовать библиотеку Sonner для элегантных уведомлений в правом верхнем углу.",
        expectedCommand: "capstone-cli add-toasts --library sonner",
        hint: "Понятные сообщения об ошибках помогают пользователю исправить ввод.",
        completed: false
      },
      {
        id: "t22_3",
        text: "Провести мобильное тестирование и обеспечить идеальное отображение на экранах смартфонов",
        descriptionRu: "Проверить адаптивность в DevTools Mobile Mode (375px–430px ширины).",
        expectedCommand: "capstone-cli audit-responsive --min-width 360",
        hint: "Минимальный размер кнопки на тачскрине — 44x44 пикселя.",
        completed: false
      }
    ],
    hints: [
      "Проверьте отсутствие горизонтальной прокрутки на мобильных экранах.",
      "Добавьте плавные переходы страниц с помощью Framer Motion AnimatePresence."
    ],
    solutionGuide: "1. Установите Framer Motion и Sonner.\n2. Добавьте анимации и уведомления.\n3. Проверьте мобильную верстку.",
    verificationCmd: "capstone-cli verify --sprint 2",
    wowMoment: "Приложение ощущается таким же плавным и отзывчивым, как сервисы Apple и Stripe!",
    isCompleted: false
  },
  {
    id: 23,
    lessonId: 23,
    blockId: 6,
    title: "Лабораторная работа #23: Деплой приложения, защита API-ключей и продакшн-хостинг",
    titleRu: "Занятие 23: Деплой, Хостинг и Безопасность",
    difficulty: "Hard",
    estimatedMinutes: 50,
    requirements: ["Vercel / Cloud Run", "GitHub", ".env.example", "OpenGraph"],
    topologyDesc: "Git Репозиторий <---> CI/CD Пайплайн <---> Публичный Продакшн URL",
    scenario: "Собрать production-билд, настроить безопасное проксирование API-ключей через бэкенд, развернуть проект на хостинге и настроить мета-теги Open Graph.",
    scenarioRu: "Вывод проекта в глобальный интернет: конфигурация продакшн-сборки, защита конфиденциальных ключей и публикация по живой ссылке.",
    tasks: [
      {
        id: "t23_1",
        text: "Провести аудит безопасности: убедиться в отсутствии захардкоженных API-ключей в клиенте",
        descriptionRu: "Вынести все приватные ключи в переменные окружения (.env) на сервере.",
        expectedCommand: "capstone-cli audit-keys --scan-repo",
        hint: "Клиентский код в браузере виден любому через DevTools — ключи должны быть только на бэкенде!",
        completed: false
      },
      {
        id: "t23_2",
        text: "Собрать оптимизированный продакшн-бандл без ошибок компиляции TypeScript",
        descriptionRu: "Убедиться, что команда npm run build завершается успешно.",
        expectedCommand: "npm run build",
        hint: "Проверьте отсутствие неиспользуемых импортов и ошибок типов перед деплоем.",
        completed: false
      },
      {
        id: "t23_3",
        text: "Опубликовать проект на хостинге и настроить метатеги превью для Telegram и Twitter",
        descriptionRu: "Получить активную публичную HTTPS-ссылку на готовое веб-приложение.",
        expectedCommand: "deploy-cli publish --provider vercel --prod",
        hint: "Настройте og:image и og:title в index.html для красивой карточки шеринга.",
        completed: false
      }
    ],
    hints: [
      "Проверьте работу приложения в режиме Инкогнито по публичной ссылке.",
      "Убедитесь, что все серверные эндпоинты отвечают со статусом 200 OK."
    ],
    solutionGuide: "1. Проверьте .env файл.\n2. Выполните сборку проекта.\n3. Разверните на продакшн-хостинге и протестируйте живой URL.",
    verificationCmd: "deploy-cli verify --lesson 23",
    wowMoment: "Ваш проект доступен любому человеку на планете по прямой ссылке!",
    isCompleted: false
  },
  {
    id: 24,
    lessonId: 24,
    blockId: 6,
    title: "Лабораторная работа #24: Demo Day — Публичная защита, питчинг и Сертификация",
    titleRu: "Занятие 24: Demo Day — Защита Capstone-проекта и Финал",
    difficulty: "Hard",
    estimatedMinutes: 60,
    requirements: ["Pitch Deck", "Live Demo URL", "Certificates Registry", "Final Exam"],
    topologyDesc: "Студент-Выпускник <---> 3-минутный Питч & Demo <---> Диплом AI for LIFE Master",
    scenario: "Провести 3-минутный питч своего выпускного продукта перед аудиторией и менторами, сдать финальный сертификационный экзамен и получить именной диплом.",
    scenarioRu: "Кульминация всего 12-недельного курса: публичная демонстрация, ответы на вопросы экспертов и активация сертификата в реестре.",
    tasks: [
      {
        id: "t24_1",
        text: "Подготовить слайды 3-минутного питча (Проблема, Решение, Технологии, Планы)",
        descriptionRu: "Оформить лаконичную презентацию без лишнего текста с акцентом на ценность продукта.",
        expectedCommand: "pitch-cli validate-deck --slides 5 --time-limit 180s",
        hint: "Говорите о пользе для людей, а не только о количестве написанных строк кода.",
        completed: false
      },
      {
        id: "t24_2",
        text: "Провести безупречную живую демонстрацию (Live Demo) на реальных сценариях",
        descriptionRu: "Показать решение пользовательской задачи в реальном времени.",
        expectedCommand: "pitch-cli run-live-demo --project-ready true",
        hint: "Имейте запасной скриншот на случай внезапного падения интернета во время питча.",
        completed: false
      },
      {
        id: "t24_3",
        text: "Сдать Финальный Комплексный Экзамен (60 вопросов) и активировать Сертификат",
        descriptionRu: "Набрать не менее 85% правильных ответов для подтверждения высшей квалификации.",
        expectedCommand: "cert-cli activate --course 'AI for LIFE' --verify-registry",
        hint: "Финальный экзамен охватывает ключевые темы всех 6 модулей курса.",
        completed: false
      }
    ],
    hints: [
      "Уверенно держите зрительный контакт и контролируйте тайминг 3 минут.",
      "Гордитесь проделанной работой: за 12 недель вы создали настоящее портфолио будущего!"
    ],
    solutionGuide: "1. Проведите презентацию и демонстрацию.\n2. Ответьте на вопросы менторов.\n3. Завершите финальный тест и скачайте диплом.",
    verificationCmd: "cert-cli finalize-course --status graduated",
    wowMoment: "Поздравляем с выпуском! Вы — сертифицированный AI for LIFE Master и творец новой цифровой эпохи!",
    isCompleted: false
  }
];
