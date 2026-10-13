import React, { useState, useEffect } from 'react';
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
  Brain,
  Bot,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Smartphone,
  Eye,
  ShieldCheck,
  Lock,
  MessageSquare,
  HelpCircle,
  Clock,
  Target,
  Play,
  Pause,
  Terminal,
  RefreshCw,
  Send,
  Loader2,
  Cpu,
  Trophy,
  Globe,
  Database,
  Layout,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson20LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // ==========================================
  // DEFINITION OF DONE: 6 ITEMS
  // ==========================================
  const [dodItems, setDodItems] = useState<{ [key: string]: boolean }>({
    realProblem: false,
    localStorage: false,
    aiFeature: false,
    uiUx: false,
    mobile: false,
    published: false
  });

  const [allDodCompleted, setAllDodCompleted] = useState(false);

  const toggleDodItem = (key: string) => {
    const updated = { ...dodItems, [key]: !dodItems[key] };
    setDodItems(updated);

    if (!dodItems[key]) {
      addReward(25, `Пункт Definition of Done выполнен! (+25 ОП)`);
    }

    const count = Object.values(updated).filter(Boolean).length;
    if (count === 6 && !allDodCompleted) {
      setAllDodCompleted(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });
      addReward(50, '🎉 PROJECT #5 COMPLETE! Все 6 пунктов DoD закрыты! (+50 ОП)');
    }
  };

  const dodCount = Object.values(dodItems).filter(Boolean).length;

  // ==========================================
  // STEP 3: OPTIONAL AGENT THINKING SIMULATOR
  // ==========================================
  const [agentGoal, setAgentGoal] = useState('Сгенерировать недельный план тренировок и отправить напоминание');
  const [agentPlanSteps, setAgentPlanSteps] = useState([
    'Шаг 1: Проверить текущий уровень выносливости из Local Storage',
    'Шаг 2: Вызвать Gemini API для составления 3 тренировок',
    'Шаг 3: Сохранить план в расписание приложения'
  ]);
  const [agentExecutionRunning, setAgentExecutionRunning] = useState(false);
  const [agentCurrentExecutionStep, setAgentCurrentExecutionStep] = useState(0);
  const [agentBonusEarned, setAgentBonusEarned] = useState(false);

  const runAgentWorkflow = () => {
    if (agentExecutionRunning) return;
    setAgentExecutionRunning(true);
    setAgentCurrentExecutionStep(1);

    setTimeout(() => setAgentCurrentExecutionStep(2), 1200);
    setTimeout(() => {
      setAgentCurrentExecutionStep(3);
      setAgentExecutionRunning(false);
      if (!agentBonusEarned) {
        setAgentBonusEarned(true);
        addReward(50, 'Бонус: Элемент агентного мышления встроен! (+50 ОП) ⭐');
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* HEADER CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              <span>Уровень 4 • Лабораторная Работа (00:30 – 01:05)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              💻 Финал Project #5: My Life App
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Главная практика миссии: полировка 6 пунктов Definition of Done, внедрение агентной логики и публикация на GitHub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
              до +200 ОП за финал
            </span>
          </div>
        </div>

        {/* DEFINITION OF DONE PROGRESS BAR */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Definition of Done — Статус готовности проекта ({dodCount}/6)</span>
            </div>
            <span className="text-xs font-bold text-cyan-400">
              {Math.round((dodCount / 6) * 100)}% готово
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${(dodCount / 6) * 100}%` }}
            />
          </div>

          {dodCount === 6 && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                🎉 ПОЗДРАВЛЯЕМ! Все 6 пунктов Definition of Done закрыты! Твой Project #5 официально готов к сдаче!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STEP 1: ASSEMBLE ALL COMPONENTS */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
            1
          </span>
          <span>Шаг 1 — Собери всё, что уже построено (5 мин)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Открой проект в Google AI Studio и редакторе кода. Проверь три слоя приложения:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1">
              <Layout className="w-4 h-4" /> 1. Прототип (Миссия 17)
            </div>
            <div className="text-slate-400">
              Каркас страниц, сетка карточек, кнопки, стили Tailwind CSS.
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-purple-400 flex items-center gap-1.5 mb-1">
              <Database className="w-4 h-4" /> 2. Данные (Миссия 18)
            </div>
            <div className="text-slate-400">
              Local Storage: задачи, привычки, заметки не исчезают при перезагрузке страницы.
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <Bot className="w-4 h-4" /> 3. Встроенный ИИ (Миссия 19)
            </div>
            <div className="text-slate-400">
              Кнопка AI Tutor или Quiz Generator с невидимым System Prompt.
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: INTERACTIVE DEFINITION OF DONE (6/6) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
              2
            </span>
            <span>Шаг 2 — Пройди по Definition of Done (30 мин)</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">
            +25 ОП за каждый отмеченный пункт
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Кликай по пунктам чек-листа по мере проверки в коде своего приложения:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              key: 'realProblem',
              title: '1. Реальная проблема',
              desc: 'Решает настоящую задачу из твоей школьной или личной жизни (не «для галочки»)',
              icon: Target
            },
            {
              key: 'localStorage',
              title: '2. Сохранение данных',
              desc: 'Данные сохраняются в Local Storage и не стираются при F5 / перезагрузке',
              icon: Database
            },
            {
              key: 'aiFeature',
              title: '3. Встроенная AI-функция',
              desc: 'Есть минимум 1 рабочая кнопка ИИ (тьютор, квиз, мотиватор) с System Prompt',
              icon: Bot
            },
            {
              key: 'uiUx',
              title: '4. Удобный UI / UX',
              desc: 'Интерфейс опрятный, понятные отступы, контрастные шрифты, нет перегруза',
              icon: Layout
            },
            {
              key: 'mobile',
              title: '5. Мобильная адаптивность',
              desc: 'Протестировано в режиме смартфона (DevTools): кнопки крупные, верстка не едет',
              icon: Smartphone
            },
            {
              key: 'published',
              title: '6. Опубликовано онлайн',
              desc: 'Код загружен на GitHub Pages или хостинг, доступен по постоянной ссылке',
              icon: Globe
            }
          ].map((item) => {
            const isChecked = dodItems[item.key];
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => toggleDodItem(item.key)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-emerald-500 text-slate-950'
                      : 'border-2 border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-black ${
                        isChecked ? 'text-emerald-300' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isChecked ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: OPTIONAL AGENT THINKING SIMULATOR */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
              3
            </span>
            <span>Шаг 3 — (По желанию) Добавь элемент агентного мышления (10 мин)</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/40">
            🎁 +50 ОП бонус
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Научи свой ИИ не просто отвечать на вопрос, а выполнять <strong>цепочку из нескольких шагов</strong> для достижения цели:
        </p>

        {/* Multi-step Simulator */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">
              Цель агента в твоем приложении:
            </label>
            <input
              type="text"
              value={agentGoal}
              onChange={(e) => setAgentGoal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 block">
              Автоматическая цепочка шагов:
            </span>
            <div className="space-y-1.5">
              {agentPlanSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                    agentCurrentExecutionStep >= idx + 1
                      ? 'bg-purple-950/40 border-purple-500/60 text-purple-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>{step}</span>
                  {agentCurrentExecutionStep >= idx + 1 && (
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={runAgentWorkflow}
            disabled={agentExecutionRunning}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {agentExecutionRunning ? 'Агент выполняет цепочку...' : 'Протестировать выполнение цепочки агента'}
          </button>
        </div>
      </div>

      {/* STEP 4: PUBLISH FINAL VERSION */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
            4
          </span>
          <span>Шаг 4 — Публикация финальной версии (5 мин)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Зафиксируй финальный коммит на GitHub, проверь что GitHub Pages обновился, и скопируй живую ссылку для сдачи ментору.
        </p>
      </div>

      {/* INLINE LAB SUBMISSION FORM */}
      <InlineLabSubmission
        labId={20}
        taskTitle="Project #5: My Life App — Финальный релиз (Definition of Done 6/6 + Live URL)"
        rewardExp={150}
      />
    </div>
  );
};
