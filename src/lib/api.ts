/**
 * DEVOPS ACADEMY PORTAL - Primary API Client
 * High-Performance SQLite Database Transport Layer
 * 
 * Features:
 * - Direct sub-millisecond ACID SQLite transactions via Express backend
 * - Safe request/response lifecycle with real-time UI state notification
 * - Automatic retry with exponential backoff for network resilience
 * - Background pending queue for seamless offline recovery
 * - Full parity for all academic, leaderboard, labs, homework, and attachment flows
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  [key: string]: any;
}

export interface ApiState {
  isSaving: boolean;
  lastSavedAt: string | null;
  error: string | null;
}

type ApiStateListener = (state: ApiState) => void;

const listeners: Set<ApiStateListener> = new Set();
let currentState: ApiState = {
  isSaving: false,
  lastSavedAt: null,
  error: null,
};

let errorClearTimeout: any = null;

function notifyListeners() {
  setTimeout(() => {
    listeners.forEach((listener) => {
      try {
        listener(currentState);
      } catch (e) {
        console.error('[API State Listener Error]', e);
      }
    });
  }, 0);
}

export function subscribeApiState(listener: ApiStateListener) {
  listeners.add(listener);
  setTimeout(() => {
    if (listeners.has(listener)) {
      try {
        listener(currentState);
      } catch (e) {
        console.error('[API State Listener Error]', e);
      }
    }
  }, 0);
  return () => {
    listeners.delete(listener);
  };
}

export function getApiState(): ApiState {
  return currentState;
}

export function clearApiError() {
  if (currentState.error) {
    currentState = { ...currentState, error: null };
    notifyListeners();
  }
}

/**
 * Base prefix for REST API calls.
 * Defaults to '/ai/api' so requests route to /ai/api/database, /ai/api/auth/login, etc.
 * preventing collisions with other apps running on Port 3000 or 3001 at /api or /admin/api.
 */
export function getApiBasePath(): string {
  const envPath = (import.meta as any).env?.VITE_API_BASE_PATH;
  if (envPath && typeof envPath === 'string' && envPath.trim()) {
    const trimmed = envPath.trim().replace(/\/+$/, '');
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }
  return '/ai/api';
}

