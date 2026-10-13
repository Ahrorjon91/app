import React, { useState } from 'react';
import {
  GraduationCap,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Award,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson22ServicesLectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
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
    addReward(25, '💬 Рефлексия Урока 22 сохранены! (+25 ОП)');
  };

  const notebookQuestions = `Расскажи простыми словами, о чём эти материалы.
Какие 5 главных идей в этих материалах?
Объясни слово [термин] так, чтобы понял шестиклассник.
Составь 5 вопросов для самопроверки по этим материалам.`;

  const gammaPrompt = `Создай презентацию из 8 слайдов для школьного проекта на тему «Как ИИ помогает в учёбе».
Аудитория: ученики 12–15 лет.
Стиль: простой, дружелюбный, без сложных терминов.
Структура: 1) Название; 2) Что такое ИИ; 3) Как ИИ помогает учиться; 4) Примеры сервисов; 5) Как проверять ответы ИИ; 6) Правила безопасности; 7) Мой вывод; 8) Спасибо.
Используй короткие тексты и только проверенные факты. Ничего не выдумывай.`;

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 p-6 sm:p-10 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            УРОК 22 • ЛЕКЦИЯ УРОКА
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            Для кого: ученики 12+ · Язык: русский · Время: 90 минут
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            Инструменты: NotebookLM (учёба по своим материалам), Pomelli (маркетинг из сайта), Gamma (презентации)
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          🎓 Урок 22. ИИ-сервисы для учёбы и творчества: NotebookLM, Pomelli и Gamma
        </h1>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong>Идея урока:</strong> три разных ИИ-помощника для трёх задач: <strong>разобраться в материале</strong>, <strong>сделать красивую презентацию</strong> и <strong>создать рекламные картинки для бизнеса</strong>. Мы пройдём каждый сервис шаг за шагом и соберём мини-проект.
          </p>
        </div>
      </div>

      {/* ЦЕЛИ УРОКА & ПЛАН УРОКА */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🎯</span>
            <span>Цели урока</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">К концу урока ученик сможет:</p>
          <div className="grid grid-cols-1 gap-2.5">
            {[
              'объяснить, для чего нужны NotebookLM, Pomelli и Gamma, и чем они отличаются;',
              'загрузить материалы в NotebookLM, задать вопросы и получить конспект, ментальную карту и тест;',
              'создать презентацию в Gamma и сохранить её в PDF или PowerPoint;',
              'создать «ДНК бренда» и рекламный пост в Pomelli по адресу сайта;',
              'проверять то, что сделал ИИ, и работать честно и безопасно.'
            ].map((goal, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>⏱ План урока (90 минут)</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 pr-3">Время</th>
                  <th className="py-2 pl-3">Блок</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">10 мин</td><td className="py-2 pl-3">Вводная: три помощника, три задачи</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">20 мин</td><td className="py-2 pl-3">Лекция: как работает каждый сервис</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">10 мин</td><td className="py-2 pl-3">Демонстрация преподавателя</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">40 мин</td><td className="py-2 pl-3">Лабораторная работа (3 части)</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">5 мин</td><td className="py-2 pl-3">Мини-детектив</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-emerald-300 font-bold">5 мин</td><td className="py-2 pl-3">Рефлексия и загрузка работы</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ПРАВИЛА БЕЗОПАСНОСТИ И ЧЕСТНОСТИ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-rose-400" />
          <span>🛡️ Правила безопасности и честности (прочитай первым!)</span>
        </h2>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed">
          <li>
            👨‍👩‍👧 <strong>Спроси разрешение.</strong> Для регистрации в сервисах используй аккаунт, разрешённый преподавателем и родителями. У каждого сервиса свои возрастные правила и свои страны, где он работает. Если сервис недоступен или не пускает тебя, не обходи ограничения, а скажи преподавателю.
          </li>
          <li>
            🔒 <strong>Не загружай личное.</strong> Не добавляй в ИИ документы с адресами, телефонами, паспортами, списками одноклассников, фото людей без разрешения.
          </li>
          <li>
            📚 <strong>Загружай только своё или разрешённое.</strong> Свои конспекты, учебник из школьной библиотеки в разрешённом виде, открытые статьи. Не загружай чужие книги и платные материалы без права на это.
          </li>
          <li>
            🔍 <strong>ИИ может ошибаться.</strong> Любой факт, цифру и дату проверяй по источнику. В NotebookLM нажимай на <strong>ссылки-цитаты</strong>, чтобы увидеть, откуда взят ответ.
          </li>
          <li>
            🚫 <strong>Не выдавай работу ИИ за полностью свою.</strong> Скажи, что использовал(а) ИИ-помощника, и покажи, что проверил(а) и изменил(а) сам(а).
          </li>
          <li>
            🖼️ <strong>Картинки и бренды.</strong> Делай рекламу только для учебного или разрешённого бизнеса. Не используй чужие логотипы и фото без разрешения.
          </li>
          <li>
            ⚖️ <strong>Честная реклама.</strong> Не придумывай отзывы, скидки, награды и «10 лет опыта».
          </li>
          <li>
            💳 <strong>Платные тарифы не подключай.</strong> Всё делаем на бесплатных возможностях. Карту и платежи не вводим.
          </li>
        </ol>
      </div>

      {/* РАЗДЕЛ 1: ТРИ ПОМОЩНИКА */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>📖 ЛЕКЦИЯ • РАЗДЕЛ 1</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          1. Три помощника: кто за что отвечает
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 pr-4">Сервис</th>
                <th className="py-2.5 px-4">Что делает</th>
                <th className="py-2.5 px-4">Простая аналогия</th>
                <th className="py-2.5 pl-4">Лучше всего подходит для</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              <tr>
                <td className="py-3 pr-4 font-bold text-emerald-300">📓 NotebookLM</td>
                <td className="py-3 px-4">Читает <strong>твои</strong> материалы и отвечает только по ним</td>
                <td className="py-3 px-4">Умный репетитор, который прочитал именно твои конспекты</td>
                <td className="py-3 pl-4">Подготовка к уроку, конспекты, тесты, карточки</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-amber-300">🎨 Pomelli</td>
                <td className="py-3 px-4">Смотрит на сайт бизнеса и создаёт рекламные материалы в его стиле</td>
                <td className="py-3 px-4">Мини-дизайнер, который изучил бренд</td>
                <td className="py-3 pl-4">Посты и рекламные картинки для бизнеса</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-cyan-300">📊 Gamma</td>
                <td className="py-3 px-4">Из текста или идеи собирает готовую презентацию</td>
                <td className="py-3 px-4">Помощник-дизайнер слайдов</td>
                <td className="py-3 pl-4">Школьные проекты, презентации, доклады</td>
              </tr>
            </tbody>
          </table>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto">
{`Материалы → NotebookLM (разобрались) → Gamma (оформили презентацию) → Pomelli (рекламные картинки для бизнеса)`}
        </pre>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200">
          🧠 <strong>Главная идея:</strong> ИИ не заменяет тебя. Он <strong>ускоряет работу</strong>, а думать, проверять и выбирать лучшее всё равно ты.
        </div>
      </div>

      {/* РАЗДЕЛ 2: NOTEBOOKLM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            2. 📓 NotebookLM — учёба по своим материалам
          </h2>
          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono hover:bg-emerald-500/30 flex items-center gap-1"
          >
            <span>notebooklm.google.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong>Что это?</strong> <strong>NotebookLM</strong> — сервис от Google. Ты загружаешь свои материалы (<strong>источники</strong>), а ИИ отвечает на вопросы <strong>по ним</strong>, показывая ссылки на места, откуда взял информацию.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-emerald-300">Что умеет?</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5">
              <li>Отвечать на вопросы по источникам с <strong>цитатами</strong>.</li>
              <li>Делать <strong>краткий конспект</strong> и план.</li>
              <li>Создавать <strong>аудио-обзор</strong> (похоже на подкаст-разговор двух ведущих).</li>
              <li>Строить <strong>ментальную карту</strong> темы.</li>
              <li>Создавать <strong>карточки</strong> для запоминания и <strong>тест</strong>.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="text-sm font-black text-cyan-300">💡 Советы</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5">
              <li>Чем лучше источники, тем лучше ответы. Один источник = одна тема.</li>
              <li>Если ответ странный, перепроверь по цитате. Если ссылок нет, не верь ответу.</li>
              <li>Называй блокноты понятно: «ИИ в школе — проект».</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black text-white">Шаг за шагом:</h3>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5 leading-relaxed">
            <li>Открой сайт <strong>notebooklm.google.com</strong> и войди в разрешённый Google-аккаунт.</li>
            <li>Нажми <strong>«Создать блокнот»</strong> (New notebook).</li>
            <li><strong>Добавь источники:</strong> загрузи файл (PDF, текст), вставь текст или добавь ссылку на сайт / видео. Для первого раза хватит 2–3 коротких источников по одной теме.</li>
            <li>Подожди, пока источники обработаются.</li>
            <li><strong>Задай вопрос</strong> в чате, например: «Расскажи простыми словами, о чём эти материалы».</li>
            <li><strong>Нажми на цитату</strong> (маленькая цифра в ответе) и проверь, что ИИ не ошибся.</li>
            <li>Открой панель <strong>Studio</strong> (инструменты результата): создай <strong>Ментальную карту</strong>, <strong>Карточки</strong> или <strong>Тест</strong>.</li>
            <li>По желанию создай <strong>Аудио-обзор</strong> и послушай.</li>
            <li>Запиши, что пригодится для презентации.</li>
          </ol>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">Примеры хороших вопросов:</span>
            <button
              onClick={() => handleCopy('notebook-q', notebookQuestions)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-300 flex items-center gap-1"
            >
              {copiedId === 'notebook-q' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-slate-900 text-emerald-200 font-mono text-xs whitespace-pre-wrap">
            {notebookQuestions}
          </pre>
        </div>
      </div>

      {/* РАЗДЕЛ 3: GAMMA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            3. 📊 Gamma — презентации с ИИ
          </h2>
          <a
            href="https://gamma.app"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1"
          >
            <span>gamma.app</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Что это?</strong> <strong>Gamma</strong> — сервис, который по описанию создаёт готовую презентацию: слайды, оформление, структуру. Потом ты редактируешь её как документ.
        </p>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-xs sm:text-sm text-amber-200">
          <div className="font-bold">Что нужно знать про бесплатный план:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Бесплатно даётся <strong>ограниченное количество кредитов</strong> (они тратятся на каждое ИИ-действие и <strong>не обновляются</strong> сами).</li>
            <li>Одна генерация на бесплатном плане ограничена примерно <strong>10 слайдами</strong>.</li>
            <li>На готовых файлах остаётся значок <strong>«Made with Gamma»</strong>.</li>
            <li>Скачать можно как <strong>PDF</strong> или <strong>PowerPoint (PPTX)</strong>.</li>
          </ul>
          <div className="pt-1 font-bold">
            ⚠️ Не нажимай «сгенерировать» много раз подряд: кредиты закончатся. Сначала продумай текст, потом генерируй один раз и дальше правь вручную.
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black text-white">Шаг за шагом:</h3>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5 leading-relaxed">
            <li>Открой <strong>gamma.app</strong> и войди через разрешённый аккаунт.</li>
            <li>Нажми <strong>«Создать»</strong> (Create new) → <strong>«Сгенерировать»</strong> (Generate) → тип <strong>«Презентация»</strong> (Presentation).</li>
            <li>Вставь <strong>текст или план</strong> (например, итоги из NotebookLM) либо напиши короткое описание темы.</li>
            <li>Выбери <strong>количество слайдов</strong> (для урока: 7–8) и <strong>язык</strong> (русский).</li>
            <li>Выбери <strong>тему оформления</strong> (цвета и шрифты) и стиль текста.</li>
            <li>Нажми <strong>Generate</strong> и дождись результата.</li>
            <li><strong>Проверь каждый слайд:</strong> есть ли ошибки, лишний текст, неверные факты.</li>
            <li><strong>Отредактируй</strong> заголовки и тексты прямо на слайдах. Замени лишние картинки.</li>
            <li>Нажми <strong>Share / Export</strong> → скачай <strong>PDF</strong> (удобно для проверки) или <strong>PPTX</strong>.</li>
          </ol>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">Пример промпта для Gamma (на русском):</span>
            <button
              onClick={() => handleCopy('gamma-p', gammaPrompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1"
            >
              {copiedId === 'gamma-p' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <pre className="p-3 rounded-xl bg-slate-900 text-cyan-200 font-mono text-xs whitespace-pre-wrap">
            {gammaPrompt}
          </pre>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
          <div className="font-bold text-white">💡 Советы:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>На слайде <strong>не больше 3–5 коротких пунктов</strong>.</li>
            <li>Не читай слайд вслух слово в слово: расскажи своими словами.</li>
            <li>Если картинка не подходит, замени её или удали.</li>
          </ul>
        </div>
      </div>

      {/* РАЗДЕЛ 4: POMELLI */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          4. 🎨 Pomelli — рекламные материалы из сайта
        </h2>

        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong>Что это?</strong> <strong>Pomelli</strong> — экспериментальный сервис Google Labs. Ты даёшь <strong>адрес сайта бизнеса</strong>, а он:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-200">
            <li>изучает сайт и создаёт <strong>«ДНК бизнеса»</strong> (Business DNA): цвета, шрифты, стиль, тон текста;</li>
            <li>предлагает <strong>идеи рекламных кампаний</strong>;</li>
            <li>создаёт <strong>посты и картинки</strong> в стиле этого бренда;</li>
            <li>позволяет <strong>редактировать</strong> результат и <strong>скачать</strong> файлы.</li>
          </ol>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1.5 text-xs sm:text-sm text-slate-300">
          <div className="font-bold text-amber-300">Что нужно знать:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Сервис <strong>бесплатный на время тестирования</strong> (бета), с ограничениями по количеству генераций.</li>
            <li>Он может быть доступен не во всех странах и пока может работать преимущественно на английском. Если у тебя не открывается или всё на английском, скажи преподавателю: разберём на общем экране.</li>
            <li>Pomelli работает с <strong>публичным сайтом</strong>. Для урока подойдёт демо-сайт, который ты опубликовал(а) на Уроке 16, или учебный сайт бизнеса, разрешённый преподавателем.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black text-white">Шаг за шагом:</h3>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5 leading-relaxed">
            <li>Открой <strong>Pomelli</strong> (найди через поиск «Google Labs Pomelli») и войди в разрешённый Google-аккаунт.</li>
            <li>Вставь <strong>адрес сайта</strong> (ссылка на твой демо-сайт или на разрешённый сайт).</li>
            <li>Дождись, пока Pomelli создаст <strong>Business DNA</strong>.</li>
            <li><strong>Проверь ДНК:</strong> цвета, шрифты, описание бизнеса. Исправь то, что не подходит.</li>
            <li>Выбери <strong>идею кампании</strong> из предложенных или напиши свою цель (например: «Анонс нового сервиса»).</li>
            <li>Нажми создать и дождись <strong>вариантов постов и картинок</strong>.</li>
            <li><strong>Проверь текст:</strong> нет ли выдуманных скидок, наград, отзывов, неверного адреса или телефона.</li>
            <li><strong>Отредактируй</strong> текст и картинку.</li>
            <li><strong>Скачай</strong> файл и сохрани для сдачи.</li>
          </ol>
        </div>
      </div>

      {/* РАЗДЕЛЫ 5 И 6 + ДЕМО ПРЕПОДАВАТЕЛЯ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-white">
            5. Как выбрать нужный сервис (шпаргалка)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 pr-3">Задача</th>
                  <th className="py-2 pl-3">Выбери</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                <tr><td className="py-2 pr-3">Подготовиться к уроку по конспектам</td><td className="py-2 pl-3 font-bold text-emerald-300">📓 NotebookLM</td></tr>
                <tr><td className="py-2 pr-3">Сделать презентацию к докладу</td><td className="py-2 pl-3 font-bold text-cyan-300">📊 Gamma</td></tr>
                <tr><td className="py-2 pr-3">Сделать пост для сайта или бизнеса</td><td className="py-2 pl-3 font-bold text-amber-300">🎨 Pomelli</td></tr>
                <tr><td className="py-2 pr-3">Проверить, откуда ИИ взял ответ</td><td className="py-2 pl-3 font-bold text-emerald-300">📓 NotebookLM (цитаты)</td></tr>
                <tr><td className="py-2 pr-3">Быстро оформить слайды</td><td className="py-2 pl-3 font-bold text-cyan-300">📊 Gamma</td></tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 space-y-2">
            <h3 className="text-base font-black text-white">6. Золотое правило: «Проверь, потом доверяй»</h3>
            <pre className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-xs overflow-x-auto">
{`ИИ сделал → Я прочитал → Я проверил факты → Я исправил → Я сдал`}
            </pre>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-violet-500/30 space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>🎬</span>
            <span>ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ (10 минут)</span>
          </h2>
          <p className="text-xs text-slate-300">Преподаватель показывает на экране:</p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>
              <strong>NotebookLM:</strong> создание блокнота, загрузка 2 коротких источников, вопрос в чате, переход по цитате, создание ментальной карты.
            </li>
            <li>
              <strong>Gamma:</strong> вставка плана, создание презентации из 8 слайдов, редактирование одного слайда, экспорт в PDF.
            </li>
            <li>
              <strong>Pomelli:</strong> вставка адреса сайта, создание «ДНК бизнеса», создание одного поста, проверка текста.
            </li>
            <li>
              Напоминание: проверяем факты, не загружаем личное.
            </li>
          </ol>
        </div>
      </div>

      {/* РЕФЛЕКСИЯ И ИТОГ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>💬</span>
          <span>РЕФЛЕКСИЯ (5 минут) и 🏁 Итог</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ты познакомился(лась) с тремя ИИ-помощниками: <strong>NotebookLM</strong> помогает <strong>разобраться</strong>, <strong>Gamma</strong> помогает <strong>оформить</strong>, <strong>Pomelli</strong> помогает <strong>показать бизнес</strong>. Главное правило: <strong>ИИ ускоряет, а ответственность за проверку и честность остаётся у тебя</strong>. 🌟
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              1. Какой из трёх сервисов тебе понравился больше всего и почему?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q1}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1: e.target.value })}
              placeholder="NotebookLM / Gamma / Pomelli..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              2. Какую ошибку ИИ ты нашёл(а) и исправил(а)?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q2}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2: e.target.value })}
              placeholder="Напиши, что пришлось поправить вручную..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              3. Для какой школьной задачи ты бы использовал(а) NotebookLM?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q3}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3: e.target.value })}
              placeholder="Например: подготовка к контрольной по истории..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              4. Почему важно проверять факты, даже если ИИ ответил уверенно?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q4}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q4: e.target.value })}
              placeholder="Потому что ИИ может ошибаться..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>
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
          {reflectionSaved ? 'Ответы сохранены (+25 ОП)' : 'Сохранить ответы рефлексии (+25 ОП)'}
        </button>
      </div>
    </div>
  );
};
