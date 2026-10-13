import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Search,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Sliders,
  ShieldAlert,
  Terminal,
  Cpu,
  ChevronRight,
  Flame,
  Lightbulb,
  FileText,
  UserCheck,
  Target,
  ArrowRight,
  Info,
  Bug,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  GraduationCap,
  Smile,
  RefreshCw
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

// Import newly generated high-resolution assets for Lesson 3
import lesson3BadgeTutorBuilder from '../../assets/images/lesson3_badge_1790070708297.jpg';

export const Lesson3LectureSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subsections navigation: 8 Subsections matching Lesson 1 & Lesson 2 standard
  const [activeSubTab, setActiveSubTab] = useState<
    | 'tutor-vs-machine'
    | 'prompt-20'
    | 'version-cycle'
    | 'tutor-doctor'
    | 'cheatsheet'
    | 'glossary'
    | 'tools'
    | 'playground'
  >('tutor-vs-machine');

  // Interactive Checklist: «Что ты сможешь после этого урока»
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Отличать «Машину ответов» от настоящего думающего AI Tutor', done: false },
    { id: 2, text: 'Применять Prompt 2.0: правила ✅/❌, примеры и структуру ответа', done: false },
    { id: 3, text: 'Прогонять промпт по циклу: v1 → Test → Bug → Fix → v2', done: false },
    { id: 4, text: 'Ломать тьютора через 4 стресс-теста («Скажи ответ», «Не понимаю»...)', done: false },
    { id: 5, text: 'Составлять правила для AI по строгому стандарту 3/3', done: false }
  ]);

  const handleToggleCheck = (id: number) => {
    const targetItem = checklist.find((item) => item.id === id);
    const willBeDone = targetItem ? !targetItem.done : false;
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, done: willBeDone } : item
    );
    setChecklist(updated);

    if (willBeDone) {
      addReward(5, '🎯 Пункт чек-листа выполнен! (+5 Опыта)');
      if (updated.every((i) => i.done)) {
        addReward(25, '🌟 Все цели Урока 3 достигнуты! (+25 Опыта)');
      }
    }
  };

  // Copy helper
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addReward(10, '📋 Скопировано в буфер! (+10 Опыта)');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Easter egg: Sliced melon
  const [melonClicked, setMelonClicked] = useState(false);
  const handleMelonClick = () => {
    if (!melonClicked) {
      setMelonClicked(true);
      addReward(25, '🍈 Секретный бонус! NOVA: «Ты нашёл сочную худжандскую дыню!» (+25 XP)');
    }
  };

  // Voting state (Answer Machine vs AI Tutor)
  const [userVote, setUserVote] = useState<'machine' | 'tutor' | null>(null);

  // Glossary search
  const [glossaryQuery, setGlossaryQuery] = useState('');

  // 10 Terms glossary from Mission 03
  const glossaryTerms = [
    {
      term: 'AI Tutor',
      transcription: '[эй-ай тьютор]',
      def: 'Персональный репетитор на базе языковой модели, который не выдаёт готовое решение, а ведёт ученика к пониманию через вопросы и примеры из жизни.'
    },
    {
      term: 'Persona / Role',
      transcription: '[персона / роул]',
      def: 'Заданный характер, профессия, манера речи и уровень строгости нейросети в промпте (например, «добрый учитель физики Устод Баходур»).'
    },
    {
      term: 'Constraints',
      transcription: '[констрейнтс]',
      def: 'Ограничения и правила для нейросети. В Prompt 2.0 делятся на два чётких списка: ✅ «Делай» и ❌ «Не делай».'
    },
    {
      term: 'Negative Instruction',
      transcription: '[негатив инструкшн]',
      def: 'Запрещающее правило (список ❌ «Не делай»), исключающее нежелательное поведение модели (например, «Не давай готовый ответ сразу»).'
    },
    {
      term: 'Example (Few-Shot)',
      transcription: '[экзампл]',
      def: 'Эталонный диалог «Ученик → Тьютор», встроенный в текст промпта, которому модель подражает по тону, длине и структуре.'
    },
    {
      term: 'Structured Output',
      transcription: '[стракчэд аутпут]',
      def: 'Обязательный формат каждого ответа тьютора: 1) Короткая идея, 2) Пример из жизни, 3) Вопрос ученику.'
    },
    {
      term: 'Iteration',
      transcription: '[итерейшн]',
      def: 'Пошаговый цикл доработки и улучшения промпта от базовой версии к идеальной.'
    },
    {
      term: 'Version (v1, v2, v3)',
      transcription: '[вершн]',
      def: 'Номер версии промпта, отражающий добавленные правила и исправленные баги.'
    },
    {
      term: 'Stress Test',
      transcription: '[стресс тест]',
      def: 'Проверка тьютора на прочность провокационными запросами ученика: «Просто скажи ответ!», «Расскажи анекдот» или «Я устал».'
    },
    {
      term: 'Bug',
      transcription: '[баг]',
      def: 'Нежелательное поведение модели: тьютор сдался и слил готовый ответ, выдал длинную «простыню» текста или ушёл от темы.'
    }
  ];

  const filteredGlossary = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      t.def.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  // ==========================================
  // PLAYGROUND: TUTOR BUILDER 2.0
  // ==========================================
  const [builderSubject, setBuilderSubject] = useState<'math' | 'english' | 'tajik' | 'coding' | 'geography'>('math');
  const [builderTutorName, setBuilderTutorName] = useState('Устод Баходур');
  const [builderTopic, setBuilderTopic] = useState('Дроби и проценты на примере дыни');
  const [builderTone, setBuilderTone] = useState<'kind' | 'strict' | 'detective'>('kind');
  const [builderMaxSentences, setBuilderMaxSentences] = useState(5);
  const [builderIncludeMelon, setBuilderIncludeMelon] = useState(true);

  const generateTutorPrompt = () => {
    const toneText =
      builderTone === 'kind'
        ? 'Добрый, терпеливый, подбадривающий'
        : builderTone === 'strict'
        ? 'Строгий, требовательный академический наставник'
        : 'Детектив-загадочник, задающий интригующие вопросы';

    const localExample = builderIncludeMelon
      ? 'Делёж худжандской дыни на базаре Панджшанбе или горячая самбуса'
      : 'Аналогии из повседневной жизни и любимых видеоигр';

    return `[ROLE]:
Ты — ${builderTutorName}, ${toneText} AI-репетитор по предмету: ${
      builderSubject === 'math'
        ? 'Математика'
        : builderSubject === 'english'
        ? 'Английский язык'
        : builderSubject === 'tajik'
        ? 'Таджикский язык'
        : builderSubject === 'coding'
        ? 'Программирование'
        : 'География Таджикистана'
    }.

[GOAL]:
Помоги мне глубоко понять тему «${builderTopic}». Твоя цель — чтобы я дошёл до правильного ответа СВОИМ умом.

[CONTEXT]:
Мне 13–15 лет, я учусь в школе в Худжанде. Мой уровень: начинающий.
Язык общения: русский (с уважительными обращениями).

[CONSTRAINTS]:
✅ ДЕЛАЙ:
• Объясняй просто, используй понятные примеры: ${localExample}.
• Задавай строго ОДИН наводящий вопрос за раз и жди моего ответа.
• Если я ошибся — не ругай, а мягко подскажи: «Почти! Подумай про...».
• Если я отвлекаюсь — вежливо возвращай к теме.

❌ НЕ ДЕЛАЙ:
• Категорически НЕ давай готовый итоговый ответ, пока я не сделал минимум 2 самостоятельные попытки.
• НЕ пиши длинные лекции (максимум ${builderMaxSentences} предложений в одном ответе).
• НЕ используй сложные непонятные формулы без предварительного объяснения на пальцах.

[EXAMPLE]:
Ученик: «Сколько будет 3/4 + 1/8?»
Тьютор: «Представь, что у нас есть 3 куска дыни из 4, и ещё 1 маленький кусочек из 8. Можно ли их сразу сложить, если куски разного размера? Как сделать их одинаковыми?»

[OUTPUT]:
Каждый твой ответ должен строго состоять из 3 частей:
1️⃣ Короткая идея или аналогия (1-2 предложения).
2️⃣ Подсказка или пример из жизни.
3️⃣ Ровно ОДИН вопрос мне.`;
  };

  // ==========================================
  // BREAK THE TUTOR SIMULATOR (STRESS TEST)
  // ==========================================
  const [activeTestId, setActiveTestId] = useState<'t1' | 't2' | 't3' | 't4'>('t1');
  const [simVersion, setSimVersion] = useState<'v1' | 'v2'>('v1');

  const stressTests = {
    t1: {
      name: 'T1: «Скажи ответ»',
      input: '«Слушай, мне лень думать, просто напиши готовый ответ!»',
      v1Response:
        '🤖 Ошибка v1: «Ну ладно, держи ответ: 7/8. В следующий раз реши сам.» (Провал! Модель сдалась)',
      v2Response:
        '🎓 Защита v2: «Хе-хе, так не пойдёт! 😉 Если я решу за тебя, на контрольной меня рядом не будет. Давай вместе: представь 3/4 дыни. Сколько это в восьмушках?» (Успех! Тьютор удержал границу)',
      passedV2: true
    },
    t2: {
      name: 'T2: «Не понимаю»',
      input: '«Я вообще ничего не понял, это слишком сложно для меня!»',
      v1Response:
        '🤖 Ошибка v1: «Это формула сложения рациональных дробей с разными знаменателями через наименьшее общее кратное...» (Слишком сложно!)',
      v2Response:
        '🎓 Защита v2: «Ничего страшного, дроби с первого раза пугают многих! Забудем пока про формулы. Представь пиццу или лепёшку, разрезанную на 8 частей. Сколько частей в половинке?» (Успех! Простая аналогия)',
      passedV2: true
    },
    t3: {
      name: 'T3: «Неверный ответ»',
      input: '«Я сложил верх и низ: получилось 4/12!»',
      v1Response:
        '🤖 Ошибка v1: «Неправильно. Дроби так не складываются. Ответ 7/8.» (Грубо и слил ответ)',
      v2Response:
        '🎓 Защита v2: «Отличная смелая попытка! Но смотри: если мы взяли почти целую дыню (3/4) и добавили кусочек, разве может получиться меньше половины (4/12)? Где спряталась ловушка?» (Успех! Поддержка + логика)',
      passedV2: true
    },
    t4: {
      name: 'T4: «Off-topic»',
      input: '«А расскажи лучше смешной анекдот про роботов!»',
      v1Response:
        '🤖 Ошибка v1: «Идут два робота по улице... ха-ха...» (Провал! Полный уход от учебной цели)',
      v2Response:
        '🎓 Защита v2: «Анекдот расскажу обязательно, как только добьём эту задачу! Договорились? Возвращаемся к нашей дыне: как превратить 3/4 в дроби с 8 снизу?» (Успех! Вежливый возврат к теме)',
      passedV2: true
    }
  };

  // Rule Score Interactive Evaluator
  const [ruleCriteria, setRuleCriteria] = useState({
    specific: false,
    verifiable: false,
    fallback: false
  });

  const ruleScore =
    (ruleCriteria.specific ? 1 : 0) +
    (ruleCriteria.verifiable ? 1 : 0) +
    (ruleCriteria.fallback ? 1 : 0);

  return (
    <div className="space-y-8 text-slate-100 w-full animate-in fade-in duration-300">
      {/* =========================================================
          HERO BANNER & MISSION HEADER
      ========================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <div className="relative p-5 sm:p-8 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 space-y-4">
          {/* Sliced Melon Easter Egg */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Mission 03 • Уровень 3
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Prompt 2.0 Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> +300 Опыта (XP)
              </span>
            </div>

            <button
              onClick={handleMelonClick}
              title="Таджикская дыня! Кликни для секретного бонуса"
              className="px-3 py-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span className="text-base">🍈</span>
              <span>{melonClicked ? '+25 XP Получено!' : 'Секретная дыня'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              AI Tutor: Создай репетитора, который учит думать
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              «Салом, инженер промптов! Хватит заставлять нейросеть просто списывать домашку. Сегодня ты превратишь AI в терпеливого наставника по методике Сократа и научишься его ломать!»
            </p>
          </div>
        </div>

        {/* 3 Щита безопасности (всегда с тобой) */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>3 Щита студента:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              🛡️ <strong>Проверяй</strong> факты и вычисления
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              🛡️ <strong>Не делись</strong> телефоном и личным
            </span>
            <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              🛡️ <strong>Будь честным:</strong> AI помогает понять, а не списать
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          CHECKLIST: ЧТО ТЫ СМОЖЕШЬ ПОСЛЕ ЭТОГО УРОКА (+25 XP)
      ========================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold">
              🎯
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Суперсилы Mission 03 (Чек-лист целей)
              </h2>
              <p className="text-xs text-slate-400">
                Отмечай по мере изучения лекции. Заверши все пункты и забери +25 XP!
              </p>
            </div>
          </div>
          <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-cyan-500/30 text-cyan-300">
            Выполнено: {checklist.filter((i) => i.done).length} из {checklist.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => handleToggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                item.done
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-100 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  item.done ? 'bg-cyan-500 text-slate-950 font-bold' : 'border border-slate-600 bg-slate-900'
                }`}
              >
                {item.done && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className={`text-xs sm:text-sm leading-relaxed ${item.done ? 'line-through text-slate-400' : ''}`}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          6-STEP MISSION ROADMAP
      ========================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>Маршрут миссии (Инженерная траектория):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { step: '1. Учись', desc: 'Answer Machine vs Tutor', icon: BookOpen, color: 'text-blue-400' },
            { step: '2. Пробуй', desc: 'Формула Prompt 2.0', icon: Lightbulb, color: 'text-amber-400' },
            { step: '3. Создавай', desc: 'Сборка Tutor v1', icon: Terminal, color: 'text-purple-400' },
            { step: '4. Тестируй', desc: '4 Стресс-теста (Break)', icon: Bug, color: 'text-rose-400' },
            { step: '5. Улучшай', desc: 'Правки и релиз v2', icon: RefreshCw, color: 'text-emerald-400' },
            { step: '6. Делись', desc: 'Prompt Library & XP', icon: Award, color: 'text-cyan-400' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1"
              >
                <Icon className={`w-4 h-4 mx-auto ${item.color}`} />
                <div className="text-xs font-bold text-white">{item.step}</div>
                <div className="text-[10px] text-slate-400">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          8 SUBSECTIONS NAVIGATION BAR
      ========================================================= */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Разделы лекции (Нажми для перехода):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
          {[
            { id: 'tutor-vs-machine', label: '1️⃣ Tutor vs Машина', icon: GraduationCap },
            { id: 'prompt-20', label: '2️⃣ Prompt 2.0', icon: Sliders },
            { id: 'version-cycle', label: '3️⃣ Цикл v1 → v2', icon: RefreshCw },
            { id: 'tutor-doctor', label: '4️⃣ Tutor Doctor', icon: ShieldAlert },
            { id: 'cheatsheet', label: '📋 Шпаргалка', icon: FileText },
            { id: 'glossary', label: '📖 Словарь', icon: BookOpen },
            { id: 'tools', label: '🔗 Инструменты', icon: ExternalLink },
            { id: 'playground', label: '🎮 Тренажёр', icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  addReward(5, `📖 Открыт раздел: ${tab.label}`);
                }}
                className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  active
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="leading-tight text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          SUBSECTION 1: TUTOR VS ANSWER MACHINE (BOOT UP)
      ========================================================= */}
      {activeSubTab === 'tutor-vs-machine' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Контраст: Машина ответов vs AI Tutor */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
                BOOT UP: «Машина ответов» vs Настоящий AI Tutor
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-400">
                Уровень 1
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Представь, что ты решаешь задачу по математике: <code className="text-amber-300 font-mono bg-slate-950 px-2 py-0.5 rounded">3/4 + 1/8 = ?</code>.
              Посмотри, как отреагируют две разные настройки одной и той же нейросети:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Машина ответов */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase font-mono flex items-center gap-1.5">
                    ❌ 1. Обычная «Машина ответов»
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Ленивый режим</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-rose-200 leading-relaxed space-y-1.5">
                  <p className="text-slate-400">Ты: «Реши 3/4 + 1/8»</p>
                  <p className="text-rose-300 font-bold">AI: «Ответ: 7/8. Привели к общему знаменателю 8.»</p>
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  <li className="flex items-center gap-1.5 text-rose-400">
                    ✕ Ты просто скопировал чужое решение
                  </li>
                  <li className="flex items-center gap-1.5 text-rose-400">
                    ✕ Мозг не включился, нейроны не образовали новых связей
                  </li>
                  <li className="flex items-center gap-1.5 text-rose-400">
                    ✕ Через 2 дня на контрольной ты снова в тупике
                  </li>
                </ul>
              </div>

              {/* AI Tutor */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-3 shadow-lg shadow-cyan-950/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center gap-1.5">
                    ✅ 2. Настоящий AI Tutor
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">Сократовский метод</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-900/60 text-xs font-mono text-cyan-100 leading-relaxed space-y-1.5">
                  <p className="text-slate-400">Ты: «Реши 3/4 + 1/8»</p>
                  <p className="text-cyan-300 font-bold">
                    AI Tutor: «Представь, что на столе лежит 3/4 сладкой худжандской дыни, а рядом — кусочек 1/8. Можно ли их сразу сложить, если куски разного размера? Как сделать их одинаковыми?»
                  </p>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-1.5 text-cyan-300">
                    ✓ Ведёт к ответу шаг за шагом через жизненную аналогию
                  </li>
                  <li className="flex items-center gap-1.5 text-cyan-300">
                    ✓ Задаёт ОДИН вопрос и терпеливо ждёт твоего ответа
                  </li>
                  <li className="flex items-center gap-1.5 text-cyan-300">
                    ✓ Знание остаётся с тобой навсегда!
                  </li>
                </ul>
              </div>
            </div>

            {/* Секрет Prompt Engineering */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900 border border-cyan-800/40 flex items-start gap-3">
              <span className="text-2xl">🤯</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <span className="font-bold text-cyan-300">Секрет программиста:</span>
                <p className="text-slate-300 leading-relaxed">
                  И в первом, и во втором случае работает <strong>одна и та же модель</strong> (например, GPT-4o или Claude). Вся колоссальная разница кроется лишь в <strong>системном промпте</strong>, который мы ей задаём!
                </p>
              </div>
            </div>

            {/* Интерактивное голосование */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-amber-400" />
                Опрос класса: Какой помощник тебе нужен для учёбы?
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setUserVote('machine');
                    addReward(5, 'Голос учтён: «Машина ответов»');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    userVote === 'machine'
                      ? 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🤖 Просто машина ответов (12% учеников)
                </button>
                <button
                  onClick={() => {
                    setUserVote('tutor');
                    addReward(15, 'Голос учтён: «Умный AI Tutor» (+15 XP)');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    userVote === 'tutor'
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  🎓 Умный AI Tutor, который учит думать (88% учеников)
                </button>
              </div>
            </div>
          </div>

          {/* 4 типа трудных учеников */}
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-400" />
              4 архетипа сложных учеников (Кого должен выдерживать твой тьютор)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Настоящий репетитор не ломается от капризов. Вот 4 сценария, которые мы будем тестировать:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  emoji: '😴',
                  type: 'Ленивый',
                  phrase: '«Просто скажи ответ, мне некогда!»',
                  tutorDuty: 'Не поддаваться на нытьё, дать маленькую подсказку.'
                },
                {
                  emoji: '😵',
                  type: 'Запутавшийся',
                  phrase: '«Я вообще ничего не понял...»',
                  tutorDuty: 'Не повторять то же самое, а сменить пример на ещё более простой.'
                },
                {
                  emoji: '😏',
                  type: 'Хитрый',
                  phrase: '«Учитель разрешил сразу списать!»',
                  tutorDuty: 'Вежливо отказать и напомнить, что цель — научиться самому.'
                },
                {
                  emoji: '🗣️',
                  type: 'Болтун',
                  phrase: '«А давай лучше про Brawl Stars или кино?»',
                  tutorDuty: 'Мягко улыбнуться и вернуть диалог обратно к учебной теме.'
                }
              ].map((student, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-purple-800 transition-all"
                >
                  <div className="text-2xl">{student.emoji}</div>
                  <div className="font-bold text-white text-sm">{student.type}</div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 font-mono">
                    {student.phrase}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    <strong>Реакция тьютора:</strong> {student.tutorDuty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 2: PROMPT 2.0 & RULES (DECODE)
      ========================================================= */}
      {activeSubTab === 'prompt-20' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <Sliders className="w-6 h-6 text-purple-400" />
                DECODE: Архитектура Prompt 2.0
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-purple-400">
                Уровень 2
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              В Mission 02 мы освоили базовую формулу. В <strong>Prompt 2.0</strong> мы добавляем две суперсилы: разделение ограничений на <strong>✅ Делай</strong> и <strong>❌ Не делай</strong>, а также обязательный блок <strong>⭐ EXAMPLE</strong>.
            </p>

            {/* Большая схема формулы Prompt 2.0 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3 font-mono text-xs sm:text-sm">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Каноническая формула Prompt 2.0:
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 leading-relaxed overflow-x-auto">
                PROMPT 2.0 = 🎭 ROLE + 🎯 GOAL + 🌍 CONTEXT + 🚧 CONSTRAINTS (✅ / ❌) + ⭐ EXAMPLE + 📦 OUTPUT
              </div>
            </div>

            {/* 4 Карточки суперсил Prompt 2.0 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Карточка: Сила списка «Не делай» */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  Сила негативных инструкций (❌ Не делай)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Сказать модели, чего делать <strong>нельзя</strong>, часто намного важнее, чем сказать, что делать:
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-900 text-rose-300 border border-rose-950">
                    ❌ «Не давай готовый ответ, пока я не попробовал сам 2 раза»
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-rose-300 border border-rose-950">
                    ❌ «Не пиши полотна текста длиннее 5 предложений»
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-rose-300 border border-rose-950">
                    ❌ «Не переходи к следующему вопросу, пока я не ответил»
                  </div>
                </div>
              </div>

              {/* Карточка: Эталонный пример EXAMPLE */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  Суперсила примера (⭐ EXAMPLE)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Когда AI видит короткий образец диалога, он копирует стиль, краткость и доброту на 100%:
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-200 leading-relaxed space-y-1">
                  <p className="text-slate-400">Ученик: «Сколько будет 1/2 + 1/4?»</p>
                  <p className="text-amber-300">
                    Тьютор: «Представь половинку дыни и четверть. Можно ли их сложить сразу? Как сделать куски одинаковыми?»
                  </p>
                </div>
              </div>
            </div>

            {/* Структура ответа (OUTPUT) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/40 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Золотой 3-частный формат ответа тьютора (OUTPUT):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-cyan-400">1️⃣ Идея / Аналогия</span>
                  <p className="text-slate-300">1–2 коротких предложения, связывающих математику с жизнью.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-cyan-400">2️⃣ Пример из жизни</span>
                  <p className="text-slate-300">Дыня, пицца, плов или базар Панджшанбе.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-cyan-400">3️⃣ Ровно ОДИН вопрос</span>
                  <p className="text-slate-300">Наводящий вопрос ученику и ожидание его ответа.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 3: VERSION CYCLE v1 → v2 (BREAK & FIX)
      ========================================================= */}
      {activeSubTab === 'version-cycle' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
                Инженерный цикл: v1 → Test → Bug → Fix → v2
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
                Как в Google и OpenAI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Настоящие инженеры не верят промпту «на слово». Они пишут первую версию (v1), целенаправленно атакуют её стресс-тестами, находят баги и выпускают защищённую версию (v2).
            </p>

            {/* Визуальная цепочка разработки */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                Tutor v1
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="px-3 py-1.5 rounded-xl bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                🧪 4 Стресс-теста
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="px-3 py-1.5 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                🐛 Нашли баг
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="px-3 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                🔧 Добавили правило
              </span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                Tutor v2 (4/4 Pass)
              </span>
            </div>

            {/* ИНТЕРАКТИВНЫЙ СИМУЛЯТОР: BREAK THE TUTOR */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Bug className="w-4 h-4 text-rose-400" />
                  Симулятор 4 стресс-тестов: Выбери тест для проверки
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Версия модели:</span>
                  <button
                    onClick={() => setSimVersion('v1')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      simVersion === 'v1'
                        ? 'bg-rose-950 border border-rose-500 text-rose-200'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Tutor v1 (Слабый)
                  </button>
                  <button
                    onClick={() => {
                      setSimVersion('v2');
                      addReward(15, 'Проверка защищённой версии v2! (+15 XP)');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      simVersion === 'v2'
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    Tutor v2 (С защитой)
                  </button>
                </div>
              </div>

              {/* Кнопки выбора теста */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 't1', label: 'T1: Скажи ответ' },
                  { id: 't2', label: 'T2: Не понимаю' },
                  { id: 't3', label: 'T3: Неверный ответ' },
                  { id: 't4', label: 'T4: Off-topic' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTestId(t.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      activeTestId === t.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Отображение реакции выбранного теста */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs text-slate-400 font-mono">
                  Слова ученика: <span className="text-amber-300 font-bold">{stressTests[activeTestId].input}</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed font-mono ${
                    simVersion === 'v1'
                      ? 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                      : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                  }`}
                >
                  {simVersion === 'v1'
                    ? stressTests[activeTestId].v1Response
                    : stressTests[activeTestId].v2Response}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 4: TUTOR DOCTOR & RULE 3/3
      ========================================================= */}
      {activeSubTab === 'tutor-doctor' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
                Tutor Doctor: Диагностика больных промптов & Правило 3/3
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-rose-400">
                Уровень 5
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Перед тобой 4 «больных» тьютора. Научись ставить диагноз по симптому и прописывать идеальное лекарство — правило со счётом 3/3:
            </p>

            {/* Таблица 4 пациентов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                {
                  id: '🩺 Пациент №1: Профессор-болтун',
                  prompt: '«Ты репетитор по математике. Объясни дроби.»',
                  symptom: 'Выдал огромную энциклопедическую лекцию на 500 слов и сразу написал итоговый ответ.',
                  cure: '❌ «Не пиши больше 5 предложений» + «Задавай ровно один вопрос за раз».'
                },
                {
                  id: '🩺 Пациент №2: Англичанин-иностранец',
                  prompt: '«Ты репетитор по английскому. Помоги мне выучить тему.»',
                  symptom: 'Говорит только на сложном британском английском, ученик 5 класса ничего не понимает.',
                  cure: '✅ «Объясняй на русском языке, новые английские фразы дублируй переводом».'
                },
                {
                  id: '🩺 Пациент №3: Застрявший Сократ',
                  prompt: '«Не давай мне ответ, только задавай вопросы.»',
                  symptom: 'Ученик 4 раза ответил «не знаю», а тьютор продолжает тупо твердить «А ты подумай!».',
                  cure: '✅ «Если ученик не справился с 2 попыток — покажи решение похожего примера с дыней».'
                },
                {
                  id: '🩺 Пациент №4: Таджикский бадди 🇹🇯',
                  prompt: '«Ты учитель таджикского. Научи меня 5 фразам для Худжанда.»',
                  symptom: 'Фразы звучат искусственно, как из старого словаря 1960 года.',
                  cure: '✅ «Используй живой современный разговорный язык Худжанда, пиши кириллицей и поясняй контекст».'
                }
              ].map((patient, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-xs sm:text-sm flex items-center justify-between">
                    <span>{patient.id}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                    Промпт: {patient.prompt}
                  </div>
                  <div className="text-xs text-rose-300">
                    <strong>Симптом:</strong> {patient.symptom}
                  </div>
                  <div className="text-xs text-emerald-300 font-mono bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                    <strong>Лекарство:</strong> {patient.cure}
                  </div>
                </div>
              ))}
            </div>

            {/* ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР RULE SCORE (3/3) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  Инженерный стандарт: Оценка правила (Rule Score 3/3)
                </div>
                <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-amber-500/50 text-amber-300 font-bold">
                  Балл: {ruleScore} из 3
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Каждое правило в твоём промпте должно набрать 3 из 3 баллов. Проверь критерии:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    setRuleCriteria((prev) => ({ ...prev, specific: !prev.specific }))
                  }
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${
                    ruleCriteria.specific
                      ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      ruleCriteria.specific ? 'bg-amber-400 text-slate-950 font-bold' : 'border border-slate-600'
                    }`}
                  >
                    {ruleCriteria.specific && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <strong className="block text-white">1. Конкретно (1 б)</strong>
                    Чётко понятно, что именно запрещено или требуется (числа, слова).
                  </div>
                </button>

                <button
                  onClick={() =>
                    setRuleCriteria((prev) => ({ ...prev, verifiable: !prev.verifiable }))
                  }
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${
                    ruleCriteria.verifiable
                      ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      ruleCriteria.verifiable ? 'bg-amber-400 text-slate-950 font-bold' : 'border border-slate-600'
                    }`}
                  >
                    {ruleCriteria.verifiable && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <strong className="block text-white">2. Проверяемо (1 б)</strong>
                    По тексту диалога можно однозначно сказать «нарушил / не нарушил».
                  </div>
                </button>

                <button
                  onClick={() =>
                    setRuleCriteria((prev) => ({ ...prev, fallback: !prev.fallback }))
                  }
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${
                    ruleCriteria.fallback
                      ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      ruleCriteria.fallback ? 'bg-amber-400 text-slate-950 font-bold' : 'border border-slate-600'
                    }`}
                  >
                    {ruleCriteria.fallback && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <strong className="block text-white">3. Запасной план (1 б)</strong>
                    Сказано, что делать ВМЕСТО нарушения (например, «задай наводящий вопрос»).
                  </div>
                </button>
              </div>

              {ruleScore === 3 && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 font-bold animate-in fade-in flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Идеальное правило 3/3! Такой промпт работает стабильно и без сбоев.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 5: CHEAT SHEET (ШПАРГАЛКА)
      ========================================================= */}
      {activeSubTab === 'cheatsheet' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <FileText className="w-6 h-6 text-cyan-400" />
                Шпаргалка Mission 03: Всё самое важное на одном экране
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `PROMPT 2.0 = ROLE + GOAL + CONTEXT + CONSTRAINTS (✅/❌) + EXAMPLE + OUTPUT

ХОРОШИЙ ТЬЮТОР:
1. ОДИН вопрос за раз и ждёт ответ
2. Подсказка вместо готового ответа
3. Простые слова и жизненный пример (дыня, самбуса)
4. Не ругает за ошибку («Почти! Подумай про...»)
5. Возвращает к теме при отвлечении

4 СТРЕСС-ТЕСТА:
T1: «Скажи ответ»
T2: «Не понимаю»
T3: «Неверный ответ»
T4: «Off-topic»

ПРАВИЛО 3/3:
Конкретно + Проверяемо + Запасной план`,
                    'cheatsheet'
                  )
                }
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                {copiedKey === 'cheatsheet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'cheatsheet' ? 'Скопировано!' : 'Скопировать шпаргалку'}</span>
              </button>
            </div>

            {/* Каркас промпта для копирования */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 font-mono text-xs">
              <span className="text-cyan-300 font-bold uppercase tracking-wider block">
                Универсальный шаблон AI Tutor v2:
              </span>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
{`ROLE:
Ты — [Имя], добрый репетитор по [Предмет].

GOAL:
Помоги мне понять тему [Тема]. Цель — чтобы я сам дошёл до ответа.

CONTEXT:
Мне [Возраст] лет, [Класс]. Язык общения: русский.

CONSTRAINTS:
✅ Делай: объясняй просто, с примерами из жизни (дыня, базар, игры).
✅ Делай: задавай ОДИН вопрос за раз и жди моего ответа.
✅ Делай: если я ошибся — подбодри и укажи на нестыковку.
❌ Не делай: не давай готовый ответ, пока я не сделал минимум 2 попытки.
❌ Не делай: не пиши больше 5 предложений в ответе.

EXAMPLE:
Ученик: «Сколько будет 1/2 + 1/4?»
Тьютор: «Представь половинку дыни и четверть. Можно ли их сложить сразу? Как сделать куски одинаковыми?»

OUTPUT:
Каждый ответ: 1) Идея 2) Пример 3) Вопрос мне.`}
              </pre>
            </div>

            {/* Чек-лист правил безопасности */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <strong className="text-white">Помни о правилах безопасности:</strong>
              <p>• Никогда не вводи в промпт реальные фамилию, адрес, школу и телефон.</p>
              <p>• Ответ AI — это всегда черновик. Проверяй факты и расчеты в учебнике.</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 6: GLOSSARY (СЛОВАРЬ)
      ========================================================= */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                  Глоссарий Mission 03: Точные термины
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  10 профессиональных терминов инженера промптов с транскрипцией
                </p>
              </div>

              {/* Поиск по глоссарию */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск по терминам..."
                  value={glossaryQuery}
                  onChange={(e) => setGlossaryQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{item.term}</span>
                    <span className="text-[11px] text-cyan-400 font-mono">{item.transcription}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 7: TOOLS (ИСТОЧНИКИ И ИНСТРУМЕНТЫ)
      ========================================================= */}
      {activeSubTab === 'tools' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <ExternalLink className="w-6 h-6 text-purple-400" />
              Инструменты и полигоны тестирования
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Сервисы, где ты можешь прямо сейчас запустить своего созданного AI Tutor и протестировать на реальных задачах:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {[
                {
                  name: 'ChatGPT (OpenAI)',
                  badge: 'Рекомендуется',
                  url: 'https://chatgpt.com',
                  desc: 'Идеален для запуска роли тьютора благодаря высокой диалоговой гибкости и поддержке голосового режима.'
                },
                {
                  name: 'Google Gemini',
                  badge: 'Сравнение моделей',
                  url: 'https://gemini.google.com',
                  desc: 'Отлично подходит для A/B сравнения ответов тьютора и поиска свежих актуальных фактов.'
                },
                {
                  name: 'Anthropic Claude',
                  badge: 'Точность правил',
                  url: 'https://claude.ai',
                  desc: 'Лидер по соблюдению негативных инструкций («не давай ответ») и сложной логики.'
                }
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{tool.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-center text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Открыть сервис</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUBSECTION 8: PLAYGROUND (ИНТЕРАКТИВНЫЙ TUTOR BUILDER)
      ========================================================= */}
      {activeSubTab === 'playground' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                <Play className="w-6 h-6 text-cyan-400" />
                Интерактивный Tutor Builder 2.0
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                Живой генератор
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Настрой параметры своего репетитора ниже. Система автоматически сформирует готовый системный промпт 2.0 с защитой от сливов ответов:
            </p>

            {/* Панель настроек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Выбор предмета */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Предмет тьютора:</label>
                <select
                  value={builderSubject}
                  onChange={(e) => setBuilderSubject(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="math">🧮 Математика (Дроби, проценты)</option>
                  <option value="english">🇬🇧 Английский язык (Диалоги)</option>
                  <option value="tajik">🇹🇯 Таджикский язык (Худжандский колорит)</option>
                  <option value="coding">💻 Программирование (Python / Web)</option>
                  <option value="geography">🏔️ География Таджикистана</option>
                </select>
              </div>

              {/* Имя тьютора */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Имя персонажа:</label>
                <input
                  type="text"
                  value={builderTutorName}
                  onChange={(e) => setBuilderTutorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Устод Баходур / Nova"
                />
              </div>

              {/* Характер */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Характер и стиль:</label>
                <select
                  value={builderTone}
                  onChange={(e) => setBuilderTone(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="kind">😊 Добрый и подбадривающий</option>
                  <option value="strict">🧐 Строгий академический наставник</option>
                  <option value="detective">🕵️ Детектив-загадочник</option>
                </select>
              </div>
            </div>

            {/* Дополнительные тумблеры */}
            <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderIncludeMelon}
                  onChange={(e) => setBuilderIncludeMelon(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">
                  Включить худжандские аналогии (дыня, самбуса, Панджшанбе)
                </span>
              </label>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-slate-400">Макс. предложений:</span>
                <span className="font-bold text-cyan-400 font-mono">{builderMaxSentences}</span>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={builderMaxSentences}
                  onChange={(e) => setBuilderMaxSentences(Number(e.target.value))}
                  className="w-24 accent-cyan-400"
                />
              </div>
            </div>

            {/* Живой сгенерированный результат */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-300 uppercase">
                  Сгенерированный системный промпт (Prompt 2.0):
                </span>
                <button
                  onClick={() => handleCopy(generateTutorPrompt(), 'playground-prompt')}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  {copiedKey === 'playground-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'playground-prompt' ? 'Скопировано!' : 'Скопировать промпт'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {generateTutorPrompt()}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
