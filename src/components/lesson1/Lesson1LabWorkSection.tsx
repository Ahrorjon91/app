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
  UserCheck
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { InlineLabSubmission } from '../InlineLabAndHomeworkSubmission';

export const Lesson1LabWorkSection: React.FC = () => {
  const portal = usePortal();
  const addReward = portal?.addReward || ((_exp: number, _msg?: string) => {});

  // Subtabs inside Section 2 (Лабораторная работа)
  const [activeLabTab, setActiveLabTab] = useState<
    'game' | 'expA' | 'expB' | 'builder' | 'chat' | 'showtell'
  >('game');

  // ==========================================
  // PART 1: РОЛЕВАЯ ИГРА «ЧЕЛОВЕК ИЛИ ИИ?» (6 РАУНДОВ)
  // ==========================================
  const gameRounds = [
    {
      round: 1,
      format: 'Текстовое эссе',
      title: '«Почему важно читать книги в XXI веке?»',
      text: 'Чтение развивает когнитивную гибкость, расширяет словарный запас и формирует критическое мышление. Более того, регулярное чтение литературы способствует повышению уровня эмпатии и улучшает концентрацию внимания в эпоху информационного шума.',
      isAI: true,
      clue: 'Слишком идеальная гладкость текста, шаблонные связки («более того», «способствует повышению»), отсутствие личных живых воспоминаний.',
      userGuess: null as boolean | null
    },
    {
      round: 2,
      format: 'Личное сообщение',
      title: '«Как я вчера гулял с собакой»',
      text: 'Капец вчера промокли до нитки! Джек увидел утку и рванул прямо в грязь по самые уши 🤦‍♂️ Пришлось мыть его в ванной полтора часа, вся пена была на потолке ахах))',
      isAI: false,
      clue: 'Живой разговорный сленг («капец», «рванул»), эмоциональные опечатки, смайлики и настоящее бытовое наблюдение.',
      userGuess: null as boolean | null
    },
    {
      round: 3,
      format: 'Изображение / Портрет',
      title: '«Портрет ученика за партой»',
      text: 'На рисунке мальчик пишет ручкой в тетради. На правой руке 6 странно сросшихся пальцев, а строчки в раскрытой тетрадке состоят из непонятных инопланетных закорючек.',
      isAI: true,
      clue: 'Классические артефакты генерации изображений: лишние пальцы и нечитаемый псевдотекст.',
      userGuess: null as boolean | null
    },
    {
      round: 4,
      format: 'Голосовое сообщение',
      title: '«Аудио-приветствие ментора»',
      text: '«Добрый день, уважаемые ученики. Сегодня мы рассмотрим ключевые понятия урока один. Интонация монотонная, дыхания и пауз между фразами не слышно вообще.»',
      isAI: true,
      clue: 'Синтез речи (TTS) часто звучит без пауз на вдох и с неестественными ударениями в сложных словах.',
      userGuess: null as boolean | null
    },
    {
      round: 5,
      format: 'Фотография из школьного двора',
      title: '«Осенняя линейка»',
      text: 'Фотография сделана на телефон: немного смазанный кадр в движении, на заднем плане друг кричит и машет рукой, на асфальте отражается желтый лист.',
      isAI: false,
      clue: 'Реальное освещение, шум матрицы телефона и естественные случайные детали жизни.',
      userGuess: null as boolean | null
    },
    {
      round: 6,
      format: 'Видео-отрывок',
      title: '«Человек пьет кофе»',
      text: 'В начале ролика чашка белая, через две секунды её ручка растворяется в руке, а цвет кофе внезапно меняется с тёмного на прозрачный.',
      isAI: true,
      clue: 'Отсутствие физической согласованности во времени — предметы трансформируются и «плывут».',
      userGuess: null as boolean | null
    }
  ];

  const [rounds, setRounds] = useState(gameRounds);
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGameGuess = (index: number, guessAI: boolean) => {
    if (rounds[index].userGuess !== null) return;

    const correct = guessAI === rounds[index].isAI;
    const updated = [...rounds];
    updated[index].userGuess = guessAI;
    setRounds(updated);

    if (correct) {
      setGameScore((prev) => prev + 1);
      addReward(15, `🎯 Верно! Раунд ${index + 1} разгадан (+15 Опыта)`);
    }

    // Check if all rounds played
    const allPlayed = updated.every((r) => r.userGuess !== null);
    if (allPlayed) {
      setGameOver(true);
      addReward(30, '🏆 Детективная дуэль завершена! (+30 Опыта)');
    }
  };

  const resetGame = () => {
    setRounds(gameRounds.map((r) => ({ ...r, userGuess: null })));
    setGameScore(0);
    setGameOver(false);
  };

  // ==========================================
  // PART 2: ЭКСПЕРИМЕНТ A (CHATGPT VS GEMINI)
  // ==========================================
  const [copiedExpA, setCopiedExpA] = useState(false);
  const expAPrompt =
    'Объясни, почему небо голубое, простыми словами для школьника 13 лет. Используй яркую аналогию из жизни и уложись в 3 предложения.';

  const handleCopyExpA = () => {
    navigator.clipboard.writeText(expAPrompt);
    setCopiedExpA(true);
    addReward(10, '📋 Промпт скопирован в буфер! (+10 Опыта)');
    setTimeout(() => setCopiedExpA(false), 2000);
  };

  // ==========================================
  // PART 3: ЭКСПЕРИМЕНТ B (ГРАНИЦЫ ВОЗМОЖНОСТЕЙ ИИ)
  // ==========================================
  const [expBChecks, setExpBChecks] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false
  });

  const toggleExpB = (id: number) => {
    setExpBChecks((prev) => ({ ...prev, [id]: !prev[id] }));
    addReward(10, '🔬 Эксперимент на границы ИИ выполнен! (+10 Опыта)');
  };

  // ==========================================
  // PART 4: КОНСТРУКТОР «ШКОЛЬНЫЙ AI-ПОМОЩНИК»
  // ==========================================
  const assistantRoles = [
    {
      id: 'math',
      title: 'Репетитор по математике',
      icon: '📐',
      desc: 'Объясняет алгебру и геометрию через жизненные примеры (пицца, видеоигры) и никогда не решает вместо тебя, а задает наводящие вопросы.'
    },
    {
      id: 'english',
      title: 'Тренажер английского языка',
      icon: '🇬🇧',
      desc: 'Общается на уровне A2-B1, мягко исправляет ошибки в грамматике и предлагает крутые современные идиомы.'
    },
    {
      id: 'history',
      title: 'Интерактивный свидетель истории',
      icon: '🏛️',
      desc: 'Рассказывает об исторических событиях от лица очевидца эпохи, погружая в атмосферу древних цивилизаций.'
    },
    {
      id: 'homework',
      title: 'Наставник по сложным домашним заданиям',
      icon: '📝',
      desc: 'Помогает составить план доклада, найти ошибки в рассуждениях и подсказывает проверенные научные источники.'
    }
  ];

  const [selectedRole, setSelectedRole] = useState(assistantRoles[0].id);
  const [assistantName, setAssistantName] = useState('ПиксельБот');
  const [targetSubject, setTargetSubject] = useState('Дроби и проценты');
  const [studentAge, setStudentAge] = useState('13 лет (7 класс)');
  const [promptCopied, setPromptCopied] = useState(false);

  const generatedSystemPrompt = `Ты — добрый, терпеливый и вдохновляющий школьный наставник по имени ${assistantName}.
Твоя главная специализация: ${assistantRoles.find((r) => r.id === selectedRole)?.title}.
Ты общаешься с учеником в возрасте ${studentAge}, который сейчас изучает тему: «${targetSubject}».
ТВОИ ЗОЛОТЫЕ ПРАВИЛА:
1. Никогда не давай готовый сухой ответ или решение! Веди ученика через наводящие подсказки.
2. Используй яркие и понятные аналогии из мира видеоигр, спорта, космоса или повседневной жизни.
3. Говори доброжелательно и поддерживай, если ученик ошибся.
4. В конце каждого своего ответа обязательно задавай один легкий вопрос на понимание.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedSystemPrompt);
    setPromptCopied(true);
    addReward(25, '🚀 Системный промпт помощника скопирован! (+25 Опыта)');
    setTimeout(() => setPromptCopied(false), 2000);
  };

  // ==========================================
  // PART 5: ИНТЕРАКТИВНЫЙ СИМУЛЯТОР ЧАТА
  // ==========================================
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'bot'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: `Привет! Я твой личный помощник ${assistantName} 🤖. С какой темой или задачей по предмету «${targetSubject}» мы разберемся сегодня?`,
      time: '10:00'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Dynamic AI assistant mock responses based on role
    setTimeout(() => {
      let reply = '';
      if (selectedRole === 'math') {
        reply = `Отличный вопрос! Представь, что у нас есть коробка пиццы, разрезанная на 8 равных кусков 🍕. Если ты съел 2 куска, какую долю ты забрал: 2/8 или 1/4? Попробуй сократить дробь!`;
      } else if (selectedRole === 'english') {
        reply = `Great job! Your thought is very clear! 🌟 Small tip: instead of saying "I very like it", native speakers often say "I really like it". How would you describe your favorite hobby using "I really like"?`;
      } else if (selectedRole === 'history') {
        reply = `О, приветствую тебя, путник сквозь века! 🏺 Мы стоим у ворот древнего города. Вокруг шумят ремесленники, а стража проверяет печати. Что именно тебя интересует в жизни горожан того времени?`;
      } else {
        reply = `Прекрасно! Давай не будем спешить. Давай разобьем эту сложную задачу на три маленьких шага. С какого пункта начнем разбор? 📝`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      addReward(10, '💬 Сообщение помощнику отправлено! (+10 Опыта)');
    }, 600);
  };

  // ==========================================
  // PART 6: SHOW & TELL (ПРЕЗЕНТАЦИЯ ЗА 30 СЕКУНД)
  // ==========================================
  const [copiedPitch, setCopiedPitch] = useState(false);
  const showAndTellPitch = `Привет всем! Моего помощника зовут ${assistantName}.
