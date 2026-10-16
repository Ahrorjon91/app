import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS } from '../data/syllabusData';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  Clock,
  Terminal,
  Play,
  Check,
  Award,
  Lock
} from 'lucide-react';

export const LabsPage: React.FC = () => {
  const { labs, setSelectedLabId, setActivePage, isLabUnlocked, profile, courseBlocks, currentCourse, currentCourseId } = usePortal();
  const [selectedBlockId, setSelectedBlockId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const activeBlocks = courseBlocks || COURSE_BLOCKS;

  const filteredLabs = labs.filter((lab) => {
    const matchesBlock = selectedBlockId === 'all' || lab.blockId === selectedBlockId;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (lab.title || '').toLowerCase().includes(query) ||
      (lab.scenario || '').toLowerCase().includes(query);
    return matchesBlock && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-emerald-400" /> Виртуальные Лабораторные Работы (24 Лабы)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Интерактивный CLI Симулятор Терминала Linux & Windows PowerShell
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск лабораторий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Mobile Block Select Dropdown */}
      <div className="sm:hidden">
        <select
          value={selectedBlockId}
          onChange={(e) => setSelectedBlockId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 shadow-sm"
        >
          <option value="all">Все 24 Лабы (Все 6 Блоков)</option>
          {activeBlocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.titleRu.split('(')[0].trim()}
            </option>
          ))}
        </select>
      </div>

      {/* Block Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => setSelectedBlockId('all')}
          className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap shrink-0 ${
            selectedBlockId === 'all'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Все 24 Лабы
        </button>
        {activeBlocks.map((block) => (
          <button
            key={block.id}
            onClick={() => setSelectedBlockId(block.id)}
            className={`px-3 sm:px-3.5 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              selectedBlockId === block.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>Блок {block.id}</span>
            <span className="text-[10px] opacity-70 font-mono">({block.lessonRange})</span>
          </button>
        ))}
      </div>

      {/* Labs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab) => {
          const unlocked = isLabUnlocked(lab.id);
          const currentEmail = (profile.email || '').toLowerCase().trim();
          const currentId = profile.id;
          const lEmail = (lab.studentEmail || '').toLowerCase().trim();
          const lId = lab.studentId || '';
          const isMine = (lEmail && currentEmail && lEmail === currentEmail) ||
                         (lId && currentId && lId === currentId) ||
                         (!lEmail && !lId);
          const isCompletedByMe = isMine && (lab.isCompleted || lab.submissionStatus === 'Approved');
          const completedTasksCount = isMine ? (lab.tasks || []).filter((t) => t && t.completed).length : 0;
          const totalTasks = (lab.tasks || []).length || 1;
          const pct = Math.round((completedTasksCount / totalTasks) * 100);

          return (
            <div
              key={lab.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 group hover:shadow-xl ${
                unlocked
                  ? isCompletedByMe
                    ? 'bg-slate-900/90 border-slate-800/80 hover:border-emerald-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40'
                  : 'bg-slate-900/40 border-slate-800/50 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 text-[10px] font-bold font-mono border border-emerald-800/40">
                    ЛАБА #{lab.id} • {lab.estimatedMinutes} мин
                  </span>
                  {unlocked ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lab.difficulty === 'Hard'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                          : lab.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                      }`}
                    >
                      {lab.difficulty}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" /> Заблокировано
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {lab.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{lab.scenario}</p>

                {/* Task completion progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>Задачи: {completedTasksCount}/{totalTasks}</span>
                    <span className="text-emerald-400 font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> CLI Ready
                </span>
                {unlocked ? (
                  <button
                    onClick={() => {
                      setSelectedLabId(lab.id);
                      setActivePage('lab-detail');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompletedByMe ? 'Повторить' : 'Запустить'}</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed border border-slate-700/60"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Заблокировано (Урок #{lab.id})</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
