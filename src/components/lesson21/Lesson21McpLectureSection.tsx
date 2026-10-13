import React, { useState } from 'react';
import {
  Plug,
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

export const Lesson21McpLectureSection: React.FC = () => {
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
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSaveReflection = () => {
    if (reflectionSaved) return;
    setReflectionSaved(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    addReward(25, '💬 Рефлексия Урока 21 сохранена! (+25 ОП)');
  };

  const promptExamples = [
    {
      num: 1,
      idea: 'Список',
      query: '«Покажи мои workflow в n8n и коротко опиши каждый»'
    },
    {
      num: 2,
      idea: 'Запуск',
      query: '«Запусти workflow “Привет Telegram” и скажи результат»'
    },
    {
      num: 3,
      idea: 'Приветствие',
      query: '«Создай workflow: Manual Trigger → Edit Fields (message = “Привет!”) → Telegram. Не запускай»'
    },
    {
      num: 4,
      idea: 'Напоминание',
      query: '«Создай workflow: Schedule Trigger каждый день в 20:00 → Telegram “Пора читать”. Не публикуй»'
    },
    {
      num: 5,
      idea: 'Редактирование',
      query: '«Измени текст сообщения в workflow “Тест от Claude” на “Здравствуйте!”»'
    },
    {
      num: 6,
      idea: 'Объяснение',
      query: '«Объясни простыми словами, что делает каждая нода в workflow “Тест от Claude”»'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-violet-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/60 p-6 sm:p-10 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40 flex items-center gap-1.5">
            <Plug className="w-3.5 h-3.5" />
            УРОК 21 • ЛЕКЦИЯ УРОКА
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            Для кого: ученики 12+ · Язык: русский · Время: 90 минут
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            Инструменты: n8n Cloud (с Урока 20), Claude (аккаунт преподавателя), Telegram-бот из Урока 20
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          🔌 Урок 21. Что такое MCP и как подключить Claude к n8n
        </h1>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-violet-500/30 space-y-2">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong>Идея урока:</strong> вместо того чтобы вручную собирать кубики, мы просим ИИ: «Создай автоматизацию, которая…». Claude через <strong>MCP</strong> подключается к n8n и сам строит или запускает workflow. А мы проверяем и учимся управлять этим безопасно.
          </p>
        </div>
      </div>

      {/* Заметка для преподавателя (до урока, обязательно прочитать) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/30 space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-amber-300 flex items-center gap-2">
          <span>👩‍🏫</span>
          <span>Заметка для преподавателя (до урока, обязательно прочитать)</span>
        </h2>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
          <li>
            <strong>Возраст и аккаунты.</strong> Потребительские аккаунты Claude обычно рассчитаны на пользователей от 18 лет. Поэтому в этом уроке <strong>подключение Claude выполняет преподаватель со своего аккаунта</strong>, а ученики работают в <strong>своём n8n</strong> и наблюдают, проверяют и разбирают результат. Проверьте условия сервиса для вашей школы.
          </li>
          <li>
            <strong>Публичный адрес.</strong> Облачные клиенты вроде Claude.ai подключаются к n8n из интернета, поэтому n8n должен быть <strong>публично доступен</strong>. Проще всего использовать <strong>n8n Cloud</strong>. Локальный <code>localhost</code> для этого урока не подходит (без туннеля).
          </li>
          <li>
            <strong>Версия n8n.</strong> Возможность создавать и редактировать workflow через MCP доступна в новых версиях n8n (в документации указано: начиная с 2.13.0). Облако обновляется само. Если у вас старая версия, Claude сможет только искать и запускать workflow.
          </li>
          <li>
            <strong>Доступы (credentials).</strong> Токен Telegram должен быть уже добавлен в n8n (из Урока 20). Если Claude создаст ноду Telegram, подключить credential, скорее всего, придётся вручную в окне ноды. Это <strong>нормально и полезно для безопасности</strong>: ИИ не видит токен.
          </li>
          <li>
            <strong>Репетиция обязательна.</strong> Интерфейсы Claude и n8n меняются. Пройдите весь урок заранее на тестовом аккаунте, чтобы убедиться, что всё работает.
          </li>
          <li>
            <strong>Запасной вариант.</strong> Если подключение Claude по какой-то причине не сработает, проведите урок как разбор готового workflow: ученики собирают его вручную по описанию, а MCP объясняется по схеме.
          </li>
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
              'объяснить, что такое MCP, на понятной аналогии;',
              'назвать роли: клиент, сервер, инструменты (tools);',
              'включить доступ MCP в n8n и выбрать, какие workflow доступны ИИ;',
              'понимать, как преподаватель подключает Claude к n8n;',
              'сформулировать чёткую просьбу для ИИ и проверить результат вручную;',
              'объяснить правила безопасности при подключении ИИ к своим сервисам.'
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
            <Clock className="w-5 h-5 text-violet-400" />
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
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">10 мин</td><td className="py-2 pl-3">Вводная: «А если попросить ИИ?»</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">20 мин</td><td className="py-2 pl-3">Лекция: MCP простыми словами</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">15 мин</td><td className="py-2 pl-3">Демонстрация: подключение Claude к n8n</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">35 мин</td><td className="py-2 pl-3">Лабораторная работа</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">5 мин</td><td className="py-2 pl-3">Мини-детектив</td></tr>
                <tr><td className="py-2 pr-3 font-mono text-violet-300 font-bold">5 мин</td><td className="py-2 pl-3">Рефлексия и загрузка работы</td></tr>
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
            🔐 <strong>Доступ ИИ даём только к тому, что нужно.</strong> В n8n мы сами выбираем, какие workflow видит ИИ. Остальные остаются закрытыми.
          </li>
          <li>
            🔑 <strong>Токены и пароли не вставляем в чат с ИИ.</strong> Они хранятся только в n8n (credentials).
          </li>
          <li>
            👀 <strong>Проверяем то, что создал ИИ.</strong> Перед запуском открой workflow, посмотри каждую ноду и пойми, что она делает.
          </li>
          <li>
            🧪 <strong>Сначала тест, потом всё остальное.</strong> Запускай новые workflow на тестовых данных и только на своего бота.
          </li>
          <li>
            ✂️ <strong>Можно отозвать доступ.</strong> В n8n есть список подключённых клиентов, и любой можно отключить (Revoke access).
          </li>
          <li>
            🚫 <strong>Не давай ИИ делать опасное:</strong> удалять чужие данные, писать посторонним людям, тратить деньги. Для таких задач нужен человек.
          </li>
          <li>
            ⏰ Выключай тестовые автоматизации после проверки.
          </li>
        </ol>
      </div>

      {/* ЛЕКЦИЯ: РАЗДЕЛЫ 1-3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>📖 ЛЕКЦИЯ • РАЗДЕЛЫ 1–3</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            1. Проблема: ИИ умеет думать, но не умеет «нажимать кнопки»
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Claude может написать текст, но сам по себе <strong>не может</strong> отправить сообщение в Telegram или создать workflow в твоём n8n. Ему нужен <strong>мост</strong> к другим программам.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">2. Что такое MCP?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>MCP</strong> (Model Context Protocol) — это <strong>общий «разъём» для ИИ</strong>, как <strong>USB-C</strong> для устройств.
          </p>
          <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/40 text-xs sm:text-sm text-violet-200 leading-relaxed">
            Раньше у каждого устройства был свой провод. Теперь USB-C подходит ко многим. MCP делает то же для ИИ: <strong>один стандарт</strong>, чтобы подключать ИИ к разным программам и сервисам.
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">🧩 Три роли</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 pr-4">Роль</th>
                  <th className="py-2.5 px-4">Простыми словами</th>
                  <th className="py-2.5 pl-4">Пример</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-violet-300">MCP-клиент</td>
                  <td className="py-2.5 px-4">Тот, кто просит</td>
                  <td className="py-2.5 pl-4">Claude</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-violet-300">MCP-сервер</td>
                  <td className="py-2.5 px-4">Тот, кто умеет выполнять действия</td>
                  <td className="py-2.5 pl-4">n8n</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-violet-300">Tools (инструменты)</td>
                  <td className="py-2.5 px-4">Список действий, которые разрешено делать</td>
                  <td className="py-2.5 pl-4">«найти workflow», «запустить workflow», «создать workflow»</td>
                </tr>
              </tbody>
            </table>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto">
{`Ты → Claude (клиент) ──MCP──► n8n (сервер) ──► Telegram
         «Сделай…»            выполняет шаги      сообщение пришло ✅`}
          </pre>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">3. Как n8n работает с MCP?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            В n8n есть встроенный MCP-сервер. Через него подключённый клиент (например, Claude) может:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-1">
            <li>🔎 <strong>искать</strong> твои workflow;</li>
            <li>▶️ <strong>запускать</strong> и тестировать workflow, которые ты разрешил;</li>
            <li>🏗️ <strong>создавать и редактировать</strong> workflow (в новых версиях n8n).</li>
          </ul>
          <p className="text-xs sm:text-sm text-slate-300 pt-1">Ты сам решаешь, <strong>что разрешено</strong>:</p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1">
            <li>Включаешь MCP на уровне всего n8n.</li>
            <li>Отдельно включаешь <strong>«Available in MCP»</strong> для каждого нужного workflow.</li>
            <li>Можешь в любой момент <strong>отозвать доступ</strong> клиента.</li>
          </ol>
        </div>
      </div>

      {/* ЛЕКЦИЯ: РАЗДЕЛЫ 4-6 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            4. Как включить MCP в n8n (делают ученики и преподаватель)
          </h2>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Открой n8n Cloud.</li>
            <li>Перейди в <strong>Settings → Instance-level MCP</strong>.</li>
            <li>Нажми <strong>Enable MCP access</strong> (включить доступ). Это может сделать владелец или администратор аккаунта.</li>
            <li>Нажми <strong>Connect</strong> (подключить клиента) и выбери способ входа <strong>OAuth</strong> (рекомендуется).</li>
            <li>Скопируй <strong>Server URL</strong>. Он заканчивается на <code>/mcp-server/http</code>.</li>
          </ol>
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs text-cyan-200">
            🔎 Названия кнопок могут немного отличаться в разных версиях. Ищи слова <strong>Instance-level MCP</strong>, <strong>Enable</strong>, <strong>Connect</strong>.
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white">5. Как преподаватель подключает Claude</h2>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>В настройках Claude открывает раздел подключений (<strong>Connectors</strong>) и добавляет <strong>пользовательский (custom) коннектор</strong>.</li>
            <li>Вставляет <strong>Server URL</strong> из n8n.</li>
            <li>Claude перенаправляет в n8n, и преподаватель <strong>подтверждает доступ</strong> (OAuth).</li>
            <li>В чате Claude появляется подключённый n8n.</li>
            <li>Первый тест: «Покажи мои workflow в n8n».</li>
          </ol>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">6. Как правильно просить ИИ (формула)</h2>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-violet-500/40 text-violet-200 font-mono text-xs sm:text-sm overflow-x-auto">
{`КТО делает → ЧТО делает → КОГДА → КУДА → КАК проверить`}
          </pre>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-rose-200">
              <strong>Плохо:</strong> «Сделай мне бота».
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
              <strong>Хорошо:</strong> «Создай workflow: запуск вручную, отправка в Telegram сообщения “Привет из Claude!”. Не включай по расписанию. После создания объясни каждую ноду».
            </div>
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-slate-200">
            <div className="font-bold text-white">Три правила:</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Одна небольшая задача</strong> за раз.</li>
              <li><strong>Назови ноды и триггер</strong>, если знаешь их.</li>
              <li>Попроси: <strong>«Объясни, что ты сделал»</strong> и <strong>«Не запускай, пока я не проверю»</strong>.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ & ПРИМЕРЫ ЗАПРОСОВ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/30 space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>🎬</span>
            <span>ДЕМОНСТРАЦИЯ ПРЕПОДАВАТЕЛЯ (15 минут)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">Преподаватель показывает на экране (токены закрыты!):</p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-1.5">
            <li>Включение <strong>Instance-level MCP</strong> в n8n.</li>
            <li>Включение <strong>Available in MCP</strong> для workflow «Привет Telegram».</li>
            <li>Подключение n8n к Claude как custom connector.</li>
            <li>Запрос: «Покажи мои workflow в n8n». Claude перечисляет доступные.</li>
            <li>Запрос на запуск: «Запусти workflow “Привет Telegram”». Сообщение приходит в Telegram.</li>
            <li>Запрос на создание нового workflow (пример из Лабы).</li>
            <li>Разбор: открыть созданный workflow в n8n и пройтись по каждой ноде вместе с классом.</li>
          </ol>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>💡 ПРИМЕРЫ ЗАПРОСОВ ДЛЯ ИИ (простые и проверенные идеи)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Перед уроком преподаватель проверяет каждый запрос на своём аккаунте. Credential Telegram и Chat ID подставляет человек.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 pr-3">№</th>
                  <th className="py-2 px-3">Идея</th>
                  <th className="py-2 pl-3">Запрос</th>
                  <th className="py-2 text-right">Копировать</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200">
                {promptExamples.map((row) => (
                  <tr key={row.num}>
                    <td className="py-2.5 pr-3 font-mono text-violet-300">{row.num}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{row.idea}</td>
                    <td className="py-2.5 pl-3 font-mono text-xs text-slate-300">{row.query}</td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => handleCopy(`ex-${row.num}`, row.query)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-violet-300 inline-flex items-center gap-1"
                      >
                        {copiedId === `ex-${row.num}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* РЕФЛЕКСИЯ И ИТОГ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-950 border border-violet-500/40 space-y-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <span>💬</span>
          <span>РЕФЛЕКСИЯ (5 минут) и 🏁 Итог</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ты узнал(а), что <strong>MCP</strong> — это «USB-C для ИИ», через который Claude (клиент) может работать с n8n (сервером). Ты видел(а), как ИИ ищет, запускает и создаёт workflow, а главное, научился(ась) <strong>проверять результат и соблюдать правила безопасности</strong>. ИИ ускоряет работу, но ответственность за проверку остаётся у человека. 🤝
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              1. Что удивило тебя больше всего, когда ИИ создал workflow?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q1}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q1: e.target.value })}
              placeholder="Напиши свои впечатления..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              2. Что пришлось исправить или подключить вручную, и почему так лучше?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q2}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q2: e.target.value })}
              placeholder="Например: подключить credential и Chat ID вручную для безопасности..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              3. В каких задачах ИИ-помощник поможет, а в каких нельзя ему доверять без проверки?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q3}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q3: e.target.value })}
              placeholder="Напиши свой ответ..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              4. Какую автоматизацию ты хочешь попросить создать следующей?
            </label>
            <input
              type="text"
              value={reflectionAnswers.q4}
              onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, q4: e.target.value })}
              placeholder="Напиши свою идею..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <button
          onClick={handleSaveReflection}
          disabled={reflectionSaved}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            reflectionSaved
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
              : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg'
          }`}
        >
          {reflectionSaved ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4" />}
          {reflectionSaved ? 'Ответы сохранены (+25 ОП)' : 'Сохранить ответы рефлексии (+25 ОП)'}
        </button>
      </div>
    </div>
  );
};
