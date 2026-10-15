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
  Lock
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#000000] border border-white/[0.08] rounded-[28px] flex flex-col overflow-hidden text-[#f5f5f7]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#262629] flex items-center justify-between bg-[#000000]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#1c1c1f] border border-[#333336] text-[#00d959]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#f5f5f7]">
                Детализация начисления EXP
              </h2>
              <p className="text-xs text-[#86868b]">
                Пользователь: <span className="text-[#f5f5f7] font-medium">{userName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-[#1c1c1f] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total EXP Banner */}
        <div className="p-6 bg-[#161618] border-b border-[#262629] flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs text-[#86868b] font-medium block">ИТОГОВЫЙ АКАДЕМИЧЕСКИЙ БАЛЛ:</span>
            <div className="text-3xl font-semibold text-[#00d959] flex items-center gap-2 mt-1 tabular-nums">
              <span>{xpBreakdown.totalXp.toLocaleString()} EXP</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] font-mono font-medium">
                VERIFIED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedTab('categories')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedTab === 'categories'
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              Категории
            </button>
            <button
              onClick={() => setSelectedTab('lessons')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedTab === 'lessons'
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              По урокам (1–24)
            </button>
            <button
              onClick={() => setSelectedTab('badges')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTab === 'badges'
                  ? 'bg-[#0071e3] text-white'
                  : 'bg-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-[#ff791b]" />
              <span>Награды ({unlockedCount}/{totalBadgesCount})</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#f5f5f7]">
          {selectedTab === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              
              {/* Section Read */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#0071e3]" /> Секции уроков
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.sectionXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  +25 EXP за каждую изученную секцию урока (4 секции на урок).
                </p>
              </div>

              {/* Lesson Completion Bonus */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00d959]" /> Завершение уроков
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.lessonBonusXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  +50 EXP за полное прохождение всех 4 секций урока.
                </p>
              </div>

              {/* Laboratories */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-[#00d959]" /> Лабораторные работы
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.labXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  Начисляется после зачёта ментором: 50, 75 или 100 EXP.
                </p>
              </div>

              {/* Lesson Tests */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <QuizIcon className="w-4 h-4 text-[#0071e3]" /> Тесты уроков
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.testXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  +100 EXP (10/10), +75 EXP (1–3 ошибки), +50 EXP (4 ошибки).
                </p>
              </div>

              {/* Homework */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-[#ff791b]" /> Домашние задания
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.homeworkXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  Проверяется ментором: 50, 75 или 100 EXP.
                </p>
              </div>

              {/* Block Tests */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#0071e3]" /> Рубежные тесты блоков
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.blockTestXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  +100 EXP за рубежный проверочный тест блока (TEST_1–TEST_6).
                </p>
              </div>

              {/* Final Exam */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#ff791b]" /> Финальный Экзамен (60 вопросов)
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.finalExamXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  +500 EXP за успешную сдачу финального сертификационного экзамена (порог 85%).
                </p>
              </div>

              {/* Academic Awards & Badges Card */}
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#f5f5f7] flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#ff791b]" /> Академические Награды & Бейджи
                  </span>
                  <span className="text-xs font-semibold text-[#00d959] tabular-nums">+{xpBreakdown.badgeXp} EXP</span>
                </div>
                <p className="text-xs text-[#86868b]">
                  Очки за разблокированные академические достижения (+100–150 EXP за каждый бейдж).
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#262629]">
                  <div className="flex items-center gap-2 text-xs text-[#86868b]">
                    <span>Статус наград:</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#1c1c1f] text-[#f5f5f7] font-medium text-[11px] tabular-nums">
                      {unlockedCount} из {totalBadgesCount} разблокировано
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTab('badges')}
                    className="text-xs text-[#0071e3] hover:underline font-medium flex items-center gap-1 cursor-pointer"
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
              <h3 className="text-xs font-medium text-[#86868b] uppercase tracking-wider mb-2">
                Детализация начисления EXP по урокам:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {xpBreakdown.lessonItems.map((item) => (
                  <div
                    key={item.lessonId}
                    className="p-3.5 rounded-[18px] bg-[#161618] border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-[#f5f5f7] block">
                        Урок {item.lessonId}: {item.lessonTitle}
                      </span>
                      <div className="text-[11px] text-[#86868b] space-x-2 mt-0.5 tabular-nums">
                        <span>Секции: +{item.sectionXp}</span>
                        <span>· Завершение: +{item.lessonBonusXp}</span>
                        <span>· Тест: +{item.testXp}</span>
                        <span>· Лаб: +{item.labXp}</span>
                        <span>· ДЗ: +{item.homeworkXp}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#000000] border border-[#262629] text-[#00d959] font-semibold tabular-nums text-xs shrink-0">
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
              <div className="p-4 rounded-[20px] bg-[#161618] border border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#1c1c1f] text-[#ff791b] border border-[#333336]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#f5f5f7]">
                      Академические Награды
                    </h3>
                    <p className="text-[11px] text-[#86868b]">
                      Присуждаются автоматически за достижения и активность
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 tabular-nums">
                  <div className="text-right">
                    <div className="text-xs text-[#00d959] font-semibold">+{xpBreakdown.badgeXp} EXP</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#000000] border border-[#262629] text-[#f5f5f7] font-medium text-xs">
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
                      className={`p-3.5 rounded-[20px] border transition-colors flex items-start gap-3 ${
                        isUnlocked
                          ? 'bg-[#161618] border-white/[0.12] text-[#f5f5f7]'
                          : 'bg-[#0a0a0b] border-[#1c1c1f] text-[#86868b] opacity-60'
                      }`}
                    >
                      <AcademicBadgeIcon badgeId={badge.id} title={displayTitle} unlocked={isUnlocked} size="md" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-xs font-semibold truncate ${isUnlocked ? 'text-[#f5f5f7]' : 'text-[#86868b]'}`}>
                            {displayTitle}
                          </span>
                          <span
                            className={`text-[10px] tabular-nums px-2 py-0.5 rounded-full font-medium shrink-0 ${
                              isUnlocked
                                ? 'bg-[#1c2e22] text-[#00d959]'
                                : 'bg-[#1c1c1f] text-[#86868b]'
                            }`}
                          >
                            +{rewardXp} EXP
                          </span>
                        </div>

                        <p className="text-[11px] text-[#86868b] line-clamp-2 leading-relaxed">
                          {displayDesc}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#262629] text-[10px]">
                          <span className="text-[#86868b]">{badge.category || 'Курс'}</span>
                          {isUnlocked ? (
                            <span className="text-[#00d959] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Получено {badge.unlockedAt ? `(${badge.unlockedAt})` : ''}</span>
                            </span>
                          ) : (
                            <span className="text-[#6e6e73] flex items-center gap-1">
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
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#262629] bg-[#000000] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
