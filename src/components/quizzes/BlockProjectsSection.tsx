import React, { useState, useEffect } from 'react';
import { usePortal } from '../../context/PortalContext';
import { COURSE_BLOCKS, INITIAL_LESSONS } from '../../data/syllabusData';
import confetti from 'canvas-confetti';
import {
  Rocket,
  FolderGit2,
  Github,
  Globe,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  X,
  Eye,
  Award,
  Layers,
  Sparkles,
  Send,
  Check,
  Edit3,
  MessageSquare,
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
  Zap,
  Code2,
  Copy,
  UserCheck
} from 'lucide-react';

export interface BlockProjectData {
  blockId: number;
  projectNumber: number;
  projectCode: string;
  lessonId: number;
  lessonRange: string;
  blockTitle: string;
  projectTitle: string;
  projectSubtitle: string;
  syllabusDescription: string;
  deliverables: string[];
  tools: string[];
  xpReward: number;
  defaultGithub: string;
  defaultVercel: string;
  mentorTip: string;
}

export const DETAILED_BLOCK_PROJECTS: BlockProjectData[] = [
  {
    blockId: 1,
    projectNumber: 1,
    projectCode: 'PROJECT_1',
    lessonId: 4,
    lessonRange: 'Уроки 1–4',
    blockTitle: 'Блок 1: Основы ИИ и искусство промптинга',
    projectTitle: 'Проект 1: «ИИ-Художник, Персонаж и Prompt-система»',
    projectSubtitle: 'AI Artist, Character Designer & Prompt System (Урок #4: Худжанд-2050)',
    syllabusDescription:
      'Создание визуального героя курса и концепт-арта города будущего «Худжанд-2050» в Midjourney, Ideogram, Flux и DALL-E 3. Разработка мастер-системы промптов (формулы RTFC, Few-Shot, CoT, негативные промпты), оформление интерактивной веб-витрины персонажей, публикация репозитория на GitHub и деплой на Vercel.',
    deliverables: [
      'Паспорт ИИ-персонажа (роль, стиль, визуальные константы, концепт Худжанд-2050)',
      'Инженерная коллекция из 5+ промптов с параметрами (--ar, --v, --style, отрицания)',
      'Открытый GitHub-репозиторий с исходным кодом веб-галереи и README.md',
      'Рабочий живой сайт на Vercel с адаптивной версткой и демонстрацией работ',
    ],
    tools: ['Midjourney / Ideogram / Flux', 'HTML5 / CSS3 / React', 'GitHub', 'Vercel'],
    xpReward: 150,
    defaultGithub: 'https://github.com/ai-for-life/khujand-2050-character-prompt',
    defaultVercel: 'https://khujand-2050-ai.vercel.app',
    mentorTip: 'Проверьте консистентность персонажа на всех артах и наличие ссылки на GitHub в футере сайта.',
  },
  {
    blockId: 2,
    projectNumber: 2,
    projectCode: 'PROJECT_2',
    lessonId: 8,
    lessonRange: 'Уроки 5–8',
    blockTitle: 'Блок 2: Визуальный и креативный ИИ',
    projectTitle: 'Проект 2: «🚀 Publisher: Git + GitHub + Мой сайт LIVE!»',
    projectSubtitle: 'Live Web Portfolio & Deploy (Урок #8: Публикация в интернет и Linux)',
    syllabusDescription:
      'Первый полноценный деплой веб-проекта в интернет: инициализация Git-репозитория, фиксация осмысленных коммитов, создание удаленного репозитория на GitHub, подключение автоматического CI/CD деплоя в Vercel с бесплатным SSL-сертификатом HTTPS, фавиконом и мобильной оптимизацией.',
    deliverables: [
      'Публичный репозиторий на GitHub с понятной историей коммитов и файлом README.md',
      'Активный LIVE-сайт на Vercel с собственным HTTPS-доменом (.vercel.app)',
      'Адаптивная верстка (Mobile First) с проверкой в Google Lighthouse (Performance 90+)',
      'Настроенный Favicon, заголовок и мета-теги Open Graph для красивых превью в мессенджерах',
    ],
    tools: ['Git CLI', 'GitHub', 'Vercel CI/CD', 'Vite / React', 'Tailwind CSS'],
    xpReward: 150,
    defaultGithub: 'https://github.com/ai-for-life/publisher-my-live-site',
    defaultVercel: 'https://my-live-site-publisher.vercel.app',
    mentorTip: 'Убедитесь, что билд проходит без ошибок (`npm run build`) и в README указана ссылка на live demo.',
  },
  {
    blockId: 3,
    projectNumber: 3,
    projectCode: 'PROJECT_3',
    lessonId: 12,
    lessonRange: 'Уроки 9–12',
    blockTitle: 'Блок 3: Вайб-кодинг — сайты с помощью ИИ',
    projectTitle: 'Проект 3: «💎 Сайт на $1 000 000 — iPhone 18 Pro Burgundy»',
    projectSubtitle: 'High-End Vibe Coding Landing Page with DESIGN.md System (Урок #12)',
    syllabusDescription:
      'Разработка ультра-премиального интерактивного промо-сайта смартфона iPhone 18 Pro Burgundy в AI Studio по спецификации DESIGN.md (styles.refero.design): темная глубокая эстетика, интерактивный конфигуратор моделей и цветов (Burgundy, Deep Space, Natural Titanium), калькулятор рассрочки и предзаказ.',
    deliverables: [
      'Дизайн-система по стандарту DESIGN.md: палитра Deep Burgundy, микро-градиенты, стеклянные карточки',
      'Интерактивный конфигуратор смартфона (выбор памяти 256GB/512GB/1TB, цвета и аксессуаров)',
      'Динамический калькулятор предзаказа с расчетом ежемесячной выплаты и валидацией формы',
      'Чистый репозиторий на GitHub и мгновенно открывающийся деплой на Vercel',
    ],
    tools: ['AI Studio', 'React / TypeScript', 'Tailwind CSS', 'Lucide Icons', 'GitHub', 'Vercel'],
    xpReward: 150,
    defaultGithub: 'https://github.com/ai-for-life/iphone-18-pro-burgundy-showcase',
    defaultVercel: 'https://styles.refero.design',
    mentorTip: 'Особое внимание уделите плавной смене цветов устройства и работе калькулятора рассрочки.',
  },
  {
    blockId: 4,
    projectNumber: 4,
    projectCode: 'PROJECT_4',
    lessonId: 16,
    lessonRange: 'Уроки 13–16',
    blockTitle: 'Блок 4: Анимированные сайты и интерактивный веб',
    projectTitle: 'Проект 4: «🚀 Мини-агентство: Коммерческий сайт для бизнеса»',
    projectSubtitle: 'Real-World Business Website: Zero to Hero (Урок #16)',
    syllabusDescription:
      'Создание продающего веб-сайта для реального местного бизнеса (кофейня, ресторан, клиника, сервис): сбор контента через Google Maps, честные отзывы, интерактивное меню/прайс, кнопки прямого звонка (Click-to-Call), переход в WhatsApp и интерактивная карта.',
    deliverables: [
      'Полноценная коммерческая структура (Hero, Каталог/Услуги, О компании, Отзывы, Контакты)',
      'Кнопки прямого действия: быстрый звонок («Позвонить»), чат в WhatsApp, маршрут на Google Maps',
      'Интерактивная форма заявки/бронирования столика с подтверждением',
      'Задеплоенный продакшен-сайт на Vercel и оформленный открытый репозиторий на GitHub',
    ],
    tools: ['React', 'Tailwind CSS', 'Google Maps Embed', 'WhatsApp API Link', 'GitHub', 'Vercel'],
    xpReward: 150,
    defaultGithub: 'https://github.com/ai-for-life/local-business-fast-site',
    defaultVercel: 'https://khujand-coffee-roasters.vercel.app',
    mentorTip: 'Проверьте кликабельность телефонного номера (tel:) и корректность ссылки WhatsApp c предзаполненным текстом.',
  },
  {
    blockId: 5,
    projectNumber: 5,
    projectCode: 'PROJECT_5',
    lessonId: 20,
    lessonRange: 'Уроки 17–20',
    blockTitle: 'Блок 5: ИИ-приложения, боты и автоматизация',
    projectTitle: 'Проект 5: «🤖 n8n с нуля: Автоматизация и Telegram-бот»',
    projectSubtitle: 'n8n Automation Pipeline, Webhooks & Smart Telegram Bot (Урок #20)',
    syllabusDescription:
      'Проектирование и запуск автоматизированного ИИ-пайплайна: интерактивный веб-интерфейс отправляет данные через Webhook в сценарий n8n / Make, ИИ обрабатывает запрос, отправляет мгновенное уведомление в Telegram-бот и сохраняет данные в базу.',
    deliverables: [
      'Архитектура автоматизации: Веб-сайт → Webhook → n8n Pipeline → Telegram-бот',
      'Работающий Telegram-бот с интерактивным меню, командами и быстрыми ответами',
      'Веб-панель мониторинга заявок и истории срабатываний сценариев',
      'Открытый GitHub репозиторий и живой веб-сервис на Vercel',
    ],
    tools: ['n8n', 'Telegram Bot API', 'Webhooks', 'REST API', 'React', 'GitHub', 'Vercel'],
    xpReward: 150,
    defaultGithub: 'https://github.com/ai-for-life/n8n-telegram-smart-pipeline',
    defaultVercel: 'https://n8n-lead-automation.vercel.app',
    mentorTip: 'Продемонстрируйте видео или скриншот срабатывания вебхука в n8n и приход сообщения в Telegram.',
  },
  {
    blockId: 6,
    projectNumber: 6,
    projectCode: 'PROJECT_6_CAPSTONE',
    lessonId: 24,
    lessonRange: 'Уроки 21–24',
    blockTitle: 'Блок 6: От прототипа к реальному продукту (Capstone)',
    projectTitle: 'Проект 6 (Capstone): «🎓 Выпускной ИИ-продукт на Demo Day»',
    projectSubtitle: 'Full-Stack Production AI Product, Pitch & Certification (Урок #24)',
    syllabusDescription:
      'Главный выпускной проект курса AI for LIFE: доведение продукта до продакшена, серверный прокси для API-ключей, база данных, адаптивный интерфейс, 2-минутный питч на Demo Day и финальное подтверждение Ментором курса с выдачей Международного Сертификата.',
    deliverables: [
      'Полнофункциональный задеплоенный Full-Stack AI-продукт на Vercel (Production HTTPS)',
      'Защищенная архитектура без утечки ключей (.env, серверный прокси, валидация данных)',
      'Чистый GitHub репозиторий с подробным README, скриншотами и архитектурной схемой',
      'Презентация и успешная защита на Demo Day + подтверждение Ментора курса',
    ],
    tools: ['Next.js / React + Vite', 'Agentic AI', 'TypeScript', 'Tailwind', 'GitHub', 'Vercel'],
    xpReward: 200,
    defaultGithub: 'https://github.com/ai-for-life/ai-agentic-capstone-prod',
    defaultVercel: 'https://vibe-agentic-capstone.vercel.app',
    mentorTip: 'Главный выпускной проект! Защита перед жюри и менторами, проверка безопасности API-ключей.',
  },
];

