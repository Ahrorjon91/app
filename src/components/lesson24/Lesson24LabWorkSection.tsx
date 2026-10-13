import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Bot,
  Terminal,
  ExternalLink,
  Sparkles,
  Rocket,
  Code,
  Copy,
  Check,
  RotateCcw,
  Send,
  Eye,
  FileText,
  HelpCircle,
  Award,
  Globe,
  Server,
  Play,
  Share2,
  Workflow,
  CheckCheck,
  Timer,
  Laptop,
  Wifi,
  BatteryCharging,
  Sliders,
  Users
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson24LabWorkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Step 1: Polish after feedback
  const [polishDone, setPolishDone] = useState(false);

  // Step 2: Tech Checklist (4 points)
  const [techChecks, setTechChecks] = useState({
    linksWorking: false,
    portfolioLoaded: false,
    deviceCharged: false,
    wifiTested: false
  });

  const toggleTechCheck = (k: keyof typeof techChecks) => {
    setTechChecks(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const techAllDone = Object.values(techChecks).every(Boolean);

  // Step 3: Stopwatch / Chronometer for 3-5 min pitch
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timingSaved, setTimingSaved] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleResetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Step 4: Space & Guest Readiness
  const [spaceReady, setSpaceReady] = useState(false);

  // Claim Rewards tracker
  const [stepRewards, setStepRewards] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });

  const handleClaimStepReward = (step: 'step1' | 'step2' | 'step3' | 'step4') => {
    if (stepRewards[step]) return;
    setStepRewards(prev => ({ ...prev, [step]: true }));
    addReward(25, `💻 Шаг подготовки завершен! (+25 ОП)`);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header Info */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px] font-bold">
                  ЛАБОРАТОРИЯ #24
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[11px] font-bold">
                  Финальная подготовка • 35–50 мин
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Уровень 4: Финальная подготовка к выходу на сцену Demo Day
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-300 font-mono text-sm font-bold w-fit">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Награда: до +100 ОП</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Четыре практических шага для стопроцентной уверенности: улучшение речи, технический аудит устройств, хронометраж и подготовка к встрече гостей.
        </p>
      </div>

      {/* STEP 1: POLISH SPEECH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              01
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Шаг 1: Улучшение презентации по обратной связи (7 мин)
              </h3>
              <p className="text-xs text-slate-400">
                Убери неясные формулировки, добавь яркий акцент на любимую функцию
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setPolishDone(true);
              handleClaimStepReward('step1');
            }}
            disabled={stepRewards.step1}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              stepRewards.step1
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
            }`}
          >
            {stepRewards.step1 ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{stepRewards.step1 ? 'Шаг 1 закрыт (+25 ОП)' : 'Отметить улучшение (+25 ОП)'}</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          💡 <strong>Совет ментора:</strong> Если партнер сказал, что проект сложно понять, начни с жизненного примера: «Представьте, что вы каждый день тратите 40 минут на... Мой проект решает это в 2 клика».
        </div>
      </div>

      {/* STEP 2: TECH AUDIT CHECKLIST */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
              02
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Шаг 2: Технический чек устройств и ссылок (5 мин)
              </h3>
              <p className="text-xs text-slate-400">
                Защита от сбоев во время живой демонстрации перед зрителями
              </p>
            </div>
          </div>

          <button
            onClick={() => handleClaimStepReward('step2')}
            disabled={!techAllDone || stepRewards.step2}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              stepRewards.step2
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : techAllDone
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            {stepRewards.step2 ? <CheckCircle2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            <span>{stepRewards.step2 ? 'Шаг 2 закрыт (+25 ОП)' : 'Завершить тех-чек (+25 ОП)'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'linksWorking' as const, label: '1. Все ссылки на 5 проектов открываются без ошибок 404', icon: Globe },
            { id: 'portfolioLoaded' as const, label: '2. Финальное портфолио открыто в отдельной вкладке', icon: FileText },
            { id: 'deviceCharged' as const, label: '3. Ноутбук/планшет заряжен или подключен к розетке', icon: BatteryCharging },
            { id: 'wifiTested' as const, label: '4. Интернет-соединение стабильно проверено', icon: Wifi }
          ].map(item => {
            const isChecked = techChecks[item.id];
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => toggleTechCheck(item.id)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer flex items-center gap-3 transition-all ${
                  isChecked
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                    isChecked
                      ? 'bg-amber-500 border-amber-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium leading-relaxed">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: FINAL TIMING STOPWATCH */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
              03
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Шаг 3: Финальный хронометраж речи (8 мин)
              </h3>
              <p className="text-xs text-slate-400">
                Контрольный замер: уложись в рамки 3–5 минут (180–300 секунд)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setTimingSaved(true);
              handleClaimStepReward('step3');
            }}
            disabled={seconds < 30 || stepRewards.step3}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              stepRewards.step3
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : seconds >= 30
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            {stepRewards.step3 ? <CheckCircle2 className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
            <span>{stepRewards.step3 ? 'Шаг 3 закрыт (+25 ОП)' : 'Зафиксировать время (+25 ОП)'}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Текущий хронометраж выступления:
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-purple-400 tracking-tight">
              {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {seconds < 180 ? '⏱️ Меньше 3 минут (можно добавить живое демо)' : seconds <= 300 ? '✅ Идеальный тайминг (3-5 мин)' : '⚠️ Больше 5 минут (стоит сократить)'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              }`}
            >
              {isRunning ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Остановить' : 'Начать выступление'}</span>
            </button>

            <button
              onClick={handleResetTimer}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      {/* STEP 4: SPACE & GUEST READINESS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
              04
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Шаг 4: Настройка пространства и встреча гостей (5 мин)
              </h3>
              <p className="text-xs text-slate-400">
                Помоги ментору подготовить класс, рассадить родителей и друзей
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSpaceReady(true);
              handleClaimStepReward('step4');
            }}
            disabled={stepRewards.step4}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              stepRewards.step4
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
            }`}
          >
            {stepRewards.step4 ? <CheckCircle2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            <span>{stepRewards.step4 ? 'Шаг 4 закрыт (+25 ОП)' : 'Зал готов к показу (+25 ОП)'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Атмосфера праздника создается вместе! Убедись, что экраны видны всем присутствующим, а микрофон и звук работают чисто.
        </p>
      </div>

      {/* ============================================================== */}
      {/* ОФИЦИАЛЬНАЯ СДАЧА ЛАБОРАТОРНОЙ РАБОТЫ В ПОРТАЛЕ                */}
      {/* ============================================================== */}
      <div className="pt-4 border-t border-slate-800">
        <InlineLabSubmission
          labId={24}
          lessonId={24}
          taskTitle="Лабораторная работа №24: Финальная подготовка Demo Day и презентация проекта"
          rewardExp={100}
        />
      </div>
    </div>
  );
};
