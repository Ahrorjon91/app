import React, { useState } from 'react';
import {
  Trophy,
  Send,
  Users,
  Rocket,
  Github,
  Globe,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson12HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [vercelLiveUrl, setVercelLiveUrl] = useState('');
  const [whatHappenedOnGithubHtml, setWhatHappenedOnGithubHtml] = useState(
    'При попытке деплоя как HTML/CSS/JS на GitHub Pages появился белый экран, так как браузер не компилирует .tsx файлы без сборщика Vite. После подключения репозитория к Vercel сборка прошла автоматически!'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubRepoUrl.trim() || !vercelLiveUrl.trim() || submitted) return;
    setSubmitted(true);
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 }
    });
    addReward(100, '🚀 Финальный релиз двухстраничной экосистемы (iPhone 18 Pro + Apple Watch Ultra 4) на Vercel сдан (+100 ОП)!');
  };

  const [familySwitchNote, setFamilySwitchNote] = useState('');
  const [questClaimed, setQuestClaimed] = useState(false);

  const handleClaimQuest = () => {
    if (!familySwitchNote.trim() || questClaimed) return;
    setQuestClaimed(true);
    addReward(25, '⌚ Семейный тест переключения iPhone 18 Pro ⇄ Apple Watch Ultra 4 засчитан (+25 ОП)!');
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-orange-500/35 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
            🏠 ДОМАШНЕЕ ЗАДАНИЕ • УРОК 13 (VIBE CODING CHALLENGE • MULTI-PAGE + VERCEL)
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Награда: до +125 ОП
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          🧠 Vibe Code Самостоятельно: Добавь 3-ю страницу экосистемы (AirPods Pro 3 / Vision Pro) + Общую Корзину (Apple Bag) и задеплой на Vercel!
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          На лекции мы соединили <strong>iPhone 18 Pro</strong> и <strong>Apple Watch Ultra 4</strong>, а в лабораторной настроили ремешки, патчи безопасности и разобрали, почему сырой React/TSX не работает как обычный HTML/CSS/JS на GitHub Pages без сборки. В Домашнем задании <strong>прояви мастерство вайб-кодера</strong>: самостоятельно добавь в шапку сайта <strong>3-ю вкладку продукта (например: AirPods Pro 3 или Apple Vision Pro 2)</strong> и выезжающую справа <strong>единую корзину предзаказа (Apple Bag Drawer)</strong>, которая сохраняет выбранные товары при переключении страниц, и опубликуй обновление на <strong>Vercel (`.vercel.app`)</strong>!
        </p>
      </div>

      {/* Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5"
      >
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-black text-white">
            Отчёт о деплое экосистемы Apple (GitHub + Vercel Live URL)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <Github className="w-4 h-4 text-slate-400" />
              <span>1. Ссылка на GitHub-репозиторий:</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://github.com/username/apple-flagship-ultra"
              value={githubRepoUrl}
              onChange={(e) => setGithubRepoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>2. Живая ссылка на опубликованный сайт в Vercel:</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://apple-flagship-ultra.vercel.app"
              value={vercelLiveUrl}
              onChange={(e) => setVercelLiveUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="text-slate-300 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>3. Что произошло при первой попытке деплоя в GitHub как обычного HTML/CSS/JS и как помог Vercel?</span>
          </label>
          <textarea
            rows={3}
            value={whatHappenedOnGithubHtml}
            onChange={(e) => setWhatHappenedOnGithubHtml(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={submitted || !githubRepoUrl.trim() || !vercelLiveUrl.trim()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>
            {submitted
              ? '✓ GitHub + Vercel URL сохранены (+100 ОП)'
              : 'Отправить отчёт деплоя на Vercel (+100 ОП)'}
          </span>
        </button>
      </form>

      {/* Side Quest: Family Multi-Page Test */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Сайд-квест: Семейный тест двух страниц
          </span>
          <span className="text-xs font-mono text-emerald-400">+25 ОП</span>
        </div>
        <h4 className="text-lg font-bold text-white">
          Открой свою ссылку `.vercel.app` на телефоне и попроси близких переключиться между iPhone 18 Pro и Apple Watch Ultra 4!
        </h4>
        <input
          type="text"
          placeholder="Какая страница им понравилась больше — Burgundy iPhone или Titanium Watch Ultra 4?"
          value={familySwitchNote}
          onChange={(e) => setFamilySwitchNote(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
        />
        <button
          onClick={handleClaimQuest}
          disabled={questClaimed || !familySwitchNote.trim()}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
        >
          {questClaimed ? '✓ Засчитано (+25 ОП)' : 'Сохранить отзыв семьи (+25 ОП)'}
        </button>
      </div>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={13}
        lessonTitle="Домашнее задание #13: 3-я страница экосистемы + Единая корзина Apple Bag + Деплой на GitHub & Vercel"
        rewardExp={100}
      />
    </div>
  );
};
