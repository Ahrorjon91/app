import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  Bot,
  Award,
  Check,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson20N8nHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [selectedIdea, setSelectedIdea] = useState('⏰ утреннее напоминание «Собери рюкзак»');
  const [summaryText, setSummaryText] = useState('');
  const [savedSummary, setSavedSummary] = useState(false);
  const [copiedBonus, setCopiedBonus] = useState(false);

  const toggleStep = (step: number) => {
    setStepChecked(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const handleSaveSummary = () => {
    if (savedSummary) return;
    setSavedSummary(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addReward(25, '🏠 Описание домашней автоматизации Урока 20 сохранено (+25 ОП)!');
  };

  const handleCopyBonus = () => {
    navigator.clipboard.writeText("{{ $now.toFormat('dd.MM.yyyy HH:mm') }}");
    setCopiedBonus(true);
    setTimeout(() => setCopiedBonus(false), 2000);
  };

  const ideas = [
    '⏰ утреннее напоминание «Собери рюкзак»',
    '📚 напоминание «Почитай 15 минут» каждый вечер',
    '🎯 бот отвечает цитатой на команду /motivation (текст сам напиши в ноде)',
    '🧮 бот отвечает «Я получил: …» на любое сообщение'
  ];

  const steps = [
    {
      num: 1,
      title: '1. Выбери идею (или придумай свою):',
      desc: 'Утреннее напоминание «Собери рюкзак»; напоминание «Почитай 15 минут» каждый вечер; бот отвечает цитатой на команду /motivation; бот отвечает «Я получил: …» на любое сообщение.'
    },
    {
      num: 2,
      title: '2. Нарисуй на бумаге схему: триггер → действие → результат.'
    },
    {
      num: 3,
      title: '3. Собери workflow в n8n.'
    },
    {
      num: 4,
      title: '4. Проверь в Telegram и сделай скриншот.'
    },
    {
      num: 5,
      title: '5. Выключи workflow после проверки (Unpublish / Inactive).'
    },
    {
      num: 6,
      title: '6. Напиши 3–5 предложений: какую рутину ты автоматизировал(а) и что можно улучшить.'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            🏠 HW • ДОМАШНЕЕ ЗАДАНИЕ
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 30–40 минут
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🏠 «Моя полезная автоматизация»
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>🎯 Цель:</strong> придумать и собрать одну полезную мини-автоматизацию.
        </p>
      </div>

      {/* Выбор идеи */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <span>Выбери идею для своей автоматизации:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ideas.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdea(idea)}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all ${
                selectedIdea === idea
                  ? 'bg-cyan-950/50 border-cyan-400 text-cyan-100 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {idea}
            </button>
          ))}
        </div>
      </div>

      {/* Шаги выполнения */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white">
            📋 Шаги выполнения
          </h3>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Отмечено: {Object.values(stepChecked).filter(Boolean).length} / 6
          </span>
        </div>

        <div className="space-y-3">
          {steps.map((st) => {
            const done = !!stepChecked[st.num];
            return (
              <button
                key={st.num}
                onClick={() => toggleStep(st.num)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  done
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold ${
                    done ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {done ? '✓' : st.num}
                </div>
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold">{st.title}</div>
                  {st.desc && <div className="text-xs text-slate-400 leading-relaxed">{st.desc}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Текст 3-5 предложений */}
        <div className="pt-3 space-y-2">
          <label className="text-xs sm:text-sm font-bold text-slate-200">
            Напиши 3–5 предложений: какую рутину ты автоматизировал(а) и что можно улучшить:
          </label>
          <textarea
            rows={3}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="Например: Я автоматизировал(а) вечернее напоминание о чтении книги. В будущем можно добавить выбор книги и подсчёт прочитанных страниц..."
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white outline-none focus:border-cyan-500 resize-none"
          />
          <button
            onClick={handleSaveSummary}
            disabled={savedSummary}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              savedSummary
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg'
            }`}
          >
            {savedSummary ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {savedSummary ? 'Текст сохранён (+25 ОП)' : 'Сохранить описание (+25 ОП)'}
          </button>
        </div>
      </div>

      {/* Что сдать + Бонус */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать</span>
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Схема (фото или скриншот)</li>
            <li>Скриншот workflow (токен закрыт)</li>
            <li>Скриншот результата в Telegram</li>
            <li>Текст (3–5 предложений)</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>🌟 Бонус</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Добавь в сообщение текущую дату и время с помощью выражения:
          </p>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <code className="text-xs font-mono text-amber-300">{`{{ $now.toFormat('dd.MM.yyyy HH:mm') }}`}</code>
            <button
              onClick={handleCopyBonus}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-200 flex items-center gap-1"
            >
              {copiedBonus ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedBonus ? 'Скопировано' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Штатная форма сдачи домашнего задания */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-cyan-400" />
          Сдача домашнего задания #20 в портал
        </h3>
        <InlineHomeworkSubmission lessonId={20} />
      </div>
    </div>
  );
};
