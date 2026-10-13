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
  Star,
  Search,
  Users,
  Compass,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson18HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main task: Add a feature
  const [featureName, setFeatureName] = useState('Сортировка задач по дате создания и фильтр выполненных');
  const [featureType, setFeatureType] = useState<'storage' | 'api' | 'both'>('storage');
  const [featureVerification, setFeatureVerification] = useState('Добавил 5 задач, нажал F5 — порядок и статус сохранились');
  const [mainTaskClaimed, setMainTaskClaimed] = useState(false);

  const handleClaimMainTask = () => {
    if (mainTaskClaimed) return;
    setMainTaskClaimed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    addReward(25, '🎯 Основная миссия «Add a Feature» оформлена (+25 ОП)!');
  };

  // Side-quest 1: API Explorer
  const [apiExplorerName, setApiExplorerName] = useState('Open-Meteo или REST Countries API');
  const [apiExplorerDesc, setApiExplorerDesc] = useState('Выдаёт флаги, столицы, валюту и население любой страны мира');
  const [sq1Claimed, setSq1Claimed] = useState(false);

  const handleClaimSq1 = () => {
    if (sq1Claimed) return;
    setSq1Claimed(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    addReward(20, '🔍 Сайд-квест #1 «API Explorer» выполнен (+20 ОП)!');
  };

  // Side-quest 2: Family Test
  const [familyTester, setFamilyTester] = useState('Младший брат / родители');
  const [familyReaction, setFamilyReaction] = useState('Удивились, что после закрытия вкладки их задачи не пропали!');
  const [sq2Claimed, setSq2Claimed] = useState(false);

  const handleClaimSq2 = () => {
    if (sq2Claimed) return;
    setSq2Claimed(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    addReward(20, '👨‍👩‍👧 Сайд-квест #2 «Memory Test для семьи» выполнен (+20 ОП)!');
  };

  // AI Journal
  const [journalDifference, setJournalDifference] = useState('');
  const [journalFutureApi, setJournalFutureApi] = useState('');
  const [rating, setRating] = useState(5);
  const [journalSaved, setJournalSaved] = useState(false);

  const handleSaveJournal = () => {
    setJournalSaved(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    addReward(15, '📖 Дневник ИИ Миссии 18 заполнен (+15 ОП)!');
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
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/40">
            ДОМАШНЯЯ РАБОТА • МИССИЯ 18 • 🎁 ДО +80 ОП
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Add a Feature · API Explorer · Family Test
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          4. Домашнее задание: Прокачка приложения и Сайд-квесты
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Закрепи статус <strong>DATA ENGINEER</strong>: добавь новую функцию с памятью или API, проведи тест с близкими и зафиксируй инсайты в Дневнике ИИ!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HOMEWORK MISSION: ADD A FEATURE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              ОСНОВНАЯ МИССИЯ • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              🎯 Миссия «Add a Feature»: Добавь 1 новую функцию
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Практика в AI Studio</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Добавь в своё приложение 1 полезную функцию, которая опирается на <strong>Data</strong> (сохранение в Local Storage) или <strong>API</strong> (запрос данных из интернета). Заполни отчёт:
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">1. Какую функцию ты добавил(а):</label>
            <input
              type="text"
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">2. Что использует эта функция:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'storage', label: '💾 Только Local Storage' },
                { id: 'api', label: '📡 Только внешний API' },
                { id: 'both', label: '🔥 И Local Storage, и API' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFeatureType(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                    featureType === opt.id
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">3. Как ты проверил(а), что всё работает:</label>
            <input
              type="text"
              value={featureVerification}
              onChange={(e) => setFeatureVerification(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
            />
          </div>

          <button
            onClick={handleClaimMainTask}
            disabled={mainTaskClaimed}
            className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              mainTaskClaimed
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {mainTaskClaimed ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {mainTaskClaimed ? 'Основная фича зафиксирована (+25 ОП)' : 'Зафиксировать добавленную фичу (+25 ОП)'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIDE-QUESTS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-400 font-mono uppercase tracking-widest">
              САЙД-КВЕСТЫ • 🎁 ДО +40 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-400" />
              🧭 Дополнительные испытания (Сайд-квесты)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">По желанию</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Side-quest 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 font-mono uppercase flex items-center gap-1.5">
                  <Search className="w-4 h-4" />
                  Сайд-квест #1: API Explorer
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  +20 ОП
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Найди в интернете ещё 1 бесплатный API, который тебе интересен (например, спорт, космос, котики или валюта). Опиши его:
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Название API..."
                  value={apiExplorerName}
                  onChange={(e) => setApiExplorerName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Что он делает..."
                  value={apiExplorerDesc}
                  onChange={(e) => setApiExplorerDesc(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleClaimSq1}
              disabled={sq1Claimed}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                sq1Claimed
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              {sq1Claimed ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              {sq1Claimed ? 'Сайд-квест #1 зачтен (+20 ОП)' : 'Зачесть API Explorer (+20 ОП)'}
            </button>
          </div>

          {/* Side-quest 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono uppercase flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Сайд-квест #2: Memory Test для семьи
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  +20 ОП
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Покажи родителям, брату или сестре разницу «до/после» (с памятью и без). Дай им ввести 3 задачи и нажми F5!
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Кому показал(а)..."
                  value={familyTester}
                  onChange={(e) => setFamilyTester(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Какая была реакция..."
                  value={familyReaction}
                  onChange={(e) => setFamilyReaction(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleClaimSq2}
              disabled={sq2Claimed}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                sq2Claimed
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
              }`}
            >
              {sq2Claimed ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
              {sq2Claimed ? 'Сайд-квест #2 зачтен (+20 ОП)' : 'Зачесть Family Test (+20 ОП)'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AI JOURNAL */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-teal-400 font-mono uppercase tracking-widest">
              РЕФЛЕКСИЯ И ИНСАЙТЫ • 🎁 +15 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-400" />
              📖 Дневник ИИ (AI Journal) Миссии 18
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Личные мысли</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              1. Разница между State, Local Storage и API своими словами:
            </label>
            <textarea
              rows={2}
              placeholder="State — это в руках, Storage — в рюкзаке, API — звонок другу за данными..."
              value={journalDifference}
              onChange={(e) => setJournalDifference(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              2. Какой API тебе было бы интереснее всего подключить в будущем:
            </label>
            <input
              type="text"
              placeholder="Например: карты дорог, курс криптовалюты, распознавание музыки Shazam..."
              value={journalFutureApi}
              onChange={(e) => setJournalFutureApi(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Оценка сложности и крутости миссии:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className={`p-2 rounded-xl transition-all ${
                    s <= rating ? 'text-amber-400 scale-110' : 'text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
              <span className="text-xs text-slate-400 font-mono ml-2">{rating} из 5 звёзд</span>
            </div>
          </div>

          <button
            onClick={handleSaveJournal}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {journalSaved ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {journalSaved ? 'Дневник сохранен (+15 ОП)' : 'Сохранить запись в дневнике (+15 ОП)'}
          </button>
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

      {/* ========================================================================= */}
      {/* PREVIEW OF MISSION 19 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
            СЛЕДУЮЩИЙ УРОВЕНЬ
          </span>
          <span className="text-xs text-slate-400 font-mono">Миссия 19</span>
        </div>
        <h3 className="text-lg sm:text-xl font-black text-white">
          🔮 МИССИЯ 19 — AI ENGINEER: Чат-боты и ИИ-Ассистент прямо в твоём приложении
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          В прошлой миссии мы дали приложению тело (UI), в этой — память и уши (Data & API). В следующей миссии мы встроим ему <strong>МОЗГ</strong> — интегрируем нейросеть прямо в код!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* INLINE HOMEWORK SUBMISSION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-indigo-400" />
          Сдача домашнего задания #18 ментору курса
        </h3>
        <InlineHomeworkSubmission
          lessonId={18}
          homeworkTitle="Домашнее задание: Новая фича Data & API + Сайд-квесты"
        />
      </div>
    </div>
  );
};
