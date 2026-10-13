import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import studentAvatarSvg from '../assets/images/student_avatar.svg';
import { Trophy, CheckCircle2, Zap, Users, Filter, ShieldCheck, Send, Share2 } from 'lucide-react';

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

    const messageText = `🏆 Таблица Лидеров AI for LIFE Academy\n📌 Группа: ${effectiveGroup}\n\n${topList}\n\n📊 Статистика:\n• Студентов: ${activeCount}\n• Средний балл: ${avgXp} EXP\n\n🎓 AI for LIFE Student Portal`;

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(messageText)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
      showToast('Рейтинг скопирован в буфер обмена! Открываем Telegram...');
    } else {
      showToast('Открываем Telegram...');
    }

    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
            <Trophy className="w-3.5 h-3.5" /> {isStudent ? `Рейтинг Вашей Учебной Группы` : `Система Рейтинга и Лидерборда Студентов`}
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {isStudent ? `Таблица Лидеров • ${studentGroup}` : `Таблица Лидеров по Группам Студентов`}
          </h1>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            {isStudent
              ? `Здесь отображается актуальный рейтинг успеваемости участников вашей учебной группы (${studentGroup}). Информация о других группах скрыта согласно политике академической приватности.`
              : `Управление рейтингом успеваемости всех учебных групп. Наставники могут просматривать отдельные группы и отключать выпускников после 3-месячного курса для ротации новых групп.`
            }
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            onClick={handleShareToTelegram}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            title="Отправить рейтинг в Telegram канал или группу"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>В Telegram</span>
          </button>

          <button
            onClick={() => setIsXpModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Как рассчитывается EXP?</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mentor Control Panel Notice (Admins Only) */}
      {isAdmin && (
        <div className="p-5 rounded-3xl bg-purple-950/40 border border-purple-800/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Панель Наставника: Управление Группами & 3-Месячной Ротацией</span>
            </div>

            <button
              onClick={() => setShowHiddenToAdmin(!showHiddenToAdmin)}
              className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-700/50 flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <Users className="w-3.5 h-3.5 text-purple-300" />
              <span>{showHiddenToAdmin ? 'Скрыть архивных пользователей' : `Показать заблокированных/скрытых (${hiddenUsers.length})`}</span>
            </button>
          </div>

          <p className="text-[11px] text-purple-300/80 leading-relaxed">
            При блокировке аккаунта в разделе «Управление Пользователями и Ролями» студент автоматически удаляется из Лидерборда. После завершения 3-месячного обучения наставник может нажать «Исключить из рейтинга», чтобы расчистить места для новых студентов.
          </p>

          {showHiddenToAdmin && hiddenUsers.length > 0 && (
            <div className="pt-2 border-t border-purple-800/30 space-y-2">
              <span className="text-[11px] font-bold text-purple-200 block">Заблокированные или скрытые студенты:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {hiddenUsers.map((hu, idx) => (
                  <div key={`${hu.id || 'hu'}-${hu.email || 'email'}-${idx}`} className="p-2.5 rounded-xl bg-slate-900/80 border border-purple-800/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-bold block">{hu.name}</span>
                      <span className="text-[10px] text-purple-400">{hu.group || 'Группа 1'} • {hu.status === 'Blocked' ? '❌ Заблокирован' : '⏸️ Скрыт вручную'}</span>
                    </div>
                    {hu.status === 'Active' && hu.hiddenFromLeaderboard && (
                      <button
                        onClick={() => {
                          updateUserAccount(hu.id, { hiddenFromLeaderboard: false });
                          showToast(`Студент ${hu.name} вернулся в активный рейтинг!`);
                        }}
                        className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] hover:bg-emerald-500/30"
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
        {isAdmin ? (
          /* Admins can filter by group or see all groups */
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">Группа:</span>
            {availableGroups.map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedGroup === grp
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>
        ) : (
          /* Students ONLY see their locked group badge */
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Ваша Учебная Группа: <strong className="text-white">{studentGroup}</strong></span>
            </div>
            <span className="text-xs text-slate-400 hidden md:inline">
              (Отображаются только участники вашей группы)
            </span>
          </div>
        )}

        <div className="text-xs text-slate-400 font-bold flex items-center gap-3 self-end sm:self-auto">
          <span>Студентов в вашей группе: <strong className="text-white">{activeCount}</strong></span>
          <span>Средний EXP: <strong className="text-cyan-400">{avgXp}</strong></span>
        </div>
      </div>

      {/* Group Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {isStudent ? 'Ваша Группа' : 'Выбранная Группа'}
          </span>
          <p className="text-lg font-black text-indigo-400 truncate">{effectiveGroup}</p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {isStudent ? 'Лидер Вашей Группы 🥇' : 'Лидер Группы 🥇'}
          </span>
          <p className="text-lg font-black text-amber-400 truncate">
            {topStudent ? topStudent.name : 'Нет данных'}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400">
            {isStudent ? 'Ваше Место в Группе' : 'Режим Ротации'}
          </span>
          <p className="text-lg font-black text-emerald-400 truncate">
            {isStudent ? `#${myGroupRank} из ${activeCount}` : '3 Месяца • Финальный Зачет'}
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Место</th>
                <th className="p-4">Студент</th>
                {isAdmin && <th className="p-4">Группа</th>}
                <th className="p-4">Баллы EXP (Расчёт)</th>
                <th className="p-4">Уроки</th>
                <th className="p-4">Лабы / Тесты</th>
                <th className="p-4">Посещаемость</th>
                <th className="p-4">Бейджи</th>
                {isAdmin && <th className="p-4 text-right">Управление Наставника</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {displayLeaderboard.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 9 : 7} className="p-8 text-center text-slate-500 font-medium">
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
                        isCurrentUser ? 'bg-cyan-950/60 font-bold border-l-4 border-cyan-400 shadow-lg' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-4 font-mono font-extrabold text-sm">
                        {rankNum === 1 && '🥇 #1'}
                        {rankNum === 2 && '🥈 #2'}
                        {rankNum === 3 && '🥉 #3'}
                        {rankNum > 3 && `#${rankNum}`}
                      </td>

                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={user.avatar || studentAvatarSvg}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = studentAvatarSvg;
                          }}
                        />
                        <div>
                          <span className="text-white block font-bold">{user.name}</span>
                          {isCurrentUser && <span className="text-[10px] text-cyan-400 font-mono">Вы (Ваш аккаунт)</span>}
                        </div>
                      </td>

                      {isAdmin && (
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            {userGroupStr}
                          </span>
                        </td>
                      )}

                      <td className="p-4">
                        <div className="font-mono font-bold text-cyan-400 text-sm">{user.totalPoints} EXP</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
                          <span>Уроки: +{secXp}</span>
                          <span>Лабы: +{lbXp}</span>
                          <span>Тесты: +{tstXp}</span>
                          <span>ДЗ: +{hwXp}</span>
                          <span>Бейджи: +{bdgXp}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono">{user.completedLessons}/24</td>
                      <td className="p-4 font-mono text-xs text-slate-300">
                        {user.completedLabs ?? 0} лаб • {user.passedQuizzes ?? 0} тест
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">{user.attendancePct}%</td>

                      <td className="p-4 text-xs text-amber-400 font-mono font-bold">
                        🏆 {user.badgesCount} бейджей
                      </td>

                      {isAdmin && (
                        <td className="p-4 text-right space-x-2">
                          {user.id && (
                            <button
                              onClick={() => {
                                updateUserAccount(user.id!, { hiddenFromLeaderboard: true });
                                showToast(`Студент ${user.name} исключен из рейтинга (3-месячный цикл завершен).`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[10px] font-bold transition-all"
                              title="Исключить из рейтинга после 3 месяцев"
                            >
                              Исключить (3 мес.)
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

      {/* Share to Telegram Bottom Action Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-indigo-950/80 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-white">Поделиться Рейтингом в Telegram Группу / Канал</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Экспортируйте отформатированную сводку успеваемости студентов вашей группы напрямую в Telegram-канал или чат.
            </p>
          </div>
        </div>

        <button
          onClick={handleShareToTelegram}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <Send className="w-4 h-4 fill-current" />
          <span>Отправить в Telegram</span>
        </button>
      </div>
    </div>
  );
};
