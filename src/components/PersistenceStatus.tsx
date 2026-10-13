import React, { useEffect, useState } from 'react';
import { subscribeApiState, getApiState, ApiState, clearApiError, flushPendingSyncQueue } from '../lib/api';
import { usePortal } from '../context/PortalContext';
import { RefreshCw, CheckCircle2, AlertTriangle, HardDrive } from 'lucide-react';

export const PersistenceStatus: React.FC = () => {
  const [state, setState] = useState<ApiState>(() => getApiState());
  const { isSyncingDb, lastSavedDbAt, refreshDatabase } = usePortal();

  useEffect(() => {
    const unsub = subscribeApiState(setState);
    return () => unsub();
  }, []);

  const isAnySyncing = state.isSaving || isSyncingDb;
  const displayTime = lastSavedDbAt || state.lastSavedAt;

  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      {isAnySyncing && (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse">
          <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
          <span>Сохранение в SQLite...</span>
        </span>
      )}

      {!isAnySyncing && state.error && (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
          <span className="truncate max-w-[200px]" title={state.error}>
            {state.error}
          </span>
          <button
            onClick={async () => {
              clearApiError();
              try {
                await flushPendingSyncQueue();
                await refreshDatabase();
              } catch {}
            }}
            className="underline hover:text-white ml-1 text-[11px] font-semibold transition-colors"
            title="Повторить запрос"
          >
            Повторить
          </button>
        </span>
      )}

      {!isAnySyncing && !state.error && (
        <button
          onClick={() => refreshDatabase()}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] transition-colors cursor-pointer"
          title="SQLite Database Active"
        >
          <HardDrive className="w-3 h-3 text-cyan-400 shrink-0" />
          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>SQLite {displayTime ? `(${displayTime})` : '✓'}</span>
          <RefreshCw className="w-2.5 h-2.5 opacity-60 ml-0.5 hover:rotate-180 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};
