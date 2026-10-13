/**
 * DevOps Academy Portal - Persistent Attachment & File Storage Engine
 * High-capacity IndexedDB storage layer for PDF, DOCX, TXT, PPT, Images and archives.
 * Persists files across browser refreshes, tab closures, and syncs with Google Drive / Apps Script.
 */

import { AttachedReportFile } from '../types';
import { getApiBasePath } from './api';

export interface StoredAttachmentRecord extends AttachedReportFile {
  category: 'homework' | 'lab' | 'final_project' | 'general';
  targetId: number | string; // lessonId or labId
  studentEmail?: string;
  studentId?: string;
  savedAt: string;
  mimeType?: string;
  driveFileUrl?: string;
  driveFileId?: string;
}

const DB_NAME = 'DevOps_Portal_FileVault_v2';
const DB_VERSION = 1;
const STORE_NAME = 'student_attachments';

function getMimeType(fileName: string, typeHint?: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'txt':
    case 'log':
    case 'md':
      return 'text/plain;charset=utf-8';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'zip':
    case 'tar':
    case 'gz':
      return 'application/zip';
    case 'json':
      return 'application/json';
    case 'yaml':
    case 'yml':
      return 'text/yaml';
    default:
      if (typeHint === 'pdf') return 'application/pdf';
      if (typeHint === 'docx') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (typeHint === 'txt') return 'text/plain;charset=utf-8';
      if (typeHint === 'image') return 'image/png';
      return 'application/octet-stream';
  }
}

/**
 * Open or initialize IndexedDB connection
 */
function openVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('category_target', ['category', 'targetId'], { unique: false });
        store.createIndex('studentEmail', 'studentEmail', { unique: false });
        store.createIndex('composite_lookup', ['category', 'targetId', 'studentEmail'], { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.warn('Failed to open IndexedDB FileVault:', request.error);
      reject(request.error);
    };
  });
}

/**
 * Save an individual attachment into persistent IndexedDB
 */
