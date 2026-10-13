import React, { useState } from 'react';
import {
  Code2,
  FileCode,
  FileText,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Bug,
  Download,
  FolderOpen,
  Play,
  Monitor,
  Smartphone,
  Sparkles,
  Wrench,
  Layers,
  HardDrive,
  ExternalLink,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface Lesson7LabWorkSectionProps {
  onLabSubmitted?: () => void;
}

export const Lesson7LabWorkSection: React.FC<Lesson7LabWorkSectionProps> = ({ onLabSubmitted }) => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // STEP 4: Identify 3 files
  const [identifiedFiles, setIdentifiedFiles] = useState({
    html: true,
    css: true,
    js: true
  });
  const [activeCodeView, setActiveCodeView] = useState<'html' | 'css' | 'js'>('html');

  // LAB: 6 Tesla Sections & 8 Footer Links
  const [activePreviewSection, setActivePreviewSection] = useState<string>('Vehicles');
  const [checkedSections, setCheckedSections] = useState<Record<string, boolean>>({
    Vehicles: true,
    Energy: true,
    Charging: true,
    Semi: true,
    Discover: true,
    Shop: true
  });
  const [footerVerified, setFooterVerified] = useState<boolean>(true);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [orderClicked, setOrderClicked] = useState<boolean>(false);

  // DEBUG CHALLENGE: 4 Bugs state
  const [fixedBugs, setFixedBugs] = useState<Record<string, boolean>>({
    broken_button: false,
    wrong_css: false,
    missing_image: false,
    javascript_error: false
  });
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedDebugPrompt, setCopiedDebugPrompt] = useState<boolean>(false);

  // Local PC Export simulator
  const [zipExported, setZipExported] = useState<boolean>(false);
  const [localPcRunning, setLocalPcRunning] = useState<boolean>(false);

  const firstPrompt = `Create TESLA EV cars landing page based on the attached UX design. Use semantic HTML structure, modern CSS and JavaScript interactions. Do not use unnecessary libraries use strongly only with HTML, CSS and JS.`;
  const debugPrompt = `Find the bug. Explain what caused it. Fix only the necessary code.`;

  const teslaSections = [
    {
      name: 'Vehicles',
      headline: 'Model X Plaid',
      sub: 'Tri Motor All-Wheel Drive · Falcon Wing Doors',
      metrics: [
        { val: '335 mi', label: 'Range (EPA est.)' },
        { val: '2.5 s', label: '0-60 mph*' },
        { val: '9.9 s', label: '1/4 Mile' },
        { val: '1,020 hp', label: 'Peak Power' }
      ],
      visualLabel: '🦅 Полноэкранный рендер Tesla Model X (UX-макет из Google Stitch)'
    },
    {
      name: 'Energy',
      headline: 'Solar Roof & Powerwall',
      sub: 'Clean Energy Ecosystem for Your Home 24/7',
      metrics: [
        { val: '13.5 kWh', label: 'Powerwall Capacity' },
        { val: '25 yrs', label: 'Tile Warranty' },
        { val: '24/7', label: 'Outage Protection' },
        { val: '100%', label: 'Clean Solar' }
      ],
      visualLabel: '☀️ Панорама дома с солнечной крышей Tesla Solar Roof и накопителями Powerwall'
    },
    {
      name: 'Charging',
      headline: 'Supercharger Network',
      sub: 'Plug In, Charge and Go — 50,000+ Global Superchargers',
      metrics: [
        { val: '175 mi', label: 'In 15 Minutes' },
        { val: '250 kW', label: 'Peak Charging' },
        { val: '99.95%', label: 'Network Uptime' },
        { val: 'Auto', label: 'Trip Planner' }
      ],
      visualLabel: '⚡ Станция сверхбыстрой зарядки Tesla Supercharger V4'
    },
    {
      name: 'Semi',
      headline: 'Tesla Semi',
      sub: 'The Safest, Most Comfortable Electric Truck Ever',
      metrics: [
        { val: '500 mi', label: 'Full Load Range' },
        { val: '20 s', label: '0-60 mph Loaded' },
        { val: '3x', label: 'Power of Diesel' },
        { val: '< 2 kWh', label: 'Per Mile Energy' }
      ],
      visualLabel: '🚛 Электрический тягач Tesla Semi на скоростной магистрали'
    },
    {
      name: 'Discover',
      headline: 'Experience Tesla',
      sub: 'Demo Drive · Full Self-Driving · Safety Architecture',
      metrics: [
        { val: '5-Star', label: 'Safety Rating' },
        { val: '360°', label: 'Vision Cameras' },
        { val: 'OTA', label: 'Software Updates' },
        { val: '30 min', label: 'Demo Drive' }
      ],
      visualLabel: '🧭 Интерактивная запись на Demo Drive и рентген-схема безопасности'
    },
    {
      name: 'Shop',
      headline: 'Tesla Official Shop',
      sub: 'Wall Connectors, All-Weather Liners & Apparel',
      metrics: [
        { val: '44 mi/hr', label: 'Wall Connector' },
        { val: 'Custom', label: 'Model X Accessories' },
        { val: 'Fast', label: 'Home Delivery' },
        { val: 'OEM', label: 'Certified Parts' }
      ],
      visualLabel: '🛍️ Витрина аксессуаров Tesla Shop: Wall Connector и экипировка'
    }
  ];

  const footerItems = [
    'Tesla © 2026',
    'Privacy & Legal',
    'Vehicle Recalls',
    'Contact',
    'News',
    'Get Updates',
    'Locations',
    'Learn'
  ];

  const debugItems = [
    {
      id: 'broken_button',
      label: '1. broken button',
      title: 'Починить сломанную кнопку Order Now',
      cause: 'В HTML у кнопки стоял id="order-btn-broken", а в script.js вызывался getElementById("orderBtn").',
      fixSummary: 'Синхронизирован id="orderBtn" и подключён обработчик addEventListener("click", ...).'
    },
    {
      id: 'wrong_css',
      label: '2. wrong CSS',
      title: 'Исправить съехавшую сетку карточек и контраст (CSS)',
      cause: 'У контейнера .specs-bar стоял display: block и тёмный цвет шрифта на тёмном фоне.',
      fixSummary: 'Включён display: grid; grid-template-columns: repeat(4, 1fr); и белый цвет текста #ffffff.'
    },
    {
      id: 'missing_image',
      label: '3. missing image',
      title: 'Восстановить пропавшее изображение Tesla Model X',
      cause: 'Атрибут src указывал на несуществующий файл "car_missing.jpg" без alt.',
      fixSummary: 'Прописан корректный путь к рендеру Tesla Model X и добавлен атрибут alt.'
    },
    {
      id: 'javascript_error',
      label: '4. JavaScript error',
      title: 'Устранить ошибку TypeError в script.js',
      cause: 'Вызов addEventListener напрямую на коллекции querySelectorAll(".nav-link") без цикла forEach.',
      fixSummary: 'Добавлен перебор navLinks.forEach(link => link.addEventListener("click", ...)).'
    }
  ];

  const handleFixBug = (id: string) => {
    const next = { ...fixedBugs, [id]: !fixedBugs[id] };
    setFixedBugs(next);
    if (!fixedBugs[id]) {
      addReward(25, `🛠️ DEBUG CHALLENGE: Баг «${id}» исправлен точечным промптом! (+25 XP)`);
    }
  };

  const handleFixAllBugs = () => {
    setFixedBugs({
      broken_button: true,
      wrong_css: true,
      missing_image: true,
      javascript_error: true
    });
    addReward(50, '🏆 Все 4 бага DEBUG CHALLENGE устранены! Сайт работает безупречно!');
  };

  const handleExportAndRunLocal = () => {
    setZipExported(true);
    setLocalPcRunning(true);
    addReward(50, '💻 Исходный код экспортирован в ZIP и успешно запущен на локальном ПК!');
  };

  const allBugsFixedCount = Object.values(fixedBugs).filter(Boolean).length;
  const currentSectionObj =
    teslaSections.find((s) => s.name === activePreviewSection) || teslaSections[0];

  return (
    <div className="space-y-8 text-slate-200">
      {/* LAB HEADER */}
      <div className="p-6 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-bold uppercase">
            <Code2 className="w-3.5 h-3.5" /> Лабораторная работа #7 · Website Control Center (HTML + CSS + JS)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            LAB: Создаём https://www.tesla.com/modelx в Google AI Studio + DEBUG CHALLENGE + Запуск на ПК
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            Превращаем дизайн из Google Stitch (Урок 5) и три отдела сайта (Урок 6) в рабочий проект: находим <code className="text-cyan-300">index.html</code>, <code className="text-cyan-300">style.css</code>, <code className="text-cyan-300">script.js</code>, собираем 6 секций и футер Tesla © 2026, чиним 4 бага и запускаем код на локальном компьютере.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-cyan-500 text-slate-950 tracking-wider shadow-lg">
            до +150 XP
          </span>
          <span className="text-[11px] text-slate-400">Практикум Vibe Coding</span>
        </div>
      </div>

      {/* TASK 1: GOOGLE AI STUDIO PROMPT & STEP 4 IDENTIFY FILES */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
              ЗАДАНИЕ 1 · STEP 1–4 В GOOGLE AI STUDIO (BUILD MODE)
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Отправь First Prompt и отметь найденные в проекте 3 файла
            </h3>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(firstPrompt);
              setCopiedPrompt(true);
              addReward(15, 'Скопирован First Prompt для лабораторной работы!');
              setTimeout(() => setCopiedPrompt(false), 2000);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:bg-cyan-400 cursor-pointer"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? 'Промпт скопирован!' : 'Скопировать First Prompt'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-200">
          {firstPrompt}
        </div>

        {/* Identify 3 files checkboxes + Code Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              key: 'html' as const,
              file: 'index.html',
              role: 'HTML = structure',
              desc: 'Семантическая разметка 6 секций и футера'
            },
            {
              key: 'css' as const,
              file: 'style.css',
              role: 'CSS = appearance',
              desc: 'Премиальный стиль Tesla, сетка и отступы'
            },
            {
              key: 'js' as const,
              file: 'script.js',
              role: 'JavaScript = behavior',
              desc: 'Переключение вкладок и реакция кнопок'
            }
          ].map((item) => (
            <div
              key={item.key}
              className={`p-4 rounded-2xl border transition ${
                identifiedFiles[item.key]
                  ? 'bg-slate-950 border-cyan-500/50'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={identifiedFiles[item.key]}
                    onChange={() =>
                      setIdentifiedFiles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className="rounded accent-cyan-400"
                  />
                  <span className="font-mono font-bold text-sm text-white">{item.file}</span>
                </label>
                <button
                  onClick={() => setActiveCodeView(item.key)}
                  className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Открыть код
                </button>
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-1">{item.role}</div>
              <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TASK 2: INTERACTIVE TESLA.COM/MODELX SIMULATOR (6 SECTIONS + FOOTER) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
              ЗАДАНИЕ 2 · СТРУКТУРА САЙТА HTTPS://WWW.TESLA.COM/MODELX
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Интерактивный стенд: 6 секций (Vehicles, Energy, Charging, Semi, Discover, Shop) + Footer 2026
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewportMode(viewportMode === 'desktop' ? 'mobile' : 'desktop')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {viewportMode === 'desktop' ? (
                <Monitor className="w-3.5 h-3.5" />
              ) : (
                <Smartphone className="w-3.5 h-3.5" />
              )}
              <span>{viewportMode === 'desktop' ? 'Desktop (1440px)' : 'Mobile (375px)'}</span>
            </button>
          </div>
        </div>

        {/* Checklist of 6 Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {teslaSections.map((sec, idx) => (
            <label
              key={sec.name}
              className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 cursor-pointer transition ${
                checkedSections[sec.name]
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checkedSections[sec.name]}
                onChange={() => {
                  setCheckedSections((prev) => ({ ...prev, [sec.name]: !prev[sec.name] }));
                  setActivePreviewSection(sec.name);
                }}
                className="rounded accent-emerald-400"
              />
              <span className="font-mono font-bold">
                {idx + 1}. {sec.name}
              </span>
            </label>
          ))}
        </div>

        {/* Live Browser Preview of Tesla Model X Landing Page */}
        <div
          className={`mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-zinc-950 text-white shadow-2xl transition-all ${
            viewportMode === 'mobile' ? 'max-w-[390px]' : 'w-full'
          }`}
        >
          {/* Browser Top Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-cyan-300">https://www.tesla.com/modelx#{activePreviewSection.toLowerCase()}</span>
            <span>index.html + style.css + script.js</span>
          </div>

          {/* Site Header with 6 required sections */}
          <div className="px-6 py-4 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 bg-zinc-950/90">
            <span className="tracking-[0.35em] font-black text-sm sm:text-base text-white">
              TESLA
            </span>
            <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
              {teslaSections.map((sec) => (
                <button
                  key={sec.name}
                  onClick={() => setActivePreviewSection(sec.name)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                    activePreviewSection === sec.name
                      ? 'bg-white text-zinc-950 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {sec.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Hero / Section Content */}
          <div className="p-6 sm:p-10 text-center space-y-6 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-zinc-950">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                SECTION: {activePreviewSection.toUpperCase()}
              </span>
              <h4 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {currentSectionObj.headline}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">{currentSectionObj.sub}</p>
            </div>

            {/* Visual Stage */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-zinc-200 font-medium">
              {fixedBugs.missing_image ? (
                <div className="space-y-1">
                  <div className="text-emerald-400 font-mono text-xs">
                    ✓ [IMAGE LOADED: alt="Tesla {currentSectionObj.headline}"]
                  </div>
                  <div>{currentSectionObj.visualLabel}</div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div>{currentSectionObj.visualLabel}</div>
                </div>
              )}
            </div>

            {/* 4 Specification Cards */}
            <div
              className={`grid gap-4 ${
                viewportMode === 'mobile' ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {currentSectionObj.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 text-center"
                >
                  <div className="text-lg sm:text-2xl font-black text-white">{m.val}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setOrderClicked(!orderClicked)}
                className="w-full sm:w-auto px-8 py-2.5 rounded-md bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-200 transition cursor-pointer"
              >
                {orderClicked ? '✓ Order Configured in JS!' : 'Order Now'}
              </button>
              <button
                onClick={() => setActivePreviewSection('Discover')}
                className="w-full sm:w-auto px-8 py-2.5 rounded-md bg-zinc-800 text-white font-semibold text-xs sm:text-sm border border-zinc-700 hover:bg-zinc-700 transition cursor-pointer"
              >
                Demo Drive
              </button>
            </div>
          </div>

          {/* Required 8-item Footer */}
          <footer className="px-6 py-4 bg-zinc-950 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-zinc-400">
            {footerItems.map((linkItem) => (
              <span key={linkItem} className="hover:text-white cursor-pointer transition">
                {linkItem}
              </span>
            ))}
          </footer>
        </div>
      </div>

      {/* TASK 3: DEBUG CHALLENGE INTERACTIVE WORKBENCH */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-rose-500/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-1.5">
              <Bug className="w-4 h-4" /> ЗАДАНИЕ 3 · DEBUG CHALLENGE (4 БАГА ОТ УЧИТЕЛЯ)
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Отправь ИИ промпт отладки и исправь все 4 ошибки ({allBugsFixedCount}/4)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(debugPrompt);
                setCopiedDebugPrompt(true);
                setTimeout(() => setCopiedDebugPrompt(false), 2000);
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {copiedDebugPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDebugPrompt ? 'Скопировано!' : 'Копировать промпт отладки'}</span>
            </button>
            <button
              onClick={handleFixAllBugs}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold cursor-pointer hover:bg-emerald-400"
            >
              Исправить все 4 бага
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 font-mono text-xs text-rose-200">
          Prompt: "{debugPrompt}"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {debugItems.map((bug) => {
            const isFixed = fixedBugs[bug.id];
            return (
              <div
                key={bug.id}
                className={`p-4 rounded-2xl border space-y-2.5 transition ${
                  isFixed
                    ? 'bg-emerald-950/20 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                    {bug.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isFixed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-950 text-rose-300'
                    }`}
                  >
                    {isFixed ? '✓ FIXED' : 'BUG ACTIVE'}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{bug.title}</div>
                <p className="text-xs text-slate-400">
                  <strong>Причина (Explain what caused it):</strong> {bug.cause}
                </p>
                {isFixed && (
                  <p className="text-xs text-emerald-300">
                    <strong>Исправление (Fix only the necessary code):</strong> {bug.fixSummary}
                  </p>
                )}
                <button
                  onClick={() => handleFixBug(bug.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isFixed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500 hover:bg-rose-400 text-white'
                  }`}
                >
                  {isFixed ? '✓ Баг исправлен' : 'Применить Debug-промпт и починить'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* TASK 4: EXPORT SOURCE CODE & RUN ON LOCAL PC */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" /> ЗАДАНИЕ 4 · ЭКСПОРТ И ЗАПУСК НА ЛОКАЛЬНОМ ПК (IT WILL WORK!)
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Скачай исходный код (index.html, style.css, script.js) и запусти сайт на своём компьютере
            </h3>
          </div>

          <button
            onClick={handleExportAndRunLocal}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-2 hover:bg-emerald-400 cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>{localPcRunning ? '✓ Запущено на локальном ПК' : 'Экспортировать ZIP и проверить запуск на ПК'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-300">1. Export Source Code</div>
            <p className="text-slate-400">
              В Google AI Studio нажимаем Download ZIP и распаковываем папку <code className="text-white">tesla-modelx-site</code> на рабочий стол.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-300">2. Verify 3 Files</div>
            <p className="text-slate-400">
              Проверяем, что <code className="text-white">index.html</code>, <code className="text-white">style.css</code> и <code className="text-white">script.js</code> лежат в одной папке.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-300">3. Run on Local PC</div>
            <p className="text-slate-400">
              Открываем <code className="text-white">index.html</code> двойным кликом в браузере или через VS Code Live Server — сайт работает без интернета и серверов!
            </p>
          </div>
        </div>
      </div>

      {/* INLINE LAB SUBMISSION */}
      <InlineLabSubmission
        labId={7}
        lessonId={7}
        rewardXp={100}
        onSubmitted={onLabSubmitted}
      />
    </div>
  );
};
