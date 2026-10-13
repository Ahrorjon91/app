import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  ShieldCheck,
  Zap,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  HelpCircle,
  GraduationCap,
  Calculator,
  CheckCircle2,
  Lock,
  RefreshCw,
  Info
} from 'lucide-react';

export const MentorGradingGuide: React.FC = () => {
  const { profile, recalculateAllStudentsScores, setIsAuditModalOpen } = usePortal();
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [recalcSuccess, setRecalcSuccess] = useState(false);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      recalculateAllStudentsScores();
      setIsRecalculating(false);
      setRecalcSuccess(true);
      setTimeout(() => setRecalcSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Mentor Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 space-y-4 text-white relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Панель Ментора • Приватный Регламент Оценивания</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-400" /> Справочник Формул и Оценивания (EXP & Академический Балл)
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Полный регламент расчета Посещаемости, Академического Балла (100% макс) и Накопленного Опыта (до 5000+ EXP) для преподавателей и менторов курса DEVOPS Academy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleRecalculate}
              disabled={isRecalculating}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>{isRecalculating ? 'Перерасчет...' : 'Пересчитать баллы группы'}</span>
            </button>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Полный Аудит Курса</span>
            </button>
          </div>
        </div>

        {recalcSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Все рейтинги и академические показатели группы успешно пересчитаны!</span>
          </div>
        )}
      </div>

      {/* Grid: 2 Main Sections (EXP Breakdown & Academic Score) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Academic Score & Attendance Formula */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Академический Балл (100% Максимум)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Формула взвешенной оценки успеваемости студента
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black">
              100 БАЛЛОВ
            </span>
          </div>

          {/* Deep dive into Attendance */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Info className="w-4 h-4 text-indigo-500" /> Как рассчитывается Посещаемость?
              </span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">ВЕС 15% (15 б.)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Формула Посещаемости:</strong> <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px] text-indigo-500">(Прочитано подтем / 120 всего) × 100%</code>.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              В курсе всего 24 урока, по 5 теоретических подтем в каждом (итого 120 подтем). Каждая прочитанная студентом подтема (+25 EXP) повышает Посещаемость. При изучении всех 120 подтем Посещаемость достигает 100% и даёт ровно <strong>15 академических баллов</strong> из 100.
            </p>
          </div>

          {/* Table of components */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Составляющие Академического Балла:
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">1. Посещаемость (120 подтем)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">15 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">15% от итоговой оценки</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">2. Завершение Уроков (24 урока)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">15 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">15% от итоговой оценки</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3. Практические Лабы (24 лабы)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">25 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">25% от итоговой оценки</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">4. Домашние Задания (24 ДЗ)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">20 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">20% от итоговой оценки</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">5. Рубежные Тесты (6 тестов)</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">15 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">15% от итоговой оценки</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">6. Финальный Экзамен</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">10 баллов макс</span>
                  <span className="block text-[10px] text-slate-400">10% от итоговой оценки</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: EXP System (Maximum 5000+ EXP) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Система Опыта EXP (~5000+ EXP)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Правила начисления баллов за активность и практические задачи
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-black">
              5000+ EXP МАКС
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            EXP (Experience Points) используется для динамического формирования Таблицы Лидеров Аспирантов. При прохождении всей программы курса студент набирает порядка 5,000+ EXP.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Чтение секции урока (120 подтем)</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+25 EXP (до 3000 EXP)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Бонус полного завершения урока</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+50 EXP (до 1200 EXP)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Одобренная Лабораторная Работа</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+100 EXP (до 2400 EXP)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Одобренное Домашнее Задание</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+75 EXP (до 1800 EXP)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Сдача Рубежного Теста</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+150 EXP (до 900 EXP)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Сдача Финального Экзамена</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+500 EXP</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Получение Бейджа / Награды</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">+50 .. +150 EXP за бейдж</span>
            </div>
          </div>
        </div>

        {/* Card 3: Badges & Achievements System */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Система Бейджей и Достижений (10 Ачивок • До +1150 Бонусных EXP)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Условия получения специальных наград и начисления опыта за профессиональные компетенции
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-black">
              10 БЕЙДЖЕЙ
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Бейджи выдаются студентам автоматически при выполнении ключевых практических заданий курса или вручную ментором при проверке особых заслуг. Каждое достижение приносит от <strong>+50 до +150 EXP</strong> и отображается в профиле студента и таблице лидеров.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b1.</span> Linux Hero
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Освоение 30 базовых команд Linux терминала, работы с `chmod`, `chown` и `systemd` демонами.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b2.</span> Network Master
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Расчет масок подсетей CIDR /24, маскирование IPv4 и успешная сборка топологии сети в Cisco Packet Tracer.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b3.</span> Cyber Defender
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Настройка шифрования BitLocker, создание правил брандмауэра Windows/ufw и подключение двухфакторной аутентификации (MFA).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b4.</span> HelpDesk Pro
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Симуляция работы в технической поддержке: успешное решение и закрытие 5 тикетов в JIRA Service Desk с соблюдением SLA.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b5.</span> Server Guru
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+150 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Развертывание полноценного контроллера домена Active Directory (AD DS), DNS, DHCP и применение групповых политик (GPO).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b6.</span> Active Directory Master
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Автоматическое создание и управление учетными записями пользователей через PowerShell скрипты в домене.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b7.</span> Virtualization Expert
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Создание виртуальных машин в VirtualBox/VMware, настройка виртуальных адаптеров сети и тестирование отката снапшотов.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b8.</span> Automation Ninja
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Написание Bash и PowerShell скриптов автоматизации регулярных административных задач с привязкой к cron.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500 font-extrabold">b9.</span> Perfect Attendance
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">+100 EXP</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Достижение и удержание показателя Посещаемости лекций и теоретических блоков на уровне 95%+.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
