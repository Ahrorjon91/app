import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  FolderOpen,
  Wand2
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson15LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [labSteps, setLabSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const toggleStep = (stepKey: keyof typeof labSteps) => {
    const next = { ...labSteps, [stepKey]: !labSteps[stepKey] };
    setLabSteps(next);
    if (next.step1 && next.step2 && next.step3 && next.step4) {
      if (markLabTaskCompleted) markLabTaskCompleted('11', 't11_1');
    }
  };

  // Custom Prompt Builder in Russian & English
  const [selectedColor, setSelectedColor] = useState(
    'роскошный глубокий цвет Бургунди с матовым задним стеклом в тон корпусу (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy)'
  );
  const [selectedTilt, setSelectedTilt] = useState(
    'Кадр 1 (Start Frame): строго по центру в нижних 40% кадра с лёгким 3D-наклоном назад'
  );
  const [selectedBg, setSelectedBg] = useState(
    'абсолютно чистый чёрный (#000000) без текстур, без дыма и без реквизита'
  );
  const [copiedCustom, setCopiedCustom] = useState(false);

  const customRussianPrompt = `Создай ультра-премиальное продуктовое изображение смартфона нового поколения iPhone 18 Pro (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy).
Расположение и траектория в кадре: ${selectedTilt}.
Материал и цвет корпуса: ${selectedColor}, со студийными градиентными переливами от рубиново-винного к глубокому бургунди и микротекстурой матового металла.
Камера: массивное прямоугольное плато с тремя крупными тёмными сапфировыми объективами в треугольной раскладке Pro, датчиком LiDAR и вспышкой.
Фон: ${selectedBg}.
Стиль: презентация флагмана уровня Apple, фотореалистичный 3D-рендер, 8K-резкость.`;

  const handleCopyCustom = () => {
    navigator.clipboard.writeText(customRussianPrompt);
    setCopiedCustom(true);
    addReward(15, '🎨 Персональный промпт Burgundy для Whisk скопирован! (+15 ОП)');
    setTimeout(() => setCopiedCustom(false), 2500);
  };

  // Asset Checklist before Lesson 12
  const [startFrameUrl, setStartFrameUrl] = useState('');
  const [endFrameUrl, setEndFrameUrl] = useState('');
  const [gifOrFolderReady, setGifOrFolderReady] = useState(true);
  const [labSubmitted, setLabSubmitted] = useState(false);

  const handleSubmitLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (labSubmitted) return;
    setLabSubmitted(true);
    addReward(150, '🏆 Урок 11: Лабораторная работа по 3D-ассетам Burgundy выполнена! (+150 ОП)');
    if (markLabTaskCompleted) {
      markLabTaskCompleted('11', 't11_1');
      markLabTaskCompleted('11', 't11_2');
      markLabTaskCompleted('11', 't11_3');
    }
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            💻 ЛАБОРАТОРНАЯ РАБОТА УРОКА 11 • ПРАКТИКА $1M АССЕТОВ (ОТЛИЧАЕТСЯ ОТ ЛЕКЦИИ!)
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Награда: +150 ОП
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          ПРАКТИКА: Генерируем собственную расцветку из «Four Gorgeous Finishes» (Desert / Black / Natural / Burgundy) и кастомное движение вправо
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          На лекции Ментор показал эталонный пример в цвете <strong>Burgundy</strong>. В Лабораторной работе твоя задача — <strong>самостоятельно собрать в конструкторе промптов</strong> одно из четырёх покрытий{' '}
          <strong className="text-rose-300">
            «Choose from four gorgeous finishes with color-matched back glass»
          </strong>
          , сделать Remix в Google Whisk, сгенерировать видео смещения из центра в правую часть кадра в Google Flow и нарезать секвенцию в Ezgif!
        </p>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">1. На Лекции (Показал Ментор)</span>
            <div className="text-sm font-black text-white">Базовый разбор конвейера Burgundy</div>
            <p className="text-xs text-slate-400">Ментор продемонстрировал связку Pinterest → Whisk → Flow → Ezgif на готовых промптах.</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/30 border-2 border-rose-500/50 space-y-1">
            <span className="text-[11px] font-mono uppercase text-rose-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-rose-200">Кастомный Remix 4 покрытий + Нарезка кадров</div>
            <p className="text-xs text-slate-200">Собираешь свой промпт в конструкторе, создаёшь Start/End кадры (Центр → Вправо) и готовишь ZIP/папку.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-amber-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-amber-200">Собственный 3D-Продукт Мечты (AirPods / MacBook / Cybertruck)</div>
            <p className="text-xs text-slate-300">Дома ты сам придумаешь промпты Кадра 1 и Кадра 2 для любого гаджета на фоне #000000!</p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Lab Checkboxes */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-rose-400" />
          <span>Чек-лист выполнения лабораторной работы (4 шага):</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'step1' as const,
              title: 'Шаг 1: Референс на Pinterest + Google Whisk',
              desc: 'Найти референс iPhone 18 Pro shown in Burgundy с матовым задним стеклом в тон (color-matched back glass) на pinterest.com и открыть Google Whisk.',
              url: 'https://www.pinterest.com/'
            },
            {
              key: 'step2' as const,
              title: 'Шаг 2: Сгенерировать Кадр 1 (Центр) и Кадр 2 (Справа)',
              desc: 'Создать Кадр 1 по центру снизу (40% высоты) и Кадр 2 со смещением из центра в правую часть кадра (75–80% высоты) в цвете Burgundy на фоне #000000.',
              url: 'https://labs.google/fx/ru/tools/whisk'
            },
            {
              key: 'step3' as const,
              title: 'Шаг 3: Создать AI-видео в Google Flow (Из центра → Вправо)',
              desc: 'Загрузить Start Frame (по центру) и End Frame (справа) в flow.google.com, сгенерировать плавный подъём и смещение смартфона вправо и скачать MP4.',
              url: 'https://flow.google.com/'
            },
            {
              key: 'step4' as const,
              title: 'Шаг 4: Конвертировать видео на Ezgif.com',
              desc: 'Перейти на ezgif.com/video-to-gif, преобразовать видео в GIF / секвенцию кадров и подготовить папку для загрузки в AI Studio.',
              url: 'https://ezgif.com/video-to-gif'
            }
          ].map(item => {
            const checked = labSteps[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleStep(item.key)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  checked
                    ? 'bg-emerald-950/30 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-white">{item.title}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        checked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {checked ? '✓ Выполнено' : 'Отметить'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300"
                >
                  <span>Открыть инструмент</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Russian Prompt Customizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              🛠️ КОНСТРУКТОР ПРОМПТА НА РУССКОМ ЯЗЫКЕ (FOUR GORGEOUS FINISHES)
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              Настрой покрытие и позицию (Центр → Правая сторона) для Google Whisk
            </h3>
          </div>
          <Wand2 className="w-6 h-6 text-cyan-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block">1. Выбери одно из 4 покрытий со стеклом в тон:</label>
            <select
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="роскошный глубокий цвет Бургунди с матовым задним стеклом в тон корпусу (Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy)">
                🍷 Бургунди (iPhone 18 Pro shown in Burgundy — Эталон урока)
              </option>
              <option value="тёмный титан со стеклом в тон корпусу (Black Titanium with color-matched back glass)">
                ⚫ Тёмный титан (Black Titanium + color-matched glass)
              </option>
              <option value="натуральный титан со стеклом в тон корпусу (Natural Titanium with color-matched back glass)">
                ⚪ Натуральный титан (Natural Titanium + color-matched glass)
              </option>
              <option value="пустынный титан со стеклом в тон корпусу (Desert Titanium with color-matched back glass)">
                🟡 Пустынный титан (Desert Titanium + color-matched glass)
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block">2. Выбери кадр траектории (Центр → Справа):</label>
            <select
              value={selectedTilt}
              onChange={e => setSelectedTilt(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="Кадр 1 (Start Frame): строго по центру в нижних 40% кадра с лёгким 3D-наклоном назад">
                📐 Кадр 1 (Start Frame): По центру снизу (40% + 3D-наклон)
              </option>
              <option value="Кадр 2 (End Frame): смещён из центра в правую часть кадра (on the right side), полный вертикальный вид сзади (75–80% высоты кадра)">
                📱 Кадр 2 (End Frame): Справа во весь рост (из центра вправо, 75–80%)
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block">3. Студийный фон:</label>
            <select
              value={selectedBg}
              onChange={e => setSelectedBg(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="абсолютно чистый чёрный (#000000) без текстур, без дыма и без реквизита">
                ⬛ Чистый чёрный #000000 (Идеально для скролл-сайта)
              </option>
              <option value="тёмно-графитовый студийный фон (#0A0A0C) с мягким винно-рубиновым контровым светом Burgundy">
                🌑 Тёмный графит #0A0A0C с контровым светом Burgundy
              </option>
            </select>
          </div>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-cyan-200 font-mono whitespace-pre-wrap leading-relaxed">
          {customRussianPrompt}
        </pre>

        <div className="flex justify-end">
          <button
            onClick={handleCopyCustom}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            {copiedCustom ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCustom ? 'Скопировано в буфер!' : 'Скопировать русский промпт'}</span>
          </button>
        </div>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={15}
        labId={15}
        labTitle="Лабораторная работа #15: Кастомный Remix покрытия iPhone 18 Pro (Four Gorgeous Finishes) + Видео Центр → Вправо"
        rewardExp={100}
      />
    </div>
  );
};
