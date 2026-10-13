import React, { useState } from 'react';
import {
  Bot,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Award,
  ShieldCheck,
  Terminal,
  Workflow,
  Send,
  Clock,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';

export const Lesson20N8nLectureSection: React.FC = () => {
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
    addReward(25, '💬 Рефлексия Урока 20 сохранена! (+25 ОП)');
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/60 p-6 sm:p-10 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            УРОК 20 • ЛЕКЦИЯ УРОКА
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            Для кого: ученики 12+ · Язык: русский · Время: 90 минут
          </span>
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            Инструменты: n8n (облако с пробным периодом или запуск на своём компьютере), Telegram
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          🤖 Урок 20. n8n с нуля: автоматизация и Telegram-бот
        </h1>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong>Идея урока:</strong> учим компьютер выполнять рутинные задачи сам: «если случилось A, сделай B». Строим кубики-«ноды», подключаем Telegram-бота и проверяем, как он работает.
          </p>
        </div>
      </div>

      {/* Заметка для преподавателя (до урока) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-amber-300 flex items-center gap-2">
          <span>👩‍🏫</span>
          <span>Заметка для преподавателя (до урока)</span>
        </h2>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
          <li>
            <strong>Telegram Trigger</strong> (бот, который отвечает на сообщения) работает только через <strong>публичный HTTPS-адрес</strong>. Обычный <code>localhost</code> не подходит: Telegram не сможет достучаться до компьютера ученика.
          </li>
          <li>
            Поэтому есть два пути:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                ✅ <strong>Рекомендуется: n8n Cloud</strong> (пробный период, условия проверьте на сайте n8n). Адрес сразу публичный, всё работает «из коробки». Этот же аккаунт понадобится на Уроке 21.
              </li>
              <li>
                🛠️ <strong>Локально</strong> (<code>npx n8n</code>): Лабы 1 и 2 работают без проблем, а для Лабы 3 нужен туннель (например, ngrok) и переменная <code>WEBHOOK_URL</code>. Подготовьте его сами и покажите на проекторе.
              </li>
            </ul>
          </li>
          <li>Лабы 1 и 2 используют только <strong>отправку</strong> сообщений и работают <strong>везде</strong>, включая локальный запуск.</li>
          <li>Проверьте возраст-ограничения Telegram и n8n для ваших учеников. При необходимости аккаунты создают вместе с родителями или опекунами.</li>
          <li>Интерфейс n8n обновляется. Названия кнопок могут отличаться, например, «Activate» теперь может называться «Publish». Один раз пройдите все лабы заранее.</li>
        </ol>
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
              'объяснить, что такое автоматизация и чем она полезна;',
              'назвать главные понятия n8n: workflow, node, trigger, credentials, execution;',
              'создать Telegram-бота у BotFather и безопасно хранить его токен;',
              'собрать первый workflow: n8n отправляет сообщение в Telegram;',
              'собрать автоматизацию по расписанию;',
              'собрать двустороннего бота, который отвечает на сообщения;',
              'проверить работу и найти ошибку по журналу запусков (Executions).'
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
            <Clock className="w-5 h-5 text-cyan-400" />
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
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">10 мин</td><td className="py-2 pl-3">Вводная: что такое автоматизация</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">15 мин</td><td className="py-2 pl-3">Лекция: n8n и Telegram-бот</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">10 мин</td><td className="py-2 pl-3">Демонстрация преподавателя</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">45 мин</td><td className="py-2 pl-3">Лабораторная работа (3 задания)</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">5 мин</td><td className="py-2 pl-3">Мини-детектив</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-cyan-300 font-bold">5 мин</td><td className="py-2 pl-3">Рефлексия и загрузка работы</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ПРАВИЛА БЕЗОПАСНОСТИ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-rose-400" />
          <span>🛡️ Правила безопасности (прочитай первым!)</span>
        </h2>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed">
          <li>
            🔑 <strong>Токен бота — это пароль.</strong> Кто знает токен, тот управляет ботом. Не показывай его в чате, на скриншотах и не отправляй друзьям. Закрывай токен на скриншотах.
          </li>
          <li>
            ♻️ Если токен случайно показал, напиши BotFather команду <code>/revoke</code>, и токен заменится на новый.
          </li>
          <li>
            🔗 Ссылка вида <code>api.telegram.org/bot…</code> <strong>содержит токен</strong>. Открывай её только у себя в браузере.
          </li>
          <li>
            👤 Пиши <strong>только своему боту</strong>. Не добавляй бота в чужие группы и не собирай чужие данные.
          </li>
          <li>
            🧪 В тестах используй простые сообщения: «Привет», «Тест 1». Никаких адресов, телефонов и документов.
          </li>
          <li>
            ⏰ <strong>Выключай автоматизации после теста</strong> (Unpublish / Deactivate), чтобы бот не присылал сообщения каждую минуту.
          </li>
          <li>
            👀 Если что-то непонятно, спроси преподавателя, а не ставь незнакомые программы с неизвестных сайтов.
          </li>
        </ol>
      </div>

      {/* ЛЕКЦИЯ: РАЗДЕЛ 1 И 2 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>📖 ЛЕКЦИЯ • РАЗДЕЛЫ 1–2</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">1. Что такое автоматизация?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Автоматизация</strong> — это когда компьютер сам делает повторяющиеся дела по правилу:
          </p>
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-xs sm:text-sm text-cyan-200 font-bold">
            Если случилось событие → то выполни действия.
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <div className="font-bold text-white">Примеры из жизни:</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Каждое утро в 8:00 приходит напоминание «Собери рюкзак».</li>
              <li>Написал боту «привет», получил ответ.</li>
              <li>Пришла заявка из формы, и сообщение сразу появилось в Telegram.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">2. Что такое n8n?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>n8n</strong> (читается «эн-эйт-эн») — это платформа, где автоматизации собирают <strong>как конструктор</strong>: из кубиков, соединённых линиями. Писать большой код не нужно.
          </p>

          <h3 className="text-base sm:text-lg font-black text-white">🧩 Главные слова</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 pr-4">Слово</th>
                  <th className="py-2.5 pl-4">Простыми словами</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Workflow (воркфлоу)</td>
                  <td className="py-2.5 pl-4">Одна автоматизация целиком, как схема</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Node (нода)</td>
                  <td className="py-2.5 pl-4">Один кубик-шаг: «отправить сообщение», «ждать», «проверить условие»</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Trigger (триггер)</td>
                  <td className="py-2.5 pl-4">Первый кубик: «когда запускаться?» (по кнопке, по времени, по сообщению)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Credentials (доступы)</td>
                  <td className="py-2.5 pl-4">Пароль или токен, чтобы n8n мог работать с Telegram</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Execution (запуск)</td>
                  <td className="py-2.5 pl-4">Одна «пробежка» воркфлоу. Все запуски видны в списке Executions</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-cyan-300">Expression (выражение)</td>
                  <td className="py-2.5 pl-4">Вставка данных в текст, например <code>{`{{ $json.message.text }}`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto">
{`[Триггер] ──► [Действие 1] ──► [Действие 2]
 когда?          что сделать?     что ещё?`}
          </pre>
        </div>
      </div>

      {/* РАЗДЕЛЫ 3 И 4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">3. Что такое Telegram-бот?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Бот</strong> — это особый аккаунт в Telegram, которым управляет программа. Его создают у официального бота <strong>@BotFather</strong> (у него синяя галочка).
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Бот получает <strong>токен</strong> — длинный секретный ключ. Через него n8n «разговаривает» с ботом.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">4. Два способа запустить n8n</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2.5">
              <div className="text-sm font-black text-emerald-300">☁️ Способ 1: n8n Cloud (рекомендуется)</div>
              <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-300 space-y-1.5">
                <li>Открой сайт <strong>n8n.io</strong> и создай аккаунт с пробным периодом.</li>
                <li>Дождись, пока откроется твоё рабочее пространство.</li>
                <li>Всё готово. Адрес публичный, Telegram Trigger будет работать.</li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
              <div className="text-sm font-black text-cyan-300">💻 Способ 2: на своём компьютере</div>
              <p className="text-xs sm:text-sm text-slate-300">
                Если Node.js уже установлен (мы ставили его на прошлых уроках), открой терминал и выполни:
              </p>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <code className="text-xs font-mono text-cyan-300">npx n8n</code>
                <button
                  onClick={() => handleCopy('npx-n8n', 'npx n8n')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-200 flex items-center gap-1"
                >
                  {copiedId === 'npx-n8n' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Через минуту открой в браузере <code>http://localhost:5678</code> и создай локальную учётную запись.
              </p>
              <p className="text-xs text-amber-300">
                ⚠️ Так будут работать Лабы 1 и 2. Для Лабы 3 (бот отвечает на сообщения) нужен публичный HTTPS-адрес, поэтому её показывает преподаватель. Остановить n8n: в терминале <strong>Ctrl + C</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* РАЗДЕЛЫ 5, 6, 7 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">5. Создаём бота у BotFather</h2>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>В Telegram найди <strong>@BotFather</strong> (с синей галочкой).</li>
            <li>Нажми <strong>Start</strong> и отправь команду <code>/newbot</code>.</li>
            <li>Придумай <strong>имя</strong> бота (можно по-русски), например: <code>Помощник Алии</code>.</li>
            <li>Придумай <strong>username</strong>: латиница, обязательно заканчивается на <code>bot</code>, например <code>alia_helper_2026_bot</code>.</li>
            <li>BotFather пришлёт <strong>токен</strong>. Он выглядит как длинная строка с двоеточием. 🔑 Скопируй и храни в секрете.</li>
            <li>Открой своего бота по ссылке от BotFather и нажми <strong>Start</strong>, а потом напиши ему «Привет».</li>
          </ol>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">6. Подключаем токен в n8n (один раз)</h2>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>В n8n создай новый workflow (<strong>Create workflow</strong>).</li>
            <li>Нажми <strong>«+»</strong>, найди ноду <strong>Telegram</strong>, выбери действие <strong>Send a text message</strong>.</li>
            <li>В поле <strong>Credential</strong> выбери <strong>Create new credential</strong>.</li>
            <li>Вставь <strong>Access Token</strong> (токен от BotFather) и сохрани.</li>
            <li>Должна появиться отметка, что подключение прошло успешно.</li>
          </ol>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">7. Как узнать свой Chat ID</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Chat ID</strong> — это «номер» твоего чата с ботом. Он нужен, чтобы бот знал, <strong>кому</strong> писать.
          </p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Напиши своему боту любое сообщение, например «Привет».</li>
            <li>Открой в браузере (подставь свой токен вместо <code>ТОКЕН</code>):</li>
          </ol>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 flex-wrap">
            <code className="text-xs font-mono text-emerald-300">https://api.telegram.org/botТОКЕН/getUpdates</code>
            <button
              onClick={() => handleCopy('getupdates', 'https://api.telegram.org/botТОКЕН/getUpdates')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-200 flex items-center gap-1"
            >
              {copiedId === 'getupdates' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200">
            3. Найди в тексте кусочек вроде <code>{`"chat":{"id":123456789,...`}</code>. Число после <code>"id":</code> и есть твой <strong>Chat ID</strong>.
          </p>
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-1">
            <div>🔒 Эту ссылку не отправляй никому: в ней твой токен.</div>
            <div>💡 Если список пустой, напиши боту ещё раз и обнови страницу.</div>
          </div>
        </div>
      </div>

      {/* ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/30 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>🎬</span>
          <span>ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ (10 минут)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">Преподаватель показывает на экране:</p>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5">
          <li>Вход в n8n и пустой workflow.</li>
          <li>Создание бота у BotFather (токен закрыт на экране!).</li>
          <li>Добавление Telegram-credential в n8n.</li>
          <li>Нажатие <strong>Execute workflow</strong> и сообщение, пришедшее в Telegram.</li>
          <li>Просмотр списка <strong>Executions</strong>.</li>
        </ol>
      </div>

      {/* РЕФЛЕКСИЯ И ИТОГ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/40 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>💬</span>
          <span>РЕФЛЕКСИЯ (5 минут) и 🏁 Итог</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ты познакомился(лась) с n8n, создал(а) Telegram-бота и собрал(а) автоматизации: по кнопке, по расписанию и «на сообщение». Главное правило: <strong>токен — это секрет</strong>. На следующем уроке мы подключим к n8n ИИ через <strong>MCP</strong> и будем создавать автоматизации голосом, то есть текстовой просьбой. 🚀
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              1. Какую рутину в твоей жизни можно автоматизировать?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q1}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1: e.target.value })}
              placeholder="Например: напоминание собрать рюкзак..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              2. Что было самым сложным: бот, токен, Chat ID или нода?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q2}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2: e.target.value })}
              placeholder="Напиши, что показалось самым сложным..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              3. Почему важно выключать автоматизации после теста?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q3}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3: e.target.value })}
              placeholder="Чтобы бот не присылал сообщения каждую минуту..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              4. Какого бота ты бы хотел(а) создать следующим?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q4}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q4: e.target.value })}
              placeholder="Например: бот с расписанием уроков..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          onClick={handleSaveReflection}
          disabled={reflectionSaved}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            reflectionSaved
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg'
          }`}
        >
          {reflectionSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
          {reflectionSaved ? 'Ответы сохранены (+25 ОП)' : 'Сохранить ответы рефлексии (+25 ОП)'}
        </button>
      </div>
    </div>
  );
};
