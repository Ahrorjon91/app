import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import { Trophy, CheckCircle2, Zap, Users, Filter, ShieldCheck, Send } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { profile, leaderboard, userAccounts, updateUserAccount, setIsXpModalOpen } = usePortal();
  const [selectedGroup, setSelectedGroup] = useState<string>('Все Группы');
  const [showHiddenToAdmin, setShowHiddenToAdmin] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isAdmin = profile.role === 'admin';
  const isStudent = !isAdmin;

  // Find student's group
  const myEmailLower = String(profile.email || '').toLowerCase().trim();
  const currentUserAccount = userAccounts.find(
    (u) => u && u.email && String(u.email).toLowerCase().trim() === myEmailLower
  );
  const studentGroup = currentUserAccount?.group || profile.group || 'Группа 1 (Август 2026)';

  // Effective filter group
  const effectiveGroup = isStudent ? studentGroup : selectedGroup;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Collect unique groups for admin filter tabs
  const availableGroups = useMemo(() => {
    const groupsSet = new Set<string>();
    groupsSet.add('Группа 1 (Август 2026)');
    groupsSet.add('Группа 2 (Ноябрь 2026)');

    try {
      const saved = localStorage.getItem('devops_portal_custom_groups');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((g) => {
            if (typeof g === 'string' && g.trim()) groupsSet.add(g.trim());
          });
        }
      }
    } catch {
      // ignore
    }

    leaderboard.forEach((u) => {
      if (u.group) groupsSet.add(u.group);
    });

    userAccounts
      .filter((u) => (u.role || 'student').toLowerCase() === 'student')
      .forEach((u) => {
        if (u.group) groupsSet.add(u.group);
      });

    return ['Все Группы', ...Array.from(groupsSet)];
  }, [leaderboard, userAccounts]);

  // Compute filtered leaderboard with local ranks (students only)
  const displayLeaderboard = useMemo(() => {
    let list = (leaderboard || []).filter((u) => {
      if (!u) return false;
      const userAcc = (userAccounts || []).find((acc) => acc && acc.email && u.email && acc.email.toLowerCase() === u.email.toLowerCase());
      const role = userAcc?.role || (u as any).role || 'student';
      return role.toLowerCase() === 'student';
    });

    if (effectiveGroup !== 'Все Группы') {
      list = list.filter((u) => (u.group || 'Группа 1 (Август 2026)') === effectiveGroup);
    }

    // Assign local 1-indexed ranks for the filtered view
    return (list || []).map((item, index) => ({
      ...item,
      groupRank: index + 1
    }));
  }, [leaderboard, effectiveGroup, userAccounts]);

  // Hidden users list for Mentor view (students only)
  const hiddenUsers = useMemo(() => {
    return (userAccounts || []).filter((u) => u && (u.role || 'student').toLowerCase() === 'student' && (u.status === 'Blocked' || u.hiddenFromLeaderboard));
  }, [userAccounts]);

  // Stats
  const activeCount = displayLeaderboard.length;
  const topStudent = displayLeaderboard[0];
  const avgXp = activeCount > 0 ? Math.round(displayLeaderboard.reduce((acc, u) => acc + u.totalPoints, 0) / activeCount) : 0;

  // Find current student's rank within their group
  const myEntry = displayLeaderboard.find((u) => u.isCurrentUser || u.name === profile.name);
  const myGroupRank = myEntry?.groupRank || myEntry?.rank || 0;

  const handleShareToTelegram = () => {
    const topList = displayLeaderboard
      .slice(0, 10)
      .map((u, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        return `${medal} ${u.name} — ${u.totalPoints} EXP (${u.completedLessons}/24 уроков)`;
      })
      .join('\n');

    const msg = `🏆 Таблица Лидеров AI for LIFE Academy\n📚 Группа: ${effectiveGroup}\n\n${topList}\n\n👉 Портал обучения: AI Engineer Academy`;
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent('https://devops-portal.pro')}&text=${encodeURIComponent(msg)}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 text-[#f5f5f7]">
      {/* Header Banner: Apple Midnight Exhibition Stage */}
      <div className="p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#ff791b] border border-[#262629] text-[11px] font-medium">
            <Trophy className="w-3.5 h-3.5" />
            <span>{isStudent ? `Рейтинг Вашей Учебной Группы` : `Система Рейтинга Студентов`}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight flex items-center gap-2">
            {isStudent ? `Таблица Лидеров · ${studentGroup}` : `Таблица Лидеров по Группам`}
          </h1>
          <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
            {isStudent
              ? `Здесь отображается актуальный рейтинг успеваемости участников вашей учебной группы (${studentGroup}).`
              : `Управление рейтингом успеваемости учебных групп и ротация выпускников.`
            }
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            onClick={handleShareToTelegram}
            className="px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            title="Отправить рейтинг в Telegram"
          >
            <Send className="w-3.5 h-3.5" />
            <span>В Telegram</span>
          </button>

          <button
            onClick={() => setIsXpModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] border border-[#333336] text-[#00d959] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Расчёт EXP</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-[20px] bg-[#1c2e22] border border-[#00d959]/30 text-[#00d959] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00d959]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mentor Control Panel Notice (Admins Only) */}
      {isAdmin && (
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#0071e3] font-medium text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Панель Наставника: Управление Группами</span>
            </div>

            <button
              onClick={() => setShowHiddenToAdmin(!showHiddenToAdmin)}
              className="px-3 py-1.5 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] text-xs font-medium border border-[#333336] flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#86868b]" />
              <span>{showHiddenToAdmin ? 'Скрыть архивных' : `Показать скрытых (${hiddenUsers.length})`}</span>
            </button>
          </div>

          <p className="text-xs text-[#86868b] leading-relaxed">
            При блокировке аккаунта студент автоматически удаляется из Лидерборда.
          </p>

          {showHiddenToAdmin && hiddenUsers.length > 0 && (
            <div className="pt-3 border-t border-[#262629] space-y-2">
              <span className="text-xs font-medium text-[#f5f5f7] block">Скрытые студенты:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {hiddenUsers.map((hu, idx) => (
                  <div key={`${hu.id || 'hu'}-${hu.email || 'email'}-${idx}`} className="p-2.5 rounded-[16px] bg-[#000000] border border-[#262629] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#f5f5f7] font-medium block">{hu.name}</span>
                      <span className="text-[10px] text-[#86868b]">{hu.group || 'Группа 1'}</span>
                    </div>
                    {hu.status === 'Active' && hu.hiddenFromLeaderboard && (
                      <button
                        onClick={() => {
                          updateUserAccount(hu.id, { hiddenFromLeaderboard: false });
                          showToast(`Студент ${hu.name} вернулся в активный рейтинг!`);
                        }}
                        className="px-2 py-0.5 rounded-full bg-[#1c2e22] text-[#00d959] text-[10px] font-medium hover:bg-[#243c2c] cursor-pointer"
                      >
                        Восстановить
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Group Selector / Information Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#161618] p-4 rounded-[28px] border border-white/[0.08]">
        {isAdmin ? (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
            <span className="text-xs text-[#86868b] shrink-0 mr-1">Группа:</span>
            {availableGroups.map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedGroup === grp
                    ? 'bg-[#0071e3] text-white'
                    : 'bg-[#000000] border border-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000000] text-[#0071e3] font-medium text-xs border border-[#262629]">
              <Users className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Ваша Группа: <strong className="text-[#f5f5f7]">{studentGroup}</strong></span>
            </div>
          </div>
        )}

        <div className="text-xs text-[#86868b] flex items-center gap-3 tabular-nums self-end sm:self-auto">
          <span>Студентов: <strong className="text-[#f5f5f7]">{activeCount}</strong></span>
          <span>Средний EXP: <strong className="text-[#00d959]">{avgXp}</strong></span>
        </div>
      </div>

      {/* Group Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs text-[#86868b] font-medium">
            {isStudent ? 'Ваша Группа' : 'Выбранная Группа'}
          </span>
          <p className="text-base sm:text-lg font-semibold text-[#0071e3] truncate">{effectiveGroup}</p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs text-[#86868b] font-medium">
            Лидер Группы 🥇
          </span>
          <p className="text-base sm:text-lg font-semibold text-[#ff791b] truncate">
            {topStudent ? topStudent.name : 'Нет данных'}
          </p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs text-[#86868b] font-medium">
            {isStudent ? 'Ваше Место в Группе' : 'Режим Ротации'}
          </span>
          <p className="text-base sm:text-lg font-semibold text-[#00d959] truncate tabular-nums">
            {isStudent ? `#${myGroupRank} из ${activeCount}` : '3 Месяца · Зачет'}
          </p>
        </div>
      </div>

      {/* Leaderboard Table: Clean Apple Instrument Matrix */}
      <div className="rounded-[28px] bg-[#161618] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#86868b]">
            <thead className="bg-[#000000] text-[#86868b] text-[11px] uppercase tracking-wider border-b border-[#262629]">
              <tr>
                <th className="p-4 font-medium">Место</th>
                <th className="p-4 font-medium">Студент</th>
                {isAdmin && <th className="p-4 font-medium">Группа</th>}
                <th className="p-4 font-medium">Баллы EXP</th>
                <th className="p-4 font-medium">Уроки</th>
                <th className="p-4 font-medium">Лабы / Тесты</th>
                <th className="p-4 font-medium">Посещаемость</th>
                <th className="p-4 font-medium">Бейджи</th>
                {isAdmin && <th className="p-4 text-right font-medium">Действия</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262629]">
              {displayLeaderboard.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 9 : 7} className="p-8 text-center text-[#86868b] font-medium">
                    В вашей группе пока нет других активных участников.
                  </td>
                </tr>
              ) : (
                displayLeaderboard.map((user: any, idx) => {
                  const isCurrentUser = user.isCurrentUser || user.name === profile.name;
                  const rankNum = user.groupRank || user.rank;
                  const userGroupStr = user.group || studentGroup;
                  const secXp = user.sectionXp || 0;
                  const lbXp = user.labXp || 0;
                  const tstXp = user.testXp || 0;
                  const hwXp = user.homeworkXp || 0;
                  const bdgXp = user.badgeXp || 0;

                  return (
                    <tr
                      key={`${user.id || user.name}-${rankNum}-${idx}`}
                      className={`transition-colors ${
                        isCurrentUser ? 'bg-[#1c2333]/60 border-l-2 border-[#0071e3]' : 'hover:bg-[#1c1c1f]'
                      }`}
                    >
                      <td className="p-4 font-mono font-semibold text-xs tabular-nums text-[#f5f5f7]">
                        {rankNum === 1 && '🥇 #1'}
                        {rankNum === 2 && '🥈 #2'}
                        {rankNum === 3 && '🥉 #3'}
                        {rankNum > 3 && `#${rankNum}`}
                      </td>

                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={user.avatar || studentAvatarSvg}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#333336]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = studentAvatarSvg;
                          }}
                        />
                        <div>
                          <span className="text-[#f5f5f7] block font-semibold">{user.name}</span>
                          {isCurrentUser && <span className="text-[10px] text-[#0071e3]">Вы (Ваш аккаунт)</span>}
                        </div>
                      </td>

                      {isAdmin && (
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#000000] text-[#86868b] border border-[#262629]">
                            {userGroupStr}
                          </span>
                        </td>
                      )}

                      <td className="p-4">
                        <div className="font-semibold text-[#00d959] text-xs tabular-nums">{user.totalPoints} EXP</div>
                        <div className="text-[10px] text-[#86868b] font-mono mt-0.5 flex flex-wrap gap-x-2 tabular-nums">
                          <span>Уроки: +{secXp}</span>
                          <span>Лабы: +{lbXp}</span>
                          <span>Тесты: +{tstXp}</span>
                          <span>ДЗ: +{hwXp}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono tabular-nums text-[#f5f5f7]">{user.completedLessons}/24</td>
                      <td className="p-4 font-mono text-xs tabular-nums text-[#86868b]">
                        {user.completedLabs ?? 0} лаб · {user.passedQuizzes ?? 0} тест
                      </td>
                      <td className="p-4 text-[#00d959] font-medium tabular-nums">{user.attendancePct}%</td>

                      <td className="p-4 text-xs text-[#ff791b] font-mono tabular-nums font-medium">
                        {user.badgesCount} бейджей
                      </td>

                      {isAdmin && (
                        <td className="p-4 text-right">
                          {user.id && (
                            <button
                              onClick={() => {
                                updateUserAccount(user.id!, { hiddenFromLeaderboard: true });
                                showToast(`Студент ${user.name} исключен из рейтинга.`);
                              }}
                              className="px-2.5 py-1 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-rose-400 border border-[#262629] text-[10px] font-medium transition-colors cursor-pointer"
                              title="Исключить из рейтинга"
                            >
                              Исключить
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
