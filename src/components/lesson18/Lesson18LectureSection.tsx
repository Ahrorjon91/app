import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Code,
  Layers,
  ArrowRight,
  Database,
  Globe,
  Radio,
  Wifi,
  HardDrive,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Send,
  HelpCircle,
  Clock,
  Play,
  Volume2,
  VolumeX,
  Coffee,
  Server,
  CloudLightning,
  ChevronRight,
  Save,
  Trash2,
  RefreshCw,
  Eye,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson18LectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Accessibility: animations toggle
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Easter egg: click floppy disk 3 times
  const [floppyClicks, setFloppyClicks] = useState(0);
  const [easterEggFound, setEasterEggFound] = useState(false);

  const handleFloppyClick = () => {
    if (easterEggFound) return;
    const next = floppyClicks + 1;
    setFloppyClicks(next);
    if (next >= 3) {
      setEasterEggFound(true);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.3 } });
      addReward(25, '💾 Секретная пасхалка найдена! Nova сохранил своё ядро в LocalStorage (+25 ОП)!');
    }
  };

  // Superpowers checklist
  const [superpowers, setSuperpowers] = useState<Record<string, boolean>>({
    sp1: true,
    sp2: false,
    sp3: false,
    sp4: false,
    sp5: false
  });

  const toggleSuperpower = (key: string) => {
    setSuperpowers(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const allDone = Object.values(next).every(Boolean);
      if (allDone && !prev[key]) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        addReward(20, '⚡ Все 5 суперсил Миссии 18 активированы (+20 ОП)!');
      }
      return next;
    });
  };

  // Level 1: Amnesia vs Memory Demo
  // Left: Amnesia App (State only)
  const [amnesiaTaskInput, setAmnesiaTaskInput] = useState('');
  const [amnesiaTasks, setAmnesiaTasks] = useState<string[]>([
    'Купить тетрадь по кодингу',
    'Сделать дз по математике'
  ]);
  const [amnesiaLost, setAmnesiaLost] = useState(false);

  const addAmnesiaTask = () => {
    if (!amnesiaTaskInput.trim()) return;
    setAmnesiaTasks(prev => [...prev, amnesiaTaskInput.trim()]);
    setAmnesiaTaskInput('');
    setAmnesiaLost(false);
  };

  const simulateAmnesiaF5 = () => {
    setAmnesiaTasks([]);
    setAmnesiaLost(true);
  };

  // Right: Memory App (LocalStorage backed)
  const [memoryTaskInput, setMemoryTaskInput] = useState('');
  const [memoryTasks, setMemoryTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lesson18_demo_memory_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['Купить тетрадь по кодингу', 'Сделать дз по математике'];
  });
  const [memorySavedNotice, setMemorySavedNotice] = useState(false);

  const addMemoryTask = () => {
    if (!memoryTaskInput.trim()) return;
    const next = [...memoryTasks, memoryTaskInput.trim()];
    setMemoryTasks(next);
    setMemoryTaskInput('');
    try {
      localStorage.setItem('lesson18_demo_memory_tasks', JSON.stringify(next));
    } catch {}
    setMemorySavedNotice(true);
    setTimeout(() => setMemorySavedNotice(false), 2000);
  };

  const simulateMemoryF5 = () => {
    try {
      const saved = localStorage.getItem('lesson18_demo_memory_tasks');
      if (saved) {
        setMemoryTasks(JSON.parse(saved));
      }
    } catch {}
    setMemorySavedNotice(true);
    setTimeout(() => setMemorySavedNotice(false), 2000);
  };

  // Level 1: Vote poll
  const [voteSelected, setVoteSelected] = useState<number | null>(null);

  // Level 2: Teahouse Waiter API Simulation
  const dishes = [
    { id: 1, name: 'Самаркандский плов 🍛', prepTime: '0.35s', chef: 'Усто Бахром' },
    { id: 2, name: 'Сочный шашлык из баранины 🍢', prepTime: '0.42s', chef: 'Мангалчи Санджар' },
    { id: 3, name: 'Горячий уйгурский лагман 🍜', prepTime: '0.28s', chef: 'Шеф Алишер' },
    { id: 4, name: 'Тандырная хрустящая самса 🥟', prepTime: '0.19s', chef: 'Пекарь Фаррух' },
    { id: 5, name: 'Чайник зелёного чая №95 с лимоном 🫖', prepTime: '0.12s', chef: 'Чайханщик Дилшод' }
  ];

  const [selectedDish, setSelectedDish] = useState(dishes[0]);
  const [apiStep, setApiStep] = useState<'idle' | 'requesting' | 'kitchen' | 'served'>('idle');
  const [servedCount, setServedCount] = useState(0);

  const triggerWaiterOrder = () => {
    if (apiStep !== 'idle' && apiStep !== 'served') return;
    setApiStep('requesting');

    setTimeout(() => {
      setApiStep('kitchen');
    }, 700);

    setTimeout(() => {
      setApiStep('served');
      setServedCount(prev => {
        const next = prev + 1;
        if (next === 1) {
          addReward(25, '🍛 Заказ в Чайхана-API успешно выполнен (+25 ОП)!');
        }
        return next;
      });
      if (animationsEnabled) {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      }
    }, 1500);
  };

  // Level 3: Roleplay client-server quiz
  const [roleplayStep, setRoleplayStep] = useState(1);
  const [roleplayClaimed, setRoleplayClaimed] = useState(false);

  const roleplayDialogs = [
    {
      req: 'Frontend (Клиент): GET /api/weather?city=Khujand',
      res: 'Backend (Сервер): 200 OK -> { temp: 24, sky: "Sunny", wind: "3 m/s" }',
      desc: 'Запрос погоды для конкретного города'
    },
    {
      req: 'Frontend (Клиент): GET /api/quote/random',
      res: 'Backend (Сервер): 200 OK -> { quote: "Код — это поэзия логики", author: "Ada Lovelace" }',
      desc: 'Запрос случайной цитаты дня'
    },
    {
      req: 'Frontend (Клиент): POST /api/tasks { title: "Сделать проект" }',
      res: 'Backend (Сервер): 201 Created -> { id: 42, status: "Saved to DB" }',
      desc: 'Отправка новой задачи на сохранение в базу'
    }
  ];

  const handleNextRoleplay = () => {
    if (roleplayStep < 3) {
      setRoleplayStep(s => s + 1);
    } else if (!roleplayClaimed) {
      setRoleplayClaimed(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      addReward(25, '🎭 Ролевая игра «Клиент-Сервер» пройдена (+25 ОП)!');
    }
  };

  // Copy Cheat Sheet
  const [copiedCheat, setCopiedCheat] = useState(false);
  const cheatSheetText = `STATE          = временная память "прямо сейчас" (исчезает при обновлении)
LOCAL STORAGE  = память, сохранённая на устройстве (остаётся)
API            = "звонок" в интернет за живыми данными

API-ЦЕПОЧКА:  Приложение → Request (запрос) → Сервер → Response (ответ) → Приложение

ПРИМЕРЫ API:  Погода · Цитаты · Факты о животных · Космос

БЕЗОПАСНОСТЬ:  Никогда не хранить пароли/платные ключи в коде приложения

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheat = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2500);
  };

  return (
    <div className="space-y-12 text-slate-200">
      {/* ========================================================================= */}
      {/* ACCESSIBILITY & EASTER EGG BAR */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/60 p-3 px-4 rounded-2xl border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={handleFloppyClick}
            title="Кликни 3 раза для пасхалки!"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <HardDrive className="w-4 h-4" />
            <span className="font-bold">Память: {easterEggFound ? '💾 100% UNLOCKED' : `${floppyClicks}/3 кликов`}</span>
          </button>
          {easterEggFound && (
            <span className="text-emerald-400 font-bold animate-pulse">
              🎉 +25 ОП за дискету Nova!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs"
          >
            {animationsEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>Анимации: {animationsEnabled ? 'ВКЛ' : 'ВЫКЛ'}</span>
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">90 мин · 7 уровней</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO BANNER */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 shadow-2xl">
        <div className="relative p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              Миссия 18 • DATA & API
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono text-xs font-bold">
              Блок 5: AI Apps (2/4 ⭐⭐)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Память приложения: как оно запоминает и «звонит» в интернет за данными
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            90 минут. 7 уровней. 1 приложение, которое <strong>ПОМНИТ</strong> и умеет «звонить» за живыми данными. Твой прототип из прошлой миссии забывал всё при обновлении страницы. Сегодня это заканчивается! 🧠💾
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INCOMING MESSAGE FROM NOVA */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-indigo-950/40 border-2 border-cyan-400/40 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-xl shrink-0">
            🤖
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Входящее сообщение • NOVA
            </div>
            <h3 className="text-base font-bold text-white">
              «Салом, App Builder! 👋 Твой софт учится помнить.»
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-13">
          «Твой прототип уже отлично нажимается — но у него пока нет долговременной памяти. Сегодня мы дадим ему настоящую память (<strong>Data</strong> в LocalStorage) и научим «звонить» в интернет за свежей информацией (<strong>API</strong>). После этой миссии твоё приложение станет по-настоящему полезным, а не просто красивым. 🟢»
        </p>
      </div>

      {/* ========================================================================= */}
      {/* AI NEWS OF THE WEEK */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              ОБЗОР ТЕХНОЛОГИЙ • 2026
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              📰 НОВОСТИ ИИ ЗА ЭТУ НЕДЕЛЮ
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Тренды Data & Public APIs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌐</span>
              <h4 className="font-bold text-white text-sm">Бесплатные каталоги API</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Сегодня существуют огромные бесплатные каталоги API — тысячи готовых источников данных (погода, цитаты, космос, спорт), которыми может пользоваться любой, включая школьников без кредитных карт.
            </p>
            <div className="text-[11px] text-cyan-400 font-mono font-bold">
              💡 Почему важно: реальный, бесплатный и легальный способ получать живые данные!
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <h4 className="font-bold text-white text-sm">ИИ-обогащение данных</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Определение тем, поиск сущностей и фактчекинг в 2026 году стали стандартом API, а не редкой возможностью. API теперь отдают уже умно предобработанную ИИ информацию.
            </p>
            <div className="text-[11px] text-teal-400 font-mono font-bold">
              💡 Почему важно: сервер сразу делает «умную работу» до отображения на экране.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <h4 className="font-bold text-white text-sm">Весь интернет держится на API</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Почти каждое приложение, которым ты пользуешься каждый день — от карт Яндекс и Google до Spotify и Telegram — работает благодаря API под капотом.
            </p>
            <div className="text-[11px] text-indigo-400 font-mono font-bold">
              💡 Почему важно: ты учишься тому же фундаментальному принципу, на котором стоит весь Web.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <h4 className="font-bold text-white text-sm">Бесплатных лимитов достаточно</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Специалисты советуют: для тестов и учебных проектов бесплатных лимитов API вполне хватает. Платные подписки требуются только при миллионных нагрузках.
            </p>
            <div className="text-[11px] text-amber-400 font-mono font-bold">
              💡 Почему важно: нам не нужно платить ни копейки, чтобы построить крутой рабочий софт.
            </div>
          </div>
        </div>

        {/* Classroom Discussion Prompt */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>💬 Обсудите в классе:</strong> назовите приложение, которое показывает вам «живую» информацию (погода, курс сомони/доллара, новости). Как вы думаете, откуда оно это знает?
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUPERPOWERS OF MISSION 18 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              СНАРЯЖЕНИЕ И ЦЕЛИ
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              🎯 5 Суперсил Миссии 18
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
            Освоено: {Object.values(superpowers).filter(Boolean).length} / 5
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'sp1', icon: '🧠', text: 'Понимать разницу между State, Local Storage и API' },
            { id: 'sp2', icon: '💾', text: 'Делать так, чтобы данные не пропадали при обновлении страницы' },
            { id: 'sp3', icon: '📡', text: 'Подключать приложение к настоящему бесплатному API' },
            { id: 'sp4', icon: '🔄', text: 'Понимать цепочку Request ➔ Response' },
            { id: 'sp5', icon: '🛠️', text: 'Превращать прототип в функциональное полезное приложение' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleSuperpower(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                superpowers[item.id]
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-100 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xl shrink-0">{item.icon}</div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  {superpowers[item.id] ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />}
                  {item.text}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MISSION ROADMAP & 3 SHIELDS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-400 font-mono uppercase tracking-widest">
              МАРШРУТ И БЕЗОПАСНОСТЬ
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" />
              🗺️ Карта миссии: 7 Уровней
            </h2>
          </div>
          <span className="text-xs font-mono text-indigo-300">до +350 ОП суммарно</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
            <div className="text-lg">🔥</div>
            <div className="font-bold text-white mt-1">1. Запуск</div>
            <div className="text-[10px] text-slate-400">0–10 мин</div>
            <div className="text-[10px] text-amber-400 font-bold">+25 ОП</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30">
            <div className="text-lg">🧠</div>
            <div className="font-bold text-white mt-1">2. Теория</div>
            <div className="text-[10px] text-slate-400">10–25 мин</div>
            <div className="text-[10px] text-cyan-400 font-bold">3 памяти</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30">
            <div className="text-lg">🎭</div>
            <div className="font-bold text-white mt-1">3. Игра</div>
            <div className="text-[10px] text-slate-400">25–40 мин</div>
            <div className="text-[10px] text-purple-400 font-bold">+25 ОП</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/30">
            <div className="text-lg">💻</div>
            <div className="font-bold text-white mt-1">4. Лаба</div>
            <div className="text-[10px] text-slate-400">40–70 мин</div>
            <div className="text-[10px] text-teal-400 font-bold">+150 ОП</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30">
            <div className="text-lg">🩺⚡</div>
            <div className="font-bold text-white mt-1">5. Доктор</div>
            <div className="text-[10px] text-slate-400">70–80 мин</div>
            <div className="text-[10px] text-rose-400 font-bold">+100 ОП</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30">
            <div className="text-lg">🎤</div>
            <div className="font-bold text-white mt-1">6. Показ</div>
            <div className="text-[10px] text-slate-400">80–87 мин</div>
            <div className="text-[10px] text-indigo-400 font-bold">+25 ОП</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
            <div className="text-lg">🏆</div>
            <div className="font-bold text-white mt-1">7. Ранг</div>
            <div className="text-[10px] text-slate-400">87–90 мин</div>
            <div className="text-[10px] text-emerald-400 font-bold">+25 ОП</div>
          </div>
        </div>

        {/* 3 Shields and Special Rule */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            3 Щита безопасности: 🛡️ Проверяй · 🛡️ Не делись личным · 🛡️ Будь честным
          </div>
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 leading-relaxed font-sans">
            <strong>📡 Особое правило миссии:</strong> используй только <strong>бесплатные и безопасные публичные API</strong> (погода, цитаты, факты). Никогда не вставляй в код платные API-ключи, токены или свои личные пароли — даже «для теста»!
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 1 — LAUNCH: AMNESIA VS MEMORY APP DEMO */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 1 • ⏱ 0–10 МИН • 🎁 +25 ОП ЗА ДЗ 17
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-400" />
              🔥 ЗАПУСК: Приложение с амнезией против Приложения с памятью
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Живое интерактивное сравнение</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Посмотри на два одинаковых интерфейса. Добавь задачу в оба, а затем нажми <strong>«Обновить (F5)»</strong>. Увидишь фундаментальную разницу между чистым State в оперативной памяти и постоянным Local Storage!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Amnesia App */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 font-mono uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Приложение с амнезией (State only)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Память: RAM</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Новая задача..."
                  value={amnesiaTaskInput}
                  onChange={(e) => setAmnesiaTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addAmnesiaTask()}
                  className="flex-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
                <button
                  onClick={addAmnesiaTask}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                >
                  Добавить
                </button>
              </div>

              {/* Task list */}
              <div className="space-y-1.5 min-h-[90px] p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                {amnesiaTasks.length === 0 ? (
                  <div className="text-center py-4 text-xs text-rose-300">
                    {amnesiaLost ? (
                      <span className="font-bold">😱 Ой! Страница обновилась — всё исчезло без следа!</span>
                    ) : (
                      'Список пуст'
                    )}
                  </div>
                ) : (
                  amnesiaTasks.map((t, idx) => (
                    <div key={idx} className="p-1.5 px-2 rounded-lg bg-slate-800/80 text-xs text-slate-200 flex items-center justify-between">
                      <span>• {t}</span>
                      <span className="text-[10px] text-rose-400 font-mono">временное</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={simulateAmnesiaF5}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 text-rose-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-rose-400" />
              Имитировать обновление страницы (F5)
            </button>
          </div>

          {/* Right: Memory App */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Приложение с памятью (Local Storage)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Память: LocalStorage</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Новая задача..."
                  value={memoryTaskInput}
                  onChange={(e) => setMemoryTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addMemoryTask()}
                  className="flex-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
                <button
                  onClick={addMemoryTask}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  Сохранить
                </button>
              </div>

              {/* Task list */}
              <div className="space-y-1.5 min-h-[90px] p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                {memoryTasks.length === 0 ? (
                  <div className="text-center py-4 text-xs text-slate-500">Список задач пуст</div>
                ) : (
                  memoryTasks.map((t, idx) => (
                    <div key={idx} className="p-1.5 px-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 flex items-center justify-between">
                      <span>✓ {t}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">сохранено</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={simulateMemoryF5}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              {memorySavedNotice ? '🎉 Задачи прочитаны из LocalStorage!' : 'Имитировать F5 (Память сохранена)'}
            </button>
          </div>
        </div>

        {/* Voting poll */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <span>🗳️ Голосуем в классе:</span>
            <span className="text-slate-400 font-normal">Что вы чувствуете, когда игра или сайт «забыли» ваш прогресс?</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { id: 1, label: '😤 Ярость и злость' },
              { id: 2, label: '😢 Грусть и тоска' },
              { id: 3, label: '🚪 Бросаю и ухожу' },
              { id: 4, label: '🛠️ Хочу починить сам!' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setVoteSelected(item.id)}
                className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                  voteSelected === item.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 2 — DECODING: STATE, STORAGE, API */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 2 • ⏱ 10–25 МИН • БАЗОВАЯ АРХИТЕКТУРА
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Database className="w-6 h-6 text-cyan-400" />
              🧠 РАСШИФРОВКА: 3 Вида Памяти Приложения
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300">State vs LocalStorage vs API</span>
        </div>

        {/* Card 1: 3 Types of Memory */}
        <div className="space-y-4">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-cyan-300">
            🃏 Карточка 1 — 3 Вида памяти и их аналогии
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">⚡</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">ВРЕМЕННО</span>
              </div>
              <h5 className="font-bold text-white text-base">State (Состояние)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Оперативная память приложения «прямо сейчас». Исчезает в ту же секунду, как пользователь обновил или закрыл вкладку.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-mono">
                💡 <strong>Аналогия:</strong> То, что ты держишь в руках прямо сейчас (отпустил — упало).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">💾</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">НАДЕЖНО</span>
              </div>
              <h5 className="font-bold text-white text-base">Local Storage</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Память, сохранённая на ЭТОМ конкретном устройстве. Остаётся навсегда, даже если закрыть браузер или перезагрузить компьютер.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                💡 <strong>Аналогия:</strong> То, что ты положил в свой рюкзак (всегда остаётся с тобой).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">📡</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">ЖИВЫЕ ДАННЫЕ</span>
              </div>
              <h5 className="font-bold text-white text-base">API (Внешние данные)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Данные, которые приложение запрашивает через интернет у удалённого сервера. Обновляются каждый раз при новом запросе.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 font-mono">
                💡 <strong>Аналогия:</strong> Позвонить другу и спросить погоду или свежие новости.
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: What is API & Teahouse Waiter Simulation */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-black text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-cyan-400" />
              🃏 Карточка 2 — Заказ в Чайхане 🍛: Мини-игра «Официант-API»
            </h4>
            <span className="text-xs text-slate-400 font-mono">Цепочка: Request ➔ Server ➔ Response</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Выбери национальное блюдо в меню (параметры запроса), отправь запрос и посмотри, как <strong>Официант (API)</strong> относит заказ на <strong>Кухню (Сервер)</strong> и возвращает готовое блюдо с ответом <strong>200 OK</strong>!
            </p>

            {/* Menu options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {dishes.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDish(d)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                    selectedDish.id === d.id
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>{d.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Ожидание: {d.prepTime}</div>
                </button>
              ))}
            </div>

            {/* Interactive animation stage */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Smartphone className="w-5 h-5" />
                  <span>ТЫ (Клиент)</span>
                </div>
                <div className="text-center font-bold text-amber-400">
                  {apiStep === 'idle' && 'Готов сделать запрос'}
                  {apiStep === 'requesting' && '🏃 Официант бежит на кухню (Request: POST /order)...'}
                  {apiStep === 'kitchen' && '🍳 Шеф-повар готовит данные на сервере...'}
                  {apiStep === 'served' && '✅ Заказ доставлен! 200 OK'}
                </div>
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Server className="w-5 h-5" />
                  <span>КУХНЯ (Сервер / API)</span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden relative border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400 transition-all duration-700"
                  style={{
                    width:
                      apiStep === 'idle'
                        ? '10%'
                        : apiStep === 'requesting'
                        ? '50%'
                        : apiStep === 'kitchen'
                        ? '80%'
                        : '100%'
                  }}
                />
              </div>

              {/* JSON Response preview */}
              {apiStep === 'served' && (
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 space-y-1">
                  <div className="text-emerald-400 font-bold">HTTP/1.1 200 OK (Content-Type: application/json)</div>
                  <pre className="text-slate-300 overflow-x-auto">
{JSON.stringify(
  {
    status: 200,
    dish: selectedDish.name,
    chef: selectedDish.chef,
    time: selectedDish.prepTime,
    taste: 'Delicious!',
    servedAt: new Date().toLocaleTimeString()
  },
  null,
  2
)}
                  </pre>
                </div>
              )}

              <button
                onClick={triggerWaiterOrder}
                disabled={apiStep === 'requesting' || apiStep === 'kitchen'}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Сделать заказ: {selectedDish.name} (Отправить Request)
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Free Safe APIs for Students */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-cyan-300">
            🃏 Карточка 3 — Примеры безопасных бесплатных API для учеников
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { icon: '🌦️', name: 'Weather API', desc: 'Погода в любом городе мира', sample: 'temp, wind, cloud' },
              { icon: '💬', name: 'Quotes API', desc: 'Случайная мотивационная цитата', sample: 'author, text' },
              { icon: '🐱', name: 'Animal Facts', desc: 'Случайные факты о животных', sample: 'cat facts, dogs' },
              { icon: '🚀', name: 'Space API', desc: 'Факты и свежие фото о космосе', sample: 'NASA astronomy potd' },
              { icon: '🔢', name: 'Number Facts', desc: 'Интересный факт про любое число', sample: 'trivia, math facts' }
            ].map((api, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xl">{api.icon}</div>
                <div className="font-bold text-white text-xs">{api.name}</div>
                <div className="text-[11px] text-slate-400 leading-tight">{api.desc}</div>
                <div className="text-[10px] text-cyan-400 font-mono pt-1">Поля: {api.sample}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-400 italic">
            ✅ Все эти API полностью бесплатны, не требуют ввода пароля/банковской карты и безопасны для школьных проектов.
          </div>
        </div>

        {/* Card 4: Data Prompt Template */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-black text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              🃏 Карточка 4 — Data-запрос для ИИ (Формула промпта)
            </h4>
            <button
              onClick={handleCopyCheat}
              className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {copiedCheat ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCheat ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`DATA-ЗАПРОС = 
"Добавь сохранение данных в моё приложение: [что именно должно сохраняться],
чтобы оно не пропадало при обновлении страницы через localStorage.

Дополнительно (если используем API):
Подключи бесплатный API [название/тип], который получает [что именно],
и покажи результат в разделе [где]. Обязательно добавь индикатор загрузки и обработку ошибок."`}
          </pre>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEVEL 3 — ROLEPLAY: CLIENT & SERVER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-purple-400 font-mono uppercase tracking-widest">
              УРОВЕНЬ 3 • ⏱ 25–40 МИН • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Radio className="w-6 h-6 text-purple-400" />
              🎭 РОЛЕВАЯ ИГРА: Frontend и Backend (Клиент-Сервер)
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800">
            Раунд: {roleplayStep} / 3
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В реальной разработке один человек отвечает за <strong>Frontend (Клиент)</strong>, а другой — за <strong>Backend (Сервер / API)</strong>. Попробуйте сыграть в парах диалог «Запрос — Ответ»:
        </p>

        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
          <div className="text-xs font-bold text-purple-300 font-mono uppercase">
            Раунд {roleplayStep}: {roleplayDialogs[roleplayStep - 1].desc}
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800 text-cyan-200">
              💻 <strong>{roleplayDialogs[roleplayStep - 1].req}</strong>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 text-purple-200">
              🗄️ <strong>{roleplayDialogs[roleplayStep - 1].res}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">Прочитайте вслух по ролям со своим напарником!</span>
            <button
              onClick={handleNextRoleplay}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              {roleplayStep < 3 ? (
                <>
                  Следующий раунд
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : roleplayClaimed ? (
                <>
                  <Check className="w-4 h-4" />
                  3/3 Зачтено (+25 ОП)
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  Завершить ролевую игру (+25 ОП)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHEAT SHEET SUMMARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Copy className="w-5 h-5 text-cyan-400" />
            📄 ШПАРГАЛКА — на один экран
          </h3>
          <button
            onClick={handleCopyCheat}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedCheat ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Скопировано!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Скопировать шпаргалку
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
{cheatSheetText}
        </pre>
      </div>

      {/* ========================================================================= */}
      {/* MINI-DICTIONARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          📖 Мини-словарь Миссии 18
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">State (состояние)</div>
            <div className="text-slate-300 mt-0.5">Временные данные приложения прямо сейчас в памяти вкладки.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Local Storage</div>
            <div className="text-slate-300 mt-0.5">Постоянное хранилище на устройстве (остается после F5).</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">API</div>
            <div className="text-slate-300 mt-0.5">Способ одной программы безопасно запрашивать данные у другой.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Request (запрос)</div>
            <div className="text-slate-300 mt-0.5">То, что приложение «просит» у удаленного сервера.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Response (ответ)</div>
            <div className="text-slate-300 mt-0.5">Данные и статус (200 OK), которые сервер возвращает обратно.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">API-ключ</div>
            <div className="text-slate-300 mt-0.5">Секретный токен доступа (в открытом коде не храним!).</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MISSION TOOLS (TARGET="_BLANK") */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-400" />
          🔗 Инструменты миссии (открываются в новой вкладке)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-cyan-300 flex items-center gap-1">
              Google AI Studio
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Добавление памяти и API</div>
          </a>

          <a
            href="https://github.com/public-apis/public-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-teal-500/30 hover:border-teal-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-teal-300 flex items-center gap-1">
              Public APIs Catalog
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Каталог открытых API</div>
          </a>

          <a
            href="https://www.postman.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/30 hover:border-indigo-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-indigo-300 flex items-center gap-1">
              Postman
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Тестирование API-запросов</div>
          </a>

          <a
            href="https://jsonviewer.stack.hu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-purple-300 flex items-center gap-1">
              JSON Viewer
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Красивый просмотр данных</div>
          </a>
        </div>
      </div>
    </div>
  );
};
