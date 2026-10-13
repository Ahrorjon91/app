import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  Send,
  ExternalLink,
  FileCode2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson16LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  // 8 Checklist items of $1,000,000 Apple-Style Website (DESIGN.md + Burgundy + Center to Right)
  const [dodItems, setDodItems] = useState({
    designMdFile: true,
    pureBlack: true,
    archivoFont: false,
    stickyNavbar: false,
    scrollCanvas: false,
    cameraCard: false,
    titaniumCard: false,
    mobileReady: false
  });

  const totalDodChecked = Object.values(dodItems).filter(Boolean).length;
  const isAllDodDone = totalDodChecked === 8;

  const toggleDodItem = (key: keyof typeof dodItems) => {
    const next = { ...dodItems, [key]: !dodItems[key] };
    setDodItems(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 8 && !isAllDodDone) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(50, '🎉 Все 8 критериев сайта по DESIGN.md (iPhone 18 Pro Burgundy) выполнены! (+50 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('12', 't12_1');
    }
  };

  // Publish & Live URL
  const [githubUrl, setGithubUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim() || isPublished) return;
    setIsPublished(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
    addReward(100, '🚀 Флагманский сайт iPhone 18 Pro Burgundy (по DESIGN.md) опубликован! (+100 ОП)');
    if (markLabTaskCompleted) {
      markLabTaskCompleted('12', 't12_2');
      markLabTaskCompleted('12', 't12_3');
    }
  };

  const [copiedQuickPrompt, setCopiedQuickPrompt] = useState(false);
  const quickFixPromptRu = `Проверь мой сайт iPhone 18 Pro на 100% соответствие прикреплённому файлу DESIGN.md (с https://styles.refero.design):
1. Используй фирменную тему покрытий: "Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy" (цвет Бургунди с матовым задним стеклом в тон корпусу).
2. Подключи шрифт Google Fonts Archivo (weight 900) для гигантской надписи "PRO" позади смартфона (z-index: 1).
3. При прокрутке контейнера 450vh смартфон (z-index: 2) на чисто чёрном фоне #000000 должен начинать движение по центру снизу (нижние 40% экрана) и плавно смещаться из центра в правую часть экрана (from center into right side), вставая справа во весь рост (75–80% высоты).
4. В освободившейся левой части экрана плавно показывай стеклянные карточки характеристик по стилям DESIGN.md и кнопки "Предзаказ" (#9F1239 Burgundy) и "Смотреть презентацию".`;

  const handleCopyQuickPrompt = () => {
    navigator.clipboard.writeText(quickFixPromptRu);
    setCopiedQuickPrompt(true);
    setTimeout(() => setCopiedQuickPrompt(false), 2500);
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/40 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            💻 ЛАБОРАТОРНАЯ РАБОТА УРОКА 12 • DESIGN.MD + СБОРКА САЙТА НА $1 000 000
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Закрыто пунктов: {totalDodChecked} / 8
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Сборка лендинга iPhone 18 Pro (Burgundy) по файлу DESIGN.md из styles.refero.design
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          Возьми файл <code>DESIGN.md</code> на{' '}
          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 underline hover:text-amber-300 font-bold"
          >
            https://styles.refero.design
          </a>
          , загрузи его вместе с папкой кадров из Урока 11 (движение смартфона в цвете <strong>Burgundy</strong> из центра в правую сторону) в Google AI Studio и создай сайт со 100% попаданием в дизайн Apple!
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black inline-flex items-center gap-2 hover:bg-amber-500/30 transition-all"
          >
            <FileCode2 className="w-4 h-4" />
            <span>Открыть https://styles.refero.design (получить DESIGN.md)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-black inline-flex items-center gap-2 hover:bg-emerald-500/30 transition-all"
          >
            <span>Открыть Google AI Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">1. На Лекции (Показал Ментор)</span>
            <div className="text-sm font-black text-white">Hero Canvas + Шрифт Archivo «PRO»</div>
            <p className="text-xs text-slate-400">Ментор разобрал структуру DESIGN.md и механику скролла Hero (Центр → Вправо).</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/30 border-2 border-rose-500/50 space-y-1">
            <span className="text-[11px] font-mono uppercase text-rose-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-rose-200">Bento-сетка 4 карточек + Переключатель 4 покрытий</div>
            <p className="text-xs text-slate-200">Собираешь секцию выбора 4 покрытий (Burgundy, Black, Natural, Desert) и Bento-сетку с подсветкой рамок.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-amber-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-amber-200">Калькулятор Trade-In + Конфигуратор памяти (256GB–2TB)</div>
            <p className="text-xs text-slate-300">Самостоятельный вайб-кодинг интерактивного конфигуратора покупки iPhone 18 Pro с пересчётом цены.</p>
          </div>
        </div>
      </div>

      {/* 8-Point $1M Website Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-rose-400" />
            <span>Чек-лист готовности сайта на $1 000 000 (8 обязательных деталей):</span>
          </h3>
          <span className="text-xs font-mono text-rose-300">{totalDodChecked}/8 выполнено</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {[
            {
              key: 'designMdFile' as const,
              title: '1. Подключён файл DESIGN.md с https://styles.refero.design',
              desc: 'Файл дизайн-системы Apple iPhone 18 Pro прикреплён в AI Studio для идеального совпадения шрифтов, отступов и карточек.'
            },
            {
              key: 'pureBlack' as const,
              title: '2. Чистый чёрный фон (#000000)',
              desc: 'Фон страницы #000000 бесшовно сливается с фоном рендера смартфона Burgundy без видимых рамок.'
            },
            {
              key: 'archivoFont' as const,
              title: '3. Гигантская надпись «PRO» шрифтом Archivo',
              desc: 'Подключён Google Font Archivo (900 Black) для металлического заголовка PRO на слое z-index: 1.'
            },
            {
              key: 'stickyNavbar' as const,
              title: '4. Стеклянная панель навигации (Glass Navbar)',
              desc: 'Закреплённое меню с размытием backdrop-filter: blur(16px) и кнопкой «Предзаказ» в цвете Burgundy (#9F1239).'
            },
            {
              key: 'scrollCanvas' as const,
              title: '5. Покадровая анимация: из Центра → Вправо',
              desc: 'При прокрутке смартфон (z-index: 2) плавно поднимается из центра снизу и смещается в правую часть экрана.'
            },
            {
              key: 'cameraCard' as const,
              title: '6. Карточка «Система камер Pro» слева (25%–45%)',
              desc: 'Слева от смартфона плавно всплывает матовая карточка с описанием 3 сапфировых линз и LiDAR.'
            },
            {
              key: 'titaniumCard' as const,
              title: '7. Карточка «Four Gorgeous Finishes • Burgundy» (50%–70%)',
              desc: 'Слева появляется слоган: «Choose from four gorgeous finishes with color-matched back glass. iPhone 18 Pro shown in Burgundy».'
            },
            {
              key: 'mobileReady' as const,
              title: '8. Предзагрузка 0%–100% и мобильная адаптивность',
              desc: 'Стильный лоадер предзагрузки кадров и аккуратная вёрстка на экранах смартфонов и ПК.'
            }
          ].map(item => {
            const done = dodItems[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleDodItem(item.key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  done
                    ? 'bg-emerald-950/30 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                    done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {done ? '✓' : '☐'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Polish Prompt in Russian */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-white">
            🛠️ Быстрый промпт для проверки DESIGN.md, цвета Burgundy и движения из центра вправо:
          </h3>
          <button
            onClick={handleCopyQuickPrompt}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copiedQuickPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedQuickPrompt ? 'Скопировано!' : 'Копировать промпт доработки'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-cyan-200 font-mono whitespace-pre-wrap">
          {quickFixPromptRu}
        </pre>
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={16}
        labId={16}
        labTitle="Лабораторная работа #16: Сборка сайта iPhone 18 Pro (Burgundy) по DESIGN.md + Bento Grid + 4 Finishes Switcher"
        rewardExp={100}
      />
    </div>
  );
};
