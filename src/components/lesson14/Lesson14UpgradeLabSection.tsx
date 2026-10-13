import React, { useState } from 'react';
import {
  Github,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Smartphone,
  Monitor,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson14UpgradeLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Sandbox state for editing an imported website & integrating TELEGRAM (not WhatsApp!)
  const [heroHeading, setHeroHeading] = useState('Флагманская экосистема iPhone 18 Pro & Watch Ultra 4');
  const [heroSubtext, setHeroSubtext] = useState(
    'Официальный шоурум с мгновенной связью через Telegram Deep Link за 10 секунд.'
  );
  const [heroPolished, setHeroPolished] = useState(true);
  const [servicesPolished, setServicesPolished] = useState(true);
  const [tgUsername, setTgUsername] = useState('apple_vip_advisor');
  const [tgPrefill, setTgPrefill] = useState('Здравствуйте! Хочу заказать консультацию по iPhone 18 Pro Burgundy с вашего сайта.');
  const [showFloatingTg, setShowFloatingTg] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const toggleStep = (stepId: number) => {
    const next = { ...completedSteps, [stepId]: !completedSteps[stepId] };
    setCompletedSteps(next);
    const doneCount = Object.values(next).filter(Boolean).length;
    if (doneCount === 4 && !completedSteps[stepId]) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      addReward(60, '🛠️ Лабораторная работа Урока 14 (GitHub Import + Telegram Integration) выполнена на 100% (+60 ОП)!');
    }
  };

  const handleCopy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cleanUsername = tgUsername.replace(/^@/, '').trim() || 'apple_vip_advisor';
  const liveTgUrl = `https://t.me/${cleanUsername}?text=${encodeURIComponent(tgPrefill)}`;

  const labTasks = [
    {
      id: 1,
      tag: 'ЗАДАНИЕ 1 (0/4) • ИМПОРТ И АУДИТ ИЗ GITHUB',
      title: 'Импортируй свой сайт из GitHub в Google AI Studio и запусти Import Audit',
      desc: 'Открой Google AI Studio Build → Нажми «Add files (+)» → «Import from GitHub» → выбери репозиторий своего сайта. Не меняя дизайн, отправь промпт первичного аудита и получи статус READY TO EDIT.',
      prompt: `Проведи полный технический аудит этого импортированного проекта, НИЧЕГО НЕ МЕНЯЯ в коде: фреймворк, основные страницы и маршруты, навигацию, компоненты, стили, адаптивность, формы, внешние интеграции, имена переменных окружения (только имена) и команду сборки. Проверь, собирается ли проект, и выведи вердикт: Статус импорта: READY TO EDIT или NEEDS ATTENTION.`
    },
    {
      id: 2,
      tag: 'ЗАДАНИЕ 2 (0/5) • ТОЧЕЧНЫЕ ПРАВКИ (HERO + SERVICES)',
      title: 'Выполни точечные улучшения по одной секции за шаг через Annotation Mode',
      desc: 'Выдели сначала Hero-секцию (или отправь точечный промпт), затем обнови текст заголовка и улучши читаемость карточек в секции Услуг / Характеристик, не затрагивая остальные части сайта.',
      prompt: `Улучши ТОЛЬКО Hero-секцию: усиль визуальную иерархию, отступы, типографику и заметность главной кнопки (CTA) на ПК и мобильных экранах. Сохрани всю бизнес-информацию, ссылки и рабочую логику. Не трогай никакие другие секции сайта.`
    },
    {
      id: 3,
      tag: 'ЗАДАНИЕ 3 (0/3) • САМОСТОЯТЕЛЬНАЯ ИНТЕГРАЦИЯ TELEGRAM (ВМЕСТО WHATSAPP!)',
      title: 'Подключи официальную кнопку Telegram Deep Link (https://t.me/username?text=...)',
      desc: 'На лекции Ментор показал пример с WhatsApp. Теперь на практике в Лабораторной работе интегрируй кнопку быстрой связи через TELEGRAM с предзаполненным сообщением и компактным плавающим виджетом!',
      prompt: `Добавь на сайт официальную кнопку быстрой связи через Telegram (${liveTgUrl}) с корректно закодированным предзаполненным текстом сообщения. Подключи её к кнопке связи в Hero/Контактах и добавь компактную плавающую кнопку Telegram в правом нижнем углу (рядом или вместо других виджетов), которая не перекрывает текст и меню на мобильных экранах. Проверь сборку (npm run build) и перечисли обновлённые компоненты.`
    },
    {
      id: 4,
      tag: 'ЗАДАНИЕ 4 (0/5) • TELEGRAM PRODUCTION-АУДИТ И ПРОВЕРКА НА ТЕЛЕФОНЕ',
      title: 'Проведи финальный аудит кнопки Telegram, протестируй на смартфоне и сохрани обновления в GitHub / Vercel',
      desc: 'Убедись, что ссылка https://t.me/... открывает приложение Telegram с готовым текстом на русском языке, нет сломанных ссылок, и запушь обновлённый проект.',
      prompt: `Проведи финальный Production Audit интеграции Telegram на сайте: проверь, что все кнопки Telegram используют верный @username без лишних символов, предзаполненный текст (?text=...) корректно закодирован через encodeURIComponent, ссылки открываются в новой вкладке (target="_blank" rel="noopener noreferrer") и плавающая кнопка не закрывает контент на экране 375px.`
    }
  ];

  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Lab Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-sky-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase">
            🧪 ЛАБОРАТОРНАЯ РАБОТА УРОКА 14 • ПРОГРЕСС: {completedCount}/4 (НОВЫЙ КЕЙС: TELEGRAM!)
          </span>
          <span className="text-xs font-mono text-slate-400">
            GitHub ➔ AI Studio Audit ➔ Targeted Edit ➔ Telegram Deep Link Live
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Практикум: Импорт сайта из GitHub, точечный апгрейд и интеграция Telegram!
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          <strong>Никакого копирования лекции вслепую!</strong> На лекции Ментор объяснил принцип работы на примере <em>WhatsApp</em>. А в Лабораторной работе твоя задача — применить полученные знания и <strong>подключить на импортированный сайт мгновенную связь через Telegram (<code>https://t.me/username?text=...</code>)</strong>!
        </p>

        {/* Матрица различий: Лекция vs Лабораторная vs ДЗ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">1. На Лекции (Объяснил Ментор)</span>
            <div className="text-sm font-black text-white">Интеграция WhatsApp (wa.me)</div>
            <p className="text-xs text-slate-400">Ментор показал, как импортировать сайт из GitHub, сделать Audit и подключить WhatsApp.</p>
          </div>
          <div className="p-4 rounded-2xl bg-sky-950/35 border-2 border-sky-500/60 space-y-1">
            <span className="text-[11px] font-mono uppercase text-sky-300 font-bold">2. Сейчас в Лабораторной (Делаешь ты)</span>
            <div className="text-sm font-black text-sky-200">Интеграция Telegram (t.me/user?text=...)</div>
            <p className="text-xs text-slate-200">Сам настраиваешь Deep-ссылку в Telegram с предзаполненным текстом и плавающей кнопкой.</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-1">
            <span className="text-[11px] font-mono uppercase text-amber-300 font-bold">3. В Домашнем задании (Vibe Code)</span>
            <div className="text-sm font-black text-amber-200">Функция Прямого Звонка (Call `tel:`) + Виджет Обратного Звонка</div>
            <p className="text-xs text-slate-300">Дома ты сам продумаешь и завайбкодишь кнопку мгновенного звонка со смартфона и модалку Call-Back!</p>
          </div>
        </div>
      </div>

      {/* Interactive Live Preview Simulator (Telegram Edition) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase text-sky-400">
              ЖИВОЙ СИМУЛЯТОР ТОЧЕЧНЫХ ПРАВОК И ИНТЕГРАЦИИ TELEGRAM
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Песочница Лабораторной: протестируй апгрейд Hero, карточек и кнопку Telegram
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                previewDevice === 'desktop'
                  ? 'bg-sky-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> ПК (Desktop)
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                previewDevice === 'mobile'
                  ? 'bg-sky-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Смартфон (Mobile)
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-black uppercase text-emerald-400">1. Точечное обновление контента и секций</div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Заголовок Hero (Update Specific Content):</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Подзаголовок Hero:</label>
              <input
                type="text"
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setHeroPolished(!heroPolished)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  heroPolished ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {heroPolished ? '✓ Hero иерархия улучшена' : 'Обычный Hero'}
              </button>
              <button
                onClick={() => setServicesPolished(!servicesPolished)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  servicesPolished ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {servicesPolished ? '✓ Карточки Услуг улучшены' : 'Обычные услуги'}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-3">
            <div className="text-xs font-black uppercase text-sky-400">2. Настройка Telegram Deep Link (Твоя задача в Лабе!)</div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Telegram Username (без @ или с @):</label>
              <input
                type="text"
                value={tgUsername}
                onChange={(e) => setTgUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-sky-300"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Предзаполненное сообщение для Telegram:</label>
              <input
                type="text"
                value={tgPrefill}
                onChange={(e) => setTgPrefill(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/20 text-[11px] font-mono text-sky-300 break-all">
              Сформированный URL: {liveTgUrl}
            </div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setShowFloatingTg(!showFloatingTg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  showFloatingTg ? 'bg-sky-500/20 border border-sky-400 text-sky-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {showFloatingTg ? '✓ Плавающая кнопка Telegram включена' : 'Плавающая кнопка скрыта'}
              </button>
              <span className="text-[11px] font-mono text-emerald-400">Статус: READY TO EDIT</span>
            </div>
          </div>
        </div>

        {/* Simulated Website Canvas */}
        <div className="flex justify-center">
          <div
            className={`relative overflow-hidden rounded-3xl bg-slate-950 border-2 border-slate-800 p-6 sm:p-8 space-y-6 transition-all ${
              previewDevice === 'mobile' ? 'max-w-[375px] w-full' : 'w-full'
            }`}
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
              <span className="font-black text-white tracking-wider">IMPORTED SITE PREVIEW (TELEGRAM LAB)</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px]">
                Import status: READY TO EDIT
              </span>
            </div>

            {/* Hero Section Preview */}
            <div
              className={`rounded-2xl transition-all ${
                heroPolished
                  ? 'p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/30 space-y-3'
                  : 'p-3 bg-slate-900/40 space-y-1'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
                Официальный каталог • Telegram Instant Chat
              </span>
              <h4 className={`${heroPolished ? 'text-xl sm:text-2xl font-black' : 'text-base font-bold'} text-white`}>
                {heroHeading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{heroSubtext}</p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={liveTgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs inline-flex items-center gap-2 transition-all shadow-lg shadow-sky-500/25"
                >
                  <Send className="w-4 h-4" />
                  Написать в Telegram (@{cleanUsername})
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-slate-400 font-mono">
                  t.me/{cleanUsername}
                </span>
              </div>
            </div>

            {/* Services Section Preview */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-400">Секция услуг и преимуществ</div>
              <div className={`grid gap-3 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {[
                  { title: 'Гарантия Apple 1 год', desc: 'Официальная проверка серийного номера перед покупкой.' },
                  { title: 'Экспресс-доставка за 2 часа', desc: 'Курьер доставит iPhone 18 Pro Burgundy лично в руки.' },
                  { title: 'Trade-In оценка в Telegram', desc: 'Пришлите фото старого смартфона в наш Telegram-чат.' }
                ].map((srv, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border ${
                      servicesPolished
                        ? 'p-4 bg-slate-900/90 border-slate-700/80 space-y-1.5'
                        : 'p-2 bg-slate-900/30 border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-black text-white">{srv.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Telegram Button */}
            {showFloatingTg && (
              <div className="flex justify-end pt-2">
                <a
                  href={liveTgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram Чат</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Step-by-Step Lab Tasks */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white">Пошаговые задания Лабораторной работы (4 этапа)</h3>
        {labTasks.map((t) => {
          const isDone = !!completedSteps[t.id];
          return (
            <div
              key={t.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/50'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-sky-400">
                    {t.tag}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">{t.title}</h4>
                </div>
                <button
                  onClick={() => toggleStep(t.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isDone ? 'Выполнено ✓' : 'Отметить выполненным'}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t.desc}</p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-300">Промпт для Google AI Studio:</span>
                  <button
                    onClick={() => handleCopy(`lab-${t.id}`, t.prompt)}
                    className="px-3 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === `lab-${t.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === `lab-${t.id}` ? 'Скопировано!' : 'Копировать промпт'}
                  </button>
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">{t.prompt}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В СИСТЕМУ */}
      <InlineLabSubmission
        lessonId={14}
        labId={14}
        labTitle="Лабораторная работа #14: Импорт сайта из GitHub + Точечный апгрейд секций + Интеграция Telegram Deep Link"
        rewardExp={100}
      />
    </div>
  );
};
