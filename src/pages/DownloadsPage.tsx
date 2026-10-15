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

  useEffect(() => {
    if (syncStatus) {
      const timer = setTimeout(() => setSyncStatus(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  const fetchDownloads = useCallback(async (showToast = false) => {
    setLoading(true);
    setIsSyncing(true);
    try {
      const res = await api.getDownloads();
      if (res.success && Array.isArray(res.downloads) && res.downloads.length > 0) {
        setDownloads(res.downloads);
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        if (showToast) {
          setSyncStatus({ type: 'info', message: `Данные синхронизированы с SQLite (${res.downloads.length} записей)` });
        }
      }
    } catch (err: any) {
      console.warn('[DownloadsPage] Could not fetch remote downloads:', err?.message);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchDownloads(false);
  }, [fetchDownloads]);

  const handleStartEdit = (item: ResourceDownload) => {
    setEditingId(item.id);
    setTempUrl(item.downloadUrl);
  };

  const handleSaveUrl = async (id: string) => {
    const updatedDownloads = downloads.map((d) => (d.id === id ? { ...d, downloadUrl: tempUrl } : d));
    setDownloads(updatedDownloads);
    setEditingId(null);

    const itemToUpdate = updatedDownloads.find((d) => d.id === id);
    if (!itemToUpdate) return;

    try {
      const res = await api.saveDownload(itemToUpdate);
      if (res.success) {
        setSyncStatus({ type: 'success', message: 'Ссылка успешно обновлена в базе данных SQLite' });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus({ type: 'error', message: res.error || 'Ошибка при сохранении ссылки в базе данных' });
      }
    } catch (e) {
      console.error('[DownloadsPage] Error saving download URL:', e);
      setSyncStatus({ type: 'error', message: 'Сетевая ошибка при обновлении ссылки' });
    }
  };

  const handleAddSoftware = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSoftware.title.trim() || !newSoftware.downloadUrl.trim()) return;

    const newId = `d_${Date.now()}`;
    const newDownload: ResourceDownload = {
      id: newId,
      title: newSoftware.title.trim(),
      category: newSoftware.category.trim() || 'Custom',
      description: newSoftware.description.trim() || 'Добавлено пользователем',
      fileSize: newSoftware.fileSize.trim() || 'N/A',
      downloadUrl: newSoftware.downloadUrl.trim(),
      iconName: 'Software',
    };

    setDownloads((prev) => [newDownload, ...prev]);
    setShowAddModal(false);

    try {
      const res = await api.saveDownload(newDownload);
      if (res.success) {
        setSyncStatus({ type: 'success', message: `Программа «${newDownload.title}» добавлена в базу данных SQLite` });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus({ type: 'error', message: res.error || 'Ошибка при добавлении в базу данных' });
      }
    } catch (err) {
      console.error('[DownloadsPage] Error saving new software:', err);
      setSyncStatus({ type: 'error', message: 'Сетевая ошибка при сохранении в базу данных' });
    }

    setNewSoftware({
      title: '',
      category: 'Tools',
      description: '',
      fileSize: '10 MB',
      downloadUrl: '',
    });
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    const itemToDelete = downloads.find((d) => d.id === id);
    const previousDownloads = [...downloads];

    setDownloads((prev) => prev.filter((d) => d.id !== id));

    try {
      const res = await api.deleteDownload(id);
      if (res.success) {
        setSyncStatus({
          type: 'success',
          message: `Программа ${itemToDelete ? `«${itemToDelete.title}»` : ''} удалена из базы данных SQLite`,
        });
        setLastSyncTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setDownloads(previousDownloads);
        setSyncStatus({ type: 'error', message: res.error || 'Ошибка при удалении записи' });
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
    <div className="space-y-6 text-[#f5f5f7]">
      {/* Top Banner: Apple Midnight Exhibition Stage */}
      <div className="p-6 md:p-8 rounded-[28px] bg-[#000000] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1f] text-[#0071e3] border border-[#262629] text-[11px] font-medium">
            <Download className="w-3.5 h-3.5" />
            <span>Каталог инструментов</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight">
            Центр Загрузок и Инструментов
          </h1>
          <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
            Дистрибутивы, утилиты, скрипты автоматизации и методические пособия для занятий.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isAdmin ? (
            <button
              id="btn-add-software-admin"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить софт</span>
            </button>
          ) : (
            <button
              id="btn-add-software-locked"
              disabled
              className="px-4 py-2.5 rounded-full bg-[#1c1c1f] border border-[#262629] text-[#6e6e73] font-medium text-xs flex items-center gap-2 cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5 text-[#ff791b]" />
              <span>Добавить софт</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#311400] text-[#ff791b]">
                Admin
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Real-time Status Toast */}
      {syncStatus && (
        <div
          className={`p-3.5 rounded-[20px] text-xs flex items-center justify-between gap-3 border transition-colors ${
            syncStatus.type === 'success'
              ? 'bg-[#1c2e22] border-[#00d959]/30 text-[#00d959]'
              : syncStatus.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-[#1c2333] border-[#0071e3]/30 text-[#0071e3]'
          }`}
        >
          <div className="flex items-center gap-2">
            {syncStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#00d959] shrink-0" />}
            {syncStatus.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
            {syncStatus.type === 'info' && <RefreshCw className="w-4 h-4 text-[#0071e3] shrink-0" />}
            <span className="font-medium">{syncStatus.message}</span>
          </div>
          <button
            onClick={() => setSyncStatus(null)}
            className="p-1 rounded-full hover:bg-white/10 text-current opacity-70 hover:opacity-100 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Role Notice for Students */}
      {!isAdmin && (
        <div className="p-3.5 rounded-[20px] bg-[#161618] border border-white/[0.08] text-[#86868b] text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ff791b] shrink-0" />
            <span>
              Скачивание программ доступно без ограничений. Добавление дистрибутивов закреплено за администратором.
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#000000] text-[#86868b] font-mono shrink-0 border border-[#262629]">
            Студент
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
              className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#0071e3] text-[10px] font-mono font-medium border border-[#262629] flex items-center gap-1.5">
                    <Package className="w-3 h-3 text-[#0071e3]" />
                    {res.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#86868b] font-mono tabular-nums">{res.fileSize}</span>

                    {isAdmin && (
                      <button
                        id={`btn-edit-download-${res.id}`}
                        onClick={() => handleStartEdit(res)}
                        className="p-1 rounded-full hover:bg-[#262629] text-[#86868b] hover:text-[#0071e3] transition-colors cursor-pointer"
                        title="Редактировать ссылку"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        id={`btn-delete-download-${res.id}`}
                        onClick={() => setDeleteConfirmItem(res)}
                        className="p-1 rounded-full hover:bg-rose-500/10 text-[#86868b] hover:text-rose-400 transition-colors cursor-pointer"
                        title="Удалить"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-[#f5f5f7] leading-snug">{res.title}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">{res.description}</p>

                {/* Inline URL Editing for Admin */}
                {isEditing && (
                  <div className="p-3 rounded-[18px] bg-[#000000] border border-[#0071e3]/40 space-y-2 text-xs">
                    <label className="block text-[#0071e3] font-medium text-[10px] flex items-center gap-1">
                      <Link className="w-3 h-3" /> Прямой URL:
                    </label>
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#161618] border border-[#333336] rounded-full px-3 py-1.5 text-[#f5f5f7] text-xs outline-none focus:border-[#0071e3] font-mono"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded-full bg-[#1c1c1f] text-[#86868b] hover:text-[#f5f5f7] text-[11px] cursor-pointer"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={() => handleSaveUrl(res.id)}
                        className="px-3 py-1 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3 h-3" /> Сохранить
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Download Action Button: Apple Pill */}
              <div className="pt-2">
                <a
                  href={res.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {downloads.length === 0 && !loading && (
        <div className="p-12 text-center rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3">
          <Download className="w-8 h-8 text-[#6e6e73] mx-auto" />
          <h3 className="text-sm font-semibold text-[#f5f5f7]">Список загрузок пуст</h3>
          <p className="text-xs text-[#86868b] max-w-sm mx-auto">
            {isAdmin
              ? 'В базе данных нет зарегистрированного софта. Нажмите «Добавить софт».'
              : 'В Центре Загрузок пока нет доступных дистрибутивов.'}
          </p>
        </div>
      )}

      {/* Confirmation Modal for Admin Deletion */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                <Trash2 className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#f5f5f7]">Удаление программы</h3>
                <p className="text-xs text-[#86868b]">Действие администратора</p>
              </div>
            </div>

            <p className="text-xs text-[#86868b] leading-relaxed">
              Вы уверены, что хотите удалить <strong className="text-[#f5f5f7]">«{deleteConfirmItem.title}»</strong> из базы данных SQLite?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] font-medium text-xs transition-colors cursor-pointer border border-[#262629]"
              >
                Отмена
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmItem.id)}
                className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span>{isDeleting ? 'Удаление...' : 'Удалить'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Add Custom Software (Admin Only) */}
      {showAddModal && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSoftware}
            className="bg-[#161618] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#262629] pb-3">
              <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#0071e3]" /> Добавить программу
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#86868b] hover:text-[#f5f5f7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#86868b] mb-1">Название программы *</label>
                <input
                  type="text"
                  required
                  placeholder="MobaXterm / Wireshark"
                  value={newSoftware.title}
                  onChange={(e) => setNewSoftware({ ...newSoftware, title: e.target.value })}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] outline-none focus:border-[#0071e3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#86868b] mb-1">Категория</label>
                  <input
                    type="text"
                    placeholder="Tools / ISO"
                    value={newSoftware.category}
                    onChange={(e) => setNewSoftware({ ...newSoftware, category: e.target.value })}
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] outline-none focus:border-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="block text-[#86868b] mb-1">Размер файла</label>
                  <input
                    type="text"
                    placeholder="45 MB"
                    value={newSoftware.fileSize}
                    onChange={(e) => setNewSoftware({ ...newSoftware, fileSize: e.target.value })}
                    className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#86868b] mb-1">Прямая ссылка / URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newSoftware.downloadUrl}
                  onChange={(e) => setNewSoftware({ ...newSoftware, downloadUrl: e.target.value })}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-full px-4 py-2 text-xs text-[#f5f5f7] outline-none focus:border-[#0071e3] font-mono"
                />
              </div>

              <div>
                <label className="block text-[#86868b] mb-1">Описание</label>
                <textarea
                  rows={2}
                  placeholder="Краткое описание дистрибутива..."
                  value={newSoftware.description}
                  onChange={(e) => setNewSoftware({ ...newSoftware, description: e.target.value })}
                  className="w-full bg-white/[0.04] border border-[#333336] rounded-[18px] p-3 text-xs text-[#f5f5f7] outline-none focus:border-[#0071e3]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full bg-[#1c1c1f] hover:bg-[#262629] text-[#86868b] hover:text-[#f5f5f7] font-medium text-xs cursor-pointer border border-[#262629]"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Сохранить в SQLite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
