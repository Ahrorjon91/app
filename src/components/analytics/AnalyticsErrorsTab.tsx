import React from 'react';
import {
  AlertTriangle,
  RotateCcw,
  BookOpen,
  FlaskConical,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { LessonData, LabData, UserAccount } from '../../types';

interface AnalyticsErrorsTabProps {
  student: UserAccount;
  lessons: LessonData[];
  labs: LabData[];
  homeworks: Record<number, any>;
  testScores: Record<string, any>;
  readSections: Record<string, boolean>;
  onNavigateLesson: (lessonId: number) => void;
  onNavigateQuiz: (quizId: string) => void;
  onNavigateLab: (labId: number) => void;
}

const BLOCK_TEST_CONFIG: Record<string, { title: string; lessonId: number; weakQuestions: string[]; recommendation: string }> = {
  TEST_1: {
    title: 'Тест Блока 1: AI Foundations & Prompt Engineering',
    lessonId: 4,
    weakQuestions: [
      'Архитектура трансформеров, контекстное окно и токены',
      'Фреймворки промптинга: Few-shot, Chain-of-Thought, Meta-prompting',
      'Критерии валидации фактов и минимизация галлюцинаций LLM'
    ],
    recommendation: 'Повторить конспекты Уроков №1–4 и практические формулы промптинга.',
  },
  TEST_2: {
    title: 'Тест Блока 2: Vibe Coding & Разработка в Cursor / Claude',
    lessonId: 8,
    weakQuestions: [
      'Структура правил проекта .cursorrules и системные инструкции',
      'Composer режим, итеративное прототипирование и отладка',
      'Взаимодействие с Git и безопасный деплой веб-приложений'
    ],
    recommendation: 'Повторить практику управления контекстом и спецификаций в Cursor.',
  },
  TEST_3: {
    title: 'Тест Блока 3: AI для Учебы, Аналитики и Second Brain',
    lessonId: 12,
    weakQuestions: [
      'Организация базы знаний в Obsidian и подключение AI-плагинов',
      'Анализ и трансформация структурированных датасетов (Advanced Data Analysis)',
      'Синтез аудиоподкастов и мультимодальный фактчекинг в NotebookLM'
    ],
    recommendation: 'Повторить материал Уроков №9–11 и структуру личной базы знаний.',
  },
  TEST_4: {
    title: 'Тест Блока 4: Генеративные Медиа, Арт и Видеопродакшн',
    lessonId: 16,
    weakQuestions: [
      'Параметры стилизации и веса дескрипторов в Midjourney / Flux',
      'Управление движением камеры и консистентность персонажей в Gen-3/Kling',
      'Клонирование голоса и аудио-мастеринг в ElevenLabs & Suno'
    ],
    recommendation: 'Повторить практику составления медиа-промптов и сторибордов.',
  },
  TEST_5: {
    title: 'Тест Блока 5: Автономные ИИ-агенты, RAG и Автоматизация',
    lessonId: 20,
    weakQuestions: [
      'Пайплайн RAG: чанкинг, эмбеддинги и векторные базы данных',
      'Мультиагентные протоколы взаимодействия и делегирование задач',
      'Автоматизация рабочих сценариев в n8n / Make через Webhooks'
    ],
    recommendation: 'Повторить регламенты настройки интеграций в n8n и структуру RAG-пайплайна.',
  },
  FINAL_EXAM: {
    title: 'Комплексный Финальный Экзамен Курса (AI for LIFE Master)',
    lessonId: 24,
    weakQuestions: [
      'Сквозное проектирование автономных агентных архитектур',
      'Управление качеством и оптимизация затрат на инференс LLM',
      'Комплексная презентация и вывод AI-продукта в релиз'
    ],
    recommendation: 'Пройти повторный обзор всех 6 учебных модулей перед защитой Capstone проекта.',
  },
};

export const AnalyticsErrorsTab: React.FC<AnalyticsErrorsTabProps> = ({
  student,
  lessons,
  labs,
  homeworks,
  testScores,
  readSections,
  onNavigateLesson,
  onNavigateQuiz,
  onNavigateLab,
}) => {
  // Problematic quizzes derived strictly from real student test records
  const problemQuizzes = React.useMemo(() => {
    const list: any[] = [];
    Object.entries(testScores || {}).forEach(([key, scoreObj]: [string, any]) => {
      if (!scoreObj) return;
      const scorePct = typeof scoreObj.scorePct === 'number' ? scoreObj.scorePct : (scoreObj.score ?? 0);
      const isFailed = scoreObj.passed === false || (scorePct < 70 && scoreObj.attempted);
      if (isFailed) {
        const config = BLOCK_TEST_CONFIG[key] || {
          title: `Проверочный тест ${key}`,
          lessonId: 1,
          weakQuestions: ['Концептуальные вопросы модуля и практические задачи'],
          recommendation: 'Повторить соответствующие материалы лекции перед повторной сдачей.',
        };
        list.push({
          testId: key,
          title: config.title,
          lessonId: config.lessonId,
          scorePct,
          passingScore: 70,
          status: 'Failed',
          attempts: scoreObj.attempts || 1,
          weakQuestions: config.weakQuestions,
          recommendation: config.recommendation,
        });
      }
    });
    return list;
  }, [testScores]);

  // Incomplete / Pending / Returned homeworks
  const problemHomeworks = Object.entries(homeworks)
    .filter(([_, hw]: [string, any]) => hw && (hw.status === 'Needs Revision' || hw.status === 'Rejected' || hw.status === 'Under Review'))
    .map(([lessonId, hw]: [string, any]) => ({
      lessonId: Number(lessonId),
      title: lessons.find((l) => l.id === Number(lessonId))?.title || `Урок #${lessonId}`,
      status: hw.status,
      feedback: hw.feedback || 'Требуется дополнить отчет скриншотами вывода команд и конфигурационного файла.',
      submittedAt: hw.submittedAt,
    }));

  // Labs needing attention
  const problemLabs = labs
    .filter((l) => (l.submissionStatus as any) === 'Needs Revision' || l.submissionStatus === 'Under Review' || l.submissionStatus === 'Rejected')
    .map((lab) => ({
      labId: lab.id,
      title: lab.title,
      status: lab.submissionStatus,
      feedback: (lab as any).feedback || (lab as any).mentorFeedback || 'Лабораторная находится на ревью ментора.',
    }));

  // Unread sections only in unlocked/active lessons
  const unlockedCount = student.unlockedLessonsCount || Math.max(1, (student.completedLessonsCount || 0) + 1);
  const unreadLessons = lessons
    .filter((l) => l.id <= unlockedCount)
    .map((l) => {
      const secPrefix = `sec-${l.id}-`;
      const missing = [
        { id: `${secPrefix}lecture`, title: 'Теоретическая лекция' },
        { id: `${secPrefix}lab`, title: 'Практическая лаборатория' },
        { id: `${secPrefix}quiz`, title: 'Проверочный квиз' },
        { id: `${secPrefix}hw`, title: 'Методичка домашнего задания' },
      ].filter((sec) => !readSections[sec.id] && !readSections[sec.id.replace('hw', 'homework')]);
      return { lesson: l, missing };
    })
    .filter((item) => item.missing.length > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Центр Работы над Ошибками и Повторения Материала
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Здесь собраны все модули, в которых балл тестирования оказался ниже проходного норматива (70%), возвращенные на доработку домашние задания и непрочитанные теоретические блоки.
          </p>
        </div>
      </div>

      {/* Problem Quizzes Section */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-rose-500" />
          Тесты, Требующие Пересдачи (Балл &lt; 70%)
        </h3>

        {problemQuizzes.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-emerald-500/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Задолженностей по тестам нет
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Все пройденные проверочные тесты сданы с положительным баллом (выше порога 70%).
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {problemQuizzes.map((quiz, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-rose-200 dark:border-rose-900/30 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        Не сдан • {quiz.scorePct}%
                      </span>
                      <span className="text-xs text-slate-400">
                        Порог сдачи: {quiz.passingScore}% • Попытка: #{quiz.attempts}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {quiz.title}
                    </h4>
                  </div>

                  <button
                    id={`retake-quiz-btn-${quiz.testId}`}
                    onClick={() => onNavigateQuiz(quiz.testId)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 transition-all self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Пересдать Тест
                  </button>
                </div>

                {/* Weak Questions Identified */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Вопросы с ошибками (пробелы в знаниях):
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {quiz.weakQuestions.map((q: string, qIdx: number) => (
                      <li key={qIdx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendation */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Совет ментора:</strong>
                    {quiz.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Homeworks & Labs Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Homework Reviews */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-500" />
            Замечания Ментора по Домашним Заданиям
          </h3>

          {problemHomeworks.length > 0 ? (
            <div className="space-y-3">
              {problemHomeworks.map((hw, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Урок #{hw.lessonId}: {hw.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {hw.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 italic bg-white dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    «{hw.feedback}»
                  </p>
                  <button
                    onClick={() => onNavigateLesson(hw.lessonId)}
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    Перейти к доработке задания <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
              Все проверенные домашние задания успешно одобрены без замечаний!
            </div>
          )}
        </div>

        {/* Labs Feedback */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-500" />
            Статус Практических Лабораторных
          </h3>

          {problemLabs.length > 0 ? (
            <div className="space-y-3">
              {problemLabs.map((lab, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Лаба #{lab.labId}: {lab.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {lab.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    {lab.feedback}
                  </p>
                  <button
                    onClick={() => onNavigateLab(lab.labId)}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 text-[11px]"
                  >
                    Открыть отчет лаборатории <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
              Все сданные лабораторные работы защищены и зачтены!
            </div>
          )}
        </div>
      </div>

      {/* Remediation Action Plan */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-white/5 space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Пошаговый План Ликвидации Академической Задолженности
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-xs">
              1
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white">
              {problemQuizzes.length > 0 ? 'Повторное тестирование' : 'Тестирование в норме'}
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {problemQuizzes.length > 0
                ? `Пройти пересдачу тестов (${problemQuizzes.map((q) => q.title).join(', ')}) после повторения конспектов.`
                : 'Все сданные квизы и проверочные тесты пройдены с положительным баллом.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-xs">
              2
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white">
              {problemHomeworks.length > 0
                ? 'Доработка заданий'
                : problemLabs.length > 0
                ? 'Лабораторные стенды'
                : 'Практика выполнена'}
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {problemHomeworks.length > 0
                ? `Внести исправления по замечаниям ментора в ${problemHomeworks.length} ДЗ и повторно отправить на ревью.`
                : problemLabs.length > 0
                ? `Завершить выполнение практических чек-листов (${problemLabs.length} лаб).`
                : 'Все проверенные лабораторные и практические задания зачтены.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black flex items-center justify-center text-xs">
              3
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white">
              Консультация ментора
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              При возникновении трудностей с учебной программой запишитесь на 1-на-1 разбор в разделе «Консультации».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
