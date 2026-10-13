import React, { useState, useEffect } from 'react';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  Send,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Camera,
  Eye,
  Award,
  Flame,
  HelpCircle,
  ExternalLink,
  Upload
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson5LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Selected Theme
  const [selectedTheme, setSelectedTheme] = useState<string>('transport');

  const themes = [
    {
      id: 'neighborhood',
      icon: '🏙️',
      name: 'Мой квартал в 2050',
      desc: 'Знакомые улицы и махалля Худжанда, но с вертикальными садами и чистой энергией'
    },
    {
      id: 'nature',
      icon: '🏔️',
      name: 'Гора Могултау и Сырдарья',
      desc: 'Величественная природа в гармонии с футуристичными эко-технологиями'
    },
    {
      id: 'school',
      icon: '🎓',
      name: 'Школа и класс будущего',
      desc: 'Голографические экраны, капсулы отдыха и роботы-ассистенты для учеников'
    },
    {
      id: 'transport',
      icon: '🚗',
      name: 'Транспорт будущего',
      desc: 'Скоростные эко-трамваи на магнитных подушках и аэро-такси над рекой'
    }
  ];

  // Step 2: Form 6 parts state
  const [promptForm, setPromptForm] = useState({
    subject: 'Современный бесшумный трамвай на магнитной подушке',
    style: 'Реалистичная 3D-иллюстрация в духе качественной анимации',
    location: 'Худжанд, новая набережная реки Сырдарья с видом на Могултау',
    lighting: 'Тёплый вечерний золотой свет, длинные мягкие тени',
    camera: 'Вид с высоты птичьего полёта, широкий кинематографичный угол',
    mood: 'Уютная городская жизнь, чистое небо, без антиутопии'
  });

  // Step 3: Check-list for finding issues
  const [checkList, setCheckList] = useState({
    matchesIdea: true,
    noArtifacts: false,
    consistentStyle: true,
    correctMood: true
  });

  const toggleCheck = (key: keyof typeof checkList) => {
    const willBeChecked = !checkList[key];
    setCheckList((prev) => ({ ...prev, [key]: willBeChecked }));
    if (willBeChecked) {
      addReward(5, 'Пункт проверки отмечен! (+5 XP)');
    }
  };

  // Step 4: Versions progression
  const [currentVersion, setCurrentVersion] = useState<'v1' | 'v2' | 'v3'>('v1');
  const [versionChanges, setVersionChanges] = useState({
    v2: 'Изменил свет с серого дневного на тёплый закатный золотой',
    v3: 'Добавил в ракурс „вид сверху“ и убрал лишний шум фразой „без антиутопии“'
  });

  // Step 5: Art title and description
  const [artTitle, setArtTitle] = useState('«Золотые крылья Сырдарьи 2050»');
  const [artSaved, setArtSaved] = useState(false);

  // Gallery of class works (interactive likes)
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: '«Эко-Худжанд: Сады над рекой»',
      author: 'Алишер К.',
      theme: 'Эко-квартал',
      likes: 18,
      liked: false,
      style: '3D-анимация',
      badge: 'Самая атмосферная'
    },
    {
      id: 2,
      title: '«Неоновый мост через Сырдарью»',
      author: 'Зарина М.',
      theme: 'Транспорт',
      likes: 24,
      liked: false,
      style: 'Синтвейв',
      badge: 'Выбор ментора'
    },
    {
      id: 3,
      title: '«Школа на горе Могултау»',
      author: 'Темур С.',
      theme: 'Школа будущего',
      likes: 15,
      liked: false,
      style: 'Изометрия',
      badge: 'Лучшая детализация'
    }
  ]);

  const handleLike = (id: number) => {
    setGalleryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.liked;
          return {
            ...item,
            liked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1
          };
        }
        return item;
      })
    );
    addReward(5, 'Голос в Галерее учтён! (+5 Опыта)');
  };

  // 20-Second Gallery Pitch Timer
  const [pitchTimeLeft, setPitchTimeLeft] = useState<number>(20);
  const [isPitchRunning, setIsPitchRunning] = useState<boolean>(false);
  const [pitchDone, setPitchDone] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isPitchRunning && pitchTimeLeft > 0) {
      interval = setInterval(() => {
        setPitchTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (pitchTimeLeft === 0 && isPitchRunning) {
      setIsPitchRunning(false);
      setPitchDone(true);
      addReward(25, '🎤 Презентация 20 секунд в Галерее завершена! Аплодисменты зала! (+25 Опыта)');
    }
    return () => clearInterval(interval);
  }, [isPitchRunning, pitchTimeLeft]);

  const handleStartPitch = () => {
    setPitchTimeLeft(20);
    setPitchDone(false);
    setIsPitchRunning(true);
  };

  const handleResetPitch = () => {
    setIsPitchRunning(false);
    setPitchTimeLeft(20);
    setPitchDone(false);
  };

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Шаблон скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateV1Prompt = () => {
    return `${promptForm.subject}. Стиль: ${promptForm.style}. Место: ${promptForm.location}. Освещение: ${promptForm.lighting}. Ракурс: ${promptForm.camera}. Настроение: ${promptForm.mood}. High quality render, clean details.`;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Шапка лабораторной работы */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" /> Лабораторная работа №5
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            ⏱️ 30 минут • Награда до +150 ОП
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Практикум: Создание картины «Худжанд-2050»
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Пройди путь от выбора темы до 3 итераций промпта, представь свою работу в Галерее класса и загрузи отчёт ментору!
          </p>
        </div>
      </div>

      {/* ШАГ 1: ВЫБОР ТЕМЫ */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-xs font-black">
              1
            </span>
            Шаг 1: Выбери тему для картины будущего
          </h3>
          <span className="text-xs text-cyan-400 font-mono">2 мин</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTheme(t.id);
                addReward(10, `Выбрана тема: ${t.name}`);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedTheme === t.id
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.02]'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="font-bold text-white text-xs sm:text-sm">{t.name}</div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ШАГ 2: СБОРКА ЗАПРОСА v1 ПО ФОРМУЛЕ */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-xs font-black">
              2
            </span>
            Шаг 2: Собери запрос v1 по формуле 6 частей
          </h3>
          <span className="text-xs text-purple-300 font-mono font-bold">+50 ОП</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">🧍 ГЕРОЙ:</label>
            <input
              type="text"
              value={promptForm.subject}
              onChange={(e) => setPromptForm({ ...promptForm, subject: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">🎨 СТИЛЬ:</label>
            <input
              type="text"
              value={promptForm.style}
              onChange={(e) => setPromptForm({ ...promptForm, style: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">🏞️ МЕСТО:</label>
            <input
              type="text"
              value={promptForm.location}
              onChange={(e) => setPromptForm({ ...promptForm, location: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">💡 СВЕТ:</label>
            <input
              type="text"
              value={promptForm.lighting}
              onChange={(e) => setPromptForm({ ...promptForm, lighting: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">📷 РАКУРС:</label>
            <input
              type="text"
              value={promptForm.camera}
              onChange={(e) => setPromptForm({ ...promptForm, camera: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">🎭 НАСТРОЕНИЕ:</label>
            <input
              type="text"
              value={promptForm.mood}
              onChange={(e) => setPromptForm({ ...promptForm, mood: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Готовый промпт для копирования */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-purple-300 font-bold uppercase">
              Готовый запрос v1 для генератора (Whisk / Gemini):
            </span>
            <button
              onClick={() => handleCopy(generateV1Prompt(), 'lab-v1')}
              className="px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              {copiedKey === 'lab-v1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'lab-v1' ? 'Скопировано!' : 'Скопировать v1'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200">
            {generateV1Prompt()}
          </div>
        </div>
      </div>

      {/* ШАГ 3: ЧЕК-ЛИСТ ПРОВЕРКИ И ПОИСКА ДЕФЕКТОВ */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-xs font-black">
              3
            </span>
            Шаг 3: Проверь результат v1 по чек-листу художника
          </h3>
          <span className="text-xs text-amber-400 font-mono">5 мин</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {[
            {
              key: 'matchesIdea',
              title: '☐ Похоже ли это на то, что я задумывал?',
              desc: 'Главные объекты на месте, Худжанд узнаётся, атмосфера соответствует плану.'
            },
            {
              key: 'noArtifacts',
              title: '☐ Нет ли странностей и артефактов?',
              desc: 'Проверь руки людей, летающие колеса, кривые буквы на вывесках и странные симметрии.'
            },
            {
              key: 'consistentStyle',
              title: '☐ Стиль выдержан одинаково по всему кадру?',
              desc: 'Нет ли внезапной вставки аниме в реалистичную сцену или странного размытия.'
            },
            {
              key: 'correctMood',
              title: '☐ Настроение совпадает с замыслом?',
              desc: 'Свет передаёт нужное чувство: утро бодрит, закат греет, нет лишней темноты.'
            }
          ].map((c) => {
            const isChecked = checkList[c.key as keyof typeof checkList];
            return (
              <div
                key={c.key}
                onClick={() => toggleCheck(c.key as keyof typeof checkList)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isChecked
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{c.title.replace('☐ ', '')}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ШАГ 4: ИТЕРАЦИИ v1 → v2 → v3 */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs font-black">
              4
            </span>
            Шаг 4: Улучши изображение (v1 → v2 → v3)
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">+25 ОП за версию</span>
        </div>

        <p className="text-xs text-slate-300">
          Помни научное правило: <strong>меняй строго одну переменную</strong> за один раз!
        </p>

        <div className="flex gap-2">
          {(['v1', 'v2', 'v3'] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setCurrentVersion(v);
                addReward(15, `Переключена версия: ${v.toUpperCase()}`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                currentVersion === v
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-mono'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Версия {v.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
          <div className="text-xs font-bold text-emerald-300 font-mono">
            Изменения в версии {currentVersion.toUpperCase()}:
          </div>
          {currentVersion === 'v1' && (
            <p className="text-xs text-slate-400">
              Базовый запуск. Проверь композицию и определи главное слабое место (например, слишком серое небо или отсутствие деталей).
            </p>
          )}
          {currentVersion === 'v2' && (
            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-bold">Что было изменено в версии v2:</label>
              <input
                type="text"
                value={versionChanges.v2}
                onChange={(e) => setVersionChanges({ ...versionChanges, v2: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300"
              />
            </div>
          )}
          {currentVersion === 'v3' && (
            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-bold">Финальный штрих в версии v3:</label>
              <input
                type="text"
                value={versionChanges.v3}
                onChange={(e) => setVersionChanges({ ...versionChanges, v3: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* ШАГ 5: ФИНАЛЬНАЯ ВЕРСИЯ И НАЗВАНИЕ КАРТИНЫ */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-mono text-xs font-black">
              5
            </span>
            Шаг 5: Назови свой шедевр и подготовься к показу
          </h3>
          <span className="text-xs text-pink-300 font-mono font-bold">+25 ОП</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Художественное название картины:</label>
            <input
              type="text"
              value={artTitle}
              onChange={(e) => setArtTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:border-pink-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Формула лучшей версии:</label>
            <input
              type="text"
              readOnly
              value={`${promptForm.style} + ${promptForm.lighting}`}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-pink-300 font-mono text-xs"
            />
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={() => {
              setArtSaved(true);
              addReward(25, `Картина «${artTitle}» сохранена в твоём портфолио! (+25 Опыта)`);
            }}
            className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 ml-auto shadow-lg shadow-pink-500/20"
          >
            <Award className="w-4 h-4" />
            <span>{artSaved ? 'Сохранено в портфолио! ✓' : 'Сохранить карточку картины (+25 XP)'}</span>
          </button>
        </div>
      </div>

      {/* 🎤 УРОВЕНЬ 6 — ГАЛЕРЕЯ КЛАССА & 20-СЕКУНДНЫЙ ПИТЧ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Галерея работ класса & 20-секундный питч картины
          </h3>
          <span className="text-xs font-mono text-amber-300">+25 ОП</span>
        </div>

        {/* 20-секундный таймер */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-amber-300 font-mono uppercase">
              🎤 Таймер презентации перед классом: ровно 20 секунд
            </span>
            <div className="text-lg font-mono font-black text-amber-400">
              {pitchTimeLeft} сек
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
            <div>1. Название работы: <strong>{artTitle}</strong></div>
            <div>2. Что я хотел показать: <strong>{promptForm.subject}</strong> в Худжанде</div>
            <div>3. Что улучшил между v1 и финалом: <strong>{versionChanges.v2}</strong></div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartPitch}
              disabled={isPitchRunning}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isPitchRunning ? 'Идёт отсчёт...' : 'Начать 20 секунд (+25 XP)'}</span>
            </button>
            <button
              onClick={handleResetPitch}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
            >
              Сброс
            </button>
            {pitchDone && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                🎉 Браво! Питч уложился в хронометраж!
              </span>
            )}
          </div>
        </div>

        {/* Сетка работ класса с лайками */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
            Выставка картин «Худжанд-2050» в реальном времени:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-pink-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 border border-pink-800 text-pink-300 font-mono font-bold">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{item.author}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{item.title}</h4>
                  <div className="text-[11px] text-slate-400">
                    Тема: {item.theme} • Стиль: {item.style}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      item.liked
                        ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-md shadow-rose-950/40'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.liked ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{item.likes}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">Голос класса</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
