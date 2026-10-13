import React, { useState } from 'react';
import {
  Home,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Wand2
} from 'lucide-react';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

interface Lesson11HomeworkSectionProps {
  onHomeworkSubmitted?: () => void;
}

export const Lesson11HomeworkSection: React.FC<Lesson11HomeworkSectionProps> = ({ onHomeworkSubmitted }) => {
  const [fiveUxDecisions, setFiveUxDecisions] = useState('');
  const [stitchImprovements, setStitchImprovements] = useState('');
  const [exportedConfirmed, setExportedConfirmed] = useState<'yes' | 'no' | null>('yes');
  const [diarySaved, setDiarySaved] = useState(false);

  return (
    <div className="space-y-8 text-slate-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase mb-2">
            <Home className="w-3.5 h-3.5" /> Домашнее задание · Урок 5 (Google Stitch & Tesla Model X)
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Проект в Google Stitch: «Сначала дизайн. Потом код.»
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Опиши 5 найденных UX-решений Tesla Model X, улучши и исправь макет в Google Stitch (сгенерируй новые картинки или кнопки), сохрани проект и экспортируй!
          </p>
        </div>
      </div>

      {/* Homework Form */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-cyan-400" /> Чек-лист подготовки домашнего проекта
          </h3>
          <span className="text-xs font-mono text-cyan-400">Idea → UX → UI → Prototype → Code</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cyan-300 uppercase">
              1. PART 1 — 5 UX decisions на сайте Tesla Model X:
            </label>
            <textarea
              rows={4}
              value={fiveUxDecisions}
              onChange={(e) => setFiveUxDecisions(e.target.value)}
              placeholder="Перечисли 5 UX-решений (Hero, Typography, Whitespace, Storytelling: Interior->Exterior->Performance->Utility->Charging->Safety, CTA, Specification Cards)..."
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-300 uppercase">
              2. PART 2 & LAB — Что улучшено в Google Stitch (картинки, кнопки, иерархия):
            </label>
            <textarea
              rows={4}
              value={stitchImprovements}
              onChange={(e) => setStitchImprovements(e.target.value)}
              placeholder="Опиши, как ты применил промпт улучшения визуальной иерархии, какие картинки или кнопки обновил и как экспортировал проект..."
              className="w-full p-3 rounded-xl bg-black/60 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="text-xs text-slate-400">Проект сохранён и экспортирован из Google Stitch?</div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setExportedConfirmed('yes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                exportedConfirmed === 'yes'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-black/50 border-slate-700 text-slate-400'
              }`}
            >
              ✓ Да, проект сохранён и экспортирован!
            </button>
            <button
              type="button"
              onClick={() => setExportedConfirmed('no')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                exportedConfirmed === 'no'
                  ? 'bg-amber-950 border-amber-500 text-amber-300'
                  : 'bg-black/50 border-slate-700 text-slate-400'
              }`}
            >
              ⚠️ В процессе доработки макета
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDiarySaved(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>{diarySaved ? 'Заметки сохранены в черновик ✓' : 'Сохранить заметки перед отправкой'}</span>
        </button>
      </div>

      {/* Official Homework Submission Component */}
      <InlineHomeworkSubmission
        lessonId={5}
        onSubmitted={onHomeworkSubmitted}
      />
    </div>
  );
};