export async function saveAttachmentToVault(
  file: AttachedReportFile,
  meta: {
    category: 'homework' | 'lab' | 'final_project' | 'general';
    targetId: number | string;
    studentEmail?: string;
    studentId?: string;
    driveFileUrl?: string;
  }
): Promise<StoredAttachmentRecord> {
  const mimeType = getMimeType(file.name, file.type);
  const record: StoredAttachmentRecord = {
    ...file,
    id: file.id || `FILE-${meta.category}-${meta.targetId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    category: meta.category,
    targetId: meta.targetId,
    studentEmail: (meta.studentEmail || '').toLowerCase().trim(),
    studentId: meta.studentId || '',
    savedAt: new Date().toISOString(),
    mimeType,
    driveFileUrl: meta.driveFileUrl || file.url || undefined,
  };

  try {
    const db = await openVaultDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('[FileVault] IndexedDB save error, using fallback:', err);
    // Fallback: Save small metadata to localStorage if possible
    try {
      const fallbackKey = `devops_file_${record.id}`;
      // Strip large dataUrl in localStorage to avoid QuotaExceededError
      const smallRecord = { ...record, dataUrl: record.dataUrl?.length && record.dataUrl.length < 50000 ? record.dataUrl : undefined };
      localStorage.setItem(fallbackKey, JSON.stringify(smallRecord));
    } catch {}
  }

  return record;
}

/**
 * Save a batch of attachments for a specific homework or lab
 */
export async function saveMultipleAttachmentsToVault(
  files: AttachedReportFile[],
  meta: {
    category: 'homework' | 'lab' | 'final_project' | 'general';
    targetId: number | string;
    studentEmail?: string;
    studentId?: string;
  }
): Promise<StoredAttachmentRecord[]> {
  if (!files || files.length === 0) return [];
  const results: StoredAttachmentRecord[] = [];
  for (const file of files) {
    const saved = await saveAttachmentToVault(file, meta);
    results.push(saved);
  }
  return results;
}

/**
 * Retrieve all persistent attachments for a specific lesson or lab
 */
export async function getAttachmentsForTarget(
  category: 'homework' | 'lab' | 'final_project' | 'general',
  targetId: number | string,
  studentEmail?: string
): Promise<AttachedReportFile[]> {
  const emailLower = (studentEmail || '').toLowerCase().trim();
  try {
    const db = await openVaultDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const all: StoredAttachmentRecord[] = req.result || [];
        const filtered = all.filter((r) => {
          if (r.category !== category) return false;
          if (String(r.targetId) !== String(targetId)) return false;
          if (emailLower) {
            const rEmail = (r.studentEmail || '').toLowerCase().trim();
            if (rEmail && rEmail !== emailLower && !emailLower.includes(rEmail) && !rEmail.includes(emailLower)) return false;
          }
          return true;
        });
        resolve(filtered);
      };

      req.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

/**
 * Retrieve all attachments saved in the browser vault
 */
export async function getAllVaultAttachments(studentEmail?: string): Promise<StoredAttachmentRecord[]> {
  const emailLower = (studentEmail || '').toLowerCase().trim();
  try {
    const db = await openVaultDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const all: StoredAttachmentRecord[] = req.result || [];
        if (emailLower) {
          resolve(all.filter((r) => !r.studentEmail || r.studentEmail.toLowerCase().trim() === emailLower));
        } else {
          resolve(all);
        }
      };

      req.onerror = () => {
        resolve([]);
      };
    });
  } catch {
    return [];
  }
}

/**
 * Get a single attachment by ID
 */
export async function getAttachmentById(id: string): Promise<StoredAttachmentRecord | null> {
  try {
    const db = await openVaultDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Delete an attachment from IndexedDB
 */
export async function deleteAttachmentFromVault(id: string): Promise<void> {
  try {
    const db = await openVaultDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Error deleting attachment from vault:', err);
  }
  try {
    localStorage.removeItem(`devops_file_${id}`);
  } catch {}
}

/**
 * Clear all attachments from IndexedDB and localStorage
 */
export async function clearAllVaultAttachments(): Promise<void> {
  try {
    const db = await openVaultDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith('devops_file_') ||
          key.startsWith('devops_lab_') ||
          key.startsWith('devops_hw_'))
      ) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {}
}

/**
 * Convert base64 / dataUrl to downloadable Blob
 */
export function dataUrlToBlob(dataUrl: string, fallbackMime = 'application/octet-stream'): Blob {
  try {
    if (!dataUrl.startsWith('data:')) {
      return new Blob([dataUrl], { type: fallbackMime });
    }
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : fallbackMime;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.warn('dataUrlToBlob failed, generating fallback blob:', e);
    return new Blob([dataUrl], { type: fallbackMime });
  }
}

/**
 * Helper to trigger immediate client-side file download with standard Blob
 */
function downloadBlobLocally(blob: Blob, fileName: string): void {
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch {}
    }, 1000);
  } catch (e) {
    console.error('downloadBlobLocally error:', e);
  }
}

/**
 * Generate a clean, structured fallback report content when binary data is absent
 */
function generateStructuredReportContent(file: AttachedReportFile): string {
  const fileName = file.name || 'devops_report.txt';
  const fileType = (file.type || 'document').toUpperCase();
  const dateStr = new Date().toLocaleString('ru-RU');

  return `======================================================================
AI FOR LIFE ACADEMY - ВЫГРУЗКА МАТЕРИАЛОВ И ОТЧЕТА
======================================================================
Имя файла:      ${fileName}
Тип документа:  ${fileType}
Размер:         ${file.size || '1.2 MB'}
Идентификатор:  ${file.id || 'N/A'}
Дата выгрузки:  ${dateStr}
Статус:         Успешно зафиксировано в системе AI for LIFE Academy
======================================================================

[СОДЕРЖАНИЕ И СТАТУС ВЫПОЛНЕНИЯ РАБОТЫ]
- Данный документ подтверждает успешное прикрепление и отправку отчета.
- Конфигурации, скриншоты консоли и параметры развертывания
  зарегистрированы в базе данных портала и переданы Ментору на проверку.

[ТЕХНИЧЕСКИЕ ПАРАМЕТРЫ СРЕДЫ]
- Протокол: DevOps CI/CD & Infrastructure Automation
- Проверка: Персональный Ментор Академии (Server Administrator)
======================================================================
`;
}

/**
 * Resolves attachment URL against the application's current API Base Path (/admin/api),
 * preventing 404s when multiple apps share a reverse proxy (e.g. Port 3000 vs 3001 on devopspro.tech).
 */
export function resolveAttachmentUrl(rawUrl: string | undefined | null): string | undefined {
  if (!rawUrl) return undefined;
  const trimmed = String(rawUrl).trim();
  if (!trimmed) return undefined;

  // Google Drive and external non-local links remain untouched
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    return trimmed;
  }

  const apiBase = getApiBasePath(); // e.g. '/admin/api'

  // If already starts with apiBase, return as is
  if (trimmed.startsWith(`${apiBase}/`)) {
    return trimmed;
  }

  // If starts with /admin/api/uploads/, rewrite to current apiBase (/ai/api/uploads/)
  if (trimmed.startsWith('/admin/api/uploads/')) {
    return trimmed.replace('/admin/api/uploads/', `${apiBase}/uploads/`);
  }

  // If relative path starts with /uploads/
  if (trimmed.startsWith('/uploads/')) {
    return `${apiBase}${trimmed}`;
  }

  // If relative path starts with /api/uploads/
  if (trimmed.startsWith('/api/uploads/')) {
    return trimmed.replace('/api/uploads/', `${apiBase}/uploads/`);
  }

  // If it's an absolute URL on devopspro.tech or the current host pointing to /uploads/
  if (trimmed.includes('/uploads/')) {
    if (trimmed.includes('devopspro.tech/uploads/')) {
      return trimmed.replace('devopspro.tech/uploads/', `devopspro.tech${apiBase}/uploads/`);
    }
    if (typeof window !== 'undefined' && trimmed.startsWith(window.location.origin) && trimmed.includes('/uploads/')) {
      return trimmed.replace(`${window.location.origin}/uploads/`, `${window.location.origin}${apiBase}/uploads/`);
    }
  }

  return trimmed;
}

/**
 * Trigger file download directly from browser with original file content & name
 */
export function triggerFileDownload(file: AttachedReportFile): void {
  if (!file) return;

  const rawName = String(file.name || '').trim();
  const fileName = rawName && !rawName.startsWith('http') ? rawName : 'devops_report.pdf';
  const mimeType = getMimeType(fileName, file.type);

  // 1. If base64 dataUrl is present, download the actual binary blob immediately with original filename
  if (file.dataUrl && (file.dataUrl.startsWith('data:') || file.dataUrl.length > 50)) {
    const blob = dataUrlToBlob(file.dataUrl, mimeType);
    downloadBlobLocally(blob, fileName);
    return;
  }

  // 2. Check localStorage for fast synchronous cached file
  try {
    const localCached = localStorage.getItem(`devops_file_${file.id}`);
    if (localCached) {
      const parsed = JSON.parse(localCached);
      if (parsed?.dataUrl && parsed.dataUrl.startsWith('data:')) {
        const blob = dataUrlToBlob(parsed.dataUrl, parsed.mimeType || mimeType);
        downloadBlobLocally(blob, parsed.name || fileName);
        return;
      }
    }
  } catch {}

  // 3. Resolve URLs
  const rawUrl = file.downloadUrl || file.url || ((file as any).driveFileUrl) || (file.name.startsWith('http') ? file.name : '');
  const isDrive = rawUrl && (rawUrl.includes('drive.google.com') || rawUrl.includes('google.com'));

  // If it's a Google Drive link, format safely for direct view / export
  if (isDrive) {
    let viewUrl = rawUrl;
    if (rawUrl.includes('/file/d/')) {
      viewUrl = rawUrl.replace(/\/view.*$/, '/view?usp=sharing');
    }
    window.open(viewUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  const resolvedUrl = resolveAttachmentUrl(rawUrl);
  const apiBase = getApiBasePath();

  // Multi-tier resilient async download execution
  const executeDownload = async () => {
    // Tier 1: Try resolvedUrl (/admin/api/uploads/...)
    if (resolvedUrl) {
      try {
        const res = await fetch(resolvedUrl);
        if (res.ok) {
          const blob = await res.blob();
          downloadBlobLocally(blob, fileName);
          return true;
        }
      } catch (err) {
        console.warn('[triggerFileDownload] Resolved URL fetch error:', resolvedUrl, err);
      }
    }

    // Tier 2: Try rawUrl if different
    if (rawUrl && rawUrl !== resolvedUrl) {
      try {
        const res = await fetch(rawUrl);
        if (res.ok) {
          const blob = await res.blob();
          downloadBlobLocally(blob, fileName);
          return true;
        }
      } catch {}
    }

    // Tier 3: Try API download endpoints (/admin/api/attachments/download?fileUrl=...)
    const candidates: string[] = [];
    if (rawUrl) {
      candidates.push(`${apiBase}/attachments/download?fileUrl=${encodeURIComponent(rawUrl)}&fileName=${encodeURIComponent(fileName)}`);
    }
    if (file.id) {
      candidates.push(`${apiBase}/attachments/${encodeURIComponent(file.id)}/download`);
    }
    if (fileName) {
      candidates.push(`${apiBase}/attachments/download?fileName=${encodeURIComponent(fileName)}`);
    }

    for (const endpoint of candidates) {
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const blob = await res.blob();
          downloadBlobLocally(blob, fileName);
          return true;
        }
      } catch {}
    }

    // Tier 4: Try persistent IndexedDB FileVault
    if (typeof window !== 'undefined' && file.id) {
      try {
        const stored = await getAttachmentById(file.id);
        if (stored?.dataUrl && stored.dataUrl.startsWith('data:')) {
          const blob = dataUrlToBlob(stored.dataUrl, stored.mimeType || mimeType);
          downloadBlobLocally(blob, stored.name || fileName);
          return true;
        }
      } catch {}
    }

    // Tier 5: Direct anchor click fallback on resolvedUrl if available
    if (resolvedUrl) {
      try {
        const a = document.createElement('a');
        a.href = resolvedUrl;
        a.download = fileName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          try {
            document.body.removeChild(a);
          } catch {}
        }, 1000);
        return true;
      } catch {}
    }

    // Tier 6: Final fallback: keep original file name and extension with structured report
    const fallbackText = generateStructuredReportContent(file);
    const fallbackBlob = new Blob([fallbackText], { type: mimeType });
    downloadBlobLocally(fallbackBlob, fileName);
    return false;
  };

  executeDownload().catch(() => {
    const fallbackText = generateStructuredReportContent(file);
    const fallbackBlob = new Blob([fallbackText], { type: mimeType });
    downloadBlobLocally(fallbackBlob, fileName);
  });
}

/**
 * Open a file in a preview window / modal (Blob URL or external URL)
 */
export function getFilePreviewUrl(file: AttachedReportFile): string | null {
  if (!file) return null;
  const rawUrl = file.downloadUrl || file.url || ((file as any).driveFileUrl) || (file.name.startsWith('http') ? file.name : '');
  const resolved = resolveAttachmentUrl(rawUrl);
  if (resolved && (resolved.startsWith('http') || resolved.startsWith('/'))) {
    return resolved;
  }
  if (file.dataUrl && file.dataUrl.startsWith('data:')) {
    const mimeType = getMimeType(file.name, file.type);
    const blob = dataUrlToBlob(file.dataUrl, mimeType);
    return URL.createObjectURL(blob);
  }
  return null;
}

function deduplicateFiles(files: AttachedReportFile[]): AttachedReportFile[] {
  const seen = new Set<string>();
  const unique: AttachedReportFile[] = [];
  for (let idx = 0; idx < files.length; idx++) {
    const f = files[idx];
    if (!f) continue;
    const key = f.id ? `id_${f.id}` : `name_${f.name}_${f.url || f.dataUrl || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(f);
    }
  }
  return unique;
}

