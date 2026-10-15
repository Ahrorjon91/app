import React, { useState, useEffect, useMemo } from 'react';
import { FAQ_ITEMS, HANDBOOK_SECTIONS } from '../data/syllabusData';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Award,
  Database,
  HelpCircle,
  Send,
  CheckCircle2,
  FileText,
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
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header Hero Banner */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#ff791a] text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            База Знаний & Поддержка Студентов
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight flex items-center gap-2.5">
            Часто задаваемые вопросы (FAQ & Support)
          </h1>
          <p className="text-sm text-[#86868b] leading-relaxed">
            Ответы на организационные и технические вопросы курса: регламент сдачи лабораторных работ,
            начисление баллов, выдача именного сертификата и работа с базой данных.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            id="faq-telegram-contact-btn"
            href="https://t.me/aivioratj"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Написать в Telegram</span>
          </a>
        </div>
      </div>

      {/* 4 Pillars Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Card 1: Study Process */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('урок');
          }}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-[#0071e3] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-[#86868b] font-mono tabular-nums uppercase bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/[0.08]">
                12 Недель
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f5f5f7] group-hover:text-[#0071e3] transition-colors">
                Учебный Процесс
              </h3>
              <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                24 интенсивных занятия, очный формат (2 раза в неделю по 90 мин) и сквозной финальный проект.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.06] mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
            <span className="font-mono tabular-nums">24 Урока</span>
            <span className="text-[#0071e3]">Подробнее →</span>
          </div>
        </div>

        {/* Card 2: Virtual Labs & PC */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('ПК');
          }}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-[#30d158] flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-[#86868b] font-mono tabular-nums uppercase bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/[0.08]">
                8 GB RAM+
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f5f5f7] group-hover:text-[#30d158] transition-colors">
                Лаборатории & Стенды
              </h3>
              <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                24 практических стенда: Cursor IDE, Google AI Studio, терминал Linux/Bash и веб-приложения.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.06] mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
            <span className="font-mono tabular-nums">24 Лабораторные</span>
            <span className="text-[#30d158]">Подробнее →</span>
          </div>
        </div>

        {/* Card 3: Grading & Certificate */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('сертификат');
          }}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-[#ff791a] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-[#86868b] font-mono tabular-nums uppercase bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/[0.08]">
                Порог 85%
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f5f5f7] group-hover:text-[#ff791a] transition-colors">
                Оценки & Сертификация
              </h3>
              <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                Именной диплом AI for LIFE Academy с защищенным QR-кодом для проверки работодателями в реестре.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.06] mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
            <span>QR-верификация</span>
            <span className="text-[#ff791a]">Подробнее →</span>
          </div>
        </div>

        {/* Card 4: Database & Offline Isolation */}
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('база');
          }}
          className="p-5 rounded-[28px] bg-[#161618] border border-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-[#bf5af2] flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-[#86868b] font-mono tabular-nums uppercase bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/[0.08]">
                SQLite ACID
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f5f5f7] group-hover:text-[#bf5af2] transition-colors">
                База Данных & Портал
              </h3>
              <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                Все отчеты, файлы и прогресс сохраняются в локальной реляционной БД SQLite с возможностью выгрузки.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/[0.06] mt-3 flex items-center justify-between text-[11px] text-[#86868b]">
            <span>Автономно</span>
            <span className="text-[#bf5af2]">Подробнее →</span>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Search & Filter Bar */}
      <div className="space-y-4 w-full">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-2xl bg-[#161618] border border-white/[0.08]">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по вопросам и ответам базы знаний..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1c1c1e] border border-white/[0.12] text-xs text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#86868b] hover:text-[#f5f5f7] px-1.5 py-0.5 rounded-md hover:bg-white/[0.06]"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#0071e3] text-white font-semibold'
                  : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              Все вопросы ({faqItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0071e3] text-white font-semibold'
                    : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-3 w-full">
            <HelpCircle className="w-10 h-10 text-[#86868b] mx-auto" />
            <p className="text-sm font-semibold text-[#f5f5f7]">По вашему запросу ничего не найдено</p>
            <p className="text-xs text-[#86868b]">Попробуйте изменить формулировку запроса или сбросить фильтр категорий.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/[0.06] text-xs text-[#0071e3] font-medium hover:bg-white/[0.1] transition-colors"
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
                  className={`p-5 rounded-[28px] border transition-colors flex flex-col justify-between ${
                    isOpen
                      ? 'bg-[#161618] border-white/20'
                      : 'bg-[#161618] border-white/[0.08] hover:border-white/15'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tabular-nums bg-white/[0.06] text-[#86868b] border border-white/[0.08]">
                        {item.category || 'FAQ'}
                      </span>
                    </div>

                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full text-left flex items-start justify-between gap-3 font-semibold text-sm text-[#f5f5f7] hover:text-white transition-colors"
                    >
                      <span className="leading-snug">{item.question}</span>
                      <div className="p-1 rounded-xl bg-white/[0.06] shrink-0 mt-0.5">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#f5f5f7]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#86868b]" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="text-xs sm:text-sm text-[#86868b] leading-relaxed pt-3 mt-3 border-t border-white/[0.06] animate-in fade-in space-y-2">
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

      {/* Official Academy Student Handbook */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-[#161618] border border-white/[0.08] space-y-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-[#f5f5f7] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#0071e3]" />
              Справочник Студента & Регламент Курса
            </h2>
            <p className="text-xs text-[#86868b]">
              Официальный справочник правил, стандартов выполнения лабораторных работ и карьерного трека AI for LIFE Academy
            </p>
          </div>

          {/* 4 Handbook Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {HANDBOOK_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveHandbookTab(sec.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeHandbookTab === sec.id
                    ? 'bg-[#0071e3] text-white font-semibold'
                    : 'bg-white/[0.06] text-[#86868b] hover:text-[#f5f5f7]'
                }`}
              >
                <span>{sec.titleRu.split('.')[1] || sec.titleRu}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Handbook Section Content */}
        <div className="p-5 rounded-2xl bg-[#1c1c1e] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#f5f5f7]">
            <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
            <span>{activeHandbook.titleRu}</span>
          </div>
          <pre className="text-xs sm:text-sm text-[#86868b] whitespace-pre-line font-sans leading-relaxed">
            {activeHandbook.contentRu}
          </pre>
        </div>
      </div>

      {/* Support & Mentor Telegram Contact Banner */}
      <div className="p-6 rounded-[28px] bg-[#161618] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-[#0071e3] flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f5f5f7]">Не нашли ответ на свой вопрос?</h4>
            <p className="text-xs text-[#86868b] mt-0.5">
              Ментор и куратор учебной группы всегда готовы ответить на технические вопросы в Telegram или в чате консультаций.
            </p>
          </div>
        </div>

        <a
          id="faq-curator-contact-btn"
          href="https://t.me/aivioratj"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] font-medium text-xs flex items-center gap-2 border border-white/[0.08] shrink-0 transition-colors active:scale-95"
        >
          <span>Задать вопрос куратору</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#86868b]" />
        </a>
      </div>
    </div>
  );
};
