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
  Layers,
  RotateCcw,
  Eye
} from 'lucide-react';

export const FinalExamPage: React.FC = () => {
  const {
    isQuizUnlocked,
    courseCompletionStatus,
    setSelectedQuizId,
    setActivePage,
    testScores,
    quizSubmissions,
    canRetakeQuiz,
    recordQuizRetake,
    profile
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
      color: 'text-[#0071e3]'
    },
    {
      label: 'Лабораторные работы (1–24)',
      current: courseCompletionStatus.labsApproved,
      total: 24,
      isDone: courseCompletionStatus.labsApproved >= 24,
      icon: Terminal,
      color: 'text-[#30d158]'
    },
    {
      label: 'Домашние задания (1–24)',
      current: courseCompletionStatus.hwApproved,
      total: 24,
      isDone: courseCompletionStatus.hwApproved >= 24,
      icon: FileText,
      color: 'text-[#ff791a]'
    },
    {
      label: 'Мини-тесты к урокам (24 теста)',
      current: courseCompletionStatus.miniTestsPassed,
      total: 24,
      isDone: courseCompletionStatus.miniTestsPassed >= 24,
      icon: Zap,
      color: 'text-[#ffd60a]'
    },
    {
      label: 'Проекты Блоков (6 проектов)',
      current: courseCompletionStatus.blockTestsPassed,
      total: 6,
      isDone: courseCompletionStatus.blockTestsPassed >= 6,
      icon: Award,
      color: 'text-[#bf5af2]'
    }
  ];

  const examBlocksSummary = [
    {
      blockNum: 1,
      title: 'Блок 1: Основы ИИ и Мастерство Промптинга',
      lessons: 'Уроки 1–4',
      questionsCount: 10,
      topics: 'Архитектура LLM, токенизация, формулы RTFC / Few-Shot / Chain of Thought, фактчекинг, ИИ-персонажи (Худжанд-2050)'
    },
    {
      blockNum: 2,
      title: 'Блок 2: Вайб-кодинг — Создание веб-приложений',
      lessons: 'Уроки 5–8',
      questionsCount: 10,
      topics: 'Cursor IDE, HTML5/CSS3/Tailwind, адаптивные сетки, состояние и интерактивность, Git + GitHub, деплой на Vercel (Lighthouse 90+)'
    },
    {
      blockNum: 3,
      title: 'Блок 3: Продуктивность, Deep Research и High-End дизайн',
      lessons: 'Уроки 9–12',
      questionsCount: 10,
      topics: 'Claude Artifacts, Deep Research отчеты, UI/UX микро-анимации, генерация фотореалистичных ассетов Midjourney/Flux, Figma в код'
    },
    {
      blockNum: 4,
      title: 'Блок 4: Мультистраничные сайты и Scrollytelling',
      lessons: 'Уроки 13–16',
      questionsCount: 10,
      topics: 'Сброс скролла и мультистраничность, импорт в Google AI Studio Build, кнопка WhatsApp (wa.me), scrollytelling, WebP медиа-оптимизация и Definition of Done'
    },
    {
      blockNum: 5,
      title: 'Блок 5: Веб-приложения, API и автоматизация',
      lessons: 'Уроки 17–20',
      questionsCount: 10,
      topics: 'Формула User-Input-Logic-Data-Result, PWA, Local Storage vs State, REST API, встроенный ИИ с System Prompt, сценарии n8n и Telegram-бот'
    },
    {
      blockNum: 6,
      title: 'Блок 6: Capstone-продукт, безопасность и Demo Day',
      lessons: 'Уроки 21–24',
      questionsCount: 10,
      topics: 'Спецификация MVP, Framer Motion и тосты Sonner, защита API-ключей (.env, серверный прокси), Open Graph мета, питч на Demo Day и сертификация'
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
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-[#ff791a]/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#311400] text-[#ff791a] border border-[#ff791a]/40 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Итоговая Международная Сертификация AI for LIFE Master</span>
          </div>

          {finalExamScore && (
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                  finalExamPassed
                    ? 'bg-[#002a14] text-[#30d158] border-[#30d158]/40'
                    : 'bg-[#2a0808] text-[#ff453a] border-[#ff453a]/40'
                }`}
              >
                {finalExamPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#30d158]" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ff453a]" />
                )}
                <span>Результат: <strong className="font-mono tabular-nums">{finalExamScore.scorePct}%</strong> ({finalExamPassed ? 'Сдан успешно' : 'Не сдан'})</span>
              </span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight">
          Финальный Комплексный Экзамен: AI for LIFE Master (60 Вопросов)
        </h1>
        <p className="text-sm text-[#86868b] leading-relaxed max-w-4xl">
          Итоговая аттестация охватывает <strong className="text-[#f5f5f7]">все 24 урока</strong> программы курса{' '}
          <span className="text-[#f5f5f7] font-semibold">AI for LIFE: Vibe Coding & Agentic AI</span>: от фундаментальных основ LLM,
          мастерства промптинга (RTFC, Few-Shot, CoT) и креативного медиа-ИИ до вайб-кодинга в Cursor и Google AI Studio Build,
          scrollytelling-лендингов, веб-анимаций, интеграции n8n и Telegram-ботов, безопасности секретных API-ключей (.env, серверный прокси),
          деплоя на Vercel и публичной защиты Capstone-проекта на Demo Day.
        </p>

        <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-[#86868b]">
          <span className="px-3 py-1.5 rounded-xl bg-[#1c1c1e] border border-white/[0.08] font-mono tabular-nums text-[#f5f5f7] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0071e3]" /> 90 минут на экзамен
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#1c1c1e] border border-white/[0.08] font-mono tabular-nums text-[#30d158] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Порог: 85% (минимум 51/60)
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#1c1c1e] border border-white/[0.08] font-mono tabular-nums text-[#ff791a] flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> +500 EXP в профиль
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#1c1c1e] border border-white/[0.08] font-mono tabular-nums text-[#bf5af2] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 6 Блоков • по 10 вопросов
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Rules & Exam Action */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rules Card */}
          <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-5">
            <h3 className="text-base font-semibold text-[#f5f5f7] border-b border-white/[0.08] pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff791a]" />
              <span>Регламент и правила сдачи Финального Экзамена</span>
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#86868b]">
              <li className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#f5f5f7]">
                  <Clock className="w-4 h-4 text-[#0071e3]" />
                  <span>Время: 90 минут</span>
                </div>
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  Таймер запускается сразу после старта тестирования. На каждый вопрос дается в среднем 1.5 минуты.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#30d158]">
                  <Award className="w-4 h-4" />
                  <span>Порог: 85% (51/60)</span>
                </div>
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  При успешной сдаче система автоматически выписывает официальный Сертификат выпускника курса.
                </p>
              </li>

              <li className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#bf5af2]">
                  <RotateCcw className="w-4 h-4" />
                  <span>2 попытки сдачи</span>
                </div>
                <p className="text-[11px] text-[#86868b] leading-relaxed">
                  В зачёт идёт наивысший полученный балл. Перед второй попыткой рекомендуем повторить конспекты.
                </p>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
              {unlocked ? (
                <>
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-[#ff791a] hover:bg-[#e66c15] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95 shadow-sm"
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
                      className="py-3.5 px-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] border border-white/[0.1] font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
                    >
                      <Eye className="w-4 h-4 text-[#86868b]" />
                      <span>Анализ ошибок и ответов</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full space-y-2">
                  <button
                    disabled
                    className="w-full py-3.5 rounded-2xl bg-white/[0.04] text-[#86868b] font-medium text-xs border border-white/[0.08] flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4 text-[#86868b]" />
                    <span>Экзамен заблокирован (требуется сдать все 24 урока, лабы, ДЗ, мини-тесты и 6 проектов блоков)</span>
                  </button>
                  <p className="text-[11px] text-[#86868b] text-center">
                    Выполните критерии допуска в панели справа, чтобы разблокировать доступ к сертификации.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Syllabus Structure of the Exam (6 Blocks x 10 Questions) */}
          <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-semibold text-[#f5f5f7] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff791a]" />
                <span>Тематическая структура экзамена (6 Блоков • 60 Вопросов)</span>
              </h3>
              <span className="text-xs text-[#86868b] font-mono tabular-nums">10 вопросов на блок</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examBlocksSummary.map((b) => (
                <div
                  key={b.blockNum}
                  className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#f5f5f7] uppercase tracking-wide">{b.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono tabular-nums text-[#86868b]">
                      {b.lessons}
                    </span>
                  </div>
                  <p className="text-xs text-[#86868b] leading-relaxed">{b.topics}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono tabular-nums text-[#86868b] border-t border-white/[0.06]">
                    <span>Вопросов в тесте:</span>
                    <span className="font-semibold text-[#f5f5f7]">10 из 60</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Admission Criteria & Requirements */}
        <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-4 text-xs h-fit">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-semibold text-[#f5f5f7]">Критерии допуска к экзамену</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                unlocked
                  ? 'bg-[#002a14] text-[#30d158] border-[#30d158]/40'
                  : 'bg-[#311400] text-[#ff791a] border-[#ff791a]/40'
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
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                    c.isDone
                      ? 'bg-[#1c1c1e] border-[#30d158]/30'
                      : 'bg-[#1c1c1e] border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 ${c.color}`} />
                    <span className="text-[#f5f5f7] font-medium">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono tabular-nums text-xs ${c.isDone ? 'text-[#30d158] font-semibold' : 'text-[#86868b]'}`}>
                      {c.current} / {c.total}
                    </span>
                    {c.isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#30d158] shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {courseCompletionStatus.finalExamMissingRequirements.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#311400]/40 border border-[#ff791a]/30 text-xs text-[#ff791a] space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Осталось для открытия допуска:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#86868b] pl-1">
                {courseCompletionStatus.finalExamMissingRequirements.map((req: string, idx: number) => (
                  <li key={idx} className="text-[#f5f5f7]">{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-1 text-xs text-[#86868b]">
            <span className="font-semibold text-[#f5f5f7] block">Сертификат выпускника:</span>
            <p className="leading-relaxed">
              При успешной сдаче экзамена с баллом 85% и выше в разделе «Сертификаты» становится доступен
              международный сертификат с QR-кодом верификации.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
