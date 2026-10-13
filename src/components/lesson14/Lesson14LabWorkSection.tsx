import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers,
  Award,
  Zap,
  Eye,
  EyeOff,
  Stethoscope,
  Volume2,
  Mic,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Smartphone
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson14LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Task 1: 4 Scenes story arc (Deep Ocean / Space Expedition — distinct from Lecture's Khujand-2050!)
  const [scene1, setScene1] = useState('Поверхность океана (0 метров): Батискаф «Мариана-X» начинает погружение в вечную темноту.');
  const [scene2, setScene2] = useState('Сумеречная зона (1000 метров): Стайки биолюминесцентных медуз освещают иллюминатор неоновым сиянием.');
  const [scene3, setScene3] = useState('Бездна Челленджера (6000 метров): Давление критическое! Радар фиксирует древний подводный артефакт.');
  const [scene4, setScene4] = useState('Дно впадины (11 000 метров): Источник чистой геотермальной энергии открыт! Кнопка: «Скачать отчёт экспедиции».');
  const [task1Done, setTask1Done] = useState(false);

  const fillTemplate = () => {
    setScene1('Поверхность океана (0 метров): Батискаф «Мариана-X» начинает погружение в вечную темноту.');
    setScene2('Сумеречная зона (1000 метров): Стайки биолюминесцентных медуз освещают иллюминатор неоновым сиянием.');
    setScene3('Бездна Челленджера (6000 метров): Давление критическое! Радар фиксирует древний подводный артефакт.');
    setScene4('Дно впадины (11 000 метров): Источник чистой геотермальной энергии открыт! Кнопка: «Скачать отчёт экспедиции».');
  };

  const handleCompleteTask1 = () => {
    if (!task1Done) {
      setTask1Done(true);
      addReward(50, '🎬 Задание 1 выполнено: Сюжетная дуга из 4 сцен готова! (+50 ОП)');
    }
  };

  // Task 2: AI Code Generation & Preview
  const [promptCopied, setPromptCopied] = useState(false);
  const [task2Done, setTask2Done] = useState(false);
  const handleCopyPrompt = () => {
    const fullPrompt = `Создай адаптивную scrollytelling страницу из 4 сцен:
1. Завязка: ${scene1} (эффект fade-in по центру)
2. Действие: ${scene2} (эффект slide-in слева с картинкой города)
3. Поворот: ${scene3} (reveal-эффект с акцентом на герое)
4. Финал: ${scene4} (яркий финальный баннер с кнопкой действия)
Требования:
- Фиксированный верхний индикатор прогресса (Scroll Progress Bar) с градиентом
- Плавная смена сцен при скролле (Intersection Observer или CSS scroll-snap)
- Поддержка @media (prefers-reduced-motion: reduce) для доступности
- Текст должен оставаться полностью читаемым, даже если анимации отключены.`;
    navigator.clipboard.writeText(fullPrompt);
    setPromptCopied(true);
    if (!task2Done) {
      setTask2Done(true);
      addReward(50, '🤖 Задание 2 выполнено: Промпт собран и скопирован для AI Studio! (+50 ОП)');
    }
    setTimeout(() => setPromptCopied(false), 2500);
  };

  // Interactive Live Sandbox for Scrollytelling
  const [previewScroll, setPreviewScroll] = useState(25);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [textOnlyMode, setTextOnlyMode] = useState(false); // Test "Only Text"

  // Task 3: Progress Bar & Text-only test
  const [task3Done, setTask3Done] = useState(false);
  const handleCompleteTask3 = () => {
    if (!task3Done) {
      setTask3Done(true);
      addReward(50, '📊 Задание 3 выполнено: Индикатор прогресса внедрён и тест «Только текст» пройден! (+50 ОП)');
    }
  };

  // Level 5: Doctor Tempo (3 Clinical Cases)
  const [solvedCases, setSolvedCases] = useState<Record<number, boolean>>({});
  const solveCase = (caseId: number) => {
    if (!solvedCases[caseId]) {
      setSolvedCases(prev => ({ ...prev, [caseId]: true }));
      addReward(25, `🩺 Пациент #${caseId} спасён Доктором Темпа! (+25 ОП)`);
    }
  };

  // Level 5: 3/3 Checklist
  const [checked3, setChecked3] = useState({
    scenes: false,
    progressBar: false,
    textOnly: false
  });
  const [challengeClaimed, setChallengeClaimed] = useState(false);

  const toggleCheck = (key: 'scenes' | 'progressBar' | 'textOnly') => {
    setChecked3(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClaimChallenge = () => {
    if (checked3.scenes && checked3.progressBar && checked3.textOnly && !challengeClaimed) {
      setChallengeClaimed(true);
      addReward(50, '⚡ Испытание 3/3 пройдено: Твоя scroll-история безупречна! (+50 ОП)');
    }
  };

  // Level 6: 20-second Pitch
  const [pitchStoryTitle, setPitchStoryTitle] = useState('Худжанд-2050: Тайна Сырдарьинского Ядра');
  const [pitchTwist, setPitchTwist] = useState('Когда погас свет во всем мегаполисе, герой нашел скрытый алгоритм предков');
  const [pitchWhyScroll, setPitchWhyScroll] = useState('Прокрутка создает ощущение падения вглубь секретной лаборатории');
  const [pitchTimer, setPitchTimer] = useState(20);
  const [isPitching, setIsPitching] = useState(false);
  const [pitchDone, setPitchDone] = useState(false);

  React.useEffect(() => {
    let t: any = null;
    if (isPitching && pitchTimer > 0) {
      t = setInterval(() => setPitchTimer(prev => prev - 1), 1000);
    } else if (pitchTimer === 0 && isPitching) {
      setIsPitching(false);
      if (!pitchDone) {
        setPitchDone(true);
        addReward(25, '🎤 Питч успешно завершен! Премьера состоялась на высшем уровне! (+25 ОП)');
      }
    }
    return () => clearInterval(t);
  }, [isPitching, pitchTimer, pitchDone]);

  const startPitch = () => {
    setPitchTimer(20);
    setIsPitching(true);
  };

  return (
    <div className="space-y-12 text-slate-100 w-full pb-16">
      {/* Level 4 Header */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Code className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                УРОК 10 • ЛАБОРАТОРНАЯ РАБОТА (НОВЫЙ КЕЙС: ГЛУБОКОВОДНАЯ ЭКСПЕДИЦИЯ)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                💻 ЛАБОРАТОРИЯ: Scrollytelling «Погружение на 11 000 метров»
              </h2>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
            Награда: до +150 ОП
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          <strong>Внимание! В Лабораторной — совершенно новая задача:</strong> На лекции Ментор показывал демо <em>«Худжанд-2050»</em>. Сейчас на практике ты построишь <strong>интерактивный скролл-репортаж «Погружение батискафа на дно Марианской впадины (0 м → 11 000 м)»</strong> с датчиком глубины (Scroll Progress Bar) и сменой 4 подводных зон!
        </p>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">1. На Лекции (Демо Ментора)</span>
            <div className="text-sm font-black text-white">Город будущего «Худжанд-2050»</div>
            <p className="text-xs text-slate-400">Ментор объяснил структуру 4 сцен (Завязка → Действие → Поворот → Финал).</p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-950/30 border-2 border-cyan-500/50 space-y-1">
            <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-cyan-200">Экспедиция на 11 000 м (Глубиномер)</div>
            <p className="text-xs text-slate-200">Скролл вниз = погружение батискафа в океан с индикатором глубины и биолюминесценцией.</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-950/25 border border-purple-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-purple-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-purple-200">Интерактивная Машина Времени (5 Эпох)</div>
            <p className="text-xs text-slate-300">Самостоятельный вайб-кодинг вертикального таймлайна эволюции технологии с Parallax-фонами.</p>
          </div>
        </div>
      </div>

      {/* Task 1: 4 Scenes */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono font-bold flex items-center justify-center text-sm">
              1
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Шаг 1: Написать сюжетную дугу из 4 сцен
            </h3>
          </div>
          <button
            onClick={fillTemplate}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer"
          >
            ↺ Заполнить по образцу «Худжанд-2050»
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-cyan-300 flex items-center justify-between">
              <span>🌑 Сцена 1: Завязка (Интригующий вопрос)</span>
              <span className="text-[11px] text-slate-500">Экран 1</span>
            </label>
            <textarea
              value={scene1}
              onChange={e => setScene1(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-purple-300 flex items-center justify-between">
              <span>🏙️ Сцена 2: Действие (Погружение в мир)</span>
              <span className="text-[11px] text-slate-500">Экран 2</span>
            </label>
            <textarea
              value={scene2}
              onChange={e => setScene2(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-emerald-300 flex items-center justify-between">
              <span>⚡ Сцена 3: Поворот (Кульминация / Открытие)</span>
              <span className="text-[11px] text-slate-500">Экран 3</span>
            </label>
            <textarea
              value={scene3}
              onChange={e => setScene3(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-amber-300 flex items-center justify-between">
              <span>🎉 Сцена 4: Финал (Вывод + Кнопка действия)</span>
              <span className="text-[11px] text-slate-500">Экран 4</span>
            </label>
            <textarea
              value={scene4}
              onChange={e => setScene4(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCompleteTask1}
            disabled={task1Done}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            {task1Done ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Sparkles className="w-4 h-4" />}
            <span>{task1Done ? '✓ Сюжетная дуга утверждена (+50 ОП)' : 'Утвердить сюжетную дугу (+50 ОП)'}</span>
          </button>
        </div>
      </div>

      {/* Task 2: AI Code Generation & Interactive Live Stage */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-300 font-mono font-bold flex items-center justify-center text-sm">
            2
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Шаг 2: Собрать scroll-секцию с ИИ в Google AI Studio
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Формула: Сцены + Что появляется + Какой эффект + Темп
            </p>
          </div>
        </div>

        {/* Copy Prompt Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>ГОТОВЫЙ ПРОМПТ ДЛЯ GOOGLE AI STUDIO / ANTIGRAVITY</span>
            <span>4 СЦЕНЫ + ЭФФЕКТЫ</span>
          </div>
          <pre className="p-3 bg-slate-900 rounded-xl text-slate-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`Создай адаптивную scrollytelling страницу из 4 сцен:
1. Завязка: ${scene1}
2. Действие: ${scene2}
3. Поворот: ${scene3}
4. Финал: ${scene4}
Требования:
- Индикатор прогресса (Scroll Progress Bar) вверху
- Плавные эффекты fade/slide/reveal при прокрутке
- Поддержка @media (prefers-reduced-motion: reduce)
- Понятный сюжет даже при отключенной анимации.`}
          </pre>
          <button
            onClick={handleCopyPrompt}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-600/20"
          >
            {promptCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{promptCopied ? '✓ Скопировано в буфер! (+50 ОП)' : 'Скопировать сгенерированный промпт (+50 ОП)'}</span>
          </button>
        </div>

        {/* Interactive Sandbox Simulator */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Monitor className="w-5 h-5 text-cyan-400" />
                <span>Интерактивная песочница Scrollytelling</span>
              </h4>
              <p className="text-xs text-slate-400">
                Двигай ползунок или нажимай кнопки, чтобы увидеть работу сцен и индикатора вживую!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowProgressBar(!showProgressBar)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  showProgressBar
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                Полоска прогресса: {showProgressBar ? 'ВКЛ' : 'ВЫКЛ'}
              </button>
              <button
                onClick={() => setTextOnlyMode(!textOnlyMode)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  textOnlyMode
                    ? 'bg-amber-950 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                Тест «Только текст»: {textOnlyMode ? 'АКТИВЕН' : 'ОТКЛ'}
              </button>
            </div>
          </div>

          {/* Sandbox Screen View */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 h-72 sm:h-80 flex flex-col">
            {/* Top progress bar if enabled */}
            {showProgressBar && (
              <div className="w-full bg-slate-800 h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${previewScroll}%` }}
                />
              </div>
            )}

            {/* Stage Content */}
            <div className="flex-1 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              {/* Scene 1 (0-25%) */}
              {previewScroll <= 25 && (
                <div className={`space-y-3 max-w-lg transition-all duration-500 ${textOnlyMode ? '' : 'animate-fade-in'}`}>
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono">
                    🌑 ЭКРАН 1: ЗАВЯЗКА
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {scene1}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {textOnlyMode ? '(Анимация отключена: текст понятен сам по себе)' : '✨ Плавное появление (Fade-In) по центру тёмного экрана'}
                  </p>
                </div>
              )}

              {/* Scene 2 (26-55%) */}
              {previewScroll > 25 && previewScroll <= 55 && (
                <div className={`space-y-3 max-w-lg transition-all duration-500 ${textOnlyMode ? '' : 'animate-slide-left'}`}>
                  <span className="px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono">
                    🏙️ ЭКРАН 2: ДЕЙСТВИЕ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {scene2}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {textOnlyMode ? '(Анимация отключена: текст понятен сам по себе)' : '🚀 Выезд сбоку (Slide-In) вместе с панорамой будущего'}
                  </p>
                </div>
              )}

              {/* Scene 3 (56-80%) */}
              {previewScroll > 55 && previewScroll <= 80 && (
                <div className={`space-y-3 max-w-lg transition-all duration-500 ${textOnlyMode ? '' : 'animate-reveal'}`}>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono">
                    ⚡ ЭКРАН 3: ПОВОРОТ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {scene3}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {textOnlyMode ? '(Анимация отключена: текст понятен сам по себе)' : '🔍 Торжественное проявление (Reveal) с акцентом'}
                  </p>
                </div>
              )}

              {/* Scene 4 (81-100%) */}
              {previewScroll > 80 && (
                <div className={`space-y-3 max-w-lg transition-all duration-500 ${textOnlyMode ? '' : 'animate-bounce-short'}`}>
                  <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono">
                    🎉 ЭКРАН 4: ФИНАЛ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {scene4}
                  </h3>
                  <div className="pt-2">
                    <button className="px-6 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 cursor-pointer">
                      Исследовать Худжанд →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Slider at bottom */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 shrink-0">Прокрутка:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={previewScroll}
                onChange={e => setPreviewScroll(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-xs font-mono text-cyan-400 w-10 text-right">{previewScroll}%</span>
            </div>
          </div>
        </div>

        {/* Task 3 Completion */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">
              Шаг 3: Добавить индикатор прогресса и пройти тест «Только текст»
            </h4>
            <p className="text-xs text-slate-400">
              Убедись, что индикатор прогресса подключен, а сюжет понятен даже при отключенной анимации.
            </p>
          </div>
          <button
            onClick={handleCompleteTask3}
            disabled={task3Done}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 shrink-0"
          >
            {task3Done ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{task3Done ? '✓ Шаг 3 принят (+50 ОП)' : 'Завершить Шаг 3 (+50 ОП)'}</span>
          </button>
        </div>
      </div>

      {/* Level 5: 🩺 ДОКТОР ТЕМПА + ⚡ ИСПЫТАНИЕ 3/3 */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-purple-500/30 shadow-2xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            УРОВЕНЬ 5 • 70–80 МИНУТ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
            <Stethoscope className="w-7 h-7 text-purple-400" />
            <span>🩺 ДОКТОР ТЕМПА + ⚡ ИСПЫТАНИЕ 3/3</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1">
            Диагностируй 3 типичные болезни скорости на scroll-страницах и выпиши рецепт исцеления
          </p>
        </div>

        {/* 3 Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Case 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-mono text-[11px] font-bold">
                ПАЦИЕНТ #1
              </span>
              <span className="text-xs font-mono text-slate-500">Спешка</span>
            </div>
            <h4 className="text-sm font-bold text-white">«Слишком быстро!»</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Пользователь чуть крутнул колесико мыши — и пролетел 3 экрана за 0.2 секунды. Он ничего не успел прочесть.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-xs text-cyan-300 font-mono space-y-1">
              <strong>🩺 Рецепт Доктора:</strong><br />
              Добавить секциям <code>min-height: 100vh</code> и привязать смену шагов к фиксированным отсечкам скролла.
            </div>
            <button
              onClick={() => solveCase(1)}
              disabled={solvedCases[1]}
              className="w-full py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
            >
              {solvedCases[1] ? '✓ Пациент исцелён (+25 ОП)' : 'Выписать рецепт (+25 ОП)'}
            </button>
          </div>

          {/* Case 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-[11px] font-bold">
                ПАЦИЕНТ #2
              </span>
              <span className="text-xs font-mono text-slate-500">Тягомотина</span>
            </div>
            <h4 className="text-sm font-bold text-white">«Слишком медленно!»</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Читатель крутит колесико уже 15 секунд по пустому экрану, ничего не происходит. Читатель думает, что сайт сломался.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-xs text-amber-300 font-mono space-y-1">
              <strong>🩺 Рецепт Доктора:</strong><br />
              Сократить пустое пространство, давать новый микро-стимул каждые 250–350px скролла.
            </div>
            <button
              onClick={() => solveCase(2)}
              disabled={solvedCases[2]}
              className="w-full py-2 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-700 text-amber-300 text-xs font-bold transition-all cursor-pointer"
            >
              {solvedCases[2] ? '✓ Пациент исцелён (+25 ОП)' : 'Выписать рецепт (+25 ОП)'}
            </button>
          </div>

          {/* Case 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-mono text-[11px] font-bold">
                ПАЦИЕНТ #3
              </span>
              <span className="text-xs font-mono text-slate-500">Визуальный шум</span>
            </div>
            <h4 className="text-sm font-bold text-white">«Каша из эффектов»</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Картинка крутится, текст прыгает, фон мерцает, кнопки вибрируют. У читателя рябит в глазах.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-xs text-purple-300 font-mono space-y-1">
              <strong>🩺 Рецепт Доктора:</strong><br />
              Правило Миссии 13: <em>Don't animate everything. Animate what matters.</em> 1 главный фокус на сцену.
            </div>
            <button
              onClick={() => solveCase(3)}
              disabled={solvedCases[3]}
              className="w-full py-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-700 text-purple-300 text-xs font-bold transition-all cursor-pointer"
            >
              {solvedCases[3] ? '✓ Пациент исцелён (+25 ОП)' : 'Выписать рецепт (+25 ОП)'}
            </button>
          </div>
        </div>

        {/* ⚡ Испытание 3/3 */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>⚡ Испытание 3/3: Финальный чек-лист готовности</span>
            </h4>
            <span className="text-xs font-mono text-amber-300 font-bold">Награда: +50 ОП</span>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'scenes' as const,
                title: '1. Четыре сцены сменяют друг друга при прокрутке',
                desc: 'Завязка → Действие → Поворот → Финал сменяются плавно и без рывков.'
              },
              {
                key: 'progressBar' as const,
                title: '2. Индикатор прогресса работает точно',
                desc: 'Полоска растет синхронно с чтением от 0% до 100% без скачков.'
              },
              {
                key: 'textOnly' as const,
                title: '3. Тест «Только текст» пройден на 100%',
                desc: 'Если отключить все анимации, история всё равно полностью понятна и увлекательна.'
              }
            ].map(item => (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  checked3[item.key]
                    ? 'bg-emerald-950/60 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked3[item.key]}
                  onChange={() => {}}
                  className="w-5 h-5 mt-0.5 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                />
                <div>
                  <h5 className="text-sm font-bold">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleClaimChallenge}
              disabled={challengeClaimed || !checked3.scenes || !checked3.progressBar || !checked3.textOnly}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Award className="w-4 h-4" />
              <span>{challengeClaimed ? '✓ Испытание 3/3 принято (+50 ОП)' : 'Подтвердить готовность 3/3 (+50 ОП)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level 6: 🎤 SCROLL-ПРЕМЬЕРА (20-секундный питч) */}
      <div className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              УРОВЕНЬ 6 • 80–87 МИНУТ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-3">
              <Mic className="w-7 h-7 text-amber-400" />
              <span>🎤 SCROLL-ПРЕМЬЕРА (20-секундный питч)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              Презентуй свою интерактивную историю: Название, Главный поворот и Зачем нужна прокрутка
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold">
            +25 ОП за питч
          </span>
        </div>

        {/* Pitch Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-mono font-bold text-amber-400">1. Название истории:</label>
            <input
              type="text"
              value={pitchStoryTitle}
              onChange={e => setPitchStoryTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-mono font-bold text-cyan-400">2. Главный поворот:</label>
            <input
              type="text"
              value={pitchTwist}
              onChange={e => setPitchTwist(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="text-xs font-mono font-bold text-purple-400">3. Зачем прокрутка?</label>
            <input
              type="text"
              value={pitchWhyScroll}
              onChange={e => setPitchWhyScroll(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* 20-second Live Pitch Timer */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-base">
              Таймер премьерного выступления
            </h4>
            <p className="text-xs text-slate-400">
              У тебя есть ровно 20 секунд, чтобы озвучить три пункта своей истории перед классом или ментором!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-amber-400/50 flex flex-col items-center justify-center font-mono">
              <span className="text-2xl font-black text-amber-400">{pitchTimer}</span>
              <span className="text-[9px] text-slate-400">СЕК</span>
            </div>

            <button
              onClick={startPitch}
              disabled={isPitching}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Mic className="w-4 h-4" />
              <span>{isPitching ? '🎙️ Идёт питч...' : pitchDone ? 'Повторить питч' : 'Начать 20-сек питч (+25 ОП)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={10}
        labId={10}
        labTitle="Лабораторная работа #10: Scrollytelling «Погружение батискафа на 11 000 метров» + Датчик глубины"
        rewardExp={100}
      />
    </div>
  );
};
