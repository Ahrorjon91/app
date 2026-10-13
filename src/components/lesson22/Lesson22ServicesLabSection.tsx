import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  GraduationCap,
  Bug
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson22ServicesLabSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});
  const markLabTaskCompleted = portal?.markLabTaskCompleted;

  const [partChecked, setPartChecked] = useState<Record<string, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState('Как работает ИИ');

  const togglePart = (key: string) => {
    const next = { ...partChecked, [key]: !partChecked[key] };
    setPartChecked(next);
    const count = Object.values(next).filter(Boolean).length;
    if (count === 3) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      addReward(100, '🎉 Все 3 части лабораторной работы Урока 22 (NotebookLM, Gamma, Pomelli) выполнены! (+100 ОП)');
      if (markLabTaskCompleted) markLabTaskCompleted('22', 't22_1');
    }
  };

  const topics = [
    'Как работает ИИ',
    'ИИ в учёбе',
    'Безопасность в интернете',
    'Своя тема'
  ];

  return (
    <div className="space-y-10 text-slate-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
            🧪 LABS • ЛАБОРАТОРНАЯ РАБОТА
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ⏱ Время: 40 минут · 🧰 Нужно: разрешённый аккаунт Google, доступ к gamma.app, 2–3 коротких материала по теме
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white">
          🧪 «Мини-проект: от материалов до презентации и рекламы»
        </h2>

        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-300 uppercase font-mono">Тема на выбор:</div>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedTopic === t
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ЧАСТЬ A. NOTEBOOKLM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-white">
            ✅ Часть A. NotebookLM (15 минут)
          </h3>
          <button
            onClick={() => togglePart('partA')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              partChecked['partA']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{partChecked['partA'] ? 'Часть A готова!' : 'Отметить выполнение Части A'}</span>
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Открой <strong>NotebookLM</strong> и создай <strong>новый блокнот</strong> «Мой проект».</li>
          <li>Добавь <strong>2–3 источника</strong> по теме (свои заметки, текст из открытой статьи или ссылка на сайт).</li>
          <li>
            Задай ИИ <strong>3 вопроса</strong>:
            <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
              <li>«Расскажи простыми словами, о чём эти материалы».</li>
              <li>«Какие 5 главных идей здесь есть?»</li>
              <li>«Составь 5 вопросов для самопроверки».</li>
            </ul>
          </li>
          <li><strong>Проверь цитаты:</strong> нажми минимум на 2 ссылки-цитаты и убедись, что ответ соответствует источнику.</li>
          <li>В <strong>Studio</strong> создай <strong>Ментальную карту</strong> или <strong>Карточки</strong> (на выбор).</li>
          <li>Скопируй себе <strong>5 главных идей</strong> — они пригодятся для презентации.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 font-bold">
          ✅ Результат Части A: 5 главных идей + скриншот ментальной карты или карточек.
        </div>
      </div>

      {/* ЧАСТЬ B. GAMMA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-white">
            ✅ Часть B. Gamma (15 минут)
          </h3>
          <button
            onClick={() => togglePart('partB')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              partChecked['partB']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{partChecked['partB'] ? 'Часть B готова!' : 'Отметить выполнение Части B'}</span>
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Открой <strong>Gamma</strong> и создай <strong>новую презентацию</strong> (Generate → Presentation).</li>
          <li>Вставь 5 главных идей из Части A и добавь заголовок. Можно использовать пример промпта из лекции, изменив тему.</li>
          <li>Выбери <strong>7–8 слайдов</strong> и <strong>русский язык</strong>.</li>
          <li>Выбери <strong>тему оформления</strong> и нажми <strong>Generate</strong> (один раз!).</li>
          <li><strong>Проверь каждый слайд:</strong> удали лишний текст, исправь ошибки, замени неподходящие картинки.</li>
          <li>Добавь последний слайд <strong>«Мой вывод»</strong> со своими словами (2–3 предложения).</li>
          <li><strong>Экспортируй</strong> презентацию в <strong>PDF</strong>.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-xs sm:text-sm text-cyan-200 font-bold">
          ✅ Результат Части B: PDF-презентация из 7–8 слайдов.
        </div>
      </div>

      {/* ЧАСТЬ C. POMELLI */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-lg sm:text-xl font-black text-white">
            ✅ Часть C. Pomelli (10 минут)
          </h3>
          <button
            onClick={() => togglePart('partC')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              partChecked['partC']
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{partChecked['partC'] ? 'Часть C готова!' : 'Отметить выполнение Части C'}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
          Если Pomelli недоступен в твоём аккаунте, смотри демонстрацию преподавателя и напиши, как бы ты использовал(а) этот сервис.
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
          <li>Открой <strong>Pomelli</strong> и вставь <strong>адрес демо-сайта</strong> (из Урока 16) или сайт, который разрешил преподаватель.</li>
          <li>Дождись создания <strong>Business DNA</strong> и <strong>проверь</strong> цвета, шрифты, описание.</li>
          <li>Выбери <strong>одну идею кампании</strong> (например, «Знакомство с бизнесом»).</li>
          <li>Получи <strong>вариант поста</strong> с картинкой.</li>
          <li><strong>Проверь текст:</strong> нет ли выдуманных фактов, скидок, отзывов; верны ли название и контакты.</li>
          <li><strong>Отредактируй</strong> и <strong>скачай</strong> результат.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs sm:text-sm text-amber-200 font-bold">
          ✅ Результат Части C: один рекламный пост (картинка + текст) и список из 2 исправлений, которые ты сделал(а) вручную.
        </div>
      </div>

      {/* МИНИ-ДЕТЕКТИВ + ЧТО СДАТЬ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            <span>🐞 Мини-детектив (5 минут)</span>
          </h3>
          <p className="text-xs text-slate-300">Найди и исправь <strong>минимум 2 проблемы</strong> в своей работе:</p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>Есть ли факт в презентации, который ты не проверил(а)?</li>
            <li>Не слишком ли много текста на слайде?</li>
            <li>Есть ли в рекламном посте выдуманная скидка или награда?</li>
            <li>Совпадает ли название бизнеса и контакты с настоящими?</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Что сдать</span>
          </h3>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <li>5 главных идей из NotebookLM и скриншот ментальной карты или карточек</li>
            <li>PDF-презентацию из Gamma</li>
            <li>Рекламный пост из Pomelli (картинка + текст) или описание, как бы ты его использовал(а)</li>
            <li>3–5 предложений: что ИИ сделал хорошо, а что пришлось исправить вручную</li>
          </ul>
        </div>
      </div>

      {/* Штатная форма сдачи Лабораторной работы */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Сдача лабораторной работы #22 в систему
        </h3>
        <InlineLabSubmission
          labId={22}
          labTitle="Урок 22: Мини-проект (NotebookLM, Gamma и Pomelli)"
        />
      </div>
    </div>
  );
};
