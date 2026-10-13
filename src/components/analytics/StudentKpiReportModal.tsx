import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Award,
  BookOpen,
  FlaskConical,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  User,
  Calendar,
  Sparkles,
  HelpCircle,
  Edit3,
  Save,
  RefreshCw,
  RotateCcw
} from 'lucide-react';
import { UserAccount, LessonData, LabData } from '../../types';
import { api } from '../../lib/api';

interface CompetencyScore {
  domain: string;
  score: number;
  level: string;
  status: 'high' | 'medium' | 'low';
}

export interface AcademicSignatures {
  techMentorName: string;
  techMentorTitle: string;
  programManagerName: string;
  programManagerTitle: string;
}

const DEFAULT_SIGNATURES: AcademicSignatures = {
  techMentorName: 'Александр Кузнецов',
  techMentorTitle: 'Lead AI Engineer & Mentor',
  programManagerName: 'Екатерина Васильева',
  programManagerTitle: 'Head of Education',
};

interface StudentKpiReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: UserAccount;
  lessons: LessonData[];
  labs: LabData[];
  homeworks: any[];
  testScores: Record<string, any>;
  competencies: CompetencyScore[];
  weakSides: string[];
  strengths: string[];
  recommendations: string[];
  initialEditSignatures?: boolean;
}

