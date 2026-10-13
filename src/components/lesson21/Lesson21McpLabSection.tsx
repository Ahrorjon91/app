import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  Plug,
  Copy,
  Check,
  Bug
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson21McpLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [taskChecked, setTaskChecked] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTask = (key: string) => {
    const next = { ...taskChecked, [key]: !taskChecked[key] };
    setTaskChecked(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 6) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(100, '🎉 Все задания лабораторной работы Урока 21 (MCP + n8n) выполнены! (+100 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('21', 't21_1');
    }
  };

  const tasks = [
    {
      id: 't1',
      title: '✅ Задание 1. «Покажи, что у меня есть» (поиск)',
      prompt: `Покажи мои workflow в n8n. Для каждого напиши название и коротко, что он делает.`,
      checkText: 'Проверь: список совпал с тем, что ты видишь в n8n?'
    },
    {
      id: 't2',
      title: '✅ Задание 2. «Запусти workflow» (выполнение)',
      prompt: `Запусти мой workflow «Привет Telegram» в n8n и скажи, что получилось.`,
      checkText: 'Проверь: пришло ли сообщение в Telegram? Появился ли новый запуск в Executions? (Если Claude просит выбрать режим запуска, для теста подходит ручной (manual) режим.)'
    },
    {
      id: 't3',
      title: '✅ Задание 3. «Создай простой workflow» (создание)',
      prompt: `Создай в n8n новый workflow «Тест от Claude».
Триггер: запуск вручную (Manual Trigger).
Дальше: нода Edit Fields (Set), поле message = «Привет из Claude через MCP!».
Не включай и не публикуй workflow. Потом объясни каждую ноду простыми словами.`,
      checkText: 'Проверь вручную: 1) Открой новый workflow в n8n. 2) Есть ли Manual Trigger и нода Edit Fields? 3) Правильно ли записано поле message? 4) Нажми Execute workflow. Появилось ли в выходных данных message?'
    },
    {
      id: 't4',
      title: '✅ Задание 4. «Добавь Telegram» (редактирование)',
      prompt: `Измени workflow «Тест от Claude»: после ноды Edit Fields добавь ноду Telegram «Send a text message» и поставь в текст значение поля message. Chat ID и credential я укажу вручную. Не запускай.`,
      checkText: 'Проверь и доделай вручную: 1) Открой ноду Telegram. 2) Выбери свой credential и вставь свой Chat ID (ИИ не знает твой токен, и это правильно!). 3) В поле Text должно быть выражение {{ $json.message }}. 4) Нажми Execute workflow и проверь Telegram.'
    },
    {
      id: 't5',
      title: '✅ Задание 5. «Напоминание по расписанию» (идея на выбор)',
      prompt: `Создай workflow «Вечернее напоминание»: Schedule Trigger каждый день в 20:00, затем Telegram «Send a text message» с текстом «📚 Время почитать 15 минут!». Chat ID и credential я укажу сам. Не публикуй.`,
      checkText: 'Проверь: 1) Тип триггера, время, текст сообщения. 2) Подключи credential и Chat ID. 3) Проверь один раз кнопкой Execute workflow. 4) Не публикуй, если это не нужно (чтобы бот не писал по расписанию).'
    },
    {
      id: 't6',
      title: '✅ Задание 6 (бонус). «Улучши описание и найди ошибку»',
      prompt: `Измени текст в workflow «Тест от Claude» на «Привет, школа!» и объясни, что поменял.`,
      checkText: 'Проверь, изменилось ли именно то, что просили, и ничего лишнего. Если ИИ ошибся, сформулируй уточняющий запрос: «Верни прежний текст и измени только слово “Привет” на “Здравствуйте”».'
    }
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border border-violet-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-mono text-xs font-bold border border-violet-500/40">
            🧪 LABS • ЛАБОРАТОРНАЯ РАБОТА
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 35 минут · 🧰 Нужно: свой n8n Cloud с Telegram-credential из Урока 20; Claude на аккаунте преподавателя
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🧪 «Прошу ИИ автоматизировать»
        </h2>

        <div className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
          👩‍🏫 <strong>Формат:</strong> запросы к Claude отправляет <strong>преподаватель</strong> на общем экране. Класс <strong>предлагает формулировки</strong>, голосует за лучшую, а потом <strong>каждый ученик проверяет результат у себя в n8n</strong> (или разбирает его по скриншотам класса).
        </div>
      </div>

      {/* Подготовка в n8n */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Plug className="w-5 h-5 text-emerald-400" />
          <span>✅ Подготовка в n8n (делает каждый ученик)</span>
        </h3>
        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Убедись, что у тебя есть workflow <strong>«Привет Telegram»</strong> из Урока 20 (Manual Trigger → Telegram).</li>
          <li>Открой его: меню <strong>«…» → Settings</strong> → включи <strong>Available in MCP</strong>.</li>
          <li>Добавь <strong>описание</strong> workflow (меню <strong>Edit description</strong>): <code>Отправляет приветствие в мой Telegram. Запуск вручную.</code></li>
          <li>Проверь в <strong>Settings → Instance-level MCP → Workflows enabled</strong>, что workflow виден в списке.</li>
        </ol>
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200">
          💡 Хорошее описание помогает ИИ понять, что делает workflow.
        </div>
      </div>

      {/* Задания 1-6 */}
      <div className="space-y-5">
        {tasks.map((task) => {
          const done = !!taskChecked[task.id];
          return (
            <div key={task.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">{task.title}</h3>
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    done
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{done ? 'Выполнено' : 'Отметить выполнение'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-violet-400">Запрос к Claude:</span>
                  <button
                    onClick={() => handleCopy(task.id, task.prompt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-violet-300 flex items-center gap-1"
                  >
                    {copiedId === task.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === task.id ? 'Скопировано' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-900 text-violet-200 font-mono text-xs whitespace-pre-wrap">
                  {task.prompt}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {task.checkText}
              </div>
            </div>
          );
        })}
      </div>

      {/* МИНИ-ДЕТЕКТИВ + ЧТО СДАТЬ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            <span>🐞 Мини-детектив (5 минут)</span>
          </h3>
          <p className="text-xs text-slate-300">Ответь по результатам:</p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Что было бы, если бы мы <strong>не включили</strong> «Available in MCP» для workflow?</li>
            <li>Почему ИИ <strong>не должен</strong> видеть токен Telegram?</li>
            <li>Что сделаем, если захотим <strong>отключить</strong> Claude от n8n? (Подсказка: <strong>Revoke access</strong>.)</li>
          </ol>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать</span>
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Скриншот workflow, созданного через Claude (Задание 3 или 5), открытого в твоём n8n</li>
            <li>Скриншот Executions или сообщения в Telegram после проверки</li>
            <li>Твой собственный <strong>запрос к ИИ</strong>, составленный по формуле (КТО → ЧТО → КОГДА → КУДА → КАК проверить)</li>
            <li>3 предложения: что ИИ сделал правильно и что пришлось исправить вручную</li>
          </ul>
        </div>
      </div>

      {/* Штатная форма сдачи Лабораторной работы */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-violet-400" />
          Сдача лабораторной работы #21 в систему
        </h3>
        <InlineLabSubmission
          labId={21}
          labTitle="Урок 21: Прошу ИИ автоматизировать (MCP и Claude + n8n)"
        />
      </div>
    </div>
  );
};
