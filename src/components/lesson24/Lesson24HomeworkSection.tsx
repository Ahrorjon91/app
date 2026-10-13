import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  CheckCircle2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Award,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Send,
  Lock,
  GitBranch,
  Wrench,
  Search,
  Monitor,
  Star,
  Layers,
  ArrowRight,
  Globe,
  Share2,
  GraduationCap,
  Trophy,
  Printer,
  Download,
  Terminal,
  Heart
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';
import badgeMasterImg from '../../assets/images/lesson24_badge_master_1790407348816.jpg';

export const Lesson24HomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const profile = portal?.profile || {};
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Reflection Card Inputs
  const [reflection, setReflection] = useState({
    initialThought: '',
    currentThought: '',
    proudProject: '',
    proudReason: '',
    hardestMoment: '',
    howOvercame: '',
    messageToFutureSelf: '',
    nextGoal: ''
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Certificate Generator
  const [studentName, setStudentName] = useState(profile.name || 'Академик AI for LIFE');
  const [certGenerated, setCertGenerated] = useState(false);

  // Mega-Confetti graduation celebration trigger
  const handleTriggerGraduationCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1 }
      });
    }, 400);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.currentThought.trim()) return;
    setReflectionSaved(true);
    addReward(50, '🎓 Reflection Card выпускника заполнена и сохранена в портфолио! (+50 ОП)');
    handleTriggerGraduationCelebration();
  };

  const handleGenerateCertificate = () => {
    setCertGenerated(true);
    addReward(50, '📜 Именной сертификат AI for LIFE Master сгенерирован! (+50 ОП)');
    handleTriggerGraduationCelebration();
  };

  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  const fullCourseCheatSheet = `🎓 ФИНАЛЬНАЯ ШПАРГАЛКА КУРСА: ВСЕ 24 МИССИИ AI FOR LIFE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 1. AI FOUNDATIONS (1–4): AI, Prompt Engineering, AI Tutor, AI for Life
🎨 2. AI CREATIVE (5–8): Изображения, Персонаж, Видео, Финал «Моё будущее»
💻 3. VIBE CODING (9–12): Вайб-кодинг, HTML/CSS, UX/UI Dashboard, Publisher (Git & Pages)
✨ 4. WOW WEBSITE (13–16): Motion (анимация), Scroll Storyteller, Media Web, Релиз Сайта
📱 5. AI APPS (17–20): App Builder, Data & API, AI Engineer, Agent Thinking (Opal)
🎓 6. PORTFOLIO & DEMO DAY (21–24): QA Hunt, DevOps Deploy, Portfolio, Demo Day

🏆 ГЛАВНАЯ ФОРМУЛА ВСЕГО КУРСА:
Идея → Prompt → AI → Design → Build → Test → Improve → Deploy → Present

💎 САМАЯ ВАЖНАЯ ФРАЗА:
GENERATE ≠ FINISHED — ты всегда проверяешь и улучшаешь!`;

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/70 via-indigo-950/70 to-slate-900 border border-amber-500/40 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px] font-bold">
                  ВЫПУСКНОЙ ЭКЗАМЕН И РЕФЛЕКСИЯ
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[11px] font-bold">
                  24 / 24 ЗАВЕРШЕНО
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Уровень 7: Церемония Выпускника, Бейдж Мастера и Рефлексия
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-300 font-mono text-sm font-bold w-fit">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Награда: до +100 ОП</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Вместо обычного домашнего задания — праздничная рефлексия, получение высшего диплома курса и напутствие в большое будущее цифрового создателя.
        </p>
      </div>

      {/* GRAND FINALE BADGE CEREMONY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-36 h-36 shrink-0 group">
          <img
            src={badgeMasterImg}
            alt="AI for LIFE Master Badge"
            className="w-full h-full object-cover rounded-3xl border-2 border-amber-400 shadow-2xl shadow-amber-500/40 group-hover:scale-105 transition-transform"
          />
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-xl">
            🏆
          </div>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-mono font-bold">
              🌟 ВЫСШАЯ КВАЛИФИКАЦИЯ КУРСА
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-mono font-bold">
              ВСЕ 6 НАБОРОВ СОБРАНЫ
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI FOR LIFE MASTER (Lv.24)
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Бейдж-набор «Portfolio & Demo Day» завершён на 4/4! Все 5 курсовых проектов опубликованы, защищены перед аудиторией и занесены в публичный реестр выпускников.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={handleTriggerGraduationCelebration}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Запустить Выпускной Салют 🎉</span>
            </button>
          </div>
        </div>
      </div>

      {/* REFLECTION CARD: MY JOURNEY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              📝 Reflection Card (Карта твоего пути — заполни сейчас в моменте)
            </h3>
            <p className="text-xs text-slate-400">
              Сохрани эту карточку в портфолио — вернись к ней через год и оцени свой рост (+50 ОП)
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveReflection} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Когда я начинал(а) курс, я думал(а), что AI — это...
              </label>
              <input
                type="text"
                required
                placeholder="Магическая кнопка или просто чат-бот для ответов..."
                value={reflection.initialThought}
                onChange={e => setReflection({ ...reflection, initialThought: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Теперь я знаю, что AI — это...
              </label>
              <input
                type="text"
                required
                placeholder="Мощный множитель человеческого интеллекта и инструмент для создания сервисов..."
                value={reflection.currentThought}
                onChange={e => setReflection({ ...reflection, currentThought: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Проект, которым я горжусь больше всего:
              </label>
              <input
                type="text"
                required
                placeholder="Project #5: AI Habit Tracker..."
                value={reflection.proudProject}
                onChange={e => setReflection({ ...reflection, proudProject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Потому что:
              </label>
              <input
                type="text"
                required
                placeholder="Он решает настоящую проблему моих друзей и уже задеплоен..."
                value={reflection.proudReason}
                onChange={e => setReflection({ ...reflection, proudReason: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Самый сложный момент курса:
              </label>
              <input
                type="text"
                required
                placeholder="Понимание серверного прокси и отладка TypeScript..."
                value={reflection.hardestMoment}
                onChange={e => setReflection({ ...reflection, hardestMoment: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Как я его преодолел(а):
              </label>
              <input
                type="text"
                required
                placeholder="Разбил задачу на маленькие шаги и следовал правилу Expected vs Actual..."
                value={reflection.howOvercame}
                onChange={e => setReflection({ ...reflection, howOvercame: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Что я скажу себе через год, вспоминая этот выпускной:
              </label>
              <input
                type="text"
                required
                placeholder="Ты молодец, что не сдался(лась) и сделал(а) этот рывок!"
                value={reflection.messageToFutureSelf}
                onChange={e => setReflection({ ...reflection, messageToFutureSelf: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Моя следующая цель как Создателя:
              </label>
              <input
                type="text"
                required
                placeholder="Запустить стартап с первыми 1000 пользователями..."
                value={reflection.nextGoal}
                onChange={e => setReflection({ ...reflection, nextGoal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={reflectionSaved}
              className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                reflectionSaved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              }`}
            >
              {reflectionSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Карта пути сохранена в профиль (+50 ОП)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Зафиксировать Карту Выпускника (+50 ОП)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* DIPLOMA / CERTIFICATE GENERATOR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                📜 Официальный Именной Сертификат Выпускника
              </h3>
              <p className="text-xs text-slate-400">
                Сгенерируйте и распечатайте сертификат с подтвержденным реестром 5 проектов (+50 ОП)
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateCertificate}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Печать / Экспорт</span>
          </button>
        </div>

        {/* Certificate Card Visual */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950 border-4 border-amber-500/50 shadow-2xl space-y-6 text-center relative overflow-hidden">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
              AI FOR LIFE ACADEMY • INTERNATIONAL CERTIFICATION
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide">
              СЕРТИФИКАТ ВЫПУСКНИКА
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              НАСТОЯЩИЙ ДИПЛОМ ПОДТВЕРЖДАЕТ, ЧТО
            </p>
          </div>

          <div className="py-2">
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              className="text-2xl sm:text-3xl font-black text-amber-300 text-center bg-transparent border-b-2 border-amber-500/40 focus:outline-none focus:border-amber-400 px-4 py-1"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            успешно освоил(а) 12-недельную профессиональную программу <strong>AI for LIFE: Vibe Coding, Full-Stack Architecture, Agent Systems & DevOps</strong>, защитил(а) 5 курсовых проектов и аккредитован(а) в звании:
          </p>

          <div className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-purple-500/20 border border-amber-400/50 text-amber-200 font-mono font-black text-sm tracking-wider">
            AI FOR LIFE MASTER (2026)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            <div>✓ Landing Page</div>
            <div>✓ AI Prompt Bot</div>
            <div>✓ Vision Analyzer</div>
            <div>✓ WOW Website</div>
            <div>✓ AI Life App</div>
          </div>
        </div>
      </div>

      {/* FINAL COURSE CHEAT SHEET */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Финальная шпаргалка курса — все 24 миссии на одном экране</span>
          </h4>
          <button
            onClick={() => {
              navigator.clipboard.writeText(fullCourseCheatSheet);
              setCopiedCheatSheet(true);
              setTimeout(() => setCopiedCheatSheet(false), 2000);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            {copiedCheatSheet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCheatSheet ? 'Скопировано!' : 'Скопировать все 24 миссии'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {fullCourseCheatSheet}
        </pre>
      </div>

      {/* TOOLS THAT STAY WITH YOU */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>Инструменты, которые остаются с тобой навсегда:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { name: 'ChatGPT & Gemini', desc: 'Умение строить точные, многошаговые промпты' },
            { name: 'Google Whisk & Flow', desc: 'Генерация профессиональных медиа-ассетов' },
            { name: 'Google AI Studio & Cursor', desc: 'Сборка и прототипирование приложений со скоростью мысли' },
            { name: 'GitHub & Vercel', desc: 'Версионирование, безопасность и мгновенная публикация' },
            { name: 'Google Opal', desc: 'Агентные цепочки и автоматизация без рутины' },
            { name: 'Gamma & Pitch Deck', desc: 'Убедительные презентации для инвесторов и публики' }
          ].map((t, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-300">{t.name}</div>
              <div className="text-slate-400 text-[11px] leading-relaxed">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL WORDS FROM NOVA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-purple-950/60 border border-cyan-500/40 text-center space-y-3 shadow-2xl">
        <Heart className="w-8 h-8 text-rose-400 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-white">«Ты не перестаешь быть Создателем!»</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Курс закончился, но твой путь только начинается. Технологии меняются каждый месяц — то, чему ты научился(лась), это вечный двигатель любопытства и созидания. Продолжай строить, проверять и удивлять мир!
        </p>
        <div className="text-xs font-mono text-cyan-400 font-bold pt-1">
          — С любовью и гордостью, команда менторов AI for LIFE & NOVA 🚀❤️
        </div>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ВЫПУСКНОГО ДОМАШНЕГО ЗАДАНИЯ В ПОРТАЛЕ        */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineHomeworkSubmission
          lessonId={24}
          taskTitle="Домашнее задание №24: Выпускной отчет, презентация Demo Day и дипломный проект"
          rewardExp={50}
        />
      </div>
    </div>
  );
};
