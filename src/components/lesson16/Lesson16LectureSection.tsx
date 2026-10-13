import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  Type,
  FileCode2,
  Download,
  Sparkles
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson16LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [scrollTimelinePct, setScrollTimelinePct] = useState<number>(35);
  const [promptLang, setPromptLang] = useState<'ru' | 'en'>('ru');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addReward(15, '📋 Скопировано в буфер обмена! (+15 ОП)');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadDesignMd = () => {
    const blob = new Blob([appleDesignMdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DESIGN.md';
    a.click();
    URL.revokeObjectURL(url);
    addReward(25, '💎 Файл DESIGN.md для Apple iPhone 18 Pro скачан! (+25 ОП)');
  };

  const appleDesignMdContent = `# DESIGN.md — Apple iPhone 18 Pro (Burgundy Flagship Design System)
> Источник: https://styles.refero.design • Эталон: https://www.apple.com/lae/iphone-18-pro/
> Фирменная тема: "Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy."

## 1. Цветовые токены (Color Tokens)
- \`--bg-canvas\`: \`#000000\` (Pure Black — для бесшовного слияния с 3D-рендером смартфона)
- \`--bg-elevated\`: \`#0A0A0C\` (Deep Obsidian — для секций Bento и переключателя покрытий)
- \`--bg-glass\`: \`rgba(255, 255, 255, 0.04)\` с \`backdrop-filter: blur(20px)\`
- \`--border-glass\`: \`rgba(255, 255, 255, 0.08)\`
- \`--accent-burgundy-primary\`: \`#881337\` (Anodized Burgundy Titanium)
- \`--accent-burgundy-glow\`: \`#9F1239\` / \`#BE123C\` (Color-Matched Back Glass Highlights)
- \`--text-primary\`: \`#F5F5F7\` (Apple Pure White)
- \`--text-secondary\`: \`#86868B\` (Apple Pro Muted Gray)

## 2. Типографика (Typography Scale)
- **Hero Backdrop ("PRO")**: Google Font \`Archivo\`, weight \`900\`, \`clamp(8rem, 28vw, 26rem)\`, \`letter-spacing: -0.04em\`, \`line-height: 0.82\`
- **Headline H1**: \`SF Pro Display\` / \`Inter\`, weight \`700\`, \`clamp(2.5rem, 5vw, 4.5rem)\`, \`letter-spacing: -0.025em\`
- **Section Eyebrow**: \`0.8125rem\` (13px), uppercase, \`letter-spacing: 0.16em\`, цвет \`#BE123C\`

## 3. Композиция и Скролл-Траектория (Scroll Choreography)
- **Sticky Container**: \`height: 450vh\`, внутренний \`position: sticky; top: 0; height: 100vh\`
- **Слой Z-Index 0**: Радиальное свечение Burgundy \`radial-gradient(circle, rgba(159,18,57,0.28) 0%, rgba(0,0,0,0) 68%)\`
- **Слой Z-Index 1**: Массивная надпись \`PRO\` шрифтом Archivo по центру
- **Слой Z-Index 2**: Холст \`<canvas>\` со смартфоном iPhone 18 Pro (shown in Burgundy):
  - \`0% scroll\`: Смартфон строго по центру в нижних 40% кадра с лёгким 3D-наклоном назад
  - \`50% scroll\`: Плавный подъём и скольжение из центра в правую часть экрана (\`from center into right side\`)
  - \`100% scroll\`: Полный вертикальный вид сзади (75–80% высоты) в правой части экрана, открывающий слева чистую зону для карточек и слогана:
    *"Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy."*`;

  const fullMasterPromptRu = `Роль и Задача:
Ты — ведущий креативный технолог и старший фронтенд-архитектор в Apple.
Я прикрепляю к этому запросу эталонный файл дизайн-системы \`DESIGN.md\` (полученный с https://styles.refero.design для Apple iPhone 18 Pro) и папку с кадрами анимации смартфона.
Создай в точном соответствии с \`DESIGN.md\` ультра-премиальный интерактивный продуктовый лендинг со скролл-анимацией для флагманского смартфона нового поколения:
"Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy" (Выбирайте из четырёх великолепных покрытий с задним матовым стеклом в тон корпусу. Представлен iPhone 18 Pro в цвете Бургунди).
При прокрутке смартфон начинает движение по центру снизу и плавно смещается из центра в правую часть экрана (from center into right side), открывая слева пространство для стеклянных карточек характеристик.

1. Визуальное направление и Дизайн-система (строго по прикреплённому DESIGN.md с https://styles.refero.design):
• Основной фон: Абсолютно чистый чёрный (#000000), чтобы кадры анимации смартфона бесшовно сливались со страницей без видимых границ.
• Вторичный фон секций: Глубокий обсидиан (#0A0A0C) и тёмный графит (#121216).
• Акцентный цвет (Герой — Burgundy): Глубокий благородный Бургунди (#881337 до #BE123C) с рубиново-винными бликами (#4C0519) и матовым задним стеклом в тон корпусу (color-matched back glass).
• Текст: Чистый белый (#F5F5F7) для заголовков, приглушённый серебристо-серый (#86868B) для описаний.
• Поверхности (Glassmorphism): Полупрозрачные матовые карточки background: rgba(255, 255, 255, 0.04), backdrop-filter: blur(20px), и тонкая 1px рамка rgba(255, 255, 255, 0.08).
• Типографика:
  - Подключи шрифт Google Fonts Archivo (https://fonts.google.com/specimen/Archivo?preview.text=PRO) для массивного заголовка "PRO" (вес 900 Black, плотный межбуквенный интервал letter-spacing: -0.04em).
  - Для основного интерфейса используй Inter / SF Pro Display.
  - Огромная фоновая надпись в Hero: слово "PRO", отображаемое в масштабе (clamp(8rem, 28vw, 26rem)) позади смартфона с полупрозрачным металлическим градиентом оттенка Бургунди.

2. Верхняя навигационная панель (Sticky Glass Navbar):
• Фиксированная верхняя панель высотой 56px с матовым размытием (backdrop-filter: blur(16px), background: rgba(0, 0, 0, 0.7)).
• Слева: Минималистичная иконка бренда + название "iPhone 18 Pro".
• По центру: Ссылки ("Обзор", "Камера", "4 Цвета • Бургунди", "Чип A20 Pro", "Характеристики") с плавным свечением при наведении.
• Справа: Компактная кнопка-капсула CTA "Предзаказ" с заливкой #9F1239 (Burgundy), белым текстом и мягким рубиновым свечением при наведении.

3. Секция Hero и Механика покадрового скролла (Движение из Центра → Вправо):
Создай высокий скролл-контейнер (height: 450vh) с закреплённым внутри экраном (position: sticky; top: 0; height: 100vh; overflow: hidden), который управляет анимацией по мере прокрутки страницы пользователем.

Многослойная композиция по оси Z (Глубина сцены):
• Слой 1 (Фоновое свечение, z-index: 0): Радиальное свечение цвета Бургунди позади смартфона (radial-gradient(circle, rgba(159,18,57,0.22) 0%, rgba(0,0,0,0) 65%)), которое следует за телефоном из центра в правую сторону.
• Слой 2 (Типографика заднего плана, z-index: 1): Гигантская жирная надпись "PRO" шрифтом Archivo по центру экрана.
• Слой 3 (Холст с последовательностью кадров, z-index: 2):
  - Размести элемент <canvas id="hero-lightpass"> (или контроллер кадров/GIF из загруженной папки) поверх текста "PRO".
  - Кадр 0% (Начало скролла — В ЦЕНТРЕ): Виден только крупный план модуля камер в нижних 40% экрана строго по центру под лёгким 3D-наклоном назад.
  - Кадр 50% (Середина скролла — ДВИЖЕНИЕ ВПРАВО): Смартфон плавно поднимается выше, выпрямляет угол наклона и смещается из центра в правую часть экрана (from center into right side).
  - Кадр 100% (Конец скролла Hero — СПРАВА): Смартфон полностью виден сзади строго вертикально в правой половине экрана (75–80% высоты), демонстрируя покрытие Burgundy и заднее стекло в тон (color-matched back glass).

4. Синхронизированные со скроллом карточки характеристик (Scroll-Triggered Callouts):
Пока смартфон смещается из центра в правую часть экрана, в освободившейся левой части плавно всплывают стеклянные карточки:
• На 0% – 20% скролла: Надпись "PRO" на заднем плане + фирменный подзаголовок сверху: "Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy."
• На 25% – 45% скролла (Слева): Стеклянная карточка "Система камер Pro. Новое поколение." (Три сапфировых объектива, 48 МП Fusion, 5x оптический зум, сканер LiDAR).
• На 50% – 70% скролла (Слева): Стеклянная карточка "4 великолепных цвета. Заднее стекло в тон корпусу. Показан цвет Бургунди (Burgundy)."
• На 75% – 95% скролла (Финал): Когда телефон полностью выпрямился справа, слева и внизу появляются цена "От $1199" и две кнопки: бордовая (#9F1239) "Оформить предзаказ" и стеклянная "Смотреть презентацию ▸".

5. Дополнительные секции ниже Hero (Продолжение истории продукта по DESIGN.md):
• Секция А: Интерактивный выбор из 4 роскошных покрытий с задним стеклом в тон ("Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy").
• Секция Б: Bento-сетка характеристик (4 стеклянные карточки с подсветкой рамок: Чип A20 Pro 2nm, Экран Super Retina XDR 3000 нит, Батарея до 35 часов, Оптический зум 120 мм).
• Секция В: Минималистичный футер в стиле Apple.

6. Технические требования:
• Строго соблюдай все токены, отступы и радиусы из прикреплённого файла DESIGN.md.
• Используй requestAnimationFrame для идеальной плавности 60fps.
• Выполни предзагрузка кадров (Preload) со стильным индикатором загрузки в процентах (0% -> 100%).`;

  const fullMasterPromptEn = `Role & Objective:
Act as a Principal Creative Technologist and Senior Frontend Architect at Apple.
I am attaching the official \`DESIGN.md\` specification file (sourced from https://styles.refero.design for the Apple iPhone 18 Pro) along with the smartphone frame sequence folder.
Build an ultra-premium, scroll-driven interactive product showcase website strictly following \`DESIGN.md\` for a next-generation flagship smartphone featuring the official finish theme:
"Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy."
As the user scrolls, the smartphone must start centered in the lower 40% of the frame and smoothly rise while moving from the center into the right side of the viewport, opening clean negative space on the left for glassmorphic feature callouts.

1. Visual Direction & Design System (Strictly follow attached DESIGN.md from https://styles.refero.design):
• Primary Background: Pure solid black (#000000) so the smartphone frame sequence blends seamlessly into the page with zero visible borders.
• Accent Color: Rich Anodized Burgundy (#881337 to #BE123C) with color-matched matte back glass highlights.
• Typography: Import Google Font 'Archivo' (weight 900 Black, letter-spacing: -0.04em) for the massive "PRO" backdrop text (clamp(8rem, 28vw, 26rem)) behind the smartphone.

2. Hero Section & Scroll-Driven Image Sequence (450vh sticky container, Center -> Right Side):
• Layer 1 (z-index: 0): Subtle radial burgundy glow behind the device moving from center to the right side.
• Layer 2 (z-index: 1): Giant "PRO" typography in Archivo font centered in the viewport.
• Layer 3 (z-index: 2): HTML5 <canvas> rendering the smartphone frame sequence on top of the "PRO" text:
  - 0% scroll (Center): Close-up rear camera module centered horizontally in lower 40% of frame, tilted back in 3D perspective.
  - 50% scroll (Center -> Right): Phone rises, straightens its tilt angle, and glides smoothly from the center toward the right side.
  - 100% scroll (Right Side): Full vertical back view positioned on the right side occupying 75–80% of viewport height, showcasing the Burgundy finish with color-matched back glass.

3. Scroll-Triggered Glass Callout Cards (Appearing on the Left as phone moves Right):
• 0%–20%: "PRO" title + "Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy."
• 25%–45% (Left): "Pro Camera System. Next-Gen." (48MP Fusion, 5x Telephoto, LiDAR).
• 50%–70% (Left): "Four Gorgeous Finishes. Color-Matched Back Glass. Shown in Burgundy."
• 75%–95% (Left / Bottom): Final lockup + "Pre-order Now" (#9F1239 Burgundy) & "Watch the Film" buttons.

4. Below the Fold:
• Interactive Four Finishes Switcher (highlighting Burgundy with color-matched back glass), Interactive Bento Grid (4 cards with mouse-tracking border glow), and Apple-style Footer.
• Preload all frames with a sleek 0%–100% loading indicator and render at 60fps via requestAnimationFrame.`;

  const fontEmbedCode = `<!-- Подключение шрифта Archivo из Google Fonts в <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

<style>
  .hero-pro-backdrop {
    font-family: 'Archivo', sans-serif;
    font-weight: 900;
    font-size: clamp(8rem, 28vw, 26rem);
    letter-spacing: -0.04em;
    line-height: 0.85;
    background: linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(190,18,60,0.16) 70%, rgba(0,0,0,0) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 1;
    user-select: none;
  }
</style>`;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/*Load Archivo font dynamically so students see real Archivo 'PRO' in the live simulator */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&display=swap');`}</style>

      {/* HERO BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-rose-950/35 to-slate-900 border-2 border-rose-500/50 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs sm:text-sm font-black uppercase tracking-wider">
            УРОК 12 • 💎 САЙТ НА $1 000 000 (ЧАСТЬ 2 ИЗ 2 • PROJECT #4)
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-rose-300 text-xs font-mono font-bold">
            styles.refero.design (DESIGN.md) • Burgundy • Center → Right
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Собираем флагманский сайт{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-200 to-rose-500">
              iPhone 18 Pro (Burgundy)
            </span>{' '}
            с файлом DESIGN.md
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Как добиться <strong>100% совпадения с дизайном Apple</strong>, чтобы впечатлить любого зрителя с первой секунды? Секрет профессионалов — взять готовый файл дизайн-системы{' '}
            <strong className="text-amber-300">DESIGN.md</strong> на платформе{' '}
            <a
              href="https://styles.refero.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300 font-bold"
            >
              styles.refero.design
            </a>
            , соединить его с нашей папкой кадров из Урока 11 (смартфон в цвете <strong>Burgundy</strong> со смещением из центра вправо) и шрифтом{' '}
            <a
              href="https://fonts.google.com/specimen/Archivo?preview.text=PRO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 underline hover:text-rose-300 font-bold"
            >
              Archivo («PRO»)
            </a>{' '}
            в <strong>Google AI Studio</strong>!
          </p>
        </div>

        {/* Quick Links to Reference, styles.refero.design, Font & AI Studio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-amber-950/30 border-2 border-amber-500/50 hover:border-amber-400 flex items-center justify-between transition-all shadow-lg shadow-amber-500/10"
          >
            <div>
              <span className="text-xs font-black text-amber-300 block">📐 1. Получить DESIGN.md</span>
              <span className="text-[11px] text-amber-100/80">styles.refero.design</span>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
          </a>

          <a
            href="https://www.apple.com/lae/iphone-18-pro/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/60 flex items-center justify-between transition-all"
          >
            <div>
              <span className="text-xs font-black text-white block">🍏 2. Эталон: iPhone 18 Pro</span>
              <span className="text-[11px] text-slate-400">apple.com/lae/iphone-18-pro/</span>
            </div>
            <ExternalLink className="w-4 h-4 text-rose-400 shrink-0" />
          </a>

          <a
            href="https://fonts.google.com/specimen/Archivo?preview.text=PRO"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 flex items-center justify-between transition-all"
          >
            <div>
              <span className="text-xs font-black text-white block">🔤 3. Шрифт: Archivo (PRO)</span>
              <span className="text-[11px] text-slate-400">fonts.google.com/specimen/Archivo</span>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0" />
          </a>

          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 flex items-center justify-between transition-all"
          >
            <div>
              <span className="text-xs font-black text-white block">🚀 4. Сборка: AI Studio</span>
              <span className="text-[11px] text-slate-400">DESIGN.md + Папка кадров</span>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
          </a>
        </div>
      </div>

      {/* NEW DEDICATED SECTION: STYLES.REFERO.DESIGN -> GET DESIGN.MD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border-2 border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shrink-0">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> СЕКРЕТ 100% ПОПАДАНИЯ В ДИЗАЙН APPLE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Шаг 1: Получаем файл DESIGN.md для Apple iPhone 18 Pro на styles.refero.design
              </h2>
            </div>
          </div>

          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all"
          >
            <span>Открыть styles.refero.design</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Почему у одних разработчиков ИИ создаёт обычный сайт, а у других — <strong>шедевр на $1 000 000</strong>, который невозможно отличить от оригинала Apple? Потому что профессионалы передают ИИ не просто слова, а структурированный файл дизайн-системы <code>DESIGN.md</code> с сервиса{' '}
          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 underline font-bold"
          >
            https://styles.refero.design
          </a>
          !
        </p>

        {/* 3 Step Guide for styles.refero.design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold">
              ШАГ 1 • ОТКРОЙ КАТАЛОГ СТИЛЕЙ
            </span>
            <h3 className="text-sm font-black text-white">Зайди на styles.refero.design</h3>
            <p className="text-slate-300 leading-relaxed">
              Перейди на{' '}
              <a
                href="https://styles.refero.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline font-semibold"
              >
                https://styles.refero.design
              </a>{' '}
              и выбери дизайн-систему флагманской страницы <strong>Apple / iPhone Pro</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold">
              ШАГ 2 • СКАЧАЙ DESIGN.MD
            </span>
            <h3 className="text-sm font-black text-white">Получи готовый файл DESIGN.md</h3>
            <p className="text-slate-300 leading-relaxed">
              Скачай или скопируй файл <code>DESIGN.md</code> — внутри него прописаны точные пропорции, радиусы скругления, glassmorphism-формулы, шрифтовые размеры и цвета Apple.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold">
              ШАГ 3 • ЗАГРУЗИ В AI STUDIO
            </span>
            <h3 className="text-sm font-black text-white">Прикрепи DESIGN.md + Кадры</h3>
            <p className="text-slate-300 leading-relaxed">
              Загрузи файл <code>DESIGN.md</code> в <strong>Google AI Studio</strong> вместе с папкой кадров из Урока 11 и отправь наш Мастер-Промпт — ИИ построит сайт с идеальным 100% совпадением дизайна!
            </p>
          </div>
        </div>

        {/* Ready-to-use DESIGN.md preview + Copy/Download buttons */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-amber-300">
                📄 ГОТОВЫЙ ЭТАЛОННЫЙ ФАЙЛ DESIGN.md (APPLE IPHONE 18 PRO • BURGUNDY)
              </span>
              <p className="text-[11px] text-slate-400">
                Ты можешь взять стиль на styles.refero.design или сразу скачать / скопировать этот адаптированный под цвет Burgundy файл DESIGN.md:
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy('designMd', appleDesignMdContent)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all border border-amber-500/30"
              >
                {copiedId === 'designMd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'designMd' ? 'DESIGN.md скопирован!' : 'Копировать DESIGN.md'}</span>
              </button>
              <button
                onClick={handleDownloadDesignMd}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать DESIGN.md</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-100/90 font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
            {appleDesignMdContent}
          </pre>
        </div>
      </div>

      {/* LIVE INTERACTIVE $1,000,000 WEBSITE SIMULATOR WITH ARCHIVO 'PRO' & CENTER-TO-RIGHT MOTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              💎 ЖИВОЙ ПРЕДПРОСМОТР САЙТА ПО DESIGN.MD (BURGUNDY • ИЗ ЦЕНТРА ВПРАВО)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Покрути слайдер скролла (0% → 100%): смартфон уходит из центра вправо, открывая карточки слева
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { label: '0% Центр', val: 5 },
              { label: '35% Камера', val: 35 },
              { label: '60% Burgundy', val: 60 },
              { label: '90% Справа', val: 90 }
            ].map(btn => (
              <button
                key={btn.val}
                onClick={() => setScrollTimelinePct(btn.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  Math.abs(scrollTimelinePct - btn.val) <= 12
                    ? 'bg-rose-600 text-white font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Simulated Apple Viewport */}
        <div
          className="relative h-[440px] rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between select-none"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Sticky Glass Navbar */}
          <div
            className="relative z-30 h-12 px-5 flex items-center justify-between border-b border-white/10"
            style={{ backgroundColor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-xs font-black tracking-tight text-white">iPhone 18 Pro</span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300">
                DESIGN.md Matched
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-5 text-[11px] text-slate-300 font-medium">
              <span className="text-white">Обзор</span>
              <span>Камера</span>
              <span>4 Цвета • Burgundy</span>
              <span>Чип A20 Pro</span>
              <span>Характеристики</span>
            </div>
            <button className="px-3 py-1 rounded-full bg-[#9F1239] text-white text-[11px] font-bold shadow-md shadow-rose-500/30">
              Предзаказ
            </button>
          </div>

          {/* 3-Layer Stage */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            {/* LAYER 0: Ambient Radial Glow following phone from center to right */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-300"
              style={{
                zIndex: 0,
                background: 'radial-gradient(circle, rgba(159,18,57,0.32) 0%, rgba(0,0,0,0) 68%)',
                transform: `translateX(${scrollTimelinePct * 1.25}px)`
              }}
            />

            {/* LAYER 1: Giant 'PRO' Typography in Archivo Font BEHIND the phone */}
            <div
              className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300"
              style={{
                zIndex: 1,
                transform: `translateY(${-scrollTimelinePct * 0.45}px) scale(${1 - scrollTimelinePct * 0.0015})`,
                opacity: Math.max(0.18, 1 - scrollTimelinePct * 0.007)
              }}
            >
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-rose-300/90 mb-1 text-center px-4">
                Choose from four gorgeous finishes with color-matched back glass • iPhone 18 Pro shown in Burgundy
              </span>
              <div
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(6.5rem, 20vw, 14rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.82,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(190,18,60,0.24) 65%, rgba(0,0,0,0) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                PRO
              </div>
            </div>

            {/* LAYER 2: Smartphone Canvas Sequence ON TOP OF 'PRO' moving from Center to Right Side */}
            <div
              className="relative transition-all duration-200 ease-out flex flex-col items-center justify-between p-3 rounded-[28px] border-2 border-rose-300/70"
              style={{
                zIndex: 2,
                width: '156px',
                height: '300px',
                background: 'linear-gradient(165deg, #881337 0%, #4c0519 55%, #2a0410 100%)',
                transform: `translate(${scrollTimelinePct * 1.25}px, ${130 - scrollTimelinePct * 1.3}px) perspective(650px) rotateX(${
                  26 - scrollTimelinePct * 0.26
                }deg)`,
                boxShadow: '0 25px 70px rgba(159, 18, 57, 0.42), inset 0 2px 6px rgba(255, 200, 215, 0.4)'
              }}
            >
              {/* Camera Plateau */}
              <div className="w-full h-24 rounded-2xl bg-gradient-to-br from-rose-900/90 to-rose-950/95 border border-rose-300/50 p-2.5 flex items-center justify-between shadow-inner">
                <div className="grid grid-cols-2 gap-1.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/70 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-sky-900/70" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/70 flex items-center justify-center translate-y-3">
                    <div className="w-3 h-3 rounded-full bg-sky-900/70" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/70 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-sky-900/70" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between h-full py-1 pr-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-100/90 border border-rose-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-rose-400/50" />
                </div>
              </div>

              {/* Emblem */}
              <div className="w-8 h-8 rounded-full bg-rose-300/30 border border-rose-200/40" />

              {/* Bottom Color-Matched Back Glass Inset */}
              <div className="w-full h-12 rounded-xl border border-rose-300/30 bg-rose-950/40" />
            </div>

            {/* SCROLL CALLOUT 1 (25% - 48%): Left Camera Card */}
            {scrollTimelinePct >= 22 && scrollTimelinePct <= 48 && (
              <div
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-[240px] p-4 rounded-2xl border border-white/15 text-left space-y-1.5 transition-all"
                style={{
                  zIndex: 10,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
                  25%–45% СКРОЛЛА • СЛЕВА
                </span>
                <h4 className="text-sm font-black text-white">Система камер Pro. Новое поколение.</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Три сапфировых объектива, 48 МП Fusion, 5x оптический зум и сканер LiDAR.
                </p>
              </div>
            )}

            {/* SCROLL CALLOUT 2 (49% - 73%): Left Finishes Card */}
            {scrollTimelinePct >= 49 && scrollTimelinePct <= 73 && (
              <div
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-[260px] p-4 rounded-2xl border border-rose-400/30 text-left space-y-1.5 transition-all"
                style={{
                  zIndex: 10,
                  backgroundColor: 'rgba(136,19,55,0.18)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <span className="text-[10px] font-mono uppercase text-rose-300 font-bold">
                  50%–70% СКРОЛЛА • ТЕЛЕФОН СПРАВА
                </span>
                <h4 className="text-sm font-black text-white">
                  Choose from four gorgeous finishes with color-matched back glass.
                </h4>
                <p className="text-[11px] text-rose-200 leading-snug">
                  iPhone 18 Pro shown in Burgundy — матовое заднее стекло в тон корпусу.
                </p>
              </div>
            )}

            {/* SCROLL CALLOUT 3 (74% - 100%): Final Lockup CTA */}
            {scrollTimelinePct >= 74 && (
              <div
                className="absolute bottom-4 left-4 sm:left-8 flex flex-col items-start justify-center gap-2 z-20"
              >
                <div className="p-4 rounded-2xl bg-black/85 border border-rose-500/30 backdrop-blur-md space-y-2 max-w-xs">
                  <div className="text-xs font-bold text-rose-300">
                    iPhone 18 Pro shown in Burgundy • От $1199
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Choose from four gorgeous finishes with color-matched back glass.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button className="px-3.5 py-1.5 rounded-full bg-[#9F1239] text-white text-xs font-black">
                      Оформить предзаказ
                    </button>
                    <button className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15">
                      Смотреть фильм ▸
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Timeline Bar */}
          <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>DESIGN.md (styles.refero.design)</span>
            <span className="text-rose-400 font-bold">Скролл (Центр → Вправо): {scrollTimelinePct}%</span>
            <span>Слой 2 (z:2): Burgundy iPhone 18 Pro</span>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={scrollTimelinePct}
          onChange={e => setScrollTimelinePct(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer h-2 rounded-lg bg-slate-800"
        />
      </div>

      {/* GOOGLE FONT ARCHIVO SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Type className="w-6 h-6 text-cyan-400" />
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                ТИПОГРАФИКА НА МИЛЛИОН ДОЛЛАРОВ
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Шаг 2: Подключаем шрифт Archivo для гигантской надписи «PRO»
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://fonts.google.com/specimen/Archivo?preview.text=PRO"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Открыть Archivo в Google Fonts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => handleCopy('fontCode', fontEmbedCode)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              {copiedId === 'fontCode' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'fontCode' ? 'Код скопирован!' : 'Копировать CSS шрифта'}</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-cyan-200 font-mono overflow-x-auto leading-relaxed">
          {fontEmbedCode}
        </pre>
      </div>

      {/* FULL MASTER PROMPT FOR GOOGLE AI STUDIO (IN RUSSIAN & ENGLISH) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              🚀 ШАГ 3: ГЛАВНЫЙ ПРОМПТ ДЛЯ GOOGLE AI STUDIO (С УЧЁТОМ DESIGN.MD)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Прикрепи DESIGN.md (из styles.refero.design) + Папку кадров и отправь этот Мастер-Промпт
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setPromptLang('ru')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  promptLang === 'ru' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'
                }`}
              >
                🇷🇺 Русский Промпт
              </button>
              <button
                onClick={() => setPromptLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  promptLang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            <button
              onClick={() =>
                handleCopy('masterPrompt', promptLang === 'ru' ? fullMasterPromptRu : fullMasterPromptEn)
              }
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {copiedId === 'masterPrompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'masterPrompt' ? 'Скопировано!' : 'Скопировать весь Мастер-Промпт'}</span>
            </button>
          </div>
        </div>

        <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
          {promptLang === 'ru' ? fullMasterPromptRu : fullMasterPromptEn}
        </pre>
      </div>
    </div>
  );
};
