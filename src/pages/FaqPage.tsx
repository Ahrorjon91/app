import React, { useState, useEffect, useMemo } from 'react';
import { FAQ_ITEMS, HANDBOOK_SECTIONS } from '../data/syllabusData';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Terminal,
  Award,
  Database,
  HelpCircle,
  Send,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { api } from '../lib/api';

export const FaqPage: React.FC = () => {
  const [faqItems, setFaqItems] = useState(FAQ_ITEMS);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id || 'faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHandbookTab, setActiveHandbookTab] = useState<string>('rules');

  useEffect(() => {
    let isMounted = true;
    const fetchFaq = async () => {
      try {
        const res = await api.getFaq();
        if (res.success && Array.isArray(res.faq) && res.faq.length > 0) {
          if (isMounted) {
            setFaqItems(res.faq);
          }
        }
      } catch (e) {
        console.error('[FaqPage] Error fetching FAQ:', e);
      }
    };
    fetchFaq();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered FAQ items based on category and search
  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqItems, selectedCategory, searchQuery]);

  // Categories extracted dynamically from items
  const categories = useMemo(() => {
    const set = new Set<string>();
    faqItems.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqItems]);

  const activeHandbook = HANDBOOK_SECTIONS.find((h) => h.id === activeHandbookTab) || HANDBOOK_SECTIONS[0];

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Full-Width Header Hero Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            База Знаний & Поддержка Студентов
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-cyan-400 shrink-0" />
            Часто задаваемые вопросы (FAQ & Support)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ответы на организационные и технические вопросы курса: регламент сдачи лабораторных работ,
            начисление баллов, выдача именного сертификата и работа с локальной базой данных SQLite.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <a
            id="faq-telegram-contact-btn"
            href="https://t.me/aivioratj"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Написать в Telegram</span>
          </a>
        </div>
      </div>

      {/* 4 Pillars Summary Cards (Full Screen 4-Column Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1: Study Process */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('урок');
          }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                12 Недель
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Учебный Процесс
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                24 интенсивных занятия, очный формат (2 раза в неделю по 90 мин) и сквозной финальный проект.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>24 Урока</span>
            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Подробнее →</span>
          </div>
        </div>

        {/* Card 2: Virtual Labs & PC */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('ПК');
          }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                8 GB RAM+
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                Лаборатории & Стенды
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                24 виртуальных стенда: VirtualBox, Packet Tracer и встроенный веб-симулятор терминала Linux/Bash.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>24 Лабораторные</span>
            <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">Подробнее →</span>
          </div>
        </div>

        {/* Card 3: Grading & Certificate */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('сертификат');
          }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Порог 60%
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Оценки & Сертификация
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Именной диплом AI for LIFE Academy с защищенным QR-кодом для проверки работодателями в реестре.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>QR-верификация</span>
            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">Подробнее →</span>
          </div>
        </div>

        {/* Card 4: Database & Offline Isolation */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('база');
          }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 font-mono uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                SQLite ACID
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                База Данных & Портал
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Все отчеты, файлы и прогресс сохраняются в локальной реляционной БД SQLite с возможностью выгрузки.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>Автономно</span>
            <span className="text-amber-400 group-hover:translate-x-1 transition-transform">Подробнее →</span>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Search & Filter Bar */}
      <div className="space-y-4 w-full">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по вопросам и ответам базы знаний..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md hover:bg-slate-800"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Все вопросы ({faqItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List (Full Width Grid) */}
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 w-full">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-300">По вашему запросу ничего не найдено</p>
            <p className="text-xs text-slate-500">Попробуйте изменить формулировку запроса или сбросить фильтр категорий.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-cyan-400 font-bold hover:bg-slate-700 transition-colors"
            >
              Показать все вопросы
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {filteredFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                    isOpen
                      ? 'bg-slate-900 border-cyan-500/50 shadow-xl shadow-cyan-950/20'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                        {item.category || 'FAQ'}
                      </span>
                    </div>

                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left flex items-start justify-between gap-3 font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                    >
                      <span className="leading-snug">{item.question}</span>
                      <div className="p-1 rounded-xl bg-slate-800/80 shrink-0 mt-0.5">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 mt-3 border-t border-slate-800/80 animate-in fade-in space-y-2">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Academy Student Handbook (Full-Screen 4-Section Component) */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-indigo-400" />
              Справочник Студента & Регламент Курса
            </h2>
            <p className="text-xs text-slate-400">
              Официальный справочник правил, стандартов выполнения лабораторных работ и карьерного трека AI for LIFE Academy
            </p>
          </div>

          {/* 4 Handbook Tabs */}
          <div className="flex flex-wrap gap-2">
            {HANDBOOK_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveHandbookTab(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeHandbookTab === sec.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{sec.titleRu.split('.')[1] || sec.titleRu}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Handbook Section Content */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>{activeHandbook.titleRu}</span>
          </div>
          <pre className="text-xs sm:text-sm text-slate-300 whitespace-pre-line font-sans leading-relaxed">
            {activeHandbook.contentRu}
          </pre>
        </div>
      </div>

      {/* Support & Mentor Telegram Contact Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-800/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Не нашли ответ на свой вопрос?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Ментор и куратор учебной группы всегда готовы ответить на технические вопросы в Telegram или в чате консультаций.
            </p>
          </div>
        </div>

        <a
          id="faq-curator-contact-btn"
          href="https://t.me/aivioratj"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 shrink-0 transition-colors"
        >
          <span>Задать вопрос куратору</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>
    </div>
  );
};
