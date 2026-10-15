import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { UserAccount, UserRole } from '../types';
import { api } from '../lib/api';
import {
  Users,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Lock,
  Mail,
  KeyRound,
  Trash2,
  Edit2,
  CheckCircle2,
  Search,
  Filter,
  UserX,
  UserCheck,
  RefreshCw,
  RotateCcw,
  Database,
  Phone,
  Send,
  Sliders,
  Check,
  Trophy,
  FolderPlus,
  Plus,
  X,
  Layers,
  Tag
} from 'lucide-react';
import { AcademicBadgeIcon } from '../components/AcademicBadgeIcon';
import { INITIAL_BADGES } from '../data/syllabusData';

const DEFAULT_GROUPS = [
  'Группа 1 (Август 2026)',
  'Группа 2 (Ноябрь 2026)',
  'Группа 3 (Февраль 2027)',
  'Группа 4 (Май 2027)',
];

const getSavedCustomGroups = (): string[] => {
  try {
    const raw = localStorage.getItem('devops_portal_custom_groups');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const UserManagementPage: React.FC = () => {
  const {
    userAccounts,
    addUserAccount,
    updateUserAccount,
    deleteUserAccount,
    profile,
    fetchDatabaseFromWebApp,
    syncAllToGoogleSheets,
    restoreAllFromGoogleSheets,
    resetData,
    setIsAuditModalOpen,
    recalculateAllStudentsScores,
    toggleBadgeForUser
  } = usePortal();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'student'>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserAccount | null>(null);
  
  // Edit user modal state
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('student');
  const [editGroup, setEditGroup] = useState('Группа 1 (Август 2026)');
  const [isEditCreatingNewGroup, setIsEditCreatingNewGroup] = useState(false);
  const [customEditGroupName, setCustomEditGroupName] = useState('');
  const [editUnlockedLessonsCount, setEditUnlockedLessonsCount] = useState<number>(1);
  const [editStatus, setEditStatus] = useState<'Active' | 'Blocked' | 'Pending'>('Active');
  const [editHiddenFromLeaderboard, setEditHiddenFromLeaderboard] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState('');
  const [editTelegram, setEditTelegram] = useState('');

  // Create user modal state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('123456789');
  const [newRole, setNewRole] = useState<UserRole>('student');
  const [newGroup, setNewGroup] = useState('Группа 1 (Август 2026)');
  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [customGroupName, setCustomGroupName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTelegram, setNewTelegram] = useState('');

  // Groups modal & group filter state
  const [customGroups, setCustomGroups] = useState<string[]>(() => getSavedCustomGroups());
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [isGroupsModalOpen, setIsGroupsModalOpen] = useState(false);
  const [newGroupNameInput, setNewGroupNameInput] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const saveNewGroup = (groupName: string): string => {
    const trimmed = groupName.trim();
    if (!trimmed) return '';
    const current = getSavedCustomGroups();
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      localStorage.setItem('devops_portal_custom_groups', JSON.stringify(updated));
      setCustomGroups(updated);
    }
    return trimmed;
  };

  // Dynamically aggregate all available groups from defaults, saved custom groups, and active users
  const allAvailableGroups = React.useMemo(() => {
    const set = new Set<string>();
    DEFAULT_GROUPS.forEach((g) => set.add(g));
    customGroups.forEach((g) => {
      if (g && g.trim()) set.add(g.trim());
    });
    (userAccounts || []).forEach((u) => {
      if (u && u.group && u.group.trim()) {
        set.add(u.group.trim());
      }
    });
    return Array.from(set);
  }, [customGroups, userAccounts]);

  // Sync users with backend Google Sheets database on mount
  useEffect(() => {
    let isMounted = true;
    api.adminGetStudents()
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.students) && res.students.length > 0) {
          res.students.forEach((stu: any) => {
            updateUserAccount(stu.id || stu.email, stu);
          });
        }
      })
      .catch((err) => {
        console.warn('Could not sync initial users from Google Sheets:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = (userAccounts || []).filter((u) => {
    if (!u) return false;
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesGroup = filterGroup === 'all' || (u.group || 'Группа 1 (Август 2026)') === filterGroup;
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      String(u.name || '').toLowerCase().includes(q) ||
      String(u.email || '').toLowerCase().includes(q) ||
      String(u.group || '').toLowerCase().includes(q);
    return matchesRole && matchesGroup && matchesSearch;
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return;

    const rawGroup = isCreatingNewGroup && customGroupName.trim()
      ? customGroupName.trim()
      : newGroup.trim();
    const finalGroup = rawGroup || 'Группа 1 (Август 2026)';
    if (finalGroup) {
      saveNewGroup(finalGroup);
    }

    await addUserAccount({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      password: newPassword.trim(),
      role: newRole,
      status: 'Active',
      group: finalGroup,
      phone: newPhone.trim() || '+992 90 000 0000',
      telegram: newTelegram.trim() || '@student',
      hiddenFromLeaderboard: false,
      unlockedLessonsCount: newRole === 'admin' ? 24 : 1,
      completedLessonsCount: 0,
      completedLabsCount: 0,
      passedQuizCount: 0,
      attendancePct: 100,
    });

    showToast(`Пользователь ${newName} (${newRole}, ${finalGroup}) успешно создан и сохранен в Google Sheets!`);
    setIsModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('123456789');
    setNewRole('student');
    setNewGroup(finalGroup);
    setIsCreatingNewGroup(false);
    setCustomGroupName('');
    setNewPhone('');
    setNewTelegram('');
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const rawGroup = isEditCreatingNewGroup && customEditGroupName.trim()
      ? customEditGroupName.trim()
      : editGroup.trim();
    const finalGroup = rawGroup || 'Группа 1 (Август 2026)';
    if (finalGroup) {
      saveNewGroup(finalGroup);
    }

    await updateUserAccount(editingUser.id, {
      name: editName.trim(),
      email: editEmail.trim().toLowerCase(),
      password: editPassword.trim() || undefined,
      role: editRole,
      group: finalGroup,
      unlockedLessonsCount: editRole === 'admin' ? 24 : Math.min(24, Math.max(1, Number(editUnlockedLessonsCount) || 1)),
      status: editStatus,
      hiddenFromLeaderboard: editHiddenFromLeaderboard,
      phone: editPhone.trim() || undefined,
      telegram: editTelegram.trim() || undefined,
    });

    showToast(`Пользователь "${editName}" (группа: ${finalGroup}) обновлен и сохранен в Google Sheets!`);
    setEditingUser(null);
    setIsEditCreatingNewGroup(false);
    setCustomEditGroupName('');
  };

  const handleReloadFromSheets = async () => {
    setIsSyncing(true);
    try {
      const res = await api.adminGetStudents();
      if (res.success && Array.isArray(res.students) && res.students.length > 0) {
        res.students.forEach((stu: any) => {
          updateUserAccount(stu.id || stu.email, stu);
        });
        showToast('Пользователи успешно прочитаны из Google Sheets (doGET)!');
      } else {
        showToast('Таблица пользователей Google Sheets прочитана');
      }
    } catch (err: any) {
      showToast('Ошибка чтения Google Sheets: ' + (err.message || 'Сбой'));
    }
    setIsSyncing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] text-[#ff791a] text-xs font-semibold tracking-wide mb-3 border border-white/[0.08]">
            <ShieldCheck className="w-3.5 h-3.5" /> Раздел Администратора
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#0071e3]" /> Управление Пользователями и Ролями
          </h1>
          <p className="text-sm text-[#86868b] mt-1.5 max-w-2xl">
            Создание учетных записей, распределение ролей (admin / student), контроль доступа (Lock / Unlock) и прямая синхронизация с Google Sheets (doGET / doPOST)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsGroupsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] font-medium text-xs border border-white/[0.08] flex items-center gap-2 transition-colors active:scale-95"
            title="Управление учебными группами"
          >
            <FolderPlus className="w-4 h-4 text-[#86868b]" />
            <span>Группы ({allAvailableGroups.length})</span>
          </button>

          <button
            onClick={() => {
              setIsCreatingNewGroup(false);
              setCustomGroupName('');
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs shadow-sm flex items-center gap-2 transition-colors active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Добавить Пользователя</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-[#002a14] border border-[#30d158]/40 text-[#30d158] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs font-medium text-[#86868b]">Всего аккаунтов</span>
          <p className="text-2xl font-semibold font-mono tabular-nums text-[#f5f5f7]">{userAccounts.length}</p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs font-medium text-[#86868b]">Администраторы</span>
          <p className="text-2xl font-semibold font-mono tabular-nums text-[#0071e3]">
            {userAccounts.filter((u) => u.role === 'admin').length}
          </p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-1">
          <span className="text-xs font-medium text-[#86868b]">Активные Студенты</span>
          <p className="text-2xl font-semibold font-mono tabular-nums text-[#30d158]">
            {userAccounts.filter((u) => u.role === 'student' && u.status === 'Active').length}
          </p>
        </div>

        <div className="p-5 rounded-[28px] bg-[#161618] border border-[#ff791a]/30 space-y-1">
          <span className="text-xs font-semibold text-[#ff791a] flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> Ожидают Подтверждения
          </span>
          <p className="text-2xl font-semibold font-mono tabular-nums text-[#ff791a]">
            {userAccounts.filter((u) => u.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#161618] p-4 rounded-2xl border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
            <input
              type="text"
              placeholder="Поиск по имени, email или группе..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1c1e] border border-white/[0.12] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          {/* Group filter dropdown */}
          <div className="flex items-center gap-2 bg-[#1c1c1e] border border-white/[0.12] rounded-xl px-3 py-1.5 text-xs">
            <Tag className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-[#f5f5f7] focus:outline-none cursor-pointer max-w-[200px]"
            >
              <option value="all" className="bg-[#1c1c1e] text-[#f5f5f7]">Все Группы ({userAccounts.length})</option>
              {allAvailableGroups.map((g) => {
                const count = userAccounts.filter((u) => (u.group || 'Группа 1 (Август 2026)') === g).length;
                return (
                  <option key={g} value={g} className="bg-[#1c1c1e] text-[#f5f5f7]">
                    {g} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filterRole === 'all'
                ? 'bg-[#0071e3] text-white font-semibold'
                : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            Все Роли
          </button>
          <button
            onClick={() => setFilterRole('admin')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filterRole === 'admin'
                ? 'bg-[#0071e3] text-white font-semibold'
                : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            Администраторы
          </button>
          <button
            onClick={() => setFilterRole('student')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              filterRole === 'student'
                ? 'bg-[#0071e3] text-white font-semibold'
                : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            Студенты
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#0D0D12] border-b border-slate-200 dark:border-white/5 text-slate-500 font-bold">
                <th className="p-4">Пользователь</th>
                <th className="p-4">Email</th>
                <th className="p-4">Группа</th>
                <th className="p-4">Роль</th>
                <th className="p-4">Доступ Уроков</th>
                <th className="p-4">Таблица Лидеров</th>
                <th className="p-4">Награды</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredUsers.map((user, idx) => {
                const isAdmin = user.role === 'admin';
                const userGroup = user.group || 'Группа 1 (Август 2026)';
                const isBlocked = user.status === 'Blocked';
                const isHiddenFromLb = user.hiddenFromLeaderboard;

                return (
                  <tr key={`${user.id || 'usr'}-${user.email || 'email'}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                        isAdmin ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-teal-500'
                      }`}>
                        {String(user.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900 dark:text-white">{user.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{user.id}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">{user.email}</td>

                    <td className="p-4">
                      <select
                        value={userGroup}
                        onChange={(e) => {
                          const newGrp = e.target.value;
                          if (newGrp === '__CREATE_NEW__') {
                            const entered = window.prompt('Введите название новой группы (например: Октябрь или Группа Октябрь 2026):');
                            if (entered && entered.trim()) {
                              const created = saveNewGroup(entered.trim());
                              updateUserAccount(user.id, { group: created });
                              showToast(`Создана группа "${created}", пользователь ${user.name} переведен в нее!`);
                            }
                            return;
                          }
                          updateUserAccount(user.id, { group: newGrp });
                          showToast(`Пользователь ${user.name} переведен в "${newGrp}" (сохранено)`);
                        }}
                        className="bg-slate-100 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1 text-[11px] font-bold text-purple-600 dark:text-purple-400 focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        {allAvailableGroups.map((grp) => (
                          <option key={grp} value={grp}>
                            {grp}
                          </option>
                        ))}
                        <option value="__CREATE_NEW__" className="text-blue-500 font-bold">
                          + Новая группа...
                        </option>
                      </select>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        isAdmin
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                      {isAdmin ? (
                        <span className="text-emerald-500 font-bold">Все 24 Урока</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              const cur = user.unlockedLessonsCount || 1;
                              if (cur > 1) {
                                updateUserAccount(user.id, { unlockedLessonsCount: cur - 1 });
                                showToast(`Для ${user.name} открыто ${cur - 1} уроков (сохранено в JSON).`);
                              }
                            }}
                            disabled={(user.unlockedLessonsCount || 1) <= 1}
                            className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold disabled:opacity-30 text-xs"
                            title="Уменьшить количество доступных уроков"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs">
                            {user.unlockedLessonsCount || 1} / 24
                          </span>
                          <button
                            onClick={() => {
                              const cur = user.unlockedLessonsCount || 1;
                              if (cur < 24) {
                                updateUserAccount(user.id, { unlockedLessonsCount: cur + 1 });
                                showToast(`Для ${user.name} открыто ${cur + 1} уроков (сохранено в JSON).`);
                              }
                            }}
                            disabled={(user.unlockedLessonsCount || 1) >= 24}
                            className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold disabled:opacity-30 text-xs"
                            title="Увеличить количество доступных уроков"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Leaderboard status */}
                    <td className="p-4">
                      {isBlocked ? (
                        <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold border border-rose-500/20">
                          Авто-Удален (Заблокирован)
                        </span>
                      ) : isHiddenFromLb ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20">
                            Скрыт (3 мес. курс)
                          </span>
                          <button
                            onClick={() => {
                              updateUserAccount(user.id, { hiddenFromLeaderboard: false });
                              showToast(`Пользователь ${user.name} возвращен в Таблицу Лидеров!`);
                            }}
                            className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-[10px] font-bold border border-emerald-500/20"
                            title="Включить в рейтинг снова"
                          >
                            Включить
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">
                            В рейтинге
                          </span>
                          <button
                            onClick={() => {
                              updateUserAccount(user.id, { hiddenFromLeaderboard: true });
                              showToast(`Пользователь ${user.name} отключен от Таблицы Лидеров (3-месячный цикл)!`);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-amber-500/20 hover:text-amber-500 text-slate-600 dark:text-slate-400 text-[10px] font-bold transition-all"
                            title="Исключить вручную после 3 месяцев"
                          >
                            Исключить
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {isAdmin ? (
                        <span className="text-slate-400 text-[11px]">—</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUser(user);
                            setEditName(user.name || '');
                            setEditEmail(user.email || '');
                            setEditPassword(user.password || '123456789');
                            setEditRole(user.role || 'student');
                            setEditGroup(user.group || 'Группа 1 (Август 2026)');
                            setEditUnlockedLessonsCount(user.unlockedLessonsCount || 1);
                            setEditStatus(user.status || 'Active');
                            setEditHiddenFromLeaderboard(Boolean(user.hiddenFromLeaderboard));
                            setEditPhone(user.phone || '');
                            setEditTelegram(user.telegram || '');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold inline-flex items-center gap-1.5 transition-all border border-amber-500/20"
                          title="Нажмите для управления наградами студента"
                        >
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span>
                            {Array.isArray(user.badges)
                              ? user.badges.filter((b: any) => (typeof b === 'object' ? b.unlocked : Boolean(b))).length
                              : 0}{' '}
                            / {INITIAL_BADGES.length}
                          </span>
                        </button>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : user.status === 'Pending'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse'
                          : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                        {user.status === 'Active'
                          ? 'Активен'
                          : user.status === 'Pending'
                          ? 'Ожидает подтверждения'
                          : 'Заблокирован'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit button */}
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setEditName(user.name || '');
                            setEditEmail(user.email || '');
                            setEditPassword(user.password || '123456789');
                            setEditRole(user.role || 'student');
                            setEditGroup(user.group || 'Группа 1 (Август 2026)');
                            setEditUnlockedLessonsCount(user.unlockedLessonsCount || 1);
                            setEditStatus(user.status || 'Active');
                            setEditHiddenFromLeaderboard(Boolean(user.hiddenFromLeaderboard));
                            setEditPhone(user.phone || '');
                            setEditTelegram(user.telegram || '');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white font-semibold text-[11px] transition-colors flex items-center gap-1 shrink-0"
                          title="Редактировать параметры пользователя"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Изменить</span>
                        </button>

                        {user.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => {
                                updateUserAccount(user.id, { status: 'Active' });
                                showToast(`Студент ${user.name} успешно подтвержден! Теперь аккаунт активен.`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-1"
                              title="Одобрить регистрацию и активировать доступ"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Одобрить</span>
                            </button>

                            <button
                              onClick={() => {
                                updateUserAccount(user.id, { status: 'Blocked' });
                                showToast(`Заявка пользователя ${user.name} отклонена (заблокирован).`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-semibold text-[11px] transition-colors"
                              title="Отклонить заявку"
                            >
                              Отклонить
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                const newRoleVal: UserRole = user.role === 'admin' ? 'student' : 'admin';
                                updateUserAccount(user.id, { role: newRoleVal });
                                showToast(`Роль пользователя ${user.name} изменена на ${newRoleVal} (сохранено в JSON)!`);
                              }}
                              className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-500/10 text-slate-600 dark:text-slate-300 hover:text-blue-500 font-semibold text-[11px] transition-colors"
                              title="Сменить роль (Admin/Student)"
                            >
                              Роль
                            </button>

                            <button
                              onClick={() => {
                                const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
                                updateUserAccount(user.id, { status: newStatus });
                                if (newStatus === 'Blocked') {
                                  showToast(`Пользователь ${user.name} заблокирован!`);
                                } else {
                                  showToast(`Пользователь ${user.name} разблокирован!`);
                                }
                              }}
                              className={`px-2 py-1.5 rounded-lg font-semibold text-[11px] transition-colors ${
                                user.status === 'Active'
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white'
                                  : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                              }`}
                              title={user.status === 'Active' ? 'Заблокировать пользователя' : 'Разблокировать пользователя'}
                            >
                              {user.status === 'Active' ? 'Заблокировать' : 'Разблокировать'}
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => setUserToDelete(user)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white font-bold text-[11px] transition-colors flex items-center gap-1 shrink-0"
                          title="Навсегда удалить пользователя"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Удалить</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Edit User */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-500" /> Редактирование Пользователя
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ФИО Пользователя</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email (Логин)</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="student@devopspro.tech"
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Пароль</label>
                  <input
                    type="text"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Оставьте пустым или введите новый"
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Учебная Группа</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditCreatingNewGroup(!isEditCreatingNewGroup);
                        if (!isEditCreatingNewGroup) {
                          setCustomEditGroupName('');
                        }
                      }}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {isEditCreatingNewGroup ? '← Выбрать из списка' : '+ Создать новую группу'}
                    </button>
                  </div>

                  {isEditCreatingNewGroup ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={customEditGroupName}
                        onChange={(e) => setCustomEditGroupName(e.target.value)}
                        placeholder="Например: Октябрь или Группа Октябрь 2026"
                        autoFocus
                        className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-bold"
                      />
                      <span className="text-[10px] text-slate-500">Группа сохранится при нажатии «Сохранить изменения»</span>
                    </div>
                  ) : (
                    <select
                      value={editGroup}
                      onChange={(e) => {
                        if (e.target.value === '__CREATE_NEW__') {
                          setIsEditCreatingNewGroup(true);
                          setCustomEditGroupName('');
                        } else {
                          setEditGroup(e.target.value);
                        }
                      }}
                      className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
                    >
                      {allAvailableGroups.map((grp) => (
                        <option key={grp} value={grp}>
                          {grp}
                        </option>
                      ))}
                      <option value="__CREATE_NEW__" className="text-blue-500 font-bold">
                        + Создать новую группу (например: Октябрь)...
                      </option>
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Роль в Системе</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="student">student (Студент)</option>
                    <option value="admin">admin (Администратор)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Статус Аккаунта</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'Active' | 'Blocked' | 'Pending')}
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="Active">Active (Активен)</option>
                    <option value="Pending">Pending (Ожидает)</option>
                    <option value="Blocked">Blocked (Заблокирован)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Открыто Уроков (1-24)</label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={editRole === 'admin' ? 24 : editUnlockedLessonsCount}
                    disabled={editRole === 'admin'}
                    onChange={(e) => setEditUnlockedLessonsCount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-bold disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> Телефон
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+992 90 000 0000"
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Send className="w-3 h-3 text-slate-400" /> Telegram
                  </label>
                  <input
                    type="text"
                    value={editTelegram}
                    onChange={(e) => setEditTelegram(e.target.value)}
                    placeholder="@student_devops"
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editHiddenFromLb"
                  checked={editHiddenFromLeaderboard}
                  onChange={(e) => setEditHiddenFromLeaderboard(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="editHiddenFromLb" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Скрыть из Таблицы Лидеров (для завершивших 3-месячный цикл)
                </label>
              </div>

              {/* Academic Badges Management */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Академические Награды & Бейджи Студента</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Нажмите для присвоения или отзыва
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {INITIAL_BADGES.map((ib) => {
                    const studentAccount = userAccounts.find(
                      (u) => u.id === editingUser.id || (u.email && u.email.toLowerCase() === (editingUser.email || '').toLowerCase())
                    );
                    const badgesList = Array.isArray(studentAccount?.badges) ? studentAccount.badges : [];
                    const found = badgesList.find((b: any) => b && b.id === ib.id);
                    const isUnlocked = found ? Boolean(found.unlocked) : false;
                    const displayTitle = ib.titleRu || ib.title;

                    return (
                      <button
                        key={ib.id}
                        type="button"
                        onClick={() => {
                          toggleBadgeForUser(editingUser.email || editingUser.id, ib.id);
                          showToast(
                            isUnlocked
                              ? `Награда "${displayTitle}" отозвана`
                              : `Награда "${displayTitle}" успешно присвоена студенту!`
                          );
                        }}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isUnlocked
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-400 opacity-60 hover:opacity-90'
                        }`}
                      >
                        <AcademicBadgeIcon badgeId={ib.id} title={displayTitle} unlocked={isUnlocked} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold truncate">{displayTitle}</div>
                          <div className="text-[9px] text-slate-500 truncate">
                            {isUnlocked ? '✓ Присвоено' : 'Не присвоено'} • +{ib.xpReward || 100} EXP
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Сохранить Изменения</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-500" /> Новый Пользователь
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ФИО Пользователя</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email (Логин)</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="student@devopspro.tech"
                  className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Учебная Группа</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingNewGroup(!isCreatingNewGroup);
                      if (!isCreatingNewGroup) {
                        setCustomGroupName('');
                      }
                    }}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {isCreatingNewGroup ? '← Выбрать из существующих' : '+ Создать новую группу (например: Октябрь)'}
                  </button>
                </div>

                {isCreatingNewGroup ? (
                  <div className="space-y-1.5 p-3 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                    <input
                      type="text"
                      value={customGroupName}
                      onChange={(e) => setCustomGroupName(e.target.value)}
                      placeholder="Например: Октябрь или Группа Октябрь 2026"
                      autoFocus
                      required={isCreatingNewGroup}
                      className="w-full bg-white dark:bg-[#0D0D12] border border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none font-bold"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      💡 Введите название новой группы (например: <strong>Октябрь</strong>). При добавлении пользователя группа автоматически добавится в систему, фильтры и рейтинг!
                    </p>
                  </div>
                ) : (
                  <select
                    value={newGroup}
                    onChange={(e) => {
                      if (e.target.value === '__CREATE_NEW__') {
                        setIsCreatingNewGroup(true);
                        setCustomGroupName('');
                      } else {
                        setNewGroup(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-bold cursor-pointer"
                  >
                    {allAvailableGroups.map((grp) => (
                      <option key={grp} value={grp}>
                        {grp}
                      </option>
                    ))}
                    <option value="__CREATE_NEW__" className="text-blue-500 font-bold">
                      + Создать новую группу (например: Октябрь)...
                    </option>
                  </select>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Пароль</label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="123456789"
                  className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Роль в Системе</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="student">student (Студент - только просмотр открытых уроков)</option>
                  <option value="admin">admin (Администратор - полный доступ)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Создать Пользователя
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete User Confirmation */}
      {userToDelete && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Удаление Пользователя</h3>
                <p className="text-xs text-rose-500 font-semibold">Подтверждение бесповоротного действия</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Вы действительно хотите НАВСЕГДА удалить аккаунт{' '}
              <strong className="text-slate-900 dark:text-white font-bold">{userToDelete.name}</strong> (
              <span className="font-mono text-slate-500">{userToDelete.email}</span>)?
            </p>

            <div className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              ⚠️ Все данные пользователя, включая роли, прогресс, домашние задания и оценки, будут безвозвратно удалены из системы и базы данных Google Sheets.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteUserAccount(userToDelete.id);
                  showToast(`Пользователь "${userToDelete.name}" успешно и навсегда удален!`);
                  setUserToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 flex items-center gap-2 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Да, удалить навсегда</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Groups Management */}
      {isGroupsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Учебные Группы
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Создание новых потоков и групп (например: <strong>Октябрь</strong>)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGroupsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Add Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newGroupNameInput.trim()) return;
                const created = saveNewGroup(newGroupNameInput.trim());
                showToast(`Группа "${created}" успешно создана и добавлена в систему!`);
                setNewGroupNameInput('');
              }}
              className="space-y-2 p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20"
            >
              <label className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Добавить новую группу:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGroupNameInput}
                  onChange={(e) => setNewGroupNameInput(e.target.value)}
                  placeholder="Название (например: Октябрь или Группа Октябрь 2026)"
                  className="flex-1 bg-white dark:bg-[#0D0D12] border border-purple-400/40 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 font-semibold"
                />
                <button
                  type="submit"
                  disabled={!newGroupNameInput.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Создать</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Новая группа сразу станет доступна при создании студентов, редактировании, фильтрации и в Рейтинге.
              </p>
            </form>

            {/* Existing Groups List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Все существующие группы ({allAvailableGroups.length})
              </span>
              <div className="space-y-1.5">
                {allAvailableGroups.map((grp) => {
                  const studentCount = userAccounts.filter(
                    (u) => (u.group || 'Группа 1 (Август 2026)') === grp
                  ).length;
                  const isCustom = customGroups.includes(grp);

                  return (
                    <div
                      key={grp}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D12] border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-500" />
                        <span className="font-bold text-slate-900 dark:text-white">{grp}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {studentCount} {studentCount === 1 ? 'студент' : 'студентов'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setFilterGroup(grp);
                            setIsGroupsModalOpen(false);
                            showToast(`Применен фильтр по группе: ${grp}`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-all"
                        >
                          Показать студентов
                        </button>
                        {isCustom && studentCount === 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = customGroups.filter((g) => g !== grp);
                              setCustomGroups(updated);
                              localStorage.setItem('devops_portal_custom_groups', JSON.stringify(updated));
                              showToast(`Группа "${grp}" удалена`);
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500"
                            title="Удалить пустую группу"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsGroupsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reset Data Confirmation */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Сброс Данных Портала</h3>
                <p className="text-xs text-amber-500 font-semibold">Восстановление исходного состояния</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Вы действительно хотите сбросить все данные портала и прогресс пользователей к начальным настройкам?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => {
                  resetData();
                  showToast('Все данные портала сброшены к начальным значениям!');
                  setIsResetConfirmOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Сбросить данные</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
