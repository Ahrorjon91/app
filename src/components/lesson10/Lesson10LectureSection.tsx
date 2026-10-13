import React, { useState } from 'react';
import {
  Satellite,
  Layers,
  Code,
  Palette,
  Zap,
  Shield,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Copy,
  Radio,
  ArrowRight,
  Terminal,
  HelpCircle,
  Eye,
  Smartphone,
  Cpu,
  RefreshCw,
  Box,
  AlertTriangle
} from 'lucide-react';

export const Lesson10LectureSection: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Radar scan Easter Egg
  const [radarScanning, setRadarScanning] = useState(false);
  const [radarUnlocked, setRadarUnlocked] = useState(false);

  // Level 1: Launch Mode Switcher («Сырые пакеты» vs «Голограмма»)
  const [previewMode, setPreviewMode] = useState<'raw' | 'hologram'>('hologram');
  const [userVote, setUserVote] = useState<string | null>(null);

  // Level 2: Interactive Tag Constructor
  const [selectedTag, setSelectedTag] = useState<'h1' | 'p' | 'img' | 'button' | 'div'>('h1');

  // Level 3: Roleplay Simulator State
  const [roleplayTurn, setRoleplayTurn] = useState<number>(0);
  const [roleplayScore, setRoleplayScore] = useState<number>(0);
  const [roleplayDone, setRoleplayDone] = useState<boolean>(false);

  // Copy helper
  const [copiedCheat, setCopiedCheat] = useState(false);

  const triggerRadarScan = () => {
    if (radarUnlocked || radarScanning) return;
    setRadarScanning(true);
    setTimeout(() => {
      setRadarScanning(false);
      setRadarUnlocked(true);
    }, 1800);
  };

  const copyCheatSheet = () => {
    const text = `3 ОТДЕЛА: HTML (структура) · CSS (стиль) · JS (поведение)
HTML-ТЕГ: <тег>содержимое</тег>
CSS-ПРАВИЛО: селектор { свойство: значение; }
JS: реагирует на клики, наведения и события
ПРАВИЛО ПРОВЕРКИ: всегда смотри сайт и на широком, и на узком экране
ЧЕСТНОСТЬ: никаких личных данных на сайте (адрес, телефон, школа)
GENERATE ≠ FINISHED | Проверяй · Не делись личным · Будь честным`;
    navigator.clipboard.writeText(text);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2000);
  };

  const tagsInfo = {
    h1: {
      tag: '<h1>',
      name: 'Главный заголовок',
      desc: 'Самый важный текст страницы. Задаёт тему и привлекает внимание.',
      example: '<h1>Привет, я Амир из Худжанда!</h1>',
      preview: <h1 className="text-2xl font-black text-cyan-300">Привет, я Амир из Худжанда!</h1>
    },
    p: {
      tag: '<p>',
      name: 'Обычный абзац текста',
      desc: 'Основной текстовый блок для описания мыслей, биографии или фактов.',
      example: '<p>Я изучаю вайб-кодинг и создаю полезные сервисы с ИИ.</p>',
      preview: <p className="text-sm text-slate-300">Я изучаю вайб-кодинг и создаю полезные сервисы с ИИ.</p>
    },
    img: {
      tag: '<img>',
      name: 'Изображение',
      desc: 'Одиночный тег для показа фото, иллюстраций или аватарок.',
      example: '<img src="avatar.jpg" alt="Мой аватар" />',
      preview: (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/20">
          🚀
        </div>
      )
    },
    button: {
      tag: '<button>',
      name: 'Кнопка действия',
      desc: 'Интерактивный элемент, на который пользователь может кликнуть.',
      example: '<button>Написать в Telegram</button>',
      preview: (
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25">
          Написать в Telegram
        </button>
      )
    },
    div: {
      tag: '<div>',
      name: 'Контейнер / Блок',
      desc: 'Универсальный «чемодан» для группировки других тегов вместе.',
      example: '<div class="card"> <h1>...</h1> <p>...</p> </div>',
      preview: (
        <div className="p-3 rounded-lg border border-dashed border-cyan-400/50 bg-cyan-950/20 text-xs text-cyan-300">
          📦 [div container]: оборачивает элементы в общую карточку
        </div>
      )
    }
  };

  const roleplayScenarios = [
    {
      designer: '«Сделай так, чтобы заголовок светился неоновым бирюзовым цветом, был крупным и стоял ровно по центру!»',
      options: [
        {
          text: 'h1 { color: cyan; font-size: 36px; text-align: center; }',
          correct: true,
          comment: 'Идеально! Дизайнер описал цвет, размер и выравнивание — это чистый CSS.'
        },
        {
          text: '<button color="cyan">Заголовок</button>',
          correct: false,
          comment: 'Ошибка: это тег кнопки с невалидным атрибутом, а не стиль заголовка.'
        },
        {
          text: 'function centerH1() { alert("cyan"); }',
          correct: false,
          comment: 'Ошибка: это JavaScript-функция вывода алерта, а не оформление.'
        }
      ]
    },
    {
      designer: '«Кнопка должна быть мягкой, со скруглёнными краями и тёмно-синим градиентом»',
      options: [
        {
          text: '<p>Мягкая синяя кнопка</p>',
          correct: false,
          comment: 'Это обычный абзац текста, а не стилизованная кнопка.'
        },
        {
          text: 'button { border-radius: 16px; background: #1e3a8a; }',
          correct: true,
          comment: 'Браво! Свойство border-radius даёт мягкие углы, а background — цвет.'
        },
        {
          text: 'window.onClick = buttonRadius;',
          correct: false,
          comment: 'Это JavaScript-обработчик клика, а не стили оформления.'
        }
      ]
    },
    {
      designer: '«Когда посетитель кликает по кнопке, на экране должен появляться радостный приветственный статус!»',
      options: [
        {
          text: 'button:hover { opacity: 0.8; }',
          correct: false,
          comment: 'Это всего лишь эффект наведения курсора, а не реакция на клик.'
        },
        {
          text: 'button.addEventListener("click", () => showWelcome());',
          correct: true,
          comment: 'Точно в цель! Это отдел JS — реакция на действие пользователя (клик).'
        },
        {
          text: '<div>Приветствие</div>',
          correct: false,
          comment: 'Это статический блок, он не реагирует на действие.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 text-slate-200">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-black/60 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={triggerRadarScan}
              title="Кликни по радару для сканирования диспетчерской"
              className={`p-2.5 rounded-xl border transition-all ${
                radarUnlocked
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-slate-900 border-slate-700 text-cyan-400 hover:border-cyan-500 hover:scale-105'
              }`}
            >
              <Satellite className={`w-5 h-5 ${radarScanning ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            {radarUnlocked && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              Диспетчерская Сайта · Центр Управления
            </div>
            <div className="text-xs text-slate-400">
              {radarUnlocked ? '🟢 Пасхалка найдена: +25 ОП начислено!' : 'Кликни по радару для поиска скрытого пакета данных'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            {soundEnabled ? 'Звук ВКЛ' : 'Звук ВЫКЛ'}
          </button>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white"
          >
            <Sparkles className={`w-3.5 h-3.5 ${animationsEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
            {animationsEnabled ? 'Анимации' : 'Статика'}
          </button>
        </div>
      </div>

      {/* Radar Easter Egg Banner if unlocked */}
      {radarUnlocked && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between gap-3 text-emerald-300 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>[NOVA RADAR SCANNER]:</strong> Обнаружен скрытый сетевой пакет: <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">HTTP/2 200 OK: payload: "Hello World Khujand"</code> (+25 ОП)
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 font-bold border border-emerald-600/40">
            +25 XP EARNED
          </span>
        </div>
      )}

      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 sm:p-8">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Satellite className="w-3.5 h-3.5" /> Урок 6 · Проект «My First Live Website»
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 tracking-tight">
            Центр Управления Сайтом — HTML, CSS и JS как три отдела одной команды
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Заходим в диспетчерскую своего личного сайта — где <strong>HTML</strong>, <strong>CSS</strong> и <strong>JS</strong> работают как три отдела одной команды. Сегодня ты строишь свой личный сайт-визитку уже осознанно, а не вслепую!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-black/40 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 90 минут
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-black/40 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-indigo-400" /> 7 уровней
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-black/40 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> 1 личный сайт-визитка
            </div>
          </div>
        </div>
      </div>

      {/* NOVA Transmission */}
      <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0 text-cyan-300 font-bold">
          🤖
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-2">
            Входящее сообщение · NOVA
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            «Салом, Vibe Coder! 👋 Твой первый мини-сайт уже работает. Сегодня я показываю тебе святая святых — <strong>Центр Управления Сайтом</strong>. Здесь ты увидишь, как «сырые данные» твоей страницы превращаются в то, что видит посетитель: слой структуры, слой оформления и слой поведения. Заходим внутрь! 🟢»
          </p>
        </div>
      </div>

      {/* 3 Shields & Special Rule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-800/40 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Shield className="w-4 h-4" /> 1. Проверяй
          </div>
          <p className="text-xs text-slate-400">
            Generate ≠ Finished. Не публикуй код вслепую, смотри на результат в браузере и на смартфоне.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-800/40 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Shield className="w-4 h-4" /> 2. Не делись личным
          </div>
          <p className="text-xs text-slate-400">
            Только то, чем можно делиться публично: ник, хобби, проекты. <strong>Никаких</strong> адресов, телефонов и школы!
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-800/40 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Shield className="w-4 h-4" /> 3. Будь честным
          </div>
          <p className="text-xs text-slate-400">
            Гордо указывай в футере: «Собрано с помощью ИИ и вайб-кодинга в AI FOR LIFE Academy».
          </p>
        </div>
      </div>

      {/* AI News 2026 Table */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📰 Новости ИИ за эту неделю (2026)
          </h3>
          <span className="text-xs text-cyan-400 font-mono">LIVE INTELLIGENCE</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-black/50 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3 w-1/2">Событие индустрии</th>
                <th className="p-3 w-1/2">Почему это важно сегодня</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-cyan-950/10">
                <td className="p-3 font-medium text-white">
                  🪪 Из одного точного запроса ИИ собирает персональный сайт-визитку с живой раскладкой и микро-анимациями
                </td>
                <td className="p-3 text-slate-400">
                  Ровно это ты попробуешь сегодня — но уже понимая, что именно генерируется внутри.
                </td>
              </tr>
              <tr className="hover:bg-cyan-950/10">
                <td className="p-3 font-medium text-white">
                  📊 Рынок ИИ-конструкторов сайтов утроится к 2030 году, ускоряя верстку в разы
                </td>
                <td className="p-3 text-slate-400">
                  Ты учишься навыку, который прямо сейчас экономит сотни часов разработчикам по всему миру.
                </td>
              </tr>
              <tr className="hover:bg-cyan-950/10">
                <td className="p-3 font-medium text-white">
                  🧠 ИИ больше не заполняет шаблон, а одновременно продумывает разметку, стили и динамику
                </td>
                <td className="p-3 text-slate-400">
                  Поэтому мы учимся разделять эти три слоя, чтобы грамотно отдавать команды ИИ.
                </td>
              </tr>
              <tr className="hover:bg-cyan-950/10">
                <td className="p-3 font-medium text-white">
                  �� Персональные сайты-визитки через ИИ массово делают соискатели, тренеры и креаторы
                </td>
                <td className="p-3 text-slate-400">
                  Твой сегодняшний сайт — это первый шаг к личному цифровому портфолио в интернете.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 flex items-center justify-between">
          <span>💬 <strong>Вопрос для класса:</strong> Если ИИ может сгенерировать сайт целиком, зачем вообще понимать, что внутри?</span>
        </div>
      </div>

      {/* LEVEL 1 — ЗАПУСК: Режим «Сырые пакеты» vs «Голограмма» */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-cyan-900/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Уровень 1 · Запуск (0–10 мин)
            </div>
            <h3 className="text-xl font-black text-white">
              Вход в Центр Управления: «Сырые пакеты» vs «Голограмма»
            </h3>
          </div>

          {/* Mode Switcher Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-black/70 border border-slate-700">
            <button
              onClick={() => setPreviewMode('raw')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                previewMode === 'raw'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📄 Режим 1: «Сырые пакеты» (Только HTML)
            </button>
            <button
              onClick={() => setPreviewMode('hologram')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                previewMode === 'hologram'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ✨ Режим 2: «Голограмма» (HTML + CSS + JS)
            </button>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-6 rounded-2xl bg-black/90 border border-slate-800 min-h-[220px] flex items-center justify-center transition-all">
          {previewMode === 'raw' ? (
            /* RAW HTML ONLY (Unstyled browser default look) */
            <div className="w-full max-w-md bg-white text-black p-5 rounded-none font-serif text-left space-y-3">
              <h1 className="text-xl font-bold border-b border-black pb-1">Амир | AI Explorer</h1>
              <p className="text-xs">Учусь в Худжанде, создаю полезные нейро-сервисы и сайты с ИИ.</p>
              <div>
                <strong>Мои интересы:</strong>
                <ul className="list-disc pl-5 text-xs">
                  <li>Вайб-кодинг на TypeScript</li>
                  <li>Робототехника</li>
                  <li>Шахматы</li>
                </ul>
              </div>
              <button className="px-2 py-1 bg-gray-200 border border-gray-500 text-xs cursor-not-allowed">
                Отправить сигнал (Клик)
              </button>
              <p className="text-[10px] text-gray-500 italic mt-2">
                [Без CSS и JS: просто сухой поток текста сверху вниз]
              </p>
            </div>
          ) : (
            /* HOLOGRAM (HTML + CSS + JS) */
            <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 rounded-2xl border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 text-left space-y-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                  ONLINE PORTFOLIO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  Амир · AI Explorer
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Учусь в Худжанде, создаю полезные нейро-сервисы и сайты с ИИ.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
                  ⚡ Вайб-кодинг
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/50 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
                  🤖 Робототехника
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/50 border border-purple-800/60 text-purple-300 text-xs font-semibold">
                  ♟️ Шахматы
                </span>
              </div>
              <button
                onClick={() => alert('⚡ [JS REACTION]: Сигнал успешно отправлен в Центр Управления!')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" /> Отправить сигнал (Кликни меня!)
              </button>
            </div>
          )}
        </div>

        {/* Voting interaction */}
        <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300">
            🗳️ Быстрое голосование: Что, по-вашему, превратило серый текст в стильную голограмму?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'css', label: 'CSS (Цвет, сетка, градиент)' },
              { id: 'js', label: 'JS (Реакция на нажатие)' },
              { id: 'both', label: 'CSS + JS вместе на базе HTML' }
            ].map(vote => (
              <button
                key={vote.id}
                onClick={() => setUserVote(vote.id)}
                className={`p-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                  userVote === vote.id
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {vote.label}
              </button>
            ))}
          </div>
          {userVote && (
            <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Точно! HTML несёт структуру, CSS делает её красивой, а JS оживляет взаимодействие.
            </div>
          )}
        </div>
      </div>

      {/* LEVEL 2 — РАСШИФРОВКА: 4 Карточки */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Уровень 2 · Расшифровка (10–25 мин)
            </div>
            <h3 className="text-xl font-black text-white">
              3 Отдела Центра Управления: Карточки-шпаргалки
            </h3>
          </div>
        </div>

        {/* Card 1: 3 Departments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-orange-950/30 to-slate-950 border border-orange-700/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-900/40 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-lg">
              🧱
            </div>
            <div>
              <div className="text-xs font-mono text-orange-400 uppercase font-bold">Отдел 1</div>
              <h4 className="text-base font-bold text-white">HTML — Структура</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Транспортный слой. Везёт грузы: заголовки, текст, картинки, кнопки. Без него нечего показывать!
            </p>
            <div className="text-[11px] font-mono text-orange-300/80 bg-orange-950/40 p-2 rounded-lg border border-orange-900/50">
              «Что на странице есть»
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/30 to-slate-950 border border-blue-700/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg">
              🎨
            </div>
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase font-bold">Отдел 2</div>
              <h4 className="text-base font-bold text-white">CSS — Стиль</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Слой визуализации. Красит, расставляет отступы, делает скругления и превращает голые данные в голограмму.
            </p>
            <div className="text-[11px] font-mono text-blue-300/80 bg-blue-950/40 p-2 rounded-lg border border-blue-900/50">
              «Как это выглядит»
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-yellow-950/30 to-slate-950 border border-yellow-700/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-900/40 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-lg">
              ⚡
            </div>
            <div>
              <div className="text-xs font-mono text-yellow-400 uppercase font-bold">Отдел 3</div>
              <h4 className="text-base font-bold text-white">JS — Поведение</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Система живого мониторинга. Реагирует на действия: клик, наведение, ввод текста, смена темы.
            </p>
            <div className="text-[11px] font-mono text-yellow-300/80 bg-yellow-950/40 p-2 rounded-lg border border-yellow-900/50">
              «Что происходит при клике»
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Tag Anatomy */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" /> Карточка 2 — Анатомия HTML-тега
              </h4>
              <p className="text-xs text-slate-400">
                Каждый тег — это контейнер: <code className="text-cyan-300 font-mono">&lt;тег&gt;содержимое&lt;/тег&gt;</code>
              </p>
            </div>
          </div>

          {/* Interactive Tag Selector */}
          <div className="flex flex-wrap gap-2 pt-1">
            {(['h1', 'p', 'img', 'button', 'div'] as const).map(tagKey => (
              <button
                key={tagKey}
                onClick={() => setSelectedTag(tagKey)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTag === tagKey
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                &lt;{tagKey}&gt;
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase">
                {tagsInfo[selectedTag].name}
              </div>
              <p className="text-xs text-slate-300">{tagsInfo[selectedTag].desc}</p>
              <div className="text-xs font-mono text-amber-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                {tagsInfo[selectedTag].example}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-slate-800 flex flex-col justify-center items-center">
              <div className="text-[10px] uppercase font-mono text-slate-500 mb-2">
                Результат в браузере:
              </div>
              {tagsInfo[selectedTag].preview}
            </div>
          </div>
        </div>

        {/* Card 3: CSS Anatomy */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-400" /> Карточка 3 — Анатомия CSS-правила
          </h4>
          <p className="text-xs text-slate-400">
            Формула стиля: <code className="text-blue-300 font-mono">селектор &#123; свойство: значение; &#125;</code>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
              <div className="text-xs font-mono text-cyan-400 font-bold">color</div>
              <div className="text-[11px] text-slate-400">Цвет текста (cyan, #fff, red)</div>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
              <div className="text-xs font-mono text-blue-400 font-bold">background</div>
              <div className="text-[11px] text-slate-400">Цвет фона или градиент</div>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
              <div className="text-xs font-mono text-indigo-400 font-bold">font-size</div>
              <div className="text-[11px] text-slate-400">Размер букв (16px, 24px)</div>
            </div>
            <div className="p-3 rounded-xl bg-black/50 border border-slate-800">
              <div className="text-xs font-mono text-purple-400 font-bold">border-radius</div>
              <div className="text-[11px] text-slate-400">Скругление углов (8px, 24px)</div>
            </div>
          </div>
        </div>

        {/* Card 4: Antipatterns */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
          <div className="text-xs font-bold text-rose-400 uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Чего избегать при вайб-кодинге сайта:
          </div>
          <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
            <li><strong>«Сделай сразу всё и сложно»</strong> — пиши промпт по шагам, иначе баги трудно отыскать.</li>
            <li><strong>Публиковать сайт не глядя</strong> — проверяй на ошибки и отсутствие персональных данных.</li>
            <li><strong>Смешивать промпт в кучу</strong> — четко разделяй структуру (HTML), оформление (CSS) и кнопки (JS).</li>
            <li><strong>Не проверять на мобильном</strong> — более половины людей откроют твой сайт с телефона.</li>
          </ul>
        </div>
      </div>

      {/* LEVEL 3 — РОЛЕВАЯ ИГРА: Дизайнер и Разработчик */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-indigo-900/40 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Уровень 3 · Ролевая игра (25–40 мин)
            </div>
            <h3 className="text-xl font-black text-white">
              Тренажёр: «Дизайнер и Разработчик»
            </h3>
            <p className="text-xs text-slate-400">
              Переведи пожелание Дизайнера на язык точного кода (HTML / CSS / JS) и заработай +25 ОП!
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-bold">
            Раунд {Math.min(roleplayTurn + 1, 3)} из 3
          </span>
        </div>

        {!roleplayDone ? (
          <div className="p-5 rounded-2xl bg-black/60 border border-slate-800 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-900/40 border border-pink-500/40 flex items-center justify-center text-pink-300 font-bold shrink-0">
                🎨
              </div>
              <div>
                <div className="text-xs font-bold text-pink-400 uppercase">Дизайнер говорит:</div>
                <div className="text-sm text-white font-medium italic mt-0.5">
                  {roleplayScenarios[roleplayTurn].designer}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase">
                Твой ответ как Разработчика:
              </div>
              {roleplayScenarios[roleplayTurn].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (opt.correct) setRoleplayScore(roleplayScore + 1);
                    if (roleplayTurn < 2) {
                      setRoleplayTurn(roleplayTurn + 1);
                    } else {
                      setRoleplayDone(true);
                    }
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/60 text-xs font-mono text-slate-200 transition-all flex items-center justify-between"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
            <div className="text-2xl">🎉</div>
            <h4 className="text-lg font-bold text-white">Ролевая игра пройдена!</h4>
            <p className="text-xs text-slate-300">
              Правильных переводов: {roleplayScore} из 3. Ты свободно понимаешь язык дизайнеров и разработчиков!
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-500/50">
              +25 ОП ЗА РОЛЕВУЮ ИГРУ НАЧИСЛЕНО
            </div>
          </div>
        )}
      </div>

      {/* ШПАРГАЛКА И СЛОВАРЬ (Копирование в 1 клик) */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            📄 Шпаргалка Урока 6 (на один экран)
          </h3>
          <button
            onClick={copyCheatSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-xs font-medium text-cyan-300 hover:bg-cyan-900 transition-all"
          >
            {copiedCheat ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCheat ? 'Скопировано!' : 'Копировать шпаргалку'}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-xs font-mono text-cyan-300/90 whitespace-pre-wrap leading-relaxed overflow-x-auto">
{`3 ОТДЕЛА:  HTML (структура) · CSS (стиль) · JS (поведение)

HTML-ТЕГ:  <тег>содержимое</тег>

CSS-ПРАВИЛО:  селектор { свойство: значение; }

JS:  реагирует на клики, наведения и другие действия

ПРАВИЛО ПРОВЕРКИ:  всегда смотри сайт и на широком, и на узком экране

ЧЕСТНОСТЬ:  никаких личных данных на сайте (адрес, телефон, школа)

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным`}
        </pre>
      </div>
    </div>
  );
};
