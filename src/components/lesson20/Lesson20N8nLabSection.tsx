import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Bot,
  Sparkles,
  Copy,
  Check,
  Bug,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson20N8nLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [labChecked, setLabChecked] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLab = (key: string) => {
    const next = { ...labChecked, [key]: !labChecked[key] };
    setLabChecked(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 3) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(100, '🎉 Все 3 лабораторные работы по n8n и Telegram-боту выполнены! (+100 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('20', 't20_1');
    }
  };

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            🧪 LABS • ЛАБОРАТОРНАЯ РАБОТА
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 45 минут · 🧰 Нужно: аккаунт Telegram, n8n (Cloud или локально), созданный бот, токен и Chat ID
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🧪 «Мой первый Telegram-автоматизатор»
        </h2>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-cyan-300 uppercase font-mono">Подготовка (5–10 минут):</div>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-300 space-y-1">
            <li>Запусти n8n (Cloud или <code>npx n8n</code>).</li>
            <li>Создай бота у BotFather и скопируй токен (<strong>секретно!</strong>).</li>
            <li>Напиши боту «Привет» и найди свой Chat ID (раздел 7 лекции).</li>
          </ol>
        </div>
      </div>

      {/* ЛАБА 1 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Работает везде, даже на локальном n8n
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              ✅ Лаба 1. «Привет из n8n» (по кнопке)
            </h3>
          </div>
          <button
            onClick={() => toggleLab('lab1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              labChecked['lab1']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{labChecked['lab1'] ? 'Лаба 1 готова!' : 'Отметить выполнение Лабы 1'}</span>
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Создай новый workflow и назови его <strong>«Привет Telegram»</strong>.</li>
          <li>Нажми <strong>«+»</strong> → добавь <strong>Manual Trigger</strong> (запуск вручную). Часто он уже есть по умолчанию.</li>
          <li>Нажми <strong>«+»</strong> справа от триггера → найди <strong>Telegram</strong> → выбери <strong>Send a text message</strong>.</li>
          <li>Выбери свой credential (токен бота).</li>
          <li>В поле <strong>Chat ID</strong> вставь свой Chat ID.</li>
          <li>В поле <strong>Text</strong> напиши: <code>Привет! Это моё первое сообщение из n8n 🎉</code></li>
          <li>Нажми <strong>Execute workflow</strong>.</li>
          <li>Открой Telegram: сообщение должно прийти от твоего бота.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 font-bold">
          ✅ Если сообщение пришло, Лаба 1 готова!
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-1.5 text-xs text-slate-300">
          <div className="font-bold text-rose-300">🐞 Если не пришло:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Проверь, что нажал <strong>Start</strong> у своего бота.</li>
            <li>Проверь, что Chat ID — это только цифры (без кавычек и пробелов).</li>
            <li>Нода стала красной? Нажми на неё и прочитай ошибку.</li>
          </ul>
        </div>
      </div>

      {/* ЛАБА 2 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Тоже работает на локальном n8n, пока компьютер включён
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              ✅ Лаба 2. «Напоминание по расписанию»
            </h3>
          </div>
          <button
            onClick={() => toggleLab('lab2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              labChecked['lab2']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{labChecked['lab2'] ? 'Лаба 2 готова!' : 'Отметить выполнение Лабы 2'}</span>
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Создай новый workflow <strong>«Напоминание»</strong>.</li>
          <li>Добавь триггер <strong>Schedule Trigger</strong>.</li>
          <li>Настрой: <strong>Trigger Interval = Minutes</strong>, <strong>Minutes Between Triggers = 1</strong> (для теста).</li>
          <li>Добавь ноду <strong>Telegram → Send a text message</strong>: тот же credential и Chat ID.</li>
          <li>В поле <strong>Text</strong> напиши: <code>💧 Время выпить стакан воды!</code></li>
          <li>Нажми <strong>Execute workflow</strong>, чтобы проверить один раз.</li>
          <li>Включи workflow: переключатель <strong>Active</strong> или кнопка <strong>Publish</strong> (название зависит от версии).</li>
          <li>Подожди 2–3 минуты и посмотри на сообщения в Telegram.</li>
          <li>⏰ <strong>Обязательно выключи</strong> workflow (<strong>Inactive</strong> / <strong>Unpublish</strong>), чтобы бот не писал дальше.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
          <div className="text-xs font-bold text-amber-300">
            ✅ Бонус: добавь ноду Edit Fields (Set) между триггером и Telegram, создай поле <code>dateText</code> со значением:
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <code className="text-xs font-mono text-amber-200">{`{{ $now.toFormat('dd.MM.yyyy HH:mm') }}`}</code>
            <button
              onClick={() => handleCopy('now-expr', "{{ $now.toFormat('dd.MM.yyyy HH:mm') }}")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-200 flex items-center gap-1"
            >
              {copiedId === 'now-expr' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <div className="text-xs text-slate-300">
            и в тексте сообщения напиши: <code>{`Сейчас {{ $json.dateText }}: пора выпить воды 💧`}</code>
          </div>
        </div>
      </div>

      {/* ЛАБА 3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-violet-400 uppercase">
              Двусторонний бот (Telegram Trigger)
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              ✅ Лаба 3. «Бот отвечает!» (двусторонний бот)
            </h3>
          </div>
          <button
            onClick={() => toggleLab('lab3')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              labChecked['lab3']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{labChecked['lab3'] ? 'Лаба 3 готова!' : 'Отметить выполнение Лабы 3'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
          ⚠️ Нужен <strong>публичный HTTPS-адрес</strong>: n8n Cloud или туннель от преподавателя. Если n8n у тебя локальный, смотри за демонстрацией преподавателя.
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Создай новый workflow <strong>«Бот-эхо»</strong>.</li>
          <li>Добавь триггер <strong>Telegram Trigger</strong>. Выбери свой credential, а в <strong>Updates</strong> выбери <strong>message</strong>.</li>
          <li>Нажми <strong>Listen for test event</strong> (слушать тестовое событие) и напиши боту «Привет».</li>
          <li>В n8n появятся данные сообщения. Найди там <code>message → text</code> и <code>message → chat → id</code>.</li>
          <li>Добавь ноду <strong>Telegram → Send a text message</strong>.</li>
          <li>В поле <strong>Chat ID</strong> вставь выражение: <code>{`{{ $json.message.chat.id }}`}</code></li>
          <li>В поле <strong>Text</strong> вставь: <code>{`Ты написал: {{ $json.message.text }}`}</code></li>
          <li>Нажми <strong>Execute workflow</strong>, потом снова напиши боту. Бот должен ответить.</li>
          <li>Включи workflow (<strong>Active</strong> / <strong>Publish</strong>) и ещё раз проверь в Telegram.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-2">
          <div className="text-xs font-bold text-violet-300">✅ Усложнение: команда <code>/hello</code></div>
          <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1">
            <li>Между триггером и отправкой добавь ноду <strong>If</strong>.</li>
            <li>Условие: значение <code>{`{{ $json.message.text }}`}</code> <strong>is equal to</strong> <code>/hello</code>.</li>
            <li>К выходу <strong>true</strong> подключи отправку: <code>{`Привет, {{ $json.message.from.first_name }}! 👋`}</code></li>
            <li>К выходу <strong>false</strong> подключи отправку: <code>Я знаю команду /hello. Попробуй!</code></li>
            <li>Проверь обе ветки в Telegram.</li>
          </ol>
        </div>
      </div>

      {/* МИНИ-ДЕТЕКТИВ + ЧТО СДАТЬ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            <span>🐞 Мини-детектив (5 минут)</span>
          </h3>
          <p className="text-xs text-slate-300">Найди и объясни ошибку (или сломай и исправь нарочно):</p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Что будет, если в Chat ID добавить лишний пробел?</li>
            <li>Что будет, если забыть нажать <strong>Start</strong> у бота?</li>
            <li>Где в n8n посмотреть, <strong>когда</strong> запускался workflow и <strong>почему</strong> была ошибка? (Подсказка: <strong>Executions</strong>.)</li>
          </ol>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать</span>
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Скриншот workflow из Лабы 1 и сообщение в Telegram (<strong>токен закрой!</strong>)</li>
            <li>Скриншот workflow из Лабы 2 и сообщения по расписанию</li>
            <li>Скриншот Лабы 3 (диалог с ботом) или описание наблюдений за демонстрацией</li>
            <li>2–3 предложения: что было самым сложным</li>
          </ul>
        </div>
      </div>

      {/* Штатная форма сдачи Лабораторной работы */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-cyan-400" />
          Сдача лабораторной работы #20 в систему
        </h3>
        <InlineLabSubmission
          labId={20}
          labTitle="Урок 20: Мой первый Telegram-автоматизатор (n8n)"
        />
      </div>
    </div>
  );
};
