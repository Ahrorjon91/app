import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  Compass,
  Eye,
  SlidersHorizontal,
  MousePointer,
  Maximize2,
  Copy,
  Check,
  Shield,
  HeartHandshake,
  ArrowDown,
  Briefcase,
  CheckSquare,
  Wrench,
  BookOpen,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson13LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Superpowers checkboxes
  const [checkedPowers, setCheckedPowers] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false
  });

  const togglePower = (idx: number) => {
    setCheckedPowers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Easter egg: click Nova 10 times
  const [novaClicks, setNovaClicks] = useState(0);
  const [novaWiggle, setNovaWiggle] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);

  const handleNovaClick = () => {
    const next = novaClicks + 1;
    setNovaClicks(next);
    if (next >= 10 && !easterEggFound) {
      setNovaWiggle(true);
      setEasterEggFound(true);
      addReward(25, 'easter_egg_nova_wiggle');
      setTimeout(() => setNovaWiggle(false), 3000);
    } else {
      setNovaWiggle(true);
      setTimeout(() => setNovaWiggle(false), 500);
    }
  };

  // Button A vs Button B voting demo
  const [votedButton, setVotedButton] = useState<'A' | 'B' | null>(null);

  // Speed slider for effects showcase (0.1s to 2.0s)
  const [animDuration, setAnimDuration] = useState<number>(0.3);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Effect preview triggering
  const [fadeTrigger, setFadeTrigger] = useState(true);
  const [slideTrigger, setSlideTrigger] = useState(true);
  const [revealTrigger, setRevealTrigger] = useState(true);

  // Roleplay step
  const [currentRoleplayPrompt, setCurrentRoleplayPrompt] = useState<string>('HOVER: Медленно приподнимись на носочки и сделай руки шире!');
  const [copiedCheat, setCopiedCheat] = useState(false);

  const roleplayPrompts = [
    { title: 'HOVER (Наведение)', text: '🖱️ Медленно приподнимись на носочках на 5 см и улыбнись!' },
    { title: 'FADE (Появление)', text: '👻 Медленно поднимись из приседа с закрытыми глазами и плавно открой их!' },
    { title: 'SLIDE (Скольжение)', text: '➡️ Сделай плавный шаг вправо с мягким взмахом руки, будто выехал слайд!' },
    { title: 'REVEAL (Свиток)', text: '📜 Присядь, затем одновременно поднимись и шагни вперёд — свиток развернулся!' },
  ];

  const handleCopyCheat = () => {
    const text = `HOVER   — реакция на наведение (увеличение, тень, цвет)
FADE    — плавное появление/исчезновение (прозрачность)
SLIDE   — плавное движение элемента на своё место
REVEAL  — появление при прокрутке (fade + slide вместе)

АНИМАЦИЯ-ЗАПРОС = Элемент + Вид эффекта + Скорость + Условие

ГЛАВНОЕ ПРАВИЛО:  Don't animate everything. Animate what matters.
СКОРОСТЬ:  0.2–0.5 секунды для большинства эффектов
ЗАБОТА:  Поддержка prefers-reduced-motion для комфорта всех пользователей`;
    navigator.clipboard.writeText(text);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10 text-slate-100 text-base leading-relaxed">
      {/* Quick Navigation Anchor Bar */}
      <div className="sticky top-2 z-30 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            Быстрый переход по уровням:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => scrollToSection('sec-hero')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Введение
          </button>
          <button
            onClick={() => scrollToSection('sec-requirements')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Что нужно
          </button>
          <button
            onClick={() => scrollToSection('sec-superpowers')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Суперсилы
          </button>
          <button
            onClick={() => scrollToSection('sec-map')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Карта миссии
          </button>
          <button
            onClick={() => scrollToSection('sec-level1')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Уровень 1
          </button>
          <button
            onClick={() => scrollToSection('sec-level2')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Уровень 2
          </button>
          <button
            onClick={() => scrollToSection('sec-level3')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Уровень 3
          </button>
          <button
            onClick={() => scrollToSection('sec-cheatsheet')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Шпаргалка
          </button>
          <button
            onClick={() => scrollToSection('sec-dictionary')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-slate-300 transition-all cursor-pointer"
          >
            Словарь
          </button>
          <button
            onClick={() => scrollToSection('sec-tools')}
            className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold text-cyan-300 border border-cyan-700 transition-all cursor-pointer"
          >
            Инструменты
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div id="sec-hero" className="relative rounded-3xl overflow-hidden border-2 border-indigo-500/40 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 transition-all duration-300 hover:border-cyan-400/50 p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/25 border border-cyan-400 text-cyan-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-cyan-500/20">
            <Zap className="w-4 h-4 text-cyan-400" /> Миссия 13 • Motion Designer
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-purple-950/90 border border-purple-500/50 text-purple-300 font-mono text-xs sm:text-sm font-bold">
            90 минут • 7 уровней
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
          Оживляем сайт: hover, fade, slide, reveal ✨
        </h1>
        <p className="text-slate-200 text-base sm:text-xl mt-3 max-w-3xl font-medium leading-relaxed drop-shadow">
          Сегодня твой сайт перестаёт быть неподвижной картинкой и начинает живо отвечать на каждое движение мышки или касание пальца.
        </p>
      </div>

      {/* NOVA Greeting & Easter Egg */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/35 shadow-xl space-y-4 transition-all">
        <div className="flex items-start gap-5">
          <button
            onClick={handleNovaClick}
            title="Кликни Nova!"
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xl shadow-cyan-500/30 transition-transform cursor-pointer ${
              novaWiggle ? 'animate-bounce scale-110 rotate-6 ring-4 ring-cyan-400' : 'hover:scale-105 active:scale-95'
            }`}
          >
            🤖
          </button>
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-cyan-300 flex items-center gap-2">
                <span>NOVA Bot Dispatch</span>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
                  ONLINE
                </span>
              </h2>
              {easterEggFound && (
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-400 text-amber-300 text-sm font-black animate-pulse">
                  🎉 Пасхалка найдена: Танец NOVA (+25 ОП)
                </span>
              )}
            </div>
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
              «Салом, Publisher! Твой сайт уже LIVE в интернете. Но пока он неподвижен, как фотография. Сегодня мы добавим анимацию — но <strong className="text-white">не любую</strong>, а <strong className="text-white">умную</strong>: такую, которая помогает ориентироваться, а не рябит в глазах. Главное правило дня: <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800">Don't animate everything. Animate what matters.</span> Поехали!»
            </p>
            {novaClicks > 0 && novaClicks < 10 && (
              <p className="text-sm font-mono text-cyan-300 font-bold">
                [Секретный счётчик кликов NOVA: {novaClicks} / 10 — продолжай нажимать!]
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI News 2026 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-400" />
          <span>Новости индустрии и стандарты веб-анимации 2026</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 hover:border-amber-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Обязательный стандарт</span>
            <p className="text-base sm:text-lg font-bold text-white">Микро-анимации (hover/tap) — признак качественного продукта</p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              В 2026 году неподвижные кнопки воспринимаются как зависшие. Реакция интерфейса мгновенно сообщает пользователю: система слышит твоё касание.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 hover:border-cyan-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Статистика удержания</span>
            <p className="text-base sm:text-lg font-bold text-white">+40% времени на сайте и +23% глубины скролла</p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Сайты с уместной и плавной анимацией удерживают взгляд людей существенно дольше, чем статичные плоские страницы.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 hover:border-purple-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">CSS Scroll-Driven</span>
            <p className="text-base sm:text-lg font-bold text-white">Scroll-эффекты без тяжелого JavaScript</p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Современные браузеры выполняют прокрутку и появление блоков на уровне видеочипа GPU, не нагружая центральный процессор телефона.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2 hover:border-emerald-500/40 transition-all">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Инклюзивность (A11y)</span>
            <p className="text-base sm:text-lg font-bold text-white">Стандарт prefers-reduced-motion</p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Забота о людях: сайт автоматически отключает резкие перемещения для пользователей с вестибулярной чувствительностью.
            </p>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div id="sec-requirements" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-cyan-400" />
          <span>🎒 Что нужно для миссии</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                <th className="py-3 px-4">Что</th>
                <th className="py-3 px-4">Зачем</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span>💻</span> Ноутбук или компьютер
                </td>
                <td className="py-3.5 px-4 text-slate-300">Портал + среда разработки и браузер для тестирования</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span>🔑</span> Личный логин в портале
                </td>
                <td className="py-3.5 px-4 text-slate-300">Начисление ОП и сохранение бейджа Motion Designer</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span>🛠️</span> Google AI Studio
                </td>
                <td className="py-3.5 px-4 text-slate-300">Генерация кода микро-анимаций и правильных CSS-свойств</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span>🚀</span> Опубликованный сайт (Миссия 12)
                </td>
                <td className="py-3.5 px-4 text-slate-300">Основа проекта на GitHub Pages, которую мы сегодня оживляем</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                  <span>📱</span> Смартфон с камерой/браузером
                </td>
                <td className="py-3.5 px-4 text-slate-300">Проверка touch-отклика и поведения элементов под пальцем</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Superpowers Section */}
      <div id="sec-superpowers" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-emerald-400" />
            <span>🎯 Суперсилы Миссии 13</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
            Отмечай по мере освоения
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            'Отличать «мёртвый» сайт от живого интерфейса с отзывчивыми микро-взаимодействиями',
            'Применять 4 фундаментальных столпа анимации: hover, fade, slide, reveal',
            'Формулировать точный AI-запрос: [Элемент] + [Вид эффекта] + [Скорость] + [Условие]',
            'Соблюдать закон тайминга 0.2–0.5 секунды и правило «Don’t animate everything»',
            'Тестировать touch-реакцию на смартфонах и подключать заботу prefers-reduced-motion'
          ].map((power, idx) => (
            <label
              key={idx}
              onClick={() => togglePower(idx)}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                checkedPowers[idx]
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checkedPowers[idx]}
                onChange={() => {}}
                className="mt-1 w-5 h-5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-base sm:text-lg font-medium leading-relaxed">
                {power}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Mission Map Section */}
      <div id="sec-map" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-purple-400" />
          <span>🗺️ Карта миссии 13</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                <th className="py-3 px-4">Уровень</th>
                <th className="py-3 px-4">Название</th>
                <th className="py-3 px-4">Время</th>
                <th className="py-3 px-4">Раздел</th>
                <th className="py-3 px-4 text-right">Награда</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-amber-400">1</td>
                <td className="py-3 px-4 font-semibold text-white">🔥 ЗАПУСК — Мёртвый vs Живой сайт</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">0–10 мин</td>
                <td className="py-3 px-4 text-slate-300">1. Лекция</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-cyan-400">2</td>
                <td className="py-3 px-4 font-semibold text-white">🧠 РАСШИФРОВКА — 4 столпа анимации & скорость</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">10–25 мин</td>
                <td className="py-3 px-4 text-slate-300">1. Лекция</td>
                <td className="py-3 px-4 text-right text-slate-500">—</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-purple-400">3</td>
                <td className="py-3 px-4 font-semibold text-white">🎭 РОЛЕВАЯ ИГРА — Живая Анимация (Режиссёр + Актёр)</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">25–40 мин</td>
                <td className="py-3 px-4 text-slate-300">1. Лекция</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-emerald-400">4</td>
                <td className="py-3 px-4 font-semibold text-white">💻 ЛАБОРАТОРИЯ — Оживляем сайт (3 эффекта + Reduced-Motion)</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">40–70 мин</td>
                <td className="py-3 px-4 text-slate-300">2. Лабораторная</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">до +150 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-rose-400">5</td>
                <td className="py-3 px-4 font-semibold text-white">🩺 ДОКТОР АНИМАЦИИ + ⚡ БЫСТРОЕ ИСПЫТАНИЕ</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">70–80 мин</td>
                <td className="py-3 px-4 text-slate-300">3. Проверка</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">до +100 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-pink-400">6</td>
                <td className="py-3 px-4 font-semibold text-white">🎤 ПРЕМЬЕРА ЭФФЕКТОВ — 20-секундный показ сайтов</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">80–87 мин</td>
                <td className="py-3 px-4 text-slate-300">2. Лабораторная</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">+25 ОП</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-indigo-400">7</td>
                <td className="py-3 px-4 font-semibold text-white">🏆 НОВЫЙ РАНГ — Финальный тест & Бейдж Motion Designer</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">87–90 мин</td>
                <td className="py-3 px-4 text-slate-300">3. Проверка</td>
                <td className="py-3 px-4 text-right font-bold text-cyan-400">до +25 ОП</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ASCII Flow */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto text-center">
          [ЗАПУСК] → [РАСШИФРОВКА] → [РОЛЕВАЯ ИГРА] → [ЛАБОРАТОРИЯ] → [ДОКТОР+ИСПЫТАНИЕ] → [ПРЕМЬЕРА] → [РАНГ]
          <br />
          &nbsp;&nbsp;&nbsp;🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🧠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🎭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;💻&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🩺 ⚡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🎤&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🏆
        </div>
      </div>

      {/* 3 Shields */}
      <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-white text-base sm:text-lg">🛡️ 3 Щита (всегда с тобой):</span>
          <span className="text-slate-300 text-sm sm:text-base">
            🛡️ <strong>Проверяй</strong> · 🛡️ <strong>Не делись личным</strong> · 🛡️ <strong>Будь честным</strong>
          </span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
          ⚡ Don't animate everything. Animate what matters.
        </span>
      </div>

      {/* Level 1: Launch - Dead site vs Alive site demo */}
      <div id="sec-level1" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">УРОВЕНЬ 1 • ЗАПУСК</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Мёртвый сайт vs Живой сайт: Эксперимент с кнопками
            </h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold text-sm w-fit">
            Наведи и нажми на обе кнопки 👇
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Button A: Static / Dead */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-5 text-center">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">Кнопка A (Статичная / Без отклика)</span>
            <div className="py-6">
              <button
                type="button"
                className="px-7 py-3.5 rounded-xl bg-slate-700 text-white font-bold text-base cursor-default select-none shadow-none"
              >
                Оформить заявку
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              При наведении мышки ничего не меняется. Непонятно: кнопка активна или зависла?
            </p>
            <button
              onClick={() => setVotedButton('A')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                votedButton === 'A'
                  ? 'bg-red-950 text-red-300 border border-red-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {votedButton === 'A' ? 'Вы выбрали Кнопку A 😐' : 'Голосовать за Кнопку A'}
            </button>
          </div>

          {/* Button B: Alive / Micro-interaction */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/15 flex flex-col items-center justify-center space-y-5 text-center transition-all">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Кнопка B (Живая / Микро-взаимодействие)</span>
            <div className="py-6">
              <button
                type="button"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base tracking-wide shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/60 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Оформить заявку ✨
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              При наведении увеличивается, усиливает неоновое свечение, а при клике мягко сжимается. Она буквально говорит: «Я готова к работе!»
            </p>
            <button
              onClick={() => {
                setVotedButton('B');
                addReward(15, 'voted_button_b');
              }}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                votedButton === 'B'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/40'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-700 hover:bg-cyan-900'
              }`}
            >
              {votedButton === 'B' ? 'Правильный выбор! +15 ОП 🎉' : 'Голосовать за Кнопку B (Живая)'}
            </button>
          </div>
        </div>
      </div>

      {/* Level 2: Decoder - 4 Types of Animation & Speed Showcase */}
      <div id="sec-level2" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">УРОВЕНЬ 2 • РАСШИФРОВКА</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Живая витрина эффектов: 4 столпа веб-движения
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                reducedMotion
                  ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Reduced-Motion: {reducedMotion ? 'ВКЛ (Мягко)' : 'ВЫКЛ (Стандарт)'}</span>
            </button>
          </div>
        </div>

        {/* Speed Slider Control */}
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
              <span>Скорость перехода (Transition Duration):</span>
              <span className="font-mono text-cyan-300 text-xl font-black bg-cyan-950/80 px-3 py-0.5 rounded-lg border border-cyan-800">{animDuration.toFixed(1)} сек</span>
            </label>
            <div className="text-sm font-semibold">
              {animDuration <= 0.2 && <span className="text-amber-400">⚡ Сверхбыстро (почти незаметно)</span>}
              {animDuration >= 0.3 && animDuration <= 0.5 && <span className="text-emerald-400 font-bold">✨ Идеальный баланс (0.2–0.5с)</span>}
              {animDuration > 0.5 && animDuration <= 1.0 && <span className="text-purple-400">🐢 Медленно (для крупных блоков)</span>}
              {animDuration > 1.0 && <span className="text-red-400 font-bold">⚠️ Слишком затянуто — пользователь устанет ждать!</span>}
            </div>
          </div>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={animDuration}
            onChange={(e) => setAnimDuration(parseFloat(e.target.value))}
            className="w-full h-3 accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs sm:text-sm text-slate-400 font-mono">
            <span>0.1с (Мгновенно)</span>
            <span className="text-cyan-400 font-bold">0.3с (Стандарт)</span>
            <span className="text-cyan-400 font-bold">0.5с</span>
            <span>1.0с</span>
            <span>2.0с (Тормоз)</span>
          </div>
        </div>

        {/* 4 Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: HOVER */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold font-mono">
                1. HOVER
              </span>
              <h4 className="text-lg font-bold text-white">Реакция на наведение</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Курсор прикасается — элемент увеличивается, отбрасывает тень или меняет цвет.
              </p>
            </div>
            <div className="py-6 flex items-center justify-center">
              <div
                style={{
                  transitionDuration: reducedMotion ? '0.1s' : `${animDuration}s`,
                  transitionProperty: 'all'
                }}
                className={`p-5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-sm font-bold text-center cursor-pointer select-none ${
                  reducedMotion
                    ? 'hover:opacity-80'
                    : 'hover:scale-115 hover:shadow-xl hover:shadow-cyan-500/50 hover:bg-cyan-500 hover:text-slate-950'
                }`}
              >
                <MousePointer className="w-5 h-5 mx-auto mb-1.5" />
                Наведи курсор
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-300 block text-center bg-slate-900/60 py-1 rounded-lg">
              scale(1.05) + shadow
            </span>
          </div>

          {/* Card 2: FADE */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-400 text-xs font-bold font-mono">
                2. FADE
              </span>
              <h4 className="text-lg font-bold text-white">Плавное появление</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Прозрачность плавно нарастает от 0% до 100%, без резких рывков.
              </p>
            </div>
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <div
                style={{
                  transitionDuration: `${animDuration}s`,
                  transitionProperty: 'opacity',
                  opacity: fadeTrigger ? 1 : 0
                }}
                className="p-5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-sm font-bold text-center select-none"
              >
                👻 Мягкое появление
              </div>
              <button
                onClick={() => setFadeTrigger(!fadeTrigger)}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono cursor-pointer transition-all"
              >
                {fadeTrigger ? 'Спрятать (Fade out)' : 'Показать (Fade in)'}
              </button>
            </div>
            <span className="text-xs font-mono text-purple-300 block text-center bg-slate-900/60 py-1 rounded-lg">
              opacity: 0 ──▶ 1
            </span>
          </div>

          {/* Card 3: SLIDE */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold font-mono">
                3. SLIDE
              </span>
              <h4 className="text-lg font-bold text-white">Плавное смещение</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Элемент въезжает на своё место сбоку или снизу, создавая динамику.
              </p>
            </div>
            <div className="py-6 flex flex-col items-center justify-center space-y-3 overflow-hidden">
              <div
                style={{
                  transitionDuration: reducedMotion ? '0.1s' : `${animDuration}s`,
                  transitionProperty: 'transform, opacity',
                  transform: reducedMotion
                    ? 'none'
                    : slideTrigger
                    ? 'translateX(0)'
                    : 'translateX(60px)',
                  opacity: slideTrigger ? 1 : 0.2
                }}
                className="p-5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm font-bold text-center select-none"
              >
                ➡️ Скольжение блока
              </div>
              <button
                onClick={() => setSlideTrigger(!slideTrigger)}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono cursor-pointer transition-all"
              >
                {slideTrigger ? 'Сдвинуть назад' : 'Въехать на экран'}
              </button>
            </div>
            <span className="text-xs font-mono text-emerald-300 block text-center bg-slate-900/60 py-1 rounded-lg">
              transform: translateX()
            </span>
          </div>

          {/* Card 4: REVEAL */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-400 text-xs font-bold font-mono">
                4. REVEAL
              </span>
              <h4 className="text-lg font-bold text-white">Свиток при скролле</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Появление блока при прокрутке: одновременный подъем снизу и проявление (fade + slide).
              </p>
            </div>
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <div
                style={{
                  transitionDuration: reducedMotion ? '0.1s' : `${animDuration}s`,
                  transitionProperty: 'all',
                  transform: reducedMotion
                    ? 'none'
                    : revealTrigger
                    ? 'translateY(0) scale(1)'
                    : 'translateY(24px) scale(0.95)',
                  opacity: revealTrigger ? 1 : 0
                }}
                className="p-5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-sm font-bold text-center select-none shadow-lg"
              >
                📜 Появление скролла
              </div>
              <button
                onClick={() => setRevealTrigger(!revealTrigger)}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono cursor-pointer transition-all"
              >
                {revealTrigger ? 'Скрыть (до скролла)' : 'Симулировать скролл'}
              </button>
            </div>
            <span className="text-xs font-mono text-amber-300 block text-center bg-slate-900/60 py-1 rounded-lg">
              fade + translateY
            </span>
          </div>
        </div>

        {/* Golden Rule banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border-l-4 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="text-base sm:text-lg font-black text-amber-300">
              Главное правило: Don't animate everything. Animate what matters.
            </h4>
            <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed">
              Анимируй кнопки и интерактивные карточки, но не заставляй обычный текст бегать и пульсировать. Избыток анимации превращает сайт в карнавальный хаос.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold text-amber-400 shrink-0 bg-amber-950/70 px-4 py-2 rounded-xl border border-amber-800">
            0.2с – 0.5с оптимально
          </span>
        </div>
      </div>

      {/* Level 3: Roleplay - Живая Анимация */}
      <div id="sec-level3" className="p-6 sm:p-9 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">УРОВЕНЬ 3 • РОЛЕВАЯ ИГРА</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Живая Анимация: Почувствуй движение телом
            </h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-sm font-bold">
            +25 ОП за разминку
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🎬 Роль 1: Режиссёр анимации</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Выбери команду движения и назови её своим напарникам. Задача — срежиссировать плавный эффект за 5 секунд.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {roleplayPrompts.map((rp, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentRoleplayPrompt(rp.text)}
                  className={`p-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-all border cursor-pointer ${
                    currentRoleplayPrompt === rp.text
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {rp.title}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-purple-200 flex items-center gap-2">
                <span>🕺 Роль 2: Живая Анимация</span>
              </h4>
              <p className="text-sm text-purple-300/80 mt-1">
                Исполни физическое движение по команде режиссёра:
              </p>
              <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-purple-500/40 text-center shadow-inner">
                <span className="text-lg sm:text-xl font-black text-white leading-relaxed">
                  {currentRoleplayPrompt}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic text-center">
              💡 Физическое ощущение скорости помогает безошибочно задавать секунды в CSS!
            </p>
          </div>
        </div>
      </div>

      {/* Cheat Sheet & Copy */}
      <div id="sec-cheatsheet" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-cyan-400" />
              <span>Шпаргалка Миссии 13: На один экран</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300">Формула запроса для ИИ и стандарты скорости</p>
          </div>
          <button
            onClick={handleCopyCheat}
            className="px-5 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-sm font-bold flex items-center gap-2 w-fit transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
          >
            {copiedCheat ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCheat ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
          </button>
        </div>

        <pre className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`HOVER   — реакция на наведение (увеличение, тень, цвет)
FADE    — плавное появление/исчезновение (прозрачность)
SLIDE   — плавное движение элемента на своё место
REVEAL  — появление при прокрутке (fade + slide вместе)

АНИМАЦИЯ-ЗАПРОС = Элемент + Вид эффекта + Скорость + Условие

ГЛАВНОЕ ПРАВИЛО:  Don't animate everything. Animate what matters.
СКОРОСТЬ:  0.2–0.5 секунды для большинства эффектов
ЗАБОТА:  Поддержка prefers-reduced-motion для комфорта всех пользователей

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`}
        </pre>
      </div>

      {/* Mini Dictionary */}
      <div id="sec-dictionary" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <span>📖 Мини-словарь Миссии 13</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-amber-400 text-base">Микро-взаимодействие</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Небольшой визуальный или звуковой отклик интерфейса на действие пользователя (клик, наведение, скролл).
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-cyan-400 text-base">transition</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              CSS-свойство плавного перехода между двумя состояниями элемента (например, от синего к зелёному за 0.3с).
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-purple-400 text-base">transform (scale / translate)</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Изменение размера (scale) или положения (translate) элемента, выполняемое видеокартой GPU без тормозов.
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-emerald-400 text-base">Reveal (Появление)</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Комбинация прозрачности (opacity) и подъёма снизу вверх, когда элемент попадает в поле зрения при прокрутке.
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-rose-400 text-base">prefers-reduced-motion</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Системная настройка операционной системы, сообщающая сайту отключить резкие скачки и анимацию для комфорта глаз.
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
            <span className="font-mono font-bold text-indigo-400 text-base">Easing (Функция плавности)</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Характер ускорения движения: ease-out (быстрый старт, плавное торможение) делает движение естественным.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div id="sec-tools" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>🔗 Инструменты миссии 13</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-1">Основные утилиты для разработки и отладки</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs uppercase">
                <th className="py-3 px-4">Инструмент</th>
                <th className="py-3 px-4">Зачем</th>
                <th className="py-3 px-4 text-right">Адрес</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-cyan-300">Google AI Studio</td>
                <td className="py-3.5 px-4 text-slate-300">Генерация точных CSS-стилей, классов Tailwind и скриптов</td>
                <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-400">aistudio.google.com</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-purple-300">Chrome DevTools (Elements)</td>
                <td className="py-3.5 px-4 text-slate-300">Инспектор стилей, симуляция :hover и кривых Безье (cubic-bezier)</td>
                <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-400">F12 в браузере</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-emerald-300">GitHub Pages</td>
                <td className="py-3.5 px-4 text-slate-300">Хостинг живой версии сайта для проверки на реальных смартфонах</td>
                <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-400">github.com</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3.5 px-4 font-bold text-amber-300">Портал AI for LIFE</td>
                <td className="py-3.5 px-4 text-slate-300">Тренажёр эффектов, сдача квестов и зачисление опыта ОП</td>
                <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-400">твой портал</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Tools */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>🆕 Дополнительные инструменты</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1">
              <span className="font-bold text-cyan-400 text-sm">easings.net</span>
              <p className="text-xs sm:text-sm text-slate-300">
                Визуальная шпаргалка по кривым плавности (easeInQuad, easeOutCubic, easeInOutBack).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1">
              <span className="font-bold text-purple-400 text-sm">Animista.net</span>
              <p className="text-xs sm:text-sm text-slate-300">
                Каталог готовых CSS-микроанимаций с мгновенным копированием кода.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1">
              <span className="font-bold text-emerald-400 text-sm">Chrome DevTools Rendering</span>
              <p className="text-xs sm:text-sm text-slate-300">
                Вкладка Rendering для эмуляции prefers-reduced-motion прямо на ноутбуке.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
