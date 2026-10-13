import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Check,
  Copy,
  Smartphone,
  Monitor,
  Play,
  CheckCircle2,
  ExternalLink,
  Shield,
  RotateCcw,
  Sliders,
  Tv,
  Award,
  Vote,
  Heart,
  RefreshCw,
  Code2
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson9LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Idea Card
  const [ideaCard, setIdeaCard] = useState({
    topic: 'Моя мечта стать эко-инженером и строить роботов-очистителей в Худжанде',
    audience: 'Одноклассники, друзья и менторы курса AI for Life',
    blocks: 'Шапка с девизом, 3 карточки проектов роботов, интерактивная кнопка записи в команду, подвал',
    style: 'Светлая футуристичная тема, акцентный бирюзовый и изумрудный цвет, дружелюбный шрифт'
  });
  const [ideaRewarded, setIdeaRewarded] = useState(false);

  const handleLoadPresetIdea = (preset: 'robot' | 'helper' | 'eco') => {
    if (preset === 'robot') {
      setIdeaCard({
        topic: 'Моя мечта: инженер-робототехник и создатель дронов-спасателей',
        audience: 'Школьники и будущие коллеги-инженеры',
        blocks: 'Шапка с девизом, 3 шага к профессии, демонстрация прототипа, кнопка связи',
        style: 'Неоновый синий и серебристый, технологичный стиль, четкие карточки'
      });
    } else if (preset === 'helper') {
      setIdeaCard({
        topic: 'AI Life Helper: умный ассистент для подготовки к урокам в школе',
        audience: 'Ученики 7–11 классов Худжанда',
        blocks: 'Шапка, калькулятор учебного времени, генератор шпаргалок, кнопка «Попробовать»',
        style: 'Мягкий фиолетовый и желтый, чистый минимализм, крупные кнопки'
      });
    } else {
      setIdeaCard({
        topic: 'Зеленый Худжанд: эко-патруль по защите берегов реки Сырдарья',
        audience: 'Жители города, волонтеры и экологи',
        blocks: 'Шапка с рекой, счетчик собранного пластика, карта эко-точек, форма волонтера',
        style: 'Изумрудный и солнечный песочный, природные тона, фото-сетка'
      });
    }
  };

  const handleSaveIdea = () => {
    if (!ideaRewarded) {
      setIdeaRewarded(true);
      addReward(50, '📝 Карточка идеи сайта заполнена! Ты знаешь, для кого и что строишь! (+50 Опыта)');
    }
  };

  // Step 2: Live Prompt Constructor
  const [promptData, setPromptData] = useState({
    role: 'веб-разработчик и UX-дизайнер для подростковых образовательных проектов',
    goal: 'создай адаптивный одностраничный сайт о моей мечте стать эко-инженером',
    context: 'для школьников и друзей из Худжанда, которые интересуются технологиями',
    constraints: 'мобильная версия, светлая тема, без личных телефонов и адресов (безопасный контакт)',
    output: 'шапка с названием "RoboFuture", текстовый блок с девизом, 3 интерактивные карточки шагов, кнопка "Присоединиться к проекту", подвал с маркировкой "Создано с помощью ИИ"'
  });
  const [promptRewarded, setPromptRewarded] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const fullConstructedPrompt = `Ты — ${promptData.role}.
Твоя цель: ${promptData.goal}.
Контекст: ${promptData.context}.
Ограничения: ${promptData.constraints}.
Результат: Создай сайт, где будут: ${promptData.output}.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullConstructedPrompt);
    setCopiedPrompt(true);
    if (!promptRewarded) {
      setPromptRewarded(true);
      addReward(25, '🧱 Строительный промпт собран и скопирован! Готов к запуску в AI Studio! (+25 Опыта)');
    }
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Step 3 & 4: Live Website Simulator & Testing Checklist
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [testChecks, setTestChecks] = useState({
    opensWithoutError: false,
    looksGoodMobile: false,
    noPrivateData: false
  });
  const [testRewarded, setTestRewarded] = useState(false);

  const allTestsPassed = testChecks.opensWithoutError && testChecks.looksGoodMobile && testChecks.noPrivateData;

  const handleToggleCheck = (key: 'opensWithoutError' | 'looksGoodMobile' | 'noPrivateData') => {
    const updated = { ...testChecks, [key]: !testChecks[key] };
    setTestChecks(updated);

    if (updated.opensWithoutError && updated.looksGoodMobile && updated.noPrivateData && !testRewarded) {
      setTestRewarded(true);
      addReward(25, '🧪 Чек-лист тестирования 3/3 пройден! Сайт проверен руками! (+25 Опыта)');
    }
  };

  // Step 5: Pinpoint Refinement
  const [refinementPrompt, setRefinementPrompt] = useState('Оставь всё как есть, но сделай кнопку "Присоединиться" крупнее, добавь пульсирующий бирюзовый акцент и смести заголовок по центру.');
  const [isRefined, setIsRefined] = useState(false);
  const [refineRewarded, setRefineRewarded] = useState(false);

  const handleApplyRefine = () => {
    setIsRefined(true);
    if (!refineRewarded) {
      setRefineRewarded(true);
      addReward(25, '🔁 Точечное улучшение внесено! Ты итерируешь как профессионал! (+25 Опыта)');
    }
  };

  // Level 6: Showcase / Gallery
  const [votedSiteId, setVotedSiteId] = useState<number | null>(null);
  const showcaseSites = [
    {
      id: 1,
      author: 'Азиз (15 лет, Худжанд)',
      title: 'Эко-патруль Худжанда',
      topic: 'Дроны для мониторинга чистоты Сырдарьи',
      polish: 'Увеличил контраст шрифта в карточках',
      votes: 42
    },
    {
      id: 2,
      author: 'Нигина (14 лет, Худжанд)',
      title: 'Робо-Клуб Сырдарья',
      topic: 'Расписание занятий и выставка моделей',
      polish: 'Добавила мобильное гамбургер-меню',
      votes: 56
    },
    {
      id: 3,
      author: 'Далер (16 лет, Худжанд)',
      title: 'AI Репетитор Математики',
      topic: 'Пошаговый тренажер уравнений для 8 класса',
      polish: 'Сделал крупные кнопки вариантов ответа',
      votes: 39
    }
  ];

  const handleVoteShowcase = (id: number) => {
    if (votedSiteId === null) {
      setVotedSiteId(id);
      addReward(25, '🗳️ Твой голос на Витрине сайтов отдан! (+25 Опыта)');
    }
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          Уровень 4 • ⏱️ 40–70 мин • 🎁 До +150 ОП
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          🛠️ ЛАБОРАТОРИЯ: Строим первый живой мини-сайт
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Пройди 5 шагов вайб-кодера: от карточки идеи до тестирования в интерактивном симуляторе браузера и точечного улучшения!
        </p>
      </div>

      {/* STEP 1: Idea Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-cyan-400 font-mono">ШАГ 1 ИЗ 5 • ⏱️ 10 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              📝 Карточка идеи твоего первого сайта
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLoadPresetIdea('robot')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 font-semibold border border-slate-700 transition"
            >
              Идея: Робототехника
            </button>
            <button
              onClick={() => handleLoadPresetIdea('helper')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-purple-300 font-semibold border border-slate-700 transition"
            >
              Идея: AI Helper
            </button>
            <button
              onClick={() => handleLoadPresetIdea('eco')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-300 font-semibold border border-slate-700 transition"
            >
              Идея: Эко-патруль
            </button>
            <button
              onClick={handleSaveIdea}
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" /> Сохранить идею (+50 ОП)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-cyan-300 font-bold block">1. О чём сайт (тема и идея)?</label>
            <textarea
              rows={2}
              value={ideaCard.topic}
              onChange={e => setIdeaCard({ ...ideaCard, topic: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
              placeholder="Какая главная идея страницы?"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-purple-300 font-bold block">2. Для кого сайт (аудитория)?</label>
            <textarea
              rows={2}
              value={ideaCard.audience}
              onChange={e => setIdeaCard({ ...ideaCard, audience: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-purple-500 text-xs"
              placeholder="Кто твои будущие читатели или пользователи?"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-amber-300 font-bold block">3. Что должно быть на странице (блоки)?</label>
            <textarea
              rows={2}
              value={ideaCard.blocks}
              onChange={e => setIdeaCard({ ...ideaCard, blocks: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-500 text-xs"
              placeholder="Шапка, карточки, интерактивная кнопка, подвал..."
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="text-emerald-300 font-bold block">4. Стиль (цвета и настроение)?</label>
            <textarea
              rows={2}
              value={ideaCard.style}
              onChange={e => setIdeaCard({ ...ideaCard, style: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
              placeholder="Цветовая гамма, светлая или темная тема, характер"
            />
          </div>
        </div>
      </div>

      {/* STEP 2: Interactive Prompt Constructor */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-purple-400 font-mono">ШАГ 2 ИЗ 5 • ⏱️ 8 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              🧩 Живой Конструктор Строительного промпта
            </h3>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-purple-500/20"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedPrompt ? 'Скопировано в буфер!' : 'Скопировать для AI Studio (+25 ОП)'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span>🎭 РОЛЬ:</span> <span className="text-slate-500 font-normal">Кем выступает ИИ</span>
              </label>
              <input
                type="text"
                value={promptData.role}
                onChange={e => setPromptData({ ...promptData, role: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>🎯 ЦЕЛЬ:</span> <span className="text-slate-500 font-normal">Что именно построить</span>
              </label>
              <input
                type="text"
                value={promptData.goal}
                onChange={e => setPromptData({ ...promptData, goal: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <span>🧩 КОНТЕКСТ:</span> <span className="text-slate-500 font-normal">Для кого и почему</span>
              </label>
              <input
                type="text"
                value={promptData.context}
                onChange={e => setPromptData({ ...promptData, context: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <span>🚧 ОГРАНИЧЕНИЯ:</span> <span className="text-slate-500 font-normal">Что соблюдать строго</span>
              </label>
              <input
                type="text"
                value={promptData.constraints}
                onChange={e => setPromptData({ ...promptData, constraints: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>📦 РЕЗУЛЬТАТ:</span> <span className="text-slate-500 font-normal">Список блоков и элементов</span>
              </label>
              <textarea
                rows={2}
                value={promptData.output}
                onChange={e => setPromptData({ ...promptData, output: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Live Preview Column with colored parts */}
          <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-slate-950 border border-purple-500/40 font-mono text-xs space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                <span className="text-purple-300 font-bold">ЖИВОЙ СОБРАННЫЙ ПРОМПТ:</span>
                <span className="text-emerald-400">5/5 частей активны</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-slate-200 leading-relaxed whitespace-pre-wrap">
                <p>
                  Ты — <span className="text-cyan-300 font-bold underline decoration-cyan-500/50">{promptData.role}</span>.
                </p>
                <p>
                  Твоя цель: <span className="text-amber-300 font-bold underline decoration-amber-500/50">{promptData.goal}</span>.
                </p>
                <p>
                  Контекст: <span className="text-indigo-300 font-bold underline decoration-indigo-500/50">{promptData.context}</span>.
                </p>
                <p>
                  Ограничения: <span className="text-rose-300 font-bold underline decoration-rose-500/50">{promptData.constraints}</span>.
                </p>
                <p>
                  Результат: Создай сайт, где будут: <span className="text-emerald-300 font-bold underline decoration-emerald-500/50">{promptData.output}</span>.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Готово для вставки в Google AI Studio</span>
              <button
                onClick={handleCopyPrompt}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Скопировать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3 & 4: Interactive Browser Simulator & Testing Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-900/50 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              ШАГ 3 & 4 • ИНТЕРАКТИВНЫЙ БРАУЗЕР
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              💻 Симулятор запуска мини-сайта & Чек-лист проверки
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                previewDevice === 'desktop'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Monitor className="w-4 h-4" /> Десктоп
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                previewDevice === 'mobile'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Телефон
            </button>
          </div>
        </div>

        {/* Browser Window Chrome */}
        <div className={`mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 ${
          previewDevice === 'mobile' ? 'max-w-sm' : 'w-full max-w-3xl'
        }`}>
          {/* Window Header */}
          <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="flex-1 px-3 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[11px] font-mono flex items-center justify-between">
              <span>https://vibe-studio.khujand.ai/student-project-09</span>
              <RefreshCw className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Rendered Mock Website Body */}
          <div className="p-4 sm:p-6 bg-slate-950 text-slate-200 space-y-4">
            {/* Header / Nav */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="font-black text-sm text-cyan-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> RoboFuture 2050
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                Худжанд
              </span>
            </div>

            {/* Main Hero */}
            <div className={`space-y-2 py-2 ${isRefined ? 'text-center' : 'text-left'}`}>
              <h4 className="text-base sm:text-lg font-black text-white">
                Мечта: Инженер чистой энергии и роботов
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Я создаю компактных роботов для очистки солнечных панелей на крышах Худжанда, чтобы наш город дышал чистым воздухом и получал 100% энергии.
              </p>
            </div>

            {/* 3 Step Cards */}
            <div className={`grid gap-2.5 text-xs ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">1. Идея & 3D</span>
                <p className="text-[11px] text-slate-400">Проектирую форму дрона под ветровые потоки гор.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold">2. Сенсоры ИИ</span>
                <p className="text-[11px] text-slate-400">Обучаю микрокамеры определять слой песчаной пыли.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">3. Запуск в городе</span>
                <p className="text-[11px] text-slate-400">Тестирую на эко-домах набережной Сырдарьи.</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`pt-2 ${isRefined ? 'text-center' : 'text-left'}`}>
              <button
                className={`rounded-xl font-black text-xs transition shadow-lg ${
                  isRefined
                    ? 'px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 animate-pulse text-sm'
                    : 'px-4 py-2 bg-cyan-600 text-slate-950'
                }`}
              >
                Присоединиться к проекту 🚀
              </button>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 flex flex-wrap items-center justify-between gap-2 font-mono">
              <span>© 2026 • Проект ученика AI for Life</span>
              <span className="text-emerald-400">✓ Создано с помощью ИИ в Google AI Studio</span>
            </div>
          </div>
        </div>

        {/* STEP 4: Testing Checklist */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Шаг 4: Чек-лист тестирования (3 пункта)
            </h4>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              allTestsPassed ? 'bg-emerald-950 text-emerald-300 border-emerald-700' : 'bg-slate-950 text-slate-400 border-slate-700'
            }`}>
              {allTestsPassed ? 'Все тесты пройдены! 🏆' : 'Проверь каждый пункт'}
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'opensWithoutError',
                title: '1. Всё ли открывается и работает без ошибок?',
                desc: 'Кнопки нажимаются, блоки не наезжают друг на друга'
              },
              {
                id: 'looksGoodMobile',
                title: '2. Красиво ли выглядит на телефоне/маленьком экране?',
                desc: 'Переключись на режим «Телефон» выше и проверь адаптивность'
              },
              {
                id: 'noPrivateData',
                title: '3. Есть ли на сайте личные данные, которых там быть не должно?',
                desc: 'Убедись, что нет домашнего адреса, личного телефона и паспортных данных'
              }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleToggleCheck(item.id as 'opensWithoutError' | 'looksGoodMobile' | 'noPrivateData')}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                  testChecks[item.id as 'opensWithoutError' | 'looksGoodMobile' | 'noPrivateData']
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <strong className="text-xs sm:text-sm block">{item.title}</strong>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                  testChecks[item.id as 'opensWithoutError' | 'looksGoodMobile' | 'noPrivateData']
                    ? 'bg-emerald-400 text-slate-950'
                    : 'border border-slate-700'
                }`}>
                  {testChecks[item.id as 'opensWithoutError' | 'looksGoodMobile' | 'noPrivateData'] && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 5: Pinpoint Refinement */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-black text-amber-400 font-mono">ШАГ 5 ИЗ 5 • ⏱️ 7 МИН</span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> 🔁 Улучши одну деталь (Точечный запрос)
            </h3>
          </div>
          <button
            onClick={handleApplyRefine}
            className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs transition"
          >
            Применить улучшение (+25 ОП)
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Не переписывай весь промпт заново! Напиши точечную команду: «Оставь всё как есть, но измени [деталь]»:
        </p>

        <textarea
          rows={2}
          value={refinementPrompt}
          onChange={e => setRefinementPrompt(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
        />

        {isRefined && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Улучшение отображено в симуляторе выше: кнопка стала крупнее и добавлена центровка!</span>
          </div>
        )}
      </div>

      {/* LEVEL 6: Showcase / Gallery */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-black text-cyan-400 font-mono">УРОВЕНЬ 6 • ⏱️ 80–87 МИН</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-2">
              <Tv className="w-5 h-5 text-cyan-400" /> 🎤 Витрина сайтов: 20-секундный питч
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            Выставка первого сайта
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
          <strong className="text-cyan-300 block">Формула питча (20 секунд):</strong>
          <p className="italic text-slate-400">
            «Мой сайт про <strong>[Тема]</strong>. Самой сложной частью промпта для меня было <strong>[Роль / Ограничения]</strong>. На Шаге 5 я улучшил(а) <strong>[Деталь]</strong>!»
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">
            🗳️ Голосование класса: Самый понятный первый сайт
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {showcaseSites.map(site => (
              <button
                key={site.id}
                onClick={() => handleVoteShowcase(site.id)}
                className={`text-left p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                  votedSiteId === site.id
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
                    <span>{site.author}</span>
                    <span>{site.votes + (votedSiteId === site.id ? 1 : 0)} голосов</span>
                  </div>
                  <h5 className="font-black text-sm text-white mt-1">{site.title}</h5>
                  <p className="text-xs text-slate-400 mt-1">{site.topic}</p>
                  <p className="text-[11px] text-purple-300 font-mono mt-1">
                    Улучшение: {site.polish}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-cyan-400">
                  {votedSiteId === site.id ? '✓ Твой голос (+25 ОП)' : 'Проголосовать'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <InlineLabSubmission
        labId={9}
        lessonId={9}
        taskTitle="Сдача мини-сайта «Vibe Coder First Site»"
        rewardExp={100}
      />
    </div>
  );
};
