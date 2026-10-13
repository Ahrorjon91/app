import React, { useState } from 'react';
import {
  Sparkles,
  Code2,
  FileCode,
  FileText,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Download,
  FolderOpen,
  Play,
  Bug,
  Layers,
  Monitor,
  Smartphone,
  Wrench,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Cpu,
  Globe,
  Shield,
  Zap,
  Compass,
  Layout,
  Wand2,
  HardDrive
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson7LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Guide Tab / Step state
  const [activeBuildStep, setActiveBuildStep] = useState<number>(1);
  const [activeFileTab, setActiveFileTab] = useState<'html' | 'css' | 'js'>('html');
  const [activeTeslaSection, setActiveTeslaSection] = useState<number>(0);
  const [activeBugId, setActiveBugId] = useState<string>('broken_button');
  const [activeLocalStep, setActiveLocalStep] = useState<number>(1);

  const [copiedFirstPrompt, setCopiedFirstPrompt] = useState(false);
  const [copiedDebugPrompt, setCopiedDebugPrompt] = useState(false);
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);

  const firstPromptText = `Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS.`;

  const debugPromptText = `Find the bug. Explain what caused it. Fix only the necessary code.`;

  const handleCopy = (text: string, setter: (v: boolean) => void, rewardMsg?: string) => {
    navigator.clipboard.writeText(text);
    setter(true);
    if (rewardMsg) {
      addReward(15, rewardMsg);
    }
    setTimeout(() => setter(false), 2000);
  };

  const handleTriggerEasterEgg = () => {
    if (!easterEggTriggered) {
      setEasterEggTriggered(true);
      addReward(25, '🏗️ Пасхалка Урока 7: Центр Управления Сайтом синхронизирован с Google Stitch и Google AI Studio!');
    }
  };

  const buildSteps = [
    {
      step: 1,
      badge: 'STEP 1 — Create project',
      title: 'Открываем Google AI Studio',
      subtitle: 'Подготовка рабочего пространства и референса из Google Stitch',
      description:
        'Переходим в Google AI Studio (aistudio.google.com). Подготавливаем экспортированный UX/UI-дизайн или скриншот макета Tesla Model X, который мы спроектировали в Уроке 5 в Google Stitch («Сначала дизайн. Потом код.»).',
      checklist: [
        'Открыть браузер и войти в Google AI Studio',
        'Проверить готовый макет Tesla Model X из Google Stitch (Hero, 4 карточки метрик, секции сторителлинга)',
        'Вспомнить 3 отдела из Урока 6: HTML (структура), CSS (внешний вид), JS (поведение)'
      ],
      proTip: 'Никогда не начинайте генерацию кода с пустого листа без дизайна: прикреплённый UI-макет из Google Stitch повышает точность вёрстки в 5 раз!'
    },
    {
      step: 2,
      badge: 'STEP 2 — Build Mode',
      title: 'Режим сборки: Create a web application',
      subtitle: 'Переключаемся из обычного чата в среду создания веб-приложений',
      description:
        'В меню Google AI Studio выбираем Build Mode (или кнопку «Create a web application» / «Build an app»). В этом режиме ИИ не просто пишет текст в чате, а автоматически создаёт файловую структуру проекта и открывает Live Preview.',
      checklist: [
        'Нажать «Build» / «Create a web application» в панели Google AI Studio',
        'Прикрепить изображение/экспорт нашего UX-дизайна из Google Stitch к окну ввода',
        'Убедиться, что справа активно окно предпросмотра (Preview) и вкладка кода (Code / Files)'
      ],
      proTip: 'В стиле гайда ProfitStudio (Build Website with Google AI Studio): всегда держите открытыми две вкладки — Code (чтобы видеть чистые файлы) и Preview (чтобы сразу тестировать интерфейс).'
    },
    {
      step: 3,
      badge: 'STEP 3 — First Prompt',
      title: 'Отправляем Первый Архитектурный Промпт',
      subtitle: 'Строгий запрос только на чистых HTML, CSS и JavaScript без лишних библиотек',
      description:
        'Чтобы ученик понимал, как устроен сайт изнутри, мы запрещаем ИИ прятать код за тяжелыми внешними библиотеками и требуем чистую семантическую тройку: HTML + CSS + JS.',
      checklist: [
        'Скопировать эталонный промпт STEP 3 (кнопка ниже)',
        'Проверить требование: Use semantic HTML structure, modern CSS and JavaScript interactions',
        'Проверить ограничение: Do not use unnecessary libraries use strongly only with HTML, CSS and JS'
      ],
      proTip: 'Эта фраза заставляет Google AI Studio создать прозрачный, легко читаемый код, который будет работать на любом компьютере даже без установки Node.js!'
    },
    {
      step: 4,
      badge: 'STEP 4 — Identify files',
      title: 'Находим и инспектируем 3 главных файла',
      subtitle: 'index.html · style.css · script.js',
      description:
        'После генерации открываем дерево файлов проекта. Задача каждого ученика — найти три ключевых файла и проверить, какой отдел за что отвечает.',
      checklist: [
        'index.html — проверить семантические теги <header>, <nav>, <main>, <section>, <footer>',
        'style.css — проверить переменные цветов, Flexbox/Grid сетку, отступы (whitespace) и медиа-запросы @media',
        'script.js — проверить обработчики событий addEventListener, переключение секций и интерактивные кнопки'
      ],
      proTip: 'Если все три части написаны в одном файле, попросите AI: «Split the code cleanly into three separate files: index.html, style.css, and script.js and link them properly».'
    }
  ];

  const fileInspectorData = {
    html: {
      filename: 'index.html',
      role: 'HTML = structure (Структура и каркас)',
      lesson6Link: 'Отдел №1 из Урока 6: Транспортный слой и семантические блоки страницы',
      description:
        'Отвечает за то, ЧТО находится на сайте: шапка навигации по 6 разделам Tesla, главный экран Model X, карточки характеристик и футер с 8 ссылками.',
      keyConnections: [
        '<link rel="stylesheet" href="style.css"> — подключает таблицу стилей в <head>',
        '<script src="script.js" defer></script> — подключает логику JavaScript перед </body>'
      ],
      codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tesla Model X — Electric Flagship SUV</title>
  <!-- Подключаем отдел внешнего вида (CSS) -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <!-- Навигация по 6 главным секциям LAB -->
  <header class="site-header">
    <a href="#" class="logo">TESLA</a>
    <nav class="main-nav">
      <a href="#vehicles">Vehicles</a>
      <a href="#energy">Energy</a>
      <a href="#charging">Charging</a>
      <a href="#semi">Semi</a>
      <a href="#discover">Discover</a>
      <a href="#shop">Shop</a>
    </nav>
  </header>

  <!-- Hero-секция Tesla Model X по дизайну из Google Stitch -->
  <main id="vehicles" class="hero-section">
    <div class="hero-title">
      <h1>Model X</h1>
      <p>Plaid · Tri Motor All-Wheel Drive</p>
    </div>

    <div class="specs-bar">
      <div class="spec-card"><strong>335 mi</strong><span>Range (EPA est.)</span></div>
      <div class="spec-card"><strong>2.5 s</strong><span>0-60 mph*</span></div>
      <div class="spec-card"><strong>9.9 s</strong><span>1/4 Mile</span></div>
      <div class="spec-card"><strong>1,020 hp</strong><span>Peak Power</span></div>
    </div>

    <div class="cta-group">
      <button id="orderBtn" class="btn-primary">Order Now</button>
      <button id="demoBtn" class="btn-secondary">Demo Drive</button>
    </div>
  </main>

  <!-- Канонический Footer Tesla © 2026 -->
  <footer class="site-footer">
    <a href="#">Tesla © 2026</a>
    <a href="#">Privacy & Legal</a>
    <a href="#">Vehicle Recalls</a>
    <a href="#">Contact</a>
    <a href="#">News</a>
    <a href="#">Get Updates</a>
    <a href="#">Locations</a>
    <a href="#">Learn</a>
  </footer>

  <!-- Подключаем отдел поведения (JavaScript) -->
  <script src="script.js"></script>
</body>
</html>`
    },
    css: {
      filename: 'style.css',
      role: 'CSS = appearance (Внешний вид и премиальный минимализм)',
      lesson6Link: 'Отдел №2 из Урока 6: Формула селектор { свойство: значение; } и адаптивность',
      description:
        'Превращает «сырые теги» в премиальный интерфейс уровня tesla.com: задаёт темную палитру, воздушные отступы (whitespace), сетку карточек и мобильную адаптацию.',
      keyConnections: [
        'Использует Flexbox и CSS Grid для выравнивания карточек характеристик',
        'Отвечает за плавные переходы (transition) и внешний вид кнопок CTA'
      ],
      codeSnippet: `/* style.css — Отдел внешнего вида (CSS = appearance) */
:root {
  --bg-dark: #090a0f;
  --text-light: #f8fafc;
  --text-muted: #94a3b8;
  --accent-white: #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-light);
  line-height: 1.5;
}

.site-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 48px;
  backdrop-filter: blur(12px);
  background: rgba(9, 10, 15, 0.75);
  z-index: 50;
}

.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 120px 24px 48px;
  text-align: center;
}

