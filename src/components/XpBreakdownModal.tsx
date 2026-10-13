import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  FlaskConical,
  HelpCircle as QuizIcon,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  Trophy,
  Sparkles,
  Lock,
  Calendar
} from 'lucide-react';
import { XpBreakdown } from '../lib/calculationEngine';
import { BadgeItem } from '../types';
import { AcademicBadgeIcon } from './AcademicBadgeIcon';
import { INITIAL_BADGES } from '../data/syllabusData';

interface XpBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpBreakdown?: XpBreakdown;
  userName?: string;
  badges?: BadgeItem[];
}

export const XpBreakdownModal: React.FC<XpBreakdownModalProps> = ({
  isOpen,
  onClose,
  xpBreakdown,
  userName = 'Студент',
  badges = []
}) => {
  const [selectedTab, setSelectedTab] = useState<'categories' | 'lessons' | 'badges'>('categories');

  if (!isOpen || !xpBreakdown) return null;

  // Build a merged badges list ensuring all 9 badges exist
  const effectiveBadges: BadgeItem[] = INITIAL_BADGES.map((ib) => {
    const found = badges.find((b) => b.id === ib.id || b.title === ib.title);
    return {
      ...ib,
      unlocked: found ? Boolean(found.unlocked) : false,
      unlockedAt: found?.unlockedAt,
    };
  });

  const unlockedCount = effectiveBadges.filter((b) => b.unlocked).length;
  const totalBadgesCount = effectiveBadges.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-800/50 text-amber-400 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                Как рассчитан мой EXP?
              </h2>
              <p className="text-xs text-slate-400">
                Детализация начисления очков для пользователя <span className="text-amber-300 font-bold">{userName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total EXP Banner */}
        <div className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs text-slate-400 font-medium">ИТОГОВЫЙ БАЛЛ ПО ЕДИНОМУ ДВИЖКУ (SINGLE SOURCE OF TRUTH):</span>
            <div className="text-3xl font-black text-amber-400 flex items-center gap-2 mt-0.5">
              <span>{xpBreakdown.totalXp.toLocaleString()} EXP</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono font-bold">
                PROVED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedTab('categories')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'categories'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Категории активности
            </button>
            <button
              onClick={() => setSelectedTab('lessons')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTab === 'lessons'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              По урокам (1–24)
            </button>
            <button
              onClick={() => setSelectedTab('badges')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTab === 'badges'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Награды & Бейджи ({unlockedCount}/{totalBadgesCount})</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {selectedTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Section Read */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Изучение секций уроков
                  </span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">+{xpBreakdown.sectionXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  +25 EXP за каждую изученную секцию урока (4 секции на урок).
                </p>
              </div>

              {/* Lesson Completion Bonus */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Бонусы за завершение уроков
                  </span>
                  <span className="text-sm font-bold text-emerald-300 font-mono">+{xpBreakdown.lessonBonusXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  +50 EXP за полное завершение всех 4 секций урока.
                </p>
              </div>

              {/* Laboratories */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4" /> Лабораторные работы
                  </span>
                  <span className="text-sm font-bold text-purple-300 font-mono">+{xpBreakdown.labXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  Начисляется и подтверждается после проверки Ментором согласно оценке: <strong>50 EXP, 75 EXP или 100 EXP</strong>.
                </p>
              </div>

              {/* Lesson Tests */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <QuizIcon className="w-4 h-4" /> Обычные тесты уроков (10 вопросов)
                  </span>
                  <span className="text-sm font-bold text-indigo-300 font-mono">+{xpBreakdown.testXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  +100 EXP (10/10 без ошибок), +75 EXP (1–3 ошибки), +50 EXP (4 ошибки). При &gt;4 ошибках тест блокируется (0 EXP).
                </p>
              </div>

              {/* Homework */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4" /> Домашние задания
                  </span>
                  <span className="text-sm font-bold text-blue-300 font-mono">+{xpBreakdown.homeworkXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  Начисляется и подтверждается после проверки Ментором согласно оценке: <strong>50 EXP, 75 EXP или 100 EXP</strong> (+ открытие следующего урока).
                </p>
              </div>

              {/* Block Tests */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> Рубежные тесты блоков (TEST_1–TEST_6)
                  </span>
                  <span className="text-sm font-bold text-amber-300 font-mono">+{xpBreakdown.blockTestXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  +100 EXP (0 ошибок), +75 EXP (1–3 ошибки), +50 EXP (4 ошибки). При &gt;4 ошибках тест блокируется (0 EXP).
                </p>
              </div>

              {/* Final Exam */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Финальный Экзамен (60 вопросов)
                  </span>
                  <span className="text-sm font-bold text-yellow-300 font-mono">+{xpBreakdown.finalExamXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  +500 EXP за сданный итоговый экзамен курса (проходной балл 85%, т.е. 51/60 вопросов).
                </p>
              </div>

              {/* Academic Awards & Badges Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/50 space-y-2 md:col-span-2 bg-gradient-to-r from-amber-950/20 via-slate-950 to-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" /> Академические Награды & Бейджи (Badges EXP)
                  </span>
                  <span className="text-sm font-bold text-amber-300 font-mono">+{xpBreakdown.badgeXp} EXP</span>
                </div>
                <p className="text-xs text-slate-400">
                  Очки за разблокированные академические достижения и награды (+100–150 EXP за каждый полученный бейдж).
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span>Статус наград:</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold font-mono text-[11px]">
                      {unlockedCount} из {totalBadgesCount} разблокировано
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTab('badges')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Смотреть награды</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {selectedTab === 'lessons' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white mb-2">
                Детализация начисления EXP по 24 урокам курса:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {xpBreakdown.lessonItems.map((item) => (
                  <div
                    key={item.lessonId}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">
                        Урок {item.lessonId}: {item.lessonTitle}
                      </span>
                      <div className="text-[11px] text-slate-400 space-x-2 mt-0.5">
                        <span>Секции: +{item.sectionXp} EXP</span>
                        <span>• Завершение: +{item.lessonBonusXp} EXP</span>
                        <span>• Тест: +{item.testXp} EXP</span>
                        <span>• Лаб: +{item.labXp} EXP</span>
                        <span>• ДЗ: +{item.homeworkXp} EXP</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-bold font-mono text-xs shrink-0">
                      +{item.totalLessonXp} EXP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'badges' && (
            <div className="space-y-4">
              {/* Summary Card for Badges */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border border-amber-900/40 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      Академические Награды за Успеваемость
                    </h3>
                    <p className="text-xs text-slate-400">
                      Присуждаются автоматически за выполнение практик, тестов и посещаемость курса
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Заработано EXP с наград:</div>
                    <div className="text-base font-black text-amber-400 font-mono">+{xpBreakdown.badgeXp} EXP</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold font-mono text-xs">
                    {unlockedCount} / {totalBadgesCount}
                  </div>
                </div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {effectiveBadges.map((badge) => {
                  const isUnlocked = Boolean(badge.unlocked);
                  const displayTitle = badge.titleRu || badge.title;
                  const displayDesc = badge.descriptionRu || badge.description;
                  const rewardXp = Number(badge.xpReward) || 100;

                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        isUnlocked
                          ? 'bg-amber-950/20 border-amber-600/40 text-slate-200 shadow-xs'
                          : 'bg-slate-950 border-slate-800/80 text-slate-500 opacity-70'
                      }`}
                    >
                      <AcademicBadgeIcon badgeId={badge.id} title={displayTitle} unlocked={isUnlocked} size="md" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-xs font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                            {displayTitle}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shrink-0 ${
                              isUnlocked
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            +{rewardXp} EXP
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {displayDesc}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/60 text-[10px]">
                          <span className="text-slate-500">{badge.category || 'Курс'}</span>
                          {isUnlocked ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Разблокировано {badge.unlockedAt ? `(${badge.unlockedAt})` : ''}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>Не получено</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Calculation Engine Rules Footer note */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 space-y-1">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Единая логика (Calculation Engine):
            </div>
            <p>
              Система гарантирует одинаковый подсчёт EXP для Студента, Ментора, Администратора и Рейтинга. Все академические награды (+100–150 EXP) суммируются в общий EXP профиля.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20"
          >
            Понятно
          </button>
        </div>

      </div>
    </div>
  );
};