export function getBackendApiUrl(): string {
  const base = getApiBasePath();
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${base}`;
  }
  return base;
}

export function getAppsScriptUrl(): string {
  return getBackendApiUrl();
}

/**
 * Detects temporary network / busy errors
 */
export function isRetriableError(errStr: string): boolean {
  const lower = String(errStr || '').toLowerCase();
  return (
    lower.includes('failed to fetch') ||
    lower.includes('load failed') ||
    lower.includes('networkerror') ||
    lower.includes('abort') ||
    lower.includes('timeout') ||
    lower.includes('404') ||
    lower.includes('502') ||
    lower.includes('503') ||
    lower.includes('504')
  );
}

const BACKGROUND_READ_ACTIONS = new Set([
  'getDatabase',
  'getFullSnapshot',
  'sqlite/stats',
  'getActivityLogs',
  'adminGetStudents',
  'getProgress',
  'getLeaderboard',
  'getLessons',
  'getHomework',
  'getLabs',
  'getTestResults',
  'getCertificates',
  'getDownloads',
  'getFaq',
  'getHandbook',
  'getSettings',
  'getPortalSettings',
  'getAcademicReportSettings',
  'syncProgress',
  'awardExp',
  'startLesson',
]);

// Global FIFO queue for guaranteed order
let requestQueue: Promise<any> = Promise.resolve();

// Pending sync queue in localStorage for resilient offline/failed recovery
const PENDING_QUEUE_KEY = 'devops_sqlite_pending_queue';

function getPendingQueue(): Array<{ action: string; payload: Record<string, any>; timestamp: string }> {
  try {
    const raw = localStorage.getItem(PENDING_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addToPendingQueue(action: string, payload: Record<string, any>) {
  try {
    const queue = getPendingQueue();
    const filtered = queue.filter((item) => {
      if (payload.referenceId && item.payload.referenceId === payload.referenceId) return false;
      if (item.action === action && item.payload.studentEmail === payload.studentEmail && action === 'syncProgress') return false;
      return true;
    });
    filtered.push({ action, payload, timestamp: new Date().toISOString() });
    localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(filtered.slice(-30)));
  } catch {}
}

function removeFromPendingQueue(itemTimestamp: string) {
  try {
    const queue = getPendingQueue();
    const updated = queue.filter((i) => i.timestamp !== itemTimestamp);
    localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(updated));
  } catch {}
}

// Map action names to specific REST subpaths (joined dynamically with getApiBasePath())
const ACTION_ENDPOINT_MAP: Record<string, { path: string; method?: 'GET' | 'POST' }> = {
  login: { path: '/auth/login', method: 'POST' },
  getCurrentUser: { path: '/auth/current', method: 'GET' },
  logout: { path: '/auth/logout', method: 'POST' },
  adminGetStudents: { path: '/students', method: 'GET' },
  adminCreateStudent: { path: '/students', method: 'POST' },
  adminUpdateStudent: { path: '/updateProfile', method: 'POST' },
  updateProfile: { path: '/updateProfile', method: 'POST' },
  deleteUser: { path: '/deleteUser', method: 'POST' },
  getLessons: { path: '/lessons', method: 'GET' },
  completeLesson: { path: '/lessons/complete', method: 'POST' },
  getHomework: { path: '/homework', method: 'GET' },
  submitHomework: { path: '/homework/submit', method: 'POST' },
  reviewHomework: { path: '/homework/review', method: 'POST' },
  deleteHomeworkSubmission: { path: '/deleteHomeworkSubmission', method: 'POST' },
  getLabs: { path: '/labs', method: 'GET' },
  submitLab: { path: '/labs/submit', method: 'POST' },
  reviewLab: { path: '/labs/review', method: 'POST' },
  deleteLabSubmission: { path: '/deleteLabSubmission', method: 'POST' },
  getTestResults: { path: '/tests/results', method: 'GET' },
  submitTest: { path: '/tests/submit', method: 'POST' },
  saveQuizSubmission: { path: '/tests/submit', method: 'POST' },
  reviewTest: { path: '/tests/review', method: 'POST' },
  deleteQuizSubmission: { path: '/deleteQuizSubmission', method: 'POST' },
  getProgress: { path: '/progress', method: 'GET' },
  syncProgress: { path: '/progress/sync', method: 'POST' },
  awardExp: { path: '/exp/award', method: 'POST' },
  getExpHistory: { path: '/exp/history', method: 'GET' },
  getLeaderboard: { path: '/leaderboard', method: 'GET' },
  getCertificates: { path: '/certificates', method: 'GET' },
  saveCertificate: { path: '/certificates', method: 'POST' },
  deleteCertificate: { path: '/deleteCertificate', method: 'POST' },
  getDownloads: { path: '/downloads', method: 'GET' },
  saveDownload: { path: '/downloads', method: 'POST' },
  deleteDownload: { path: '/deleteDownload', method: 'POST' },
  getFaq: { path: '/faq', method: 'GET' },
  saveFaq: { path: '/faq', method: 'POST' },
  deleteFaq: { path: '/deleteFaq', method: 'POST' },
  uploadAttachment: { path: '/upload', method: 'POST' },
  upload: { path: '/upload', method: 'POST' },
  getDatabase: { path: '/database', method: 'GET' },
  getFullSnapshot: { path: '/database', method: 'GET' },
  resetAllAcademicData: { path: '/admin/reset-academic', method: 'POST' },
  getActivityLogs: { path: '/admin/activity-logs', method: 'GET' },
  clearAllQuizSubmissions: { path: '/clearAllQuizSubmissions', method: 'POST' },
  clearAllLabSubmissions: { path: '/clearAllLabSubmissions', method: 'POST' },
  clearAllHomeworkSubmissions: { path: '/clearAllHomeworkSubmissions', method: 'POST' },
};

/**
 * Primary API Request function targeting SQLite Backend
 */
export async function apiRequest<T = any>(
  action: string,
  payload: Record<string, any> = {},
  method: 'GET' | 'POST' = 'POST',
  retryCount: number = 3
): Promise<ApiResponse<T>> {
  const primaryBasePath = getApiBasePath();
  const endpointInfo = ACTION_ENDPOINT_MAP[action];
  const buildEndpointPath = (basePath: string): string => {
    if (endpointInfo?.path) {
      const sub = endpointInfo.path.startsWith('/') ? endpointInfo.path : `/${endpointInfo.path}`;
      return `${basePath}${sub}`;
    }
    const cleanAction = action.replace(/^\/?(ai\/|admin\/)?api\/?/, '');
    return `${basePath}/${cleanAction}`;
  };
  const effectiveMethod = endpointInfo?.method || method;
  const isBackgroundOp = BACKGROUND_READ_ACTIONS.has(action) || effectiveMethod === 'GET';

  if (effectiveMethod === 'POST' && !isBackgroundOp) {
    currentState = { ...currentState, isSaving: true };
    notifyListeners();
  }

  const runRequest = async (): Promise<ApiResponse<T>> => {
    const executeAttempt = async (attempt: number): Promise<ApiResponse<T>> => {
      try {
        const activeBasePath =
          attempt === 2 && primaryBasePath !== '/api'
            ? '/api'
            : attempt === 3 && primaryBasePath !== '/admin/api'
            ? '/admin/api'
            : primaryBasePath;
        const endpointPath = buildEndpointPath(activeBasePath);
        let response: Response;

        // Retrieve active auth profile headers if available
        const authHeaders: Record<string, string> = {};
        try {
          const rawProfile = typeof window !== 'undefined' ? localStorage.getItem('devops_auth_profile') : null;
          if (rawProfile) {
            const p = JSON.parse(rawProfile);
            if (p.email) authHeaders['X-User-Email'] = p.email;
            if (p.role) authHeaders['X-User-Role'] = p.role;
          }
        } catch {}

        if (effectiveMethod === 'GET') {
          const queryParams = new URLSearchParams({
            _ts: Date.now().toString(),
          });

          Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
            }
          });

          const separator = endpointPath.includes('?') ? '&' : '?';
          const targetUrl = `${endpointPath}${separator}${queryParams.toString()}`;

          response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              ...authHeaders,
            },
            cache: 'no-store',
          });
        } else {
          response = await fetch(endpointPath, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              ...authHeaders,
            },
            body: JSON.stringify({ action, ...payload, timestamp: new Date().toISOString() }),
          });
        }

        if (!response.ok) {
          if ((response.status >= 500 || response.status === 404) && attempt <= retryCount) {
            await new Promise((res) => setTimeout(res, 400 * attempt));
            return executeAttempt(attempt + 1);
          }
          const errText = await response.text();
          let jsonErr: any;
          try {
            jsonErr = JSON.parse(errText);
          } catch {}
          throw new Error(jsonErr?.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        const isSuccess = json.success !== false && !json.error;

        const nowTime = new Date().toLocaleTimeString('ru-RU');
        currentState = {
          isSaving: false,
          lastSavedAt: isSuccess ? nowTime : currentState.lastSavedAt,
          error: isSuccess ? null : (isBackgroundOp ? null : (json.error || null)),
        };
        notifyListeners();

        if (isSuccess && errorClearTimeout) {
          clearTimeout(errorClearTimeout);
          errorClearTimeout = null;
        }

        if (Array.isArray(json)) {
          return { success: true, data: json as any };
        }
        return {
          success: isSuccess,
          data: json.data !== undefined ? json.data : json,
          ...json,
        };
      } catch (err: any) {
        if (attempt <= retryCount && isRetriableError(err?.message || '')) {
          await new Promise((res) => setTimeout(res, 500 * attempt));
          return executeAttempt(attempt + 1);
        }

        if (effectiveMethod === 'POST') {
          addToPendingQueue(action, payload);
        }

        const errorMsg = err?.message || 'Ошибка связи с локальным сервером';
        currentState = {
          ...currentState,
          isSaving: false,
          error: isBackgroundOp ? null : errorMsg,
        };
        notifyListeners();

        if (!isBackgroundOp) {
          if (errorClearTimeout) clearTimeout(errorClearTimeout);
          errorClearTimeout = setTimeout(() => {
            clearApiError();
          }, 6000);
        }

        return {
          success: false,
          error: errorMsg,
        };
      }
    };

    return await executeAttempt(1);
  };

  if (effectiveMethod === 'POST') {
    const queuePromise = requestQueue.then(runRequest, runRequest);
    requestQueue = queuePromise.catch(() => {});
    return queuePromise;
  }

  return runRequest();
}

/**
 * Periodically flushes any queued offline/pending requests in background
 */
export async function flushPendingSyncQueue(): Promise<void> {
  const queue = getPendingQueue();
  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      let normalizedPayload = item.payload || {};
      if (normalizedPayload.lessonId && typeof normalizedPayload.lessonId === 'object') {
        normalizedPayload = { ...normalizedPayload, ...normalizedPayload.lessonId };
      }
      if (normalizedPayload.labId && typeof normalizedPayload.labId === 'object') {
        normalizedPayload = { ...normalizedPayload, ...normalizedPayload.labId };
      }
      if (normalizedPayload.submissionId && typeof normalizedPayload.submissionId === 'object') {
        normalizedPayload = { ...normalizedPayload, ...normalizedPayload.submissionId };
      }
      const res = await apiRequest(item.action, normalizedPayload, 'POST', 0);
      if (res && res.success) {
        removeFromPendingQueue(item.timestamp);
      } else {
        // Remove stale/unrecoverable item so it never loops infinitely
        removeFromPendingQueue(item.timestamp);
      }
    } catch {
      removeFromPendingQueue(item.timestamp);
    }
  }
}

// Domain API client wrappers
export const api = {
  // Auth
  login: (login: string, password?: string) => apiRequest('login', { login, password }),
  getCurrentUser: (email: string) => apiRequest('getCurrentUser', { email }, 'GET'),
  logout: (email?: string) => apiRequest('logout', { email }),

  // Student Profile
  getStudentProfile: (email: string) => apiRequest('getCurrentUser', { email }, 'GET'),
  updateProfile: (studentId: string, profileData: Record<string, any>) => apiRequest('updateProfile', { studentId, ...profileData }),
  uploadAvatar: (studentId: string, avatarDataUrl: string) => apiRequest('updateProfile', { studentId, avatarUrl: avatarDataUrl }),

  // Progress & EXP
  getProgress: (studentEmail: string) => apiRequest('getProgress', { studentEmail }, 'GET'),
  syncProgress: (studentEmailOrPayload: string | Record<string, any>, progress?: Record<string, any>) => {
    if (typeof studentEmailOrPayload === 'object' && studentEmailOrPayload !== null) {
      return apiRequest('syncProgress', studentEmailOrPayload);
    }
    return apiRequest('syncProgress', { studentEmail: studentEmailOrPayload, ...(progress || {}) });
  },
  syncDatabase: () => apiRequest('syncDatabase', {}),
  awardExp: (studentEmail: string, amount: number, type: string, description: string, referenceId: string) =>
    apiRequest('awardExp', { studentEmail, amount, type, description, referenceId }),
  getExpHistory: (studentEmail: string) => apiRequest('getExpHistory', { studentEmail }, 'GET'),
  getLeaderboard: () => apiRequest('getLeaderboard', {}, 'GET'),

  // Lessons
  getLessons: (studentEmail?: string) => apiRequest('getLessons', { studentEmail }, 'GET'),
  startLesson: (lessonId: number, studentEmail: string) => apiRequest('startLesson', { lessonId, studentEmail }),
  completeLesson: (lessonIdOrPayload: number | Record<string, any>, studentEmail?: string, studentName?: string, expAward: number = 50) => {
    if (typeof lessonIdOrPayload === 'object' && lessonIdOrPayload !== null) {
      return apiRequest('completeLesson', {
        ...lessonIdOrPayload,
        referenceId: `LESSON_COMPLETED:${lessonIdOrPayload.studentEmail}:${lessonIdOrPayload.lessonId}`,
      });
    }
    return apiRequest('completeLesson', {
      lessonId: lessonIdOrPayload,
      studentEmail,
      studentName,
      expAward,
      referenceId: `LESSON_COMPLETED:${studentEmail}:${lessonIdOrPayload}`,
    });
  },

  // Attachments & File Uploads
  uploadAttachment: (payload: {
    fileName: string;
    fileDataUrl?: string;
    base64Data?: string;
    mimeType?: string;
    category?: string;
    targetId?: number | string;
    studentEmail?: string;
    studentId?: string;
  }) => apiRequest('uploadAttachment', payload),

  // Labs
  getLabs: (studentEmail?: string, studentId?: string) => apiRequest('getLabs', { studentEmail, studentId }, 'GET'),
  startLab: (labId: number, studentEmail: string) => apiRequest('startLab', { labId, studentEmail }),
  submitLab: (payload: Record<string, any>) => apiRequest('submitLab', { ...payload, referenceId: `LAB_COMPLETED:${payload.studentEmail}:${payload.labId}` }),
  reviewLab: (
    labIdOrPayload: number | Record<string, any>,
    studentEmail?: string,
    status?: string,
    score?: number,
    feedback?: string,
    adminEmail?: string,
    studentId?: string
  ) => {
    if (typeof labIdOrPayload === 'object' && labIdOrPayload !== null) {
      return apiRequest('reviewLab', labIdOrPayload);
    }
    return apiRequest('reviewLab', { labId: labIdOrPayload, studentEmail, studentId, status, score, feedback, adminEmail });
  },
  deleteLabSubmission: (labId: number, studentEmail?: string, studentId?: string) =>
    apiRequest('deleteLabSubmission', { labId, studentEmail, studentId }),

  // Homework
  getHomework: (studentEmail?: string, studentId?: string) => apiRequest('getHomework', { studentEmail, studentId }, 'GET'),
  submitHomework: (payload: Record<string, any>) => apiRequest('submitHomework', { ...payload, referenceId: `HOMEWORK_SUBMITTED:${payload.studentEmail}:${payload.lessonId}` }),
  reviewHomework: (
    lessonIdOrPayload: number | Record<string, any>,
    studentEmail?: string,
    status?: string,
    score?: number,
    feedback?: string,
    adminEmail?: string,
    studentId?: string
  ) => {
    if (typeof lessonIdOrPayload === 'object' && lessonIdOrPayload !== null) {
      return apiRequest('reviewHomework', lessonIdOrPayload);
    }
    return apiRequest('reviewHomework', { lessonId: lessonIdOrPayload, studentEmail, studentId, status, score, feedback, adminEmail });
  },
  deleteHomeworkSubmission: (submissionId: string, lessonId?: number, studentEmail?: string, studentId?: string) =>
    apiRequest('deleteHomeworkSubmission', { submissionId, lessonId, studentEmail, studentId }),

  // Tests & Quizzes
  getTests: () => apiRequest('getTests', {}, 'GET'),
  submitTest: (payload: Record<string, any>) => apiRequest('submitTest', { ...payload, referenceId: `TEST_SUBMITTED:${payload.studentEmail}:${payload.quizId}` }),
  getTestResults: (studentEmail?: string) => apiRequest('getTestResults', { studentEmail }, 'GET'),
  reviewTest: (
    submissionIdOrPayload: string | Record<string, any>,
    status?: string,
    mentorComment?: string,
    scorePct?: number,
    studentEmail?: string,
    studentId?: string
  ) => {
    if (typeof submissionIdOrPayload === 'object' && submissionIdOrPayload !== null) {
      return apiRequest('reviewTest', submissionIdOrPayload);
    }
    return apiRequest('reviewTest', { submissionId: submissionIdOrPayload, status, mentorComment, scorePct, studentEmail, studentId });
  },
  confirmTest: (
    submissionIdOrPayload: string | Record<string, any>,
    mentorComment: string = 'Тестирование подтверждено ментором',
    scorePct?: number,
    studentEmail?: string,
    studentId?: string
  ) => {
    if (typeof submissionIdOrPayload === 'object' && submissionIdOrPayload !== null) {
      return apiRequest('reviewTest', { status: 'Approved', ...submissionIdOrPayload });
    }
    return apiRequest('reviewTest', { submissionId: submissionIdOrPayload, status: 'Approved', mentorComment, scorePct, studentEmail, studentId });
  },
  deleteQuizSubmission: (submissionId: string, studentEmail?: string, quizId?: string) =>
    apiRequest('deleteQuizSubmission', { submissionId, studentEmail, quizId }),
  clearAllQuizSubmissions: () => apiRequest('clearAllQuizSubmissions', {}),
  clearAllLabSubmissions: () => apiRequest('clearAllLabSubmissions', {}),
  clearAllHomeworkSubmissions: () => apiRequest('clearAllHomeworkSubmissions', {}),
  resetAllAcademicData: (payload?: { studentEmail?: string; actorEmail?: string }) => apiRequest('resetAllAcademicData', payload || {}),
  getActivityLogs: (params?: { studentEmail?: string; limit?: number }) => apiRequest('getActivityLogs', params || {}, 'GET'),

  // Certificates & Admin
  getCertificates: (studentEmail?: string) => apiRequest('getCertificates', { studentEmail }, 'GET'),
  getCertificate: (studentEmail: string) => apiRequest('getCertificates', { studentEmail }, 'GET'),
  issueCertificate: (payload: Record<string, any>) => apiRequest('saveCertificate', payload),
  saveCertificate: (certificate: Record<string, any>) => apiRequest('saveCertificate', certificate),
  deleteCertificate: (certificateId: string) => apiRequest('deleteCertificate', { certificateId, id: certificateId }),
  verifyCertificate: (verificationCode: string) => apiRequest('verifyCertificate', { verificationCode }, 'GET'),

  // Handbook
  getHandbook: () => apiRequest('getHandbook', {}, 'GET'),
  updateHandbook: (sections: any[]) => apiRequest('updateHandbook', { sections }),

  // Downloads
  getDownloads: () => apiRequest('getDownloads', {}, 'GET'),
  saveDownload: (item: Record<string, any>) => apiRequest('saveDownload', item),
  deleteDownload: (id: string) => apiRequest('deleteDownload', { id }),

  // FAQ
  getFaq: () => apiRequest('getFaq', {}, 'GET'),
  saveFaq: (item: Record<string, any>) => apiRequest('saveFaq', item),
  deleteFaq: (id: string) => apiRequest('deleteFaq', { id }),

  // Final Exam & Capstone Project
  getFinalExam: () => apiRequest('getFinalExam', {}, 'GET'),
  getFinalProject: () => apiRequest('getFinalProject', {}, 'GET'),
  submitFinalProject: (payload: { studentEmail: string; studentName?: string; projectUrl: string; notes?: string }) =>
    apiRequest('submitFinalProject', payload),
  reviewFinalProject: (payload: { studentEmail: string; status: 'Approved' | 'Rejected'; score: number; feedback: string }) =>
    apiRequest('reviewFinalProject', payload),

  // Mentor & Consultations
  getMentorData: () => apiRequest('getMentorData', {}, 'GET'),
  updateMentorData: (data: Record<string, any>) => apiRequest('updateMentorData', data),
  bookMentorConsultation: (booking: { studentName: string; studentEmail: string; date: string; time: string; topic: string }) =>
    apiRequest('bookMentorConsultation', booking),

  // Settings & Analytics
  getSettings: () => apiRequest('getSettings', {}, 'GET'),
  getPortalSettings: () => apiRequest('getPortalSettings', {}, 'GET'),
  saveSettings: (settings: Record<string, any>) => apiRequest('saveSettings', settings),
  updatePortalSettings: (settings: Record<string, any>) => apiRequest('updatePortalSettings', settings),
  getAcademicReportSettings: () => apiRequest('getAcademicReportSettings', {}, 'GET'),
  saveAcademicReportSettings: (data: { techMentorName: string; techMentorTitle: string; programManagerName: string; programManagerTitle: string }) =>
    apiRequest('saveAcademicReportSettings', data),
  getVpsConfig: () => apiRequest('getVpsConfig', {}, 'GET'),
  updateVpsConfig: (config: Record<string, any>) => apiRequest('updateVpsConfig', config),
  getAnalytics: () => apiRequest('getAnalytics', {}, 'GET'),
  getAnalyticsSummary: () => apiRequest('getAnalyticsSummary', {}, 'GET'),

  // Students Admin
  adminGetStudents: () => apiRequest('adminGetStudents', {}, 'GET'),
  adminCreateStudent: (studentData: Record<string, any>) => apiRequest('adminCreateStudent', studentData),
  adminUpdateStudent: (studentId: string, studentData: Record<string, any>) => apiRequest('adminUpdateStudent', { studentId, ...studentData }),
  adminDisableStudent: (studentId: string, status: string = 'Blocked') => apiRequest('adminDisableStudent', { studentId, status }),
  deleteUser: (studentId: string, studentEmail?: string) => apiRequest('deleteUser', { studentId, studentEmail, id: studentId, email: studentEmail }),
  adminDeleteStudent: (studentId: string, studentEmail?: string) => apiRequest('deleteUser', { studentId, studentEmail, id: studentId, email: studentEmail }),
  getAuditLog: () => apiRequest('getAuditLog', {}, 'GET'),
  getSnapshotHistory: () => apiRequest('getSnapshotHistory', {}, 'GET'),
  getSnapshotByTimestamp: (timestamp: string) => apiRequest('getSnapshotByTimestamp', { timestamp }, 'GET'),
  getDatabase: (studentId?: string, studentEmail?: string) => apiRequest('getDatabase', { studentId, studentEmail }, 'GET'),
  getFullSnapshot: () => apiRequest('getDatabase', {}, 'GET'),
  saveFullSnapshot: (snapshot: Record<string, any>) => apiRequest('saveFullSnapshot', { snapshot }),
  getSqliteStats: () => apiRequest('sqlite/stats', {}, 'GET'),
  getSqliteDbDownloadUrl: () => `${getBackendApiUrl()}/sqlite/download-db`,
  uploadSqliteDb: (payload: { fileName: string; fileDataUrl?: string; fileBase64?: string; snapshot?: any; jsonContent?: any }) =>
    apiRequest('sqlite/upload-db', payload, 'POST'),
};
