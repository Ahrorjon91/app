import React, { useState } from 'react';
import {
  Watch,
  Smartphone,
  ShieldCheck,
  Bug,
  Film,
  Sparkles,
  Rocket,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  ArrowRight,
  Lock,
  Layers,
  Terminal,
  RefreshCw,
  Globe
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson12LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Interactive Multi-Page Switcher Simulator (iPhone 18 Pro <-> Apple Watch Ultra 4)
  const [activeProductPage, setActiveProductPage] = useState<'iphone' | 'watch'>('watch');
  const [scrollPos, setScrollPos] = useState<number>(45);
  const [videoHeroEnabled, setVideoHeroEnabled] = useState<boolean>(true);
  const [securityHardened, setSecurityHardened] = useState<boolean>(true);

  // Interactive Deployment Trap: GitHub Raw HTML/CSS/JS vs Vercel Build
  const [deployMode, setDeployMode] = useState<'github_raw_fail' | 'vercel_pro'>('github_raw_fail');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    addReward(10, '📋 Промпт Урока 13 скопирован (+10 ОП)!');
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const watchMasterPromptRu = `Добавь в наш существующий флагманский проект iPhone 18 Pro Burgundy (из Урока 12) вторую полноценную страницу — Apple Watch Ultra 4 (Black Titanium / Hermès Ultra Orange) и объедини их в единую экосистему Apple:

1. ГЛОБАЛЬНЫЙ ПЕРЕКЛЮЧАТЕЛЬ ПРОДУКТОВ (TOP NAVBAR SWITCHER):
- В верхней стеклянной панели навигации (backdrop-blur-xl bg-black/75) создай мгновенный переключатель между страницами без перезагрузки:
  • 📱 «iPhone 18 Pro (Burgundy)»
  • ⌚ «Apple Watch Ultra 4 (Titanium)»
- При переключении сбрасывай позицию скролла наверх (window.scrollTo({ top: 0, behavior: 'smooth' })) и очищай неактивные слушатели событий.

2. СТРАНИЦА APPLE WATCH ULTRA 4 (DESIGN.MD + ВИДЕО + SCROLL REVEAL):
- Используй спецификацию DESIGN.md с https://styles.refero.design для Apple Watch Ultra.
- Hero-секция: кинематографичное фоновое видео (<video autoplay muted loop playsinline poster="...">) в титановом корпусе 49 мм (Grade 5 Titanium) + массивная типографика «ULTRA 4» шрифтом Google Fonts Archivo Black позади часов.
- Информационный скроллинг (Information Scrolling & Scrollytelling): при прокрутке (0% -> 100%) часы плавно поворачиваются и смещаются вправо, а слева по очереди всплывают 4 стеклянные карточки телеметрии:
  1) «Корпус 49 мм из аэрокосмического титана Grade 5 и плоское сапфировое стекло»
  2) «Дисплей Always-On Retina LTPO3 — яркость 3000 нит под прямым солнцем»
  3) «Двухчастотный высокоточный GPS (L1 + L5), глубиномер до 40 м и сирена 86 дБ»
  4) «До 72 часов автономной работы в режиме экспедиции»

3. ИСПРАВЛЕНИЕ БАГОВ (BUG FIXES) И БЕЗОПАСНОСТЬ (SECURITY HARDENING):
- Исправь утечки памяти (удаляй window.removeEventListener('scroll', ...) в useEffect cleanup при переключении вкладок).
- Исправь баг наложения z-index между страницей iPhone и Watch и устрани горизонтальный скролл (overflow-x: hidden).
- Безопасность: добавь Content-Security-Policy (CSP), атрибут rel="noopener noreferrer" для всех внешних ссылок, валидацию форм предзаказа (защита от XSS) и убедись, что в клиентском коде нет приватных ключей.`;

  const watchWhiskPromptEn = `Create an ultra-premium macro product hero shot of Apple Watch Ultra 4 in Satin Black Grade 5 Titanium with an International Orange Action Button and Titanium Milanese Loop.
The watch is centered horizontally in the lower half of the frame on Start Frame, then smoothly glides to the right quadrant on End Frame, leaving clean negative space on the left for telemetry spec cards.
The display glows at 3000 nits showing the Modular Ultra night-mode compass face.
Pure absolute black background (#000000), studio rim lighting, razor-sharp sapphire crystal reflections.`;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#070709] via-[#18110B] to-[#070709] border-2 border-orange-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/50 text-orange-200 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Watch className="w-4 h-4 text-orange-400" />
            УРОК 13 • MULTI-PAGE ECOSYSTEM + APPLE WATCH ULTRA 4 + VERCEL DEPLOY
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-emerald-300 text-xs font-mono font-bold">
            ⏱ 90 МИН • ПРОЕКТ НА $1 000 000 (ЧАСТЬ 3)
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          ⌚ Вторая страница <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">Apple Watch Ultra 4</span>, баг-фиксы, безопасность и реальный деплой: ловушка GitHub vs мощь Vercel!
        </h2>

        <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-4xl">
          В Уроках 11 и 12 мы создали флагманскую страницу <strong>iPhone 18 Pro (Burgundy)</strong>. Теперь превратим одностраничник в настоящую <strong>мультистраничную экосистему Apple</strong>: добавим вторую страницу <strong>Apple Watch Ultra 4</strong>, настроим мгновенное переключение между ними, обновим информационный скроллинг с видео и анимацией, проведём аудит багов и безопасности, а в финале пройдём через главное испытание каждого веб-разработчика: <strong>почему наш проект из AI Studio ломается при обычном HTML/CSS/JS деплое на GitHub и как Vercel решает это за 60 секунд!</strong>
        </p>

        {/* 6 Pillars of Lesson 13 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {[
            { icon: '⌚', title: '1. Watch Ultra 4', sub: 'Вторая страница + DESIGN.md' },
            { icon: '🔄', title: '2. Интеграция', sub: 'Переключатель iPhone ⇄ Watch' },
            { icon: '🎬', title: '3. Видео + Скролл', sub: 'Телеметрия и анимация' },
            { icon: '🐞', title: '4. Фикс багов', sub: 'Память, z-index, адаптив' },
            { icon: '🛡️', title: '5. Безопасность', sub: 'CSP, XSS-защита, .env' },
            { icon: '▲', title: '6. GitHub → Vercel', sub: 'Крах HTML vs облачный билд' }
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-2xl bg-black/60 border border-orange-500/25 space-y-1">
              <div className="text-xl">{item.icon}</div>
              <div className="text-xs font-black text-white">{item.title}</div>
              <div className="text-[11px] text-slate-400 leading-snug">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: INTEGRATING SECOND PAGE (IPHONE 18 PRO <-> APPLE WATCH ULTRA 4) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-orange-500/30 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              ЧАСТЬ 1 • ИНТЕГРАЦИЯ ВТОРОЙ СТРАНИЦЫ И ПЕРЕКЛЮЧЕНИЕ (MULTI-PAGE ROUTING)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-orange-400" />
              Соединяем iPhone 18 Pro (Burgundy) и Apple Watch Ultra 4 (Titanium)
            </h3>
          </div>
          <a
            href="https://styles.refero.design"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/40 text-orange-200 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <span>Скачать DESIGN.md для Watch на styles.refero.design</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Настоящий сайт за $1 000 000 никогда не ограничивается одним товаром. Когда покупатель изучил <strong>iPhone 18 Pro в цвете Burgundy</strong>, в шапке сайта его ждёт переключатель на <strong>Apple Watch Ultra 4</strong>. Попробуй живой симулятор двухстраничной экосистемы ниже: переключай продукты, крути ползунок информационного скролла и включай видео-фон!
        </p>

        {/* LIVE ECOSYSTEM SIMULATOR */}
        <div className="rounded-3xl bg-[#000000] border-2 border-slate-800 overflow-hidden shadow-2xl">
          {/* Top Apple-style Glass Navbar with Switcher */}
          <div className="px-4 sm:px-6 py-3.5 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-white font-black tracking-tight text-sm flex items-center gap-1.5">
                 <span className="text-slate-400 font-normal text-xs">Flagship Store</span>
              </span>
              {securityHardened && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> CSP & XSS Protected
                </span>
              )}
            </div>

            {/* Page Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-white/10">
              <button
                onClick={() => setActiveProductPage('iphone')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeProductPage === 'iphone'
                    ? 'bg-gradient-to-r from-[#881337] to-[#BE123C] text-white shadow-lg shadow-rose-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone 18 Pro · Burgundy</span>
              </button>
              <button
                onClick={() => setActiveProductPage('watch')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeProductPage === 'watch'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Watch className="w-3.5 h-3.5" />
                <span>Apple Watch Ultra 4 · NEW</span>
              </button>
            </div>

            {/* Simulator Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVideoHeroEnabled(!videoHeroEnabled)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
                  videoHeroEnabled
                    ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                }`}
              >
                {videoHeroEnabled ? '🎬 Hero Video: ON' : '🎬 Hero Video: OFF'}
              </button>
            </div>
          </div>

          {/* Interactive Viewport */}
          <div className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden px-6">
            {/* Ambient background glow depending on active product */}
            <div
              className="absolute inset-0 transition-all duration-700 pointer-events-none"
              style={{
                background:
                  activeProductPage === 'iphone'
                    ? 'radial-gradient(circle at 70% 50%, rgba(159,18,57,0.28), transparent 65%)'
                    : 'radial-gradient(circle at 70% 50%, rgba(249,115,22,0.26), transparent 65%)'
              }}
            />

            {/* Layer 1: Giant Background Typography */}
            <div
              className="select-none pointer-events-none font-black tracking-tighter text-center transition-all duration-500"
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: activeProductPage === 'iphone' ? 'clamp(4.5rem, 15vw, 10rem)' : 'clamp(3.8rem, 13vw, 8.5rem)',
                opacity: Math.max(0.14, 1 - scrollPos / 125),
                transform: `scale(${1 + scrollPos * 0.002})`,
                background:
                  activeProductPage === 'iphone'
                    ? 'linear-gradient(180deg, #FFFFFF 0%, #FDA4AF 45%, #4C0519 100%)'
                    : 'linear-gradient(180deg, #FFFFFF 0%, #FDBA74 45%, #7C2D12 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {activeProductPage === 'iphone' ? 'PRO' : 'ULTRA 4'}
            </div>

            {/* Layer 2: Left Telemetry / Information Scrolling Cards */}
            <div
              className="absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 z-30 max-w-[240px] sm:max-w-xs p-4 rounded-2xl bg-zinc-950/85 border border-white/15 backdrop-blur-xl transition-all duration-300 space-y-2"
              style={{
                opacity: scrollPos > 20 ? 1 : 0.25,
                transform: `translate(${scrollPos > 20 ? 0 : -15}px, -50%)`
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                    activeProductPage === 'iphone' ? 'text-rose-400' : 'text-orange-400'
                  }`}
                >
                  {activeProductPage === 'iphone'
                    ? 'iPhone 18 Pro · Burgundy'
                    : 'Apple Watch Ultra 4 · 49mm Titanium'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Scroll: {scrollPos}%</span>
              </div>

              {activeProductPage === 'iphone' ? (
                <>
                  <div className="text-xs sm:text-sm font-black text-white leading-snug">
                    {scrollPos < 45 && 'Выберите одно из четырёх великолепных покрытий с задним стеклом в тон корпусу.'}
                    {scrollPos >= 45 && scrollPos < 75 && 'Камера 48 МП Fusion + 5x тетрапризма и чип A20 Pro (2 нм).'}
                    {scrollPos >= 75 && 'iPhone 18 Pro в цвете Бургунди — готов к переключению на Watch Ultra 4!'}
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Choose from four gorgeous finishes with color-matched back glass.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xs sm:text-sm font-black text-white leading-snug">
                    {scrollPos < 35 && 'Корпус 49 мм из аэрокосмического титана Grade 5 и плоское сапфировое стекло.'}
                    {scrollPos >= 35 && scrollPos < 70 && 'Дисплей Always-On Retina LTPO3 — рекордная яркость 3000 нит и ночной режим.'}
                    {scrollPos >= 70 && 'До 72 часов работы, двухчастотный GPS (L1+L5), глубиномер 40м и сирена 86 дБ.'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-mono">
                      3000 NITS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">
                      DEPTH 40M
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                      72H BATTERY
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Layer 3: Product Device gliding from Center (0%) to Right (100%) */}
            {activeProductPage === 'iphone' ? (
              <div
                className="absolute z-20 w-40 sm:w-48 h-64 sm:h-72 rounded-[34px] border-2 border-rose-300/40 shadow-[0_0_60px_rgba(159,18,57,0.5)] p-3 flex flex-col justify-between transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, #4C0519 0%, #881337 50%, #1F030B 100%)',
                  left: `${50 + (scrollPos / 100) * 24}%`,
                  bottom: `${-10 + (scrollPos / 100) * 22}%`,
                  transform: `translateX(-50%) perspective(900px) rotateX(${14 - (scrollPos / 100) * 14}deg) rotateY(${-8 + (scrollPos / 100) * 4}deg)`
                }}
              >
                <div className="w-20 h-20 rounded-2xl bg-black/50 border border-rose-300/30 p-2 grid grid-cols-2 gap-1.5">
                  <div className="rounded-full bg-zinc-950 border-2 border-rose-300/70" />
                  <div className="rounded-full bg-zinc-950 border-2 border-rose-300/70" />
                  <div className="rounded-full bg-zinc-950 border-2 border-rose-300/70" />
                  <div className="w-3 h-3 rounded-full bg-rose-200/80 self-center justify-self-center" />
                </div>
                <div className="text-center font-mono text-[10px] text-rose-100/90 uppercase tracking-widest">
                  iPhone 18 Pro · Burgundy
                </div>
              </div>
            ) : (
              <div
                className="absolute z-20 w-44 sm:w-52 h-56 sm:h-64 rounded-[42px] border-4 border-zinc-500/80 shadow-[0_0_70px_rgba(249,115,22,0.45)] p-3 flex flex-col justify-between transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, #27272A 0%, #09090B 55%, #18181B 100%)',
                  left: `${50 + (scrollPos / 100) * 24}%`,
                  bottom: `${-5 + (scrollPos / 100) * 20}%`,
                  transform: `translateX(-50%) perspective(900px) rotateX(${16 - (scrollPos / 100) * 16}deg) rotateY(${-10 + (scrollPos / 100) * 5}deg)`
                }}
              >
                {/* International Orange Action Button & Crown */}
                <div className="absolute -left-2 top-16 w-1.5 h-10 rounded-l-md bg-orange-500 shadow-[0_0_12px_#f97316]" />
                <div className="absolute -right-2.5 top-12 w-2.5 h-9 rounded-r-md bg-zinc-400 border-y-2 border-orange-500" />

                {/* Watch Face */}
                <div className="w-full h-full rounded-[32px] bg-black border border-orange-500/40 p-3 flex flex-col justify-between relative overflow-hidden">
                  {videoHeroEnabled && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-cyan-500/15 animate-pulse pointer-events-none" />
                  )}
                  <div className="flex items-center justify-between text-[9px] font-mono text-orange-400">
                    <span>WAYPOINT</span>
                    <span>3000 NITS</span>
                  </div>
                  <div className="text-center my-auto">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                      09:41<span className="text-orange-400 text-xs">:58</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      ELEV 4,280M · GPS L1+L5
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>DEPTH 0M</span>
                    <span className="text-orange-300 font-bold">ULTRA 4</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scrollbar Controller */}
          <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs font-mono text-orange-300 font-bold shrink-0">
              Ползунок Information Scrolling ({scrollPos}%):
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={scrollPos}
              onChange={(e) => setScrollPos(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: BUG FIXING, SECURITY HARDENING & VIDEO/ANIMATION POLISH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-cyan-500/30 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              ЧАСТЬ 2 • ФИКС БАГОВ, БЕЗОПАСНОСТЬ (SECURITY) И ОБНОВЛЕНИЕ ВИДЕО-СКРОЛЛА
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              Чек-лист инженера перед деплоем двухстраничного сайта
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Когда мы объединяем две тяжёлые 3D-страницы (<strong>iPhone 18 Pro</strong> + <strong>Apple Watch Ultra 4</strong>) с видео и скролл-анимацией, возникают реальные инженерные задачи. Вот 4 главных блока, которые мы просим Google AI Studio исправить и защитить:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
              <Bug className="w-4 h-4 text-rose-400" />
              <span>1. Исправление багов переключения (Bug Fixing)</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
              <li><strong>Сброс скролла (Scroll Reset):</strong> при переходе с iPhone на Watch на 80% прокрутки вторая страница не должна открываться внизу — вызываем <code className="text-rose-200">window.scrollTo(0, 0)</code>.</li>
              <li><strong>Очистка слушателей (Memory Leak Fix):</strong> удаляем <code className="text-rose-200">window.removeEventListener('scroll', handler)</code> при размонтировании неактивной вкладки.</li>
              <li><strong>Конфликт слоёв (Z-Index & Overflow):</strong> фиксируем <code className="text-rose-200">overflow-x: hidden</code>, чтобы устройство при смещении вправо не создавало горизонтальную полосу прокрутки.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2. Укрепление безопасности (Security Hardening)</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
              <li><strong>Никаких секретов в коде:</strong> проверяем, чтобы в исходниках на GitHub не было API-ключей (используем <code className="text-emerald-200">.env</code> и <code className="text-emerald-200">.gitignore</code>).</li>
              <li><strong>Защита внешних ссылок:</strong> ко всем ссылкам добавляем <code className="text-emerald-200">rel="noopener noreferrer"</code> против угона вкладки (<code className="text-emerald-200">window.opener</code>).</li>
              <li><strong>Защита форм и CSP:</strong> санитизация поля предзаказа от XSS-инъекций и безопасная загрузка медиа только по HTTPS.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
              <Film className="w-4 h-4 text-amber-400" />
              <span>3. Добавление видео и плавной анимации</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
              <li><strong>Hero-видео без тормозов:</strong> тег <code className="text-amber-200">&lt;video autoplay muted loop playsinline poster="..."&gt;</code> с хостингом на Cloudinary или из папки ассетов.</li>
              <li><strong>60 FPS анимация:</strong> используем аппаратное ускорение <code className="text-amber-200">transform: translate3d()</code> и <code className="text-amber-200">requestAnimationFrame</code>.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>4. Обновление Information Scrolling</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
              <li><strong>Синхронизация карточек:</strong> на 0–25% скролла показываем титановый корпус 49 мм, на 25–60% — экран 3000 нит, на 60–100% — глубиномер 40 м и батарею 72 ч.</li>
              <li><strong>Индикатор чтения:</strong> верхний прогресс-бар показывает точную глубину погружения по странице.</li>
            </ul>
          </div>
        </div>

        {/* Copyable Master Prompt for AI Studio */}
        <div className="p-5 rounded-2xl bg-black/80 border border-orange-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-orange-300">
              🇷🇺 Мастер-Промпт для Google AI Studio (Добавление Apple Watch Ultra 4 + Переключатель + Фикс багов + Security):
            </span>
            <button
              onClick={() => handleCopy('watch-master', watchMasterPromptRu)}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedPrompt === 'watch-master' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt === 'watch-master' ? 'Скопировано!' : 'Скопировать Мастер-Промпт'}</span>
            </button>
          </div>
          <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-72 overflow-y-auto">
            {watchMasterPromptRu}
          </pre>
        </div>

        {/* Copyable Whisk Prompt for Watch Ultra 4 */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300">
              🎨 Промпт для Google Whisk / Flow (Apple Watch Ultra 4 — Start Center → End Right):
            </span>
            <button
              onClick={() => handleCopy('watch-whisk', watchWhiskPromptEn)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedPrompt === 'watch-whisk' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt === 'watch-whisk' ? 'Скопировано!' : 'Copy Whisk Prompt'}</span>
            </button>
          </div>
          <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
            {watchWhiskPromptEn}
          </pre>
        </div>
      </div>

      {/* SECTION 3: PEDAGOGICAL CHALLENGE — WHY GITHUB PAGES FAILS ON REACT/TSX AND HOW VERCEL SOLVES IT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/50 via-slate-900 to-emerald-950/40 border-2 border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              🔥 ГЛАВНЫЙ ПЕДАГОГИЧЕСКИЙ ЭКСПЕРИМЕНТ УРОКА 13
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white pt-1">
              Сначала попробуй задеплоить как обычный HTML/CSS/JS на GitHub... и посмотри, почему он упадёт!
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          В первых уроках мы публиковали простые сайты из одного файла <code className="text-amber-300">index.html</code> прямо через GitHub Pages. Но наш проект из Google AI Studio (iPhone 18 Pro + Apple Watch Ultra 4) написан на <strong>React + TypeScript (`.tsx`) + Vite + Tailwind</strong>! Давай проведём эксперимент: что произойдёт, если просто включить GitHub Pages для репозитория, и почему на помощь приходит <strong>Vercel</strong>.
        </p>

        {/* Interactive Toggle: Step A (Fail on GitHub) vs Step B (Success on Vercel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setDeployMode('github_raw_fail')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              deployMode === 'github_raw_fail'
                ? 'bg-rose-950/70 border-rose-500 text-white shadow-lg shadow-rose-950/50'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">ЭТАП 1 • ЛОВУШКА НОВИЧКА</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-base font-black mt-1">❌ Попытка 1: Деплой в GitHub как HTML/CSS/JS</div>
            <div className="text-xs text-slate-300 mt-1">
              Белый экран, ошибка <code className="text-rose-300">MIME type text/plain</code> на <code className="text-rose-300">/src/main.tsx</code> и полное замешательство!
            </div>
          </button>

          <button
            onClick={() => setDeployMode('vercel_pro')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              deployMode === 'vercel_pro'
                ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">ЭТАП 2 • ПРОФЕССИОНАЛЬНОЕ РЕШЕНИЕ</span>
              <Rocket className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-base font-black mt-1">✅ Попытка 2: Облачная сборка через GitHub + Vercel</div>
            <div className="text-xs text-slate-300 mt-1">
              Vercel сам запускает <code className="text-emerald-300">npm install && npm run build</code> и превращает <code className="text-emerald-300">.tsx</code> в быстрый браузерный бандл!
            </div>
          </button>
        </div>

        {deployMode === 'github_raw_fail' ? (
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-rose-500/50 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-black text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Почему GitHub Pages показывает пустой белый экран и ошибки в консоли?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Когда ученик пушит проект из Google AI Studio на GitHub и включает <strong>Settings → Pages → Deploy from a branch (main)</strong>, как он делал для простого HTML/CSS/JS сайта, браузер открывает <code className="text-rose-300">index.html</code> и видит строчку:
              <code className="block mt-2 p-2.5 rounded-xl bg-black text-rose-300 font-mono text-xs">
                &lt;script type="module" src="/src/main.tsx"&gt;&lt;/script&gt;
              </code>
            </p>
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 font-mono text-xs text-rose-200 space-y-1.5">
              <div className="font-bold text-rose-400">🔴 Chrome DevTools Console (Ошибки у ученика):</div>
              <div>❌ Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain" (/src/main.tsx).</div>
              <div>❌ GET https://username.github.io/src/main.tsx 404 (Not Found)</div>
              <div>❌ Uncaught SyntaxError: Cannot use import statement outside a module</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
              💡 <strong>Вывод после разбора ошибки:</strong> Обычный браузер понимает только готовый <strong>HTML, CSS и чистый JS</strong>. Он НЕ умеет напрямую читать файлы <strong>React (`.tsx`), TypeScript и `package.json`</strong>! Чтобы сайт заработал, нужен <strong>сборщик (Builder — Vite)</strong>, который скомпилирует проект в папку <code className="text-white font-mono">dist/</code>. И именно это автоматически делает <strong>Vercel</strong>!
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Пошаговый GUIDE: Деплой проекта через GitHub + Vercel за 60 секунд</span>
              </div>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5"
              >
                <span>Открыть Vercel.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                {
                  step: 'STEP 1 — Save to GitHub',
                  title: 'Сохраняем из AI Studio в GitHub',
                  desc: 'В Google AI Studio нажимаем иконку GitHub → создаём репозиторий apple-flagship-ultra (с двумя страницами iPhone 18 Pro + Watch Ultra 4) и делаем Push.'
                },
                {
                  step: 'STEP 2 — Login to Vercel',
                  title: 'Входим на https://vercel.com через GitHub',
                  desc: 'Нажимаем «Continue with GitHub». Никаких сложных настроек серверов — Vercel мгновенно видит все твои репозитории.'
                },
                {
                  step: 'STEP 3 — Add New Project',
                  title: 'Импортируем репозиторий',
                  desc: 'Нажимаем «Add New... → Project» и выбираем наш репозиторий apple-flagship-ultra → нажимаем кнопку Import.'
                },
                {
                  step: 'STEP 4 — Auto-Detect Vite',
                  title: 'Проверка настроек сборки (Build Settings)',
                  desc: 'Vercel автоматически определяет Framework Preset: Vite, команду сборки `npm run build` и выходную папку `dist`.'
                },
                {
                  step: 'STEP 5 — Environment Variables',
                  title: 'Безопасные секреты (при необходимости)',
                  desc: 'Во вкладке Environment Variables можно безопасно добавить переменные окружения, не раскрывая их в коде GitHub.'
                },
                {
                  step: 'STEP 6 — Click DEPLOY! 🚀',
                  title: 'Публикация и живой домен .vercel.app',
                  desc: 'Через 40 секунд сборка завершается салютом! Ты получаешь быстрый HTTPS-сайт вида https://apple-flagship-ultra.vercel.app.'
                }
              ].map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-mono font-bold text-emerald-400">{s.step}</div>
                  <div className="text-sm font-black text-white">{s.title}</div>
                  <p className="text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 flex items-center justify-between gap-3 flex-wrap">
              <span>
                🔄 <strong>Магия CI/CD Автодеплоя:</strong> Теперь при любом новом коммите в GitHub из AI Studio платформа Vercel автоматически пересобирает проект и обновляет живой сайт без единой ошибки!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
