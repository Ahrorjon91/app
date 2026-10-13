import React, { useState } from 'react';
import {
  Compass,
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  ShieldCheck,
  Laptop,
  Rocket,
  FolderGit2,
  FileCode2,
  HelpCircle,
  Play,
  HeartHandshake
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson15RoadmapLectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCmdIdx, setActiveCmdIdx] = useState<number>(0);
  const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({ 1: true });
  const [ReflectionAnswer, setReflectionAnswer] = useState<string>('');
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addReward(10, '📋 Команда скопирована в буфер обмена! (+10 ОП)');
    setTimeout(() => setCopiedId(null), 2200);
  };

  const toggleGoal = (idx: number) => {
    const next = { ...checkedGoals, [idx]: !checkedGoals[idx] };
    setCheckedGoals(next);
  };

  const toggleStep = (step: number) => {
    const next = { ...checkedSteps, [step]: !checkedSteps[step] };
    setCheckedSteps(next);
    if (Object.values(next).filter(Boolean).length === 6) {
      addReward(30, '🧭 Все 6 шагов самостоятельного запуска изучены! (+30 ОП)');
    }
  };

  const terminalSimulation = [
    {
      cmd: 'node -v',
      title: 'Проверка Node.js',
      desc: 'Проверяем, установлен ли движок Node.js на компьютере.',
      output: 'v22.14.0\n✓ Node.js готов к работе!'
    },
    {
      cmd: 'npm install',
      title: 'Установка пакетов (node_modules)',
      desc: 'Скачиваем все кирпичики-библиотеки из списка покупок package.json.',
      output: 'added 248 packages, and audited 249 packages in 4s\nfound 0 vulnerabilities\n✓ Папка node_modules создана!'
    },
    {
      cmd: 'npm run dev',
      title: 'Запуск сайта на своём компьютере',
      desc: 'Включаем локальный сервер разработки.',
      output: '  VITE v6.2.0  ready in 312 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n✓ Открой ссылку в браузере — твой сайт живой!'
    },
    {
      cmd: 'npm test',
      title: 'Запуск автоматической проверки (Vitest)',
      desc: 'Робот-проверяющий тестирует, всё ли работает без ошибок.',
      output: ' ✓ src/App.test.tsx (2 tests) 18ms\n   ✓ Главная страница открывается и заголовок на месте\n   ✓ Кнопка переключения темы работает\n\n Test Files  1 passed (1)\n      Tests  2 passed (2)\n✓ Все тесты зелёные!'
    },
    {
      cmd: 'npm run build',
      title: 'Чистовая сборка для интернета',
      desc: 'Упаковываем проект в аккуратную коробку dist для публикации.',
      output: 'vite v6.2.0 building for production...\n✓ 42 modules transformed.\ndist/index.html                   0.48 kB\ndist/assets/index-B9kL2p.css     18.42 kB\ndist/assets/index-D7mQ9x.js     146.10 kB\n✓ built in 1.24s (Готово к отправке в Vercel!)'
    },
    {
      cmd: 'git status',
      title: 'Проверка изменений в Git',
      desc: 'Смотрим, какие файлы мы поменяли в проекте.',
      output: 'On branch main\nChanges not staged for commit:\n  modified:   src/App.tsx\n\n✓ Git видит твои правки в src/App.tsx!'
    }
  ];

  const dictionaryCards = [
    {
      num: '1️⃣',
      title: 'Интернет (Как работает сеть)',
      analogy: 'Представь, что интернет — это огромная служба доставки пиццы 🍕.',
      bullets: [
        'Твой браузер (Chrome) — это ты дома, делаешь заказ.',
        'Сервер — это пиццерия, где хранится сайт.',
        'HTTP / HTTPS — курьер на мопеде. Буква S (Secure) значит, что коробка закрыта на кодовый замок 🔒.',
        'Домен (например, google.com) — красивое имя пиццерии вместо скучного номера телефона (IP-адреса).',
        'Хостинг (например, Vercel) — здание, где живёт наш сайт 24 часа в сутки.'
      ],
      badgeColor: 'from-sky-500/20 to-blue-500/10 border-sky-500/40 text-sky-300'
    },
    {
      num: '2️⃣',
      title: 'Три главных героя сайта: HTML, CSS и JavaScript',
      analogy: 'Любой сайт похож на человека или робота 🤖:',
      bullets: [
        '🦴 HTML — скелет. Заголовки, абзацы, кнопки, картинки. Без него на экране пусто.',
        '🎨 CSS — одежда и стиль. Цвета, шрифты, красивые отступы, плавная анимация.',
        '⚡ JavaScript (JS) — мозг и мышцы. Нажал на кнопку — открылось меню, посчитались очки, сменилась тема.'
      ],
      badgeColor: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300'
    },
    {
      num: '3️⃣',
      title: 'Git и GitHub — машина времени для кода',
      analogy: 'Сохранения в игре 🎮 и облачный сейф в интернете:',
      bullets: [
        '💾 Git — точка сохранения в игре (Save Game) прямо на твоём компьютере. Сломал что-то? Вернулся на шаг назад!',
        '☁️ GitHub — облачный сейф в интернете, куда мы отправляем свои сохранения, чтобы код не пропал и его можно было показать друзьям или подключить к хостингу.'
      ],
      badgeColor: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300'
    },
    {
      num: '4️⃣',
      title: 'npm и пакеты — коробка с деталями LEGO',
      analogy: 'Готовые проверенные кубики вместо изобретения велосипеда 🧱:',
      bullets: [
        'Раньше программисты писали всё с нуля. Сейчас есть готовые кубики LEGO — пакеты (packages): иконки, календари, графики.',
        '📦 npm (Node Package Manager) — бесплатный магазин этих деталей.',
        '📄 package.json — список покупок нашего проекта. В нём записано, какие детали нужны сайту для работы.'
      ],
      badgeColor: 'from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300'
    },
    {
      num: '5️⃣',
      title: 'React и Tailwind CSS — суперсилы сайта',
      analogy: 'Умный конструктор из карточек и быстрые стикеры стиля ⚡:',
      bullets: [
        '⚛️ React — технология, которая делит сайт на удобные детали-компоненты (шапка, карточка товара, кнопка). Именно на React создаёт сайты Google AI Studio.',
        '🌊 Tailwind CSS — быстрые классы-стикеры прямо в коде (например, bg-blue-500 красит фон в синий, а rounded-xl скругляет углы).'
      ],
      badgeColor: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/40 text-cyan-300'
    },
    {
      num: '6️⃣',
      title: 'Сборка (Build) и Тесты (Vitest)',
      analogy: 'Чистовая коробка для отправки и робот-контролёр 🤖:',
      bullets: [
        '🏗️ Build (Сборка / Vite) — когда мы пишем код, файлов много. Команда сборки упаковывает их в одну лёгкую и быструю папку dist для интернета.',
        '🧪 Vitest (Тесты) — робот-проверяющий. Он за 1 секунду нажимает на кнопки нашего сайта и говорит: «Всё работает зелёным ✅» или «Тут ошибка ❌».'
      ],
      badgeColor: 'from-emerald-500/20 to-green-500/10 border-emerald-500/40 text-emerald-300'
    }
  ];

  const practiceSteps = [
    {
      step: 1,
      title: 'Шаг 1. Забираем свой сайт из Google AI Studio и GitHub (5 мин)',
      description: 'У тебя уже есть проект, который мы сделали с помощью Google AI Studio и сохранили в GitHub. Находим его или скачиваем ZIP-архив на компьютер (на Рабочий стол) и распаковываем в обычную папку.',
      commands: [
        {
          cmd: 'git clone https://github.com/ТВОЙ-НИК/ИМЯ-ПРОЕКТА.git',
          comment: 'Вариант Б (как профи — через Git в терминале Antigravity IDE)'
        }
      ],
      filesInfo: [
        { name: 'index.html', role: 'главная страница, входные ворота сайта' },
        { name: 'package.json', role: 'паспорт проекта и список нужных библиотек' },
        { name: 'src/', role: 'папка с сердцем сайта (например, App.tsx — главный экран)' }
      ]
    },
    {
      step: 2,
      title: 'Шаг 2. Открываем проект в Antigravity IDE и знакомимся с Терминалом (10 мин)',
      description: 'В Antigravity IDE нажми File → Open Folder и выбери папку своего сайта. Вверху нажми Terminal → New Terminal (или клавиши Ctrl + `). Не пугайся чёрного окошка — это просто чат с твоим компьютером!',
      commands: [
        {
          cmd: 'node -v',
          comment: 'Проверяем, готов ли Node.js (должна появиться версия, например v20.x.x)'
        },
        {
          cmd: 'npm install',
          comment: 'Устанавливаем все детали нашего сайта (появится папка node_modules)'
        },
        {
          cmd: 'npm run dev',
          comment: 'Запускаем сайт! Зажми Ctrl и кликни по http://localhost:5173'
        }
      ],
      highlight: '🎉 Ура! Ты только что запустил сайт на своём компьютере сам, без единой подсказки ИИ!'
    },
    {
      step: 3,
      title: 'Шаг 3. Меняем сайт своими руками (10 мин)',
      description: 'Давай докажем, что мы понимаем код и можем управлять им сами! В левой панели открой папку src и нажми на файл App.tsx (или центральный компонент).',
      commands: [
        {
          cmd: 'Ctrl + S (или Cmd + S на Mac)',
          comment: 'Сохрани файл после изменения текста заголовка и цвета кнопки (например, bg-blue-600 → bg-emerald-600)'
        }
      ],
      highlight: 'Посмотри в браузер: сайт обновился мгновенно в ту же секунду! Это называется Hot Reload (горячая перезагрузка).'
    },
    {
      step: 4,
      title: 'Шаг 4. Проверяем сайт как профи: Тесты (Vitest) и Сборка (Build) (10 мин)',
      description: 'Настоящие разработчики не гадают, сломался сайт или нет — они запускают автоматическую проверку и чистовую сборку.',
      commands: [
        {
          cmd: 'npm test',
          comment: 'Запуск автотестов Vitest (проверяем, что всё светится зелёным PASS)'
        },
        {
          cmd: 'npm run build',
          comment: 'Финальная проверка перед полётом в интернет (создаёт чистовую папку dist)'
        }
      ],
      testExample: `// Как выглядит простой тест внутри (для любознательных):
test('Главная страница открывается и заголовок на месте', () => {
  // Робот открывает страницу и ищет наш новый текст
  expect(screen.getByText('Мой первый самостоятельный запуск!')).toBeDefined();
});`
    },
    {
      step: 5,
      title: 'Шаг 5. Сохраняем свою работу в Git и GitHub (5 мин)',
      description: 'Мы изменили сайт и проверили его. Теперь сделаем «точку сохранения» и отправим обновлённый код в облачный сейф GitHub.',
      commands: [
        {
          cmd: 'git status',
          comment: '1. Смотрим, какие файлы мы поменяли'
        },
        {
          cmd: 'git add .',
          comment: '2. Кладём все изменения в коробку для сохранения'
        },
        {
          cmd: 'git commit -m "Обновил дизайн и текст своими руками"',
          comment: '3. Подписываем коробку (делаем сохранение)'
        },
        {
          cmd: 'git push',
          comment: '4. Отправляем в облако GitHub!'
        }
      ]
    },
    {
      step: 6,
      title: 'Шаг 6. Публикуем сайт на весь мир через Vercel (5 мин)',
      description: 'Сейчас сайт работает только на твоём компьютере (localhost). Сделаем так, чтобы его можно было открыть с любого телефона в мире!',
      commands: [
        {
          cmd: 'https://vercel.com → Add New... → Project → Import GitHub Repo → Deploy',
          comment: 'Через 30–60 секунд полетят конфетти 🎉 и появится твоя ссылка https://твой-проект.vercel.app'
        }
      ],
      highlight: '💡 Бонус: теперь каждый раз, когда ты делаешь git push в терминале, Vercel сам за 30 секунд обновит твой сайт в интернете!'
    }
  ];

  const faqItems = [
    {
      problem: '«В терминале красные буквы: npm не является внутренней или внешней командой...»',
      solution: 'На компьютере ещё не установлен Node.js (или нужно просто закрыть и заново открыть Antigravity IDE после его установки).'
    },
    {
      problem: '«Я пишу команды в терминале, а они не печатаются или выдают ошибку, потому что сервер ещё работает!»',
      solution: 'Когда запущен npm run dev, терминал занят поддержкой сайта. Чтобы ввести новую команду, нажми в терминале Ctrl + C (остановить сервер) или нажми на плюсик +, чтобы открыть второе окошко терминала.'
    },
    {
      problem: '«Я поменял код в App.tsx, а в браузере ничего не изменилось!»',
      solution: 'Проверь, нажал ли ты Ctrl + S (сохранить файл). Рядом с именем файла наверху не должно быть белой точки (кружочка).'
    },
    {
      problem: '«На Vercel ошибка при сборке (Build Failed)!»',
      solution: 'Сначала запусти npm run build у себя в терминале Antigravity IDE. Терминал точно покажет строчку, где осталась незакрытая скобка или опечатка.'
    }
  ];

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-cyan-950/30 to-slate-900 border-2 border-cyan-500/40 shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4" /> УРОК 15 • ДОРОЖНАЯ КАРТА FRONTEND
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-emerald-300 text-xs font-mono font-bold">
            Для кого: ученики 12+ · Формат: 90 минут · Инструменты: бесплатные
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            🧭 Дорожная карта Frontend:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              запускаем и публикуем сайт сами (без ИИ)
            </span>
          </h1>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-slate-200 text-sm sm:text-base leading-relaxed">
            <strong className="text-cyan-300">💡 Главная идея урока:</strong> ИИ (<strong>Google AI Studio</strong>) уже сделал нам сайт. Сегодня мы становимся <strong>настоящими разработчиками</strong>: сами откроем проект, сами запустим его в терминале, сами проверим и сами опубликуем. <strong className="text-emerald-300 underline">Без подсказок ИИ.</strong>
          </div>
        </div>

        {/* Free Tools Strip */}
        <div className="pt-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-300/90 mb-2.5 font-bold">
            🛠️ Наши бесплатные инструменты настоящего разработчика:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {[
              { name: 'roadmap.sh', desc: 'Карта пути Frontend-разработчика', url: 'https://roadmap.sh/frontend' },
              { name: 'Antigravity IDE', desc: 'Редактор кода и терминал', url: 'https://idx.google.com/' },
              { name: 'Node.js & npm', desc: 'Движок и пакеты проекта', url: 'https://nodejs.org/' },
              { name: 'Git & GitHub', desc: 'Машина времени и облачный сейф', url: 'https://github.com/' },
              { name: 'Vitest', desc: 'Робот-проверяющий для автотестов', url: 'https://vitest.dev/' },
              { name: 'Vercel', desc: 'Бесплатный хостинг в 1 клик', url: 'https://vercel.com/' }
            ].map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white group-hover:text-cyan-300">{t.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 1. ОТ ИИ-ПОМОЩНИКА К НАСТОЯЩЕМУ РАЗРАБОТЧИКУ (10 МИНУТ) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-indigo-500/30 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
            🚀 ЧАСТЬ 1 · ВДОХНОВЕНИЕ (10 МИНУТ)
          </span>
          <a
            href="https://roadmap.sh/frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-black inline-flex items-center gap-1.5 transition-all shadow-lg"
          >
            <span>Открыть roadmap.sh/frontend</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          От ИИ-помощника к настоящему разработчику
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Ребята, на прошлых занятиях мы делали крутую вещь: просили <strong>Google AI Studio</strong> создать нам сайт и сохраняли его в <strong>GitHub</strong>. ИИ — это как автопилот в самолёте ✈️. Но настоящий пилот всегда умеет управлять штурвалом сам!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
            <h3 className="text-base font-black text-indigo-300 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Что такое Frontend (Фронтенд)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>Frontend</strong> — это всё, что ты видишь глазами в браузере и на что можешь нажать: кнопки, картинки, меню, анимации, карточки товаров.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <h3 className="text-base font-black text-emerald-300 flex items-center gap-2">
              <Compass className="w-5 h-5" /> Карта сокровищ: roadmap.sh/frontend
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              В мире есть известная карта всех программистов — <strong>roadmap.sh/frontend</strong>. На первый взгляд она огромная, как карта вселенной! Но секрет в том, что тебе <strong>не нужно учить всё сразу</strong>. Внутри твоего сайта от Google AI Studio <strong>уже живут</strong> главные сокровища с этой карты!
            </p>
          </div>
        </div>
      </div>

      {/* ЧАСТЬ 2. ПРОСТОЙ СЛОВАРЬ РАЗРАБОТЧИКА (20 МИНУТ) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              🧩 ЧАСТЬ 2 · ПРОСТОЙ СЛОВАРЬ РАЗРАБОТЧИКА (20 МИНУТ)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              6 главных тем с карты Frontend — простыми словами на пальцах
            </h2>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
            Понятно для 12+
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dictionaryCards.map((card, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.badgeColor} border space-y-3 flex flex-col justify-between`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{card.num}</span>
                  <h3 className="text-base sm:text-lg font-black text-white">{card.title}</h3>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 bg-slate-950/70 px-3 py-2 rounded-xl border border-slate-800/80">
                  {card.analogy}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 pt-1">
                  {card.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ЧАСТЬ 3. БОЛЬШАЯ ПРАКТИКА: ДЕЛАЕМ ВСЁ САМИ БЕЗ ИИ (45 МИНУТ) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
              🛠️ ЧАСТЬ 3 · БОЛЬШАЯ ПРАКТИКА: ДЕЛАЕМ ВСЁ САМИ БЕЗ ИИ (45 МИНУТ)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              6 шагов от скачивания проекта до публикации в интернет
            </h2>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Правило практики: Чат с ИИ закрыт! Работаем только руками, глазами и терминалом.</span>
          </div>
        </div>

        {/* 6 Steps Cards */}
        <div className="space-y-4">
          {practiceSteps.map((st) => {
            const isDone = !!checkedSteps[st.step];
            return (
              <div
                key={st.step}
                className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-black text-sm flex items-center justify-center">
                      {st.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">{st.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleStep(st.step)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Шаг изучен ✓' : 'Отметить шаг'}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{st.description}</p>

                {st.filesInfo && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {st.filesInfo.map((f, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <FileCode2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <div className="font-mono font-bold text-white">{f.name}</div>
                          <div className="text-slate-400">{f.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {st.commands && (
                  <div className="space-y-2">
                    {st.commands.map((c, cIdx) => {
                      const copyKey = `step-${st.step}-cmd-${cIdx}`;
                      return (
                        <div
                          key={cIdx}
                          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <code className="text-xs sm:text-sm font-mono font-bold text-emerald-300 block">
                              $ {c.cmd}
                            </code>
                            <span className="text-[11px] text-slate-400 block">{c.comment}</span>
                          </div>
                          <button
                            onClick={() => handleCopy(copyKey, c.cmd)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            {copiedId === copyKey ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Скопировано</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Копировать</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {st.testExample && (
                  <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto">
                    {st.testExample}
                  </pre>
                )}

                {st.highlight && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 font-semibold">
                    {st.highlight}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-black text-white">
                💻 Интерактивный тренажёр Терминала Antigravity IDE
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Нажми на любую команду, чтобы увидеть, как отвечает компьютер:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {terminalSimulation.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCmdIdx(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeCmdIdx === idx
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>{item.cmd}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
              <span>antigravity-ide — bash — {terminalSimulation[activeCmdIdx].title}</span>
              <span className="text-cyan-400">{terminalSimulation[activeCmdIdx].desc}</span>
            </div>
            <div className="text-emerald-400 font-bold">
              student@antigravity:~/my-ai-studio-site$ {terminalSimulation[activeCmdIdx].cmd}
            </div>
            <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">
              {terminalSimulation[activeCmdIdx].output}
            </pre>
          </div>
        </div>
      </div>

      {/* 📋 ШПАРГАЛКА НАСТОЯЩЕГО РАЗРАБОТЧИКА */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/30 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" /> 📋 Шпаргалка настоящего разработчика (сохрани себе!)
          </h2>
          <span className="text-xs font-mono text-cyan-300">7 главных команд терминала</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                <th className="py-3 px-4 font-bold">Что я хочу сделать</th>
                <th className="py-3 px-4 font-bold">Какую команду пишу в терминале</th>
                <th className="py-3 px-4 font-bold text-right">Скопировать</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {[
                { goal: 'Проверить, установлен ли Node.js', cmd: 'node -v' },
                { goal: 'Установить все пакеты и детали сайта (1 раз в начале)', cmd: 'npm install' },
                { goal: 'Запустить сайт у себя на компьютере', cmd: 'npm run dev' },
                { goal: 'Остановить работающий сайт в терминале', cmd: 'Ctrl + C' },
                { goal: 'Запустить роботов-проверяющих (тесты)', cmd: 'npm test' },
                { goal: 'Собрать чистовую версию сайта для интернета', cmd: 'npm run build' },
                {
                  goal: 'Сохранить изменения и отправить в GitHub',
                  cmd: 'git add . && git commit -m "Моё обновление" && git push'
                }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50">
                  <td className="py-3 px-4 font-medium">{row.goal}</td>
                  <td className="py-3 px-4 font-mono text-emerald-300 font-bold">{row.cmd}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCopy(`cheat-${idx}`, row.cmd)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `cheat-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === `cheat-${idx}` ? 'ОК' : 'Копия'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🛟 ЧТО ДЕЛАТЬ, ЕСЛИ ЧТО-ТО ПОШЛО НЕ ТАК (ШПАРГАЛКА БЕЗ ПАНИКИ) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-xl space-y-5">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            🛟 Что делать, если что-то пошло не так (Шпаргалка без паники)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs sm:text-sm font-black text-rose-300 flex items-start gap-2">
                <span>❓</span>
                <span>{item.problem}</span>
              </div>
              <div className="text-xs sm:text-sm text-emerald-200 leading-relaxed flex items-start gap-2">
                <span>✅</span>
                <span><strong>Решение:</strong> {item.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🏁 ИТОГ УРОКА (РЕФЛЕКСИЯ НА 5 МИНУТ) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/25 to-slate-900 border-2 border-emerald-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" /> 🏁 ИТОГ УРОКА (РЕФЛЕКСИЯ НА 5 МИНУТ)
          </span>
          <span className="text-xs font-mono text-emerald-300 font-bold">+20 ОП за рефлексию</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          Обсуди с классом и запиши свой вывод:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300 block mb-1">Вопрос 1:</strong>
            Чем отличается работа через подсказки ИИ от того, что мы сделали сегодня сами в терминале?
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300 block mb-1">Вопрос 2:</strong>
            Какая команда в терминале понравилась тебе больше всего?
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300 block mb-1">Вопрос 3:</strong>
            Кому ты сегодня отправишь ссылку на свой опубликованный сайт?
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            rows={2}
            value={ReflectionAnswer}
            onChange={(e) => setReflectionAnswer(e.target.value)}
            placeholder="Напиши, какая команда в терминале понравилась тебе больше всего и кому ты отправишь ссылку на свой сайт..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (!reflectionSaved && ReflectionAnswer.trim()) {
                  setReflectionSaved(true);
                  addReward(20, '🌟 Рефлексия настоящего разработчика сохранена! (+20 ОП)');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm cursor-pointer transition-all"
            >
              {reflectionSaved ? '✓ Ответ сохранён (+20 ОП)' : 'Сохранить мой ответ (+20 ОП)'}
            </button>
            <span className="text-xs sm:text-sm font-bold text-emerald-300">
              🌟 Поздравляем! Теперь ты не просто пользователь ИИ — ты начинающий Frontend-разработчик, который умеет управлять кодом, терминалом и публикацией сайтов самостоятельно!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
