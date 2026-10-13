import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Mic,
  Timer,
  Play,
  RotateCcw,
  Sliders,
  Send,
  Zap,
  MousePointer,
  HeartHandshake
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson13LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: 3 Target locations
  const [spot1, setSpot1] = useState('Главная кнопка «Начать проект»');
  const [spot2, setSpot2] = useState('Карточки статистики на Dashboard');
  const [spot3, setSpot3] = useState('Блок отзывов при прокрутке страницы');

  // Step 2: Prompt builder state
  const [selectedElement, setSelectedElement] = useState('главная кнопка призыва к действию (CTA button)');
  const [selectedEffect, setSelectedEffect] = useState('hover: плавное увеличение на 5%, мягкая неоновая тень cyan-400');
  const [selectedSpeed, setSelectedSpeed] = useState('transition duration 0.3s ease-out');
  const [selectedTrigger, setSelectedTrigger] = useState('при наведении курсора мыши и активном нажатии');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Generated prompt
  const generatedPrompt = `Напиши CSS для моего веб-сайта: добавь анимацию для элемента [${selectedElement}].
Эффект: [${selectedEffect}].
Скорость и плавность: [${selectedSpeed}].
Условие срабатывания: [${selectedTrigger}].
Обязательно добавь медиа-запрос @media (prefers-reduced-motion: reduce), чтобы отключать резкое движение для пользователей с чувствительностью к анимации.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Step 3-5: Completed checklist tracking
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    effect1: false,
    effect2: false,
    effect3: false,
    mobileCheck: false,
    reducedMotion: false,
  });

  const toggleStep = (stepKey: string, expReward: number) => {
    if (!completedSteps[stepKey]) {
      setCompletedSteps(prev => ({ ...prev, [stepKey]: true }));
      addReward(expReward, `lab13_${stepKey}`);
    }
  };

  // Level 6: 20-sec Showcase Pitch
  const [pitchTimer, setPitchTimer] = useState<number>(20);
  const [isPitchRunning, setIsPitchRunning] = useState<boolean>(false);
  const [pitchFinished, setPitchFinished] = useState<boolean>(false);

  const startPitch = () => {
    setIsPitchRunning(true);
    setPitchTimer(20);
    setPitchFinished(false);

    const interval = setInterval(() => {
      setPitchTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPitchRunning(false);
          setPitchFinished(true);
          addReward(25, 'lab13_pitch_completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Voting for most elegant animation
  const [votedAward, setVotedAward] = useState(false);

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10 text-slate-100 text-base leading-relaxed">
      {/* Quick Jump Bar */}
      <div className="sticky top-2 z-30 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            Навигация по лабораторной:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => scrollToStep('lab-step1')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Шаг 1: 3 Точки
          </button>
          <button
            onClick={() => scrollToStep('lab-step2')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Шаг 2: Конструктор
          </button>
          <button
            onClick={() => scrollToStep('lab-step3')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Шаги 3–5: Чек-лист
          </button>
          <button
            onClick={() => scrollToStep('lab-step6')}
            className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-cyan-300 border border-cyan-700 transition-all cursor-pointer"
          >
            Шаг 6: 20с Питч
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" /> УРОК 9 • ЛАБОРАТОРНАЯ РАБОТА (НОВЫЙ ПРАКТИЧЕСКИЙ КЕЙС)
          </span>
          <span className="px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-sm shadow-md shadow-cyan-950/40">
            до +150 ОП в копилку
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Кибер-карточка персонажа: Slide-Up Reveal + Pulse Glow + Reduced Motion
        </h2>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
          <strong>Никакого повторения примеров из лекции!</strong> На лекции Ментор объяснял базовые кнопки Scale и Fade. В Лабораторной работе твоя задача — собрать в AI Studio <strong>интерактивную карточку игрового персонажа (Cyberpunk Hero Card)</strong> с выезжающей снизу панелью характеристик (Slide-Up Reveal), неоновым пульсом и защитой для чувствительных глаз (<code>prefers-reduced-motion</code>).
        </p>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">1. На Лекции (Показал Ментор)</span>
            <div className="text-sm font-black text-white">Теория 4 столпов: Scale + Fade</div>
            <p className="text-xs text-slate-400">Разбор базовой формулы микро-анимации (0.2s–0.4s) на простых кнопках.</p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-950/30 border-2 border-cyan-500/50 space-y-1">
            <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-cyan-200">Кибер-карточка Героя (Slide-Up + Glow)</div>
            <p className="text-xs text-slate-200">Выезд характеристик снизу при наведении, вращение бейджа ранга и фильтр доступности.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-950/25 border border-purple-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-purple-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-purple-200">Витрина из 3 Тарифов с 3D-наклоном</div>
            <p className="text-xs text-slate-300">Самостоятельный вайб-кодинг секции тарифов (Starter / Pro / Ultra) с магнитной кнопкой.</p>
          </div>
        </div>
      </div>

      {/* Step 1: Choose 3 target locations */}
      <div id="lab-step1" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center font-mono text-lg border border-cyan-500/40">
            1
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Шаг 1 — Выбери 3 места для анимации на своём сайте
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Помни правило дня: не анимируй всё подряд, выбирай только ключевые точки контакта
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Место 1 (Эффект: HOVER)</span>
            <input
              type="text"
              value={spot1}
              onChange={(e) => setSpot1(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-cyan-400 focus:outline-none transition-all shadow-inner"
              placeholder="Например: Кнопка действия"
            />
            <p className="text-xs sm:text-sm text-slate-400">Реакция на наведение курсора мыши</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">Место 2 (Эффект: FADE / SLIDE)</span>
            <input
              type="text"
              value={spot2}
              onChange={(e) => setSpot2(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-purple-400 focus:outline-none transition-all shadow-inner"
              placeholder="Например: Карточка профиля"
            />
            <p className="text-xs sm:text-sm text-slate-400">Плавное проявление или въезд элемента</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Место 3 (Эффект: REVEAL)</span>
            <input
              type="text"
              value={spot3}
              onChange={(e) => setSpot3(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-sm sm:text-base focus:border-amber-400 focus:outline-none transition-all shadow-inner"
              placeholder="Например: Блок со списком навыков"
            />
            <p className="text-xs sm:text-sm text-slate-400">Появление блока при прокрутке страницы</p>
          </div>
        </div>
      </div>

      {/* Step 2: Prompt Builder by canonical formula */}
      <div id="lab-step2" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center font-mono text-lg border border-cyan-500/40">
            2
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Шаг 2 — Собери запрос для ИИ по канонической формуле
            </h3>
            <p className="text-sm sm:text-base text-cyan-300 font-mono">
              ФОРМУЛА = ЭЛЕМЕНТ + ВИД ЭФФЕКТА + СКОРОСТЬ + УСЛОВИЕ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-300">1. Элемент сайта</label>
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              <option value="главная кнопка призыва к действию (CTA button)">Кнопка действия (CTA)</option>
              <option value="карточка портфолио проекта">Карточка портфолио</option>
              <option value="навигационные ссылки в шапке сайта">Ссылки в меню</option>
              <option value="заголовок раздела H2">Заголовок раздела</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-300">2. Вид эффекта</label>
            <select
              value={selectedEffect}
              onChange={(e) => setSelectedEffect(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              <option value="hover: плавное увеличение scale(1.05) и мягкая тень box-shadow">Hover: увеличение + тень</option>
              <option value="fade: плавное проявление opacity от 0 до 1">Fade: проявление из 0 в 1</option>
              <option value="slide: въезд снизу translateY(20px) в 0">Slide: въезд снизу вверх</option>
              <option value="reveal: одновременный fade + slide при скролле">Reveal: fade + подъем при скролле</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-300">3. Скорость перехода</label>
            <select
              value={selectedSpeed}
              onChange={(e) => setSelectedSpeed(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              <option value="transition duration 0.2s ease-out">0.2s (Быстро / Чётко)</option>
              <option value="transition duration 0.3s ease-out">0.3s (Золотой стандарт)</option>
              <option value="transition duration 0.5s ease-in-out">0.5s (Плавный взлёт)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-300">4. Условие</label>
            <select
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              <option value="при наведении курсора (:hover) и фокусе (:focus-visible)">Наведение мышки (:hover)</option>
              <option value="при загрузке страницы (initial load)">Загрузка страницы</option>
              <option value="при прокрутке экрана до блока (scroll into view)">Прокрутка до блока</option>
            </select>
          </div>
        </div>

        {/* Ready Prompt Output */}
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider">Готовый запрос для Google AI Studio:</span>
            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-700 hover:bg-cyan-900 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-cyan-950/40 w-fit"
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? 'Скопировано!' : 'Копировать запрос'}</span>
            </button>
          </div>
          <pre className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm sm:text-base font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
            {generatedPrompt}
          </pre>
        </div>
      </div>

      {/* Step 3, 4, 5: Checklist of Implementation */}
      <div id="lab-step3" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center font-mono text-lg border border-cyan-500/40">
            3-5
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Шаги 3–5 — Чек-лист добавления эффектов и комфорта
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Отмечай выполненные пункты по мере добавления кода в проект
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Effect 1 */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            completedSteps.effect1
              ? 'bg-emerald-950/40 border-emerald-700/60 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">ШАГ 3.1 • ЭФФЕКТ №1</span>
              <p className="text-base sm:text-lg font-bold text-white">
                Добавлен Hover-эффект на кнопку ({spot1})
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">Кнопка мягко увеличивается и отбрасывает аккуратную тень при наведении.</p>
            </div>
            <button
              onClick={() => toggleStep('effect1', 25)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 w-fit cursor-pointer ${
                completedSteps.effect1
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {completedSteps.effect1 ? '✓ Готово (+25 ОП)' : 'Отметить готовым (+25 ОП)'}
            </button>
          </div>

          {/* Effect 2 */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            completedSteps.effect2
              ? 'bg-emerald-950/40 border-emerald-700/60 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">ШАГ 3.2 • ЭФФЕКТ №2</span>
              <p className="text-base sm:text-lg font-bold text-white">
                Добавлен Fade или Slide-эффект ({spot2})
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">Карточка или элемент плавно проявляется без резких вспышек.</p>
            </div>
            <button
              onClick={() => toggleStep('effect2', 25)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 w-fit cursor-pointer ${
                completedSteps.effect2
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {completedSteps.effect2 ? '✓ Готово (+25 ОП)' : 'Отметить готовым (+25 ОП)'}
            </button>
          </div>

          {/* Effect 3 */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            completedSteps.effect3
              ? 'bg-emerald-950/40 border-emerald-700/60 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">ШАГ 3.3 • ЭФФЕКТ №3</span>
              <p className="text-base sm:text-lg font-bold text-white">
                Добавлен Reveal-эффект при прокрутке ({spot3})
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">Элемент мягко разворачивается, когда пользователь доскроллил до него.</p>
            </div>
            <button
              onClick={() => toggleStep('effect3', 25)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 w-fit cursor-pointer ${
                completedSteps.effect3
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {completedSteps.effect3 ? '✓ Готово (+25 ОП)' : 'Отметить готовым (+25 ОП)'}
            </button>
          </div>

          {/* Step 4: Mobile check */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            completedSteps.mobileCheck
              ? 'bg-emerald-950/40 border-emerald-700/60 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">ШАГ 4 • МОБИЛЬНАЯ ПРОВЕРКА</span>
              <p className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                Проверено на смартфоне (Touch-тест)
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">Убедились, что без мышки кнопки тоже нажимаются понятно и приятно.</p>
            </div>
            <button
              onClick={() => toggleStep('mobileCheck', 25)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 w-fit cursor-pointer ${
                completedSteps.mobileCheck
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {completedSteps.mobileCheck ? '✓ Готово (+25 ОП)' : 'Отметить готовым (+25 ОП)'}
            </button>
          </div>

          {/* Step 5: Reduced motion */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            completedSteps.reducedMotion
              ? 'bg-emerald-950/40 border-emerald-700/60 shadow-lg shadow-emerald-950/20'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">ШАГ 5 • ДОСТУПНОСТЬ</span>
              <p className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                Поддержка prefers-reduced-motion включена
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">Добавлено правило заботы: резкая анимация отключается для тех, кому некомфортно.</p>
            </div>
            <button
              onClick={() => toggleStep('reducedMotion', 25)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 w-fit cursor-pointer ${
                completedSteps.reducedMotion
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {completedSteps.reducedMotion ? '✓ Готово (+25 ОП)' : 'Отметить готовым (+25 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* Level 6: 20-second Showcase pitch */}
      <div id="lab-step6" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">УРОВЕНЬ 6 • ПОКАЗ ЭФФЕКТОВ</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              20-Секундный Питч: Презентация живого сайта
            </h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300 font-bold text-sm shadow-md">
            +25 ОП за защиту
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-purple-400" /> Твоя структура речи (20 секунд):
            </h4>
            <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                1️⃣ <strong>Мои 3 эффекта:</strong> {spot1}, {spot2} и {spot3}.
              </p>
              <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                2️⃣ <strong>Самый удачный:</strong> тот, который делает сайт живым без раздражения.
              </p>
              <p className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                3️⃣ <strong>Что я убрал(а):</strong> убрал(а) лишнее мигание, чтобы не перегружать глаза.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-5 text-center">
            <div className="w-28 h-28 rounded-full bg-purple-950/80 border-2 border-purple-500/50 flex flex-col items-center justify-center shadow-xl shadow-purple-500/20">
              <span className="font-mono text-4xl font-black text-white">{pitchTimer}</span>
              <span className="text-xs font-mono text-purple-300 uppercase">секунд</span>
            </div>

            <button
              onClick={startPitch}
              disabled={isPitchRunning}
              className={`px-7 py-3.5 rounded-2xl text-sm sm:text-base font-black flex items-center gap-2 transition-all cursor-pointer ${
                isPitchRunning
                  ? 'bg-purple-950 text-purple-300 border border-purple-800 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/40'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isPitchRunning ? 'Идёт отсчёт речи...' : pitchFinished ? 'Повторить 20с таймер' : 'Запустить 20с таймер'}</span>
            </button>

            {pitchFinished && (
              <p className="text-sm text-emerald-400 font-bold animate-bounce">
                🎉 Отличный питч! Награда +25 ОП начислена.
              </p>
            )}
          </div>
        </div>

        {/* Voting simulated module */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">Номинация «Самая элегантная анимация»</h4>
            <p className="text-sm text-slate-300 leading-relaxed">Голосуем вместе с классом за сайт с самым гармоничным и быстрым откликом.</p>
          </div>
          <button
            onClick={() => {
              setVotedAward(true);
              addReward(15, 'lab13_voted_award');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              votedAward
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {votedAward ? 'Голос отдан! 🏆 (+15 ОП)' : 'Проголосовать за лучший эффект'}
          </button>
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={9}
        labId={9}
        labTitle="Лабораторная работа #9: Кибер-карточка персонажа (Slide-Up Reveal + Pulse Glow + Reduced Motion)"
        rewardExp={100}
      />
    </div>
  );
};
