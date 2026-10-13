import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, X, Check, ShieldAlert, User, Users } from 'lucide-react';
import { UserAccount } from '../../types';

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudent: UserAccount | null;
  onReset: (targetStudentEmail?: string) => Promise<void>;
}

export const ResetProgressModal: React.FC<ResetProgressModalProps> = ({
  isOpen,
  onClose,
  selectedStudent,
  onReset,
}) => {
  const [resetScope, setResetScope] = useState<'student' | 'all'>('student');
  const [confirmPhrase, setConfirmPhrase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const targetName = selectedStudent?.name || selectedStudent?.email || 'Студент';
  const targetEmail = selectedStudent?.email;

  const handleConfirm = async () => {
    if (resetScope === 'all' && confirmPhrase !== 'СБРОСИТЬ ВСЕ') {
      setErrorMessage('Введите фразу "СБРОСИТЬ ВСЕ" для подтверждения');
      return;
    }
    if (resetScope === 'student' && !targetEmail) {
      setErrorMessage('Не выбран студент для сброса');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      if (resetScope === 'student' && targetEmail) {
        await onReset(targetEmail);
      } else {
        await onReset(undefined);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка при сбросе данных');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="reset-progress-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#14141B] rounded-3xl border border-rose-200 dark:border-rose-900/40 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-rose-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Сброс Академической Успеваемости
              </h3>
              <p className="text-xs text-slate-500">
                Очистка набранных баллов, сданных ДЗ, тестов и лабораторных
              </p>
            </div>
          </div>
          <button
            id="close-reset-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Warning Banner */}
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 flex items-start gap-3 text-xs leading-relaxed">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-1">Внимание: Действие необратимо!</strong>
              Будут удалены все записи об изученных разделах, сданных лабораторных, оценках тестов и баллы опыта (EXP) в базе данных SQLite.
            </div>
          </div>

          {/* Scope Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Выберите область сброса:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="reset-scope-student-btn"
                type="button"
                onClick={() => setResetScope('student')}
                disabled={!selectedStudent}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  resetScope === 'student'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                } ${!selectedStudent ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center gap-1.5 text-xs font-bold">
                  <User className="w-4 h-4" /> Текущий студент
                </span>
                <span className="text-[11px] truncate text-slate-500 dark:text-slate-400">
                  {targetName}
                </span>
              </button>

              <button
                id="reset-scope-all-btn"
                type="button"
                onClick={() => setResetScope('all')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  resetScope === 'all'
                    ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5 text-xs font-bold">
                  <Users className="w-4 h-4" /> Весь поток (Все студенты)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Полная очистка курса
                </span>
              </button>
            </div>
          </div>

          {/* Details on what will be reset */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              {resetScope === 'student'
                ? `Будет сброшена успеваемость студента: ${targetEmail}`
                : 'Будет сброшена успеваемость ВСЕХ студентов курса'}
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <li>Обнуление очков опыта EXP до 0</li>
              <li>Сброс статусов 24 уроков и прочитанных разделов лекций</li>
              <li>Удаление сданных ДЗ, отчетов лаб и результатов квизов</li>
              <li>Логирование операции в Журнал Аудита академии</li>
            </ul>
          </div>

          {/* Type to confirm if resetting all */}
          {resetScope === 'all' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-rose-600 dark:text-rose-400">
                Для подтверждения введите фразу <span className="font-mono bg-rose-500/10 px-1.5 py-0.5 rounded">СБРОСИТЬ ВСЕ</span>:
              </label>
              <input
                id="reset-confirm-phrase-input"
                type="text"
                value={confirmPhrase}
                onChange={(e) => setConfirmPhrase(e.target.value)}
                placeholder="СБРОСИТЬ ВСЕ"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-rose-300 dark:border-rose-900 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-xs text-rose-500 font-semibold">{errorMessage}</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            id="cancel-reset-btn"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Отмена
          </button>
          <button
            id="confirm-reset-btn"
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || (resetScope === 'all' && confirmPhrase !== 'СБРОСИТЬ ВСЕ')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            {resetScope === 'student' ? 'Сбросить успеваемость студента' : 'Сбросить успеваемость всех'}
          </button>
        </div>
      </div>
    </div>
  );
};
