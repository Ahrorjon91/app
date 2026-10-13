import React from 'react';
import {
  ShieldCheck,
  Award,
  Server,
  AlertTriangle,
  Terminal,
  FlaskConical,
  FileSpreadsheet,
  HelpCircle,
  Zap,
  ChevronRight,
  Sparkles,
  CheckSquare,
  Lock,
  Globe,
  Cpu,
  Workflow,
  Users,
  Briefcase,
  BookOpen,
  CheckCircle2,
  List
} from 'lucide-react';
import { LessonData } from '../types';
import { LessonQuizComponent } from '../components/LessonQuizComponent';
import { InlineLabSubmission, InlineHomeworkSubmission } from '../components/InlineLabAndHomeworkSubmission';
import { LessonDiagram } from '../components/LessonDiagram';
import {
  Lesson1TheoryAndCheatSheet,
  Lesson1LabWorkMerged,
  Lesson1DetectiveAndQuiz,
  Lesson1JournalAndSideQuests
} from '../components/Lesson1MissionMergedSections';
import {
  Lesson2TheoryAndCheatSheet,
  Lesson2LabWorkMerged,
  Lesson2DetectiveAndQuiz,
  Lesson2JournalAndSideQuests
} from '../components/Lesson2MissionMergedSections';
import {
  Lesson3TheoryAndCheatSheet,
  Lesson3LabWorkMerged,
  Lesson3DetectiveAndQuiz,
  Lesson3JournalAndSideQuests
} from '../components/Lesson3MissionMergedSections';
import {
  Lesson4TheoryAndCheatSheet,
  Lesson4LabWorkMerged,
  Lesson4DetectiveAndQuiz,
  Lesson4JournalAndSideQuests
} from '../components/Lesson4MissionMergedSections';
import {
  Lesson5TheoryAndCheatSheet,
  Lesson5LabWorkMerged,
  Lesson5DetectiveAndQuiz,
  Lesson5JournalAndSideQuests
} from '../components/Lesson5MissionMergedSections';
import {
  Lesson6TheoryAndCheatSheet,
  Lesson6LabWorkMerged,
  Lesson6DetectiveAndQuiz,
  Lesson6JournalAndSideQuests
} from '../components/Lesson6MissionMergedSections';
import {
  Lesson7TheoryAndCheatSheet,
  Lesson7LabWorkMerged,
  Lesson7DetectiveAndQuiz,
  Lesson7JournalAndSideQuests
} from '../components/Lesson7MissionMergedSections';
import {
  Lesson8TheoryAndCheatSheet,
  Lesson8LabWorkMerged,
  Lesson8DetectiveAndQuiz,
  Lesson8JournalAndSideQuests
} from '../components/Lesson8MissionMergedSections';
import {
  Lesson9TheoryAndCheatSheet,
  Lesson9LabWorkMerged,
  Lesson9DetectiveAndQuiz,
  Lesson9JournalAndSideQuests
} from '../components/Lesson9MissionMergedSections';
import {
  Lesson10TheoryAndCheatSheet,
  Lesson10LabWorkMerged,
  Lesson10DetectiveAndQuiz,
  Lesson10JournalAndSideQuests
} from '../components/Lesson10MissionMergedSections';
import {
  Lesson11TheoryAndCheatSheet,
  Lesson11LabWorkMerged,
  Lesson11DetectiveAndQuiz,
  Lesson11JournalAndSideQuests
} from '../components/Lesson11MissionMergedSections';
import {
  Lesson12TheoryAndCheatSheet,
  Lesson12LabWorkMerged,
  Lesson12DetectiveAndQuiz,
  Lesson12JournalAndSideQuests
} from '../components/Lesson12MissionMergedSections';
import {
  Lesson13LectureSection,
  Lesson13LabWorkSection,
  Lesson13QuizSection,
  Lesson13HomeworkSection
} from '../components/Lesson13MissionMergedSections';
import {
  Lesson14LectureSection,
  Lesson14LabWorkSection,
  Lesson14QuizSection,
  Lesson14HomeworkSection
} from '../components/Lesson14MissionMergedSections';
import { Lesson14UpgradeLectureSection } from '../components/lesson14/Lesson14UpgradeLectureSection';
import { Lesson14UpgradeLabSection } from '../components/lesson14/Lesson14UpgradeLabSection';
import { Lesson14UpgradeQuizSection } from '../components/lesson14/Lesson14UpgradeQuizSection';
import { Lesson14UpgradeHomeworkSection } from '../components/lesson14/Lesson14UpgradeHomeworkSection';
import {
  Lesson15LectureSection,
  Lesson15LabWorkSection,
  Lesson15QuizSection,
  Lesson15HomeworkSection
} from '../components/Lesson15MissionMergedSections';
import { Lesson15RoadmapLectureSection } from '../components/lesson15/Lesson15RoadmapLectureSection';
import { Lesson15RoadmapLabSection } from '../components/lesson15/Lesson15RoadmapLabSection';
import { Lesson15RoadmapQuizSection } from '../components/lesson15/Lesson15RoadmapQuizSection';
import { Lesson15RoadmapHomeworkSection } from '../components/lesson15/Lesson15RoadmapHomeworkSection';
import {
  Lesson16LectureSection,
  Lesson16LabWorkSection,
  Lesson16QuizSection,
  Lesson16HomeworkSection
} from '../components/Lesson16MissionMergedSections';
import { Lesson16AgencyLectureSection } from '../components/lesson16/Lesson16AgencyLectureSection';
import { Lesson16AgencyLabSection } from '../components/lesson16/Lesson16AgencyLabSection';
import { Lesson16AgencyQuizSection } from '../components/lesson16/Lesson16AgencyQuizSection';
import { Lesson16AgencyHomeworkSection } from '../components/lesson16/Lesson16AgencyHomeworkSection';
import {
  Lesson17LectureSection,
  Lesson17LabWorkSection,
  Lesson17QuizSection,
  Lesson17HomeworkSection
} from '../components/Lesson17MissionMergedSections';
import {
  Lesson18LectureSection,
  Lesson18LabWorkSection,
  Lesson18QuizSection,
  Lesson18HomeworkSection
} from '../components/Lesson18MissionMergedSections';
import {
  Lesson19LectureSection,
  Lesson19LabWorkSection,
  Lesson19QuizSection,
  Lesson19HomeworkSection
} from '../components/Lesson19MissionMergedSections';
import { Lesson19AndroidLectureSection } from '../components/lesson19/Lesson19AndroidLectureSection';
import { Lesson19AndroidLabSection } from '../components/lesson19/Lesson19AndroidLabSection';
import { Lesson19AndroidQuizSection } from '../components/lesson19/Lesson19AndroidQuizSection';
import { Lesson19AndroidHomeworkSection } from '../components/lesson19/Lesson19AndroidHomeworkSection';
import {
  Lesson20LectureSection,
  Lesson20LabWorkSection,
  Lesson20QuizSection,
  Lesson20HomeworkSection
} from '../components/Lesson20MissionMergedSections';
import { Lesson20N8nLectureSection } from '../components/lesson20/Lesson20N8nLectureSection';
import { Lesson20N8nLabSection } from '../components/lesson20/Lesson20N8nLabSection';
import { Lesson20N8nQuizSection } from '../components/lesson20/Lesson20N8nQuizSection';
import { Lesson20N8nHomeworkSection } from '../components/lesson20/Lesson20N8nHomeworkSection';
import {
  Lesson21LectureSection,
  Lesson21LabWorkSection,
  Lesson21QuizSection,
  Lesson21HomeworkSection
} from '../components/Lesson21MissionMergedSections';
import { Lesson21McpLectureSection } from '../components/lesson21/Lesson21McpLectureSection';
import { Lesson21McpLabSection } from '../components/lesson21/Lesson21McpLabSection';
import { Lesson21McpQuizSection } from '../components/lesson21/Lesson21McpQuizSection';
import { Lesson21McpHomeworkSection } from '../components/lesson21/Lesson21McpHomeworkSection';
import {
  Lesson22LectureSection,
  Lesson22LabWorkSection,
  Lesson22QuizSection,
  Lesson22HomeworkSection
} from '../components/Lesson22MissionMergedSections';
import { Lesson22ServicesLectureSection } from '../components/lesson22/Lesson22ServicesLectureSection';
import { Lesson22ServicesLabSection } from '../components/lesson22/Lesson22ServicesLabSection';
import { Lesson22ServicesQuizSection } from '../components/lesson22/Lesson22ServicesQuizSection';
import { Lesson22ServicesHomeworkSection } from '../components/lesson22/Lesson22ServicesHomeworkSection';
import {
  Lesson23LectureSection,
  Lesson23LabWorkSection,
  Lesson23QuizSection,
  Lesson23HomeworkSection
} from '../components/Lesson23MissionMergedSections';
import { Lesson23PortfolioLectureSection } from '../components/lesson23/Lesson23PortfolioLectureSection';
import { Lesson23PortfolioLabSection } from '../components/lesson23/Lesson23PortfolioLabSection';
import { Lesson23PortfolioQuizSection } from '../components/lesson23/Lesson23PortfolioQuizSection';
import { Lesson23PortfolioHomeworkSection } from '../components/lesson23/Lesson23PortfolioHomeworkSection';
import {
  Lesson24LectureSection,
  Lesson24LabWorkSection,
  Lesson24QuizSection,
  Lesson24HomeworkSection
} from '../components/Lesson24MissionMergedSections';