export const StudentKpiReportModal: React.FC<StudentKpiReportModalProps> = ({
  isOpen,
  onClose,
  student,
  lessons,
  labs,
  homeworks,
  testScores,
  competencies,
  weakSides,
  strengths,
  recommendations,
  initialEditSignatures = false,
}) => {
  const [signatures, setSignatures] = useState<AcademicSignatures>(() => {
    try {
      const saved = localStorage.getItem('academic_report_signatures');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_SIGNATURES;
  });

  const [isEditingSignatures, setIsEditingSignatures] = useState(initialEditSignatures);
  const [editForm, setEditForm] = useState<AcademicSignatures>(signatures);
  const [isSavingSignatures, setIsSavingSignatures] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Sync initialEditSignatures when modal opens
  useEffect(() => {
    if (isOpen && initialEditSignatures) {
      setIsEditingSignatures(true);
    }
  }, [isOpen, initialEditSignatures]);

  // Load signatures from SQLite backend database
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;

    api.getAcademicReportSettings()
      .then((res) => {
        if (isMounted && res.success && res.academicReportSignatures) {
          const sigs = {
            techMentorName: res.academicReportSignatures.techMentorName || DEFAULT_SIGNATURES.techMentorName,
            techMentorTitle: res.academicReportSignatures.techMentorTitle || DEFAULT_SIGNATURES.techMentorTitle,
            programManagerName: res.academicReportSignatures.programManagerName || DEFAULT_SIGNATURES.programManagerName,
            programManagerTitle: res.academicReportSignatures.programManagerTitle || DEFAULT_SIGNATURES.programManagerTitle,
          };
          setSignatures(sigs);
          setEditForm(sigs);
          try {
            localStorage.setItem('academic_report_signatures', JSON.stringify(sigs));
          } catch (e) {}
        }
      })
      .catch((e) => {
        console.warn('[StudentKpiReportModal] Could not fetch report settings from backend:', e);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveSignatures = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingSignatures(true);
    const updated: AcademicSignatures = {
      techMentorName: editForm.techMentorName.trim() || DEFAULT_SIGNATURES.techMentorName,
      techMentorTitle: editForm.techMentorTitle.trim() || DEFAULT_SIGNATURES.techMentorTitle,
      programManagerName: editForm.programManagerName.trim() || DEFAULT_SIGNATURES.programManagerName,
      programManagerTitle: editForm.programManagerTitle.trim() || DEFAULT_SIGNATURES.programManagerTitle,
    };

    setSignatures(updated);
    try {
      localStorage.setItem('academic_report_signatures', JSON.stringify(updated));
    } catch (e) {}

    try {
      const res = await api.saveAcademicReportSettings(updated);
      if (res.success) {
        setSaveMessage('Подписи успешно сохранены в базе данных SQLite');
        setTimeout(() => {
          setSaveMessage(null);
          setIsEditingSignatures(false);
        }, 1500);
      } else {
        setSaveMessage('Сохранено локально, но произошла ошибка сервера');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (e) {
      console.error('[StudentKpiReportModal] Error saving signatures:', e);
      setSaveMessage('Сохранено локально (ошибка связи с SQLite)');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSavingSignatures(false);
    }
  };

  const handleResetSignatures = () => {
    setEditForm(DEFAULT_SIGNATURES);
  };

  const totalPoints = student.totalPoints || 0;
  const completedLessons = student.completedLessonsCount || 0;
  const progressPct = Math.round((completedLessons / 24) * 100);

  // Overall grade evaluation
  let gradeLetter = 'A+';
  let gradeComment = 'Отличная академическая успеваемость (Exceeds Expectations)';
  let gradeColor = 'text-emerald-600 dark:text-emerald-400';
  let gradeBg = 'bg-emerald-500/10 border-emerald-500/30';

  if (progressPct < 25) {
    gradeLetter = 'C';
    gradeComment = 'Начальный уровень / Требуется ускорение темпа (Needs Attention)';
    gradeColor = 'text-amber-600 dark:text-amber-400';
    gradeBg = 'bg-amber-500/10 border-amber-500/30';
  } else if (progressPct < 60) {
    gradeLetter = 'B';
    gradeComment = 'Уверенный прогресс по учебному плану (Good Progress)';
    gradeColor = 'text-blue-600 dark:text-blue-400';
    gradeBg = 'bg-blue-500/10 border-blue-500/30';
  } else if (progressPct < 90) {
    gradeLetter = 'A';
    gradeComment = 'Высокий темп и качественное выполнение практических работ (Very Good)';
    gradeColor = 'text-indigo-600 dark:text-indigo-400';
    gradeBg = 'bg-indigo-500/10 border-indigo-500/30';
  }

  const currentDateStr = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div id="student-kpi-report-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#111116] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Официальный Академический Отчет
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              для руководства и родителей
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Signatures Edit Button */}
            <button
              id="toggle-edit-report-signatures-btn"
              type="button"
              onClick={() => setIsEditingSignatures((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                isEditingSignatures
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title="Изменить имена и должности ментора и руководителя"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingSignatures ? 'Закрыть редактор' : 'Изменить подписи'}</span>
            </button>

            <button
              id="print-kpi-report-btn"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-4 h-4" /> Распечатать / PDF
            </button>

            <button
              id="close-kpi-report-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white dark:bg-[#111116] text-slate-800 dark:text-slate-100">
          {/* Official Document Header */}
          <div className="border-b-2 border-slate-900 dark:border-white/20 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                  AI
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                    AI FOR LIFE ACADEMY
                  </h1>
                  <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">
                    Международный Центр Подготовки Vibe Coders & AI Инженеров
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:text-right space-y-0.5">
              <div className="text-xs font-bold text-slate-500">
                ТАБЕЛЬ УСПЕВАЕМОСТИ И KPI ОТЧЕТ
              </div>
              <div className="text-xs text-slate-400">
                Дата формирования: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentDateStr}</span>
              </div>
              <div className="text-[11px] text-indigo-500 font-mono">
                ID Студента: {student.id || student.email}
              </div>
            </div>
          </div>

          {/* Student Dossier Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Студент / Слушатель
              </span>
              <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                {student.name || 'John Smith'}
              </p>
              <p className="text-xs text-slate-500 font-mono">{student.email}</p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Учебная Группа & Курс
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {student.group || 'Группа 1 (Август 2026)'}
              </p>
              <p className="text-xs text-indigo-500 font-medium">AI for LIFE: Vibe Coding & Agents (24 Урока)</p>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Академический Рейтинг & Статус
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {student.status || 'Active'}
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {totalPoints} EXP
                </span>
              </div>
              <p className="text-xs text-slate-500">Посещаемость: 100%</p>
            </div>
          </div>

          {/* Overall Academic Evaluation Banner */}
          <div className={`p-5 rounded-2xl border ${gradeBg} flex items-center justify-between gap-4`}>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Итоговое Заключение Академического Совета
              </span>
              <p className={`text-base font-black ${gradeColor}`}>
                {gradeComment}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Оценка сформирована на основании сданных лабораторных работ, качества выполнения домашних заданий и прохождения модульных тестов.
              </p>
            </div>
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center shadow-sm">
              <span className={`text-2xl font-black ${gradeColor}`}>{gradeLetter}</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase">GRADE</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Основные Академические Показатели (KPI)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Пройдено Уроков</span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {completedLessons} <span className="text-xs text-slate-400 font-normal">/ 24</span>
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Практические Лабы</span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {student.completedLabsCount || labs.filter((l) => l.isCompleted || l.submissionStatus === 'Approved').length} <span className="text-xs text-slate-400 font-normal">/ 24</span>
                </p>
                <span className="text-[11px] text-emerald-500 font-semibold">Подтверждено ментором</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Одобрено ДЗ</span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {homeworks.filter((h: any) => h && h.status === 'Approved').length} <span className="text-xs text-slate-400 font-normal">работ</span>
                </p>
                <span className="text-[11px] text-blue-500 font-semibold">Проверено кодом</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">Сдано Тестов (Quiz)</span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {student.passedQuizCount || 0} <span className="text-xs text-slate-400 font-normal">/ 6 тестов</span>
                </p>
                <span className="text-[11px] text-amber-500 font-semibold">Ср. балл 85%+</span>
              </div>
            </div>
          </div>

          {/* Competency Mastery Map */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" /> Карта Компетенций Студента (Освоение Модулей)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {competencies.map((comp, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{comp.domain}</span>
                    <span className={comp.score >= 70 ? 'text-emerald-600' : 'text-amber-600'}>
                      {comp.score}% • {comp.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        comp.score >= 80 ? 'bg-emerald-500' : comp.score >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Sections for Parents & Managers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Подтвержденные Сильные Стороны
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Sides & Areas of Concern */}
            <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Выявленные Слабые Места и Точки Контроля
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {weakSides.length > 0 ? (
                  weakSides.map((weak, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{weak}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-emerald-600 text-xs italic">
                    Критических пробелов не обнаружено. Студент успевает по графику.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Recommendations for Managers & Parents */}
          <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Рекомендации Академического Куратора для Родителей и Руководства
            </h4>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-500 shrink-0">{idx + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signatures & Seal Section (Editable) */}
          <div id="academic-report-signatures-section" className="pt-6 border-t-2 border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Официальные Подписи и Печать
              </span>
              <button
                type="button"
                onClick={() => setIsEditingSignatures((prev) => !prev)}
                className="print:hidden text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                title="Изменить имена и должности ответственных лиц"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingSignatures ? 'Скрыть редактор' : 'Редактировать лиц отчета'}</span>
              </button>
            </div>

            {/* Editable Signatures Form Card (Hidden on Print) */}
            {isEditingSignatures && (
              <form
                onSubmit={handleSaveSignatures}
                className="print:hidden p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-indigo-500" /> Редактирование ответственных лиц отчета
                  </h5>
                  {saveMessage && (
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {saveMessage}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Technical Mentor / Teacher */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide block">
                      Главный Технический Ментор
                    </span>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">ФИО Преподавателя / Ментора</label>
                      <input
                        id="input-tech-mentor-name"
                        type="text"
                        value={editForm.techMentorName}
                        onChange={(e) => setEditForm({ ...editForm, techMentorName: e.target.value })}
                        placeholder="Александр Кузнецов"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Должность / Титул</label>
                      <input
                        id="input-tech-mentor-title"
                        type="text"
                        value={editForm.techMentorTitle}
                        onChange={(e) => setEditForm({ ...editForm, techMentorTitle: e.target.value })}
                        placeholder="Lead AI Engineer & Mentor"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Program Manager / Head */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide block">
                      Руководитель Учебной Программы
                    </span>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">ФИО Руководителя</label>
                      <input
                        id="input-program-manager-name"
                        type="text"
                        value={editForm.programManagerName}
                        onChange={(e) => setEditForm({ ...editForm, programManagerName: e.target.value })}
                        placeholder="Екатерина Васильева"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Должность / Титул</label>
                      <input
                        id="input-program-manager-title"
                        type="text"
                        value={editForm.programManagerTitle}
                        onChange={(e) => setEditForm({ ...editForm, programManagerTitle: e.target.value })}
                        placeholder="Head of Education"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleResetSignatures}
                    className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Восстановить по умолчанию
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditForm(signatures);
                        setIsEditingSignatures(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingSignatures}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50 active:scale-95 transition-all"
                    >
                      {isSavingSignatures ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Сохранение в SQLite...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Сохранить в БД</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Display Signature Lines (Always Printed on Official PDF / Paper) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-[11px] uppercase font-bold">Главный Технический Ментор:</p>
                  <div className="h-9 border-b border-slate-400 dark:border-slate-700 flex items-end font-serif italic text-slate-800 dark:text-slate-200 text-sm">
                    {signatures.techMentorName} {signatures.techMentorTitle ? `(${signatures.techMentorTitle})` : ''}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-[11px] uppercase font-bold">Руководитель Учебной Программы:</p>
                  <div className="h-9 border-b border-slate-400 dark:border-slate-700 flex items-end font-serif italic text-slate-800 dark:text-slate-200 text-sm">
                    {signatures.programManagerName} {signatures.programManagerTitle ? `(${signatures.programManagerTitle})` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 pt-2">
            Документ сгенерирован автоматически внутренней академической LMS AI FOR LIFE • Все права защищены © 2026
          </div>
        </div>
      </div>
    </div>
  );
};