.specs-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 32px;
  margin-bottom: 28px;
}

.btn-primary {
  background: var(--accent-white);
  color: #090a0f;
  padding: 12px 36px;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}`
    },
    js: {
      filename: 'script.js',
      role: 'JavaScript = behavior (Поведение и живая реакция)',
      lesson6Link: 'Отдел №3 из Урока 6: События addEventListener и динамика страницы',
      description:
        'Оживляет статичную картинку: обрабатывает клики по кнопкам «Order Now» и «Demo Drive», переключает вкладки 6 секций и проверяет форму заказа.',
      keyConnections: [
        'Находит элементы через document.getElementById() и document.querySelectorAll()',
        'Вешает слушатели событий click и scroll без перезагрузки страницы'
      ],
      codeSnippet: `// script.js — Отдел поведения (JavaScript = behavior)
document.addEventListener('DOMContentLoaded', () => {
  const orderBtn = document.getElementById('orderBtn');
  const demoBtn = document.getElementById('demoBtn');

  // Реакция на кнопку заказа Tesla Model X
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      orderBtn.textContent = '✓ Configuration Saved — Model X Plaid';
      orderBtn.classList.add('active-order');
    });
  }

  // Реакция на запись на тест-драйв
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      const city = 'Khujand Supercharger Hub';
      console.log('Demo Drive requested at:', city);
      demoBtn.textContent = 'Demo Drive Booked (' + city + ')';
    });
  }
});`
    }
  };

  const teslaSectionsArchitecture = [
    {
      num: '01',
      id: 'Vehicles',
      title: '1. Vehicles (Электромобили — Model X Flagship)',
      htmlTag: '<section id="vehicles">',
      uxFocus: 'Hero-экран Tesla Model X, двери Falcon Wing, штурвал Yoke и 4 карточки характеристик (335 mi, 2.5s, 9.9s, 1,020 hp).',
      jsBehavior: 'Переключение комплектаций Dual Motor All-Wheel Drive vs Model X Plaid с мгновенным пересчётом характеристик.'
    },
    {
      num: '02',
      id: 'Energy',
      title: '2. Energy (Солнечная энергия и хранение)',
      htmlTag: '<section id="energy">',
      uxFocus: 'Карточки Solar Panels, Solar Roof и домашнего накопителя энергии Powerwall для полной энергонезависимости дома.',
      jsBehavior: 'Интерактивный калькулятор экономии солнечной энергии день / ночь.'
    },
    {
      num: '03',
      id: 'Charging',
      title: '3. Charging (Зарядная инфраструктура)',
      htmlTag: '<section id="charging">',
      uxFocus: 'Сеть станций быстрой зарядки Supercharger (до 282 км за 15 минут) и домашний терминал Wall Connector.',
      jsBehavior: 'Анимация прогресса заряда батареи от 20% до 80% и выбор типа зарядки.'
    },
    {
      num: '04',
      id: 'Semi',
      title: '4. Semi (Будущее грузоперевозок)',
      htmlTag: '<section id="semi">',
      uxFocus: 'Электрический тягач Tesla Semi: разгон 0-60 mph за 20 секунд при полной загрузке, запас хода 500 миль и центральная посадка пилота.',
      jsBehavior: 'Сравнение расхода энергии Tesla Semi против дизельного грузовика.'
    },
    {
      num: '05',
      id: 'Discover',
      title: '5. Discover (Опыт владения и технологии)',
      htmlTag: '<section id="discover">',
      uxFocus: 'Запись на Demo Drive, демонстрация автопилота Full Self-Driving, отчёты по безопасности (Safety) и обучающие видео.',
      jsBehavior: 'Открытие модального окна записи на тест-драйв и переключение табов безопасности.'
    },
    {
      num: '06',
      id: 'Shop',
      title: '6. Shop (Официальный магазин аксессуаров)',
      htmlTag: '<section id="shop">',
      uxFocus: 'Витрина аксессуаров: зарядные адаптеры, всепогодные коврики Model X, багажники на крышу и фирменный мерч.',
      jsBehavior: 'Быстрое добавление аксессуара в корзину со счётчиком в шапке сайта.'
    }
  ];

  const debugChallengeBugs = [
    {
      id: 'broken_button',
      badge: 'БАГ #1 · broken button',
      title: 'Сломанная кнопка (Broken Button)',
      department: 'HTML + JS связь',
      symptom: 'Кнопка «Order Now» отображается на экране, но при клике на неё абсолютно ничего не происходит (или она перекрыта прозрачным блоком).',
      brokenCode: `<!-- В index.html указан id="order-button" -->
