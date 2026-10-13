import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Copy,
  Check,
  Send,
  Eye,
  RefreshCw,
  MessageSquare,
  FileText,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Play,
  CheckCircle2,
  CheckSquare,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  UserCheck,
  Terminal,
  Zap,
  Target
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson2LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subtabs inside Section 2 (Лабораторная работа)
  const [activeLabTab, setActiveLabTab] = useState<
    'tasks' | 'fewshot' | 'cot' | 'abtest' | 'submit'
  >('tasks');

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Шаблон скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // A/B Blind test evaluation state
  const [abRatingA, setAbRatingA] = useState<number>(0);
  const [abRatingB, setAbRatingB] = useState<number>(0);
  const [abRevealed, setAbRevealed] = useState<boolean>(false);

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Лабораторная работа #2 • Практикум
          </span>
          <span className="text-xs text-slate-400 font-mono">⏱️ 55 минут практики • +100 Опыта</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Инженерный тренажёр: RTFC, Few-Shot, CoT и A/B Тест
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Практикум по созданию профессиональных промптов. Пройди все 4 этапа, протестируй запросы в реальной нейросети и отправь результаты на проверку ментору.
        </p>
      </div>

      {/* НАВИГАЦИОННЫЕ ВКЛАДКИ ЛАБОРАТОРНОЙ */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'tasks', label: '1. Формула RTFC & Boss Prompt', icon: Target },
          { id: 'fewshot', label: '2. Few-Shot (Обучение на примерах)', icon: Sparkles },
          { id: 'cot', label: '3. Chain of Thought (CoT)', icon: Terminal },
          { id: 'abtest', label: '4. Слепой A/B тест моделей', icon: SlidersHorizontal },
          { id: 'submit', label: '5. Сдача отчёта ментору', icon: Send }
        ].map((t) => {
          const Icon = t.icon;
          const active = activeLabTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveLabTab(t.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                active
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ТАБ 1: ФОРМУЛА RTFC & BOSS PROMPT */}
      {activeLabTab === 'tasks' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Задание 1: Составление Boss Prompt для Худжанда (5/5)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Скопируй готовый каркас, подставь свои данные и протестируй в ChatGPT или Claude:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 font-mono uppercase">
                  Шаблон промпта для копирования:
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `[РОЛЬ]: Ты — ведущий гид и краевед Худжанда с 15-летним опытом.
[ЗАДАЧА]: Составь 1-дневный авторский пеший маршрут для гостей города.
[КОНТЕКСТ]: Гости приехали впервые, интересуются шёлком, историей и кулинарией. Бюджет средний, валюта сомони (TJS). Обязательные точки: базар Панджшанбе и Худжандская крепость.
[ФОРМАТ]: Наглядная Markdown таблица: Время | Локация | Что посмотреть / попробовать | Ориентировочная стоимость (TJS).
[ОГРАНИЧЕНИЯ]: Без общих фраз, максимум 200 слов, только реально существующие места.`,
                      'task1'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-300 border border-cyan-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'task1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'task1' ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed">
{`[РОЛЬ]: Ты — ведущий гид и краевед Худжанда с 15-летним опытом.
[ЗАДАЧА]: Составь 1-дневный авторский пеший маршрут для гостей города.
[КОНТЕКСТ]: Гости приехали впервые, интересуются шёлком, историей и кулинарией. Бюджет средний, валюта сомони (TJS). Обязательные точки: базар Панджшанбе и Худжандская крепость.
[ФОРМАТ]: Наглядная Markdown таблица: Время | Локация | Что посмотреть / попробовать | Ориентировочная стоимость (TJS).
[ОГРАНИЧЕНИЯ]: Без общих фраз, максимум 200 слов, только реально существующие места.`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ТАБ 2: FEW-SHOT */}
      {activeLabTab === 'fewshot' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Задание 2: Few-Shot Обучение (Строгий классификатор)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Покажи нейросети 2 эталонных примера перед новым запросом, чтобы получить идеальный формат вывода:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                  Шаблон Few-Shot промпта:
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `Классифицируй отзывы покупателей интернет-магазина в Худжанде по схеме:
Пример 1:
Текст: «Доставили курьером за 15 минут в 19 микрорайон, всё свежее, рахмат!»
Выход: { "тональность": "позитивная", "категория": "скорость доставки", "срочность": "низкая" }

Пример 2:
Текст: «Упаковка была помята, коробка открыта, курьер нахамил!»
Выход: { "тональность": "негативная", "категория": "качество доставки", "срочность": "высокая" }

Твой черед классифицировать:
Текст: «Заказывал вчера чехол на телефон, привезли не того цвета. Как сделать возврат?»
Выход:`,
                      'fewshot'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-purple-300 border border-purple-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'fewshot' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'fewshot' ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-200 whitespace-pre-wrap leading-relaxed">
{`Классифицируй отзывы покупателей интернет-магазина в Худжанде по схеме:

Пример 1:
Текст: «Доставили курьером за 15 минут в 19 микрорайон, всё свежее, рахмат!»
Выход: { "тональность": "позитивная", "категория": "скорость доставки", "срочность": "низкая" }

Пример 2:
Текст: «Упаковка была помята, коробка открыта, курьер нахамил!»
Выход: { "тональность": "негативная", "категория": "качество доставки", "срочность": "высокая" }

Твой черед классифицировать:
Текст: «Заказывал вчера чехол на телефон, привезли не того цвета. Как сделать возврат?»
Выход:`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ТАБ 3: CHAIN OF THOUGHT */}
      {activeLabTab === 'cot' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              Задание 3: Chain of Thought (Логическая цепочка шагов)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Попробуй решить логическую олимпиадную задачу, заставив модель рассуждать строго по шагам:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-mono uppercase">
                  Промпт с активацией CoT:
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `Реши математическую задачу для олимпиады в Согдийской области.
Инструкция: Перед тем как выдать итоговый ответ, рассуждай строго по шагам (Think step by step), выписывая каждое действие в отдельную строку. Не делай поспешных выводов.

Задача:
В фермерском хозяйстве близ Худжанда собрали абрикосы и персики. Всего 120 ящиков. Персиков было в 3 раза меньше, чем абрикосов. Из каждого ящика персиков получили по 8 банок сока, а из каждого ящика абрикосов — по 5 банок. Сколько всего банок сока получили?`,
                      'cot'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-amber-300 border border-amber-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'cot' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cot' ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-200 whitespace-pre-wrap leading-relaxed">
{`Реши математическую задачу для олимпиады в Согдийской области.
Инструкция: Перед тем как выдать итоговый ответ, рассуждай строго по шагам (Think step by step), выписывая каждое действие в отдельную строку. Не делай поспешных выводов.

Задача:
В фермерском хозяйстве близ Худжанда собрали абрикосы и персики. Всего 120 ящиков. Персиков было в 3 раза меньше, чем абрикосов. Из каждого ящика персиков получили по 8 банок сока, а из каждого ящика абрикосов — по 5 банок. Сколько всего банок сока получили?`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ТАБ 4: СЛЕПОЙ A/B ТЕСТ */}
      {activeLabTab === 'abtest' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
              Задание 4: Слепой A/B тест ответов (Оцени генерации)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Перед тобой два ответа неизвестных моделей на один и тот же Boss Prompt. Оцени каждый от 1 до 5 звёзд, а затем нажми «Раскрыть модели»:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Модель А */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Вариант генерации «Альфа»</span>
                  {abRevealed && (
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700">
                      Claude 3.5 Sonnet
                    </span>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800 space-y-2">
                  <p><strong>Маршрут по Худжанду:</strong></p>
                  <p>• 09:00 — Панджшанбе: осмотр резных колонн XIX века, горячая самбуса (15 TJS).</p>
                  <p>• 11:30 — Худжандская крепость и музей Согдийской области (вход 20 TJS).</p>
                  <p>• 14:00 — Обед у набережной Сырдарьи: таджикский плов и чайник зелёного чая (40 TJS).</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-slate-400">Твоя оценка:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setAbRatingA(star)}
                      className={`text-lg transition-transform hover:scale-125 ${
                        abRatingA >= star ? 'text-amber-400' : 'text-slate-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Модель Б */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Вариант генерации «Бета»</span>
                  {abRevealed && (
                    <span className="text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-700">
                      ChatGPT (GPT-4o)
                    </span>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-300 leading-relaxed border border-slate-800 space-y-2">
                  <p><strong>Путешествие по солнечному Худжанду:</strong></p>
                  <p>Начните свой день с посещения легендарного базара Панджшанбе — сердца торговли Центральной Азии. Обязательно попробуйте сладости и лепёшки.</p>
                  <p>Затем отправляйтесь в крепость Тимурмалика, откуда открывается восхитительный вид на воды великой реки Сырдарья.</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-slate-400">Твоя оценка:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setAbRatingB(star)}
                      className={`text-lg transition-transform hover:scale-125 ${
                        abRatingB >= star ? 'text-amber-400' : 'text-slate-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setAbRevealed(true);
                  addReward(20, '🏆 Слепой тест пройден! (+20 Опыта)');
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                {abRevealed ? 'Модели раскрыты' : 'Раскрыть названия моделей'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ТАБ 5: СДАЧА ОТЧЁТА */}
      {activeLabTab === 'submit' && (
        <div className="space-y-5 animate-in fade-in">
          <InlineLabSubmission
            labId={2}
            defaultTitle="Лабораторная работа #2: Промпт-инжиниринг и Boss Prompts"
          />
        </div>
      )}
    </div>
  );
};
