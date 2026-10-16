import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { COURSE_BLOCKS, FINAL_EXAM_QUIZ } from '../data/syllabusData';
import { QuizResultReviewModal } from '../components/QuizResultReviewModal';
import { QuizSubmissionResult } from '../types';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Play,
  Lock,
  BookOpen,
  Terminal,
  FileText,
  Zap,
  Sparkles,
  Layers,
  Code2,
  Rocket,
  Check,
  RotateCcw,
  Eye,
  ExternalLink
} from 'lucide-react';

export const FinalExamPage: React.FC = () => {
  const {
    stats,
    isQuizUnlocked,
    courseCompletionStatus,
    setSelectedQuizId,
    setActivePage,
    testScores,
    quizSubmissions,
    canRetakeQuiz,
    recordQuizRetake,
    profile,
    currentCourseId,
    currentCourse
  } = usePortal() as any;

  const unlocked = isQuizUnlocked('FINAL_EXAM');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const finalExamSub = (quizSubmissions || []).find(
    (q: any) => q && (q.quizId === 'FINAL_EXAM' || q.quizId === 'FINAL')
  );
  const finalExamScore = testScores?.['FINAL_EXAM'] || (finalExamSub ? {
    scorePct: typeof finalExamSub.scorePct === 'number' ? finalExamSub.scorePct : (finalExamSub.passed ? 100 : 0),
    passed: Boolean(finalExamSub.passed),
    completedAt: finalExamSub.submittedAt || '',
  } : undefined);

  const finalExamPassed = Boolean(finalExamScore?.passed || (finalExamScore?.scorePct && finalExamScore.scorePct >= 85));
  const canRetake = canRetakeQuiz('FINAL_EXAM');

  const criteria = [
    {
      label: 'Уроки курса (Лекции 1–24)',
      current: courseCompletionStatus.lessonsCompleted,
      total: 24,
      isDone: courseCompletionStatus.lessonsCompleted >= 24,
      icon: BookOpen,
      color: 'text-indigo-400'
    },
    {
      label: 'Лабораторные работы (1–24)',
      current: courseCompletionStatus.labsApproved,
      total: 24,
      isDone: courseCompletionStatus.labsApproved >= 24,
      icon: Terminal,
      color: 'text-cyan-400'
    },
    {
      label: 'Домашние задания (1–24)',
      current: courseCompletionStatus.hwApproved,
      total: 24,
      isDone: courseCompletionStatus.hwApproved >= 24,
      icon: FileText,
      color: 'text-emerald-400'
    },
    {
      label: 'Мини-тесты к урокам (24 теста)',
      current: courseCompletionStatus.miniTestsPassed,
      total: 24,
      isDone: courseCompletionStatus.miniTestsPassed >= 24,
      icon: Zap,
      color: 'text-amber-400'
    },
    {
      label: 'Проекты Блоков (6 проектов)',
      current: courseCompletionStatus.blockTestsPassed,
      total: 6,
      isDone: courseCompletionStatus.blockTestsPassed >= 6,
      icon: Award,
      color: 'text-purple-400'
    }
  ];

  const examBlocksSummary = [
    {
      blockNum: 1,
      title: 'Блок 1: Основы ИИ и Мастерство Промптинга',
      lessons: 'Уроки 1–4',
      questionsCount: 10,
      topics: 'Архитектура LLM, токенизация, формулы RTFC / Few-Shot / Chain of Thought, фактчекинг, ИИ-персонажи (Худжанд-2050)',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
    },
    {
      blockNum: 2,
      title: 'Блок 2: Вайб-кодинг — Создание веб-приложений',
      lessons: 'Уроки 5–8',
      questionsCount: 10,
      topics: 'Cursor IDE, HTML5/CSS3/Tailwind, адаптивные сетки, состояние и интерактивность, Git + GitHub, деплой на Vercel (Lighthouse 90+)',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    },
    {
      blockNum: 3,
      title: 'Блок 3: Продуктивность, Deep Research и High-End дизайн',
      lessons: 'Уроки 9–12',
      questionsCount: 10,
      topics: 'Second Brain (Notion/Obsidian), глубокий поиск Perplexity/Gemini, аналитические дашборды, DESIGN.md (styles.refero.design), сайт на $1M (iPhone 18 Pro Burgundy)',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
    },
    {
      blockNum: 4,
      title: 'Блок 4: Мультистраничные проекты, AI Studio Build и веб-анимации',
      lessons: 'Уроки 13–16',
      questionsCount: 10,
      topics: 'Сброс скролла и мультистраничность, импорт в Google AI Studio Build, кнопка WhatsApp (wa.me), scrollytelling, WebP медиа-оптимизация и Definition of Done',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
    },
    {
      blockNum: 5,
      title: 'Блок 5: Веб-приложения, API и автоматизация',
      lessons: 'Уроки 17–20',
      questionsCount: 10,
      topics: 'Формула User-Input-Logic-Data-Result, PWA, Local Storage vs State, REST API, встроенный ИИ с System Prompt, сценарии n8n и Telegram-бот',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
    },
    {
      blockNum: 6,
      title: 'Блок 6: Capstone-продукт, безопасность и Demo Day',
      lessons: 'Уроки 21–24',
      questionsCount: 10,
      topics: 'Спецификация MVP, Framer Motion и тосты Sonner, защита API-ключей (.env, серверный прокси), Open Graph мета, питч на Demo Day и сертификация',
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300'
    }
  ];

  const handleStartExam = () => {
    setSelectedQuizId('FINAL_EXAM');
    setActivePage('quiz-runner');
  };

  const handleRetakeExam = () => {
    recordQuizRetake('FINAL_EXAM');
    setSelectedQuizId('FINAL_EXAM');
    setActivePage('quiz-runner');
  };

  const submissionForModal: QuizSubmissionResult = finalExamSub || {
    id: `QUIZ-SUB-FINAL_EXAM-${(profile?.id || 'USR-STU-01').replace(/[^a-zA-Z0-9]/g, '')}`,
    quizId: 'FINAL_EXAM',
    quizTitle: FINAL_EXAM_QUIZ.title,
    studentName: profile?.name || 'Студент',
    studentId: profile?.id || 'USR-STU-01',
    studentEmail: profile?.email || 'student@devopspro.tech',
    submittedAt: finalExamScore?.completedAt || new Date().toLocaleString('ru-RU'),
    scorePct: finalExamScore?.scorePct ?? 0,
    passed: Boolean(finalExamPassed),
    correctCount: Math.round(((finalExamScore?.scorePct ?? 0) / 100) * 60),
    totalQuestions: 60,
    timeSpentSeconds: 3200,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Review Modal */}
      {reviewModalOpen && (
        <QuizResultReviewModal
          submission={submissionForModal}
          onClose={() => setReviewModalOpen(false)}
          onRetake={() => {
            setReviewModalOpen(false);
            handleRetakeExam();
          }}
          canRetake={canRetake}
        />
      )}

      {/* Hero Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-amber-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Итоговая Международная Сертификация AI for LIFE Master</span>
          </div>

          {finalExamScore && (
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                  finalExamPassed
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-950 text-rose-300 border-rose-500/50'
                }`}
              >
                {finalExamPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>Результат: {finalExamScore.scorePct}% ({finalExamPassed ? 'Сдан успешно' : 'Не сдан'})</span>
              </span>
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Финальный Комплексный Экзамен: {currentCourse.shortName} Master (60 Вопросов)
        </h1>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-4xl">
          Итоговая аттестация охватывает <strong className="text-white">все 24 урока</strong> программы курса{' '}
          <span className={`${currentCourse.colorScheme.text} font-semibold`}>{currentCourse.title}</span>.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-cyan-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> 90 минут на экзамен
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Порог: 85% (минимум 51/60 правильных)
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-amber-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" /> +500 EXP в профиль
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 font-mono text-purple-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" /> 6 Блоков • по 10 вопросов на блок
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Rules & Exam Action */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rules Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Регламент и правила сдачи Финального Экзамена</span>
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <li className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Время: 90 минут</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Таймер запускается сразу после старта тестирования. На каждый вопрос дается в среднем 1.5 минуты.
                </p>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Порог: 85% (51/60)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  При успешной сдаче система автоматически выписывает официальный Сертификат выпускника курса.
                </p>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-purple-300">
                  <RotateCcw className="w-4 h-4 text-purple-400" />
                  <span>2 попытки сдачи</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  В зачёт идёт наивысший полученный балл. Перед второй попыткой рекомендуем повторить конспекты.
                </p>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-3">
              {unlocked ? (
                <>
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {finalExamScore ? 'Сдать повторно (Пересдача экзамена)' : 'Начать Экзаменационное Тестирование (60 вопросов)'}
                    </span>
                  </button>

                  {finalExamScore && (
                    <button
                      type="button"
                      onClick={() => setReviewModalOpen(true)}
                      className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>Анализ ошибок и ответов</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full space-y-2">
                  <button
                    disabled
                    className="w-full py-3.5 rounded-2xl bg-slate-800 text-slate-500 font-extrabold text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span>Экзамен заблокирован (требуется сдать все 24 урока, лабы, ДЗ, мини-тесты и 6 проектов блоков)</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center">
                    Выполните критерии допуска в панели справа, чтобы разблокировать доступ к сертификации.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Syllabus Structure of the Exam (6 Blocks x 10 Questions) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Тематическая структура экзамена (6 Блоков • 60 Вопросов)</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">10 вопросов на блок</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examBlocksSummary.map((b) => (
                <div
                  key={b.blockNum}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${b.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">{b.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-mono font-bold">
                      {b.lessons}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{b.topics}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
                    <span>Вопросов в тесте:</span>
                    <span className="font-bold text-white">10 из 60</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admission Criteria & Requirements */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs shadow-xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Критерии допуска к экзамену</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                unlocked
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                  : 'bg-amber-950 text-amber-300 border border-amber-800/40'
              }`}
            >
              {unlocked ? 'Допущен к сдаче' : 'В процессе'}
            </span>
          </div>

          <div className="space-y-2.5">
            {criteria.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div
                  key={i}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    c.isDone
                      ? 'bg-slate-800/60 border-emerald-500/30'
                      : 'bg-slate-800/30 border-slate-700/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${c.color}`} />
                    <span className="text-slate-300 font-medium">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono font-bold ${c.isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {c.current} / {c.total}
                    </span>
                    {c.isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {courseCompletionStatus.finalExamMissingRequirements.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200/90 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Осталось для открытия допуска:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                {courseCompletionStatus.finalExamMissingRequirements.map((req: string, idx: number) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1 text-[11px] text-slate-300">
            <span className="font-bold text-purple-300 block">Сертификат выпускника:</span>
            <p className="text-slate-400 leading-relaxed">
              При успешной сдаче экзамена с баллом 85% и выше в разделе «Сертификаты» становится доступен
              международный сертификат с QR-кодом верификации.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
