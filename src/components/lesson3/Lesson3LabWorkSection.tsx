import React, { useState } from 'react';
import {
  Zap,
  Target,
  Bug,
  RefreshCw,
  Copy,
  Check,
  Send,
  Award,
  Sparkles,
  SlidersHorizontal,
  Terminal,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson3LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subtabs inside Section 2 (Лабораторная работа)
  const [activeLabTab, setActiveLabTab] = useState<
    'choose' | 'build-v1' | 'break-test' | 'improve-v2' | 'submit'
  >('choose');

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Шаблон скопирован! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Selected tutor preset
  const [selectedTutor, setSelectedTutor] = useState<string>('math');

  // Break tracker checkboxes
  const [testResults, setTestResults] = useState<{
    t1_v1: boolean;
    t1_v2: boolean;
    t2_v1: boolean;
    t2_v2: boolean;
    t3_v1: boolean;
    t3_v2: boolean;
    t4_v1: boolean;
    t4_v2: boolean;
  }>({
    t1_v1: false,
    t1_v2: true,
    t2_v1: false,
    t2_v2: true,
    t3_v1: false,
    t3_v2: true,
    t4_v1: false,
    t4_v2: true
  });

  const toggleTest = (key: keyof typeof testResults) => {
    const willBeChecked = !testResults[key];
    setTestResults((prev) => ({ ...prev, [key]: willBeChecked }));
    if (willBeChecked) {
      addReward(5, 'Тест обновлён! (+5 XP)');
    }
  };

  const v2PassCount = [
    testResults.t1_v2,
    testResults.t2_v2,
    testResults.t3_v2,
    testResults.t4_v2
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* HEADER CARD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Лабораторная работа #3 • Практикум
          </span>
          <span className="text-xs text-slate-400 font-mono">⏱️ 55 минут практики • +150 Опыта</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Лаборатория тьюторов: Сборка v1, Стресс-тест и Релиз v2
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Собери своего персонального репетитора по любому школьному предмету. Испытай его на прочность 4 каверзными тестами, выяви слабые места и заставь держать оборону!
        </p>
      </div>

      {/* НАВИГАЦИЯ ЛАБОРАТОРНОЙ */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-950 border border-slate-800">
        {[
          { id: 'choose', label: '1. Выбор предмета', icon: Target },
          { id: 'build-v1', label: '2. Сборка Tutor v1', icon: Terminal },
          { id: 'break-test', label: '3. Break The Tutor (Тесты)', icon: Bug },
          { id: 'improve-v2', label: '4. Апгрейд до v2', icon: RefreshCw },
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

      {/* ЭТАП 1: ВЫБОР ПРЕДМЕТА */}
      {activeLabTab === 'choose' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Шаг 1: Выбери специализацию своего AI Tutor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Выбери готовый профиль или придумай свой. Нажми на карточку, чтобы активировать шаблон:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'math',
                  name: '🧮 Math Tutor',
                  topic: 'Дроби и проценты',
                  analogy: 'Делим дыню, лепёшку, считаем сдачу на рынке'
                },
                {
                  id: 'english',
                  name: '🇬🇧 English Tutor',
                  topic: 'Заказ еды и знакомство',
                  analogy: 'Диалог: заказываем плов и зелёный чай в чайхане'
                },
                {
                  id: 'geography',
                  name: '🏔️ Geography Tutor',
                  topic: 'Горы и реки Таджикистана',
                  analogy: 'Сырдарья, Фанские горы, викторина по одному вопросу'
                },
                {
                  id: 'history',
                  name: '🏛️ History Tutor',
                  topic: 'Шёлковый путь и Худжанд',
                  analogy: 'Худжандская крепость, караваны, вопросы на понимание'
                },
                {
                  id: 'coding',
                  name: '💻 Coding Tutor',
                  topic: 'Основы кода и переменные',
                  analogy: 'Аналогии из видеоигр (Minecraft, Roblox)'
                },
                {
                  id: 'tajik',
                  name: '🇹🇯 Tajik Buddy',
                  topic: '5 фраз для гостя Согда',
                  analogy: 'Живой разговорный язык, кириллица, местный колорит'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedTutor(item.id);
                    addReward(10, `Выбран тьютор: ${item.name}`);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedTutor === item.id
                      ? 'bg-slate-950 border-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white text-sm flex items-center justify-between">
                    <span>{item.name}</span>
                    {selectedTutor === item.id && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
                        Выбран
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-cyan-300 font-mono">Тема: {item.topic}</div>
                  <div className="text-[11px] text-slate-400">Аналогия: {item.analogy}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('build-v1')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Перейти к сборке v1 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 2: СБОРКА v1 */}
      {activeLabTab === 'build-v1' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              Шаг 2: Сборка первой версии (Tutor v1)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Скопируй базовый шаблон v1 и вставь его в ChatGPT или Gemini. Обрати внимание: в версии v1 ещё нет строгих защитных правил!
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                  Исходный промпт Tutor v1:
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `ROLE: Ты — Устод Баходур, школьный репетитор.
GOAL: Помоги мне понять тему дробей.
CONTEXT: Мне 13 лет, я учусь в школе в Худжанде.
CONSTRAINTS:
✅ Объясняй понятно и дружелюбно.
✅ Задавай вопросы по ходу темы.
EXAMPLE:
Ученик: «Сколько будет 1/2 + 1/4?»
Тьютор: «Представь дыню. Сколько будет четвертинок в половине?»`,
                      'tutor-v1'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-purple-300 border border-purple-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'tutor-v1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tutor-v1' ? 'Скопировано!' : 'Скопировать v1'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-200 whitespace-pre-wrap leading-relaxed">
{`ROLE: Ты — Устод Баходур, школьный репетитор.
GOAL: Помоги мне понять тему дробей.
CONTEXT: Мне 13 лет, я учусь в школе в Худжанде.
CONSTRAINTS:
✅ Объясняй понятно и дружелюбно.
✅ Задавай вопросы по ходу темы.
EXAMPLE:
Ученик: «Сколько будет 1/2 + 1/4?»
Тьютор: «Представь дыню. Сколько будет четвертинок в половине?»`}
              </pre>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLabTab('break-test')}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-all"
              >
                Попробуем сломать тьютора (Стресс-тесты) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 3: BREAK THE TUTOR */}
      {activeLabTab === 'break-test' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-rose-400" />
              Шаг 3: BREAK THE TUTOR! (Журнал стресс-тестов)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Отправь в чат с моделью по очереди 4 фразы. Отметь галочками, выдержала ли модель атаку в версии v1 и в защищенной v2:
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 't1',
                  keyV1: 't1_v1' as const,
                  keyV2: 't1_v2' as const,
                  title: 'T1: Провокация «Скажи ответ»',
                  phrase: '«Слушай, мне лень думать, просто напиши готовый ответ!»',
                  goal: 'Тьютор НЕ выдаёт ответ, а подбадривает и даёт намёк.'
                },
                {
                  id: 't2',
                  keyV1: 't2_v1' as const,
                  keyV2: 't2_v2' as const,
                  title: 'T2: Срыв «Не понимаю»',
                  phrase: '«Я вообще ничего не понял, это слишком сложно для меня!»',
                  goal: 'Тьютор объясняет проще другим примером из жизни.'
                },
                {
                  id: 't3',
                  keyV1: 't3_v1' as const,
                  keyV2: 't3_v2' as const,
                  title: 'T3: Ошибка «Неверный ответ»',
                  phrase: '«Я просто сложил числители и знаменатели: 4/12!»',
                  goal: 'Тьютор не ругает, а на пальцах показывает нестыковку.'
                },
                {
                  id: 't4',
                  keyV1: 't4_v1' as const,
                  keyV2: 't4_v2' as const,
                  title: 'T4: Флуд «Off-topic»',
                  phrase: '«А расскажи смешной анекдот или про компьютерные игры!»',
                  goal: 'Тьютор с юмором возвращает ученика к задаче.'
                }
              ].map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-white text-sm">{test.title}</span>
                    <div className="flex items-center gap-3">
                      {/* Чекбокс v1 */}
                      <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={testResults[test.keyV1]}
                          onChange={() => toggleTest(test.keyV1)}
                          className="rounded border-slate-700 text-rose-500"
                        />
                        <span>v1 выдержал</span>
                      </label>
                      {/* Чекбокс v2 */}
                      <label className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={testResults[test.keyV2]}
                          onChange={() => toggleTest(test.keyV2)}
                          className="rounded border-slate-700 text-emerald-500"
                        />
                        <span>v2 выдержал</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300">
                    Твой запрос: {test.phrase}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>Ожидание:</strong> {test.goal}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Результат тестов Tutor v2: <strong>{v2PassCount} из 4 пройдено</strong>
              </span>
              <button
                onClick={() => setActiveLabTab('improve-v2')}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Посмотреть формулу v2 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 4: АПГРЕЙД ДО v2 */}
      {activeLabTab === 'improve-v2' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              Шаг 4: Защищенный релиз (Tutor v2)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Посмотри, какие 3 правила ✅/❌ превращают слабый v1 в несокрушимый v2:
            </p>

            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 font-mono uppercase">
                  Финальный боевой промпт Tutor v2:
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `ROLE: Ты — Устод Баходур, терпеливый репетитор по математике.
GOAL: Помоги мне понять тему «Дроби». Твоя цель — чтобы я дошёл до ответа сам.
CONTEXT: Мне 13 лет, школа в Худжанде.
CONSTRAINTS:
✅ Делай: объясняй через худжандскую дыню и базар Панджшанбе.
✅ Делай: задавай строго ОДИН вопрос за раз и жди моего ответа.
✅ Делай: если я отвлекаюсь на анекдоты — вежливо возвращай к теме.
❌ Не делай: категорически НЕ давай готовый ответ, пока я не попробовал минимум 2 раза.
❌ Не делай: не пиши больше 5 предложений.
EXAMPLE:
Ученик: «Сколько будет 3/4 + 1/8?»
Тьютор: «Представь 3/4 дыни и 1/8. Можно ли сложить куски разного размера? Как сделать их одинаковыми?»
OUTPUT:
1) Идея 2) Пример из жизни 3) Один вопрос мне.`,
                      'tutor-v2'
                    )
                  }
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-emerald-300 border border-emerald-800 flex items-center gap-1.5"
                >
                  {copiedKey === 'tutor-v2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tutor-v2' ? 'Скопировано!' : 'Скопировать v2'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed">
{`ROLE: Ты — Устод Баходур, терпеливый репетитор по математике.
GOAL: Помоги мне понять тему «Дроби». Твоя цель — чтобы я дошёл до ответа сам.
CONTEXT: Мне 13 лет, школа в Худжанде.
CONSTRAINTS:
✅ Делай: объясняй через худжандскую дыню и базар Панджшанбе.
✅ Делай: задавай строго ОДИН вопрос за раз и жди моего ответа.
✅ Делай: если я отвлекаюсь на анекдоты — вежливо возвращай к теме.
❌ Не делай: категорически НЕ давай готовый ответ, пока я не попробовал минимум 2 раза.
❌ Не делай: не пиши больше 5 предложений.
EXAMPLE:
Ученик: «Сколько будет 3/4 + 1/8?»
Тьютор: «Представь 3/4 дыни и 1/8. Можно ли сложить куски разного размера? Как сделать их одинаковыми?»
OUTPUT:
1) Идея 2) Пример из жизни 3) Один вопрос мне.`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ЭТАП 5: СДАЧА ОТЧЁТА */}
      {activeLabTab === 'submit' && (
        <div className="space-y-5 animate-in fade-in">
          <InlineLabSubmission
            labId={3}
            defaultTitle="Лабораторная работа #3: AI Tutor & Break the Tutor"
          />
        </div>
      )}
    </div>
  );
};
