import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Copy,
  Check,
  Smartphone,
  Compass,
  ArrowRight,
  Send,
  ExternalLink,
  Wrench,
  Search,
  Users,
  Star,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson17HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Main task: App Specification draft
  const [appName, setAppName] = useState('PixelHabit — трекер чтения комиксов');
  const [appProblem, setAppProblem] = useState('Подростки забывают читать книги и комиксы каждый день');
  const [appUser, setAppUser] = useState('Школьники 10–16 лет, любящие мангу и комиксы');
  const [appInput, setAppInput] = useState('Количество прочитанных страниц за сегодня + оценка главы');
  const [appLogic, setAppLogic] = useState('Считает дневную серию (Streak) и открывает пиксельные бейджи');
  const [appData, setAppData] = useState('История страниц и текущий уровень персонажа в LocalStorage');
  const [appResult, setAppResult] = useState('Прогресс-бар прокачки персонажа и салют при выполнении цели дня');

  // Sidequest 1: App Detective
  const [detectiveWebApp, setDetectiveWebApp] = useState('');
  const [detectiveMobileApp, setDetectiveMobileApp] = useState('');
  const [detectiveClaimed, setDetectiveClaimed] = useState(false);

  const handleClaimDetective = () => {
    if (detectiveClaimed || !detectiveWebApp.trim() || !detectiveMobileApp.trim()) return;
    setDetectiveClaimed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    addReward(20, '🕵️ Сайд-квест «Детектив приложений» выполнен (+20 ОП)!');
  };

  // Sidequest 2: Family Test
  const [familyLiked, setFamilyLiked] = useState('');
  const [familyImprove, setFamilyImprove] = useState('');
  const [familyClaimed, setFamilyClaimed] = useState(false);

  const handleClaimFamily = () => {
    if (familyClaimed || !familyLiked.trim() || !familyImprove.trim()) return;
    setFamilyClaimed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    addReward(20, '👨‍👩‍👧 Сайд-квест «Тест на семье» выполнен (+20 ОП)!');
  };

  // AI Journal reflection
  const [journalDiscovery, setJournalDiscovery] = useState('');
  const [journalStruggle, setJournalStruggle] = useState('');
  const [journalRating, setJournalRating] = useState<number>(5);

  // Copy Cheat Sheet
  const [copiedCheat, setCopiedCheat] = useState(false);
  const cheatSheetText = `WEBSITE    = читаешь информацию
WEB APP    = взаимодействуешь и сохраняешь данные
MOBILE APP = устанавливается на телефон, работает офлайн

ФОРМУЛА ПРИЛОЖЕНИЯ:  User → Input → Logic → Data → Result

МОСТ:  Website → Web App → PWA → 📱 иконка на телефоне

ПРАВИЛО ПРОТОТИПА:  Одна главная функция, которая реально работает

GENERATE ≠ FINISHED   |   Проверяй · Не делись личным · Будь честным
ЦЕПОЧКА: Learn → Try → Build → Test → Improve → Share`;

  const handleCopyCheat = () => {
    navigator.clipboard.writeText(cheatSheetText);
    setCopiedCheat(true);
    setTimeout(() => setCopiedCheat(false), 2500);
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/40">
            ДОМАШНЕЕ ЗАДАНИЕ • МИССИЯ 17
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Срок сдачи: к следующему занятию
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          4. Спецификация своего приложения и Сайд-квесты
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Закрепи свои навыки App Builder: спроектируй оригинальное приложение, найди примеры на своём телефоне и протестируй прототип с семьёй!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MAIN TASK: APP SPECIFICATION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-cyan-400 font-mono uppercase tracking-widest">
              ОСНОВНОЕ ЗАДАНИЕ • 🎁 +25 ОП
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              📝 Спецификация своего приложения (App Specification)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Придумай не To-Do и не Quiz!</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Придумай идею <strong>СВОЕГО</strong> приложения (трекер привычек, флеш-карточки, калькулятор карманных денег, таймер тренировки, генератор идей). Заполни пятичастную формулу спецификации:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-white">1. Название приложения:</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-white">2. Проблема (какую боль решает?):</label>
            <input
              type="text"
              value={appProblem}
              onChange={(e) => setAppProblem(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-cyan-300">3. USER (Кто пользователь?):</label>
            <input
              type="text"
              value={appUser}
              onChange={(e) => setAppUser(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-teal-300">4. INPUT (Что он вводит?):</label>
            <input
              type="text"
              value={appInput}
              onChange={(e) => setAppInput(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-indigo-300">5. LOGIC (Что делает приложение?):</label>
            <input
              type="text"
              value={appLogic}
              onChange={(e) => setAppLogic(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-bold text-purple-300">6. DATA (Что сохраняет?):</label>
            <input
              type="text"
              value={appData}
              onChange={(e) => setAppData(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="font-bold text-emerald-300">7. RESULT (Что видит пользователь в итоге?):</label>
            <input
              type="text"
              value={appResult}
              onChange={(e) => setAppResult(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIDE-QUESTS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sidequest 1: App Detective */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono">САЙД-КВЕСТ 1 • 🎁 +20 ОП</span>
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="text-base font-black text-white">
              🕵️ «Детектив приложений» (App Detective)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Открой свой смартфон. Найди 1 приложение, которое работает как веб-сервис/PWA, и 1 приложение, которое является чистым Mobile App (нативное из стора).
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div>
                <label className="font-semibold text-slate-300">1 Web App / PWA на телефоне:</label>
                <input
                  type="text"
                  placeholder="Например: веб-версия Telegram / Pinterest PWA..."
                  value={detectiveWebApp}
                  onChange={(e) => setDetectiveWebApp(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300">1 Нативное Mobile App:</label>
                <input
                  type="text"
                  placeholder="Например: Камера / Заметки / Subway Surfers..."
                  value={detectiveMobileApp}
                  onChange={(e) => setDetectiveMobileApp(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white mt-1"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleClaimDetective}
            disabled={detectiveClaimed || !detectiveWebApp.trim() || !detectiveMobileApp.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 mt-4"
          >
            {detectiveClaimed ? (
              <>
                <Check className="w-4 h-4" />
                Сайд-квест зачтён (+20 ОП)!
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                Зачесть Детектива (+20 ОП)
              </>
            )}
          </button>
        </div>

        {/* Sidequest 2: Family Test */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 font-mono">САЙД-КВЕСТ 2 • 🎁 +20 ОП</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-base font-black text-white">
              👨‍👩‍👧 «Тест на семье» (Family Test)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Покажи свой прототип (To-Do или Quiz) кому-то из близких. Дай попробовать потыкать без подсказок и запиши живую обратную связь:
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div>
                <label className="font-semibold text-slate-300">1 вещь, которая понравилась:</label>
                <input
                  type="text"
                  placeholder="Например: быстро добавляются задачи, понятные кнопки..."
                  value={familyLiked}
                  onChange={(e) => setFamilyLiked(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white mt-1"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300">1 вещь, которую стоит улучшить:</label>
                <input
                  type="text"
                  placeholder="Например: сделать шрифт крупнее для бабушки..."
                  value={familyImprove}
                  onChange={(e) => setFamilyImprove(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white mt-1"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleClaimFamily}
            disabled={familyClaimed || !familyLiked.trim() || !familyImprove.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 mt-4"
          >
            {familyClaimed ? (
              <>
                <Check className="w-4 h-4" />
                Сайд-квест зачтён (+20 ОП)!
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                Зачесть Тест на семье (+20 ОП)
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AI JOURNAL REFLECTION */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-400" />
          📔 Дневник ИИ (AI Journal)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Главное открытие урока:</label>
            <textarea
              rows={2}
              value={journalDiscovery}
              onChange={(e) => setJournalDiscovery(e.target.value)}
              placeholder="Что тебя больше всего удивило в формуле приложений или PWA?"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">С чем возникли трудности:</label>
            <textarea
              rows={2}
              value={journalStruggle}
              onChange={(e) => setJournalStruggle(e.target.value)}
              placeholder="Какая часть вызвала больше всего вопросов?"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-slate-400">Оценка урока:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setJournalRating(star)}
                className={`p-1 text-lg transition-transform ${star <= journalRating ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHEAT SHEET REFERENCE */}
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
                Скопировать
              </>
            )}
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto">
{cheatSheetText}
        </pre>
      </div>

      {/* ========================================================================= */}
      {/* MINI-DICTIONARY */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-400" />
          📖 Мини-словарь
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Web App</div>
            <div className="text-slate-300 mt-0.5">Приложение в браузере, которое сохраняет состояние и интерактивно.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">PWA</div>
            <div className="text-slate-300 mt-0.5">Сайт, который можно установить на телефон без сторов.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Прототип</div>
            <div className="text-slate-300 mt-0.5">Первая рабочая версия для проверки главной функции.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">Input / Output</div>
            <div className="text-slate-300 mt-0.5">Что вводит пользователь / что видит на экране в ответ.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">State</div>
            <div className="text-slate-300 mt-0.5">Текущее состояние данных в памяти приложения.</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-teal-300 font-mono">APK</div>
            <div className="text-slate-300 mt-0.5">Пакет приложения для установки на Android-устройства.</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MISSION TOOLS (TARGET="_BLANK") */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-purple-400" />
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
            <div className="text-[11px] text-slate-400 mt-0.5">Сборка прототипа</div>
          </a>

          <a
            href="https://labs.google/opal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-teal-500/30 hover:border-teal-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-teal-300 flex items-center gap-1">
              Google Opal
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">ИИ-генератор софта</div>
          </a>

          <a
            href="https://www.pwabuilder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/30 hover:border-indigo-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-indigo-300 flex items-center gap-1">
              PWA Builder
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Превращение в PWA</div>
          </a>

          <a
            href="https://www.figma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/30 hover:border-purple-400 transition-all group"
          >
            <div className="font-bold text-white text-xs group-hover:text-purple-300 flex items-center gap-1">
              Figma
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Дизайн экрана</div>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MISSION 18 PREVIEW */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-purple-950/40 border border-cyan-500/40 space-y-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
            Что дальше? Превью Миссии 18
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-black text-white">
          🔮 Миссия 18: ДАННЫЕ И API — User ➔ Input ➔ Logic ➔ Data/API ➔ Result
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В следующей миссии мы научим приложение общаться с внешним миром: подключать настоящие API погоды, курсов валют и базы данных. Твой софт выйдет за рамки одного браузера!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SUBMISSION FORM */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача домашнего задания в систему
        </h3>
        <InlineHomeworkSubmission
          lessonId={17}
          homeworkTitle="Спецификация своего приложения «App Specification»"
        />
      </div>
    </div>
  );
};
