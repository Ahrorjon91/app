import React, { useState, useEffect } from 'react';
import {
  Users,
  Sparkles,
  Camera,
  Layers,
  Heart,
  Clock,
  Award,
  Copy,
  Check,
  Smile,
  ExternalLink,
  Upload,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';
import conceptSheetImg from '../../assets/images/lesson6_concept_sheet_1790074007164.jpg';

export const Lesson6LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Character Passport Data
  const [charForm, setCharForm] = useState({
    name: 'Фаррух',
    age: '15 лет',
    appearance: 'парень 15 лет, тёмные волнистые волосы средней длины, карие проницательные глаза, оранжевая толстовка с капюшоном и нашивкой гор Могултау',
    personality: 'энергичный мечтатель, изобретатель, всегда носит с собой блокнот для чертежей',
    backstory: 'потомственный мастер механики из Худжанда, разработал первый мини-генератор для велосипеда',
    ability: 'может рассчитать сопротивление воздуха и скорость любого транспорта на глаз',
    cityTie: 'строит первый аэродинамичный трамвай для новой набережной реки Сырдарья'
  });

  // Step 2-5: Prompt generation helper
  const getPromptForStep = (stepType: 'portrait' | 'fullbody' | 'emotions' | 'city') => {
    const base = `[CHARACTER REFERENCE: ${charForm.appearance}, named ${charForm.name}, ${charForm.age}]`;
    const styleEnding = `clean 3D animated illustration style, cinematic lighting, sharp details, octane render, 8k, highly consistent facial features`;

    switch (stepType) {
      case 'portrait':
        return `${base}, close-up portrait, neutral relaxed expression, looking straight at camera, soft studio lighting, ${styleEnding}`;
      case 'fullbody':
        return `${base}, full-length body shot standing confident, modern sneakers, dynamic heroic posture, ${styleEnding}`;
      case 'emotions':
        return `${base}, wide cheerful smile, laughing with joy, sparkling eyes, lively gesture, ${styleEnding}`;
      case 'city':
        return `${base}, standing on futuristic riverbank in Khujand 2050, Syr Darya river and Mogultau mountains in background, clean eco-city with vertical gardens and flying magnetic trams, golden hour, ${styleEnding}`;
    }
  };

  // Concept art sheet slot states
  const [activeSlot, setActiveSlot] = useState<'portrait' | 'fullbody' | 'emotions' | 'city'>('portrait');
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({
    portrait: true,
    fullbody: false,
    emotions: false,
    city: false
  });

  const toggleStepDone = (key: string) => {
    const next = !completedSteps[key];
    setCompletedSteps((prev) => ({ ...prev, [key]: next }));
    if (next) {
      addReward(25, `Шаг «${key.toUpperCase()}» выполнен и добавлен в Character Sheet! (+25 Опыта)`);
    }
  };

  // Gallery of heroes (Community works)
  const [gallery, setGallery] = useState([
    {
      id: 1,
      name: '«Нодира — Хранительница рек»',
      author: 'Мадина Т.',
      ability: 'Очистка воды наномикробами',
      tag: 'Эко-инженер',
      likes: 21,
      liked: false,
      consistencyScore: '98% сходство'
    },
    {
      id: 2,
      name: '«Рустам — Пилот магнитоплана»',
      author: 'Далер С.',
      ability: 'Скоростная навигация над Могултау',
      tag: 'Транспорт',
      likes: 29,
      liked: false,
      consistencyScore: '95% сходство'
    },
    {
      id: 3,
      name: '«Сомон — Архитектор квантовых садов»',
      author: 'Азиз М.',
      ability: 'Выращивание вертикальных садов',
      tag: 'Биотех',
      likes: 18,
      liked: false,
      consistencyScore: '92% сходство'
    }
  ]);

  const handleLikeHero = (id: number) => {
    setGallery((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const next = !h.liked;
          return {
            ...h,
            liked: next,
            likes: next ? h.likes + 1 : h.likes - 1
          };
        }
        return h;
      })
    );
    addReward(5, 'Голос за узнаваемого персонажа учтён! (+5 Опыта)');
  };

  // 20-Second Pitch Timer
  const [pitchTimeLeft, setPitchTimeLeft] = useState<number>(20);
  const [isPitchRunning, setIsPitchRunning] = useState<boolean>(false);
  const [pitchDone, setPitchDone] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isPitchRunning && pitchTimeLeft > 0) {
      timer = setInterval(() => {
        setPitchTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (pitchTimeLeft === 0 && isPitchRunning) {
      setIsPitchRunning(false);
      setPitchDone(true);
      addReward(25, '🎤 Презентация героя за 20 секунд успешно завершена! (+25 Опыта)');
    }
    return () => clearInterval(timer);
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
    addReward(10, '📋 Промпт скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Шапка лабораторной работы */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Лабораторная работа №6
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-700">
            ⏱️ 30 минут • Награда до +150 ОП
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Практикум: Сборка Character Sheet твоего Маскота
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Заполни форму Паспорта, сгенерируй 4 обязательных кадра (портрет, полный рост, эмоции, город) без потери лица и защити героя за 20 секунд!
          </p>
        </div>
      </div>

      {/* ШАГ 1: НАПИШИ ПАСПОРТ ПЕРСОНАЖА */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-xs font-black">
              1
            </span>
            Шаг 1: Напиши Паспорт персонажа (10 мин)
          </h3>
          <span className="text-xs text-purple-300 font-mono font-bold">+50 ОП</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">ИМЯ ГЕРОЯ:</label>
            <input
              type="text"
              value={charForm.name}
              onChange={(e) => setCharForm({ ...charForm, name: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">ВОЗРАСТ:</label>
            <input
              type="text"
              value={charForm.age}
              onChange={(e) => setCharForm({ ...charForm, age: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">СВЯЗЬ С ХУДЖАНД-2050:</label>
            <input
              type="text"
              value={charForm.cityTie}
              onChange={(e) => setCharForm({ ...charForm, cityTie: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3 space-y-1">
            <label className="text-slate-400 font-bold">ВНЕШНОСТЬ (5–7 точных примет: лицо, волосы, одежда, нашивка):</label>
            <textarea
              rows={2}
              value={charForm.appearance}
              onChange={(e) => setCharForm({ ...charForm, appearance: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">ХАРАКТЕР:</label>
            <input
              type="text"
              value={charForm.personality}
              onChange={(e) => setCharForm({ ...charForm, personality: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">ИСТОРИЯ:</label>
            <input
              type="text"
              value={charForm.backstory}
              onChange={(e) => setCharForm({ ...charForm, backstory: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-bold">СУПЕРСИЛА / НАВЫК:</label>
            <input
              type="text"
              value={charForm.ability}
              onChange={(e) => setCharForm({ ...charForm, ability: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* ШАГИ 2-5: CHARACTER SHEET & ГЕНЕРАТОР КАДРОВ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-xs font-black">
              2–5
            </span>
            Character Sheet: 4 обязательных кадра (+25 ОП за каждый)
          </h3>
          <span className="text-xs font-mono text-cyan-400">Concept Art раскладка</span>
        </div>

        {/* Табы 4 кадров */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'portrait', title: 'Шаг 2: Портрет', badge: 'Крупный план' },
            { id: 'fullbody', title: 'Шаг 3: Полный рост', badge: 'Уверенная поза' },
            { id: 'emotions', title: 'Шаг 4: Эмоция', badge: 'Радость / Смех' },
            { id: 'city', title: 'Шаг 5: В Худжанде', badge: 'Эко-город 2050' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSlot(tab.id as any)}
              className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                activeSlot === tab.id
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] text-cyan-400 font-mono">{tab.badge}</div>
              <div className="mt-0.5">{tab.title}</div>
              <div className="mt-1 flex items-center gap-1 text-[10px]">
                {completedSteps[tab.id] ? (
                  <span className="text-emerald-400 font-mono">✓ Готово (+25 ОП)</span>
                ) : (
                  <span className="text-slate-500 font-mono">○ Ожидает генерации</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Карточка активного шага с промптом для генерации */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
              Готовый референс-запрос для Google Whisk / Gemini:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(getPromptForStep(activeSlot), `slot-${activeSlot}`)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                {copiedKey === `slot-${activeSlot}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === `slot-${activeSlot}` ? 'Скопировано!' : 'Скопировать запрос'}</span>
              </button>
              <button
                onClick={() => toggleStepDone(activeSlot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
                  completedSteps[activeSlot]
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completedSteps[activeSlot] ? 'Кадр готов ✓' : 'Отметить готовым'}</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 break-words leading-relaxed">
            {getPromptForStep(activeSlot)}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>💡 Вставь этот текст в</span>
            <a
              href="https://labs.google/whisk"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-0.5 font-bold"
            >
              Google Whisk <ExternalLink className="w-3 h-3" />
            </a>
            <span>или Gemini и скачай полученную картинку.</span>
          </div>
        </div>

        {/* Пример профессионального Character Sheet */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
            Превью концепт-арт раскладки (Concept Character Sheet):
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={conceptSheetImg}
              alt="Character Sheet Concept Art"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* 🎤 УРОВЕНЬ 6 — ГАЛЕРЕЯ ГЕРОЕВ & 20-СЕКУНДНЫЙ ПИТЧ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-black text-white">
              Уровень 6: Галерея героев & Питч 20 секунд
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
            +25 ОП за питч
          </span>
        </div>

        {/* 20-секундный таймер защиты */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-amber-300 font-mono uppercase">
              🎤 Таймер защиты перед классом: ровно 20 секунд
            </span>
            <div className="text-lg font-mono font-black text-amber-400">
              {pitchTimeLeft} сек
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
            <div>1. Моего героя зовут: <strong>{charForm.name}</strong></div>
            <div>2. Его суперспособность: <strong>{charForm.ability}</strong></div>
            <div>3. Самое сложное было сохранить: <strong>[цвет куртки / лицо / волосы]</strong></div>
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
                🎉 Браво! Питч героя завершён ровно вовремя!
              </span>
            )}
          </div>
        </div>

        {/* Сетка героев класса с голосованием за узнаваемость */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
            Голосование класса: «Самый узнаваемый персонаж»
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gallery.map((h) => (
              <div
                key={h.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-pink-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold">
                      {h.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{h.author}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{h.name}</h4>
                  <div className="text-[11px] text-slate-400">
                    Навык: {h.ability}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">
                    ★ {h.consistencyScore}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <button
                    onClick={() => handleLikeHero(h.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      h.liked
                        ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-md shadow-rose-950/40'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${h.liked ? 'fill-rose-400 text-rose-400' : ''}`} />
                    <span>{h.likes}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">Голос за маскота</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ОФИЦИАЛЬНАЯ СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ МЕНТОРУ */}
      <div className="pt-4 border-t border-slate-800">
        <InlineLabSubmission
          lessonId={4}
          labTitle="Лабораторная работа: Урок 4 (Худжанд-2050 & Лист персонажа Маскота)"
        />
      </div>
    </div>
  );
};
