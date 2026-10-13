import React, { useState } from 'react';
import {
  Github,
  Globe,
  PhoneCall,
  CheckCircle2,
  Send,
  Smartphone,
  Trophy,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortal } from '../../context/PortalContext';
import { InlineHomeworkSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson14UpgradeHomeworkSection: React.FC = () => {
  const portal = usePortal() as any;
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [callFeatureSummary, setCallFeatureSummary] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Interactive Phone Call / Callback Simulator for HW Vibe Coding
  const [phoneNum, setPhoneNum] = useState('+992927778899');
  const [clientPhoneInput, setClientPhoneInput] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [copiedHint, setCopiedHint] = useState(false);

  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleCheck = (id: number) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim() || !liveUrl.trim()) return;
    setSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    addReward(80, '📞 Домашнее задание Урока 14 (Vibe Code функции Звонка + Callback Modal) успешно сдано (+80 ОП)!');
  };

  const vibeCodeIdeaPrompt = `Я хочу самостоятельно добавить на свой импортированный сайт функцию прямого звонка (Call Function) и умный виджет «Перезвоним за 30 секунд»:
1. Добавь в шапку сайта и в плавающий блок мульти-связи кнопку мгновенного звонка со смартфона по протоколу <a href="tel:${phoneNum}">📞 Позвонить сейчас</a>.
2. Создай красивое стеклянное модальное окно «Заказать обратный звонок за 30 секунд» с полем ввода номера телефона, валидацией и таймером обратного отсчёта (30 -> 0 сек).
3. Объедини на сайте все 3 канала связи: WhatsApp (из лекции), Telegram (из лабораторной) и Прямой Звонок Call (из домашнего задания) в удобный Smart Contact Hub, который не закрывает текст на мобильных экранах!`;

  return (
    <div className="space-y-10 text-slate-100 w-full pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase">
            📞 ДОМАШНЕЕ ЗАДАНИЕ УРОКА 14 • VIBE CODING CALL FUNCTION CHALLENGE
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            WhatsApp (Лекция) ➔ Telegram (Лаба) ➔ Call Function (ДЗ!)
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          🧠 Vibe Code Самостоятельно: Разработай функцию Прямого Звонка (`tel:`) и Виджет «Перезвоним за 30 секунд»!
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Смотри, как строится настоящее инженерное обучение без скучных повторов:
          на <strong>Лекции</strong> Ментор показал, как подключить <strong className="text-emerald-300">WhatsApp</strong>;
          в <strong>Лабораторной работе</strong> ты интегрировал <strong className="text-sky-300">Telegram</strong>;
          а теперь в <strong>Домашнем задании</strong> включи мышление вайб-кодера и <strong>самостоятельно спроектируй и добавь на сайт функцию Звонка (Call Function: кнопка `tel:+...` + интерактивная форма заказа обратного звонка с таймером)!</strong>
        </p>

        {/* 3-Stage Progression Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">1. Лекция (Показал Ментор)</span>
            <div className="text-sm font-black text-white">💬 WhatsApp Click-to-Chat</div>
            <p className="text-xs text-slate-400">Готовая схема `https://wa.me/номер?text=...`</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-1">
            <span className="text-[11px] font-mono uppercase text-sky-400 font-bold">2. Лабораторная (Сделано в классе)</span>
            <div className="text-sm font-black text-white">✈️ Telegram Deep Link</div>
            <p className="text-xs text-slate-400">Интеграция `https://t.me/username?text=...`</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/35 border-2 border-amber-500/60 space-y-1">
            <span className="text-[11px] font-mono uppercase text-amber-300 font-bold">3. Домашнее задание (Твой Vibe Code!)</span>
            <div className="text-sm font-black text-amber-200">📞 Call Function (`tel:`) + Обратный звонок</div>
            <p className="text-xs text-slate-200">Придумай свой промпт, добавь вызов в 1 клик с телефона и мульти-хаб связи!</p>
          </div>
        </div>
      </div>

      {/* Interactive Call Function & Callback Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> ИНТЕРАКТИВНЫЙ ПРОТОТИП ТВОЕГО ДОМАШНЕГО ЗАДАНИЯ
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Посмотри, как должна работать твоя функция Call (`tel:`) и заказ звонка, и завайбкодь её в AI Studio!
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(vibeCodeIdeaPrompt);
              setCopiedHint(true);
              setTimeout(() => setCopiedHint(false), 2000);
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedHint ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedHint ? 'Идея промпта скопирована!' : 'Скопировать ориентир промпта для Call-функции'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Direct Call Protocol Config */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-black uppercase text-amber-400">
              Часть А: Прямой вызов со смартфона (Протокол `tel:`)
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Номер телефона для кнопки «Позвонить сейчас»:</label>
              <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-amber-300"
              />
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              HTML-код вызова: <code className="text-amber-300">&lt;a href="tel:{phoneNum.replace(/\s+/g, '')}"&gt;📞 Позвонить&lt;/a&gt;</code>
            </div>
            <a
              href={`tel:${phoneNum.replace(/\s+/g, '')}`}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Протестировать кнопку Звонка (tel:{phoneNum.replace(/\s+/g, '')})</span>
            </a>
          </div>

          {/* Right: Smart Callback Request Modal Preview */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-black uppercase text-cyan-400">
              Часть Б: Умный виджет «Перезвоним за 30 секунд» (Callback Modal)
            </div>
            <p className="text-xs text-slate-400">
              Если клиент сидит с компьютера или хочет, чтобы менеджер сам перезвонил ему — он оставляет свой номер в 1 клик:
            </p>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="+992 (__) ___-__-__"
                value={clientPhoneInput}
                onChange={(e) => setClientPhoneInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => setCallbackRequested(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                Жду звонка!
              </button>
            </div>
            {callbackRequested && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-bold">
                ✅ Заявка принята! Наш инженер уже набирает номер {clientPhoneInput || phoneNum} (ожидание ~28 сек).
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6-Step Real-World Mobile Test Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-amber-400" />
          Чек-лист финального теста твоей Call-функции и мульти-связи на реальном телефоне (6 шагов)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 1, text: '1. Самостоятельно написал(а) промпт в AI Studio для добавления кнопки Звонка (tel:) и формы обратного звонка' },
            { id: 2, text: '2. Объединил(а) на сайте 3 канала связи: WhatsApp + Telegram + Прямой Звонок (Call)' },
            { id: 3, text: '3. Открыл(а) опубликованный сайт на реальном смартфоне и нажал(а) кнопку «Позвонить»' },
            { id: 4, text: '4. Убедился(ась), что смартфон автоматически открывает экран набора номера с правильным телефоном' },
            { id: 5, text: '5. Проверил(а) работу модального окна «Обратный звонок за 30 секунд» на ПК и телефоне' },
            { id: 6, text: '6. Сохранил(а) обновлённый код в GitHub и проверил(а) рабочий Live URL' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm flex items-center gap-3 transition-all cursor-pointer ${
                checklist[item.id]
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${checklist[item.id] ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Summary Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Быстрый отчёт о твоём Vibe-Coding решении (GitHub + Live URL + Call Function)
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Github className="w-4 h-4 text-cyan-400" /> Ссылка на обновлённый GitHub-репозиторий:
            </label>
            <input
              type="url"
              required
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/my-website"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> Ссылка на живой сайт (Vercel / GitHub Pages) с кнопками Call + Telegram + WhatsApp:
            </label>
            <input
              type="url"
              required
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://my-website.vercel.app"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-amber-400" /> Какой промпт ты придумал(а) сам(а) для функции Звонка (Call) и как она работает на телефоне?
            </label>
            <textarea
              rows={3}
              value={callFeatureSummary}
              onChange={(e) => setCallFeatureSummary(e.target.value)}
              placeholder="Опиши: 1) Как ты реализовал кнопку прямого вызова tel:..., 2) Добавил ли модалку обратного звонка, 3) Как прошёл тест со смартфона."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {!submitted ? (
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Зафиксировать выполнение (+80 ОП)
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Отчёт сохранён! Теперь прикрепи файл отчёта в форму сдачи ментору ниже.
          </div>
        )}
      </form>

      {/* СДАЧА ДОМАШНЕГО ЗАДАНИЯ В СИСТЕМУ */}
      <InlineHomeworkSubmission
        lessonId={14}
        lessonTitle="Домашнее задание #14: Самостоятельный Vibe Code функции Звонка (Call tel: + Callback Modal) + Мульти-связь (WhatsApp & Telegram)"
        rewardExp={100}
      />
    </div>
  );
};
