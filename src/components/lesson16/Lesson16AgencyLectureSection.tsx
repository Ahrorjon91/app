import React, { useState } from 'react';
import {
  Rocket,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Globe,
  MessageSquare,
  HeartHandshake,
  Layers
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Lesson16AgencyLectureSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>({});
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addReward(10, '📋 Скопировано в буфер обмена! (+10 ОП)');
    setTimeout(() => setCopiedId(null), 2200);
  };

  const toggleGoal = (idx: number) => {
    setCheckedGoals(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const masterPromptText = `Ты опытный веб-дизайнер для местного бизнеса и специалист по посадочным страницам.

Создай аккуратный, реалистичный одностраничный сайт для местного бизнеса, используя ТОЛЬКО информацию ниже. Сайт должен выглядеть так, будто сделан специально для этого бизнеса, и быть достаточно хорошим, чтобы показать его владельцу как демо.

ДАННЫЕ БИЗНЕСА
Название: [название]
Тип бизнеса: [например, салон красоты]
Город / район: [город]
Адрес: [адрес]
Телефон: [номер]
WhatsApp: [номер]
Эл. почта: [почта]
Режим работы: [часы]
Основные услуги: [список услуг]
Главная кнопка: [Позвонить]
Вторая кнопка: [Наши работы]
Стиль: [например, премиальный]
Основной цвет: [например, синий]
Второй цвет: [например, тёмно-серый]

ПРАВИЛА
- Используй только предоставленную информацию.
- НЕ выдумывай отзывы, рейтинги, награды, годы опыта, историю, сотрудников и статистику.
- Если информации не хватает, упрости блок, а не придумывай.
- Текст короткий, естественный и конкретный.
- Не делай «шаблонный ИИ-сайт», без лишней воды и лишних блоков.

СТРУКТУРА СТРАНИЦЫ
1. Главный экран: название, понятный заголовок, короткий текст, две кнопки.
2. Услуги: коротко и понятно.
3. О нас: чем занимается бизнес и почему его выбирают местные жители.
4. Почему мы: только практичные пункты на основе данных выше.
5. Доверие: отзывы только если они предоставлены; иначе простой блок «Как с нами связаться».
6. Расположение: город, адрес, кнопка «Как проехать».
7. Контакты: телефон, WhatsApp, почта, адрес, призыв к действию.
8. Частые вопросы (только если полезно).
9. Подвал: название и контакты.

ТРЕБОВАНИЯ
- Кнопка «Позвонить» (по номеру телефона).
- Кнопка WhatsApp (по номеру WhatsApp).
- Кнопка маршрута, если есть адрес.
- Главная кнопка видна на первом экране и повторяется в блоке контактов.
- Сайт адаптивный и удобный на телефоне.

Сделай сильнейшую версию сайта: реалистичную, аккуратную, с понятными кнопками и готовую к показу владельцу.`;

  const promptRealImages = `Ты улучшаешь существующий сайт местного бизнеса.
Задача: заменить временные картинки на реальные качественные.
1. Главный экран: если дана ссылка на главное фото, используй его как фон или основное изображение.
2. Галерея: если даны ссылки на фото, создай или обнови блок галереи.
3. Подбери кадрирование и отступы, сделай адаптивно для телефона.
Важно: НЕ переделывай весь сайт и НЕ ломай макет. Только улучши визуал.
Ссылка на главное фото: [вставь ссылку]
Ссылки на фото для галереи: [вставь ссылки]`;

  const promptRealReviews = `Добавь на сайт аккуратный блок отзывов.
1. Используй отзывы СТРОГО в том виде, в каком они даны, без изменений.
2. Если отзывов нет, НЕ придумывай их. Вместо этого сделай блок «Свяжитесь с нами» или «Почему нас выбирают» на основе реальных данных.
3. Разместить блок после услуг или перед контактами.
4. Стиль должен совпадать с остальным сайтом.
Важно: НЕ меняй весь макет.
Отзывы: [вставь настоящие отзывы или оставь пустым]`;

  const promptPremiumDesign = `Ты креативный директор и UI/UX-дизайнер высокого уровня.
Преврати этот сайт в современный, премиальный, визуально сильный.
Цель: чтобы сайт выглядел так, будто его сделало топ-агентство.
Дизайн: глубина, градиенты, свет, слои, сильный контраст и иерархия.
Макет: улучши композицию, добавь динамичные несимметричные блоки.
Анимации: плавные эффекты при скролле, параллакс, микро-анимации при наведении.
Типографика: выразительные заголовки, хорошая читаемость.
Важно: сохрани все контакты и кнопки «Позвонить» и WhatsApp рабочими. Сайт должен остаться быстрым и удобным на телефоне.`;

  const msgFirst = `Здравствуйте! Я нашёл(ла) ваш бизнес и сделал(а) небольшой образец сайта, чтобы показать, как он мог бы выглядеть в современном виде. Если интересно, могу прислать превью.`;
  const msgAfterReply = `Спасибо! Вот превью: [ссылка]. Это только образец, чтобы показать направление. Если понравится, можно доработать под ваш бизнес.`;
  const msgIfDeclined = `Понял(а), спасибо за ответ! Хорошего дня!`;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950/35 to-slate-900 border-2 border-indigo-500/40 shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
            <Rocket className="w-4 h-4" /> УРОК 16 · МИНИ-АГЕНТСТВО
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-emerald-300 text-xs font-mono font-bold">
            Для кого: ученики 12+ · Язык: русский · Время: 90 минут
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            🚀 Мини-агентство: сайты для реальных бизнесов —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
              от «нуля» до «героя»
            </span>
          </h1>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-slate-200 text-sm sm:text-base leading-relaxed">
            <strong className="text-indigo-300">Финал блока «Создание сайтов»:</strong> ты уже умеешь делать дизайн (UI/UX), создавать сайт с ИИ, публиковать его в интернете, обновлять без простоя и переносить на другой хостинг. Сегодня превращаем это умение в <strong>услугу</strong>.
          </div>
        </div>

        {/* Инструменты (бесплатные) */}
        <div className="pt-1">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-300/90 mb-2.5 font-bold">
            🛠️ Инструменты (бесплатные):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {[
              { name: 'Google Maps', desc: 'Поиск местных бизнесов', url: 'https://www.google.com/maps' },
              { name: 'Google AI Studio', desc: 'Генерация сайта по мастер-промпту', url: 'https://aistudio.google.com/' },
              { name: 'GitHub', desc: 'Хранение кода и версий', url: 'https://github.com/' },
              { name: 'Vercel', desc: 'Публикация демо в интернет', url: 'https://vercel.com/' },
              { name: 'Antigravity IDE', desc: 'Локальная проверка и правка кода', url: 'https://idx.google.com/' }
            ].map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white group-hover:text-indigo-300">{t.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 leading-snug">{t.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 🛡️ ПРАВИЛА БЕЗОПАСНОСТИ И ЧЕСТНОСТИ (ПРОЧИТАЙ ПЕРВЫМ!) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>🛡️ Правила безопасности и честности (прочитай первым!)</span>
          </h2>
          <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold">
            Ты ученик 12+, поэтому у этой работы есть важные правила
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          {[
            {
              icon: '1. 👨‍👩‍👧',
              title: 'Спроси разрешение.',
              desc: 'Перед тем как писать реальному бизнесу, согласуй это с преподавателем и родителями или опекунами.'
            },
            {
              icon: '2. 🔒',
              title: 'Не раскрывай личное.',
              desc: 'В сообщениях не пиши свой домашний адрес, личный телефон, фото документов. Используй контакты, которые одобрил преподаватель.'
            },
            {
              icon: '3. 💬',
              title: 'Первое сообщение короткое и вежливое.',
              desc: 'Никакого давления и спама. Если человек отказался, скажи «спасибо» и больше не пиши.'
            },
            {
              icon: '4. 🚫',
              title: 'Никаких выдуманных фактов.',
              desc: 'Нельзя придумывать отзывы, оценки, награды, «10 лет опыта». Это обман. Используй только информацию, которую дал бизнес или которая есть на его официальных страницах.'
            },
            {
              icon: '5. 🖼️',
              title: 'Картинки и дизайн.',
              desc: 'Бери только свои фото, фото, которые тебе разрешил использовать владелец, или бесплатные с понятной лицензией. Вдохновляйся чужим дизайном, но не копируй сайт один в один.'
            },
            {
              icon: '6. 💰',
              title: 'Деньги.',
              desc: 'Цены и оплату обсуждай вместе с преподавателем и родителями. Самостоятельно не принимай деньги и не отправляй свои банковские данные.'
            },
            {
              icon: '7. 🧪',
              title: 'Это демо.',
              desc: 'Пока владелец не согласился, ты показываешь образец, а не «готовый заказ».'
            }
          ].map((rule, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-black text-amber-300">
                {rule.icon} {rule.title}
              </div>
              <p className="text-slate-300 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 📖 ЛЕКЦИЯ: РАЗДЕЛЫ 1, 2, 3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
            📖 ЛЕКЦИЯ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            1. Что такое «агентство» и зачем оно тебе?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            <strong>Агентство</strong> — это команда или человек, который делает работу для клиентов. У тебя уже есть все навыки:
          </p>
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 font-mono text-xs sm:text-sm text-indigo-200 font-bold text-center">
            Дизайн (Stitch) → Код с ИИ (AI Studio) → GitHub → Vercel / Hostinger → Обновления → Перенос
          </div>
          <p className="text-sm sm:text-base text-slate-300">
            Теперь добавляем два новых шага: <strong>найти клиента</strong> и <strong>показать ему результат</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs sm:text-sm text-indigo-200">
            🧠 <strong>Главная идея:</strong> многие местные бизнесы (салоны, кафе, клиники) не имеют сайта или имеют старый. Ты можешь показать им, как это могло бы выглядеть.
          </div>
        </div>

        {/* 2. Лестница сайтов */}
        <div className="space-y-4 border-t border-slate-800 pt-6">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>2. Лестница сайтов: от простого к «вау»</span>
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="py-3 px-4 font-bold">Уровень</th>
                  <th className="py-3 px-4 font-bold">Что это</th>
                  <th className="py-3 px-4 font-bold">Пример</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr>
                  <td className="py-3 px-4 font-black text-amber-300 whitespace-nowrap">🥉 Простой</td>
                  <td className="py-3 px-4">Одностраничный сайт: контакты, услуги, график</td>
                  <td className="py-3 px-4 text-slate-300">Страница организации, ателье, мастерской</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-black text-cyan-300 whitespace-nowrap">🥈 Бизнес-лендинг</td>
                  <td className="py-3 px-4">Продающая страница: кнопки «Позвонить» и «WhatsApp», карта, FAQ</td>
                  <td className="py-3 px-4 text-slate-300">Салон красоты, стоматология, спортзал</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-black text-emerald-300 whitespace-nowrap">🥇 Премиум</td>
                  <td className="py-3 px-4">Скролл-анимации, параллакс, глубина, эффекты</td>
                  <td className="py-3 px-4 text-slate-300">Бренд, студия, презентация проекта</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-white">Что такое эффекты?</div>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li><strong>Scroll-анимация</strong> — элементы плавно появляются, когда ты листаешь страницу.</li>
              <li><strong>Параллакс</strong> — фон и передний план двигаются с разной скоростью, получается эффект глубины.</li>
              <li><strong>Микро-анимации</strong> — кнопка слегка меняется при наведении.</li>
            </ul>
            <p className="text-amber-300 font-semibold pt-1">
              ⚠️ Чем эффектнее сайт, тем важнее проверить, что он <strong>быстро грузится и удобен на телефоне</strong>.
            </p>
          </div>
        </div>

        {/* 3. Путь клиента: 4 шага */}
        <div className="space-y-4 border-t border-slate-800 pt-6">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span>3. Путь клиента: 4 шага</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-black text-cyan-300">🔍 Шаг 1. Найди возможность</div>
              <ol className="list-decimal list-inside text-slate-300 space-y-1">
                <li>Открой <strong>Google Maps</strong> и найди нишу в своём городе: «салон красоты», «стоматология», «кафе».</li>
                <li>Посмотри, у кого <strong>нет сайта</strong> или он выглядит слабо (старый, неудобный на телефоне).</li>
                <li>Выбери <strong>один</strong> бизнес.</li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-black text-indigo-300">🏗️ Шаг 2. Создай сайт с ИИ</div>
              <p className="text-slate-300 leading-relaxed">
                Заполни данные бизнеса в мастер-промпте и вставь его в <strong>Google AI Studio</strong> (лучше использовать последнюю доступную Pro-модель).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-black text-amber-300">✨ Шаг 3. Улучши сайт</div>
              <p className="text-slate-300 leading-relaxed">
                Добавь реальные картинки, настоящие отзывы (если они есть) и, по желанию, сделай дизайн премиальным.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-black text-emerald-300">🌍 Шаг 4. Опубликуй и покажи</div>
              <p className="text-slate-300 leading-relaxed">
                Опубликуй сайт (GitHub → Vercel) и отправь владельцу короткое сообщение.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. МАСТЕР-ПРОМПТ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              РАЗДЕЛ 4 · МАСТЕР-ПРОМПТ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              4. Мастер-промпт (на русском, простой и профессиональный)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Скопируй и <strong>замени всё в <code className="text-cyan-300">[квадратных скобках]</code></strong> на данные своего бизнеса:
            </p>
          </div>
          <button
            onClick={() => handleCopy('master-prompt', masterPromptText)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg"
          >
            {copiedId === 'master-prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedId === 'master-prompt' ? 'Мастер-промпт скопирован!' : 'Копировать Мастер-промпт'}</span>
          </button>
        </div>

        <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
          {masterPromptText}
        </pre>

        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200">
          💡 Если какие-то данные неизвестны, <strong>не заполняй их выдумкой</strong>. Лучше удали эту строку из промпта.
        </div>
      </div>

      {/* 5. УЛУЧШАЕМ САЙТ (3 «ДОПОЛНЕНИЯ») */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          5. Улучшаем сайт (3 «дополнения»)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* А. Реальные картинки */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-cyan-300">🖼️ А. Реальные картинки</h3>
                <button
                  onClick={() => handleCopy('addon-img', promptRealImages)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'addon-img' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Копия</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {promptRealImages}
              </pre>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300">
              📸 Используй только свои фото или фото, которые разрешил использовать владелец.
            </div>
          </div>

          {/* Б. Отзывы */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-amber-300">⭐ Б. Отзывы (только настоящие!)</h3>
                <button
                  onClick={() => handleCopy('addon-rev', promptRealReviews)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'addon-rev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Копия</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {promptRealReviews}
              </pre>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
              ⚠️ Вспомни правило безопасности №4: выдуманные отзывы — это обман клиентов.
            </div>
          </div>

          {/* В. Премиум-дизайн */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-emerald-300">💎 В. Премиум-дизайн (по желанию)</h3>
                <button
                  onClick={() => handleCopy('addon-prem', promptPremiumDesign)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'addon-prem' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Копия</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {promptPremiumDesign}
              </pre>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
              ✨ Сайт должен остаться быстрым и удобным на телефоне.
            </div>
          </div>
        </div>
      </div>

      {/* 6. ГДЕ БРАТЬ ВДОХНОВЕНИЕ & 7. ПУБЛИКАЦИЯ И ОБНОВЛЕНИЯ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>6. Где брать вдохновение (но не копировать!)</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
            <li>
              🎨 <a href="https://styles.refero.design" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold">styles.refero.design</a> — примеры стилей и дизайна
            </li>
            <li>
              📄 <strong>DESIGN.md</strong> — файл с описанием стиля, который можно дать ИИ, чтобы получить похожую атмосферу
            </li>
            <li className="leading-relaxed">
              🌐 <strong>Сайты с красивыми анимациями:</strong>{' '}
              <span className="text-slate-300 font-mono text-xs">
                activetheory.net/work, scrolltide.co, immersive-g.com/projects/gleec, godly.design, horizonx.so, motionsites.ai
              </span>
            </li>
          </ul>
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
            🧭 <strong>Как правильно:</strong> посмотри, что тебе нравится (цвета, подача, движение), и попроси ИИ сделать <strong>свою</strong> версию. Не копируй чужой сайт целиком, тексты и картинки.
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-white">
            7. Публикация и обновления (повторяем)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <li>Скачай ZIP из AI Studio и открой проект в <strong>Antigravity IDE</strong>.</li>
            <li>Проверь локально: <code className="text-emerald-300 font-mono">npm install</code> → <code className="text-emerald-300 font-mono">npm run dev</code>.</li>
            <li>Сохрани в <strong>Git</strong> и отправь на <strong>GitHub</strong> (кнопками или командами, как в прошлом уроке).</li>
            <li>Подключи репозиторий к <strong>Vercel</strong> и нажми <strong>Deploy</strong>.</li>
            <li><strong>Обновления без простоя:</strong> изменил → <code className="text-cyan-300 font-mono">commit</code> → <code className="text-cyan-300 font-mono">push</code> → Vercel сам обновит сайт, а старая версия работает, пока новая собирается.</li>
            <li><strong>Перенос:</strong> когда клиент захочет свой домен или хостинг (например, Hostinger), ты умеешь перенести сайт.</li>
          </ol>
        </div>
      </div>

      {/* 8. СООБЩЕНИЯ ВЛАДЕЛЬЦУ БИЗНЕСА & 9. КАК ПРЕДЛОЖИТЬ УСЛУГУ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>8. Сообщения владельцу бизнеса (бонус, только с разрешением)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            <strong>Принципы:</strong> коротко, вежливо, без давления, <strong>не отправляй ссылку в первом сообщении</strong>: сначала получи ответ.
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300">Сообщение в Instagram / WhatsApp:</span>
                <button
                  onClick={() => handleCopy('msg-1', msgFirst)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer"
                >
                  {copiedId === 'msg-1' ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <p className="text-slate-200 font-mono">{msgFirst}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">После ответа:</span>
                <button
                  onClick={() => handleCopy('msg-2', msgAfterReply)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer"
                >
                  {copiedId === 'msg-2' ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <p className="text-slate-200 font-mono">{msgAfterReply}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-400">Если отказали:</span>
                <button
                  onClick={() => handleCopy('msg-3', msgIfDeclined)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer"
                >
                  {copiedId === 'msg-3' ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <p className="text-slate-200 font-mono">{msgIfDeclined}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-white">
            9. Как предложить услугу (простая идея пакетов)
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="py-2.5 px-3 font-bold">Пакет</th>
                  <th className="py-2.5 px-3 font-bold">Что входит</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-black text-amber-300 whitespace-nowrap">🥉 Базовый</td>
                  <td className="py-2.5 px-3">Одностраничный сайт: услуги, контакты, кнопки связи</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-black text-cyan-300 whitespace-nowrap">🥈 Стандарт</td>
                  <td className="py-2.5 px-3">+ реальные фото, карта, FAQ, подключение домена</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-black text-emerald-300 whitespace-nowrap">🥇 Премиум</td>
                  <td className="py-2.5 px-3">+ анимации, параллакс, особый дизайн, поддержка обновлений</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
            💰 Цены не придумывай сам(а). Обсуди их с преподавателем и родителями.
          </div>

          {/* 🎬 Демонстрация преподавателя (15 минут) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
            <div className="text-xs font-black text-indigo-300 uppercase">
              🎬 Демонстрация преподавателя (15 минут)
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
              <li>Поиск ниши на Google Maps и выбор бизнеса со слабым сайтом.</li>
              <li>Заполнение мастер-промпта для вымышленного или учебного бизнеса.</li>
              <li>Генерация сайта в Google AI Studio.</li>
              <li>Добавление картинок и обзор премиум-эффектов.</li>
              <li>Публикация через GitHub и Vercel.</li>
              <li>Пример вежливого сообщения.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 💬 РЕФЛЕКСИЯ (5 МИНУТ) & 🏁 ИТОГ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/25 to-slate-900 border-2 border-emerald-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" /> 💬 РЕФЛЕКСИЯ (5 МИНУТ) & 🏁 ИТОГ
          </span>
          <span className="text-xs font-mono text-emerald-300 font-bold">+20 ОП</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300">1.</strong> Какой из трёх уровней сайта тебе было интереснее делать?
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300">2.</strong> Что было самым сложным: найти бизнес, составить промпт или опубликовать?
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300">3.</strong> Почему важно <strong>не выдумывать</strong> отзывы и факты?
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
            <strong className="text-cyan-300">4.</strong> Что бы ты сделал(а) лучше в следующий раз?
          </div>
        </div>

        <textarea
          rows={2}
          value={reflectionText}
          onChange={e => setReflectionText(e.target.value)}
          placeholder="Запиши свои ответы на вопросы рефлексии..."
          className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (!reflectionSaved && reflectionText.trim()) {
                setReflectionSaved(true);
                addReward(20, '🌟 Рефлексия Урока 16 сохранена! (+20 ОП)');
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm cursor-pointer transition-all"
          >
            {reflectionSaved ? '✓ Рефлексия сохранена (+20 ОП)' : 'Сохранить рефлексию (+20 ОП)'}
          </button>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed max-w-2xl">
            🏁 <strong>Итог:</strong> Ты прошёл путь <strong>от идеи до живого сайта в интернете</strong> и узнал, как это можно превратить в услугу: найти бизнес, сделать демо, опубликовать и вежливо показать результат. Главное, что отличает хорошего специалиста: <strong>честность, аккуратность и уважение к клиенту</strong>. 💪
          </p>
        </div>
      </div>
    </div>
  );
};
