import React, { useState } from 'react';
import {
  Home,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Lock,
  MessageSquare,
  HelpCircle,
  Copy,
  Users,
  Tag,
  Palette,
  Zap,
  Star
} from 'lucide-react';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

interface Lesson10HomeworkSectionProps {
  onHomeworkSubmitted?: () => void;
}

export const Lesson10HomeworkSection: React.FC<Lesson10HomeworkSectionProps> = ({ onHomeworkSubmitted }) => {
  // Main assignment fields
  const [newCssSetting, setNewCssSetting] = useState('');
  const [newJsFeature, setNewJsFeature] = useState('');
  const [isWorkingFine, setIsWorkingFine] = useState<'yes' | 'no' | null>(null);

  // Side quests completion
  const [quest1Done, setQuest1Done] = useState(false);
  const [quest2Done, setQuest2Done] = useState(false);

  // Diary fields
  const [favoriteTagOrProperty, setFavoriteTagOrProperty] = useState('');
  const [hardestPart, setHardestPart] = useState('');
  const [diarySaved, setDiarySaved] = useState(false);

  // Teaser thoughts
  const [inconvenientSiteThought, setInconvenientSiteThought] = useState('');

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-bold uppercase mb-2">
            <Home className="w-3.5 h-3.5" /> Домашнее задание · Урок 6
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            «Второй отдел в деле»: Улучшение сайта-визитки
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Добавь на сайт ещё одну CSS-настройку и одну JS-фишку до следующего занятия.
          </p>
        </div>
      </div>

      {/* Main Homework Form */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            🎮 Основное задание: «Второй отдел в деле» (+50 ОП)
          </h3>
          <span className="text-xs text-slate-400">Срок: до Миссии 11</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-blue-400 uppercase flex items-center gap-1.5">
              <Palette className="w-4 h-4" /> Новая CSS-настройка:
            </label>
            <input
              type="text"
              value={newCssSetting}
              onChange={e => setNewCssSetting(e.target.value)}
              placeholder="Например: добавил плавную тень box-shadow или градиентный бордер..."
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-yellow-400 uppercase flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Новая JS-фишка:
            </label>
            <input
              type="text"
              value={newJsFeature}
              onChange={e => setNewJsFeature(e.target.value)}
              placeholder="Например: счетчик кликов, смена темной/светлой темы, копирование ссылки..."
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="text-xs text-slate-400">Работает как задумано на компьютере и смартфоне?</div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsWorkingFine('yes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isWorkingFine === 'yes'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-black/50 border-slate-700 text-slate-400'
              }`}
            >
              ✓ Да, всё работает без багов
            </button>
            <button
              onClick={() => setIsWorkingFine('no')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isWorkingFine === 'no'
                  ? 'bg-amber-950 border-amber-500 text-amber-300'
                  : 'bg-black/50 border-slate-700 text-slate-400'
              }`}
            >
              ⚠️ Есть нюансы, задам вопрос ментору
            </button>
          </div>
        </div>
      </div>

      {/* Side Quests */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" /> Дополнительные сайд-квесты
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setQuest1Done(!quest1Done)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              quest1Done
                ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300'
                : 'bg-black/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-cyan-400" /> 🏷️ Квест 1: «Именной тег»
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">+15 ОП</span>
            </div>
            <p className="text-xs text-slate-400">
              Попроси ИИ объяснить простыми словами, зачем в верстке нужен именно тег &lt;div&gt; и почему без него нельзя сложить сложный сайт.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              {quest1Done ? '✓ Квест выполнен' : 'Нажми, чтобы отметить выполнение'}
            </div>
          </div>

          <div
            onClick={() => setQuest2Done(!quest2Done)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              quest2Done
                ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-300'
                : 'bg-black/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-400" /> 👨‍👩‍👧 Квест 2: «Family Tour»
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">+20 ОП</span>
            </div>
            <p className="text-xs text-slate-400">
              Покажи свой сайт родным с телефона и объясни своими словами, где на нём HTML (скелет), CSS (одежда) и JS (мышцы и кнопки).
            </p>
            <div className="text-[11px] font-mono text-purple-400">
              {quest2Done ? '✓ Квест выполнен' : 'Нажми, чтобы отметить выполнение'}
            </div>
          </div>
        </div>
      </div>

      {/* AI Diary */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" /> Запись в Дневник ИИ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Мой любимый HTML-тег или CSS-свойство:</label>
            <input
              type="text"
              value={favoriteTagOrProperty}
              onChange={e => setFavoriteTagOrProperty(e.target.value)}
              placeholder="Например: border-radius, потому что делает мягкие кнопки"
              className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Что было сложнее всего понять сегодня:</label>
            <input
              type="text"
              value={hardestPart}
              onChange={e => setHardestPart(e.target.value)}
              placeholder="Например: как JS привязывается к клику по кнопке"
              className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        <button
          onClick={() => setDiarySaved(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center gap-2 transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          {diarySaved ? 'Запись сохранена в журнал' : 'Сохранить запись в дневник'}
        </button>
      </div>

      {/* Teaser: Next Mission 11 */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-indigo-950/40 border border-purple-800/40 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold shrink-0">
            🔮
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wide">
              Следующая миссия · Анонс
            </div>
            <h4 className="text-lg font-black text-white">
              Миссия 11 — UX/UI ДИЗАЙНЕР: Dashboard
            </h4>
            <p className="text-xs text-slate-300 italic">
              «Ты знаешь три отдела Центра Управления. На следующей миссии мы сделаем твой сайт по-настоящему удобным и красивым для людей — разберём UX/UI и адаптивность на примере интерактивного дашборда.» — NOVA
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-purple-900/40 space-y-2">
          <label className="text-xs text-slate-400 font-medium">
            🤔 Вопрос на размышление: Какой сайт лично тебе неудобно листать с телефона — и почему?
          </label>
          <input
            type="text"
            value={inconvenientSiteThought}
            onChange={e => setInconvenientSiteThought(e.target.value)}
            placeholder="Напиши свои наблюдения о плохих и хороших мобильных сайтах..."
            className="w-full p-2.5 rounded-xl bg-black/60 border border-purple-900/40 text-xs text-white"
          />
        </div>
      </div>

      {/* Inline Homework Submission */}
      <InlineHomeworkSubmission
        lessonId={6}
        rewardXp={50}
        onSubmitted={onHomeworkSubmitted}
      />
    </div>
  );
};
