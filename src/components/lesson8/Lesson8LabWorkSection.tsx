import React, { useState } from 'react';
import {
  Rocket,
  GitBranch,
  Globe,
  Video,
  Server,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  FolderOpen,
  FileCode,
  Camera,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Award,
  Play
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson8LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // LAB PART 1: 7-Step GitHub & Direct AI Studio Deployment Simulator
  const [repoName, setRepoName] = useState('TeslaModelX');
  const [githubUsername, setGithubUsername] = useState('ai-student-pro');
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });
  const [directPublished, setDirectPublished] = useState(false);

  const toggleStep = (stepNum: number) => {
    const next = { ...completedSteps, [stepNum]: !completedSteps[stepNum] };
    setCompletedSteps(next);
    if (Object.values(next).every(Boolean)) {
      addReward(40, '🚀 Все 7 шагов GUIDE (Deploy Google AI Studio Project → GitHub) выполнены! (+40 ОП)');
    }
  };

  const handleDirectPublish = () => {
    if (!directPublished) {
      setDirectPublished(true);
      addReward(35, '🌍 Сайт опубликован напрямую из Google AI Studio (Publish directly)! (+35 ОП)');
    }
  };

  // LAB PART 2: Cloudinary Hero Video Upgrader
  const [cloudinaryUrl, setCloudinaryUrl] = useState(
    'https://res.cloudinary.com/demo/video/upload/v1/tesla_model_x_cinematic.mp4'
  );
  const [heroVideoApplied, setHeroVideoApplied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const generatedHeroPrompt = `Update the Hero section of my ${repoName} website in Google AI Studio:
Add a full-bleed background HTML5 video (<video autoplay loop muted playsinline>) using this Cloudinary URL: ${cloudinaryUrl}
Keep the navigation bar, "Model X" title, specifications, and CTA buttons clearly visible over the video. Save and update the published site.`;

  const handleApplyHeroVideo = () => {
    setHeroVideoApplied(true);
    addReward(40, '🎬 Видео из Cloudinary добавлено в Hero-секцию и опубликовано без ошибок! (+40 ОП)');
  };

  const handleCopyHeroPrompt = () => {
    navigator.clipboard.writeText(generatedHeroPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // LAB PART 3: Interactive Linux Server (Nginx / Apache + Real DNS) Configurator
  const [serverEngine, setServerEngine] = useState<'nginx' | 'apache'>('nginx');
  const [domainName, setDomainName] = useState('teslamodelx.ai-portal.org');
  const [serverIp, setServerIp] = useState('203.0.113.50');
  const [linuxVerified, setLinuxVerified] = useState(false);
  const [copiedLinux, setCopiedLinux] = useState(false);

  const customLinuxConfig =
    serverEngine === 'nginx'
      ? `# 1. DNS A-Record (у регистратора домена):
# Type: A | Name: @   | Value: ${serverIp} | TTL: 300
# Type: A | Name: www | Value: ${serverIp} | TTL: 300

# 2. Загрузка файлов сайта напрямую с ПК на Linux-сервер (без GitHub):
scp -r ./${repoName}/* root@${serverIp}:/var/www/${repoName.toLowerCase()}/

# 3. Конфигурация Nginx (/etc/nginx/sites-available/${repoName.toLowerCase()}):
server {
    listen 80;
    server_name ${domainName} www.${domainName};
    root /var/www/${repoName.toLowerCase()};
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. Активация и HTTPS:
sudo ln -s /etc/nginx/sites-available/${repoName.toLowerCase()} /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ${domainName} -d www.${domainName}`
      : `# 1. DNS A-Record (у регистратора домена):
# Type: A | Name: @   | Value: ${serverIp} | TTL: 300
# Type: A | Name: www | Value: ${serverIp} | TTL: 300

# 2. Загрузка файлов сайта напрямую с ПК на Linux-сервер (без GitHub):
scp -r ./${repoName}/* root@${serverIp}:/var/www/${repoName.toLowerCase()}/

# 3. Конфигурация Apache2 (/etc/apache2/sites-available/${repoName.toLowerCase()}.conf):
<VirtualHost *:80>
    ServerName ${domainName}
    ServerAlias www.${domainName}
    DocumentRoot /var/www/${repoName.toLowerCase()}

    <Directory /var/www/${repoName.toLowerCase()}>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# 4. Активация и HTTPS:
sudo a2ensite ${repoName.toLowerCase()}.conf
sudo systemctl reload apache2
sudo certbot --apache -d ${domainName} -d www.${domainName}`;

  const handleVerifyLinux = () => {
    if (!linuxVerified) {
      setLinuxVerified(true);
      addReward(45, `🐧 Серверная конфигурация ${serverEngine.toUpperCase()} + Real DNS проверена! (+45 ОП)`);
    }
  };

  // LAB PART 4: FINAL CHALLENGE Builder (GitHub URL + Live URL + Screenshot)
  const [finalGithubUrl, setFinalGithubUrl] = useState(`https://github.com/devopsprotech/Tesla`);
  const [finalLiveUrl, setFinalLiveUrl] = useState(`https://devopsprotech.github.io/Tesla/`);
  const [finalScreenshotNote, setFinalScreenshotNote] = useState(
    'Скриншот главного экрана Tesla Model X с работающим фоновым видео из Cloudinary и открытым HTTPS-замочком прикреплён.'
  );

  return (
    <div className="space-y-8 text-slate-200">
      {/* LAB HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
            <Rocket className="w-4 h-4" />
            Лабораторная работа #8 • Практикум Издателя (Publisher)
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-xs font-bold">
            🌍 «Мой сайт LIVE!»
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Практика: Деплой в GitHub (Steps 1–7), Прямая публикация, Видео через Cloudinary и Linux-сервер
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Пройди все этапы публикации своего сайта Tesla Model X: от проверки 5 параметров и отправки репозитория{' '}
          <code className="text-emerald-300">TeslaModelX</code> на GitHub до живого обновления Hero-видео через{' '}
          <strong>Cloudinary</strong> и настройки боевого <strong>Linux-сервера (Nginx / Apache + Real DNS)</strong>.
        </p>
      </div>

      {/* PART 1: 7 STEPS GITHUB DEPLOYMENT + DIRECT PUBLISH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              ЧАСТЬ 1 • Пошаговый тренажёр публикации
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              1️⃣ Протокол 7 шагов: Google AI Studio → GitHub + Прямой Publish
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
            Выполнено шагов: {Object.values(completedSteps).filter(Boolean).length} / 7
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">
              Твой логин на GitHub.com (зарегистрированный заранее):
            </label>
            <input
              type="text"
              value={githubUsername}
              onChange={e => setGithubUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              placeholder="например: alex-vibe-coder"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">
              Имя создаваемого репозитория (STEP 5 — Create repository):
            </label>
            <input
              type="text"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-emerald-300 font-mono focus:border-emerald-500 focus:outline-none"
              placeholder="TeslaModelX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { num: 1, title: 'STEP 1 — Open Google AI Studio', sub: 'Открыть aistudio.google.com' },
            { num: 2, title: 'STEP 2 — Open project', sub: 'Выбрать проект сайта из прошлых уроков' },
            { num: 3, title: 'STEP 3 — Test (5 проверок)', sub: 'buttons, navigation, responsive, console, images' },
            { num: 4, title: 'STEP 4 — Save to GitHub', sub: 'Connect GitHub account (OAuth-связка)' },
            { num: 5, title: `STEP 5 — Create repository (${repoName})`, sub: `Создать публичный репозиторий ${repoName}` },
            { num: 6, title: 'STEP 6 — Push project', sub: 'Отправить все файлы проекта в облако GitHub' },
            {
              num: 7,
              title: 'STEP 7 — Open GitHub & Inspect',
              sub: 'Увидеть в репозитории: README, src, package.json...'
            }
          ].map(s => {
            const done = completedSteps[s.num];
            return (
              <button
                key={s.num}
                onClick={() => toggleStep(s.num)}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  done
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 mt-0.5 ${done ? 'text-emerald-400' : 'text-slate-600'}`}
                />
                <div>
                  <div className="text-xs sm:text-sm font-black">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
                </div>
              </button>
            );
          })}

          {/* Second Path Button inside the grid */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between gap-2">
            <div>
              <div className="text-xs font-black text-cyan-300 uppercase">Второй путь публикации</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Publish directly from AI Studio — прямая публикация контейнера одним кликом!
              </div>
            </div>
            <button
              onClick={handleDirectPublish}
              className={`w-full py-2 px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
                directPublished
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {directPublished
                ? `✅ Опубликовано: https://${repoName.toLowerCase()}-live.run.app`
                : '🚀 Нажать «Publish directly from AI Studio»'}
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: CLOUDINARY VIDEO IN HERO SECTION & LIVE UPDATE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-purple-400 uppercase tracking-wider">
              ЧАСТЬ 2 • Обновление живого сайта без ошибок
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              2️⃣ Добавь видео в Hero-секцию через Cloudinary и обнови LIVE-сайт
            </h3>
          </div>
          <a
            href="https://cloudinary.com/users/login"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-bold hover:bg-purple-500/30"
          >
            Войти в Cloudinary
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Вставь прямую ссылку на загруженное MP4-видео из Cloudinary:
              </label>
              <input
                type="text"
                value={cloudinaryUrl}
                onChange={e => setCloudinaryUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-purple-300 font-mono focus:border-purple-500 focus:outline-none"
                placeholder="https://res.cloudinary.com/.../video/upload/...mp4"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Авто-сгенерированный промпт для AI Studio:</span>
                <button
                  onClick={handleCopyHeroPrompt}
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-300 hover:text-purple-200 cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap bg-slate-900 p-3 rounded-xl border border-slate-800">
                {generatedHeroPrompt}
              </pre>
            </div>

            <button
              onClick={handleApplyHeroVideo}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
            >
              {heroVideoApplied
                ? '✅ Видео встроено в Hero-секцию, сохранено и переопубликовано (0 ошибок)!'
                : '🎬 Применить видео в Hero, нажать Save и Publish (Update Live)'}
            </button>
          </div>

          {/* Interactive Live Preview of Hero Section with Video */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col justify-between relative min-h-[260px]">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-emerald-400">https://{repoName.toLowerCase()}-live.run.app</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                {heroVideoApplied ? 'LIVE • VIDEO HERO ACTIVE' : 'LIVE • STATIC HERO'}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900/60 via-indigo-950/50 to-slate-950 relative">
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1">
                {heroVideoApplied
                  ? `▶ Воспроизводится Cloudinary MP4: ${cloudinaryUrl.slice(0, 42)}...`
                  : 'Статичный фон Hero-секции (до добавления видео)'}
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Model X</h4>
              <p className="text-xs text-slate-300 mt-1 mb-4">Plaid • 1,020 hp • 0-60 mph in 2.5s • Falcon Wing Doors</p>
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-lg bg-white text-slate-950 font-black text-xs">Order Now</span>
                <span className="px-4 py-1.5 rounded-lg bg-slate-800/90 text-white border border-slate-600 font-bold text-xs">
                  Demo Drive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: LINUX SERVER WITHOUT GITHUB (NGINX / APACHE + REAL DNS) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              ЧАСТЬ 3 • Профессиональный деплой на Linux VPS без GitHub
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              3️⃣ Конфигуратор Linux-сервера: Nginx / Apache2 + Real DNS
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setServerEngine('nginx')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer ${
                serverEngine === 'nginx' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Nginx
            </button>
            <button
              onClick={() => setServerEngine('apache')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer ${
                serverEngine === 'apache' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Apache2
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Реальный домен (Real DNS Domain):</label>
            <input
              type="text"
              value={domainName}
              onChange={e => setDomainName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-amber-300 font-mono focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5">Публичный IPv4 твоего Linux-сервера:</label>
            <input
              type="text"
              value={serverIp}
              onChange={e => setServerIp(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-cyan-300 font-mono focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono">
              Готовый скрипт прямого деплоя ({serverEngine.toUpperCase()} + DNS A-Record):
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(customLinuxConfig);
                setCopiedLinux(true);
                setTimeout(() => setCopiedLinux(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
            >
              {copiedLinux ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLinux ? 'Скопировано' : 'Скопировать конфиг'}
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-xs font-mono text-emerald-200 whitespace-pre-wrap overflow-x-auto border border-slate-800">
            {customLinuxConfig}
          </pre>
          <button
            onClick={handleVerifyLinux}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-black text-xs transition-all cursor-pointer"
          >
            {linuxVerified
              ? `✅ Конфигурация ${serverEngine.toUpperCase()} и DNS A-запись (${domainName} → ${serverIp}) проверены!`
              : `Проверить связку Linux ${serverEngine.toUpperCase()} + Real DNS`}
          </button>
        </div>
      </div>

      {/* PART 4: 🎯 FINAL CHALLENGE SUBMISSION PREPARATION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-5">
        <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
          <Award className="w-5 h-5" />
          🎯 FINAL CHALLENGE: Сборка 3 обязательных артефактов для отправки
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">1. Твой GitHub URL:</label>
            <input
              type="text"
              value={finalGithubUrl}
              onChange={e => setFinalGithubUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">2. Твой Live URL (живой сайт):</label>
            <input
              type="text"
              value={finalLiveUrl}
              onChange={e => setFinalLiveUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">3. Подтверждение Screenshot + Video:</label>
            <input
              type="text"
              value={finalScreenshotNote}
              onChange={e => setFinalScreenshotNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-200"
            />
          </div>
        </div>
      </div>

      {/* INLINE PORTAL LAB SUBMISSION */}
      <InlineLabSubmission
        lessonId={8}
        title="Сдача Лабораторной работы #8 (🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»)"
        defaultText={`ОТЧЁТ ПО ЛАБОРАТОРНОЙ РАБОТЕ #8 (🚀 PUBLISHER — МОЙ САЙТ LIVE!):
1. GitHub URL (STEP 1–7): ${finalGithubUrl} (внутри проверены README, src, package.json)
2. Live URL: ${finalLiveUrl}
3. Видео в Hero через Cloudinary: ${cloudinaryUrl} (добавлено в Hero-секцию, сохранено и переопубликовано без ошибок)
4. Screenshot: ${finalScreenshotNote}
5. Linux Server Deployment: ${serverEngine.toUpperCase()} настроен для домена ${domainName} (Real DNS A-Record -> ${serverIp})`}
      />
    </div>
  );
};