export interface LessonSection {
  id: string;
  title: string;
  subtitle: string;
  exp: number;
  content: React.ReactNode;
}

export function getCustomLessonSections(
  lesson: LessonData,
  nav: {
    setSelectedLabId: (id: number) => void;
    setSelectedQuizId: (id: string) => void;
    setActivePage: (page: string) => void;
  }
): LessonSection[] {
  const { setSelectedLabId, setSelectedQuizId, setActivePage } = nav;

  // Custom 4 Canonical Sections for Lesson 1: Student Handbook (1. Лекция урока, 2. Лабораторная работа, 3. Проверка знаний и тесты, 4. Домашнее задание)
  if (lesson.id === 1) {
    return [
      {
        id: 'sec-1-lecture',
        title: '1. Лекция урока',
        subtitle: 'Интеллект, Человек против ИИ, 3 Матрёшки, Токены, Безопасность, Шпаргалка, Словарь, Источники и Игры',
        exp: 25,
        content: <Lesson1TheoryAndCheatSheet />
      },
      {
        id: 'sec-1-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Игра «Человек или ИИ?», эксперименты (ChatGPT vs Gemini, Границы ИИ) + Конструктор помощника и Show & Tell',
        exp: 25,
        content: <Lesson1LabWorkMerged />
      },
      {
        id: 'sec-1-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Челлендж фактчекинга (Debug Challenge) + Мини-тест (5 вопросов) и бейдж «AI Исследователь»',
        exp: 25,
        content: <Lesson1DetectiveAndQuiz />
      },
      {
        id: 'sec-1-homework',
        title: '4. Домашнее задание',
        subtitle: 'Личный AI Дневник (6 обязательных пунктов), калькулятор наград (+275 XP) и анонс Урока 2',
        exp: 25,
        content: <Lesson1JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 2: Prompt Engineering 101
  if (lesson.id === 2) {
    return [
      {
        id: 'sec-2-lecture',
        title: '1. Лекция урока',
        subtitle: 'Интеллект & Человек vs ИИ, 3 Матрёшки, Токены & Температура, Безопасность, Шпаргалка, Словарь, Источники и Игры',
        exp: 25,
        content: <Lesson2TheoryAndCheatSheet />
      },
      {
        id: 'sec-2-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум: RTFC & Boss Prompt для Худжанда, Few-Shot классификатор, CoT и слепой A/B тест',
        exp: 25,
        content: <Lesson2LabWorkMerged />
      },
      {
        id: 'sec-2-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Аудит и рефакторинг слабых промптов + Мини-тест (5 вопросов) и бейдж «Prompt Engineer 101»',
        exp: 25,
        content: <Lesson2DetectiveAndQuiz />
      },
      {
        id: 'sec-2-homework',
        title: '4. Домашнее задание',
        subtitle: '3 боевых Boss Prompts (5/5), личная Prompt Library, черновик и анонс Урока 3',
        exp: 25,
        content: <Lesson2JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 3: AI Tutor (Mission 03)
  if (lesson.id === 3) {
    return [
      {
        id: 'sec-3-lecture',
        title: '1. Лекция урока',
        subtitle: 'Tutor vs Машина, Prompt 2.0 (✅/❌), Цикл v1 → v2, Tutor Doctor, Шпаргалка, Словарь, Инструменты и Тренажёр',
        exp: 25,
        content: <Lesson3TheoryAndCheatSheet />
      },
      {
        id: 'sec-3-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум: Сборка Tutor v1, Break the Tutor (4 стресс-теста), апгрейд до v2 и отчёт',
        exp: 25,
        content: <Lesson3LabWorkMerged />
      },
      {
        id: 'sec-3-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Скоростной Rule Challenge (правило 3/3) + Boss Quiz (5 вопросов) и бейдж «TUTOR BUILDER»',
        exp: 25,
        content: <Lesson3DetectiveAndQuiz />
      },
      {
        id: 'sec-3-homework',
        title: '4. Домашнее задание',
        subtitle: 'Side Quest: «Improve My Tutor» до v3, реальный тест из учебника и анонс Mission 04',
        exp: 25,
        content: <Lesson3JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 4: Merged AI Artist (Mission 05) & Character Designer (Mission 06)
  if (lesson.id === 4) {
    return [
      {
        id: 'sec-4-lecture',
        title: '1. Лекция урока',
        subtitle: 'ИИ-Художник (Формула 6 частей, Карта стилей, Худжанд-2050) + Дизайнер персонажей (Паспорт героя, Reference-приём, Матрица эмоций)',
        exp: 25,
        content: <Lesson4TheoryAndCheatSheet />
      },
      {
        id: 'sec-4-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум «Худжанд-2050» (сборка v1–v3) + Сборка Character Sheet маскота (4 кадра: портрет, полный рост, эмоции, город)',
        exp: 25,
        content: <Lesson4LabWorkMerged />
      },
      {
        id: 'sec-4-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Испытание 6 частей формулы и 3/3 сходства + Финальные тесты и бейджи «AI ARTIST» & «CHARACTER DESIGNER»',
        exp: 25,
        content: <Lesson4DetectiveAndQuiz />
      },
      {
        id: 'sec-4-homework',
        title: '4. Домашнее задание',
        subtitle: 'Проекты: «3 варианта одной идеи» + «3 сцены с персонажем», Дневник ИИ и дополнительные квесты',
        exp: 25,
        content: <Lesson4JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 5: AI Product Designer — Google Stitch (Moved from Lesson 11)
  if (lesson.id === 5) {
    return [
      {
        id: 'sec-5-lecture',
        title: '1. Лекция урока',
        subtitle: 'Миссия «Сначала дизайн. Потом код» (Idea → UX → UI → Prototype → Code), PART 1: 10 UX-паттернов Tesla Model X и Storytelling, PART 2: 6 шагов в Google Stitch',
        exp: 25,
        content: <Lesson11TheoryAndCheatSheet />
      },
      {
        id: 'sec-5-lab',
        title: '2. Лабораторная работа',
        subtitle: 'LAB в Google Stitch: 5 UX-решений Tesla Model X, генерация UI в стиле tesla.com, инспекция 6 узлов, замена картинок и кнопок, сохранение и экспорт проекта',
        exp: 25,
        content: <Lesson11LabWorkMerged />
      },
      {
        id: 'sec-5-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'UX-Инспектор (3 кейса) + Финальный тест (5 вопросов) по Google Stitch и UX-паттернам Tesla Model X',
        exp: 25,
        content: <Lesson11DetectiveAndQuiz />
      },
      {
        id: 'sec-5-homework',
        title: '4. Домашнее задание',
        subtitle: 'Отчёт по 5 UX-решениям Tesla Model X + улучшение, новые картинки/кнопки, сохранение и экспорт проекта из Google Stitch',
        exp: 25,
        content: <Lesson11JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 6: Website Control Center — HTML, CSS & JS (Moved from Lesson 10)
  if (lesson.id === 6) {
    return [
      {
        id: 'sec-6-lecture',
        title: '1. Лекция урока',
        subtitle: 'Центр Управления Сайтом: «Сырые пакеты» vs «Голограмма», 3 отдела (HTML, CSS, JS), Анатомия тегов и правил, Тренажёр «Дизайнер и Разработчик», Шпаргалка',
        exp: 25,
        content: <Lesson10TheoryAndCheatSheet />
      },
      {
        id: 'sec-6-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Строим сайт-визитку: Структурный план, Генерация кода по отделам, Интерактивная CSS-Диспетчерская, JS-сигнал тревоги, Мобильная проверка и 20с питч',
        exp: 25,
        content: <Lesson10LabWorkMerged />
      },
      {
        id: 'sec-6-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Протокола (3 пациента) + Быстрое испытание 3/3 (90с) + Финальный квалификационный тест и бейдж «WEB ARCHITECT (Lv.6)»',
        exp: 25,
        content: <Lesson10DetectiveAndQuiz />
      },
      {
        id: 'sec-6-homework',
        title: '4. Домашнее задание',
        subtitle: 'Задание «Второй отдел в деле», Сайд-квесты «Именной тег <div>» & Family Tour, Дневник ИИ и подготовка к следующему модулю',
        exp: 25,
        content: <Lesson10JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 7: Website Control Center — HTML + CSS + JavaScript (Tesla Model X in Google AI Studio)
  if (lesson.id === 7) {
    return [
      {
        id: 'sec-7-lecture',
        title: '1. Лекция урока',
        subtitle: 'Гайд в стиле ProfitStudio: От дизайна Google Stitch к коду в Google AI Studio (STEP 1–4), 3 роли (HTML/CSS/JS), Архитектура Tesla Model X, DEBUG CHALLENGE и Запуск на локальном ПК',
        exp: 25,
        content: <Lesson7TheoryAndCheatSheet />
      },
      {
        id: 'sec-7-lab',
        title: '2. Лабораторная работа',
        subtitle: 'LAB: Сборка сайта tesla.com/modelx (6 секций: Vehicles, Energy, Charging, Semi, Discover, Shop + Footer 2026), Инспектор 3 файлов, DEBUG CHALLENGE (4 бага) и Экспорт ZIP на ПК',
        exp: 25,
        content: <Lesson7LabWorkMerged />
      },
      {
        id: 'sec-7-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'DEBUG CHALLENGE Тренажёр (4 бага) + Быстрый блиц 3/3 (90с) + Финальный тест (5 вопросов) и бейдж «FULL-STACK VIBE BUILDER (Lv.7)»',
        exp: 25,
        content: <Lesson7DetectiveAndQuiz />
      },
      {
        id: 'sec-7-homework',
        title: '4. Домашнее задание',
        subtitle: 'Локальный запуск Tesla Model X на ПК, отчёт по 4 багам DEBUG CHALLENGE, связка Уроков 5+6+7 и Дневник Вайб-Кодера',
        exp: 25,
        content: <Lesson7JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 8: 🚀 Publisher — Git + GitHub + «Мой сайт LIVE!»
  if (lesson.id === 8) {
    return [
      {
        id: 'sec-8-lecture',
        title: '1. Лекция урока',
        subtitle: 'Эмоциональный старт «🌍 Мой сайт в интернете!», Регистрация на GitHub.com, Пошаговый GUIDE (Steps 1–7: AI Studio → GitHub Repo TeslaModelX), Publish Directly, Видео в Hero через Cloudinary и Деплой на Linux-сервер (Nginx / Apache + Real DNS)',
        exp: 25,
        content: <Lesson8TheoryAndCheatSheet />
      },
      {
        id: 'sec-8-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Интерактивный Деплой-Терминал (7 шагов AI Studio → GitHub + Direct Publish), Интеграция видео из Cloudinary в Hero-секцию, Конфигуратор Linux VPS (Nginx / Apache + Real DNS) и 🎯 FINAL CHALLENGE',
        exp: 25,
        content: <Lesson8LabWorkMerged />
      },
      {
        id: 'sec-8-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Деплоя и DNS (4 сбоя публикации) + Блиц-проверка 3/3 (90с) + Финальный тест (5 вопросов) и бейдж «GLOBAL WEB PUBLISHER (Lv.8)»',
        exp: 25,
        content: <Lesson8DetectiveAndQuiz />
      },
      {
        id: 'sec-8-homework',
        title: '4. Домашнее задание',
        subtitle: '🎯 FINAL CHALLENGE: Отправка GitHub URL + Live URL + Screenshot, обновление Hero-видео через Cloudinary и шпаргалка системного инженера (Linux + Nginx/Apache + DNS)',
        exp: 25,
        content: <Lesson8JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 9: Motion Designer (moved from Lesson 13)
  if (lesson.id === 9) {
    return [
      {
        id: 'sec-9-lecture',
        title: '1. Лекция урока',
        subtitle: 'Запуск: Мёртвый vs Живой сайт, 4 вида анимации (Hover, Fade, Slide, Reveal), Витрина со слайдером скорости, Ролевая игра «Живая Анимация», Шпаргалка',
        exp: 25,
        content: <Lesson13LectureSection />
      },
      {
        id: 'sec-9-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Новый кейс: Кибер-карточка персонажа (Slide-Up Reveal + Pulse Glow + Reduced Motion), генератор промпта и сдача отчёта ментору',
        exp: 25,
        content: <Lesson13LabWorkSection />
      },
      {
        id: 'sec-9-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Анимации (3 пациента с дефектами движения) + Быстрое испытание 3/3 (90с) + Финальный тест квалификации и бейдж «MOTION DESIGNER (Lv.9)»',
        exp: 25,
        content: <Lesson13QuizSection />
      },
      {
        id: 'sec-9-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: Витрина из 3 Тарифов с 3D-наклоном и Магнитной кнопкой + Сдача домашней работы ментору',
        exp: 25,
        content: <Lesson13HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 10: Scroll Storyteller (moved from Lesson 14)
  if (lesson.id === 10) {
    return [
      {
        id: 'sec-10-lecture',
        title: '1. Лекция урока',
        subtitle: 'Запуск: Обычный сайт vs Scrollytelling, Сюжетная дуга (Завязка → Действие → Поворот → Финал), Темп, Ролевая игра «Живая Прокрутка», Шпаргалка',
        exp: 25,
        content: <Lesson14LectureSection />
      },
      {
        id: 'sec-10-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Новый кейс: Scrollytelling «Погружение батискафа на 11 000 метров», Датчик глубины (Scroll Progress Bar), Песочница и сдача отчёта ментору',
        exp: 25,
        content: <Lesson14LabWorkSection />
      },
      {
        id: 'sec-10-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Темпа (3 пациента с дефектами скролла) + Испытание 3/3 + Квалификационный тест и официальный бейдж «SCROLL STORYTELLER (Lv.10)»',
        exp: 25,
        content: <Lesson14QuizSection />
      },
      {
        id: 'sec-10-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: Интерактивная «Машина Времени» (5 эпох с Parallax и счётчиком годов) + Сдача работы ментору',
        exp: 25,
        content: <Lesson14HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 11: Motion Designer & Media Web ($1M Assets)
  if (lesson.id === 11) {
    return [
      {
        id: 'sec-11-lecture',
        title: '1. Лекция урока',
        subtitle: 'Разбор сайта за $1 000 000 (Apple iPhone 18 Pro Burgundy), Конвейер: Pinterest → Google Whisk (Start & End Frame) → Google Flow (AI Video) → Ezgif',
        exp: 25,
        content: <Lesson15LectureSection />
      },
      {
        id: 'sec-11-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум: Кастомный Remix 4 покрытий («Four Gorgeous Finishes») в Whisk, видео Центр → Вправо в Google Flow, нарезка кадров в Ezgif и сдача отчёта ментору',
        exp: 25,
        content: <Lesson15LabWorkSection />
      },
      {
        id: 'sec-11-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Продуктового Рендера (3 кейса) + Спринт по конвейеру Whisk/Flow/Ezgif + Финальный тест и бейдж «CREATIVE TECHNOLOGIST (Lv.11)»',
        exp: 25,
        content: <Lesson15QuizSection />
      },
      {
        id: 'sec-11-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: Создай 3D-пакет ассетов (Start + End + Video) для Своего Продукта Мечты на фоне #000000 + Сдача работы ментору',
        exp: 25,
        content: <Lesson15HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 12: Project #4: $1M Apple-Style Scroll Website
  if (lesson.id === 12) {
    return [
      {
        id: 'sec-12-lecture',
        title: '1. Лекция урока',
        subtitle: 'Архитектура сайта за $1 000 000: DESIGN.md с styles.refero.design, Шрифт Archivo («PRO»), 3 слоя глубины сцены и движение Burgundy (Центр → Вправо)',
        exp: 25,
        content: <Lesson16LectureSection />
      },
      {
        id: 'sec-12-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум: Сборка Bento-сетки из 4 карточек с подсветкой рамок + Переключатель 4 покрытий по DESIGN.md в AI Studio и сдача отчёта ментору',
        exp: 25,
        content: <Lesson16LabWorkSection />
      },
      {
        id: 'sec-12-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор $1M-Сайта (3 аудита скролла и слоёв) + Чек-лист премиум-стандарта 8/8 + Большая Премьера (питч 30с) + Тест и бейдж «WOW WEBSITE MASTER (Lv.12)»',
        exp: 25,
        content: <Lesson16QuizSection />
      },
      {
        id: 'sec-12-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: Интерактивный Калькулятор Trade-In и Конфигуратор памяти (256GB–2TB) для iPhone 18 Pro + Сдача работы ментору',
        exp: 25,
        content: <Lesson16HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 13: Apple Watch Ultra 4 Multi-Page Ecosystem, Bug/Security Fixes & Vercel Deployment
  if (lesson.id === 13) {
    return [
      {
        id: 'sec-13-lecture',
        title: '1. Лекция урока',
        subtitle: 'Вторая страница Apple Watch Ultra 4, переключатель iPhone ⇄ Watch, обновление информационного скроллинга с видео/анимацией, фикс багов и безопасность + эксперимент «Ошибка деплоя HTML/CSS/JS в GitHub vs Облачный билд в Vercel»',
        exp: 25,
        content: <Lesson12TheoryAndCheatSheet />
      },
      {
        id: 'sec-13-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум: Конфигуратор 3 ремешков Apple Watch Ultra 4 + Night Mode, 4 патча памяти/CSP, проверка ошибки сырого деплоя на GitHub, релиз в Vercel и сдача отчёта ментору',
        exp: 25,
        content: <Lesson12LabWorkMerged />
      },
      {
        id: 'sec-13-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Экосистемы и Деплоя (3 кейса: ошибка .tsx на GitHub Pages, сброс скролла, защита ключей) + Квалификационный тест (5 вопросов) и бейдж «FULL-STACK PRODUCT DEPLOYER (Lv.13)»',
        exp: 25,
        content: <Lesson12DetectiveAndQuiz />
      },
      {
        id: 'sec-13-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: 3-я страница экосистемы (AirPods Pro 3 / Vision Pro) + Единая Корзина (Apple Bag) + Деплой на Vercel и сдача работы ментору',
        exp: 25,
        content: <Lesson12JournalAndSideQuests />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 14: Edit an Existing AI-Built Website With Google AI Studio & Add WhatsApp
  if (lesson.id === 14) {
    return [
      {
        id: 'sec-14-lecture',
        title: '1. Лекция урока',
        subtitle: 'Демо Ментора: Импорт сайта из GitHub в Google AI Studio (0/4), первичный аудит (Import Audit), точечные правки через Annotation Mode (0/5) и объяснение интеграции на примере WhatsApp (https://wa.me/[NUMBER])',
        exp: 25,
        content: <Lesson14UpgradeLectureSection />
      },
      {
        id: 'sec-14-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Практикум (Отличается от лекции!): Импорт из GitHub, запуск Import Audit, апгрейд Hero/Услуг и самостоятельная интеграция кнопки TELEGRAM (https://t.me/username?text=...) + Сдача отчёта ментору',
        exp: 25,
        content: <Lesson14UpgradeLabSection />
      },
      {
        id: 'sec-14-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Доктор Редактирования Сайта и Мессенджеров (3 кейса) + Квалификационный тест (5 вопросов) и официальный бейдж «AI WEBSITE UPGRADER & MESSENGER PRO (Lv.14)»',
        exp: 25,
        content: <Lesson14UpgradeQuizSection />
      },
      {
        id: 'sec-14-homework',
        title: '4. Домашнее задание',
        subtitle: '🧠 Vibe Code Самостоятельно: Разработка функции Прямого Звонка (Call `tel:`) и Виджета «Обратный звонок за 30 секунд» + Объединение с WhatsApp/Telegram и сдача работы ментору',
        exp: 25,
        content: <Lesson14UpgradeHomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 15: Frontend Roadmap — Run & Publish Website Yourself (Without AI)
  if (lesson.id === 15) {
    return [
      {
        id: 'sec-15-lecture',
        title: '1. Лекция урока',
        subtitle: '🧭 Дорожная карта Frontend — запускаем и публикуем сайт сами (без ИИ): roadmap.sh/frontend, словарь разработчика, Antigravity IDE, Терминал (npm install, npm run dev, npm test, npm run build) и деплой на GitHub + Vercel',
        exp: 25,
        content: <Lesson15RoadmapLectureSection />
      },
      {
        id: 'sec-15-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Запускаю сайт сам: от терминала до интернета» (40 минут · Без помощи ИИ): 11 шагов от распаковки ZIP в Antigravity IDE до деплоя через GitHub и Vercel',
        exp: 25,
        content: <Lesson15RoadmapLabSection />
      },
      {
        id: 'sec-15-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: Дорожная карта Frontend и самостоятельный запуск сайта» (5 вопросов с одним правильным ответом)',
        exp: 25,
        content: <Lesson15RoadmapQuizSection />
      },
      {
        id: 'sec-15-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Мой сайт — моя версия» (30–40 минут): 3 изменения вручную в Antigravity IDE, сохранение в Git/GitHub, обновление сайта и бонус по package.json',
        exp: 25,
        content: <Lesson15RoadmapHomeworkSection />
      }
    ];
  }

  // Specialized rich 4-section architecture for Lesson 16 (Мини-агентство: сайты для реальных бизнесов — от «нуля» до «героя»)
  if (lesson.id === 16) {
    return [
      {
        id: 'sec-16-lecture',
        title: '1. Лекция урока',
        subtitle: '🚀 Мини-агентство: сайты для реальных бизнесов — от «нуля» до «героя»: Правила безопасности 12+, Лестница сайтов, Мастер-промпт, 3 дополнения (фото, отзывы, премиум) и этичное общение',
        exp: 25,
        content: <Lesson16AgencyLectureSection />
      },
      {
        id: 'sec-16-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Мой первый демо-сайт для местного бизнеса» (40 минут): 11 шагов от поиска ниши на Google Maps до публикации на Vercel + Мини-детектив',
        exp: 25,
        content: <Lesson16AgencyLabSection />
      },
      {
        id: 'sec-16-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: мини-агентство и сайты для реального бизнеса» (5 вопросов с одним правильным ответом)',
        exp: 25,
        content: <Lesson16AgencyQuizSection />
      },
      {
        id: 'sec-16-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Три уровня одного сайта» (40–60 минут): Простая, Бизнес-лендинг и Премиум версии + Мини-список пакетов услуг и бонус',
        exp: 25,
        content: <Lesson16AgencyHomeworkSection />
      }
    ];
  }

  // Specialized rich 4-section architecture for Lesson 17 (App Builder: Website vs Web App vs Mobile App)
  if (lesson.id === 17) {
    return [
      {
        id: 'sec-17-lecture',
        title: '1. Лекция урока',
        subtitle: 'Уровень 1–3: Запуск (Угадай экран), Лестница типов, Формула приложения (5 шагов), Мост PWA, Ролевая игра, Шпаргалка и Инструменты',
        exp: 25,
        content: <Lesson17LectureSection />
      },
      {
        id: 'sec-17-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Уровень 4: Лаборатория — Прототип To-Do List или Mini-Quiz, Живой конструктор формулы, Промпт для AI Studio, Интерактивная песочница и Аудит 3/3',
        exp: 25,
        content: <Lesson17LabWorkSection />
      },
      {
        id: 'sec-17-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Уровень 5–7: Доктор Приложения (3 пациента) + Быстрое испытание 3/3 (90с) + Показ прототипов + Финальный тест и бейдж «APP BUILDER (Lv.17)»',
        exp: 25,
        content: <Lesson17QuizSection />
      },
      {
        id: 'sec-17-homework',
        title: '4. Домашнее задание',
        subtitle: 'Спецификация своего приложения «App Specification», Сайд-квесты App Detective & Family Test, Дневник ИИ, Шпаргалка и анонс Миссии 18 (Data & API)',
        exp: 25,
        content: <Lesson17HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 18: DATA & API (1. Лекция урока, 2. Лабораторная работа, 3. Проверка знаний и тесты, 4. Домашнее задание)
  if (lesson.id === 18) {
    return [
      {
        id: 'sec-18-lecture',
        title: '1. Лекция урока',
        subtitle: 'Уровень 1–3: Память приложения, Амнезия vs Память, State vs Storage vs API, Официант в чайхане (Request/Response), Ролевая игра и Шпаргалка',
        exp: 25,
        content: <Lesson18LectureSection />
      },
      {
        id: 'sec-18-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Уровень 4: Лаборатория — Local Storage, Подключение бесплатного API, Инспектор сети, Интерактивная песочница и Аудит 3/3',
        exp: 25,
        content: <Lesson18LabWorkSection />
      },
      {
        id: 'sec-18-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Уровень 5–7: Доктор Данных (3 пациента), Спринт 90с в парах, Показ функциональных APP & Питч, Тест квалификации и бейдж «DATA ENGINEER (Lv.18)»',
        exp: 25,
        content: <Lesson18QuizSection />
      },
      {
        id: 'sec-18-homework',
        title: '4. Домашнее задание',
        subtitle: 'Миссия «Add a Feature», Сайд-квесты API Explorer & Family Test, Дневник ИИ, Шпаргалка и анонс Миссии 19 (AI Engineer)',
        exp: 25,
        content: <Lesson18HomeworkSection />
      }
    ];
  }

  // Custom 4 Canonical Sections for Lesson 19: Создаём своё первое Android-приложение в Google AI Studio
  if (lesson.id === 19) {
    return [
      {
        id: 'sec-19-lecture',
        title: '1. Лекция урока',
        subtitle: '📱 Создаём своё первое Android-приложение в Google AI Studio: Build → Android, 4 пункта промпта (Jetpack Compose / Material 3), Preview, частые ошибки и шпаргалка',
        exp: 25,
        content: <Lesson19AndroidLectureSection />
      },
      {
        id: 'sec-19-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Моё первое Android-приложение за 40 минут»: выбор темы, создание в Google AI Studio (Android), тест в Preview и 3 короткие итерации',
        exp: 25,
        content: <Lesson19AndroidLabSection />
      },
      {
        id: 'sec-19-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ Проверочный тест по Уроку 19 (5 вопросов)',
        exp: 25,
        content: <Lesson19AndroidQuizSection />
      },
      {
        id: 'sec-19-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Своё полезное Android-приложение: от черновика до версии 2.0» (35–45 минут): 5 коротких итераций и отчёт разработчика',
        exp: 25,
        content: <Lesson19AndroidHomeworkSection />
      }
    ];
  }

  // Canonical Lesson 20: n8n с нуля: автоматизация и Telegram-бот
  if (lesson.id === 20) {
    return [
      {
        id: 'sec-20-lecture',
        title: '1. Лекция урока',
        subtitle: '🤖 n8n с нуля: автоматизация и Telegram-бот: правила безопасности, workflow/node/trigger/credentials/execution, BotFather, Chat ID и рефлексия',
        exp: 25,
        content: <Lesson20N8nLectureSection />
      },
      {
        id: 'sec-20-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Мой первый Telegram-автоматизатор» (45 мин): Лаба 1 («Привет из n8n»), Лаба 2 (по расписанию), Лаба 3 (двусторонний бот) и Мини-детектив',
        exp: 25,
        content: <Lesson20N8nLabSection />
      },
      {
        id: 'sec-20-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: n8n и Telegram-бот» (5 вопросов с выбором одного правильного ответа)',
        exp: 25,
        content: <Lesson20N8nQuizSection />
      },
      {
        id: 'sec-20-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Моя полезная автоматизация» (30–40 минут): выбор идеи, схема, сборка workflow в n8n, проверка в Telegram и бонус с датой/временем',
        exp: 25,
        content: <Lesson20N8nHomeworkSection />
      }
    ];
  }

  if (lesson.id === 21) {
    return [
      {
        id: 'sec-21-lecture',
        title: '1. Лекция урока',
        subtitle: '🔌 Что такое MCP и как подключить Claude к n8n: правила безопасности, клиент/сервер/tools, Instance-level MCP, формула запроса к ИИ и рефлексия',
        exp: 25,
        content: <Lesson21McpLectureSection />
      },
      {
        id: 'sec-21-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Прошу ИИ автоматизировать» (35 мин): Available in MCP, поиск, запуск, создание и редактирование workflow через Claude + Мини-детектив',
        exp: 25,
        content: <Lesson21McpLabSection />
      },
      {
        id: 'sec-21-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: MCP и Claude + n8n» (5 вопросов с выбором одного правильного ответа)',
        exp: 25,
        content: <Lesson21McpQuizSection />
      },
      {
        id: 'sec-21-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Пишу задание для ИИ-помощника» (30–40 минут): 3 запроса по формуле, сборка в n8n, 5 правил безопасности и бонус «запрет-лист»',
        exp: 25,
        content: <Lesson21McpHomeworkSection />
      }
    ];
  }

  if (lesson.id === 22) {
    return [
      {
        id: 'sec-22-lecture',
        title: '1. Лекция урока',
        subtitle: '🎓 ИИ-сервисы для учёбы и творчества: NotebookLM, Pomelli и Gamma — правила безопасности и честности, пошаговые инструкции, шпаргалка и рефлексия',
        exp: 25,
        content: <Lesson22ServicesLectureSection />
      },
      {
        id: 'sec-22-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Мини-проект: от материалов до презентации и рекламы» (40 мин): Часть A (NotebookLM), Часть B (Gamma), Часть C (Pomelli) и Мини-детектив',
        exp: 25,
        content: <Lesson22ServicesLabSection />
      },
      {
        id: 'sec-22-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: NotebookLM, Pomelli и Gamma» (5 вопросов с выбором одного правильного ответа)',
        exp: 25,
        content: <Lesson22ServicesQuizSection />
      },
      {
        id: 'sec-22-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Мой учебный набор с помощью ИИ» (30–40 минут): тема из школьного предмета, тест в NotebookLM, презентация в Gamma, проверка 3 фактов и бонус',
        exp: 25,
        content: <Lesson22ServicesHomeworkSection />
      }
    ];
  }

  if (lesson.id === 23) {
    return [
      {
        id: 'sec-23-lecture',
        title: '1. Лекция урока',
        subtitle: '🏆 Повторяем всё пройденное и создаём своё премиум-портфолио: правила безопасности, карта курса, Паспорт проекта, промпты, README и чек-лист проверки',
        exp: 25,
        content: <Lesson23PortfolioLectureSection />
      },
      {
        id: 'sec-23-lab',
        title: '2. Лабораторная работа',
        subtitle: '🧪 «Собираю портфолио» (40 мин): Часть A (Блиц и сбор проектов), Часть B (Паспорта проектов), Часть C (Сайт в AI Studio), Часть D (Публикация) и Мини-детектив',
        exp: 25,
        content: <Lesson23PortfolioLabSection />
      },
      {
        id: 'sec-23-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: '✅ «Проверь себя: повторение курса и портфолио» (5 вопросов с одним правильным ответом)',
        exp: 25,
        content: <Lesson23PortfolioQuizSection />
      },
      {
        id: 'sec-23-homework',
        title: '4. Домашнее задание',
        subtitle: '🏠 «Готовлю показ для родителей» (40–60 минут): презентация в Gamma (8–10 слайдов), речь на 3 минуты, репетиция, запасной план и 2 вопроса от родителей',
        exp: 25,
        content: <Lesson23PortfolioHomeworkSection />
      }
    ];
  }

  if (lesson.id === 24) {
    return [
      {
        id: 'sec-24-lecture',
        title: '1. Лекция урока',
        subtitle: 'Уровень 1–3: Путь 24 миссий, Формула Demo Day (3–5 мин), 3 секрета уверенности и Репетиция в парах',
        exp: 25,
        content: <Lesson24LectureSection />
      },
      {
        id: 'sec-24-lab',
        title: '2. Лабораторная работа',
        subtitle: 'Уровень 4: Финальная подготовка — Улучшение по фидбеку, Тех-чек 4/4, Хронометраж и Настройка пространства',
        exp: 25,
        content: <Lesson24LabWorkSection />
      },
      {
        id: 'sec-24-quiz',
        title: '3. Проверка знаний и тесты',
        subtitle: 'Уровень 5–6: Доктор Презентации, Fun Final Quiz (6/6 за 5 мин) и Главное Событие DEMO DAY (до +250 ОП)',
        exp: 25,
        content: <Lesson24QuizSection />
      },
      {
        id: 'sec-24-homework',
        title: '4. Домашнее задание',
        subtitle: 'Уровень 7: Церемония Выпускника, Бейдж «AI FOR LIFE MASTER (Lv.24)», Reflection Card и Сертификат',
        exp: 25,
        content: <Lesson24HomeworkSection />
      }
    ];
  }

  // Generic rich pedagogical 4-section builder for other lessons
  return [
    {
      id: `sec-${lesson.id}-lecture`,
      title: '1. Лекция урока',
      subtitle: `${lesson.titleRu} (⏱ ${lesson.theoryDuration + lesson.practiceDuration} минут)`,
      exp: 25,
      content: (
        <div className="space-y-5 sm:space-y-6 text-slate-200">
          {/* Header Card */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> AI FOR LIFE Academy • Блок {lesson.blockId}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-900/80 text-indigo-200 text-xs sm:text-sm font-bold border border-indigo-700">
                Урок {lesson.lessonNumber} из 24 · Неделя {lesson.week} · {lesson.theoryDuration + lesson.practiceDuration} минут
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-cyan-300 leading-snug">
              Урок {lesson.lessonNumber}: {lesson.titleRu}
            </h3>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {lesson.theorySummary}
            </p>
          </div>

          {/* Architectural Diagram */}
          <LessonDiagram lessonId={lesson.id} />

          {/* Description & Learning Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" /> 📘 Ключевые понятия урока
              </h4>
              <p className="leading-relaxed text-slate-100 text-base sm:text-lg">
                {lesson.theorySummary}
              </p>
            </div>

            <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-lg sm:text-xl flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" /> 🎯 Цели обучения
              </h4>
              <ul className="space-y-2 text-slate-100 text-base sm:text-lg list-disc list-inside leading-relaxed">
                {lesson.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cheat Sheet & Key Principles */}
          <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-amber-300 text-lg sm:text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" /> 💡 Подробный конспект и ключевые тезисы:
            </h4>
            <div className="p-3 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-sans leading-relaxed whitespace-pre-line text-base sm:text-lg">
              {lesson.cheatSheetMd}
            </div>
          </div>

          {/* Commands & Tools */}
          {lesson.commands && lesson.commands.length > 0 && (
            <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="font-bold text-cyan-300 text-lg sm:text-xl flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400 shrink-0" /> 💻 Ключевые консольные команды
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm sm:text-base">
                {lesson.commands.map((cmd, i) => (
                  <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-cyan-300 font-bold font-mono text-sm sm:text-base">{cmd.command}</code>
                      <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">{cmd.OS}</span>
                    </div>
                    <p className="text-slate-200 text-sm sm:text-base">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools Badge */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-purple-300 text-sm sm:text-base flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" /> Используемые инструменты:
            </h5>
            <div className="flex flex-wrap gap-2">
              {lesson.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/50 text-purple-200 text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: `sec-${lesson.id}-lab`,
      title: '2. Лабораторная работа',
      subtitle: `Практическое задание №${lesson.labId || lesson.id} (⏱ ${lesson.practiceDuration} минут)`,
      exp: 25,
      content: (
        <div className="space-y-5 sm:space-y-6 text-slate-200">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-400 shrink-0" /> Лабораторная работа №{lesson.labId || lesson.id}: {lesson.titleRu}
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs sm:text-sm font-bold">
                ⏱ {lesson.practiceDuration} минут
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-base sm:text-lg">
              <span className="font-bold text-white block">Практическая цель:</span>
              <p className="text-slate-100 leading-relaxed">
                Закрепите знания темы «{lesson.titleRu}» на практике с помощью используемых утилит: {lesson.tools.join(', ')}.
              </p>
            </div>
          </div>

          <InlineLabSubmission labId={lesson.labId || lesson.id} lessonTitle={lesson.titleRu} />
        </div>
      )
    },
    {
      id: `sec-${lesson.id}-quiz`,
      title: '3. Проверка знаний и тесты',
      subtitle: 'Вопросы с моментальной проверкой и подробными пояснениями',
      exp: 25,
      content: (
        <div className="space-y-5 sm:space-y-6">
          <LessonQuizComponent lessonId={lesson.id} lessonTitle={lesson.titleRu} />
        </div>
      )
    },
    {
      id: `sec-${lesson.id}-homework`,
      title: '4. Домашнее задание',
      subtitle: lesson.homeworkTitle,
      exp: 25,
      content: (
        <div className="space-y-5 sm:space-y-6 text-slate-200">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-300 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400 shrink-0" /> Домашнее Задание: {lesson.homeworkTitle}
              </h3>
            </div>

            <div className="text-base sm:text-lg text-slate-100 space-y-3">
              <p className="leading-relaxed">
                <strong>Описание задания:</strong> {lesson.homeworkDesc}
              </p>
            </div>
          </div>

          <InlineHomeworkSubmission lessonId={lesson.id} homeworkTitle={lesson.homeworkTitle} />
        </div>
      )
    }
  ];
}
