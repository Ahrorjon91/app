import React, { useState } from 'react';
import { QuizSubmissionResult, QuizAnswerDetail } from '../types';
import { resolveQuizAnswerDetails } from '../lib/quizHelpers';
import {
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  HelpCircle,
  RotateCcw,
  Calendar,
  User,
  Lightbulb,
  Award,
  Filter,
  Check,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface QuizResultReviewModalProps {
  submission: QuizSubmissionResult;
  onClose: () => void;
  onRetake?: (quizId: string) => void;
  canRetake?: boolean;
  retakesLeft?: number;
}

export const QuizResultReviewModal: React.FC<QuizResultReviewModalProps> = ({
  submission,
  onClose,
  onRetake,
  canRetake = false,
  retakesLeft = 0,
}) => {
  const [filter, setFilter] = useState<'all' | 'mistakes' | 'correct'>('all');

  const details: QuizAnswerDetail[] = resolveQuizAnswerDetails(submission);
  const totalCount = details.length || submission.totalQuestions || 20;
  const correctCount = details.filter((d) => d.isCorrect).length;
  const mistakeCount = totalCount - correctCount;

  const filteredDetails = details.filter((item) => {
    if (filter === 'mistakes') return !item.isCorrect;
    if (filter === 'correct') return item.isCorrect;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40 text-[11px] font-mono font-bold uppercase">
                {submission.quizId}
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${
                  submission.passed
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-800/60'
                    : 'bg-rose-950/90 text-rose-300 border-rose-800/60'
                }`}
              >
                {submission.passed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>СДАН • {submission.scorePct}%</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>НЕ СДАН • {submission.scorePct}%</span>
                  </>
                )}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {correctCount} из {totalCount} верно ({submission.scorePct}%)
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {submission.quizTitle || `Тест ${submission.quizId}`}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-0.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{submission.studentName || submission.studentEmail || 'Студент'}</span>
              </span>
              {submission.submittedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{submission.submittedAt}</span>
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shrink-0 border border-slate-700/60"
            title="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Bar & Filter Tabs */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Все вопросы</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">{totalCount}</span>
            </button>
            <button
              onClick={() => setFilter('mistakes')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Ошибки</span>
              <span className="px-1.5 py-0.2 rounded-full bg-rose-950 text-rose-300 text-[10px]">{mistakeCount}</span>
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Верные</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 text-[10px]">{correctCount}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Проходной балл:</span>
            <span className="font-bold text-white font-mono">60%</span>
          </div>
        </div>

        {/* Question Details List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredDetails.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto opacity-60" />
              <p className="text-sm font-bold text-white">В этой категории нет вопросов</p>
              <p className="text-xs text-slate-500">
                {filter === 'mistakes' ? 'Отлично! Вы не допустили ошибок в этом тесте.' : 'Нет записей'}
              </p>
            </div>
          ) : (
            filteredDetails.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3.5 ${
                    item.isCorrect
                      ? 'bg-slate-950/50 border-emerald-900/30 hover:border-emerald-700/50'
                      : 'bg-slate-950/60 border-rose-900/40 hover:border-rose-700/60'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        Вопрос {item.questionId || index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-relaxed">
                        {item.questionText}
                      </h4>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border flex items-center gap-1 shrink-0 ${
                        item.isCorrect
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800/50'
                          : 'bg-rose-950 text-rose-300 border-rose-800/50'
                      }`}
                    >
                      {item.isCorrect ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Верно</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5 text-rose-400" />
                          <span>Ошибка</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Answers breakdown */}
                  <div className="space-y-2 text-xs">
                    {item.isCorrect ? (
                      /* Correct answer block */
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-start gap-2.5 text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                            Ваш правильный выбор:
                          </span>
                          <span className="font-semibold text-white">
                            {item.selectedOptionText || item.correctOptionText}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Mistake breakdown block */
                      <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 flex items-start gap-2.5 text-rose-200">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                              Ваш неверный ответ:
                            </span>
                            <span className="font-semibold text-rose-100 line-through">
                              {item.selectedOptionText || 'Неверный вариант'}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-start gap-2.5 text-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                              Правильный ответ:
                            </span>
                            <span className="font-bold text-white">
                              {item.correctOptionText}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Explanation block */}
                    {item.explanation && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-slate-300">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wider">
                            Пояснение и разбор:
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Подробный разбор теста доступен в любой момент</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* If test failed and retake allowed (1 retake limit) */}
            {!submission.passed && onRetake && (
              canRetake ? (
                <button
                  onClick={() => {
                    onClose();
                    onRetake(submission.quizId);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново (1 попытка)</span>
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs border border-slate-700/60 cursor-not-allowed flex items-center justify-center gap-1.5"
                  title="Попытка пересдачи уже использована"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Попытка исчерпана</span>
                </button>
              )
            )}

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
            >
              Закрыть разбор
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
