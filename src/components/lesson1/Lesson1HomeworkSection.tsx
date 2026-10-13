import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Send,
  Award,
  Sparkles,
  Rocket,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson1HomeworkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // 6 пунктов AI Дневника
  const [ideas, setIdeas] = useState(
    '1) Помощь в разборе сложных задач по физике\n2) Тренировка диалогов на английском языке\n3) Генерация тем для школьного научного проекта'
  );
  const [spotAI, setSpotAI] = useState(
    '1) Разблокировка телефона по лицу (FaceID)\n2) Рекомендация плейлиста в плеере\n3) Навигатор в автобусе объехал пробку'
  );
  const [bugFound, setBugFound] = useState(
    'Нейросеть утверждала, что роман «Аэлита» написал Пушкин. Проверил в Википедии: автор Алексей Николаевич Толстой в 1923 году!'
  );
  const [dreamIdea, setDreamIdea] = useState(
    'Личный AI-репетитор по математике, который озвучивает формулы голосом любимого персонажа'
  );
  const [assistantName, setAssistantName] = useState('ПиксельБот');
  const [bestPrompt, setBestPrompt] = useState(
    'Ты — терпеливый репетитор по математике для школьника 13 лет. Объясни тему через пример с пиццей и задай мне один проверочный вопрос.'
  );

  const [saved, setSaved] = useState(false);
  const [submittedToMentor, setSubmittedToMentor] = useState(false);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const savedData = localStorage.getItem('ai_journal_lesson_1');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.ideas) setIdeas(parsed.ideas);
        if (parsed.spotAI) setSpotAI(parsed.spotAI);
        if (parsed.bugFound) setBugFound(parsed.bugFound);
        if (parsed.dreamIdea) setDreamIdea(parsed.dreamIdea);
        if (parsed.assistantName) setAssistantName(parsed.assistantName);
        if (parsed.bestPrompt) setBestPrompt(parsed.bestPrompt);
      } catch (e) {
        console.error('Error loading AI journal', e);
      }
    }
  }, []);

  const handleSaveLocal = () => {
    localStorage.setItem(
      'ai_journal_lesson_1',
      JSON.stringify({ ideas, spotAI, bugFound, dreamIdea, assistantName, bestPrompt })
    );
    setSaved(true);
    addReward(15, '💾 Черновик AI Дневника сохранён! (+15 Опыта)');
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSubmitMentor = () => {
    setSubmittedToMentor(true);
    handleSaveLocal();
    addReward(50, '📓 AI Дневник Урока 1 успешно сдан ментору! (+50 Опыта)');

    const compiledJournal = `📓 AI ДНЕВНИК К УРОКУ 1:
1) Идеи применения AI в учебе:
${ideas}

2) Где я заметил AI сегодня:
${spotAI}

3) Ошибка или галлюцинация AI:
${bugFound}

4) Моя безумная мечта с AI:
${dreamIdea}

5) Имя и характер ассистента:
${assistantName}

6) Лучший промпт из урока 1:
${bestPrompt}`;

    if (portal?.submitHomework) {
      portal.submitHomework(1, '', compiledJournal, []).catch((e) => console.warn('Submit HW error:', e));
    }
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* 4. ДОМАШНЕЕ ЗАДАНИЕ — AI ДНЕВНИК */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              4. Домашнее задание к Уроку 2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              📓 Твой личный «AI Дневник» (AI Journal исследователя)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
            Срок сдачи: до Урока 2 • Награда: +50 XP
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Заполни 6 ключевых пунктов дневника исследователя. Все данные сохраняются локально, а по готовности нажми «Отправить ментору»:
        </p>

        <div className="space-y-4">
          {/* Пункт 1: 3 Идеи для учебы */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-xs sm:text-sm text-cyan-300 flex items-center gap-2">
              💡 1) 3 ИДЕИ: Где нейросеть может помочь тебе в учебе?
            </label>
            <textarea
              rows={3}
              value={ideas}
              onChange={(e) => setIdeas(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 leading-relaxed"
            />
          </div>

          {/* Пункт 2: Где встретил ИИ */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-2">
              🔍 2) НАЙДИ ИИ ЗА ДЕНЬ: 3 места, где ты встретил алгоритмы вчера
            </label>
            <textarea
              rows={3}
              value={spotAI}
              onChange={(e) => setSpotAI(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* Пункт 3: Ошибка ИИ */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-xs sm:text-sm text-rose-300 flex items-center gap-2">
              🐛 3) ОШИБКА НЕЙРОСЕТИ, КОТОРУЮ Я НАШЁЛ И ПРОВЕРИЛ
            </label>
            <textarea
              rows={2}
              value={bugFound}
              onChange={(e) => setBugFound(e.target.value)}
              placeholder="Что ответил ИИ → как проверил → как на самом деле"
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-rose-400 leading-relaxed"
            />
          </div>

          {/* Пункт 4: Мечта */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="font-bold text-xs sm:text-sm text-purple-300 flex items-center gap-2">
              ✨ 4) МОЯ ИДЕЯ: Что бы я хотел, чтобы нейросеть создала лично для меня?
            </label>
            <input
              type="text"
              value={dreamIdea}
              onChange={(e) => setDreamIdea(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Пункты 5 и 6 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="font-bold text-xs sm:text-sm text-emerald-300">
                🤖 5) ИМЯ МОЕГО AI-ПОМОЩНИКА:
              </label>
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="font-bold text-xs sm:text-sm text-cyan-300">
                ⚡ 6) ЛУЧШИЙ ПРОМПТ ИЗ УРОКА 1:
              </label>
              <input
                type="text"
                value={bestPrompt}
                onChange={(e) => setBestPrompt(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleSaveLocal}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" /> {saved ? 'Сохранено!' : 'Сохранить черновик'}
          </button>

          <button
            onClick={handleSubmitMentor}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> {submittedToMentor ? '✓ Отправлено ментору!' : 'Отправить AI Дневник ментору (+50 XP)'}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ МЕНТОРУ */}
      {/* ========================================================= */}
      <div className="pt-2">
        <InlineHomeworkSubmission
          lessonId={1}
          homeworkTitle="Домашнее задание: Урок 1 (AI Дневник и рефлексия)"
        />
      </div>

      {/* 🏆 ТАБЛИЦА НАГРАД & АНОНС УРОКА 2 */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          🏆 Таблица наград Урока 1 (до +275 Опыта)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xl font-black text-cyan-300">+50 XP</div>
            <div className="text-xs text-slate-400">Изучение лекции</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xl font-black text-emerald-300">+100 XP</div>
            <div className="text-xs text-slate-400">Лабораторная работа</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xl font-black text-amber-300">+75 XP</div>
            <div className="text-xs text-slate-400">Тест & Фактчекинг</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xl font-black text-purple-300">+50 XP</div>
            <div className="text-xs text-slate-400">AI Дневник сдан</div>
          </div>
        </div>

        {/* Анонс Урока 2 */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/50 to-slate-950 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              ⏭️ Следующий урок
            </span>
            <h4 className="text-base sm:text-lg font-black text-white">
              Урок 2 — Промпт-инжиниринг: основы
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              Золотая формула: ПРОМПТ = Роль + Цель + Контекст + Ограничения + Формат вывода
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md">
            Возьми с собой лучший промпт! 🚀
          </div>
        </div>
      </div>
    </div>
  );
};
