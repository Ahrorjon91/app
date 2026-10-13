import React, { useState } from 'react';
import {
  Code,
  Palette,
  Zap,
  Smartphone,
  Monitor,
  CheckCircle2,
  Copy,
  Sparkles,
  Sliders,
  Send,
  Trophy,
  AlertCircle,
  Eye,
  Layers,
  ThumbsUp,
  RefreshCw,
  Terminal,
  Radio
} from 'lucide-react';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

interface Lesson10LabWorkSectionProps {
  onLabSubmitted?: () => void;
}

export const Lesson10LabWorkSection: React.FC<Lesson10LabWorkSectionProps> = ({ onLabSubmitted }) => {
  // Step 1: Structural Plan
  const [htmlBlocks, setHtmlBlocks] = useState('Шапка с аватаром, обо мне, 3 увлечения, кнопка связи');
  const [cssMood, setCssMood] = useState('Глубокий матовый космос, неоновый бирюзовый акцент');
  const [jsFeature, setJsFeature] = useState('Кнопка меняет надпись и отправляет приветственный сигнал при клике');
  const [step1Completed, setStep1Completed] = useState(false);

  // Presets
  const applyPreset = (blocks: string, mood: string, js: string) => {
    setHtmlBlocks(blocks);
    setCssMood(mood);
    setJsFeature(js);
  };

  // Step 2: Prompt Copied
  const [promptCopied, setPromptCopied] = useState(false);

  // Step 3: CSS Control Room State
  const [textColor, setTextColor] = useState<'#22d3ee' | '#34d399' | '#f59e0b' | '#f43f5e' | '#ffffff'>('#22d3ee');
  const [bgStyle, setBgStyle] = useState<'obsidian' | 'indigo' | 'cyber'>('obsidian');
  const [fontSize, setFontSize] = useState<'14px' | '16px' | '18px'>('16px');
  const [borderRadius, setBorderRadius] = useState<'6px' | '14px' | '24px'>('14px');

  // Step 4: JS Alert Event Demo
  const [jsClickCount, setJsClickCount] = useState(0);
  const [showAlertPacket, setShowAlertPacket] = useState(false);
  const [jsActiveStatus, setJsActiveStatus] = useState('Ожидание клика');

  const triggerJsBehavior = () => {
    setJsClickCount(prev => prev + 1);
    setShowAlertPacket(true);
    setJsActiveStatus(`Сигнал #${jsClickCount + 1} зафиксирован!`);
    setTimeout(() => {
      setShowAlertPacket(false);
    }, 1200);
  };

  // Step 5: Responsive Check
  const [viewDevice, setViewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  // Level 6: Demo Pitch & Voting
  const [pitchName, setPitchName] = useState('Сайт-визитка Амира');
  const [pitchFeature, setPitchFeature] = useState('Интерактивная кнопка связи с неоновым сигналом');
  const [pitchInsight, setPitchInsight] = useState('HTML, CSS и JS дополняют друг друга как скелет, одежда и мышцы');
  const [votedStudent, setVotedStudent] = useState<string | null>(null);

  const fullPrompt = `РОЛЬ: Senior Frontend Developer & Designer.
ЦЕЛЬ: Создай для меня современный персональный сайт-визитку на чистом HTML, CSS и JavaScript.
СТРУКТУРА (HTML): ${htmlBlocks}
СТИЛЬ (CSS): ${cssMood}
ПОВЕДЕНИЕ (JS): ${jsFeature}
ОГРАНИЧЕНИЯ:
- Мобильная адаптивность (прекрасный вид на смартфоне и ПК).
- Никаких персональных закрытых данных (без реального адреса, школы и телефона).
- Выведи код тремя отдельными понятными блоками с комментариями:
  1) <!-- HTML -->
  2) /* CSS */
  3) // JAVASCRIPT
- Добавь в подвал копирайт: «Собрано на вайб-кодинге в AI FOR LIFE Academy».`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const getBackgroundClass = () => {
    switch (bgStyle) {
      case 'indigo':
        return 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-indigo-500/40';
      case 'cyber':
        return 'bg-gradient-to-b from-cyan-950/40 via-black to-slate-950 border-cyan-500/50';
      case 'obsidian':
      default:
        return 'bg-slate-950 border-slate-800';
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header info */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Sliders className="w-3.5 h-3.5" /> Лаборатория · 40–70 мин
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Уровень 4: Строим сайт-визитку в Диспетчерской
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Пройди все 5 шагов создания своего сайта и настрой его внешний вид и поведение вживую.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 border border-slate-700 text-xs font-mono text-cyan-400">
          <Trophy className="w-4 h-4 text-amber-400" />
          Награда за лабу: <strong>до +150 ОП</strong>
        </div>
      </div>

      {/* ШАГ 1: Структурный план */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Шаг 1 — Структурный план (+50 ОП)
          </h3>
          <span className="text-xs text-slate-400">Время: ~10 мин</span>
        </div>

        {/* Preset buttons */}
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Быстрые шаблоны идеи:</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                applyPreset(
                  'Аватар-стикер, заголовок «Робототехник и Кодер», проекты, кнопка связи',
                  'Неоновый киберпанк, графит и электро-cyan, неоновые тени',
                  'Кнопка «Запустить диагностику» показывает шуточный статус готовности'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
            >
              🤖 Робототехника & AI
            </button>
            <button
              onClick={() =>
                applyPreset(
                  'Шапка-визитка, блок «Моё творчество: анимация и дизайн», галерея работ, контакты',
                  'Мягкий фиолетово-розовый градиент, скругленные мягкие карточки',
                  'Клик по карточке плавно меняет цвет рамки'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
            >
              🎨 Креатор & Медиа
            </button>
            <button
              onClick={() =>
                applyPreset(
                  'Никнейм гроссмейстера, блок «Шахматные победы и тактики», кнопка бросить вызов',
                  'Строгий темный изумруд с золотыми акцентами, минимализм',
                  'Кнопка «Сделать ход» генерирует случайную шахматную цитату'
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
            >
              ♟️ Шахматы & Логика
            </button>
          </div>
        </div>

        {/* 3 Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-orange-400 uppercase flex items-center gap-1.5">
              🧱 1. Блоки сайта (HTML)
            </label>
            <textarea
              value={htmlBlocks}
              onChange={e => setHtmlBlocks(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
              placeholder="Что должно быть на странице..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5">
              🎨 2. Цвета и стиль (CSS)
            </label>
            <textarea
              value={cssMood}
              onChange={e => setCssMood(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="Какое настроение и цвета..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-400 uppercase flex items-center gap-1.5">
              ⚡ 3. Интерактив (JS)
            </label>
            <textarea
              value={jsFeature}
              onChange={e => setJsFeature(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-yellow-500"
              placeholder="Какая реакция на клик кнопки..."
            />
          </div>
        </div>

        <button
          onClick={() => setStep1Completed(true)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            step1Completed
              ? 'bg-emerald-600 text-white'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {step1Completed ? 'План зафиксирован (+50 ОП)' : 'Зафиксировать план сайта'}
        </button>
      </div>

      {/* ШАГ 2: Сгенерируй сайт с кодом */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" /> Шаг 2 — Сгенерируй сайт с кодом (+50 ОП)
          </h3>
          <span className="text-xs text-slate-400">В AI Studio / Antigravity</span>
        </div>
        <p className="text-xs text-slate-300">
          Скопируй этот составной промпт. Обрати внимание: мы явно просим ИИ разделить <strong>HTML</strong>, <strong>CSS</strong> и <strong>JS</strong> по отдельным секциям, чтобы ты мог увидеть каждый отдел!
        </p>

        <div className="relative p-4 rounded-2xl bg-black/80 border border-slate-800 text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed">
          {fullPrompt}
          <button
            onClick={copyPrompt}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-sans font-bold hover:bg-cyan-900 transition-all shadow-md"
          >
            {promptCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {promptCopied ? 'Скопировано!' : 'Копировать промпт'}
          </button>
        </div>
      </div>

      {/* ШАГ 3 И 4: CSS-ДИСПЕТЧЕРСКАЯ И JS-СИГНАЛ ТРЕВОГИ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSS Controls panel */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-blue-900/40 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-400" /> Шаг 3: CSS-Диспетчерская (+25 ОП)
            </h3>
            <span className="text-[11px] font-mono text-blue-400">СТИЛИЗАЦИЯ</span>
          </div>
          <p className="text-xs text-slate-300">
            Настрой «голограмму» своего сайта в реальном времени с помощью селекторов и свойств:
          </p>

          <div className="space-y-4">
            {/* 1. Color picker */}
            <div>
              <div className="text-xs font-mono text-slate-300 mb-1.5 flex justify-between">
                <span>color (цвет текста)</span>
                <span className="text-cyan-400">{textColor}</span>
              </div>
              <div className="flex gap-2">
                {[
                  { color: '#22d3ee', label: 'Cyan' },
                  { color: '#34d399', label: 'Emerald' },
                  { color: '#f59e0b', label: 'Amber' },
                  { color: '#f43f5e', label: 'Rose' },
                  { color: '#ffffff', label: 'White' }
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setTextColor(c.color as any)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      textColor === c.color ? 'scale-110 border-white shadow-lg' : 'border-slate-700'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* 2. Background style */}
            <div>
              <div className="text-xs font-mono text-slate-300 mb-1.5">
                background (тема оформления карточки)
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'obsidian', label: 'Матовый Графит' },
                  { id: 'indigo', label: 'Глубокий Индиго' },
                  { id: 'cyber', label: 'Кибер Сетка' }
                ].map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setBgStyle(bg.id as any)}
                    className={`p-2 rounded-xl text-xs font-medium border transition-all ${
                      bgStyle === bg.id
                        ? 'bg-blue-950 border-blue-500 text-blue-200 font-bold'
                        : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Font size */}
            <div>
              <div className="text-xs font-mono text-slate-300 mb-1.5 flex justify-between">
                <span>font-size (размер шрифта)</span>
                <span className="text-blue-400">{fontSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['14px', '16px', '18px'] as const).map(sz => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`p-2 rounded-xl text-xs font-mono transition-all border ${
                      fontSize === sz
                        ? 'bg-blue-950 border-blue-500 text-blue-200 font-bold'
                        : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Border Radius */}
            <div>
              <div className="text-xs font-mono text-slate-300 mb-1.5 flex justify-between">
                <span>border-radius (скругление углов)</span>
                <span className="text-purple-400">{borderRadius}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: '6px', label: 'Строгий (6px)' },
                  { val: '14px', label: 'Мягкий (14px)' },
                  { val: '24px', label: 'Скругленный (24px)' }
                ].map(r => (
                  <button
                    key={r.val}
                    onClick={() => setBorderRadius(r.val as any)}
                    className={`p-2 rounded-xl text-xs transition-all border ${
                      borderRadius === r.val
                        ? 'bg-purple-950 border-purple-500 text-purple-200 font-bold'
                        : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Preview & JS Alert Simulation */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-900/40 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" /> Живое Превью сайта
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                LIVE OUTPUT
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Смотри, как меняется CSS-голограмма и кликай кнопку для проверки JS-сигнала тревоги!
            </p>

            {/* Preview Box with dynamic alert border animation */}
            <div className="relative overflow-hidden p-1 rounded-3xl transition-all">
              {/* Red Packet Alert Effect (runs across border on JS trigger) */}
              {showAlertPacket && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 opacity-90 animate-pulse rounded-3xl blur-sm" />
              )}

              <div
                className={`relative z-10 p-6 shadow-2xl transition-all ${getBackgroundClass()}`}
                style={{
                  borderRadius: borderRadius,
                  fontSize: fontSize
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-400 flex items-center justify-center text-xs font-bold text-cyan-300">
                      🛰️
                    </div>
                    <span className="text-xs font-mono font-bold" style={{ color: textColor }}>
                      Сайт-визитка Vibe Coder
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">HTML + CSS + JS</span>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-lg font-black" style={{ color: textColor }}>
                    {pitchName}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {htmlBlocks}
                  </p>
                </div>

                {/* JS Interactive Button */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={triggerJsBehavior}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    Кликни меня! (JS-реакция #{jsClickCount})
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span>Статус JS-мониторинга:</span>
                    <span className="text-cyan-400 font-bold">{jsActiveStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>При клике срабатывает красный импульс по контуру — подтверждение работы JS-обработчика событий.</span>
          </div>
        </div>
      </div>

      {/* ШАГ 5: Проверка на маленьком экране */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" /> Шаг 5 — Проверка на маленьком экране (5 мин)
            </h3>
            <p className="text-xs text-slate-400">
              Проверь сайт на узком экране (как на смартфоне) перед сдачей.
            </p>
          </div>

          {/* Viewport switch */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-slate-700">
            <button
              onClick={() => setViewDevice('desktop')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                viewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Компьютер
            </button>
            <button
              onClick={() => setViewDevice('mobile')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                viewDevice === 'mobile' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Смартфон (375px)
            </button>
          </div>
        </div>

        {/* Viewport Simulator */}
        <div className="p-6 rounded-2xl bg-black/70 border border-slate-800 flex justify-center items-center">
          <div
            className={`transition-all duration-300 ${
              viewDevice === 'mobile'
                ? 'w-[320px] p-4 rounded-3xl border-4 border-slate-700 bg-slate-950 shadow-2xl space-y-3 text-center'
                : 'w-full max-w-xl p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3'
            }`}
          >
            <div className="text-[10px] font-mono text-cyan-400 uppercase">
              {viewDevice === 'mobile' ? '📱 Режим смартфона' : '💻 Режим десктопа'}
            </div>
            <h4 className="font-bold text-white text-sm">{pitchName}</h4>
            <p className="text-xs text-slate-300">{htmlBlocks}</p>
            <button className="w-full py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold">
              Написать сообщение
            </button>
          </div>
        </div>

        {/* 3-point checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => setCheck1(!check1)}
            className={`p-3 rounded-xl text-xs font-medium border text-left flex items-start gap-2.5 transition-all ${
              check1
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${check1 ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span>Всё читается на узком экране (шрифт не вылезает)</span>
          </button>

          <button
            onClick={() => setCheck2(!check2)}
            className={`p-3 rounded-xl text-xs font-medium border text-left flex items-start gap-2.5 transition-all ${
              check2
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${check2 ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span>Кнопка и JS-фишка корректно нажимаются</span>
          </button>

          <button
            onClick={() => setCheck3(!check3)}
            className={`p-3 rounded-xl text-xs font-medium border text-left flex items-start gap-2.5 transition-all ${
              check3
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                : 'bg-black/50 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${check3 ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span>Нет закрытых данных (школа, адрес, телефон скрыты)</span>
          </button>
        </div>
      </div>

      {/* УРОВЕНЬ 6: Демонстрация в Центре Управления (20-секундный шаблон + голосование) */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-indigo-900/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Уровень 6 · Демонстрация (80–87 мин)
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> 20-секундный питч и голосование (+25 ОП)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Мой сайт-визитка про:</label>
            <input
              type="text"
              value={pitchName}
              onChange={e => setPitchName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Моя JS-фишка делает:</label>
            <input
              type="text"
              value={pitchFeature}
              onChange={e => setPitchFeature(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Открытие про код сегодня:</label>
            <input
              type="text"
              value={pitchInsight}
              onChange={e => setPitchInsight(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Voting simulation */}
        <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300">
            🗳️ Номинация класса: «Лучший баланс структуры и стиля»:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: '1', name: 'Сайт Амира (AI Robotics)', desc: 'Отличная кибер-сетка и статус-сигнал' },
              { id: '2', name: 'Сайт Мадины (Design Studio)', desc: 'Мягкий градиент и идеальные отступы' },
              { id: '3', name: 'Сайт Далера (Chess Master)', desc: 'Изумрудная гамма и строгая структура' }
            ].map(candidate => (
              <button
                key={candidate.id}
                onClick={() => setVotedStudent(candidate.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  votedStudent === candidate.id
                    ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">{candidate.name}</div>
                <div className="text-[11px] text-slate-400">{candidate.desc}</div>
              </button>
            ))}
          </div>
          {votedStudent && (
            <div className="text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Твой голос учтён! +25 ОП за активное участие в демонстрации.
            </div>
          )}
        </div>
      </div>

      {/* Inline Lab Submission */}
      <InlineLabSubmission
        labId={6}
        lessonId={6}
        rewardXp={100}
        onSubmitted={onLabSubmitted}
      />
    </div>
  );
};
