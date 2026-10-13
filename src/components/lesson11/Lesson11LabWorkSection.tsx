import React, { useState } from 'react';
import {
  Sparkles,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Copy,
  Check,
  Wand2,
  Download,
  RefreshCw,
  Image,
  Sliders,
  Layers,
  ArrowRight,
  Zap,
  Shield
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface Lesson11LabWorkSectionProps {
  onLabSubmitted?: () => void;
}

export const Lesson11LabWorkSection: React.FC<Lesson11LabWorkSectionProps> = ({ onLabSubmitted }) => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: 5 UX Decisions of Tesla Model X
  const [uxDecisionsNotes, setUxDecisionsNotes] = useState<string[]>([
    '1. Fullscreen Hero с минималистичным заголовком и фокусом на автомобиле',
    '2. Крупные карточки характеристик (335 mi, 2.5s, 9.9s, 1,020 hp) в нижней части экрана',
    '3. Огромное количество Whitespace (воздуха) без визуального шума',
    '4. Последовательный Product Storytelling: Interior → Exterior → Performance → Utility → Charging → Safety',
    '5. Контрастная пара кнопок CTA: Order Now (Primary) + Demo Drive (Secondary)'
  ]);

  // Step 2: Google Stitch Interactive Studio (v1 Raw vs v2 Improved Hierarchy)
  const [stitchVersion, setStitchVersion] = useState<'v1' | 'v2'>('v2');
  const [heroImagePreset, setHeroImagePreset] = useState<'pearl_white' | 'ultra_red' | 'stealth_black'>('stealth_black');
  const [buttonStylePreset, setButtonStylePreset] = useState<'pill_glass' | 'sharp_minimal' | 'high_contrast'>('high_contrast');
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [projectSaved, setProjectSaved] = useState(false);
  const [exportedCode, setExportedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Step 3: 6-point Google Stitch Inspection Checklist
  const [inspectChecklist, setInspectChecklist] = useState({
    hierarchy: false,
    spacing: false,
    typography: false,
    buttons: false,
    cards: false,
    navigation: false
  });

  const toggleInspect = (key: keyof typeof inspectChecklist) => {
    const next = { ...inspectChecklist, [key]: !inspectChecklist[key] };
    const doneCount = Object.values(next).filter(Boolean).length;
    setInspectChecklist(next);
    if (doneCount === 6 && !inspectChecklist[key]) {
      addReward(25, 'Все 6 пунктов инспекции Google Stitch проверены!');
    }
  };

  const heroPresets = {
    stealth_black: {
      label: 'Obsidian Black Studio (Тёмный люкс)',
      bg: 'from-slate-950 via-zinc-900 to-slate-950',
      accent: 'text-cyan-400',
      badge: 'MODEL X PLAID · OBSIDIAN STUDIO',
      carVisual: '🦅 Силуэт Tesla Model X с открытыми дверями Falcon Wing в контровом студийном свете'
    },
    pearl_white: {
      label: 'Pearl White Glacier (Чистый минимализм)',
      bg: 'from-slate-900 via-slate-800 to-zinc-900',
      accent: 'text-emerald-400',
      badge: 'MODEL X · PEARL MULTI-COAT',
      carVisual: '🏔️ Жемчужно-белый Tesla Model X на фоне панорамного горного перевала'
    },
    ultra_red: {
      label: 'Ultra Red Track (Динамика 1,020 hp)',
      bg: 'from-rose-950/90 via-slate-950 to-zinc-950',
      accent: 'text-rose-400',
      badge: 'MODEL X PLAID · ULTRA RED TRACK',
      carVisual: '⚡ Ультра-красный Tesla Model X в движении на скоростном треке'
    }
  };

  const activeHero = heroPresets[heroImagePreset];

  const stitchExportedHtml = `<!-- Exported from Google Stitch AI Design Canvas (Tesla Model X Inspired UI) -->
<section class="min-h-screen bg-zinc-950 text-white flex flex-col justify-between px-8 py-10 font-sans">
  <header class="flex items-center justify-between">
    <span class="tracking-[0.35em] font-black text-lg">TESLA · STITCH UI</span>
    <nav class="hidden md:flex gap-8 text-sm text-zinc-300">
      <a href="#interior">Interior</a>
      <a href="#exterior">Exterior</a>
      <a href="#performance">Performance</a>
      <a href="#utility">Utility</a>
      <a href="#charging">Charging</a>
      <a href="#safety">Safety</a>
    </nav>
  </header>

  <main class="text-center my-auto space-y-3">
    <h1 class="text-5xl font-bold tracking-tight">Model X</h1>
    <p class="text-zinc-400 text-base">Plaid · Tri Motor All-Wheel Drive</p>
  </main>

  <footer class="max-w-4xl mx-auto w-full space-y-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div><div class="text-2xl font-bold">335 mi</div><div class="text-xs text-zinc-400">Range (EPA est.)</div></div>
      <div><div class="text-2xl font-bold">2.5 s</div><div class="text-xs text-zinc-400">0-60 mph*</div></div>
      <div><div class="text-2xl font-bold">9.9 s</div><div class="text-xs text-zinc-400">1/4 Mile</div></div>
      <div><div class="text-2xl font-bold">1,020 hp</div><div class="text-xs text-zinc-400">Peak Power</div></div>
    </div>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <button class="px-8 py-3 rounded-md bg-white text-black font-semibold text-sm">Order Now</button>
      <button class="px-8 py-3 rounded-md bg-zinc-800/80 text-white font-semibold text-sm border border-zinc-700">Demo Drive</button>
    </div>
  </footer>
</section>`;

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Wand2 className="w-3.5 h-3.5" /> Лабораторная работа #5 · Google Stitch & Tesla.com UI
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            LAB: Проектирование, улучшение и экспорт UI в Google Stitch по эталону Tesla Model X
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Задача: найти 5 премиальных UX-решений Tesla Model X, сгенерировать макет в Google Stitch, улучшить визуальную иерархию, заменить картинки/кнопки, сохранить проект и экспортировать!
          </p>
        </div>
      </div>

      {/* PART 1 TASK: 5 UX Decisions of Tesla Model X */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase">PART 1 · Student Task</span>
          <span className="text-xs text-slate-400">Анализ реального продукта: Tesla Model X</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          Запиши 5 UX-решений (5 UX decisions), которые делают сайт Tesla Model X премиальным:
        </h3>

        <div className="space-y-2.5">
          {uxDecisionsNotes.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const next = [...uxDecisionsNotes];
                  next[idx] = e.target.value;
                  setUxDecisionsNotes(next);
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* PART 2 LAB: Interactive Google Stitch Canvas Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-indigo-500/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
              PART 2 · Google Stitch Interactive Canvas
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Тренажёр Google Stitch: Генерация, замена картинок и кнопок, сохранение и экспорт
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStitchVersion('v1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                stitchVersion === 'v1'
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              Step 4: Первичная генерация (v1)
            </button>
            <button
              onClick={() => setStitchVersion('v2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                stitchVersion === 'v2'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              Step 6: Улучшенная иерархия (v2 Premium)
            </button>
            <button
              onClick={() => setDeviceViewport(deviceViewport === 'desktop' ? 'mobile' : 'desktop')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              {deviceViewport === 'desktop' ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span>{deviceViewport === 'desktop' ? 'Desktop View' : 'Mobile Behavior (375px)'}</span>
            </button>
          </div>
        </div>

        {/* Customization Controls: Generate new images or buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Image className="w-4 h-4" /> Сгенерировать / выбрать новую картинку Hero-сцены:
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(heroPresets) as Array<keyof typeof heroPresets>).map((k) => (
                <button
                  key={k}
                  onClick={() => setHeroImagePreset(k)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                    heroImagePreset === k
                      ? 'bg-cyan-500/20 border-cyan-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {heroPresets[k].label.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> Выбрать стиль кнопок CTA (Buttons):
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'high_contrast', label: 'High Contrast (Tesla White/Dark)' },
                { id: 'pill_glass', label: 'Glassmorphism Pill' },
                { id: 'sharp_minimal', label: 'Sharp Minimal Tech' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setButtonStylePreset(btn.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                    buttonStylePreset === btn.id
                      ? 'bg-purple-500/20 border-purple-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Tesla Model X Preview inside Stitch Canvas */}
        <div
          className={`mx-auto transition-all duration-300 rounded-2xl overflow-hidden border border-slate-700 bg-gradient-to-b ${activeHero.bg} shadow-2xl ${
            deviceViewport === 'mobile' ? 'max-w-[380px]' : 'w-full'
          }`}
        >
          {/* Top Navigation Bar */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="font-black tracking-[0.3em] text-sm text-white">TESLA · STITCH</div>
            {deviceViewport === 'desktop' ? (
              <div className="flex items-center gap-5 text-xs font-medium text-slate-300">
                <span>Interior</span>
                <span>Exterior</span>
                <span>Performance</span>
                <span>Utility</span>
                <span>Charging</span>
                <span>Safety</span>
              </div>
            ) : (
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white font-bold">Menu</span>
            )}
          </div>

          {/* Hero Content */}
          <div className={`px-6 ${stitchVersion === 'v2' ? 'py-12 space-y-8' : 'py-6 space-y-4'} text-center`}>
            <div className="space-y-2">
              <span className={`text-[11px] font-mono uppercase tracking-widest ${activeHero.accent}`}>
                {activeHero.badge}
              </span>
              <h4 className={`${stitchVersion === 'v2' ? 'text-4xl sm:text-5xl font-black tracking-tight' : 'text-2xl font-bold'} text-white`}>
                Model X
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {stitchVersion === 'v2'
                  ? 'Plaid · Sequential Product Storytelling & Minimalist Luxury'
                  : 'Electric SUV description text'}
              </p>
            </div>

            {/* Simulated High-Fidelity Visual Frame */}
            <div className="max-w-xl mx-auto p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
              <div className="text-sm font-bold text-white">{activeHero.carVisual}</div>
              <div className="text-[11px] text-slate-400 font-mono">
                [High-Fidelity Hero Asset · 16:9 Studio Lighting · Generous Whitespace]
              </div>
            </div>

            {/* Specification Cards */}
            <div
              className={`max-w-2xl mx-auto grid ${
                deviceViewport === 'mobile' ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'
              }`}
            >
              {[
                { val: '335 mi', lbl: 'Range (EPA est.)' },
                { val: '2.5 s', lbl: '0-60 mph*' },
                { val: '9.9 s', lbl: '1/4 Mile' },
                { val: '1,020 hp', lbl: 'Peak Power' }
              ].map((spec, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg sm:text-xl font-black text-white">{spec.val}</div>
                  <div className="text-[11px] text-slate-400">{spec.lbl}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex ${deviceViewport === 'mobile' ? 'flex-col' : 'flex-row'} justify-center gap-3 pt-2`}>
              <button
                type="button"
                className={`px-7 py-3 text-xs sm:text-sm font-bold transition-all ${
                  buttonStylePreset === 'pill_glass'
                    ? 'rounded-full bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                    : buttonStylePreset === 'sharp_minimal'
                    ? 'rounded-none bg-white text-slate-950 tracking-wider uppercase'
                    : 'rounded-lg bg-white text-slate-950 shadow-md'
                }`}
              >
                Order Now
              </button>
              <button
                type="button"
                className={`px-7 py-3 text-xs sm:text-sm font-bold transition-all ${
                  buttonStylePreset === 'pill_glass'
                    ? 'rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md'
                    : buttonStylePreset === 'sharp_minimal'
                    ? 'rounded-none bg-transparent text-white border border-white tracking-wider uppercase'
                    : 'rounded-lg bg-slate-800/90 text-white border border-slate-600'
                }`}
              >
                Demo Drive
              </button>
            </div>
          </div>
        </div>

        {/* Save & Export Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setProjectSaved(true);
                addReward(25, 'Проект в Google Stitch сохранён!');
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{projectSaved ? 'Проект сохранён ✓' : '1. Сохранить проект'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setExportedCode(true);
                navigator.clipboard.writeText(stitchExportedHtml);
                setCopiedPrompt(true);
                setTimeout(() => setCopiedPrompt(false), 2500);
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{copiedPrompt ? 'Код экспортирован в буфер ✓' : '2. Экспортировать UI / Код'}</span>
            </button>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Pipeline: Idea → UX → UI → Prototype → Code
          </span>
        </div>

        {exportedCode && (
          <pre className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 text-xs text-indigo-200 font-mono overflow-x-auto leading-relaxed">
            {stitchExportedHtml}
          </pre>
        )}
      </div>

      {/* Step 5 Inspection Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">
          🔍 Step 5 — Чек-лист инспекции макета в Google Stitch (отметь все 6 пунктов):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'hierarchy', label: '1. Hierarchy (Визуальная иерархия)' },
            { key: 'spacing', label: '2. Spacing (Чистые отступы и воздух)' },
            { key: 'typography', label: '3. Typography (Читаемость шрифтов и цифр)' },
            { key: 'buttons', label: '4. Buttons (Приоритет кнопок CTA)' },
            { key: 'cards', label: '5. Cards (Карточки характеристик)' },
            { key: 'navigation', label: '6. Navigation (Навигация по секциям)' }
          ].map((item) => {
            const done = inspectChecklist[item.key as keyof typeof inspectChecklist];
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleInspect(item.key as keyof typeof inspectChecklist)}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                  done
                    ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                {done && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Lab Submission */}
      <InlineLabSubmission
        labId={5}
        lessonId={5}
        onSubmitted={onLabSubmitted}
      />
    </div>
  );
};
