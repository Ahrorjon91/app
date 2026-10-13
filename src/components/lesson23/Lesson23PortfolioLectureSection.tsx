import React, { useState } from 'react';
import {
  Trophy,
  Copy,
  Check,
  CheckCircle2,
  Award,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson23PortfolioLectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lectureCompleted, setLectureCompleted] = useState(false);

  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflection4, setReflection4] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCompleteLecture = () => {
    if (!lectureCompleted) {
      setLectureCompleted(true);
      addReward(35, '📖 Лекция Урока 23 пройдена! (+35 ОП)');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const passportTemplate = `НАЗВАНИЕ: ______________________________
ЧТО ЭТО: (1 предложение) _______________
ИНСТРУМЕНТЫ: ___________________________
ССЫЛКА «ОТКРЫТЬ»: https://________________
ССЫЛКА «GITHUB»: https://_________________
СКРИНШОТ: (файл) ________________________
ЧЕМУ НАУЧИЛСЯ(АСЬ): (1–2 предложения) ___
РАБОТАЕТ? ✅ / ❌   (проверено ____ числа)`;

  const portfolioMainPrompt = `Ты опытный веб-дизайнер и специалист по личным портфолио.

Создай современный, аккуратный одностраничный сайт-портфолио для ученика-создателя проектов с ИИ. Используй ТОЛЬКО информацию ниже.

ДАННЫЕ
Имя: [твоё имя]
Слоган: [например, «Создаю сайты, приложения и автоматизации с ИИ»]
О себе: [2–3 предложения, без личных данных]
Стиль: [например, современный, тёмный, с градиентами]
Основной цвет: [например, фиолетовый]

ПРОЕКТЫ (для каждого: название, описание, инструменты, ссылка «Открыть», ссылка «GitHub»)
1. [Название 1] — [описание] — [инструменты] — [ссылка] — [GitHub]
2. [Название 2] — [описание] — [инструменты] — [ссылка] — [GitHub]
3. [Название 3] — [описание] — [инструменты] — [ссылка] — [GitHub]
(добавь свои проекты по тому же образцу)

НАВЫКИ: [HTML, CSS, JavaScript, Git и GitHub, Vercel, промпты, n8n, Telegram-бот, презентации]

СТРУКТУРА СТРАНИЦЫ
1. Главный экран: имя, слоган, кнопка «Смотреть проекты».
2. Обо мне.
3. Проекты: карточки с названием, описанием, инструментами и двумя кнопками.
4. Чему я научился.
5. Как я работаю с ИИ: 3 правила (проверяю результат, ничего не выдумываю, не делюсь личными данными).
6. Подвал: «Сделано в AI FOR LIFE 12+».

ПРАВИЛА
- Не выдумывай проекты, награды, отзывы, цифры и опыт.
- Не добавляй телефон, адрес, школу, класс и другие личные данные.
- Если для проекта нет картинки, используй аккуратную цветную заглушку.
- Все кнопки-ссылки должны вести ровно на те адреса, которые я указал.
- Сайт должен хорошо выглядеть на телефоне.
- Текст короткий, дружелюбный и понятный.`;

  const followUpPrompts = [
    {
      id: 'fu-premium',
      title: '✨ Премиум-эффекты',
      text: `Сделай дизайн портфолио более премиальным: плавное появление блоков при скролле, аккуратные эффекты при наведении на карточки, градиенты и глубина. Не ломай макет, оставь все ссылки рабочими и сайт быстрым на телефоне.`
    },
    {
      id: 'fu-mobile',
      title: '📱 Проверка на телефоне',
      text: `Проверь сайт на узком экране телефона и исправь все проблемы: текст не должен вылезать за экран, кнопки должны быть удобными для нажатия, картинки аккуратно подгоняться.`
    },
    {
      id: 'fu-clarity',
      title: '🧭 Понятность',
      text: `Улучши заголовки и подписи на сайте, чтобы любому посетителю сразу было понятно, кто я, что я создал(а) и куда нажимать. Добавь короткие подсказки там, где это нужно.`
    }
  ];

  const readmeTemplate = `# Моё портфолио

Портфолио ученика курса AI FOR LIFE 12+.

## Ссылка на сайт
https://твоя-ссылка.vercel.app

## Что внутри
- Проект 1: ...
- Проект 2: ...

## Инструменты
Google AI Studio, GitHub, Vercel, n8n, Gamma

## Чему научился(ась)
- Писать понятные промпты
- Публиковать сайты
- Создавать автоматизации`;

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-200" />
            Урок 23 · 12+ · 90 минут · Google AI Studio + GitHub + Vercel + Gamma
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            🏆 Урок 23. Повторяем всё пройденное и создаём своё премиум-портфолио
          </h2>
          <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-3xl">
            <strong>Для кого:</strong> ученики 12+ · <strong>Язык:</strong> русский · <strong>Время:</strong> 90 минут
            <br />
            <strong>Инструменты:</strong> Google AI Studio, Antigravity IDE, GitHub, Vercel, Gamma, твои проекты из прошлых уроков
          </p>
          <div className="p-4 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/20 text-sm leading-relaxed">
            🎯 <strong>Идея урока:</strong> за курс ты создал(а) много всего: сайты, приложения, бота, автоматизации. Сегодня мы <strong>собираем всё в одно место</strong>, в личное портфолио-сайт, и готовим красивую презентацию. На Уроке 24 ты покажешь свою работу родителям.
          </div>
        </div>
      </div>

      {/* ЦЕЛИ И ПЛАН УРОКА */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold flex items-center gap-2 text-amber-600 dark:text-amber-400">
            🎯 Цели урока
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            К концу урока ученик сможет:
          </p>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>вспомнить и коротко рассказать о каждом блоке курса;</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>собрать <strong>«Паспорта проектов»</strong>: название, ссылка, инструменты, чему научился;</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>создать портфолио-сайт со всеми проектами и опубликовать его;</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>проверить, что <strong>все ссылки работают</strong>;</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>начать готовить презентацию и выступление на 3 минуты.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Clock className="w-5 h-5" /> ⏱ План урока (90 минут)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <th className="py-2 pr-3 font-bold">Время</th>
                  <th className="py-2 font-bold">Блок</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">10 мин</td>
                  <td className="py-2">Вводная: зачем нужно портфолио</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">15 мин</td>
                  <td className="py-2">Повторение курса: карта и блиц</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">10 мин</td>
                  <td className="py-2">Демонстрация преподавателя: пример портфолио</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">40 мин</td>
                  <td className="py-2">Лабораторная работа (4 части)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">5 мин</td>
                  <td className="py-2">Мини-детектив: проверка ссылок</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">5 мин</td>
                  <td className="py-2">Рефлексия и загрузка работы</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ПРАВИЛА БЕЗОПАСНОСТИ */}
      <div className="rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/70 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          🛡️ Правила безопасности (прочитай первым!)
        </h3>
        <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
          Портфолио будет <strong>в интернете</strong>, поэтому личные данные нужно беречь:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-950 dark:text-amber-100">
          {[
            '1. 🔒 Не публикуй личное: домашний адрес, номер телефона, школу и класс, паспортные данные, точное расписание, геолокацию.',
            '2. 👤 Достаточно имени (или имени и первой буквы фамилии). Если сомневаешься, спроси родителей и преподавателя.',
            '3. 📸 Фото добавляй только с разрешения родителей. Если не хочешь, используй рисунок, аватар или логотип.',
            '4. ✉️ Контакты (почта, Telegram) добавляй только те, которые одобрили родители. Лучше вообще не добавлять телефон.',
            '5. 🔑 Токены и пароли (бот, n8n, GitHub) никогда не попадают на сайт, в код и на скриншоты.',
            '6. ✅ Только правда. Не придумывай проекты, награды и опыт. Пиши только то, что ты реально сделал(а).',
            '7. 🤝 Честно про ИИ. Укажи, что проекты сделаны с помощью ИИ-инструментов, и что именно сделал(а) ты: идея, проверка, исправления.',
            '8. 🖼️ Чужое не берём. Только свои скриншоты и картинки, разрешённые изображения.'
          ].map((rule, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/85 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60">
              {rule}
            </div>
          ))}
        </div>
      </div>

      {/* 1. ЧТО ТАКОЕ ПОРТФОЛИО И ЗАЧЕМ ОНО НУЖНО */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <BookOpen className="w-4 h-4" /> 📖 ЛЕКЦИЯ
        </div>
        <h3 className="text-xl font-extrabold">
          1. Что такое портфолио и зачем оно нужно?
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Портфолио</strong> — это «витрина» твоих работ. Вместо того чтобы рассказывать «я умею», ты <strong>показываешь</strong>: вот сайт, вот приложение, вот бот.
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm space-y-2">
          <div className="font-bold">Его можно показать:</div>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
            <li>родителям и учителям;</li>
            <li>друзьям;</li>
            <li>на будущей стажировке или при поступлении в кружок или вуз.</li>
          </ul>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-sm font-medium text-indigo-950 dark:text-indigo-200">
          🧠 <strong>Главная идея:</strong> хороший проект без портфолио легко потерять. Портфолио собирает всё в одно место, и достаточно <strong>одной ссылки</strong>.
        </div>
      </div>

      {/* 2. КАРТА КУРСА: ЧТО МЫ ИЗУЧИЛИ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold">
          2. Карта курса: что мы изучили
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Вспомни путь по блокам:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4 font-bold">Блок</th>
                <th className="py-2.5 pr-4 font-bold">Что делали</th>
                <th className="py-2.5 font-bold">Что осталось в портфолио</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2.5 pr-4 font-bold">🧠 ИИ и промпты</td>
                <td className="py-2.5 pr-4">Как работает ИИ, как писать хорошие запросы</td>
                <td className="py-2.5">Умение формулировать задачи для ИИ</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🎨 Дизайн</td>
                <td className="py-2.5 pr-4">Google Stitch: дизайн интерфейса (например, сайт автомобиля)</td>
                <td className="py-2.5">Скриншоты дизайна</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🌐 Сайты: HTML, CSS, JS</td>
                <td className="py-2.5 pr-4">Создание сайта в AI Studio, публикация на GitHub, живой сайт</td>
                <td className="py-2.5">Ссылка на сайт + репозиторий GitHub</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🎞️ Движение и медиа</td>
                <td className="py-2.5 pr-4">Анимации, картинки и видео для сайтов</td>
                <td className="py-2.5">Сайт с эффектами</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🧰 Frontend-дорожная карта</td>
                <td className="py-2.5 pr-4">HTML, CSS, JS, Git, GitHub, npm, React, Tailwind, Vitest; запуск и публикация вручную</td>
                <td className="py-2.5">Проект, запущенный и опубликованный самостоятельно</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">💼 Мини-агентство (Урок 16)</td>
                <td className="py-2.5 pr-4">Поиск местного бизнеса, демо-сайт, публикация, вежливое сообщение</td>
                <td className="py-2.5">Демо-сайт для бизнеса</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">📱 Мобильные приложения</td>
                <td className="py-2.5 pr-4">Android-приложение в Google AI Studio (Урок 19)</td>
                <td className="py-2.5">Скриншоты и описание приложения</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🤖 Автоматизация (Уроки 20–21)</td>
                <td className="py-2.5 pr-4">n8n, Telegram-бот, MCP и Claude</td>
                <td className="py-2.5">Скриншоты workflow, бот и результат</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold">🎓 Помощники для учёбы и творчества (Урок 22)</td>
                <td className="py-2.5 pr-4">NotebookLM, Pomelli, Gamma</td>
                <td className="py-2.5">Презентация и рекламный пост</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-sm text-amber-950 dark:text-amber-200">
          📝 В твоём курсе были и другие проекты (приложения, игры, мессенджеры, квизы и т. д.). Добавляй в портфолио <strong>всё, что реально сделал(а) и что работает</strong>.
        </div>
      </div>

      {/* 3. ЧТО ДОЛЖНО БЫТЬ НА ПОРТФОЛИО-САЙТЕ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold">
          3. Что должно быть на портфолио-сайте
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Классическая структура:
        </p>
        <div className="space-y-2.5 text-sm">
          {[
            '1. Главный экран: твоё имя, короткий слоган, например «Начинающий создатель сайтов и приложений с ИИ».',
            '2. Обо мне: 2–3 предложения (что изучал(а), что нравится). Без личных данных.',
            '3. Мои проекты: карточки проектов. В каждой: название, картинка (скриншот), 1–2 предложения, инструменты, кнопки «Открыть» и «Код на GitHub».',
            '4. Чему я научился(ась): список навыков (HTML/CSS/JS, Git/GitHub, Vercel, промпты, n8n, Telegram-бот, презентации).',
            '5. Как я работаю с ИИ: 3 правила (проверяю, не выдумываю, не делюсь личным).',
            '6. Контакты (по желанию и с разрешения родителей): одна одобренная ссылка.',
            '7. Подвал: «Сделано в AI FOR LIFE 12+».'
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 4. «ПАСПОРТ ПРОЕКТА» — ГЛАВНЫЙ ИНСТРУМЕНТ УРОКА */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-xl font-extrabold">
            4. «Паспорт проекта» — главный инструмент урока
          </h3>
          <button
            onClick={() => handleCopy('passport', passportTemplate)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-200 transition"
          >
            {copiedId === 'passport' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedId === 'passport' ? 'Скопировано' : 'Скопировать шаблон паспорта'}
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <strong>Паспорт проекта</strong> — маленькая карточка, в которой ты собираешь всё важное. Заполни её <strong>для каждого проекта</strong>.
        </p>
        <pre className="p-4 rounded-2xl bg-slate-900 text-amber-200 text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
          {passportTemplate}
        </pre>
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-sm text-amber-950 dark:text-amber-200">
          💡 Если у проекта нет публичной ссылки (например, бот в n8n), добавь <strong>скриншот</strong> и короткое описание. Никогда не публикуй токен!
        </div>
      </div>

      {/* 5. КАК ПРАВИЛЬНО ПИСАТЬ ОПИСАНИЕ ПРОЕКТА */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold">
          5. Как правильно писать описание проекта
        </h3>
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-sm font-bold text-indigo-950 dark:text-indigo-200">
          Формула из 3 частей: «Что это» → «Как работает» → «Чему научился».
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-sm text-emerald-950 dark:text-emerald-200 space-y-1">
          <div className="font-bold">Пример:</div>
          <p>
            <strong>Демо-сайт для салона красоты.</strong> Одностраничный сайт с кнопками «Позвонить» и WhatsApp. Я сделал(а) его в Google AI Studio и опубликовал(а) через GitHub и Vercel. Научился(ась) писать точные промпты и проверять результат на телефоне.
          </p>
        </div>
      </div>

      {/* 6. ПРОМПТ ДЛЯ СОЗДАНИЯ ПОРТФОЛИО-САЙТА */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-xl font-extrabold">
            6. Промпт для создания портфолио-сайта (на русском)
          </h3>
          <button
            onClick={() => handleCopy('main-prompt', portfolioMainPrompt)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 transition"
          >
            {copiedId === 'main-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedId === 'main-prompt' ? 'Скопировано' : 'Скопировать промпт'}
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Скопируй и <strong>замени всё в <code>[квадратных скобках]</code></strong> своими данными. Если данных нет, удали строку, а не выдумывай:
        </p>
        <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
          {portfolioMainPrompt}
        </pre>
      </div>

      {/* 7. FOLLOW-UP-ПРОМПТЫ ДЛЯ УЛУЧШЕНИЯ ПОРТФОЛИО */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold">
          7. Follow-up-промпты для улучшения портфолио
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {followUpPrompts.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="font-bold text-sm text-indigo-700 dark:text-indigo-300">{p.title}</div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {p.text}
                </p>
              </div>
              <button
                onClick={() => handleCopy(p.id, p.text)}
                className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-indigo-50 transition"
              >
                {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === p.id ? 'Скопировано' : 'Скопировать'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8. ПУБЛИКАЦИЯ ПОРТФОЛИО И 9. ФАЙЛ README */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-extrabold">
            8. Публикация портфолио (повторяем)
          </h3>
          <div className="space-y-2.5 text-sm">
            {[
              '1. Скачай проект из AI Studio и открой в Antigravity IDE.',
              '2. Проверь локально: npm install → npm run dev.',
              '3. Сохрани в Git и отправь на GitHub (кнопками или командами).',
              '4. Подключи репозиторий к Vercel и нажми Deploy.',
              '5. Получи ссылку и проверь её на телефоне.',
              '6. Обновления: изменил → commit → push → Vercel обновит сайт сам.'
            ].map((step, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-xl font-extrabold">
              9. Файл README для портфолио
            </h3>
            <button
              onClick={() => handleCopy('readme', readmeTemplate)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 transition"
            >
              {copiedId === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === 'readme' ? 'Скопировано' : 'Скопировать README'}
            </button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>README</strong> — это «обложка» репозитория на GitHub. Создай файл <code>README.md</code> с такими разделами:
          </p>
          <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
            {readmeTemplate}
          </pre>
        </div>
      </div>

      {/* 10. ТЕСТИРУЙ КАК НАСТОЯЩИЙ ПОЛЬЗОВАТЕЛЬ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold">
          10. Тестируй как настоящий пользователь
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Прежде чем показывать портфолио, пройди чек-лист:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                <th className="py-2 pr-4 font-bold">Проверка</th>
                <th className="py-2 font-bold">✅ / ❌</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                'Сайт открывается по ссылке с телефона',
                'Все кнопки «Открыть» ведут на нужные проекты',
                'Все кнопки «GitHub» открываются',
                'Нет опечаток в имени и названиях',
                'Нет личных данных (адрес, телефон, школа)',
                'Картинки загружаются',
                'Текст читается на узком экране'
              ].map((checkItem, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 pr-4 font-medium">{checkItem}</td>
                  <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-bold">✅ / ❌</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ */}
      <div className="rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-extrabold text-indigo-950 dark:text-indigo-200">
          🎬 ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ (10 минут)
        </h3>
        <p className="text-sm text-indigo-900/90 dark:text-indigo-200/90">
          Преподаватель показывает на экране:
        </p>
        <div className="space-y-2 text-sm text-indigo-950 dark:text-indigo-100">
          {[
            '1. Готовый пример портфолио-сайта.',
            '2. Заполнение «Паспорта проекта» для одного проекта.',
            '3. Вставку промпта в Google AI Studio и получение первой версии.',
            '4. Один follow-up-промпт и сравнение «до / после».',
            '5. Проверку ссылок по чек-листу.'
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-indigo-200/70 dark:border-indigo-800/50">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* РЕФЛЕКСИЯ И ИТОГ */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-xl font-extrabold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          💬 РЕФЛЕКСИЯ (5 минут)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              1. Каким проектом из курса ты гордишься больше всего и почему?
            </label>
            <input
              type="text"
              value={reflection1}
              onChange={(e) => setReflection1(e.target.value)}
              placeholder="Твой ответ..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              2. Что стало самым трудным при сборке портфолио?
            </label>
            <input
              type="text"
              value={reflection2}
              onChange={(e) => setReflection2(e.target.value)}
              placeholder="Твой ответ..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              3. Чему ты научился(ась) за курс, чего не умел(а) раньше?
            </label>
            <input
              type="text"
              value={reflection3}
              onChange={(e) => setReflection3(e.target.value)}
              placeholder="Твой ответ..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              4. Что хочешь рассказать родителям в первую очередь?
            </label>
            <input
              type="text"
              value={reflection4}
              onChange={(e) => setReflection4(e.target.value)}
              placeholder="Твой ответ..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
          🏁 <strong>Итог:</strong> Сегодня ты собрал(а) свой путь в одном месте: проекты, ссылки, скриншоты и описание. <strong>Портфолио — это твоя визитная карточка.</strong> На Уроке 24 ты покажешь её родителям и расскажешь, чему научился(ась). Подготовь выступление, проверь ссылки и возьми с собой уверенность. 🌟
        </div>

        {/* COMPLETE LECTURE INFO */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Прочитал(а) лекцию? Отметь выполнение и переходи к разделу <strong>2. Лабораторная работа</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