<button id="order-button" class="btn-primary">Order Now</button>

// А в script.js ищется другой ID:
const btn = document.getElementById('orderBtn'); // вернёт null!`,
      fixedCode: `<!-- В index.html и script.js используем единый id="orderBtn" -->
<button id="orderBtn" class="btn-primary">Order Now</button>

const btn = document.getElementById('orderBtn');
btn.addEventListener('click', () => { /* работает! */ });`,
      aiExplanation: 'Причина: несовпадение атрибута id в HTML ("order-button") и селектора в JavaScript ("orderBtn"). Исправлено только имя ID.'
    },
    {
      id: 'wrong_css',
      badge: 'БАГ #2 · wrong CSS',
      title: 'Сломанные стили и вёрстка (Wrong CSS)',
      department: 'CSS = appearance',
      symptom: 'Карточки характеристик Tesla Model X (335 mi, 2.5s, 1,020 hp) слиплись в узкую нечитаемую колонку или текст стал чёрным на чёрном фоне.',
      brokenCode: `.specs-bar {
  display: block; /* Ошибка: карточки падают друг под друга без отступов */
  color: #090a0f; /* Ошибка: тёмный текст сливается с тёмным фоном */
}`,
      fixedCode: `.specs-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  color: #f8fafc; /* Контрастный белый текст */
}`,
      aiExplanation: 'Причина: отсутствие сетки CSS Grid и неконтрастный цвет текста. Восстановлена 4-колоночная сетка и светлый цвет шрифта.'
    },
    {
      id: 'missing_image',
      badge: 'БАГ #3 · missing image',
      title: 'Пропавшее изображение (Missing Image)',
      department: 'HTML = structure',
      symptom: 'Вместо главного рендера Tesla Model X на первом экране отображается пустая иконка битой картинки (404 Not Found).',
      brokenCode: `<img src="assets/tesla-model-x-wrong-path.png" />`,
      fixedCode: `<img 
  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80" 
  alt="Tesla Model X Electric SUV" 
  class="hero-image"
/>`,
      aiExplanation: 'Причина: неверный путь в атрибуте src и отсутствие обязательного атрибута alt. Указан рабочий URL изображения и добавлен alt.'
    },
    {
      id: 'javascript_error',
      badge: 'БАГ #4 · JavaScript error',
      title: 'Ошибка в консоли JavaScript (JavaScript Error)',
      department: 'JavaScript = behavior',
      symptom: 'В консоли браузера красная ошибка Uncaught TypeError / ReferenceError, из-за которой перестали переключаться все 6 секций сайта.',
      brokenCode: `const sections = document.querySelectorAll('.tesla-section');
sections.addEventListener('click', switchTab); // TypeError: NodeList has no addEventListener!`,
      fixedCode: `const sections = document.querySelectorAll('.tesla-section');
sections.forEach((section) => {
  section.addEventListener('click', switchTab);
});`,
      aiExplanation: 'Причина: querySelectorAll возвращает коллекцию NodeList, у которой нет метода addEventListener напрямую. Добавлен перебор через .forEach().'
    }
  ];

  const localPcSteps = [
    {
      num: 1,
      title: 'Шаг 1. Экспорт исходного кода (Download ZIP) из Google AI Studio',
      desc: 'В правом верхнем углу панели Build Mode в Google AI Studio нажмите кнопку «Download» / «Export ZIP» (или скопируйте код трёх файлов). Вы получите архив со всем исходным кодом проекта.'
    },
    {
      num: 2,
      title: 'Шаг 2. Распаковка архива в рабочую папку на ПК',
      desc: 'Создайте на Рабочем столе папку tesla-modelx-site и распакуйте туда архив. Убедитесь, что файлы index.html, style.css и script.js лежат в одной папке на одном уровне.'
    },
    {
      num: 3,
      title: 'Шаг 3. Проверка связей между 3 файлами',
      desc: 'Откройте index.html и проверьте, что внутри <head> есть строка <link rel="stylesheet" href="style.css">, а перед закрывающим тегом </body> подключён <script src="script.js"></script>.'
    },
    {
      num: 4,
      title: 'Шаг 4. Запуск сайта на локальном компьютере (2 способа)',
      desc: 'Способ А (Мгновенный): дважды кликните по файлу index.html — сайт сразу откроется в Chrome, Edge или Safari! Способ Б (Профессиональный): откройте папку в VS Code и нажмите «Go Live» (расширение Live Server), чтобы сайт открылся по адресу http://127.0.0.1:5500 с автообновлением.'
    }
  ];

  const cheatSheetText = `🏗️ УРОК 7: WEBSITE CONTROL CENTER — HTML + CSS + JAVASCRIPT
Миссия: «Теперь дизайн превращается в настоящий сайт»

1. СВЯЗКА ТРЁХ УРОКОВ VIBE CODING:
• Урок 5 (Google Stitch): «Сначала дизайн. Потом код.» (UX/UI макет Tesla Model X)
• Урок 6 (3 Отдела): Понимание ролей HTML, CSS и JS
• Урок 7 (Google AI Studio Build Mode): Сборка живого сайта + отладка + запуск на ПК

2. ТРИ РОЛИ В КОДЕ (STEP 4 — Identify files):
• HTML = structure  ──▶ index.html (семантический каркас, секции, футер)
• CSS = appearance  ──▶ style.css  (минималистичный стиль, сетка, адаптивность)
• JS = behavior     ──▶ script.js  (клики, переключение вкладок, интерактив)

3. FIRST PROMPT В GOOGLE AI STUDIO (STEP 3):
"Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS."

4. СТРУКТУРА САЙТА TESLA.COM/MODELX (LAB):
• 6 секций: 1. Vehicles · 2. Energy · 3. Charging · 4. Semi · 5. Discover · 6. Shop
• 8 пунктов Footer: Tesla © 2026 · Privacy & Legal · Vehicle Recalls · Contact · News · Get Updates · Locations · Learn

5. ПРОМПТ ДЛЯ DEBUG CHALLENGE (4 БАГА):
"Find the bug. Explain what caused it. Fix only the necessary code."`;

  const currentBug = debugChallengeBugs.find((b) => b.id === activeBugId) || debugChallengeBugs[0];

  return (
    <div className="space-y-8 text-slate-200">
      {/* HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/50 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Урок 7 · 🏗️ Website Control Center — HTML + CSS + JavaScript
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono">
              Пошаговое руководство · Vibe Coding Guide
            </span>
          </div>

          <button
            onClick={handleTriggerEasterEgg}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{easterEggTriggered ? '✓ Система откалибрована (+25 XP)' : 'Калибровка Центра Управления'}</span>
          </button>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            🏗️ Website Control Center — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">HTML + CSS + JavaScript</span>
          </h1>
          <p className="text-base sm:text-lg text-cyan-100 font-semibold">
            Миссия урока: «Теперь дизайн превращается в настоящий сайт.»
          </p>
          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            В этом практическом руководстве (в формате пошаговых инженерных гайдов <span className="text-cyan-300 font-mono">Build Website with Google AI Studio</span>) мы соединяем знания двух предыдущих уроков и запускаем настоящий <strong>Vibe Coding</strong>: берём готовый UX/UI-дизайн из <strong>Google Stitch (Урок 5)</strong>, используем знание трёх отделов сайта из <strong>Урока 6</strong> и собираем полноценный интерактивный лендинг <strong>Tesla Model X</strong> в <strong>Google AI Studio (Build Mode)</strong> с последующей отладкой и запуском на своём локальном компьютере!
          </p>
        </div>

        {/* MISSION: THREE ROLES PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-orange-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase">Роль №1 · Каркас</span>
              <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 text-[11px] font-mono">index.html</span>
            </div>
            <div className="text-lg font-black text-white font-mono">HTML = structure</div>
            <p className="text-xs text-slate-400">
              Семантическая структура страницы: шапка, 6 продуктовых секций Tesla, карточки метрик, кнопки и футер.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Роль №2 · Стиль</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[11px] font-mono">style.css</span>
            </div>
            <div className="text-lg font-black text-white font-mono">CSS = appearance</div>
            <p className="text-xs text-slate-400">
              Внешний вид и эстетика: премиальный минимализм, типографика, воздух (whitespace), сетка Grid/Flex и адаптивность.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Роль №3 · Интерактив</span>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[11px] font-mono">script.js</span>
            </div>
            <div className="text-lg font-black text-white font-mono">JavaScript = behavior</div>
            <p className="text-xs text-slate-400">
              Поведение и логика: живой отклик кнопок Order Now / Demo Drive, переключение вкладок и динамический расчёт.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: BRIDGE FROM LESSON 5 & LESSON 6 TO VIBE CODING */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              ЧАСТЬ 1 · СИНТЕЗ ЗНАНИЙ (УРОК 5 + УРОК 6 ──▶ УРОК 7)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Как знания двух прошлых уроков соединяются в Vibe Coding
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            Idea → UX → UI → HTML/CSS/JS → Live Site
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>Из Урока 5: Google Stitch</span>
            </div>
            <div className="text-xs font-bold text-white">«Сначала дизайн. Потом код.»</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              В Уроке 5 мы изучили 10 UX-паттернов <strong>Tesla Model X</strong> и создали в <strong>Google Stitch</strong> премиальный минималистичный макет. Теперь этот макет служит визуальным техническим заданием (attached UX design) для ИИ-разработчика.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Из Урока 6: Центр Управления</span>
            </div>
            <div className="text-xs font-bold text-white">HTML, CSS и JS как три отдела</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              В Уроке 6 мы разобрали анатомию тегов <code className="text-cyan-300">&lt;тег&gt;</code>, CSS-правил <code className="text-cyan-300">селектор &#123; свойство: значение; &#125;</code> и обработчиков клика в JS. Теперь мы умеем читать код, который генерирует ИИ!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>В Уроке 7: Старт Vibe Coding</span>
            </div>
            <div className="text-xs font-bold text-white">Google AI Studio (Build Mode)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Мы загружаем UX-дизайн в <strong>Google AI Studio</strong>, ставим чёткую инженерную задачу на чистых <strong>HTML + CSS + JS</strong>, инспектируем файлы, проводим отладку багов и запускаем готовый сайт на своём компьютере.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: STEP-BY-STEP GUIDE (PROFITSTUDIO STYLE) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              ЧАСТЬ 2 · ПОШАГОВЫЙ ГАЙД (GOOGLE AI STUDIO BUILD MODE)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              От дизайна к рабочему сайту за 4 шага (STEP 1 — STEP 4)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Структура гайда: Build Website in Google AI Studio
          </span>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {buildSteps.map((item) => {
            const isActive = activeBuildStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setActiveBuildStep(item.step)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                  {item.badge}
                </div>
                <div className="text-sm font-bold text-white mt-1">{item.title}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        {buildSteps
          .filter((item) => item.step === activeBuildStep)
          .map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                    {item.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-2">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {item.step > 1 && (
                    <button
                      onClick={() => setActiveBuildStep(item.step - 1)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      ← Назад
                    </button>
                  )}
                  {item.step < 4 && (
                    <button
                      onClick={() => setActiveBuildStep(item.step + 1)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 cursor-pointer"
                    >
                      Следующий шаг →
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Special Prompt Box on Step 3 (and visible below) */}
              {item.step === 3 && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                      📋 STEP 3 — First Prompt (Эталонный промпт для Google AI Studio):
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          firstPromptText,
                          setCopiedFirstPrompt,
                          'Скопирован First Prompt для Google AI Studio Build Mode!'
                        )
                      }
                      className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400"
                    >
                      {copiedFirstPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFirstPrompt ? 'Скопировано!' : 'Скопировать промпт'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 text-cyan-200 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {firstPromptText}
                  </pre>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Чек-лист выполнения шага:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {item.checklist.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Совет Вайб-Кодера:</strong> {item.proTip}
                </div>
              </div>
            </div>
          ))}

        {/* Always-accessible First Prompt Card */}
        <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Быстрое копирование: STEP 3 — First Prompt (Google AI Studio)
              </span>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  firstPromptText,
                  setCopiedFirstPrompt,
                  'Скопирован First Prompt для сборки Tesla Model X!'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedFirstPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFirstPrompt ? 'Промпт скопирован' : 'Копировать First Prompt'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 border border-slate-800">
            {firstPromptText}
          </div>
        </div>
      </div>

      {/* SECTION 3: STEP 4 — IDENTIFY FILES (INDEX.HTML, STYLE.CSS, SCRIPT.JS) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              ЧАСТЬ 3 · STEP 4 — IDENTIFY FILES (ИНСПЕКТОР ФАЙЛОВ ПРОЕКТА)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Разбор трёх файлов проекта: <code className="text-orange-400">index.html</code> · <code className="text-cyan-400">style.css</code> · <code className="text-amber-400">script.js</code>
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Ученик должен найти и проверить каждый файл
          </span>
        </div>

        {/* File Switcher */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFileTab('html')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 cursor-pointer transition ${
              activeFileTab === 'html'
                ? 'bg-orange-500 text-slate-950 border-orange-400'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>index.html (HTML = structure)</span>
          </button>

          <button
            onClick={() => setActiveFileTab('css')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 cursor-pointer transition ${
              activeFileTab === 'css'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>style.css (CSS = appearance)</span>
          </button>

          <button
            onClick={() => setActiveFileTab('js')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-2 cursor-pointer transition ${
              activeFileTab === 'js'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>script.js (JavaScript = behavior)</span>
          </button>
        </div>

        {/* Active File View */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {fileInspectorData[activeFileTab].role}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Файл: <code className="font-mono text-emerald-300">{fileInspectorData[activeFileTab].filename}</code>
              </h3>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              {fileInspectorData[activeFileTab].lesson6Link}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            {fileInspectorData[activeFileTab].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {fileInspectorData[activeFileTab].keyConnections.map((conn, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-cyan-200 font-mono"
              >
                🔗 {conn}
              </div>
            ))}
          </div>

          <pre className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
            {fileInspectorData[activeFileTab].codeSnippet}
          </pre>
        </div>
      </div>

      {/* SECTION 4: LAB ARCHITECTURE — TESLA MODEL X (6 SECTIONS + FOOTER) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/30 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              ЧАСТЬ 4 · LAB АРХИТЕКТУРА САЙТА TESLA.COM/MODELX
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              6 обязательных секций сайта и канонический Footer Tesla © 2026
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300 text-xs font-mono">
            https://www.tesla.com/modelx
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          В практической работе мы создаём структуру по эталону <strong>https://www.tesla.com/modelx</strong>. Нажмите на любую из 6 секций, чтобы увидеть, как в ней работают <strong>HTML</strong>, <strong>UX/CSS</strong> и <strong>JavaScript</strong>:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {teslaSectionsArchitecture.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setActiveTeslaSection(idx)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                activeTeslaSection === idx
                  ? 'bg-indigo-600/30 border-indigo-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono text-indigo-300">SECTION {sec.num}</div>
              <div className="text-xs font-bold mt-0.5">{sec.id}</div>
            </button>
          ))}
        </div>

        {/* Active Section Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {teslaSectionsArchitecture[activeTeslaSection].title}
            </h3>
            <code className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-orange-300 font-mono">
              {teslaSectionsArchitecture[activeTeslaSection].htmlTag}
            </code>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300">🎨 UX/UI & CSS Оформление:</div>
              <p className="text-slate-300 leading-relaxed">
                {teslaSectionsArchitecture[activeTeslaSection].uxFocus}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-300">⚡ JavaScript Поведение (Behavior):</div>
              <p className="text-slate-300 leading-relaxed">
                {teslaSectionsArchitecture[activeTeslaSection].jsBehavior}
              </p>
            </div>
          </div>
        </div>

        {/* Canonical 8-item Footer */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Обязательный Footer (8 навигационных пунктов внизу страницы):
            </span>
            <code className="text-[11px] font-mono text-slate-400">&lt;footer class="site-footer"&gt;</code>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
            {[
              'Tesla © 2026',
              'Privacy & Legal',
              'Vehicle Recalls',
              'Contact',
              'News',
              'Get Updates',
              'Locations',
              'Learn'
            ].map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200 font-mono text-[11px]"
              >
                • {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5: DEBUG CHALLENGE (4 BUGS FROM TEACHER) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Bug className="w-4 h-4" /> ЧАСТЬ 5 · DEBUG CHALLENGE (ОХОТА НА 4 БАГА)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Как исправлять ошибки с помощью ИИ, не ломая остальной сайт
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-950 border border-rose-700 text-rose-300 text-xs font-bold">
            4 намеренных бага от учителя
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В реальном Vibe Coding сайт редко работает идеально с первой попытки. Учитель намеренно даёт 4 типичные поломки: <strong>broken button</strong>, <strong>wrong CSS</strong>, <strong>missing image</strong> и <strong>JavaScript error</strong>. Главное правило — не просить ИИ «перепиши вообще всё», а использовать хирургически точный промпт отладки:
        </p>

        {/* Golden Debug Prompt Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/50 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-rose-300 uppercase">
              🛠️ Золотой промпт ученика для DEBUG CHALLENGE:
            </span>
            <button
              onClick={() =>
                handleCopy(
                  debugPromptText,
                  setCopiedDebugPrompt,
                  'Скопирован промпт для DEBUG CHALLENGE!'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-rose-400 cursor-pointer transition"
            >
              {copiedDebugPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDebugPrompt ? 'Скопировано!' : 'Копировать Debug-промпт'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-sm text-rose-200 border border-slate-800">
            {debugPromptText}
          </div>
        </div>

        {/* 4 Bugs Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {debugChallengeBugs.map((bug) => (
            <button
              key={bug.id}
              onClick={() => setActiveBugId(bug.id)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                activeBugId === bug.id
                  ? 'bg-rose-950/50 border-rose-400 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono text-rose-400 font-bold">{bug.badge}</div>
              <div className="text-xs font-bold mt-1">{bug.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{bug.department}</div>
            </button>
          ))}
        </div>

        {/* Active Bug Diagnostic Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">{currentBug.title}</h3>
            <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 text-xs font-mono">
              Отдел: {currentBug.department}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Симптом на экране:</strong> {currentBug.symptom}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-rose-400">❌ До отладки (Сломанный код):</div>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-rose-900/50 text-xs font-mono text-rose-200 overflow-x-auto">
                {currentBug.brokenCode}
              </pre>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-emerald-400">✅ После промпта «Fix only the necessary code»:</div>
              <pre className="p-3.5 rounded-xl bg-slate-900 border border-emerald-900/50 text-xs font-mono text-emerald-200 overflow-x-auto">
                {currentBug.fixedCode}
              </pre>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-200">
            🤖 <strong>Ответ AI (Explain what caused it):</strong> {currentBug.aiExplanation}
          </div>
        </div>
      </div>

      {/* SECTION 6: HOW TO EXPORT SOURCE CODE AND RUN ON LOCAL PC */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" /> ЧАСТЬ 6 · ЭКСПОРТ ИСХОДНОГО КОДА И ЗАПУСК НА ЛОКАЛЬНОМ ПК
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Как скачать готовый проект из Google AI Studio и запустить на своём компьютере (It Will Work!)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600/50 text-emerald-300 text-xs font-bold">
            100% автономная работа на ПК
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Так как на Шаге 3 мы специально попросили ИИ использовать <strong>строго чистые HTML, CSS и JavaScript без лишних библиотек</strong>, наш сайт не требует сложной серверной сборки и гарантированно запустится на любом ноутбуке или домашнем ПК!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localPcSteps.map((st) => (
            <div
              key={st.num}
              onClick={() => setActiveLocalStep(st.num)}
              className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                activeLocalStep === st.num
                  ? 'bg-emerald-950/30 border-emerald-400'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  LOCAL PC · STEP {st.num}
                </span>
                {activeLocalStep === st.num && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <h3 className="text-sm font-bold text-white">{st.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Folder Tree Illustration */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Как должна выглядеть распакованная папка на вашем ПК:
          </div>
          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`📁 tesla-modelx-site/
 ├── 📄 index.html   <-- Дважды кликните сюда (или откройте через VS Code Live Server)
 ├── 🎨 style.css    <-- Стили автоматически подтянутся через <link rel="stylesheet" href="style.css">
 └── ⚡ script.js    <-- Скрипты автоматически заработают через <script src="script.js"></script>`}
          </pre>
        </div>
      </div>

      {/* SECTION 7: CHEAT SHEET */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              Шпаргалка Урока 7: Website Control Center (HTML + CSS + JS)
            </h2>
          </div>
          <button
            onClick={() =>
              handleCopy(
                cheatSheetText,
                setCopiedCheatSheet,
                'Шпаргалка Урока 7 скопирована в буфер обмена!'
              )
            }
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:bg-cyan-400 cursor-pointer transition"
          >
            {copiedCheatSheet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCheatSheet ? 'Шпаргалка скопирована!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-100 whitespace-pre-wrap leading-relaxed">
          {cheatSheetText}
        </pre>
      </div>
    </div>
  );
};