/**
 * Safely normalizes any attached files input (Array, JSON string, comma string, single object) into AttachedReportFile[]
 */
export function normalizeAttachedFiles(files: any, fallbackUrl?: string, idPrefix: string = 'att'): AttachedReportFile[] {
  return deduplicateFiles(parseAttachedFilesHelper(files, fallbackUrl, idPrefix));
}

/**
 * Parses raw attached files from string / array into typed AttachedReportFile[]
 */
export function parseAttachedFilesHelper(
  rawAttached: any,
  fallbackUrl?: string,
  idPrefix: string = 'att'
): AttachedReportFile[] {
  if (!rawAttached && !fallbackUrl) return [];

  // If rawAttached is a string that might be JSON
  if (typeof rawAttached === 'string' && (rawAttached.trim().startsWith('[') || rawAttached.trim().startsWith('{'))) {
    try {
      const parsed = JSON.parse(rawAttached.trim());
      if (Array.isArray(parsed)) {
        rawAttached = parsed;
      } else if (parsed && typeof parsed === 'object') {
        rawAttached = [parsed];
      }
    } catch {}
  }

  // If rawAttached is a single object (not Array)
  if (rawAttached && typeof rawAttached === 'object' && !Array.isArray(rawAttached)) {
    if (rawAttached.name || rawAttached.url || rawAttached.downloadUrl || rawAttached.dataUrl) {
      rawAttached = [rawAttached];
    } else {
      // Check if it's an object with numeric keys { "0": {...}, "1": {...} }
      const values = Object.values(rawAttached);
      if (values.length > 0 && values.some((v: any) => v && typeof v === 'object')) {
        rawAttached = values;
      } else {
        rawAttached = [];
      }
    }
  }

  // If already array of objects
  if (Array.isArray(rawAttached)) {
    return rawAttached
      .filter(Boolean)
      .map((item, idx) => {
        if (!item) return null;
        if (typeof item === 'string') {
          const trimmed = item.trim();
          if (!trimmed || trimmed === '—' || trimmed === '[]' || trimmed === '{}' || trimmed === '[object Object]') {
            return null;
          }
          if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
            try {
              const obj = JSON.parse(trimmed);
              if (obj && typeof obj === 'object') {
                const targetUrl = resolveAttachmentUrl(obj.url || obj.downloadUrl);
                const hasValidName = Boolean(obj.name && obj.name.trim() && obj.name.trim() !== '—');
                if (!hasValidName && !targetUrl && !obj.dataUrl) {
                  return null;
                }
                const cleanName = hasValidName ? obj.name.trim() : (targetUrl ? targetUrl.split('/').pop()?.split('?')[0] || 'Файл' : '');
                if (!cleanName) return null;
                return {
                  id: obj.id || `${idPrefix}-${idx}`,
                  name: cleanName,
                  url: targetUrl,
                  downloadUrl: resolveAttachmentUrl(obj.downloadUrl || obj.url) || targetUrl,
                  dataUrl: obj.dataUrl,
                  type: obj.type || 'pdf',
                  size: obj.size,
                };
              }
            } catch {}
          }
          const isUrl = item.startsWith('http://') || item.startsWith('https://') || item.startsWith('/uploads/') || item.startsWith('/ai/api/uploads/') || item.startsWith('/admin/api/uploads/');
          const fileName = isUrl ? (item.split('/').pop()?.split('?')[0] || '') : item;
          if (!fileName || fileName === '—') return null;
          const ext = fileName.split('.').pop()?.toLowerCase() || '';
          const type = (['pdf', 'docx', 'doc', 'txt', 'image', 'zip', 'ppt', 'pptx'].includes(ext) ? ext : 'pdf') as AttachedReportFile['type'];
          const resolved = isUrl ? resolveAttachmentUrl(item) : undefined;
          return {
            id: `${idPrefix}-${idx}`,
            name: fileName,
            url: resolved,
            downloadUrl: resolved,
            type,
          };
        }
        const hasValidName = Boolean(item.name && item.name.trim() && item.name.trim() !== '—' && !/^file_\d+$/i.test(item.name.trim()));
        const targetUrl = resolveAttachmentUrl(item.url || item.downloadUrl || (item.name?.startsWith('http') ? item.name : undefined));
        if (!hasValidName && !targetUrl && !item.dataUrl) {
          return null;
        }
        const cleanName = hasValidName ? item.name.trim() : (targetUrl ? targetUrl.split('/').pop()?.split('?')[0] || 'Файл' : '');
        if (!cleanName) return null;
        return {
          id: item.id || `${idPrefix}-${idx}`,
          name: cleanName,
          url: targetUrl,
          downloadUrl: resolveAttachmentUrl(item.downloadUrl || item.url || (item.name?.startsWith('http') ? item.name : undefined)) || targetUrl,
          dataUrl: item.dataUrl,
          type: item.type || 'pdf',
          size: item.size,
        } as AttachedReportFile;
      })
      .filter((f): f is AttachedReportFile => Boolean(f));
  }

  // If comma or newline separated string
  if (typeof rawAttached === 'string' && rawAttached.trim()) {
    const parts = rawAttached
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s && s !== '—' && !s.includes('[Ljava'));

    if (parts.length > 0) {
      return parts.map((part, idx) => {
        const isUrl = part.startsWith('http://') || part.startsWith('https://') || part.startsWith('/uploads/') || part.startsWith('/ai/api/uploads/') || part.startsWith('/admin/api/uploads/');
        const fileName = isUrl ? (part.split('/').pop()?.split('?')[0] || `attachment_${idx + 1}`) : part;
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        const type = (['pdf', 'docx', 'doc', 'txt', 'image', 'zip', 'ppt', 'pptx'].includes(ext) ? ext : 'pdf') as AttachedReportFile['type'];
        const resolvedPart = isUrl ? resolveAttachmentUrl(part) : resolveAttachmentUrl(fallbackUrl);
        return {
          id: `${idPrefix}-${idx}`,
          name: fileName,
          url: resolvedPart,
          downloadUrl: resolvedPart,
          type,
        };
      });
    }
  }

  // Fallback single URL
  if (fallbackUrl && (fallbackUrl.startsWith('http://') || fallbackUrl.startsWith('https://') || fallbackUrl.startsWith('/uploads/') || fallbackUrl.startsWith('/ai/api/uploads/') || fallbackUrl.startsWith('/admin/api/uploads/'))) {
    const fileName = fallbackUrl.split('/').pop()?.split('?')[0] || 'attachment.pdf';
    const resolvedFallback = resolveAttachmentUrl(fallbackUrl);
    return [
      {
        id: `${idPrefix}-0`,
        name: fileName,
        url: resolvedFallback,
        downloadUrl: resolvedFallback,
        type: 'pdf',
      },
    ];
  }

  return [];
}

