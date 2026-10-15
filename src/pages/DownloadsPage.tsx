import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_DOWNLOADS } from '../data/syllabusData';
import { ResourceDownload } from '../types';
import {
  Download,
  Plus,
  Edit2,
  Link,
  ExternalLink,
  Save,
  X,
  Trash2,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Package
} from 'lucide-react';
import { api } from '../lib/api';
import { usePortal } from '../context/PortalContext';

const DEFAULT_REAL_URLS: Record<string, string> = {
  d1: 'https://download.virtualbox.org/virtualbox/7.0.14/VirtualBox-7.0.14-161095-Win.exe',
  d2: 'https://mirrors.kernel.org/linuxmint/iso/stable/21.3/linuxmint-21.3-cinnamon-64bit.iso',
  d3: 'https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022',
  d4: 'https://www.netacad.com/courses/packet-tracer',
  d5: 'https://github.com/PowerShell/PowerShell',
  d6: 'https://raw.githubusercontent.com/Lissy93/cheat-sheets/main/tools/linux-commands.md',
  d7: 'https://raw.githubusercontent.com/Lissy93/cheat-sheets/main/networking/networking-cheatsheet.md',
};

export const DownloadsPage: React.FC = () => {
  const { profile } = usePortal();
  const isAdmin = profile?.role === 'admin';

  const [downloads, setDownloads] = useState<ResourceDownload[]>(() =>
    INITIAL_DOWNLOADS.map((d) => ({
      ...d,
      downloadUrl: DEFAULT_REAL_URLS[d.id] || d.downloadUrl,
    }))
  );

  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<ResourceDownload | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const [newSoftware, setNewSoftware] = useState({
    title: '',
    category: 'Tools',
    description: '',
    fileSize: '10 MB',
    downloadUrl: '',
  });

  // Automatically dismiss status message after 4.5 seconds
  useEffect(() => {
    if (syncStatus) {
      const timer = setTimeout(() => setSyncStatus(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  // Load downloads from backend SQLite database
  const fetchDownloads = useCallback(async (showToast = false) => {
    setLoading(true);
    setIsSyncing(true);
    try {
      const res = await api.getDownloads();
      if (res.success && Array.isArray(res.downloads) && res.downloads.length > 0) {
        setDownloads(res.downloads);
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        if (showToast) {
          setSyncStatus({ type: 'info', message: `Данные успешно синхронизированы с SQLite (${res.downloads.length} записей)` });
        }
      } else if (res.success && Array.isArray(res.downloads) && res.downloads.length === 0) {
        // If database is empty, seed defaults to SQLite database to keep persistent sync
        const initialWithUrls: ResourceDownload[] = INITIAL_DOWNLOADS.map((d, index) => ({
          ...d,
          downloadUrl: DEFAULT_REAL_URLS[d.id] || d.downloadUrl,
          orderIndex: index + 1,
        }));
        setDownloads(initialWithUrls);

        // Seed to backend SQLite database
        for (const item of initialWithUrls) {
          try {
            await api.saveDownload(item);
          } catch (e) {
            console.warn('[DownloadsPage] Seed item warning:', e);
          }
        }
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        if (showToast) {
          setSyncStatus({ type: 'success', message: 'Начальные дистрибутивы синхронизированы с базой данных SQLite' });
        }
      }
    } catch (e) {
      console.error('[DownloadsPage] Error loading downloads:', e);
      if (showToast) {
        setSyncStatus({ type: 'error', message: 'Ошибка при связи с базой данных' });
      }
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleStartEdit = (res: ResourceDownload) => {
    if (!isAdmin) return;
    setEditingId(res.id);
    setTempUrl(res.downloadUrl || '');
  };

  const handleSaveUrl = async (id: string) => {
    if (!isAdmin) return;
    const item = downloads.find((d) => d.id === id);
    if (!item) return;
    const updated = { ...item, downloadUrl: tempUrl };

    setDownloads((prev) => prev.map((d) => (d.id === id ? updated : d)));
    setEditingId(null);

    try {
      const res = await api.saveDownload(updated);
      if (res.success) {
        setSyncStatus({ type: 'success', message: `Ссылка для «${item.title}» обновлена в базе данных SQLite` });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus({ type: 'error', message: res.error || 'Не удалось обновить ссылку в базе данных' });
      }
    } catch (e) {
      console.error('[DownloadsPage] Error updating URL:', e);
      setSyncStatus({ type: 'error', message: 'Ошибка связи с сервером при обновлении ссылки' });
    }
  };

  const handleAddSoftware = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setSyncStatus({ type: 'error', message: 'Добавление софта заблокировано: действие доступно только Администратору' });
      setShowAddModal(false);
      return;
    }

    if (!newSoftware.title.trim() || !newSoftware.downloadUrl.trim()) return;

    const newItem: ResourceDownload = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: newSoftware.title.trim(),
      category: newSoftware.category.trim() || 'Tools',
      description: newSoftware.description.trim() || 'Пользовательский дистрибутив',
      fileSize: newSoftware.fileSize.trim() || '10 MB',
      downloadUrl: newSoftware.downloadUrl.trim(),
      iconName: 'Download',
    };

    // Optimistic UI update
    setDownloads((prev) => [newItem, ...prev]);
    setShowAddModal(false);
    setNewSoftware({ title: '', category: 'Tools', description: '', fileSize: '10 MB', downloadUrl: '' });

    try {
      const res = await api.saveDownload(newItem);
      if (res.success) {
        setSyncStatus({ type: 'success', message: `Программа «${newItem.title}» успешно сохранена в базе данных SQLite` });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        // Refresh to verify persistence
        fetchDownloads(false);
      } else {
        setSyncStatus({ type: 'error', message: res.error || 'Ошибка сохранения в базу данных' });
      }
    } catch (e) {
      console.error('[DownloadsPage] Error saving software:', e);
      setSyncStatus({ type: 'error', message: 'Ошибка сети при сохранении софта в БД' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      setSyncStatus({ type: 'error', message: 'Удаление софта заблокировано: действие доступно только Администратору' });
      setDeleteConfirmItem(null);
      return;
    }

    setIsDeleting(true);
    const itemToDelete = downloads.find((d) => d.id === id);
    const previousDownloads = [...downloads];

    // Optimistic remove
    setDownloads((prev) => prev.filter((d) => d.id !== id));

    try {
      const res = await api.deleteDownload(id);
      if (res.success) {
        setSyncStatus({
          type: 'success',
          message: `Программа ${itemToDelete ? `«${itemToDelete.title}»` : ''} успешно удалена из базы данных SQLite`,
        });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        // Rollback on error
        setDownloads(previousDownloads);
        setSyncStatus({ type: 'error', message: res.error || 'Ошибка при удалении записи из базы данных' });
      }
    } catch (e) {
      console.error('[DownloadsPage] Error deleting download:', e);
      setDownloads(previousDownloads);
      setSyncStatus({ type: 'error', message: 'Сетевая ошибка при удалении из базы данных' });
    } finally {
      setIsDeleting(false);
      setDeleteConfirmItem(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Controls Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Download className="w-6 h-6 text-cyan-400" /> Центр Загрузок и Инструментов (Download Center)
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Дистрибутивы ISO, Cisco Packet Tracer, скрипты PowerShell/Bash, методички и файлы для практических занятий.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Role-based "Добавить свой софт" Button */}
          {isAdmin ? (
            <button
              id="btn-add-software-admin"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
              title="Добавить новый дистрибутив или софт"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить свой софт</span>
            </button>
          ) : (
            <button
              id="btn-add-software-locked"
              disabled
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 font-medium text-xs flex items-center gap-2 cursor-not-allowed select-none shadow-sm opacity-80"
              title="Добавление программного обеспечения заблокировано для студентов. Функция доступна только Администраторам."
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Добавить свой софт</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono font-normal">
                Только Admin
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Real-time Status Toast / Feedback Banner */}
      {syncStatus && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center justify-between gap-3 border transition-all animate-in fade-in duration-200 ${
            syncStatus.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
              : syncStatus.type === 'error'
              ? 'bg-red-950/50 border-red-500/40 text-red-300'
              : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {syncStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {syncStatus.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
            {syncStatus.type === 'info' && <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0" />}
            <span className="font-medium">{syncStatus.message}</span>
          </div>
          <button
            onClick={() => setSyncStatus(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-current opacity-70 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Role Notice for Students */}
      {!isAdmin && (
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Режим студента: скачивание программ открыто без ограничений. Добавление новых дистрибутивов и редактирование каталога заблокированы.
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0">
            Роль: Студент
          </span>
        </div>
      )}

      {/* Software Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {downloads.map((res) => {
          const isEditing = editingId === res.id;

          return (
            <div
              key={res.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 relative group shadow-sm hover:shadow-cyan-950/20"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-800/40 flex items-center gap-1.5">
                    <Package className="w-3 h-3 text-cyan-400" />
                    {res.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">{res.fileSize}</span>

                    {/* Admin Action: Edit URL */}
                    {isAdmin && (
                      <button
                        id={`btn-edit-download-${res.id}`}
                        onClick={() => handleStartEdit(res)}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Редактировать ссылку в базе данных"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Admin Action: Delete Software */}
                    {isAdmin && (
                      <button
                        id={`btn-delete-download-${res.id}`}
                        onClick={() => setDeleteConfirmItem(res)}
                        className="p-1 rounded-lg hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-colors"
                        title="Удалить софт из базы данных (Доступно Администратору)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">{res.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{res.description}</p>

                {/* Inline URL Editing for Admin */}
                {isEditing && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-2 text-xs animate-in fade-in duration-200">
                    <label className="block text-cyan-300 font-semibold text-[10px] flex items-center gap-1">
                      <Link className="w-3 h-3" /> Вставьте прямой URL (Google Drive, GitHub, HTTP):
                    </label>
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-[11px]"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={() => handleSaveUrl(res.id)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" /> Сохранить в БД
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Action Button */}
              <div className="pt-2">
                <a
                  href={res.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 group-hover:border-cyan-500/50 shadow-sm"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Скачать софт</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {downloads.length === 0 && !loading && (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Download className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Список загрузок пуст</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isAdmin
              ? 'В базе данных нет зарегистрированного софта. Нажмите «Добавить свой софт» для создания первой записи.'
              : 'В Центре Загрузок пока нет доступных дистрибутивов.'}
          </p>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              Добавить первый софт
            </button>
          )}
        </div>
      )}

      {/* Confirmation Modal for Admin Deletion */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2.5 rounded-2xl bg-red-950/60 border border-red-800/50">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Удаление из базы данных</h3>
                <p className="text-xs text-slate-400">Действие администратора</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Вы действительно хотите удалить программное обеспечение <span className="font-bold text-white">«{deleteConfirmItem.title}»</span>? Запись будет удалена из базы данных SQLite и перестанет отображаться для всех студентов.
            </p>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
              <div>Категория: {deleteConfirmItem.category}</div>
              <div>Размер: {deleteConfirmItem.fileSize}</div>
              <div className="truncate text-slate-500">ID: {deleteConfirmItem.id}</div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Отмена
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmItem.id)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Удаление...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Удалить из БД</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Add Custom Software (Admin Only) */}
      {showAddModal && isAdmin && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSoftware}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95"
          >
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/40">
                <Plus className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold">Добавить программу / софт</h3>
                <p className="text-[11px] text-slate-400">Синхронизация с таблицей SQLite</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Название программы *</label>
                <input
                  type="text"
                  required
                  placeholder="Например: MobaXterm / Wireshark / Мой Скрипт"
                  value={newSoftware.title}
                  onChange={(e) => setNewSoftware({ ...newSoftware, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Категория</label>
                  <input
                    type="text"
                    placeholder="ISO / Tools / Scripts"
                    value={newSoftware.category}
                    onChange={(e) => setNewSoftware({ ...newSoftware, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Размер файла</label>
                  <input
                    type="text"
                    placeholder="45 MB"
                    value={newSoftware.fileSize}
                    onChange={(e) => setNewSoftware({ ...newSoftware, fileSize: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Прямая ссылка на файл / URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... или https://my-site.com/app.exe"
                  value={newSoftware.downloadUrl}
                  onChange={(e) => setNewSoftware({ ...newSoftware, downloadUrl: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-1 focus:ring-cyan-400 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Описание</label>
                <textarea
                  rows={2}
                  placeholder="Краткое описание дистрибутива..."
                  value={newSoftware.description}
                  onChange={(e) => setNewSoftware({ ...newSoftware, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none resize-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20"
              >
                Сохранить в базу SQLite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