export const BlockProjectsSection: React.FC = () => {
  const {
    profile,
    lessons,
    labs,
    homeworkSubmissions,
    submitHomework,
    reviewHomework,
    addNotification,
    isLessonUnlocked,
    setSelectedLessonId,
    setSelectedLabId,
    setActivePage,
    setSelectedQuizId,
  } = usePortal() as any;

  const emailLower = (profile?.email || '').toLowerCase().trim();
  const isMentorOrAdmin = profile?.role === 'admin' || profile?.role === 'mentor';

  // Toggle mentor simulation mode so only Mentors or Admins can toggle and review. For students it is always false.
  const [mentorMode, setMentorMode] = useState<boolean>(isMentorOrAdmin);

  useEffect(() => {
    setMentorMode(Boolean(isMentorOrAdmin));
  }, [isMentorOrAdmin]);

  // Link form states for each lesson: lessonId -> { github: string, vercel: string, notes: string }
  const [projectForms, setProjectForms] = useState<Record<number, { github: string; vercel: string; notes: string }>>(() => {
    const initial: Record<number, { github: string; vercel: string; notes: string }> = {};
    DETAILED_BLOCK_PROJECTS.forEach((proj) => {
      let savedGh = '';
      let savedVc = '';
      let savedNotes = '';
      try {
        savedGh = localStorage.getItem(`project_github_${proj.lessonId}`) || '';
        savedVc = localStorage.getItem(`project_vercel_${proj.lessonId}`) || '';
        savedNotes = localStorage.getItem(`project_notes_${proj.lessonId}`) || '';
      } catch {}

      // Check existing homeworkSubmissions
      const sub = (homeworkSubmissions || []).find(
        (h: any) => h.lessonId === proj.lessonId && (!h.studentEmail || !emailLower || h.studentEmail.toLowerCase() === emailLower)
      );
      if (sub) {
        if (!savedGh) savedGh = sub.githubUrl || sub.repoUrl || '';
        if (!savedVc) savedVc = sub.demoUrl || sub.fileUrl || '';
        if (!savedNotes) savedNotes = sub.studentNotes || sub.reportText || '';
      }

      initial[proj.lessonId] = {
        github: savedGh,
        vercel: savedVc,
        notes: savedNotes,
      };
    });
    return initial;
  });

  // Responsive device view state for live preview: lessonId -> 'desktop' | 'tablet' | 'mobile'
  const [deviceViews, setDeviceViews] = useState<Record<number, 'desktop' | 'tablet' | 'mobile'>>({
    4: 'desktop',
    8: 'desktop',
    12: 'desktop',
    16: 'desktop',
    20: 'desktop',
    24: 'desktop',
  });

  // Iframe reload keys: lessonId -> number
  const [iframeReloadKeys, setIframeReloadKeys] = useState<Record<number, number>>({});

  // Fullscreen modal for previewing a specific project live
  const [fullscreenPreviewLessonId, setFullscreenPreviewLessonId] = useState<number | null>(null);

  // Mentor Review Editing state: lessonId -> { score: number, feedback: string }
  const [mentorFeedbackDrafts, setMentorFeedbackDrafts] = useState<Record<number, { score: number; feedback: string }>>({
    4: { score: 100, feedback: 'Отличный визуальный концепт и оформление промптов! Галерея работает быстро.' },
    8: { score: 100, feedback: 'Репозиторий на GitHub оформлен по стандартам, Vercel CI/CD настроен безупречно.' },
    12: { score: 100, feedback: 'Великолепная темная эстетика iPhone 18 Pro Burgundy! Калькулятор и конфигуратор работают без сбоев.' },
    16: { score: 100, feedback: 'Реальный коммерческий сайт! Кнопка звонка и чат в WhatsApp настроены идеально.' },
    20: { score: 100, feedback: 'Сценарий n8n и Telegram-бот проверены. Уведомления приходят мгновенно.' },
    24: { score: 100, feedback: 'Блестящий Capstone-проект! Полный Full-Stack продакшен, безопасность на высоте. Поздравляю!' },
  });

  // Copy status feedback
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedLink(text);
      setTimeout(() => setCopiedLink(null), 2500);
    } catch {}
  };

  const handleFormChange = (lessonId: number, field: 'github' | 'vercel' | 'notes', val: string) => {
    setProjectForms((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [field]: val,
      },
    }));
  };

  const handleSaveAndSubmit = async (proj: BlockProjectData) => {
    const current = projectForms[proj.lessonId] || { github: '', vercel: '', notes: '' };
    const gh = current.github.trim();
    const vc = current.vercel.trim();
    const notes = current.notes.trim();

    if (!gh && !vc) {
      addNotification('Пожалуйста, укажите хотя бы ссылку на GitHub или Vercel перед отправкой!', 'error');
      return;
    }

    try {
      localStorage.setItem(`project_github_${proj.lessonId}`, gh);
      localStorage.setItem(`project_vercel_${proj.lessonId}`, vc);
      localStorage.setItem(`project_notes_${proj.lessonId}`, notes);
    } catch {}

    const payloadNotes = `Проект Блока #${proj.blockId} («${proj.projectTitle}»). Ссылка GitHub: ${gh} | Ссылка Vercel: ${vc}. Комментарий студента: ${notes}`;

    await submitHomework(proj.lessonId, vc || gh, payloadNotes, []);

    // Refresh reload key for iframe
    setIframeReloadKeys((prev) => ({ ...prev, [proj.lessonId]: (prev[proj.lessonId] || 0) + 1 }));

    addNotification(
      `Ссылки на GitHub и Vercel по Проекту #${proj.projectNumber} успешно сохранены и отправлены ментору на подтверждение!`,
      'success'
    );
  };

  const handleFillDemo = (proj: BlockProjectData) => {
    setProjectForms((prev) => ({
      ...prev,
      [proj.lessonId]: {
        github: proj.defaultGithub,
        vercel: proj.defaultVercel,
        notes: `Демонстрационный релиз проекта «${proj.projectTitle}». Код проверен на GitHub, веб-приложение развернуто на Vercel.`,
      },
    }));
    try {
      localStorage.setItem(`project_github_${proj.lessonId}`, proj.defaultGithub);
      localStorage.setItem(`project_vercel_${proj.lessonId}`, proj.defaultVercel);
      localStorage.setItem(
        `project_notes_${proj.lessonId}`,
        `Демонстрационный релиз проекта «${proj.projectTitle}». Код проверен на GitHub, веб-приложение развернуто на Vercel.`
      );
    } catch {}
    setIframeReloadKeys((prev) => ({ ...prev, [proj.lessonId]: (prev[proj.lessonId] || 0) + 1 }));
    addNotification(`Примеры ссылок для Проекта #${proj.projectNumber} успешно подставлены!`, 'info');
  };

  const handleMentorConfirm = async (proj: BlockProjectData, isApproved: boolean) => {
    if (!isMentorOrAdmin) {
      addNotification('Действие подтверждения проекта доступно только Менторам и Администраторам.', 'error');
      return;
    }

    const draft = mentorFeedbackDrafts[proj.lessonId] || {
      score: 100,
      feedback: isApproved ? 'Проект подтвержден ментором! Отличная работа.' : 'Требуются доработки.',
    };

    const status = isApproved ? 'Approved' : 'Rejected';
    const score = isApproved ? draft.score : 0;
    const feedback = draft.feedback;

    await reviewHomework(proj.lessonId, status, score, feedback, emailLower || 'student@devopspro.tech');

    if (isApproved) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
      addNotification(
        `🎉 Ментор подтвердил Проект #${proj.projectNumber} («${proj.projectTitle}»)! Начислено +${proj.xpReward} EXP!`,
        'success'
      );
    } else {
      addNotification(
        `Проект #${proj.projectNumber} возвращен на доработку с комментарием ментора.`,
        'info'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-5 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Rocket className="w-5 h-5 text-purple-400" />
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">
              6 Проектов по Блокам Программы (5 Курсовых + 1 Capstone)
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Добавляйте и обновляйте ссылки на <span className="text-cyan-300 font-semibold">GitHub-репозиторий</span> и{' '}
            <span className="text-purple-300 font-semibold">деплой на Vercel</span>. Проект сразу отображается{' '}
            <span className="text-emerald-400 font-bold">в прямом эфире LIVE</span> прямо на странице, после чего Ментор подтверждает защиту!
          </p>
        </div>

        {/* Mentor Simulation Mode Switcher - Only shown to Mentors and Admins, completely removed for Students */}
        {isMentorOrAdmin && (
          <div className="flex items-center gap-3 shrink-0 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <div className="text-right">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <span>Режим Ментора</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {mentorMode ? 'Проверка & Подтверждение' : 'Режим Просмотра'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMentorMode((prev) => !prev)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                mentorMode ? 'bg-purple-600' : 'bg-slate-800'
              }`}
              title="Переключить режим ментора для быстрого подтверждения проектов"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  mentorMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {DETAILED_BLOCK_PROJECTS.map((proj) => {
          const blockData = COURSE_BLOCKS.find((b) => b.id === proj.blockId);
          const blockLessons = (lessons && lessons.length > 0 ? lessons : INITIAL_LESSONS).filter(
            (l: any) => l.blockId === proj.blockId
          );
          const projectLesson = blockLessons.find((l: any) => l.id === proj.lessonId);
          const unlocked = isLessonUnlocked(proj.lessonId);

          const projectHw = (homeworkSubmissions || []).find(
            (h: any) =>
              h.lessonId === proj.lessonId &&
              (!h.studentEmail || !emailLower || h.studentEmail.toLowerCase() === emailLower)
          );

          const formState = projectForms[proj.lessonId] || { github: '', vercel: '', notes: '' };
          const activeGithub = formState.github || projectHw?.githubUrl || projectHw?.repoUrl || '';
          const activeVercel = formState.vercel || projectHw?.demoUrl || projectHw?.fileUrl || '';

          const isApproved = projectHw?.status === 'Approved' || Boolean(projectLesson?.isCompleted);
          const isSubmitted = projectHw?.status === 'Submitted' || Boolean(activeGhOrVc(activeGithub, activeVercel));
          const isRejected = projectHw?.status === 'Rejected';

          const currentDevice = deviceViews[proj.lessonId] || 'desktop';
          const iframeKey = iframeReloadKeys[proj.lessonId] || 0;

          return (
            <div
              key={proj.projectCode}
              id={`block-project-${proj.projectNumber}`}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isApproved
                  ? 'bg-slate-900/95 border-emerald-500/50 shadow-2xl shadow-emerald-950/20'
                  : isSubmitted
                  ? 'bg-slate-900/95 border-purple-500/40 shadow-2xl shadow-purple-950/20'
                  : 'bg-slate-900/80 border-slate-800 shadow-xl'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/80 to-purple-950/20">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60 text-xs font-mono font-bold flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{proj.projectCode}</span>
                      <span>•</span>
                      <span>УРОК #{proj.lessonId}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-mono font-medium">
                      {proj.lessonRange}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/50 text-xs font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>+{proj.xpReward} EXP</span>
                    </span>
                  </div>

                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider pt-1">
                    {blockData?.titleRu || proj.blockTitle}
                  </div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    {proj.projectTitle}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono">{proj.projectSubtitle}</p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {isApproved ? (
                    <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-500/60 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Проект Подтверждён Ментором</span>
                    </div>
                  ) : isRejected ? (
                    <div className="px-3.5 py-1.5 rounded-2xl bg-rose-950 text-rose-300 border border-rose-500/60 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <span>Требует Доработки Ментора</span>
                    </div>
                  ) : isSubmitted ? (
                    <div className="px-3.5 py-1.5 rounded-2xl bg-amber-950 text-amber-300 border border-amber-500/60 text-xs font-bold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>На Проверке Ментором</span>
                    </div>
                  ) : (
                    <div className="px-3.5 py-1.5 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-slate-400" />
                      <span>Ожидает Ссылок (Не отправлен)</span>
                    </div>
                  )}

                  {!unlocked && (
                    <span className="px-2.5 py-1 rounded-xl bg-slate-800/80 text-slate-400 text-xs border border-slate-700 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Урок #{proj.lessonId} закрыт</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                {/* Basic Information & Description */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                    <span className="font-bold text-white block mb-1">📋 Основная информация по проекту:</span>
                    {proj.syllabusDescription}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2">
                      <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span>Чек-лист сдачи проекта:</span>
                      </div>
                      <ul className="space-y-1.5">
                        {proj.deliverables.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Code2 className="w-4 h-4 text-cyan-400" />
                          <span>Стек и технологии:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {proj.tools.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-amber-300/90 flex items-start gap-1.5 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-amber-200">Совет ментора:</strong> {proj.mentorTip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Github & Vercel Links Form */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-purple-400" />
                      <h4 className="text-sm font-bold text-white">
                        Ссылки на проект: GitHub репозиторий & Vercel LIVE деплой
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFillDemo(proj)}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-all flex items-center gap-1.5 w-fit cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Вставить демо-ссылки проекта</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* GitHub Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-slate-300" />
                          <span>Ссылка на GitHub репозиторий:</span>
                        </span>
                        {activeGithub && (
                          <a
                            href={activeGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] font-mono hover:underline"
                          >
                            <span>Открыть GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formState.github}
                          onChange={(e) => handleFormChange(proj.lessonId, 'github', e.target.value)}
                          placeholder="https://github.com/username/project-name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Vercel Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-purple-400" />
                          <span>Ссылка на Vercel деплой (LIVE сайт):</span>
                        </span>
                        {activeVercel && (
                          <a
                            href={activeVercel}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-[11px] font-mono hover:underline"
                          >
                            <span>Открыть Vercel</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={formState.vercel}
                          onChange={(e) => handleFormChange(proj.lessonId, 'vercel', e.target.value)}
                          placeholder="https://my-project-name.vercel.app"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>Комментарий студента к проекту (особенности, что было реализовано):</span>
                    </label>
                    <input
                      type="text"
                      value={formState.notes}
                      onChange={(e) => handleFormChange(proj.lessonId, 'notes', e.target.value)}
                      placeholder="Опишите, какие фичи реализованы, особенности промптов или архитектуры..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  {/* Save and Submit Action Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      {isApproved ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Проект подтверждён Ментором!
                        </span>
                      ) : isSubmitted ? (
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Ссылки сохранены и переданы на проверку
                        </span>
                      ) : (
                        <span>Заполните ссылки и нажмите кнопку справа</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveAndSubmit(proj)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitted ? 'Обновить ссылки проекта' : 'Сохранить ссылки & Сдать проект'}</span>
                    </button>
                  </div>
                </div>

                {/* Section: DIRECTLY LIVE PROJECT VIEWPORT */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Прямой эфир проекта (Live Project Preview)</span>
                      </h4>
                      {activeVercel && (
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[11px] font-mono">
                          LIVE
                        </span>
                      )}
                    </div>

                    {/* Viewport & Controls */}
                    {activeVercel && (
                      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                        {/* Device Toggles */}
                        <button
                          type="button"
                          onClick={() => setDeviceViews((prev) => ({ ...prev, [proj.lessonId]: 'desktop' }))}
                          className={`p-1.5 rounded-lg transition-all ${
                            currentDevice === 'desktop'
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title="Десктоп (100% ширина)"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeviceViews((prev) => ({ ...prev, [proj.lessonId]: 'tablet' }))}
                          className={`p-1.5 rounded-lg transition-all ${
                            currentDevice === 'tablet'
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title="Планшет (768px ширина)"
                        >
                          <Tablet className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeviceViews((prev) => ({ ...prev, [proj.lessonId]: 'mobile' }))}
                          className={`p-1.5 rounded-lg transition-all ${
                            currentDevice === 'mobile'
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title="Мобильный экран (375px ширина)"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>

                        <div className="w-[1px] h-4 bg-slate-800 mx-0.5" />

                        {/* Reload Iframe */}
                        <button
                          type="button"
                          onClick={() =>
                            setIframeReloadKeys((prev) => ({ ...prev, [proj.lessonId]: (prev[proj.lessonId] || 0) + 1 }))
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-all"
                          title="Перезагрузить превью"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy Link */}
                        <button
                          type="button"
                          onClick={() => handleCopy(activeVercel)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-all"
                          title="Скопировать ссылку"
                        >
                          {copiedLink === activeVercel ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Open in external tab */}
                        <a
                          href={activeVercel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 transition-all"
                          title="Открыть сайт в новой вкладке"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Expand to Fullscreen Modal */}
                        <button
                          type="button"
                          onClick={() => setFullscreenPreviewLessonId(proj.lessonId)}
                          className="p-1.5 rounded-lg text-purple-400 hover:text-purple-300 transition-all"
                          title="Развернуть во весь экран"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Live Viewport Frame */}
                  {activeVercel ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col items-center">
                      {/* Browser Mockup Top Bar */}
                      <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>

                        {/* Mock Address Bar */}
                        <div className="flex-1 max-w-md mx-auto bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 truncate text-center flex items-center justify-center gap-1.5">
                          <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{activeVercel}</span>
                        </div>

                        <a
                          href={activeVercel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
                        >
                          <span>Открыть сайт</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Device Responsive Frame */}
                      <div
                        className={`w-full transition-all duration-300 flex justify-center bg-slate-950 py-2 ${
                          currentDevice === 'tablet'
                            ? 'max-w-[768px]'
                            : currentDevice === 'mobile'
                            ? 'max-w-[390px]'
                            : 'max-w-full'
                        }`}
                      >
                        <div className="w-full h-[480px] md:h-[540px] relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                          <iframe
                            key={`${proj.lessonId}-${iframeKey}`}
                            src={activeVercel}
                            title={`${proj.projectTitle} Live Preview`}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Frame Footer Info */}
                      <div className="w-full px-4 py-2 border-t border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                            Живой интерактивный сайт запущен
                          </span>
                          <span>•</span>
                          <span>Режим: {currentDevice === 'desktop' ? 'Десктоп' : currentDevice === 'tablet' ? 'Планшет' : 'Мобильный'}</span>
                        </div>
                        <a
                          href={activeVercel}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>Не открывается в фрейме из-за ограничений CSP? Открыть прямо в браузере</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Placeholder when no Vercel link is yet added */
                    <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center mx-auto">
                        <Globe className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-sm font-bold text-white">Прямой эфир проекта пока не подключен</h5>
                        <p className="text-xs text-slate-400 max-w-md mx-auto">
                          Укажите ссылку на Vercel выше (или нажмите кнопку «Вставить демо-ссылки проекта»), и здесь
                          появится интерактивный живой сайт с адаптивным переключателем экранов!
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFillDemo(proj)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Подключить живое демо проекта #{proj.projectNumber}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Section: MENTOR CONFIRMATION & REVIEW PANEL */}
                <div
                  className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                    isApproved
                      ? 'bg-emerald-950/30 border-emerald-500/40'
                      : isRejected
                      ? 'bg-rose-950/30 border-rose-500/40'
                      : 'bg-purple-950/20 border-purple-500/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-5 h-5 ${isApproved ? 'text-emerald-400' : 'text-purple-400'}`} />
                      <h4 className="text-sm font-bold text-white">
                        Подтверждение Проекта Ментором (Mentor Confirmation)
                      </h4>
                    </div>
                    {projectHw?.reviewedAt && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        Проверено: {new Date(projectHw.reviewedAt).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>

                  {/* Mentor Review Status Details */}
                  {isApproved ? (
                    <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-emerald-300">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Проект успешно защищён и подтверждён ментором!</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-100 font-mono">
                          +{proj.xpReward} EXP
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        <strong>Рецензия ментора:</strong>{' '}
                        {projectHw?.mentorFeedback ||
                          'Проект полностью соответствует критериям программы блока. Код на GitHub оформлен по стандартам, Vercel деплой работает стабильно.'}
                      </p>
                      {projectHw?.reviewedBy && (
                        <div className="text-[11px] text-emerald-400/80 font-mono">
                          Ментор: {projectHw.reviewedBy}
                        </div>
                      )}
                    </div>
                  ) : isRejected ? (
                    <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 space-y-1.5">
                      <div className="font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Ментор запросил доработку проекта</span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        <strong>Замечания ментора:</strong>{' '}
                        {projectHw?.mentorFeedback || 'Пожалуйста, проверьте работу ссылок и деплой.'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300 flex items-center gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        {isSubmitted
                          ? 'Проект отправлен на рассмотрение. Ментор проверит GitHub и живой сайт на Vercel и подтвердит защиту.'
                          : 'Для получения +150 EXP и зачёта проекта добавьте ссылки на GitHub и Vercel выше.'}
                      </span>
                    </div>
                  )}

                  {/* Mentor Action Controls (Only available if mentor/admin AND mentorMode is enabled) */}
                  {isMentorOrAdmin && mentorMode && (
                    <div className="pt-3 border-t border-slate-800 space-y-3 bg-slate-950/60 p-3.5 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                        <span className="flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-purple-400" />
                          <span>Панель управления Ментора:</span>
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          Балл: {mentorFeedbackDrafts[proj.lessonId]?.score || 100} / 100
                        </span>
                      </div>

                      {/* Mentor Feedback input */}
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400 font-medium">Комментарий ментора:</label>
                        <input
                          type="text"
                          value={mentorFeedbackDrafts[proj.lessonId]?.feedback || ''}
                          onChange={(e) =>
                            setMentorFeedbackDrafts((prev) => ({
                              ...prev,
                              [proj.lessonId]: {
                                score: prev[proj.lessonId]?.score || 100,
                                feedback: e.target.value,
                              },
                            }))
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      {/* Mentor Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleMentorConfirm(proj, true)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✅ Подтвердить проект (+{proj.xpReward} EXP)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMentorConfirm(proj, false)}
                          className="px-3.5 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/60 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <AlertCircle className="w-4 h-4" />
                          <span>Отправить на доработку</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Navigation: Links to Lesson, Lab, Test */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">
                      Связанные материалы программы:
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuizId(`TEST_${proj.blockId}`);
                        setActivePage('quiz-runner');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-amber-500/30 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Тест Блока #{proj.blockId}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          sessionStorage.setItem(`devops_active_sec_${proj.lessonId}`, `sec-${proj.lessonId}-lab`);
                        } catch {}
                        setSelectedLessonId(proj.lessonId);
                        setSelectedLabId(proj.lessonId);
                        setActivePage('lesson-detail');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-cyan-500/30 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Лаборатория #{proj.lessonId}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        try {
                          sessionStorage.setItem(`devops_active_sec_${proj.lessonId}`, `sec-${proj.lessonId}-homework`);
                        } catch {}
                        setSelectedLessonId(proj.lessonId);
                        setActivePage('lesson-detail');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-purple-500/40 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Урок #{proj.lessonId} в Курсе</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Modal Preview */}
      {fullscreenPreviewLessonId && (() => {
        const fullProj = DETAILED_BLOCK_PROJECTS.find((p) => p.lessonId === fullscreenPreviewLessonId);
        const fullUrl = projectForms[fullscreenPreviewLessonId]?.vercel || fullProj?.defaultVercel || '';
        return (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 md:p-6 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800 text-white">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Globe className="w-5 h-5 text-purple-400" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {fullProj?.projectTitle} — Полноэкранный просмотр LIVE
                  </h3>
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
                  >
                    <span>{fullUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Открыть в новой вкладке</span>
                </a>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewLessonId(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Закрыть полноэкранный режим"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Viewport */}
            <div className="flex-1 w-full mt-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative">
              <iframe
                src={fullUrl}
                title="Fullscreen Project Live Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// Helper check
function activeGhOrVc(gh?: string, vc?: string) {
  return Boolean((gh && gh.trim().length > 5) || (vc && vc.trim().length > 5));
}
