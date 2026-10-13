import React from 'react';
import { LESSON_DIAGRAMS } from '../data/lessonDiagrams';
import { Sparkles, Network } from 'lucide-react';

interface LessonDiagramProps {
  lessonId: number;
  className?: string;
}

export const LessonDiagram: React.FC<LessonDiagramProps> = ({ lessonId, className = '' }) => {
  const diagram = LESSON_DIAGRAMS[lessonId] || LESSON_DIAGRAMS[1];

  return (
    <div className={`p-5 sm:p-6 md:p-7 rounded-3xl bg-slate-950 border border-slate-800/80 shadow-2xl space-y-5 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/40">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
              {diagram.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              {diagram.subtitle}
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          {diagram.badge}
        </span>
      </div>

      {/* SVG Container */}
      <div className="p-3 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 overflow-x-auto flex justify-center items-center min-h-[160px] shadow-inner">
        <div
          className="w-full flex justify-center max-w-full"
          dangerouslySetInnerHTML={{ __html: diagram.svgContent }}
        />
      </div>

      <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
        <strong className="text-cyan-400 font-bold">Пояснение архитектуры: </strong>
        {diagram.description}
      </p>
    </div>
  );
};
