import React, { useState } from 'react';
import {
  Sparkles,
  Layout,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Shield,
  Ruler,
  Volume2,
  VolumeX,
  Eye,
  Sliders,
  Compass,
  Layers,
  MousePointer,
  ArrowRight,
  BookOpen,
  Zap,
  Wand2,
  ExternalLink
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson11LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rulerTriggered, setRulerTriggered] = useState(false);

  // Workflow toggle: Design First vs Chaos
  const [workflowMode, setWorkflowMode] = useState<'design_first' | 'chaos'>('design_first');

  // Part 1: Tesla Model X 10 UX patterns + 5 UX decisions student task
  const [selectedUxDecisions, setSelectedUxDecisions] = useState<string[]>([
    'hero',
    'storytelling',
    'whitespace',
    'spec_cards',
    'cta'
  ]);
  const [activeStorySection, setActiveStorySection] = useState<number>(0);

  // Part 2: Google Stitch 6-step interactive guide
  const [activeStitchStep, setActiveStitchStep] = useState<number>(1);
  const [copiedPrompt1, setCopiedPrompt1] = useState(false);
  const [copiedPrompt2, setCopiedPrompt2] = useState(false);
  const [copiedCheat, setCopiedCheat] = useState(false);

  const handleRulerClick = () => {
    if (!rulerTriggered) {
      setRulerTriggered(true);
      addReward(25, 'Пасхалка Урока 5: Google Stitch Canvas откалиброван по сетке Tesla Model X!');
    }
  };

  const toggleUxDecision = (id: string) => {
    if (selectedUxDecisions.includes(id)) {
      setSelectedUxDecisions(selectedUxDecisions.filter((item) => item !== id));
      return;
    }
    if (selectedUxDecisions.length >= 5) {
      setSelectedUxDecisions([...selectedUxDecisions.slice(1), id]);
      return;
    }
    const next = [...selectedUxDecisions, id];
    setSelectedUxDecisions(next);
    if (next.length === 5) {
      addReward(25, 'Найдены 5 премиальных UX-решений Tesla Model X!');
    }
  };

  const teslaUxPatterns = [
    {
      id: 'hero',
      title: '1. Hero Section (Первый экран)',
      desc: 'Полноэкранный ракурс автомобиля, минимум лишнего текста, фокус на силуэте, 3 главные метрики внизу и контрастная кнопка Order Now.'
    },
    {
      id: 'typography',
      title: '2. Typography (Типографика)',
      desc: 'Чистый геометрический гротеск, крупный трекинг заголовков, мгновенное считывание цифр (1,020 hp, 2.5 s) за 1 секунду.'
    },
    {
      id: 'whitespace',
      title: '3. Whitespace (Воздух и пространство)',
      desc: 'Огромные чистые отступы вокруг продукта. Никаких визуальных баннеров и шума — воздух создаёт ощущение люкса.'
    },
    {
      id: 'storytelling',
      title: '4. Product Storytelling (Последовательная история)',
      desc: 'Логичный сценарий при скролле: Interior → Exterior → Performance → Utility → Charging → Safety.'
    },
    {
      id: 'cta',
      title: '5. CTA (Призыв к действию)',
      desc: 'Две чёткие кнопки с понятным приоритетом: основная контрастная «Order Now» и вторичная полупрозрачная «Demo Drive».'
    },
    {
      id: 'image_hierarchy',
      title: '6. Image Hierarchy (Иерархия визуала)',
      desc: 'Сначала общий план, затем макро-детали (штурвал Yoke, двери Falcon Wing, панорамное стекло).'
    },
    {
      id: 'spec_cards',
      title: '7. Specification Cards (Карточки характеристик)',
      desc: 'Лаконичные 3–4 колонки с ключевыми цифрами: 335 mi Range, 2.5s 0-60 mph, 9.9s 1/4 Mile, 1,020 hp Peak Power.'
    },
    {
      id: 'scrolling_sections',
      title: '8. Scrolling Sections (Секции прокрутки)',
      desc: 'Каждая секция экрана посвящена строго одной ключевой мысли (1 экран = 1 преимущество продукта).'
    },
    {
      id: 'visual_transitions',
      title: '9. Visual Transitions (Визуальные переходы)',
      desc: 'Плавная смена тёмной темы (интерьер и ночная трасса) и светлой темы (экстерьер и простор салона).'
    },
    {
      id: 'mobile_behavior',
      title: '10. Mobile Behavior (Поведение на смартфоне)',
      desc: 'Характеристики перестраиваются в компактный ряд сверху/снизу, кнопки CTA растягиваются во всю ширину под большой палец.'
    }
  ];

  const teslaStorytellingFlow = [
    {
      step: '01',
      name: 'Interior (Интерьер будущего)',
      focus: '17” кинематографический дисплей, штурвал Yoke, трёхзонный климат и звук студийного класса.',
      uxSecret: 'Погружение изнутри: зритель сначала представляет себя в салоне.'
    },
    {
      step: '02',
      name: 'Exterior (Экстерьер и аэродинамика)',
      focus: 'Двери Falcon Wing, коэффициент аэродинамического сопротивления 0.24 Cd.',
      uxSecret: 'Крупные планы кузова с акцентом на инженерную эстетику.'
    },
    {
      step: '03',
      name: 'Performance (Экстремальная динамика)',
      focus: 'Plaid: три независимых мотора с карбоновыми роторами, 1,020 л.с. и разгон 2.5 с.',
      uxSecret: 'Три карточки цифр поверх динамичного кадра на треке.'
    },
    {
      step: '04',
      name: 'Utility (Практичность и вместимость)',
      focus: 'До 2,614 литров багажного пространства, буксировка до 2,250 кг и удобная посадка с 6 или 7 креслами.',
      uxSecret: 'Интерактивное переключение конфигурации салона (5 / 6 / 7 мест).'
    },
    {
      step: '05',
      name: 'Charging (Зарядка и запас хода)',
      focus: 'До 539 км на одном заряде, 282 км за 15 минут на сети Supercharger.',
      uxSecret: 'Визуализация маршрута и экономии времени без сложных графиков.'
    },
    {
      step: '06',
      name: 'Safety (Активная и пассивная безопасность)',
      focus: 'Низкий центр тяжести батареи, защита от боковых ударов и автопилот.',
      uxSecret: 'Рентген-схема каркаса кузова, вызывающая максимальное доверие.'
    }
  ];

  const stitchSteps = [
    {
      num: 1,
      title: 'Step 1 — Open Google Stitch',
      subtitle: 'Открываем AI Design Canvas',
      detail: 'Переходим в Google Stitch (stitch.withgoogle.com). Google описывает его как AI design canvas, который превращает natural-language instructions в high-fidelity UI.'
    },
    {
      num: 2,
      title: 'Step 2 — Create Project',
      subtitle: 'Создаём чистый проект',
      detail: 'Создаём новый холст (Web / Mobile Responsive Canvas) для проектирования продуктового лендинга в стиле Tesla Model X.'
    },
    {
      num: 3,
      title: 'Step 3 — Describe Product',
      subtitle: 'Формулируем первичный промпт по референсу',
      detail: 'Используем Prompt URL и описание: "Design a modern website like tesla.com. Create a premium minimal interface".'
    },
    {
      num: 4,
      title: 'Step 4 — Generate UI',
      subtitle: 'Генерация High-Fidelity макета',
      detail: 'Google Stitch за секунды строит полноценный визуальный интерфейс с Hero-экраном, карточками характеристик и секциями сторителлинга.'
    },
    {
      num: 5,
      title: 'Step 5 — Inspect UI Elements',
      subtitle: 'Инженерная ревизия 6 узлов',
      detail: 'Проверяем: 1) Hierarchy (иерархия), 2) Spacing (отступы), 3) Typography (шрифты), 4) Buttons (кнопки), 5) Cards (карточки), 6) Navigation (навигация).'
    },
    {
      num: 6,
      title: 'Step 6 — Ask AI to Improve',
      subtitle: 'Итеративное улучшение без визуального мусора',
      detail: 'Отправляем точечный промпт: "Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements."'
    }
  ];

  const stitchPrompt1 = `Design a modern website like tesla.com. Create a premium minimal interface for an electric flagship SUV with a fullscreen hero section, 4 specification metric cards (Range, 0-60 mph, Peak Power, Top Speed), clean sans-serif typography, generous whitespace, and sequential product storytelling (Interior -> Exterior -> Performance -> Utility -> Charging -> Safety).`;

  const stitchPrompt2 = `Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements.`;

  const cheatSheetText = `🎨 AI PRODUCT DESIGNER — GOOGLE STITCH
МИССИЯ: «Сначала дизайн. Потом код.»
ПРАВИЛЬНЫЙ ПУТЬ: Idea → UX → UI → Prototype → Code (А НЕ: Prompt → Code → хаос)

PART 1 — TESLA MODEL X UX PATTERNS:
• 10 паттернов: Hero, Typography, Whitespace, Product Storytelling, CTA, Image Hierarchy, Specification Cards, Scrolling Sections, Visual Transitions, Mobile Behavior.
• Цепочка Storytelling: Interior → Exterior → Performance → Utility → Charging → Safety.

PART 2 — GOOGLE STITCH 6 STEPS:
1. Open Google Stitch → 2. Create project → 3. Describe product (tesla.com style) → 4. Generate UI → 5. Inspect (hierarchy, spacing, typography, buttons, cards, navigation) → 6. Ask AI to improve.

ПРОМПТ УЛУЧШЕНИЯ:
"Improve the visual hierarchy and make the interface feel like a premium modern technology product. Do not add unnecessary elements."`;

  return (
    <div className="space-y-8 text-slate-200">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 shadow-2xl">
        <div className="relative p-6 sm:p-8 w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-cyan-400" /> Урок 5 · 🎨 AI Product Designer — Google Stitch
              </span>
              <button
                onClick={handleRulerClick}
                title="Проверить сетку Google Stitch"
                className="p-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-300 transition-all cursor-pointer"
              >
                <Ruler className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
                  animationsEnabled
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                    : 'bg-slate-900/80 border-slate-700 text-slate-400'
                }`}
              >
                {animationsEnabled ? '✨ Анимации: ВКЛ' : '⏸ Анимации: ВЫКЛ'}
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Вот здесь начинается новая программа · Mission: «Сначала дизайн. Потом код.»
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              🎨 AI Product Designer — Google Stitch & Tesla Model X
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Google описывает <strong>Google Stitch</strong> как <em>AI design canvas</em>, который превращает инструкции на естественном языке (natural-language instructions) в <strong>high-fidelity UI</strong>, который можно итеративно улучшать и экспортировать.
            </p>
          </div>
        </div>

        {rulerTriggered && (
          <div className="p-4 bg-gradient-to-r from-cyan-950 to-indigo-950 border-t border-cyan-500/40 flex items-center justify-between text-xs sm:text-sm text-cyan-200">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Google Stitch Inspector:</strong> Иерархия, Whitespace и сетка карточек откалиброваны по стандарту Tesla Design System!
              </span>
            </div>
            <span className="font-mono text-emerald-400 font-bold shrink-0">+25 EXP</span>
          </div>
        )}
      </div>

      {/* MISSION PHILOSOPHY: Idea -> UX -> UI -> Prototype -> Code */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Главное правило урока
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Mission: «Сначала дизайн. Потом код.»
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWorkflowMode('design_first')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                workflowMode === 'design_first'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              ✅ Idea → UX → UI → Prototype → Code
            </button>
            <button
              onClick={() => setWorkflowMode('chaos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                workflowMode === 'chaos'
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              ❌ Prompt → Code → хаос
            </button>
          </div>
        </div>

        {workflowMode === 'design_first' ? (
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-4">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Профессиональный продуктовый пайплайн (Design-First Workflow):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {[
                { step: '1. Idea', desc: 'Смысл продукта и ценность для человека' },
                { step: '2. UX', desc: 'Логика экранов, сторителлинг и путь взгляда' },
                { step: '3. UI (Stitch)', desc: 'Визуальная иерархия, воздух, шрифты и кнопки' },
                { step: '4. Prototype', desc: 'Инспекция, исправление деталей и картинок' },
                { step: '5. Code', desc: 'Чистый экспорт готового дизайна в код' }
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-1">
                  <div className="text-sm font-black text-emerald-400 font-mono">{item.step}</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-3">
            <div className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              Почему «Prompt → Code → хаос» разрушает проект:
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Когда ученик сразу просит генератор написать код без продуманного UX и UI-холста, получается нагромождение случайных кнопок, кислотных цветов, сломанных отступов и отсутствия истории продукта. В <strong>Google Stitch</strong> мы сначала видим и шлифуем интерфейс глазами дизайнера, и только потом переходим к коду!
            </p>
          </div>
        )}
      </div>

      {/* PART 1 — ANALYZE A REAL PRODUCT: TESLA MODEL X */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              PART 1 — Analyze a Real Product
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Разбор эталона: Tesla Model X (tesla.com)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Не копируем сайт 1:1 — изучаем 10 фундаментальных UX-паттернов и последовательный Product Storytelling.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            Выбрано UX-решений: {selectedUxDecisions.length} / 5
          </span>
        </div>

        {/* Sequential Product Storytelling Interactive Bar */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Последовательный Product Storytelling в Tesla Model X (кликни по этапу):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {teslaStorytellingFlow.map((item, idx) => (
              <button
                key={item.step}
                onClick={() => setActiveStorySection(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeStorySection === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-mono text-cyan-400 font-bold">Этап {item.step}</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">{item.name.split(' (')[0]}</div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-black text-cyan-300">
                {teslaStorytellingFlow[activeStorySection].name}
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <strong>Содержание секции:</strong> {teslaStorytellingFlow[activeStorySection].focus}
              </p>
              <p className="text-xs text-emerald-400">
                <strong>UX-приём:</strong> {teslaStorytellingFlow[activeStorySection].uxSecret}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 shrink-0">
              Interior → Exterior → Performance → Utility → Charging → Safety
            </div>
          </div>
        </div>

        {/* Student Task: Select 5 UX Decisions from 10 UX patterns */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-white">
              🎯 Student Task: Изучи 10 UX-паттернов Tesla Model X и отметь 5 решений, которые делают сайт премиальным:
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Кликни по карточкам для выбора 5 ключевых UX-решений</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teslaUxPatterns.map((pat) => {
              const isSelected = selectedUxDecisions.includes(pat.id);
              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => toggleUxDecision(pat.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400/70 text-white shadow-md shadow-cyan-950/30'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{pat.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pat.desc}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 font-black'
                        : 'bg-slate-900 text-slate-500 border-slate-700'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : '+'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 2 — GOOGLE STITCH: 6 STEPS */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-indigo-500/30 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              PART 2 — Google Stitch Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              6 шагов создания премиального UI в Google Stitch
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 text-xs font-mono">
            AI Design Canvas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {stitchSteps.map((st) => (
            <button
              key={st.num}
              onClick={() => setActiveStitchStep(st.num)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeStitchStep === st.num
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-mono font-bold text-indigo-400">STEP {st.num}</div>
              <div className="text-xs font-bold text-white mt-1 line-clamp-2">{st.subtitle}</div>
            </button>
          ))}
        </div>

        {(() => {
          const currentStep = stitchSteps.find((s) => s.num === activeStitchStep) || stitchSteps[0];
          return (
            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-black text-white">{currentStep.title}</h3>
                <span className="text-xs font-mono text-indigo-400">Шаг {currentStep.num} из 6</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentStep.detail}</p>
            </div>
          );
        })()}

        {/* Ready-to-copy prompts for Step 3 and Step 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                Step 3 · Prompt 1: Генерация макета в стиле tesla.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(stitchPrompt1);
                  setCopiedPrompt1(true);
                  setTimeout(() => setCopiedPrompt1(false), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedPrompt1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt1 ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-200 font-mono whitespace-pre-wrap leading-relaxed">
              {stitchPrompt1}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                Step 6 · Prompt 2: Улучшение визуальной иерархии (Refine)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(stitchPrompt2);
                  setCopiedPrompt2(true);
                  setTimeout(() => setCopiedPrompt2(false), 2000);
                }}
                className="px-2.5 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedPrompt2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt2 ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-200 font-mono whitespace-pre-wrap leading-relaxed">
              {stitchPrompt2}
            </pre>
          </div>
        </div>
      </div>

      {/* Cheat Sheet */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Шпаргалка Урока 5: Google Stitch & Tesla Model X UX
          </h3>
          <button
            onClick={() => {
              navigator.clipboard.writeText(cheatSheetText);
              setCopiedCheat(true);
              setTimeout(() => setCopiedCheat(false), 2000);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedCheat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCheat ? 'Шпаргалка скопирована!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
          {cheatSheetText}
        </pre>
      </div>
    </div>
  );
};
