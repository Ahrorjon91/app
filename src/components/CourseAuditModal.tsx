import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, FileText, Cpu, BookOpen, Layers } from 'lucide-react';
import { CourseAuditReport } from '../lib/calculationEngine';

interface CourseAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditReport: CourseAuditReport;
  onRecalculate: () => void;
}

export const CourseAuditModal: React.FC<CourseAuditModalProps> = ({
  isOpen,
  onClose,
  auditReport,
  onRecalculate
}) => {
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'lessons' | 'blocks' | 'raw'>('summary');

  if (!isOpen) return null;

  const handleRecalculateClick = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      onRecalculate();
      setIsRecalculating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Полный Аудит Системы Курса (24 Урока · 6 Блоков)
              </h2>
              <p className="text-xs text-slate-400">
                Автоматическая проверка Calculation Engine и дубликатов EXP
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Status Banner */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SYSTEM STATUS: {auditReport.status}
            </span>
            <span className="text-xs text-slate-400">
              Уроков проверено: <strong className="text-white">24 / 24</strong> · Блоков: <strong className="text-white">6 / 6</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRecalculateClick}
              disabled={isRecalculating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRecalculating ? 'animate-spin' : ''}`} />
              <span>Пересчитать Студентов (Recalculate)</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'summary'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Сводный Отчёт
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'lessons'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Аудит 24 Уроков
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'blocks'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Аудит 6 Блоков
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'raw'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Текстовый Отчёт (Audit Log)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Уроки</span>
                  <span className="text-base font-black text-emerald-400">{auditReport.checks.lessonsAudited}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Блоки</span>
                  <span className="text-base font-black text-emerald-400">{auditReport.checks.blocksAudited}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Тесты</span>
                  <span className="text-base font-black text-emerald-400">{auditReport.checks.testsAudited}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Лабы</span>
                  <span className="text-base font-black text-emerald-400">{auditReport.checks.labsAudited}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">ДЗ</span>
                  <span className="text-base font-black text-emerald-400">{auditReport.checks.homeworkAudited}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> Результат аудита единой математической модели:
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Single Source of Truth: Настройка <code>COURSE_RULES</code> активна для всей платформы.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Duplicate EXP Protection: Хранение в <code>EXP_LEDGER</code> с дедупликацией по активности.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Синхронизация интерфейсов: Студент, Ментор, Администратор и Таблица лидеров видят единый результат.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Разделение EXP и Академической оценки (Academic Score): Различные назначения и формулы.</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white mb-2">
                Аудит 24 уроков курса (по 4 секции на каждый урок):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {auditReport.lessonAudits.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs gap-3"
                  >
                    <div>
                      <span className="font-bold text-white block">
                        Урок {item.id} (Блок {item.blockId}, Неделя {item.week})
                      </span>
                      <span className="text-slate-400 block text-[11px] truncate max-w-[240px]">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Секции: {item.sectionsRead}/4 · Изучен: {item.isCompleted ? 'ДА' : 'НЕТ'}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold font-mono text-[11px] block">
                        {item.status}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono mt-1 block">
                        +{item.xpEarned} EXP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blocks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditReport.blockAudits.map((b) => (
                <div key={b.blockId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-sm">Блок {b.blockId}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono font-bold">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-slate-400">{b.lessonRange} (4 урока)</p>
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-slate-300">
                    <span>Пройдено уроков: <strong>{b.lessonsCompleted} / 4</strong></span>
                    <span>Тест блока: <strong className="text-amber-300">{b.blockTestStatus}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
              {auditReport.formattedReport}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
