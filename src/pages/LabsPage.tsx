import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS } from '../data/syllabusData';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  Terminal,
  Play,
  Lock
} from 'lucide-react';

export const LabsPage: React.FC = () => {
  const { labs, setSelectedLabId, setActivePage, isLabUnlocked, profile } = usePortal();
  const [selectedBlockId, setSelectedBlockId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLabs = labs.filter((lab) => {
    const matchesBlock = selectedBlockId === 'all' || lab.blockId === selectedBlockId;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (lab.title || '').toLowerCase().includes(query) ||
      (lab.scenario || '').toLowerCase().includes(query);
    return matchesBlock && matchesSearch;
  });

  return (
    <div className="space-y-6 text-[#f5f5f7]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262629] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#00d959]" /> Практические Лабораторные Работы (24 Лабы)
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            Интерактивный симулятор терминала Linux, веб-разработки и AI-агентов
          </p>
        </div>

        {/* Search Input: Apple Pill Style */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Поиск лабораторий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/[0.04] border border-[#333336] rounded-full pl-10 pr-4 py-2 text-xs text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#0071e3] transition-colors"
          />
        </div>
      </div>

      {/* Mobile Block Select Dropdown */}
      <div className="sm:hidden">
        <select
          value={selectedBlockId}
          onChange={(e) => setSelectedBlockId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="w-full bg-[#1c1c1f] border border-[#333336] rounded-full px-4 py-2.5 text-xs font-medium text-[#f5f5f7] focus:outline-none focus:border-[#0071e3]"
        >
          <option value="all">Все 24 Лабы (Все 6 Блоков)</option>
          {COURSE_BLOCKS.map((block) => (
            <option key={block.id} value={block.id}>
              {block.titleRu.split('(')[0].trim()}
            </option>
          ))}
        </select>
      </div>

      {/* Block Tabs: Apple Selector Chips */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => setSelectedBlockId('all')}
          className={`px-4 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
            selectedBlockId === 'all'
              ? 'bg-[#f5f5f7] text-[#1d1d1f]'
              : 'bg-[#000000] border border-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
          }`}
        >
          Все 24 Лабы
        </button>
        {COURSE_BLOCKS.map((block) => (
          <button
            key={block.id}
            onClick={() => setSelectedBlockId(block.id)}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedBlockId === block.id
                ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                : 'bg-[#000000] border border-[#262629] text-[#86868b] hover:text-[#f5f5f7]'
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
              className={`p-5 rounded-[28px] border transition-colors flex flex-col justify-between space-y-4 group ${
                unlocked
                  ? isCompletedByMe
                    ? 'bg-[#161618] border-[#00d959]/30 hover:border-[#00d959]/60'
                    : 'bg-[#161618] border-white/[0.08] hover:border-white/[0.18]'
                  : 'bg-[#0a0a0b] border-[#1c1c1f] opacity-55'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#000000] text-[#00d959] text-[10px] font-medium font-mono border border-[#262629]">
                    ЛАБА #{lab.id} · {lab.estimatedMinutes} мин
                  </span>
                  {unlocked ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        lab.difficulty === 'Hard'
                          ? 'bg-[#311400] text-[#ff791b]'
                          : lab.difficulty === 'Medium'
                          ? 'bg-[#2a2415] text-[#f59e0b]'
                          : 'bg-[#1c2e22] text-[#00d959]'
                      }`}
                    >
                      {lab.difficulty}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1c1c1f] text-[#6e6e73] flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#6e6e73]" /> Закрыта
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#f5f5f7] leading-snug">
                    {lab.title}
                  </h3>
                </div>

                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">{lab.scenario}</p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-[10px] text-[#86868b] font-mono tabular-nums">
                    <span>Задачи: {completedTasksCount}/{totalTasks}</span>
                    <span className="text-[#00d959] font-medium">{pct}%</span>
                  </div>
                  <div className="w-full bg-[#1c1c1f] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00d959] h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#262629] flex items-center justify-between">
                <span className="text-xs text-[#86868b] font-mono flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-[#0071e3]" /> CLI Ready
                </span>
                {unlocked ? (
                  <button
                    onClick={() => {
                      setSelectedLabId(lab.id);
                      setActivePage('lab-detail');
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isCompletedByMe ? 'Повторить' : 'Запустить'}</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-1.5 rounded-full bg-[#1c1c1f] text-[#6e6e73] text-xs font-medium flex items-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Закрыта</span>
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
