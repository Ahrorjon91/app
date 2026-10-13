import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Terminal,
  HelpCircle,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { AI_LESSON_1_SYLLABUS, AI_FOR_LIFE_COURSE } from '../data/aiForLifeData';

interface AiForLifeSyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudentHandbook?: () => void;
}

export const AiForLifeSyllabusModal: React.FC<AiForLifeSyllabusModalProps> = ({
  isOpen,
  onClose,
  onOpenStudentHandbook
}) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'lecture' | 'lab' | 'game' | 'schedule' | 'grading' | 'markdown'>('passport');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const syllabus = AI_LESSON_1_SYLLABUS;

  const copyFullMarkdown = () => {
    const md = `# AI for Life — Vibe Coding
## Урок 1 / Syllabus Card: ${syllabus.title}

> **${syllabus.title}**
> ${syllabus.moduleInfo}

---

## 1. Паспорт урока
${syllabus.passport.map(p => `* **${p.param}**: ${p.value}`).join('\n')}

---

## 2. Цели урока (Learning Outcomes)
${syllabus.learningOutcomes.map((o, idx) => `${idx + 1}. ${o}`).join('\n')}

---

## 3. Темы лекции (для ментора и портала)
${syllabus.lectureTopics.map(t => `* **№${t.id}. ${t.title}** (${t.durationMinutes} мин): ${t.keyIdea}`).join('\n')}

**Главная фраза урока:**
> ${syllabus.keyPhrase}

---

## 4. Темы для ментора
${syllabus.mentorHighlights.map(m => `* **${m.title}**: ${m.desc}`).join('\n')}

---

## 5. Практика / Lab — «AI Experiment + My AI School Helper»
${syllabus.labPlan.map(s => `* **Шаг ${s.step}** (${s.durationMinutes} мин): ${s.title} — ${s.description}`).join('\n')}

---

## 6. Ролевая игра — «Human vs AI»
* **Формат**: ${syllabus.rolePlayDetails.format}
* **Цель**: ${syllabus.rolePlayDetails.goal}
* **Бонус**: ${syllabus.rolePlayDetails.bonus}

---

## 7. Debug Challenge — «Catch the AI's Mistake»
* **Концепция**: ${syllabus.debugChallengeDetails.concept}
* **Цепочка**: ${syllabus.debugChallengeDetails.flow}
* **Методы проверки**:
${syllabus.debugChallengeDetails.methods.map(m => `  - ${m.name}: ${m.how}`).join('\n')}

---

## 8. Домашнее задание — «AI Journal»
${syllabus.homeworkDetails.items.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}
* **Срок**: ${syllabus.homeworkDetails.deadline}

---

## 9. Структура 90 минут
${syllabus.schedule90Min.map(s => `* **${s.timeRange}** [${s.block}]: ${s.content}`).join('\n')}

---

## 10. Оценивание и XP
${syllabus.xpRewards.map(x => `* ${x.action}: +${x.xp} XP`).join('\n')}

---

## 11. Сообщение родителям
> ${syllabus.parentMessage}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden text-slate-200">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Syllabus Card
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {syllabus.courseName}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800">
                {syllabus.moduleInfo}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Урок 1: {syllabus.title}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyFullMarkdown}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
              title="Скопировать Markdown карточки"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copied ? 'Скопировано!' : 'Копировать MD'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2 sm:px-6 bg-slate-950 border-b border-slate-800 overflow-x-auto shrink-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'passport'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Паспорт & Цели</span>
          </button>
          <button
            onClick={() => setActiveTab('lecture')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'lecture'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Темы & Ментор</span>
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Lab: AI Helper</span>
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'game'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Игра & Debug</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Тайминг 90 мин</span>
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'grading'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Оценивание & XP</span>
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'markdown'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Экспорт MD</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: PASSPORT & LEARNING OUTCOMES */}
          {activeTab === 'passport' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Remember Quote Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-indigo-950/60 to-purple-950/70 border border-cyan-800/50 flex items-start gap-3">
                <Flame className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    Главная фраза урока (Remember)
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    «{syllabus.keyPhrase}»
                  </p>
                </div>
              </div>

              {/* Passport Table */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>1. Паспорт Урока</span>
                </h3>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden divide-y divide-slate-800/80">
                  {syllabus.passport.map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 px-4 text-xs sm:text-sm hover:bg-slate-900/40 transition-colors">
                      <span className="font-bold text-slate-400">{row.param}</span>
                      <span className="font-semibold text-cyan-300 sm:text-right mt-0.5 sm:mt-0">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>2. Цели Урока (Learning Outcomes)</span>
                </h3>
                <p className="text-xs text-slate-400">К концу 90 минут занятия ученик уверенно умеет:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {syllabus.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-emerald-800">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-snug">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Resources */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <span>Инструменты Урока (Free-First)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {syllabus.tools.map((tool, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs sm:text-sm">{tool.name}</span>
                        {tool.required && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                            Обязательно
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{tool.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LECTURE & MENTOR */}
          {activeTab === 'lecture' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Lecture Topics Outline */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>3. Темы Лекции (для ментора и портала)</span>
                </h3>
                <div className="space-y-2.5">
                  {syllabus.lectureTopics.map((topic) => (
                    <div key={topic.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
                            Блок {topic.id}
                          </span>
                          <span className="font-bold text-white text-sm sm:text-base">{topic.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300">{topic.keyIdea}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-mono font-bold shrink-0 self-start sm:self-center border border-slate-700">
                        ⏱ {topic.durationMinutes} мин
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Guidance Highlights */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>4. Темы для Ментора (на что сделать акцент)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {syllabus.mentorHighlights.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                      <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {m.title}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Message */}
              <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-800/50 space-y-2">
                <span className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Сообщение родителям после урока 1
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  «{syllabus.parentMessage}»
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LAB PRACTICE */}
          {activeTab === 'lab' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span>5. Практика / Lab — «AI Experiment + My AI School Helper» (30 минут)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Время выполнения: 40–70 минута занятия. Результат: сохраненный промпт, скриншот и оценка в AI Journal.
                </p>
              </div>

              <div className="space-y-3">
                {syllabus.labPlan.map((step) => (
                  <div key={step.step} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                        Шаг {step.step} · {step.title}
                      </span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                        {step.durationMinutes} мин
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Starter Template Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Стартовый шаблон промпта (AI School Helper):
                </span>
                <pre className="p-3 rounded-xl bg-slate-900 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed border border-slate-800">
{`Ты — [AI Math Coach] для школьника [13] лет.
Помоги мне разобраться в теме [дроби].
Объясняй простыми словами и с примером из жизни.
Не давай сразу готовый ответ — сначала задай мне один вопрос.
В конце проверь, понял ли я тему.`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: ROLE PLAY & DEBUG */}
          {activeTab === 'game' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Role Play Section */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <span>6. Ролевая игра — «Human vs AI»</span>
                  </h3>
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
                    6 раундов
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {syllabus.rolePlayDetails.format}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-cyan-400">Цель игры:</span>
                  <p className="text-slate-300">{syllabus.rolePlayDetails.goal}</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs space-y-1">
                  <span className="font-bold text-amber-300">🌟 Бонус:</span>
                  <p className="text-slate-300">{syllabus.rolePlayDetails.bonus}</p>
                </div>
              </div>

              {/* Debug Challenge */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>7. Debug Challenge — «Catch the AI's Mistake»</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                    +50 XP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {syllabus.debugChallengeDetails.concept}
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
                  Алгоритм: {syllabus.debugChallengeDetails.flow}
                </div>
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-400">3 способа проверки:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {syllabus.debugChallengeDetails.methods.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="font-bold text-cyan-300">{m.name}</span>
                        <p className="text-slate-400">{m.how}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIMING 90 MIN */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Структура занятия 90 минут (Тайм-план ментора)</span>
              </h3>
              <div className="space-y-2">
                {syllabus.schedule90Min.map((slot, i) => (
                  <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-cyan-400 text-xs sm:text-sm w-24 shrink-0">
                        {slot.timeRange}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-bold border border-slate-700 shrink-0">
                        {slot.block}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 sm:text-right">{slot.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GRADING & XP */}
          {activeTab === 'grading' && (
            <div className="space-y-6 animate-in fade-in">
              {/* XP Table */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>XP и Награды за Урок 1</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {syllabus.xpRewards.map((x, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-300">{x.action}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 font-mono font-bold text-xs border border-amber-800">
                        +{x.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grading Rubric */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Оценивание компонентов урока</span>
                </h3>
                <div className="space-y-2">
                  {syllabus.gradingRubric.map((r, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-bold text-white">{r.component}</span>
                        <p className="text-xs text-slate-400">{r.description}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono font-bold self-start sm:self-center border border-cyan-800">
                        Вес {r.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Lesson Bridge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-cyan-400" /> Мост к Уроку 2: {syllabus.nextLessonBridge.nextLessonTitle}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-cyan-200">
                  {syllabus.nextLessonBridge.formula}
                </p>
                <p className="text-xs text-slate-400">{syllabus.nextLessonBridge.usage}</p>
              </div>
            </div>
          )}

          {/* TAB 7: RAW MARKDOWN EXPORT */}
          {activeTab === 'markdown' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Полный текст карточки в формате Markdown:</span>
                <button
                  onClick={copyFullMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопировано в буфер!' : 'Копировать всё'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={18}
                value={`# AI for Life — Vibe Coding\n## Урок 1 / Syllabus Card: ${syllabus.title}\n\n1. Паспорт урока\n` + syllabus.passport.map(p => `- ${p.param}: ${p.value}`).join('\n') + `\n\n2. Цели:\n` + syllabus.learningOutcomes.map(o => `- ${o}`).join('\n')}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed focus:outline-none"
              />
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Готово к запуску · Модуль 1 · AI Foundations</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenStudentHandbook && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudentHandbook();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/30"
              >
                <BookOpen className="w-4 h-4" />
                <span>Открыть Student Handbook Урока 1</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
