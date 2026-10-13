import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Smartphone,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson19AndroidLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});
  const [selectedIdea, setSelectedIdea] = useState<string>('Планировщик учёбы (Study Planner)');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const totalChecked = Object.values(stepChecked).filter(Boolean).length;

  const toggleStep = (step: number) => {
    const next = { ...stepChecked, [step]: !stepChecked[step] };
    setStepChecked(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 7) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(100, '🎉 Все 7 шагов лабораторной работы Урока 19 выполнены! (+100 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('19', 't19_1');
    }
  };

  const ideas = [
    {
      title: 'Планировщик учёбы (Study Planner)',
      desc: 'Задачи по предметам, галочки выполнения, фильтр по важности, общий прогресс'
    },
    {
      title: 'Трекер привычек (Habit Tracker)',
      desc: 'Ежедневные полезные привычки, отметка за день, серия дней подряд'
    },
    {
      title: 'Список покупок или сборов в поездку',
      desc: 'Категории вещей, галочки купленного, счётчик оставшегося'
    },
    {
      title: 'Мини-викторина по школьному предмету',
      desc: 'Вопросы с вариантами ответов, подсчёт очков и экран результата'
    }
  ];

  const stepsList = [
    {
      num: 1,
      title: '1. Выбери одну тему приложения (из 4 вариантов выше).'
    },
    {
      num: 2,
      title: '2. Создай новый Android-проект в Google AI Studio:',
      desc: 'Открой Build → New App и обязательно выбери платформу Android.'
    },
    {
      num: 3,
      title: '3. Отправь первый промпт:',
      desc: 'Напиши название приложения, 3–4 главные функции и попроси использовать Jetpack Compose и Material 3.'
    },
    {
      num: 4,
      title: '4. Протестируй первую версию в Preview:',
      desc: 'Нажми все кнопки, добавь 3–4 тестовые записи, проверь переключение вкладок и прокрутку экрана.'
    },
    {
      num: 5,
      title: '5. Найди минимум 2 проблемы:',
      desc: 'Например: неудобная кнопка, мелкий шрифт, маленькие отступы или отсутствие кнопки удаления.'
    },
    {
      num: 6,
      title: '6. Сделай 3 отдельных коротких улучшения (3 итерации):',
      desc: 'Итерация 1: исправь внешний вид (отступы, размер текста или расположение кнопки). Итерация 2: добавь или улучши одну функцию (например, удаление задачи, фильтр или счётчик прогресса). Итерация 3: добавь приятную деталь (например, сообщение «Все задачи выполнены! 🎉» или переключатель темы).'
    },
    {
      num: 7,
      title: '7. Финальная проверка:',
      desc: 'Убедись, что после правок все функции работают без ошибок.'
    }
  ];

  const sampleStarterPrompt = `Создай простое Android-приложение «${selectedIdea}».
Используй Jetpack Compose и Material 3.
Пользователь должен уметь добавлять элементы, отмечать их выполненными, фильтровать и видеть общий прогресс на главном экране.
Дизайн должен быть чистым, удобным для телефона и простым.`;

  const handleCopyStarter = () => {
    navigator.clipboard.writeText(sampleStarterPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            🧪 LABS • ПРАКТИЧЕСКАЯ ЛАБОРАТОРНАЯ РАБОТА
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Формат: в классе · Время: 35–40 минут
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🧪 Моё первое Android-приложение за 40 минут
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>Цель работы:</strong> создать в Google AI Studio рабочее Android-приложение, протестировать его в предпросмотре и улучшить минимум <strong>3 короткими промптами</strong>.
        </p>
      </div>

      {/* Шаг 1: Выбор идеи */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <span>Выбери одну тему приложения (или предложи свою простую идею):</span>
          </h3>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/40">
            Выбрано: {selectedIdea}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ideas.map((idea, idx) => {
            const active = selectedIdea === idea.title;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdea(idea.title)}
                className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                  active
                    ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs sm:text-sm font-bold text-white">{idea.title}</div>
                <div className="text-xs text-slate-400">{idea.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Быстрый шаблон первого промпта */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400">
              Шаблон первого промпта для выбранной темы:
            </span>
            <button
              onClick={handleCopyStarter}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Скопировано!' : 'Скопировать промпт'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-slate-900 text-cyan-200 font-mono text-xs whitespace-pre-wrap">
            {sampleStarterPrompt}
          </pre>
        </div>
      </div>

      {/* Пошаговое задание (7 шагов) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white">
            📋 Пошаговое задание (отмечай выполненные шаги)
          </h3>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Выполнено: {totalChecked} / 7
          </span>
        </div>

        <div className="space-y-3">
          {stepsList.map((st) => {
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
      </div>

      {/* Что сдать учителю + Бонус */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать учителю</span>
          </h3>
          <ul className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Скриншот или показ работающего приложения в окне Preview.</li>
            <li>Твой первый промпт (1–2 предложения).</li>
            <li>Список из <strong>3 коротких промптов</strong>, которыми ты улучшал приложение, и что именно они изменили.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>🌟 Бонус (по желанию)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Скачай архив с кодом проекта (Download ZIP), распакуй его и найди внутри папку с файлами <code>.kt</code> (это язык Kotlin, на котором написано твоё приложение).
          </p>
        </div>
      </div>

      {/* Штатная форма сдачи Лабораторной работы */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача лабораторной работы #19 в систему
        </h3>
        <InlineLabSubmission
          labId={19}
          labTitle="Урок 19: Моё первое Android-приложение за 40 минут"
        />
      </div>
    </div>
  );
};
