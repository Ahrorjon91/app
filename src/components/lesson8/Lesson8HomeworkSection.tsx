import React, { useState } from 'react';
import {
  Rocket,
  GitBranch,
  Globe,
  Video,
  Camera,
  Server,
  Copy,
  Check,
  Award,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson8HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [githubUrl, setGithubUrl] = useState('https://github.com/username/TeslaModelX');
  const [liveUrl, setLiveUrl] = useState('https://teslamodelx-live.run.app');
  const [screenshotDesc, setScreenshotDesc] = useState(
    'Скриншот живого сайта Tesla Model X в браузере и на смартфоне с обновлённым видео-фоном в Hero-секции.'
  );
  const [cloudinaryVideoUrl, setCloudinaryVideoUrl] = useState(
    'https://res.cloudinary.com/demo/video/upload/v1/tesla_model_x_hero.mp4'
  );
  const [linuxServerType, setLinuxServerType] = useState<'Nginx' | 'Apache2'>('Nginx');
  const [dnsRecordNote, setDnsRecordNote] = useState(
    'A-запись (@ и www) направлена на IP Linux-сервера 203.0.113.50, файлы загружены в /var/www/teslamodelx без GitHub по SCP, включён HTTPS через Certbot.'
  );
  const [copiedReport, setCopiedReport] = useState(false);

  const buildReportText = () => {
    return `🎯 FINAL CHALLENGE — ОТЧЁТ ПО УРОКУ 8 (🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»):

1. GitHub URL (STEPS 1–7, репозиторий TeslaModelX с README, src, package.json):
   ${githubUrl}

2. Live URL (Мой живой сайт в интернете):
   ${liveUrl}

3. Screenshot (Визуальное подтверждение работы сайта):
   ${screenshotDesc}

4. Обновление Hero-секции с видео через Cloudinary (https://cloudinary.com/users/login):
   - Ссылка на видео: ${cloudinaryVideoUrl}
   - Статус: Добавлено через промпт в Google AI Studio, нажаты Save и Publish — сайт обновился мгновенно и без ошибок!

5. Прямой деплой на Linux-сервер без GitHub (${linuxServerType} + Real DNS):
   - Конфигурация: ${dnsRecordNote}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(buildReportText());
    setCopiedReport(true);
    addReward(20, '📋 Отчёт 🎯 FINAL CHALLENGE скопирован! (+20 ОП)');
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          Домашнее Задание • 🎯 FINAL CHALLENGE • 🎁 +50 ОП
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          🌍 Сдача проекта «Мой сайт LIVE!»: GitHub URL + Live URL + Screenshot + Видео в Hero
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Поздравляем с выходом в настоящий интернет! Чтобы завершить миссию Издателя (Publisher), подготовь три обязательных артефакта{' '}
          <strong className="text-emerald-300">GitHub URL + Live URL + Screenshot</strong>, убедись, что видео из{' '}
          <a
            href="https://cloudinary.com/users/login"
            target="_blank"
            rel="noreferrer"
            className="text-purple-300 underline font-bold"
          >
            Cloudinary
          </a>{' '}
          работает в Hero-секции после переопубликации, и зафиксируй схему деплоя на Linux-сервер с реальным DNS.
        </p>
      </div>

      {/* Form for the 3 Final Challenge Deliverables + Cloudinary + Linux */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4" />
              1. GitHub URL (Репозиторий TeslaModelX)
            </label>
            <input
              type="text"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-emerald-300 font-mono focus:border-emerald-500 focus:outline-none"
              placeholder="https://github.com/username/TeslaModelX"
            />
            <p className="text-[11px] text-slate-400">
              Проверь, что в репозитории видны файлы <code>README</code>, <code>src</code>, <code>package.json</code>.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              2. Live URL (Публичная ссылка на сайт)
            </label>
            <input
              type="text"
              value={liveUrl}
              onChange={e => setLiveUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
              placeholder="https://teslamodelx-live.run.app"
            />
            <p className="text-[11px] text-slate-400">
              Ссылка из Publish directly from AI Studio или автоматического деплоя GitHub Pages / Vercel.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-purple-400 flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              3. Видео в Hero-секции (Cloudinary URL)
            </label>
            <input
              type="text"
              value={cloudinaryVideoUrl}
              onChange={e => setCloudinaryVideoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-purple-300 font-mono focus:border-purple-500 focus:outline-none"
              placeholder="https://res.cloudinary.com/.../video/upload/...mp4"
            />
            <p className="text-[11px] text-slate-400">
              Загружено через <code>https://cloudinary.com/users/login</code> и обновлено через Save + Publish.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-indigo-400 flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              4. Описание / ссылка на Screenshot
            </label>
            <input
              type="text"
              value={screenshotDesc}
              onChange={e => setScreenshotDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400">
              Скриншот открытого в браузере живого сайта с работающим видео в Hero-секции.
            </p>
          </div>
        </div>

        {/* Linux Server + Real DNS Summary */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              5. Инженерный отчёт: Прямой деплой на Linux-сервер без GitHub (Nginx / Apache2 + Real DNS)
            </span>
            <div className="flex gap-2">
              {(['Nginx', 'Apache2'] as const).map(srv => (
                <button
                  key={srv}
                  onClick={() => setLinuxServerType(srv)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    linuxServerType === srv ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {srv}
                </button>
              ))}
            </div>
          </div>
          <textarea
            rows={2}
            value={dnsRecordNote}
            onChange={e => setDnsRecordNote(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Copy Full Report */}
        <div className="flex justify-end">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer transition-all"
          >
            {copiedReport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedReport ? 'Отчёт скопирован в буфер!' : 'Скопировать готовый отчёт FINAL CHALLENGE'}
          </button>
        </div>
      </div>

      {/* Inline Homework Submission */}
      <InlineHomeworkSubmission
        lessonId={8}
        title="Отправка Домашнего Задания #8 (🎯 FINAL CHALLENGE: GitHub URL + Live URL + Screenshot)"
        defaultText={buildReportText()}
      />
    </div>
  );
};
