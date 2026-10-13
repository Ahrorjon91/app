import React, { useState } from 'react';
import {
  Smartphone,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Award,
  Sparkles,
  RefreshCw,
  Bug,
  Download,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson19AndroidLectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveReflection = () => {
    if (reflectionSaved) return;
    setReflectionSaved(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addReward(25, '🏁 Итоги Урока 19 сохранены! (+25 ОП)');
  };

  const studyPlannerPromptEn = `Build a simple Android app called Study Planner.
Use Jetpack Compose and Material 3.
Allow the user to add tasks, mark them as completed, filter by priority, and see a progress summary on the main screen.
Keep the design clean, mobile-friendly, and easy to use.`;

  const studyPlannerPromptRu = `Создай простое Android-приложение «Планировщик учёбы» (Study Planner).
Используй Jetpack Compose и Material 3.
Пользователь должен уметь добавлять задачи, отмечать их выполненными, фильтровать по важности и видеть общий прогресс на главном экране.
Дизайн должен быть чистым, удобным для телефона и простым.`;

  const fixPromptEn = `Move the Add Task button slightly higher so it does not overlap the bottom navigation.
Increase spacing between task cards.`;

  const fixPromptRu = `Подними кнопку добавления задачи немного выше, чтобы она не перекрывала нижнюю панель.
Увеличь расстояние между карточками задач.`;

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 p-6 sm:p-10 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            УРОК 19 • ЛЕКЦИЯ УРОКА
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            Для кого: ученики 12+ · Язык: русский · Время: 90 минут
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            Инструменты (бесплатные): Google AI Studio (Build), браузер, по желанию Android-телефон
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          📱 Урок 19. Создаём своё первое Android-приложение в Google AI Studio
        </h1>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong>Идея урока:</strong> по простому описанию (промпту) ИИ создаёт приложение, мы смотрим его в браузере, находим проблемы и улучшаем короткими подсказками.
          </p>
        </div>
      </div>

      {/* ЦЕЛИ УРОКА */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <span>🎯</span>
          <span>Цели урока — чему ты научишься</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">К концу урока ты сможешь:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'открыть режим создания Android-приложений в Google AI Studio;',
            'написать понятный первый промпт для своего приложения;',
            'протестировать приложение прямо в браузере на виртуальном телефоне;',
            'найти ошибки во внешнем виде (UI) и в работе кнопок;',
            'улучшить приложение короткими уточняющими промптами (итерациями);',
            'запустить приложение на своём телефоне или сохранить его код.'
          ].map((goal, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-200">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* РАЗДЕЛ 1 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 1</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          1. Что такое создание Android-приложений в Google AI Studio
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Раньше, чтобы сделать приложение для телефона, нужно было долго учить языки программирования и устанавливать тяжёлые программы.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          В <strong>Google AI Studio (режим Build)</strong> ты описываешь приложение обычными словами, а ИИ сам создаёт:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '📱', title: 'Экраны и кнопки', desc: 'Готовый мобильный интерфейс' },
            { icon: '🎨', title: 'Современный дизайн', desc: 'В стиле Android (Material 3)' },
            { icon: '⚙️', title: 'Рабочую логику', desc: 'Добавление, удаление, подсчёт' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-lg">{item.icon}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{item.title}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
          <div className="text-xs font-bold text-emerald-300 uppercase font-mono">Схема работы очень простая:</div>
          <pre className="text-xs sm:text-sm font-mono text-emerald-200 overflow-x-auto whitespace-pre-wrap">
            {`Идея → Промпт → Готовый черновик → Проверка на экране телефона → Короткие правки → Готовое приложение`}
          </pre>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs sm:text-sm text-amber-200 leading-relaxed">
          💡 <strong>Главная мысль урока:</strong> первое приложение от ИИ — это <strong>черновик</strong>. Настоящий разработчик проверяет его и доводит до ума шаг за шагом.
        </div>
      </div>

      {/* РАЗДЕЛ 2 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 2</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          2. Открываем Google AI Studio и выбираем Android
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 flex-wrap">
            <span>
              1. Перейди на сайт <strong>aistudio.google.com</strong> и войди в свой Google-аккаунт.
            </span>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1"
            >
              <span>aistudio.google.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            2. Открой раздел <strong>Build</strong> (Создание).
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            3. Нажми <strong>New App</strong> (Новое приложение).
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            4. Переключи платформу с <strong>Web</strong> на <strong>Android</strong> (или выбери <strong>Android App</strong> в меню Platforms).
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-xs sm:text-sm text-cyan-200 leading-relaxed">
          📌 <strong>Почему это важно:</strong> если оставить Web, ИИ сделает обычный сайт, а не мобильное приложение для Android.
        </div>
      </div>

      {/* РАЗДЕЛ 3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 3</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          3. Как написать хороший первый промпт
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Для первого запуска не нужно писать огромное сочинение. Достаточно <strong>4 понятных пунктов</strong>:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 pr-4">Что указать</th>
                <th className="py-2.5 px-4">Простой вопрос</th>
                <th className="py-2.5 pl-4">Пример</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              <tr>
                <td className="py-2.5 pr-4 font-bold text-violet-300">1. Что это за приложение?</td>
                <td className="py-2.5 px-4">Как называется и для чего?</td>
                <td className="py-2.5 pl-4">Планировщик учёбы (Study Planner)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold text-violet-300">2. Для кого оно?</td>
                <td className="py-2.5 px-4">Кто им пользуется?</td>
                <td className="py-2.5 pl-4">Для школьников</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold text-violet-300">3. Главные функции (3–4 штуки)</td>
                <td className="py-2.5 px-4">Что можно делать внутри?</td>
                <td className="py-2.5 pl-4">Добавлять задачи, отмечать выполненные, фильтр по важности, прогресс</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-bold text-violet-300">4. Какой стиль?</td>
                <td className="py-2.5 px-4">Как должно выглядеть?</td>
                <td className="py-2.5 pl-4">Чистый, современный, удобный для телефона (Material 3)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Пример готового промпта (English) */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Пример готового промпта (можно на английском или русском):
            </span>
            <button
              onClick={() => handleCopy('prompt-en', studyPlannerPromptEn)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
            >
              {copiedId === 'prompt-en' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === 'prompt-en' ? 'Скопировано!' : 'Копировать EN'}
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
            {studyPlannerPromptEn}
          </pre>
        </div>

        {/* То же самое по-русски */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              То же самое по-русски:
            </span>
            <button
              onClick={() => handleCopy('prompt-ru', studyPlannerPromptRu)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5"
            >
              {copiedId === 'prompt-ru' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === 'prompt-ru' ? 'Скопировано!' : 'Копировать RU'}
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-cyan-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
            {studyPlannerPromptRu}
          </pre>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          ℹ️ <strong>Что за слова в промпте:</strong>
          <ul className="list-disc pl-5 mt-1.5 space-y-1">
            <li><strong>Jetpack Compose</strong> — современный способ рисовать экраны на Android.</li>
            <li><strong>Material 3</strong> — фирменный красивый стиль кнопок, карточек и цветов в Android.</li>
          </ul>
        </div>
      </div>

      {/* РАЗДЕЛ 4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 4</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          4. Первая сборка и предпросмотр (Preview)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          После отправки промпта ИИ создаст файлы проекта и покажет <strong>Preview</strong> — виртуальный экран телефона прямо в браузере.
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-slate-200">
          <div className="font-bold text-white">Что нужно проверить сразу на экране предпросмотра:</div>
          {[
            'Открывается ли главный экран без ошибок?',
            'Понятно ли, куда нажимать?',
            'Работает ли главная кнопка (например, «Добавить задачу»)?',
            'Меняется ли экран, когда ты ставишь галочку «Выполнено»?',
            'Переключаются ли вкладки внизу экрана?'
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
              <span className="text-emerald-400 font-mono font-bold">{idx + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* РАЗДЕЛ 5 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Bug className="w-6 h-6 text-rose-400" />
          <span>5. Какие ошибки часто бывают в первой версии</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Даже у хорошего ИИ первая версия почти всегда имеет мелкие недочёты. Вот что встречается чаще всего:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2.5">
            <h3 className="text-sm font-black text-rose-300">🎨 Проблемы внешнего вида (UI / Layout):</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-1.5">
              <li>кнопки налезают друг на друга или на нижнее меню;</li>
              <li>текст обрезается или слишком мелкий;</li>
              <li>карточки прилипли друг к другу (мало отступов);</li>
              <li>экран не прокручивается вниз, когда задач много;</li>
              <li>плохо виден текст на фоне (слабый контраст).</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2.5">
            <h3 className="text-sm font-black text-amber-300">⚙️ Проблемы в работе (Логика):</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-1.5">
              <li>кнопка нажимается, но ничего не происходит;</li>
              <li>льзя добавить пустую задачу без названия;</li>
              <li>счётчик прогресса не меняется, когда задачу выполнили.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* РАЗДЕЛ 6 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-amber-400" />
          <span>6. Золотое правило улучшений (Итерации)</span>
        </h2>

        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs sm:text-sm text-rose-200 leading-relaxed">
          ⚠️ <strong>Не проси ИИ переделать всё приложение целиком!</strong> Если написать «Переделай всё красиво и добавь ещё 10 функций», ИИ может сломать то, что уже работало.
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 leading-relaxed">
          ✅ <strong>Правило разработчика:</strong> один короткий промпт = <strong>1–2 конкретных изменения</strong>.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Пример правильного промпта для исправления (EN):</span>
              <button
                onClick={() => handleCopy('fix-en', fixPromptEn)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-mono flex items-center gap-1"
              >
                {copiedId === 'fix-en' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-200 font-mono text-xs whitespace-pre-wrap">
              {fixPromptEn}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">По-русски (RU):</span>
              <button
                onClick={() => handleCopy('fix-ru', fixPromptRu)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center gap-1"
              >
                {copiedId === 'fix-ru' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-cyan-200 font-mono text-xs whitespace-pre-wrap">
              {fixPromptRu}
            </pre>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-white uppercase font-mono">Ещё примеры хороших коротких правок:</div>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-300 space-y-1">
            <li>«Сделай заголовки крупнее и добавь тёмную тему».</li>
            <li>«Не разрешай сохранять пустую задачу без текста».</li>
            <li>«Добавь кнопку удаления задачи со значком корзины».</li>
            <li>«Сделай так, чтобы список задач плавно прокручивался вниз».</li>
          </ul>
        </div>
      </div>

      {/* РАЗДЕЛ 7 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 7</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          7. Цикл проверки: Правка → Тест → Правка
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">После каждого изменения обязательно проверь:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            'Исправилась ли та проблема, о которой ты писал?',
            'Не сломались ли старые кнопки, которые работали раньше?',
            'Удобно ли нажимать элементы пальцем на экране телефона?'
          ].map((step, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-mono font-bold text-cyan-400">ШАГ {i + 1}</div>
              <div className="text-xs sm:text-sm text-slate-200">{step}</div>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-emerald-300 font-bold">
          Обычно за 3–5 таких коротких шагов приложение становится аккуратным и удобным.
        </p>
      </div>

      {/* РАЗДЕЛ 8 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 8</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <QrCode className="w-6 h-6 text-violet-400" />
          <span>8. Как проверить приложение на настоящем телефоне или сохранить проект</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Когда приложение в браузере работает отлично, у тебя есть <strong>3 способа</strong>, что сделать дальше:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">Способ 1 (самый простой на уроке)</div>
            <h3 className="text-sm font-black text-white">Предпросмотр в браузере</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ты тестируешь все экраны и кнопки прямо внутри Google AI Studio. Ничего устанавливать не нужно.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">Способ 2 (на своём Android-телефоне)</div>
            <h3 className="text-sm font-black text-white">Запуск через QR-код или APK</h3>
            <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
              <li>В Google AI Studio можно отсканировать <strong>QR-код</strong> камерой телефона или скачать установочный файл <strong>APK</strong>.</li>
              <li><em>Важно:</em> устанавливай только своё собственное приложение и с разрешения учителя или родителей.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-violet-400 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>Способ 3 (для будущих уроков)</span>
            </div>
            <h3 className="text-sm font-black text-white">Скачать исходный код (Download / Export)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Нажми кнопку скачивания проекта (ZIP-архив). Внутри лежат все настоящие файлы Android-приложения (на языке Kotlin). Позже их можно открыть в профессиональной программе <strong>Android Studio</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* РАЗДЕЛ 9: ШПАРГАЛКА */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
          <span>Раздел 9</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          9. Шпаргалка по промптам для Android-приложений
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 pr-4">Что ты хочешь сделать</th>
                <th className="py-2.5 pl-4">Что написать ИИ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              {[
                {
                  goal: 'Создать приложение с нуля',
                  prompt: '«Создай Android-приложение [название] на Jetpack Compose и Material 3. Функции: [1, 2, 3]. Дизайн чистый и удобный для телефона».'
                },
                {
                  goal: 'Кнопка перекрывает меню',
                  prompt: '«Подними кнопку [название] выше, чтобы она не закрывала нижнюю панель».'
                },
                {
                  goal: 'Элементы слишком близко',
                  prompt: '«Увеличь отступы (spacing) между карточками и от краёв экрана».'
                },
                {
                  goal: 'Экран не листается вниз',
                  prompt: '«Добавь вертикальную прокрутку (scroll) для списка».'
                },
                {
                  goal: 'Добавить новую функцию',
                  prompt: '«Добавь кнопку удаления элемента и счётчик выполненных задач сверху».'
                }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 pr-4 font-bold text-amber-300">{row.goal}</td>
                  <td className="py-2.5 pl-4 font-mono text-xs text-slate-200">{row.prompt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ИТОГ УРОКА */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>🏁</span>
          <span>Итог урока (ответь устно или в тетради)</span>
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-200">
              1. Какое приложение ты сегодня создал?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q1}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1: e.target.value })}
              placeholder="Например: Планировщик учёбы / Трекер привычек..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-200">
              2. Какую ошибку ты нашёл в первой версии от ИИ?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q2}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2: e.target.value })}
              placeholder="Например: кнопка перекрывала нижнее меню..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-slate-200">
              3. Какой короткий промпт помог сделать приложение лучше?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q3}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3: e.target.value })}
              placeholder="Например: «Подними кнопку выше и увеличь отступы между карточками»..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleSaveReflection}
            disabled={reflectionSaved}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              reflectionSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
            }`}
          >
            {reflectionSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
            {reflectionSaved ? 'Ответы сохранены (+25 ОП)' : 'Сохранить итог урока (+25 ОП)'}
          </button>
        </div>
      </div>
    </div>
  );
};
