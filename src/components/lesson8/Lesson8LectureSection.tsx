import React, { useState } from 'react';
import {
  Rocket,
  Globe,
  GitBranch,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Server,
  Video,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Layers,
  HardDrive,
  Play,
  FileCode,
  FolderOpen,
  CloudUpload,
  Lock,
  Monitor,
  Smartphone,
  RefreshCw,
  Award,
  Camera
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson8LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'github' | 'direct' | 'cloudinary' | 'linux'>('github');
  const [selectedWebServer, setSelectedWebServer] = useState<'nginx' | 'apache'>('nginx');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [checkedStep3Items, setCheckedStep3Items] = useState<Record<string, boolean>>({
    buttons: true,
    navigation: true,
    responsive: true,
    console: false,
    images: false
  });
  const [liveCelebrationClicked, setLiveCelebrationClicked] = useState(false);

  const handleCopy = (id: string, text: string, rewardMsg?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (rewardMsg) {
      addReward(15, rewardMsg);
    }
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleStep3Check = (key: string) => {
    const next = { ...checkedStep3Items, [key]: !checkedStep3Items[key] };
    setCheckedStep3Items(next);
    if (Object.values(next).every(Boolean)) {
      addReward(25, '✅ STEP 3 — Test пройден! Все 5 пунктов предполётной проверки зелёные! (+25 ОП)');
    }
  };

  const handleCelebrateLive = () => {
    if (!liveCelebrationClicked) {
      setLiveCelebrationClicked(true);
      addReward(30, '🌍 Эмоциональный момент: «Мой сайт LIVE в интернете!» (+30 ОП)');
    }
  };

  const step3Items = [
    {
      key: 'buttons',
      label: 'buttons (Кнопки и CTA)',
      desc: 'Все кнопки Order Now, Demo Drive и меню кликаются, имеют hover-эффект и не ведут в никуда.'
    },
    {
      key: 'navigation',
      label: 'navigation (Навигация)',
      desc: 'Переходы по 6 секциям (Vehicles, Energy, Charging, Semi, Discover, Shop) плавно скроллят страницу.'
    },
    {
      key: 'responsive',
      label: 'responsive (Адаптивность)',
      desc: 'На экране смартфона (375px) и десктопа (1440px) карточки не наезжают друг на друга и нет горизонтального скролла.'
    },
    {
      key: 'console',
      label: 'console (Чистая консоль F12)',
      desc: 'В DevTools → Console (F12) нет красных ошибок ReferenceError, SyntaxError или 404 Not Found.'
    },
    {
      key: 'images',
      label: 'images (Все картинки на месте)',
      desc: 'Каждое фото Tesla Model X и иконки загружаются по HTTPS и имеют корректный атрибут alt.'
    }
  ];

  const sevenStepsGuide = [
    {
      step: 'STEP 1',
      title: 'Open Google AI Studio',
      titleRu: 'Открыть Google AI Studio',
      action: 'Перейди на https://aistudio.google.com под своим Google-аккаунтом.',
      detail: 'Убедись, что в соседней вкладке браузера ты уже вошёл в свой заранее зарегистрированный аккаунт на GitHub.com.',
      badge: 'Старт'
    },
    {
      step: 'STEP 2',
      title: 'Open project',
      titleRu: 'Выбрать проект (Lesson 4 / Tesla Model X)',
      action: 'Открой свой сохранённый веб-проект из предыдущих уроков (лендинг Tesla Model X).',
      detail: 'В каталоге проектов AI Studio выбери апплет, который мы спроектировали в Google Stitch и собрали на HTML + CSS + JS.',
      badge: 'Выбор проекта'
    },
    {
      step: 'STEP 3',
      title: 'Test (Предполётная ревизия 5 пунктов)',
      titleRu: 'Проверить: buttons, navigation, responsive, console, images',
      action: 'Никогда не публикуй сырой сайт без проверки! Протестируй все 5 точек контроля в превью.',
      detail: 'Кнопки кликабельны, меню работает, на мобильном виде порядок, консоль F12 без ошибок, картинки открываются.',
      badge: 'Контроль качества'
    },
    {
      step: 'STEP 4',
      title: 'Save to GitHub',
      titleRu: 'Подключить аккаунт GitHub (Connect GitHub account)',
      action: 'В верхней панели Google AI Studio нажми иконку GitHub («Save to GitHub» / «Export to GitHub»).',
      detail: 'При первом нажатии появится окно авторизации OAuth: нажми «Authorize Google AI Studio», чтобы связать свой профиль GitHub.com.',
      badge: 'Интеграция'
    },
    {
      step: 'STEP 5',
      title: 'Create repository',
      titleRu: 'Создать новый репозиторий (например: TeslaModelX)',
      action: 'В поле Repository Name введи чистое название без пробелов: TeslaModelX',
      detail: 'Выбери видимость Public (чтобы учитель и друзья могли увидеть код и развернуть сайт) и добавь краткое описание.',
      badge: 'Репозиторий'
    },
    {
      step: 'STEP 6',
      title: 'Push project',
      titleRu: 'Отправить код в облако (Push project)',
      action: 'Нажми кнопку «Push / Commit to GitHub» с сообщением коммита: "Initial live release of TeslaModelX".',
      detail: 'Google AI Studio автоматически упакует все твои файлы и за 3–5 секунд перешлёт их на серверы GitHub.',
      badge: 'Git Push'
    },
    {
      step: 'STEP 7',
      title: 'Open GitHub',
      titleRu: 'Открыть GitHub и проверить структуру проекта',
      action: 'Перейди по появившейся ссылке https://github.com/ТВОЙ_ЛОГИН/TeslaModelX',
      detail: 'Ученик должен своими глазами увидеть в репозитории промышленную структуру: README, папку src, package.json, index.html и остальные файлы!',
      badge: 'Проверка в облаке'
    }
  ];

  const cloudinaryPrompt = `Update the Hero section of my Tesla Model X website:
1. Replace the static hero background image with an HTML5 <video autoplay loop muted playsinline class="hero-bg-video"> element.
2. Use this Cloudinary video URL as the source: https://res.cloudinary.com/demo/video/upload/v1/tesla_model_x_hero.mp4
3. Add a subtle dark gradient overlay so the white Hero typography ("Model X", specs, and "Order Now" / "Demo Drive" CTA buttons) remains 100% readable.
4. Ensure smooth responsive behavior on mobile screens without breaking any existing sections.`;

  const nginxConfigCode = `# 1. Установка Nginx на Ubuntu / Debian Linux-сервер
sudo apt update && sudo apt install nginx -y

# 2. Создание папки для сайта и загрузка файлов напрямую с ПК (без GitHub!)
sudo mkdir -p /var/www/teslamodelx
# На своём локальном ПК в терминале выполни загрузку по SSH (SCP):
# scp -r ./tesla-model-x/* root@203.0.113.50:/var/www/teslamodelx/

# 3. Права доступа для веб-сервера
sudo chown -R www-data:www-data /var/www/teslamodelx
sudo chmod -R 755 /var/www/teslamodelx

# 4. Создание конфигурации виртуального хоста Nginx
sudo nano /etc/nginx/sites-available/teslamodelx

# --- ВСТАВЬ ЭТОТ БЛОК В ФАЙЛ /etc/nginx/sites-available/teslamodelx ---
server {
    listen 80;
    listen [::]:80;
    server_name teslax.yourdomain.com www.teslax.yourdomain.com;

    root /var/www/teslamodelx;
    index index.html;

    # Оптимизация раздачи статики и видео
    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(css|js|jpg|jpeg|png|webp|svg|mp4)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
# ----------------------------------------------------------------------

# 5. Активация сайта, проверка синтаксиса и перезапуск Nginx
sudo ln -s /etc/nginx/sites-available/teslamodelx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 6. Установка бесплатного SSL-сертификата (HTTPS замочек Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d teslax.yourdomain.com -d www.teslax.yourdomain.com`;

  const apacheConfigCode = `# 1. Установка Apache2 на Ubuntu / Debian Linux-сервер
sudo apt update && sudo apt install apache2 -y

# 2. Создание директории сайта и загрузка файлов с ПК по SCP (без GitHub!)
sudo mkdir -p /var/www/teslamodelx
# На локальном ПК выполни:
# scp -r ./tesla-model-x/* root@203.0.113.50:/var/www/teslamodelx/

# 3. Назначение прав владельца www-data
sudo chown -R www-data:www-data /var/www/teslamodelx
sudo chmod -R 755 /var/www/teslamodelx

# 4. Создание файла VirtualHost в Apache2
sudo nano /etc/apache2/sites-available/teslamodelx.conf

# --- ВСТАВЬ ЭТОТ БЛОК В /etc/apache2/sites-available/teslamodelx.conf ---
<VirtualHost *:80>
    ServerAdmin admin@teslax.yourdomain.com
    ServerName teslax.yourdomain.com
    ServerAlias www.teslax.yourdomain.com
    DocumentRoot /var/www/teslamodelx

    <Directory /var/www/teslamodelx>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/teslamodelx_error.log
    CustomLog \${APACHE_LOG_DIR}/teslamodelx_access.log combined
</VirtualHost>
# ------------------------------------------------------------------------

# 5. Включение модуля rewrite, активация сайта и перезагрузка Apache2
sudo a2enmod rewrite
sudo a2ensite teslamodelx.conf
sudo apache2ctl configtest
sudo systemctl reload apache2

# 6. Подключение HTTPS через Certbot для Apache
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d teslax.yourdomain.com -d www.teslax.yourdomain.com`;

  return (
    <div className="space-y-8 text-slate-200">
      {/* 1. EMOTIONAL HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-emerald-950/60 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-emerald-400" />
            Урок 8 • 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            Важно: заранее зарегистрируйся на GitHub.com!
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
          🌍 Сегодня ты впервые увидишь{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400">
            свой сайт в настоящем интернете!
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl mb-6">
          Это один из самых важных и эмоциональных уроков всего курса. В Уроке 5 ты создал премиальный UX/UI-дизайн в{' '}
          <strong className="text-white">Google Stitch</strong>, в Уроках 6 и 7 превратил его в рабочий код{' '}
          <strong className="text-white">HTML + CSS + JavaScript</strong> в <strong className="text-white">Google AI Studio</strong>.
          Но пока сайт живёт только внутри твоего компьютера или черновика — мир о нём не знает. Сегодня ты станешь{' '}
          <strong className="text-emerald-300">Publisher (Издателем)</strong>: сохранишь проект в <strong>GitHub</strong>,
          опубликуешь его по публичной ссылке, обновишь Hero-секцию живым видео через <strong>Cloudinary</strong> и даже узнаешь, как
          системные инженеры разворачивают сайты напрямую на боевом <strong>Linux-сервере (Nginx / Apache + Real DNS)</strong>!
        </p>

        {/* Pre-requisite Alert Box + Emotional Trigger Button */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="lg:col-span-2 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400">
              <GitBranch className="w-4 h-4" />
              Обязательная подготовка перед стартом (Pre-flight Check)
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              1) Заранее зарегистрируйся на{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline font-bold hover:text-emerald-300"
              >
                https://github.com
              </a>{' '}
              и подтверди почту. <br />
              2) Подготовь бесплатный аккаунт на{' '}
              <a
                href="https://cloudinary.com/users/login"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline font-bold hover:text-cyan-300"
              >
                https://cloudinary.com/users/login
              </a>{' '}
              для загрузки видео в Hero-секцию.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <button
              onClick={handleCelebrateLive}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-lg ${
                liveCelebrationClicked
                  ? 'bg-emerald-600/30 border border-emerald-400/50 text-emerald-200'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 cursor-pointer'
              }`}
            >
              <Globe className="w-4 h-4" />
              {liveCelebrationClicked ? '🌍 Я готов вывести сайт в LIVE! (+30 ОП)' : 'Нажми: «Я готов вывести свой сайт в интернет!»'}
            </button>
          </div>
        </div>
      </div>

      {/* 1.5 LIVE ONLINE PROJECT DEMONSTRATION PREVIEW (BEFORE STARTING LESSON) */}
      <div className="rounded-3xl bg-slate-900/95 border border-emerald-500/40 overflow-hidden shadow-2xl">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/60 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Демонстрация готового онлайн-проекта перед стартом урока
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white flex flex-wrap items-center gap-2">
              <span>🌍 Посмотри, как выглядит опубликованный на GitHub сайт Tesla LIVE:</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Прежде чем начать пошаговую публикацию, изучи живой пример проекта, развёрнутого в интернете через GitHub Pages:{' '}
              <a
                href="https://devopsprotech.github.io/Tesla/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-mono font-bold inline-flex items-center gap-1"
              >
                https://devopsprotech.github.io/Tesla/
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              . Именно такой рабочий онлайн-результат с публичным URL получaешь ты в конце этого урока!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="inline-flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
              <button
                onClick={() => setPreviewViewport('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  previewViewport === 'desktop'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setPreviewViewport('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  previewViewport === 'mobile'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile (390px)
              </button>
            </div>

            <button
              onClick={() => setIframeKey(prev => prev + 1)}
              title="Обновить превью"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Обновить
            </button>

            <a
              href="https://devopsprotech.github.io/Tesla/"
              target="_blank"
              rel="noreferrer"
              onClick={() => addReward(20, '🌍 Открыт живой демо-проект https://devopsprotech.github.io/Tesla/ (+20 ОП)')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-black shadow-lg transition-all"
            >
              <span>Открыть на весь экран</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Browser Mockup Frame */}
        <div className="bg-slate-950 p-3 sm:p-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-inner">
            {/* Browser Top Address Bar */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[11px] font-bold text-emerald-400 uppercase tracking-wider hidden sm:inline">
                  LIVE DEMO • GITHUB PAGES
                </span>
              </div>

              <div className="flex-1 max-w-xl mx-auto flex items-center justify-between gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
                <div className="flex items-center gap-2 truncate">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">https://devopsprotech.github.io/Tesla/</span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      'demo-live-url',
                      'https://devopsprotech.github.io/Tesla/',
                      '📋 Ссылка на демо-проект https://devopsprotech.github.io/Tesla/ скопирована! (+15 ОП)'
                    )
                  }
                  className="text-slate-400 hover:text-emerald-300 inline-flex items-center gap-1 text-[11px] shrink-0 cursor-pointer"
                >
                  {copiedId === 'demo-live-url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>200 OK • HTTPS Active</span>
              </div>
            </div>

            {/* Embedded Live Website Iframe */}
            <div className="w-full bg-slate-950 flex justify-center py-2">
              <div
                className={`transition-all duration-300 overflow-hidden bg-black ${
                  previewViewport === 'mobile'
                    ? 'w-[390px] max-w-full rounded-2xl border-4 border-slate-800 shadow-2xl'
                    : 'w-full'
                }`}
              >
                <iframe
                  key={iframeKey}
                  src="https://devopsprotech.github.io/Tesla/"
                  title="Демонстрация живого онлайн-проекта Tesla (https://devopsprotech.github.io/Tesla/)"
                  className="w-full h-[540px] sm:h-[620px] border-0 bg-slate-950"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
            <span>
              💡 <strong>Обрати внимание:</strong> можно прямо внутри окна прокручивать секции сайта, нажимать на меню и переключать режим <strong>Desktop / Mobile</strong>.
            </span>
            <a
              href="https://devopsprotech.github.io/Tesla/"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
            >
              Перейти на https://devopsprotech.github.io/Tesla/ ↗
            </a>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS FOR THE 4 CORE GUIDES OF LESSON 8 */}
      <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveGuideTab('github')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all ${
            activeGuideTab === 'github'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GitBranch className="w-4 h-4 shrink-0 text-emerald-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-75">Путь №1 • 7 шагов</div>
            <div>GUIDE: AI Studio → GitHub</div>
          </div>
        </button>

        <button
          onClick={() => setActiveGuideTab('direct')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all ${
            activeGuideTab === 'direct'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Rocket className="w-4 h-4 shrink-0 text-cyan-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-75">Путь №2 • В 1 клик</div>
            <div>Publish from AI Studio</div>
          </div>
        </button>

        <button
          onClick={() => setActiveGuideTab('cloudinary')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all ${
            activeGuideTab === 'cloudinary'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Video className="w-4 h-4 shrink-0 text-purple-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-75">FINAL CHALLENGE</div>
            <div>Видео в Hero (Cloudinary)</div>
          </div>
        </button>

        <button
          onClick={() => setActiveGuideTab('linux')}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all ${
            activeGuideTab === 'linux'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Server className="w-4 h-4 shrink-0 text-amber-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-75">PRO Инженерия</div>
            <div>Linux + Nginx/Apache + DNS</div>
          </div>
        </button>
      </div>

      {/* 3. GUIDE 1: DEPLOY GOOGLE AI STUDIO PROJECT TO GITHUB (STEPS 1-7) */}
      {activeGuideTab === 'github' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  Пошаговое руководство №1 • Каталог гайдов Google AI Studio & GitHub
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  📘 GUIDE: Deploy Google AI Studio Project (Steps 1–7)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-xs font-bold">
                Репозиторий: TeslaModelX
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Что такое <strong>Git</strong> и <strong>GitHub</strong> простыми словами? <strong>Git</strong> — это «машина времени» для твоего кода, которая запоминает каждое сохранение (commit). А <strong>GitHub.com</strong> — это главная мировая облачная платформа для разработчиков, где хранятся проекты и откуда автоматические сервисы (GitHub Pages, Vercel, Netlify, Cloud Run) мгновенно публикуют сайты в интернет.
            </p>

            {/* 7 STEPS CARDS */}
            <div className="space-y-4">
              {sevenStepsGuide.map((item, idx) => (
                <div
                  key={item.step}
                  className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-black">
                        {item.step}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {item.title} <span className="text-slate-400 font-normal text-sm">— {item.titleRu}</span>
                      </h3>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-sm text-emerald-200 font-medium mb-1.5">{item.action}</p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.detail}</p>

                  {/* Interactive Checklist specifically inside STEP 3 */}
                  {idx === 2 && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                          Интерактивный чек-лист STEP 3 — Прокликай 5 обязательных проверок:
                        </span>
                        <span className="text-xs font-mono text-emerald-400">
                          {Object.values(checkedStep3Items).filter(Boolean).length} / 5 проверено
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {step3Items.map(check => {
                          const isDone = checkedStep3Items[check.key];
                          return (
                            <button
                              key={check.key}
                              onClick={() => toggleStep3Check(check.key)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-xs font-black">{check.key}</span>
                                <CheckCircle2
                                  className={`w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}
                                />
                              </div>
                              <div className="text-[11px] leading-snug opacity-85">{check.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Interactive Visual Repository Tree inside STEP 7 */}
                  {idx === 6 && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span className="flex items-center gap-2">
                          <FolderOpen className="w-4 h-4 text-amber-400" />
                          Что ученик видит на GitHub в репозитории <code className="text-emerald-400">TeslaModelX</code>:
                        </span>
                        <span className="font-mono text-[11px] text-emerald-400">main branch • pushed just now</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-cyan-300">
                          <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                          <div>
                            <div className="font-bold">README.md</div>
                            <div className="text-[10px] text-slate-500">Паспорт и инструкция проекта</div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-amber-300">
                          <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <div className="font-bold">src/</div>
                            <div className="text-[10px] text-slate-500">Исходный код, стили и компоненты</div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-emerald-300">
                          <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <div className="font-bold">package.json</div>
                            <div className="text-[10px] text-slate-500">Зависимости и скрипты сборки</div>
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-purple-300">
                          <FileCode className="w-4 h-4 text-purple-400 shrink-0" />
                          <div>
                            <div className="font-bold">index.html</div>
                            <div className="text-[10px] text-slate-500">Точка входа веб-приложения</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. GUIDE 2: SECOND PATH — PUBLISH DIRECTLY FROM AI STUDIO + GITHUB AUTO DEPLOY */}
      {activeGuideTab === 'direct' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                Второй путь публикации • Мгновенный облачный хостинг
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                ⚡ Путь №2: Publish directly from AI Studio & GitHub Auto-Deploy
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-bold">
              Живая ссылка за 15 секунд
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Direct AI Studio Publish */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Вариант А: Publish directly from AI Studio
                  </h3>
                  <p className="text-xs text-slate-400">Прямая публикация из среды разработки Google AI Studio</p>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-cyan-400">01.</span>
                  <span>
                    В правом верхнем углу окна своего проекта в Google AI Studio найди кнопку{' '}
                    <strong className="text-white">Publish / Share / Deploy App</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-cyan-400">02.</span>
                  <span>
                    Выбери режим публичной видимости (<strong>Public Link</strong>), чтобы сайт открывался без входа в твой аккаунт.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-cyan-400">03.</span>
                  <span>
                    Google AI Studio автоматически соберёт контейнер в облаке (Google Cloud Run) и выдаст тебе готовую HTTPS-ссылку вида:{' '}
                    <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">
                      https://ais-pre-...run.app
                    </code>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-cyan-400">04.</span>
                  <span>
                    <strong>Главный плюс:</strong> когда ты меняешь сайт (например, добавляешь видео в Hero), достаточно нажать{' '}
                    <strong className="text-emerald-400">Save</strong> и <strong className="text-emerald-400">Publish (Update)</strong> — та же самая ссылка обновится без единой ошибки!
                  </span>
                </li>
              </ol>
            </div>

            {/* GitHub Automatic Deployment */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Вариант Б: GitHub Automatic Deployment
                  </h3>
                  <p className="text-xs text-slate-400">Автоматический деплой из репозитория TeslaModelX</p>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-emerald-400">01.</span>
                  <span>
                    Когда твой код уже лежит в репозитории <code className="text-emerald-300">TeslaModelX</code> на GitHub (после STEP 6), ты можешь включить авто-деплой.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-emerald-400">02.</span>
                  <span>
                    <strong>Через GitHub Pages:</strong> зайди в репозитории в вкладку{' '}
                    <code className="text-white">Settings → Pages</code>, выбери ветку <code className="text-emerald-300">main</code> и нажми <strong>Save</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-emerald-400">03.</span>
                  <span>
                    <strong>Через Vercel / Netlify:</strong> подключи свой GitHub-репозиторий <code className="text-emerald-300">TeslaModelX</code> — и при каждом новом <code className="text-emerald-300">Push</code> из AI Studio сайт будет пересобираться автоматически!
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-black text-emerald-400">04.</span>
                  <span>
                    Ты получаешь красивую короткую ссылку вида{' '}
                    <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">
                      https://username.github.io/TeslaModelX/
                    </code>{' '}
                    или <code className="text-emerald-300">https://teslamodelx.vercel.app</code>.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* 5. GUIDE 3: CLOUDINARY HERO VIDEO + SEAMLESS UPDATE + FINAL CHALLENGE */}
      {activeGuideTab === 'cloudinary' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-purple-400">
                🎯 FINAL CHALLENGE • Прокачка живого сайта
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                🎬 Видео в Hero-секцию через Cloudinary + Мгновенное обновление LIVE-сайта
              </h2>
            </div>
            <a
              href="https://cloudinary.com/users/login"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs font-bold hover:bg-purple-600/50 transition-all"
            >
              Открыть Cloudinary Login
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Настоящий сайт Tesla Model X встречает посетителя захватывающим полноэкранным видео в первом экране (Hero Section).
            Но хранить тяжёлые видеофайлы прямо внутри кода плохо — сайт будет долго грузиться. Профессионалы загружают видео на специальный облачный медиа-сервер{' '}
            <strong className="text-purple-300">Cloudinary CDN</strong>, берут быструю прямую ссылку и просят AI Studio встроить её в Hero-секцию!
          </p>

          {/* 4-Step Cloudinary Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black font-mono text-purple-400">ШАГ 1</span>
                <CloudUpload className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Вход в Cloudinary</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Перейди на{' '}
                <a
                  href="https://cloudinary.com/users/login"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-300 underline"
                >
                  cloudinary.com/users/login
                </a>
                , войди в аккаунт (можно через Google) и открой раздел <strong>Media Library</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black font-mono text-purple-400">ШАГ 2</span>
                <Video className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Загрузка MP4 видео</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Нажми кнопку <strong>Upload</strong> и загрузи красивый горизонтальный видеоролик электромобиля (MP4, 5–15 секунд). Нажми <strong>Copy URL</strong> (<code className="text-purple-300">https://res.cloudinary.com/...mp4</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black font-mono text-purple-400">ШАГ 3</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Промпт в AI Studio</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Открой свой проект в Google AI Studio и попроси ИИ добавить это видео фоном в Hero-секцию (с атрибутами <code className="text-cyan-300">autoplay loop muted playsinline</code>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black font-mono text-emerald-400">ШАГ 4</span>
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-white text-sm">Save & Publish Update</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Нажми <strong>Save</strong> и снова <strong>Publish</strong>. Живой сайт в интернете мгновенно обновится без каких-либо сбоев и без смены адреса!
              </p>
            </div>
          </div>

          {/* Copyable Prompt for Cloudinary Video */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                Готовый промпт для Google AI Studio (Добавление видео из Cloudinary в Hero):
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    'cloudinary-prompt',
                    cloudinaryPrompt,
                    '🎬 Промпт для вставки Cloudinary-видео в Hero скопирован! (+15 ОП)'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copiedId === 'cloudinary-prompt' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Скопировать промпт
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-xs sm:text-sm text-purple-200 font-mono whitespace-pre-wrap overflow-x-auto border border-slate-800">
              {cloudinaryPrompt}
            </pre>
          </div>

          {/* FINAL CHALLENGE 3 DELIVERABLES BOX */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm sm:text-base">
              <Award className="w-5 h-5 text-emerald-400" />
              🎯 FINAL CHALLENGE: Что именно ученик отправляет учителю в конце урока
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-white uppercase">1. GitHub URL</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Ссылка на открытый репозиторий, например:{' '}
                    <code className="text-emerald-300">https://github.com/student/TeslaModelX</code>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-white uppercase">2. Live URL</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Рабочая ссылка на живой сайт с обновлённым видео в Hero-секции (из AI Studio Publish или GitHub Pages).
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-3">
                <Camera className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-white uppercase">3. Screenshot</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Скриншот открытого в браузере (или на телефоне) живого сайта с работающим видео-фоном в Hero!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. GUIDE 4: STEP-BY-STEP DEPLOYMENT ON LINUX SERVER WITHOUT GITHUB (NGINX OR APACHE + REAL DNS) */}
      {activeGuideTab === 'linux' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Пошаговый инженерный гайд • Без GitHub напрямую на сервер
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                🐧 Деплой проекта на Linux-сервер напрямую (Nginx или Apache + Real DNS)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedWebServer('nginx')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedWebServer === 'nginx'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Веб-сервер Nginx
              </button>
              <button
                onClick={() => setSelectedWebServer('apache')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedWebServer === 'apache'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Веб-сервер Apache2
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            А что если компания или заказчик просит развернуть сайт <strong>вообще без GitHub</strong> — напрямую на собственном выделенном Linux-сервере (VPS с Ubuntu 24.04 LTS) и подключить к нему настоящий купленный домен (например,{' '}
            <code className="text-amber-300">teslax.yourdomain.com</code>)? Разберём все 5 шагов классического серверного деплоя!
          </p>

          {/* Architecture Visual Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono font-black text-amber-400">ШАГ 1 • ЛОКАЛЬНЫЙ ПК</div>
              <div className="text-xs font-bold text-white mt-1">Экспорт / Сборка</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Скачиваем ZIP из AI Studio. Если проект на чистом HTML/CSS/JS — папка готова. Если React/Vite — запускаем <code>npm run build</code> (получаем папку <code>dist/</code>).
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono font-black text-cyan-400">ШАГ 2 • REAL DNS</div>
              <div className="text-xs font-bold text-white mt-1">Привязка домена к IP</div>
              <p className="text-[11px] text-slate-400 mt-1">
                У регистратора домена (Cloudflare, Namecheap, Reg.ru) создаём DNS <strong>A-запись</strong>, направляющую домен на публичный IP нашего Linux-сервера.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono font-black text-purple-400">ШАГ 3 • ПРЯМАЯ ПЕРЕДАЧА</div>
              <div className="text-xs font-bold text-white mt-1">SCP / SFTP по SSH</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Без GitHub копируем файлы с ПК прямо на сервер в папку <code>/var/www/teslamodelx</code> командой <code>scp -r</code> или через FileZilla.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono font-black text-emerald-400">ШАГ 4 • ВЕБ-СЕРВЕР</div>
              <div className="text-xs font-bold text-white mt-1">Nginx или Apache2</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Создаём конфиг виртуального хоста (<code>server_name</code> / <code>ServerName</code>), указывающий на папку <code>/var/www/teslamodelx</code>.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono font-black text-indigo-400">ШАГ 5 • HTTPS SSL</div>
              <div className="text-xs font-bold text-white mt-1">Certbot Let's Encrypt</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Одной командой <code>certbot</code> выпускаем бесплатный SSL-сертификат, чтобы сайт открывался безопасно по <code>https://</code>.
              </p>
            </div>
          </div>

          {/* REAL DNS TABLE EXPLANATION */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Настройка настоящего DNS (Real DNS Zone Records)
              </h3>
              <span className="text-xs font-mono text-cyan-300">Пример IP сервера: 203.0.113.50</span>
            </div>
            <p className="text-xs text-slate-400">
              Чтобы браузер любого человека в мире при вводе <code className="text-white">teslax.yourdomain.com</code> попадал именно на твой Linux-сервер, в DNS-панели домена прописываются следующие записи:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3">Тип (Type)</th>
                    <th className="py-2 px-3">Имя (Host / Name)</th>
                    <th className="py-2 px-3">Значение (Value / Points to)</th>
                    <th className="py-2 px-3">TTL</th>
                    <th className="py-2 px-3">Назначение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">A</td>
                    <td className="py-2.5 px-3">@ (или teslax)</td>
                    <td className="py-2.5 px-3 text-cyan-300">203.0.113.50</td>
                    <td className="py-2.5 px-3">300 (Auto)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Привязывает основной домен к IPv4 адресу Linux-сервера</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">A</td>
                    <td className="py-2.5 px-3">www (или www.teslax)</td>
                    <td className="py-2.5 px-3 text-cyan-300">203.0.113.50</td>
                    <td className="py-2.5 px-3">300 (Auto)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Позволяет открывать сайт также с префиксом www.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Block for Selected Web Server (Nginx vs Apache2) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-black text-white">
                  {selectedWebServer === 'nginx'
                    ? 'Полный скрипт деплоя на Linux (Ubuntu) с веб-сервером NGINX + Certbot SSL'
                    : 'Полный скрипт деплоя на Linux (Ubuntu) с веб-сервером APACHE2 + Certbot SSL'}
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    'linux-script',
                    selectedWebServer === 'nginx' ? nginxConfigCode : apacheConfigCode,
                    `🐧 Команды настройки ${selectedWebServer.toUpperCase()} и DNS скопированы! (+15 ОП)`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copiedId === 'linux-script' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Скопировать команды {selectedWebServer.toUpperCase()}
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-xs font-mono text-emerald-200 whitespace-pre-wrap overflow-x-auto border border-slate-800 leading-relaxed">
              {selectedWebServer === 'nginx' ? nginxConfigCode : apacheConfigCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