Его роль: ${assistantRoles.find((r) => r.id === selectedRole)?.title}.
Он создан, чтобы помогать ребятам разбираться в теме «${targetSubject}».
Его главная фишка в том, что он не делает домашку за тебя, а объясняет сложные вещи через аналогии и задает наводящие вопросы.
Мой любимый проверочный промпт из практики: «Объясни тему через пример с пиццей». Спасибо за внимание!`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(showAndTellPitch);
    setCopiedPitch(true);
    addReward(25, '🎤 Питч Show & Tell скопирован! (+25 Опыта)');
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 w-full">
      {/* ЗАГОЛОВОК ЛАБОРАТОРНОЙ РАБОТЫ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-purple-500/40 shadow-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              2. Лабораторная работа
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-white flex items-center gap-2">
              🧪 Практикум: Эксперименты & Создание AI-помощника
            </h1>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            Награда за практику: до +100 Опыта
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Здесь ты переходишь от теории к реальным экспериментам: сыграй в детективную дуэль «Человек или ИИ?», сравни две ведущие модели (ChatGPT и Gemini), найди границы возможностей нейросети, собери собственного умного школьного помощника и проведи его презентацию!
        </p>

        {/* НАВИГАЦИОННЫЕ ВКЛАДКИ ЛАБОРАТОРНОЙ */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {[
            { id: 'game', label: '🎭 Игра «Человек или ИИ?»', badge: `${gameScore}/6` },
            { id: 'expA', label: '🧪 Эксп. A: ChatGPT vs Gemini', badge: 'Сравнение' },
            { id: 'expB', label: '🔬 Эксп. B: Границы возможностей', badge: '3 Ловушки' },
            { id: 'builder', label: '🛠️ Конструктор помощника', badge: 'Промпт' },
            { id: 'chat', label: '💬 Симулятор диалога', badge: 'Тест' },
            { id: 'showtell', label: '🎤 Презентация за 30 сек', badge: '+25 XP' }
          ].map((tab) => {
            const active = activeLabTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLabTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  active
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-purple-200">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. РОЛЕВАЯ ИГРА «ЧЕЛОВЕК ИЛИ ИИ?» */}
      {/* ========================================== */}
      {activeLabTab === 'game' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Детективная арена
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                🎭 Ролевая игра: «Человек или ИИ?» (6 раундов)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-sm font-bold text-amber-300">
                Твой счёт: {gameScore} из 6
              </span>
              <button
                onClick={resetGame}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                title="Сбросить игру"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            Перед тобой 6 фрагментов (тексты, описания картинок, аудио и видео). Определи: кто создатель — живой человек или нейросеть?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rounds.map((r, idx) => {
              const answered = r.userGuess !== null;
              const isCorrect = r.userGuess === r.isAI;

              return (
                <div
                  key={r.round}
                  className={`p-5 rounded-2xl border space-y-3 transition-all ${
                    answered
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/60'
                        : 'bg-rose-950/40 border-rose-500/60'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      Раунд {r.round} • {r.format}
                    </span>
                    {answered && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {isCorrect ? '✓ Угадано верно!' : '✕ Ошибка!'}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-white">{r.title}</h4>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-slate-200 italic border border-slate-800 leading-relaxed">
                    «{r.text}»
                  </div>

                  {!answered ? (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleGameGuess(idx, false)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>🧑 Человек</span>
                      </button>
                      <button
                        onClick={() => handleGameGuess(idx, true)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>🤖 Нейросеть (ИИ)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs animate-in fade-in">
                      <div className="font-bold text-slate-200">
                        Правильный ответ: {r.isAI ? '🤖 Нейросеть (ИИ)' : '🧑 Живой человек'}
                      </div>
                      <p className="text-slate-300 leading-snug">
                        <strong className="text-amber-300">Детективная улика:</strong> {r.clue}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {gameOver && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-black text-lg text-emerald-300">
                  🎉 Игра завершена! Твой результат: {gameScore} из 6
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {gameScore >= 5
                    ? 'Потрясающая наблюдательность! Ты распознаёшь артефакты и паттерны ИИ лучше 95% пользователей.'
                    : 'Отличная тренировка! Теперь ты точно знаешь, на какие маркеры гладкости и неестественности обращать внимание.'}
                </p>
              </div>
              <button
                onClick={() => setActiveLabTab('expA')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-500/20"
              >
                <span>К Эксперименту A</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 2. ЭКСПЕРИМЕНТ A: CHATGPT VS GEMINI */}
      {/* ========================================== */}
      {activeLabTab === 'expA' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Сравнительный эксперимент
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🧪 Эксперимент A: «Один вопрос — два ИИ» (ChatGPT против Gemini)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Отправь один и тот же запрос в два разных ИИ-инструмента и сравни качество ответов:
            </p>
          </div>

          {/* Карточка промпта с кнопкой копирования */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase">
                Готовый проверочный промпт для эксперимента:
              </span>
              <button
                onClick={handleCopyExpA}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                {copiedExpA ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedExpA ? 'Скопировано!' : 'Скопировать промпт'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-xs sm:text-sm font-mono text-cyan-200 border border-slate-800 leading-relaxed">
              «{expAPrompt}»
            </div>
          </div>

          {/* Чек-лист критериев сравнения */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm sm:text-base text-white">
              Чек-лист исследователя: на что обратить внимание при сравнении ответов:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: '1. Простота аналогии', desc: 'Насколько легко понять образ (рассеивание света через сито, волны на воде)?' },
                { title: '2. Соблюдение объёма', desc: 'Уложилась ли модель ровно в 3 предложения, как просили в задании?' },
                { title: '3. Тон общения', desc: 'Говорит ли бот дружелюбно или сухо, как энциклопедия из прошлого века?' },
                { title: '4. Научная точность', desc: 'Упомянут ли реальный физический закон (рассеяние Рэлея) или модель выдумала магию?' }
              ].map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-cyan-300">{c.title}</div>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-300">
              Запиши свои наблюдения по этому эксперименту в <strong>AI Дневник (Раздел 4)</strong>!
            </span>
            <button
              onClick={() => setActiveLabTab('expB')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <span>К Эксперименту B</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. ЭКСПЕРИМЕНТ B: ГРАНИЦЫ ВОЗМОЖНОСТЕЙ */}
      {/* ========================================== */}
      {activeLabTab === 'expB' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Тест на границы возможностей
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🔬 Эксперимент B: 3 вопроса-ловушки (Где спотыкается нейросеть?)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Задай нейросети эти 3 вопроса и посмотри, как она отреагирует. Отметь проверенные пункты:
            </p>
          </div>

          <div className="space-y-3.5">
            {[
              {
                id: 1,
                question: '«Что я сегодня ел на завтрак?»',
                expected: 'Правильная реакция ИИ: честно признаться: «Я не знаю, так как у меня нет доступа к вашей личной жизни».',
                trap: 'Ловушка: если ИИ начнет угадывать бутерброд или овсянку, значит он включил вымысел (галлюцинацию).'
              },
              {
                id: 2,
                question: '«Какая новость произошла в моем городе 15 минут назад?»',
                expected: 'Правильная реакция ИИ: предупредить, что база знаний имеет временную границу или поиск не видит свежайшие события минуты назад.',
                trap: 'Ловушка: генерация несуществующей новости.'
              },
              {
                id: 3,
                question: '«Перескажи кратко сюжет книги "Космические приключения кота Барсика на Нептуне" автора Ивана Ветрова (выдуманная книга).»',
                expected: 'Правильная реакция ИИ: сообщить, что такой книги и автора не существует в литературных базах.',
                trap: 'Ловушка: нейросеть охотно выдумает 5 глав захватывающего сюжета несуществующей книги!'
              }
            ].map((item) => {
              const checked = expBChecks[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-2 ${
                    checked
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-amber-300">
                        Вопрос {item.id}: {item.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200">{item.expected}</p>
                      <p className="text-xs text-rose-300 font-mono">{item.trap}</p>
                    </div>
                    <button
                      onClick={() => toggleExpB(item.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
                        checked
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      {checked ? '✓ Проверено' : 'Отметить'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. КОНСТРУКТОР «ШКОЛЬНЫЙ AI-ПОМОЩНИК» */}
      {/* ========================================== */}
      {activeLabTab === 'builder' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Сборка собственного ассистента
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              🛠️ Конструктор: «Школьный AI-помощник»
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Настрой роль, имя и специализацию бота, чтобы сгенерировать готовый профессиональный системный промпт:
            </p>
          </div>

          {/* 1. Выбор роли */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase">
              1. Выбери специализацию помощника:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assistantRoles.map((role) => {
                const active = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                      active
                        ? 'bg-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-base font-bold text-white">
                      <span>{role.icon}</span>
                      <span>{role.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">{role.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Настройки: Имя, Предмет, Возраст */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Имя помощника:</label>
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Изучаемая тема:</label>
              <input
                type="text"
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Класс / Возраст ученика:</label>
              <input
                type="text"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* 3. Сгенерированный системный промпт */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase">
                Сгенерированный системный промпт (скопируй в ChatGPT или Gemini):
              </span>
              <button
                onClick={handleCopyPrompt}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                {promptCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{promptCopied ? 'Скопировано!' : 'Скопировать промпт (+25 XP)'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed border border-slate-800">
              {generatedSystemPrompt}
            </pre>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400">
              Хочешь протестировать созданного помощника прямо сейчас?
            </span>
            <button
              onClick={() => setActiveLabTab('chat')}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
            >
              <span>Запустить симулятор диалога</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. ИНТЕРАКТИВНЫЙ СИМУЛЯТОР ЧАТА */}
      {/* ========================================== */}
      {activeLabTab === 'chat' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Живая песочница
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                💬 Симулятор общения с «{assistantName}»
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              В сети • Роль: {assistantRoles.find((r) => r.id === selectedRole)?.title}
            </span>
          </div>

          {/* Окно сообщений */}
          <div className="h-80 overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Строка ввода сообщения */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Задай вопрос помощнику по теме «${targetSubject}»...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. SHOW & TELL: ПРЕЗЕНТАЦИЯ ЗА 30 СЕКУНД */}
      {/* ========================================== */}
      {activeLabTab === 'showtell' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Выступление исследователя
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                🎤 Презентация за 30 секунд (Show & Tell)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 font-mono text-xs font-bold">
              Награда: +25 XP
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            Умение защитить свой проект и объяснить логику работы — ключевой навык современного инженера. Вот готовый текст твоего 30-секундного питча для ментора или одноклассников:
          </p>

          <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">
                Твой готовый текст питча (30 секунд):
              </span>
              <button
                onClick={handleCopyPitch}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
              >
                {copiedPitch ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPitch ? 'Скопировано!' : 'Скопировать питч (+25 XP)'}</span>
              </button>
            </div>

            <p className="p-4 rounded-xl bg-slate-900 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans border border-slate-800">
              {showAndTellPitch}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* СДАЧА ОТЧЕТА ПО ЛАБОРАТОРНОЙ РАБОТЕ МЕНТОРУ */}
      {/* ========================================================= */}
      <div className="pt-4">
        <InlineLabSubmission
          labId={1}
          lessonTitle="Лабораторная работа №1: Что такое интеллект и AI — Создание «AI School Helper»"
        />
      </div>
    </div>
  );
};
