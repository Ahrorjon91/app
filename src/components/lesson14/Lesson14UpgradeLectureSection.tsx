import React, { useState } from 'react';
import {
  Github,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  MousePointerClick,
  Layers,
  Smartphone,
  Monitor,
  Lock,
  FileSearch,
  Wrench,
  ArrowRight,
  RefreshCw,
  Send
} from 'lucide-react';

export const Lesson14UpgradeLectureSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedAnnotationTarget, setSelectedAnnotationTarget] = useState<'hero' | 'content' | 'services' | 'whatsapp'>('hero');
  const [waNumber, setWaNumber] = useState('77011234567');
  const [waMessage, setWaMessage] = useState('Здравствуйте! Хочу заказать консультацию с вашего сайта.');

  const copyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const encodedWaLink = `https://wa.me/${waNumber.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`;

  const prompts = {
    importAudit: {
      title: '1. Промпт: Import Audit (Первичный аудит импортированного сайта без изменений)',
      badge: 'ШАГ 1 • АУДИТ ПЕРЕД ПРАВКАМИ',
      summaryRu:
        'Проверяет импортированный из GitHub проект, ничего не меняя в коде: фреймворк, страницы/маршруты, навигацию, компоненты, стили, адаптивность, формы, авторизацию, API, имена переменных окружения (.env без секретов), команду сборки и выдаёт вердикт: READY TO EDIT или NEEDS ATTENTION.',
      promptRu: `Проведи полный технический аудит этого импортированного проекта, НИЧЕГО НЕ МЕНЯЯ в коде.
Проверь и кратко опиши по пунктам:
1. Фреймворк и сборщик (React, Vite, Next.js или чистый HTML/CSS/JS).
2. Основные страницы, маршруты (routes), структуру шапки и навигации.
3. Переиспользуемые компоненты, подход к стилизации (Tailwind / CSS) и мобильную адаптивность.
4. Формы, авторизацию, внешние API, бэкенд-интеграции и только ИМЕНА переменных окружения (без вывода секретных ключей).
5. Команду сборки (build command) и любые зависимости, которые могут не работать в среде предпросмотра Google AI Studio.
6. Проверь, собирается ли проект сейчас без ошибок и рендерится ли превью.

В конце дай чёткий статус импорта:
- Статус импорта: READY TO EDIT (Готов к редактированию) ИЛИ NEEDS ATTENTION (Требует внимания) — перечисли только те критические проблемы, которые нужно решить перед началом правок.`,
      promptEn: `Review the imported project without changing anything — framework, main pages/routes, layout, navigation, reusable components, styling, responsive approach, forms, auth, APIs/backend, integrations, environment-variable names (names only), the build command, and anything that may not work inside AI Studio's environment — checks whether it currently builds and renders, and answers Import status: READY TO EDIT or NEEDS ATTENTION with only the problems that must be solved first.`
    },
    improveHero: {
      title: '2. Промпт: Improve the Hero Section (Точечное улучшение первого экрана)',
      badge: 'ШАГ 2.1 • ТОЛЬКО HERO',
      summaryRu:
        'Улучшает только визуальную иерархию, отступы, типографику, заметность главной кнопки (CTA) и адаптивность Hero-секции на ПК и смартфоне — сохраняет все тексты бизнеса, ссылки, фирменный стиль и НЕ трогает остальные секции сайта.',
      promptRu: `Улучши ТОЛЬКО Hero-секцию (первый экран сайта):
- Усиль визуальную иерархию, воздух (spacing), читаемость типографики и заметность главной кнопки действия (CTA).
- Сделай раскладку одинаково аккуратной и сбалансированной на компьютерах и мобильных телефонах.
- Полностью сохрани текущую информацию о бизнесе/продукте, адрес ссылки главной кнопки, фирменный стиль и всю рабочую функциональность.
- Стремись к чистому, дорогому и отполированному виду (polished), а не к лишнему декору.
- СТРОГОЕ ПРАВИЛО: Никакие другие секции сайта, кроме Hero, трогать нельзя.`,
      promptEn: `Improve only the hero's visual hierarchy, spacing, typography, CTA prominence, and desktop/mobile layout — keep the existing business information, primary CTA destination, brand identity, and functionality, aim for polished rather than decorative, and never touch unrelated sections.`
    },
    updateContent: {
      title: '3. Промпт: Update Specific Content (Точная замена текста без поломки дизайна)',
      badge: 'ШАГ 2.2 • ТОЧЕЧНЫЙ КОНТЕНТ',
      summaryRu:
        'Обновляет только главный заголовок и подзаголовок на указанный вами текст, полностью сохраняя текущий дизайн, шрифты, анимации и мобильную вёрстку, и больше ничего не меняет.',
      promptRu: `Обнови ТОЛЬКО главный заголовок и подзаголовок в Hero-секции на следующий точный текст:
Заголовок: "[ВСТАВЬТЕ ВАШ НОВЫЙ ЗАГОЛОВОК]"
Подзаголовок: "[ВСТАВЬТЕ ВАШ НОВЫЙ ПОДЗАГОЛОВОК]"

- Полностью сохрани текущий дизайн, цвета, шрифты, отступы и адаптивное поведение на мобильных устройствах.
- Не меняй никакие другие тексты, кнопки или секции сайта.`,
      promptEn: `Update only the hero heading and supporting text to the exact wording provided, preserve the current design and responsive behavior, and touch nothing else.`
    },
    improveServices: {
      title: '4. Промпт: Improve the Services Section (Улучшение секции услуг / преимуществ)',
      badge: 'ШАГ 2.3 • ТОЛЬКО КАРТОЧКИ УСЛУГ',
      summaryRu:
        'Улучшает иерархию, отступы, адаптивную сетку и оформление карточек в секции услуг для лёгкого чтения — сохраняет все названия, описания, ссылки и функции, избегает лишних градиентов/мишуры и не трогает другие блоки.',
      promptRu: `Улучши ТОЛЬКО секцию услуг (Services / Каталог / Преимущества):
- Выстрой чистую визуальную иерархию, ровные отступы, удобную адаптивную сетку (grid) и аккуратный дизайн карточек, чтобы секцию было легко сканировать взглядом.
- Сохрани абсолютно каждое название услуги, описание, иконку, ссылку и функцию без потерь.
- Избегай перегруженных градиентов, лишних анимаций, ненужных плашек (badges) и визуального шума.
- СТРОГОЕ ПРАВИЛО: Не изменяй никакие другие секции сайта.`,
      promptEn: `Improve the services section's hierarchy, spacing, responsive layout, and card treatment to make it easier to scan — preserve every existing service name, description, link, and function, avoid excessive gradients/animations/badges/decoration, and never touch other sections.`
    },
    addWhatsApp: {
      title: '5. Промпт: Add WhatsApp Contact (Подключение официального WhatsApp Click-to-Chat)',
      badge: 'ШАГ 3 • ИНТЕГРАЦИЯ WHATSAPP',
      summaryRu:
        'Добавляет официальную ссылку WhatsApp click-to-chat с правильно закодированным предзаполненным сообщением — использует существующую кнопку связи или компактную плавающую кнопку, работает на ПК, телефоне и с клавиатуры, проверяет сборку и отчитывается о каждом изменённом файле.',
      promptRu: `Добавь на сайт официальную кнопку быстрой связи через WhatsApp (Click-to-Chat):
- Номер телефона в международном формате (только цифры): ${waNumber.replace(/\D/g, '')}
- Предзаполненное сообщение: "${waMessage}"
- Сформируй правильную ссылку формата https://wa.me/${waNumber.replace(/\D/g, '')}?text=... с корректным URL-кодированием (encodeURIComponent).
- По возможности переиспользуй существующую кнопку «Связаться / Контакты / Заказать» в Hero или секции Контактов, а если добавляешь плавающую кнопку в правом нижнем углу — сделай её компактной, чтобы она не перекрывала важный текст и навигацию на мобильном экране.
- Ссылка должна открываться в новой вкладке (target="_blank" rel="noopener noreferrer") и идеально работать на смартфоне, ПК и при навигации с клавиатуры.
- НЕ создавай сложных серверных API, чат-ботов или бэкендов.
- Проверь каждую ссылку, запусти production-сборку (npm run build) и выведи список всех обновлённых кнопок и страниц.`,
      promptEn: `Add the official WhatsApp click-to-chat link with a correctly encoded prefilled message — reuse an existing Contact/WhatsApp/Get Quote button where possible, work on desktop, mobile, and keyboard, and keep a floating button (if genuinely useful) small and clear of other fixed UI — never build a custom API integration, credentials, chatbot, or backend, check every link, run the production build, and report every button/page changed.`
    },
    whatsappAudit: {
      title: '6. Промпт: WhatsApp Production Audit (Финальный аудит WhatsApp перед публикацией)',
      badge: 'ШАГ 4 • ФИНАЛЬНЫЙ PRODUCTION-АУДИТ',
      summaryRu:
        'Проверяет, что каждая кнопка WhatsApp использует верный международный номер, текст предзаполненного сообщения корректно закодирован, нет старых/тестовых номеров и дубликатов, а плавающая кнопка не закрывает контент.',
      promptRu: `Проведи финальный Production-Readiness аудит интеграции WhatsApp на сайте:
1. Убедись, что каждая кнопка WhatsApp CTA использует правильный номер бизнеса в международном формате (${waNumber.replace(/\D/g, '')} без плюса, пробелов и скобок).
2. Проверь, что предзаполненное сообщение закодировано без ошибок (URL-encoded) и читается на русском языке при открытии чата.
3. Проверь, что на сайте не осталось заглушек (placeholder), старых тестовых номеров или лишних дублирующихся кнопок.
4. Убедись, что все ссылки корректно работают на мобильных телефонах и десктопах (target="_blank" rel="noopener noreferrer").
5. Проверь на узком мобильном экране (375px), что плавающая кнопка WhatsApp не перекрывает важный текст, формы или нижнее меню.`,
      promptEn: `Verify every WhatsApp CTA uses the correct business number in international format, the prefilled message is encoded correctly, no placeholder/outdated numbers or unnecessary duplicate buttons remain, links work on mobile and desktop, and floating buttons don't cover content or navigation.`
    }
  };

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 border-2 border-emerald-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-wider">
            🛠️ УРОК 14 • РЕДАКТИРОВАНИЕ САЙТА ИЗ GITHUB В GOOGLE AI STUDIO + WHATSAPP
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 text-xs font-mono">
            GitHub Import • Annotation Mode • WhatsApp Click-to-Chat
          </span>
        </div>

        <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Как безопасно редактировать готовый ИИ-сайт из GitHub и подключить реальный WhatsApp для клиентов
        </h1>

        <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl">
          Создать сайт с нуля — это только половина дела. Настоящий профессионал умеет{' '}
          <strong className="text-emerald-300">импортировать уже работающий проект из GitHub обратно в Google AI Studio</strong>,
          провести технический аудит, внести точечные улучшения дизайна и контента (не сломав существующие функции!) и подключить
          мгновенную связь с клиентами через <strong className="text-green-400">WhatsApp Click-to-Chat</strong>.
        </p>

        {/* 4 PILLARS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase">
              <Github className="w-4 h-4" /> Этап 1 (0/4)
            </div>
            <div className="text-sm font-bold text-white">Импорт и Аудит из GitHub</div>
            <p className="text-xs text-slate-400">
              Сохраняем текущую рабочую версию, импортируем через «Add files (+) → Import from GitHub» и запускаем Import Audit.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase">
              <MousePointerClick className="w-4 h-4" /> Этап 2 (0/5)
            </div>
            <div className="text-sm font-bold text-white">Точечные правки и Annotation Mode</div>
            <p className="text-xs text-slate-400">
              Никаких «Переделай весь сайт»! Двигаемся по 1 секции за раз: Hero → Контент → Услуги → CTA → Футер.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-green-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-green-400 font-black text-xs uppercase">
              <MessageCircle className="w-4 h-4" /> Этап 3 (0/3)
            </div>
            <div className="text-sm font-bold text-white">Подключение WhatsApp</div>
            <p className="text-xs text-slate-400">
              Формат ссылки <code className="text-green-300">https://wa.me/[НОМЕР]</code> с предзаполненным сообщением на русском языке.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase">
              <Smartphone className="w-4 h-4" /> Этап 4 (0/5)
            </div>
            <div className="text-sm font-bold text-white">Боевой тест на телефоне и ПК</div>
            <p className="text-xs text-slate-400">
              Проверяем открытие WhatsApp на реальном смартфоне, отправку тестового сообщения и финальный Production Audit.
            </p>
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 1: ИМПОРТ СУЩЕСТВУЮЩЕГО САЙТА ИЗ GITHUB И ПЕРВИЧНЫЙ АУДИТ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black">
              1
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                ШАГ 1 ИЗ 4 • ИМПОРТ СУЩЕСТВУЮЩЕГО САЙТА
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Импорт проекта из GitHub в Google AI Studio (Build Mode)
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            Сохрани рабочую версию перед правками!
          </span>
        </div>

        {/* Save Current Version First */}
        <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            Золотое правило безопасности: Сначала убедись, что текущая версия надёжно сохранена!
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Перед тем как менять хоть одну строчку кода, убедись, что рабочая версия твоего сайта уже сохранена в GitHub:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Самый свежий рабочий код уже отправлен (pushed) в GitHub</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Текущий опубликованный сайт открывается и работает без ошибок</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Не ломай рабочую Production-ветку до полной проверки новых правок</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/90 border border-amber-500/20 flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Никогда не удаляй свой исходный репозиторий в GitHub</span>
            </div>
          </div>
        </div>

        {/* 5 Steps to Import from GitHub */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-cyan-400" />
            Пошаговая инструкция: Как импортировать сайт из GitHub в Google AI Studio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                step: 'Шаг 1',
                title: 'Нажми Add files (+)',
                desc: 'В поле ввода промпта в режиме Google AI Studio Build нажми на кнопку «+» (Add files).'
              },
              {
                step: 'Шаг 2',
                title: 'Import from GitHub',
                desc: 'Выбери в появившемся меню пункт «Import from GitHub» (Импортировать из GitHub).'
              },
              {
                step: 'Шаг 3',
                title: 'Подключи GitHub',
                desc: 'Авторизуй свой аккаунт GitHub, если AI Studio попросит разрешение на чтение репозиториев.'
              },
              {
                step: 'Шаг 4',
                title: 'Выбери репозиторий',
                desc: 'Найди в списке репозиторий со своим сайтом (например, проект из Урока 12 или 13).'
              },
              {
                step: 'Шаг 5',
                title: 'Запусти превью',
                desc: 'Нажми Import — AI Studio загрузит все файлы и автоматически запустит сайт в окне предпросмотра.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-black uppercase">
                  {item.step}
                </span>
                <div className="text-sm font-black text-white pt-1">{item.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Secrets Warning + Start with Audit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
              <Lock className="w-4 h-4" />
              ВАЖНО: Секретные ключи и API Keys (Secrets Management)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              В репозитории GitHub <strong>никогда не должно быть приватных API-ключей или паролей</strong>. Если твой импортированный
              проект зависит от секретных ключей, добавь их через специальные настройки <strong>Secrets / Переменные окружения</strong> в
              Google AI Studio на стороне сервера, а не вставляй их в публичный фронтенд-код или в текст промпта!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <FileSearch className="w-4 h-4" />
              Начни с Аудита, а НЕ с редизайна! (Start With an Audit)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Частая ошибка новичков — сразу после импорта писать <em>«Переделай мне весь дизайн сайта»</em>. Вместо этого первым шагом
              всегда запускай <strong>Промпт Первичного Аудита (Import Audit)</strong>. ИИ изучит структуру проекта, проверит сборку и
              выдаст статус: <code className="text-emerald-300 font-bold">READY TO EDIT</code> или{' '}
              <code className="text-amber-300 font-bold">NEEDS ATTENTION</code>.
            </p>
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 2: ТОЧЕЧНОЕ РЕДАКТИРОВАНИЕ И РЕЖИМ АННОТАЦИЙ (ANNOTATION MODE) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black">
              2
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                ШАГ 2 ИЗ 4 • ТОЧЕЧНОЕ РЕДАКТИРОВАНИЕ С ИИ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Режим Аннотаций (Annotation Mode) и правило «Одно изменение за раз»
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
            1 шаг = 1 секция
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Когда импортированный сайт успешно запустился в превью, переходи к точечным улучшениям. В Google AI Studio есть мощный инструмент —{' '}
          <strong className="text-cyan-300">Annotation Mode (Режим выделения элементов на экране)</strong>: ты можешь просто выделить
          мышкой нужную кнопку, заголовок или карточку прямо в превью приложения и написать, что именно нужно изменить, чтобы ИИ не гадал,
          о каком компоненте идёт речь!
        </p>

        {/* Bad vs Good Editing Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-950/25 border border-rose-500/40 space-y-2">
            <div className="text-xs font-black uppercase text-rose-400">❌ КАК ДЕЛАТЬ НЕЛЬЗЯ (Ломает рабочий сайт)</div>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-rose-200 border border-rose-500/20">
              "Полностью переделай весь мой сайт с нуля и сделай его крутым."
            </div>
            <p className="text-xs text-slate-300">
              Такой запрос удалит важные рабочие ссылки, сломает проверенную вёрстку и перемешает секции. Если появится баг, ты даже не
              поймёшь, в каком месте он возник.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 space-y-2">
            <div className="text-xs font-black uppercase text-emerald-400">
              ✅ КАК РАБОТАЮТ ПРОФЕССИОНАЛЫ (По одной секции за шаг)
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {['1. Hero (Первый экран)', '2. Services (Услуги)', '3. CTA (Призыв к действию)', '4. Footer (Подвал)'].map((s, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-bold text-emerald-200">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-300 pt-1">
              Меняя строго по одному блоку за раз, ты мгновенно видишь результат в превью и можешь легко откатить шаг назад, если что-то
              пошло не так.
            </p>
          </div>
        </div>

        {/* Interactive Annotation Mode Simulator */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-black text-white flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
              Интерактивный тренажёр Annotation Mode: выбери зону сайта и посмотри, как меняется фокус промпта
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'hero', label: '🎯 Зона 1: Hero-секция' },
                { id: 'content', label: '✏️ Зона 2: Точный текст заголовка' },
                { id: 'services', label: '🧩 Зона 3: Секция Услуг' },
                { id: 'whatsapp', label: '💬 Зона 4: Кнопка WhatsApp' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedAnnotationTarget(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedAnnotationTarget === t.id
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
            {selectedAnnotationTarget === 'hero' && (
              <>
                <div className="text-xs font-black text-cyan-300 uppercase">Выделена область: HERO SECTION</div>
                <p className="text-xs sm:text-sm text-slate-200">
                  ИИ улучшает только визуальную иерархию, воздух, читаемость заголовка и кнопку CTA на первом экране, сохраняя бизнес-смысл
                  и не прикасаясь к остальным блокам сайта.
                </p>
              </>
            )}
            {selectedAnnotationTarget === 'content' && (
              <>
                <div className="text-xs font-black text-cyan-300 uppercase">Выделена область: ЗАГОЛОВОК И ПОДЗАГОЛОВОК</div>
                <p className="text-xs sm:text-sm text-slate-200">
                  ИИ меняет только текст заголовка и описания слово в слово на твой новый вариант, сохраняя текущие стили, шрифты и
                  мобильную адаптивность на 100%.
                </p>
              </>
            )}
            {selectedAnnotationTarget === 'services' && (
              <>
                <div className="text-xs font-black text-cyan-300 uppercase">Выделена область: СЕКЦИЯ УСЛУГ (SERVICES)</div>
                <p className="text-xs sm:text-sm text-slate-200">
                  ИИ выравнивает сетку карточек услуг, улучшает отступы и читаемость, сохраняя каждое название, описание и ссылку, без
                  лишних кислотных градиентов.
                </p>
              </>
            )}
            {selectedAnnotationTarget === 'whatsapp' && (
              <>
                <div className="text-xs font-black text-green-400 uppercase">Выделена область: КНОПКА СВЯЗИ WHATSAPP</div>
                <p className="text-xs sm:text-sm text-slate-200">
                  ИИ подключает прямую ссылку <code className="text-green-300">https://wa.me/[НОМЕР]?text=...</code> к кнопке связи, чтобы
                  клиент в 1 клик открывал чат WhatsApp с готовым сообщением без заполнения скучных форм.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 3: ПОДКЛЮЧЕНИЕ WHATSAPP К САЙТУ И ЖИВОЙ ГЕНЕРАТОР ССЫЛКИ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-green-500/30 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-300 font-black">
              3
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-green-400">
                ШАГ 3 ИЗ 4 • ДОБАВЛЕНИЕ WHATSAPP НА САЙТ (0/3)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Как подключить WhatsApp Click-to-Chat с предзаполненным сообщением
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-950 border border-green-500/40 text-green-300 text-xs font-mono font-bold">
            https://wa.me/[NUMBER]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-black text-white">Формат официальной ссылки WhatsApp</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Чтобы посетитель сайта мог написать в компанию в один клик (без сохранения номера в телефонную книгу и без заполнения длинных
              анкет), используется официальный формат <strong>Click-to-Chat</strong>:
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-green-500/30 font-mono text-xs sm:text-sm text-green-300">
              https://wa.me/[МЕЖДУНАРОДНЫЙ_НОМЕР]?text=[ЗАКОДИРОВАННЫЙ_ТЕКСТ]
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-black text-white uppercase">Где лучше всего разместить кнопку WhatsApp?</div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Hero CTA:</strong> главная кнопка на первом экране сайта</li>
                <li>• <strong>Страница или секция «Контакты» (Contact):</strong> рядом с адресом и телефоном</li>
                <li>• <strong>Карточки услуг / товаров:</strong> кнопка «Узнать цену в WhatsApp»</li>
                <li>• <strong>Плавающая кнопка (Floating Button):</strong> аккуратная иконка в правом нижнем углу</li>
              </ul>
              <p className="text-[11px] text-amber-300 pt-1">
                💡 Примечание: Не нужно лепить кнопку WhatsApp во все места сразу! Для большинства сайтов достаточно 1 сильной кнопки в Hero
                и 1 кнопки в секции Контактов.
              </p>
            </div>
          </div>

          {/* Live WhatsApp Link Builder */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-green-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-green-400 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" /> Живой конструктор ссылки WhatsApp
              </span>
              <span className="text-[11px] text-slate-400">Попробуй ввести свой номер и текст</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Номер телефона в международном формате (только цифры, без + и пробелов):
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder="Например: 77011234567"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Предзаполненное сообщение от клиента (Prefilled Message):
                </label>
                <input
                  type="text"
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400">Готовая закодированная ссылка для кода сайта:</div>
                <div className="text-xs font-mono text-green-300 break-all">{encodedWaLink}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => copyPrompt('wa-link', encodedWaLink)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === 'wa-link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'wa-link' ? 'Ссылка скопирована!' : 'Скопировать ссылку'}
                </button>
                <a
                  href={encodedWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black text-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Проверить открытие WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 4: КОЛЛЕКЦИЯ ИЗ 6 ОФИЦИАЛЬНЫХ ПРОМПТОВ ДЛЯ GOOGLE AI STUDIO */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            Библиотека из 6 готовых промптов Урока 14 (на русском и английском)
          </h2>
          <span className="text-xs text-slate-400">Нажми «Скопировать промпт» и вставь в Google AI Studio</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {Object.entries(prompts).map(([key, item]) => (
            <div key={key} className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase">
                    {item.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">{item.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyPrompt(`${key}-ru`, item.promptRu)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === `${key}-ru` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === `${key}-ru` ? 'Скопировано (RU)!' : 'Скопировать промпт (RU)'}
                  </button>
                  <button
                    onClick={() => copyPrompt(`${key}-en`, item.promptEn)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === `${key}-en` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === `${key}-en` ? 'Copied (EN)!' : 'EN оригинал'}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.summaryRu}</p>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-emerald-200 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {item.promptRu}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* ЧАСТЬ 5: ТЕСТИРОВАНИЕ НА ТЕЛЕФОНЕ И ПК (6 ШАГОВ FINAL REAL-WORLD TEST) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black">
            4
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              ШАГ 4 ИЗ 4 • ПРОВЕРКА НА СМАРТФОНЕ, ПК И В РЕАЛЬНОЙ ЖИЗНИ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Не считай работу законченной, просто увидев зелёную иконку WhatsApp!
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Профессиональный разработчик проверяет путь клиента глазами реального покупателя — сначала на смартфоне, затем на компьютере
          (WhatsApp Web / Desktop) и наконец на живом опубликованном сайте:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              num: '1',
              title: 'Открой живой сайт на телефоне',
              desc: 'Перейди по опубликованной ссылке сайта со своего реального смартфона.'
            },
            {
              num: '2',
              title: 'Нажми на кнопку WhatsApp',
              desc: 'Убедись, что кнопка легко нажимается пальцем и сразу запускает приложение WhatsApp.'
            },
            {
              num: '3',
              title: 'Проверь правильность номера',
              desc: 'Убедись, что открылся чат именно с нужным номером компании, а не с тестовой заглушкой.'
            },
            {
              num: '4',
              title: 'Проверь готовый текст сообщения',
              desc: 'В поле ввода уже должен стоять вежливый предзаполненный текст без «кракозябр» и сломанных символов.'
            },
            {
              num: '5',
              title: 'Отправь реальное тестовое сообщение',
              desc: 'Проверь, что текст можно отредактировать вручную и нажать кнопку отправки.'
            },
            {
              num: '6',
              title: 'Подтверди получение во входящих',
              desc: 'Убедись, что сообщение реально пришло на рабочий WhatsApp-аккаунт.'
            }
          ].map((step) => (
            <div key={step.num} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-black text-xs flex items-center justify-center">
                {step.num}
              </div>
              <div className="text-sm font-black text-white">{step.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
