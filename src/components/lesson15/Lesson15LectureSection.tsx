import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson15LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [promptLang, setPromptLang] = useState<'ru' | 'en'>('ru');
  const [previewProgress, setPreviewProgress] = useState<number>(0);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addReward(10, '📋 Промпт скопирован в буфер обмена! (+10 ОП)');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleStep = (step: number) => {
    const next = { ...checkedSteps, [step]: !checkedSteps[step] };
    setCheckedSteps(next);
    if (Object.values(next).filter(Boolean).length === 5) {
      addReward(25, '🎬 Весь конвейер Урока 11 изучен! (+25 ОП)');
    }
  };

  const whiskPrompt1Ru = `Создай ультра-премиальное продуктовое Hero-изображение с фокусом на задний блок камер смартфона нового поколения (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy).

Смартфон идеально отцентрирован по горизонтали (в центре кадра) и занимает только нижние 40% изображения. Верхняя часть устройства слегка наклонена внутрь к центру, создавая тонкую 3D-перспективу, где верхняя грань выглядит уже нижней, словно телефон отклоняется назад в пространство.

Видны только модуль камеры и небольшая часть окружающей задней панели из матового стекла в тон корпусу (color-matched back glass), поднимающиеся от нижнего края изображения в центре. Остальная часть телефона обрезана за пределами кадра.

Покрытие корпуса — роскошный глубокий цвет Бургунди (Burgundy / тёмно-винный металлик) с идеально подобранным матовым задним стеклом в тон (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy). Студийное градиентное освещение создаёт плавные переходы от благородного рубиново-винного оттенка к глубокому тёмному бургунди вдоль металлических граней. Тонкие блики на скошенных фасках и полированных кольцах камер.

Внутри прямоугольного выступа камеры расположены три крупных объектива в треугольной композиции Pro. Каждая линза выглядит глубокой, тёмной и глянцевой, с многослойным внутренним стеклом и тонкими концентрическими отражениями. Справа — тёмный сканер LiDAR и минималистичный круглый модуль вспышки с мягким тёплым отражением.

Освещение: контролируемый студийный верхний свет с мягким градиентом по корпусу цвета Бургунди и чёткими бликами вдоль скруглённых углов. Никаких резких отражений.

Фон: абсолютно чистый чёрный (#000000), без текстур, без дыма, без частиц, без реквизита — только парящая по центру верхняя секция смартфона.

Эстетика: реклама флагманского продукта в стиле Apple, гиперреалистичный 3D-рендер, макро-резкость, разрешение 8K, кинематографичный контраст, ощущение продукта на миллион долларов.`;

  const whiskPrompt1En = `Create an ultra-premium product hero image focusing on the rear camera module of a next-generation smartphone (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy).

The phone is perfectly centered horizontally and occupies only the lower 40% of the frame.
The top part of the device is tilted slightly inward toward the center, creating a subtle 3D perspective where the top edge appears narrower than the bottom, as if the phone is leaning back into space.

Only the camera module and a small portion of the surrounding color-matched back glass panel are visible, rising from the bottom edge in the center of the image. The rest of the phone is cropped out.

The finish is a rich, deep anodized Burgundy with color-matched matte back glass ("Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy"), with studio gradient lighting creating smooth transitions from luminous crimson-burgundy to deep wine tones along the curved metallic edges. Subtle chamfer highlights and softly polished camera rings.

Inside the rectangular camera plateau: Three large camera lenses arranged in a clean triangular pro layout. Each lens appears deep, dark, and glossy, with layered internal glass elements and faint concentric reflections. To the right side, include a dark LiDAR sensor and a minimal circular flash module with soft warm reflectivity.

Lighting: Controlled overhead studio light creating a soft gradient across the Burgundy body and crisp specular highlights along the rounded corners and lens rings. No harsh reflections.

Background: Pure solid black (#000000), completely clean, no texture, no smoke, no particles, no props — only the floating top section of the smartphone emerging from the bottom center of the frame.

Aesthetic: Apple-style flagship product advertising, hyper-real 3D product render, macro clarity, 8K detail, cinematic contrast, minimal luxury presentation.`;

  const whiskPrompt2Ru = `Создай ультра-премиальное студийное продуктовое изображение, показывающее полный вид сзади смартфона нового поколения (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy), смещённого из центра в правую часть кадра (on the right side) на чистом чёрном фоне.

Смартфон расположен строго вертикально в правой половине композиции (справа от центра, оставляя свободное негативное пространство слева для типографики и карточек характеристик), занимая около 75–80% высоты изображения, при этом полностью видны все скруглённые углы корпуса и тонкие металлические боковые грани.

Корпус выполнен в роскошном цвете Бургунди с идеально подобранным в тон матовым задним стеклом (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy). Мягкие градиенты студийного света перетекают по задней панели сверху вниз, переходя от глубокого рубиново-винного оттенка к насыщенному тёмному бургунди. Чёткие, но деликатные блики подчёркивают точную фрезеровку титановой рамки.

В верхней части устройства расположено широкое прямоугольное плато камеры с мягко скруглёнными углами, интегрированное в корпус. Внутри модуля камеры:
• Три крупных тёмных сапфировых объектива в треугольной раскладке слева, с глубокими внутренними слоями стекла и тонкими кольцевыми бликами.
• Справа — чистый круглый модуль вспышки вверху и тёмный датчик LiDAR под ним, плюс крошечное отверстие микрофона между ними.

По центру задней панели смартфона — минималистичный глянцевый тональный логотип в благородном винно-рубиновом оттенке, плавно сливающийся с матовым задним стеклом в тон корпусу (color-matched back glass).

Освещение: высококлассный коммерческий студийный свет с мягкими диагональными отражениями, чистыми светящимися гранями и глубоким контрастом. Никакого шума и внешних отражений.

Фон: абсолютно чистый чёрный (#000000), без теней на полу, без дыма, без реквизита, без текста — только парящий смартфон в правой части кадра (shifted from center to the right side).

Стиль: презентация флагманского продукта в стиле Apple, фотореалистичный 3D-рендер, 8K-детализация, роскошный минималистичный технологический брендинг.`;

  const whiskPrompt2En = `Create an ultra-premium studio product image showing the full back view of a next-generation smartphone (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy) positioned on the right side of the frame (shifted from the center to the right side) against a pure black background.

The phone stands vertically in the right portion of the composition, occupying about 75–80% of the frame height, leaving clean negative space on the left side for UI callouts, with the full rounded rectangular body clearly visible.

The device features a luxurious Burgundy finish with color-matched matte back glass ("Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy"). Subtle studio light gradients flow across the color-matched back glass panel from top to bottom, transitioning from luminous deep ruby-burgundy to rich dark wine tones. Fine specular highlights trace the curved chamfered edges and thin metallic side rails.

At the top of the phone is a wide rectangular raised camera plateau with softly rounded corners, seamlessly integrated into the body.
Inside the camera module:
• Three large dark sapphire camera lenses arranged in a triangular pro layout on the left, each with deep internal glass layers and faint circular reflections.
• On the right side, a clean circular flash module at the top and a dark LiDAR sensor below it, with a tiny microphone pinhole between them.

Centered on the phone's back panel is a minimal glossy tonal emblem in a refined burgundy-crimson shade, subtly contrasting with the color-matched matte glass surface.

Lighting: High-end commercial studio lighting with soft diagonal reflections, clean edge rim light, and controlled contrast. No harsh glare, no noise.

Background: Pure solid black (#000000), no floor shadow, no smoke, no props, no text — only the floating smartphone positioned cleanly on the right side of the frame.

Style: Apple-level flagship product hero shot, photorealistic 3D render, 8K detail, luxury minimal tech branding.`;

  const flowVideoPromptRu = `Плавное кинематографичное движение продукта в студийном свете на абсолютно чёрном фоне (#000000): флагманский iPhone 18 Pro в цвете Бургунди с задним матовым стеклом в тон корпусу (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy) начинает движение в нижней центральной части кадра (нижние 40% под наклоном) и плавно поднимается вверх, одновременно смещаясь из центра в правую сторону экрана (from center into right side), выпрямляя свой 3D-наклон до строго вертикального положения справа во весь рост (75–80% высоты), со скользящими мягкими бликами по винно-бордовым титановым граням и сапфировым объективам.`;

  const flowVideoPromptEn = `Smooth cinematic studio product motion on pure solid black background (#000000): the flagship iPhone 18 Pro shown in Burgundy with color-matched back glass ("Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy") starts in the bottom center of the frame (lower 40% tilted inward) and slowly rises while smoothly gliding from the center into the right side of the frame, straightening its 3D tilt angle until it stands vertically on the right side in full back view (75–80% height), with soft studio light reflections gliding across the deep burgundy chamfered edges and sapphire camera lenses.`;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-rose-950/35 to-slate-900 border-2 border-rose-500/40 shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs sm:text-sm font-black uppercase tracking-wider">
            УРОК 11 • ✨ MOTION DESIGNER & 🎥 MEDIA WEB (ЧАСТЬ 1 ИЗ 2)
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-rose-300 text-xs font-mono font-bold">
            💎 iPhone 18 Pro shown in Burgundy • Center → Right Side
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ✨ Motion Designer — Premium Web:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-rose-500">
              iPhone 18 Pro в цвете Бургунди (Burgundy)
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            <em>«Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy.»</em>{' '}
            Создаём продуктовые 3D-ассеты на <strong>$1 000 000</strong> по образцу{' '}
            <a
              href="https://www.apple.com/lae/iphone-18-pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 underline hover:text-rose-300 font-bold"
            >
              Apple iPhone 18 Pro
            </a>
            : в <strong>Кадре 1</strong> смартфон в цвете <strong>Burgundy (с задним стеклом в тон)</strong> находится <strong>по центру снизу</strong>, а в <strong>Кадре 2</strong> и видео плавно смещается <strong>из центра в правую часть кадра (from center into right side)</strong>!
          </p>
        </div>

        {/* Tools Bar */}
        <div className="pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-300/90 mb-2.5 font-bold">
            🛠️ Инструменты нашего конвейера в Уроке 11:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {[
              { name: 'Pinterest', desc: 'Референс iPhone 18 Pro Burgundy', url: 'https://www.pinterest.com/' },
              { name: 'Google Whisk', desc: 'Кадр 1 (Центр) и Кадр 2 (Справа)', url: 'https://labs.google/fx/ru/tools/whisk' },
              { name: 'Gemini', desc: 'Доработка русских промптов', url: 'https://gemini.google.com/' },
              { name: 'Google Flow', desc: 'Видео: из Центра → Вправо', url: 'https://flow.google.com/' },
              { name: 'Ezgif', desc: 'Конвертация Video → GIF / Кадры', url: 'https://ezgif.com/video-to-gif' },
              { name: 'AI Studio', desc: 'Загрузка папки для сборки в Уроке 12', url: 'https://aistudio.google.com/' }
            ].map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white group-hover:text-rose-300">{t.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400" />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* PIPELINE ROADMAP: 5 STEPS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              🎥 MEDIA WEB: IMAGE → VIDEO → WEBSITE (BURGUNDY • CENTER → RIGHT)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Пошаговый план создания ассетов iPhone 18 Pro в цвете Бургунди
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Отмечено шагов: {Object.values(checkedSteps).filter(Boolean).length} / 5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: 1,
              title: '1. Pinterest Референс',
              desc: 'Зайди на pinterest.com и найди концепты «iPhone 18 Pro Max Burgundy color-matched back glass».',
              link: 'https://www.pinterest.com/',
              linkText: 'Открыть Pinterest'
            },
            {
              step: 2,
              title: '2. Whisk: Кадр 1 (Центр)',
              desc: 'Создай стартовый кадр в цвете Burgundy: смартфон строго по центру в нижних 40% экрана под наклоном.',
              link: 'https://labs.google/fx/ru/tools/whisk',
              linkText: 'Открыть Whisk'
            },
            {
              step: 3,
              title: '3. Whisk: Кадр 2 (Справа)',
              desc: 'Через Remix создай конечный кадр: смартфон сместился из центра в правую сторону и встал во весь рост (75–80%).',
              link: 'https://labs.google/fx/ru/tools/whisk',
              linkText: 'Кадр 2 в Whisk'
            },
            {
              step: 4,
              title: '4. Google Flow: Видео',
              desc: 'Загрузи Start Frame (центр) и End Frame (справа) в flow.google.com и сгенерируй движение из центра вправо.',
              link: 'https://flow.google.com/',
              linkText: 'Открыть Google Flow'
            },
            {
              step: 5,
              title: '5. Ezgif → AI Studio',
              desc: 'Скачай видео, конвертируй через ezgif.com/video-to-gif (или нарезку кадров JPG) и сохрани папку для AI Studio!',
              link: 'https://ezgif.com/video-to-gif',
              linkText: 'Открыть Ezgif'
            }
          ].map(item => {
            const done = !!checkedSteps[item.step];
            return (
              <div
                key={item.step}
                onClick={() => toggleStep(item.step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  done
                    ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 text-xs font-black flex items-center justify-center">
                      {item.step}
                    </span>
                    <span className={`text-xs font-bold ${done ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {done ? '✓ Готово' : 'Отметить'}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300"
                >
                  <span>{item.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE VISUALIZER: START FRAME (CENTER) -> FLOW VIDEO -> END FRAME (RIGHT SIDE) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
              👁️ ИНТЕРАКТИВНЫЙ СИМУЛЯТОР: BURGUNDY • ДВИЖЕНИЕ ИЗ ЦЕНТРА ВПРАВО
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Как Кадр 1 (По центру снизу) переходит в Кадр 2 (В правую сторону)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewProgress(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                previewProgress < 20
                  ? 'bg-rose-500 text-white font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Кадр 1 (Центр: 0%)
            </button>
            <button
              onClick={() => setPreviewProgress(50)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                previewProgress >= 20 && previewProgress <= 80
                  ? 'bg-rose-500 text-white font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Flow Смещение (50%)
            </button>
            <button
              onClick={() => setPreviewProgress(100)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                previewProgress > 80
                  ? 'bg-rose-500 text-white font-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Кадр 2 (Справа: 100%)
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Подвигай ползунок ниже: смартфон в цвете <strong>Burgundy (с матовым стеклом в тон корпусу)</strong> поднимается из нижнего центра и плавно уходит <strong>в правую часть экрана</strong>, освобождая место слева для характеристик:
        </p>

        {/* Simulated Studio Viewport */}
        <div
          className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center"
          style={{ backgroundColor: '#000000' }}
        >
          {/* Ambient radial glow following the phone from center to right */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(159,18,57,0.34) 0%, rgba(0,0,0,0) 70%)',
              transform: `translate(${previewProgress * 1.15}px, ${40 - previewProgress * 0.4}px)`
            }}
          />

          {/* Left negative space indicator when moved right */}
          {previewProgress > 45 && (
            <div className="absolute left-6 sm:left-12 max-w-[230px] p-3.5 rounded-2xl border border-rose-500/30 bg-rose-950/20 backdrop-blur-md text-left space-y-1 transition-all">
              <span className="text-[10px] font-mono uppercase text-rose-300 font-bold">
                Свободное место слева
              </span>
              <p className="text-xs text-slate-200 font-semibold">
                Choose from four gorgeous finishes with color-matched back glass.
              </p>
              <p className="text-[11px] text-rose-300">
                iPhone 18 Pro shown in Burgundy.
              </p>
            </div>
          )}

          {/* Simulated 3D Smartphone Body in Burgundy moving from center to right */}
          <div
            className="relative transition-all duration-200 ease-out flex flex-col items-center justify-between p-3 rounded-[28px] border-2 border-rose-300/60 shadow-2xl"
            style={{
              width: `${150 + previewProgress * 0.15}px`,
              height: `${290 + previewProgress * 0.2}px`,
              background: 'linear-gradient(165deg, #881337 0%, #4c0519 55%, #2a0410 100%)',
              transform: `translate(${previewProgress * 1.15}px, ${135 - previewProgress * 1.35}px) perspective(600px) rotateX(${
                28 - previewProgress * 0.28
              }deg) scale(${0.92 + previewProgress * 0.0008})`,
              boxShadow: '0 20px 60px rgba(159, 18, 57, 0.38), inset 0 2px 6px rgba(255, 200, 215, 0.35)'
            }}
          >
            {/* Camera Plateau */}
            <div className="w-full h-24 rounded-2xl bg-gradient-to-br from-rose-900/90 to-rose-950/95 border border-rose-300/40 p-2.5 flex items-center justify-between shadow-inner">
              {/* 3 Lenses in Triangular Pro Layout */}
              <div className="grid grid-cols-2 gap-1.5 items-center">
                <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/60 shadow-inner flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-900/60 border border-sky-400/30" />
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/60 shadow-inner flex items-center justify-center translate-y-3">
                  <div className="w-3 h-3 rounded-full bg-sky-900/60 border border-sky-400/30" />
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-950 border-2 border-rose-200/60 shadow-inner flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-900/60 border border-sky-400/30" />
                </div>
              </div>
              {/* Flash & LiDAR */}
              <div className="flex flex-col items-center justify-between h-full py-1 pr-1">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-100/90 border border-rose-300 shadow" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-rose-400/40" />
              </div>
            </div>

            {/* Center Tonal Emblem */}
            <div className="w-8 h-8 rounded-full bg-rose-300/25 border border-rose-200/40 backdrop-blur-sm" />

            {/* Color-Matched Back Glass Inset */}
            <div className="w-full h-14 rounded-xl border border-rose-300/30 bg-rose-950/40" />
          </div>

          {/* Status Overlay */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono text-rose-300">
            Прогресс видео / скролла: {previewProgress}% • Кадр #{Math.max(1, Math.round((previewProgress / 100) * 120))} из 120
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-slate-300">
            {previewProgress < 25
              ? 'Кадр 1 (Центр): Нижние 40% + наклон камеры (Burgundy)'
              : previewProgress < 80
              ? 'Google Flow: Плавный подъём и смещение из центра вправо'
              : 'Кадр 2 (Справа): Полный вид сзади справа (75–80% высоты)'}
          </div>
        </div>

        {/* Slider Control */}
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={100}
            value={previewProgress}
            onChange={e => setPreviewProgress(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-2 rounded-lg bg-slate-800"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>0% — Start Frame (По центру снизу • Burgundy)</span>
            <span>50% — Движение из центра в правую часть (Google Flow)</span>
            <span>100% — End Frame (Справа во весь рост • Burgundy)</span>
          </div>
        </div>
      </div>

      {/* PROMPTS SECTION: WHISK PROMPT 1 & WHISK PROMPT 2 (RUSSIAN + ENGLISH) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              🎨 ПРОМПТЫ ДЛЯ GOOGLE WHISK & FLOW (BURGUNDY • CENTER → RIGHT SIDE)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Готовые студийные промпты: iPhone 18 Pro shown in Burgundy (из центра вправо)
            </h3>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setPromptLang('ru')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                promptLang === 'ru' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇷🇺 На русском (понятно каждому)
            </button>
            <button
              onClick={() => setPromptLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                promptLang === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇬🇧 Оригинал (EN)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prompt 1 Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                  КАДР 1 (START FRAME • ЦЕНТР) • WHISK ПРОМПТ №1
                </span>
                <button
                  onClick={() =>
                    handleCopy('whisk1', promptLang === 'ru' ? whiskPrompt1Ru : whiskPrompt1En)
                  }
                  className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedId === 'whisk1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'whisk1' ? 'Скопировано!' : 'Копировать Промпт №1'}</span>
                </button>
              </div>

              <h4 className="text-base font-bold text-white">
                По центру снизу (нижние 40% кадра) • iPhone 18 Pro shown in Burgundy
              </h4>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto">
                {promptLang === 'ru' ? whiskPrompt1Ru : whiskPrompt1En}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200">
              💡 <strong>Старт в центре:</strong> На первом кадре смартфон в цвете <strong>Burgundy с матовым стеклом в тон</strong> появляется строго по центру снизу поверх букв PRO.
            </div>
          </div>

          {/* Prompt 2 Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  КАДР 2 (END FRAME • СПРАВА) • WHISK ПРОМПТ №2
                </span>
                <button
                  onClick={() =>
                    handleCopy('whisk2', promptLang === 'ru' ? whiskPrompt2Ru : whiskPrompt2En)
                  }
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedId === 'whisk2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'whisk2' ? 'Скопировано!' : 'Копировать Промпт №2'}</span>
                </button>
              </div>

              <h4 className="text-base font-bold text-white">
                Смещение из центра в правую часть (75–80% высоты) • Burgundy
              </h4>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto">
                {promptLang === 'ru' ? whiskPrompt2Ru : whiskPrompt2En}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
              💡 <strong>Финиш справа:</strong> Во втором кадре телефон стоит вертикально <strong>в правой части кадра</strong>, открывая идеальное пространство слева для текста: <em>«Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy.»</em>
            </div>
          </div>
        </div>

        {/* Google Flow Video Prompt */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
              🎥 ПРОМПТ ДЛЯ GOOGLE FLOW (ДВИЖЕНИЕ ИЗ ЦЕНТРА В ПРАВУЮ СТОРОНУ • BURGUNDY)
            </span>
            <button
              onClick={() =>
                handleCopy('flowVideo', promptLang === 'ru' ? flowVideoPromptRu : flowVideoPromptEn)
              }
              className="px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {copiedId === 'flowVideo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'flowVideo' ? 'Скопировано!' : 'Копировать промпт для Google Flow'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 font-mono bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            {promptLang === 'ru' ? flowVideoPromptRu : flowVideoPromptEn}
          </p>
        </div>
      </div>

      {/* EZGIF & FOLDER PREPARATION FOR LESSON 12 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg sm:text-xl font-black text-white">
            Финальный шаг Урока 11: Конвертация через Ezgif и подготовка папки для Урока 12
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Когда видео из <strong>Google Flow</strong> (с плавным подъёмом iPhone 18 Pro в цвете Burgundy из центра в правую часть экрана) готово и скачано в формате MP4:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-mono font-bold">ШАГ А • EZGIF КОНВЕРТЕР</span>
            <p className="text-slate-300">
              Перейди на{' '}
              <a
                href="https://ezgif.com/video-to-gif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline"
              >
                ezgif.com/video-to-gif
              </a>{' '}
              (или раздел <strong>Video to JPG</strong> для покадровой скролл-анимации).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-mono font-bold">ШАГ Б • НАСТРОЙКА КАДРОВ</span>
            <p className="text-slate-300">
              Выбери частоту <strong>25–30 FPS</strong> и разрешение <strong>1080p / 800px</strong>, чтобы движение из центра вправо было идеально плавным.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-mono font-bold">ШАГ В • ПАПКА ДЛЯ AI STUDIO</span>
            <p className="text-slate-300">
              Сохрани GIF и папку с кадрами (<code>frame_001.jpg ... frame_120.jpg</code>) на компьютер — в <strong>Уроке 12</strong> мы загрузим их в AI Studio и соберём сайт на $1 000 000!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
